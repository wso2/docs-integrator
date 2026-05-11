---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Azure AI Search service and obtaining the service URL and admin API key required to use the connector.

## Prerequisites

- An active Azure subscription. If you do not have one, [create a free account](https://azure.microsoft.com/free/).

## Step 1: Create an Azure AI search service

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Click **Create a resource** and search for **Azure AI Search**.
3. Select **Azure AI Search** from the results, then click **Create**.
4. Fill in the required fields:
    - **Subscription**: Select your Azure subscription.
    - **Resource group**: Create a new resource group or select an existing one.
    - **Service name**: Enter a globally unique name (e.g., `my-search-service`). This name becomes part of your service URL.
    - **Region**: Select the region closest to your application.
    - **Pricing tier**: Choose **Free** for development, or **Basic** / **Standard** for production workloads.
5. Click **Review + create**, review your settings, then click **Create**.
6. Wait for the deployment to complete before proceeding.

The Free tier allows one service per subscription and has limited storage and scale. Use Basic or Standard for production workloads.

## Step 2: Retrieve the service URL

1. Navigate to your newly created Azure AI Search resource in the Azure portal.
2. In the left menu, select Overview.
3. Copy the **URL** field value: it looks like `https://my-search-service.search.windows.net`.
   This is the `serviceUrl` you will use when initializing the connector.

## Step 3: Retrieve the admin API key

1. In your Azure AI Search resource, go to **Settings** > **Keys** in the left menu.
2. Under **Manage admin keys**, copy the **Primary admin key** or **Secondary admin key**.
   Either key grants full read-write access to the service.
3. Optionally, under **Manage query keys**, create a read-only query key if you need a
   restricted key for search-only client-side access.

Store your API key securely and never commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply the key at runtime.

The admin key is required for all management operations such as creating indexes, running indexers, and managing data sources. Query keys are sufficient only for document search and suggest operations.
