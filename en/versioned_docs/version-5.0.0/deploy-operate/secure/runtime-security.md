---
sidebar_position: 2
title: Runtime Security
description: Best practices for securing integrations in WSO2 Integrator at runtime, including JVM hardening, keystores, non-root execution, and network policies.
keywords: [wso2 integrator, runtime security, jvm hardening, non-root, container security, network policy]
---

# Runtime Security

Securing integrations in WSO2 Integrator at runtime involves hardening the JVM, managing keystores and certificates, running as non-root, and applying network-level controls. This page covers production security best practices.

:::info Prerequisites
- WSO2 Integrator installed and a working integration ([Install guide](../../get-started/setup/local-setup.md))
- A target environment: Linux VM, Docker, or Kubernetes cluster
:::

## JVM hardening

### Disable unnecessary features

```bash
java \
  -Djava.security.manager \
  -Djava.rmi.server.hostname=localhost \
  -Dcom.sun.management.jmxremote=false \
  -XX:+UseG1GC \
  -jar my_integration.jar
```

### Recommended JVM security flags

| Flag | Purpose |
|------|---------|
| `-Djava.security.manager` | Enable the Java Security Manager |
| `-Dcom.sun.management.jmxremote=false` | Disable remote JMX access |
| `-Djava.rmi.server.hostname=localhost` | Restrict RMI to localhost |
| `-XX:+UseContainerSupport` | Respect container memory limits |
| `-XX:MaxRAMPercentage=75.0` | Limit heap to 75% of available RAM |

### Use the latest JDK

Always run on a supported, patched JDK version. Subscribe to security advisories:

```bash
java -version
# Ensure JDK 17.0.x or later with latest patch
```

## Keystores and Truststores

Creating keystores and truststores is covered in detail in [Keystores and Truststores](keystore-truststore.md). That page covers:

- Generating keystores and truststores using `keytool`
- Configuring TLS and mutual TLS for HTTP and gRPC services
- Keeping certificate paths and passwords out of source code using `Config.toml` and environment variables

## Non-root execution

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

## File system security

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

## Network security

### Restrict listening interfaces

Bind to specific interfaces instead of `0.0.0.0`:

```toml
[ballerinax.prometheus]
host = "127.0.0.1"  # Only local access to metrics
port = 9797
```

### Kubernetes network policies

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

## Security checklist

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

## See also

- [Keystores and Truststores](keystore-truststore.md) — Create and configure TLS certificates, keystores, and truststores
- [Authentication](authentication.md) — Configure authentication for services
- [API Security and Rate Limiting](api-security-rate-limiting.md) — Secure your API endpoints
- [Secrets and Encryption](secrets-encryption.md) — Manage secrets and encryption
