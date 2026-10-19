---
title: Runtime Security
---

# Runtime Security

Securing an integration on WSO2 Cloud involves managing keystores and certificates and applying network-level controls at the application level. WSO2 Cloud manages the underlying runtime and JVM for you.

:::info Prerequisites
- WSO2 Integrator set up and a working integration ([Cloud setup](../../get-started/setup/setup.md))

## Keystores and Truststores

Creating keystores and truststores is covered in detail in [Keystores and Truststores](keystore-truststore.md). That page covers:

- Generating keystores and truststores using `keytool`
- Configuring TLS and mutual TLS for HTTP and gRPC services
- Keeping certificate paths and passwords out of source code using `Config.toml` and environment variables

## Network security

Bind listeners to specific interfaces instead of `0.0.0.0` where you don't need external access, for example, to keep a metrics endpoint local:

```toml
[ballerinax.prometheus]
host = "127.0.0.1"  # Only local access to metrics
port = 9797
```

## Security checklist

| Item | Status |
|------|--------|
| Enable TLS for all listeners | Required |
| Use PKCS12 keystores (not JKS) | Recommended |
| Rotate certificates before expiry | Required |
| Encrypt secrets in Config.toml | Required |

## See also

- [Keystores and Truststores](keystore-truststore.md) — Create and configure TLS certificates, keystores, and truststores
- [Authentication](authentication.md) — Configure authentication for services
- [API Security and Rate Limiting](api-security-rate-limiting.md) — Secure your API endpoints
- [Secrets and Encryption](secrets-encryption.md) — Manage secrets and encryption
