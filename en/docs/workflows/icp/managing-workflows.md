---
title: "Manage Workflows with the Integration Control Plane"
description: Monitor durable workflow executions, decide human tasks and reviews, and control running instances from the WSO2 Integration Control Plane.
keywords: [wso2 integrator, integration control plane, icp, workflow monitoring, human task, review activity, workflow permissions]
---

# Manage Workflows with the Integration Control Plane

The **Integration Control Plane (ICP)** is where running workflows meet their humans. Operations teams watch executions and intervene, and business users decide the tasks and reviews that workflows are waiting on. Everything is gated by role-based access, so each person sees only the work that belongs to them.

This page explains where workflow management lives in the console, how the console maps to your projects and integrations, and which permissions control each view. The pages linked at the end cover each task in detail.

:::info Prerequisites

- An ICP server that is running and reachable ([Install ICP](../../manage/icp/install-icp.md))
- An integration with durable workflows whose runtime is registered with workflow management enabled ([Connect a workflow runtime](connect-runtime.md))
:::

## Where workflow management lives

Workflow management appears as a **Workflows** item in the ICP sidebar at two levels.

| Level | Path | What it covers |
| --- | --- | --- |
| Project | **Projects** > *project* > **Workflows** | Every workflow execution, task, and review in the project, across all its integrations. |
| Integration | **Projects** > *project* > **Integrations** > *integration* > **Workflows** | Only the executions, tasks, and reviews owned by that one integration. |

The integration-level item appears only for integrations created with the **Workflow** integration type. The project-level item is always available, because a project's workflow data is shared across its integrations rather than tied to any single one.

Pick the environment you want to work in from the **Environment** selector at the top right of the page. Every list on the page reads from the runtime registered for that environment.

## The three views

The **Workflows** page has three tabs. Each one is a separate task, and each is gated by its own permission.

| Tab | What you do there | Details |
| --- | --- | --- |
| **My Tasks** | Complete or fail the human tasks that your roles allow you to decide. | [Complete human tasks](human-tasks.md) |
| **Review Activities** | Approve, correct, or reject an activity before it runs or after it fails. | [Review activities](review-activities.md) |
| **Workflow Executions** | Browse executions, inspect the timeline and execution graph, start new workflows, and suspend, resume, cancel, or terminate a run. | [Workflow executions](executions.md) and [Start a workflow](start-workflow.md) |

**My Tasks** and **Review Activities** carry a badge with the amount of work waiting for you. Both counts refresh every 30 seconds. The review badge shows `50+` when there are more pending reviews than one page can report.

## How the console maps to your integrations

Every runtime in a project registers with the same workflow namespace, and each integration identifies itself with a task queue that matches its ICP integration handle. Two things follow from this.

- **One runtime answers for the whole project.** The project-level view does not call every integration. It reads through one running runtime and narrows the result by task queue.
- **Every row knows its owner.** A task, review, or execution carries the task queue it came from, so the console shows the owning integration in an **Integration** column and sends any action you take back to the right runtime.

At project level you can narrow any list to a single integration with the **Integration** filter. At integration level the filter is not shown, because the view is already scoped to one task queue.

:::note
Workflow management is enabled per runtime, not per integration type. If you enable it on a runtime whose integration is not typed as **Workflow**, its executions still appear in the project-level view, but the integration does not get its own **Workflows** item in the sidebar.
:::

## Permissions

Workflow management adds four permissions in the **Workflow-Management** domain. Assign them through roles and groups, the same way as every other ICP permission. See [Access control](../../manage/icp/access-control.md) for the model.

| Permission | Allows |
| --- | --- |
| `workflow_mgt:view_human_tasks` | View human tasks. |
| `workflow_mgt:manage_human_tasks` | Complete and fail human tasks. |
| `workflow_mgt:view_workflows` | View workflow executions and review activities. |
| `workflow_mgt:manage_workflows` | Start, suspend, resume, cancel, and terminate executions, and decide review activities. |

Each tab is gated on these permissions:

- **My Tasks** requires `view_human_tasks` or `manage_human_tasks`.
- **Review Activities** and **Workflow Executions** require `view_workflows` or `manage_workflows`.

If you hold none of them, the page reports that you do not have permission to view workflows.

### Default role grants

| Role | Human tasks | Workflow executions |
| --- | --- | --- |
| Super Admin, Admin, Project Admin | View and manage | View and manage |
| Developer | View and manage | View only |
| Viewer | View only | No access |

:::warning Project-scope access
The project-level **Workflows** page checks permissions granted at project level or above. A user whose workflow permissions were granted only on individual integrations does not pass that check and must use the integration-level page instead.
:::

## How roles decide who sees a task

Permissions decide who can open the workflow views. **Roles** decide which tasks and reviews appear inside them.

When you open a task list, ICP forwards your ICP role names to the runtime, and the runtime returns only the tasks whose eligible roles include one of them. Matching is an exact, case-sensitive comparison of role names, so a task declared for `manager` in the workflow code is visible only to users holding an ICP role named exactly `manager`.

```ballerina
RequestDecision request = check ctx->awaitHumanTask("checkExpenseRequest", "manager",
        payload = {"claimId": claim.claimId, "amount": claim.amount});
```

Create the ICP roles your workflows name (`manager`, `finance`, `support-lead`, and so on), grant them the workflow permissions above, and map them to the groups whose members should decide those tasks.

:::tip
Super admins are also given a synthetic `admin` role when calls reach the runtime. That role matches only tasks and reviews that explicitly declare `admin`, so it is not a way to see everything.
:::

## What's next

- [Connect a workflow runtime](connect-runtime.md) — register a runtime so its workflows appear in the console
- [Start a workflow](start-workflow.md) — launch a new execution from the console
- [Workflow executions](executions.md) — read the timeline, execution graph, and history of a run
- [Complete human tasks](human-tasks.md) — decide the tasks waiting on your roles
- [Review activities](review-activities.md) — approve, correct, or reject a gated or failed activity
- [Management API](../reference/management-api.md) — the REST API behind every view on this page
