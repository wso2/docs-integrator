---
title: XSD Tool
---

# XSD Tool

The `bal xsd` tool generates Ballerina record types from XML Schema Definition (XSD) files. It maps XSD complex types, simple types, enumerations, and element structures to equivalent Ballerina records with XML annotations, enabling you to serialize and deserialize XML documents with full type safety.

## Prerequisites

The XSD tool is included with the Ballerina distribution:

```bash
bal xsd --help
```

## Generating record types from XSD

The XSD tool is currently supported only through the Ballerina CLI (pro-code). The Visual Designer supports importing XML files but does not yet support importing XSD files directly.

### Basic usage

```bash
# Generate Ballerina records from an XSD file
bal xsd schema.xsd

# Generate records into a specific submodule
bal xsd schema.xsd --module custom

# Generate types for all XSD files in a directory
bal xsd inputs
```

### Example XSD

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://example.com/orders"
           xmlns:ord="http://example.com/orders">

    <xs:complexType name="Order">
        <xs:sequence>
            <xs:element name="OrderId" type="xs:string"/>
            <xs:element name="CustomerId" type="xs:string"/>
            <xs:element name="OrderDate" type="xs:dateTime"/>
            <xs:element name="Items" type="ord:ItemList"/>
            <xs:element name="Total" type="xs:decimal"/>
            <xs:element name="Status" type="ord:OrderStatus"/>
            <xs:element name="Notes" type="xs:string" minOccurs="0"/>
        </xs:sequence>
        <xs:attribute name="version" type="xs:string" use="optional"/>
    </xs:complexType>

    <xs:complexType name="ItemList">
        <xs:sequence>
            <xs:element name="Item" type="ord:LineItem" maxOccurs="unbounded"/>
        </xs:sequence>
    </xs:complexType>

    <xs:complexType name="LineItem">
        <xs:sequence>
            <xs:element name="ProductId" type="xs:string"/>
            <xs:element name="ProductName" type="xs:string"/>
            <xs:element name="Quantity" type="xs:integer"/>
            <xs:element name="UnitPrice" type="xs:decimal"/>
        </xs:sequence>
    </xs:complexType>

    <xs:simpleType name="OrderStatus">
        <xs:restriction base="xs:string">
            <xs:enumeration value="PENDING"/>
            <xs:enumeration value="CONFIRMED"/>
            <xs:enumeration value="SHIPPED"/>
            <xs:enumeration value="DELIVERED"/>
            <xs:enumeration value="CANCELLED"/>
        </xs:restriction>
    </xs:simpleType>

    <xs:element name="Order" type="ord:Order"/>
</xs:schema>
```

### Generated Ballerina records

```ballerina
import ballerina/data.xmldata;

@xmldata:Namespace {uri: "http://example.com/orders"}
public type Order record {|
    @xmldata:Sequence {minOccurs: 1, maxOccurs: 1}
    SequenceGroup sequenceGroup;
    @xmldata:Attribute
    string version?;
|};

@xmldata:Namespace {uri: "http://example.com/orders"}
public type ItemList record {|
    @xmldata:Sequence {minOccurs: 1, maxOccurs: 65535}
    SequenceGroup1[] sequenceGroup1;
|};

@xmldata:Namespace {uri: "http://example.com/orders"}
public type LineItem record {|
    @xmldata:Sequence {minOccurs: 1, maxOccurs: 1}
    SequenceGroup2 sequenceGroup2;
|};

@xmldata:Namespace {uri: "http://example.com/orders"}
public enum OrderStatus {
    PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
};

@xmldata:Name {value: "Order"}
@xmldata:Namespace {uri: "http://example.com/orders"}
public type Order1 record {|
    @xmldata:Sequence {minOccurs: 1, maxOccurs: 1}
    SequenceGroup sequenceGroup;
    @xmldata:Attribute
    string version?;
|};

