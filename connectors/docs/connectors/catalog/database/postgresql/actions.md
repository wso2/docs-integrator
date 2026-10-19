# Actions

The PostgreSQL connector is distributed across two libraries:

- `ballerinax/postgresql`
- `ballerinax/postgresql.driver`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides standard SQL operations against a PostgreSQL database: query, single-row query, execute (DML/DDL), batch execute, stored procedure call, and connection management. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Client

Provides standard SQL operations against a PostgreSQL database: query, single-row query, execute (DML/DDL), batch execute, stored procedure call, and connection management.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | `"localhost"` | PostgreSQL server hostname or IP address. |
| `username` | <code>string?</code> | `"postgres"` | Database username. |
| `password` | <code>string?</code> | `()` | Database password. |
| `database` | <code>string?</code> | `()` | Name of the database to connect to. |
| `port` | <code>int</code> | `5432` | PostgreSQL server port. |
| `options` | <code>Options?</code> | `()` | Advanced PostgreSQL-specific connection options (SSL, timeouts, prepared statement caching, and more). |
| `connectionPool` | <code>sql:ConnectionPool?</code> | `()` | Connection pool configuration. If not provided, the global shared pool is used. |

### Initializing the client

```ballerina
import ballerinax/postgresql;
import ballerinax/postgresql.driver as _;

configurable string host = ?;
configurable string username = ?;
configurable string password = ?;
configurable string database = ?;
configurable int port = 5432;

postgresql:Client dbClient = check new (
    host = host,
    username = username,
    password = password,
    database = database,
    port = port
);
```

### Operations

#### Query operations

<details>
<summary>query</summary>

Executes a SQL SELECT query and returns multiple results as a stream of records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | <code>sql:ParameterizedQuery</code> | Yes | SQL query with optional parameters (for example, `` `SELECT * FROM customers WHERE country = ${country}` ``). |
| `rowType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | Record type to map query results to. |

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

stream<Customer, sql:Error?> resultStream = dbClient->query(`SELECT * FROM Customers`);
```

Sample response:

```ballerina
{"customerId": 1, "firstName": "Peter", "lastName": "Stuart", "registrationId": 1, "creditLimit": 5000.75, "country": "USA"}
{"customerId": 2, "firstName": "Dan", "lastName": "Brown", "registrationId": 2, "creditLimit": 10000.00, "country": "UK"}
```

</details>

<details>
<summary>queryRow</summary>

Executes a SQL query expected to return a single row or a scalar value. Returns `sql:NoRowsError` if no results are found.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | <code>sql:ParameterizedQuery</code> | Yes | SQL query expected to return one row or value. |
| `returnType` | <code>typedesc&lt;anydata&gt;</code> | No | Expected return type: a record for a full row, or a primitive type for a scalar value. |

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

int customerId = 1;
Customer customer = check dbClient->queryRow(
    `SELECT * FROM Customers WHERE customerId = ${customerId}`
);
```

Sample response:

```ballerina
{"customerId": 1, "firstName": "Peter", "lastName": "Stuart", "registrationId": 1, "creditLimit": 5000.75, "country": "USA"}
```

</details>

#### Execute operations

<details>
<summary>execute</summary>

Executes a SQL DDL or DML statement (CREATE, INSERT, UPDATE, DELETE) and returns execution metadata.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | <code>sql:ParameterizedQuery</code> | Yes | SQL statement with optional parameters. |

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
{"affectedRowCount": 1, "lastInsertId": 1}
```

</details>

<details>
<summary>batchExecute</summary>

Executes a batch of parameterized SQL statements in a single call, useful for bulk inserts or updates.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQueries` | <code>sql:ParameterizedQuery[]</code> | Yes | Array of parameterized SQL statements to execute as a batch. |

Returns: `sql:ExecutionResult[]|sql:Error`

Passing an empty array returns an `sql:ApplicationError`. Filter or guard upstream if your input may be empty.

Sample code:

```ballerina
var customers = [
    {firstName: "Peter", lastName: "Stuart", country: "USA"},
    {firstName: "Dan", lastName: "Brown", country: "UK"},
    {firstName: "Anna", lastName: "Lee", country: "SG"}
];

sql:ParameterizedQuery[] batch = from var c in customers
    select `INSERT INTO Customers (firstName, lastName, country)
            VALUES (${c.firstName}, ${c.lastName}, ${c.country})`;

