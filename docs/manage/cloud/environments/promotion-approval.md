---
title: Promotion approvals
---

# Promotion approvals

You can configure the **Environment Promotion** workflow to require an approval before any integration is promoted to the next environment. When the workflow is active, promotion requests are gated behind a review step, and the promotion only proceeds after an authorized reviewer approves the request.

## Enable the promotion approval workflow

1. In the top navigation, click your organization name to switch to the organization level.
2. In the left navigation, go to **Admin** > **Settings**.
3. On the **Settings** page, click the **Workflows** tab.
4. In the **Environment Promotion** row, click the toggle to enable the workflow.

    ![Workflows tab showing the Environment Promotion workflow](/img/manage/cloud/environments/promotion-approvals/enable-promotion-approval-workflow.png)

5. In the opened **Configure Workflow** dialog, specify who can review promotion requests.

    ![Configure Workflow dialog showing Roles and Assignees fields](/img/manage/cloud/environments/promotion-approvals/who-can-respond.png)

    | Field | Description |
    |---|---|
    | **Roles** | Select the roles whose members can review and respond to approval requests. |
    | **Assignees** | Optional. Select specific individuals within the chosen roles who can respond. |

    :::info
    You can also update these settings later by clicking the edit icon next to the workflow toggle.
    :::

6. Click **Save**.

## Request to promote

Once the workflow is enabled, the **Promote** button in the integration overview page changes to **Request to Promote**.

1. Open your integration from the project home.
2. On the integration overview page, click **Request to Promote** below the environment card.

    The **Request Approval** drawer opens.

    ![Request Approval drawer with a message field and Submit button](/img/manage/cloud/environments/promotion-approvals/requesting-to-promote.png)

3. Optionally, type a message for the reviewer.
4. Click **Submit**.

The reviewer receives an email notification with the promotion request details.

## Review a promotion request

Reviewers can act on pending requests from the organization-level **Approvals** page.

1. In the top navigation, click your organization name to switch to the organization level.
2. In the left navigation, go to **Admin** > **Approvals**.
3. On the **Pending** tab, locate the promotion request and click **Review**.

    The **Review Details** panel opens, showing the project name, integration name, source and target environments, build, and the requester's message.

    ![Approvals page with Review Details panel showing Approve and Reject buttons](/img/manage/cloud/environments/promotion-approvals/approving-promotion.png)

4. Optionally, type a comment.
5. Click **Approve** or **Reject**.

The requester receives an email notification with the outcome. If the request is approved, they can return to the integration overview page and click **Promote** to complete the promotion.
