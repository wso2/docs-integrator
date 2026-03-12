---
sidebar_position: 9
title: "Data Formats & Standards"
description: "Connectors for EDI, FHIR/HL7, and SOAP/WSDL data formats and industry standards in WSO2 Integrator."
---

# Data Formats & Standards Connectors

Work with industry-standard data formats and protocols directly in your integrations. These connectors handle the parsing, validation, and transformation of EDI documents, healthcare messages (FHIR/HL7), and SOAP/WSDL web services.

## Available Connectors

| Connector | Description | Key Operations | Use Cases |
|-----------|-------------|----------------|-----------|
| **EDI** | Parse and generate ANSI X12 and EDIFACT documents | `parse`, `generate`, `validate` | Supply chain, retail, logistics |
| **FHIR / HL7** | Handle FHIR R4 resources and HL7 v2 messages | `parse`, `transform`, `validate`, `bundle` | Healthcare interoperability |
| **SOAP / WSDL** | Consume and expose SOAP web services | `call`, `generate`, `transform` | Legacy system integration |

## EDI (Electronic Data Interchange)

The EDI module lets you parse inbound EDI documents into structured Ballerina records and generate outbound EDI messages from your data. WSO2 Integrator supports ANSI X12 (common in North America) and EDIFACT (international standard).

### Parse an EDI Document

```ballerina
import ballerina/edi;

// Define the EDI schema for an X12 850 Purchase Order
type PurchaseOrder record {|
    string poNumber;
    string date;
    string buyerId;
    LineItem[] items;
|};

type LineItem record {|
    string productId;
    int quantity;
    decimal unitPrice;
|};

function parseEdiPurchaseOrder(string ediContent) returns PurchaseOrder|error {
    // Parse raw EDI string into a structured record
    json ediJson = check edi:fromEdiString(ediContent, "x12/850");
    PurchaseOrder po = check ediJson.cloneWithType();
    return po;
}
```

### Generate an EDI Document

```ballerina
function generateInvoice(Invoice invoice) returns string|error {
    json invoiceJson = invoice.toJson();
    string ediString = check edi:toEdiString(invoiceJson, "x12/810");
    return ediString;
}
```

### Validate EDI Content

```ballerina
function validateEdi(string ediContent, string schemaId) returns boolean|error {
    edi:ValidationResult result = check edi:validate(ediContent, schemaId);
    if result.isValid {
        return true;
    }
    foreach edi:ValidationError err in result.errors {
        log:printError("EDI validation error", segment = err.segment, message = err.message);
    }
    return false;
}
```

## FHIR / HL7

Build healthcare integrations using the FHIR R4 and HL7 v2 connectors. Parse HL7 messages from clinical systems, transform them into FHIR resources, and interact with FHIR servers.

### Parse an HL7 v2 Message

```ballerina
import ballerinax/health.hl7v2;

function parseHl7Message(string rawMessage) returns hl7v2:Message|error {
    hl7v2:Message parsed = check hl7v2:parse(rawMessage);
    // Access message segments
    hl7v2:Segment msh = check parsed.getSegment("MSH");
    string messageType = check msh.getField(9);
    return parsed;
}
```

### Transform HL7 to FHIR

```ballerina
import ballerinax/health.fhir.r4;
import ballerinax/health.hl7v2;
import ballerinax/health.hl7v2tofhir;

function convertToFhir(hl7v2:Message hl7Message) returns r4:Bundle|error {
    r4:Bundle fhirBundle = check hl7v2tofhir:transform(hl7Message);
    return fhirBundle;
}
```

### Create a FHIR Resource

```ballerina
import ballerinax/health.fhir.r4;

function createPatient(string name, string birthDate) returns r4:Patient {
    r4:Patient patient = {
        resourceType: "Patient",
        name: [{
            given: [name.split(" ")[0]],
            family: name.split(" ")[1]
        }],
        birthDate: birthDate,
        active: true
    };
    return patient;
}
```

### Post to a FHIR Server

```ballerina
import ballerina/http;
import ballerinax/health.fhir.r4;

configurable string fhirServerUrl = ?;

final http:Client fhirClient = check new (fhirServerUrl);

function submitPatient(r4:Patient patient) returns r4:Patient|error {
    r4:Patient created = check fhirClient->post("/Patient", patient);
    return created;
}
```

## SOAP / WSDL

Integrate with legacy SOAP web services by consuming WSDL definitions and making SOAP calls. WSO2 Integrator generates type-safe client code from WSDL files.

### Consume a SOAP Service

```ballerina
import ballerina/soap;

configurable string soapEndpoint = ?;

final soap:Client soapClient = check new (soapEndpoint);

function getCustomerInfo(string customerId) returns xml|error {
    xml soapBody = xml `<GetCustomer xmlns="http://example.com/crm">
        <CustomerId>${customerId}</CustomerId>
    </GetCustomer>`;

    xml response = check soapClient->sendReceive(soapBody, "GetCustomer");
    return response;
}
```

### Transform SOAP to REST

A common pattern is exposing a legacy SOAP service through a modern REST API:

```ballerina
import ballerina/http;
import ballerina/soap;

configurable string legacySoapUrl = ?;

final soap:Client legacyClient = check new (legacySoapUrl);

service /api on new http:Listener(8090) {
    resource function get customers/[string id]() returns json|error {
        xml soapBody = xml `<GetCustomer xmlns="http://example.com/crm">
            <CustomerId>${id}</CustomerId>
        </GetCustomer>`;

        xml soapResponse = check legacyClient->sendReceive(soapBody, "GetCustomer");

        // Convert XML response to JSON
        json jsonResponse = check xmldata:toJson(soapResponse);
        return jsonResponse;
    }
}
```

## Configuration

```toml
# EDI schema directory
[edi]
schemaDir = "./edi-schemas"

# FHIR Server
[fhir]
fhirServerUrl = "https://fhir.example.com/r4"

# Legacy SOAP endpoint
[soap]
legacySoapUrl = "https://legacy.example.com/crm?wsdl"
soapEndpoint = "https://legacy.example.com/crm"
```

## What's Next

- [EDI Transformation](../develop/transform/edi.md) -- Deep dive into EDI parsing and generation
- [Healthcare HL7/FHIR Integration](../tutorials/healthcare-hl7-fhir.md) -- End-to-end healthcare tutorial
- [XML Transformation](../develop/transform/xml.md) -- Working with XML and SOAP payloads
- [Connection Configuration](configuration.md) -- How to set up connections
