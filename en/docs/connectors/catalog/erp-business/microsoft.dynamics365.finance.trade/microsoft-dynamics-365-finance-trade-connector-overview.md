---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Trade module within Dynamics 365 Finance manages international trade compliance and statutory cross-border reporting — Intrastat declarations for the movement of goods within the EU, foreign trade payment records (BLWI) used for balance-of-payments reporting, national commodity classification codes such as NAF (France), NGP (Spain), and TNVED (Eurasian Customs Union) codes, Single Administrative Document (SAD) groups, item codes, and parameters used for customs declarations, and statutory tax reports such as Spain's Model 347 and its associated reporting periods. The `ballerinax/microsoft.dynamics365.finance.trade` connector enables you to create, read, update, and delete these trade compliance and reporting entities directly from your integration flows.

## Key features

- Manage Intrastat declarations (`Intrastats` and `IntrastatsV2`) for cross-border movement of goods reporting
- Manage foreign trade payment records (`BLWI`) used for balance-of-payments reporting
- Manage national commodity classification codes: NAF (France), NGP (Spain), and TNVED (Eurasian Customs Union) codes
- Manage Single Administrative Document (SAD) groups, item codes, and parameters used for customs declarations
- Manage the Model 347 statutory tax report (`Report347`) and its reporting periods (`ReportPeriods`)
- List and filter trade entities using OData query parameters (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`)
- Query across all legal entities (companies) in a single request using the `cross-company` parameter
- OAuth2 client credentials authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering trade compliance records, creating and updating Intrastat and customs declarations, and managing commodity classification codes and statutory trade tax reports.

| Client | Actions |
|--------|---------|
| `Client` | Intrastat declaration CRUD, foreign trade payment record management, customs classification code management (NAF/NGP/TNVED), SAD customs declaration management, Model 347 tax reporting |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Trade** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
