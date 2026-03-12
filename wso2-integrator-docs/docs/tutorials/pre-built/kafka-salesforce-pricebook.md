---
sidebar_position: 7
title: "Kafka to Salesforce Price Book"
description: "Pre-built integration sample: Stream Kafka pricing events to Salesforce price book entries using Ballerina."
---

# Kafka to Salesforce Price Book

Stream pricing update events from a Kafka topic and synchronize them with Salesforce price book entries. This integration consumes pricing messages from Kafka, maps the pricing data to Salesforce PricebookEntry records, and upserts them to keep your Salesforce price book in sync with your pricing engine.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Apache Kafka cluster (local or managed) with a pricing topic
- Salesforce developer account with a connected app and OAuth 2.0 credentials
- A Salesforce price book (Standard or custom) and associated products

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/kafka-to-salesforce-pricebook

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your Kafka and Salesforce credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[kafka]
bootstrapServers = "localhost:9092"
topic = "pricing-updates"
groupId = "sf-pricebook-sync"

[salesforce]
clientId = "<SF_CLIENT_ID>"
clientSecret = "<SF_CLIENT_SECRET>"
refreshToken = "<SF_REFRESH_TOKEN>"
baseUrl = "https://your-instance.salesforce.com"
pricebookId = "<PRICEBOOK2_ID>"
```

## Code Walkthrough

### Project Structure

```
kafka-to-salesforce-pricebook/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── sf_client.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// Kafka pricing event payload
type PricingEvent record {|
    string productCode;
    decimal unitPrice;
    string currency;
    string effectiveDate;
    boolean isActive;
    string priceType;     // "standard" or "discount"
    decimal? discountPercent;
|};

// Salesforce PricebookEntry record
type SalesforcePricebookEntry record {|
    string Pricebook2Id;
    string Product2Id;
    decimal UnitPrice;
    boolean IsActive;
    string CurrencyIsoCode?;
|};
```

### Consuming Kafka Pricing Events

The `main.bal` file sets up a Kafka listener that processes pricing messages as they arrive:

```ballerina
import ballerinax/kafka;
import ballerina/log;

configurable string bootstrapServers = ?;
configurable string topic = ?;
configurable string groupId = ?;

listener kafka:Listener kafkaListener = new (bootstrapServers, {
    groupId: groupId,
    topics: topic,
    pollingInterval: 1,
    autoCommit: false
});

service on kafkaListener {
    remote function onConsumerRecord(kafka:Caller caller,
                                     kafka:ConsumerRecord[] records) returns error? {
        foreach kafka:ConsumerRecord rec in records {
            byte[] value = rec.value;
            string jsonStr = check string:fromBytes(value);
            PricingEvent event = check jsonStr.fromJsonString().cloneWithType();

            error? result = processPricingEvent(event);
            if result is error {
                log:printError("Failed to process pricing event",
                    result,
                    productCode = event.productCode);
                // Do not commit offset; the message will be retried
                return;
            }

            log:printInfo("Processed pricing event",
                productCode = event.productCode,
                price = event.unitPrice);
        }

        // Commit offsets after successful processing
        check caller->commit();
    }
}
```

### Looking Up Products and Upserting Price Book Entries

```ballerina
import ballerinax/salesforce;
import ballerina/log;

configurable salesforce:ConnectionConfig sfConfig = ?;
configurable string pricebookId = ?;

final salesforce:Client sfClient = check new (sfConfig);

function processPricingEvent(PricingEvent event) returns error? {
    // Look up the Product2 ID by ProductCode
    string query = string `SELECT Id FROM Product2 WHERE ProductCode = '${event.productCode}' LIMIT 1`;
    stream<record {string Id;}, error?> results = check sfClient->query(query);

    record {string Id;}? product = check results.next();
    check results.close();

    if product is () {
        log:printWarn("Product not found in Salesforce, skipping",
            productCode = event.productCode);
        return;
    }

    // Calculate final price after discount
    decimal finalPrice = event.unitPrice;
    if event.discountPercent is decimal {
        decimal discount = <decimal>event.discountPercent;
        finalPrice = event.unitPrice * (1 - discount / 100);
    }

    // Check if a PricebookEntry already exists
    string pbeQuery = string `SELECT Id FROM PricebookEntry
        WHERE Product2Id = '${product.Id}' AND Pricebook2Id = '${pricebookId}' LIMIT 1`;
    stream<record {string Id;}, error?> pbeResults = check sfClient->query(pbeQuery);

    record {string Id;}? existingEntry = check pbeResults.next();
    check pbeResults.close();

    SalesforcePricebookEntry entry = {
        Pricebook2Id: pricebookId,
        Product2Id: product.Id,
        UnitPrice: finalPrice,
        IsActive: event.isActive
    };

    if existingEntry is record {string Id;} {
        // Update existing entry
        _ = check sfClient->update("PricebookEntry", existingEntry.Id, entry);
        log:printInfo("Updated price book entry",
            productCode = event.productCode,
            newPrice = finalPrice);
    } else {
        // Create new entry
        _ = check sfClient->create("PricebookEntry", entry);
        log:printInfo("Created price book entry",
            productCode = event.productCode,
            price = finalPrice);
    }
}
```

### Key Points

- **Event-driven processing**: The Kafka listener consumes messages as they arrive, providing near-real-time price updates in Salesforce.
- **Manual offset commit**: Offsets are committed only after successful processing, ensuring at-least-once delivery semantics.
- **Product lookup**: Each pricing event references a product by its code, which is resolved to a Salesforce Product2 ID before upserting the price book entry.
- **Discount calculation**: The integration supports both standard and discount pricing, applying percentage discounts before writing the final price.

## Customization Notes

- **Batch processing**: Accumulate multiple Kafka records and use the Salesforce composite API to upsert them in a single call for better performance.
- **Multi-currency support**: Include the `CurrencyIsoCode` field in the `SalesforcePricebookEntry` and the Kafka event to support multi-currency price books.
- **Dead letter queue**: Send failed events to a separate Kafka topic (dead letter queue) instead of blocking the consumer.
- **Schema validation**: Add Avro or JSON Schema validation using the Kafka Schema Registry connector to ensure incoming events conform to the expected format.

## What's Next

- [MySQL to Salesforce Products](mysql-salesforce-products.md) -- Sync product catalogs from a database
- [Salesforce to Twilio SMS](salesforce-twilio-sms.md) -- Send SMS on Salesforce events
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
