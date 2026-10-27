---
connector: true
connector_name: "mongodb"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/mongodb` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Top-level client for connecting to MongoDB, listing databases, and obtaining Database references. |
| [`Database`](#database) | Represents a MongoDB database. Manage collections and drop the database. |
| [`Collection`](#collection) | Document CRUD, queries, aggregation pipelines, distinct values, and index management. |

:::note Error types
All operations return errors as `mongodb:Error`, a union of `mongodb:DatabaseError`, `mongodb:ApplicationError`, and Ballerina's built-in `error`. `mongodb:DatabaseError` carries an additional `mongoDBExceptionType` detail field for command-level failures.
:::

---

## Client

Top-level client for connecting to MongoDB, listing databases, and obtaining Database references.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connection` | <code>ConnectionParameters&#124;string</code> | Required | Structured connection parameters or a MongoDB connection string URI. |
| `options` | <code>ConnectionProperties?</code> | Optional | Optional connection properties (read concern, write concern, pool settings, SSL, timeouts). |

### Initializing the client

```ballerina
import ballerinax/mongodb;

configurable string connectionUri = ?;

mongodb:Client mongoClient = check new ({
    connection: connectionUri
});
```

### Operations

#### Database management

<details>
<summary>listDatabaseNames</summary>

<div>

Lists all database names in the MongoDB server.


Returns: `string[]|mongodb:Error`

Sample code:

```ballerina
string[] databases = check mongoClient->listDatabaseNames();
```

Sample response:

```ballerina
["admin", "local", "movies", "orders"]
```

</div>

</details>

<details>
<summary>getDatabase</summary>

<div>

Retrieves a Database object for the named database.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `databaseName` | <code>string</code> | Yes | Name of the database to retrieve. |

Returns: `mongodb:Database|mongodb:Error`

Sample code:

```ballerina
mongodb:Database moviesDb = check mongoClient->getDatabase("movies");
```

</div>

</details>

<details>
<summary>close</summary>

<div>

Closes the MongoDB client connection. Use a single client instance for the application lifetime.


Returns: `mongodb:Error?`

Sample code:

```ballerina
check mongoClient->close();
```

</div>

</details>

---

## Database

Represents a MongoDB database. Manage collections and drop the database.

### Configuration

`Database` has no direct configuration. Instances are obtained through `Client->getDatabase()`.

### Initializing the client

```ballerina
import ballerinax/mongodb;

// Obtain a Database via Client->getDatabase()
mongodb:Client mongoClient = check new ({
    connection: "mongodb://localhost:27017"
});
mongodb:Database moviesDb = check mongoClient->getDatabase("movies");
```

### Operations

#### Collection management

<details>
<summary>listCollectionNames</summary>

<div>

Lists all collection names in the database.


Returns: `string[]|mongodb:Error`

Sample code:

```ballerina
string[] collections = check moviesDb->listCollectionNames();
```

Sample response:

```ballerina
["movies", "directors", "reviews"]
```

</div>

</details>

<details>
<summary>createCollection</summary>

<div>

Creates a new collection in the database.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionName` | <code>string</code> | Yes | Name of the collection to create. |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesDb->createCollection("movies");
```

</div>

</details>

<details>
<summary>getCollection</summary>

<div>

Gets a Collection object for the named collection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionName` | <code>string</code> | Yes | Name of the collection to retrieve. |

Returns: `mongodb:Collection|mongodb:Error`

Sample code:

```ballerina
mongodb:Collection moviesCollection = check moviesDb->getCollection("movies");
```

</div>

</details>

#### Database operations

<details>
<summary>drop</summary>

<div>

Drops the entire database and all its collections.


Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesDb->drop();
```

</div>

</details>

---

## Collection

Document CRUD, queries, aggregation pipelines, distinct values, and index management.

### Configuration

`Collection` has no direct configuration. Instances are obtained through `Database->getCollection()`.

### Initializing the client

```ballerina
import ballerinax/mongodb;

// Obtain a Collection via Database->getCollection()
mongodb:Client mongoClient = check new ({
    connection: "mongodb://localhost:27017"
});
mongodb:Database db = check mongoClient->getDatabase("movies");
mongodb:Collection moviesCollection = check db->getCollection("movies");
```

