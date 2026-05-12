---
title: Tools
---

# Tools

Tools enable AI agents to interact with external systems and perform actions during execution. WSO2 Integrator provides multiple ways to add and configure tools for an AI agent through a unified tool configuration experience.

This page describes the supported tool types, how to add them to an agent, and how each tool integration option works.

## Add a tool

To add a tool to an agent, select the **AI Agent** node in the agent canvas and click the **+** button.

![Add tool](/img/genai/develop/agents/29-tool.png)

This opens the **Add Tool** panel, where you can choose how to add capabilities to the agent.

![The Add Tool dialog with four options: Use Connection, Use Function, Use MCP Server, Create Custom Tool. Each option has a one-line description.](/img/genai/develop/agents/05-add-tool-dialog.png)

The following tool integration options are available:

| Option | Description |
|---|---|
| **Use Connection** | Use an existing WSO2 Integrator connector such as Salesforce, Gmail, MySQL, or GitHub. Each connector operation becomes available as an agent tool. |
| **Use Function** | Expose an existing project function or standard library function as an agent tool. |
| **Use MCP Server** | Connect to tools hosted on a remote MCP server, including custom, community, or SaaS MCP endpoints. |
| **Create Custom Tool** | Define a new tool by specifying its name, description, parameters, and return type directly from the UI. |

Each option opens a dedicated configuration panel for setting up the selected tool type.

## 1. Use connection

Selecting **Use Connection** opens the **Add Connection** dialog.

![The Add Connection dialog with options for creating a new connector or selecting a pre-built connector.](/img/genai/develop/shared/08-add-connection-dialog.png)

The dialog provides the following options for creating or selecting a connector:

| Option | Description |
|---|---|
| **Create New Connector → Connect via API Specification** | Generate a connector using an OpenAPI or WSDL specification. |
| **Create New Connector → Connect to a Database** | Generate a connector by introspecting a database such as MySQL, MSSQL, or PostgreSQL. |
| **Pre-built Connectors** | Use an existing connector provided by WSO2 Integrator, such as HTTP, Salesforce, Gmail, or GitHub. |

The **Pre-built Connectors** section can be filtered using the **All**, **Standard**, and **Organization** tabs and includes AI-related connectors and integrations.

### 1.1 Connect via API specification

Select the specification type and import the API specification file.

![Specification](/img/genai/develop/shared/17-specification.png)

### 1.2 Connect to a database

Select the database type and provide the required connection details.

![Database Connection](/img/genai/develop/shared/16-database-connection.png)

### 1.3 Use Pre-built connectors

Select the connector.

![The Add Connection dialog showing the AI-related connector catalogue.](/img/genai/develop/shared/09-add-connection-ai-catalogue.png)

After selecting a connector, WSO2 Integrator displays the available operations. Select the operations that the agent should be allowed to invoke. Each selected operation becomes available as an agent tool.

The tool metadata, including descriptions, parameters, and input/output schemas, is automatically derived from the connector definition. You only need to provide the tool name.

![Tool metadata configuration](/img/genai/develop/shared/15-tool-metadata.png)

Use this option when a suitable pre-built or generated connector already exists, allowing the agent to interact with external systems without requiring additional wrapper code.

## 2. Use function

Selecting **Use Function** opens the **Create Tool from Function** panel. The panel groups available functions into three sections, each with separate search support using the search box at the top.

![The Create Tool from Function panel with a search box at the top. Sections: Within Project (functions defined in the current project, currently empty since no function has been authored). Standard Library expanded with three subgroups — io (fileReadJson, fileReadString, fileWriteJson, fileWriteString, print, println), log (printDebug, printError, printInfo, printWarn), time (utcFromString, utcNow). Imported Functions section collapsed at the bottom.](/img/genai/develop/agents/06-tool-from-function.png)

The dialog provides the following options for selecting a function:

| Group | Description |
|---|---|
| **Within Project** | Functions defined within your own project, including [natural functions](/docs/genai/develop/natural-functions/overview), can be added as tools with a single click. |
| **Standard Library** | A curated set of commonly used Ballerina utility functions organized by module. |
| ↳ **`io`** | `fileReadJson`, `fileReadString`, `fileWriteJson`, `fileWriteString`, `print`, `println` |
| ↳ **`log`** | `printDebug`, `printError`, `printInfo`, `printWarn` |
| ↳ **`time`** | `utcFromString`, `utcNow` |
| **Imported Functions** | Functions from modules already imported into your project, such as `googleapis.gmail` or `salesforce`. |

Select the functions that the agent should be allowed to invoke. Each selected function becomes available as an agent tool.

The tool metadata — including descriptions, parameters, and input/output schemas — is automatically derived from the function definition. You only need to provide a tool name.

![Add function](/img/genai/develop/shared/18-add-function.png)

## 3. Use MCP server

Selecting **Use MCP Server** opens the **Add MCP Server** panel.

![The Add MCP Server panel — Tools to Include set to All, then Advanced Configurations including Info (name, version), HTTP Version with a Select / Expression toggle, HTTP1 Settings, HTTP2 Settings, Timeout (default 30 seconds), Forwarded.](/img/genai/develop/agents/08-add-mcp-server.png)

