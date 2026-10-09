---
sidebar_position: 6
title: Secrets and Encryption
description: Manage secrets and configure encryption at rest and in transit for WSO2 Integrator services.
keywords: [wso2 integrator, secrets, encryption, config.toml, vault, kubernetes secrets, tls]
slug: /deploy-and-run/secure/secrets-encryption
---

# Secrets and Encryption

Protect sensitive data in your integrations, including API keys, database passwords, certificates, and tokens.

## Secrets in Config.toml

Store secrets in `Config.toml` and **never commit this file** to version control:

```toml
# Config.toml
dbPassword = "s3cur3-p@ssw0rd"
apiKey = "sk-abc123..."
oauthClientSecret = "client-secret-value"
```

Add `Config.toml` to `.gitignore`:

```
# .gitignore
Config.toml
**/Config.toml
```

## Environment variables

Pass secrets via environment variables instead of files:

```ballerina
configurable string dbPassword = ?;
configurable string apiKey = ?;
```

```bash
export BAL_CONFIG_VAR_DB_PASSWORD="s3cur3-p@ssw0rd"
export BAL_CONFIG_VAR_API_KEY="sk-abc123"
bal run
```

## Kubernetes secrets

Mount Kubernetes Secrets as files or environment variables:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: integration-secrets
type: Opaque
data:
  dbPassword: czNjdXIzLXBAc3N3MHJk    # base64 encoded
  apiKey: c2stYWJjMTIz

---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: integration
          envFrom:
            - secretRef:
                name: integration-secrets
          # Or mount as a Config.toml file:
          volumeMounts:
            - name: config-volume
              mountPath: /app/Config.toml
              subPath: Config.toml
      volumes:
        - name: config-volume
          secret:
            secretName: integration-config
```

## HashiCorp Vault integration

There are two patterns for consuming Vault secrets in a Ballerina service on Kubernetes.

### Vault Secrets Operator (recommended)

The [Vault Secrets Operator (VSO)](https://developer.hashicorp.com/vault/docs/platform/k8s/vso) syncs Vault secrets into native Kubernetes `Secret` objects on a schedule. The Ballerina service reads them as environment variables — zero Vault coupling in application code.

**1. Install VSO**

```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update

helm install vault-secrets-operator hashicorp/vault-secrets-operator \
  --namespace vault-secrets-operator-system \
  --create-namespace \
  --set "defaultVaultConnection.enabled=true" \
  --set "defaultVaultConnection.address=https://vault.vault.svc.cluster.local:8200"
```

> If Vault uses a custom or self-signed CA, supply the CA cert via
> `--set defaultVaultConnection.caCertSecretRef=<secret-name>` where the secret
> contains the PEM-encoded CA certificate.

**2. Create VSO resources**

```yaml
# VaultAuth — authenticates VSO to Vault using the app's ServiceAccount via Kubernetes auth
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultAuth
metadata:
  name: my-integration-auth
  namespace: default
spec:
  method: kubernetes
  mount: kubernetes
  kubernetes:
    role: my-integration
    serviceAccount: my-integration
---
# VaultStaticSecret — syncs the Vault KV secret to a Kubernetes Secret every 30s
apiVersion: secrets.hashicorp.com/v1beta1
kind: VaultStaticSecret
metadata:
  name: my-integration-credentials
  namespace: default
spec:
  vaultAuthRef: my-integration-auth
  type: kv-v2
  mount: secret
  path: myapp/credentials
  destination:
    name: my-integration-secret
    create: true
    transformation:
      excludeRaw: true
      templates:
        DB_PASSWORD:
          text: "{{ .Secrets.db_password }}"
        API_KEY:
          text: "{{ .Secrets.api_key }}"
  refreshAfter: 30s
```

**3. Reference the synced secret in `Cloud.toml`**

Use [`[[cloud.secret.envs]]`](https://github.com/ballerina-platform/ballerina-spec/blob/master/c2c/code-to-cloud-spec.md#cloudsecretenvs) to generate `valueFrom.secretKeyRef` entries in the deployment — no manual YAML patching needed:

```toml
[[cloud.secret.envs]]
name        = "DB_PASSWORD"
key_ref     = "DB_PASSWORD"
secret_name = "my-integration-secret"

[[cloud.secret.envs]]
name        = "API_KEY"
key_ref     = "API_KEY"
secret_name = "my-integration-secret"
```

**4. Read secrets in Ballerina via `os:getEnv`**

```ballerina
import ballerina/os;

string dbPassword = os:getEnv("DB_PASSWORD");
string apiKey     = os:getEnv("API_KEY");
```

### Vault Agent Injector

The Vault Agent Injector (installed alongside Vault) mutates pods at admission time, injecting a sidecar that writes secrets to `/vault/secrets/` as files. The Ballerina service reads the file on each request.

Add these annotations to the pod template in your deployment YAML:

```yaml
annotations:
  vault.hashicorp.com/agent-inject: "true"
  vault.hashicorp.com/role: "my-integration"
  vault.hashicorp.com/agent-inject-secret-credentials: "secret/data/myapp/credentials"
  vault.hashicorp.com/agent-inject-template-credentials: |
    {{- with secret "secret/data/myapp/credentials" -}}
    db_password={{ .Data.data.db_password }}
    api_key={{ .Data.data.api_key }}
    {{- end }}
```

Read the injected file in Ballerina:

```ballerina
import ballerina/io;

