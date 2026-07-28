---
sidebar_position: 1
title: "Management API"
description: REST API reference for managing WSO2 Integrator durable workflows — instances, execution graphs, human tasks, and review activities.
keywords: [wso2 integrator, durable workflow, management api, rest, human task api, review activity api]
---

# Management API

Every integration with durable workflows can expose a **Management API** — the same REST surface the [Integration Control Plane](../icp/managing-workflows.md) uses. Enable it to build custom portals, automations, or operational tooling.

## Enable and configure

```toml
[ballerina.workflow.management]
enableManagementApi = true
port = 8234                    # default
enableApiKey = true            # optional API-key protection
apiKeyValue = "<key>"
apiKeyHeader = "x-api-key"
```

Base URL: `http://<host>:8234/workflow`

### Caller identity headers

| Header | Purpose |
| --- | --- |
| `x-user-id` | Recorded in audit fields (`completedBy`, `decidedBy`). |
| `x-user-roles` | Comma-separated roles; tasks and reviews are filtered and authorized against them. |

## Workflow instances

| Method & path | Description |
| --- | --- |
| `GET /workflows` | List instances. Filters: `status` (`RUNNING`, `SUSPENDED`, `COMPLETED`, `FAILED`, …), `workflowType`, `workflowId` prefix, time bounds, pagination (`limit`, `pageToken`). |
| `GET /workflows/{workflowId}` | Instance detail: type, status, result, and activity invocations. |
| `GET /workflows/{workflowId}/history` | Full recorded event history. |
| `GET /workflows/{workflowId}/execution-graph` | Nodes and edges of the execution so far. Node types: `ACTIVITY`, `TIMER`, `DATA`, `CHILD_WORKFLOW`, `HUMAN_TASK`, `REVIEW_ACTIVITY`. A `DATA` node with status `WAITING` marks a data event the workflow is currently blocked on. |
| `GET /workflows/{workflowId}/activity-tree` | The same execution as a tree of typed nodes with inputs, outputs, and attempts. |
| `POST /workflows/{workflowId}/suspend` | Pause the instance. |
| `POST /workflows/{workflowId}/resume` | Resume a suspended instance. |
| `POST /workflows/{workflowId}/terminate` | Stop immediately (no cleanup). |
| `POST /workflows/{workflowId}/cancel` | Request graceful cancellation. |
| `POST /workflows` | Start a workflow by type: `{"workflowType": "...", "input": {…}}`. |
| `GET /definitions` | The workflow types this integration registers, for launcher UIs. |

Run-scoped variants exist for detail, control, history, activity-tree, and execution-graph:
append `/{runId}` (for example `GET /workflows/{workflowId}/{runId}/execution-graph`).

### Example: find where an instance is halted

```bash
curl -s http://localhost:8234/workflow/workflows/<id>/execution-graph \
  -H 'x-user-roles: manager' | jq '.nodes[] | select(.status=="WAITING" or .status=="RUNNING")'
```

## Human tasks

| Method & path | Description |
| --- | --- |
| `GET /human-tasks` | List tasks; filters: `status` (`PENDING`, `COMPLETED`, …), `parentWorkflowId`, `taskName`, time bounds, pagination. Visibility is filtered by `x-user-roles`. |
| `GET /human-tasks/pending-count` | Pending-task count for the caller's roles (inbox badges). |
| `GET /human-tasks/{taskId}` | Task detail: title, description, payload, roles, and the decision form's JSON schema. |
| `POST /human-tasks/{taskId}/complete` | Complete with `{"result": {…}}` matching the task's decision type. |
| `POST /human-tasks/{taskId}/fail` | Fail the task with a reason. |

```bash
curl -s -X POST http://localhost:8234/workflow/human-tasks/<taskId>/complete \
  -H 'Content-Type: application/json' -H 'x-user-id: alice' -H 'x-user-roles: manager' \
  -d '{"result": {"action": "REQUEST_BILL", "comment": "Please attach the receipts"}}'
```

## Review activities

Approval gates (before a gated step runs) and retry reviews (after a step fails) share one surface:

| Method & path | Description |
| --- | --- |
| `GET /review-activities` | List reviews; same filters and role-based visibility as human tasks. |
| `GET /review-activities/{taskId}` | Review detail: the activity, its (proposed or failing) input, the error for failure reviews, and the input form's JSON schema. |
| `POST /review-activities/{taskId}/proceed` | Run/rerun with the original input. |
| `POST /review-activities/{taskId}/proceed-with-input` | Run/rerun with corrected input: `{"input": {…}}`. |
| `POST /review-activities/{taskId}/reject` | Skip the gated call, or surface the failure to the workflow. |

```bash
curl -s -X POST http://localhost:8234/workflow/review-activities/<taskId>/proceed-with-input \
  -H 'Content-Type: application/json' -H 'x-user-id: alice' -H 'x-user-roles: manager' \
  -d '{"input": {"claimId": "EXP-1", "amount": 180.50, "currency": "EUR"}}'
```

:::info Role-based visibility
A task or review that declares roles is only listed for — and decidable by — callers whose `x-user-roles` include one of them. Reviews created without roles can optionally be restricted with the `reviewActivityAccessRole` configuration.
:::

