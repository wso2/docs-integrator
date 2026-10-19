---
title: Actions
---

# Actions

The AWS Redshift connector spans 2 packages:
- `ballerinax/aws.redshift`
- `ballerinax/aws.redshift.driver`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Connects to an Amazon Redshift cluster via JDBC for SQL queries, DML/DDL execution, batch operations, and stored procedure calls. |

---

## Client

Connects to an Amazon Redshift cluster via JDBC for SQL queries, DML/DDL execution, batch operations, and stored procedure calls.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `url` | `string` | Required | JDBC URL of the Redshift cluster (e.g., `jdbc:redshift://<endpoint>:5439/<database>`). |
| `user` | `string` | Required | Database username. |
| `password` | `string` | Required | Database password. |
| `options` | `Options?` | `()` | Redshift-specific JDBC options including SSL mode and custom properties. |
| `connectionPool` | `sql:ConnectionPool?` | `()` | Connection pool configuration. Uses the global shared pool if not specified. |

### Initializing the client

```ballerina
import ballerinax/aws.redshift;
import ballerinax/aws.redshift.driver as _;

configurable string jdbcUrl = ?;
configurable string user = ?;
configurable string password = ?;

redshift:Client redshiftClient = check new (
    url = jdbcUrl,
    user = user,
    password = password
);
```

### Operations

#### Query operations

<details>
<summary>query</summary>

Executes a SOQL-style parameterized query and returns results as a stream of typed records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The parameterized SQL query to execute. |
| `rowType` | `typedesc<record {}>` | No | Expected return record type for each row. |

Returns: `stream<rowType, sql:Error?>`

Sample code:

```ballerina
type User record {|
    string name;
    string email;
    string state;
|};

stream<User, sql:Error?> resultStream = redshiftClient->query(`SELECT * FROM Users LIMIT 10`);
check from User user in resultStream
    do {
        // process each user record
    };
```

Sample response:

```ballerina
{"name": "John Doe", "email": "john@example.com", "state": "CA"}
{"name": "Jane Smith", "email": "jane@example.com", "state": "NY"}
```

</details>

<details>
<summary>queryRow</summary>

Executes a parameterized query that is expected to return at most one row.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The parameterized SQL query to execute. |
| `returnType` | `typedesc<anydata>` | No | Expected return type for the single result row. |

Returns: `returnType|sql:Error`

Sample code:

```ballerina
type Album record {|
    string id;
    string title;
    string artist;
    float price;
|};

Album album = check redshiftClient->queryRow(`SELECT * FROM Albums WHERE id = ${"1"}`);
```

Sample response:

```ballerina
{"id": "1", "title": "Blue Train", "artist": "John Coltrane", "price": 56.99}
```

</details>

#### DML & DDL operations

<details>
<summary>execute</summary>

Executes a DML or DDL statement such as INSERT, UPDATE, DELETE, or CREATE TABLE.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The parameterized SQL statement to execute. |

Returns: `sql:ExecutionResult|sql:Error`

Sample code:

```ballerina
sql:ExecutionResult result = check redshiftClient->execute(
    `INSERT INTO Albums (id, title, artist, price) VALUES (${"4"}, ${"New Album"}, ${"Artist"}, ${29.99})`
);
```

Sample response:

```ballerina
{"affectedRowCount": 1, "lastInsertId": null}
```

</details>

<details>
<summary>batchExecute</summary>

Executes multiple parameterized DML statements as a batch for efficient bulk operations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQueries` | `sql:ParameterizedQuery[]` | Yes | Array of parameterized SQL statements to execute in a batch. |

Returns: `sql:ExecutionResult[]|sql:Error`

Sample code:

```ballerina
sql:ParameterizedQuery[] insertQueries = [
    `INSERT INTO Albums VALUES (${"5"}, ${"Album A"}, ${"Artist A"}, ${19.99})`,
    `INSERT INTO Albums VALUES (${"6"}, ${"Album B"}, ${"Artist B"}, ${24.99})`
];
sql:ExecutionResult[] results = check redshiftClient->batchExecute(insertQueries);
```

Sample response:

```ballerina
[{"affectedRowCount": 1, "lastInsertId": null}, {"affectedRowCount": 1, "lastInsertId": null}]
```

</details>

#### Stored procedures

<details>
<summary>call</summary>

Calls a stored procedure, optionally returning result sets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedCallQuery` | Yes | The parameterized stored procedure call query. |
| `rowTypes` | `typedesc<record {}>[]` | No | Expected record types for each result set returned by the procedure. |

Returns: `sql:ProcedureCallResult|sql:Error`

Sample code:

```ballerina
sql:ProcedureCallResult callResult = check redshiftClient->call(`{CALL get_active_users()}`);
```

Sample response:

```ballerina
{"executionResult": {"affectedRowCount": -1}, "queryResult": <stream of records>}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the client connection and shuts down the connection pool.

Returns: `sql:Error?`

Sample code:

```ballerina
check redshiftClient.close();
```

</details>
