---
sidebar_position: 3
title: "Runtime"
description: "Configure integration settings per environment on Choreo Integration, and manage environment variables, files, and secrets for each integration."
keywords: [choreo integrator, choreo cloud, configuration, configs and secrets, environment config]
slug: /manage/configurations/runtime-configurations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Runtime Configurations

Choreo Integration lets you configure each integration's runtime values per environment: Ballerina configurables through the **Configure** panel, and environment variables or mounted files through the integration's own **Configs & secrets** page.

## Configure an integration

Each deployed integration exposes a **Configure** button for every environment. Use it to set or update the configurable values that the integration reads at runtime.

1. Open your integration from the project home.
2. On the integration overview page, locate the environment you want to configure.
3. Click **Configure** on that environment card.

    <ThemedImage
        alt="Configure Integration"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/configurations/configure.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/configurations/configure.png'),
        }}
    />

4. Add the configurable values as needed.
5. Click **Next** through the remaining steps, then click **Apply**.

The integration restarts with the new configuration.

## Mark a configurable value as a secret

Sensitive configuration values, such as passwords, API keys, and tokens, can be marked as secrets. Secrets are stored in the Data Plane's secret vault and are never exposed again after they are saved.

To mark a value as a secret:

1. Open your integration and click **Configure** for the target environment.
2. Enter the secret value.
3. Next to the configurable field you want to protect, click the padlock icon.
4. Click **Next** through the remaining steps, then click **Apply**.

The value is stored in the secret vault, and cannot be viewed once saved. You can only replace it with a new value by clicking **Update sensitive content** next to the field.

## Configs & secrets

For values that aren't Ballerina configurables, such as environment variables or files your integration reads directly from its container, each integration has its own **Configs & secrets** page. Unlike the configurables above, these aren't shared across integrations — every integration manages its own set.

### Add a configuration

1. Open your integration, go to **Operate** > **Configs & secrets**, and click **Create**.

    <ThemedImage
        alt="Configs and secrets page for an integration, with no configurations added yet"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/configurations/configs-secrets-page.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/configurations/configs-secrets-page.png'),
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
            light: useBaseUrl('/img/manage/cloud/configurations/configurations/add-configuration.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/configurations/add-configuration.png'),
        }}
    />

Saving restarts the integration to apply the changes.

<ThemedImage
    alt="Configs and secrets page listing a saved configuration group"
    sources={{
        light: useBaseUrl('/img/manage/cloud/configurations/configurations/configs-secrets-list.png'),
        dark: useBaseUrl('/img/manage/cloud/configurations/configurations/configs-secrets-list.png'),
    }}
/>

### Edit a configuration

1. On the **Configs & secrets** page, click the edit icon next to the configuration you want to change.
2. Update the variables or file content as needed. For a secret, every value shows as hidden — leave a field blank to keep its current value, or type a new one to replace it.

    <ThemedImage
        alt="Edit environment variables form with a secret value hidden behind placeholder dots"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/configurations/edit-configuration.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/configurations/edit-configuration.png'),
        }}
    />

3. Click **Save changes**.

The integration restarts to apply the changes.

## What's next

- [Endpoint configurations](./endpoint-configurations.md) — Configure endpoint visibility settings for integrations.
- [Build configurations](./build-configurations.md) — Control how your integrations are built on Choreo Integration.
