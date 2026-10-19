---
title: Workflow Permissions
---

# Workflow Permissions

The **Workflows** and **Human Tasks** views in the Integration Control Plane are gated by role-based access, so each person sees only the work that belongs to them. This page covers the permissions that open each view and the roles that carry them by default.

## The Workflow-Management permissions

Workflow management adds four permissions in the **Workflow-Management** domain. Assign them through roles and groups, the same way as every other ICP permission. See [Access control](../access-control.md) for the model.

| Permission                        | Allows                                                                                            |
|-----------------------------------|---------------------------------------------------------------------------------------------------|
| `workflow_mgt:view_workflows`     | View workflow executions and review activities.                                                   |
| `workflow_mgt:manage_workflows`   | Start, suspend, resume, cancel, and terminate workflow executions, and decide review activities.  |
| `workflow_mgt:view_human_tasks`   | View human tasks and review activities.                                                           |
| `workflow_mgt:manage_human_tasks` | Complete, fail, and cancel human tasks, reassign them and change their deadlines, and decide review activities. |

## Default role grants

| Role                              | Human tasks     | Workflow executions |
|-----------------------------------|-----------------|---------------------|
| Super Admin, Admin, Project Admin | View and manage | View and manage     |
| Developer                         | View and manage | View only           |
| Viewer                            | View only       | No access           |

:::warning Project-scope access
The project-level **Workflows** and **Human Tasks** pages check permissions granted at project level or above. A user whose workflow permissions were granted only on individual integrations does not pass that check and must use the integration-level page instead.

## How roles decide who sees a task

:::note Permissions open the view, roles fill it
Permissions decide who can open the workflow views. **Roles** decide which tasks and reviews appear inside them.

When you open a task list, ICP forwards your ICP role names to the runtime, together with your username, and the runtime returns only the tasks whose eligible roles include one of them, or that name you as a user or an administrator. Matching is an exact, case-sensitive comparison of role names, so a task declared for `manager` in the workflow code is visible only to users holding an ICP role named exactly `manager`.

```ballerina
RequestDecision request = check ctx->awaitHumanTask("checkExpenseRequest",
        {"claimId": claim.claimId, "amount": claim.amount}, userRoles = "manager");
```

Create the ICP roles that are required to complete the human task (`manager`, `finance`, `support-lead`, and so on), grant them the workflow permissions above, and map them to the groups whose members should decide those tasks.

Super admins are also given a synthetic `admin` role when calls reach the runtime. That role matches only tasks and reviews that explicitly declare `admin`, so it is not a way to see everything.

## What's next

- [Workflow executions](workflow-executions.md) — browse runs, read the timeline, and control a running instance
- [Access control](../access-control.md) — roles, groups, and mappings in ICP
- [Complete human tasks](complete-human-tasks.md) — decide the tasks and reviews these permissions gate
