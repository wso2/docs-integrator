---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining a Mailchimp API key required to use the Mailchimp Marketing connector.

## Prerequisites

- An active Mailchimp account. If you do not have one, [sign up for a free account](https://login.mailchimp.com/signup/).

## Step 1: Generate an API key

1. Log in to your Mailchimp account at [https://login.mailchimp.com](https://login.mailchimp.com).
2. Click your profile icon in the bottom-left corner and select **Account & billing**.
3. Navigate to **Extras** > **API keys**.
4. Click **Create A Key**.
5. Give your key a descriptive label (e.g., `Ballerina Connector`).
6. Copy the generated API key immediately: it will not be shown again.

Store your API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

The API key includes a data center suffix (e.g., `-us21`). This suffix determines which Mailchimp server to use.

## Step 2: Determine your server prefix

The Mailchimp API requires requests to be sent to a data-center-specific URL. Your server prefix is the suffix of your API key.

For example, if your API key is `abc123def456-us21`, your server prefix is `us21` and your base URL is:

```
https://us21.api.mailchimp.com/3.0
```

You can also find your server prefix by logging in to Mailchimp and checking the URL in your browser: it starts with the data center code (e.g., `us21.admin.mailchimp.com`).
