---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot private app and obtaining the access token required to authenticate the HubSpot CRM Contacts connector.

## Prerequisites

- A HubSpot account. If you do not have one, [sign up for a free account](https://app.hubspot.com/signup-hubspot/crm).

## Step 1: Create a HubSpot private app

1. Log in to your HubSpot account.
2. Click the **Settings** gear icon in the top navigation bar.
3. In the left sidebar, navigate to **Integrations** > **Private Apps**.
4. Click **Create a private app**.
5. On the **Basic Info** tab, enter a name for your app (e.g., `Ballerina CRM Contacts`) and optionally a description and logo.

## Step 2: Configure required scopes

1. Click the **Scopes** tab.
2. Under **CRM**, find and select the following scopes:
    - `crm.objects.contacts.read`: required to read contact records
    - `crm.objects.contacts.write`: required to create, update, and delete contacts
3. Add any additional scopes needed by your integration (e.g., `crm.objects.companies.read` for association lookups).

Grant only the minimum scopes required by your integration. Avoid enabling broad scopes unless necessary.

## Step 3: Create the app and copy the access token

1. Click **Create app** in the top-right corner.
2. Review the permissions summary in the confirmation dialog and click **Continue creating**.
3. After the app is created, HubSpot displays a **Token** dialog with your access token.
4. Copy the access token; this is your `token` value for the connector's `BearerTokenConfig`.

Store the access token securely. It is shown only once at creation time. If you lose it,
you can regenerate it from the private app's detail page under **Auth**. Do not commit
it to source control; use Ballerina's `configurable` feature and a `Config.toml` file to
supply it at runtime.

## Step 4: Rotate or regenerate the access token (if needed)

1. Go to **Settings** > **Integrations** > **Private Apps**.
2. Click on your private app name.
3. Under the **Auth** tab, click **Rotate token** to invalidate the existing token and generate a new one.
4. Copy and store the new token securely, then update your integration configuration.

Rotating the token immediately invalidates the previous token. Any running integrations using the old token will fail until updated.
