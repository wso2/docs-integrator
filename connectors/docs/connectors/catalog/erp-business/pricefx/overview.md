---
title: Pricefx
---

[Pricefx](https://www.pricefx.com/) is a cloud-native pricing and revenue management platform that helps enterprises manage price lists, calculation grids, quotes, contracts, and rebate agreements across their sales organization. The `ballerinax/pricefx` connector provides a client for the [Pricefx Backend API](https://api.pricefx.com/), covering master data (products, customers, sellers), pricing (price lists, manual price lists, calculation grids, condition records), sales (quotes, contracts, rebate agreements, sales compensations), and platform administration (users, workflow, data manager, notifications, comments, custom forms, and more).

## Key Features

- Manage products, customers, sellers, and their extension fields
- Create, calculate, and manage price lists, manual price lists, and calculation grids
- Build quotes, submit and revoke them, and convert them to deals
- Manage contracts (agreements and promotions) and rebate agreements
- Run rebate calculations and manage rebate record groups
- Handle sales compensation plans and records
- Upload, download, and manage attachments and files
- Manage users, business roles, and workflow delegations
- Work with the Data Manager, lookup tables, and key-value stores
- Authenticate with username/password, an API key, OAuth 2.0, or a pre-signed external JWT
- Transparent re-authentication - the client automatically refreshes a short-lived token and retries once whenever a request comes back unauthenticated

## Actions

The connector exposes a single client for interacting with the Pricefx API.

| Client | Actions |
|---|---|
| [`Client`](action-reference.md#client) | Manages Pricefx products, customers, sellers, condition records, price lists, manual price lists, calculation grids, quotes, contracts, rebate agreements and calculations, sales compensations, attachments, users, workflow, data manager, and authentication. |

## Documentation

- [Setup Guide](setup-guide.md) - Get Pricefx credentials
- [Actions](action-reference.md) - Available operations

## How to contribute

Contribute to the connector's development on GitHub: [module-ballerinax-pricefx](https://github.com/ballerina-platform/module-ballerinax-pricefx).
