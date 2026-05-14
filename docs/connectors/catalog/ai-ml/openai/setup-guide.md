---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an OpenAI account and generating an API key required to use the OpenAI connector.

## Prerequisites

- An OpenAI account. If you do not have one, [sign up at platform.openai.com](https://platform.openai.com/signup).

## Step 1: Log in to the OpenAI Platform

1. Visit [platform.openai.com](https://platform.openai.com/).
2. Sign in with your credentials or create a new account.

## Step 2: Create a project

1. Select your profile icon in the top-right corner.
2. In the dropdown menu, select **Your Profile**.

   ![Your profile menu](/img/connectors/catalog/ai-ml/openai/setup/your_profile.png)

3. Navigate to the **Projects** section from the sidebar.

   ![Projects portal](/img/connectors/catalog/ai-ml/openai/setup/project_portal.png)

4. Select **Create Project** and provide a name.

   ![Create project](/img/connectors/catalog/ai-ml/openai/setup/create_project.png)

## Step 3: Create an API key

1. Navigate to the **API Keys** section from the sidebar and select **+ Create new secret key**.

   ![API keys portal](/img/connectors/catalog/ai-ml/openai/setup/api_key_portal.png)

2. Provide a name for the key (for example, `Connector Key`), select your project, and confirm.

   ![Create new API key](/img/connectors/catalog/ai-ml/openai/setup/create_api_key.png)

3. Copy the generated API key immediately — it will not be shown again.

   ![Copy generated key](/img/connectors/catalog/ai-ml/openai/setup/copy_key.png)

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action reference](actions.md): Available operations
