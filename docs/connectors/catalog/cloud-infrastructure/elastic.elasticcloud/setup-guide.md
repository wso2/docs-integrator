---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Elastic Cloud account and generating the API key required to authenticate the Elastic Cloud connector.

## Prerequisites

- An Elastic Cloud account. If you do not have one, [sign up for a free trial](https://cloud.elastic.co/registration).

## Step 1: Sign up and log in to Elastic Cloud

1. Visit the [Elastic Cloud registration page](https://cloud.elastic.co/registration).
2. Fill in your account details including email, password, and organization information.
3. Verify your email address by selecting the verification link sent to your email.
4. Complete your profile setup, accept the terms of service, and choose your subscription plan.
5. Log in at [cloud.elastic.co/login](https://cloud.elastic.co/login) using your credentials (or Google/Microsoft SSO).

   ![Elastic Cloud login page](/img/connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup/elastic-cloud-console-login.png)

## Step 2: Access the Elastic Cloud console

1. After successful login, you are redirected to the main dashboard.
2. The dashboard shows your hosted deployments, serverless projects, deployment status, version, and available actions.

   ![Elastic Cloud dashboard](/img/connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup/elastic-cloud-console-dashboard.png)

## Step 3: Create an Elastic Cloud deployment

1. From the dashboard, select **Create deployment**.

   ![Elastic Cloud deployments view](/img/connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup/elastic-cloud-console-deployment.png)

2. Choose your cloud provider (AWS, Google Cloud, or Azure) and region.
3. Configure the deployment size, features, and Elastic Stack version.
4. Select **Create deployment** and wait for it to become ready.

   ![Create deployment form](/img/connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup/elastic-cloud-create-deployment.png)

You can also create deployments programmatically using the connector after obtaining your API key.

## Step 4: Navigate to organization settings

1. From the dashboard, select **Organization** in the top navigation.
2. Go to the organization management page to view your **Organization ID** and settings.
3. Select the **API keys** tab.

   ![Organization settings](/img/connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup/elastic-cloud-console-organization.png)

## Step 5: Create an API key

1. In the **API keys** tab, select **Create API key**.

   ![API keys management](/img/connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup/elastic-cloud-console-api-create.png)

2. Provide a name for the key (for example, `Ballerina Connector`).
3. Set an expiration period (3 months, 6 months, or 1 year).
4. Assign the appropriate roles for your use case.
5. Select **Create API key** to generate the credentials.

   ![Generate API key dialog](/img/connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup/elastic-cloud-generate-api-key.png)

6. Copy the generated API key immediately — it will not be shown again.

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action reference](actions.md): Available operations
