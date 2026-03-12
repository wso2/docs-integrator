---
sidebar_position: 5
title: "Data Service with bal persist"
description: "Sample project: Build a full CRUD data service using bal persist with MySQL in Ballerina."
---

# Data Service with bal persist

Build a complete CRUD (Create, Read, Update, Delete) data service using the `bal persist` tooling with a MySQL backend. This sample project demonstrates how to define data models, auto-generate the persistence layer, and expose a RESTful API -- all with minimal boilerplate code.

## What You'll Learn

- Defining data models using `bal persist` model definitions
- Auto-generating the persistence client and database schema
- Exposing CRUD operations through an HTTP service
- Filtering, sorting, and paginating query results
- Handling relationships between entities (one-to-many, many-to-many)
- Writing tests against the generated persistence layer

## Prerequisites

- WSO2 Integrator VS Code extension installed
- MySQL 8.0 or later (local or remote)
- `bal persist` tool (bundled with the Ballerina distribution)

**Time estimate:** 10-15 minutes to clone and run; 30-45 minutes for full code walkthrough

## Clone and Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/data-service-persist

# Start MySQL if using Docker
docker run -d --name mysql-persist \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=product_db \
  -p 3306:3306 mysql:8.0

# Copy and edit the configuration file
cp Config-example.toml Config.toml
# Edit Config.toml with your MySQL credentials

# Generate the persistence client from the model
bal persist generate

# Push the schema to the database
bal persist push

# Run the service
bal run
```

### Testing the API

```bash
# Create a product
curl -X POST http://localhost:9090/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse", "description": "Ergonomic wireless mouse", "price": 29.99, "category": "Electronics", "stock": 150}'

# List all products
curl http://localhost:9090/products

# Get a product by ID
curl http://localhost:9090/products/1

# Update a product
curl -X PUT http://localhost:9090/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 24.99, "stock": 200}'

# Delete a product
curl -X DELETE http://localhost:9090/products/1
```

## Project Structure

```
data-service-persist/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── persist/
│   └── model.bal            # Data model definitions
├── generated/
│   └── store/               # Auto-generated persistence client
│       ├── persist_client.bal
│       ├── persist_types.bal
│       └── script.sql
├── main.bal                 # HTTP service with CRUD endpoints
├── types.bal                # API request/response types
└── tests/
    └── service_test.bal
```

## Code Walkthrough

### Defining the Data Model

The `persist/model.bal` file declares the entities and their relationships using the `bal persist` model syntax:

```ballerina
import ballerina/persist as _;
import ballerinax/persist.sql;

// Product entity
type Product record {|
    @sql:AutoIncrement
    readonly int id;
    string name;
    string description;
    decimal price;
    string category;
    int stock;
    string createdAt;
    string updatedAt;
    // One-to-many: a product has many reviews
    Review[] reviews;
|};

// Review entity
type Review record {|
    @sql:AutoIncrement
    readonly int id;
    int rating;         // 1-5
    string comment;
    string reviewer;
    string createdAt;
    // Many-to-one: belongs to a product
    Product product;
|};
```

After running `bal persist generate`, the tooling creates the `generated/store/` directory with the persistence client, types, and SQL scripts.

### HTTP Service with CRUD Endpoints

The `main.bal` file exposes the generated persistence client through a RESTful HTTP API:

```ballerina
import ballerina/http;
import ballerina/log;
import ballerina/time;

import generated/store;

configurable string dbHost = "localhost";
configurable int dbPort = 3306;
configurable string dbUser = "root";
configurable string dbPassword = "root";
configurable string dbName = "product_db";

final store:Client storeClient = check new ();

