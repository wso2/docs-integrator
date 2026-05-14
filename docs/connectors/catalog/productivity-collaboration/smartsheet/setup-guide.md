---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining the API access token required to use the Smartsheet connector.

## Prerequisites

- An active Smartsheet account. If you do not have one, [sign up for a free trial](https://www.smartsheet.com/try-it).

## Step 1: Generate an API access token

1. Log in to your Smartsheet account at [app.smartsheet.com](https://app.smartsheet.com).
2. Select your **Account** icon in the lower-left corner.
3. Select **Personal Settings**.
4. Navigate to the **API Access** tab and select **Generate new access token**.

   ![Generate API access token](/img/connectors/catalog/productivity-collaboration/smartsheet/setup/generate-api-token.png)

5. Give the token a descriptive name (for example, `Ballerina Integration`) and select **OK**.
6. Copy the generated token immediately — it will not be shown again.

Store your API access token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

API access tokens inherit the permissions of the user who generates them. Ensure the user has appropriate access to the sheets and workspaces you intend to manage.

## What's next

- [Action reference](actions.md): Available operations
