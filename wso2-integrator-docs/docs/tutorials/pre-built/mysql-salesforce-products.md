---
sidebar_position: 5
title: "MySQL to Salesforce Products"
description: "Pre-built integration sample: Sync a MySQL product catalog to Salesforce products using Ballerina."
---

# MySQL to Salesforce Products

Synchronize your MySQL product catalog to Salesforce Product records on a scheduled basis. This integration polls your MySQL database for new or updated products, transforms the data to match Salesforce's Product2 object schema, and upserts the records into Salesforce to keep your CRM product catalog current.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- MySQL database with a products table
- Salesforce developer account with a connected app and OAuth 2.0 credentials
- A custom external ID field on the Salesforce Product2 object (e.g., `External_Product_Id__c`)

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/mysql-to-salesforce-products

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your MySQL and Salesforce credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[mysql]
host = "localhost"
port = 3306
user = "<DB_USER>"
password = "<DB_PASSWORD>"
database = "product_catalog"

[salesforce]
clientId = "<SF_CLIENT_ID>"
clientSecret = "<SF_CLIENT_SECRET>"
refreshToken = "<SF_REFRESH_TOKEN>"
baseUrl = "https://your-instance.salesforce.com"

[sync]
pollingIntervalSeconds = 300
batchSize = 200
```

## Code Walkthrough

### Project Structure

```
mysql-to-salesforce-products/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── db_client.bal
├── sf_client.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// MySQL product record
type Product record {|
    int id;
    string name;
    string description;
    decimal price;
    string sku;
    string category;
    boolean isActive;
    string updatedAt;
|};

// Salesforce Product2 record
type SalesforceProduct record {|
    string Name;
    string Description;
    string ProductCode;
    string Family;
    boolean IsActive;
    string External_Product_Id__c;
|};

// Salesforce PricebookEntry for setting the price
type PricebookEntry record {|
    string Product2Id;
    string Pricebook2Id;
    decimal UnitPrice;
    boolean IsActive;
|};
```

### Querying MySQL for Updated Products

```ballerina
import ballerina/sql;
import ballerinax/mysql;
import ballerina/log;

configurable mysql:Options mysqlConfig = ?;
configurable string database = ?;

final mysql:Client dbClient = check new (
    host = mysqlConfig.host,
    port = mysqlConfig.port,
    user = mysqlConfig.user,
    password = mysqlConfig.password,
    database = database
);

string lastSyncTimestamp = "1970-01-01 00:00:00";

function fetchUpdatedProducts(int batchSize) returns Product[]|error {
    sql:ParameterizedQuery query = `SELECT id, name, description, price, sku,
        category, is_active AS isActive, updated_at AS updatedAt
        FROM products
        WHERE updated_at > ${lastSyncTimestamp}
        ORDER BY updated_at ASC
        LIMIT ${batchSize}`;

    stream<Product, sql:Error?> resultStream = dbClient->query(query);
    Product[] products = check from Product p in resultStream select p;

    if products.length() > 0 {
        lastSyncTimestamp = products[products.length() - 1].updatedAt;
    }

    log:printInfo("Fetched products from MySQL", count = products.length());
    return products;
}
```

### Upserting to Salesforce

```ballerina
import ballerinax/salesforce;
import ballerina/log;

configurable salesforce:ConnectionConfig sfConfig = ?;

final salesforce:Client sfClient = check new (sfConfig);

function upsertProducts(Product[] products) returns error? {
    foreach Product product in products {
        SalesforceProduct sfProduct = transformProduct(product);

        // Upsert using the external ID field to avoid duplicates
        _ = check sfClient->upsert("Product2", "External_Product_Id__c", sfProduct);

        log:printInfo("Upserted product to Salesforce",
            sku = product.sku,
            name = product.name);
    }
}

function transformProduct(Product product) returns SalesforceProduct => {
    Name: product.name,
    Description: product.description,
    ProductCode: product.sku,
    Family: product.category,
    IsActive: product.isActive,
    External_Product_Id__c: product.id.toString()
};
```

### Scheduled Sync Orchestration

```ballerina
import ballerina/task;
import ballerina/log;

configurable int pollingIntervalSeconds = 300;
configurable int batchSize = 200;

public function main() returns error? {
    _ = check task:scheduleJobRecurByFrequency(new ProductSyncJob(), pollingIntervalSeconds);
    log:printInfo("Product sync started",
        interval = pollingIntervalSeconds,
        batchSize = batchSize);
}

class ProductSyncJob {
    *task:Job;

    isolated function execute() {
        error? result = syncProducts();
        if result is error {
            log:printError("Product sync cycle failed", result);
        }
    }
}

function syncProducts() returns error? {
    Product[] products = check fetchUpdatedProducts(batchSize);

    if products.length() == 0 {
        log:printInfo("No new product updates found");
        return;
    }

    check upsertProducts(products);
    log:printInfo("Sync cycle completed", syncedCount = products.length());
}
```

### Key Points

- **Incremental sync**: The `lastSyncTimestamp` tracker ensures only rows modified since the last poll are processed.
- **Upsert pattern**: Using an external ID field (`External_Product_Id__c`) allows the integration to insert new products and update existing ones without creating duplicates.
- **Batch processing**: The configurable `batchSize` limits the number of records processed per cycle, preventing Salesforce API governor limit issues.

## Customization Notes

- **Add price book sync**: Extend the integration to also create `PricebookEntry` records in the standard price book, using the `PricebookEntry` type shown above.
- **Support deletes**: Add a `deleted_at` soft-delete column in MySQL and deactivate the corresponding Salesforce product when a deletion is detected.
- **Multi-currency**: If your Salesforce org uses multi-currency, include the `CurrencyIsoCode` field in the product mapping.
- **Add CDC instead of polling**: Replace the polling mechanism with MySQL Change Data Capture (CDC) using the Debezium connector for near-real-time sync.

## What's Next

- [Kafka to Salesforce Price Book](kafka-salesforce-pricebook.md) -- Stream pricing events to Salesforce
- [Google Sheets to Salesforce Contacts](google-sheets-salesforce.md) -- Sync spreadsheet data to CRM contacts
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
