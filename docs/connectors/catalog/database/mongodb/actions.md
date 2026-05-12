---
title: Actions
---

# Actions

The `ballerinax/mongodb` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Top-level client for connecting to MongoDB, listing databases, and obtaining Database references. |
| [`Database`](#database) | Represents a MongoDB database. Manage collections and drop the database. |
| [`Collection`](#collection) | Document CRUD, queries, aggregation pipelines, distinct values, and index management. |

> **Note on error types**: All operations return errors as `mongodb:Error`, a union of `mongodb:DatabaseError`, `mongodb:ApplicationError`, and Ballerina's built-in `error`. `mongodb:DatabaseError` carries an additional `mongoDBExceptionType` detail field for command-level failures.

---

## Client

Top-level client for connecting to MongoDB, listing databases, and obtaining Database references.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connection` | `ConnectionParameters\|string` | Required | Structured connection parameters or a MongoDB connection string URI. |
| `options` | `ConnectionProperties?` | `()` | Optional connection properties (read concern, write concern, pool settings, SSL, timeouts). |

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

</details>

<details>
<summary>getDatabase</summary>

Retrieves a Database object for the named database.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `databaseName` | `string` | Yes | Name of the database to retrieve. |

Returns: `mongodb:Database|mongodb:Error`

Sample code:

```ballerina
mongodb:Database moviesDb = check mongoClient->getDatabase("movies");
```

</details>

<details>
<summary>close</summary>

Closes the MongoDB client connection. Use a single client instance for the application lifetime.

Returns: `mongodb:Error?`

Sample code:

```ballerina
check mongoClient->close();
```

</details>

---

## Database

Represents a MongoDB database. Manage collections and drop the database.

### Configuration

> `Database` has no direct configuration. Instances are obtained via `Client->getDatabase()`.

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

</details>

<details>
<summary>createCollection</summary>

Creates a new collection in the database.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionName` | `string` | Yes | Name of the collection to create. |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesDb->createCollection("movies");
```

</details>

<details>
<summary>getCollection</summary>

Gets a Collection object for the named collection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionName` | `string` | Yes | Name of the collection to retrieve. |

Returns: `mongodb:Collection|mongodb:Error`

Sample code:

```ballerina
mongodb:Collection moviesCollection = check moviesDb->getCollection("movies");
```

</details>

#### Database operations

<details>
<summary>drop</summary>

Drops the entire database and all its collections.

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesDb->drop();
```

</details>

---

## Collection

Document CRUD, queries, aggregation pipelines, distinct values, and index management.

### Configuration

> `Collection` has no direct configuration. Instances are obtained via `Database->getCollection()`.

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

Inserts a single document into the collection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `document` | `record {\|anydata...;\|}` | Yes | The document to insert. |
| `options` | `InsertOneOptions` | No | Insert options (comment, bypassDocumentValidation). |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->insertOne({
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan"
});
```

</details>

<details>
<summary>insertMany</summary>

Inserts multiple documents into the collection. When `ordered` is true (default), insertion stops on the first error.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `documents` | `record {\|anydata...;\|}[]` | Yes | Array of documents to insert. |
| `options` | `InsertManyOptions` | No | Insert options (comment, bypassDocumentValidation, ordered). |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->insertMany([
    {title: "The Dark Knight", year: 2008, director: "Christopher Nolan"},
    {title: "Interstellar", year: 2014, director: "Christopher Nolan"},
    {title: "Parasite", year: 2019, director: "Bong Joon-ho"}
]);
```

</details>

#### Query operations

<details>
<summary>find</summary>

Finds all documents matching the filter and returns a stream of typed records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | No | Query filter document. Defaults to `{}` (match all). |
| `findOptions` | `FindOptions` | No | Sort, limit, skip, and batchSize options. |
| `projection` | `map<json>?` | No | Projection document to include/exclude fields. |
| `targetType` | `typedesc<record {\|anydata...;\|}>` | No | Expected record type for results (inferred from context). |

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

</details>

<details>
<summary>findOne</summary>

Finds the first document matching the filter. Returns `()` if no match is found.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | No | Query filter document. |
| `findOptions` | `FindOptions` | No | Sort, limit, skip, and batchSize options. |
| `projection` | `map<json>?` | No | Projection document to include/exclude fields. |
| `targetType` | `typedesc<record {\|anydata...;\|}>` | No | Expected record type (inferred from context). |

Returns: `targetType|mongodb:Error?`

Sample code:

```ballerina
Movie? movie = check moviesCollection->findOne({title: "Inception"});
```

Sample response:

```ballerina
{"title": "Inception", "year": 2010, "director": "Christopher Nolan"}
```

</details>

<details>
<summary>countDocuments</summary>

Counts documents in the collection matching the filter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | No | Query filter document. Defaults to `{}` (count all). |
| `options` | `CountOptions` | No | Options for limit, skip, maxTimeMS, and hint. |

Returns: `int|mongodb:Error`

Sample code:

```ballerina
int count = check moviesCollection->countDocuments({director: "Christopher Nolan"});
```

Sample response:

```ballerina
3
```

</details>

<details>
<summary>distinct</summary>

Returns distinct values for a given field across matching documents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldName` | `string` | Yes | The field name to get distinct values for. |
| `filter` | `map<json>` | No | Query filter document. Defaults to `{}` (all documents). |
| `targetType` | `typedesc<anydata>` | No | Type for distinct values (inferred from context). |

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

</details>

#### Update operations

<details>
<summary>updateOne</summary>

Updates the first document matching the filter using MongoDB update operators.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | Yes | Filter to match the document to update. |
| `update` | `Update` | Yes | Update operators record (`set`, `unset`, `inc`, `mul`, `rename`, etc.). |
| `options` | `UpdateOptions` | No | Options for upsert, bypassDocumentValidation, comment, hint, and hintString. |

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

**Note:** The `upsertedId` field appears in the response only when the operation performs an upsert (`upsert: true` is set in `UpdateOptions` and a new document is inserted as a result). For non-upsert calls like the sample above, the field is omitted from the result entirely.

</details>

<details>
<summary>updateMany</summary>

Updates all documents matching the filter using MongoDB update operators.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | Yes | Filter to match documents to update. |
| `update` | `Update` | Yes | Update operators record. |
| `options` | `UpdateOptions` | No | Options for upsert, bypassDocumentValidation, comment, hint, and hintString. |

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

**Note:** The `upsertedId` field appears in the response only when the operation performs an upsert. For non-upsert calls like the sample above, the field is omitted from the result entirely.

</details>

#### Delete operations

<details>
<summary>deleteOne</summary>

Deletes the first document matching the filter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | Yes | Filter to match the document to delete. |

Returns: `DeleteResult|mongodb:Error`

Sample code:

```ballerina
mongodb:DeleteResult result = check moviesCollection->deleteOne({title: "Inception"});
```

Sample response:

```ballerina
{"deletedCount": 1, "acknowledged": true}
```

</details>

<details>
<summary>deleteMany</summary>

Deletes all documents matching the filter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `string\|map<json>` | Yes | Filter for documents to delete. |

Returns: `DeleteResult|mongodb:Error`

Sample code:

```ballerina
mongodb:DeleteResult result = check moviesCollection->deleteMany({director: "Christopher Nolan"});
```

Sample response:

```ballerina
{"deletedCount": 3, "acknowledged": true}
```

</details>

#### Aggregation

<details>
<summary>aggregate</summary>

Runs an aggregation pipeline on the collection. Supports stages like $match, $group, $lookup, $sort, $project, $limit, and more.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipeline` | `map<json>[]` | Yes | Array of aggregation pipeline stage documents. |
| `targetType` | `typedesc<anydata>` | No | Expected result type (inferred from context). |

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

</details>

#### Index management

<details>
<summary>createIndex</summary>

Creates an index on the collection with the given key specification and options.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | `map<json>` | Yes | Index key specification (field name to direction, e.g. `{"title": 1}` for ascending). |
| `options` | `CreateIndexOptions` | No | Index options (unique, sparse, name, expireAfterSeconds, etc.). |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->createIndex({"title": 1}, {unique: true, name: "title_unique_idx"});
```

</details>

<details>
<summary>listIndexes</summary>

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

</details>

<details>
<summary>dropIndex</summary>

Drops the named index from the collection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexName` | `string` | Yes | Name of the index to drop. |

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->dropIndex("title_unique_idx");
```

</details>

<details>
<summary>dropIndexes</summary>

Drops all indexes on the collection except the default `_id` index.

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->dropIndexes();
```

</details>

#### Collection operations

<details>
<summary>name</summary>

Returns the name of the collection. This is not a remote method, it does not invoke a network call.

Returns: `string`

Sample code:

```ballerina
string collectionName = moviesCollection.name();
```

</details>

<details>
<summary>drop</summary>

Drops the entire collection from the database.

Returns: `mongodb:Error?`

Sample code:

```ballerina
check moviesCollection->drop();
```

</details>

---

## Supporting types

### `ConnectionParameters`

Structured connection parameters used in `ConnectionConfig.connection`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serverAddress` | `ServerAddress\|ServerAddress[]` | `{}` | A single server address, or an array for replica sets / sharded clusters. |
| `auth` | `BasicAuthCredential \| ScramSha1AuthCredential \| ScramSha256AuthCredential \| X509Credential \| GssApiCredential` | `()` | Optional. Authentication credentials: pick the record that matches your server's configured auth mechanism. See [Authentication credentials](#authentication-credentials) below. |

### `ServerAddress`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | `string` | `"localhost"` | MongoDB server hostname or IP. |
| `port` | `int` | `27017` | MongoDB server port. |

### Authentication credentials

The `auth` field of `ConnectionParameters` accepts one of five records, each tagged with a fixed `authMechanism` constant. Pick the record that matches the auth mechanism configured on your MongoDB server.

#### `BasicAuthCredential`: PLAIN

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authMechanism` | `AUTH_PLAIN` | `AUTH_PLAIN` | Always `"PLAIN"`. Read-only. |
| `username` | `string` | Required | Username. |
| `password` | `string` | Required | Password. |
| `database` | `string` | Required | Authentication source database (typically `"admin"`). |

#### `ScramSha1AuthCredential`: SCRAM-SHA-1

Same field shape as `BasicAuthCredential`. The `authMechanism` is the constant `AUTH_SCRAM_SHA_1` (`"SCRAM_SHA_1"`).

#### `ScramSha256AuthCredential`: SCRAM-SHA-256

Same field shape as `BasicAuthCredential`. The `authMechanism` is the constant `AUTH_SCRAM_SHA_256` (`"SCRAM_SHA_256"`). This is the default mechanism on modern MongoDB servers.

#### `X509Credential`: MongoDB X.509

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authMechanism` | `AUTH_MONGODB_X509` | `AUTH_MONGODB_X509` | Always `"MONGODB_X509"`. Read-only. |
| `username` | `string?` | `()` | Optional username for client-certificate authentication. Omit to use the certificate subject. |

#### `GssApiCredential`: GSSAPI / Kerberos

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authMechanism` | `AUTH_GSSAPI` | `AUTH_GSSAPI` | Always `"GSSAPI"`. Read-only. |
| `username` | `string` | Required | Kerberos principal username. |
| `serviceName` | `string?` | `()` | Override the default service name (`"mongodb"`). |

### `ConnectionProperties`

Optional connection-level settings passed via `ConnectionConfig.options`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `readConcern` | `ReadConcern?` | `()` | Read concern level (see below). |
| `writeConcern` | `string?` | `()` | Write concern level (e.g. `"majority"`). |
| `readPreference` | `string?` | `()` | Read preference for replica sets (e.g. `"secondaryPreferred"`). |
| `replicaSet` | `string?` | `()` | Replica-set name. The driver uses it to validate that the cluster matches. |
| `sslEnabled` | `boolean` | `false` | Enable SSL/TLS. Set `secureSocket` together with this when a custom trust chain is needed. |
| `invalidHostNameAllowed` | `boolean` | `false` | Allow invalid hostnames in TLS handshakes. |
| `secureSocket` | `SecureSocket?` | `()` | TLS keystore/truststore configuration. Required when `sslEnabled` is `true` and you provide custom certificates. |
| `retryWrites` | `boolean?` | `()` | Retry writes on transient errors. |
| `socketTimeout` | `int?` | `()` | Socket timeout in milliseconds. |
| `connectionTimeout` | `int?` | `()` | Connection timeout in milliseconds. |
| `maxPoolSize` | `int?` | `()` | Maximum connections in the pool. |
| `maxIdleTime` | `int?` | `()` | Maximum idle time of a pooled connection (milliseconds). |
| `maxLifeTime` | `int?` | `()` | Maximum lifetime of a pooled connection (milliseconds). |
| `minPoolSize` | `int?` | `()` | Minimum pool size. |
| `localThreshold` | `int?` | `()` | Local-threshold latency for server selection (milliseconds). |
| `heartbeatFrequency` | `int?` | `()` | Frequency of cluster heartbeats (milliseconds). |

### `SecureSocket`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `trustStore` | `crypto:TrustStore` | Required | Truststore (JKS / PKCS12) holding the CA certificates the client trusts. |
| `keyStore` | `crypto:KeyStore` | Required | Keystore holding the client certificate (used for X.509 auth or mutual TLS). |
| `protocol` | `string` | Required | TLS protocol name (e.g. `"TLS"`, `"TLSv1.2"`, `"TLSv1.3"`). |

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
| `comment` | `string?` | `()` | Comment included with the operation in MongoDB logs. |
| `bypassDocumentValidation` | `boolean` | `false` | Skip server-side schema validation. |

### `InsertManyOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comment` | `string?` | `()` | Comment included with the operation. |
| `bypassDocumentValidation` | `boolean` | `false` | Skip server-side schema validation. |
| `ordered` | `boolean` | `true` | When `true`, insertion stops at the first error; when `false`, attempts every document and reports per-document failures. |

### `FindOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sort` | `map<json>` | `{}` | Sort specification (e.g. `{"year": -1}`). |
| `limit` | `int?` | `()` | Maximum number of documents to return. |
| `batchSize` | `int?` | `()` | Cursor batch size. |
| `skip` | `int?` | `()` | Number of documents to skip. |

### `CountOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | `int?` | `()` | Maximum number of documents to count. |
| `skip` | `int?` | `()` | Number of documents to skip before counting. |
| `maxTimeMS` | `int?` | `()` | Maximum time the operation can run, in milliseconds. |
| `hint` | `string?` | `()` | Hint as a JSON string indicating which index to use. |

### `CreateIndexOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `background` | `boolean?` | `()` | Build the index in the background (legacy MongoDB). |
| `unique` | `boolean?` | `()` | Enforce uniqueness on the indexed fields. |
| `name` | `string?` | `()` | Custom index name. |
| `sparse` | `boolean?` | `()` | Index only documents where the indexed field exists. |
| `expireAfterSeconds` | `int?` | `()` | TTL on documents in the collection, creates a TTL index. |
| `version` | `int?` | `()` | Index version number. |
| `weights` | `map<json>?` | `()` | Per-field weights for text indexes. |
| `defaultLanguage` | `string?` | `()` | Default language for text indexes. |
| `languageOverride` | `string?` | `()` | Field name that overrides the default language per document. |
| `textVersion` | `int?` | `()` | Text-index version. |
| `sphereVersion` | `int?` | `()` | 2dsphere-index version. |
| `bits` | `int?` | `()` | 2d-index geohash precision. |
| `min` | `float?` | `()` | 2d-index minimum boundary. |
| `max` | `float?` | `()` | 2d-index maximum boundary. |
| `partialFilterExpression` | `map<json>` | `{}` | Filter expression for partial indexes. |
| `hidden` | `boolean?` | `()` | Hide the index from the query planner. |

### `UpdateOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `upsert` | `boolean` | `false` | Insert a new document if no match is found. |
| `bypassDocumentValidation` | `boolean` | `false` | Skip server-side schema validation. |
| `comment` | `string?` | `()` | Comment included with the operation. |
| `hint` | `map<json>?` | `()` | Hint as a document indicating which index to use. |
| `hintString` | `string?` | `()` | Hint as a string indicating which index to use. |

### `Update`

A record where each field corresponds to a MongoDB update operator. The connector adds the leading `$` to each operator name automatically. Write `set`, the wire payload contains `$set`. All fields are optional; the record is **open**, so any additional MongoDB update operator can be passed and will likewise receive the `$` prefix.

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
| `matchedCount` | `int` | Number of documents matched by the filter. |
| `modifiedCount` | `int` | Number of documents whose contents actually changed. |
| `upsertedId` | `string?` | _Optional._ Set only when an upsert occurred and a new `_id` was assigned. Absent from the result otherwise. |

### `DeleteResult`

| Field | Type | Description |
|-------|------|-------------|
| `deletedCount` | `int` | Number of documents deleted. |
| `acknowledged` | `boolean` | Whether the operation was acknowledged by the server. |

### `Index`

| Field | Type | Description |
|-------|------|-------------|
| `ns` | `string` | Index namespace (`<database>.<collection>`). |
| `v` | `int` | Index version. |
| `name` | `string` | Index name. |
| `key` | `map<json>` | Index key specification. |

`Index` is an open record. Servers may include additional fields (`unique`, `sparse`, `weights`, etc.) depending on the index type.
