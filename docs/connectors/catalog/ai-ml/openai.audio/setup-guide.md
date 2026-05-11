---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an OpenAI account and obtaining the API key required to use the OpenAI Audio connector.

## Prerequisites

- An OpenAI account. If you do not have one, [sign up at OpenAI](https://platform.openai.com/signup).
- A funded OpenAI account with API access enabled (the Audio API is a paid service).

## Step 1: Log in to the OpenAI platform

1. Go to [https://platform.openai.com](https://platform.openai.com).
2. Log in with your OpenAI credentials.

## Step 2: Create an API key

1. In the left sidebar, click **API keys** (or navigate to **Settings > API keys**).
2. Click **Create new secret key**.
3. Optionally give the key a name (e.g., `Ballerina Audio Connector`).
4. Click **Create secret key**.
5. Copy the generated key immediately: it will not be shown again.

Store your API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 3: Verify API access and billing

1. Navigate to **Settings > Billing** in the OpenAI platform.
2. Ensure you have an active payment method and sufficient credits.
3. The Audio API (Whisper and TTS models) requires a paid account: free-tier accounts may not have access.

OpenAI charges per character for TTS and per minute of audio for transcription and translation. Check the [OpenAI pricing page](https://openai.com/pricing) for current rates.
