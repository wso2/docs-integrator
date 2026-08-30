---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/redis` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides operations to interact with a Redis server or cluster for data storage and retrieval. |

---

## Client

Provides operations to interact with a Redis server or cluster for data storage and retrieval.

### Configuration

The client is configured with a `ConnectionConfig` record.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connection` | `ConnectionUri\|ConnectionParams` | `"redis://localhost:6379"` | Redis connection URI string or a `ConnectionParams` record with host, port, username, password, and options. |
| `connectionPooling` | `boolean` | `false` | Whether to enable connection pooling. |
| `isClusterConnection` | `boolean` | `false` | Whether this is a Redis cluster connection. |
| `secureSocket` | `SecureSocket?` | `()` | SSL/TLS configuration for encrypted connections. |

### Configuration types

#### `ConnectionUri`

A Redis connection URI string. Aliases `string`.

Format: `redis://[username:password@]host[:port][/database]` for unencrypted, or `rediss://...` for TLS.

#### `ConnectionParams`

Field-based connection configuration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | `string` | `"localhost"` | Host address of the Redis database. |
| `port` | `int` | `6379` | Port of the Redis database. |
| `username` | `string?` | `()` | Username for the Redis database (Redis 6.0+ ACL). |
| `password` | `string?` | `()` | Password for the Redis database. |
| `options` | `Options` | `{}` | Additional connection options. |

#### `Options`

Connection options.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `clientName` | `string?` | `()` | Name of the client. |
| `database` | `int` | `0` | Database index the client should interact with. Not applicable for cluster connections. |
| `connectionTimeout` | `int` | `60` | Connection timeout in seconds. |
| `keepAlive` | `KeepAliveConfig?` | `()` | TCP keep-alive configuration for detecting stale connections. Set to `()` to disable. |

#### `KeepAliveConfig`

TCP keep-alive parameters.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `idle` | `int` | `7200` | Time in seconds the connection must be idle before the first keep-alive probe is sent. |
| `interval` | `int` | `75` | Time in seconds between individual keep-alive probes. |
| `count` | `int` | `9` | Maximum number of keep-alive probes before the connection is considered dead. |

#### `SecureSocket`

SSL/TLS configuration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `cert` | `crypto:TrustStore\|string?` | `()` | A `crypto:TrustStore` record (`{path, password}`) or a path to a single certificate file the client trusts. |
| `key` | `crypto:KeyStore\|CertKey?` | `()` | A `crypto:KeyStore` record (`{path, password}`) or a `CertKey` value (used for mutual TLS). |
| `protocols` | `string[]?` | `()` | List of protocols used for the connection, such as `TLSv1.2`, `TLSv1.1`, `TLSv1`. |
| `ciphers` | `string[]?` | `()` | List of ciphers to be used for SSL connections. |
| `verifyMode` | `SslVerifyMode` | `FULL` | Server-certificate verification mode. |
| `startTls` | `boolean` | `false` | Whether StartTLS is enabled. |

#### `CertKey`

Client certificate and private key (used for mutual TLS).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `certFile` | `string` | Required | Path to the certificate file. |
| `keyFile` | `string` | Required | Path to the private key file in PKCS8 format. |
| `keyPassword` | `string?` | `()` | Password of the private key, if encrypted. |

#### `SslVerifyMode`

Enum of TLS verification modes:

- `NONE`: No verification.
- `CA`: Verify the server's certificate against the provided CA certificates.
- `FULL`: Verify the server's certificate against the provided CA certificates and also verify the server's hostname.

### Initializing the client

Using a connection URI:

```ballerina
import ballerinax/redis;

redis:Client redis = check new ({
    connection: "redis://localhost:6379"
});
```

Or using connection parameters with authentication:

```ballerina
import ballerinax/redis;

redis:Client redis = check new ({
    connection: {
        host: "localhost",
        port: 6379,
        password: "my_password"
    }
});
```

### Operations

#### String operations

<details>
<summary>set</summary>

<div>

Set the string value of a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to set. |
| `value` | `string` | Yes | The value to set. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->set("name", "John");
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>get</summary>

<div>

Get the value of a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to retrieve. |

Returns: `string|redis:Error?`

Sample code:

```ballerina
string? value = check redis->get("name");
```

Sample response:

```ballerina
"John"
```

</div>

</details>

<details>
<summary>append</summary>

<div>

Append a value to a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to append to. |
| `value` | `string` | Yes | The value to append. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int length = check redis->append("greeting", " World");
```

Sample response:

```ballerina
11
```

</div>

</details>

<details>
<summary>incr</summary>

<div>

Increment the integer value of a key by one.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to increment. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int newValue = check redis->incr("counter");
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>incrBy</summary>

<div>

Increment the integer value of a key by the given amount.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to increment. |
| `value` | `int` | Yes | The increment amount. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int newValue = check redis->incrBy("counter", 5);
```

Sample response:

```ballerina
6
```

</div>

</details>

<details>
<summary>incrByFloat</summary>

<div>

Increment the float value of a key by the given amount.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to increment. |
| `value` | `float` | Yes | The float increment amount. |

Returns: `float|redis:Error`

Sample code:

```ballerina
float newValue = check redis->incrByFloat("price", 2.5);
```

Sample response:

```ballerina
12.5
```

</div>

</details>

<details>
<summary>decr</summary>

<div>

Decrement the integer value of a key by one.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to decrement. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int newValue = check redis->decr("counter");
```

Sample response:

```ballerina
4
```

</div>

</details>

<details>
<summary>decrBy</summary>

<div>

Decrement the integer value of a key by the given number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to decrement. |
| `value` | `int` | Yes | The decrement amount. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int newValue = check redis->decrBy("counter", 3);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>mSet</summary>

<div>

Set multiple keys to multiple values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyValueMap` | `map<any>` | Yes | A map of key-value pairs to set. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->mSet({
    "key1": "value1",
    "key2": "value2",
    "key3": "value3"
});
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>mGet</summary>

<div>

Get the values of all the given keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | `string[]` | Yes | Array of keys to retrieve. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] values = check redis->mGet(["key1", "key2", "key3"]);
```

Sample response:

```ballerina
["value1", "value2", "value3"]
```

</div>

</details>

<details>
<summary>mSetNx</summary>

<div>

Set multiple keys to multiple values, only if none of the keys exist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyValueMap` | `map<any>` | Yes | A map of key-value pairs to set. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean result = check redis->mSetNx({"nx1": "val1", "nx2": "val2"});
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>setEx</summary>

<div>

Set the value and expiration (in seconds) of a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to set. |
| `value` | `string` | Yes | The value to set. |
| `expirationTime` | `int` | Yes | Expiration time in seconds. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->setEx("session:abc123", "user_data", 3600);
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>pSetEx</summary>

<div>

Set value and expiration in milliseconds of a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to set. |
| `value` | `string` | Yes | The value to set. |
| `expirationTime` | `int` | Yes | Expiration time in milliseconds. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->pSetEx("temp:data", "ephemeral", 5000);
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>setNx</summary>

<div>

Set the value of a key, only if the key does not exist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to set. |
| `value` | `string` | Yes | The value to set. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean wasSet = check redis->setNx("lock:resource1", "locked");
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>getSet</summary>

<div>

Set the string value of a key and return its old value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to set. |
| `value` | `string` | Yes | The new value. |

Returns: `string|redis:Error?`

Sample code:

```ballerina
string? oldValue = check redis->getSet("status", "active");
```

Sample response:

```ballerina
"inactive"
```

</div>

</details>

<details>
<summary>getRange</summary>

<div>

Get a substring of the string stored at a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |
| `startPos` | `int` | Yes | Start offset (inclusive). |
| `end` | `int` | Yes | End offset (inclusive). |

Returns: `string|redis:Error`

Sample code:

```ballerina
string substring = check redis->getRange("greeting", 0, 4);
```

Sample response:

```ballerina
"Hello"
```

</div>

</details>

<details>
<summary>setRange</summary>

<div>

Overwrite part of a string at key starting at the specified offset.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |
| `offset` | `int` | Yes | The byte offset to start overwriting at. |
| `value` | `string` | Yes | The value to write. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int newLen = check redis->setRange("greeting", 6, "Redis");
```

Sample response:

```ballerina
11
```

</div>

</details>

<details>
<summary>strLen</summary>

<div>

Get the length of the value stored in a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int length = check redis->strLen("name");
```

