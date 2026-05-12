---
title: Usage dashboards
---

# Usage dashboards

WSO2 Cloud provides comprehensive insights into APIs created within WSO2 Cloud. Usage insights provide a range of metrics, including API traffic, error rates, and latency, allowing you to monitor and optimize API performance effectively.

With WSO2 Cloud usage insights, you can:

- **Analyze API traffic**: Monitor the volume of requests and responses to understand usage patterns.
- **Track errors**: Identify and analyze errors to improve API reliability.
- **Monitor latency**: Measure and optimize the response times of your APIs.
- **Generate reports**: Generate detailed reports to keep stakeholders informed and support data-driven decision-making.
- **Configure alerts**: Set up alerts for specific events or thresholds to proactively manage API performance.
- **Obtain granular insights**: Obtain detailed information on a per-application, per-API, and per-user basis for more targeted analysis.
- **Drill down into data**: Dive deeper into data to perform root cause analysis.

By leveraging these insights, businesses can make informed decisions to enhance their API strategies and drive their digital transformation initiatives forward.

## View insights

To view usage insights, go to the [WSO2 Cloud Console](https://console.devant.dev/) and click **Insights**, then click **Usage** in the left navigation menu.

If you are viewing insights at the organization level, note the following:

- **Permission-based access**: Signed-in users can only view insights for integrations or projects that they have permission to access.
- **Data exclusion**: Insights exclude data from integrations you cannot access and data related to deleted integrations.
- **Comprehensive view permission**: To view insights for all integrations (including deleted ones) across the organization regardless of project visibility, you must have the `View Organization Insights` permission under `OBSERVABILITY-MANAGEMENT` with the mapping level defined at the `Organization` level.
- **Admin role**: Users with the admin role have the `View Organization Insights` permission by default and can view organization-wide insights.
- **Configuring permissions**: For details on configuring permissions, see your organization's access control settings.

By ensuring proper permissions are set, organizations can manage access to insights effectively while maintaining data security and relevance.

## Analyze statistics

Once you access the **Usage Insights** page, you can access the following subpages.

### Overview

The **Overview** page gives you a quick overview of the system status.

![Usage Insights Overview page showing total traffic, error request count, average error rate, 95th percentile latency, and the API request summary timeline.](/img/manage/cloud/billing/usage-dashboards/overview.png)

The information displayed is as follows:

- **Total Traffic**

    ![Total Traffic widget on the Overview page.](/img/manage/cloud/billing/usage-dashboards/overview-page-total-traffic.png)

    This widget displays the total traffic of the selected environment received during a given time interval. Both successful requests and failed requests are displayed. To investigate further, you can click the arrow icon on the bottom-right corner of the widget to open the [Traffic](#traffic) page.

- **Error Request Count**

    ![Error Request Count widget on the Overview page.](/img/manage/cloud/billing/usage-dashboards/overview-page-error-request-count.png)

    This widget displays the total number of requests that have resulted in errors in your selected environment during the selected time range. You can investigate errors by clicking the arrow on the bottom-right of the widget and opening the [Errors](#errors) page.

- **Average Error Rate**

    ![Average Error Rate widget on the Overview page.](/img/manage/cloud/billing/usage-dashboards/overview-page-error-rate.png)

    This widget displays the average error rate (error count divided by total request count) of the selected environment for a given time interval. You can use this widget as an indicator of the health of the system. If the error rate is high, you can investigate further by clicking the arrow on the bottom-right of the widget and opening the [Errors](#errors) page.

- **95th Percentile Latency**

    ![95th Percentile Latency widget on the Overview page.](/img/manage/cloud/billing/usage-dashboards/overview-page-latency.png)

    This widget displays the 95th percentile of all API latencies in your selected environment for the given time interval. You can use this widget to determine whether the complete system operates under given SLAs. This metric provides the first indication of slow APIs. To investigate further, you can click the arrow on the bottom-right of the widget to open the [Latency](#latency) page, where you can further analyze the latency.

- **API Request Summary**

    ![API Request Summary timeline showing successful requests, error count, and latency over time.](/img/manage/cloud/billing/usage-dashboards/overview-page-timeline.png)

    This chart displays the total successful requests, the total requests that have resulted in errors, and the latency in a timeline. The y-axis on the left displays the request count and the error count. The x-axis shows time, and the y-axis on the right shows the latency in milliseconds. The granularity of the data points is decided based on the time range you have selected. The tooltip provides the exact value of all three metrics.

### Traffic

The **Traffic** page shows information related to the traffic that goes through your API management deployments. This includes API usage, application usage, resource usage, and so on. Use this page to investigate the usage of APIs and applications, traffic patterns, and similar metrics.

![Traffic page showing API usage timelines, per-application breakdowns, per-target breakdowns, and resource-level usage tables.](/img/manage/cloud/billing/usage-dashboards/traffic-page-full.png)

You can filter the information displayed in the widgets as follows:

| Filtering option | Description |
|---|---|
| **By API** | In the **API** field, you can select one or more APIs for which you want to view analytics. **All** is selected by default. Once you select an API, you can further filter by a specific application that uses the selected API via the **Application** field described below. |
| **By Application** | In the **Application** field, you can select the applications for which you want to view analytics. **All** is selected by default. The available applications are all the applications that have subscribed to one or more of the APIs you selected in the **API** field. |

You can view the following information for the APIs you have selected using the filtering criteria above:

- **API Usage Over Time**

    This timeline shows the count of API hits for the selected APIs. If multiple APIs are selected, the timeline shows each API in a separate line with a legend separating each line. You can also zoom in on a selected time range by selecting that area in the chart. To restore the original view, use the **Zoom-out** button on the top-right corner of the plot.

    ![API Usage Over Time line chart with per-API series.](/img/manage/cloud/billing/usage-dashboards/api-usage-timeline.png)

- **API Usage By Application**

    This widget shows the per-application breakdown of requests for the APIs you selected. You can use the pie chart view or the line chart view. You can switch between the two views using the small icon at the upper-right corner of the widget.

    ![API Usage By Application pie chart.](/img/manage/cloud/billing/usage-dashboards/usage-by-application.png)

- **API Usage By Target**

    This widget shows the per-backend breakdown of requests for the APIs you selected. This information is useful when multiple APIs share the same backend that has traffic restrictions. You can use these stats to scale your backends proactively.

    ![API Usage By Target pie chart.](/img/manage/cloud/billing/usage-dashboards/usage-by-target.png)

- **API Resource Usage**

    This table shows a resource-level breakdown of API traffic. Each row represents an API resource and shows the API name, resource path, API method, and the hit count for that combination.

    ![API Resource Usage table with API name, resource path, method, and hit count columns.](/img/manage/cloud/billing/usage-dashboards/resource-usage.png)

### Errors

The **Errors** page shows information related to erroneous API calls received by your system. It allows you to analyze errors by both error categories and HTTP status codes.

- **Error Category View**: An error category represents a type of faulty scenario identified at the API gateway level. In these cases, the API request may not reach the API target, and the user receives an error message and an HTTP error code. Errors are grouped into categories and subcategories based on their nature (such as authentication, connectivity, throttling, or other issues). The chart displays these categories and their subcategory errors, helping you quickly identify and analyze the types of errors occurring in your APIs.
- **Status Code View**: Status code-based insights provide information based on the HTTP status codes received by the client, regardless of whether the error was generated by the API gateway or the backend target. This is different from the error category chart, which groups errors by the type of faulty scenario identified at the gateway level. For example, an authentication error category may result in different status codes like 401 or 403, depending on the specific issue. These errors may not reach the target and are sent to the client by the gateway. Conversely, a request might pass through the gateway but be rejected by the target (for example, a 403 due to a payload validation issue at the backend). In the status code chart, both errors would appear as 403 and 401, while in the category chart they would be grouped under authentication errors. Thus, the status code view shows the distribution of error codes received by the client, independent of the error category, while the category view groups errors by their underlying cause.

Use this page as the starting point for debugging any API errors.

![Errors page showing the error category and status code views with charts and tables.](/img/manage/cloud/billing/usage-dashboards/error-page-full.png)

You can filter the information displayed in the widgets as follows:

| Filtering option | Description |
|---|---|
| **By API** | In the **API** field, select the APIs for which you want to view analytics. By default, all APIs are selected. You can select one or multiple APIs from this selector and view the aggregated result. |
| **By Category** | The **Category** field is displayed when you click **Category** in the upper-right corner of the page. In this field, you can select one or all of the following error categories:<br/>**Authentication**: Any kind of authentication error falls into this category, including expired, missing, or invalid credentials.<br/>**Target Connectivity**: Any kind of backend error falls into this category, including connection time-outs and other backend errors (for example, 4xx and 5xx status codes).<br/>**Throttling**: Any request that fails due to rate-limiting falls into this category, including application throttling and subscription throttling.<br/>**Other**: All other errors fall into this category, including mediation errors and resource-not-found errors. |
| **By Status Code** | The **Status Code** field is displayed when you click **Status Code** in the upper-right corner of the page. In this field, you can select all or any available HTTP status code categories (4xx, 5xx, etc.). These status codes represent the response status of the API Gateway. |

#### View errors by category

The following widgets are available for monitoring errors when you have selected **Category** in the upper-right corner of the page.

- This graph shows the error by category over time for the selected period. Apply the required filters as explained above to select the APIs and the error categories to which this content applies. When you select multiple APIs, the error count is grouped by category.

    ![Errors by category line graph.](/img/manage/cloud/billing/usage-dashboards/error-category-graph.png)

- This table provides further information about the errors, such as application details and the error reason. For some authentication errors, the application name is not available. You can use this table to get more concrete information about the errors related to your APIs and then start the problem identification.

    ![Errors by category table with application details and error reasons.](/img/manage/cloud/billing/usage-dashboards/error-category-table.png)

#### View errors by status code

The following widgets are available for monitoring errors when you select **Status Code** in the upper-right corner of the page.

- **Errors by Status Code**

    This graph shows the distribution of HTTP status codes received for errors over time for the selected period. Apply the required filters as explained above to select the APIs and status code groups to which this content applies. When you select multiple APIs, the error count is grouped by the status code.

    ![Errors by Status Code line graph.](/img/manage/cloud/billing/usage-dashboards/error-by-status-code.png)

- **Target Errors by Status Code**

    This graph shows the distribution of target errors that have occurred during the selected time interval by HTTP status code. Apply the required filters as explained in the table above to view the APIs and status code groups to which this content applies. If you select multiple APIs, the widget groups the target error count by the status code.

    ![Target Errors by Status Code line graph.](/img/manage/cloud/billing/usage-dashboards/target-error-by-status-code.png)

- **Errors**

    The Errors heat map shows the HTTP response codes of errors sent to the client by the API Gateway. Each row displays the number of times the system returned each status code for the selected APIs. The cell color is red for higher numbers and white for lower numbers. If required, you can further filter the results by the error code groups you identified with the **Errors by Status Code** graph.

    ![Errors heat map.](/img/manage/cloud/billing/usage-dashboards/error-heatmap.png)

- **Target Errors**

    The Target Errors heat map shows the HTTP response codes of errors that the API Gateway received from the backend. Each row displays the number of times the system returned each status code for the selected APIs. The cell color is red for higher numbers and white for lower numbers. If required, you can further filter the results by the error code groups you identified with the **Target Errors by Status Code** graph.

    ![Target Errors heat map.](/img/manage/cloud/billing/usage-dashboards/target-error-heatmap.png)

### Latency

The **Latency** page shows information related to the latency of API calls within the API management deployment. You can view a summary of the slowest APIs and then drill down into the API view for further analysis. Use this page as a starting point to debug API slowness.

![Latency page showing the top 10 slowest APIs and latency-by-category breakdowns.](/img/manage/cloud/billing/usage-dashboards/latency-page-full.png)

The information displayed is as follows:

- **Top 10 Slowest APIs**

    This widget allows you to identify the slowest APIs of the API management system at a glance. Since these are the APIs that contribute to the higher 95th percentile of the system, improving these APIs lowers the 95th percentile of latency in the API Management deployments.

    ![Top 10 Slowest APIs widget.](/img/manage/cloud/billing/usage-dashboards/slowest-apis.png)

- **Latencies By Category**

    This widget allows you to further drill down into the chart above. Use the API selector in this widget to select the slow API you identified in the earlier step and then analyze further. Use the charts available in the widget to view the 95th percentile and the median latency over the selected period of the following:

      - Backend
      - Request mediation
      - Response mediation

    ![Latencies By Category charts for backend, request mediation, and response mediation.](/img/manage/cloud/billing/usage-dashboards/latency-by-category.png)

    You can use these charts to further drill down and analyze whether the latency occurs in the backend, request mediation, or response mediation. Also, because you can see both the median and 95th percentile, you can easily identify whether the slowness is occurring on every request or whether it is intermittent.

### Cache

The **Cache** page shows statistics that indicate the efficiency with which response caching is carried out for the requests sent to your APIs.

![Cache page showing cache hit percentage and latency over time.](/img/manage/cloud/billing/usage-dashboards/cache-page-full.png)

The page displays the following statistics:

- **Cache Hit Percentage**

    This graph shows the percentage of requests the system has handled via the response cache over time, and the total hits over time. This information allows you to assess how efficiently the backend handles API requests. For example, if the cache hit rate is low, it may indicate that the backend generates the same response each time a specific request is sent instead of returning the response via the cache. In such a scenario, there is scope to improve performance via response caching.

    ![Cache Hit Percentage line graph.](/img/manage/cloud/billing/usage-dashboards/cache-statistics.png)

- **Latency**

    This section shows the total latency reported during the same time interval applied to the **Cache Hit Percentage** graph above.

    ![Cache Latency chart.](/img/manage/cloud/billing/usage-dashboards/cache-latency.png)

### Devices

The **Devices** page displays information about operating systems and HTTP agents that end users use to invoke the APIs. You can use this page to get an idea of the distribution of your user base and improve your APIs to match the audience.

![Devices page showing top platforms and top user agents.](/img/manage/cloud/billing/usage-dashboards/devices-page-full.png)

To filter the information displayed on this page by API, select the required APIs in the **API** field. **All** is selected by default.

The information displayed is as follows:

- **Top Platforms**

    This chart shows the breakdown of the API clients by operating system. The pie chart only shows platforms with a significant amount of requests. Other platforms are grouped under the **Other** category.

    ![Top Platforms pie chart.](/img/manage/cloud/billing/usage-dashboards/top-platforms.png)

- **Top User Agents**

    This chart shows the breakdown of the API clients by user-agent. The pie chart only shows user agents with a significant amount of requests. Other user agents are grouped under the **Other** category.

    ![Top User Agents pie chart.](/img/manage/cloud/billing/usage-dashboards/top-user-agents.png)

### Alerts

The **Alerts** page shows information related to business alerts issued by WSO2 Cloud for your currently selected environment and organization. You can use this page as a health monitoring dashboard and make it visible to your project team. On this page, you can drill down on each alert and discover possible anomalies in your published APIs. See the topics below for details of the available widgets and how to use them effectively.

![Alerts page showing the alert summary table and the top APIs by alert count.](/img/manage/cloud/billing/usage-dashboards/alerts-page-full.png)

**Prerequisites**

To use this page, configure alerts and have API invocations that trigger alerts.

Alerts are retained only for one week.

- **Alert Summary**

    This table lists each alert generated during the selected time interval. You can view the message of the alert by expanding the arrow icon on the details column. The drop-downs can be used to filter alerts based on the alert type and API.

    ![Alert Summary table.](/img/manage/cloud/billing/usage-dashboards/alert-summary.png)

- **Top APIs by Alert Count**

    This shows a pie chart and a table to visualize the alert distribution during the selected time interval.

    ![Top APIs by Alert Count pie chart and table.](/img/manage/cloud/billing/usage-dashboards/top-apis-by-alert-count.png)

### Reports

The **Reports** page allows you to download monthly usage reports for your system. There are preconfigured reports with system-wide statistics, and a custom report generator to generate reports based on a subset of APIs and applications.

![Reports page showing custom report download and pregenerated monthly reports.](/img/manage/cloud/billing/usage-dashboards/report-page-full.png)

#### Download custom reports

This widget allows you to generate a custom report for the statistics that have been generated up to now and download it.

![Custom report download widget with API, Consumer, Year, Month, and Download controls.](/img/manage/cloud/billing/usage-dashboards/custom-report.png)

To generate a custom report, follow the steps below:

1. In the **API** field, select one or more APIs for which you want to generate the report. If required, you can select all the APIs by selecting **All**.
2. If you need to further filter the content printed in the report, select one or more applications in the **Consumer** field. By default, all applications that have subscribed to one or more of the selected APIs are selected.

    :::tip
    If you want to filter the report content by the API consumer instead of the application, click the toggle switch to the right of the **Consumer** field, then select the required consumer. Only consumers who have subscribed to one or more of the selected APIs are displayed in the list. You can either select one or all of them.
    :::

3. Select the required year and the month in the **Year** and **Month** fields to specify the time interval for which you want to generate the report.
4. Click **Download** and select the required format.

The report is downloaded in the specified format.

The contents of the report are as follows:

| Item | Description |
|---|---|
| **Generated Time** | The date and the time the report was generated. |
| **Organization** | The organization to which the report applies. Each report always applies to a specific organization. |
| **Environment** | The environment to which the report applies. Each report always applies to a specific environment. |
| **Reporting period** | The time interval for which the report is generated. |
| **Total request count** | The total request count received by all selected APIs during the report time interval. |
| **Total successful requests** | The total count of successful requests received by all selected APIs during the report time interval. |
| **Total failed requests** | The total count of failed requests received by all selected APIs during the report time interval. |

The table in the report contains the following columns:

| Item | Description |
|---|---|
| **#** | The sequential number of the row. |
| **API** | The name of the API. |
| **Application** | The name of the application. The name of the subscriber is also provided within brackets. |
| **Total** | The total count of requests received by the API during the report time interval. |
| **Successes** | The count of successful requests received by the API during the report time interval. |
| **Failures** | The count of failed requests received by the API during the report time interval. |

#### Download pregenerated reports

The widgets shown below allow you to download monthly reports for the last three months.

![Pregenerated monthly reports widget with download buttons for the last three months.](/img/manage/cloud/billing/usage-dashboards/configured-report.png)

To download a pregenerated report, click **Download** for the relevant month, then click the required format.

### Custom reports

WSO2 Cloud usage insights allow you to generate custom reports to view important information and make timely decisions for the betterment of your business. With custom reports, you can generate reports for a set of metrics of your choice and aggregate results by specific fields. Once generated, the metrics can be filtered using any selected group-by filters. Custom reports can be visualized as over-time charts, pie charts, or tables.

#### Metrics

WSO2 Cloud usage insights allow you to retrieve data for the following metrics:

- Total Hit Count
- Response Cache Hit Count
- Request Mediation Latency
- Response Mediation Latency
- Backend Latency
- Total Latency
- API Error Count
- Target Error Count

#### Group-by

**Group-by** fields specify how to group the metric data. For example, you can select **Total Hit Count** in the **Metrics** field and **API Name** under **Group-by** to retrieve the total hit count grouped by API name.

WSO2 Cloud usage insights allow you to group metric data by the following fields:

- API Name
- API Version
- API Resource Template
- API Method
- API Creator
- Application
- Application Owner
- Destination
- User Agent
- Platform

#### Generate a custom report

To generate a custom report, follow the steps below:

1. Navigate to the **Usage Insights** page under **Insights**, then **Usage** in the left navigation menu.
2. In the left sub-navigation menu of **Usage Insights**, click **Custom Reports**.

    ![Custom Reports option in the Usage Insights left sub-navigation.](/img/manage/cloud/billing/usage-dashboards/custom-reports/custom-reports-step-1.png)

3. Select metrics from the **Metrics** drop-down selector.

    ![Custom report builder with the Metrics selector open.](/img/manage/cloud/billing/usage-dashboards/custom-reports/custom-reports-step-2-to-4.png)

4. Select between 1 and 3 group-by fields from the **Group By** drop-down selector.
5. Set the order of the group-by filters by drag-and-drop to determine the grouping order of the selected metrics.
6. Once you determine the order of the group-by fields, you can set values for each group-by field from the respective drop-down.

    ![Group-by field selection with values configured for each field.](/img/manage/cloud/billing/usage-dashboards/custom-reports/custom-reports-step-5.png)

7. Click **Generate**.

    ![Generated custom report displayed as a chart.](/img/manage/cloud/billing/usage-dashboards/custom-reports/custom-reports-step-6.png)

#### Download reports

WSO2 Cloud usage insights allow you to download report data for each chart as a **PDF** or a **CSV** file.

To do this, click the **Download** icon on the top-right of the relevant chart and select the required file format.

![Download icon on a custom report chart with PDF and CSV format options.](/img/manage/cloud/billing/usage-dashboards/custom-reports/custom-reports-step-7.png)

## What's next

- [Pricing and plans](./pricing-and-plans.md) — How WSO2 Cloud bills platform services and how to upgrade a service plan.
- [WSO2 Cloud overview](../overview.md) — How WSO2 Cloud manages your deployed integrations end to end.
