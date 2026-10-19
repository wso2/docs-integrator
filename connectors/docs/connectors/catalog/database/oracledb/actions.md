---
title: Actions
---

# Actions

The `ballerinax/oracledb` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Connects to an Oracle Database and executes SQL queries, DML statements, batch operations, and stored procedure calls. |

---

## Client

Connects to an Oracle Database and executes SQL queries, DML statements, batch operations, and stored procedure calls.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | `string` | `"localhost"` | Hostname or IP address of the Oracle Database server. |
| `user` | `string?` | `"sys"` | Database username for authentication. |
| `password` | `string?` | `()` | Database password for authentication. |
| `database` | `string?` | `()` | Database service name or SID to connect to. |
| `port` | `int` | `1521` | Oracle listener port number. |
| `options` | `Options?` | `()` | Oracle-specific connection options (SSL, timeouts, XA datasource, auto-commit). |
| `connectionPool` | `sql:ConnectionPool?` | `()` | Connection pool configuration (max open connections, min idle, max lifetime). |

### Initializing the client

```ballerina
import ballerinax/oracledb;
import ballerinax/oracledb.driver as _;

configurable string host = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;
configurable int port = ?;

oracledb:Client oracleClient = check new (
    host = host,
    user = user,
    password = password,
    database = database,
    port = port,
    connectionPool = {
        maxOpenConnections: 3,
        minIdleConnections: 1
    }
);
```

### Operations

#### Query operations

<details>
<summary>query</summary>

Executes a parameterized SQL query and returns the results as a stream of records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query to execute, supporting inline parameterized values. |
| `rowType` | `typedesc<record {}>` | No | The expected record type for each row in the result set. |

Returns: `stream<rowType, sql:Error?>`

Sample code:

```ballerina
type Customer record {|
    int id;
    string name;
    string email;
|};

stream<Customer, sql:Error?> customers = oracleClient->query(
    `SELECT id, name, email FROM customers WHERE name LIKE ${"A%"}`
);

check from Customer customer in customers
    do {
        // process each customer
    };
```

Sample response:

```ballerina
{"id": 1, "name": "Acme Corp", "email": "contact@acme.com"}
{"id": 5, "name": "Alpha Inc", "email": "info@alpha.com"}
```

</details>

<details>
<summary>queryRow</summary>

Executes a parameterized SQL query that returns at most one row. Returns the result directly rather than as a stream.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query to execute (should return a single row). |
| `returnType` | `typedesc<anydata>` | No | The expected return type (a record type or a primitive type like `int`, `string`). |

Returns: `returnType|sql:Error`

Sample code:

```ballerina
int count = check oracleClient->queryRow(
    `SELECT COUNT(*) FROM customers`
);
```

Sample response:

```ballerina
42
```

</details>

#### DML operations

<details>
<summary>execute</summary>

Executes a parameterized DML statement (INSERT, UPDATE, DELETE) or DDL statement and returns the execution result.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The DML or DDL statement to execute. |

Returns: `sql:ExecutionResult|sql:Error`

Sample code:

```ballerina
sql:ExecutionResult result = check oracleClient->execute(
    `INSERT INTO customers (name, email) VALUES (${"John Doe"}, ${"john@example.com"})`
);
```

Sample response:

```ballerina
{"affectedRowCount": 1, "lastInsertId": 101}
```

</details>

<details>
<summary>batchExecute</summary>

Executes a batch of parameterized DML statements. All statements must use the same SQL template with different parameter values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQueries` | `sql:ParameterizedQuery[]` | Yes | An array of parameterized queries to execute as a batch. Must not be empty. |

Returns: `sql:ExecutionResult[]|sql:Error`

Sample code:

```ballerina
sql:ParameterizedQuery[] insertQueries = [
    `INSERT INTO customers (name, email) VALUES (${"Alice"}, ${"alice@example.com"})`,
    `INSERT INTO customers (name, email) VALUES (${"Bob"}, ${"bob@example.com"})`,
    `INSERT INTO customers (name, email) VALUES (${"Carol"}, ${"carol@example.com"})`
];