Sample response:

```ballerina
4
```

</div>

</details>

<details>
<summary>bitCount</summary>

<div>

Count the number of set bits (population counting) in a string.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int bits = check redis->bitCount("mybitfield");
```

Sample response:

```ballerina
6
```

</div>

</details>

<details>
<summary>setBit</summary>

<div>

Sets or clears the bit at offset in the string value stored at key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |
| `value` | `int` | Yes | The bit value (0 or 1). |
| `offset` | `int` | Yes | The bit offset. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int originalBit = check redis->setBit("mybitfield", 1, 7);
```

Sample response:

```ballerina
0
```

</div>

</details>

<details>
<summary>getBit</summary>

<div>

Returns the bit value at offset in the string value stored at key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |
| `offset` | `int` | Yes | The bit offset. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int bit = check redis->getBit("mybitfield", 7);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>bitOpAnd</summary>

<div>

Perform a bitwise AND operation between multiple strings and store the result.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `keys` | `string[]` | Yes | The source keys. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int resultLen = check redis->bitOpAnd("result", ["key1", "key2"]);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>bitOpOr</summary>

<div>

Perform a bitwise OR operation between multiple strings and store the result.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `keys` | `string[]` | Yes | The source keys. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int resultLen = check redis->bitOpOr("result", ["key1", "key2"]);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>bitOpNot</summary>

<div>

Perform a bitwise NOT operation on a string and store the result.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `key` | `string` | Yes | The source key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int resultLen = check redis->bitOpNot("result", "source");
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>bitOpXor</summary>

<div>

Perform a bitwise XOR operation between multiple strings and store the result.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `keys` | `string[]` | Yes | The source keys. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int resultLen = check redis->bitOpXor("result", ["key1", "key2"]);
```

Sample response:

```ballerina
1
```

</div>

</details>

#### List operations

<details>
<summary>lPush</summary>

<div>

Prepend one or multiple values to a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `values` | `string[]` | Yes | The values to prepend. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int listLen = check redis->lPush("tasks", ["task1", "task2", "task3"]);
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>rPush</summary>

<div>

Append one or multiple values to a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `values` | `string[]` | Yes | The values to append. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int listLen = check redis->rPush("queue", ["item1", "item2"]);
```

Sample response:

```ballerina
2
```

</div>

</details>

<details>
<summary>lPop</summary>

<div>

Remove and get the first element in a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |

Returns: `string|redis:Error?`

Sample code:

```ballerina
string? first = check redis->lPop("tasks");
```

Sample response:

```ballerina
"task3"
```

</div>

</details>

<details>
<summary>rPop</summary>

<div>

Remove and get the last element in a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |

Returns: `string|redis:Error?`

Sample code:

```ballerina
string? last = check redis->rPop("tasks");
```

Sample response:

```ballerina
"task1"
```

</div>

</details>

<details>
<summary>lPushX</summary>

<div>

Prepend values to a list, only if the list exists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `values` | `string[]` | Yes | The values to prepend. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int listLen = check redis->lPushX("tasks", ["urgent_task"]);
```

Sample response:

```ballerina
4
```

</div>

</details>

<details>
<summary>rPushX</summary>

<div>

Append values to a list, only if the list exists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `values` | `string[]` | Yes | The values to append. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int listLen = check redis->rPushX("queue", ["late_item"]);
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>bLPop</summary>

<div>

Remove and get the first element in a list, or block until one is available.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeOut` | `int` | Yes | Timeout in seconds (0 to block indefinitely). |
| `keys` | `string[]` | Yes | The list keys to pop from. |

Returns: `map<any>|redis:Error`

Sample code:

```ballerina
map<any> result = check redis->bLPop(30, ["queue"]);
```

Sample response:

```ballerina
{"queue": "item1"}
```

</div>

</details>

<details>
<summary>bRPop</summary>

<div>