### Operations

#### Insert operations

<details>
<summary>insertOne</summary>

<div>

Inserts a single document into the collection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `document` | <code>record &#123;&#124;anydata...;&#124;&#125;</code> | Yes | The document to insert. |
| `options` | <code>InsertOneOptions</code> | No | Insert options (comment, bypassDocumentValidation). |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->insertOne({
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan"
});
```

</div>

</details>

<details>
<summary>insertMany</summary>

<div>

Inserts multiple documents into the collection. When `ordered` is true (default), insertion stops on the first error.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `documents` | <code>record &#123;&#124;anydata...;&#124;&#125;[]</code> | Yes | Array of documents to insert. |
| `options` | <code>InsertManyOptions</code> | No | Insert options (comment, bypassDocumentValidation, ordered). |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->insertMany([
    {title: "The Dark Knight", year: 2008, director: "Christopher Nolan"},
    {title: "Interstellar", year: 2014, director: "Christopher Nolan"},
    {title: "Parasite", year: 2019, director: "Bong Joon-ho"}
]);
```

</div>

</details>

#### Query operations

<details>
<summary>find</summary>

<div>

Finds all documents matching the filter and returns a stream of typed records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | <code>map&lt;json&gt;</code> | No | Query filter document. Defaults to `{}` (match all). |
| `findOptions` | <code>FindOptions</code> | No | Sort, limit, skip, and batchSize options. |
| `projection` | <code>map&lt;json&gt;?</code> | No | Projection document to include or exclude fields. |
| `targetType` | <code>typedesc&lt;record &#123;&#124;anydata...;&#124;&#125;&gt;</code> | No | Expected record type for results (inferred from context). |

Returns: `stream<targetType, error?>|mongodb:Error`

Sample code:

```ballerina
type Movie record {|
    string title;
    int year;
    string director;
|};

stream<Movie, error?> result = check moviesCollection->find({year: 2010});
Movie[] movies = check from Movie m in result select m;
```

Sample response:

```ballerina
[{"title": "Inception", "year": 2010, "director": "Christopher Nolan"}]
```

</div>

</details>

<details>
<summary>findOne</summary>

<div>

Finds the first document matching the filter. Returns `()` if no match is found.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | <code>map&lt;json&gt;</code> | No | Query filter document. |
| `findOptions` | <code>FindOptions</code> | No | Sort, limit, skip, and batchSize options. |
| `projection` | <code>map&lt;json&gt;?</code> | No | Projection document to include or exclude fields. |
| `targetType` | <code>typedesc&lt;record &#123;&#124;anydata...;&#124;&#125;&gt;</code> | No | Expected record type (inferred from context). |

Returns: `targetType|mongodb:Error?`

Sample code:

```ballerina
Movie? movie = check moviesCollection->findOne({title: "Inception"});
```

Sample response:

```ballerina
{"title": "Inception", "year": 2010, "director": "Christopher Nolan"}
```

</div>

</details>

<details>
<summary>countDocuments</summary>

<div>

Counts documents in the collection matching the filter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | <code>map&lt;json&gt;</code> | No | Query filter document. Defaults to `{}` (count all). |
| `options` | <code>CountOptions</code> | No | Options for limit, skip, maxTimeMS, and hint. |

Returns: `int|mongodb:Error`

Sample code:

```ballerina
int count = check moviesCollection->countDocuments({director: "Christopher Nolan"});
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>distinct</summary>

<div>

Returns distinct values for a given field across matching documents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldName` | <code>string</code> | Yes | The field name to get distinct values for. |
| `filter` | <code>map&lt;json&gt;</code> | No | Query filter document. Defaults to `{}` (all documents). |
| `targetType` | <code>typedesc&lt;anydata&gt;</code> | No | Type for distinct values (inferred from context). |

Returns: `stream<targetType, error?>|mongodb:Error`

Sample code:

```ballerina
stream<string, error?> directors = check moviesCollection->'distinct("director", {});
string[] uniqueDirectors = check from string d in directors select d;
```

Sample response:

```ballerina
["Christopher Nolan", "Bong Joon-ho"]
```

</div>

</details>

