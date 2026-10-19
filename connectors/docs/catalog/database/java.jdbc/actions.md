---
title: Actions
---

# Actions

The `ballerinax/java.jdbc` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Executes SQL queries, DML statements, batch operations, and stored procedure calls against any JDBC-compatible database. |

---

## Client

Executes SQL queries, DML statements, batch operations, and stored procedure calls against any JDBC-compatible database.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `url` | `string` | Required | The JDBC connection URL (e.g., `jdbc:mysql://localhost:3306/mydb`). |
| `user` | `string?` | `()` | Database username for authentication. |
| `password` | `string?` | `()` | Database password for authentication. |
| `options` | `jdbc:Options?` | `()` | JDBC-specific options including datasource name, custom properties, and request generated keys behavior. |
| `connectionPool` | `sql:ConnectionPool?` | `()` | Connection pool configuration (max connections, timeouts, etc.). |

### Initializing the client

```ballerina
import ballerinax/java.jdbc;

configurable string jdbcUrl = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;

jdbc:Client dbClient = check new (
    url = jdbcUrl,
    user = dbUser,
    password = dbPassword
);
```

### Operations

#### Query operations

<details>
<summary>query</summary>

Executes a parameterized SQL query and returns a stream of results. Use for `SELECT` statements that return multiple rows.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query to execute, supporting parameterized values via backtick templates. |
| `rowType` | `typedesc<record {}>` | No | The expected return record type for each row. |

Returns: `stream<rowType, sql:Error?>`

Sample code:

```ballerina
type Customer record {|
    int customerId;
    string firstName;
    string lastName;
    int registrationId;
    float creditLimit;
    string country;
|};

stream<Customer, sql:Error?> resultStream = dbClient->query(
    `SELECT * FROM Customers WHERE country = ${"US"}`
);
check from Customer customer in resultStream
    do {
        // Process each customer record
    };
```

Sample response:

```ballerina
{"customerId": 1, "firstName": "John", "lastName": "Doe", "registrationId": 100, "creditLimit": 5000.75, "country": "US"}
{"customerId": 3, "firstName": "Jane", "lastName": "Smith", "registrationId": 102, "creditLimit": 8500.00, "country": "US"}
```

</details>

<details>
<summary>queryRow</summary>

Executes a parameterized SQL query that returns at most one row. Ideal for lookups by primary key or aggregate queries.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query to execute. |
| `returnType` | `typedesc<anydata>` | No | The expected return type (record, primitive, etc.). |

Returns: `returnType|sql:Error`

Sample code:

```ballerina
type Customer record {|
    int customerId;
    string firstName;
    string lastName;
    int registrationId;
    float creditLimit;
    string country;
|};

Customer customer = check dbClient->queryRow(
    `SELECT * FROM Customers WHERE customerId = ${1}`
);
```

Sample response:

```ballerina
{"customerId": 1, "firstName": "John", "lastName": "Doe", "registrationId": 100, "creditLimit": 5000.75, "country": "US"}
```

</details>

#### Data manipulation

<details>
<summary>execute</summary>

Executes a parameterized SQL statement (INSERT, UPDATE, DELETE, or DDL) and returns the execution result.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The DML or DDL statement to execute. |

Returns: `sql:ExecutionResult|sql:Error`

Sample code:

```ballerina
sql:ExecutionResult result = check dbClient->execute(
    `INSERT INTO Customers (firstName, lastName, registrationId, creditLimit, country)
     VALUES (${"Peter"}, ${"Stuart"}, ${1}, ${5000.75}, ${"USA"})`
);
```

Sample response:

```ballerina
{"affectedRowCount": 1, "lastInsertId": 5}
```

</details>

<details>
<summary>batchExecute</summary>

Executes a batch of parameterized SQL statements in a single call. Use for bulk inserts or updates.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQueries` | `sql:ParameterizedQuery[]` | Yes | Array of parameterized SQL statements to execute as a batch. |

Returns: `sql:ExecutionResult[]|sql:Error`

Sample code:

```ballerina
sql:ParameterizedQuery[] insertQueries = [
    `INSERT INTO Customers (firstName, lastName, registrationId, creditLimit, country)
     VALUES (${"Alice"}, ${"Johnson"}, ${201}, ${3500.50}, ${"UK"})`,
    `INSERT INTO Customers (firstName, lastName, registrationId, creditLimit, country)
     VALUES (${"Bob"}, ${"Williams"}, ${202}, ${4200.00}, ${"CA"})`
];
sql:ExecutionResult[] results = check dbClient->batchExecute(insertQueries);
```

Sample response:

```ballerina
[{"affectedRowCount": 1, "lastInsertId": 6}, {"affectedRowCount": 1, "lastInsertId": 7}]
```

</details>

#### Stored procedures

<details>
<summary>call</summary>

Calls a stored procedure with IN, OUT, and INOUT parameters. Supports returning result sets from the procedure.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedCallQuery` | Yes | The stored procedure call query with parameters. |
| `rowTypes` | `typedesc<record {}>[]` | No | Expected return types for result sets produced by the procedure. |

Returns: `sql:ProcedureCallResult|sql:Error`

Sample code:

```ballerina
sql:IntegerOutParameter idOut = new;
sql:ProcedureCallResult result = check dbClient->call(
    `{CALL getCustomerId(${firstName}, ${idOut})}`
);
int? customerId = idOut.get(int);
```

Sample response:

```ballerina
{"executionResult": {"affectedRowCount": -1}, "queryResult": null}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the JDBC client connection and releases all associated database resources including the connection pool.

Returns: `sql:Error?`

Sample code:

```ballerina
check dbClient.close();
```

</details>
