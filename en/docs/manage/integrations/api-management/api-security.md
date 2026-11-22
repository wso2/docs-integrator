---
sidebar_position: 3
title: API Security
description: Learn about API security schemes in WSO2 Cloud - Integration Platform, including API Key and OAuth2.
keywords: [api security, api key, oauth2, authentication, authorization, security schemes]
slug: /manage/integrations/api-management/api-security
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# API Security

This document outlines key practices for securing APIs against threats and vulnerabilities. API security relies on authentication, which involves verifying identity with methods like API keys, tokens, or OAuth2, and authorization, which defines user permissions and enforces role-based access.

## Supported security schemes

WSO2 Cloud - Integration Platform primarily supports two security schemes for APIs: `API Key` and `OAuth2`.

### API Key

API Key is a simple and widely used method for securing APIs. It involves generating a unique key that clients must include in their requests to access the API. The key is typically sent in the request header. You can customize the security header name based on your requirements.

### OAuth2

OAuth2 is a robust and flexible authorization framework that allows third-party applications to access resources on behalf of a user. It involves obtaining an access token through various grant types, such as authorization code, client credentials, or implicit flow. OAuth2 provides better security and scalability for APIs, especially in scenarios involving multiple clients and users.

## Configure security for an integration as an API

Follow the steps given below.

1. Sign in to the [WSO2 Cloud](https://console.devant.dev).
2. Select your project and navigate to the **Overview** page in the left navigation.
3. Select the integration as API you want to configure security for.
4. In the integration **Overview** page, on the right side, click **Configure Security**.

   <ThemedImage
       alt="Open API Security"
       sources={{
           light: useBaseUrl('/img/manage/cloud/api-management/api-security-open.png'),
           dark: useBaseUrl('/img/manage/cloud/api-management/api-security-open.png'),
       }}
   />

5. In the **Configure Security** pane, select the **Security Scheme** you want to use (API Key or OAuth2).

    - With the **API Key** scheme, clients must send a valid API key in the request header. Security is applied at the API level.

      <ThemedImage
          alt="API Security - API Key"
          sources={{
              light: useBaseUrl('/img/manage/cloud/api-management/api-security-api-key.png'),
              dark: useBaseUrl('/img/manage/cloud/api-management/api-security-api-key.png'),
          }}
      />

    - With the **OAuth2** scheme, clients must present a valid OAuth2 access token. Security is applied at the API level.

      <ThemedImage
          alt="API Security - OAuth2"
          sources={{
              light: useBaseUrl('/img/manage/cloud/api-management/api-security-oauth2.gif'),
              dark: useBaseUrl('/img/manage/cloud/api-management/api-security-oauth2.gif'),
          }}
      />

6. Click **Apply** to save the changes. The changes will be deployed to the Development environment immediately. For other environments, you need to promote the changes.

    <ThemedImage
        alt="Apply API Security"
        sources={{
            light: useBaseUrl('/img/manage/cloud/api-management/api-security-apply.gif'),
            dark: useBaseUrl('/img/manage/cloud/api-management/api-security-apply.gif'),
        }}
    />
   
{/* TODO(v3): document how a consumer obtains an API key / OAuth2 token.
    The previous walkthroughs went through the Developer Portal, which is not in v3. */}
