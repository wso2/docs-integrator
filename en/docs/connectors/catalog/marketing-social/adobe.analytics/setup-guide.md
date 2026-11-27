---
connector: true
connector_name: "adobe.analytics"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/adobe.analytics connector."
---

# Setup Guide

To use the Adobe Analytics connector, you need an Adobe Analytics product profile and access to the [Adobe Developer Console](https://developer.adobe.com/console).

## Prerequisites

- An Adobe Analytics product profile with access to the report suites you want to use
- Access to the [Adobe Developer Console](https://developer.adobe.com/console)

## Step 1: Create a project and add the Analytics API

1. Sign in to the Adobe Developer Console and create a new project.
2. Choose **Add API**, select **Adobe Analytics**, and pick the OAuth Server-to-Server credential type.
3. Assign the credential to a product profile that has access to the report suites you want to use.

## Step 2: Note the credentials

Copy the **Client ID** (used as the API key) and the **Client Secret** from the credential page.

## Step 3: Generate an access token

Request an access token from Adobe IMS. Access tokens expire after 24 hours, so repeat this step to refresh it.

```bash
curl -X POST https://ims-na1.adobelogin.com/ims/token/v3 \
  -d "client_id=<Client ID>" \
  -d "client_secret=<Client Secret>" \
  -d "grant_type=client_credentials" \
  -d "scope=openid,AdobeID,additional_info.projectedProductContext"
```

## Step 4: Find your global company ID

Call the discovery endpoint with the access token and API key. The `globalCompanyId` in the response is the value the connector methods take as their first argument.

```bash
curl https://analytics.adobe.io/discovery/me \
  -H "Authorization: Bearer <access token>" \
  -H "x-api-key: <Client ID>"
```

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
