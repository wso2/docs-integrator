---
title: EDI Processing
---

# EDI Processing

Work with Electronic Data Interchange (EDI) formats used in supply chain, healthcare, and financial integrations. Ballerina provides the `ballerina/edi` module for parsing and serializing EDI data, and the `bal edi` CLI tool for generating type-safe code from EDI schemas.

## EDI standards overview

Ballerina supports the major EDI standards through schema-based processing:

- **X12** -- The ANSI ASC X12 standard used widely in North America for purchase orders (850), invoices (810), advance ship notices (856), and more.
- **EDIFACT** -- The UN/EDIFACT international standard used in global trade, logistics, and customs.
- **ESL** -- Electronic Shelf Labeling and custom delimited formats.

All standards follow the same workflow: define a schema, generate Ballerina code, then parse or serialize EDI documents using typed records.

## Setting up the EDI tool

Install the `bal edi` tool to generate Ballerina code from EDI schemas.

```bash
bal tool pull edi
```

Once installed, the tool provides commands for code generation and schema conversion.

## Generating code from EDI schemas

The `bal edi` tool reads an EDI schema (in JSON format) and generates Ballerina record types and parser/serializer functions. Let's add the generated code into a separate library.

1. Click the **Add** icon and select **Add New Library**.
2. Enter `purchase_order` as the library name and confirm.

Then, from inside the new library directory, run the code generator against your schema.

```bash
bal edi codegen -i path/to/order_schema.json -o order.bal
```

This produces:

- **Record types** matching each segment and composite in the schema.
- **`fromEdiString()`** -- a parser function that reads EDI text into the generated records.
- **`toEdiString()`** -- a serializer function that converts records back to EDI format.

## Converting x12 and EDIFACT schemas

Convert standard X12 or EDIFACT schema definitions into Ballerina's JSON schema format.

```bash
# Convert an X12 schema to Ballerina EDI schema
bal edi convertX12Schema -i x12/850.xsd -o schemas/purchase_order.json

# Convert an EDIFACT schema
bal edi convertEdifactSchema -i edifact/ORDERS_D96A.sef -o schemas/edifact_order.json
```

## Parsing EDI documents

Once you have generated code from a schema, parse EDI text into typed Ballerina records.

1. **Add an Action or Variable step** — In the flow designer, use the generated `fromEdiString()` function to parse EDI content into a typed record.
2. Select the EDI text input and assign the output to your defined record type.

```ballerina
import ballerina/io;
import generated/purchase_order as po;

public function main() returns error? {
    // Read EDI content from a file
    string ediText = check io:fileReadString("purchase_order.edi");

    // Parse into a typed record
    po:PurchaseOrder order = check po:fromEdiString(ediText);

    io:println("Order ID: ", order.header.purchaseOrderNumber);
    io:println("Buyer: ", order.header.buyerName);

    foreach po:LineItem item in order.lineItems {
        io:println(string `  ${item.productId}: ${item.quantity} units @ $${item.unitPrice}`);
    }
}
```

## Generating EDI output

Build EDI documents from Ballerina records and serialize them to the standard text format.

1. **Construct the Record** — In the flow designer, use a **Variable** step to define the record that holds your EDI data.
2. **Serialize to EDI** — Add an **Action** step and call the generated `toEdiString()` function to convert the record into an EDI text string.

```ballerina
import ballerina/io;
import generated/purchase_order as po;

public function main() returns error? {
    po:PurchaseOrder order = {
        header: {
            purchaseOrderNumber: "PO-20250315",
            orderDate: "20250315",
            buyerName: "Acme Corp"
        },
        lineItems: [
            {productId: "WDG-01", quantity: 100, unitPrice: 29.99, uom: "EA"},
            {productId: "GDG-02", quantity: 50, unitPrice: 49.99, uom: "EA"}
        ]
    };

    // Serialize to EDI text
    string ediOutput = check po:toEdiString(order);
    check io:fileWriteString("output.edi", ediOutput);
    io:println("EDI document written successfully");
}
```

## Low-Level EDI processing

For dynamic or schema-less scenarios, use the `ballerina/edi` module directly to parse EDI into JSON.

1. **Load Schema** — Add a **Variable** step in the flow designer to read your schema JSON and initialize the `edi:EdiSchema`.
2. **Parse to JSON** — Use an **Action** step to call `edi:fromEdiString()` with your dynamic schema to parse the EDI content into JSON.

```ballerina
import ballerina/edi;
import ballerina/io;

public function main() returns error? {
    string ediText = check io:fileReadString("invoice.edi");

    // Parse EDI using a schema definition at runtime
    json schema = check io:fileReadJson("invoice_schema.json");
    edi:EdiSchema ediSchema = check schema.fromJsonWithType();

    json invoiceData = check edi:fromEdiString(ediText, ediSchema);
    io:println(invoiceData.toJsonString());
}
```

## EDI to JSON/XML conversion

A common integration pattern is converting EDI documents to JSON or XML for downstream systems.

1. **Parse EDI** — Use an **Action** step to parse the EDI text into a typed record using the generated function.
2. **Convert to JSON/XML** — Add a **Variable** step and use the `.toJson()` method or the `xmldata:toXml()` function to convert the parsed record into JSON or XML.

```ballerina
import ballerina/io;
import ballerina/data.xmldata;
import generated/purchase_order as po;

public function main() returns error? {
    string ediText = check io:fileReadString("order.edi");
    po:PurchaseOrder order = check po:fromEdiString(ediText);

    // EDI to JSON
    json orderJson = order.toJson();
    check io:fileWriteJson("order.json", orderJson);

    // EDI to XML
    xml orderXml = check xmldata:toXml(order);
    check io:fileWriteString("order.xml", orderXml.toString());
}
```

## Creating EDI packages

Bundle multiple EDI schemas into a reusable Ballerina package so other teams can parse EDI messages with a single import.

```bash
# Generate a complete package from multiple schemas
bal edi packagegen -i schemas/ -o edi_library/
```

Consumers of the package can then parse EDI documents in a single line:

1. **Import the Package** — Ensure your generated EDI package is available in your workspace.
2. **Use the Parser** — In the flow designer, add an **Action** step referencing the imported package's `fromEdiString()` function to parse the EDI content.

```ballerina
import acme/edi_library.purchase_order as po;

po:PurchaseOrder order = check po:fromEdiString(ediContent);
```

## Best practices

- **Generate code from schemas** rather than parsing EDI manually -- the generated records and functions handle segment delimiters, escape characters, and validation
- **Use packages for reuse** -- bundle frequently used EDI schemas into shared Ballerina packages
- **Validate early** -- parse EDI at the integration boundary to catch format errors before business logic executes
- **Convert to records immediately** -- work with typed records throughout your integration and serialize back to EDI only at the output boundary

## What's next

- [Type System & Records](type-system-records.md) -- Define EDI record types
