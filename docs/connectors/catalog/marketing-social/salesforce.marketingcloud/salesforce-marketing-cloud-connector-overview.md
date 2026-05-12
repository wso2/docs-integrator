---
title: Overview
---

# Overview

Salesforce Marketing Cloud is a digital marketing platform that enables businesses to manage customer journeys, campaigns, email messaging, content assets, contacts, and data extensions. The Ballerina `ballerinax/salesforce.marketingcloud` connector (v1.0.1) provides programmatic access to the Marketing Cloud REST APIs, enabling you to automate journey orchestration, contact management, campaign operations, and transactional messaging within your Ballerina integration flows.

## Key features

- Journey management: create, update, retrieve, and delete customer journeys (interactions)
- Event definitions and entry event firing for Journey Builder automation
- Campaign CRUD operations for organizing marketing efforts
- Contact management including create, update, delete, search by attribute or email, and preference management
- Data Extension row upsert and delete (synchronous and asynchronous) for audience data management
- Content Builder asset and category management for images, emails, and other content types
- Transactional email definition management and email message sending
- Bulk data ingest and async import with summary tracking for large-scale data operations

## Actions

Actions are operations you invoke on Salesforce Marketing Cloud from your integration. Use these actions for managing journeys, firing events, creating campaigns, upserting data extension rows, and more. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Journeys, events, campaigns, contacts, data extensions, assets, categories, email messaging, bulk import |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Salesforce Marketing Cloud Installed Package and obtaining the OAuth 2.0 Client Credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Salesforce Marketing Cloud** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Salesforce Marketing Cloud Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-salesforce.marketingcloud)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
