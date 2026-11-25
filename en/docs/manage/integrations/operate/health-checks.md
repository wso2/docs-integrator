---
sidebar_position: 4
title: "Health Checks"
description: "Configure liveness and readiness probes for integrations deployed on Choreo Integration."
keywords: [choreo integrator, choreo cloud, health checks, liveness probe, readiness probe]
slug: /manage/integrations/operate/health-checks
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Health Checks

Health checks let unhealthy replicas self-heal and increase availability by periodically probing a container. They're configured per environment, from **Operate** > **Health checks**.

By default, no health checks are configured.

## Create a health check

1. On the **Health checks** page, click **Create**.
2. Configure the **liveness probe**:

    | Parameter | Description |
    |---|---|
    | **Failure threshold** | Number of retries before the probe is considered to have failed. The container is automatically restarted once this threshold is reached. |
    | **Delay before initial probe** | Number of seconds to wait before initiating the first probe after the container starts. |
    | **Probe frequency** | How often the probe runs against the container. |
    | **Timeout** | Number of seconds after which the probe times out. A timeout also counts as a failure. |

3. Select a **Liveness Probe Type**: **HTTP GET request** (the port and path to call; only response codes 200–399 count as success), **TCP probe**, or **Execute a command**.

    <ThemedImage
        alt="Configure liveness probe step with probe parameters and the HTTP GET request port and path fields"
        sources={{
            light: useBaseUrl('/img/manage/cloud/operate/health-checks/create-liveness-probe.png'),
            dark: useBaseUrl('/img/manage/cloud/operate/health-checks/create-liveness-probe.png'),
        }}
    />

4. Click **Next**.
5. Optional: configure the **readiness probe** the same way. It has the same parameters plus **Success threshold after first failure** (the minimum consecutive successes needed for the probe to be considered successful again after it failed once).

    <ThemedImage
        alt="Configure readiness probe step, marked Optional, with a Skip option alongside Save"
        sources={{
            light: useBaseUrl('/img/manage/cloud/operate/health-checks/create-readiness-probe.png'),
            dark: useBaseUrl('/img/manage/cloud/operate/health-checks/create-readiness-probe.png'),
        }}
    />

6. Click **Save**, or **Skip** to finish without a readiness probe.

The configured probe appears on the **Health checks** page, where you can edit or delete it.

<ThemedImage
    alt="Health checks page showing a created liveness probe with its configured parameters"
    sources={{
        light: useBaseUrl('/img/manage/cloud/operate/health-checks/health-check-created.png'),
        dark: useBaseUrl('/img/manage/cloud/operate/health-checks/health-check-created.png'),
    }}
/>

:::info
A liveness probe failure restarts the container. A readiness probe failure removes the pod from service temporarily, without restarting it, until it starts passing again.
:::

## What's next

- [Scaling](./scaling.md) — Configure autoscaling for this environment.
- [Runtime Status](./runtime-operations.md) — View pod status and redeploy an integration's release.
