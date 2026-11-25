---
sidebar_position: 3
title: API Security
description: Learn about API security schemes in Choreo Integration, including API Key and OAuth2.
keywords: [api security, api key, oauth2, authentication, authorization, security schemes]
slug: /manage/integrations/api-management/api-security
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# API Security

This document outlines key practices for securing APIs against threats and vulnerabilities. API security relies on authentication, which involves verifying identity with methods like API keys, tokens, or OAuth2, and authorization, which defines user permissions and enforces role-based access.

## Supported security schemes

Choreo Integration primarily supports two security schemes for APIs: `API Key` and `OAuth2`.

### API Key

API Key is a simple and widely used method for securing APIs. It involves generating a unique key that clients must include in their requests to access the API. The key is typically sent in the request header. You can customize the security header name based on your requirements.

### OAuth2

OAuth2 is a robust and flexible authorization framework that allows third-party applications to access resources on behalf of a user. It involves obtaining an access token through various grant types, such as authorization code, client credentials, or implicit flow. OAuth2 provides better security and scalability for APIs, especially in scenarios involving multiple clients and users.

## Configure security for an integration as an API

Follow the steps given below.

1. Sign in to the [Choreo Cloud](https://console.cloud.choreolabs.com).
2. Open the integration as API you want to configure security for.
3. On the integration **Overview** page, click **Configure security**.

   <ThemedImage
       alt="Integration overview page with the Configure security button highlighted"
       sources={{
           light: useBaseUrl('/img/manage/cloud/api-management/api-security-open.png'),
           dark: useBaseUrl('/img/manage/cloud/api-management/api-security-open.png'),
       }}
   />

4. If the integration exposes more than one endpoint, pick one from the **Endpoints** list.
5. Select the **Security scheme**: **API key** or **OAuth**. Each scheme has its own **Security header** name, which you can customize.

    - With **API key**, clients must send a valid API key in that header.

      <ThemedImage
          alt="Configure security pane with the API key scheme selected"
          sources={{
              light: useBaseUrl('/img/manage/cloud/api-management/api-security-api-key.png'),
              dark: useBaseUrl('/img/manage/cloud/api-management/api-security-api-key.png'),
          }}
      />

    - With **OAuth**, clients must present a valid OAuth2 access token. Configure:

      | Field | Description |
      |---|---|
      | **Token prefix** | The prefix clients send before the token in the security header, for example `Bearer`. |
      | **Key manager** | The environment's key manager that must have issued the token. Currently, **ThunderKeyManager** is the only key manager supported by default. |
      | **Audiences** (optional) | One or more audience values. A token must carry at least one of these in its `aud` claim; leave empty to accept any audience. |

      <ThemedImage
          alt="Configure security pane with the OAuth scheme selected, showing the Token section"
          sources={{
              light: useBaseUrl('/img/manage/cloud/api-management/api-security-oauth-token.png'),
              dark: useBaseUrl('/img/manage/cloud/api-management/api-security-oauth-token.png'),
          }}
      />

      Under **Backend**, choose whether to forward the token to the backend, and if so, which header to forward it in, and whether to strip the token prefix before forwarding.

      Under **Scopes**, for each operation you can require scopes the token must carry: **All of** (every listed scope is required) and **Any of** (at least one listed scope is required). An operation with no scopes configured accepts any valid token; a token missing a required scope gets a `401`.

      <ThemedImage
          alt="Configure security pane showing the Backend and Scopes sections for the OAuth scheme"
          sources={{
              light: useBaseUrl('/img/manage/cloud/api-management/api-security-oauth-scopes.png'),
              dark: useBaseUrl('/img/manage/cloud/api-management/api-security-oauth-scopes.png'),
          }}
      />

6. Click **Apply** to save the changes. Changes apply immediately to the Development environment; promote them to apply to later environments.

{/* TODO(v3): document how a consumer obtains an API key / OAuth2 token.
    The previous walkthroughs went through the Developer Portal, which is not in v3. */}