sql:ExecutionResult[] results = check oracleClient->batchExecute(insertQueries);
```

Sample response:

```ballerina
[
  {"affectedRowCount": 1, "lastInsertId": 102},
  {"affectedRowCount": 1, "lastInsertId": 103},
  {"affectedRowCount": 1, "lastInsertId": 104}
]
```

</details>

#### Stored procedure calls

<details>
<summary>call</summary>

Calls a stored procedure or function. Supports IN, OUT, and INOUT parameters, and can return multiple result sets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedCallQuery` | Yes | The stored procedure call query with parameters. |
| `rowTypes` | `typedesc<record {}>[]` | No | Array of record types for each result set returned by the procedure. |

Returns: `sql:ProcedureCallResult|sql:Error`

Sample code:

```ballerina
sql:IntegerOutParameter idOut = new;
sql:VarcharOutParameter nameOut = new;

sql:ProcedureCallResult result = check oracleClient->call(
    `{CALL get_customer_by_email(${email}, ${idOut}, ${nameOut})}`
);

int? customerId = check idOut.get(int);
string? customerName = check nameOut.get(string);
```

Sample response:

```ballerina
{"executionResult": {"affectedRowCount": -1}, "queryResult": null}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the client connection and releases the associated connection pool resources. Should be called when the client is no longer needed.

Returns: `sql:Error?`

Sample code:

```ballerina
check oracleClient.close();
```

</details>

#### Oracle-Specific types

<details>
<summary>query (with VARRAY)</summary>

Queries data that includes Oracle VARRAY columns by mapping them to Ballerina array types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query targeting a table with VARRAY columns. |
| `rowType` | `typedesc<record {}>` | No | Record type with array-typed fields for VARRAY columns. |

Returns: `stream<rowType, sql:Error?>`

Sample code:

```ballerina
type Product record {|
    int id;
    string name;
    decimal price;
    string?[] reviews;
|};

stream<Product, sql:Error?> products = oracleClient->query(
    `SELECT id, name, price, reviews FROM products`
);
```

Sample response:

```ballerina
{"id": 1, "name": "Laptop", "price": 999.99, "reviews": ["Great product", "Fast delivery"]}
```

</details>

<details>
<summary>execute (with VARRAY insert)</summary>

Inserts data containing Oracle VARRAY values using the `VarrayValue` typed value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The INSERT statement with VARRAY parameters. |

Returns: `sql:ExecutionResult|sql:Error`

Sample code:

```ballerina
oracledb:VarrayValue reviewsVal = new ({
    name: "REVIEW_VARRAY_TYPE",
    elements: ["Excellent quality", "Highly recommended"]
});

sql:ExecutionResult result = check oracleClient->execute(
    `INSERT INTO products (name, price, reviews) VALUES (${"Tablet"}, ${499.99}, ${reviewsVal})`
);
```

Sample response:

```ballerina
{"affectedRowCount": 1, "lastInsertId": null}
```

</details>

<details>
<summary>query (with IntervalYearToMonth)</summary>

Queries data that includes Oracle INTERVAL YEAR TO MONTH columns, mapped to the `IntervalYearToMonth` record type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query targeting a table with INTERVAL YEAR TO MONTH columns. |
| `rowType` | `typedesc<record {}>` | No | Record type with `IntervalYearToMonth` fields. |

Returns: `stream<rowType, sql:Error?>`

Sample code:

```ballerina
type ProductWarranty record {|
    int id;
    string name;
    oracledb:IntervalYearToMonth warranty_period;
|};

stream<ProductWarranty, sql:Error?> products = oracleClient->query(
    `SELECT id, name, warranty_period FROM products`
);
```

Sample response:

```ballerina
{"id": 1, "name": "Laptop", "warranty_period": {"sign": 1, "years": 2, "months": 6}}
```

</details>
