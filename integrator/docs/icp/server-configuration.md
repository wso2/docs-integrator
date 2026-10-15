---
title: Server Configuration
---

# Server Configuration

All values are set in `<ICP_HOME>/conf/deployment.toml`. Commented-out keys show default values.

## Server settings

| Key                                  | Type      | Default     | Description                                                           |
| ------------------------------------ | --------- | ----------- | --------------------------------------------------------------------- |
| `serverPort`                         | `int`     | `9446`      | HTTPS port for all ICP endpoints                                      |
| `serverHost`                         | `string`  | `"0.0.0.0"` | Bind address                                                          |
| `logLevel`                           | `string`  | `"INFO"`    | Log verbosity — `DEBUG`, `INFO`, `WARN`, `ERROR`                      |
| `enableAuditLogging`                 | `boolean` | `true`      | Enable audit log for authentication and management events             |
| `enableMetrics`                      | `boolean` | `true`      | Expose Prometheus metrics endpoint                                    |
| `schedulerIntervalSeconds`           | `int`     | `60`        | How often ICP checks for inactive runtimes and marks them as offline |
| `refreshTokenCleanupIntervalSeconds` | `int`     | `86400`     | How often expired refresh tokens are purged from the database         |

## Backend endpoint settings

These values default to `localhost:9446` and must be updated when ICP is accessed through a different hostname or behind a reverse proxy.

| Key                             | Type     | Default                                       | Description                                          |
| ------------------------------- | -------- | --------------------------------------------- | ---------------------------------------------------- |
| `backendGraphqlEndpoint`        | `string` | `"https://localhost:9446/graphql"`            | URL of the ICP GraphQL API endpoint                  |
| `backendAuthBaseUrl`            | `string` | `"https://localhost:9446/auth"`               | Base URL of the ICP authentication service           |
| `backendObservabilityEndpoint`  | `string` | `"https://localhost:9446/icp/observability"`  | URL of the ICP observability endpoint                |

## Authentication settings

| Key                          | Type      | Default                    | Description                                                       |
| ---------------------------- | --------- | -------------------------- | ----------------------------------------------------------------- |
| `authBackendUrl`             | `string`  | `"https://localhost:9447"` | URL of the authentication backend service                         |
| `frontendJwtHMACSecret`      | `string`  | —                          | HMAC-SHA256 secret for signing JWT tokens (minimum 32 characters) |
| `defaultTokenExpiryTime`     | `int`     | `3600`                     | JWT access token lifetime in seconds                              |
| `refreshTokenExpiryTime`     | `int`     | `86400`                    | Refresh token lifetime in seconds (default: 1 day)                |
| `enableRefreshTokenRotation` | `boolean` | `true`                     | Rotate refresh token on each use                                  |
| `maxRefreshTokensPerUser`    | `int`     | `10`                       | Maximum active refresh tokens per user (`0` = unlimited)          |

## MI management access settings

| Key               | Type      | Default | Description |
| ----------------- | --------- | ------- | ----------- |
| `miTunnelEnabled` | `boolean` | `false` | Send management requests to MI runtimes in heartbeat responses instead of calling each runtime's management API directly. Use this when ICP cannot reach the MI management API, for example when MI runs behind a load balancer. Requires WSO2 Integrator: MI 4.7.0 or later. |

Add `miTunnelEnabled` before the first `[section]` header and restart ICP. For details, see [Connect MI behind a load balancer](https://mi.docs.wso2.com/en/4.7.0/install-and-setup/install/connecting-an-integration-to-icp/#connect-mi-behind-a-load-balancer) in the MI documentation.

## Runtime management TLS settings

ICP calls each runtime's management API directly, over HTTPS, to show artifact source and WSDLs, change loggers, enable or disable artifacts, and toggle tracing and statistics. These settings control how ICP verifies the certificate the runtime presents. They don't apply to MI runtimes when `miTunnelEnabled` is `true`, because ICP then doesn't call the MI management API directly.

`artifactsApiTrustStorePath` and `artifactsApiTrustStorePassword` are available from ICP 2.1.0. For earlier versions, see [Trust an internal CA on ICP 2.0.0](#trust-an-internal-ca-on-icp-200).

| Key                              | Section                | Type      | Default | Description                                                                                                  |
| -------------------------------- | ---------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `artifactsApiAllowInsecureTLS`   | top level              | `boolean` | `true`  | Skip certificate validation for the console's management calls (artifact source, WSDL, loggers, MI users)  |
| `artifactsApiAllowInsecureTLS`   | `[icp_server.storage]` | `boolean` | `true`  | Skip certificate validation for artifact control commands (enable, disable, statistics) and tracing changes |
| `artifactsApiTrustStorePath`     | `[icp_server.storage]` | `string`  | `""`    | JKS or PKCS12 truststore used to validate runtime certificates. Empty uses the JVM's default `cacerts`      |
| `artifactsApiTrustStorePassword` | `[icp_server.storage]` | `string`  | `""`    | Password of the truststore. Can be encrypted with the cipher tool (see [Encrypt Secrets](encrypt-secrets.md)) |

`artifactsApiAllowInsecureTLS` appears in two places, and each controls a different set of calls. Set both to `false` in production.

### Trust a runtime certificate issued by an internal CA

When a runtime, or a gateway in front of it, presents a certificate issued by a private or internal CA:

1. Create a truststore that contains the CA certificate:

    ```bash
    keytool -importcert -alias internal-ca -file internal-ca.crt \
      -storetype PKCS12 -keystore ../conf/security/mi-truststore.p12 \
      -storepass <truststore-password>
    ```

2. Configure it in `<ICP_HOME>/conf/deployment.toml`. Add the top-level key before any `[icp_server.*]` table:

    ```toml
    artifactsApiAllowInsecureTLS = false

    [icp_server.storage]
    artifactsApiAllowInsecureTLS = false
    artifactsApiTrustStorePath = "../conf/security/mi-truststore.p12"
    artifactsApiTrustStorePassword = "<truststore-password>"
    ```

    If you use a relative path, it is resolved from `<ICP_HOME>/bin`, because ICP is started from the `bin` directory.

3. Restart ICP.

The truststore replaces the JVM's default `cacerts` for these calls. If some runtimes use publicly signed certificates, import those CAs into the truststore as well. The certificate's host name must match the runtime's management hostname.

ICP fails to start if the truststore cannot be loaded, for example if the file is missing, the password is wrong, or the file is not a JKS or PKCS12 store. ICP logs a warning at startup if a truststore is set while either `artifactsApiAllowInsecureTLS` is still `true`, because the truststore is not used while validation is off.

### Trust an internal CA on ICP 2.0.0

ICP 2.0.0 has no truststore setting for these calls. To keep validation on, import the CA into the `cacerts` of the JRE that runs ICP, set both `artifactsApiAllowInsecureTLS` keys to `false`, and restart ICP:

```bash
keytool -importcert -alias internal-ca -file internal-ca.crt -cacerts -storepass changeit
```

This change applies to the whole JVM and is lost when the JRE is upgraded.
