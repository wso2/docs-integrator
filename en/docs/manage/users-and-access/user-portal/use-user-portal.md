---
sidebar_position: 4
title: Use the User Portal
description: "Find the integrations that your organization publishes to the User Portal, chat with AI agents, and run automations."
keywords: [choreo cloud, user portal, ai agents, chat, automations, runtime arguments]
slug: /manage/users-and-access/user-portal/use
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Use the User Portal

After you [sign in to the User Portal](sign-in-to-user-portal.md), you see the integrations that your organization published to you. Your roles decide which integrations you see and what you can do with them. If you do not see an integration that you expect, or a button is disabled, contact your organization's administrator. See [Scopes](manage-users.md#scopes). This page explains how to find an integration and how to use each type:

- [Chat with an AI agent](#chat-with-an-ai-agent)
- [Run an automation](#run-an-automation)

## Find an integration

The **Integrations** tab shows the integrations published to you. To narrow the list, search by name, description, or project, or click the filter icon to filter by type or project.

<ThemedImage
    alt="Integrations tab of the User Portal with an AI agent and an automation"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/integration-list.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/integration-list.png'),
    }}
/>

## Chat with an AI agent

On the **Integrations** tab, find the AI agent and click **Chat**. The chat panel opens on the right, where you can send messages to the agent.

<ThemedImage
    alt="Chat panel in the User Portal with a conversation with an AI agent"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/agent-chat.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/agent-chat.png'),
    }}
/>

## Run an automation

1. On the **Integrations** tab, find the automation and click **Execute**. For an automation that runs on a schedule, the button is **Execute Now**.

    The automation panel opens on the right. It shows the following:

    - **Last run**: When the automation last ran and whether it succeeded, failed, or is still running. If it never ran, the panel shows **No previous runs**.
    - **Next run**: When the automation runs next and its schedule. If it does not run on a schedule, the panel shows **Not scheduled**.

2. If the automation takes runtime arguments, the panel shows a form. Enter a value for each field. Required fields are marked with an asterisk (`*`).

    <ThemedImage
        alt="Automation panel in the User Portal with a form for the automation's runtime arguments"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/automation-form.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/automation-form.png'),
        }}
    />

3. Click **Execute**. The button is available after you fill in every required field. If you do not have permission to run the automation, the button is disabled.

The panel closes, and the automation runs on its latest deployment track.
