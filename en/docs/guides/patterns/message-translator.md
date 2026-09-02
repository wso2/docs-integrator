---
title: Message Translator
description: "Implement the Message Translator pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message Translator

Use a Message Translator so that systems using different data formats can communicate with each other through messaging. The translator sits between the two systems and converts one message format into the other. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html" label="Enterprise Integration Patterns Message Translator reference" />

In WSO2 Integrator, the translator is a data mapping function. The source and target message shapes are Ballerina records, and the mapping function converts one record into the other before the message is sent on.

## Example: Translating sales data into invoices

This example accepts sales opportunity data from a CRM-style analytics endpoint and translates it into the invoice format that the QuickBooks accounting API expects. The `translate` function is the message translator: it maps `SalesData` into a `QuickBooksInvoice` before forwarding it.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `SalesData` payload.
2. Add an HTTP client connection for the QuickBooks API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. [Add a data mapper](../../develop/integration-artifacts/supporting/data-mapper/access-paths/reusable.md) that maps `SalesData` to `QuickBooksInvoice`, converting each opportunity into an invoice entry.
4. Call the QuickBooks connection with the translated message.

The flow calls the `translate` function to convert the sales data into the QuickBooks invoice format, then posts it:

<PatternImage src="/img/eip-patterns/message_translator_flow.png" alt="Message Translator flow in the WSO2 Integrator visual designer" width={530} />

The [Data Mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md) gives this conversion a visual view, which comes in handy for message translations: the `SalesData` fields on the left link to the `QuickBooksInvoice` fields on the right, and an [array mapping](../../develop/integration-artifacts/supporting/data-mapper/array-mappings/array-mappings.md) turns each `Opportunity` into an `Invoice`:

<PatternImage src="/img/eip-patterns/message_translator_datamapper.png" alt="Message Translator data mapper in WSO2 Integrator" width={1006} />

Expanding both arrays to their element level shows the field correspondence inside the mapping: each `Opportunity`'s `id`, `amount`, and `closeDate` becomes the `Invoice` item's `id`, `amount`, and `invoiceDate`:

<PatternImage src="/img/eip-patterns/message_translator_datamapper_item.png" alt="Message Translator data mapper showing each array element field mapping" width={1006} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type SalesData record {|
    Customer customer;
    Opportunity[] opportunities;
|};

type Customer record {|
    string id;
    string name;
    string email;
|};

type Opportunity record {|
    string id;
    decimal amount;
    string closeDate;
|};

type QuickBooksInvoice record {|
    string customerId;
    Invoice[] invoices;
|};

type Invoice record {|
    string id;
    decimal amount;
    string invoiceDate;
|};

final http:Client quickBooks = check new ("http://api.quickbooks.com.balmock.io");
// docs-fold-end

function translate(SalesData salesData) returns QuickBooksInvoice => {
    customerId: salesData.customer.id,
    invoices: from var opportunity in salesData.opportunities
        select {
            id: opportunity.id,
            amount: opportunity.amount,
            invoiceDate: opportunity.closeDate
        }
};

listener http:Listener httpListener = new (port = 8080);

service /api/v1/analytics on httpListener {
    resource function post sales(SalesData salesData) returns error? {
        QuickBooksInvoice quickBooksInvoice = translate(salesData);
        http:Response response = check quickBooks->/v3/company/REALM012/invoice.post(quickBooksInvoice, targetType = http:Response);
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [message translator sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/message_translator) on GitHub.
