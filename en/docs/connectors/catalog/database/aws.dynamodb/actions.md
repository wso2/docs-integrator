---
connector: true
connector_name: "aws.dynamodb"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The AWS DynamoDB connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Interact with Amazon DynamoDB for table management, item CRUD, batch operations, query and scan, backups, TTL, and capacity limits |

---

## Client

Provides programmatic access to Amazon DynamoDB for table lifecycle management, item CRUD operations, batch reads and writes, query and scan, backup management, TTL inspection, and account capacity limits.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>auth:AuthConfig</code> | Required | Authentication configuration: static credentials, AWS profile, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), external credential process, or the default provider chain |
| `region` | <code>aws:Region&#124;string</code> | Required | AWS region: an `aws:Region` enum member or a plain region string (e.g., `"us-east-1"`) for regions not yet in the enum |
| `endpoint` | <code>aws:EndpointConfig</code> | - | Optional endpoint options: FIPS/dualstack variants, or a custom endpoint override (e.g. LocalStack, VPC interface endpoints) |
| `batchRetry` | <code>BatchRetryConfig</code> | <code>&#123;&#125;</code> | Controls how `getBatchItems` retries keys DynamoDB reports as unprocessed; uses exponential backoff starting at 0.025 s up to 20 s with up to 8 consecutive unproductive attempts before abandoning |

The client also accepts the standard Ballerina HTTP client options (`timeout`, `retryConfig`, `secureSocket`, `proxy`, and the rest of `http:ClientConfiguration`), which are omitted here.

### Initializing the client

```ballerina
import ballerinax/aws;
import ballerinax/aws.dynamodb;

dynamodb:ConnectionConfig config = {
    auth: {
        accessKeyId: "<AWS_ACCESS_KEY_ID>",
        secretAccessKey: "<AWS_SECRET_ACCESS_KEY>"
    },
    region: aws:US_EAST_1
};
dynamodb:Client dynamoDb = check new (config);
```

### Operations

#### Table management

<details>
<summary>createTable</summary>

<div>

Adds a new table to your account. Table names must be unique within each AWS Region. The returned `TableDescription` reflects the `CREATING` state; the table must reach `ACTIVE` before items can be written to it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tableCreationInput` | <code>TableCreateInput</code> | Yes | Request payload containing the table name, attribute definitions, key schema, billing mode, and optional secondary index, encryption, and tag settings |

**Returns:** `TableDescription|Error`

**Sample code:**

```ballerina
dynamodb:TableDescription description = check dynamoDb->createTable({
    TableName: "HighScores",
    AttributeDefinitions: [
        {AttributeName: "GameId", AttributeType: dynamodb:S},
        {AttributeName: "Score", AttributeType: dynamodb:N}
    ],
    KeySchema: [
        {AttributeName: "GameId", KeyType: dynamodb:HASH},
        {AttributeName: "Score", KeyType: dynamodb:RANGE}
    ],
    BillingMode: dynamodb:PAY_PER_REQUEST
});
```

**Sample response:**

```json
{
  "TableName": "HighScores",
  "TableStatus": "CREATING",
  "TableArn": "arn:aws:dynamodb:us-east-1:123456789012:table/HighScores",
  "TableId": "a1b2c3d4-5678-90ab-cdef-EXAMPLE11111",
  "TableSizeBytes": 0,
  "ItemCount": 0,
  "CreationDateTime": 1712524800,
  "KeySchema": [
    {"AttributeName": "GameId", "KeyType": "HASH"},
    {"AttributeName": "Score", "KeyType": "RANGE"}
  ],
  "AttributeDefinitions": [
    {"AttributeName": "GameId", "AttributeType": "S"},
    {"AttributeName": "Score", "AttributeType": "N"}
  ],
  "BillingModeSummary": {
    "BillingMode": "PAY_PER_REQUEST"
  }
}
```

</div>
</details>

<details>
<summary>describeTable</summary>

<div>

Returns information about the table including its current state, primary key schema, provisioned throughput settings, secondary indexes, and replica configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tableName` | <code>string</code> | Yes | The name of the table to describe |

**Returns:** `TableDescription|Error`

