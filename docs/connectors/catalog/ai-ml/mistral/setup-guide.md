---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Mistral AI account and generating an API key required to use the Mistral connector.

## Prerequisites

- A Mistral AI account. If you do not have one, [sign up at mistral.ai](https://mistral.ai/).

## Step 1: Navigate to API keys

1. Log in to the [Mistral AI console](https://console.mistral.ai/).
2. Navigate to the **API Keys** panel in the left sidebar.
3. Select a plan based on your requirements.

   ![Choose a plan](/img/connectors/catalog/ai-ml/mistral/setup/choose-plan.png)

## Step 2: Create an API key

1. Select **Create new key**.

   ![Create key](/img/connectors/catalog/ai-ml/mistral/setup/create-key.png)

2. Enter a name for the key and fill in any required details, then select **Create new key**.

   ![Key details panel](/img/connectors/catalog/ai-ml/mistral/setup/details-panel.png)

3. Copy the generated API key immediately — it will not be shown again.

   ![Copy key](/img/connectors/catalog/ai-ml/mistral/setup/copy-key.png)

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action reference](actions.md): Available operations
