---
title: Actions
---

# Actions

The `ballerinax/aws.redshiftdata` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Executes SQL statements, retrieves results, and monitors execution status via the Redshift data API. |

---

## Client

Executes SQL statements, retrieves results, and monitors execution status via the Redshift data API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `region` | `Region` | Required | AWS region where the Redshift cluster or workgroup is deployed (e.g., `US_EAST_1`). |
| `auth` | `StaticAuthConfig\|EC2IAMRoleConfig` | Required | AWS authentication: static access key credentials or EC2 IAM role configuration. |
| `dbAccessConfig` | `Cluster\|WorkGroup` | `()` | Default database access configuration. Can be overridden per-statement via `ExecutionConfig`. |

### Initializing the client

```ballerina
import ballerinax/aws.redshiftdata;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;
configurable string clusterId = ?;
configurable string database = ?;
configurable string dbUser = ?;

redshiftdata:Client redshift = check new ({
    region: redshiftdata:US_EAST_1,
    auth: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    },
    dbAccessConfig: {
        id: clusterId,
        database: database,
        dbUser: dbUser
    }
});
```

### Operations

#### Statement execution

<details>
<summary>execute</summary>

Runs a SQL statement (DML or DDL) asynchronously and returns a statement identifier for tracking.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statement` | `sql:ParameterizedQuery` | Yes | The SQL statement to execute. Supports parameterized queries. |
| `dbAccessConfig` | `Cluster\|WorkGroup\|SessionId` | No | Overrides the client-level database access configuration for this execution. |
| `clientToken` | `string` | No | Idempotency token to prevent duplicate executions. |
| `statementName` | `string` | No | A name to assign to the statement (1–500 characters). |
| `withEvent` | `boolean` | No | If `true`, sends an event to Amazon EventBridge when the statement completes. |

Returns: `ExecutionResponse|Error`

Sample code:

```ballerina
redshiftdata:ExecutionResponse response = check redshift->execute(
    `SELECT * FROM users WHERE status = ${"active"}`
);
```

Sample response:

```ballerina
{"createdAt": [1700000000, 0], "statementId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"}
```

</details>

<details>
<summary>batchExecute</summary>

Runs one or more SQL statements (DML or DDL) asynchronously in a single batch. Maximum batch size is 40 statements.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statements` | `sql:ParameterizedQuery[]` | Yes | Array of SQL statements to execute (max 40). |
| `dbAccessConfig` | `Cluster\|WorkGroup\|SessionId` | No | Overrides the client-level database access configuration for this execution. |
| `clientToken` | `string` | No | Idempotency token to prevent duplicate executions. |
| `statementName` | `string` | No | A name to assign to the batch statement (1–500 characters). |
| `withEvent` | `boolean` | No | If `true`, sends an event to Amazon EventBridge when the batch completes. |

Returns: `ExecutionResponse|Error`

Sample code:

```ballerina
redshiftdata:ExecutionResponse response = check redshift->batchExecute([
    `INSERT INTO users (name, email) VALUES (${"Alice"}, ${"alice@example.com"})`,
    `INSERT INTO users (name, email) VALUES (${"Bob"}, ${"bob@example.com"})`,
    `INSERT INTO users (name, email) VALUES (${"Charlie"}, ${"charlie@example.com"})`
]);
```

Sample response:

```ballerina
{"createdAt": [1700000000, 0], "statementId": "b2c3d4e5-f6a7-8901-bcde-f12345678901"}
```

</details>

#### Result retrieval

<details>
<summary>getResultAsStream</summary>

Retrieves the results of a previously executed SQL statement as a stream of typed records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statementId` | `StatementId` | Yes | The UUID identifier of the executed SQL statement. |
| `rowTypes` | `typedesc<record {}>` | No | The type descriptor of the record to map each result row to. |

Returns: `stream<rowTypes, Error?>|Error`

Sample code:

```ballerina
type User record {|
    int id;
    string name;
    string email;
|};

stream<User, redshiftdata:Error?> resultStream = check redshift->getResultAsStream(
    response.statementId
);
check from User user in resultStream
    do {
        // process each user record
    };
```

Sample response:

```ballerina
{"id": 1, "name": "Alice", "email": "alice@example.com"}
{"id": 2, "name": "Bob", "email": "bob@example.com"}
{"id": 3, "name": "Charlie", "email": "charlie@example.com"}
```

</details>

#### Statement monitoring

<details>
<summary>describe</summary>

Retrieves the execution status and metadata for a previously executed SQL statement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statementId` | `StatementId` | Yes | The UUID identifier of the SQL statement to describe. |

Returns: `DescriptionResponse|Error`

Sample code:

```ballerina
redshiftdata:DescriptionResponse description = check redshift->describe(
    response.statementId
);
```

Sample response:

```ballerina
{
  "statementId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "createdAt": [1700000000, 0],
  "duration": 1.234,
  "hasResultSet": true,
  "redshiftQueryId": 12345,
  "resultRows": 3,
  "resultSize": 256,
  "status": "FINISHED",
  "updatedAt": [1700000001, 0],
  "redshiftPid": 67890
}
```

</details>

#### Resource cleanup

<details>
<summary>close</summary>

Gracefully closes the AWS Redshift data API client and releases associated resources.

Returns: `Error?`

Sample code:

```ballerina
check redshift->close();
```

</details>