**Sample code:**

```ballerina
dynamodb:TableDescription description = check dynamoDb->describeTable("HighScores");
```

**Sample response:**

```json
{
  "TableName": "HighScores",
  "TableStatus": "ACTIVE",
  "TableArn": "arn:aws:dynamodb:us-east-1:123456789012:table/HighScores",
  "TableId": "a1b2c3d4-5678-90ab-cdef-EXAMPLE11111",
  "TableSizeBytes": 1024,
  "ItemCount": 3,
  "CreationDateTime": 1712524800,
  "KeySchema": [
    {"AttributeName": "GameId", "KeyType": "HASH"},
    {"AttributeName": "Score", "KeyType": "RANGE"}
  ],
  "AttributeDefinitions": [
    {"AttributeName": "GameId", "AttributeType": "S"},
    {"AttributeName": "Score", "AttributeType": "N"}
  ],
  "BillingModeSummary": {
    "BillingMode": "PAY_PER_REQUEST"
  },
  "ProvisionedThroughput": {
    "ReadCapacityUnits": 0,
    "WriteCapacityUnits": 0,
    "NumberOfDecreasesToday": 0
  }
}
```

</div>
</details>

<details>
<summary>listTables</summary>

<div>

Returns an auto-paginating stream of all table names in the current account and region. The next page of names is fetched only once the current page has been consumed.

**Parameters:**

None

**Returns:** `stream<string, Error?>|Error`

**Sample code:**

```ballerina
stream<string, dynamodb:Error?> tables = check dynamoDb->listTables();
check from string tableName in tables
    do {
        // process tableName
    };
```

**Sample response:**

```json
"HighScores"
```

</div>
</details>

<details>
<summary>updateTable</summary>

<div>

Modifies the provisioned throughput settings, global secondary indexes, replica settings, SSE configuration, or DynamoDB Streams settings for an existing table.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tableUpdateInput` | <code>TableUpdateInput</code> | Yes | Request payload containing the table name and the attributes to modify, such as billing mode, GSI updates, replica updates, or stream settings |

**Returns:** `TableDescription|Error`

**Sample code:**

```ballerina
dynamodb:TableDescription description = check dynamoDb->updateTable({
    TableName: "HighScores",
    BillingMode: dynamodb:PAY_PER_REQUEST
});
```

**Sample response:**

```json
{
  "TableName": "HighScores",
  "TableStatus": "UPDATING",
  "TableArn": "arn:aws:dynamodb:us-east-1:123456789012:table/HighScores",
  "TableSizeBytes": 1024,
  "ItemCount": 3,
  "BillingModeSummary": {
    "BillingMode": "PAY_PER_REQUEST"
  }
}
```

</div>
</details>

<details>
<summary>deleteTable</summary>

<div>

Deletes a table and all of its items. The table enters the `DELETING` state immediately and is removed asynchronously. DynamoDB may accept read and write requests for a short period after the call returns.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tableName` | <code>string</code> | Yes | The name of the table to delete |

**Returns:** `TableDescription|Error`

**Sample code:**

```ballerina
dynamodb:TableDescription description = check dynamoDb->deleteTable("HighScores");
```

**Sample response:**

```json
{
  "TableName": "HighScores",
  "TableStatus": "DELETING",
  "TableArn": "arn:aws:dynamodb:us-east-1:123456789012:table/HighScores",
  "TableSizeBytes": 1024,
  "ItemCount": 3
}
```

</div>
</details>

#### Item operations

<details>
<summary>createItem</summary>

<div>

Creates a new item or completely replaces an existing item that has the same primary key. You can apply a condition expression so the write only succeeds when a specified attribute exists or holds a particular value.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemCreateInput` | <code>ItemCreateInput</code> | Yes | Request payload containing the table name, item attribute map, and optional condition expression, return-value, and capacity settings |

**Returns:** `ItemDescription|Error`

**Sample code:**

```ballerina
dynamodb:ItemDescription item = check dynamoDb->createItem({
    TableName: "HighScores",
    Item: {
        "GameId": {S: "FlappyBird"},
        "Score": {N: "500"},
        "PlayerName": {S: "PlayerOne"}
    }
});
```

**Sample response:**

```json
{
  "Attributes": null,
  "ConsumedCapacity": null,
  "ItemCollectionMetrics": null
}
```

</div>
</details>

<details>
<summary>getItem</summary>

<div>

Returns a set of attributes for the item with the given primary key. If no matching item is found, the response contains no `Item` field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemGetInput` | <code>ItemGetInput</code> | Yes | Request payload containing the table name, primary key, and optional projection expression, consistency model, and capacity settings |

