---
sidebar_position: 1
title: Voice Agent
description: Single-page reference for the Voice Agent Service in WSO2 Integrator. Attach an AI agent to a cloud voice listener, wire it into onChatMessage, and deploy it so callers can talk to it.
slug: /develop-and-test/integration-artifacts/ai-integrations/voice-agent
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Voice Agent

A **Voice Agent Service** exposes an [AI agent](../agents/agents.md) over a voice channel instead of a chat endpoint. WSO2 Integrator hosts the voice connection for you. Your service only handles the transcribed message and returns a text reply, the same way a Chat Agent Service does over HTTP.

## How it differs from a Chat Agent Service

| | Chat Agent Service | Voice Agent Service |
|---|---|---|
| Listener | `http:Listener` | `voice:CloudVoiceListener` |
| Service type | `http:Service` | `voice:VoiceService` |
| Handler | `resource function` per HTTP method | `remote function onChatMessage` |
| Input | HTTP request body | `voice:ChatMessage` (transcribed speech, with a session ID) |
| Output | HTTP response | A string, spoken back to the caller through text-to-speech |

Both wrap the same [`ai:Agent`](../agents/agents.md#components-of-an-ai-agent). Only the transport and the message shape differ.

## Create a Voice Agent Service

1. Open your integration project in WSO2 Integrator.
2. On the **Design** tab, select **Add Artifact manually** below the WSO2 Integrator Copilot's quick-start cards. Once the project already has an artifact, use **+ Add Artifact** in the top-right corner instead — it opens the same Artifacts page.

<ThemedImage
    alt="Artifacts page in WSO2 Integrator showing artifact categories Automation, Durable Workflow, AI Integration with Chat Agent Service, Durable Agentic Workflow, Voice Agent Service, and MCP Service, Integration as API with HTTP Service, GraphQL Service Beta, and TCP Service Beta, and Event Integration."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/01-artifacts-page-voice-agent-service-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/01-artifacts-page-voice-agent-service-v5.1.png'),
    }}
/>

3. Under **AI Integration**, select **Voice Agent Service**.
4. Attach the service to a new or existing cloud voice listener.

<ThemedImage
    alt="Create Voice Service form with Create New Listener selected, a Listener Name field set to voiceListener, and a Port field set to 8080 with a toggle between Number and Expression."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/02-create-voice-service-form-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/02-create-voice-service-form-v5.1.png'),
    }}
/>

| Field | Required | Description |
|---|---|---|
| **Listener Name** | Yes | Identifier for the voice listener, for example `voiceListener`. Reuse an existing listener instead if you already have one. |
| **Port** | Yes | The port the listener runs on, as a number or an expression that shares a port with another WebSocket service. |

5. Click **Create**. WSO2 Integrator generates a `voice:VoiceService` with one event handler, `onChatMessage`.

<ThemedImage
    alt="Voice Service editor showing Listener: voiceListener and an Event Handlers section listing a single event named onChatMessage."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/03-voice-service-editor-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/03-voice-service-editor-v5.1.png'),
    }}
/>

Opening `onChatMessage` shows an empty flow: **Start** connected directly to **Return `error("Not Implemented")`**. You wire the agent into this flow next.

## Wire an agent into onChatMessage

`onChatMessage` receives a `voice:ChatMessage` (the transcribed speech, with a session ID for the call) and must return the text to speak back to the caller.

1. On the `onChatMessage` flow, open the node panel and select **Agent** under the **AI** section.

<ThemedImage
    alt="Node panel on the onChatMessage flow with the AI section expanded, showing Direct LLM (Model Provider, Call Natural Function), RAG (Knowledge Base, Data Loader, Augment Query), and Agent, with a tooltip reading Create or reuse an Agent."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/04-node-panel-agent-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/04-node-panel-agent-v5.1.png'),
    }}
/>

2. Select an existing agent from the list, or create a new one. See [Creating an Agent](../agents/create-an-agent.md) for the system prompt, [tools](../agents/tools.md), and [memory](../agents/memory.md) steps — they're identical for a voice agent.

<ThemedImage
    alt="Agents picker listing one existing agent, mathTutorAgent, under an Agent section with a plus button to create a new one."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/05-agents-picker-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/05-agents-picker-v5.1.png'),
    }}
/>

3. Configure the node: bind **Query** to the incoming message, **Session ID** to the call's session, and name the **Result**.

<ThemedImage
    alt="AI Agent node configuration panel with Query set to message.message, Session ID set to message.sessionId, Context left at its default new record, and Result named response."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/06-ai-agent-config-panel-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/06-ai-agent-config-panel-v5.1.png'),
    }}
/>

4. Return the Result from the flow instead of the placeholder error.