Remove and get the last element in a list, or block until one is available.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeout` | `int` | Yes | Timeout in seconds (0 to block indefinitely). |
| `keys` | `string[]` | Yes | The list keys to pop from. |

Returns: `map<any>|redis:Error`

Sample code:

```ballerina
map<any> result = check redis->bRPop(30, ["queue"]);
```

Sample response:

```ballerina
{"queue": "item2"}
```

</div>

</details>

<details>
<summary>lIndex</summary>

<div>

Get an element from a list by its index.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `index` | `int` | Yes | Zero-based index (negative indices count from the end). |

Returns: `string|redis:Error?`

Sample code:

```ballerina
string? element = check redis->lIndex("tasks", 0);
```

Sample response:

```ballerina
"task1"
```

</div>

</details>

<details>
<summary>lInsert</summary>

<div>

Insert an element before or after another element in a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `before` | `boolean` | Yes | `true` to insert before the pivot, `false` to insert after. |
| `pivot` | `string` | Yes | The reference element. |
| `value` | `string` | Yes | The value to insert. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int listLen = check redis->lInsert("tasks", true, "task2", "task1.5");
```

Sample response:

```ballerina
4
```

</div>

</details>

<details>
<summary>lLen</summary>

<div>

Get the length of a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int length = check redis->lLen("tasks");
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>lRange</summary>

<div>

Get a range of elements from a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `startPos` | `int` | Yes | Start index (inclusive). |
| `stopPos` | `int` | Yes | Stop index (inclusive). |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] elements = check redis->lRange("tasks", 0, -1);
```

Sample response:

```ballerina
["task1", "task2", "task3"]
```

</div>

</details>

<details>
<summary>lRem</summary>

<div>

Remove elements from a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `count` | `int` | Yes | Number of occurrences to remove (0 = all, positive = from head, negative = from tail). |
| `value` | `string` | Yes | The value to remove. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int removed = check redis->lRem("tasks", 1, "task2");
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>lSet</summary>

<div>

Set the value of an element in a list by its index.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `index` | `int` | Yes | The index of the element. |
| `value` | `string` | Yes | The new value. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->lSet("tasks", 0, "updated_task");
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>lTrim</summary>

<div>

Trim a list to the specified range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The list key. |
| `startPos` | `int` | Yes | Start index (inclusive). |
| `stopPos` | `int` | Yes | Stop index (inclusive). |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->lTrim("tasks", 0, 9);
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>rPopLPush</summary>

<div>

Remove the last element in a list, prepend it to another list, and return it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | Yes | The source list key. |
| `destination` | `string` | Yes | The destination list key. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string moved = check redis->rPopLPush("processing", "completed");
```

Sample response:

```ballerina
"task1"
```

</div>

</details>

#### Set operations

<details>
<summary>sAdd</summary>

<div>

Add one or more members to a set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The set key. |
| `values` | `string[]` | Yes | The members to add. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int added = check redis->sAdd("tags", ["ballerina", "redis", "integration"]);
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>sMembers</summary>

<div>

Get all the members in a set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The set key. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] members = check redis->sMembers("tags");
```

Sample response:

```ballerina
["ballerina", "redis", "integration"]
```

</div>

</details>

<details>
<summary>sCard</summary>

<div>

Get the number of members in a set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The set key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->sCard("tags");
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>sIsMember</summary>

<div>

Determine if a given value is a member of a set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The set key. |
| `value` | `string` | Yes | The value to check. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean isMember = check redis->sIsMember("tags", "redis");
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>sRem</summary>

<div>

Remove one or more members from a set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The set key. |
| `members` | `string[]` | Yes | The members to remove. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int removed = check redis->sRem("tags", ["integration"]);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>sPop</summary>

<div>

Remove and return one or more random members from a set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The set key. |
| `count` | `int` | Yes | Number of members to pop. |

Returns: `string[]|redis:Error?`

Sample code:

```ballerina
string[]? popped = check redis->sPop("tags", 1);
```

Sample response:

```ballerina
["redis"]
```

</div>

</details>

<details>
<summary>sRandMember</summary>

<div>

Get one or multiple random members from a set without removing them.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The set key. |
| `count` | `int` | Yes | Number of random members to return. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] randomMembers = check redis->sRandMember("tags", 2);
```

Sample response:

```ballerina
["ballerina", "redis"]
```

</div>

</details>

<details>
<summary>sMove</summary>

<div>

Move a member from one set to another.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | Yes | The source set key. |
| `destination` | `string` | Yes | The destination set key. |
| `member` | `string` | Yes | The member to move. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean moved = check redis->sMove("active_tags", "archived_tags", "old_tag");
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>sDiff</summary>

