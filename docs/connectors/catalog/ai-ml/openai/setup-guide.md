---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an OpenAI account and obtaining the API key required to use the OpenAI connector.

## Prerequisites

- An OpenAI account. If you do not have one, [sign up at platform.openai.com](https://platform.openai.com/signup).

## Step 1: Navigate to the API keys page

1. Log in to the [OpenAI Platform](https://platform.openai.com/).
2. Click on your profile icon in the top-right corner.
3. Select **View API keys** or navigate directly to the [API keys page](https://platform.openai.com/api-keys).

## Step 2: Create a new API key

1. Click **+ Create new secret key**.
2. Optionally give the key a name (e.g., `Ballerina OpenAI Connector`).
3. Select the appropriate permissions, selecting **All** for full access, or restrict to specific endpoints.
4. Click **Create secret key**.
5. Copy the generated key immediately: it will not be shown again.

Store your API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 3: Set up billing

1. Navigate to **Settings** → **Billing** in the OpenAI Platform.
2. Add a payment method if you have not already.
3. Optionally set usage limits to control spending.

API usage is billed based on token consumption. Free trial credits may be available for new accounts, but most usage requires a paid plan.

## Step 4: Verify API access

Confirm your key works by listing available models. You can use `curl` or a tool like Postman:

```
GET https://api.openai.com/v1/models
Authorization: Bearer <YOUR_API_KEY>
```

A successful response returns a JSON list of available models.
