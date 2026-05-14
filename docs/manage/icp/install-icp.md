---
title: Install ICP
---

# Install ICP

The Integration Control Plane (ICP) is a self-hosted management server that connects to your WSO2 Integrator runtimes and provides centralized monitoring, lifecycle management, and access control. This page walks you through downloading, configuring, and starting ICP on your own infrastructure.

This guide covers manual installation. For evaluation, run via WSO2 Integrator IDE [Integration Control Plane (ICP)](../../deploy-operate/observe/integration-control-plane-icp.md).

:::info Prerequisites

- Java 21 or later
- A supported OS: Linux, macOS, or Windows
- For production deployments: a supported database (PostgreSQL, MySQL, or MSSQL). The default embedded H2 database is suitable for evaluation and development only.

## Install

1. Download `wso2-integration-control-plane-2.0.0.zip` from the [ICP releases page](https://github.com/wso2/integration-control-plane/releases/tag/v2.0.0).

2. Extract the zip and navigate into the directory.




   ```bash
   unzip wso2-integration-control-plane-2.0.0.zip
   cd wso2-integration-control-plane-2.0.0
   ```




   ```powershell
   Expand-Archive -Path wso2-integration-control-plane-2.0.0.zip -DestinationPath .
   cd wso2-integration-control-plane-2.0.0
   ```




3. The extracted directory has this layout:

   ```bash
   wso2-integration-control-plane-2.0.0/
     bin/
       icp.sh                  # startup script (Linux / macOS)
       icp.bat                 # startup script (Windows)
       icp-server.jar          # server binary
       ciphertool.sh           # cipher tool (Linux / macOS)
       ciphertool.bat          # cipher tool (Windows)
       database/
         icp_db.mv.db          # embedded H2 database
         credentials_db.mv.db  # embedded H2 credentials database
     conf/
       deployment.toml                   # main configuration file
       cipher-standalone-config.properties
       security/               # keystores and TLS certificates
     dbscripts/                # SQL init scripts for PostgreSQL, MySQL, and MSSQL
     ciphertool-libs/          # cipher tool dependencies
     www/                      # console frontend
     lib/                      # runtime libraries
   ```

## Configure

All configuration lives in `conf/deployment.toml`. The defaults work out of the box for local evaluation. ICP starts with the embedded H2 database,
listens on `https://localhost:9446`, and creates an `admin` user.

### Essential settings

The table below covers the settings most commonly changed. All other settings are documented inline in `deployment.toml`.

| Setting | Default | Description |
| --- | --- | --- |
| `serverPort` | `9446` | HTTPS port for the ICP console and API |
| `serverHost` | `0.0.0.0` | IP address ICP binds to. Restrict to a specific interface in production. |
| `logLevel` | `INFO` | Log verbosity: `DEBUG`, `INFO`, `WARN`, or `ERROR` |
| `schedulerIntervalSeconds` | `60` | How often ICP polls connected runtimes for status, in seconds. |
| `frontendJwtHMACSecret` | (default key) | JWT signing secret for user sessions. Change this before going to production. |

Full reference: [Server Configuration](../../reference/icp/server-configuration.md).

### Database

ICP uses two embedded H2 databases by default, stored in `bin/database/`:

- `icp_db.mv.db` — runtime data (artifacts, environments, projects)
- `credentials_db.mv.db` — user credentials

No configuration is needed for local evaluation or development.

For production, switch to PostgreSQL, MySQL, or MSSQL using the steps below.

**Step 1: Initialize the schema**

The `dbscripts/` directory contains init scripts for each supported database. Run the two scripts that match your database type:

| Database | Main schema | Credentials schema |
| --- | --- | --- |
| PostgreSQL | `postgresql_init.sql` | `credentials_postgresql_init.sql` |
| MySQL | `mysql_init.sql` | `credentials_mysql_init.sql` |
| MSSQL | `mssql_init.sql` | `credentials_mssql_init.sql` |

**Step 2: Configure the main database**

Uncomment and edit the `[icp_server.storage]` section in `deployment.toml`:

```toml
[icp_server.storage]
dbType                = "postgresql"
dbHost                = "localhost"
dbPort                = 5432
dbName                = "icp_database"
dbUser                = "icp_user"
dbPassword            = "changeme"
maxOpenConnections    = 10
minIdleConnections    = 5
maxConnectionLifeTime = 1800.0
```

```toml
[icp_server.storage]
dbType                = "mysql"
dbHost                = "localhost"
dbPort                = 3306
dbName                = "icp_database"
dbUser                = "icp_user"
dbPassword            = "changeme"
maxOpenConnections    = 10
minIdleConnections    = 5
maxConnectionLifeTime = 1800.0
```

```toml
[icp_server.storage]
dbType                = "mssql"
dbHost                = "localhost"
dbPort                = 1433
dbName                = "icp_database"
dbUser                = "icp_user"
dbPassword            = "changeme"
maxOpenConnections    = 10
minIdleConnections    = 5
maxConnectionLifeTime = 1800.0
```

**Step 3: Configure the credentials database**

The credentials database is configured separately at the top level of `deployment.toml`, before any `[section]` header:

```toml
credentialsDbType     = "postgresql"
credentialsDbHost     = "localhost"
credentialsDbPort     = 5432
credentialsDbName     = "credentials_db"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

Full reference: [Database Configuration](../../reference/icp/database-configuration.md).

## Start

```bash
./bin/icp.sh
```

```bat
.\bin\icp.bat
```

The server logs its startup to the console. Once you see the listener ready message, ICP is available at `https://localhost:9446`.

ICP ships with a self-signed certificate. Your browser will show a security warning on first visit. Accept the warning to proceed.

## Sign in

Once ICP is running, open `https://<host>:9446/login` in your browser and sign in with the default credentials:

- **Username:** `admin`
- **Password:** `admin`

Click **Sign In**. The browser redirects to the organization home at `https://<host>:9446/organizations/default`.

Change the default `admin` password before using ICP in any non-evaluation environment. Go to **Access control** > **Users**, select the `admin` user, and click **Reset Password**. See [Access Control](access-control.md) for details.

For LDAP, SSO, or OIDC authentication, see [Authentication Configuration](../../reference/icp/authentication-config.md).

## What's next

- [ICP console overview](icp-console-overview.md) — learn the console layout, scope levels, and navigation
- [Quick start](quick-start.md) — go from a fresh installation to a connected runtime in four steps
- [Configure a reverse proxy](reverse-proxy.md) — expose ICP through a proxy in production