<div>

Return the set resulting from the difference between the first set and all successive sets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | `string[]` | Yes | The set keys. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] diff = check redis->sDiff(["set1", "set2"]);
```

Sample response:

```ballerina
["unique_to_set1"]
```

</div>

</details>

<details>
<summary>sDiffStore</summary>

<div>

Store the difference between the first set and all successive sets at a destination key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `keys` | `string[]` | Yes | The set keys. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->sDiffStore("diff_result", ["set1", "set2"]);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>sInter</summary>

<div>

Return the set resulting from the intersection of all provided sets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | `string[]` | Yes | The set keys. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] common = check redis->sInter(["set1", "set2"]);
```

Sample response:

```ballerina
["common_member"]
```

</div>

</details>

<details>
<summary>sInterStore</summary>

<div>

Store the intersection of all provided sets at a destination key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `keys` | `string[]` | Yes | The set keys. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->sInterStore("inter_result", ["set1", "set2"]);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>sUnion</summary>

<div>

Return the set resulting from the union of all provided sets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | `string[]` | Yes | The set keys. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] all = check redis->sUnion(["set1", "set2"]);
```

Sample response:

```ballerina
["member1", "member2", "member3"]
```

</div>

</details>

<details>
<summary>sUnionStore</summary>

<div>

Store the union of all provided sets at a destination key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `keys` | `string[]` | Yes | The set keys. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->sUnionStore("union_result", ["set1", "set2"]);
```

Sample response:

```ballerina
3
```

</div>

</details>

#### Sorted set operations

<details>
<summary>zAdd</summary>

<div>

Add one or more members to a sorted set, or update the score of an existing member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `memberScoreMap` | `map<any>` | Yes | A map of member names to their scores. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int added = check redis->zAdd("leaderboard", {
    "alice": 100.0,
    "bob": 85.0,
    "charlie": 92.0
});
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>zRange</summary>

<div>

Return a range of members in a sorted set by index (low to high).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `int` | Yes | Start index (inclusive). |
| `max` | `int` | Yes | Stop index (inclusive). |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] members = check redis->zRange("leaderboard", 0, -1);
```

Sample response:

```ballerina
["bob", "charlie", "alice"]
```

</div>

</details>

<details>
<summary>zRevRange</summary>

<div>

Return a range of members in a sorted set by index (high to low).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `int` | Yes | Start index (inclusive). |
| `max` | `int` | Yes | Stop index (inclusive). |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] topPlayers = check redis->zRevRange("leaderboard", 0, 2);
```

Sample response:

```ballerina
["alice", "charlie", "bob"]
```

</div>

</details>

<details>
<summary>zRangeByScore</summary>

<div>

Return members in a sorted set with scores within the given range (low to high).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `float` | Yes | Minimum score (inclusive). |
| `max` | `float` | Yes | Maximum score (inclusive). |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] members = check redis->zRangeByScore("leaderboard", 90.0, 100.0);
```

Sample response:

```ballerina
["charlie", "alice"]
```

</div>

</details>

<details>
<summary>zRevRangeByScore</summary>

<div>

Return members in a sorted set with scores within the given range (high to low).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `float` | Yes | Minimum score (inclusive). |
| `max` | `float` | Yes | Maximum score (inclusive). |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] members = check redis->zRevRangeByScore("leaderboard", 80.0, 100.0);
```

Sample response:

```ballerina
["alice", "charlie", "bob"]
```

</div>

</details>

<details>
<summary>zRangeByLex</summary>

<div>

Return a range of members in a sorted set by lexicographical range (lowest to highest).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `string` | Yes | Minimum lex bound (e.g., `[a` or `-`). |
| `max` | `string` | Yes | Maximum lex bound (e.g., `[z` or `+`). |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] members = check redis->zRangeByLex("names", "-", "+");
```

Sample response:

```ballerina
["alice", "bob", "charlie"]
```

</div>

</details>

<details>
<summary>zRevRangeByLex</summary>

<div>

Return a range of members in a sorted set by lexicographical range (highest to lowest).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `string` | Yes | Minimum lex bound. |
| `max` | `string` | Yes | Maximum lex bound. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] members = check redis->zRevRangeByLex("names", "+", "-");
```

Sample response:

```ballerina
["charlie", "bob", "alice"]
```

</div>

</details>

<details>
<summary>zScore</summary>

<div>

Get the score associated with the given member in a sorted set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `member` | `string` | Yes | The member name. |

Returns: `float|redis:Error`

Sample code:

```ballerina
float score = check redis->zScore("leaderboard", "alice");
```

Sample response:

```ballerina
100.0
```

</div>

</details>

<details>
<summary>zRank</summary>

<div>

Determine the index of a member in a sorted set (lowest score = rank 0).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `member` | `string` | Yes | The member name. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int rank = check redis->zRank("leaderboard", "alice");
```

Sample response:

```ballerina
2
```

</div>

</details>

<details>
<summary>zRevRank</summary>

<div>

Determine the index of a member in a sorted set, with scores ordered from high to low.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `member` | `string` | Yes | The member name. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int rank = check redis->zRevRank("leaderboard", "alice");
```

Sample response:

```ballerina
0
```

</div>

</details>

<details>
<summary>zCard</summary>

<div>

Get the number of members in a sorted set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->zCard("leaderboard");
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>zCount</summary>

<div>

Count the members in a sorted set with scores within the given range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `float` | Yes | Minimum score (inclusive). |
| `max` | `float` | Yes | Maximum score (inclusive). |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->zCount("leaderboard", 90.0, 100.0);
```

Sample response:

```ballerina
2
```

</div>

</details>

<details>
<summary>zLexCount</summary>

<div>

Count the number of members in a sorted set within a lexicographical range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `string` | Yes | Minimum lex bound. |
| `max` | `string` | Yes | Maximum lex bound. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->zLexCount("names", "-", "+");
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>zIncrBy</summary>

<div>

Increment the score of a member in a sorted set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `amount` | `float` | Yes | The increment amount. |
| `member` | `string` | Yes | The member name. |

Returns: `float|redis:Error`

Sample code:

```ballerina
float newScore = check redis->zIncrBy("leaderboard", 10.0, "bob");
```

Sample response:

```ballerina
95.0
```

</div>

</details>

<details>
<summary>zRem</summary>

<div>

Remove one or more members from a sorted set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `members` | `string[]` | Yes | The members to remove. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int removed = check redis->zRem("leaderboard", ["bob"]);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>zRemRangeByRank</summary>

<div>

Remove all members in a sorted set within the given indices.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `int` | Yes | Start index. |
| `max` | `int` | Yes | Stop index. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int removed = check redis->zRemRangeByRank("leaderboard", 0, 1);
```

Sample response:

```ballerina
2
```

</div>

</details>

<details>
<summary>zRemRangeByScore</summary>

<div>

Remove all members in a sorted set within the given scores.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `float` | Yes | Minimum score. |
| `max` | `float` | Yes | Maximum score. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int removed = check redis->zRemRangeByScore("leaderboard", 0.0, 50.0);
```

Sample response:

```ballerina
0
```

</div>

</details>

<details>
<summary>zRemRangeByLex</summary>

<div>

Remove all members in a sorted set within the given lexicographical range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The sorted set key. |
| `min` | `string` | Yes | Minimum lex bound. |
| `max` | `string` | Yes | Maximum lex bound. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int removed = check redis->zRemRangeByLex("names", "[a", "[b");
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>zInterStore</summary>

<div>

Intersect multiple sorted sets and store the resulting sorted set in a new key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `keys` | `string[]` | Yes | The sorted set keys to intersect. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->zInterStore("common_scores", ["set1", "set2"]);
```

Sample response:

```ballerina
2
```

</div>

</details>

<details>
<summary>zUnionStore</summary>

<div>

Compute the union of multiple sorted sets and store the result in a new key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `string` | Yes | The destination key. |
| `keys` | `string[]` | Yes | The sorted set keys to union. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->zUnionStore("all_scores", ["set1", "set2"]);
```

Sample response:

```ballerina
5
```

</div>

</details>

#### Hash operations

<details>
<summary>hSet</summary>

<div>

Set the string value of a hash field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `field` | `string` | Yes | The field name. |
| `value` | `string` | Yes | The field value. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean isNew = check redis->hSet("user:1001", "name", "John Doe");
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>hGet</summary>

<div>

Get the value of a hash field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `field` | `string` | Yes | The field name. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string name = check redis->hGet("user:1001", "name");
```

