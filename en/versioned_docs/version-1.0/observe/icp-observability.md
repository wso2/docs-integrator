---
sidebar_position: 4
title: ICP Observability Setup
description: View centralized logs and metrics for self-hosted agents in the Integration Control Plane console using Moesif or OpenSearch.
keywords: [wso2 agent builder, observability, icp, integration control plane, fluent bit, opensearch, logs, metrics]
slug: /observe/icp-observability
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# ICP Observability Setup

When your agents run on your own infrastructure, the [Integration Control Plane](product://integrator/icp) (ICP) can show their logs and metrics in one console, alongside health and runtime status. ICP reads this data from one of two observability providers: Moesif or OpenSearch. With OpenSearch, the data is populated by Fluent Bit tailing the runtime's log files.

<ThemedImage
    alt="The agent runtime writes app.log and metrics.log, which Fluent Bit ships to OpenSearch. The runtime also sends heartbeats to the ICP server, which queries OpenSearch. The ICP console reads logs, metrics, and health from the ICP server"
    sources={{
        light: useBaseUrl('/img/observe/icp-observability-v1.0.png'),
        dark: useBaseUrl('/img/observe/icp-observability-v1.0.png'),
    }}
/>

Setting up OpenSearch involves four steps:

1. Deploy OpenSearch.
2. Create the index templates for logs and metrics.
3. Configure the agent to write structured logs and metrics.
4. Set up Fluent Bit to ship the logs to OpenSearch.

:::info Complete guide
The full step-by-step procedure, including commands and configuration, is in [Observability setup](product://integrator/icp/observability-setup) in the Integration Control Plane section.
:::

## Related

- [Logging](logging.md), [Metrics](metrics.md), and [Distributed Tracing](tracing.md) — instrument the agent itself.
- [OpenSearch](open-source/opensearch.md) — use OpenSearch as a general-purpose log analytics backend.
- [Connect an agent to ICP](product://integrator/icp/connect-runtime) — a prerequisite for viewing data in the console.
