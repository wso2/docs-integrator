---
title: Actions
---

# Actions

The `ballerinax/copybook` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Converter`](#converter) | Converts Ballerina records to COBOL copybook-formatted byte arrays and deserializes copybook byte arrays back to Ballerina JSON maps. |

---

## Converter

Converts Ballerina records to COBOL copybook-formatted byte arrays and deserializes copybook byte arrays back to Ballerina JSON maps.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `schemaFilePath` | `string` | Required | The file path to the COBOL copybook definition file (`.cpy`) that describes the data structure. |

### Initializing the client

```ballerina
import ballerinax/copybook;

copybook:Converter converter = check new ("resources/copybook.cpy");
```

### Operations

#### Serialization

<details>
<summary>toBytes</summary>

Converts a Ballerina `record {}` or `map<json>` value into a COBOL copybook-formatted byte array. The output byte layout is determined by the PIC clauses in the copybook schema. Optionally specify the target record name when the schema defines multiple top-level types, and the desired output encoding (ASCII or EBCDIC).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `input` | `record {}` | Yes | The Ballerina record or `map<json>` value to serialize into copybook bytes. |
| `targetRecordName` | `string?` | No | The name of the copybook record definition to use. Required only when the schema file contains more than one top-level record definition. |
| `encoding` | `copybook:Encoding` | No | The output byte encoding. Use `copybook:ASCII` (default) or `copybook:EBCDIC` for IBM mainframe compatibility. |

Returns: `byte[]|copybook:Error`

Sample code:

```ballerina
import ballerinax/copybook;

copybook:Converter converter = check new ("resources/copybook.cpy");

record {} employee = {
    EmployeeId: "EMP1",
    EmployeeName: {
        FirstName: "John      ",
        LastName:  "Doe       "
    },
    EmployeeSalary: 0075000.00,
    EmployeeGrade: "A"
};

byte[] asciiBytes = check converter.toBytes(employee);
```

Sample response:

```ballerina
[69, 77, 80, 49, 74, 111, 104, 110, 32, 32, 32, 32, 32, 32, 68, 111, 101, 32, 32, 32, 32, 32, 32, 32, 48, 48, 55, 53, 48, 48, 48, 46, 48, 48, 65]
```

</details>

#### FromBytes

<details>
<summary>fromBytes</summary>

Deserializes a COBOL copybook-formatted byte array into a Ballerina `map<json>` value. The field mapping and value extraction are driven by the PIC clauses in the copybook schema. Optionally specify the target record name when the schema defines multiple top-level types, and the encoding of the incoming bytes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bytes` | `byte[]` | Yes | The copybook-formatted byte array to deserialize. |
| `targetRecordName` | `string?` | No | The name of the copybook record definition to use. Required only when the schema file contains more than one top-level record definition. |
| `encoding` | `copybook:Encoding` | No | The encoding of the input bytes. Use `copybook:ASCII` (default) or `copybook:EBCDIC` for IBM mainframe byte streams. |

Returns: `map<json>|copybook:Error`

Sample code:

```ballerina
import ballerinax/copybook;

copybook:Converter converter = check new ("resources/copybook.cpy");

// asciiBytes is a byte[] received from a mainframe or file
map<json> result = check converter.fromBytes(asciiBytes);
```

Sample response:

```ballerina
{
  "EmployeeId": "EMP1",
  "EmployeeName": {
    "FirstName": "John",
    "LastName": "Doe"
  },
  "EmployeeSalary": 75000.00,
  "EmployeeGrade": "A"
}
```

</details>