#### Update operations

<details>
<summary>updateOne</summary>

<div>

Updates the first document matching the filter using MongoDB update operators.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | <code>map&lt;json&gt;</code> | Yes | Filter to match the document to update. |
| `update` | <code>Update</code> | Yes | Update operators record (`set`, `unset`, `inc`, `mul`, `rename`, etc.). |
| `options` | <code>UpdateOptions</code> | No | Options for upsert, bypassDocumentValidation, comment, hint, and hintString. |

Returns: `UpdateResult|mongodb:Error`

Sample code:

```ballerina
mongodb:UpdateResult result = check moviesCollection->updateOne(
    {title: "Inception"},
    {set: {year: 2010, rating: 8.8}}
);
```

Sample response:

```ballerina
{"matchedCount": 1, "modifiedCount": 1}
```

:::note
The `upsertedId` field appears in the response only when the operation performs an upsert (`upsert: true` is set in `UpdateOptions` and a new document is inserted as a result). For non-upsert calls like the sample above, the field is omitted from the result entirely.
:::

</div>

</details>

<details>
<summary>updateMany</summary>

<div>

Updates all documents matching the filter using MongoDB update operators.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | <code>map&lt;json&gt;</code> | Yes | Filter to match documents to update. |
| `update` | <code>Update</code> | Yes | Update operators record. |
| `options` | <code>UpdateOptions</code> | No | Options for upsert, bypassDocumentValidation, comment, hint, and hintString. |

Returns: `UpdateResult|mongodb:Error`

Sample code:

```ballerina
mongodb:UpdateResult result = check moviesCollection->updateMany(
    {director: "Christopher Nolan"},
    {set: {genre: "Sci-Fi"}}
);
```

Sample response:

```ballerina
{"matchedCount": 3, "modifiedCount": 3}
```

:::note
The `upsertedId` field appears in the response only when the operation performs an upsert. For non-upsert calls like the sample above, the field is omitted from the result entirely.
:::

</div>

</details>

#### Delete operations

<details>
<summary>deleteOne</summary>

<div>

Deletes the first document matching the filter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | <code>map&lt;json&gt;</code> | Yes | Filter to match the document to delete. |

Returns: `DeleteResult|mongodb:Error`

Sample code:

```ballerina
mongodb:DeleteResult result = check moviesCollection->deleteOne({title: "Inception"});
```

Sample response:

```ballerina
{"deletedCount": 1, "acknowledged": true}
```

</div>

</details>

<details>
<summary>deleteMany</summary>

<div>

Deletes all documents matching the filter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | <code>string&#124;map&lt;json&gt;</code> | Yes | Filter for documents to delete. |

Returns: `DeleteResult|mongodb:Error`

Sample code:

```ballerina
mongodb:DeleteResult result = check moviesCollection->deleteMany({director: "Christopher Nolan"});
```

Sample response:

```ballerina
{"deletedCount": 3, "acknowledged": true}
```

</div>

</details>

#### Aggregation

<details>
<summary>aggregate</summary>

<div>

Runs an aggregation pipeline on the collection. Supports stages like $match, $group, $lookup, $sort, $project, $limit, and more.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipeline` | <code>map&lt;json&gt;[]</code> | Yes | Array of aggregation pipeline stage documents. |
| `targetType` | <code>typedesc&lt;anydata&gt;</code> | No | Expected result type (inferred from context). |

Returns: `stream<targetType, error?>|mongodb:Error`

Sample code:

```ballerina
type DirectorSummary record {|
    string _id;
    int movieCount;
|};

stream<DirectorSummary, error?> result = check moviesCollection->aggregate([
    {"$group": {"_id": "$director", "movieCount": {"$sum": 1}}},
    {"$sort": {"movieCount": -1}}
]);
DirectorSummary[] summaries = check from DirectorSummary s in result select s;
```

Sample response:

```ballerina
[{"_id": "Christopher Nolan", "movieCount": 3}, {"_id": "Bong Joon-ho", "movieCount": 1}]
```

</div>

</details>

#### Index management

<details>
<summary>createIndex</summary>

<div>

Creates an index on the collection with the given key specification and options.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | <code>map&lt;json&gt;</code> | Yes | Index key specification (field name to direction, for example `{"title": 1}` for ascending). |
| `options` | <code>CreateIndexOptions</code> | No | Index options (unique, sparse, name, expireAfterSeconds, etc.). |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->createIndex({"title": 1}, {unique: true, name: "title_unique_idx"});
```

