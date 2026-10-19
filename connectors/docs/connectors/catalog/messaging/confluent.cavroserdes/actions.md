---
title: Actions
---

# Actions

The `ballerinax/confluent.cavroserdes` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Avro SerDes Functions`](#avro-serdes-functions) | Provides two module-level functions, `serialize` and `deserialize`, for encoding Ballerina values to Avro bytes and decoding them back, using the Confluent Schema Registry to manage schemas automatically. |

---

## Avro serDes functions

Provides two module-level functions, `serialize` and `deserialize`, for encoding Ballerina values to Avro bytes and decoding them back, using the Confluent Schema Registry to manage schemas automatically.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `baseUrl` | `string` | Required | The Confluent Schema Registry endpoint URL (e.g., `https://<id>.<region>.aws.confluent.cloud`). |
| `identityMapCapacity` | `int` | `0` | Maximum number of schemas to cache in the local identity map. Set to `0` for default behaviour. |
| `originals` | `map<anydata>` | `{}` | Raw Schema Registry client properties including authentication keys such as `schema.registry.url` and `basic.auth.credentials.source`. |
| `headers` | `map<string>` | `{}` | Additional HTTP headers to include in Schema Registry requests. |

### Initializing the client

```ballerina
import ballerinax/confluent.cregistry;
import ballerinax/confluent.cavroserdes;

configurable string baseUrl = ?;
configurable map<anydata> originals = ?;
configurable map<string> headers = ?;

cregistry:Client registry = check new ({
    baseUrl,
    originals,
    headers
});
```

### Operations

#### Serialization & deserialization

<details>
<summary>serialize</summary>

Serializes a Ballerina value to Avro-encoded bytes. The provided Avro schema is registered in the Confluent Schema Registry under the given subject, and the assigned schema ID is encoded as a 4-byte prefix in the returned byte array following the Confluent wire format.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry` | `cregistry:Client` | Yes | An initialized Confluent Schema Registry client used to register and look up schemas. |
| `schema` | `string` | Yes | The Avro schema JSON string that describes the structure of `data`. |
| `data` | `anydata` | Yes | The Ballerina value to serialize (record, primitive, array, etc.). |
| `subject` | `string` | Yes | The Schema Registry subject name under which the schema will be registered (e.g., `"orders-value"`). |

Returns: `byte[]|Error`

Sample code:

```ballerina
string schema = string `{
    "namespace": "example.avro",
    "type": "record",
    "name": "Order",
    "fields": [
        {"name": "orderId", "type": "int"},
        {"name": "productName", "type": "string"}
    ]
}`;

type Order readonly & record {
    int orderId;
    string productName;
};

Order newOrder = {orderId: 1001, productName: "Widget"};
byte[] avroBytes = check cavroserdes:serialize(registry, schema, newOrder, "orders-value");
```

Sample response:

```ballerina
[0, 0, 0, 3, 234, 2, 12, 87, 105, 100, 103, 101, 116]
```

</details>

<details>
<summary>deserialize</summary>

Deserializes an Avro-encoded byte array back to a typed Ballerina value. The function extracts the 4-byte schema ID from the Confluent wire format prefix, retrieves the corresponding Avro schema from the Schema Registry, and uses it to decode the payload into the inferred target type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry` | `cregistry:Client` | Yes | An initialized Confluent Schema Registry client used to retrieve the schema by ID. |
| `data` | `byte[]` | Yes | The Avro-serialized byte array in Confluent wire format (magic byte + 4-byte schema ID + Avro payload). |
| `targetType` | `typedesc<anydata>` | No | Inferred target type for the deserialized value. Defaults to the type of the variable being assigned. |

Returns: `targetType|Error`

Sample code:

```ballerina
type Order readonly & record {
    int orderId;
    string productName;
};

Order receivedOrder = check cavroserdes:deserialize(registry, avroBytes);
```

Sample response:

```ballerina
{"orderId": 1001, "productName": "Widget"}
```

</details>
