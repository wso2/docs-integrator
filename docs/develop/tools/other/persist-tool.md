---
title: Persist tool
---

# Persist Tool

The `bal persist` tool generates type-safe client APIs for data persistence across multiple data stores. You define your data model using Ballerina record types, and the tool generates the client code to perform CRUD operations without writing store-specific queries.

## Supported data stores

| Data store | Module |
|---|---|
| In-memory tables | Built-in |
| MySQL | `ballerinax/persist.sql` |
| PostgreSQL | `ballerinax/persist.sql` |
| MSSQL | `ballerinax/persist.sql` |
| Google Sheets | `ballerinax/persist.googlesheets` |
| Redis | `ballerinax/persist.redis` |

## Connect to a database

The Visual Designer provides a guided wizard to connect to an existing database, introspect its tables, and generate a type-safe connection.

### Step 1: Add a connection

1. In the **Artifacts** page, click **Connection** under **Other Artifacts**.
2. In the **Add Connection** panel, select **Connect to a Database**. The supported database systems are **MySQL**, **MSSQL**, and **PostgreSQL**.

   ![Add connection panel](/img/develop/tools/persist-tool/add-connection.png)

### Step 2: Introspect database

1. Select the **Database System** (MySQL, MSSQL, or PostgreSQL).
2. Enter the database credentials:
   - **Host** — Database server host address.
   - **Port** — Database server port (for example, `3306` for MySQL).
   - **Database** — Name of the database to connect.
   - **User** — Database username.
   - **Password** — Database user password.
3. Click **Connect & Introspect Database**.

   ![Introspect database credentials](/img/develop/tools/persist-tool/introspect-database.png)

### Step 3: Select tables

1. Choose which tables to include in this connector. You can search for tables or click **Select All**.
2. Click **Continue to Connection Details**.

   ![Select database tables](/img/develop/tools/persist-tool/select-tables.png)

### Step 4: Create connection

1. Enter a **Connection Name** (for example, `MySQLDatabase`).
2. Review the **Connection Configurables** — configurable variables are generated for the connection host, port, username, password, and database name with default values.
3. Click **Save**.

   ![Connection name and configurables](/img/develop/tools/persist-tool/connection-name.png)

### Working with the connection

Once the connection is saved, it appears in the design view as a connection artifact.

   ![Design view showing database connection](/img/develop/tools/persist-tool/design-view-connection.png)

Click **Edit** on the connection to update connection details. From the edit panel, you can:

- Click **Edit Connector** to modify the underlying database connector.
- Click **View ER Diagram** to visualize the entity relationships between the selected tables.
- Update connection settings such as **Host**, **Port**, **User**, **Password**, and **Database**.

   ![Edit connection panel](/img/develop/tools/persist-tool/edit-connection.png)

### Use connection functions in integration logic

When designing integration logic in the flow diagram, the connection functions appear in the **Connections** panel. These provide pre-built CRUD operations for each selected table, such as:

- Get rows / Get row
- Insert rows
- Update row
- Delete row

   ![Connection functions in flow designer](/img/develop/tools/persist-tool/connection-functions.png)

Each function provides advanced configuration options where you can set **Where Clause**, **Order By Clause**, **Limit Clause**, **Result** variable name, and **Target Type** to select specific fields from the table.

### Initialize a persist project

```bash
# Add persist support to an existing project
bal persist add

# Initialize persist directory and model file
bal persist init
```

This creates a `persist` directory with a `model.bal` file where you define your data model.

### Define a data model

Define entities as Ballerina record types in `persist/model.bal`. Mark primary key fields as `readonly`:

```ballerina
type Employee record {|
    readonly int id;
    string name;
    string department;
    decimal salary;
|};

type Department record {|
    readonly string code;
    string name;
    Employee[] employees;
|};
```

When you have an active database, you could use `bal persist pull` command to introspect the specific database and generate the required model file

### Generate the client

```bash
# Generate client API (integrates with build)
bal persist generate --datastore mysql

# Introspect an existing database to generate the model
bal persist pull --datastore mysql --host localhost --port 3306 --user root --database mydb
```

### Use the generated client

The generated client provides type-safe resource methods for CRUD operations:

```ballerina
import ballerina/persist;

final Client sClient = check new ();

// Create a record
int[]|error ids = sClient->/employees.post([{
    id: 1, name: "Alice", department: "Engineering", salary: 5000.0
}]);

// Read a record by key
Employee|error emp = sClient->/employees/1;

// Update a record
Employee|error updated = sClient->/employees/1.put({salary: 6000.0});

// Delete a record
Employee|error deleted = sClient->/employees/1.delete();

// List all records
stream<Employee, error?> employees = sClient->/employees;
```

## Command reference

| Command | Description |
|---|---|
| `bal persist init` | Initialize persist directory and model file |
| `bal persist add` | Add persist support and configure build integration |
| `bal persist generate` | One-time client generation without build integration |
| `bal persist pull` | Introspect an existing database to generate the model |
| `bal persist migrate` | Generate SQL migration scripts (experimental) |
| `--datastore <type>` | Target data store (`mysql`, `mssql`, `postgresql`, `googlesheets`, `redis`, `inmemory`) |
