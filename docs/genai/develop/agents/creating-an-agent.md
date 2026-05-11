---
title: Creating an Agent
---

# Creating an Agent

WSO2 Integrator provides a streamlined way to create AI-powered agents using the **AI Chat Agent Wizard**. The wizard scaffolds the required integration artifacts in a single step and opens the visual flow editor, allowing you to configure and customize agent behavior directly from the canvas.

The AI Agent node acts as the core execution component. It enables the agent to interact with external systems, invoke tools, maintain conversational context, and coordinate multi-step reasoning workflows.

## Launching the wizard

1. Open your integration project in WSO2 Integrator.
2. Click **+ Add Artifact** from the project view, or right-click the project tree.
3. The **Artifacts** page opens.

![Artifacts page in WSO2 Integrator showing all artifact categories — Automation, AI Integration (AI Chat Agent, MCP Service), Integration as API (HTTP Service, GraphQL Service Beta, TCP Service Beta), Event Integration (Kafka, RabbitMQ, MQTT, Azure Service Bus, Salesforce, Twilio, GitHub, Solace, CDC for Microsoft SQL Server, CDC for PostgreSQL).](/img/genai/develop/shared/07-artifacts-page-full.png)

4. Under **AI Integration**, select **AI Chat Agent**.

## The wizard form

The wizard initially displays a single input field. The **Create** button remains disabled until a valid agent name is provided.

![The empty AI Chat Agent wizard with a Name field and a disabled Create button. The placeholder shows example names: Customer Support Assistant, Sales Advisor, Data Analyst.](/img/genai/develop/agents/01-create-ai-chat-agent-wizard.png)

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Identifier for the agent, such as `BlogReviewer`, `SupportAssistant`, or `SalesAdvisor`. The name must start with a letter and contain only letters, numbers, and underscores. |

Enter a name (for example, `blogReviewer`) to enable the **Create** button.

After clicking **Create**, WSO2 Integrator generates the required integration artifacts and displays a progress indicator while configuring the service listener and related components.

When the wizard completes, WSO2 Integrator automatically generates:

- An AI agent service
- A listener endpoint
- An AI Agent node
- The integration flow that handles incoming requests and generates responses

    ![The AI Agent canvas showing Start, an AI Agent node with the agent name and an Add Memory button, and a Return node.](/img/genai/develop/agents/02-agent-flow-canvas.png)

The generated Ballerina source for an agent named `blogReviewer` is similar to the following:

```ballerina
import ballerina/ai;
import ballerina/http;

// Default model provider
final ai:Wso2ModelProvider wso2ModelProvider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent blogReviewerAgent = check new (
    systemPrompt = {
        role: string `BlogReviewer`,
        instructions: string ``
    },
    model = wso2ModelProvider,
    tools = []
);

// Listener
listener ai:Listener chatAgentListener =
    new (listenOn = check http:getDefaultListener());

// Service
service /blogReviewer on chatAgentListener {

    resource function post chat(
            @http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {

        string stringResult =
            check blogReviewerAgent.run(
                request.message,
                request.sessionId
            );

        return {message: stringResult};
    }
}
```

After generation, you are directed to the integration canvas where you can configure the agent’s behavior, including:

- Agent role and instructions
- Model provider
- Query and input binding
- Tool integration
- Memory configuration
- Observability and tracing

## What's next

- **[Tools](tools.md)** - Add tools and integrations to the agent.
- **[Memory](memory.md)** - Configure conversational and persistent memory.
- **[Observability](observability.md)** - Monitor traces, logs, and execution details.
- **[Evaluations](evaluations/overview.md)** - Test and evaluate agent behavior and response quality.
