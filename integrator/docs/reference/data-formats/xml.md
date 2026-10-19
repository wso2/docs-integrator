---
title: XML
---

# XML

XML is a first-class type in Ballerina with built-in support for XML literals, namespaces, and navigation. The `ballerina/data.xmldata` module (v1.6.2) provides type-safe record binding, XPath transforms, JSON conversion, and XSD validation.

## Module

Built-in (no import needed for basic operations); `ballerina/data.xmldata` for record binding and transforms.

## Usage

### Create and navigate XML

```ballerina
// XML literal — no imports needed
xml purchaseOrder = xml `
    <order id="ORD-001">
        <item name="Widget" qty="10" price="9.99"/>
        <item name="Gadget" qty="2" price="24.99"/>
    </order>`;

// XPath-like navigation
xml items = purchaseOrder/<item>;
string name = check (purchaseOrder/<item>).first().name;
```

### XML to record binding

```ballerina
import ballerina/data.xmldata;

type XMLOrder record {|
    @xmldata:Attribute
    string id;
    XMLItem[] item;
|};

type XMLItem record {|
    @xmldata:Attribute
    string name;
    @xmldata:Attribute
    int qty;
    @xmldata:Attribute
    decimal price;
|};

string xmlString = "<order id=\"ORD-001\"><item name=\"Widget\" qty=\"10\" price=\"9.99\"/></order>";
XMLOrder typedOrder = check xmldata:parseString(xmlString);
```

### Parse from bytes and streams

```ballerina
import ballerina/data.xmldata;
import ballerina/io;

// Parse from byte array
byte[] xmlBytes = "<config><port>8080</port></config>".toBytes();
record {int port;} cfg = check xmldata:parseBytes(xmlBytes);

// Parse from a byte stream
stream<byte[], io:Error?> byteStream = check io:fileReadBlocksAsStream("data.xml");
record {} data = check xmldata:parseStream(byteStream);
```

### Record to XML

```ballerina
import ballerina/data.xmldata;

type Address record {|
    @xmldata:Attribute
    string type;
    string street;
    string city;
|};

Address addr = {'type: "home", street: "123 Main St", city: "Springfield"};
xml addressXml = check xmldata:toXml(addr);
```

### JSON to XML conversion

```ballerina
import ballerina/data.xmldata;

json order = {
    orderId: "ORD-001",
    items: [{name: "Widget", qty: 10}]
};

xml orderXml = check xmldata:fromJson(order);
```

### XPath transform

```ballerina
import ballerina/data.xmldata;

xml catalog = xml `
    <catalog>
        <book><title>Clean Code</title><price>33.99</price></book>
        <book><title>Refactoring</title><price>42.50</price></book>
    </catalog>`;

string title = check xmldata:transform(catalog, `/catalog/book[1]/title/text()`);
// title: "Clean Code"
```

### XSD validation

```ballerina
import ballerina/data.xmldata;

xml doc = xml `<order><id>123</id></order>`;

// Validate against an XSD file
xmldata:Error? err = xmldata:validate(doc, "resources/order.xsd");

// Or validate against a record type
xmldata:Error? err2 = xmldata:validate(doc, Order);
```

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `parseString` | `parseString(string s, SourceOptions options = {}, typedesc<record {}> t = <>) returns t\|Error` | Parse an XML string into a typed record. |
| `parseBytes` | `parseBytes(byte[] s, SourceOptions options = {}, typedesc<record {}> t = <>) returns t\|Error` | Parse an XML byte array into a typed record. |
| `parseStream` | `parseStream(stream<byte[], error?> s, SourceOptions options = {}, typedesc<record {}> t = <>) returns t\|Error` | Parse an XML byte stream into a typed record. |
| `parseAsType` | `parseAsType(xml v, SourceOptions options = {}, typedesc<record {}> t = <>) returns t\|Error` | Convert an `xml` value into a typed record. |
| `toXml` | `toXml(map<anydata> mapValue, Options options = {}) returns xml\|Error` | Convert a record or map to XML. |
| `fromJson` | `fromJson(json jsonValue, JsonOptions options = {}) returns xml\|Error` | Convert a JSON value to XML. |
| `transform` | `transform(xml xmlValue, XPathRawTemplate query, typedesc<anydata> td = <>) returns td\|Error` | Transform XML using an XPath query. |
| `validate` | `validate(xml xmlValue, string\|typedesc<record {}> schema) returns Error?` | Validate XML against an XSD file or record type. |

## Options

### SourceOptions

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `attributePrefix` | `string` | `""` | Prefix for attribute field names. |
| `textFieldName` | `string` | `"#content"` | Field name for text content nodes. |
| `allowDataProjection` | `boolean` | `true` | Whether to allow data projection. |
| `useSemanticEquality` | `boolean` | `true` | Whether to use semantic equality for matching. |
| `enableConstraintValidation` | `boolean` | `true` | Whether to validate constraints on the target type. |

### JsonOptions

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `attributePrefix` | `string` | `"@"` | Prefix for attribute keys in JSON input. |
| `arrayEntryTag` | `string` | `"item"` | XML element name for JSON array entries. |
| `rootTag` | `string?` | `()` | Root element name. |
| `textFieldName` | `string` | `"#content"` | JSON key that maps to XML text content. |

## Annotations

| Annotation | Description |
|------------|-------------|
| `@xmldata:Name` | Overrides the XML element or field name. |
| `@xmldata:Namespace` | Specifies namespace prefix and URI. Takes `prefix` and `uri` parameters. |
| `@xmldata:Attribute` | Marks a record field as an XML attribute. |
| `@xmldata:Element` | Defines XSD element constraints (`minOccurs`, `maxOccurs`). |
| `@xmldata:Sequence` | Defines XSD sequence constraints. |
| `@xmldata:Choice` | Defines XSD choice constraints. |
| `@xmldata:SequenceOrder` | Defines sequence ordering. |
