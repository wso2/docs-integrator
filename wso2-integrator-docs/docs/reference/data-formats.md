---
sidebar_position: 8
title: Supported Data Formats
description: Complete reference of all data formats supported by WSO2 Integrator with Ballerina modules and usage patterns.
---

# Supported Data Formats

WSO2 Integrator, powered by Ballerina, provides built-in support for a comprehensive set of data formats used in integration scenarios. Ballerina's type system enables type-safe parsing, transformation, and serialization across all formats.

## Data Format Reference

| Format | Module(s) | Read | Write | Streaming | Description |
|--------|-----------|------|-------|-----------|-------------|
| JSON | Built-in, `ballerina/data.jsondata` | Yes | Yes | Yes | Native JSON type with direct language support |
| XML | Built-in, `ballerina/data.xmldata` | Yes | Yes | Yes | Native XML type with XPath-like navigation |
| CSV | `ballerina/data.csv` | Yes | Yes | Yes | Comma-separated values with configurable delimiters |
| EDI | `ballerina/edi` | Yes | Yes | No | X12, EDIFACT, and custom EDI formats |
| YAML | `ballerina/yaml` | Yes | Yes | No | YAML data serialization |
| TOML | `ballerina/toml` | Yes | Yes | No | TOML configuration format |
| Protocol Buffers | `ballerina/protobuf` | Yes | Yes | Yes | Binary serialization via gRPC |
| Avro | `ballerina/avro` | Yes | Yes | Yes | Apache Avro binary format |
| FHIR | `ballerinax/health.fhir.r4` | Yes | Yes | No | HL7 FHIR R4 healthcare resources |
| HL7 | `ballerinax/health.hl7v2` | Yes | Yes | No | HL7 v2 pipe-delimited healthcare messages |

## JSON

JSON is a first-class type in Ballerina. The `json` type is built into the language, and values can be created, accessed, and manipulated directly.

### Module

Built-in (no import needed for basic operations); `ballerina/data.jsondata` for advanced binding.

### Usage

```ballerina
import ballerina/data.jsondata;

// Native JSON creation
json order = {
    orderId: "ORD-001",
    items: [
        {name: "Widget", qty: 10, price: 9.99},
        {name: "Gadget", qty: 2, price: 24.99}
    ],
    total: 149.88
};

// Access fields
string id = check order.orderId;
json items = check order.items;

// Type-safe binding from JSON
type Order record {|
    string orderId;
    Item[] items;
    decimal total;
|};

type Item record {|
    string name;
    int qty;
    decimal price;
|};

Order typedOrder = check jsondata:parseString(order.toJsonString());
```

## XML

XML is a first-class type in Ballerina with built-in support for XML literals, namespaces, and navigation.

### Module

Built-in (no import needed for basic operations); `ballerina/data.xmldata` for record binding.

### Usage

```ballerina
import ballerina/data.xmldata;

// XML literal
xml purchaseOrder = xml `
    <order id="ORD-001">
        <item name="Widget" qty="10" price="9.99"/>
        <item name="Gadget" qty="2" price="24.99"/>
    </order>`;

// XPath-like navigation
xml items = purchaseOrder/<item>;
string name = check (purchaseOrder/<item>).first().name;

// XML to record binding
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

XMLOrder typedOrder = check xmldata:parseString(purchaseOrder.toString());
```

## CSV

The `ballerina/data.csv` module provides type-safe CSV parsing and writing with configurable delimiters, headers, and encoding.

### Module

`ballerina/data.csv`

### Usage

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Employee record {|
    string name;
    string department;
    decimal salary;
|};

// Parse CSV string to records
string csvData = string `name,department,salary
Jane Doe,Engineering,95000.00
John Smith,Marketing,85000.00`;

Employee[] employees = check csv:parseString(csvData);

// Write records to CSV
byte[] csvOutput = check csv:toBytes(employees);
check io:fileWriteBytes("employees.csv", csvOutput);
```

## EDI

EDI support is provided through the `ballerina/edi` module and the `bal edi` CLI tool for code generation from EDI schemas.

### Module

`ballerina/edi`

### Usage

```ballerina
// Using generated EDI types (see bal edi CLI)
import myorg/edi_x12;

string ediMessage = "ISA*00*...*~GS*PO*...~ST*850*0001~...~SE*10*0001~GE*1*1~IEA*1*000000001~";
edi_x12:PurchaseOrder po = check edi_x12:fromEdiString(ediMessage);

// Access typed fields
string poNumber = po.header.purchaseOrderNumber;

