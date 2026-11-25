---
sidebar_position: 3
title: "Runtime"
description: "Configure Ballerina configurable values per environment on Choreo Integration, and mark sensitive values as secrets."
keywords: [choreo integrator, choreo cloud, configuration, configurables, environment config]
slug: /manage/configurations/runtime-configurations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Runtime Configurations

Choreo Integration lets you configure each integration's Ballerina configurable values per environment, through the **Configure** button on each environment card.

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

## What's next

- [Configs & Secrets](../integrations/operate/configs-and-secrets.md) — Manage environment variables and mounted files, for values that aren't Ballerina configurables.
- [Endpoint configurations](./endpoint-configurations.md) — Configure endpoint visibility settings for integrations.
- [Build configurations](./build-configurations.md) — Control how your integrations are built on Choreo Integration.