public type SequenceGroup record {|
    @xmldata:SequenceOrder {value: 1}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    string OrderId;
    @xmldata:SequenceOrder {value: 2}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    string CustomerId;
    @xmldata:SequenceOrder {value: 3}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    string OrderDate;
    @xmldata:SequenceOrder {value: 4}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    ItemList Items;
    @xmldata:SequenceOrder {value: 5}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    decimal Total;
    @xmldata:SequenceOrder {value: 6}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    OrderStatus Status;
    @xmldata:SequenceOrder {value: 7}
    @xmldata:Element {minOccurs: 0, maxOccurs: 1}
    string Notes?;
|};

public type SequenceGroup1 record {|
    @xmldata:SequenceOrder {value: 1}
    @xmldata:Element {minOccurs: 1, maxOccurs: 65535}
    LineItem[] Item;
|};

public type SequenceGroup2 record {|
    @xmldata:SequenceOrder {value: 1}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    string ProductId;
    @xmldata:SequenceOrder {value: 2}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    string ProductName;
    @xmldata:SequenceOrder {value: 3}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    int Quantity;
    @xmldata:SequenceOrder {value: 4}
    @xmldata:Element {minOccurs: 1, maxOccurs: 1}
    decimal UnitPrice;
|};
```

## Using generated types

### Parsing XML to records

```ballerina
import ballerina/data.xmldata;

function parseOrderXml(xml orderXml) returns Order|error {
    return xmldata:parseAsType(orderXml);
}

// From an XML string
function parseOrderString(string xmlString) returns Order|error {
    return xmldata:parseString(xmlString);
}
```

### Converting records to XML

```ballerina
import ballerina/data.xmldata;

function toOrderXml(Order 'order) returns xml|error {
    return xmldata:toXml('order);
}
```

### Integration example

Use the generated types in an integration that receives XML from a SOAP endpoint and transforms it to JSON for a REST API:

```ballerina
import ballerina/http;
import ballerina/data.xmldata;

configurable string legacyEndpoint = ?;
configurable int servicePort = 8090;

final http:Client legacyClient = check new (legacyEndpoint);

service /api on new http:Listener(servicePort) {

    resource function get orders/[string orderId]() returns json|error {
        // Fetch XML from legacy system
        xml orderXml = check legacyClient->get("/orders/" + orderId);

        // Parse to typed record using generated types
        Order 'order = check xmldata:parseAsType(orderXml);

        // Transform to JSON response
        SequenceGroup details = 'order.sequenceGroup;
        return {
            id: details.OrderId,
            customer: details.CustomerId,
            total: details.Total,
            status: details.Status
        };
    }
}
```

## XSD type mapping

The tool maps XSD types to Ballerina types as follows:

| XSD Type | Ballerina Type |
| --- | --- |
| `xs:string` | `string` |
| `xs:integer`, `xs:int`, `xs:long` | `int` |
| `xs:decimal` | `decimal` |
| `xs:float`, `xs:double` | `float` |
| `xs:boolean` | `boolean` |
| `xs:dateTime`, `xs:date`, `xs:time` | `string` |
| `xs:base64Binary` | `byte[]` |
| Complex type | `record` |
| Enumeration | `enum` |
| `maxOccurs="unbounded"` | Array (`Type[]`) |
| `minOccurs="0"` | Optional (`Type?`) |
| Attribute | `@xmldata:Attribute` |

## Command reference

```bash
bal xsd <source-path> [-m | --module] <output-module-name>
```

| Option | Description |
| --- | --- |
| `<source-path>` | Path to an XSD file or a directory containing XSD files (mandatory) |
| `-m`, `--module <output-module-name>` | The name of the module in which the Ballerina types are generated |

## What's next

- [WSDL Tool](wsdl-tool.md) -- Generate SOAP clients that use these XML types
- [OpenAPI Tool](openapi-tool.md) -- Generate REST services and clients
- [Data Transformation](../../data-transformation/xml.md) -- Transform XML data with Ballerina
