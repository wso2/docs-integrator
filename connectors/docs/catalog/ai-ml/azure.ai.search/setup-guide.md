---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Azure AI Search service and obtaining the API key and endpoint URL required to use the Azure AI Search connector.

## Prerequisites

- An active Microsoft Azure account. If you do not have one, [sign up for a free Azure account](https://azure.microsoft.com/free/).

## Step 1: Create an Azure AI Search service

1. Sign in to the [Azure Portal](https://portal.azure.com).
2. Select **Create a resource** and search for **AI Search**.
3. Select **AI Search** and select **Create**.
4. Fill in the required details:
   - **Resource group**: Select an existing resource group or create a new one.
   - **Service name**: Enter a unique name (this becomes part of your endpoint URL).
   - **Location**: Select a region close to your application.
   - **Pricing tier**: Select a tier based on your needs (the **Free** tier is available for testing).
5. Select **Review + create**, then **Create** to provision the service.

The Free tier allows one search service per subscription with limited storage and throughput. For production workloads, consider the Basic or Standard tiers.

## Step 2: Get the service URL and admin key

1. Once the service is deployed, navigate to your Azure AI Search service in the Azure Portal.
2. In the **Overview** section, note the **URL** — for example, `https://your-service.search.windows.net`.
3. Navigate to **Settings > Keys** in the left menu.
4. Copy either the **Primary admin key** or **Secondary admin key**.

Admin keys grant full access to your search service, including creating, modifying, and deleting indexes and documents. Use a query key for client-facing applications that only need search access.

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action reference](actions.md): Available operations
