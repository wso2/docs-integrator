---
sidebar_position: 3
title: "Configs & Secrets"
description: "Manage environment variables and mounted files for integrations deployed on Choreo Integration."
keywords: [choreo integrator, choreo cloud, configs and secrets, environment variables, file mount]
slug: /manage/integrations/operate/configs-and-secrets
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Configs & Secrets

For values that aren't Ballerina configurables, such as environment variables or files your integration reads directly from its container, each integration has its own **Configs & secrets** page, at **Operate** > **Configs & secrets**. Unlike [Ballerina configurables](../../configurations/runtime-configurations.md), these aren't shared across integrations — every integration manages its own set.

## Add a configuration

1. Open your integration, go to **Operate** > **Configs & secrets**, and click **Create**.

    <ThemedImage
        alt="Configs and secrets page for an integration, with no configurations added yet"
        sources={{
            light: useBaseUrl('/img/manage/cloud/operate/configs-and-secrets/configs-secrets-page.png'),
            dark: useBaseUrl('/img/manage/cloud/operate/configs-and-secrets/configs-secrets-page.png'),
        }}
    />

2. Choose a type:

    | Type | Description |
    |---|---|
    | **Environment variables** | Key-value pairs your integration reads as environment variables. |
    | **File mount** | A file, such as a certificate or a config file, placed in the container at a path you choose. |

3. Optional: Turn on **Store as a secret** to encrypt the values. A secret can't be viewed again after it's saved, and this setting can't be changed later.
4. Enter a **Group name**. This can't be changed later.
5. Add the variables (or, for a file mount, the file name, mount directory, and content), then click **Add variables** (or **Add file**).

    <ThemedImage
        alt="Add a configuration form with an environment variable entered and Store as a secret turned on"
        sources={{
            light: useBaseUrl('/img/manage/cloud/operate/configs-and-secrets/add-configuration.png'),
            dark: useBaseUrl('/img/manage/cloud/operate/configs-and-secrets/add-configuration.png'),
        }}
    />

Saving restarts the integration to apply the changes.

<ThemedImage
    alt="Configs and secrets page listing a saved configuration group"
    sources={{
        light: useBaseUrl('/img/manage/cloud/operate/configs-and-secrets/configs-secrets-list.png'),
        dark: useBaseUrl('/img/manage/cloud/operate/configs-and-secrets/configs-secrets-list.png'),
    }}
/>

## Edit a configuration

1. On the **Configs & secrets** page, click the edit icon next to the configuration you want to change.
2. Update the variables or file content as needed. For a secret, every value shows as hidden — leave a field blank to keep its current value, or type a new one to replace it.

    <ThemedImage
        alt="Edit environment variables form with a secret value hidden behind placeholder dots"
        sources={{
            light: useBaseUrl('/img/manage/cloud/operate/configs-and-secrets/edit-configuration.png'),
            dark: useBaseUrl('/img/manage/cloud/operate/configs-and-secrets/edit-configuration.png'),
        }}
    />

3. Click **Save changes**.

The integration restarts to apply the changes.

## What's next

- [Runtime Configurations](../../configurations/runtime-configurations.md) — Set configurable values the integration reads through Ballerina configurables.
- [Health Checks](./health-checks.md) — Configure liveness and readiness probes.
