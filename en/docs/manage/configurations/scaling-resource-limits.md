---
sidebar_position: 6
title: "Scaling"
description: "Configure autoscaling for integrations deployed on Choreo Integration."
keywords: [choreo integrator, choreo cloud, scaling, replicas, autoscale, hpa]
slug: /manage/configurations/scaling-resource-limits
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Scale Integrations

Choreo Integration scales integrations with horizontal autoscaling (HPA) based on CPU and, optionally, memory usage. Scaling is configured independently per environment, from the integration's **Operate** > **Scaling** page.

By default, an integration runs a fixed number of replicas (no autoscaling) in each environment. Turning on HPA opens the **Scaling configuration** section.

<ThemedImage
    alt="Scaling page with HPA selected, showing Min/Max replicas, CPU and Memory thresholds, and the Replicas and usage tables"
    sources={{
        light: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/scaling-configuration.png'),
        dark: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/scaling-configuration.png'),
    }}
/>

:::info
The console also shows a **Scale to zero** option alongside HPA. It isn't available yet.
:::

## Autoscale replicas

1. On the **Scaling** page, click the **HPA** card and confirm turning on autoscaling.
2. Configure the following parameters:

    | Parameter | Description |
    |---|---|
    | **Min replicas** | The minimum number of replicas to keep running at all times. Can't go below `1`. |
    | **Max replicas** | The maximum number of replicas to scale up to. Capped at `5`. |
    | **CPU threshold** | Optional, independently toggleable. The average CPU utilization across all running replicas. When this threshold is reached, the platform scales up until utilization falls below it. |
    | **Memory threshold** | Optional, independently toggleable. The average memory usage across all running replicas. The platform scales up when this threshold is reached, until usage falls below it. |

3. Click **Update** to save your changes.

The **Replicas** table below shows each running pod's status, restarts, and last activity, and the **CPU usage** / **Memory usage** cards show current utilization against the integration's allocated resources.

:::tip
Scaling parameter changes can take a few minutes to propagate, as the replicas are replaced.
:::

:::info Run a fixed number of replicas with HPA
To run exactly `3` replicas at all times, turn on HPA and set both **Min replicas** and **Max replicas** to `3`.
:::

## Set container resource limits

Each environment's **Operate** > **Containers** page shows the resource allocation for the integration's container.

<ThemedImage
    alt="Containers page showing the main container's image, CPU request/limit, and Memory request/limit"
    sources={{
        light: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/containers.png'),
        dark: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/containers.png'),
    }}
/>

To change it:

1. Click **Edit**.
2. Drag the **CPU request / limit** and **Memory request / limit** sliders to set each value. The request is the amount reserved for the container; the limit is the maximum it can use before being throttled (CPU) or restarted (memory).
3. Choose an **Image pull policy**: **Always** re-pulls the image on every pod restart, and **If not present** only pulls it if it isn't already cached on the node.

    <ThemedImage
        alt="Edit container form with CPU and Memory request/limit sliders and the Image pull policy options"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/containers-edit.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/containers-edit.png'),
        }}
    />

4. Click **Save changes**.

## What's next

- [Environments](../environments/environments.md) — Organize your integration lifecycle with multiple environments.
