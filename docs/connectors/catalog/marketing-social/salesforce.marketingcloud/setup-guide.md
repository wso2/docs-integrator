---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Salesforce Marketing Cloud installed package and obtaining the Client ID and Client Secret required to use the Salesforce Marketing Cloud connector.

## Prerequisites

- A Salesforce Marketing Cloud account.

## Step 1: Log in to Marketing Cloud

1. Navigate to your [Salesforce Marketing Cloud login page](https://mc.exacttarget.com/cloud/login.html) and log in.

   ![SFMC login](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/1-sfmc-login.png)

2. Select your username in the top-right corner and select **Setup** from the dropdown menu.

   ![SFMC setup menu](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/2-sfmc-setup.png)

## Step 2: Create an installed package

1. In the **Setup** menu, scroll to the **Platform Tools** section and select **Apps > Installed Packages**.

   ![Installed packages](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/3-installed-packages.png)

2. Select **New**, enter a **Name** and **Description** (for example, `API Integration Package`), and select **Save**.

   ![New installed package](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/4-sfmc-new-component.png)

## Step 3: Add an API integration component

1. Select the package you created to view its details.

   ![Package details](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/5-sfmc-component-details.png)

2. Select **Add Component** and choose **API Integration** as the component type.

   ![Component type selection](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/6-sfmc-component-type.png)

3. Select **Server-to-Server** as the integration type.

   ![Integration type selection](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/7-sfmc-integration-type.png)

4. Under the available scopes, select the permissions required for your integration. For most use cases, add:
   - Read and Write access to Email Studio
   - Access to the REST API

   ![Component scopes](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/8-sfmc-scope.png)

5. Select **Save**.

## Step 4: Get the client ID and client secret

On the package detail page, copy the **Client Secret** and **Client ID** generated for your integration.

![Client secret](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/9-sfmc-secret.png)

![Client ID](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/10-sfmc-client.png)

Store the Client ID and Client Secret securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 5: Get your subdomain

Extract the subdomain from the **Base URI** on the package detail page. The subdomain is the portion between `https://` and `.auth.marketingcloudapis.com`. For example, from `https://mc123456gkz1x4p5b9m4gzx5b9.auth.marketingcloudapis.com/`, the subdomain is `mc123456gkz1x4p5b9m4gzx5b9`.

## Step 6: Get your account ID (if applicable)

If your account has multiple business units, hover over your account name in the top-right corner — the MID (account ID) is displayed there.

![Account ID](/img/connectors/catalog/marketing-social/salesforce.marketingcloud/setup/11-account-id.png)

## What's next

- [Action reference](actions.md): Available operations
