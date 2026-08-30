---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Document module covers the supporting document infrastructure around those business processes: document type definitions and the transportation/shipping documents attached to them, contact "media" (phone, email, and address) records for parties, task guide metadata, print layout definitions for vouchers and reports, electronic document (ED) parameters for customer and vendor settlement documents, demo data posting jobs, and the message items, statuses, and logs used to track document exchange processing.

The `ballerinax/microsoft.dynamics365.finance.document` connector enables you to manage document types and documents, agents and agent feed items, demo data posting jobs, electronic document parameters, task guides, contact media, message processing items/statuses/logs, and print layouts directly from your integration flows.

## Key features

- Manage document type definitions (`DocumentTypes`) and the transportation/shipping documents (`Documents`) attached to them, including loading and unloading details, carrier, and driver information
- Track agent master records (`Agents`) and their AI-context feed items (`AgentFeeds`), including status, due dates, and permissions checks
- Generate and monitor demo data posting jobs (`DemoDataPosts`) that create sample sales, purchasing, and journal transactions
- Configure electronic document (ED) parameters (`EDParameters`) governing customer and vendor invoice numbering, grouping, and settlement document behavior
- Maintain task guide metadata (`Guides`) used for in-app guidance content
- Manage contact media records and media type definitions (`Media`, `MediaTypes`) used for party phone, email, and address details
- Track document exchange message items, statuses, and processing logs (`MessageItems`, `MessageStatus`, `MessagesLogs`)
- Configure print layout definitions (`PrintLayouts`) used to format printed vouchers and reports
- Full list, create, read, update, and delete (CRUD) operations across every entity set, with OData query parameters (`skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`) for filtering and paging
- OAuth2 client credentials authentication with Microsoft Entra ID (Azure AD)

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering documents, creating and updating document type and document records, and managing the supporting agent, demo data, ED parameter, guide, media, message, and print layout entities.

| Client | Actions |
|--------|---------|
| `Client` | Document type and document CRUD, agents and agent feeds, demo data posts, ED parameters, guides, media and media types, message items/status/logs, print layouts |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Document** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
