---
sidebar_position: 7
title: "Runtime Status"
description: "View an integration's runtime status and redeploy its latest release on Choreo Integration."
keywords: [choreo integrator, choreo cloud, runtime status, redeploy, pods, replicas]
slug: /manage/configurations/runtime-operations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Runtime Status

Each deployed integration has a **Runtime** page, at **Operate** > **Runtime**, that shows its current deployment details for the selected environment and lets you redeploy it.

<ThemedImage
    alt="Runtime page showing component details, pod details, and CPU/Memory usage"
    sources={{
        light: useBaseUrl('/img/manage/cloud/configurations/runtime-operations/runtime-status.png'),
        dark: useBaseUrl('/img/manage/cloud/configurations/runtime-operations/runtime-status.png'),
    }}
/>

## Runtime details

| Field | Description |
|---|---|
| **Component ID** | The unique identifier for this integration. |
| **Release ID** | The identifier of the release currently deployed to this environment. |
| **Namespace** | The Kubernetes namespace the integration runs in. |
| **Image** | The container image currently deployed. |

Below that, the **Replicas** table lists each running pod with its status, availability, restarts, and last activity, and the **CPU usage** / **Memory usage** cards show current utilization against the integration's allocated resources.

## Redeploy a release

Click **Redeploy release** to restart the integration's running pods on the same image, without building or promoting a new release. Use this to recover from a bad runtime state without rolling back to a different version.

## What's next

- [Scaling](./scaling-resource-limits.md) — Configure autoscaling and container resource limits.
- [Runtime configurations](./runtime-configurations.md) — Set configurable values and secrets your integration reads at runtime.
