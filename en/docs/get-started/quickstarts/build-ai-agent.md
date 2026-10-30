---
sidebar_position: 3
title: "Build an AI Agent"
description: Build an intelligent agent using LLMs and tools, and expose it via a chat interface.
keywords: [wso2 integrator, ai agent, llm, chat agent, genai, quick start, ballerina ai]
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

A working WSO2 Integrator environment.

<div style={{gridColumn: '1 / -1', minWidth: 0}}>
<PrereqCard icon="cloud" title="WSO2 Cloud setup" href="/get-started/setup">Sign up and launch WSO2 Integrator in the browser-based cloud editor.</PrereqCard>
</div>

</Prerequisites>

<Steps>

## Step 1: Create the integration

1. On the project home page, click **Create on Cloud**.

   <ThemedImage
       alt="WSO2 Cloud project home showing the Create on Cloud option"
       sources={{
           light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
           dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
       }}
   />

2. The WSO2 Integrator cloud editor opens in your browser. Add an artifact to your integration, then deploy it to WSO2 Cloud from the Deploy to WSO2 Cloud panel on the right.

   <ThemedImage
    alt="WSO2 Integrator cloud editor landing page showing an empty integration and the Deploy to WSO2 Cloud panel"
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

3. The **Create Chat Agent Service** form opens. Set **Role** to `Wso2IntegratorAssistant`.

4. Set **Instructions** to:

   ```text
   You are a highly skilled WSO2 Integration Architect. Your goal is to assist developers in building, debugging, and optimizing integration flows.
   ```

   <ThemedImage
       alt="Create Chat Agent Service form with Role and Instructions filled in"
       sources={{
           light: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-1.png'),
           dark: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-1.png'),
       }}
   />

5. Leave the remaining configuration fields at their default values.

6. Scroll down to **Advanced Configurations** at the bottom of the form, and set **Agent Name** to `Wso2IntegratorAssistant`.

7. Click **Create**.

   <ThemedImage
       alt="Bottom of the Create Chat Agent Service form with Agent Name set to Wso2IntegratorAssistant"
       sources={{
           light: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-2.png'),
           dark: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-2.png'),
       }}
   />

:::tip Default model provider

By default, the agent is configured to use the WSO2 model provider. If you want to use a different LLM, see [Model providers](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md) for the full list of supported providers (OpenAI, Azure OpenAI, Anthropic, and others).

If you are using the WSO2 model provider, the access token is obtained through [WSO2 Integrator Copilot](../../editor/copilot/copilot.md). If you have not already signed in, you will be prompted to do so.
:::

## Step 3: Run and test

1. Click **Run**.

2. Click **Chat** in the Chat Agent Service title bar, or click **Test** in the pop-up.

3. Type `Hello` to check that the agent replies.

   <ThemedImage
       alt="The built-in chat panel with a Hello message sent to the running agent"
       sources={{
           light: useBaseUrl('/img/get-started/build-ai-agent/06-run-and-test.png'),
           dark: useBaseUrl('/img/get-started/build-ai-agent/06-run-and-test.png'),
       }}
   />

## Step 4: Deploy to WSO2 Cloud

To deploy your integration to WSO2 Cloud from the cloud editor, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

<div class="skip-ahead-card">

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? One-click deploy the AIAgent sample straight to WSO2 Cloud.</p>
  <div class="palette-chip-row" style={{justifyContent: 'center'}}>
    <a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/aiagent" target="_blank" rel="noopener noreferrer">
      <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" style={{display: 'block', margin: '0', border: 'none', boxShadow: 'none'}} />
    </a>
  </div>
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

final ai:Agent wso2IntegratorAssistantAgent = check new (
    systemPrompt = {
        role: string `Wso2IntegratorAssistant`,
        instructions: string `You are a highly skilled WSO2 Integration Architect. Your goal is to assist developers in building, debugging, and optimizing integration flows.`
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

service /wso2IntegratorAssistant on chatAgentListener {
    resource function post chat(@http:Payload ai:ChatReqMessage request) returns ai:ChatRespMessage|error {
        string stringResult = check wso2IntegratorAssistantAgent.run(request.message, request.sessionId);
        return {message: stringResult};
    }
}
```

</details>
