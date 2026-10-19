---
title: Build an AI Agent
---

# Build an AI Agent

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An AI agent that connects to an LLM, uses tools, and responds to user queries in chat.</>}
/>

<p style={{textAlign: 'justify'}}>
An AI agent uses an LLM to understand user queries, reason about them, and call tools to retrieve information or perform actions. This quick start walks you through the full process: creating a project, adding an AI Chat Agent artifact, configuring its instructions, and testing the agent in the built-in chat panel.
</p>

## Prerequisites

A working WSO2 Integrator environment.

<PrereqCard icon="local" title="Local setup" href="/get-started/setup">
  Install and launch WSO2 Integrator on your machine.

<PrereqCard icon="cloud" title="WSO2 Cloud Account" href="/get-started/setup" cloud>
  For AI assisted development and WSO2 Cloud deployments.

## Step 1: Create the integration

:::info Note
If you're using the cloud editor, a project is already open, so you can skip this step 1 and go directly to [Step 2: Add an AI chat agent](#step-2-add-an-ai-chat-agent).

1. Open WSO2 Integrator.

2. Click **Create** in the **Create a Project** card.

   <ThemedImage
      alt="WSO2 Integrator home screen with the Create a Project card"
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/wso2-integrator.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/wso2-integrator.png'),
      }}
   />

3. Set **Project Name** to `QuickStart`.

4. Set **Integration Name** to `AIAgent`.

5. Click **Create**.

   <ThemedImage
      alt="Create a Project form with Project name set to QuickStart and Integration name set to AIAgent"
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/create-project.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/create-project.png'),
      }}
   />

## Step 2: Add an AI chat agent

1. Select your integration from the project overview canvas.

2. In the design view, click **Add Artifact Manually**.

   <ThemedImage
      alt="Integration design view with the Add Artifact manually button highlighted"
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/add-artifact.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/add-artifact.png'),
      }}
   />

3. Select **Chat Agent Service** under **AI Integration**.

   <ThemedImage
      alt="Artifacts page with Chat Agent Service highlighted under AI Integration"
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/select-ai-agent.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/select-ai-agent.png'),
      }}
   />

4. The **Create Chat Agent Service** form opens.

5. Set **Role** to `Wso2IntegratorAssistant`.

6. Set **Instructions** to:

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

7. Leave the remaining configuration fields at their default values.

8. Under **Advanced Configurations**, set **Agent Name** to `Wso2IntegratorAssistant`.

9. Click **Create**.

   <ThemedImage
      alt="Create Chat Agent Service form with Agent Name set to Wso2IntegratorAssistant"
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-2.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/chat-agent-service-form-2.png'),
      }}
   />

:::tip Default model provider

By default, the agent is configured to use the WSO2 model provider. If you want to use a different LLM, see [Model providers](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md) for the full list of supported providers (OpenAI, Azure OpenAI, Anthropic, and others).

If you are using the WSO2 model provider, the access token is obtained through [WSO2 Integrator Copilot](../../editor/copilot/copilot.md). If you have not already signed in, you will be prompted to do so.

## Step 3: Run and test

1. Click **Run**.

2. Click **Chat** from the Chat Agent Service title bar or click **Test** from the pop-up.

3. Type `Hello` to check if it works.

   <ThemedImage
      alt="Chat Agent Service running with the chat panel showing a reply to Hello"
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/run-and-test.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/run-and-test.png'),
      }}
   />

## Step 4: Deploy to WSO2 Cloud

Deploy your integration to WSO2 Cloud - Integration Platform in any of the following ways:

- If you're using the cloud editor, see [Save and deploy](../../deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor.md#save-and-deploy).
- If you're using WSO2 Integrator on your machine, see [Deploy from WSO2 Integrator](../../deploy-and-run/deploy-to-wso2-cloud/push-from-ide.md).

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? One-click deploy the AIAgent sample straight to WSO2 Cloud.</p>
  <div class="palette-chip-row" style={{justifyContent: 'center'}}>
    <a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/aiagent" target="_blank" rel="noopener noreferrer">
      <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" style={{display: 'block', margin: '0', border: 'none', boxShadow: 'none'}} />
    </a>


</div>

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate the following complete, runnable Ballerina program. It has two files: `agents.bal` for the agent definition and `main.bal` for the listener and service.

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

## What's next

- [Build an automation](build-automation.md) — Build a scheduled job
- [Build an Integration as API](build-integration-api.md) — Build an HTTP service
- [Build an event-driven integration](build-event-driven-integration.md) — React to messages from brokers
- [Build a file-driven integration](build-file-driven-integration.md) — Process files from FTP or local directories
- [AI agents](../../develop-and-test/integration-artifacts/ai-integrations/agents/agents.md) — Learn how to build production-grade AI agents with tools, memory, and evaluations
