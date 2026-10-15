---
title: Pre-Built Integrations
---

# Try Pre-Built Integrations

**Time:** Under 10 minutes | **What you'll do:** Download a ready-made integration between two applications, add your credentials, and run it. You don't build anything from scratch.

Building an integration from scratch means learning the platform's abstractions, wiring up connectors, and testing the logic before anything useful happens, even for a straightforward use case. Pre-built integrations skip all that: each one is a ready-made integration for a real, common use case. Pick the one you need, download it, configure it, and run it.

:::note Sample integrations vs. pre-built integrations
[Sample integrations](../develop-and-test/create-workspace/explore-sample-integrations.md) teach you the platform's abstractions. Pre-built integrations are different: each one is a real, already-wired integration for an actual business use case.

:::info Prerequisites
WSO2 Integrator installed on your machine. If you haven't installed it yet, see [Setup](setup/setup.md).

## Step 1: Open the catalog

On the WSO2 Integrator home screen, click **Explore** on the **Pre-built Integrations and Samples** card.

<ThemedImage
    alt="WSO2 Integrator home screen with the Explore button highlighted"
    sources={{
        light: useBaseUrl('/img/explore-samples/home-screen.png'),
        dark: useBaseUrl('/img/explore-samples/home-screen.png'),
    }}
/>

## Step 2: Filter for pre-built integrations

The **Browse Samples** view lists samples and pre-built integrations together. Under **Type**, select **Pre-built Integrations** to show only the pre-built ones.

Each card shows the integration name, a type tag (for example, **webhook**, **service**, **scheduled-task**, or **event-handler**), the two applications it connects, and a short description. To narrow the list, search by name, description, application, or category, or pick a **Category**.

<ThemedImage
    alt="Browse Samples view filtered to Pre-built Integrations"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-v5.1.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-v5.1.png'),
    }}
/>

## Step 3: Download an integration

Hover over the integration you want and click **Use this**. For this guide, choose **Create a Salesforce Contact When a New Shopify Customer Signs Up**.

<ThemedImage
    alt="Use this button shown when hovering over a pre-built integration card"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-hover-v5.1.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-hover-v5.1.png'),
    }}
/>

A native file browser appears so you can choose the directory where the integration is created. Select a folder and click **Select Folder**. WSO2 Integrator starts downloading the integration and shows the progress in a notification.

<ThemedImage
    alt="Download progress notification while the pre-built integration is being downloaded"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-download-v5.1.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-download-v5.1.png'),
    }}
/>

When the download finishes, WSO2 Integrator opens the integration and pulls its dependencies. Wait for the **Pulling Dependencies** screen to complete. It shows each module as it is pulled.

<ThemedImage
    alt="Pulling Dependencies screen shown while the integration's modules are pulled"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-pulling-dependencies-v5.1.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-pulling-dependencies-v5.1.png'),
    }}
/>

## Step 4: Review the integration

When the dependencies are pulled, the integration opens in the **Design** view. The canvas shows the whole flow: the listener, the handlers for each event, and the connection to the second application. The side panel lists the integration's artifacts, such as entry points, connections, types, and functions.

<ThemedImage
    alt="Pre-built integration open in the Design view with its artifacts listed in the side panel"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-overview-v5.1.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/prebuilt-integrations-overview-v5.1.png'),
    }}
/>

Open the **Readme** tab next to **Design** to see what the integration does and what you need to gather before you run it, such as credentials for both applications.

## Step 5: Configure, run, and deploy

1. Click **Configure** to enter the values the integration needs, such as the credentials for the two applications.
2. Click **Run** to start the integration locally, or **Debug** to step through it.
3. When you're ready, use the **Deployment Options** panel on the right to deploy it to WSO2 Cloud, with Docker, or on a VM.

From here, the integration is yours: click **Add Artifact** to extend it, or edit any of its artifacts, the same as an integration you built from scratch.

:::tip The value of pre-built integrations
Common integration problems are already solved, so you don't have to rebuild them. Pick a use case, run it in minutes, and spend your time on the work that actually needs it.

## What's next

- [Explore sample integrations](../develop-and-test/create-workspace/explore-sample-integrations.md) — Start from a teaching sample if you'd rather build the integration yourself
- [Deploy to WSO2 Cloud](../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md) — Deploy your integration to a managed cloud environment
- [Concepts](concepts/concepts.mdx) — Learn the vocabulary used across the docs
