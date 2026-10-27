---
title: Setup Guide
---

# Setup Guide

This guide walks you through turning on Data 360, creating an External Client App, and obtaining the org URL, consumer key and consumer secret the WSO2 Salesforce Data 360 (Data Cloud) Connector needs.

The connector authenticates to your Salesforce org with OAuth 2.0. It then exchanges the org's access token for a Data 360 token and discovers the Data 360 tenant endpoint itself, so you only configure the org's credentials.

## Prerequisites

- A Salesforce org with Data 360 (Data Cloud).
- A user with the **System Administrator** profile, or equivalent permissions, to create External Client Apps.

## Step 1: Turn on Data 360

1. In Salesforce **Setup**, search for **Data Cloud Setup** (shown as **Data 360 Setup** in newer orgs). If Data 360 isn't set up yet, select **Get Started** and wait until provisioning finishes, which can take up to an hour.
2. Make sure the user the connector acts as has a Data 360 permission set, for example, **Data Cloud Admin** or **Data Cloud Architect**.

## Step 2: Create an External Client App

1. In **Setup**, search for **External Client App Manager** and select **New External Client App**.
2. Enter an **External Client App Name** and a **Contact Email**, and keep **Distribution State** as **Local**.

<ThemedImage
    alt="New External Client App form with the app name and contact email"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_01_create_external_client_app.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_01_create_external_client_app.png'),
    }}
/>

3. Expand **API (Enable OAuth Settings)**, select **Enable OAuth**, and enter a **Callback URL**, for example, `https://login.salesforce.com/services/oauth2/success`.
4. Move these scopes to **Selected OAuth Scopes**:

   | Scope | Needed for |
   |---|---|
   | Manage user data via APIs (`api`) | Identity resolution and calculated insight runs |
   | Manage Data Cloud Ingestion API data (`cdp_ingest_api`) | Streaming and bulk ingestion |
   | Manage Data Cloud profile data (`cdp_profile_api`) | Profile lookups |
   | Perform SQL queries on Data Cloud data (`cdp_query_api`) | SQL queries, and calculated insight queries and metadata |
   | Perform requests at any time (`refresh_token`, `offline_access`) | Only if you use the refresh token grant |

<ThemedImage
    alt="OAuth settings with the callback URL and the selected Data 360 scopes"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_02_oauth_settings.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_02_oauth_settings.png'),
    }}
/>

5. Under **Flow Enablement**, select **Enable Client Credentials Flow**. Under **Security**, keep **Issue JSON Web Token (JWT)-based access tokens for named users** cleared: the Data 360 token exchange doesn't accept JWT-based access tokens.

<ThemedImage
    alt="Flow enablement with the client credentials flow selected and the security settings"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_03_flow_and_security_settings.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_03_flow_and_security_settings.png'),
    }}
/>

6. Select **Create**.

New External Client Apps always require PKCE and rotate refresh tokens, and these settings can't be changed. With rotation, a refresh token can be used only once, so a refresh token saved in configuration stops working after the first run. Use the client credentials flow for integrations.

## Step 3: Set the client credentials user

1. Open the app and go to the **Policies** tab, then select **Edit**.
2. Under **OAuth Policies**, select **Enable Client Credentials Flow** and set **Run As** to the user from Step 1. The connector acts as this user.
3. Select **Save**.

## Step 4: Get the consumer key and consumer secret

1. On the app's **Settings** tab, under **OAuth Settings**, select **Consumer Key and Secret** and verify your identity.

<ThemedImage
    alt="Consumer Key and Secret button in the app settings"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_04_consumer_key_and_secret_button.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_04_consumer_key_and_secret_button.png'),
    }}
/>

2. Copy the **Consumer Key** and the **Consumer Secret**.

<ThemedImage
    alt="Consumer key and consumer secret of the External Client App"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_05_consumer_key_and_secret.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/salesforce.datacloud/setup_05_consumer_key_and_secret.png'),
    }}
/>

## Step 5: Note the org URL

The connector connects to your org's My Domain URL, for example, `https://acme.my.salesforce.com`. Find it in **Setup** under **My Domain**. Use the My Domain URL, not the Data 360 tenant endpoint: the connector discovers the tenant endpoint itself.

You now have everything the connector needs:

- **Org URL**: your My Domain URL, for example, `https://acme.my.salesforce.com`
- **Client ID**: the consumer key
- **Client secret**: the consumer secret

Store the client ID and client secret securely. Bind them to `configurable` variables and supply the values in `Config.toml` at runtime instead of hardcoding them.

## Step 6: Prepare Data 360 for ingestion (optional)

The ingestion operations write to objects of an Ingestion API connector. Skip this step if you only read profiles, insights or query results.

1. In **Data Cloud Setup**, go to **Ingestion API** and select **New**. Enter a connector name. That name, as shown in the **Ingestion API** list, is the `sourceName` of the ingestion operations.
2. Upload a schema file (OpenAPI YAML) that defines your objects and their fields. The object names are the `objectName` values of the ingestion operations.
3. Create a data stream for each object from the Ingestion API connector, and map it to the data model.

Every field defined in an object's schema must be present in every record you send (send a blank value when there's no data), and date-times need fractional seconds, for example, `2026-10-24T10:15:30.000Z`.

## What's next

- [Action Reference](actions.md): available operations
- [Example](example.md): build an integration with this connector
