---
sidebar_position: 4
title: "Security"
description: "Configure API Key and OAuth2 security schemes for integrations deployed to the WSO2 Cloud - Integration Platform."
keywords: [wso2 integrator, api security, api key, oauth2, integration as api, wso2 cloud]
slug: /manage/configurations/security-configurations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Security Configurations

The WSO2 Integration Platform lets you configure authentication for integrations deployed as Integration as APIs or AI Agents. You can secure each endpoint with an API Key scheme, an OAuth2 scheme, or both at the same time.

## Supported security schemes

| Scheme | Header | Description |
|---|---|---|
| **API Key** | `api-key` | Clients include a static key in a request header. Simple to set up and suitable for service-to-service calls. |
| **OAuth2** | `Authorization` | Clients obtain an access token and include it as a Bearer token. |

When both schemes are enabled, clients can authenticate with either an API Key or an OAuth2 access token.

## Configure security

1. Open your integration from the project home.
2. On the integration overview page, click **Configure Security** in the top-right panel.

    <ThemedImage
        alt="Integration overview page with Configure Security button"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/security-configurations/configure-security.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/security-configurations/configure-security.png'),
        }}
    />

3. In the **Configure Security** panel, select the endpoint you want to secure from the **Endpoints** dropdown.

    <ThemedImage
        alt="Configure Security panel"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/security-configurations/configure-security-panel.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/security-configurations/configure-security-panel.png'),
        }}
    />

4. Enable the security schemes you want to apply:

    - **API Key** — Check the **API Key** checkbox. You can edit the security header name if your client uses a different header.
    - **OAuth2** — Check the **OAuth2** checkbox. You can edit the security header name if your client uses a different header, but it must support Bearer tokens.

5. If you want the authenticated user's identity to be forwarded to your backend service, enable **Pass end-user attributes to upstream**.

6. Once you have configured the security settings as needed, click **Apply** to save the changes. 

:::info
Security configuration changes take effect after the integration is deployed. The change applies immediately to the Development environment. To apply it to other environments, promote the integration.
:::

## Consume a secured API

You can test the secured endpoint by navigating to the **Test** > **Console** page in left navigation.

To consume the API from an external client, include the credential for the enabled scheme in your request:

```bash
# API Key
curl --request GET   --url <endpoint_url>   --header 'api-key: <your_api_key>'

# OAuth2
curl --request GET   --url <endpoint_url>   --header 'Authorization: Bearer <access_token>'
```

{/* TODO(v3): document how a consumer obtains the API key / OAuth2 token.
    The previous steps went through the Developer Portal, which is not in v3. */}

## What's next

- [Endpoint configurations](./endpoint-configurations.md) — Configure endpoint visibility levels per environment.
- [Scaling and resource limits](./scaling-resource-limits.md) — Configure CPU and memory limits, and scaling behavior for your integration.
