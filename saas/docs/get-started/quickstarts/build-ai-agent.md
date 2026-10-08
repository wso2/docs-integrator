---
title: Build an AI Agent
---

# Build an AI Agent

**Time:** Under 10 minutes | **What you'll build:** An AI agent that connects to an LLM, uses tools, and responds to user queries in chat.

An AI agent uses an LLM to reason about user queries and call tools to retrieve information or perform actions. This quick start shows the full cycle: create a project, add an AI Chat Agent artifact, configure its instructions, and test it in the built-in chat panel.

:::info Prerequisites

A working WSO2 Integrator environment. See [Cloud setup](../../get-started/cloud-setup.md) to sign up and launch WSO2 Integrator in the browser-based cloud editor.

## Architecture

## Step 1: Create the integration

:::info Note

In the cloud editor, you're already inside a project. Skip to Step 2.

1. Open WSO2 Integrator.
2. Select **Create** in the **Create New Integration** card.
3. Set **Integration Name** to `AIAgent`.
4. Set **Project Name** to `QuickStart`.
5. Select **Create Integration**.

<ThemedImage
    alt="Create new integration form with Integration Name set to AIAgent and Project Name set to QuickStart"
    sources={{
        light: useBaseUrl('/img/get-started/build-ai-agent/03-create-project.png'),
        dark: useBaseUrl('/img/get-started/build-ai-agent/03-create-project.png'),
    }}
/>

## Step 2: Add an AI chat agent

1. Select your integration from the project overview canvas.
2. Select **+ Add Artifact** in the design canvas.
3. Select **AI Chat Agent** under **AI Integration**.
4. Set **Name** to `Wso2IntegratorAssistant`.
5. Select **Create**.

<ThemedImage
    alt="Selecting AI Chat Agent in the Add Artifact panel and setting the name to Wso2IntegratorAssistant"
    sources={{
        light: useBaseUrl('/img/get-started/build-ai-agent/04-add-a-file-integration-artifact.png'),
        dark: useBaseUrl('/img/get-started/build-ai-agent/04-add-a-file-integration-artifact.png'),
    }}
/>

## Step 3: Configure the AI agent

1. Select the **Wso2IntegratorAssistant** node on the canvas.
2. Set **Instructions** to `You are a highly skilled WSO2 Integration Architect. Your goal is to assist developers in building, debugging, and optimizing integration flows.`.
3. Select **Save**.

<ThemedImage
    alt="AI Agent configuration panel with Instructions set to the WSO2 Integration Architect prompt"
    sources={{
        light: useBaseUrl('/img/get-started/build-ai-agent/05-configure-the-ai-agent.png'),
        dark: useBaseUrl('/img/get-started/build-ai-agent/05-configure-the-ai-agent.png'),
    }}
/>

:::tip Default model provider

By default, the agent is configured to use the WSO2 model provider. If you want to use a different LLM, see [Model providers](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md) for the full list of supported providers (OpenAI, Azure OpenAI, Anthropic, and others).

If you are using the WSO2 model provider, the access token is obtained through [WSO2 Integrator Copilot](../../editor/copilot/copilot.md). If you have not already signed in, you will be prompted to do so.

## Step 4: Run and test

1. Select **Run**.
2. Select **Chat** from the AI Chat Agent title bar or select **Test** from the pop-up.
3. Type `Hello` to check if it works.

<ThemedImage
    alt="The built-in chat panel with a Hello message sent to the running agent"
    sources={{
        light: useBaseUrl('/img/get-started/build-ai-agent/06-run-and-test.png'),
        dark: useBaseUrl('/img/get-started/build-ai-agent/06-run-and-test.png'),
    }}
/>

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

## Step 5: Deploy to WSO2 Cloud

Deploy your integration to WSO2 Cloud. Check [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

## Skip ahead: deploy a ready-made sample

Rather not build it yourself? One-click deploy the `AIAgent` sample straight to WSO2 Cloud:

<a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/aiagent" target="_blank">
    <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" />
</a>