// Serialize back to EDI
string outputEdi = check edi_x12:toEdiString(po);
```

## YAML

The `ballerina/yaml` module provides YAML parsing and serialization.

### Module

`ballerina/yaml`

### Usage

```ballerina
import ballerina/yaml;

// Parse YAML string
string yamlContent = string `
  name: MyService
  version: 1.0.0
  endpoints:
    - path: /api
      port: 8080`;

json config = check yaml:readString(yamlContent);

// Write to YAML
string yamlOutput = check yaml:writeString(config);
```

## TOML

The `ballerina/toml` module provides TOML parsing and serialization, commonly used for configuration files.

### Module

`ballerina/toml`

### Usage

```ballerina
import ballerina/toml;

// Parse TOML string
string tomlContent = string `
  [database]
  host = "localhost"
  port = 5432
  name = "mydb"`;

map<json> config = check toml:readString(tomlContent);
```

## Protocol Buffers

Protocol Buffers (protobuf) support is built into the gRPC module. Use the `bal grpc` CLI to generate Ballerina code from `.proto` files.

### Module

`ballerina/protobuf` (via `ballerina/grpc`)

### Usage

```ballerina
// Generated from .proto files using bal grpc CLI
// See bal grpc CLI reference for details

import ballerina/grpc;

OrderServiceClient client = check new ("http://localhost:9090");
Order order = check client->GetOrder({order_id: "ORD-001"});
```

## Avro

The `ballerina/avro` module supports Apache Avro binary serialization and deserialization with schema support.

### Module

`ballerina/avro`

### Usage

```ballerina
import ballerina/avro;

// Define Avro schema
string schema = string `{
    "type": "record",
    "name": "Employee",
    "fields": [
        {"name": "name", "type": "string"},
        {"name": "age", "type": "int"}
    ]
}`;

avro:Schema avroSchema = check new (schema);

// Serialize to Avro bytes
type Employee record {|
    string name;
    int age;
|};

Employee emp = {name: "Jane", age: 30};
byte[] serialized = check avroSchema.toAvro(emp);

// Deserialize from Avro bytes
Employee deserialized = check avroSchema.fromAvro(serialized);
```

## FHIR

HL7 FHIR (Fast Healthcare Interoperability Resources) support is provided through the health modules for healthcare integration.

### Module

`ballerinax/health.fhir.r4`

### Usage

```ballerina
import ballerinax/health.fhir.r4;

// Create a FHIR Patient resource
r4:Patient patient = {
    resourceType: "Patient",
    id: "patient-001",
    name: [{family: "Smith", given: ["Jane"]}],
    gender: "female",
    birthDate: "1990-05-15"
};

// Serialize to JSON
json patientJson = patient.toJson();
```

## HL7

HL7 v2.x pipe-delimited message support is provided for healthcare systems integration.

### Module

`ballerinax/health.hl7v2`

### Usage

```ballerina
import ballerinax/health.hl7v2;

// Parse an HL7 v2 message
string hl7Message = "MSH|^~\\&|SENDING|FACILITY|RECEIVING|FACILITY|20240115||ADT^A01|MSG001|P|2.5\rPID|||12345||Smith^Jane||19900515|F";

hl7v2:Message msg = check hl7v2:parse(hl7Message);
```

## Format Conversion Matrix

Common format-to-format transformation patterns supported in WSO2 Integrator:

| From | To | Approach |
|------|-----|----------|
| JSON | XML | `xmldata:fromJson()` or data mapper |
| XML | JSON | `xmldata:toJson()` or data mapper |
| JSON | CSV | `csv:toBytes()` via record binding |
| CSV | JSON | `csv:parseString()` then `.toJson()` |
| EDI | JSON | Generated EDI types then `.toJson()` |
| JSON | EDI | JSON to record then `toEdiString()` |
| HL7 | FHIR | `health.fhir.r4` transformation APIs |
| JSON | Avro | `avroSchema.toAvro()` |
| Avro | JSON | `avroSchema.fromAvro()` then `.toJson()` |

## See Also

- [Data Transformation - JSON](/develop/transform/json.md) -- JSON transformation guide
- [Data Transformation - XML](/develop/transform/xml.md) -- XML transformation guide
- [Data Transformation - CSV](/develop/transform/csv-flat-file.md) -- CSV processing guide
- [Data Transformation - EDI](/develop/transform/edi.md) -- EDI processing guide
- [Ballerina API Documentation](api/ballerina-api-docs.md) -- Full API docs for all modules
