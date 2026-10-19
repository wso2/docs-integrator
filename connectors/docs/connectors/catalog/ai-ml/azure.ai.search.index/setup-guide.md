---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Azure AI Search service and obtaining the API key and endpoint URL required to use the connector.

## Prerequisites

- An active Microsoft Azure account. If you do not have one, [sign up for a free Azure account](https://azure.microsoft.com/free/).

## Step 1: Create an Azure AI search service

1. Sign in to the [Azure Portal](https://portal.azure.com).
2. Click **Create a resource** and search for **Azure AI Search**.
3. Select **Azure AI Search** and click **Create**.
4. Fill in the required fields:
    - **Subscription**: Select your Azure subscription.
    - **Resource group**: Select an existing resource group or create a new one.
    - **Service name**: Enter a unique name (this becomes part of your endpoint URL).
    - **Location**: Choose a region close to your users.
    - **Pricing tier**: Select a tier (the **Free** tier is available for testing).
5. Click **Review + create**, then **Create**.
6. Wait for the deployment to complete, then click **Go to resource**.

The Free tier allows one search service per subscription with limited storage and throughput. For production workloads, consider the Basic or Standard tiers.

## Step 2: Create a search index

1. In your Azure AI Search service, navigate to **Indexes** in the left menu.
2. Click **Add index** to create a new index.
3. Define your index schema by adding fields with their names, types, and attributes (searchable, filterable, sortable, facetable, retrievable).
4. Optionally configure **Suggesters** if you plan to use the autocomplete or suggest features.
5. Optionally configure **Scoring profiles** for custom relevance tuning.
6. Click **Create** to finalize the index.

Note the index name: you will need it when constructing the service URL for the connector (e.g., `https://<service-name>.search.windows.net/indexes/<index-name>`).

## Step 3: Get the API key and service URL

1. In your Azure AI Search service, navigate to **Settings > Keys** in the left menu.
2. Copy one of the **Admin keys** (for full read-write access) or a **Query key** (for read-only search access).
3. Note your **service URL**, which follows the pattern:

    ```
    https://<your-service-name>.search.windows.net
    ```

4. The full endpoint for index operations combines the service URL and index name:

    ```
    https://<your-service-name>.search.windows.net/indexes/<your-index-name>
    ```

Admin keys grant full access to your search service, including the ability to create, modify, and delete indexes and documents. Use query keys for client-facing applications that only need search access.

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.
