---
title: Server Configuration
description: Complete key reference for ICP Server configuration settings in deployment.toml.
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