**Returns:** `ItemGetOutput|Error`

**Sample code:**

```ballerina
dynamodb:ItemGetOutput item = check dynamoDb->getItem({
    TableName: "HighScores",
    Key: {"GameId": {S: "FlappyBird"}, "Score": {N: "500"}}
});
```

**Sample response:**

```json
{
  "Item": {
    "GameId": {"S": "FlappyBird"},
    "Score": {"N": "500"},
    "PlayerName": {"S": "PlayerOne"}
  },
  "ConsumedCapacity": null
}
```

</div>
</details>

<details>
<summary>updateItem</summary>

<div>

Edits an existing item's attributes or creates a new item if one does not already exist. Only the attributes named in the `UpdateExpression` are modified; all other attributes are left unchanged.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemUpdateInput` | <code>ItemUpdateInput</code> | Yes | Request payload containing the table name, primary key, update expression, and optional condition expression, attribute substitutions, and return-value settings |

**Returns:** `ItemDescription|Error`

**Sample code:**

```ballerina
dynamodb:ItemDescription item = check dynamoDb->updateItem({
    TableName: "HighScores",
    Key: {"GameId": {S: "FlappyBird"}, "Score": {N: "500"}},
    UpdateExpression: "SET PlayerName = :name",
    ExpressionAttributeValues: {":name": {S: "NewPlayer"}}
});
```

**Sample response:**

```json
{
  "Attributes": null,
  "ConsumedCapacity": null,
  "ItemCollectionMetrics": null
}
```

</div>
</details>

<details>
<summary>deleteItem</summary>

<div>

Deletes a single item in a table by primary key. You can apply a condition expression so that the delete only succeeds when the item has a specific attribute value.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemDeleteInput` | <code>ItemDeleteInput</code> | Yes | Request payload containing the table name, primary key, and optional condition expression, return-value, and capacity settings |

**Returns:** `ItemDescription|Error`

**Sample code:**

```ballerina
dynamodb:ItemDescription item = check dynamoDb->deleteItem({
    TableName: "HighScores",
    Key: {"GameId": {S: "FlappyBird"}, "Score": {N: "700"}}
});
```

**Sample response:**

```json
{
  "Attributes": null,
  "ConsumedCapacity": null,
  "ItemCollectionMetrics": null
}
```

</div>
</details>

#### Query and scan

<details>
<summary>query</summary>

<div>

Returns all items with a particular partition key value. You must supply the partition key name and a single value for it; optionally narrow the result with a sort key condition or a filter expression. Returns an auto-paginating stream — the next page is fetched only once the current page has been consumed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queryInput` | <code>QueryInput</code> | Yes | Request payload containing the table name, key condition expression, and optional filter expression, projection, index name, consistency model, sort order, and page size |

**Returns:** `stream<QueryOutput, Error?>|Error`

**Sample code:**

```ballerina
stream<dynamodb:QueryOutput, dynamodb:Error?> scores = check dynamoDb->query({
    TableName: "HighScores",
    KeyConditionExpression: "GameId = :game",
    ExpressionAttributeValues: {":game": {S: "FlappyBird"}},
    ScanIndexForward: false,
    Limit: 10
});
check from dynamodb:QueryOutput result in scores
    do {
        map<dynamodb:AttributeValue> item = check result?.Item.ensureType();
    };
```

**Sample response:**

```json
{
  "Item": {
    "GameId": {"S": "FlappyBird"},
    "Score": {"N": "900"},
    "PlayerName": {"S": "PlayerTwo"}
  },
  "ConsumedCapacity": null
}
```

</div>
</details>

