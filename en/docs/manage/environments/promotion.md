---
sidebar_position: 4
title: "Promote an Integration"
description: "Promote an integration from one environment to the next in the Choreo Integration."
keywords: [choreo integrator, promote integration, environments, development, production, choreo cloud]
slug: /manage/environments/promotion
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Promote an Integration

Promoting an integration moves its current deployment to the next environment in its project's pipeline, for example from Development to Staging.

## Promote to the next environment

A **Promote** button appears below an environment card once that environment has an active deployment, as long as the pipeline has a next environment to promote to. With only the default `development` environment, there's nothing to promote to; [create an additional environment](./create.md), [add it to a pipeline](./configure-promotion-pipelines.md), and assign that pipeline to the project first.

1. Open your integration and go to its **Overview** or **Deploy** page.
2. Locate the environment card you want to promote from.
3. Click **Promote** below that environment card.

    <ThemedImage
        alt="Deploy page with Development and Staging active, and Promote available on Staging to promote to Production"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/promotion/deploy-promote-staging.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/promotion/deploy-promote-staging.png'),
        }}
    />

The same build is deployed directly to the target environment — there's no intermediate confirmation step. The target environment's card shows **In progress** while the deployment completes, then **Active** once it's live and serving its own endpoint URLs.

<ThemedImage
    alt="Deploy page with Development, Staging, and Production all active after promoting through the full pipeline"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/promotion/deploy-fully-promoted.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/promotion/deploy-fully-promoted.png'),
    }}
/>

Once a build is already deployed to an environment, **Promote** to that environment is disabled ("Already deployed in target environment") until you deploy a newer build.

:::info
To set configurable values, environment variables, or files for the target environment, use its own **Configure** button or **Configs & secrets** page once it's deployed — promoting doesn't prompt for them.
:::

## What's next

- [Runtime configurations](../configurations/runtime-configurations.md) — Update configuration values for a specific environment after promotion.

{/* TODO(v3): this integration has no configurables (Configurables: 0), so it's
    unverified whether promoting one with configurable values prompts for them
    before deploying, or always just carries the source values over silently.
    Re-verify with an integration that has configurables. */}
