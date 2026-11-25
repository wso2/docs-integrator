---
sidebar_position: 2
title: "Traces"
description: "View distributed traces for integrations deployed on Choreo Integration."
keywords: [choreo integrator, choreo cloud, traces, distributed tracing, observability]
slug: /observe/traces
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Traces

Traces show the path a request takes through an integration, broken down into spans. Use traces to see how long each step took and where a failed request broke down.

## Access traces

Open your integration, then go to **Observe** > **Traces** in the left navigation.

The page opens with summary cards for **Total traces**, **Error traces**, **Spans**, and **Services (sampled)**, followed by a **Spans per service** chart. Use the checkboxes next to each service to show or hide its series on the chart.

<ThemedImage
    alt="Traces page showing summary cards and the Spans per service chart"
    sources={{
        light: useBaseUrl('/img/observe/cloud/traces/traces-summary.png'),
        dark: useBaseUrl('/img/observe/cloud/traces/traces-summary.png'),
    }}
/>

Below the chart, **Traces by service** summarizes each service's trace count, error count, and average / p95 duration, and **Traces through** lists individual traces with their trace ID, operation, start time, span count, duration, and status.

<ThemedImage
    alt="Traces by service summary and the list of individual traces"
    sources={{
        light: useBaseUrl('/img/observe/cloud/traces/traces-list.png'),
        dark: useBaseUrl('/img/observe/cloud/traces/traces-list.png'),
    }}
/>

## Inspect a trace

Click a trace row to expand it and see its spans as duration bars. Click a span bar to see its full set of attributes, including identifiers like `span.id` and `span.kind`, entrypoint details (`entrypoint.function.module`, `entrypoint.function.name`, `entrypoint.resource.accessor`, `entrypoint.service.name`), and protocol details (`http.method`, `http.status_code`, `http.url`, `listener.name`, `protocol`).

<ThemedImage
    alt="Expanded trace showing its span as a duration bar and the span's attribute list"
    sources={{
        light: useBaseUrl('/img/observe/cloud/traces/trace-expanded.png'),
        dark: useBaseUrl('/img/observe/cloud/traces/trace-expanded.png'),
    }}
/>

{/* TODO(v3): only single-span traces were available to verify against (one
    service, Hello World Service). Multi-span traces across several services,
    and any trace-level filtering (by status, duration, or time range) beyond
    what's shown above, are unverified. Re-verify with a multi-service
    integration. */}
