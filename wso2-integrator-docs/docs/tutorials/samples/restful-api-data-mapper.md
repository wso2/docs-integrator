---
sidebar_position: 6
title: "RESTful API with Visual Data Mapper"
description: "Sample project: Build a RESTful API with the visual data mapper for request/response transformation in Ballerina."
---

# RESTful API with Visual Data Mapper

Build a RESTful API that aggregates data from multiple backend services and uses the WSO2 Integrator visual data mapper to transform request and response payloads. This sample project demonstrates how to call external APIs, map fields between different schemas visually, and return a unified response -- all without writing transformation code by hand.

## What You'll Learn

- Creating a RESTful API service that aggregates multiple backends
- Using the visual data mapper in the WSO2 Integrator VS Code extension
- Mapping fields between source and target schemas with drag-and-drop
- Applying expressions and functions within the data mapper for computed fields
- Handling optional and nested fields in transformations
- Testing the API with the built-in Try-It tool

## Prerequisites

- WSO2 Integrator VS Code extension installed
- The sample includes mock backend services, so no external accounts are needed

**Time estimate:** 10-15 minutes to clone and run; 30-45 minutes for full code walkthrough

## Clone and Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/restful-api-data-mapper

# No external configuration needed (mock backends included)
# Run the service
bal run
```

### Testing the API

```bash
# Get a unified customer profile
curl http://localhost:9090/customers/C001

# Search customers by name
curl "http://localhost:9090/customers?name=John"

# Get customer orders with product details
curl http://localhost:9090/customers/C001/orders
```

## Project Structure

```
restful-api-data-mapper/
├── Ballerina.toml
├── main.bal                      # API gateway service
├── backends/
│   ├── customer_backend.bal      # Mock customer service
│   ├── order_backend.bal         # Mock order service
│   └── product_backend.bal       # Mock product service
├── types.bal                     # All type definitions
├── transformations/
│   ├── customer_transform.bal    # Customer data mapping
│   └── order_transform.bal       # Order data mapping
└── tests/
    └── api_test.bal
```

## Code Walkthrough

### Defining Source and Target Types

The `types.bal` file defines the types for the backend responses (source) and the API responses (target):

```ballerina
// --- Backend source types ---

// Customer backend response
type BackendCustomer record {|
    string customer_id;
    string first_name;
    string last_name;
    string email_address;
    string phone_number;
    string date_of_birth;
    BackendAddress billing_address;
    BackendAddress? shipping_address;
    string account_status;
    string created_date;
|};

type BackendAddress record {|
    string street_line_1;
    string? street_line_2;
    string city;
    string state_province;
    string postal_code;
    string country_code;
|};

// Order backend response
type BackendOrder record {|
    string order_id;
    string customer_id;
    string order_date;
    string order_status;
    BackendOrderItem[] line_items;
    decimal subtotal;
    decimal tax_amount;
    decimal shipping_cost;
    decimal total_amount;
|};

type BackendOrderItem record {|
    string product_id;
    int qty;
    decimal unit_price;
    decimal line_total;
|};

// Product backend response
type BackendProduct record {|
    string product_id;
    string product_name;
    string sku;
    string category;
    string? image_url;
|};

// --- API target types ---

// Unified customer profile returned by the API
type CustomerProfile record {|
    string id;
    string fullName;
    string email;
    string phone;
    string dateOfBirth;
    Address billingAddress;
    Address? shippingAddress;
    string status;
    string memberSince;
|};

type Address record {|
    string line1;
    string? line2;
    string city;
    string state;
    string postalCode;
    string country;
|};

// Order with enriched product details
type CustomerOrder record {|
    string orderId;
    string orderDate;
    string status;
    OrderLineItem[] items;
    OrderTotal totals;
|};

type OrderLineItem record {|
    string productId;
    string productName;
    string category;
    int quantity;
    decimal unitPrice;
    decimal lineTotal;
|};

type OrderTotal record {|
    decimal subtotal;
    decimal tax;
    decimal shipping;
    decimal total;
|};
```

### Data Mapper Transformations

The transformation files contain the mapping functions. In the VS Code extension, these can be created and edited using the visual data mapper by clicking the **Map** icon above each function.

**Customer transformation** (`transformations/customer_transform.bal`):

```ballerina
// This function was generated using the visual data mapper.
// Open this file in VS Code and click the "Map" CodeLens to edit visually.

function transformCustomer(BackendCustomer backend) returns CustomerProfile => {
    id: backend.customer_id,
    fullName: backend.first_name + " " + backend.last_name,
    email: backend.email_address,
    phone: backend.phone_number,
    dateOfBirth: backend.date_of_birth,
    billingAddress: transformAddress(backend.billing_address),
    shippingAddress: backend.shipping_address is BackendAddress
        ? transformAddress(<BackendAddress>backend.shipping_address)
        : (),
    status: mapStatus(backend.account_status),
    memberSince: backend.created_date.substring(0, 10)
};

function transformAddress(BackendAddress backend) returns Address => {
    line1: backend.street_line_1,
    line2: backend.street_line_2,
    city: backend.city,
    state: backend.state_province,
    postalCode: backend.postal_code,
    country: backend.country_code
};

