---
title: Agent Definitions
---

# Agent Definitions

An **agent definition** is a reusable template for an agent. It captures the role, instructions, tools, and response type once, so the same agent can be instantiated in more than one agentic integration or shared with other projects and other teams.

An **agent** (or an *inline agent*, where the two need distinguishing) is created directly in an agentic integration and belongs to it. It can be used as many times as that integration needs, but it cannot be shared beyond it.

This page describes when to use each, how to create an agent definition, and how to configure it in the Agent Definition Designer.

## Definitions and instances

| | Inline agent | Agent definition |
|---|---|---|
| **What it is** | A single agent instance | A template that agent instances are created from |
| **Scope** | The agentic integration it was created in | Reusable across integrations and projects |
| **Reuse** | Can reuse the instance within the same integration | Instantiate as many times as needed |
| **Updating behavior** | Edit the instance | Edit the definition; instances pick up the change |
| **Use it when** | The agent is specific to this integration and isn't needed elsewhere | The same agent is needed in several places, or by other teams |

A definition is a template, not a running agent. Nothing executes until an instance is created from it, either as an agent in an integration that a trigger calls, or as a [tool of another agent](../multi-agent/agents-as-tools.md).

## Where a definition lives

When you create a definition, you can choose where WSO2 Agent Builder saves it.

| Option | Where it goes | Choose this when |
|---|---|---|
| **New library package** (recommended) | A separate, publishable library in the same project | The definition should be shared beyond this integration |
| **Current integration** | Alongside the current integration's source | The definition is reused only within this integration |

A definition in a new library package appears in the project tree as ` (Library)`, with the definition listed under its **Agent Definitions** node. The library also appears next to your agentic integrations on the project's home page.

A local definition can still be instantiated multiple times within the integration, but it cannot be published or consumed by other projects.

Only a definition in a library package can be published and consumed by other projects. See [Sharing and Reusing Definitions](sharing-and-reusing-definitions.md).

## Create an agent definition

1. Open your agentic integration in WSO2 Agent Builder.
2. Click **Add Agent** on the integration's **Overview**. In an integration with no agents yet, **Add Agent** is under **Or start from scratch**.
3. In the **Add Agent** dialog, select **Create Agent Definition**.

    <ThemedImage
        alt="The Add Agent dialog opened in a new support_desk integration that has no agents yet, showing Create Agent, Create Durable Agent, and Create Agent Definition under Create New, and a Pre-built Agents section with All, Project, and Organization tabs."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/definitions/01-add-agent-dialog-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/definitions/01-add-agent-dialog-v1.0.png'),
        }}
    />

4. Fill in the definition's details.

    <ThemedImage
        alt="The Create Agent Definition form with Name set to ReturnsPolicyAgent, a Description, a Create this definition in selector set to New library package (Recommended), and a collapsed Advanced Configurations section."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/definitions/03-create-agent-definition-library-package-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/definitions/03-create-agent-definition-library-package-v1.0.png'),
        }}
    />

    | Field | Required | Description |
    |---|---|---|
    | **Name** | Yes | A unique name for the agent definition, such as `ReturnsPolicyAgent`. |
    | **Description** | No | A brief description of what the agent does. This is shown in the library catalog, so write it for the people who will consume the definition. |
    | **Create this definition in** | Yes | **New library package** creates a reusable, publishable package in this project. **Current integration** keeps the definition local. |

5. Click **Create Agent Definition**.

### Advanced configurations

The defaults are derived from the definition's name and your account, so most definitions need nothing here. Click **Expand** on **Advanced Configurations** to change how the library package is named and versioned.

| Field | Required | Description |
|---|---|---|
| **Library Name** | Yes | The name of the reusable library package created in this project. |
| **Package Name** | Yes | The package name used when the definition is published and imported. |
| **Organization** | Yes | The organization that owns this package. This is derived from your account and cannot be edited here. |
| **Package Version** | No | The version of the package. Defaults to `0.1.0`. |

These fields apply only when **New library package** is selected.

## Agent Definition Designer

