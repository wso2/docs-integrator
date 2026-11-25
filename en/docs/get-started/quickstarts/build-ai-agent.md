---
sidebar_position: 3
title: "Build an AI Agent"
description: Build an intelligent agent using LLMs and tools, and expose it via a chat interface.
keywords: [choreo integrator, ai agent, llm, chat agent, genai, quick start, ballerina ai]
slug: /get-started/quickstarts/build-ai-agent
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Build an AI Agent

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An AI agent that connects to an LLM, uses tools, and responds to user queries in chat.</>}
/>

An AI agent uses an LLM to reason about user queries and call tools to retrieve information or perform actions. This quick start shows the full cycle: create a project, add an AI Chat Agent artifact, configure its instructions, and test it in the built-in chat panel.

<Prerequisites>

## Prerequisites

A working Choreo Integrator environment.

<div style={{gridColumn: '1 / -1', minWidth: 0}}>
<PrereqCard icon="cloud" title="Choreo Cloud setup" href="/get-started/setup">Sign up and launch Choreo Integrator in the browser-based cloud editor.</PrereqCard>
</div>

</Prerequisites>

<Steps>

## Step 1: Create the integration

1. On the project overview page, click **Open Cloud Editor**.

   <ThemedImage
       alt="How would you like to create your integration page with Open Cloud Editor highlighted under Create on Cloud"
       sources={{
           light: useBaseUrl('/img/get-started/quickstarts/open-cloud-editor.png'),
           dark: useBaseUrl('/img/get-started/quickstarts/open-cloud-editor.png'),
       }}
   />

2. The Choreo Integrator cloud editor opens in your browser.

   <ThemedImage
    alt="Cloud editor landing page with Choreo Integrator Copilot, the Add Artifact manually button, and the Deploy to Choreo Cloud panel"
    sources={{
        light: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
        dark: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
    }}
    />

:::info Note
The cloud editor creates a default integration for you, so you don't need to name it now. You can change its name when you deploy it. For more information, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).
:::

## Step 2: Add an AI chat agent

1. In the design view, click **Add Artifact manually**.

   <ThemedImage
       alt="Integration design view with the Add Artifact manually button highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
       }}
   />

2. Select **Chat Agent Service** under **AI Integration**.

   <ThemedImage
       alt="Artifacts page with Chat Agent Service highlighted under AI Integration"
       sources={{
           light: useBaseUrl('/img/get-started/build-ai-agent/select-ai-agent.png'),
           dark: useBaseUrl('/img/get-started/build-ai-agent/select-ai-agent.png'),
       }}
   />

3. The **Create Chat Agent Service** form opens. Set **Role** to `ChoreoIntegratorAssistant`.

4. Set **Instructions** to:

   ```text
   You are a highly skilled Choreo Integration Architect. Your goal is to assist developers in building, debugging, and optimizing integration flows.
   ```

   <ThemedImage
       alt="Create Chat Agent Service form with Role and Instructions filled in"
       sources={{
           light: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-1.png'),
           dark: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-1.png'),
       }}
   />

5. Leave the remaining configuration fields at their default values.

6. Scroll down to **Advanced Configurations** at the bottom of the form, and set **Agent Name** to `ChoreoIntegratorAssistant`.

7. Click **Create**.

   <ThemedImage
       alt="Bottom of the Create Chat Agent Service form with Agent Name set to ChoreoIntegratorAssistant"
       sources={{
           light: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-2.png'),
           dark: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-2.png'),
       }}
   />

:::tip Default model provider

By default, the agent is configured to use the **Default Choreo Model Provider**. If you want to use a different LLM, see [Model providers](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md) for the full list of supported providers (OpenAI, Azure OpenAI, Anthropic, and others).

If you are using the Default Choreo Model Provider, the access token is obtained through [Choreo Integrator Copilot](../../editor/copilot/copilot.md). If you have not already signed in, you will be prompted to do so.
:::

## Step 3: Run and test

1. Click **Run**.

2. Click **Test** in the pop-up. The chat panel opens.

3. Type `Hello` to check that the agent replies.

   <ThemedImage
       alt="Running the agent, clicking Test in the pop-up, and chatting with the agent in the chat panel"
       sources={{
           light: useBaseUrl('/img/get-started/build-ai-agent/run-and-test.gif'),
           dark: useBaseUrl('/img/get-started/build-ai-agent/run-and-test.gif'),
       }}
   />

## Step 4: Deploy to Choreo Cloud

<br />

To deploy your integration to Choreo Cloud from the cloud editor, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

<div class="skip-ahead-card">

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? Deploy the <strong>AI Chat Agent</strong> sample straight to Choreo Cloud. See <a href={useBaseUrl('/develop-and-test/create-workspace/start-with-sample-integrations')}>Start with sample integrations</a>.</p>
  <ThemedImage
      alt="Browse samples page filtered by AI Agent with the AI Chat Agent sample highlighted"
      sources={{
          light: useBaseUrl('/img/get-started/build-ai-agent/browse-samples-ai-chat-agent.png'),
          dark: useBaseUrl('/img/get-started/build-ai-agent/browse-samples-ai-chat-agent.png'),
      }}
  />
</PaletteCard>

</div>

</Steps>

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate two files: `agents.bal` for the agent definition and `main.bal` for the listener and service.

**`agents.bal`**

```ballerina
import ballerina/ai;

final ai:Agent choreoIntegratorAssistantAgent = check new (
    systemPrompt = {
        role: string `ChoreoIntegratorAssistant`,
        instructions: string `You are a highly skilled Choreo Integration Architect. Your goal is to assist developers in building, debugging, and optimizing integration flows.`
    },
    model = wso2ModelProvider,
    tools = []
);
```

**`main.bal`**

```ballerina
import ballerina/ai;
import ballerina/http;

listener ai:Listener chatAgentListener = new (listenOn = check http:getDefaultListener());

service /choreoIntegratorAssistant on chatAgentListener {
    resource function post chat(@http:Payload ai:ChatReqMessage request) returns ai:ChatRespMessage|error {
        string stringResult = check choreoIntegratorAssistantAgent.run(request.message, request.sessionId);
        return {message: stringResult};
    }
}
```

</details>
