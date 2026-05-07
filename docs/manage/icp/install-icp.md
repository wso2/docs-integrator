---
title: Install ICP
---

# Install ICP

This guide covers manual installation. For evaluation, run via WSO2 Integrator IDE [Integration Control Plane (ICP)](../../deploy-operate/observe/icp.md).

## Prerequisites

- **Java 21** or later
- A supported OS: Linux, macOS, or Windows

For production deployments you also need one of the supported databases
(PostgreSQL, MySQL, or MSSQL). The default embedded H2 database is suitable for
evaluation and development only.

## Install

1. Download the ICP distribution zip (e.g.
   `wso2-integration-control-plane-2.0.0.zip`).

2. Extract it:

   ```bash
   unzip wso2-integration-control-plane-2.0.0.zip
   cd wso2-integration-control-plane-2.0.0
   ```

3. The extracted directory has this layout:

   ```
   wso2-integration-control-plane-2.0.0/
     bin/
       icp.sh              # startup script (Linux / macOS)
       icp.bat             # startup script (Windows)
       icp-server.jar      # server binary
       database/            # embedded H2 database files
     conf/
       deployment.toml      # main configuration file
       security/            # keystores and cipher config
     www/                   # console frontend
     lib/                   # runtime libraries
   ```

## Configure

All configuration lives in `conf/deployment.toml`. The defaults work
out of the box for local evaluation — ICP will start with the embedded H2
database, listen on `https://localhost:9445`, and create an `admin` user.

### Essential Settings

| Setting                  | Default                  | Description                              |
| ------------------------ | ------------------------ | ---------------------------------------- |
| `serverPort`             | `9445`                   | HTTPS port for the console and API       |
| `serverHost`             | `0.0.0.0`                | Bind address                             |
| `logLevel`               | `INFO`                   | `DEBUG`, `INFO`, `WARN`, or `ERROR`      |
| `frontendJwtHMACSecret`  | (default key)            | JWT signing secret — change in production |

Full reference: [Server Configuration](../../reference/icp/server-configuration.md).

### Database

By default ICP uses an embedded H2 database stored in `bin/database/`. For
production, switch to PostgreSQL, MySQL, or MSSQL by uncommenting and editing
the `[icp_server.storage]` section in `deployment.toml`:

```toml
[icp_server.storage]
dbType   = "postgresql"
dbHost   = "db.example.com"
dbPort   = 5432
dbName   = "icp_database"
dbUser   = "icp_user"
dbPassword = "changeme"
```

A separate credentials database stores user passwords. Configure it with the
`credentialsDb*` settings if you want credential storage on the same external
database:

```toml
credentialsDbType     = "postgresql"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 5432
credentialsDbName     = "credentialsdb"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

When using H2 (the default), no database configuration is needed.

Full reference: [Database Configuration](../../reference/icp/database-configuration.md).

### OpenSearch (Observability)

To enable centralized logs and metrics, point ICP at an OpenSearch instance.
Add these keys **before the first `[section]` header** in `deployment.toml`:

```toml
opensearchUrl = "https://localhost:9200"
opensearchUsername = "admin"
opensearchPassword = "<your-opensearch-password>"
```

If OpenSearch runs without TLS, use `http://`. Skip this section if you don't
need observability yet — see [Observability Setup](observability-setup.md) for
the full stack (OpenSearch, Fluent Bit, index templates).

The ICP config file ships with `opensearchUrl`, `opensearchUsername`, and `opensearchPassword` commented out near the bottom, after `[ballerina.http.traceLogAdvancedConfig]`. **Do not uncomment those lines.** Because they fall under a `[section]` header, Ballerina treats them as section-scoped values and rejects them. Always add the OpenSearch keys **before the first `[section]` header** — ideally the very first lines of the file.

### Reverse Proxy

ICP serves the console, API, and runtime listener on a single HTTPS port
(`9445` by default). To expose ICP through a reverse proxy:

1. Point the proxy at `https://<icp-host>:9445` (the backend is HTTPS with a
   self-signed certificate, so configure the proxy to trust it or skip
   verification for the upstream).

2. Tell ICP the external URL so the console can reach the API. Add these to
   `deployment.toml`:

   ```toml
   backendGraphqlEndpoint      = "https://icp.example.com/graphql"
   backendAuthBaseUrl           = "https://icp.example.com/auth"
   backendObservabilityEndpoint = "https://icp.example.com/icp/observability"
   ```

3. BI runtimes connect to ICP for heartbeats. If they also go through the
   proxy, set `serverUrl` in the runtime's `Config.toml` to the proxy URL:

   ```toml
   [wso2.icp.runtime.bridge]
   serverUrl = "https://icp.example.com"
   ```

   If runtimes connect directly (bypassing the proxy), leave `serverUrl`
   pointing at the ICP host.

## Start

Linux / macOS:

```bash
./bin/icp.sh
```

Windows:

```bat
bin\icp.bat
```

The server logs its startup to the console. Once you see the listener ready
message, ICP is available at `https://localhost:9445`.

**Note:** ICP ships with a self-signed certificate. Your browser will show a
security warning on first visit — accept it to proceed.

## Sign In

Navigate to `https://<host>:9445/login`. Enter username `admin` and password
`admin`, then click **Sign In**.

After login the browser redirects to the organization home at
`https://<host>:9445/organizations/default`.

**Warning:** Change the default admin password immediately via **Access-control**
> **Users** > **Reset Password**. See [Access Control](access-control.md) for
details.

To configure LDAP, SSO/OIDC, or other authentication backends, see [Authentication Configuration](../../reference/icp/authentication-config.md).

## Defaults

ICP ships with these resources out of the box:

| Resource     | Defaults                                                     |
| ------------ | ------------------------------------------------------------ |
| Organization | **Default Organization** (`default`)                         |
| Environments | **dev** (Non-Critical), **prod** (Critical)                  |
| Roles        | Admin, Developer, Project Admin, Super Admin, Viewer         |
| Groups       | Super Admins, Administrators, Developers                     |
| User         | `admin` / `admin` (member of Super Admins)                   |

When a project is created, ICP also auto-creates a
`<Project Name> Admins` group with the *Project Admin* role.

## Next Steps

1. **[ICP Console Overview](icp-console-overview.md)** — Learn the console layout and navigation.
2. **[Connect an Integration to ICP](connect-runtime.md)** — Register a BI runtime with heartbeats.
3. **[Observability Setup](observability-setup.md)** — Add centralized logs and metrics.
