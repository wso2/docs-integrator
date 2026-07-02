---
title: Consuming an API Secured with OAuth2
---

# Consuming an API Secured with OAuth2

This document provides guidance on how to consume an API that is secured using the OAuth2 security scheme.

## Prerequisites

Before you begin, ensure you have the following:

- An integration as API configured with OAuth2 security in WSO2 Cloud - Integration Platform. Refer to the [API Security](../api-security.md) documentation for details on setting up OAuth2 security for your API.
- The integration as API is promoted to the Production environment.

## Steps to consume an OAuth2 secured API

1. Sign in to the [WSO2 Cloud](https://console.devant.dev).
2. Select your project and navigate to the **Overview** page in the left navigation.
3. Select the integration as API that you want to consume.
4. In the integration **Overview** page, on the right side, click the **Developer Portal** icon. This will open the Developer Portal for the selected API.
  ![Open Developer Portal](/img/manage/cloud/api-management/open-developer-portal.gif)
5. In the Developer Portal, click **Subscribe** to subscribe the API to an application.
6. If you already have an application, select it from the list. If not, enter a name for a new application and click **Create Application**.
7. Once the application is created, click **Subscribe** to complete the subscription process.
![Subscribe API to Application](/img/manage/cloud/api-management/subscribe-api-to-application.gif)
8. In the left navigation menu, click **Applications** and select your application.
9. Click **Manage Keys** at the top right of the application page.
10. Under the **OAuth2 Keys** section, click **Generate Key**.
11. A dialog box showing the credentials will appear, which you can close after noting down the necessary details (You can modify the **Advanced Configuration** if needed).
12. To test the API, click **Generate** under the **Token** subsection. This will generate an access token using the OAuth2 client credentials flow.
![Generate OAuth2 Token](/img/manage/cloud/api-management/oauth2-consumption-generate-token.gif)

Once you have the access token, you can use it to make authenticated requests to the secured API. Include the token in the `Authorization` header of your HTTP requests as follows:

```
Authorization: Bearer <access_token>
```

An example using `curl` to make a request to the secured API:

```bash
curl --request GET \
  --url <endpoint> \
  --header 'Accept: text/plain' \
  --header 'Authorization: Bearer <access_token>'
```

You can also click **Documentation** in the **API Overview** page to view the API documentation, and test the API endpoints directly from the Developer Portal using the generated access token.
