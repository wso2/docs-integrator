---
connector: true
connector_name: "sap.successfactors.ecapprenticemanagement"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/sap.successfactors.ecapprenticemanagement connector."
---

# Setup Guide

This guide walks you through getting the necessary details from SAP SuccessFactors so that the connector can authenticate and communicate with your Employee Central instance.

## Prerequisites

- An SAP SuccessFactors Employee Central tenant
- A user account with the required role permissions for the entities this connector accesses

## Obtain the API server hostname

SAP SuccessFactors serves OData API traffic from a dedicated API server host, which is usually **different from the host you use to log in to the SuccessFactors UI**. You can find the API server for your data center in [List of API Servers in SAP SuccessFactors](https://help.sap.com/viewer/d599f15995d348a1b45ba5603e2aba9b/LATEST/en-US/af2b8d5437494b12be88fe374eba75b6.html).

:::note
If Basic Authentication against the login host returns an `LGN0004` error ("You're not allowed to access APIs using Basic Authentication or OAuth on this server"), that confirms you're pointed at the UI host instead of the API host — use the API server hostname instead.
:::

## Obtain your Company ID and credentials

1. Sign in to your SAP SuccessFactors instance as an administrator.
2. Note your **Company ID**, shown in Admin Center or on the login screen.
3. Use **Basic Authentication**: the connector's `username` must be formatted as `<username>@<companyID>`, together with the account's password.
4. Alternatively, for **OAuth 2.0**: navigate to **Admin Center** > **Manage OAuth2 Client Applications** and register a new OAuth2 client application, noting the generated **API Key**.

## Next steps

- [Action Reference](action-reference.md) - Available operations
