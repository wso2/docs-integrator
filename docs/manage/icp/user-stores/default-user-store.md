---
title: Built-in User Store
---

# Built-in User Store

The built-in user store keeps user credentials — password hashes, salts, and per-user attributes such as failed-login counters — in a dedicated **credentials database**, separate from the main ICP database that holds projects, environments, and integration metadata.

By default both databases use the embedded H2 engine, writing to `<ICP_HOME>/bin/database/`. For production, switch the credentials database to PostgreSQL, MySQL, or MSSQL.

---

## Default Setup (H2)

No configuration is needed. ICP creates the H2 credentials database automatically on first start, initializes the schema, and seeds an `admin` user with password `admin`.

H2 is for evaluation and development only. For production deployments, use PostgreSQL, MySQL, or MSSQL.

The default `admin` / `admin` credentials are publicly known. Change the password immediately after first login via **Profile** > **Change Password**.

---

## Connecting an External Database

### Step 1 — Create the database and user

Create a dedicated database and user on the database server. The user needs `CREATE`, `INSERT`, `UPDATE`, `DELETE`, and `SELECT` privileges on the credentials database.

### Step 2 — Initialize the schema

Run the appropriate init script to create the `user_credentials` and `user_attributes` tables and seed the default `admin` user. The scripts are included in the ICP distribution:

| Database   | Init script                                  |
| ---------- | -------------------------------------------- |
| PostgreSQL | `db-scripts/credentials_postgresql_init.sql` |
| MySQL      | `db-scripts/credentials_mysql_init.sql`      |
| MSSQL      | `db-scripts/credentials_mssql_init.sql`      |

Example for PostgreSQL:

```bash
psql -h <host> -U <admin_user> -d <credentials_db> \
  -f db-scripts/credentials_postgresql_init.sql
```

The init script seeds the `admin` user with a bcrypt hash of the default password `admin`.

The default `admin` / `admin` credentials are publicly known. Change the password immediately after first login via **Profile** > **Change Password**.

### Step 3 — Configure deployment.toml

Add the `credentialsDb*` keys as **top-level entries** in `<ICP_HOME>/conf/deployment.toml`, before any `[section]` header:

```toml
credentialsDbType     = "postgresql"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 5432
credentialsDbName     = "credentials_db"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

These keys must be top-level entries, **not** inside the `[icp_server.storage]` section. The `[icp_server.storage]` section controls the main ICP database (projects, environments, etc.), which is configured independently.

| Key | Default | Description |
| --- | ------- | ----------- |
| `credentialsDbType` | `h2` | Database engine: `h2`, `postgresql`, `mysql`, or `mssql` |
| `credentialsDbHost` | `localhost` | Database server hostname (not used for H2) |
| `credentialsDbPort` | `5432` | Database port (not used for H2) |
| `credentialsDbName` | `credentials_db` | Name of the credentials database |
| `credentialsDbUser` | `icp_user` | Database user |
| `credentialsDbPassword` | `icp_password` | Database password — **must be changed in production** |

Default ports: PostgreSQL `5432`, MySQL `3306`, MSSQL `1433`.

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
