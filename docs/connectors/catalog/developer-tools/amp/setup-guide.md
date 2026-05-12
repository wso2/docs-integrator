---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a WSO2 OpenChoreo component and obtaining the credentials and identifiers required to send traces to the AMP platform.

## Prerequisites

- A WSO2 OpenChoreo account. Sign up at the OpenChoreo portal if you do not have one.

## Step 1: Create or select a project in openChoreo

1. Log in to the WSO2 OpenChoreo console.
2. In the left navigation, click **Projects**.
3. Click **Create Project**, fill in the project name and description, then click **Save**.
4. Open the project details page and note the **Project UID**; you will need this for `projectUid`.

## Step 2: Create a component

1. Within your project, click **Components** in the left navigation.
2. Click **Create Component** and configure the component name and type (e.g., Service, Job).
3. Click **Save** and open the component details page.
4. Copy the **Component UID**; you will need this for `componentUid`.

## Step 3: Obtain your organization UID and environment UID

1. Click your organization name in the top-right corner and select **Settings**.
2. Under **Organization Details**, copy the **Organization UID**; this is your `orgUid`.
3. Return to your project, click **Environments** in the left navigation, select the target
   environment, and copy its **Environment UID**; this is your `environmentUid`.

## Step 4: Generate an API key

1. In the OpenChoreo console, navigate to **Settings** > **API Keys**.
2. Click **Generate API Key**, assign a descriptive name (e.g., `amp-tracing-key`), and select
   the observability scope.
3. Click **Generate** and copy the API key value immediately; it is shown only once.

Store the API key securely and do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 5: Locate the OpenTelemetry endpoint

1. In the OpenChoreo console, navigate to **Settings** > **Observability** or **Endpoints**.
2. Copy the **OTLP HTTP base URL**; this is your `otelEndpoint`.
   For local or development AMP deployments the default is `http://localhost:22893/otel`.

The AMP OTLP endpoint expects trace spans at `/v1/traces`. The connector appends this path automatically: supply only the base URL (e.g., `https://amp.example.com/otel`).
