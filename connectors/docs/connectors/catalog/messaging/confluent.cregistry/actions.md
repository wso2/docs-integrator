---
title: Actions
---

# Actions

The `ballerinax/confluent.cregistry` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Registers and retrieves schemas from Confluent Schema Registry. |

---

## Client

Registers and retrieves schemas from Confluent Schema Registry.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `baseUrl` | `string` | Required | The base URL of the Schema Registry endpoint (e.g., `https://psrc-xxxxx.us-east-2.aws.confluent.cloud`). |
| `identityMapCapacity` | `int` | `1000` | Capacity of the schema ID map for a particular subject. |
| `originals` | `map<anydata>` | `()` | Connection configurations for authentication and SSL (e.g., basic auth credentials, truststore settings). |
| `headers` | `map<string>` | `()` | Custom HTTP headers to include in requests to the Schema Registry. |

### Initializing the client

```ballerina
import ballerinax/confluent.cregistry;

configurable string baseUrl = ?;
configurable string apiKey = ?;
configurable string apiSecret = ?;

cregistry:Client schemaRegistryClient = check new (
    baseUrl = baseUrl,
    originals = {
        "basic.auth.credentials.source": "USER_INFO",
        "basic.auth.user.info": string `${apiKey}:${apiSecret}`
    }
);
```

### Operations

#### Schema operations

<details>
<summary>register</summary>

Registers a schema under the specified subject in the Schema Registry. Returns the unique schema ID assigned by the registry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subject` | `string` | Yes | The subject name under which to register the schema (e.g., `"my-topic-value"`). |
| `schema` | `string` | Yes | The schema definition as a JSON string (e.g., an Avro schema). |

Returns: `int|error`

Sample code:

```ballerina
string schema = string `
    {
        "namespace": "example.avro",
        "type": "record",
        "name": "Student",
        "fields": [
            {"name": "name", "type": "string"},
            {"name": "favorite_color", "type": ["string", "null"]}
        ]
    }`;

int registerId = check schemaRegistryClient->register("student-topic-value", schema);
```

Sample response:

```ballerina
1
```

</details>

<details>
<summary>getSchemaById</summary>

Retrieves a schema from the Schema Registry by its unique schema ID. Returns the schema definition as a string.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The unique ID of the schema to retrieve. |

Returns: `string|error`

Sample code:

```ballerina
string schema = check schemaRegistryClient->getSchemaById(1);
```

Sample response:

```ballerina
{"type":"record","name":"Student","namespace":"example.avro","fields":[{"name":"name","type":"string"},{"name":"favorite_color","type":["string","null"]}]}
```

</details>