// Map backend status codes to user-friendly labels
function mapStatus(string backendStatus) returns string {
    match backendStatus {
        "ACT" => { return "Active"; }
        "SUS" => { return "Suspended"; }
        "CLS" => { return "Closed"; }
        _ => { return backendStatus; }
    }
}
```

**Order transformation** (`transformations/order_transform.bal`):

```ballerina
// Transform backend orders and enrich with product details
function transformOrder(BackendOrder backend, map<BackendProduct> products) returns CustomerOrder => {
    orderId: backend.order_id,
    orderDate: backend.order_date,
    status: backend.order_status,
    items: from BackendOrderItem item in backend.line_items
        let BackendProduct? product = products[item.product_id]
        select {
            productId: item.product_id,
            productName: product is BackendProduct ? product.product_name : "Unknown Product",
            category: product is BackendProduct ? product.category : "Uncategorized",
            quantity: item.qty,
            unitPrice: item.unit_price,
            lineTotal: item.line_total
        },
    totals: {
        subtotal: backend.subtotal,
        tax: backend.tax_amount,
        shipping: backend.shipping_cost,
        total: backend.total_amount
    }
};
```

### API Gateway Service

The `main.bal` file exposes the unified API that calls backend services and applies transformations:

```ballerina
import ballerina/http;
import ballerina/log;

configurable int servicePort = 9090;

// Backend HTTP clients
final http:Client customerBackend = check new ("http://localhost:9091");
final http:Client orderBackend = check new ("http://localhost:9092");
final http:Client productBackend = check new ("http://localhost:9093");

service /customers on new http:Listener(servicePort) {

    // Get a unified customer profile
    resource function get [string customerId]() returns CustomerProfile|http:NotFound|error {
        BackendCustomer|error backend = customerBackend->get(
            string `/api/customers/${customerId}`
        );

        if backend is error {
            log:printError("Customer not found", backend, customerId = customerId);
            return http:NOT_FOUND;
        }

        // Apply the data mapper transformation
        CustomerProfile profile = transformCustomer(backend);
        log:printInfo("Customer profile retrieved", customerId = customerId);
        return profile;
    }

    // Get customer orders enriched with product details
    resource function get [string customerId]/orders() returns CustomerOrder[]|error {
        // Fetch orders from the order backend
        BackendOrder[] backendOrders = check orderBackend->get(
            string `/api/orders?customerId=${customerId}`
        );

        // Collect all unique product IDs
        string[] productIds = from BackendOrder o in backendOrders
            from BackendOrderItem item in o.line_items
            select item.product_id;

        // Fetch product details
        map<BackendProduct> productMap = {};
        foreach string pid in productIds.distinct() {
            BackendProduct|error product = productBackend->get(
                string `/api/products/${pid}`
            );
            if product is BackendProduct {
                productMap[pid] = product;
            }
        }

        // Transform and enrich each order
        CustomerOrder[] orders = from BackendOrder o in backendOrders
            select transformOrder(o, productMap);

        log:printInfo("Customer orders retrieved",
            customerId = customerId,
            orderCount = orders.length());
        return orders;
    }
}
```

### Mock Backend Services

The `backends/` directory contains mock services that simulate external APIs. These start automatically when you run `bal run`:

```ballerina
// backends/customer_backend.bal
import ballerina/http;

map<BackendCustomer> customerStore = {
    "C001": {
        customer_id: "C001",
        first_name: "John",
        last_name: "Doe",
        email_address: "john.doe@example.com",
        phone_number: "+1-555-0100",
        date_of_birth: "1990-05-15",
        billing_address: {
            street_line_1: "123 Main Street",
            street_line_2: "Apt 4B",
            city: "San Francisco",
            state_province: "CA",
            postal_code: "94105",
            country_code: "US"
        },
        shipping_address: (),
        account_status: "ACT",
        created_date: "2022-03-10T08:30:00Z"
    }
};

service /api/customers on new http:Listener(9091) {
    resource function get [string id]() returns BackendCustomer|http:NotFound {
        BackendCustomer? customer = customerStore[id];
        return customer is BackendCustomer ? customer : http:NOT_FOUND;
    }
}
```

### Key Points

- **Visual data mapper**: The transformation functions can be edited using the drag-and-drop data mapper in the VS Code extension. Click the **Map** CodeLens above any transformation function to open the visual editor.
- **Computed fields**: Transformations can include expressions such as string concatenation (`first_name + " " + last_name`), substring extraction, and status code mapping.
- **Data aggregation**: The API gateway calls multiple backend services, aggregates the results, and applies transformations before returning a unified response.
- **Self-contained sample**: Mock backend services are included, so you can run and test the entire flow locally without external dependencies.

## What's Next

- [Data Service with bal persist](data-service-persist.md) -- Build a full CRUD data service
- [Event-Driven Microservices](event-driven-microservices.md) -- Build microservices with Kafka
- [Visual Data Mapper Guide](../../develop/transform/data-mapper.md) -- Learn more about the data mapper
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
