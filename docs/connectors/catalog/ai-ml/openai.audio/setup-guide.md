---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an OpenAI account and generating an API key required to use the OpenAI Audio connector.

## Prerequisites

- An OpenAI account. If you do not have one, [sign up at platform.openai.com](https://platform.openai.com/signup).
- Billing enabled on your OpenAI account with an active prepaid credit balance. Audio API calls fail with a 402 error without credits on file. Add a payment method and top up credits in the [Billing settings](https://platform.openai.com/account/billing).

## Step 1: Navigate to the API keys dashboard

1. Open the [OpenAI Platform Dashboard](https://platform.openai.com).
2. Navigate to **Dashboard > API keys** in the left sidebar.

   ![Navigate to API keys dashboard](/img/connectors/catalog/ai-ml/openai.audio/setup/navigate-api-key-dashboard.png)

## Step 2: Create a new secret key

1. Select **Create new secret key**.

   ![API keys dashboard](/img/connectors/catalog/ai-ml/openai.audio/setup/api-key-dashboard.png)

2. Fill in the required details and select **Create secret key**.

   ![Create new secret key dialog](/img/connectors/catalog/ai-ml/openai.audio/setup/create-new-secret-key.png)

3. Copy the generated API key immediately — it will not be shown again.

   ![Copy and save the API key](/img/connectors/catalog/ai-ml/openai.audio/setup/saved-key.png)

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action reference](actions.md): Available operations
