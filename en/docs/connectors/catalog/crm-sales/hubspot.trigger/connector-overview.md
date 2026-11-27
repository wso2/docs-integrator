---
title: "Overview"
description: "Reference for the HubSpot webhook listener and service callbacks: receive contact, company, deal, ticket, product, line item and conversation events in Ballerina integrations."
keywords: [hubspot, webhook listener, hubspot webhooks, event handler, ballerina]
---

# Overview

HubSpot is a CRM platform for marketing, sales and customer service. The `ballerinax/hubspot.trigger` package lets an integration react to HubSpot CRM activity as it happens: it provides a webhook listener that verifies each delivery and calls your service callbacks when contacts, companies, deals, tickets, products, line items and conversations change.

## Key features

- Receives 41 HubSpot events across 7 service types, from contact and deal changes to new conversation messages
- Verifies every delivery with HubSpot's v3 signature and the app's client secret, and rejects stale requests
- Typed payload records for HubSpot's webhook events
- Acknowledges each delivery before running your handler, so a slow handler doesn't cause retries

## Triggers

Triggers allow your integration to react to HubSpot activity in real time. The `ballerinax/hubspot.trigger` package provides a webhook listener that verifies each delivery from HubSpot with the app's client secret and calls your service callbacks. It covers 41 events through 7 service types.

Service types:

| Service type | Callbacks |
|--------------|-----------|
| `CompanyService` | `onCompanyCreation`, `onCompanyDeletion`, `onCompanyPropertyChange`, `onCompanyAssociationChange`, `onCompanyMerge`, `onCompanyRestore` |
| `ContactService` | `onContactCreation`, `onContactDeletion`, `onContactPropertyChange`, `onContactAssociationChange`, `onContactMerge`, `onContactRestore`, `onContactPrivacyDeletion` |
| `ConversationService` | `onConversationCreation`, `onConversationDeletion`, `onConversationPropertyChange`, `onConversationPrivacyDeletion`, `onConversationNewMessage` |
| `DealService` | `onDealCreation`, `onDealDeletion`, `onDealPropertyChange`, `onDealAssociationChange`, `onDealMerge`, `onDealRestore` |
| `TicketService` | `onTicketCreation`, `onTicketDeletion`, `onTicketPropertyChange`, `onTicketAssociationChange`, `onTicketMerge`, `onTicketRestore` |
| `ProductService` | `onProductCreation`, `onProductDeletion`, `onProductPropertyChange`, `onProductMerge`, `onProductRestore` |
| `LineItemService` | `onLineItemCreation`, `onLineItemDeletion`, `onLineItemPropertyChange`, `onLineItemAssociationChange`, `onLineItemMerge`, `onLineItemRestore` |

See the **[Trigger Reference](triggers.md)** for listener configuration, every service type and callback, and the event payload structure, and the [HubSpot](product://integrator/develop-and-test/integration-artifacts/event-driven-integration/hubspot) guide to build a HubSpot event integration in WSO2 Integrator.

To call the HubSpot APIs, use the HubSpot CRM connectors, such as [HubSpot CRM Contacts](../hubspot.crm.obj.contacts/hubspot-crm-contacts-connector-overview.md).

## Documentation

* **[Setup Guide](setup-guide.md)**: Set up HubSpot to send webhook events to your integration.

* **[Trigger Reference](triggers.md)**: Listener configuration, every service type and callback, and the event payload types.

* **[Example](example.md)**: Build a HubSpot event integration in WSO2 Integrator.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this package, please create a pull request in the following repository.

* [HubSpot Trigger GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.trigger)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

## What's next

- [Setup Guide](setup-guide.md): point HubSpot at your listener
- [Trigger Reference](triggers.md): every service type, callback and payload type
- [Example](example.md): build a HubSpot event integration in WSO2 Integrator
