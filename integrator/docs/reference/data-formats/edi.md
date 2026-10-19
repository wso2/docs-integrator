---
title: EDI
---

# EDI

Electronic Data Interchange (EDI) is a set of standards that enables organizations to electronically exchange business documents such as purchase orders, invoices, and shipping notices in a structured, computer-readable format. Common EDI standards include X12 and UN/EDIFACT. The `ballerina/edi` module provides schema-driven, bidirectional conversion between EDI text and JSON.

## EDI data format

An EDI message is a sequence of **segments**. Each segment begins with a couple of character segment identifiers (e.g., `HDR`, `ITM`) followed by one or more **data elements** separated by a data element separator. A segment ends with a segment terminator. For example:

```edi
HDR*ORDER_1201*ABC_Store*2008-01-01~
ITM*A-250*12~
```

In this example, `*` is the data element separator and `~` is the segment terminator. A **composite data element** contains multiple **component elements** separated by a component element separator (e.g., `:`). Data elements can also repeat within a segment using a repetition separator.

## Getting started

### Using prebuilt EDIFACT packages

The fastest path for standard EDIFACT documents is to import a prebuilt package — no schema writing required. Prebuilt packages for common EDIFACT D03A message types are available under the `ballerinax` organization.

```ballerina
import ballerina/io;
import ballerinax/edifact.d03a.finance.mINVOIC;

public function main() returns error? {
    string ediText = check io:fileReadString("resources/invoice.edi");
    mINVOIC:EDI_INVOIC_INVOIC invoice = check mINVOIC:fromEdiString(ediText);
    // Process the typed invoice data
}
```

