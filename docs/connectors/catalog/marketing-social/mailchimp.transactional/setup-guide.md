---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Mailchimp Transactional (Mandrill) account and obtaining the API key required to use the connector.

## Prerequisites

- A Mailchimp account with a paid plan that includes Transactional Email. If you do not have one, [sign up at Mailchimp](https://login.mailchimp.com/signup/) and enable the Transactional Email add-on.

## Step 1: Enable transactional email in Mailchimp

1. Log in to your [Mailchimp account](https://login.mailchimp.com/).
2. Navigate to **Automations** > **Transactional Email** in the left sidebar.
3. If you have not enabled Transactional Email, click **Add Transactional Email** and complete the billing setup.
4. Once enabled, click **Launch Mandrill** to open the MandrillApp dashboard.

Transactional Email is a paid add-on. You need an active Mailchimp billing plan to access Mandrill features.

## Step 2: Generate a mandrill API key

1. In the [MandrillApp dashboard](https://mandrillapp.com/), click **Settings** in the left sidebar.
2. Click **+ New API Key**.
3. Optionally provide a description for the key (e.g., `Ballerina Integration`).
4. Click **Create API Key**.
5. Copy the generated API key; this is the `'key` value you will pass in every API request.

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 3: Verify a sending domain

1. In the MandrillApp dashboard, go to **Sending Domains**.
2. Enter the domain you want to send email from (e.g., `example.com`) and click **Add**.
3. Follow the instructions to add the DKIM and SPF DNS records for your domain.
4. Click **Test DNS Settings** to verify the records are correctly configured.

Emails sent from unverified domains may be rejected or marked as spam. Always verify your sending domain before sending production emails.

## Step 4: Test your API key

1. In the MandrillApp dashboard, go to **Settings** > **API Keys**.
2. Click **Test** next to your API key.
3. Confirm the test returns a successful `PONG!` response: this verifies your key is active and correctly configured.
