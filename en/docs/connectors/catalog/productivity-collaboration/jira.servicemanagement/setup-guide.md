---
connector: true
connector_name: "jira.servicemanagement"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/jira.servicemanagement connector."
---

# Setup Guide

The Jira Servicemanagement connector authenticates to Jira Service Management Cloud with either an Atlassian API token (HTTP basic authentication) or an OAuth 2.0 access token. An API token is the quickest way to start.

## Prerequisites

- A Jira Service Management Cloud site and an Atlassian account on it

## Step 1: Get access to a Jira Service Management site

1. Get a Jira Service Management Cloud site, such as `https://your-domain.atlassian.net`, and an account on it. If you don't have one, [start a free trial](https://www.atlassian.com/software/jira/service-management/free).
2. Make sure the account has the permissions your operations need. Most read and create operations need an agent or customer account on the service desk, while managing request types, customers and organizations needs a service desk administrator or agent.

## Step 2: Create an API token

1. Sign in to your Atlassian account and open [API tokens](https://id.atlassian.com/manage-profile/security/api-tokens).
2. Select **Create API token**, give it a label, choose an expiry date, and select **Create**.
3. Copy the token and store it securely. You can't view it again after you close the dialog.
4. Use the email address of your Atlassian account as the username and the API token as the password.

## Step 3 (optional): Use OAuth 2.0 instead

To act on behalf of other users, create an OAuth 2.0 (3LO) app in the [Atlassian developer console](https://developer.atlassian.com/console/myapps/):

1. Select **Create**, then **OAuth 2.0 integration**, and name the app.
2. Under **Permissions**, add the **Jira Service Management API** and select the scopes your application needs, such as `read:servicedesk-request` and `write:servicedesk-request`.
3. Under **Authorization**, set a callback URL, then follow [Atlassian's OAuth 2.0 (3LO) guide](https://developer.atlassian.com/cloud/jira/service-desk/oauth-2-3lo-apps/) to obtain an access token and a refresh token. Add the `offline_access` scope to receive a refresh token.
4. Find your site's cloud ID from `https://your-domain.atlassian.net/_edge/tenant_info`.

:::note
OAuth 2.0 requests go through the Atlassian API gateway, so the service URL is `https://api.atlassian.com/ex/jira/<cloud-id>` rather than your site URL.
:::

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
