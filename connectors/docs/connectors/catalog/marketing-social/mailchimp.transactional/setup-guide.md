---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Mailchimp account, enabling the transactional email feature, and generating a Mandrill API key required to use the Mailchimp Transactional connector.

## Prerequisites

- A Mailchimp account. If you do not have one, [sign up for free](https://login.mailchimp.com/signup/).

## Step 1: Log in to your Mailchimp account

1. Log in to your Mailchimp account at [login.mailchimp.com](https://login.mailchimp.com/).
2. Select your profile icon in the top-right corner to open the account menu.

   <ThemedImage
       alt="Mailchimp dashboard"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-dashboard.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-dashboard.png'),
       }}
   />

   <ThemedImage
       alt="Profile menu"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-menu.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-menu.png'),
       }}
   />

## Step 2: Enable transactional email

1. In the account menu, select **Billing**.

   <ThemedImage
       alt="Billing section"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-billing.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-billing.png'),
       }}
   />

2. Under **Monthly plans or credits**, select the **Transactional Email Plan** (you can start with the demo plan).

   <ThemedImage
       alt="Transactional email plan"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-transactional-setup.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-transactional-setup.png'),
       }}
   />

## Step 3: Generate a Mandrill API key

1. Navigate to the **Extras** section and select **API keys**.

   <ThemedImage
       alt="Extras section"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-api-key-menu.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-api-key-menu.png'),
       }}
   />

2. Select **Create A Mandrill API Key** (not the regular API key). You are redirected to the MandrillApp dashboard.

   <ThemedImage
       alt="Mandrill API key selection"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-create-api-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-create-api-key.png'),
       }}
   />

3. In the MandrillApp dashboard, select **+ Add API Key** to generate your key.

   <ThemedImage
       alt="MandrillApp dashboard"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-create-mandril-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/mailchimp-create-mandril-key.png'),
       }}
   />

4. Copy the generated API key.

   <ThemedImage
       alt="Copy API key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/validate-api-key-info.png'),
           dark: useBaseUrl('/img/connectors/catalog/marketing-social/mailchimp.transactional/setup/validate-api-key-info.png'),
       }}
   />

Store your Mandrill API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action reference](actions.md): Available operations