After you click **Create Agent Definition**, WSO2 Agent Builder generates the definition and opens the Agent Definition Designer. The designer is where you configure what the agent does. Unlike an agent created directly in an integration, a definition is configured through a form rather than the agent canvas. A definition has no trigger of its own, because it runs wherever it is instantiated.

<ThemedImage
    alt="The Agent Definition Designer for ReturnsPolicyAgent, showing the name and description header, a Configuration card with Role and Instructions, a Tools section with a Tool button, a Response Type set to string, an Initialization Parameters section with a Parameter button, and a collapsed Advanced section."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/definitions/06-agent-definition-designer-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/definitions/06-agent-definition-designer-v1.0.png'),
    }}
/>

To return to the designer later, select the definition under **Agent Definitions** in the project tree.

| Section | Description |
|---|---|
| **Name and description** | The definition's identity. The description is what consumers see in the library catalog. |
| **Configuration** | The agent's **Role** and **Instructions**, which together form its system prompt. |
| **Tools** | The capabilities the agent can use to complete tasks. |
| **Response Type** | The type of value the agent returns when it completes. |
| **Initialization Parameters** | Values supplied when an instance is created from this definition. |
| **Advanced** | The members of the generated agent class, and a way into their implementations. |

### Configuration

Click the edit icon on the **Configuration** card to open the **Edit Configuration** panel, set the agent's role and instructions, and click **Save**.

| Field | Description |
|---|---|
| **Role** | The primary responsibility or persona of the agent. |
| **Instructions** | The behavior guidelines and operational instructions the agent follows while responding. |

Because a definition can be instantiated in contexts you don't control, write instructions that don't assume a particular caller or flow.

### Tools

Click **+ Tool** to add capabilities to the definition. The tool types and their configuration are the same as for any other agent: connections, functions, MCP servers, knowledge bases, custom tools, and other agents. See [Tools](../tools.md).

Tools added to a definition are part of the template: every instance created from it gets the same tools. An instance's canvas shows these tools but has no **Add Tool**, so change them in the definition.

#### Delegate to another agent from a definition

**Use Agent** works differently inside a definition. A definition has no integration of its own to pick an agent from, so the agent it delegates to is passed in when an instance is created.

<ThemedImage
    alt={"The Use Agent dialog in the Agent Definition Designer, headed \"Choose the agent this definition should delegate to. The selected agent will be passed into this definition when it is created.\", with a Generic ai:Agent option and an Agent Types section listing pre-built agent definitions."}
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/definitions/09-definition-use-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/definitions/09-definition-use-agent-v1.0.png'),
    }}
/>

| Option | The instance is created with |
|---|---|
| **Generic ai:Agent** | Any agent the caller supplies. |
| **Agent Types** | An instance of the selected definition. |

After you configure the tool and click **Add Tool**, the agent appears as a new initialization parameter. Whoever creates an instance supplies a value for it in the **Configure Agent** step.

When you create an instance, check which agent that parameter points at. The agent you supply must not be the one that calls this instance, directly or through a longer chain: delegation only goes one way.

**Agent Types** also lists the definition you are editing. Don't select it: a definition can't delegate to itself.

The new parameter is required, so instances created before you added the agent stop compiling with `missing required parameter` until you supply a value for it.

### Response Type

**Response Type** defines the type of value the agent returns when it completes. It defaults to `string`.

Choose a simple type such as `string`, `int`, or `boolean`, or a record type when the agent should return structured data, such as a support ticket with a category, a priority, and a summary.

A structured response type is easier to work with programmatically than `string`, because the result can be used directly instead of being interpreted again. When the definition is used as a tool by another agent, the response type is the shape the calling agent receives.

