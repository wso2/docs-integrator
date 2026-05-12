---
title: Setup Guide
---

# Setup Guide

This guide walks you through identifying the Service Catalog API endpoint and obtaining the OAuth 2.0 credentials required to connect the Ballerina connector to your WSO2 API Manager instance.

## Prerequisites

- A running WSO2 API Manager instance (v4.0.0 or later). Refer to the [WSO2 API Manager documentation](https://apim.docs.wso2.com/) for installation instructions.
- An admin or publisher account with sufficient privileges to access the Service Catalog API.

## Step 1: Identify the service catalog API endpoint

The Service Catalog REST API is hosted on your WSO2 API Manager instance. The default endpoint is:

```
https://<your-apim-host>:<port>/api/service-catalog/v1
```

For a default local installation this is:

```
https://localhost:9443/api/service-catalog/v1
```

Note this URL; it is your `serviceUrl`.

## Step 2: Identify the OAuth2 token endpoint

The WSO2 API Manager OAuth2 token endpoint follows this pattern:

```
https://<your-apim-host>:<port>/oauth2/token
```

For a default local installation this is:

```
https://localhost:9443/oauth2/token
```

Note this URL; it is your `tokenUrl`.

## Step 3: Register an OAuth2 application via dynamic client registration

To obtain a `clientId` and `clientSecret`, register an OAuth2 application using the
WSO2 Dynamic Client Registration (DCR) endpoint:

1. Send a POST request to the DCR endpoint using Basic authentication with your admin credentials:

    ```
    POST https://<your-apim-host>:<port>/client-registration/v0.17/register
    Authorization: Basic <base64(username:password)>
    Content-Type: application/json

    {
      "callbackUrl": "http://localhost",
      "clientName": "ballerina-service-catalog-client",
      "owner": "<your-admin-username>",
      "grantType": "password refresh_token",
      "saasApp": true
    }
    ```

2. The response contains `clientId` and `clientSecret`. Copy both values.

If you already have an OAuth2 application in the WSO2 Developer Portal with the Password Grant type enabled, you can use its existing `clientId` and `clientSecret` instead of registering a new one.

## Step 4: Verify the required OAuth2 scopes

The Service Catalog API enforces scope-based access control. Ensure your WSO2 API Manager
user has the roles that grant the following scopes:

- `service_catalog:service_view`: required for read operations (list, get, export)
- `service_catalog:service_write`: required for write operations (create, update, delete, import)
- `apim:api_view`: required for checking which APIs reference a given service

By default, users with the `admin` role have access to all scopes.

Scope-to-role mappings can be reviewed and updated in the WSO2 Admin Portal under **Settings > Scope Assignments**.
