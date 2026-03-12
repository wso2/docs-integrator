---
sidebar_position: 14
title: "Finance & Accounting"
description: "Finance and accounting connectors for QuickBooks, Xero, Plaid, and more in WSO2 Integrator."
---

# Finance & Accounting Connectors

Automate financial workflows and keep accounting data in sync across your systems. These connectors let you manage invoices, reconcile transactions, sync financial data, and integrate with banking APIs.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **QuickBooks** | `ballerinax/quickbooks` | Manage invoices, payments, customers, and financial reports |
| **Xero** | `ballerinax/xero` | Sync invoices, bank transactions, and contacts |
| **Plaid** | `ballerinax/plaid` | Connect to bank accounts, verify identity, and fetch transactions |
| **Stripe Billing** | `ballerinax/stripe` | Manage subscriptions, invoices, and recurring payments |
| **Brex** | `ballerinax/brex` | Track expenses, manage cards, and automate reimbursements |
| **Chargebee** | `ballerinax/chargebee` | Manage subscription billing, invoicing, and revenue |
| **Wise** | `ballerinax/wise` | Automate international payments and currency conversions |

## Quick Example

### Create an Invoice in QuickBooks from an Order Event

```ballerina
import ballerina/http;
import ballerinax/quickbooks;

configurable string qbBaseUrl = ?;
configurable string qbRealmId = ?;
configurable string qbAccessToken = ?;

final quickbooks:Client qbClient = check new ({
    baseUrl: qbBaseUrl,
    auth: {
        token: qbAccessToken
    }
});

type OrderEvent record {|
    string customerId;
    string customerName;
    LineItem[] items;
|};

type LineItem record {|
    string description;
    decimal amount;
    int quantity;
|};

service /api on new http:Listener(8090) {
    resource function post invoices(OrderEvent order) returns json|error {
        quickbooks:Line[] lines = from LineItem item in order.items
            select {
                Description: item.description,
                Amount: item.amount * <decimal>item.quantity,
                DetailType: "SalesItemLineDetail",
                SalesItemLineDetail: {
                    Qty: item.quantity,
                    UnitPrice: item.amount
                }
            };

        quickbooks:Invoice invoice = check qbClient->createInvoice({
            CustomerRef: {value: order.customerId},
            Line: lines
        });

        return {
            status: "created",
            invoiceId: invoice.Id,
            total: invoice.TotalAmt
        };
    }
}
```

### Fetch Bank Transactions with Plaid

```ballerina
import ballerinax/plaid;

configurable string plaidClientId = ?;
configurable string plaidSecret = ?;

final plaid:Client plaidClient = check new ({
    clientId: plaidClientId,
    secret: plaidSecret,
    environment: "sandbox"
});

function getRecentTransactions(string accessToken) returns plaid:Transaction[]|error {
    plaid:TransactionsGetResponse response = check plaidClient->getTransactions({
        access_token: accessToken,
        start_date: "2025-01-01",
        end_date: "2025-03-01",
        options: {
            count: 100
        }
    });
    return response.transactions;
}
```

## Configuration

```toml
# QuickBooks
[quickbooks]
qbBaseUrl = "https://quickbooks.api.intuit.com/v3/company"
qbRealmId = "<QUICKBOOKS_REALM_ID>"
qbAccessToken = "<QUICKBOOKS_ACCESS_TOKEN>"

# Plaid
[plaid]
plaidClientId = "<PLAID_CLIENT_ID>"
plaidSecret = "<PLAID_SECRET>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [Data Transformation](../develop/transform/data-mapper.md) -- Map financial data between systems
- [Error Handling per Connector](error-handling.md) -- Handle connector-specific errors