</div>

</details>

<details>
<summary>listIndexes</summary>

<div>

Lists all indexes on the collection.


Returns: `stream<Index, error?>|mongodb:Error`

Sample code:

```ballerina
stream<mongodb:Index, error?> indexes = check moviesCollection->listIndexes();
mongodb:Index[] indexList = check from mongodb:Index idx in indexes select idx;
```

Sample response:

```ballerina
[{"ns": "movies.movies", "v": 2, "name": "_id_", "key": {"_id": 1}}, {"ns": "movies.movies", "v": 2, "name": "title_unique_idx", "key": {"title": 1}}]
```

</div>

</details>

<details>
<summary>dropIndex</summary>

<div>

Drops the named index from the collection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexName` | <code>string</code> | Yes | Name of the index to drop. |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->dropIndex("title_unique_idx");
```

</div>

</details>

<details>
<summary>dropIndexes</summary>

<div>

Drops all indexes on the collection except the default `_id` index.


Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->dropIndexes();
```

</div>

</details>

#### Collection operations

<details>
<summary>name</summary>

<div>

Returns the name of the collection. This is not a remote method, it does not invoke a network call.

Returns: `string`

Sample code:

```ballerina
string collectionName = moviesCollection.name();
```

</div>

</details>

<details>
<summary>drop</summary>

<div>

Drops the entire collection from the database.


Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->drop();
```

</div>

</details>

---

## Supporting types

### `ConnectionParameters`

Structured connection parameters used in `ConnectionConfig.connection`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serverAddress` | <code>ServerAddress&#124;ServerAddress[]</code> | `{}` | A single server address, or an array for replica sets and sharded clusters. |
| `auth` | <code>BasicAuthCredential&#124;ScramSha1AuthCredential&#124;ScramSha256AuthCredential&#124;X509Credential&#124;GssApiCredential</code> | Optional | Optional. Authentication credentials: pick the record that matches your server's configured auth mechanism. See [Authentication credentials](#authentication-credentials) below. |

### `ServerAddress`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | `"localhost"` | MongoDB server hostname or IP. |
| `port` | <code>int</code> | `27017` | MongoDB server port. |

### Authentication credentials

The `auth` field of `ConnectionParameters` accepts one of five records, each tagged with a fixed `authMechanism` constant. Pick the record that matches the auth mechanism configured on your MongoDB server.

#### `BasicAuthCredential`: PLAIN

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authMechanism` | <code>AUTH_PLAIN</code> | `AUTH_PLAIN` | Always `"PLAIN"`. Read-only. |
| `username` | <code>string</code> | Required | Username. |
| `password` | <code>string</code> | Required | Password. |
| `database` | <code>string</code> | Required | Authentication source database (typically `"admin"`). |

#### `ScramSha1AuthCredential`: SCRAM-SHA-1

Same field shape as `BasicAuthCredential`. The `authMechanism` is the constant `AUTH_SCRAM_SHA_1` (`"SCRAM_SHA_1"`).

#### `ScramSha256AuthCredential`: SCRAM-SHA-256

Same field shape as `BasicAuthCredential`. The `authMechanism` is the constant `AUTH_SCRAM_SHA_256` (`"SCRAM_SHA_256"`). This is the default mechanism on modern MongoDB servers.

#### `X509Credential`: MongoDB X.509

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authMechanism` | <code>AUTH_MONGODB_X509</code> | `AUTH_MONGODB_X509` | Always `"MONGODB_X509"`. Read-only. |
| `username` | <code>string?</code> | `()` | Optional username for client-certificate authentication. Omit to use the certificate subject. |

#### `GssApiCredential`: GSSAPI / Kerberos

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authMechanism` | <code>AUTH_GSSAPI</code> | `AUTH_GSSAPI` | Always `"GSSAPI"`. Read-only. |
| `username` | <code>string</code> | Required | Kerberos principal username. |
| `serviceName` | <code>string?</code> | Optional | Override the default service name (`"mongodb"`). |

