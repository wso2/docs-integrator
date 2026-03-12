---
sidebar_position: 11
title: Message Translator
description: "Integration pattern: Message Translator -- transform messages between different formats and schemas to enable communication between systems."
---

# Message Translator

The Message Translator pattern converts a message from one format or schema to another so that systems with incompatible data representations can communicate. This is one of the most commonly used integration patterns.

## Problem

Two systems need to exchange data, but they use different message formats, field names, data types, or structures. System A sends orders with fields like `cust_id` and `order_dt`, while System B expects `customerId` and `orderDate`. Without translation, the systems cannot understand each other.

## Solution

Insert a translator between the sender and receiver that converts the message from the source format to the target format. The translator handles field mapping, type conversion, structural changes, and any enrichment or filtering required.

```
┌──────────┐    ┌────────────────────┐    ┌──────────┐
│ System A  │    │  Message           │    │ System B  │
│           ├───►│  Translator        ├───►│           │
│ Format A  │    │  (A → B)           │    │ Format B  │
└──────────┘    └────────────────────┘    └──────────┘
```

## When to Use It

- **System integration** -- Connect systems with different data models
- **API versioning** -- Translate between API v1 and v2 formats
- **Protocol bridging** -- Convert between JSON, XML, CSV, and EDI
- **Legacy modernization** -- Translate legacy formats to modern schemas
- **Multi-tenant adapters** -- Normalize data from different customer formats into a canonical model

## Implementation

### Basic Field Mapping

Translate between two record types with different field names and structures:

```ballerina
// Source format (System A)
type LegacyOrder record {|
    string ord_id;
    string cust_id;
    string ord_dt;        // "YYYYMMDD"
    string prod_cd;
    int qty;
    string amt;           // String representation of decimal
    string ship_method;   // "STD", "EXP", "ONT"
|};

// Target format (System B)
type ModernOrder record {|
    string orderId;
    string customerId;
    string orderDate;     // "YYYY-MM-DD"
    string productCode;
    int quantity;
    decimal amount;
    ShippingMethod shipping;
|};

enum ShippingMethod {
    STANDARD,
    EXPRESS,
    OVERNIGHT
}

function translateOrder(LegacyOrder legacy) returns ModernOrder|error {
    return {
        orderId: legacy.ord_id,
        customerId: legacy.cust_id,
        orderDate: translateDate(legacy.ord_dt),
        productCode: legacy.prod_cd,
        quantity: legacy.qty,
        amount: check decimal:fromString(legacy.amt),
        shipping: translateShippingMethod(legacy.ship_method)
    };
}

function translateDate(string yyyymmdd) returns string {
    // "20250301" → "2025-03-01"
    return string `${yyyymmdd.substring(0, 4)}-${yyyymmdd.substring(4, 6)}-${yyyymmdd.substring(6, 8)}`;
}

function translateShippingMethod(string code) returns ShippingMethod {
    match code {
        "STD" => { return STANDARD; }
        "EXP" => { return EXPRESS; }
        "ONT" => { return OVERNIGHT; }
        _ => { return STANDARD; }
    }
}
```

### Using the Data Mapper

WSO2 Integrator provides a visual Data Mapper for defining translations:

```ballerina
import ballerina/data.jsondata;

// Use Ballerina's built-in data mapping with transformation expressions
function translateWithMapper(json sourceJson) returns ModernOrder|error {
    LegacyOrder legacy = check sourceJson.fromJsonWithType();
    return translateOrder(legacy);
}
```

### JSON to XML Translation

Translate between JSON and XML representations:

```ballerina
import ballerina/xmldata;

type Customer record {|
    string id;
    string name;
    string email;
|};

// JSON → XML
function customerToXml(Customer customer) returns xml {
    return xml `<Customer>
        <Id>${customer.id}</Id>
        <Name>${customer.name}</Name>
        <Email>${customer.email}</Email>
    </Customer>`;
}

// XML → JSON
function xmlToCustomer(xml customerXml) returns Customer|error {
    json customerJson = check xmldata:toJson(customerXml);
    return check customerJson.fromJsonWithType();
}
```

### Translator as a Service

Expose the translator as a reusable HTTP service:

```ballerina
import ballerina/http;
import ballerina/log;

service /translate on new http:Listener(8090) {

    resource function post orders/legacy\-to\-modern(LegacyOrder legacyOrder)
            returns ModernOrder|http:BadRequest|error {
        ModernOrder|error result = translateOrder(legacyOrder);
        if result is error {
            return <http:BadRequest>{
                body: {message: string `Translation failed: ${result.message()}`}
            };
        }
        log:printInfo("Order translated", orderId = result.orderId);
        return result;
    }

    resource function post customers/json\-to\-xml(Customer customer)
            returns http:Response|error {
        xml customerXml = customerToXml(customer);
        http:Response res = new;
        res.setXmlPayload(customerXml);
        return res;
    }
}
```

### Canonical Data Model

When integrating many systems, translate all formats to and from a canonical (shared) model:

```ballerina
// Canonical model
type CanonicalOrder record {|
    string id;
    string customerId;
    string date;
    CanonicalLineItem[] items;
    decimal total;
    string currency;
|};

type CanonicalLineItem record {|
    string sku;
    int quantity;
    decimal unitPrice;
|};

// Translator: System A → Canonical
function fromSystemA(LegacyOrder legacy) returns CanonicalOrder|error {
    return {
        id: legacy.ord_id,
        customerId: legacy.cust_id,
        date: translateDate(legacy.ord_dt),
        items: [{sku: legacy.prod_cd, quantity: legacy.qty, unitPrice: check decimal:fromString(legacy.amt)}],
        total: check decimal:fromString(legacy.amt) * <decimal>legacy.qty,
        currency: "USD"
    };
}

// Translator: Canonical → System B
function toSystemB(CanonicalOrder canonical) returns ModernOrder {
    return {
        orderId: canonical.id,
        customerId: canonical.customerId,
        orderDate: canonical.date,
        productCode: canonical.items[0].sku,
        quantity: canonical.items[0].quantity,
        amount: canonical.total,
        shipping: STANDARD
    };
}
```

## Variations

| Variation | Description |
|-----------|-------------|
| **Envelope Wrapper** | Wrap/unwrap messages in transport envelopes (e.g., SOAP to REST) |
| **Content Enricher** | Add data from external sources during translation |
| **Content Filter** | Remove fields that the target does not need |
| **Normalizer** | Convert multiple source formats into a single canonical form |

## Considerations

- **Lossy translations** -- Some translations lose data (e.g., reducing precision). Document what is lost.
- **Validation** -- Validate both the input and the translated output to catch mapping errors early
- **Versioning** -- Keep translator versions aligned with source and target schema versions
- **Performance** -- For high-throughput scenarios, avoid unnecessary intermediate representations
- **Testing** -- Test translators with edge cases: null fields, empty arrays, maximum-length strings

## Related Patterns

- [Content-Based Router](content-based-router.md) -- Often combined with translator to route-then-translate
- [Message Filter](message-filter.md) -- Remove fields or entire messages before translation
- [Scatter-Gather](scatter-gather.md) -- May require translating responses from multiple systems into a unified format
