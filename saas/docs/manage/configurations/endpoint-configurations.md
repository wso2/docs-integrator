---
title: Endpoints
---

# Endpoints and Networking Configuration

When you deploy an Integration as API to the WSO2 Cloud - Integration Platform, each endpoint can be exposed at one or more visibility levels.

## Endpoint visibility levels

Each endpoint supports three independent visibility levels. You can enable any combination of them.

| Visibility level | Who can access the endpoint |
|---|---|
| **Project** | Any integration within the same project |
| **Organization** | Any integration within the same organization |
| **Public** | Any client, regardless of location or organization |

By default, the **Public** visibility level is enabled, and the platform generates a public URL for the endpoint.

## Configure endpoint visibility

Endpoint visibility is configured through the configurations drawer for each environment.

1. Open your integration from the project home.
2. On the integration overview page, locate the environment you want to configure.
3. Click **Configure** on that environment card.
4. In the runtime configurations drawer, click **Next** to go to the endpoint details step.

    The drawer lists all endpoints for the integration, with the current network visibility shown for each.

    <ThemedImage
        alt="Endpoint details drawer"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/endpoint-drawer.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/endpoint-drawer.png'),
        }}
    />

5. Click the edit icon next to the endpoint you want to configure.

    The **Network Visibility** options appear.

    <ThemedImage
        alt="Endpoint visibility level settings"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/endpoint-visibility-level.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/endpoint-visibility-level.png'),
        }}
    />

6. Select the visibility levels you want to enable. You can enable multiple levels at the same time.
7. Click **Update**.
8. Click **Apply**.

The integration restarts. Once it is active, the environment card displays a URL for each enabled visibility level.

<ThemedImage
    alt="Environment card showing all endpoint URLs"
    sources={{
        light: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/overview-card.png'),
        dark: useBaseUrl('/img/manage/cloud/configurations/endpoint-configurations/overview-card.png'),
    }}
/>

Enabling the **Project** or **Organization** visibility levels generates additional internal URLs alongside the public URL. These internal URLs are only accessible from within the defined scope.

## What's next

- [Build configurations](./build-configurations.md) — Control how your integrations are built on the WSO2 Integration Platform.
- [Scaling and resource limits](./scaling-resource-limits.md) — Configure CPU and memory limits for your integration.
