---
title: Build an AI Agent
---

# Build an AI Agent

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An AI agent that connects to an LLM and responds to user queries in chat.</>}
/>

<p style={{textAlign: 'justify'}}>
An AI agent uses an LLM to understand user queries, reason about them, and call tools to retrieve information or perform actions. This quick start walks you through the full process: creating a project with an agentic integration, creating an agent with its role and instructions, connecting it to a chat trigger, and testing it in the built-in chat panel.
</p>

## Prerequisites

A working WSO2 Agent Builder environment.

<PrereqCard icon="local" title="Local setup" href="/get-started/setup">
  Install and launch WSO2 Agent Builder on your machine.

<PrereqCard icon="cloud" title="WSO2 Cloud Account" href="/get-started/setup" cloud>
  For AI assisted development and WSO2 Cloud deployments.

## Step 1: Create the project

1. Open WSO2 Agent Builder. The **Get Started** view opens.

   If you're not signed in, a welcome screen asks you to sign in first. Click **Sign in with WSO2 Integration Platform**, or click **Skip for now** and sign in later. The default WSO2 model provider used in this quick start needs you to be signed in before you run the agent.

   :::note
   If Agent Builder opens a project you worked on before, open a new window (**Cmd+Shift+N** on macOS, **Ctrl+Shift+N** on Windows and Linux) to get to **Get Started**.
   :::

2. Under **Start Building your Agent**, click **Create**.

   <ThemedImage
      alt="The WSO2 Agent Builder Get Started view, with a Start Building your Agent card containing Create and Open buttons, a Pre-built Agents and Samples card with an Explore button, a Sign In button, and a Recent Projects list."
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/get-started-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/get-started-v1.0.png'),
      }}
   />

3. Set **Project name** to `QuickStart`. **Location** updates to match.

4. Under **What do you want to build?**, keep **Agentic Integration** selected.

5. Set **Agentic integration name** to `AIAgent`.

6. Click **Create Agentic Integration**.

   <ThemedImage
      alt="The Create a Project form with Project name set to QuickStart, Location set to a quickstart folder with the note You are creating a new project, Agentic Integration selected, and Agentic integration name set to AIAgent."
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/create-project-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/create-project-v1.0.png'),
      }}
   />

## Step 2: Create the agent

1. The project opens on the new `AIAgent` integration. Under **Or start from scratch**, click **Add Agent**.

   <ThemedImage
      alt="The AIAgent integration page with the WSO2 Agent Builder Copilot prompt, example cards, and the Add Agent and Add MCP Server buttons under Or start from scratch."
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/integration-start-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/integration-start-v1.0.png'),
      }}
   />

   :::tip
   You can also describe what your agent should do in the **WSO2 Agent Builder Copilot** prompt and let Copilot build it. This quick start builds the agent by hand.
   :::

2. In the **Add Agent** dialog, select **Create Agent**.

   <ThemedImage
      alt="The Add Agent dialog with Create Agent, Create Durable Agent, and Create Agent Definition under Create New, and a Pre-built Agents section."
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/add-agent-dialog-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/add-agent-dialog-v1.0.png'),
      }}
   />

3. Set **Role** to `Wso2IntegratorAssistant`.

4. Set **Instructions** to:

   ```text
   You are a highly skilled WSO2 Integration Architect. Your goal is to assist developers in building, debugging, and optimizing integration flows.
   ```

5. Leave **Model** set to **Default WSO2 Model Provider**, and leave **Advanced Configurations** at their default values.

6. Set **Agent Name** to `wso2IntegratorAssistant`.

7. Click **Create Agent**.

   <ThemedImage
      alt="The Create Agent form with Role set to Wso2IntegratorAssistant, the Instructions filled in, Model set to Default WSO2 Model Provider, and Agent Name set to wso2IntegratorAssistant."
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/create-agent-form-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/create-agent-form-v1.0.png'),
      }}
   />

The agent's canvas opens. It shows the agent with its role and instructions, the model provider it uses, and **Add Trigger**, **Add Memory**, and **Add Tool** for extending it.

<ThemedImage
   alt="The wso2IntegratorAssistant agent canvas with Add Trigger on the left, the AI Agent node with Add Memory and its role and instructions, the Default WSO2 Model Provider on the right, and Add Tool below."
   sources={{
      light: useBaseUrl('/img/get-started/build-ai-agent/agent-canvas-v1.0.png'),
      dark: useBaseUrl('/img/get-started/build-ai-agent/agent-canvas-v1.0.png'),
   }}
