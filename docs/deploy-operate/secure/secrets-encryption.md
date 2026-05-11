---
title: Secrets and Encryption
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

Fetch secrets from Vault at startup using a Ballerina initialization function:

```ballerina
import ballerina/http;

configurable string vaultAddr = "https://vault.example.com";
configurable string vaultToken = ?;

final http:Client vaultClient = check new (vaultAddr, {
    auth: {token: vaultToken}
});

function getSecret(string path) returns string|error {
    json response = check vaultClient->get("/v1/secret/data/" + path);
    return (check response.data.data).toString();
}
```

For production, use the Vault Agent sidecar pattern to inject secrets as environment variables or files.

## AWS Secrets Manager

```ballerina
import ballerinax/aws.secretsmanager;

secretsmanager:Client smClient = check new ({
    region: "us-east-1",
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

string dbPassword = check smClient->getSecretValue("prod/db/password");
```

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
