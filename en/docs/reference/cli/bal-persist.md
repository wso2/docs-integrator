---
sidebar_position: 2
title: bal persist CLI
description: Reference for the bal persist CLI tool — init, generate, migrate, and push commands for data persistence.
---

# bal persist CLI

The `bal persist` tool provides CLI commands for working with Ballerina's persistence layer. It generates client APIs from data model definitions, manages database schema migrations, and supports multiple data stores including MySQL, MSSQL, PostgreSQL, SQLite, Google Sheets, Redis, and in-memory stores.

## Commands Overview

| Command | Description |
|---------|-------------|
| `bal persist init` | Initialize persistence in a Ballerina project |
| `bal persist generate` | Generate persistence client code from the data model |
| `bal persist migrate` | Create and manage database schema migrations |
| `bal persist push` | Push the data model schema directly to the data store |

## bal persist init

Initializes persistence support in the current Ballerina project by creating the required directory structure and a data model definition file.

### Syntax

```bash
bal persist init --datastore <datastore> --module <module>
```

### Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--datastore` | No | `inmemory` | Target data store: `mysql`, `mssql`, `postgresql`, `sqlite`, `googlesheets`, `redis`, `inmemory` |
| `--module` | No | — | Name of the submodule for persistence definitions |

### Example

```bash
# Initialize with MySQL data store
bal persist init --datastore mysql --module db

# Initialize with in-memory store (default)
bal persist init
```

This creates the following structure:

```
persist/
  model.bal       # Data model definitions
```

### Data Model Definition

Define your entities in the generated `persist/model.bal` file:

```ballerina
import ballerina/persist as _;

type Employee record {|
    readonly int id;
    string firstName;
    string lastName;
    string email;
    Department department;
|};

type Department record {|
    readonly int id;
    string name;
    Employee[] employees;
|};
```

## bal persist generate

Generates Ballerina client code from the data model definition. The generated code provides type-safe CRUD APIs for each entity.

### Syntax

```bash
bal persist generate --datastore <datastore> --module <module>
```

### Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--datastore` | Yes | — | Target data store: `mysql`, `mssql`, `postgresql`, `sqlite`, `googlesheets`, `redis`, `inmemory` |
| `--module` | Yes | — | Name of the module containing the data model |

### Example

```bash
# Generate MySQL persistence client
bal persist generate --datastore mysql --module db
```

Generated output:

```
generated/
  db/
    persist_client.bal       # Client API with CRUD operations
    persist_types.bal        # Type definitions
    persist_db_config.bal    # Data store configuration
    script.sql               # DDL script (for SQL data stores)
```

### Using the Generated Client

```ballerina
import myapp.db;

public function main() returns error? {
    db:Client dbClient = check new ();

    // Create
    int[] ids = check dbClient->/employees.post([{
        id: 1,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        departmentId: 1
    }]);

    // Read
    db:Employee emp = check dbClient->/employees/[1];

    // Read all with filter
    stream<db:Employee, error?> employees = dbClient->/employees;

    // Update
    db:Employee updated = check dbClient->/employees/[1].put({
        email: "jane.doe@example.com"
    });

    // Delete
    db:Employee deleted = check dbClient->/employees/[1].delete();
}
```

## bal persist migrate

Creates database migration scripts based on changes to the data model. This command compares the current data model with the previous state and generates incremental migration scripts.

### Syntax

```bash
bal persist migrate --datastore <datastore> --module <module> <migration-label>
```

### Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `migration-label` | Yes | A descriptive label for the migration (e.g., `add_email_column`) |

### Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--datastore` | Yes | — | Target data store: `mysql`, `mssql`, `postgresql` |
| `--module` | Yes | — | Name of the module containing the data model |

### Example

```bash
# Create a migration after modifying the data model
bal persist migrate --datastore mysql --module db add_phone_column
```

Generated output:

```
persist/
  migrations/
    20240115120000_add_phone_column/
      script.sql             # Migration SQL script
      model.bal              # Snapshot of the data model at this point
```

### Migration Script Example

```sql
-- AUTO-GENERATED FILE. DO NOT MODIFY.
-- Migration: add_phone_column

ALTER TABLE Employee ADD COLUMN phone VARCHAR(20);
```

## bal persist push

Pushes the current data model schema directly to the target data store. This is useful for development and testing environments where migration tracking is not needed.

### Syntax

```bash
bal persist push --datastore <datastore> --module <module>
```

### Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--datastore` | Yes | — | Target data store: `mysql`, `mssql`, `postgresql`, `sqlite` |
| `--module` | Yes | — | Name of the module containing the data model |

### Example

```bash
# Push schema to MySQL
bal persist push --datastore mysql --module db
```

:::warning
`bal persist push` drops and recreates tables. Use this only in development environments. For production, use `bal persist migrate`.
:::

## Supported Data Stores

| Data Store | `--datastore` Value | Migrations | Notes |
|------------|-------------------|------------|-------|
| MySQL | `mysql` | Yes | Full SQL support |
| Microsoft SQL Server | `mssql` | Yes | Full SQL support |
| PostgreSQL | `postgresql` | Yes | Full SQL support |
| SQLite | `sqlite` | No | File-based, no migration support |
| Google Sheets | `googlesheets` | No | Requires OAuth2 configuration |
| Redis | `redis` | No | Key-value store |
| In-Memory | `inmemory` | No | For testing and prototyping |

## See Also

- [bal Command Reference](bal-commands.md) -- All bal subcommands
- [Ballerina.toml Reference](/docs/reference/config/ballerina-toml) -- Project configuration
- [Databases Connector Guide](/docs/connectors/catalog/database) -- Database connectivity
