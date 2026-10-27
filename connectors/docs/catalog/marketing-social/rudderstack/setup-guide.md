---
title: Setup Guide
---

# Setup Guide

This guide walks you through getting the credentials and URLs the RudderStack connector needs from the RudderStack dashboard.

The connector calls three RudderStack APIs that use different credentials:

| API | Operations | Credential | Host |
|-----|------------|------------|------|
| Event Stream | `identify`, `track`, `page`, `screen`, `group`, `alias`, `batch` | Source write key | Your data plane URL |
| Activation | `getProfile`, `getProfiles`, `deleteProfile`, `deleteProfiles` | Service Access Token | `profiles.rudderstack.com` (US) or `profiles-eu.rudderstack.com` (EU) |
| Profiles | `startProfilesRun`, `getProfilesRunStatus` | Service Access Token | `api.rudderstack.com` (US) or `api.eu.rudderstack.com` (EU) |

You only need the credentials of the APIs you call. For example, an integration that only sends events needs only the write key and the data plane URL.

## Prerequisites

- A RudderStack account

## Step 1: Create an HTTP source

The write key identifies the source that the Event Stream operations send events to.

1. Sign in to the [RudderStack dashboard](https://app.rudderstack.com).
2. In the left sidebar, select **Directory**. On the **Sources** tab, select **HTTP**.

<ThemedImage
    alt="Sources directory in the RudderStack dashboard with the HTTP source highlighted"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_01_add_http_source.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_01_add_http_source.png'),
    }}
/>

3. Enter a name for the source and complete the setup.

## Step 2: Copy the write key and the data plane URL

1. Open the source. Select **Write key** in the source header to copy the write key.

<ThemedImage
    alt="HTTP source page with the Write key copy button highlighted"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_02_copy_write_key.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_02_copy_write_key.png'),
    }}
/>

2. Copy the **Data plane URL** shown at the top of the **Connections** page, for example, `https://<your-workspace>.dataplane.rudderstack.com`.

## Step 3: Generate an access token

The Activation and Profiles APIs authenticate with a Bearer token. For development and testing, use a Personal Access Token. For production, use a workspace-level Service Access Token.

### For development and testing: Personal Access Token

1. In the left sidebar, select **Settings** > **Your Profile**. Under **Personal access tokens**, select **Generate new token**.

<ThemedImage
    alt="Personal access tokens section of the profile page with the Generate new token button highlighted"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_03_personal_access_tokens.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_03_personal_access_tokens.png'),
    }}
/>

2. Enter a **Token name**, select the **Workspace** and the **Scope**, and select **Generate**.

<ThemedImage
    alt="New Personal Access Token dialog with the token name, workspace and scope"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_04_new_personal_access_token.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_04_new_personal_access_token.png'),
    }}
/>

3. Copy the token. It is shown only once.

<ThemedImage
    alt="Generated personal access token ready to copy"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_05_copy_personal_access_token.png'),
        dark: useBaseUrl('/img/connectors/catalog/marketing-social/rudderstack/setup_05_copy_personal_access_token.png'),
    }}
/>

### For production: Service Access Token

Only workspace admins can generate Service Access Tokens. See RudderStack's guide on [Service Access Tokens](https://www.rudderstack.com/docs/access-management/service-access-tokens/) for details.

1. In the left sidebar, select **Settings** > **Access Management** > **Service Access Tokens**, and select the **Workspace** tab.
2. Select **Generate new token**, enter a name, select the workspace, and select **Next**.
3. Under **Workspace SAT access policy**, grant the permissions for the APIs you use:
    - **Activation API**: **Destination Data Access** on the Redis destination that the Profiles project syncs to.
    - **Profiles API**: **Edit** on the Profiles resource.
4. Select **Generate** and copy the token. It is shown only once, and its access policy can't be changed later.

## Step 4: Note your workspace region

The Activation and Profiles APIs have separate US and EU hosts. If your workspace is in the EU region, set `region` to `rudderstack:EU` in the connection config. The default is `rudderstack:US`.

You now have everything the connector needs:

- **writeKey**: the source write key, for the Event Stream operations
- **serviceUrl**: the data plane URL, for the Event Stream operations
- **serviceAccessToken**: the Service Access Token (or Personal Access Token), for the Activation and Profiles operations
- **region**: `rudderstack:US` or `rudderstack:EU`

Store the write key and the access token securely. Bind them to `configurable` variables and supply the values in `Config.toml` at runtime instead of hardcoding them.

## What's next

- [Action Reference](actions.md): available operations
- [Example](example.md): build an integration with this connector
