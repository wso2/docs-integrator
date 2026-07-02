---
title: API Rate Limiting
---

# API Rate Limiting

API rate limiting is a technique that allows you to control the rate of requests made to an API. Rate limiting helps prevent system overload and enhances API performance. By limiting the number of requests in a specific time frame, you ensure that your API remains available and responsive to all users while being protected from malicious attacks.

This page walks you through the steps to enable rate limiting for your APIs via WSO2 Cloud - Integration Platform and also provides information on the rate limiting options supported.

## Enable rate limiting for an API

To enable rate limiting for an API, follow the steps given below:

You can apply rate limiting settings separately for each environment.

1. Sign in to the [WSO2 Cloud](https://console.devant.dev/).
2. In the **Project Overview** page, select an integration as API for which you want to apply rate limiting.
3. On the preferred environment card, click **Configure**.
4. Click **Next** to view **Endpoint Details**.
5. Click the settings icon.
6. In the **Manage** section, click **Rate Limiting** to expand it.
7. Select a **Rate Limiting Level** based on your requirements and click **Apply**.

![Rate Limiting](/img/manage/cloud/api-management/rate-limiting.gif)

## API-level rate limiting

API-level rate limiting applies the allocated request count for the specified time unit to all resources in the API.

## Resource-level rate limiting

Resource-level rate limiting allows you to configure different rate limiting values for each resource. You can use this option to define specific rate limiting values for critical API resources that require an extra layer of protection.

## Rate limiting response headers

The following table lists the response headers available when you enable rate limiting for your APIs. You can implement necessary rate limiting scenarios depending on the response header values.

| **Header Name** | **Description** |
|---|---|
| `x-ratelimit-limit` | Denotes the request count allocated for the specified time unit. |
| `x-ratelimit-reset` | Provides the time remaining to start the next rate limiting time unit. |
| `x-ratelimit-remaining` | Denotes the remaining request count for the specified time unit. |
| `x-ratelimit-enforced` | Returned when the allocated request count is exceeded. |
