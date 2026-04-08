---
sidebar_position: 6
title: bal edi CLI
description: Reference for the bal edi CLI tool — generate Ballerina code for EDI schema parsing and library generation.
---

# bal edi CLI

The `bal edi` tool generates Ballerina code for processing Electronic Data Interchange (EDI) messages. It converts EDI schema definitions into Ballerina record types and parser/serializer functions, enabling type-safe EDI processing. The tool supports standard EDI formats including X12, EDIFACT, and custom EDI schemas.

## Commands Overview

| Command | Description |
|---------|-------------|
| `bal edi codegen` | Generate Ballerina code from a single EDI schema |
| `bal edi libgen` | Generate a complete Ballerina library from a collection of EDI schemas |

## bal edi codegen

Generates Ballerina record types and utility functions from a single EDI schema definition file.

### Syntax

```bash
bal edi codegen -i <schema-path> -o <output-path> [options]
```

### Flags

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `-i`, `--input` | — | Yes | — | Path to the EDI schema file (JSON format) |
| `-o`, `--output` | — | Yes | — | Output directory for generated Ballerina source files |
| `-p`, `--package` | — | No | — | Package name for the generated module |

### Example

```bash
# Generate from a single EDI schema
bal edi codegen -i schemas/purchase_order.json -o generated/

# Generate with package name
bal edi codegen -i schemas/invoice.json -o generated/ -p edi_invoice
```

### EDI Schema Format

EDI schemas are defined in JSON format describing segments, elements, and composites:

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
            "fields": [
                {"tag": "orderId", "dataType": "string"},
                {"tag": "date", "dataType": "string"},
                {"tag": "status", "dataType": "string", "required": false}
            ]
        },
        {
            "code": "ITM",
            "tag": "items",
            "maxOccurances": -1,
            "fields": [
                {"tag": "itemCode", "dataType": "string"},
                {"tag": "quantity", "dataType": "int"},
                {"tag": "price", "dataType": "float"}
            ]
        }
    ]
}
```

### Generated Code Usage

```ballerina
import myorg/edi_order;

public function main() returns error? {
    // Parse EDI message to Ballerina record
    string ediText = "HDR*ORD-001*2024-01-15*active~ITM*PROD-A*10*29.99~ITM*PROD-B*5*49.99~";
    edi_order:SimpleOrder order = check edi_order:fromEdiString(ediText);

    // Access typed fields
    io:println("Order ID: ", order.header.orderId);
    foreach var item in order.items {
        io:println("Item: ", item.itemCode, " Qty: ", item.quantity);
    }

    // Serialize Ballerina record back to EDI
    string ediOutput = check edi_order:toEdiString(order);
}
```

## bal edi libgen

Generates a complete Ballerina library package from a collection of EDI schemas. This is useful for creating reusable EDI processing libraries for standard message types.

### Syntax

```bash
bal edi libgen -i <schema-directory> -o <output-path> [options]
```

### Flags

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `-i`, `--input` | — | Yes | — | Path to the directory containing EDI schema files or a collection definition file |
| `-o`, `--output` | — | Yes | — | Output directory for the generated library package |
| `-p`, `--package` | — | No | — | Package name for the generated library |
| `--org` | — | No | — | Organization name for the generated package |

### Example

```bash
# Generate library from a directory of schemas
bal edi libgen -i schemas/ -o edi_library/ -p x12_850 --org myorg

# Generate library from a collection definition
bal edi libgen -i collection.json -o edi_library/
```

### Collection Definition Format

A collection definition file groups multiple EDI schemas into a single library:

```json
{
    "name": "x12_850",
    "org": "myorg",
    "version": "1.0.0",
    "schemas": [
        {
            "name": "PurchaseOrder",
            "schemaPath": "schemas/850.json"
        },
        {
            "name": "PurchaseOrderAck",
            "schemaPath": "schemas/855.json"
        },
        {
            "name": "Invoice",
            "schemaPath": "schemas/810.json"
        }
    ]
}
```

### Generated Library Structure

```
edi_library/
  Ballerina.toml
  Module.md
  purchase_order.bal         # Types and functions for Purchase Order
  purchase_order_ack.bal     # Types and functions for PO Acknowledgment
  invoice.bal                # Types and functions for Invoice
  types.bal                  # Shared type definitions
```

### Using the Generated Library

```ballerina
import myorg/x12_850;

public function main() returns error? {
    // Parse an X12 850 Purchase Order
    string rawEdi = check io:fileReadString("purchase_order.edi");
    x12_850:PurchaseOrder po = check x12_850:fromEdiString(rawEdi);

    // Transform to internal format
    json internalOrder = transformToInternal(po);

    // Create an acknowledgment
    x12_850:PurchaseOrderAck ack = createAck(po);
    string ackEdi = check x12_850:toEdiString(ack);
}
```

## Supported EDI Standards

| Standard | Description | Typical Use |
|----------|-------------|-------------|
| X12 | ANSI ASC X12 | North American B2B (orders, invoices, shipping) |
| EDIFACT | UN/EDIFACT | International B2B commerce |
| HL7 | Health Level 7 v2.x | Healthcare messaging |
| Custom | User-defined schemas | Proprietary EDI formats |

## See Also

- [bal Command Reference](bal-commands.md) -- All bal subcommands
- [EDI Data Transformation](/docs/develop/transform/edi) -- Working with EDI data
- [Data Formats Reference](/docs/reference/data-formats) -- All supported data formats
