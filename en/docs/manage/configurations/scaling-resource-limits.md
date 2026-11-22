---
sidebar_position: 6
title: "Scaling"
description: "Configure autoscaling for integrations deployed on WSO2 Cloud - Integration Platform."
keywords: [wso2 integrator, wso2 cloud, scaling, replicas, autoscale, hpa]
slug: /manage/configurations/scaling-resource-limits
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Scale Integrations

WSO2 Cloud - Integration Platform scales integrations with horizontal autoscaling based on resource consumption. Autoscaling can be configured independently per environment.

:::info
Autoscaling is only available in paid plans. In the free tier, integrations run in single-replica, low-availability mode. You will see a view similar to below if you are on the free tier.

<ThemedImage
    alt="Scaling view in free tier"
    sources={{
        light: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/free-user-scaling-view.png'),
        dark: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/free-user-scaling-view.png'),
    }}
/>

:::

## Autoscale replicas

Horizontal autoscaling adjusts the number of running replicas based on CPU and memory usage. The platform monitors resource consumption across all active replicas and scales up or down to keep usage within the thresholds you define.

<!-- TODO: Add screenshot of the autoscaling configuration view -->

Configure the following parameters to control autoscaling:

| Parameter | Description |
|---|---|
| **Min replicas** | The minimum number of replicas to keep running at all times. A value of `2` or higher is recommended for high availability. |
| **Max replicas** | The maximum number of replicas to scale up to. In the cloud data plane, this is capped at `5`. |
| **CPU threshold** | The average CPU utilization across all running replicas. When this threshold is reached, the platform scales up until utilization falls below it. |
| **Memory threshold** | The average memory usage across all running replicas. The platform scales up when this threshold is reached, until usage falls below it. |

<ThemedImage
    alt="Scaling view in paid tier"
    sources={{
        light: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/paid-user-scaling-view.png'),
        dark: useBaseUrl('/img/manage/cloud/configurations/scaling-resource-limits/paid-user-scaling-view.png'),
    }}
/>

:::tip
Scaling parameter changes can take some time to propagate. The console may not reflect updates immediately after saving.
:::

:::info Run a fixed number of replicas
To run exactly `3` replicas at all times, set both **Min replicas** and **Max replicas** to `3`.
:::

:::warning
Setting both **Min replicas** and **Max replicas** to `0` suspends the deployment. Although setting only the minimum to `0` is allowed, the platform will not automatically scale below `1` replica during low usage.
:::

## What's next

- [Environments](../environments/environments.md) — Organize your integration lifecycle with multiple environments.
