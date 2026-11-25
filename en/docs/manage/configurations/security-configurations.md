---
sidebar_position: 4
title: "Security"
description: "Configure API Key and OAuth2 security schemes for integrations deployed to the Choreo Integration."
keywords: [choreo integrator, api security, api key, oauth2, integration as api, choreo cloud]
slug: /manage/configurations/security-configurations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Security Configurations

Choreo Integration lets you configure authentication for integrations deployed as Integration as APIs or AI Agents. Each endpoint is secured with exactly one scheme at a time: **API key** or **OAuth**.

## Supported security schemes

| Scheme | Default header | Description |
|---|---|---|
| **API key** | `X-API-Key` | Clients include a static key in a request header. Simple to set up and suitable for service-to-service calls. |
| **OAuth** | `Authorization` | Clients obtain an access token and include it as a Bearer token. |

The security header name is customizable for either scheme.

## Configure security

1. Open your integration from the project home.
2. On the integration overview page, click **Configure security** in the top-right corner.

    <ThemedImage
        alt="Integration overview page with the Configure security button highlighted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/security-configurations/configure-security.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/security-configurations/configure-security.png'),
        }}
    />

3. If the integration exposes more than one endpoint, pick one from the **Endpoints** list.
4. Select the **Security scheme**: **API key** or **OAuth**.

    <ThemedImage
        alt="Configure security panel with the API key scheme selected"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/security-configurations/configure-security-panel.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/security-configurations/configure-security-panel.png'),
        }}
    />

    With **OAuth**, you also configure a token prefix, the key manager that must have issued the token, optional audiences, whether to forward the token to the backend, and per-operation scopes. See [Configure security for an integration as an API](../integrations/api-management/api-security.md#configure-security-for-an-integration-as-an-api) for the full OAuth field reference.

5. Click **Apply** to save the changes.

:::info
Changes apply immediately to the Development environment. To apply them to other environments, promote the integration.
:::

## Consume a secured API

You can test the secured endpoint by navigating to the **Test** > **Console** page in left navigation.

To consume the API from an external client, include the credential for the enabled scheme in your request:

```bash
# API key (using the default header name)
curl --request GET   --url <endpoint_url>   --header 'X-API-Key: <your_api_key>'

# OAuth
curl --request GET   --url <endpoint_url>   --header 'Authorization: Bearer <access_token>'
```

{/* TODO(v3): document how a consumer obtains the API key / OAuth2 token.
    The previous steps went through the Developer Portal, which is not in v3. */}

## What's next

- [Endpoint configurations](./endpoint-configurations.md) — Configure endpoint visibility levels per environment.
- [Scaling and resource limits](./scaling-resource-limits.md) — Configure CPU and memory limits, and scaling behavior for your integration.
