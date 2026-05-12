---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Salesforce Marketing Cloud Installed Package and obtaining the OAuth 2.0 Client Credentials required to use the connector.

## Prerequisites

- An active Salesforce Marketing Cloud account with API Integration permissions. If you do not have one, contact your Salesforce account executive or [request a trial](https://www.salesforce.com/products/marketing-cloud/overview/).

## Step 1: Log in to marketing cloud

1. Navigate to [mc.exacttarget.com](https://mc.exacttarget.com) or your tenant-specific login URL.
2. Log in with your Marketing Cloud credentials.

## Step 2: Create an installed package

1. In the top navigation, go to Setup (gear icon).
2. Under **Platform Tools**, expand **Apps** and click **Installed Packages**.
3. Click **New** to create a new package.
4. Enter a **Name** (e.g., `Ballerina MC Connector`) and optionally a **Description**.
5. Click **Save**.

You must have the Administrator role or the Installed Packages | Administer permission to create packages.

## Step 3: Add an API integration component

1. In the newly created package, click **Add Component**.
2. Select **API Integration** and click **Next**.
3. Choose **Server-to-Server** as the integration type and click **Next**.
4. Set the required permissions for your use case. Common scopes include:
   - **Journeys**: Read, Write, Execute
   - **Contacts**: Read, Write
   - **Data Extensions**: Read, Write
   - **Email**: Read, Write, Send
   - **Hub**: Read, Write
   - **Assets**: Read, Write
5. Click **Save**.

Grant only the minimum permissions your integration requires. You can update permissions later.

## Step 4: Retrieve client credentials

After saving the component, the package summary page displays:

1. **Client Id**; this is your `clientId`.
2. **Client Secret**; this is your `clientSecret`.
3. **Account ID** (MID); this is your `accountId`.
4. **Authentication Base URI**: note the subdomain (e.g., `mcdev` from `https://mcdev.auth.marketingcloudapis.com/`). This is your `subDomain`.

Store the Client Id, Client Secret, and Account ID securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

The Client Secret is shown only once when the component is first created. If you lose it, you must regenerate a new secret.

## Step 5: Identify your subdomain

The subdomain is the first part of your Marketing Cloud API endpoint URLs. It appears in:

- **Authentication Base URI**: `https://<subdomain>.auth.marketingcloudapis.com/`
- **REST Base URI**: `https://<subdomain>.rest.marketingcloudapis.com/`

For example, if your REST Base URI is `https://mcdev.rest.marketingcloudapis.com/`, your subdomain is `mcdev`.