<details>
<summary>scan</summary>

<div>

Returns one or more items and item attributes by reading every item in a table or secondary index. A filter expression is applied server-side after the read so that only matching items are returned. Returns an auto-paginating stream — the next page is fetched only once the current page has been consumed. Note that a page can come back empty when the filter eliminates everything DynamoDB examined, without meaning the scan is complete.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scanInput` | <code>ScanInput</code> | Yes | Request payload containing the table name and optional filter expression, projection expression, index name, consistency model, page size, and parallel scan segment settings |

**Returns:** `stream<ScanOutput, Error?>|Error`

**Sample code:**

```ballerina
stream<dynamodb:ScanOutput, dynamodb:Error?> items = check dynamoDb->scan({
    TableName: "Products",
    FilterExpression: "Category = :category",
    ExpressionAttributeValues: {":category": {S: "accessories"}}
});
check from dynamodb:ScanOutput result in items
    do {
        map<dynamodb:AttributeValue> item = check result?.Item.ensureType();
    };
```

**Sample response:**

```json
{
  "Item": {
    "Sku": {"S": "SKU-0002"},
    "Name": {"S": "Laptop stand"},
    "Category": {"S": "accessories"},
    "Price": {"N": "45.50"}
  },
  "ConsumedCapacity": null
}
```

</div>
</details>

#### Batch operations

<details>
<summary>getBatchItems</summary>

<div>

Returns the attributes of one or more items from one or more tables, identified by primary key. Returns an auto-paginating stream that transparently re-requests any keys DynamoDB leaves unprocessed due to throughput limits — the caller does not need to drive the retry loop.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchItemGetInput` | <code>BatchItemGetInput</code> | Yes | Request payload containing a map of table names to `KeysAndAttributes`, specifying the primary keys to retrieve and optional projection and consistency settings |

**Returns:** `stream<BatchItem, Error?>|Error`

**Sample code:**

```ballerina
stream<dynamodb:BatchItem, dynamodb:Error?> batch = check dynamoDb->getBatchItems({
    RequestItems: {
        "HighScores": {
            Keys: [{"GameId": {S: "FlappyBird"}, "Score": {N: "500"}}]
        }
    }
});
check from dynamodb:BatchItem result in batch
    do {
        map<dynamodb:AttributeValue> item = check result?.Item.ensureType();
    };
```

**Sample response:**

```json
{
  "TableName": "HighScores",
  "Item": {
    "GameId": {"S": "FlappyBird"},
    "Score": {"N": "500"},
    "PlayerName": {"S": "PlayerOne"}
  },
  "ConsumedCapacity": null
}
```

</div>
</details>

<details>
<summary>writeBatchItems</summary>

<div>

