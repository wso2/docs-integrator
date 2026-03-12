---
sidebar_position: 6
title: Runtime Security
description: Best practices for securing Ballerina integrations at runtime -- JVM hardening, keystores, non-root execution, and network policies.
---

# Runtime Security

Securing your Ballerina integrations at runtime involves hardening the JVM, managing keystores and certificates, running as non-root, and applying network-level controls. This page covers production security best practices.

## JVM Hardening

### Disable Unnecessary Features

```bash
java \
  -Djava.security.manager \
  -Djava.rmi.server.hostname=localhost \
  -Dcom.sun.management.jmxremote=false \
  -XX:+UseG1GC \
  -jar my_integration.jar
```

### Recommended JVM Security Flags

| Flag | Purpose |
|------|---------|
| `-Djava.security.manager` | Enable the Java Security Manager |
| `-Dcom.sun.management.jmxremote=false` | Disable remote JMX access |
| `-Djava.rmi.server.hostname=localhost` | Restrict RMI to localhost |
| `-XX:+UseContainerSupport` | Respect container memory limits |
| `-XX:MaxRAMPercentage=75.0` | Limit heap to 75% of available RAM |

### Use the Latest JDK

Always run on a supported, patched JDK version. Subscribe to security advisories:

```bash
java -version
# Ensure JDK 17.0.x or later with latest patch
```

## Keystores and Certificates

### Creating a Keystore

Generate a keystore for TLS:

```bash
keytool -genkeypair \
  -alias integration-server \
  -keyalg RSA \
  -keysize 2048 \
  -validity 365 \
  -keystore keystore.p12 \
  -storetype PKCS12 \
  -storepass changeit \
  -dname "CN=integration.example.com,O=MyOrg,L=City,ST=State,C=US"
```

### Configuring TLS in Ballerina

```ballerina
import ballerina/http;

listener http:Listener secureEP = new (9443, {
    secureSocket: {
        key: {
            path: "/opt/integrations/keystore.p12",
            password: "changeit"
        }
    }
});

service /api on secureEP {
    resource function get health() returns string {
        return "OK";
    }
}
```

### Mutual TLS (mTLS)

Enable client certificate verification:

```ballerina
listener http:Listener mtlsEP = new (9443, {
    secureSocket: {
        key: {
            path: "/opt/integrations/keystore.p12",
            password: "changeit"
        },
        mutualSsl: {
            cert: {
                path: "/opt/integrations/truststore.p12",
                password: "changeit"
            },
            verifyClient: http:REQUIRE
        }
    }
});
```

### Truststore Configuration

Configure trusted CA certificates for outbound connections:

```ballerina
final http:Client secureClient = check new ("https://api.example.com", {
    secureSocket: {
        cert: {
            path: "/opt/integrations/truststore.p12",
            password: "changeit"
        }
    }
});
```

### Certificate Rotation

Automate certificate rotation using a script or cert-manager (Kubernetes):

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: integration-cert
spec:
  secretName: integration-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  commonName: integration.example.com
  dnsNames:
    - integration.example.com
  renewBefore: 720h  # Renew 30 days before expiry
```

## Non-Root Execution

### Linux

Create a dedicated service account:

```bash
sudo useradd -r -s /usr/sbin/nologin ballerina
sudo chown -R ballerina:ballerina /opt/integrations
```

Run the integration as the `ballerina` user (see systemd unit file):

```ini
[Service]
User=ballerina
Group=ballerina
```

### Docker

Use a non-root user in your Dockerfile:

```dockerfile
FROM eclipse-temurin:17-jre
RUN addgroup --system ballerina && adduser --system --ingroup ballerina ballerina
COPY target/bin/my_integration.jar /app/my_integration.jar
COPY Config.toml /app/Config.toml
WORKDIR /app
USER ballerina
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "my_integration.jar"]
```

### Kubernetes

Set the security context in your Pod spec:

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 10001
    fsGroup: 10001
  containers:
    - name: integration
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
```

## File System Security

| Practice | Implementation |
|----------|---------------|
| Read-only root filesystem | Mount writable paths explicitly (logs, temp) |
| Restrict config file permissions | `chmod 600 Config.toml` |
| Separate data directories | Use dedicated volumes for logs and temp files |

```yaml
volumeMounts:
  - name: config
    mountPath: /app/Config.toml
    subPath: Config.toml
    readOnly: true
  - name: logs
    mountPath: /app/logs
  - name: tmp
    mountPath: /tmp
```

## Network Security

### Restrict Listening Interfaces

Bind to specific interfaces instead of `0.0.0.0`:

```toml
[ballerinax.prometheus]
host = "127.0.0.1"  # Only local access to metrics
port = 9797
```

### Kubernetes Network Policies

Restrict pod-to-pod communication:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: integration-policy
spec:
  podSelector:
    matchLabels:
      app: order-service
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: api-gateway
      ports:
        - protocol: TCP
          port: 9090
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database
      ports:
        - protocol: TCP
          port: 5432
```

## Security Checklist

| Item | Status |
|------|--------|
| Run as non-root user | Required |
| Enable TLS for all listeners | Required |
| Use PKCS12 keystores (not JKS) | Recommended |
| Set read-only root filesystem | Recommended |
| Drop all Linux capabilities | Recommended |
| Restrict network with policies | Recommended |
| Disable JMX remote access | Required |
| Use latest patched JDK | Required |
| Rotate certificates before expiry | Required |
| Encrypt secrets in Config.toml | Required |

## What's Next

- [Secrets & Encryption](secrets-encryption.md) -- Manage secrets and encryption
- [Authentication](authentication.md) -- Configure authentication for services
- [API Security](api-security.md) -- Secure your API endpoints
