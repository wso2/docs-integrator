---
title: Built-in User Store
---

# Built-in User Store

The built-in user store keeps user credentials (password hashes, salts, and per-user attributes such as failed-login counters) in a dedicated **credentials database**, separate from the main ICP database that holds projects, environments, and integration metadata.

By default both databases use the embedded H2 engine, writing to `<ICP_HOME>/bin/database/`. For production, switch the credentials database to PostgreSQL, MySQL, MSSQL, or Oracle.

## Default Setup (H2)

No configuration is needed. The ICP distribution ships with pre-initialized H2 database files in `<ICP_HOME>/bin/database/`, and the credentials database contains an `admin` user with password `admin`. ICP does not initialize the H2 schema itself, so if these files are deleted, sign-in fails. Restore them from the ICP distribution.

H2 is for evaluation and development only. For production deployments, use PostgreSQL, MySQL, MSSQL, or Oracle.

The default `admin` / `admin` credentials are publicly known. Change the password immediately after first login via **Profile** > **Change Password**.

---

## Connecting an External Database

### Step 1: Create the database and user

Create a dedicated database and user on the database server. The user needs `CREATE`, `INSERT`, `UPDATE`, `DELETE`, and `SELECT` privileges on the credentials database.

**PostgreSQL example:**

```sql
CREATE DATABASE credentials_db;
CREATE USER <icp_user> WITH PASSWORD '<icp_user_password>';
GRANT CONNECT ON DATABASE credentials_db TO <icp_user>;
\c credentials_db
GRANT USAGE, CREATE ON SCHEMA public TO <icp_user>;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO <icp_user>;
```

### Step 2: Initialize the schema

Run the appropriate init script to create the `user_credentials` and `user_attributes` tables and seed the default `admin` user. The scripts are located in the ICP installation directory:

| Database   | Init script                                  |
| ---------- | -------------------------------------------- |
| PostgreSQL | `dbscripts/credentials_postgresql_init.sql`  |
| MySQL      | `dbscripts/credentials_mysql_init.sql`       |
| MSSQL      | `dbscripts/credentials_mssql_init.sql`       |
| Oracle     | `dbscripts/credentials_oracle_init.sql`      |

Example for PostgreSQL:

```bash
psql -h <hostname> -U <icp_user> -d credentials_db -f dbscripts/credentials_postgresql_init.sql
```

The init script seeds the `admin` user with a bcrypt hash of the default password `admin`.

The default `admin` / `admin` credentials are publicly known. Change the password immediately after first login via **Profile** > **Change Password**.

### Step 3: Configure deployment.toml

Add the `credentialsDb*` keys as **top-level entries** in `<ICP_HOME>/conf/deployment.toml`, before any `[section]` header:

```toml
credentialsDbType     = "postgresql"
credentialsDbHost     = "<hostname>"
credentialsDbPort     = 5432
credentialsDbName     = "credentials_db"
credentialsDbUser     = "<icp_user>"
credentialsDbPassword = "<icp_user_password>"
```

These keys must be top-level entries, **not** inside the `[icp_server.storage]` section. The `[icp_server.storage]` section controls the main ICP database (projects, environments, etc.), which is configured independently.

| Key | Default | Description |
| --- | ------- | ----------- |
| `credentialsDbType` | `h2` | Database engine: `h2`, `postgresql`, `mysql`, `mssql`, or `oracle` |
| `credentialsDbHost` | `localhost` | Database server hostname (not used for H2) |
| `credentialsDbPort` | `5432` | Database port (not used for H2). Set it explicitly for engines other than PostgreSQL. |
| `credentialsDbName` | `credentials_db` | Name of the credentials database |
| `credentialsDbUser` | `icp_user` | Database user |
| `credentialsDbPassword` | `icp_password` | Database password — **must be changed in production** |
| `credentialsDbUseTLS` | `false` | Connect to Oracle over TLS (TCPS), for example for Oracle Autonomous Database. Only used for Oracle. |

Default ports: PostgreSQL `5432`, MySQL `3306`, MSSQL `1433`, Oracle `1521`.

#### Database-specific examples

**MySQL**

```toml
credentialsDbType     = "mysql"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 3306
credentialsDbName     = "credentials_db"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

**Microsoft SQL Server**

```toml
credentialsDbType     = "mssql"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 1433
credentialsDbName     = "credentials_db"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

**Oracle**

```toml
credentialsDbType     = "oracle"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 1521
credentialsDbName     = "<service_name>"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

---

## Account lockout

After `lockoutThreshold` consecutive failed sign-in attempts, ICP locks the account for `lockoutBaseMinutes`. Each further set of `lockoutThreshold` failures doubles the lockout, up to `lockoutMaxMinutes`. A successful sign-in resets the counter, and an administrator can unlock the account earlier. Add these keys as top-level entries in `<ICP_HOME>/conf/deployment.toml`:

| Key | Default | Description |
| --- | ------- | ----------- |
| `lockoutThreshold` | `5` | Failed attempts before the account is locked. Set to `0` to disable lockout. |
| `lockoutBaseMinutes` | `15` | Duration of the first lockout, in minutes |
| `lockoutMaxMinutes` | `60` | Maximum lockout duration, in minutes |
