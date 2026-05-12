---
title: EDI Tool
---

# EDI tool

The `bal edi` tool generates Ballerina code from EDI (Electronic Data Interchange) schema definitions, enabling B2B integration with trading partners using standards such as **X12** and **EDIFACT**. The generated code includes record types for EDI segments and transaction sets, along with parser and serializer functions that convert between raw EDI text and type-safe Ballerina records.

## Prerequisites

Execute the command below to pull the EDI tool from [Ballerina Central](https://central.ballerina.io/).

```bash
bal tool pull edi
```

Verify the tool using the following command.

```bash
bal edi --help
```

## Generating types from an EDIFACT schema

EDIFACT is the international EDI standard used globally, with message types such as `ORDERS`, `INVOIC`, and `DESADV`.

### Step 1 — Convert the EDIFACT schema

Convert an EDIFACT message type to the Ballerina EDI schema format by specifying the version and transaction type.

```bash
bal edi convertEdifactSchema -v <version> -t <transaction-type> -o path/to/output/
```

For example, to convert an `ORDERS` message in version `d96a`:

```bash
bal edi convertEdifactSchema -v d96a -t ORDERS -o path/to/output
```

### Step 2 — Generate Ballerina code

Use `codegen` to generate typed Ballerina records and parser functions from the converted schema.

```bash
bal edi codegen -i path/to/output/schema.json -o modules/orders/main.bal
```

This generates the following functions in the output file along with the relevant record types.

- `fromEdiString` — Convert an EDI string to a Ballerina record
- `toEdiString` — Convert a Ballerina record to an EDI string
- `getSchema` — Get the EDI schema as an `EdiSchema` object
- `fromEdiStringWithSchema` — Convert an EDI string to a Ballerina record using a pre-loaded schema
- `toEdiStringWithSchema` — Convert a Ballerina record to an EDI string using a pre-loaded schema

## Generating types from an X12 schema

X12 is a widely used EDI standard in North America, covering transaction sets for orders, invoices, shipping notices, and more.

### Step 1 — Convert the X12 schema

Convert an X12 schema to the Ballerina EDI schema format.

```bash
bal edi convertX12Schema -i path/to/x12-schema -o path/to/output
```

### Step 2 — Generate Ballerina code

Use `codegen` to generate typed Ballerina records and parser functions from the converted schema.

```bash
bal edi codegen -i path/to/output/schema.json -o modules/orders/main.bal
```

## Generating types from a custom schema

For EDI formats that are not X12 or EDIFACT, the tool accepts a JSON-based schema format that lets you describe segment structures, fields, delimiters, and data types directly.

**Sample EDI schema:**

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

**Sample EDI:**

```edi
HDR*HDR123*ACME_CORP*20240519~
ITM*Pen*10~
ITM*Notebook*5~
ITM*Eraser*3~
ITM*Ruler*7~
ITM*Stapler*2~
```

Run `codegen` directly on the custom schema file:

```bash
bal edi codegen -i path/to/schema.json -o modules/orders/main.bal
```

This generates the corresponding Ballerina record types along with edi functions:

```ballerina
public type Header_Type record {|
   string code = "HDR";
   string orderId?;
   string organization?;
   string date?;
|};

public type Items_Type record {|
   string code = "ITM";
   string item?;
   int? quantity?;
|};

public type SimpleOrder record {|
   Header_Type header;
   Items_Type[] items = [];
|};
```

## Generating a library package

Use `libgen` to generate a complete Ballerina library package from a directory of EDI schemas. The library organizes each schema into a separate module and includes REST connectors for EDI-to-JSON and JSON-to-EDI conversions.

```bash
bal edi libgen -p <org/package> -i path/to/schemas/ -o path/to/output/
```

Generated packages can be published to Ballerina Central and reused across projects.

## Command reference

| Command | Description |
| --- | --- |
| `bal edi codegen -i <schema> -o <output>` | Generate Ballerina records and functions from a schema file |
| `bal edi libgen -p <org/package> -i <dir> -o <output>` | Generate a library package from a directory of schemas |
| `bal edi convertEdifactSchema -v <version> -t <type> -o <output>` | Convert an EDIFACT spec to Ballerina EDI schema format |
| `bal edi convertX12Schema -i <input> -o <output>` | Convert an X12 schema to Ballerina EDI schema format |
| `bal edi convertESL -b <definitions> -i <input> -o <output>` | Convert an ESL schema to Ballerina EDI schema format |

### Flag reference

#### bal edi codegen

| Flag | Required | Description |
| --- | --- | --- |
| `-i`, `--input` | Yes | Path to the EDI schema file (JSON format) |
| `-o`, `--output` | Yes | Output path for the generated Ballerina source file |

#### bal edi libgen

| Flag | Required | Description |
| --- | --- | --- |
| `-p`, `--package` | Yes | Package identifier in `org/package` format |
| `-i`, `--input` | Yes | Path to the directory containing EDI schema files |
| `-o`, `--output` | Yes | Output directory for the generated library package |

#### bal edi convertX12Schema

| Flag | Required | Description |
| --- | --- | --- |
| `-i`, `--input` | Yes | Path to the X12 schema file or directory |
| `-o`, `--output` | Yes | Output directory for the converted schema |
| `-H`, `--headers` | No | Enable headers mode |
| `-c`, `--collection` | No | Enable collection mode |
| `-d`, `--segdet` | No | Path to the segment details file |

#### bal edi convertEdifactSchema

| Flag | Required | Description |
| --- | --- | --- |
| `-v`, `--version` | Yes | EDIFACT version (e.g., `d96a`) |
| `-t`, `--type` | Yes | Transaction type (e.g., `ORDERS`, `INVOIC`) |
| `-o`, `--output` | Yes | Output directory for the converted schema |

#### bal edi convertESL

| Flag | Required | Description |
| --- | --- | --- |
| `-b`, `--basedef` | Yes | Path to the ESL base definitions |
| `-i`, `--input` | Yes | Path to the ESL schema file |
| `-o`, `--output` | Yes | Output directory for the converted schema |

## What's next

- [Health Tool](health-tool.md) — Generate healthcare integration code
- [XSD Tool](xsd-tool.md) — Generate types from XML schemas
- [Data transformation](/docs/develop/transform/edi) — Transform EDI data in Ballerina
