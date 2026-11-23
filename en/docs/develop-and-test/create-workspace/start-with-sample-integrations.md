---
sidebar_position: 4
title: Start with Sample Integrations
description: Deploy a ready-made sample integration to your project on Choreo Cloud to learn common integration patterns.
slug: /develop-and-test/create-workspace/start-with-sample-integrations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Start with Sample Integrations

Choreo Cloud includes a curated collection of sample integrations that you can add to a project with a single click. Use them to learn common integration patterns, or as a starting point for your own integration.

:::note Sample integrations vs. prebuilt integrations
Samples teach you the platform's abstractions. [Prebuilt integrations](../../get-started/prebuilt-integrations.md) are different: each one is a real, already-wired integration between two applications for an actual business use case.
:::

## Open the samples

1. Sign in to [Choreo Cloud](https://cloud-console-development.gateway.dev.cloud.wso2.com) and open the project where you want to add the sample.

    If the project has no integrations yet, you land on the **Create Integration** page by default. Continue to the next step.

    :::info Project already has integrations
    A project that already has integrations opens on its overview page instead, which lists them. Click **New integration** to open the **Create Integration** page.

    <ThemedImage
        alt="Project overview page with the New integration button highlighted"
        sources={{
            light: useBaseUrl('/img/explore-samples/sample-integration-saas-project-overview.png'),
            dark: useBaseUrl('/img/explore-samples/sample-integration-saas-project-overview.png'),
        }}
    />
    :::

2. On the **Create Integration** page, find the **Start quickly** panel on the right and select the **Samples** tab. It lists a few samples, each with a **Deploy** button and a link to the source.

    <ThemedImage
        alt="Create Integration page with the Samples tab selected in the Start quickly panel and Explore more samples highlighted"
        sources={{
            light: useBaseUrl('/img/explore-samples/sample-integration-saas-switch.png'),
            dark: useBaseUrl('/img/explore-samples/sample-integration-saas-switch.png'),
        }}
    />

3. To see the full collection, click **Explore more samples**.

## Browse samples

The **Browse samples** page lists every available sample. Each card shows the sample name and technology (for example, **Choreo Integrator** or **Choreo Integrator: MI**), its type as a badge, a short description, tags, and the **Quick deploy** and source actions. Use the **Type**, **Technology** and **Tags** filters, or the search box, to narrow the list.

<ThemedImage
    alt="Browse samples page listing available samples with filters"
    sources={{
        light: useBaseUrl('/img/explore-samples/sample-integration-saas-list.png'),
        dark: useBaseUrl('/img/explore-samples/sample-integration-saas-list.png'),
    }}
/>

Use the panel on the left to narrow the list:

- **Search samples** — Search by name or description.
- **Type** — **Integration as API**, **Automation**, **AI Agent**, **File Integration**, or **Event Integration**.
- **Technology** — The technology a sample is built with: **Choreo Integrator** or **Choreo Integrator: MI**.
- **Tags** — Filter by one or more tags, such as **AI**, **AWS**, or **Automation**.

Filters combine, and the results are paged. Use the source icon on a card to read the sample's code in its GitHub repository before you deploy it.

## Deploy a sample

Click **Quick deploy** on the sample you want (or **Deploy** from the **Start quickly** panel).

<ThemedImage
    alt="Quick deploy button on the Hello World Service sample card in the Browse samples page"
    sources={{
        light: useBaseUrl('/img/explore-samples/sample-integration-saas-quick-deploy.png'),
        dark: useBaseUrl('/img/explore-samples/sample-integration-saas-quick-deploy.png'),
    }}
/>

Choreo Cloud starts creating the integration in your project and shows its progress.

<ThemedImage
    alt="Progress page shown while the sample integration is being created"
    sources={{
        light: useBaseUrl('/img/explore-samples/sample-integration-saas-first-deploy.png'),
        dark: useBaseUrl('/img/explore-samples/sample-integration-saas-first-deploy.png'),
    }}
/>

When creation completes, Choreo Cloud opens the integration's overview page. It shows the integration type, description, source repository, and latest commit, and builds and deploys the sample to the **Development** environment immediately.

Once the deployment is **Active**, the overview page shows the endpoint URL, the exposed resources, and the security scheme the sample uses. Select **Test** to try the sample out, **View logs** to see what it did, or **Stop** to shut it down. For a sample secured with an API key, select **Generate API key** before you call the endpoint.

<ThemedImage
    alt="Overview page of the Hello World Service sample with an active deployment, its endpoint URL, and the API keys panel"
    sources={{
        light: useBaseUrl('/img/explore-samples/sample-integration-saas-created.png'),
        dark: useBaseUrl('/img/explore-samples/sample-integration-saas-created.png'),
    }}
/>

## Explore the sample's code

Every sample is deployed straight from a public GitHub repository. Follow the **Source** link on the overview page to read its code and see how the sample is built.

:::note Editing a sample in the cloud editor isn't available yet
A deployed sample can't be opened in the cloud editor to view or change it. Support for this is planned for a future release.

To build on a sample in the meantime, clone its source repository into a repository of your own, then [import it](import-an-integration.md) as your own integration. From that point on, you can edit it in the cloud editor like any other integration.
:::

## What's next

- [Create a project](create-a-project.md) — Create a project to hold your integrations
- [Import an integration](import-an-integration.md) — Bring an existing integration from a Git repository
- [Pre-built integrations](../../get-started/prebuilt-integrations.md) — Deploy a ready-made integration between two applications
- [Manage integrations](../../manage/integrations/integrations.md) — View deployment status and manage the lifecycle of a deployed integration
