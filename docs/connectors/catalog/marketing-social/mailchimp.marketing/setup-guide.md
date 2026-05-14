---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Mailchimp account and generating an API key required to use the Mailchimp Marketing connector.

## Prerequisites

- A Mailchimp account. If you do not have one, [sign up for free](https://login.mailchimp.com/signup/).

## Step 1: Log in to your Mailchimp account

1. Log in to your Mailchimp account at [login.mailchimp.com](https://login.mailchimp.com/).
2. Select your profile icon in the bottom-left corner to open the account menu.

   ![Mailchimp dashboard](/img/connectors/catalog/marketing-social/mailchimp.marketing/setup/mailchimp_dashboard.png)

   ![Profile menu](/img/connectors/catalog/marketing-social/mailchimp.marketing/setup/mailchimp_menu.png)

## Step 2: Generate an API key

1. In the account menu, go to the **Extras** section and select **API keys**.

   ![Extras section](/img/connectors/catalog/marketing-social/mailchimp.marketing/setup/mailchimp_menu_extra.png)

2. Select **Create A Key** (not the Mandrill API key). You are redirected to the API key dashboard.

   ![API key selection](/img/connectors/catalog/marketing-social/mailchimp.marketing/setup/api_key.png)

3. Enter a name for your API key and select **Generate Key**.

   ![Generate API key](/img/connectors/catalog/marketing-social/mailchimp.marketing/setup/api_key_dashboard.png)

4. Copy the generated API key immediately — it will not be shown again.

Store your API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action reference](actions.md): Available operations
