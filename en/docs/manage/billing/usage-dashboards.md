---
sidebar_position: 3
title: "Usage Dashboards"
description: "Analyze API traffic, errors, latency, cache, and devices on Choreo Cloud."
keywords: [choreo integrator, choreo cloud, usage insights, dashboards, traffic, errors, latency, billing]
slug: /manage/billing/usage-dashboards
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Usage Dashboards

Choreo Cloud provides comprehensive insights into APIs created within Choreo Cloud. Usage insights provide a range of metrics, including API traffic, error rates, and latency, allowing you to monitor and optimize API performance effectively.

With Choreo Cloud usage insights, you can:

- **Analyze API traffic**: Monitor the volume of requests and responses to understand usage patterns.
- **Track errors**: Identify and analyze errors to improve API reliability.
- **Monitor latency**: Measure and optimize the response times of your APIs.
- **Obtain granular insights**: Obtain detailed information on a per-application, per-API, and per-user basis for more targeted analysis.
- **Drill down into data**: Dive deeper into data to perform root cause analysis.

By leveraging these insights, businesses can make informed decisions to enhance their API strategies and drive their digital transformation initiatives forward.

## View insights

To view usage insights, go to the [Choreo Cloud Console](https://console.cloud.choreolabs.com/) and click **Insights**, then click **Usage** in the left navigation menu.

## Analyze statistics

Once you access the **Usage Insights** page, you can access the following subpages.

### Overview

The **Overview** page gives you a quick overview of the system status.

<ThemedImage
    alt="Usage Insights Overview page showing total traffic, error request count, average error rate, 95th percentile latency, and the API request summary timeline."
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview.png'),
    }}
/>

The information displayed is as follows:

- **Total Traffic**

    <ThemedImage
        alt="Total Traffic widget on the Overview page."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-total-traffic.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-total-traffic.png'),
        }}
    />

    This widget displays the total traffic of the selected environment received during a given time interval. Both successful requests and failed requests are displayed. To investigate further, you can click the arrow icon on the bottom-right corner of the widget to open the [Traffic](#traffic) page.

- **Error Request Count**

    <ThemedImage
        alt="Error Request Count widget on the Overview page."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-error-request-count.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-error-request-count.png'),
        }}
    />

    This widget displays the total number of requests that have resulted in errors in your selected environment during the selected time range.

- **Average Error Rate**

    <ThemedImage
        alt="Average Error Rate widget on the Overview page."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-error-rate.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-error-rate.png'),
        }}
    />

    This widget displays the average error rate (error count divided by total request count) of the selected environment for a given time interval. You can use this widget as an indicator of the health of the system. A high error rate indicates that the system needs attention.

- **95th Percentile Latency**

    <ThemedImage
        alt="95th Percentile Latency widget on the Overview page."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-latency.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-latency.png'),
        }}
    />

    This widget displays the 95th percentile of all API latencies in your selected environment for the given time interval. You can use this widget to determine whether the complete system operates under given SLAs. This metric provides the first indication of slow APIs. To investigate further, you can click the arrow on the bottom-right of the widget to open the [Latency](#latency) page, where you can further analyze the latency.

- **API Request Summary**

    <ThemedImage
        alt="API Request Summary timeline showing successful requests, error count, and latency over time."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-timeline.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/overview-page-timeline.png'),
        }}
    />

    This chart displays the total successful requests, the total requests that have resulted in errors, and the latency in a timeline. The y-axis on the left displays the request count and the error count. The x-axis shows time, and the y-axis on the right shows the latency in milliseconds. The granularity of the data points is decided based on the time range you have selected. The tooltip provides the exact value of all three metrics.

### Traffic

The **Traffic** page shows information related to the traffic that goes through your API management deployments. This includes API usage, application usage, resource usage, and so on. Use this page to investigate the usage of APIs and applications, traffic patterns, and similar metrics.

<ThemedImage
    alt="Traffic page showing API usage timelines, per-application breakdowns, per-target breakdowns, and resource-level usage tables."
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/traffic-page-full.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/traffic-page-full.png'),
    }}
/>

You can filter the information displayed in the widgets as follows:

| Filtering option | Description |
|---|---|
| **By API** | In the **API** field, you can select one or more APIs for which you want to view analytics. **All** is selected by default. Once you select an API, you can further filter by a specific application that uses the selected API via the **Application** field described below. |
| **By Application** | In the **Application** field, you can select the applications for which you want to view analytics. **All** is selected by default. The available applications are all the applications that have subscribed to one or more of the APIs you selected in the **API** field. |

You can view the following information for the APIs you have selected using the filtering criteria above:

- **API Usage Over Time**

    This timeline shows the count of API hits for the selected APIs. If multiple APIs are selected, the timeline shows each API in a separate line with a legend separating each line. You can also zoom in on a selected time range by selecting that area in the chart. To restore the original view, use the **Zoom-out** button on the top-right corner of the plot.

    <ThemedImage
        alt="API Usage Over Time line chart with per-API series."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/api-usage-timeline.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/api-usage-timeline.png'),
        }}
    />

