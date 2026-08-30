---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Payment module within Dynamics 365 Finance manages the reference data that customer and vendor payments are processed against: currencies and currency conversion rules, ISO and non-ISO exchange rates, payment calendars, payment days, payment instructions, payment methods and terms, voucher types used for journal posting, and vendor registration and management (VRM) reference data used when onboarding vendors for payment processing. The `ballerinax/microsoft.dynamics365.finance.payment` connector enables you to list, create, retrieve, update, and delete these Payment entities via the Dynamics 365 Finance and Operations OData API directly from your integration flows.

## Key features

- Manage currency master data and currency conversion rules used across ledger and payment postings
- Maintain ISO and non-ISO exchange rates between currencies, including rate types, conversion factors, and validity periods
- Configure payment calendars, payment days, payment instructions, payment methods, and payment terms used to schedule and process customer and vendor payments
- Maintain voucher types used for journal posting and payment voucher numbering
- Manage vendor registration and management (VRM) reference data: currencies, languages, module parameters, people/contacts, and tax groups used when onboarding vendors
- Full list, create, read, update, and delete (CRUD) support for every Payment entity set, with OData query options for filtering, sorting, paging, and field selection
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on the Microsoft Dynamics 365 Finance environment from your integration. Use these actions for managing currencies and exchange rates, configuring payment calendars, days, instructions, methods, and terms, maintaining voucher types, and managing vendor registration and management (VRM) reference data. The Microsoft Dynamics 365 Finance Payment connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Currencies, currency rules, denominations, exchange rates (ISO and non-ISO), payment calendar rules, payment days, payment instructions, payment methods, payment terms, voucher types, and VRM currencies, languages, parameters, people, and tax groups |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 Finance and Operations API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Payment connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Payment** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
