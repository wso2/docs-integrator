---
title: Consuming an API Secured with an API Key
---

# Consuming an API Secured with an API Key

This document provides guidance on how to consume an API that is secured using the API Key security scheme.

## Prerequisites

Before you begin, ensure you have the following:

- An integration as API configured with API Key security in WSO2 Cloud - Integration Platform. Refer to the [API Security](../api-security.md) documentation for details on setting up API Key security for your API.
- The integration as API is promoted to the Production environment.

## Steps to consume an API secured with API Key

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
10. In the API Keys section, locate the row corresponding to the subscribed API (identified by its **API Name** and **API Version**), and click **Generate Key** under the **Key Actions** column.
11. Enter a name for the API Key in the **API Key Name** field and click **Generate** to generate the API Key.
![Generate API Key](/img/manage/cloud/api-management/api-key-consumption-generate-key.gif)

Once you have the API Key, you can use it to make authenticated requests to the secured API. Include the key in the `api-key` header of your HTTP requests as follows:

```
api-key: <api_key>
```

An example using `curl` to make a request to the secured API:

```bash
curl --request GET \
  --url <endpoint> \
  --header 'Accept: text/plain' \
  --header 'api-key: <api_key>'
```

You can also click **Documentation** in the **API Overview** page to view the API documentation, and test the API endpoints directly from the Developer Portal using the generated API Key.
