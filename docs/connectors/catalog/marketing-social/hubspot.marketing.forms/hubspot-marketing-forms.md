---
title: HubSpot Marketing Forms
---

HubSpot Marketing Forms allows you to create and manage forms used to capture leads and contact information on your website. The Ballerina `ballerinax/hubspot.marketing.forms` connector (v1.0.0) provides programmatic access to the HubSpot Forms API v3, enabling you to create, read, update, and archive marketing forms from your Ballerina integration flows.

## Key features

- Create new marketing forms with customizable field groups, styling, and submit actions
- Retrieve individual form definitions by ID, including archived forms
- List all forms with filtering by form type, pagination, and archive status
- Full replacement updates of form definitions using PUT
- Partial updates of form definitions using PATCH for targeted changes
- Archive (soft-delete) forms that are no longer needed
- Support for 13 field types including email, phone, dropdowns, file uploads, and payment links
- Legal consent options for GDPR compliance (explicit consent, legitimate interest, implicit consent)

## Actions

Actions are operations you invoke on HubSpot from your integration, including creating forms, retrieving form definitions, updating field configurations, and archiving forms. The connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Form CRUD: create, list, get, update, partial update, and archive marketing forms |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to use the HubSpot Marketing Forms connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot Marketing Forms** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot Marketing Forms Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.marketing.forms)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
