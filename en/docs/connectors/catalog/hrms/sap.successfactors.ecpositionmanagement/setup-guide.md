---
connector: true
connector_name: "sap.successfactors.ecpositionmanagement"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/sap.successfactors.ecpositionmanagement connector."
---

# Setup Guide

This guide walks you through getting the necessary details from SAP SuccessFactors so that the connector can authenticate and communicate with your Employee Central instance.

## Prerequisites

- An SAP SuccessFactors Employee Central tenant
- Administrator access to Admin Center

## Register an OAuth2 client application

1. Sign in to your SAP SuccessFactors instance as an administrator.

2. Navigate to **Admin Center** > **Manage OAuth2 Client Applications** and register a new OAuth2 client application for your integration.

![Register OAuth2 App](https://raw.githubusercontent.com/ballerina-platform/module-ballerinax-sap/main/docs/setup/sf-1-register-oauth.png)

3. Note down the **API Key** (client ID) and configure the appropriate scopes for the Employee Central APIs you intend to use.

## Locate your Company ID and API server

Locate your **Company ID** and the API server hostname for your SuccessFactors region. You can find the list of API servers in the [SAP SuccessFactors API documentation](https://help.sap.com/viewer/d599f15995d348a1b45ba5603e2aba9b/LATEST/en-US/af2b8d5437494b12be88fe374eba75b6.html).

## Choose an authentication method

**OAuth 2.0 SAML Bearer is recommended**: use the API Key from the registered client application to authenticate with the API. Basic Authentication (username formatted as `<username>@<companyID>`, plus password) is also supported.

![Manage OAuth2 Client Applications](/img/connectors/catalog/hrms/sap.successfactors/manage-oauth2-client-applications.png)

## Next steps

- [Action Reference](action-reference.md) - Available operations