/>

:::tip Default model provider

By default, the agent uses the WSO2 model provider. If you want to use a different LLM, see [Model providers](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md) for the full list of supported providers (OpenAI, Azure OpenAI, Anthropic, and others).

If you are using the WSO2 model provider, the access token is obtained through [WSO2 Agent Builder Copilot](../../editor/copilot/copilot.md). If you have not already signed in, you will be prompted to do so.

## Step 3: Add a chat trigger

An agent only runs when a trigger calls it. Connect the agent to a chat endpoint so you can talk to it.

1. On the agent canvas, click **Add Trigger**.

   <ThemedImage
      alt="The Add Trigger dialog for wso2IntegratorAssistant, listing Chat Channels (Agent Chat, Google Chat, Telegram, WhatsApp Business), API Endpoints (HTTP), and Event Sources."
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/add-trigger-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/add-trigger-v1.0.png'),
      }}
   />

2. Under **Chat Channels**, select **Agent Chat**.

3. Keep the generated **Service Path** and click **Create**.

   <ThemedImage
      alt="The Agent Chat trigger form with Service Path set to /wso-2-integrator-assistant and a Create button."
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/agent-chat-trigger-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/agent-chat-trigger-v1.0.png'),
      }}
   />

The trigger appears on the canvas, connected to the agent.

<ThemedImage
   alt="The wso2IntegratorAssistant agent canvas with an Agent Chat trigger for /wso-2-integrator-assistant connected to the AI Agent node."
   sources={{
      light: useBaseUrl('/img/get-started/build-ai-agent/agent-canvas-with-trigger-v1.0.png'),
      dark: useBaseUrl('/img/get-started/build-ai-agent/agent-canvas-with-trigger-v1.0.png'),
   }}
/>

## Step 4: Run and test

1. Select **AIAgent** in the breadcrumb to open the integration's **Overview**, and click **Run**.

2. When the integration starts, a pop-up says **1 service found in the integration. Test with Try It Client?** Click **Test**.

   <ThemedImage
      alt="The AIAgent integration Overview with the integration running in the terminal and a pop-up reading 1 service found in the integration. Test with Try It Client? with Test and Cancel buttons."
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/test-popup-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/test-popup-v1.0.png'),
      }}
   />

3. The **Agent Chat** panel opens. Type `Hello` to check that it works.

   <ThemedImage
      alt="The AIAgent Overview beside the Agent Chat panel, where Hello is answered with Hello! How can I assist you today with your WSO2 integration needs?"
      sources={{
         light: useBaseUrl('/img/get-started/build-ai-agent/run-and-test-v1.0.png'),
         dark: useBaseUrl('/img/get-started/build-ai-agent/run-and-test-v1.0.png'),
      }}
   />

## Step 5: Deploy to WSO2 Cloud

Deploy your integration to WSO2 Cloud. See [Deploy to WSO2 Cloud](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md).

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

The steps above generate the following complete, runnable Ballerina program. It has two files: `agents.bal` for the agent and `main.bal` for the chat trigger's listener and service.

**`agents.bal`**

```ballerina
import ballerina/ai;

final ai:Agent wso2IntegratorAssistant = check new (
    systemPrompt = {
        role: string `Wso2IntegratorAssistant`,
        instructions: string `You are a highly skilled WSO2 Integration Architect. Your goal is to assist developers in building, debugging, and optimizing integration flows.`
    },
    model = check ai:getDefaultModelProvider()
);
```

**`main.bal`**

```ballerina
import ballerina/ai;
import ballerina/http;

listener ai:Listener agentChatListener = new (listenOn = check http:getDefaultListener());

service /wso\-2\-integrator\-assistant on agentChatListener {
    resource function post chat(@http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {
        string stringResult = check wso2IntegratorAssistant.run(request.message, sessionId = request.sessionId);
        return {message: stringResult};
    }
}
```

</details>

## What's next

- [Build a durable agent](build-durable-agent.md) — Build an agent that can pause for human approval and resume
- [AI agents](../../develop-and-test/integration-artifacts/ai-integrations/agents/agents.md) — Learn how to build production-grade AI agents with tools, memory, and evaluations
- [Agents as tools](../../develop-and-test/integration-artifacts/ai-integrations/agents/multi-agent/agents-as-tools.md) — Delegate work from one agent to another
