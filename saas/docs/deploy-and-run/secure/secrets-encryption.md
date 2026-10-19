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
3. **Use environment variables for production secrets** rather than files checked into version control.
4. **Rotate secrets regularly.** Use short-lived tokens where possible.
5. **Enable TLS everywhere.** All service-to-service communication should be encrypted.
6. **Use mTLS** for sensitive internal service communication.

## What's next

- [Authentication](authentication.md) — Secure service endpoints with OAuth 2.0, JWT, and mTLS
- [Compliance considerations](compliance-considerations.md) — Audit logging and data protection
- [Runtime security](runtime-security.md) — Additional runtime security settings
