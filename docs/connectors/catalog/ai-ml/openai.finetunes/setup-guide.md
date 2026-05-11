---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an OpenAI account and obtaining the API key required to use the OpenAI Fine-Tunes connector.

## Prerequisites

- An OpenAI account. If you do not have one, [sign up at OpenAI](https://platform.openai.com/signup).
- A funded OpenAI account with access to the fine-tuning API (pay-as-you-go billing enabled).

## Step 1: Log in to the OpenAI platform

1. Go to [https://platform.openai.com](https://platform.openai.com).
2. Log in with your OpenAI credentials.

## Step 2: Generate an API key

1. In the left sidebar, click **API keys** (or navigate to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)).
2. Click **+ Create new secret key**.
3. Optionally give the key a name (e.g., `Ballerina Fine-Tunes Connector`).
4. Click **Create secret key**.
5. Copy the displayed key immediately: it will not be shown again.

Store your API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 3: Prepare training data

Fine-tuning requires training data in JSONL format. Each line must be a JSON object with a `messages` array following the chat format:

```json
{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello"}, {"role": "assistant", "content": "Hi there!"}]}
```

Optionally prepare a separate validation file in the same format to monitor overfitting during training.

OpenAI recommends at least 10 examples for fine-tuning, with 50-100 examples generally showing clear improvements. See the [OpenAI fine-tuning guide](https://platform.openai.com/docs/guides/fine-tuning) for best practices.
