---
sidebar_position: 2
title: "Containers"
description: "Set container CPU and memory request/limit for integrations deployed on Choreo Integration."
keywords: [choreo integrator, choreo cloud, containers, resource limits, cpu, memory]
slug: /manage/integrations/operate/containers
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Containers

Each environment's **Operate** > **Containers** page shows the resource allocation for the integration's container.

<ThemedImage
    alt="Containers page showing the main container's image, CPU request/limit, and Memory request/limit"
    sources={{
        light: useBaseUrl('/img/manage/cloud/operate/containers/containers.png'),
        dark: useBaseUrl('/img/manage/cloud/operate/containers/containers.png'),
    }}
/>

## Set container resource limits

1. Click **Edit**.
2. Drag the **CPU request / limit** and **Memory request / limit** sliders to set each value. The request is the amount reserved for the container; the limit is the maximum it can use before being throttled (CPU) or restarted (memory).
3. Choose an **Image pull policy**: **Always** re-pulls the image on every pod restart, and **If not present** only pulls it if it isn't already cached on the node.

    <ThemedImage
        alt="Edit container form with CPU and Memory request/limit sliders and the Image pull policy options"
        sources={{
            light: useBaseUrl('/img/manage/cloud/operate/containers/containers-edit.png'),
            dark: useBaseUrl('/img/manage/cloud/operate/containers/containers-edit.png'),
        }}
    />

4. Click **Save changes**.

## What's next

- [Scaling](./scaling.md) — Configure autoscaling for this environment.
- [Runtime Status](./runtime-operations.md) — View pod status and redeploy an integration's release.
