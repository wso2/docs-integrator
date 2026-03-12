---
sidebar_position: 10
title: Recipient List
description: "Integration pattern: Recipient List -- dynamically determine the list of recipients for a message at runtime."
---

# Recipient List

The Recipient List pattern routes a message to a dynamically determined list of recipients. Unlike the static Publish-Subscribe pattern, the list of targets is computed at runtime based on the message content, configuration, or external lookups.

## Problem

You need to send a message to multiple recipients, but the list of recipients varies per message. A static fan-out does not work because different messages should go to different sets of systems. For example, an order notification might need to reach the warehouse, billing, and shipping systems, but only for certain product types or regions.

## Solution

Inspect each incoming message to determine its list of recipients, then route the message to each one. The recipient list can be derived from the message content, an external registry, a database lookup, or a combination.

```
                    ┌───────────────────┐
                    │                   │──────► Recipient A
 Message ──────────►│  Recipient List   │──────► Recipient B
                    │  (dynamic lookup) │──────► Recipient C
                    │                   │
                    └───────────────────┘
                    Recipients determined
                    at runtime per message
```

## When to Use It

- **Multi-channel notifications** -- Send alerts to different channels (email, Slack, SMS) based on severity
- **Regional routing** -- Forward orders to the appropriate regional warehouses
- **Subscription-based routing** -- Route events to subscribers who registered interest
- **Conditional fan-out** -- Only notify systems that are relevant to the specific event type

## Implementation

### Static Recipient List from Configuration

The simplest form: recipients come from configuration that can change without redeployment.

```ballerina
import ballerina/http;
import ballerina/log;

type NotificationEvent record {|
    string eventType;
    string severity;
    string message;
    json data;
|};

configurable string[] notificationEndpoints = [
    "http://billing:8080/events",
    "http://shipping:8080/events",
    "http://analytics:8080/events"
];

service /events on new http:Listener(8090) {

    resource function post notify(NotificationEvent event) returns json|error {
        string[] results = [];

        foreach string endpoint in notificationEndpoints {
            http:Client recipientClient = check new (endpoint);
            json|error response = recipientClient->post("/", event.toJson());
            if response is error {
                log:printError("Failed to notify recipient",
                    endpoint = endpoint,
                    'error = response
                );
                results.push(string `${endpoint}: failed`);
            } else {
                results.push(string `${endpoint}: success`);
            }
        }

        return {status: "notified", results: results};
    }
}
```

### Dynamic Recipient List from Message Content

Determine recipients based on the message content:

```ballerina
type OrderEvent record {|
    string orderId;
    string orderType;      // "physical", "digital", "subscription"
    string region;          // "US", "EU", "APAC"
    decimal amount;
    json details;
|};

// Recipient registry: maps criteria to endpoint URLs
type RecipientRule record {|
    string[] orderTypes;
    string[] regions;
    string endpoint;
|};

final RecipientRule[] recipientRules = [
    {orderTypes: ["physical"], regions: ["US", "EU", "APAC"], endpoint: "http://warehouse:8080/orders"},
    {orderTypes: ["physical", "digital", "subscription"], regions: ["US", "EU", "APAC"], endpoint: "http://billing:8080/orders"},
    {orderTypes: ["physical"], regions: ["US"], endpoint: "http://us-shipping:8080/orders"},
    {orderTypes: ["physical"], regions: ["EU"], endpoint: "http://eu-shipping:8080/orders"},
    {orderTypes: ["digital"], regions: ["US", "EU", "APAC"], endpoint: "http://digital-fulfillment:8080/orders"},
    {orderTypes: ["subscription"], regions: ["US", "EU", "APAC"], endpoint: "http://subscription-mgr:8080/orders"}
];

function resolveRecipients(OrderEvent event) returns string[] {
    return from RecipientRule rule in recipientRules
        where rule.orderTypes.indexOf(event.orderType) !is ()
           && rule.regions.indexOf(event.region) !is ()
        select rule.endpoint;
}

service /orders on new http:Listener(8090) {

    resource function post process(OrderEvent event) returns json|error {
        string[] recipients = resolveRecipients(event);

        log:printInfo("Resolved recipients",
            orderId = event.orderId,
            recipientCount = recipients.length()
        );

        json[] results = [];
        foreach string endpoint in recipients {
            http:Client client = check new (endpoint);
            json|error result = client->post("/", event.toJson());
            if result is error {
                log:printError("Delivery failed", endpoint = endpoint, 'error = result);
                results.push({endpoint: endpoint, status: "failed"});
            } else {
                results.push({endpoint: endpoint, status: "delivered"});
            }
        }

        return {orderId: event.orderId, deliveries: results};
    }
}
```

### Parallel Recipient Delivery

Use Ballerina's concurrency to deliver to all recipients in parallel:

```ballerina
function deliverToRecipients(OrderEvent event, string[] recipients) returns json[]|error {
    // Use workers to deliver in parallel
    future<json|error>[] futures = [];

    foreach string endpoint in recipients {
        future<json|error> f = start deliverToOne(endpoint, event);
        futures.push(f);
    }

    json[] results = [];
    foreach future<json|error> f in futures {
        json|error result = wait f;
        if result is error {
            results.push({status: "failed", 'error: result.message()});
        } else {
            results.push(result);
        }
    }

    return results;
}

function deliverToOne(string endpoint, OrderEvent event) returns json|error {
    http:Client client = check new (endpoint);
    json response = check client->post("/", event.toJson());
    return {endpoint: endpoint, status: "delivered", response: response};
}
```

## Variations

### Recipient List from Database

Look up recipients from a subscriber registry:

```ballerina
import ballerina/sql;
import ballerinax/mysql;

function resolveRecipientsFromDb(string eventType, string region) returns string[]|error {
    sql:ParameterizedQuery query = `
        SELECT endpoint_url FROM event_subscribers
        WHERE event_type = ${eventType}
          AND (region = ${region} OR region = 'ALL')
          AND active = true
    `;
    stream<record {|string endpoint_url;|}, sql:Error?> results = dbClient->query(query);
    return from var row in results select row.endpoint_url;
}
```

### Best-Effort vs. All-or-Nothing

Decide whether partial delivery is acceptable or all recipients must succeed:

```ballerina
// All-or-nothing: use a transaction-like approach
function deliverAllOrNothing(OrderEvent event, string[] recipients) returns error? {
    json[] responses = [];
    foreach string endpoint in recipients {
        http:Client client = check new (endpoint);
        json response = check client->post("/", event.toJson());
        responses.push(response);
    }
    // All succeeded if we reach here
}
```

## Considerations

- **Delivery guarantees** -- Decide if partial delivery is acceptable or if you need all-or-nothing semantics
- **Timeout handling** -- Set per-recipient timeouts to prevent one slow recipient from blocking all others
- **Idempotency** -- Recipients should be idempotent since retry logic may deliver the same message twice
- **Recipient health** -- Monitor recipient health and remove unhealthy recipients from the list temporarily

## Related Patterns

- [Scatter-Gather](scatter-gather.md) -- Sends to multiple recipients and aggregates responses
- [Publish-Subscribe](publish-subscribe.md) -- Static fan-out to all subscribers
- [Content-Based Router](content-based-router.md) -- Routes to a single recipient based on content
- [Message Filter](message-filter.md) -- Filters messages before they reach recipients
