---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a WSO2 OpenChoreo component and obtaining the credentials required to send traces to the AMP platform.

## Prerequisites

- A WSO2 OpenChoreo account. Sign up at the OpenChoreo portal if you do not have one.

## Step 1: Create or select a project in OpenChoreo

1. Log in to the WSO2 OpenChoreo console.
2. In the left navigation, select **Projects**.
3. Select **Create Project**, fill in the project name and description, then select **Save**.
4. Open the project details page and note the **Project UID** — you will need this for `projectUid`.

## Step 2: Create a component

1. Within your project, select **Components** in the left navigation.
2. Select **Create Component** and configure the component name and type (for example, Service or Job).
3. Select **Save** and open the component details page.
4. Copy the **Component UID** — you will need this for `componentUid`.

## Step 3: Obtain your organization UID and environment UID

1. Select your organization name in the top-right corner and select **Settings**.
2. Under **Organization Details**, copy the **Organization UID** — this is your `orgUid`.
3. Return to your project, select **Environments** in the left navigation, select the target environment, and copy its **Environment UID** — this is your `environmentUid`.

## Step 4: Generate an API key

1. In the OpenChoreo console, navigate to **Settings > API Keys**.
2. Select **Generate API Key**, assign a descriptive name (for example, `amp-tracing-key`), and select the observability scope.
3. Select **Generate** and copy the API key value immediately — it is shown only once.

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 5: Locate the OpenTelemetry endpoint

1. In the OpenChoreo console, navigate to **Settings > Observability** or **Endpoints**.
2. Copy the **OTLP HTTP base URL** — this is your `otelEndpoint`. For local or development AMP deployments the default is `http://localhost:22893/otel`.

The AMP OTLP endpoint expects trace spans at `/v1/traces`. The connector appends this path automatically — supply only the base URL (for example, `https://amp.example.com/otel`).

## What's next

- [Action reference](actions.md): Available operations
