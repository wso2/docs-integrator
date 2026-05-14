---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Atlassian API token required to use the Jira connector.

## Prerequisites

- An Atlassian Cloud account with access to a Jira project. If you do not have one, [sign up for a free Jira account](https://www.atlassian.com/software/jira/free).

## Step 1: Log in to your Atlassian account

1. Go to [id.atlassian.com](https://id.atlassian.com) and log in.

   ![Atlassian login screen](/img/connectors/catalog/productivity-collaboration/jira/setup/login_screen.png)

2. After logging in, you are redirected to your Atlassian account dashboard.

   ![Atlassian account dashboard](/img/connectors/catalog/productivity-collaboration/jira/setup/redirect_login.png)

## Step 2: Create an API token

1. Navigate to your profile by selecting your avatar in the top-right corner, then select **Manage account**.
2. Select **Security** in the left sidebar.

   ![Path to account settings](/img/connectors/catalog/productivity-collaboration/jira/setup/path_account_settings.png)

3. Under **API token**, select **Create and manage API tokens**.

   ![Account settings security tab](/img/connectors/catalog/productivity-collaboration/jira/setup/account_settings.png)

4. Select **Create API token**.

   ![Create and manage API tokens](/img/connectors/catalog/productivity-collaboration/jira/setup/click_on_token.png)

5. Enter a **Label** for the token (for example, `Ballerina Jira Connector`) and select **Create**.

   ![Create API token dialog](/img/connectors/catalog/productivity-collaboration/jira/setup/create_token.png)

6. Copy the generated token — this is your `password` (API token) for authentication.

The API token is shown only once. Store it securely and do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 3: Identify your Jira Cloud instance URL

Your Jira Cloud instance URL follows the pattern:

```
https://<your-domain>.atlassian.net
```

You can find your domain by logging into Jira Cloud and checking the URL in your browser. The `serviceUrl` for the connector is:

```
https://<your-domain>.atlassian.net/rest
```

Replace `<your-domain>` with your actual Atlassian organization domain name.

## What's next

- [Action reference](actions.md): Available operations
