---
sidebar_position: 7
title: Other Artifacts
description: Supporting artifacts including types, connections, configurations, functions, and data mappers.
---

# Other Artifacts

Beyond the primary integration artifacts (services, event handlers, automations), WSO2 Integrator projects use several supporting artifact types. These artifacts define shared data structures, manage connections, externalize configuration, encapsulate reusable logic, and map data between formats.

## Type Artifacts

Type artifacts define the data structures used throughout your integration. They ensure type safety across services, event handlers, and transformations.

### Defining Record Types

```ballerina
// types.bal

// Request/response types
type OrderRequest record {|
    string customerId;
    LineItem[] items;
    Address shippingAddress;
    string? couponCode;
|};

type LineItem record {|
    string productId;
    string productName;
    int quantity;
    decimal unitPrice;
|};

type Address record {|
    string street;
    string city;
    string state;
    string zipCode;
    string country;
|};

// Enum types for fixed value sets
enum OrderStatus {
    PENDING,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}

// Union types for flexible payloads
type PaymentMethod CreditCard|BankTransfer|DigitalWallet;

type CreditCard record {|
    string cardNumber;
    string expiryDate;
    string cvv;
|};

type BankTransfer record {|
    string bankName;
    string accountNumber;
    string routingNumber;
|};

type DigitalWallet record {|
    string provider;
    string walletId;
|};
```

### Table Types

Use table types for in-memory collections with key-based lookup:

```ballerina
type ProductTable table<Product> key(id);

type Product record {|
    readonly string id;
    string name;
    decimal price;
    int stock;
|};

// Usage
ProductTable products = table [
    {id: "P001", name: "Widget", price: 9.99, stock: 100},
    {id: "P002", name: "Gadget", price: 24.99, stock: 50}
];

Product? widget = products["P001"];
```

## Connection Artifacts

Connection artifacts centralize the configuration for external systems. Define connections once and reuse them across multiple artifacts.

```ballerina
// connections.bal
import ballerinax/mysql;
import ballerina/http;
import ballerinax/kafka;

// Database connection
configurable string dbHost = ?;
configurable int dbPort = 3306;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

final mysql:Client orderDb = check new (
    host = dbHost,
    port = dbPort,
    user = dbUser,
    password = dbPassword,
    database = dbName
);

// HTTP client connection
configurable string crmBaseUrl = ?;
configurable string crmApiKey = ?;

final http:Client crmClient = check new (crmBaseUrl, {
    auth: {token: crmApiKey},
    timeout: 30,
    retryConfig: {
        count: 3,
        interval: 2,
        backOffFactor: 2.0
    }
});

// Kafka producer connection
configurable string kafkaBrokers = "localhost:9092";

final kafka:Producer kafkaProducer = check new ({
    bootstrapServers: kafkaBrokers,
    acks: kafka:ACKS_ALL,
    retryCount: 3
});
```

### Connection Management in the Visual Designer

<!-- TODO: Screenshot of the connection management panel in the visual designer -->

The visual designer provides a dedicated panel for managing connections:

1. Click **Connections** in the WSO2 Integrator sidebar.
2. Click **+ Add Connection** and select the connector type.
3. Fill in the connection details (host, credentials, options).
4. Test the connection using the built-in **Test Connection** button.

## Configuration Artifacts

Configuration artifacts externalize values that change between environments using Ballerina's `configurable` keyword.

```ballerina
// config.bal

// Required configuration (must be provided in Config.toml)
configurable string apiEndpoint = ?;
configurable string apiKey = ?;

// Optional with defaults
configurable int maxRetries = 3;
configurable decimal timeoutSeconds = 30.0;
configurable boolean enableCache = true;
configurable int cacheMaxSize = 1000;

// Complex configuration using records
configurable NotificationConfig notificationConfig = {
    emailEnabled: true,
    slackEnabled: false,
    slackWebhookUrl: ""
};

type NotificationConfig record {|
    boolean emailEnabled;
    boolean slackEnabled;
    string slackWebhookUrl;
|};
```

The corresponding `Config.toml`:

```toml
apiEndpoint = "https://api.example.com/v2"
apiKey = "sk-abc123"
maxRetries = 5
timeoutSeconds = 60.0
enableCache = true
cacheMaxSize = 5000

[notificationConfig]
emailEnabled = true
slackEnabled = true
slackWebhookUrl = "https://hooks.slack.com/services/..."
```

## Function Artifacts

Function artifacts encapsulate reusable logic that can be called from any integration artifact. Keep functions in separate `.bal` files organized by domain.

```ballerina
// functions/validation.bal

function validateEmail(string email) returns boolean {
    // Simple email validation
    return email.includes("@") && email.includes(".");
}

function validateOrderRequest(OrderRequest request) returns string[]  {
    string[] errors = [];

    if request.items.length() == 0 {
        errors.push("Order must have at least one item");
    }

    foreach LineItem item in request.items {
        if item.quantity <= 0 {
            errors.push("Invalid quantity for product: " + item.productId);
        }
        if item.unitPrice < 0d {
            errors.push("Invalid price for product: " + item.productId);
        }
    }

    if request.shippingAddress.zipCode.length() != 5 {
        errors.push("ZIP code must be 5 digits");
    }

    return errors;
}
```

```ballerina
// functions/transforms.bal

function calculateOrderTotal(LineItem[] items, string? couponCode) returns decimal {
    decimal subtotal = 0;
    foreach LineItem item in items {
        subtotal += item.unitPrice * <decimal>item.quantity;
    }

    // Apply discount
    decimal discount = getDiscount(couponCode);
    return subtotal * (1 - discount);
}

function getDiscount(string? couponCode) returns decimal {
    match couponCode {
        "SAVE10" => { return 0.10d; }
        "SAVE20" => { return 0.20d; }
        _ => { return 0d; }
    }
}
```

## Data Mapper Artifacts

Data mapper artifacts define transformations between data structures using the visual data mapper or code.

<!-- TODO: Screenshot of the visual data mapper showing source-to-target field mapping -->

### Visual Data Mapper

The visual data mapper lets you draw connections between source and target fields:

1. Right-click in the project explorer and select **New > Data Mapper**.
2. Define the source and target types.
3. Draw field mappings in the visual canvas.
4. Add transformation expressions for fields that need conversion.

### Code-Based Mapping

```ballerina
// mappers/order_mapper.bal

type ExternalOrder record {|
    string order_id;
    string customer_ref;
    ExternalLineItem[] line_items;
    string ship_to_address;
    string order_date;
|};

type ExternalLineItem record {|
    string sku;
    string description;
    int qty;
    string unit_price;
|};

function mapToInternalOrder(ExternalOrder ext) returns OrderRequest => {
    customerId: ext.customer_ref,
    items: from ExternalLineItem item in ext.line_items
        select {
            productId: item.sku,
            productName: item.description,
            quantity: item.qty,
            unitPrice: check decimal:fromString(item.unit_price)
        },
    shippingAddress: parseAddress(ext.ship_to_address),
    couponCode: ()
};

function parseAddress(string addressStr) returns Address {
    string[] parts = re `,`.split(addressStr);
    return {
        street: parts.length() > 0 ? parts[0].trim() : "",
        city: parts.length() > 1 ? parts[1].trim() : "",
        state: parts.length() > 2 ? parts[2].trim() : "",
        zipCode: parts.length() > 3 ? parts[3].trim() : "",
        country: parts.length() > 4 ? parts[4].trim() : "US"
    };
}
```

## Organizing Artifacts

A well-organized project groups artifacts by purpose:

```
my-integration/
├── Ballerina.toml
├── Config.toml
├── main.bal                   # Service definition
├── types.bal                  # Shared type definitions
├── connections.bal            # External connections
├── config.bal                 # Configurable variables
├── functions/
│   ├── validation.bal         # Validation functions
│   └── transforms.bal         # Transformation functions
├── mappers/
│   └── order_mapper.bal       # Data mapping functions
├── persist/
│   └── model.bal              # Data persistence model
└── tests/
    ├── main_test.bal
    └── validation_test.bal
```

## What's Next

- [Design Logic](/docs/develop/design-logic) -- Build logic that uses these artifacts
- [Data Mapper](/docs/develop/transform/data-mapper) -- Deep dive into the visual data mapper
- [Type System](/docs/develop/transform/type-system) -- Advanced type system features
