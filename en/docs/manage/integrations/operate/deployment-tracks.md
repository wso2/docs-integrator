---
sidebar_position: 6
title: "Deployment Tracks"
description: "Manage multiple independently buildable and deployable versions of an integration on Choreo Integration."
keywords: [choreo integrator, choreo cloud, deployment tracks, branches, api version]
slug: /manage/integrations/operate/deployment-tracks
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Deployment Tracks

A deployment track maps one Git branch to one API version, so you can build and deploy multiple versions of an integration independently — for example, maintaining `v1.0` on `main` while developing `v2.0` on another branch. A branch can have only one deployment track.

Every integration starts with a **Default** track on its main branch. Manage tracks from the integration's **Configure** > **Deployment tracks** page.

<ThemedImage
    alt="Deployment tracks page listing the Default track on the main branch"
    sources={{
        light: useBaseUrl('/img/manage/cloud/operate/deployment-tracks/deployment-tracks-list.png'),
        dark: useBaseUrl('/img/manage/cloud/operate/deployment-tracks/deployment-tracks-list.png'),
    }}
/>

The **Deployment track** selector at the top of the **Build**, **Deploy**, and **Test** pages switches which track those pages show — each track builds, deploys, and is promoted across environments independently of the others.

## Create a deployment track

1. Click **Create deployment track**.
2. Select a **Branch**. Only branches that don't already have a track are selectable.
3. Enter an **API version**. This can't be changed once set.
4. Optional: add a **Description**.

    <ThemedImage
        alt="Create deployment track form with a branch, API version, and description"
        sources={{
            light: useBaseUrl('/img/manage/cloud/operate/deployment-tracks/create-deployment-track.png'),
            dark: useBaseUrl('/img/manage/cloud/operate/deployment-tracks/create-deployment-track.png'),
        }}
    />

5. Click **Create**.

Creating a track triggers an initial build automatically.

<ThemedImage
    alt="Deployment tracks page listing both the Default track and the newly created track"
    sources={{
        light: useBaseUrl('/img/manage/cloud/operate/deployment-tracks/deployment-tracks-list-created.png'),
        dark: useBaseUrl('/img/manage/cloud/operate/deployment-tracks/deployment-tracks-list-created.png'),
    }}
/>

## Edit or delete a track

Click the edit icon next to a track to update its **Description** — the **Branch** and **API version** can't be changed after creation.

To remove a track, click its delete icon. If a build is in progress for that track, delete it only after the build finishes.

:::info
The Default track can't be deleted.
:::

## What's next

- [Promote an Integration](./promotion.md) — Move a deployment track's build from one environment to the next.
- [Build Configurations](../../configurations/build-configurations.md) — Control how each deployment track is built.