Sample response:

```ballerina
"John Doe"
```

</div>

</details>

<details>
<summary>hGetAll</summary>

<div>

Get all the fields and values in a hash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |

Returns: `map<any>|redis:Error`

Sample code:

```ballerina
map<any> user = check redis->hGetAll("user:1001");
```

Sample response:

```ballerina
{"name": "John Doe", "email": "john@example.com", "age": "30"}
```

</div>

</details>

<details>
<summary>hMSet</summary>

<div>

Set multiple hash fields to multiple values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `fieldValueMap` | `map<any>` | Yes | A map of field names to values. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->hMSet("user:1001", {
    "name": "John Doe",
    "email": "john@example.com",
    "age": "30"
});
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>hMGet</summary>

<div>

Get the values of all the given hash fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `fields` | `string[]` | Yes | The field names to retrieve. |

Returns: `map<any>|redis:Error`

Sample code:

```ballerina
map<any> values = check redis->hMGet("user:1001", ["name", "email"]);
```

Sample response:

```ballerina
{"name": "John Doe", "email": "john@example.com"}
```

</div>

</details>

<details>
<summary>hDel</summary>

<div>

Delete one or more hash fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `fields` | `string[]` | Yes | The field names to delete. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int deleted = check redis->hDel("user:1001", ["age"]);
```

Sample response:

```ballerina
1
```

</div>

</details>

<details>
<summary>hExists</summary>

<div>

Determine if a hash field exists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `field` | `string` | Yes | The field name. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean exists = check redis->hExists("user:1001", "email");
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>hSetNx</summary>

<div>

Set the value of a hash field, only if the field does not exist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `field` | `string` | Yes | The field name. |
| `value` | `string` | Yes | The field value. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean wasSet = check redis->hSetNx("user:1001", "role", "admin");
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>hKeys</summary>

<div>

Get all the fields in a hash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] fields = check redis->hKeys("user:1001");
```

Sample response:

```ballerina
["name", "email", "age"]
```

</div>

</details>

<details>
<summary>hVals</summary>

<div>

Get all the values in a hash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] values = check redis->hVals("user:1001");
```

Sample response:

```ballerina
["John Doe", "john@example.com", "30"]
```

</div>

</details>

<details>
<summary>hLen</summary>

<div>

Get the number of fields in a hash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int fieldCount = check redis->hLen("user:1001");
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>hIncrBy</summary>

<div>

Increment the integer value of a hash field by the given number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `field` | `string` | Yes | The field name. |
| `amount` | `int` | Yes | The increment amount. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int newAge = check redis->hIncrBy("user:1001", "age", 1);
```

Sample response:

```ballerina
31
```

</div>

</details>

<details>
<summary>hIncrByFloat</summary>

<div>

Increment the float value of a hash field by the given amount.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `field` | `string` | Yes | The field name. |
| `amount` | `float` | Yes | The float increment amount. |

Returns: `float|redis:Error`

Sample code:

```ballerina
float newBalance = check redis->hIncrByFloat("account:1001", "balance", 25.50);
```

Sample response:

```ballerina
125.50
```

</div>

</details>

<details>
<summary>hStrLen</summary>

<div>

Get the string length of the value associated with a field in a hash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The hash key. |
| `field` | `string` | Yes | The field name. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int length = check redis->hStrLen("user:1001", "name");
```

Sample response:

```ballerina
8
```

</div>

</details>

#### Key operations

<details>
<summary>del</summary>

<div>

Delete one or more keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | `string[]` | Yes | The keys to delete. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int deleted = check redis->del(["key1", "key2", "key3"]);
```

Sample response:

```ballerina
3
```

</div>

</details>

<details>
<summary>exists</summary>

<div>

Determine how many of the specified keys exist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | `string[]` | Yes | The keys to check. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int count = check redis->exists(["name", "counter", "nonexistent"]);
```

Sample response:

```ballerina
2
```

</div>

</details>

<details>
<summary>expire</summary>

<div>

Set a key's time to live in seconds.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |
| `seconds` | `int` | Yes | Expiration time in seconds. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean result = check redis->expire("session:abc", 3600);
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>pExpire</summary>

<div>

Set a key's time to live in milliseconds.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |
| `expirationTime` | `int` | Yes | Expiration time in milliseconds. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean result = check redis->pExpire("temp:data", 5000);
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>ttl</summary>

<div>

Get the time to live for a key in seconds.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int remainingSeconds = check redis->ttl("session:abc");
```