### `ConnectionProperties`

Optional connection-level settings passed via `ConnectionConfig.options`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `readConcern` | <code>ReadConcern?</code> | Optional | Read concern level (see below). |
| `writeConcern` | <code>string?</code> | Optional | Write concern level (for example `"majority"`). |
| `readPreference` | <code>string?</code> | Optional | Read preference for replica sets (for example `"secondaryPreferred"`). |
| `replicaSet` | <code>string?</code> | Optional | Replica-set name. The driver uses it to validate that the cluster matches. |
| `sslEnabled` | <code>boolean</code> | `false` | Enable SSL/TLS. Set `secureSocket` together with this when a custom trust chain is needed. |
| `invalidHostNameAllowed` | <code>boolean</code> | `false` | Allow invalid hostnames in TLS handshakes. |
| `secureSocket` | <code>SecureSocket?</code> | Optional | TLS keystore and truststore configuration. Required when `sslEnabled` is `true` and you provide custom certificates. |
| `retryWrites` | <code>boolean?</code> | Optional | Retry writes on transient errors. |
| `socketTimeout` | <code>int?</code> | Optional | Socket timeout in milliseconds. |
| `connectionTimeout` | <code>int?</code> | Optional | Connection timeout in milliseconds. |
| `maxPoolSize` | <code>int?</code> | Optional | Maximum connections in the pool. |
| `maxIdleTime` | <code>int?</code> | Optional | Maximum idle time of a pooled connection (milliseconds). |
| `maxLifeTime` | <code>int?</code> | Optional | Maximum lifetime of a pooled connection (milliseconds). |
| `minPoolSize` | <code>int?</code> | Optional | Minimum pool size. |
| `localThreshold` | <code>int?</code> | Optional | Local-threshold latency for server selection (milliseconds). |
| `heartbeatFrequency` | <code>int?</code> | Optional | Frequency of cluster heartbeats (milliseconds). |

### `SecureSocket`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `trustStore` | <code>crypto:TrustStore</code> | Required | Truststore (JKS or PKCS12) holding the CA certificates the client trusts. |
| `keyStore` | <code>crypto:KeyStore</code> | Required | Keystore holding the client certificate (used for X.509 auth or mutual TLS). |
| `protocol` | <code>string</code> | Required | TLS protocol name (for example `"TLS"`, `"TLSv1.2"`, `"TLSv1.3"`). |

### `ReadConcern`

A union of the supported read-concern levels:

| Constant | Value | Description |
|----------|-------|-------------|
| `LOCAL` | `"local"` | Default. Returns data from the queried node without durability guarantees. |
| `AVAILABLE` | `"available"` | Like `LOCAL` but more permissive on sharded clusters. |
| `MAJORITY` | `"majority"` | Returns data acknowledged by a majority of replica-set members. |
| `LINEARIZABLE` | `"linearizable"` | Returns data reflecting all majority-acknowledged writes that completed before the read. |
| `SNAPSHOT` | `"snapshot"` | For use within multi-document transactions. |

### `InsertOneOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comment` | <code>string?</code> | Optional | Comment included with the operation in MongoDB logs. |
| `bypassDocumentValidation` | <code>boolean</code> | `false` | Skip server-side schema validation. |

### `InsertManyOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comment` | <code>string?</code> | Optional | Comment included with the operation. |
| `bypassDocumentValidation` | <code>boolean</code> | `false` | Skip server-side schema validation. |
| `ordered` | <code>boolean</code> | `true` | When `true`, insertion stops at the first error. When `false`, the connector attempts every document and reports per-document failures. |

### `FindOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sort` | <code>map&lt;json&gt;</code> | `{}` | Sort specification (for example `{"year": -1}`). |
| `limit` | <code>int?</code> | Optional | Maximum number of documents to return. |
| `batchSize` | <code>int?</code> | Optional | Cursor batch size. |
| `skip` | <code>int?</code> | Optional | Number of documents to skip. |