service /products on new http:Listener(9090) {

    // Create a new product
    resource function post .(ProductRequest request) returns Product|error {
        string now = time:utcToString(time:utcNow());

        store:ProductInsert insert = {
            name: request.name,
            description: request.description,
            price: request.price,
            category: request.category,
            stock: request.stock,
            createdAt: now,
            updatedAt: now
        };

        int[] ids = check storeClient->/products.post([insert]);
        store:Product product = check storeClient->/products/[ids[0]];

        log:printInfo("Product created", id = ids[0], name = request.name);
        return toApiProduct(product);
    }

    // List all products with optional category filter
    resource function get .(string? category) returns Product[]|error {
        stream<store:Product, error?> products;

        if category is string {
            products = storeClient->/products(
                whereClause = `category = ${category}`
            );
        } else {
            products = storeClient->/products;
        }

        return from store:Product p in products
            select toApiProduct(p);
    }

    // Get a single product by ID
    resource function get [int id]() returns Product|http:NotFound|error {
        store:Product|error product = storeClient->/products/[id];
        if product is error {
            return http:NOT_FOUND;
        }
        return toApiProduct(product);
    }

    // Update a product
    resource function put [int id](ProductUpdateRequest request) returns Product|http:NotFound|error {
        store:Product|error existing = storeClient->/products/[id];
        if existing is error {
            return http:NOT_FOUND;
        }

        store:ProductUpdate update = {
            updatedAt: time:utcToString(time:utcNow())
        };

        if request.name is string {
            update.name = <string>request.name;
        }
        if request.description is string {
            update.description = <string>request.description;
        }
        if request.price is decimal {
            update.price = <decimal>request.price;
        }
        if request.category is string {
            update.category = <string>request.category;
        }
        if request.stock is int {
            update.stock = <int>request.stock;
        }

        store:Product updated = check storeClient->/products/[id].put(update);
        log:printInfo("Product updated", id = id);
        return toApiProduct(updated);
    }

    // Delete a product
    resource function delete [int id]() returns http:NoContent|http:NotFound|error {
        store:Product|error existing = storeClient->/products/[id];
        if existing is error {
            return http:NOT_FOUND;
        }

        _ = check storeClient->/products/[id].delete();
        log:printInfo("Product deleted", id = id);
        return http:NO_CONTENT;
    }
}
```

### API Request and Response Types

The `types.bal` file defines the types used for API requests and responses, separate from the persistence model:

```ballerina
// API response type (excludes internal fields)
type Product record {|
    int id;
    string name;
    string description;
    decimal price;
    string category;
    int stock;
    string createdAt;
    string updatedAt;
|};

// Request type for creating a product
type ProductRequest record {|
    string name;
    string description;
    decimal price;
    string category;
    int stock;
|};

// Request type for updating a product (all fields optional)
type ProductUpdateRequest record {|
    string? name = ();
    string? description = ();
    decimal? price = ();
    string? category = ();
    int? stock = ();
|};

// Transform from persist type to API type
function toApiProduct(store:Product p) returns Product => {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    stock: p.stock,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
};
```

### Adding Reviews (One-to-Many Relationship)

```ballerina
// Nested resource for product reviews
resource function post [int productId]/reviews(ReviewRequest request) returns Review|error {
    store:ReviewInsert insert = {
        rating: request.rating,
        comment: request.comment,
        reviewer: request.reviewer,
        createdAt: time:utcToString(time:utcNow()),
        productId: productId
    };

    int[] ids = check storeClient->/reviews.post([insert]);
    store:Review review = check storeClient->/reviews/[ids[0]];

    log:printInfo("Review added", productId = productId, reviewer = request.reviewer);
    return toApiReview(review);
}

// Get all reviews for a product
resource function get [int productId]/reviews() returns Review[]|error {
    stream<store:Review, error?> reviews = storeClient->/reviews(
        whereClause = `productId = ${productId}`
    );

    return from store:Review r in reviews
        select toApiReview(r);
}
```

### Key Points

- **Code generation**: The `bal persist generate` command auto-generates the persistence client, types, and SQL DDL from the model definition, eliminating boilerplate CRUD code.
- **Type-safe queries**: The generated client provides compile-time type safety for all database operations.
- **Schema migrations**: Running `bal persist push` applies schema changes to the database, keeping the model and database in sync.
- **Separation of concerns**: The API types in `types.bal` are separate from the persistence types, allowing the public API shape to evolve independently from the database schema.

## What's Next

- [Event-Driven Microservices](event-driven-microservices.md) -- Build microservices with Kafka
- [RESTful API with Data Mapper](restful-api-data-mapper.md) -- Use the visual data mapper for transformations
- [Data Transformation](../../develop/transform/data-mapper.md) -- Learn about data mapping features
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
