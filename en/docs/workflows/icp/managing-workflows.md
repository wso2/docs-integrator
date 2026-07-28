---
sidebar_position: 1
title: "Manage Workflows with the Control Plane"
description: Monitor durable workflow instances, decide human tasks and reviews, and control running workflows from the WSO2 Integration Control Plane.
keywords: [wso2 integrator, integration control plane, icp, task inbox, human task, review activity, workflow monitoring]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Manage Workflows with the Integration Control Plane

The **Integration Control Plane (ICP)** is where running workflows meet their humans: operations teams watch instances and intervene, and business users decide the tasks and reviews workflows are waiting on — all through role-based access.

## Connect your integration

Add the Control Plane runtime bridge to the integration and configure it in `Config.toml`:

```toml
[wso2.icp.runtime.bridge]
environment = "dev"
project = "expense"
integration = "expense-approval"
runtime = "default"
secret = "<ICP_RUNTIME_SECRET>"

[ballerina.workflow.management]
enableManagementApi = true
```

The integration registers itself with the Control Plane on startup; its workflows, tasks, and reviews appear under the configured project.

<ThemedImage
    alt="Integration Control Plane showing the registered integration with its workflows"
    sources={{
        light: useBaseUrl('/img/workflows/icp/01-registered-integration.png'),
        dark: useBaseUrl('/img/workflows/icp/01-registered-integration.png'),
    }}
/>

## Users and roles

Task and review visibility is role-based: a task created for the `manager` role is only visible to — and decidable by — users holding that role. Set up Control Plane users with the roles your workflows name (`manager`, `finance`, `support-lead`, …) and the workflow-management permissions (view workflows, view/manage human tasks).

## Monitor workflow instances

The workflow list shows every instance with its status — **Running**, **Suspended**, **Completed**, **Failed** — and each instance opens into:

- **Execution graph** — the steps the instance has taken, and crucially **where it is halted right now**: a pending human task, a review awaiting a decision, or a **waiting data event** shown as a receiving node named after the event.
- **History** — the full recorded event history for auditing and debugging.

<ThemedImage
    alt="Execution graph of a running workflow halted on a waiting data event"
    sources={{
        light: useBaseUrl('/img/workflows/icp/02-execution-graph.png'),
        dark: useBaseUrl('/img/workflows/icp/02-execution-graph.png'),
    }}
/>

## The task inbox

The inbox lists everything waiting on the signed-in user's roles:

- **Human tasks** — rendered as forms generated from the task's typed decision record (enums become dropdowns). Submit to resume the workflow with the decision.
- **Approval reviews** — a gated activity's *proposed* input, before it runs: **Proceed**, **Proceed with input** (edit the values), or **Reject**.
- **Retry reviews** — a failed activity's input and error: retry as-is, retry with corrected input, or fail the step.

<ThemedImage
    alt="Task inbox listing a human task and a payment approval review"
    sources={{
        light: useBaseUrl('/img/workflows/icp/03-task-inbox.png'),
        dark: useBaseUrl('/img/workflows/icp/03-task-inbox.png'),
    }}
/>

## Control running instances

From an instance's page, operators can:

| Action | Effect |
| --- | --- |
| **Suspend** | Pause the instance; it holds its exact position. |
| **Resume** | Continue a suspended instance from where it paused. |
| **Terminate** | Stop immediately, without cleanup. |
| **Cancel** | Request a graceful stop the workflow can react to. |

## Programmatic access

Everything the Control Plane shows is served by the integration's [Management API](../reference/management-api.md) — build custom portals or automations on the same endpoints.