Puts or deletes multiple items across one or more tables in a single call. A call carries at most 25 `PutRequest` or `DeleteRequest` operations in total, counted across every table in the request. Items DynamoDB could not process due to throughput limits are returned in `UnprocessedItems` with the same shape as `RequestItems`, so they can be fed directly back into a subsequent call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchItemInsertInput` | <code>BatchItemInsertInput</code> | Yes | Request payload containing a map of table names to lists of `WriteRequest` (put or delete) operations, with optional capacity and metrics settings |

**Returns:** `BatchItemInsertOutput|Error`

**Sample code:**

```ballerina
dynamodb:BatchItemInsertOutput result = check dynamoDb->writeBatchItems({
    RequestItems: {
        "HighScores": [
            {PutRequest: {Item: {"GameId": {S: "FlappyBird"}, "Score": {N: "500"}, "PlayerName": {S: "PlayerOne"}}}},
            {PutRequest: {Item: {"GameId": {S: "FlappyBird"}, "Score": {N: "900"}, "PlayerName": {S: "PlayerTwo"}}}}
        ]
    }
});
map<dynamodb:WriteRequest[]> pending = result?.UnprocessedItems ?: {};
```

**Sample response:**

```json
{
  "ConsumedCapacity": null,
  "ItemCollectionMetrics": null,
  "UnprocessedItems": {}
}
```

</div>
</details>

#### Backup management

<details>
<summary>createBackup</summary>

<div>

Creates an on-demand backup of a DynamoDB table for long-term retention and archival. The backup is created asynchronously; use the returned `BackupArn` to track or later delete the backup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `backupCreateInput` | <code>BackupCreateInput</code> | Yes | Request payload containing the table name and a descriptive name for the backup |

**Returns:** `BackupDetails|Error`

**Sample code:**

```ballerina
dynamodb:BackupDetails backup = check dynamoDb->createBackup({
    TableName: "HighScores",
    BackupName: "HighScoresBackup"
});
```

**Sample response:**

```json
{
  "BackupArn": "arn:aws:dynamodb:us-east-1:123456789012:table/HighScores/backup/01234567890123-abc12345",
  "BackupCreationDateTime": 1712524800.0,
  "BackupName": "HighScoresBackup",
  "BackupStatus": "CREATING",
  "BackupType": "USER",
  "BackupSizeBytes": 0
}
```

</div>
</details>

<details>
<summary>deleteBackup</summary>

<div>

Deletes an existing on-demand backup of a DynamoDB table identified by its ARN. Returns the full description of the deleted backup including source table details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `backupArn` | <code>string</code> | Yes | The Amazon Resource Name (ARN) of the backup to delete |

**Returns:** `BackupDescription|Error`

**Sample code:**

```ballerina
dynamodb:BackupDescription backup = check dynamoDb->deleteBackup(
    "arn:aws:dynamodb:us-east-1:123456789012:table/HighScores/backup/01234567890123-abc12345"
);
```

**Sample response:**

```json
{
  "BackupDetails": {
    "BackupArn": "arn:aws:dynamodb:us-east-1:123456789012:table/HighScores/backup/01234567890123-abc12345",
    "BackupCreationDateTime": 1712524800.0,
    "BackupName": "HighScoresBackup",
    "BackupStatus": "DELETED",
    "BackupType": "USER",
    "BackupSizeBytes": 1024
  },
  "SourceTableDetails": {
    "TableName": "HighScores",
    "TableId": "a1b2c3d4-5678-90ab-cdef-EXAMPLE11111",
    "TableArn": "arn:aws:dynamodb:us-east-1:123456789012:table/HighScores",
    "TableCreationDateTime": 1712524800.0,
    "BillingMode": "PAY_PER_REQUEST",
    "ItemCount": 3,
    "TableSizeBytes": 1024
  }
}
```

</div>
</details>

#### Capacity and TTL

<details>
<summary>describeLimits</summary>

<div>

Returns the current provisioned-capacity quotas for your AWS account in the configured region, both for the region as a whole and for any one DynamoDB table you create there.

**Parameters:**

None

**Returns:** `LimitDescription|Error`

**Sample code:**

```ballerina
dynamodb:LimitDescription limits = check dynamoDb->describeLimits();
```

**Sample response:**

```json
{
  "AccountMaxReadCapacityUnits": 80000,
  "AccountMaxWriteCapacityUnits": 80000,
  "TableMaxReadCapacityUnits": 40000,
  "TableMaxWriteCapacityUnits": 40000
}
```

</div>
</details>

<details>
<summary>getTTL</summary>

<div>

Returns the Time to Live (TTL) status for the specified table, including the name of the TTL attribute and whether TTL is currently enabled, disabled, enabling, or disabling.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tableName` | <code>string</code> | Yes | The name of the table whose TTL settings to retrieve |

**Returns:** `TTLDescription|Error`

**Sample code:**

```ballerina
dynamodb:TTLDescription ttl = check dynamoDb->getTTL("HighScores");
```

**Sample response:**

```json
{
  "AttributeName": "ExpiryTime",
  "TimeToLiveStatus": "ENABLED"
}
```

</div>
</details>

#### Lifecycle

<details>
<summary>close</summary>

<div>

Releases the resources held by the credential provider, including its background refresh threads and the HTTP connections it keeps open to reach STS/SSO. Call this when the client is no longer needed to avoid resource leaks.

**Parameters:**

None

**Returns:** `Error?`

**Sample code:**

```ballerina
check dynamoDb.close();
```

</div>
</details>