---
title: Process Manager
description: "Implement the Process Manager pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Process Manager

Use a Process Manager to route a message through multiple processing steps when the required steps are not fixed at design time and may not be sequential. The process manager maintains the state of the sequence and determines the next step based on intermediate results. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/ProcessManager.html" label="Enterprise Integration Patterns Process Manager reference" />

In WSO2 Integrator, the process manager is the central flow that calls each processing step, holds the intermediate results, and decides the next step with control nodes. Steps that do not affect the outcome can run asynchronously with `start`.

## Example: Orchestrating order fulfillment

This example orchestrates a book order across multiple systems. The process manager first creates the order in Shopify, then chooses the shipping step based on the result — FedEx for United States addresses, DHL Express otherwise — and finally triggers the confirmation email asynchronously through SendGrid.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

The design view shows the order service fanning out to four systems — Shopify, FedEx, DHL Express, and SendGrid — that the process manager coordinates:

<PatternImage src="/img/eip-patterns/process_manager_design.png" alt="Process Manager integration design view in WSO2 Integrator" width={760} />

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `OrderRequest` payload.
2. Add HTTP client connections for Shopify, FedEx, DHL Express, and SendGrid. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, post the order to Shopify and capture the `OrderResponse` — this intermediate result drives the next step.
4. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) on the shipping country: create a FedEx shipment for United States orders, and a DHL shipment otherwise, capturing the tracking number from either branch.
5. Start the `sendConfirmationMail` step asynchronously so the customer notification does not block the process.

The flow creates the order in Shopify, chooses FedEx or DHL by destination country, and triggers the confirmation email asynchronously:

<PatternImage src="/img/eip-patterns/process_manager_flow.png" alt="Process Manager flow in the WSO2 Integrator visual designer" width={740} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type OrderRequest record {|
    string email;
    Address address;
    OrderItemRequest[] orderItems;
|};

type OrderResponse record {|
    string email;
    string currency;
    float total;
    Address address;
    OrderItemResponse[] orderItems;
    string trackingNumber;
|};

type Address record {|
    string fullName;
    string address1;
    string phone;
    string city;
    string country;
|};

type OrderItemRequest record {
    string itemName;
    int quantity;
};

type OrderItemResponse record {|
    string itemName;
    int quantity;
    float price;
    string currencyCode;
|};

type ShipmentRequest record {|
    float amount;
    string currency;
    string personName;
    string email;
    DHLAddress|FedexAddress address;
|};

type FedexAddress record {|
    string address1;
    string city;
    string country;
    string phoneNumber;
|};

type DHLAddress record {|
    string name;
    string address1;
    string city;
    string country;
    string phoneNumber;
|};

type FedexResponse record {|
    string transactionId;
    string trackingNumber;
|};

type DHLResponse record {|
    string trackingNumber;
|};

final http:Client shopify = check new ("http://BlackwellsBooks.myshopify.com.balmock.io");
final http:Client dhlExpress = check new ("http://express.api.dhl.com.balmock.io");
final http:Client fedEx = check new ("http://api.fedex.com.balmock.io");
final http:Client sendgrid = check new ("http://api.sendgrid.com.balmock.io");
// docs-fold-end

// docs-fold-start: Processing step functions
function createFedexShipment(OrderResponse response) returns FedexResponse|error {
    ShipmentRequest fedexReq = {
        amount: response.total,
        currency: response.currency,
        personName: response.address.fullName,
        email: response.email,
        address: {
            address1: response.address.address1,
            city: response.address.city,
            country: response.address.country,
            phoneNumber: response.address.phone
        }
    };

    FedexResponse targetType = check fedEx->/api/en\-us/catalog/ship/v1/shipments.post(fedexReq);
    return targetType;
}

function creeateDhlShipment(OrderResponse response) returns DHLResponse|error {
    ShipmentRequest dhlReq = {
        amount: response.total,
        currency: response.currency,
        personName: response.address.fullName,
        email: response.email,
        address: {
            name: response.address.fullName,
            address1: response.address.address1,
            city: response.address.city,
            country: response.address.country,
            phoneNumber: response.address.phone
        }
    };

    DHLResponse targetType = check dhlExpress->/mydhlapi/shipments.post(dhlReq);
    return targetType;
}

function sendConfirmationMail(string name, string email, string trackingNumber) returns error? {
    string body = string `<p>Hello ${name}!</p><p>Your Order has been shipped. ` +
                string `Track your order using ${trackingNumber}</p>`;
    var mailReq = {
        toInfo: email,
        fromInfo: "orders@blackwell.com",
        subject: "Order Confirmation",
        content: body
    };

    json jsonResult = check sendgrid->/v3/mail/send.post(mailReq, targetType = json);
}
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function post orders(OrderRequest orderReq) returns error? {
        OrderResponse response = check shopify->/admin/api/orders\.json.post(orderReq);
        string trackingNumber;
        if response.address.country == "United States" {
            FedexResponse fedexResp = check createFedexShipment(response);
            trackingNumber = fedexResp.trackingNumber;
        } else {
            DHLResponse dhlResp = check creeateDhlShipment(response);
            trackingNumber = dhlResp.trackingNumber;
        }
        future<error?> futureResult = start sendConfirmationMail(response.address.fullName, response.email, trackingNumber);
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [process manager sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/process_manager) on GitHub.