sql:ExecutionResult[] results = check dbClient->batchExecute(batch);
```

Sample response:

```ballerina
[{"affectedRowCount": 1, "lastInsertId": 1}, {"affectedRowCount": 1, "lastInsertId": 2}, {"affectedRowCount": 1, "lastInsertId": 3}]
```

</details>

#### Stored procedures

<details>
<summary>call</summary>

Calls a stored procedure or function and returns result sets and output parameter values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | <code>sql:ParameterizedCallQuery</code> | Yes | Stored procedure call query (for example, `` `CALL InsertStudent(${id}, ${name}, ${age})` ``). |
| `rowTypes` | <code>typedesc&lt;record &#123;&#125;&gt;[]</code> | No | Array of record types for mapping result sets returned by the procedure. |

Returns: `sql:ProcedureCallResult|sql:Error`

Sample code:

```ballerina
int personId = 1;
string personName = "Alice";
int personAge = 25;

sql:ProcedureCallResult result = check dbClient->call(
    `CALL InsertStudent(${personId}, ${personName}, ${personAge})`
);
result.close();
```

Sample response:

```ballerina
{"executionResult": {"affectedRowCount": 1}, "queryResult": null}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the client and releases the associated connection pool (if not shared by other clients). Call this only at the end of the application lifetime.

Returns: `sql:Error?`

Sample code:

```ballerina
check dbClient.close();
```

</details>

---

## Supporting types

### `Options`

Advanced PostgreSQL connection options. Passed to `Client.init` through the `options` parameter.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ssl` | <code>SecureSocket?</code> | `()` | SSL/TLS security settings. |
| `connectTimeout` | <code>decimal</code> | `0` | Connection timeout in seconds. `0` means the JDBC driver default (typically no timeout). |
| `socketTimeout` | <code>decimal</code> | `0` | Socket read/write timeout in seconds (`0` means no timeout). |
| `loginTimeout` | <code>decimal</code> | `0` | Time, in seconds, allowed to complete the database login (`0` means no timeout). |
| `rowFetchSize` | <code>int?</code> | `()` | Number of rows to fetch in a single round trip when streaming results. |
| `cachedMetadataFieldsCount` | <code>int?</code> | `()` | Number of fields cached per connection. |
| `cachedMetadataFieldSize` | <code>int?</code> | `()` | Size, in bytes, of metadata fields cached per connection. |
| `preparedStatementThreshold` | <code>int?</code> | `()` | Number of `PreparedStatement` executions required before switching to a server-side prepared statement. |
| `preparedStatementCacheQueries` | <code>int?</code> | `()` | Maximum number of prepared statements cached per connection. |
| `preparedStatementCacheSize` | <code>int?</code> | `()` | Maximum size, in mebibytes, of the prepared statement cache per connection. |
| `cancelSignalTimeout` | <code>decimal</code> | `10` | Time, in seconds, by which the cancel command is sent out of band over its own connection. |
| `keepAliveTcpProbe` | <code>boolean?</code> | `()` | Enable TCP keep-alive probes on the socket. |
| `binaryTransfer` | <code>boolean?</code> | `()` | Use the binary protocol for sending and receiving data when supported. |
| `currentSchema` | <code>string?</code> | `()` | The schema to be used by the client. |

### `SecureSocket`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `mode` | <code>SSLMode</code> | `PREFER` | SSL mode (see below). |
| `rootcert` | <code>string?</code> | `()` | File name of the SSL root certificate. Defaults to `${user.home}/.postgresql/root.crt` on Unix or `%appdata%/postgresql/root.crt` on Windows. |
| `key` | <code>crypto:KeyStore&#124;CertKey?</code> | `()` | Client certificate configuration. Use a `crypto:KeyStore` for JKS or PKCS#12 keystores, or a `CertKey` record for PEM files. |

### `CertKey`

Represents a client certificate, private key, and optional key password loaded from PEM files. Use as an alternative to `crypto:KeyStore` in `SecureSocket.key`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `certFile` | <code>string</code> | Required | Path to the file containing the client certificate. |
| `keyFile` | <code>string</code> | Required | Path to the file containing the client private key. |
| `keyPassword` | <code>string?</code> | `()` | Password for the private key, if it is encrypted. |

### `SSLMode`

The supported SSL connection modes:

| Constant | Value | Description |
|----------|-------|-------------|
| `PREFER` | `"PREFER"` | Try an encrypted connection first and fall back to unencrypted if the server does not support it. |
| `REQUIRE` | `"REQUIRE"` | Require an encrypted connection. Does not verify the server certificate. |
| `DISABLE` | `"DISABLE"` | Establish an unencrypted connection. |
| `ALLOW` | `"ALLOW"` | Try an unencrypted connection first and fall back to an encrypted one if the server requires it. |
| `VERIFY_CA` | `"VERIFY-CA"` | Require an encrypted connection and verify the server CA certificate. |
| `VERIFY_FULL` | `"VERIFY-FULL"` | Require an encrypted connection, verify the CA, and verify the server hostname. |

### `sql:ConnectionPool`

Connection pool configuration is provided by the parent `ballerina/sql` library. See the [`sql:ConnectionPool` API reference](https://docs.central.ballerina.io/ballerina/sql/latest#ConnectionPool) for the full field list and pool-handling semantics.