- **API Usage By Application**

    This widget shows the per-application breakdown of requests for the APIs you selected. You can use the pie chart view or the line chart view. You can switch between the two views using the small icon at the upper-right corner of the widget.

    <ThemedImage
        alt="API Usage By Application pie chart."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/usage-by-application.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/usage-by-application.png'),
        }}
    />

- **API Usage By Target**

    This widget shows the per-backend breakdown of requests for the APIs you selected. This information is useful when multiple APIs share the same backend that has traffic restrictions. You can use these stats to scale your backends proactively.

    <ThemedImage
        alt="API Usage By Target pie chart."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/usage-by-target.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/usage-by-target.png'),
        }}
    />

- **API Resource Usage**

    This table shows a resource-level breakdown of API traffic. Each row represents an API resource and shows the API name, resource path, API method, and the hit count for that combination.

    <ThemedImage
        alt="API Resource Usage table with API name, resource path, method, and hit count columns."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/resource-usage.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/resource-usage.png'),
        }}
    />

### Latency

The **Latency** page shows information related to the latency of API calls within the API management deployment. You can view a summary of the slowest APIs and then drill down into the API view for further analysis. Use this page as a starting point to debug API slowness.

<ThemedImage
    alt="Latency page showing the top 10 slowest APIs and latency-by-category breakdowns."
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/latency-page-full.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/latency-page-full.png'),
    }}
/>

The information displayed is as follows:

- **Top 10 Slowest APIs**

    This widget allows you to identify the slowest APIs of the API management system at a glance. Since these are the APIs that contribute to the higher 95th percentile of the system, improving these APIs lowers the 95th percentile of latency in the API Management deployments.

    <ThemedImage
        alt="Top 10 Slowest APIs widget."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/slowest-apis.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/slowest-apis.png'),
        }}
    />

- **Latencies By Category**

    This widget allows you to further drill down into the chart above. Use the API selector in this widget to select the slow API you identified in the earlier step and then analyze further. Use the charts available in the widget to view the 95th percentile and the median latency over the selected period of the following:

      - Backend
      - Request mediation
      - Response mediation

    <ThemedImage
        alt="Latencies By Category charts for backend, request mediation, and response mediation."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/latency-by-category.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/latency-by-category.png'),
        }}
    />

    You can use these charts to further drill down and analyze whether the latency occurs in the backend, request mediation, or response mediation. Also, because you can see both the median and 95th percentile, you can easily identify whether the slowness is occurring on every request or whether it is intermittent.

### Cache

The **Cache** page shows statistics that indicate the efficiency with which response caching is carried out for the requests sent to your APIs.

<ThemedImage
    alt="Cache page showing cache hit percentage and latency over time."
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/cache-page-full.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/cache-page-full.png'),
    }}
/>

The page displays the following statistics:

- **Cache Hit Percentage**

    This graph shows the percentage of requests the system has handled via the response cache over time, and the total hits over time. This information allows you to assess how efficiently the backend handles API requests. For example, if the cache hit rate is low, it may indicate that the backend generates the same response each time a specific request is sent instead of returning the response via the cache. In such a scenario, there is scope to improve performance via response caching.

    <ThemedImage
        alt="Cache Hit Percentage line graph."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/cache-statistics.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/cache-statistics.png'),
        }}
    />

- **Latency**

    This section shows the total latency reported during the same time interval applied to the **Cache Hit Percentage** graph above.

    <ThemedImage
        alt="Cache Latency chart."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/cache-latency.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/cache-latency.png'),
        }}
    />

### Devices

The **Devices** page displays information about operating systems and HTTP agents that end users use to invoke the APIs. You can use this page to get an idea of the distribution of your user base and improve your APIs to match the audience.

<ThemedImage
    alt="Devices page showing top platforms and top user agents."
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/devices-page-full.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/devices-page-full.png'),
    }}
/>

To filter the information displayed on this page by API, select the required APIs in the **API** field. **All** is selected by default.

The information displayed is as follows:

- **Top Platforms**

    This chart shows the breakdown of the API clients by operating system. The pie chart only shows platforms with a significant amount of requests. Other platforms are grouped under the **Other** category.

    <ThemedImage
        alt="Top Platforms pie chart."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/top-platforms.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/top-platforms.png'),
        }}
    />

- **Top User Agents**

    This chart shows the breakdown of the API clients by user-agent. The pie chart only shows user agents with a significant amount of requests. Other user agents are grouped under the **Other** category.

    <ThemedImage
        alt="Top User Agents pie chart."
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/top-user-agents.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/usage-dashboards/top-user-agents.png'),
        }}
    />

## What's next

- [Pricing and plans](./pricing-and-plans.md) — How Choreo Cloud bills platform services and how to upgrade a service plan.
- [Choreo Cloud overview](../manage.md) — How Choreo Cloud manages your deployed integrations end to end.
