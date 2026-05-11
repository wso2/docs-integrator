---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Elastic Cloud account and generating the API key required to authenticate the Elastic Cloud connector.

## Prerequisites

- An Elastic Cloud account. If you do not have one, [sign up for a free trial](https://cloud.elastic.co/registration).

## Step 1: Sign up and log in to Elastic cloud

1. Visit the [Elastic Cloud registration page](https://cloud.elastic.co/registration).
2. Fill in your account details including email, password, and organization information.
3. Verify your email address by clicking the verification link sent to your email.
4. Complete your profile setup, accept the terms of service, and choose your subscription plan.
5. Log in at [cloud.elastic.co/login](https://cloud.elastic.co/login) using your credentials (or Google/Microsoft SSO).

## Step 2: Create an Elastic cloud deployment

1. From the Elastic Cloud console dashboard, click **Create deployment**.
2. Choose your cloud provider (AWS, Google Cloud, or Azure) and region.
3. Configure the deployment size, features, and Elastic Stack version.
4. Click **Create deployment** and wait for it to become ready.

You can also create deployments programmatically using the connector after obtaining your API key.

## Step 3: Navigate to organization settings

1. From the dashboard, click **Organization** in the top navigation.
2. Go to the organization management page to view your Organization ID and settings.
3. Click the **API keys** tab in the organization settings.

## Step 4: Create an API key

1. In the **API keys** tab, click **Create API key**.
2. Provide a name for the key (e.g., `Ballerina Connector`).
3. Set an expiration period (3 months, 6 months, or 1 year).
4. Assign the appropriate roles for your use case.
5. Click **Create API key** to generate the credentials.
6. Copy the generated API key immediately: it will not be shown again.

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.