### `CountOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | <code>int?</code> | Optional | Maximum number of documents to count. |
| `skip` | <code>int?</code> | Optional | Number of documents to skip before counting. |
| `maxTimeMS` | <code>int?</code> | Optional | Maximum time the operation can run, in milliseconds. |
| `hint` | <code>string?</code> | Optional | Hint as a JSON string indicating which index to use. |

### `CreateIndexOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `background` | <code>boolean?</code> | Optional | Build the index in the background (legacy MongoDB). |
| `unique` | <code>boolean?</code> | Optional | Enforce uniqueness on the indexed fields. |
| `name` | <code>string?</code> | `()` | Custom index name. |
| `sparse` | <code>boolean?</code> | Optional | Index only documents where the indexed field exists. |
| `expireAfterSeconds` | <code>int?</code> | Optional | TTL on documents in the collection. Creates a TTL index. |
| `version` | <code>int?</code> | Optional | Index version number. |
| `weights` | <code>map&lt;json&gt;?</code> | Optional | Per-field weights for text indexes. |
| `defaultLanguage` | <code>string?</code> | Optional | Default language for text indexes. |
| `languageOverride` | <code>string?</code> | Optional | Field name that overrides the default language per document. |
| `textVersion` | <code>int?</code> | Optional | Text-index version. |
| `sphereVersion` | <code>int?</code> | Optional | 2dsphere-index version. |
| `bits` | <code>int?</code> | Optional | 2d-index geohash precision. |
| `min` | <code>float?</code> | Optional | 2d-index minimum boundary. |
| `max` | <code>float?</code> | Optional | 2d-index maximum boundary. |
| `partialFilterExpression` | <code>map&lt;json&gt;</code> | `{}` | Filter expression for partial indexes. |
| `hidden` | <code>boolean?</code> | Optional | Hide the index from the query planner. |

### `UpdateOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `upsert` | <code>boolean</code> | `false` | Insert a new document if no match is found. |
| `bypassDocumentValidation` | <code>boolean</code> | `false` | Skip server-side schema validation. |
| `comment` | <code>string?</code> | Optional | Comment included with the operation. |
| `hint` | <code>map&lt;json&gt;?</code> | Optional | Hint as a document indicating which index to use. |
| `hintString` | <code>string?</code> | Optional | Hint as a string indicating which index to use. |

### `Update`

A record where each field corresponds to a MongoDB update operator. The connector adds the leading `$` to each operator name automatically: writing `set` produces `$set` on the wire. All fields are optional. The record is open, so any additional MongoDB update operator can be passed and will likewise receive the `$` prefix.

| Field | MongoDB operator | Description |
|-------|------------------|-------------|
| `set` | `$set` | Set field values. |
| `unset` | `$unset` | Remove fields. |
| `inc` | `$inc` | Increment numeric values. |
| `mul` | `$mul` | Multiply numeric values. |
| `min` | `$min` | Update only if the new value is less than the existing value. |
| `max` | `$max` | Update only if the new value is greater than the existing value. |
| `rename` | `$rename` | Rename a field. |
| `currentDate` | `$currentDate` | Set a field to the current date or timestamp. |
| `setOnInsert` | `$setOnInsert` | Set a field only when the operation results in an insert (used with `upsert: true`). |

### `UpdateResult`

| Field | Type | Description |
|-------|------|-------------|
| `matchedCount` | <code>int</code> | Number of documents matched by the filter. |
| `modifiedCount` | <code>int</code> | Number of documents whose contents actually changed. |
| `upsertedId` | <code>string?</code> | Optional. Set only when an upsert occurred and a new `_id` was assigned. Absent from the result otherwise. |

### `DeleteResult`

| Field | Type | Description |
|-------|------|-------------|
| `deletedCount` | <code>int</code> | Number of documents deleted. |
| `acknowledged` | <code>boolean</code> | Whether the operation was acknowledged by the server. |

### `Index`

| Field | Type | Description |
|-------|------|-------------|
| `ns` | <code>string</code> | Index namespace (`<database>.<collection>`). |
| `v` | <code>int</code> | Index version. |
| `name` | <code>string</code> | Index name. |
| `key` | <code>map&lt;json&gt;</code> | Index key specification. |

`Index` is an open record. Servers may include additional fields (`unique`, `sparse`, `weights`, etc.) depending on the index type.
