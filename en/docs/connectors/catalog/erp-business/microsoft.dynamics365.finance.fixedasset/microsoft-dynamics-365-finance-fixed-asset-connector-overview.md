---
title: "Overview"
---

# Overview

[Microsoft Dynamics 365 Finance](https://www.microsoft.com/en-us/dynamics-365/products/finance) is Microsoft's cloud ERP solution for financial management, covering general ledger, accounts receivable and payable, fixed assets, budgeting, cash and bank management, and tax. The Fixed Asset module tracks the full lifecycle of capital assets — acquisition, depreciation value models, sorting and grouping, leasing, and legacy asset ledger and usage records — exposed through entities such as `FixedAssets`, `FixedAssetsV2`, `FixedAssetValueModels`, `AssetLendings`, `AssetSortings`, `LeasingGroups`, `ParentLeases`, and the `RAsset*` reference tables.

The `ballerinax/microsoft.dynamics365.finance.fixedasset` connector enables you to list, create, read, update, and delete fixed asset master data, depreciation value models, leasing and lending records, and related reference data in Microsoft Dynamics 365 Finance directly from your integration flows.

## Key features

- Manage core fixed asset master data through the `FixedAssets` and `FixedAssetsV2` entities
- Manage depreciation value models for a fixed asset through the `FixedAssetValueModels` entity
- Track assets loaned to external parties through the `AssetLendings` entity
- Manage fixed asset sorting fields and depreciation asset groups through the `AssetSortings` and `RAssetGroups` entities
- Manage lease accounting data through the `ParentLeases` and `LeasingGroups` entities
- Manage legacy asset ledger posting profiles and asset usage records through the `RAssetLedgers`, `RAssetTables`, and `RAssetUses` entities
- Filter, sort, paginate, and shape responses using OData query parameters (`filter`, `orderby`, `top`, `skip`, `expand`, `select`, `count`)
- Query across legal entities in a single request using the `crossCompany` query parameter
- OAuth 2.0 client credentials grant authentication against Microsoft Entra ID

## Actions

Actions are operations you invoke on Microsoft Dynamics 365 Finance from your integration. Use these actions for listing and filtering fixed asset records, registering new assets and value models, updating depreciation and leasing details, and removing obsolete records.

| Client | Actions |
|--------|---------|
| `Client` | Fixed asset CRUD, fixed asset value models, asset lendings, asset sortings, leasing groups, parent leases, and depreciation/ledger/asset-use reference data |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through registering an application in Microsoft Entra ID, granting it access to Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics 365 Finance Fixed Asset** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics 365 Finance Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