<ThemedImage
    alt="onChatMessage flow showing Start connected to an agent colon run node calling mathTutorAgent and producing response, connected to a Return node that returns response."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/07-onchatmessage-wired-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/07-onchatmessage-wired-v5.1.png'),
    }}
/>

The agent itself is configured the same way regardless of channel. Opening `mathTutorAgent` shows the usual AI Agent canvas: a system prompt, a model provider, memory, and tools.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

<ThemedImage
    alt="mathTutorAgent AI Agent canvas showing a Math Tutor Assistant system prompt, ShortTermMemory, a connection to a model provider, and six tools: sumTool, subtractTool, multiplyTool, divideTool, messageToAdmin, and reportuserInfo."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/08-mathtutoragent-detail-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/08-mathtutoragent-detail-v5.1.png'),
    }}
/>

</TabItem>

<TabItem value="code" label="Ballerina Code">

The generated Ballerina source for a voice agent named `mathTutorAgent` is similar to the following:

```ballerina
import ballerinax/ai.wso2.integration as voice;
import ballerina/ai;
import ballerinax/ai.openai;

final openai:ModelProvider mathTutorModel =
    check new (accessToken, openai:GPT_4O_MINI);

final ai:ShortTermMemory aiShorttermmemory =
    check new (aiInmemoryshorttermmemorystore);

final ai:InMemoryShortTermMemoryStore aiInmemoryshorttermmemorystore =
    check new (20);

final ai:Agent mathTutorAgent = check new (
    systemPrompt = {
        role: string `Math Tutor Assistant`,
        instructions: string `You are a math tutor assistant.
Use the provided tools for every calculation.
Provide clear, step-by-step explanations.`
    },
    memory = aiShorttermmemory,
    model = mathTutorModel,
    tools = [sumTool, subtractTool, multiplyTool, divideTool]
);

listener voice:CloudVoiceListener voiceListener = new (8080);

isolated service voice:VoiceService on voiceListener {
    isolated remote function onChatMessage(voice:ChatMessage message)
            returns string|error {
        return check mathTutorAgent.run(message.message, message.sessionId);
    }
}
```

</TabItem>
</Tabs>

Pass `message.sessionId` as the session key so the agent's memory tracks each call separately. Without it, every caller shares the same conversation history.

## Deploy to WSO2 Cloud

The voice listener only accepts calls once it's deployed. From the project overview, under **Deployment Options**, the wired integration shows `voiceListener` connected to the Voice Service, which is connected to the agent's model provider:

<ThemedImage
    alt="Project overview canvas showing voiceListener connected to the Voice Service onChatMessage handler, which is connected to a mathTutorModel model provider, with a Deployment Options panel on the right offering Deploy to WSO2 Cloud, Deploy with Docker, and Deploy on a VM."
    sources={{
        light: useBaseUrl('/img/genai/develop/voice-agent-v5.1/09-design-canvas-deploy-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/voice-agent-v5.1/09-design-canvas-deploy-v5.1.png'),
    }}
/>

Click **Deploy** under **Deploy to WSO2 Cloud**, pick the organization and project, and connect a Git remote if the project doesn't have one yet. This flow is identical for every artifact type — see [Deploy to WSO2 Cloud from WSO2 Integrator](../../../../deploy-and-run/deploy-to-wso2-cloud/push-from-ide.md) for the full walkthrough (organization and project selection, initializing a repository, and publishing to GitHub).

Once deployed, WSO2 Cloud gives you a reachable address for the voice listener. Use it to connect your telephony or voice channel to the agent.

See [Deploy with Docker](../../../../deploy-and-run/self-hosted/containerized-deployment.md) or [Deploy on a VM](../../../../deploy-and-run/self-hosted/vm-deployment.md) for self-hosted alternatives.

## Common pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| Caller hears silence or a generic error. | `onChatMessage` still returns `error("Not Implemented")`. | Add the Agent node and return its result, as shown above. |
| Agent forgets earlier turns in the same call. | `message.sessionId` isn't passed to `agent.run()`, or no memory is attached. | Pass the session ID as the session key and attach a [memory store](../agents/memory.md). |
| Works locally but callers can't reach it. | The voice listener hasn't been deployed. | Deploy to WSO2 Cloud, Docker, or a VM. |

## What's next

- **[Creating an Agent](../agents/create-an-agent.md)** — System prompt, tools, and memory shared by every agent type.
- **[Tools](../agents/tools.md)** — Add functions, connectors, and integrations to the agent.
- **[Memory](../agents/memory.md)** — Configure conversational and persistent memory.
- **[Observability](../agents/observability.md)** — Monitor traces, logs, and execution details.