See [prebuilt EDIFACT packages](#prebuilt-edifact-packages) for the full list.

### Generating types from a schema

For EDIFACT or X12 documents not covered by prebuilt packages, use the [EDI Tool](../../develop-and-test/developer-tools/integration-tools/edi-tool.md) to generate Ballerina types and parser functions from the standard spec. This gives you a typed API without writing a schema by hand.

## Module

`ballerina/edi` (v1.6.0)

## Usage

### Parse EDI to JSON

```ballerina
import ballerina/edi;
import ballerina/io;

public function main() returns error? {
    edi:EdiSchema schema = check edi:getSchema(check io:fileReadJson("path/to/schema.json"));
    string ediText = check io:fileReadString("path/to/order.edi");
    json orderData = check edi:fromEdiString(ediText, schema);
    io:println(orderData.toJsonString());
}
```

**Sample EDI input:**

```edi
HDR*ORDER_1201*ABC_Store*2008-01-01~
ITM*A-250*12~
ITM*A-45*100~
ITM*D-10*58~
```

**Sample JSON output:**

```json
{
  "header": {
    "code": "HDR",
    "orderId": "ORDER_1201",
    "organization": "ABC_Store",
    "date": "2008-01-01"
  },
  "items": [
    {"code": "ITM", "item": "A-250", "quantity": 12},
    {"code": "ITM", "item": "A-45", "quantity": 100},
    {"code": "ITM", "item": "D-10", "quantity": 58}
  ]
}
```

### Serialize JSON to EDI

```ballerina
import ballerina/edi;
import ballerina/io;

public function main() returns error? {
    json newOrder = {
        "header": {
            "code": "HDR",
            "orderId": "ORDER_1201",
            "organization": "ABC_Store",
            "date": "2008-01-01"
        },
        "items": [
            {"code": "ITM", "item": "A-250", "quantity": 12},
            {"code": "ITM", "item": "B-250", "quantity": 10}
        ]
    };
    edi:EdiSchema schema = check edi:getSchema(check io:fileReadJson("path/to/schema.json"));
    string ediText = check edi:toEdiString(newOrder, schema);
    io:println(ediText);
}
```

**Output:**

```edi
HDR*ORDER_1201*ABC_Store*2008-01-01~
ITM*A-250*12~
ITM*B-250*10~
```

### Load a schema

```ballerina
import ballerina/edi;
import ballerina/io;

public function main() returns error? {
    // Load from a JSON file
    edi:EdiSchema schema = check edi:getSchema(check io:fileReadJson("path/to/schema.json"));

    io:println("Schema 01:", schema);

    // Or load from an inline JSON string
    edi:EdiSchema orderSchema = check edi:getSchema(string `{
        "name": "SimpleOrder",
        "delimiters": {"segment": "~", "field": "*", "component": ":"},
        "segments": []
    }`);

    io:println("Schema 02:", orderSchema);
}
```

### Parse a full interchange

When the schema declares an `envelope` (schemas generated from an X12 or EDIFACT spec do), `interchangeFromEdiString` parses the whole interchange hierarchy into typed records. Each transaction body is **fail-safe** — a malformed body is captured as an `error` on `EdiTransaction.body` instead of aborting the parse, so you can process what you can and quarantine the rest.

```ballerina
import ballerina/edi;
import ballerina/io;

public function main() returns error? {
    edi:EdiSchema schema = check edi:getSchema(check io:fileReadJson("path/to/schema.json"));
    string ediText = check io:fileReadString("path/to/interchange.edi");

    edi:EdiInterchange interchange = check edi:interchangeFromEdiString(ediText, schema);
    foreach edi:EdiTransaction txn in interchange.transactions ?: [] {
        json|error body = txn.body;
        if body is error {
            io:println("Quarantined: ", body.message());
            continue;
        }
        io:println(body);
    }
}
```

To route or filter messages without a schema, `x12HeadersFromEdiString` and `edifactHeadersFromEdiString` extract just the envelope headers (X12 ISA/GS, EDIFACT UNB/UNH).

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `fromEdiString` | `fromEdiString(string ediText, EdiSchema schema) returns json\|Error` | Parse a transaction body into JSON using a schema. |
| `toEdiString` | `toEdiString(json msg, EdiSchema schema) returns string\|Error` | Serialize JSON into EDI text using a schema. |
| `x12HeadersFromEdiString` / `x12HeadersFromEdiFile` | `... returns X12Headers\|Error` | Schema-free parse of X12 ISA/GS headers for routing and partner identification. |
| `edifactHeadersFromEdiString` / `edifactHeadersFromEdiFile` | `... returns EdifactHeaders\|Error` | Schema-free parse of EDIFACT UNB/UNH headers. |
| `headersFromEdiString` / `headersFromEdiFile` | `... returns json\|Error` | Schema-driven parse of just the envelope header segments. |
| `interchangeFromEdiString` | `interchangeFromEdiString(string ediText, EdiSchema schema) returns EdiInterchange\|Error` | Parse the full envelope hierarchy into typed records, with fail-safe per-transaction bodies. |
| `interchangeToEdiString` | `interchangeToEdiString(EdiInterchange msg, EdiSchema schema) returns string\|Error` | Serialize a full interchange back to EDI text (recomputes envelope counts). |
| `getSchema` | `getSchema(string\|json schema) returns EdiSchema\|error` | Load and validate an EDI schema from a JSON string or object. |

For full signatures, parameters, error types (`InvalidEnvelopeError`, `SchemaCompatibilityError`, `SerializationError`), and envelope processing semantics, see the [Module Specification](https://github.com/ballerina-platform/module-ballerina-edi/blob/main/docs/specs/ModuleSpecification.md).

## Custom EDI schemas

For a proprietary or non-standard format — one with no X12 or EDIFACT specification to convert from — define the structure directly as a JSON schema. The following JSON schema defines the structure of the simple order EDI format shown above. To handle a trading partner's variations on a *standard* format, start from the converted schema instead: see [Adapting the schema to a trading partner](../../develop-and-test/data-transformation/edi.md#adapting-the-schema-to-a-trading-partner).

```json
{
  "name": "SimpleOrder",
  "delimiters": {
    "segment": "~",
    "field": "*",
    "component": ":",
    "repetition": "^"
  },
  "segments": [
    {
      "code": "HDR",
      "tag": "header",
      "minOccurances": 1,
      "fields": [
        { "tag": "code" },
        { "tag": "orderId" },
        { "tag": "organization" },
        { "tag": "date" }
      ]
    },
    {
      "code": "ITM",
      "tag": "items",
      "maxOccurances": -1,
      "fields": [
        { "tag": "code" },
        { "tag": "item" },
        { "tag": "quantity", "dataType": "int" }
      ]
    }
  ]
}
```

Each `segments` entry maps a segment code to a set of ordered field definitions. The `tag` value becomes the JSON property name in the parsed output, and `maxOccurances: -1` allows a segment to repeat any number of times.

### Schema reference

EDI schemas are JSON documents that define how to parse and serialize EDI data. A schema specifies delimiters, segment structures, field types, and occurrence constraints.

#### Schema structure

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | Required | Name of the schema. |
| `tag` | `string` | `"Root_mapping"` | Tag for the root element. |
| `delimiters` | `record` | Required | Delimiter characters for segments, fields, components, and sub-components. |
| `ignoreSegments` | `string[]` | `[]` | Segment codes to skip during processing. |
| `preserveEmptyFields` | `boolean` | `true` | Whether to include empty fields in output. |
| `includeSegmentCode` | `boolean` | `true` | Whether to include the segment code in output JSON. |
| `segments` | `EdiUnitSchema[]` | `[]` | Array of segment and segment group definitions. |
| `segmentDefinitions` | `map` | `{}` | Reusable segment definitions referenced by code. |

#### Delimiters

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `segment` | `string` | Required | Segment terminator that marks the end of a segment (e.g., `~`). |
| `field` | `string` | Required | Data element separator between data elements within a segment (e.g., `*`). |
| `component` | `string` | Required | Component element separator between components within a composite data element (e.g., `:`). |
| `subcomponent` | `string` | `"NOT_USED"` | Sub-component element separator, for further subdivision within a component. |
| `repetition` | `string` | `"NOT_USED"` | Repetition separator for data elements that repeat within a segment (e.g., `^`). |
| `decimalSeparator` | `string` | — | Custom decimal separator for numeric fields. |

#### Segment definition

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `code` | `string` | Required | Segment identifier code (e.g., `"HDR"`, `"ITM"`). |
| `tag` | `string` | Required | JSON property name for this segment. |
| `truncatable` | `boolean` | `true` | Whether trailing empty fields can be omitted. |
| `minOccurances` | `int` | `0` | Minimum number of times this segment must appear. |
| `maxOccurances` | `int` | `1` | Maximum occurrences (`-1` for unlimited). |
| `fields` | `EdiFieldSchema[]` | `[]` | Array of field definitions. |

#### Field definition

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | `string` | Required | JSON property name for this field. |
| `repeat` | `boolean` | `false` | Whether the field can be repeated. |
| `required` | `boolean` | `false` | Whether the field is mandatory. |
| `truncatable` | `boolean` | `true` | Whether trailing empty components can be omitted. |
| `dataType` | `EdiDataType` | `STRING` | Data type: `"string"`, `"int"`, `"float"`, or `"composite"`. |
| `startIndex` | `int` | `-1` | Starting index for fixed-length fields. |
| `length` | `int\|Range` | `-1` | Length constraint (fixed integer or min/max range). |
| `components` | `EdiComponentSchema[]` | `[]` | Sub-elements within this field (for composite types). |

#### Example schema

```json
{
    "name": "SimpleOrder",
    "delimiters": {
        "segment": "~",
        "field": "*",
        "component": ":"
    },
    "segments": [
        {
            "code": "HDR",
            "tag": "header",
            "minOccurances": 1,
            "fields": [
                {"tag": "code", "required": true},
                {"tag": "orderId", "required": true},
                {"tag": "organization"},
                {"tag": "date"}
            ]
        },
        {
            "code": "ITM",
            "tag": "items",
            "maxOccurances": -1,
            "fields": [
                {"tag": "code", "required": true},
                {"tag": "item", "required": true},
                {"tag": "quantity", "required": true, "dataType": "int"}
            ]
        }
    ]
}
```

## Prebuilt EDIFACT packages

The following prebuilt EDIFACT D03A packages provide ready-made EDI schemas and Ballerina types for common business document standards. Each package has a root module exposing `getEDINames()`, `hasEnvelope()`, and message-name-dispatched conversion functions, plus one submodule per message type (for example `mINVOIC`) whose `fromEdiString()`, `toEdiString()`, `headersFromEdiString()`, `interchangeFromEdiString()`, and `interchangeToEdiString()` functions are typed to that message's records.

These packages are published under the `ballerinax` organization and can be imported directly into your integration project.

| Package | Description |
|---------|-------------|
| `ballerinax/edifact.d03a.finance` | Financial messages — credit/debit advices, payment orders, invoices, ledger entries, and tax declarations. |
| `ballerinax/edifact.d03a.logistics` | Logistics messages — cargo summaries, transport instructions, booking confirmations, and dangerous goods notifications. |
| `ballerinax/edifact.d03a.manufacturing` | Manufacturing messages — metered services consumption, quality data, safety hazards, and waste disposal information. |
| `ballerinax/edifact.d03a.retail` | Retail messages — product data, price history, rebate orders, retail account settlements, and product inquiries. |
| `ballerinax/edifact.d03a.services` | Service-industry messages — insurance, healthcare, job applications, berth management, and claims processing. |
| `ballerinax/edifact.d03a.shipping` | Shipping and customs messages — container operations, customs declarations, vessel departures, and cargo reports. |
| `ballerinax/edifact.d03a.supplychain` | Supply chain messages — purchase orders, order responses, delivery forecasts, inventory reports, and despatch advices. |

### Prebuilt package usage

`fromEdiString()` reads a single message. To walk a full interchange, call `interchangeFromEdiString()` — each transaction's `body` is typed `Record|error`, so one malformed message can be quarantined without failing the batch.

```ballerina
import ballerina/io;
import ballerinax/edifact.d03a.finance.mINVOIC;

public function main() returns error? {
    string ediText = check io:fileReadString("resources/invoice.edi");
    mINVOIC:EDI_INVOIC_INVOICInterchange interchange = check mINVOIC:interchangeFromEdiString(ediText);
    foreach mINVOIC:EDI_INVOIC_INVOICTransaction txn in interchange.transactions {
        mINVOIC:EDI_INVOIC_INVOIC|error invoice = txn.body;
        if invoice is error {
            io:println("quarantined: ", invoice.message());
            continue;
        }
        // Process the typed invoice data
    }
}
```
