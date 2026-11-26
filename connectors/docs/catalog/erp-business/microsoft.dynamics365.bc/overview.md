---
title: Microsoft Dynamics365 Bc
---

# Microsoft Dynamics365 BC

The Microsoft Dynamics365 BC connector provides access to the Microsoft Dynamics 365 Business Central Standard APIs (v1.0) over OAuth 2.0, enabling integration with Microsoft's cloud ERP system for small and mid-sized organisations. It covers the complete published API surface spanning companies, customers, vendors, items, employees, sales and purchase documents, journals, dimensions, general ledger entries, and financial statement reports. Use this connector to build integrations that read and write data across the full breadth of a Business Central company's business objects.

## Key Features

- Manage customer, vendor, item, and employee master data for a company
- Raise and maintain sales quotes, orders, invoices, and credit memos, including their document lines
- Drive document lifecycles with Business Central bound actions (post, cancel, send, ship-and-invoice)
- Record and post journals, journal lines, and customer payment journals
- Read financial statement reports including balance sheet, income statement, cash flow, and trial balance
- Manage attachments, pictures, and generated PDF documents for business objects
- Access reference data including currencies, dimensions, tax groups, payment methods, and units of measure
- Query aged accounts receivable and payable, general ledger entries, and bank accounts

## Actions

The connector exposes a single `Client` that covers the full Business Central Standard API surface, organized around the business objects of a company.

| Client | Actions |
|--------|---------|
| `Client` | Companies, Customers, Vendors, Items, Employees, Sales Invoices, Sales Orders, Sales Quotes, Sales Credit Memos, Purchase Invoices, Journals, Customer Payments, General Ledger Entries, Accounts, Bank Accounts, Dimensions, Financial Statements, Reference Data |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to register an application in Microsoft Entra ID, grant Business Central API permissions, create a client secret, and obtain an OAuth 2.0 refresh token.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Microsoft Dynamics365 Bc** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Microsoft Dynamics365 Bc Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.bc)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
