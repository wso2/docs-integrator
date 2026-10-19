---
title: EDI Tool
---

# EDI Tool

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

### Step 1: Convert the EDIFACT schema

Convert an EDIFACT message type to the Ballerina EDI schema format by specifying the version, the transaction type, and the directory the specification was downloaded from. Download the release archive for the version you need from the [UN/EDIFACT directory downloads](https://unece.org/trade/uncefact/unedifact/download); the archive can be passed as downloaded, or as a directory it was extracted to.

```bash
bal edi convertEdifactSchema -v <version> -t <transaction-type> -i <downloaded archive> -o path/to/output/
```

For example, to convert an `ORDERS` message in version `d03a`:

```bash
bal edi convertEdifactSchema -v d03a -t ORDERS -i d03a.zip -o path/to/output
```

Omit `-t` to convert every message type in the directory.

### Step 2: Generate Ballerina code

Use `codegen` to generate typed Ballerina records and parser functions into the package's default module. `convertEdifactSchema` writes the schema into the output directory as `<transaction-type>.json`, so point `codegen` at that file:

```bash
bal edi codegen -i path/to/output/ORDERS.json -o orders.bal
```

For larger projects, keep the generated EDI code in its own package within a Ballerina workspace alongside your integration.

This generates the following functions in the output file along with the relevant record types.

- `fromEdiString`: Convert an EDI string to a Ballerina record.
- `toEdiString`: Convert a Ballerina record to an EDI string.
- `getSchema`: Get the EDI schema as an `EdiSchema` object.
- `fromEdiStringWithSchema`: Convert an EDI string to a Ballerina record using a pre-loaded schema.
- `toEdiStringWithSchema`: Convert a Ballerina record to an EDI string using a pre-loaded schema.

When the schema carries an envelope definition — which schemas converted from an X12 or EDIFACT spec do — `codegen` additionally emits envelope-aware functions and the matching typed wrapper records (`Interchange`, `FunctionalGroup`, `Transaction`):

- `headersFromEdiString`: Parse just the interchange/group/transaction headers.
- `interchangeFromEdiString`: Parse the full interchange hierarchy, with a fail-safe `error` body per transaction.
- `interchangeToEdiString`: Serialize a `Interchange` back to EDI text.

## Generating types from an X12 schema

X12 is a widely used EDI standard in North America, covering transaction sets for orders, invoices, shipping notices, and more.

### Step 1: Convert the X12 schema

Convert an X12 schema to the Ballerina EDI schema format.

```bash
bal edi convertX12Schema -i path/to/x12-schema -o path/to/output
```

### Step 2: Generate Ballerina code

Use `codegen` to generate typed Ballerina records and parser functions from the converted schema.

```bash
bal edi codegen -i path/to/output/schema.json -o orders.bal
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
bal edi codegen -i path/to/schema.json -o orders.bal
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
| `bal edi convertEdifactSchema -v <version> -t <type> -i <archive> -o <output>` | Convert an EDIFACT spec to Ballerina EDI schema format |
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
| `-v`, `--version` | Yes | EDIFACT version (for example, `d03a`) |
| `-t`, `--type` | No | Transaction type (for example, `ORDERS`, `INVOIC`). Omit it to convert every message type in the directory |
| `-i`, `--input` | Yes | Path to the downloaded UN/EDIFACT directory archive, or to a directory it was extracted to |
| `-o`, `--output` | Yes | Output directory for the converted schema, holding one `<transaction-type>.json` per message type |

#### bal edi convertESL

| Flag | Required | Description |
| --- | --- | --- |
| `-b`, `--basedef` | Yes | Path to the ESL base definitions |
| `-i`, `--input` | Yes | Path to the ESL schema file |
| `-o`, `--output` | Yes | Output directory for the converted schema |

## What's next

- [Health Tool](health-tool.md) — Generate healthcare integration code
- [XSD Tool](xsd-tool.md) — Generate types from XML schemas
- [Data transformation](../../data-transformation/edi.md) — Transform EDI data in Ballerina
