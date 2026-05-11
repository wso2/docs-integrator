---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Mistral AI account and obtaining the API key required to use the Mistral AI connector.

## Prerequisites

- A Mistral AI account. If you do not have one, [sign up at the Mistral AI console](https://console.mistral.ai/).

## Step 1: Sign in to the Mistral AI console

1. Go to [https://console.mistral.ai/](https://console.mistral.ai/).
2. Sign in with your Mistral AI account credentials.

## Step 2: Navigate to API keys

1. In the left sidebar, click **API Keys** (or navigate to **Settings > API Keys**).
2. You will see a list of your existing API keys (if any).

## Step 3: Generate a new API key

1. Click the **Create new key** button.
2. Give the key a descriptive name (e.g., `Ballerina Mistral Connector`).
3. Click **Create key**.
4. Copy the generated API key immediately: it will not be shown again.

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

Mistral AI offers both free and paid tiers. Some models may require a paid subscription. Check the [Mistral AI pricing page](https://mistral.ai/pricing/) for details.
