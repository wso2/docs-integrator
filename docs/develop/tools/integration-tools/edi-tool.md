---
title: EDI Tool
---

# EDI Tool

The `bal edi` tool generates Ballerina code from EDI (Electronic Data Interchange) schema definitions, enabling B2B integration with trading partners using standards such as X12 and EDIFACT. The generated code includes record types for EDI segments and transaction sets, along with parser and serializer functions that convert between raw EDI text and type-safe Ballerina records.

## Prerequisites

The EDI tool is included with the Ballerina distribution:

```bash
bal edi --help
```

## Generating code from an EDI schema

```bash
# Generate Ballerina types from an EDI schema
bal edi -i schema.json -o generated/

# Generate from a specific EDI standard
bal edi --standard x12 --version 005010 --transaction 850 -o generated/

# Generate a complete EDI package
bal edi codegen -i edi-schemas/ -o generated_edi/
```

### EDI schema definition

EDI schemas are defined in JSON format, describing the structure of segments, elements, and transaction sets:

```json
{
    "name": "PurchaseOrder850",
    "tag": "850",
    "segments": [
        {
            "tag": "ST",
            "name": "TransactionSetHeader",
            "elements": [
                {"name": "transactionSetId", "type": "string"},
                {"name": "transactionSetControlNumber", "type": "string"}
            ]
        },
        {
            "tag": "BEG",
            "name": "BeginningSegment",
            "elements": [
                {"name": "purposeCode", "type": "string"},
                {"name": "orderTypeCode", "type": "string"},
                {"name": "purchaseOrderNumber", "type": "string"},
                {"name": "date", "type": "string"}
            ]
        },
        {
            "tag": "PO1",
            "name": "LineItem",
            "maxOccurs": -1,
            "elements": [
                {"name": "assignedId", "type": "string"},
                {"name": "quantity", "type": "int"},
                {"name": "unitOfMeasure", "type": "string"},
                {"name": "unitPrice", "type": "float"},
                {"name": "productId", "type": "string"}
            ]
        }
    ]
}
```

### Generated Ballerina types

```ballerina
// Auto-generated from EDI schema
type PurchaseOrder850 record {|
    TransactionSetHeader st;
    BeginningSegment beg;
    LineItem[] po1 = [];
    TransactionSetTrailer se;
|};

type TransactionSetHeader record {|
    string transactionSetId;
    string transactionSetControlNumber;
|};

type BeginningSegment record {|
    string purposeCode;
    string orderTypeCode;
    string purchaseOrderNumber;
    string date;
|};

type LineItem record {|
    string assignedId;
    int quantity;
    string unitOfMeasure;
    float unitPrice;
    string productId;
|};

type TransactionSetTrailer record {|
    int numberOfSegments;
    string transactionSetControlNumber;
|};
```

### Generated parser and serializer

```ballerina
// Parse raw EDI text to typed record
public function fromEdiString(string ediText) returns PurchaseOrder850|error {
    // Auto-generated parsing logic
}

// Convert typed record to EDI text
public function toEdiString(PurchaseOrder850 purchaseOrder) returns string|error {
    // Auto-generated serialization logic
}
```

## Using generated EDI code

### Parsing incoming EDI messages

```ballerina
import ballerina/log;
import generated_edi as edi;

function processIncomingPurchaseOrder(string rawEdi) returns error? {
    // Parse EDI to typed record
    edi:PurchaseOrder850 po = check edi:fromEdiString(rawEdi);

    log:printInfo("Purchase order received",
        poNumber = po.beg.purchaseOrderNumber,
        lineItems = po.po1.length()
    );

    // Process each line item
    foreach edi:LineItem item in po.po1 {
        check processLineItem(item);
    }
}

function processLineItem(edi:LineItem item) returns error? {
    log:printInfo("Processing item",
        productId = item.productId,
        quantity = item.quantity,
        unitPrice = item.unitPrice
    );
    // Business logic: check inventory, update order system, etc.
}
```

### Generating outbound EDI messages

