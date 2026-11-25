---
sidebar_position: 5
title: "Endpoints"
description: "Configure endpoint visibility levels per environment for integrations deployed to the Choreo Integration."
keywords: [choreo integrator, endpoints, networking, endpoint visibility, choreo cloud, integration as api]
slug: /manage/configurations/endpoint-configurations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Endpoints and Networking Configuration

When you deploy an Integration as API to the Choreo Integration, each endpoint can be exposed at one or more visibility levels.

## Endpoint visibility levels

Each endpoint supports three visibility levels.

| Visibility level | Who can access the endpoint |
|---|---|
| **Project** | Any integration within the same project. Always on — it can't be turned off. |
| **Organization** | Any integration within the same organization. Optional. |
| **Public** | Any client, regardless of location or organization. Optional. |

By default, **Project** and **Public** are enabled, and the platform generates a public URL for the endpoint.

## Configure endpoint visibility

Endpoint visibility is configured through the Configure panel for each environment.

1. Open your integration from the project home.
2. On the integration overview page, locate the environment you want to configure.
3. Click **Configure** on that environment card.
4. Click **Next** through the **Configurations** and **Certificate mount** steps to reach **Endpoints**.

    This step lists each endpoint with its port, type, current visibility, and the URL for each visibility level it has enabled.

    <ThemedImage
        alt="Endpoints step listing an endpoint's port, type, visibility, and URLs"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/endpoint-list.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/endpoint-list.png'),
        }}
    />

5. Click the edit icon next to the endpoint you want to configure.

    The **Network visibility** checkboxes appear. **Project** is always checked and can't be unchecked; toggle **Public** and **Organization** independently.

    <ThemedImage
        alt="Network visibility checkboxes for an endpoint, with Project always checked and Public and Organization independently toggleable"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/endpoint-visibility-edit.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/endpoint-visibility-edit.png'),
        }}
    />

6. Select the visibility levels you want to enable, then click **Update**.
7. Click **Next** through any remaining steps, then click **Apply**.

The integration restarts. Once it is active, the environment card shows the endpoint's public URL.

<ThemedImage
    alt="Environment card showing the endpoint's public URL"
    sources={{
        light: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/overview-card.png'),
        dark: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/overview-card.png'),
    }}
/>

:::info
Enabling the **Organization** visibility level generates an additional internal URL alongside the public URL. This URL is only accessible from within the organization. The Project-level URL is shown on the **Endpoints** step of the Configure panel, not on the environment card.
:::

## What's next

- [Build configurations](./build-configurations.md) — Control how your integrations are built on the Choreo Integration.
- [Scaling and resource limits](./scaling-resource-limits.md) — Configure CPU and memory limits for your integration.