Consumers of the definition depend on this type, so changing it after the definition has been published is a breaking change. See [Versioning a definition](sharing-and-reusing-definitions.md#versioning-a-definition).

### Initialization Parameters

**Initialization Parameters** are the values provided to initialize an agent created from this definition. They are what makes a definition a template rather than a fixed agent: the parts that vary per instance become parameters, and everything else stays in the definition.

Every definition takes a model provider and an optional memory implementation. Click **+ Parameter** to add your own. An agent added through [Use Agent](#delegate-to-another-agent-from-a-definition) is added here automatically.

### Advanced

The **Advanced** section lists the members of the generated agent class.

| Member | Description |
|---|---|
| **Constructor: `init`** | Initializes an instance of the definition with its model, memory, and initialization parameters. |
| **`run`** | Runs the agent against a query and returns the configured response type. |
| **`trace`** | Runs the agent and returns the full execution trace instead of the result. |

Selecting the constructor or either method opens it in the flow diagram view, where its implementation can be edited directly.

The designer generates and maintains these members from the sections above, so most definitions never need them. Use the flow diagram view when a definition requires behavior the form does not express.

## Generated source

Creating a definition generates a Ballerina class that wraps an `ai:Agent`. You configure it through the designer; the source is shown here for reference.

```ballerina
import ballerina/ai;

# Answers questions about the returns policy and checks whether an order is eligible for return.
public isolated class ReturnsPolicyAgent {
    *ai:FixedTypedAgent;

    private final ai:Agent agent;

    # Initializes the agent
    # + model - The AI model provider to use
    # + memory - The memory implementation to use
    public function init(ai:ModelProvider model, ai:Memory? memory = ()) returns error? {
        self.agent = check new (
            systemPrompt = {
                role: string ``,
                instructions: string ``
            },
            model = model,
            memory = memory,
            tools = []
        );
    }

    public isolated function run(string|ai:Prompt query,
            string sessionId = "sessionId",
            ai:Context context = new) returns string|ai:Error {
        return self.agent.run(query, sessionId, context);
    }

    public isolated function trace(string|ai:Prompt query,
            string sessionId = "sessionId",
            ai:Context context = new) returns ai:Trace|ai:Error {
        return self.agent.run(query, sessionId, context);
    }
}
```

The model provider and memory are constructor parameters rather than fixed values, so the same definition can run against a different model or a different memory store in each instance.

## Create an instance from a definition

Once a definition exists, create instances of it from the **Pre-built Agents** section of the **Add Agent** dialog, in either of the places that dialog appears:

- **Add Agent** on the integration's **Overview** - to use the agent in an integration, called by its own trigger.
- **Add Tool → Use Agent → + Add Agent** - to use the agent as a tool of another agent. See [Agents as Tools](../multi-agent/agents-as-tools.md).

Selecting a definition opens the **Configure Agent** step, which asks for a value for each initialization parameter, such as **Model** and **Memory**, and an **Agent Name** for the instance. Click **Add Agent** to create it.

The instance is listed under **Agents** in the project tree. On the integration's **Overview**, its card is labelled with the definition's name.

## Common pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| The definition doesn't appear under **Pre-built Agents** in another project. | It was created in the current integration rather than a library package. | Recreate it with **New library package**, then publish it. |
| An existing instance fails with `missing required parameter`. | An initialization parameter was added to the definition, for example by **Use Agent**. | Supply a value for the new parameter in each instance. |
| An instance has no **Add Tool** button. | Its tools come from the definition. | Add the tool in the Agent Definition Designer. |
| Instances share state you expected to be isolated. | The same instance is being reused rather than a new one created. | Create a separate instance, or scope state through initialization parameters. |
| A consumer breaks after you edit the definition. | The response type or an initialization parameter changed. | Treat both as public API and version the package accordingly. |
| Instructions assume a caller the agent doesn't have. | The definition was written against one integration and then reused elsewhere. | Rewrite instructions to be caller-independent; move the variable parts to parameters. |

## What's next

- **[Sharing and Reusing Definitions](sharing-and-reusing-definitions.md)** — Publish a definition and consume it from other projects.
- **[Agents as Tools](../multi-agent/agents-as-tools.md)** — Use an agent as a tool of another agent.
- **[Tools](../tools.md)** — Add connections, functions, MCP servers, and custom tools.
- **[Memory](../memory.md)** — Configure conversational and persistent memory.
