# Actions

The MSSQL connector is distributed across three libraries:

- `ballerinax/mssql`
- `ballerinax/mssql.driver`
- `ballerinax/mssql.cdc.driver`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Connects to a Microsoft SQL Server database and executes SQL queries, DML statements, batch operations, and stored procedures. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Client

Connects to a Microsoft SQL Server database and executes SQL queries, DML statements, batch operations, and stored procedures.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | `"localhost"` | Hostname of the MSSQL server. |
| `user` | <code>string?</code> | `"sa"` | Database username. |
| `password` | <code>string?</code> | `()` | Database password. |
| `database` | <code>string?</code> | `()` | Name of the database to connect to. |
| `port` | <code>int</code> | `1433` | Port number of the MSSQL server. |
| `instance` | <code>string</code> | `""` | Named instance of SQL Server (for example, `"SQLEXPRESS"`). |
| `options` | <code>Options?</code> | `()` | MSSQL-specific connection options (SSL, timeouts, XA). |
| `connectionPool` | <code>sql:ConnectionPool?</code> | `()` | Connection pool configuration. If not provided, the global shared pool is used. |

### Initializing the client

```ballerina
import ballerinax/mssql;
import ballerinax/mssql.driver as _;

configurable string host = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;
configurable int port = 1433;

mssql:Client dbClient = check new (
    host = host,
    user = user,
    password = password,
    database = database,
    port = port
);
```

### Operations

#### Query operations

<details>
<summary>query</summary>

Executes a parameterized SQL query and returns a stream of results.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | <code>sql:ParameterizedQuery</code> | Yes | The SQL query to execute, using Ballerina's parameterized query syntax. |
| `rowType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | The expected record type for each row in the result set. |

Returns: `stream<rowType, sql:Error?>`

Sample code:

```ballerina
type Employee record {|
    int id;
    string first_name;
    string last_name;
    decimal salary;
|};

stream<Employee, sql:Error?> employees = dbClient->query(
    `SELECT id, first_name, last_name, salary FROM Employees WHERE salary > ${50000}`
);
check from Employee emp in employees
    do {
        // process each employee record
    };
```

Sample response:

```ballerina
{"id": 1, "first_name": "John", "last_name": "Doe", "salary": 75000.00}
{"id": 2, "first_name": "Jane", "last_name": "Smith", "salary": 82000.00}
```

</details>

<details>
<summary>queryRow</summary>

Executes a parameterized SQL query that returns at most one row.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | <code>sql:ParameterizedQuery</code> | Yes | The SQL query to execute. |
| `returnType` | <code>typedesc&lt;anydata&gt;</code> | No | The expected return type for the single result row. |

Returns: `returnType|sql:Error`

Sample code:

```ballerina
type Employee record {|
    int id;
    string first_name;
    string last_name;
    decimal salary;
|};

Employee employee = check dbClient->queryRow(
    `SELECT id, first_name, last_name, salary FROM Employees WHERE id = ${1}`
);
```

Sample response:

```ballerina
{"id": 1, "first_name": "John", "last_name": "Doe", "salary": 75000.00}
```

</details>

#### DML execution

<details>
<summary>execute</summary>

Executes a parameterized SQL statement (INSERT, UPDATE, DELETE, or DDL).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | <code>sql:ParameterizedQuery</code> | Yes | The SQL statement to execute. |

Returns: `sql:ExecutionResult|sql:Error`

Sample code:

```ballerina
sql:ExecutionResult result = check dbClient->execute(
    `INSERT INTO Employees (first_name, last_name, salary)
     VALUES (${"Peter"}, ${"Parker"}, ${65000.00})`
);
```

Sample response:

```ballerina
{"affectedRowCount": 1, "lastInsertId": 3}
```

</details>

<details>
<summary>batchExecute</summary>

Executes a batch of parameterized SQL statements for high-throughput operations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQueries` | <code>sql:ParameterizedQuery[]</code> | Yes | An array of parameterized SQL statements to execute as a batch. |

Returns: `sql:ExecutionResult[]|sql:Error`

Sample code:

```ballerina
sql:ParameterizedQuery[] insertQueries = [
    `INSERT INTO Employees (first_name, last_name, salary)
     VALUES (${"Alice"}, ${"Johnson"}, ${70000.00})`,
    `INSERT INTO Employees (first_name, last_name, salary)
     VALUES (${"Bob"}, ${"Williams"}, ${68000.00})`
];

sql:ExecutionResult[] results = check dbClient->batchExecute(insertQueries);
```

Sample response:

```ballerina
[{"affectedRowCount": 1, "lastInsertId": 4}, {"affectedRowCount": 1, "lastInsertId": 5}]
```

</details>

#### Stored procedures

<details>
<summary>call</summary>

Calls a stored procedure with IN, OUT, and INOUT parameters using the MSSQL `exec` syntax.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | <code>sql:ParameterizedCallQuery</code> | Yes | The stored procedure call query using `exec ProcName` syntax. |
| `rowTypes` | <code>typedesc&lt;record &#123;&#125;&gt;[]</code> | No | Expected record types for result sets returned by the procedure. |

Returns: `sql:ProcedureCallResult|sql:Error`

Sample code:

```ballerina
sql:IntegerOutParameter totalCount = new;

sql:ProcedureCallResult result = check dbClient->call(
    `exec GetEmployeeCount ${totalCount}`
);
int? count = totalCount.get(int);
```

Sample response:

```ballerina
{"executionResult": {"affectedRowCount": -1}, "queryResult": null}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the client connection and releases all associated database resources.

Returns: `sql:Error?`

Sample code:

```ballerina
check dbClient.close();
```

</details>