Sample response:

```ballerina
3542
```

</div>

</details>

<details>
<summary>pTtl</summary>

<div>

Get the time to live for a key in milliseconds.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |

Returns: `int|redis:Error`

Sample code:

```ballerina
int remainingMs = check redis->pTtl("temp:data");
```

Sample response:

```ballerina
4320
```

</div>

</details>

<details>
<summary>persist</summary>

<div>

Remove the expiration from a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean result = check redis->persist("session:abc");
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>keys</summary>

<div>

Find all keys matching the given pattern.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pattern` | `string` | Yes | The glob-style pattern to match (e.g., `user:*`). |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] matchingKeys = check redis->keys("user:*");
```

Sample response:

```ballerina
["user:1001", "user:1002", "user:1003"]
```

</div>

</details>

<details>
<summary>rename</summary>

<div>

Rename a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The current key name. |
| `newName` | `string` | Yes | The new key name. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->rename("old_key", "new_key");
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>renameNx</summary>

<div>

Rename a key, only if the new key does not exist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The current key name. |
| `newName` | `string` | Yes | The new key name. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean renamed = check redis->renameNx("old_key", "new_key");
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>move</summary>

<div>

Move a key to another database.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to move. |
| `database` | `int` | Yes | The target database index. |

Returns: `boolean|redis:Error`

Sample code:

```ballerina
boolean moved = check redis->move("temp_key", 1);
```

Sample response:

```ballerina
true
```

</div>

</details>

<details>
<summary>sort</summary>

<div>

Sort the elements in a list, set, or sorted set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to sort. |

Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] sorted = check redis->sort("numbers");
```

Sample response:

```ballerina
["1", "2", "3", "5", "8"]
```

</div>

</details>

<details>
<summary>randomKey</summary>

<div>

Return a random key from the keyspace.


Returns: `string|redis:Error?`

Sample code:

```ballerina
string? key = check redis->randomKey();
```

Sample response:

```ballerina
"user:1002"
```

</div>

</details>

<details>
<summary>redisType</summary>

<div>

Determine the type stored at a key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key to inspect. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string keyType = check redis->redisType("user:1001");
```

Sample response:

```ballerina
"hash"
```

</div>

</details>

#### Connection operations

<details>
<summary>ping</summary>

<div>

Ping the server to test connectivity.


Returns: `string|redis:Error`

Sample code:

```ballerina
string response = check redis->ping();
```

Sample response:

```ballerina
"PONG"
```

</div>

</details>

<details>
<summary>auth</summary>

<div>

Authenticate to the server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `password` | `string` | Yes | The authentication password. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->auth("my_password");
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>echo</summary>

<div>

Echo the given string back from the server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `string` | Yes | The message to echo. |

Returns: `string|redis:Error`

Sample code:

```ballerina
string response = check redis->echo("Hello Redis");
```

Sample response:

```ballerina
"Hello Redis"
```

</div>

</details>

<details>
<summary>flushDb</summary>

<div>

Remove all the keys from the currently selected database.


Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->flushDb();
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>flushAll</summary>

<div>

Remove all the keys from all the databases.


Returns: `string|redis:Error`

Sample code:

```ballerina
string result = check redis->flushAll();
```

Sample response:

```ballerina
"OK"
```

</div>

</details>

<details>
<summary>close</summary>

<div>

Close the connection to the Redis server.


Returns: `redis:Error?`

Sample code:

```ballerina
check redis.close();
```

</div>

</details>

#### Cluster operations

<details>
<summary>clusterInfo</summary>

<div>

Retrieve information and statistics about the Redis cluster.


Returns: `string[]|redis:Error`

Sample code:

```ballerina
string[] info = check redis->clusterInfo();
```

Sample response:

```ballerina
["cluster_enabled:1", "cluster_state:ok", "cluster_slots_assigned:16384", "cluster_slots_ok:16384", "cluster_known_nodes:6", "cluster_size:3"]
```

</div>

</details>
