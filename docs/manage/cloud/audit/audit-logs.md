---
title: Audit logs
---

# Audit logs

Audit logs, also called audit trails, enhance security, ensure compliance, provide operational insights, and help manage risks.

In WSO2 Cloud, an audit log records organization-level user-specific operations performed via the WSO2 Cloud Console. It also captures the timestamp and the outcome of the action.

WSO2 Cloud captures the following user-specific operations as audit logs:

- Project creation, update, and deletion.
- Integration creation, update, and deletion.
- Integration promotion initiation.
- Integration version creation.
- Integration deployment, redeployment, and undeployment initiation for all integrations.
- Integration as API access mode update.
- Enabling and disabling integration auto-deployment on commit.
- Integration endpoint creation, update, and deletion.
- Organization user management.
- On-premises key management.
- Project-level configuration management.

Organization administrators are allowed to view audit logs by default. If other members need to access organization-specific audit logs, the administrator can create a role with the relevant permissions and assign it to members. For step-by-step instructions, see [Manage audit log access](#manage-audit-log-access).

## View audit logs

To view audit logs, follow these steps:

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the WSO2 Cloud Console, go to the top navigation menu and click **Organization**.

    :::tip
    Currently, you can only view organization-level audit logs.
    :::

3. If you're using WSO2 Cloud as a Developer, click **Admin**, then click **Audit Logs**. If you're using WSO2 Cloud as a Platform Engineer, click **Observability**, then click **Audit Logs**.

    To view audit logs based on a specific time range and other requirements, you can apply the necessary filter criteria.

## Audit log retention

WSO2 Cloud retains audit logs for one year and archives them for an additional year. Therefore, the total retention period for audit logs is two years.

## Manage audit log access

Follow the steps below to create a role with audit log access permissions and assign it to organization members who need access to audit logs.

You must be the organization administrator to perform this action.

### Step 1: Create a role with audit log access permissions

1. In the WSO2 Cloud Console top navigation, click **Organization**.
2. In the left navigation menu, click **Admin**, then click **Settings**.
3. On the **Access Control** tab, click **Roles**, then click **+ Create Role**.
4. Enter a name and description for the role.

    ![Create Role dialog with name and description fields filled in.](/img/manage/cloud/audit/create-role-to-view-audit-logs.png)

5. Under the **Permissions** list, select **LOG-MANAGEMENT**.

    ![Permissions list with the LOG-MANAGEMENT permission selected.](/img/manage/cloud/audit/log-management-permission.png)

6. Click **Create**.

### Step 2: Create a group and assign the role and user to the group

1. On the **Access Control** tab, click **Groups**, then click **+ Create Group**.
2. Enter a name and description for the group, then click **Create**.

    ![Create Group dialog with name and description fields filled in.](/img/manage/cloud/audit/create-user-group.png)

3. On the **Groups** view, on the group you just created, click **Edit**.

    ![Groups list with the Edit option highlighted on the new group.](/img/manage/cloud/audit/edit-user-group.png)

4. Add the user to the group by clicking **+ Add Users**.
5. Assign the role you created in [Step 1](#step-1-create-a-role-with-audit-log-access-permissions) to the group.

    ![Edit Group panel showing assigned users and the audit log role attached to the group.](/img/manage/cloud/audit/assign-user-role-to-group.png)

    :::tip
    If you want to invite one or more users and add them to the Auditor group, follow these steps:

    1. Navigate to the **Users** tab under **Access Control**.
    2. Click **+ Invite Users**.
    3. In the **Emails** field, enter the email addresses of users you want to invite.
    4. Click **Groups** to expand the groups list. Select the group you created.
    5. Click **Invite**. This sends an invitation email to each address so the users can accept and obtain access to view audit logs.
    :::

## What's next

- [Runtime logs](../observability/runtime-logs.md) — Search, filter, and analyze runtime log output for your integrations.
- [WSO2 Cloud overview](../overview.md) — How WSO2 Cloud manages your deployed integrations end to end.
