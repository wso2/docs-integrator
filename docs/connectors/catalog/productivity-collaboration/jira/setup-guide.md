---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Atlassian API token and identifying your Jira Cloud instance URL required to use the Jira connector.

## Prerequisites

- An Atlassian Cloud account with access to a Jira project. If you do not have one, [sign up for a free Jira account](https://www.atlassian.com/software/jira/free).

## Step 1: Generate an API token

1. Log in to your Atlassian account at [id.atlassian.com](https://id.atlassian.com).
2. Navigate to **Security** in the left sidebar.
3. Under **API token**, click **Create and manage API tokens**.
4. Click **Create API token**.
5. Enter a **Label** for the token (e.g., `Ballerina Jira Connector`) and click **Create**.
6. Copy the generated token; this is your `password` (API token) for authentication.

The API token is shown only once. Store it securely and do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 2: Identify your Jira cloud instance URL

Your Jira Cloud instance URL follows the pattern:

```
https://<your-domain>.atlassian.net
```

You can find your domain by logging into Jira Cloud and checking the URL in your browser's address bar. The `serviceUrl` for the connector is:

```
https://<your-domain>.atlassian.net/rest
```

Replace `<your-domain>` with your actual Atlassian organization domain name.

## Step 3: Verify your credentials

To verify your credentials work, you can make a test request to the Jira REST API:

```
curl -u <your-email>:<your-api-token> https://<your-domain>.atlassian.net/rest/api/3/myself
```

A successful response returns your user profile in JSON format.

For OAuth 2.0 authentication, register an OAuth 2.0 app in the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/) and use the `OAuth2RefreshTokenGrantConfig` with refresh URL `https://auth.atlassian.com/oauth/token`.