The dialog provides the following configuration for selecting a tool:

| Field | Description |
|---|---|
| **Server URL** | The MCP endpoint URL, for example `http://localhost:9090/mcp` or `https://mcp.example.com`. |
| **Requires Authentication** | Enable this option if the server requires authentication, then configure the required authentication settings. |
| **Tools to Include** | Select `All` to expose every tool advertised by the server, or choose a specific subset of tools by name. |
| **Advanced Configurations** | Additional [HTTP client configurations](/docs/connectors/catalog/built-in/http/action-reference#client). |
| **Result** | The name of the variable used to store the result returned by the MCP tool invocation. |

After saving, every tool exposed by the MCP server — or every tool selected in **Tools to Include** — becomes available to the agent. These tools appear alongside local function tools and are used transparently from the agent’s perspective.

> **Tip:** A WSO2 Integrator project can also consume its own MCP service. See [Exposing a Service as MCP](/docs/genai/develop/mcp/exposing-as-mcp).

## 4. Create custom tool

Use this option when you want to define a tool before implementing its logic, or when the tool requires a fully custom structure.

Selecting **Create Custom Tool** opens the **Create New Agent Tool** dialog. This full-page dialog provides a structured interface for defining a custom tool.

![The Create New Agent Tool dialog (initial empty state). Header: 'Create New Agent Tool — Create a new agent tool that can be invoked by AI agents.' Section: 'Create New Agent Tool — Define the inputs and outputs of the tool'. Field 1: Name* (with 'missing identifier' validation warning). Field 2: Description (description text area: 'Description of the agent tool. This will help AI agents understand when to use this tool and how to use it.'). Field 3: Parameters with explanation 'Define the inputs for the agent tool. These are the parameters that AI agents will use when calling this tool.' and + Add Parameter link. Field 4: Return Type (with type icon). Field 5: Description (for the return value). Advanced Configurations Expand at the bottom.](/img/genai/develop/agents/23-create-custom-tool-blank.png)

The dialog provides the following options for creating a function:

| Field | Required | Description |
|---|---|---|
| **Name*** | Yes | The name of the tool used by the LLM to identify and invoke it. |
| **Description** | No | Explains what the tool does and when the agent should use it. Although optional, providing a clear description significantly improves tool selection accuracy by the LLM. |
| **Parameters** | No | Defines the input parameters for the tool. Each parameter includes a name, type, and description. The descriptions help the LLM understand what values to provide. Selecting **+ Add Parameter** adds a new parameter definition row. |
| **Return Type*** | Yes | Defines the Ballerina type returned by the tool. This determines the schema exposed to the LLM. Supported primitive types include `string`, `int`, `float`, `decimal`, `boolean`, and `()`. You can also select **+ Create New Type** or **Open Type Browser** to use project-defined record types. |
| **Description** (return) | No | A short description of the return value. |
| **Advanced Configurations** | No | Additional settings such as visibility and Agent Identity client configuration. |

After clicking **Create**, WSO2 Integrator generates a stub function annotated with `@ai:AgentTool`. You can then implement the tool logic inside the generated function.

## After adding a tool

The new tool appears in the agent’s right-side **Tools** panel and is included in every reasoning step from that point onward.

![Database Connection](/img/genai/develop/shared/19-agent-with-tools.png)

## Toolkits

A **toolkit** is a class that bundles related tools. For example, a `TaskManagerToolkit` can expose `addTask` and `listTasks`. Toolkits are currently written in source view only (there is no dedicated UI yet). You create a single Ballerina class with tool methods and register the toolkit in the agent’s tool list. The agent treats toolkit methods exactly like individual tools.

Use toolkits when:

- A group of tools shares state, such as a connector, database client, or configuration value.
- You want to enable or disable a set of related tools as a unit.

```ballerina
type Task record {|
    string description;
    time:Date dueBy?;
    time:Date createdAt = time:utcToCivil(time:utcNow());
    time:Date completedAt?;
    boolean completed = false;
|};

// A toolkit to manage a set of tasks.
public isolated class TaskManagerToolkit {
    *ai:BaseToolKit;

    private final map tasks = {};

    // The `getTools` method describes the tools provided by this toolkit.
    public isolated function getTools() returns ai:ToolConfig[] =>
        // The `ai:getToolConfigs` function generates tool configurations
        // for the specified tools.
        ai:getToolConfigs([self.addTask, self.listTasks]);

    // Tool to add a new task.
    @ai:AgentTool
    isolated function addTask(string description, time:Date? dueBy = ()) {
        lock {
            self.tasks[uuid:createRandomUuid()] = {
                description: description,
                dueBy: dueBy.clone()
            };
        }
    }

    // Tool to list all current tasks.
    @ai:AgentTool
    isolated function listTasks() returns map {
        lock {
            return self.tasks.clone();
        }
    }
}
```

## What's next

- **[Memory](memory.md)** — Make the agent’s tool calls remember earlier turns.
- **[Observability](observability.md)** — See which tools the agent actually selects.
- **[Evaluations](evaluations.md)** — Learn how to prevent regressions in AI agent quality.
