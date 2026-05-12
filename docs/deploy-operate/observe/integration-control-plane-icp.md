---
title: Integration Control Plane (ICP)
---

# Integration Control Plane (ICP)

The Integration Control Plane (ICP) is a centralized dashboard for monitoring, managing, and troubleshooting running WSO2 Integrator integrations.

## Overview

The ICP provides a single pane of glass for all your deployed integrations, regardless of whether they run on Kubernetes, VMs, or WSO2 Devant. It collects runtime data from connected integration nodes and presents it through a web-based dashboard and a GraphQL API.

Key capabilities:

- **Service inventory** -- View all running integrations, their versions, and deployment status
- **Real-time monitoring** -- Observe request rates, error rates, and latency for each service
- **Log aggregation** -- View logs from connected integrations without accessing individual nodes
- **Configuration management** -- Inspect and update runtime configuration
- **Health status** -- See the health of each instance
- **Deployment history** -- Track when services were deployed or updated

### Configuring the integration node with ICP

ICP allows you to connect BI and MI runtimes to the ICP server for centralized management and monitoring.
This guide will walk you through the steps to connect your integration runtime to the ICP server.

1. Navigate to the home view of WSO2 Integrator.
2. Select the **Enable ICP monitoring** checkbox under the **Integration Control Plane** section.

   ![ICP Enable Checkbox](/img/deploy-operate/observe/icp-enable.png)

3. Enabling ICP monitoring will generate and add the following configurations to your runtime.

```toml
[wso2.icp.runtime.bridge]
environment = "dev"
project = "<project name>"
integration = "<integration name>"
runtime = "<unique id for the runtime>"
secret = "<your-secret-here>"
# serverUrl="https://<hostname>:9445"
```

Remote management will be enabled in the `Ballerina.toml` file.

```toml
[build-options]
remoteManagement = true
```

The `wso2.icp.runtime.bridge` package will be imported into the integration entrypoint.

```ballerina
import wso2/icp.runtime.bridge as _;
```

4. Click the **View in ICP** button to start and connect the integration runtime to the ICP server.
5. The ICP server will start on `https://localhost:9446`.

### Browsing the ICP

1. Navigate to `https://localhost:9446` in your browser.
2. Enter the default username (`admin`) and password (`admin`), then click the **Sign In** button.

   :::caution Security Recommendation
   Default credentials must be changed before using ICP in production. Update the admin password account through **Profile > Change Password** in the ICP dashboard.
   :::

3. The project will be displayed on the **Home** page of the ICP dashboard.

   ![ICP Projects Dashboard](/img/deploy-operate/observe/icp-projects.png)

4. Click on the project to view the integrations.

   ![ICP Integrations View](/img/deploy-operate/observe/icp-integrations.png)

5. Click on an integration to view integration artifacts.

   ![ICP Integration Artifacts](/img/deploy-operate/observe/icp-artifacts.png)

## What's next

- [Logging](logging.md) -- Configure structured logging
- [Metrics](metrics.md) -- Prometheus metrics and Grafana dashboards
- [Distributed Tracing](tracing.md) -- Trace requests across services
- [Observability Setup](../../manage/icp/observability-setup.md) -- Set up centralized logs and metrics monitoring
