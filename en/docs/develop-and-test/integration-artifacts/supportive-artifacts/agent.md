---
title: Agent
description: A reusable AI agent definition you can reference from a Chat Agent Service, an MCP Service, or a workflow, instead of defining the agent inline each time.
keywords: [wso2 integrator, agent, ai agent, reusable, supporting artifact]
slug: /develop-and-test/integration-artifacts/supportive-artifacts/agent
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Agent

An Agent artifact is a standalone AI agent definition — the same model, system prompt, tools, and memory building blocks described in [AI Agents](../ai-integrations/agents/agents.md) — added directly within an integration flow, a REST API, a GraphQL resolver, or backend service logic, instead of being scaffolded together with its own chat service the way the [AI Chat Agent Wizard](../ai-integrations/agents/create-an-agent.md) does. Use it when you want to invoke the agent programmatically as part of logic you're already writing, or reference it the same way you'd use a [Connection](connections.md) or a [Type](types.md) from a Chat Agent Service, an MCP Service, or a [Durable Agentic Workflow](../workflow/durable-agentic-workflow/durable-agentic-workflow.md).

## Creating an Agent

1. Create or open an existing integration flow.
2. In the editor, open the **AI** section in the side panel and select **Agent**.
3. Click **+ Add Agent** to open the agent creation panel.

<ThemedImage
    alt="Agent creation form"
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/39-agent-creation-form.png'),
        dark: useBaseUrl('/img/genai/develop/agents/39-agent-creation-form.png'),
    }}
/>

4. Configure the **Role** and **Instructions** fields to define the agent’s behavior.
5. Specify the query or prompt to the agent in the **Query** field. Note that this can also be an expression (e.g., a parameter, a variable, etc.).
6. Click **Save**.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

<ThemedImage
    alt="Agent creation form"
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/40-agent.png'),
        dark: useBaseUrl('/img/genai/develop/agents/40-agent.png'),
    }}
/>

</TabItem>

<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/ai;
import ballerina/log;

// Default model provider
final ai:Wso2ModelProvider aiWso2modelprovider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent aiAgent = check new (
    systemPrompt = {
        role: string `Task Assistant`,
        instructions: string `You are a helpful assistant for
            managing a to-do list. You can manage tasks and
            help users plan their schedules.`
    },
    model = aiWso2modelprovider
);

// Main
public function main() returns error? {
    while true {
        string userInput = io:readln("User (or 'exit' to quit): ");
        if userInput == "exit" {
            break;
        }
        // Pass the user input to the agent and get a response.
        string response = check aiAgent.run(userInput);
        io:println("Agent: ", response);
    }
}
```

</TabItem>
</Tabs>

After generation, you can configure the following aspects of the agent the same way as for a Chat Agent Service:

- [Agent behavior, including role, instructions, query, and input/output bindings](../ai-integrations/agents/create-an-agent.md#configure-agent-behavior)
- [Model provider](../ai-integrations/ai-building-blocks/model-providers.md)
- [Tool integration](../ai-integrations/agents/tools.md)
- [Memory configuration](../ai-integrations/agents/memory.md)
- [Observability and tracing](../ai-integrations/agents/observability.md)

## What's next

- [AI Agents](../ai-integrations/agents/agents.md) — the model, system prompt, tools, and memory components that make up an agent
- [Creating an Agent](../ai-integrations/agents/create-an-agent.md) — the AI Chat Agent Wizard walkthrough
- [Durable Agentic Workflow](../workflow/durable-agentic-workflow/durable-agentic-workflow.md) — use an agent to drive a durable workflow's decisions
