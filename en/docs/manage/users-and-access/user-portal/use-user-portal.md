---
sidebar_position: 5
title: Run Available Integrations
description: "Find the integrations that your organization publishes to the User Portal, chat with AI agents, and run automations."
keywords: [choreo cloud, user portal, ai agents, chat, automations, runtime arguments]
slug: /manage/users-and-access/user-portal/use
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Run Available Integrations

After you [sign in](sign-in-to-user-portal.md), you see the integrations that your organization published to you. Your roles decide which integrations you see and what you can do with them. If you do not see an integration that you expect, or a button is disabled, contact your organization's administrator. See [Scopes](manage-users.md#scopes). This page explains how to find an integration and how to use each type:

- [Chat with an AI agent](#chat-with-an-ai-agent)
- [Run an automation](#run-an-automation)

## Find an integration

The **Overview** page shows the integrations published to you under **Your Integrations**. To see the integrations of one type, in the left navigation menu, under **Integrations**, click **AI Agents** or **Automations**.

<ThemedImage
    alt="Overview page of the User Portal with an automation under Your Integrations"
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

1. Click the automation on the **Overview** page or the **Automations** page.

    The automation page shows whether the automation runs on a schedule, and its **Runs**.

2. If the automation takes runtime arguments, the page shows a form. Enter a value for each field. Required fields are marked with an asterisk (`*`).

    <ThemedImage
        alt="Automation panel in the User Portal with a form for the automation's runtime arguments"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/automation-form.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/automation-form.png'),
        }}
    />

3. Click **Run**.

The run appears under **Runs**, with its status, start time, duration, and run ID.

<ThemedImage
    alt="Automation page in the User Portal with the Run button and a succeeded run under Runs"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/automation-run.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/automation-run.png'),
    }}
/>
