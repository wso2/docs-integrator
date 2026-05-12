---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up an Asgardeo Machine-to-Machine (M2M) application and obtaining the OAuth 2.0 client credentials required to use the SCIM connector.

## Prerequisites

- An active Asgardeo account. If you do not have one, [sign up for a free Asgardeo organization](https://asgardeo.io/signup).

## Step 1: Register a machine-to-Machine (M2M) application

1. Log in to the [Asgardeo Console](https://console.asgardeo.io/).
2. Click **Applications** in the left navigation menu.
3. Click **New Application** and select **M2M Application**.
4. In the **Name** field, enter a unique name to identify your application (e.g., `Ballerina SCIM Connector`).
5. Click **Register** to complete the registration.

## Step 2: Authorize the API resources for the app

1. Navigate to the **API Authorization** tab of the newly registered application.
2. Authorize the SCIM2 API resources and select the required scopes (permissions), such as:
    - `internal_user_mgt_list`: List and filter users
    - `internal_user_mgt_view`: View user details
    - `internal_user_mgt_create`: Create users
    - `internal_user_mgt_update`: Update users
    - `internal_user_mgt_delete`: Delete users
    - `internal_group_mgt_view`: View group details
    - `internal_group_mgt_create`: Create groups
    - `internal_group_mgt_update`: Update groups
    - `internal_group_mgt_delete`: Delete groups
3. Click **Update** to save the authorization settings.

Only authorize the scopes your integration needs. Following the principle of least privilege improves security.

## Step 3: Get the client ID and client secret

1. Navigate to the **Protocol** tab of the M2M application.
2. Copy the **Client ID**; this is your `clientId`.
3. Copy the **Client Secret**; this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Identify your organization name and token URL

Your Asgardeo organization name is used to construct both the SCIM service URL and the OAuth token URL:

- **SCIM Service URL**: `https://api.asgardeo.io/t/<orgName>/scim2`
- **Token URL**: `https://api.asgardeo.io/t/<orgName>/oauth2/token`

You can find your organization name in the Asgardeo Console URL (e.g., `https://console.asgardeo.io/t/myorg`).