```ballerina
import generated_edi as edi;

function generatePurchaseOrderAck(string poNumber, string controlNumber)
        returns string|error {
    edi:PurchaseOrder855 ack = {
        st: {
            transactionSetId: "855",
            transactionSetControlNumber: controlNumber
        },
        bak: {
            purposeCode: "AC",  // Acknowledge
            orderNumber: poNumber,
            date: getCurrentDate()
        },
        se: {
            numberOfSegments: 3,
            transactionSetControlNumber: controlNumber
        }
    };

    return edi:toEdiString(ack);
}
```

### B2B integration service

A complete example that receives EDI purchase orders over HTTP and converts them to JSON for internal processing:

```ballerina
import ballerina/http;
import ballerina/log;
import generated_edi as edi;

configurable int servicePort = 8090;

service /b2b on new http:Listener(servicePort) {

    // Receive EDI purchase order from trading partner
    resource function post edi/inbound(http:Request request)
            returns json|http:BadRequest|error {
        string rawEdi = check request.getTextPayload();

        // Parse EDI
        edi:PurchaseOrder850|error po = edi:fromEdiString(rawEdi);
        if po is error {
            log:printError("Failed to parse EDI", 'error = po);
            return <http:BadRequest>{body: {message: "Invalid EDI format"}};
        }

        // Convert to internal JSON format
        json internalOrder = {
            poNumber: po.beg.purchaseOrderNumber,
            orderDate: po.beg.date,
            items: from edi:LineItem item in po.po1
                select {
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice
                }
        };

        log:printInfo("EDI order processed",
            poNumber = po.beg.purchaseOrderNumber);

        return internalOrder;
    }

    // Generate outbound EDI for trading partner
    resource function post edi/outbound(json orderData)
            returns string|error {
        // Build EDI from JSON
        string poNumber = check orderData.poNumber;
        string edi = check generateOutboundEdi(orderData);
        return edi;
    }
}
```

## Working with X12 and EDIFACT

### X12 standards

```bash
# Generate code for X12 850 (Purchase Order)
bal edi --standard x12 --version 005010 --transaction 850

# Generate code for X12 810 (Invoice)
bal edi --standard x12 --version 005010 --transaction 810

# Generate code for X12 856 (Advance Ship Notice)
bal edi --standard x12 --version 005010 --transaction 856
```

### EDIFACT standards

```bash
# Generate code for EDIFACT ORDERS
bal edi --standard edifact --version d96a --transaction ORDERS

# Generate code for EDIFACT INVOIC
bal edi --standard edifact --version d96a --transaction INVOIC
```

## EDI libraries

Install pre-built EDI packages from Ballerina Central for common transaction sets:

```bash
# Add X12 850 package
bal add ballerinax/edi.x12.d05010x.v850

# Add EDIFACT ORDERS package
bal add ballerinax/edi.edifact.d96a.vORDERS
```

## Command reference

### bal edi codegen

Generates Ballerina record types and utility functions from a single EDI schema definition file.

```bash
bal edi codegen -i <schema-path> -o <output-path> [options]
```

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `-i`, `--input` | — | Yes | — | Path to the EDI schema file (JSON format) |
| `-o`, `--output` | — | Yes | — | Output directory for generated Ballerina source files |
| `-p`, `--package` | — | No | — | Package name for the generated module |

### bal edi libgen

Generates a complete Ballerina library package from a collection of EDI schemas.

```bash
bal edi libgen -i <schema-directory> -o <output-path> [options]
```

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `-i`, `--input` | — | Yes | — | Path to the directory containing EDI schema files or a collection definition file |
| `-o`, `--output` | — | Yes | — | Output directory for the generated library package |
| `-p`, `--package` | — | No | — | Package name for the generated library |
| `--org` | — | No | — | Organization name for the generated package |

## Supported EDI standards

| Standard | Description | Typical use |
|---|---|---|
| X12 | ANSI ASC X12 | North American B2B (orders, invoices, shipping) |
| EDIFACT | UN/EDIFACT | International B2B commerce |
| HL7 | Health Level 7 v2.x | Healthcare messaging |
| Custom | User-defined schemas | Proprietary EDI formats |

## What's next

- [Health Tool](health-tool.md) — Generate healthcare integration code
- [XSD Tool](xsd-tool.md) — Generate types from XML schemas
- [Data transformation](/docs/develop/transform/edi) — Transform EDI data in Ballerina