function readInjectedSecret(string filePath) returns map<string>|error {
    string[] lines = check io:fileReadLines(filePath);
    map<string> props = {};
    foreach string line in lines {
        int? eq = line.indexOf("=");
        if eq is int {
            props[line.substring(0, eq).trim()] = line.substring(eq + 1);
        }
    }
    return props;
}
```

| | Vault Secrets Operator | Vault Agent Injector |
|---|---|---|
| Pod containers | 1 (app only) | 3 (app + init + sidecar) |
| Secret delivery | Env vars via `secretKeyRef` | File at `/vault/secrets/` |
| App reads secret | `os:getEnv()` | File I/O |
| Vault coupling in app | None | File path + parse logic |
| K8s Secret created | Yes (auditable) | No |

## AWS Secrets Manager

On AWS, keep secrets in AWS Secrets Manager (or as `SecureString` parameters in SSM Parameter Store) and let the integration read them in one of two ways.

### Inject secrets at startup

Have the platform resolve each secret and pass it to the integration as a `BAL_CONFIG_VAR_<VARIABLE_NAME>` environment variable. The integration code only declares a `configurable` variable and never calls AWS:

```ballerina
configurable string dbPassword = ?;
```

- **Amazon ECS**: list the secrets in the `secrets` block of the task definition. ECS fetches them with the task execution role when the task starts. See [Amazon ECS deployment](../self-hosted/containerized-deployment.md#step-5-register-the-task-definition).
- **Amazon EKS**: use the [External Secrets Operator](https://external-secrets.io/) to sync secrets into a Kubernetes Secret. Install the operator and create a `ClusterSecretStore` for AWS by following the [operator's AWS guide](https://external-secrets.io/latest/provider/aws-secrets-manager/), then define the values to sync:

  ```yaml
  apiVersion: external-secrets.io/v1
  kind: ExternalSecret
  metadata:
    name: my-integration-config
  spec:
    refreshInterval: 1h
    secretStoreRef:
      name: aws-secretsmanager
      kind: ClusterSecretStore
    target:
      name: my-integration-env
    data:
      - secretKey: BAL_CONFIG_VAR_DBPASSWORD
        remoteRef:
          key: prod/my-integration/db
          property: password
  ```

  Load the synced Secret into the integration's container:

  ```bash
  kubectl set env deployment/my-integration-deployment --from=secret/my-integration-env
  ```

  To keep this change across rebuilds, apply it as a [Kustomize](https://kustomize.io/) patch on the generated manifests.

Environment variables are read only when the process starts. After you rotate a secret, restart the integration to pick up the new value: run `aws ecs update-service --force-new-deployment` on ECS, or `kubectl rollout restart` on EKS.

### Read secrets at runtime

To pick up rotated values without a restart, read the secret with the <a href="/integration-platform/docs/connectors/catalog/security-identity/aws.secretmanager/aws-secrets-manager-connector-overview"><code>ballerinax/aws.secretmanager</code></a> connector. With `auth:DEFAULT_CREDENTIALS`, the connector uses the IAM role of the compute environment, so no access keys are needed to fetch the secret. See [Access AWS Services Securely](aws-access.md).

```ballerina
import ballerinax/aws;
import ballerinax/aws.auth;
import ballerinax/aws.secretmanager;

final secretmanager:Client secrets = check new ({
    region: aws:US_EAST_1,
    auth: auth:DEFAULT_CREDENTIALS
});

function getDbPassword() returns string|error {
    secretmanager:SecretValue secret = check secrets->getSecretValue("prod/my-integration/db");
    byte[]|string value = secret.value;
    string secretString = value is string ? value : check string:fromBytes(value);
    // The secret stores a JSON document such as {"password":"..."}
    json document = check secretString.fromJsonString();
    return (check document.password).toString();
}
```

The role needs `secretsmanager:GetSecretValue` on the secret, and `kms:Decrypt` if the secret is encrypted with a customer managed KMS key.

## TLS configuration

For a detailed guide on creating keystores and truststores, see [Keystores and truststores](keystore-truststore.md).

### Server TLS

```ballerina
listener http:Listener secureListener = new (9443, {
    secureSocket: {
        key: {
            certFile: "/path/to/server.crt",
            keyFile: "/path/to/server.key"
        }
    }
});
```

### Client TLS (Trust custom CA)

```ballerina
final http:Client secureClient = check new ("https://internal-api.example.com", {
    secureSocket: {
        cert: "/certs/internal-ca.crt"
    }
});
```

### Mutual TLS

```ballerina
listener http:Listener mtlsListener = new (9443, {
    secureSocket: {
        key: {
            certFile: "/path/to/server.crt",
            keyFile: "/path/to/server.key"
        },
        mutualSsl: {
            verifyClient: http:REQUIRE,
            cert: "/path/to/ca.crt"
        }
    }
});
```

## Encryption at rest

For database encryption, configure at the database level:

- **MySQL**: Enable InnoDB tablespace encryption
- **PostgreSQL**: Use pgcrypto extension or Transparent Data Encryption
- **MongoDB**: Enable encryption at rest with WiredTiger
- **AWS RDS**: Enable storage encryption in RDS settings

## Best practices

1. **Never hardcode secrets** in source code. Always use `configurable` variables.
2. **Never commit Config.toml** to version control.
3. **Use a secrets manager** (Vault, AWS Secrets Manager, Azure Key Vault) in production.
4. **Rotate secrets regularly.** Use short-lived tokens where possible.
5. **Enable TLS everywhere.** All service-to-service communication should be encrypted.
6. **Use mTLS** for sensitive internal service communication.

## What's next

- [Authentication](authentication.md) — Secure service endpoints with OAuth 2.0, JWT, and mTLS
- [Compliance considerations](compliance-considerations.md) — Audit logging and data protection
- [Runtime security](runtime-security.md) — Additional runtime security settings
- [Access AWS Services Securely](aws-access.md) — IAM role-based credentials for AWS connectors
- [WSO2 Integrator on AWS](../../aws.md) — Everything WSO2 Integrator offers on AWS
