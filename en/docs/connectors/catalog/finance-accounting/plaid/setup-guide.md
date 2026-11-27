---
connector: true
connector_name: "plaid"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/plaid connector."
---

# Setup Guide

To use the Plaid connector, you need a Plaid account and its API keys. With API-key authentication, which every operation supports, each request carries a `client_id`, an environment-specific secret and the API version, sent as the `PLAID-CLIENT-ID`, `PLAID-SECRET` and `Plaid-Version` headers. A client configured with OAuth instead sends a bearer token and none of these headers.

## Prerequisites

- A Plaid account. If you don't have one, [sign up](https://dashboard.plaid.com/signup).

## Step 1: Create a Plaid account

1. Sign up for a free account on the [Plaid Dashboard](https://dashboard.plaid.com/signup). A new account has immediate access to the Sandbox environment, which returns test data from simulated institutions.
2. To use real financial data, request Production access from the Dashboard. Plaid reviews the request and enables each product (Auth, Transactions, Identity and so on) for your team individually.

## Step 2: Get the API keys

1. In the Plaid Dashboard, open **Developers**, then **Keys**.
2. Copy your `client_id`. It is the same for every environment.
3. Copy the secret for the environment you will call. Sandbox and Production have separate secrets, and a secret works only against its own environment's URL.

   | Environment | URL |
   |---|---|
   | Sandbox | `https://sandbox.plaid.com` |
   | Production | `https://production.plaid.com` (the connector's default) |

## Step 3 (optional): OAuth client credentials for Plaid Check

1. Use OAuth only for a client dedicated to the Consumer Report (Plaid Check) endpoints that read `cra/check_report` data: `craCheckReportBaseReportGet`, `craCheckReportIncomeInsightsGet`, `craCheckReportNetworkInsightsGet`, `craCheckReportCashflowInsightsGet` and `craCheckReportLendScoreGet`.
2. Request an OAuth 2.0 client-credentials token with the `cra:read` scope from `https://api.plaid.com/oauth2/apiv2/token`.

:::note
Every other operation requires the API keys from Step 2.
:::

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
