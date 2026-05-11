---
title: Tools
---

# Tools

Tools are the buttons your AI Agent can press. WSO2 Integrator gives you four ways to add a tool, all from the same dialog. This page is the reference for that dialog and what each option does.

## The Add Tool Dialog

On the agent canvas, with the AI Agent node selected, click **+ Add Tool** (or use the right-side **Tools** panel). The **Add Tool** dialog lists the four kinds of tool you can add:

![The Add Tool dialog with four options: Use Connection, Use Function, Use MCP Server, Create Custom Tool. Each option has a one-line description.](/img/genai/develop/agents/05-add-tool-dialog.png)

| Option | Use when… |
|---|---|
| **Use Connection** | You want the agent to use one of WSO2 Integrator's connectors (Salesforce, Gmail, MySQL, GitHub, …). Each operation of the connector becomes a tool. |
| **Use Function** | You already have a function in your project, or in the standard library, that the agent should be able to call. |
| **Use MCP Server** | The tools live on a remote MCP server (your own, a community server, or a SaaS MCP endpoint). |
| **Create Custom Tool** | You want to define a new tool from scratch — name, description, parameters, return — without writing code first. |

Each option opens a different second-step panel. The four sections below describe them.

## 1. Use Connection — Connector-Backed Tools

Picking **Use Connection** opens the **Add Connection** dialog. The dialog has two halves:

![The Add Connection dialog with explanation 'To establish your connection, first define a connector. You may create a custom connector using an API specification or by introspecting a database. Alternatively, you can select one of the pre-built connectors below. You will then be guided to provide the required details to complete the connection setup.' Section 'Create New Connector' showing two options: 'Connect via API Specification' (OpenAPI, WSDL — 'Import an OpenAPI or WSDL file to create a connector') and 'Connect to a Database' (MySQL, MSSQL, PostgreSQL — 'Enter credentials to introspect and discover database tables'). Below: 'Pre-built Connectors' section with All / Standard / Organization tabs.](/img/genai/develop/shared/08-add-connection-dialog.png)

| Path | When to use |
|---|---|
| **Create New Connector → Connect via API Specification** | You have an OpenAPI or WSDL file and want a typed connector generated. |
| **Create New Connector → Connect to a Database** | You want BI to introspect a database (MySQL, MSSQL, PostgreSQL) and generate a connector for the discovered tables. |
| **Pre-built Connectors** | A pre-built connector exists for your service (HTTP, Salesforce, Gmail, GitHub, …). |

The Pre-built Connectors section is filtered by the **All / Standard / Organization** tabs and includes the rich AI-related catalogue:

![The Add Connection dialog showing the AI connector catalogue: Chat (ballerinax/openai.chat), Chat (ballerinax/azure.chat), Openai EmbeddingProvider (ballerinax/ai.openai), Azure EmbeddingProvider (ballerinax/ai.azure), Text (ballerinax/openai.text), Text (ballerinax/azure.text), Embeddings (ballerinax/ai.embeddings), Agent MistralAIModel (ballerinax/ai.agent), Agent AnthropicModel (ballerinax/ai.agent), Agent AzureOpenAIModel (ballerinax/ai.agent), Agent OpenAIModel (ballerinax/ai.agent), Agent ReActAgent (ballerinax/ai.agent), Agent OllamaModel (ballerinax/ai.agent), Agent Chat (ballerinax/ai.agent), Agent FunctionCallAgent (ballerinax/ai.agent), Embeddings (ballerinax/openai.text), Index (ballerinax/azure.ai.search), Search (ballerinax/azure.ai.search), Openrouter OpenAIModel (ballerinax/ai.openrouter), Vertex EmbeddingProvider (ballerinax/googleapis.ai), Audio (ballerinax/openai.audio), Images (ballerinax/openai.images), Finetunes (ballerinax/openai.finetunes).](/img/genai/develop/shared/09-add-connection-ai-catalogue.png)

After selecting the connection, BI lists its operations. Tick the operations you want the agent to be able to call. Each ticked operation becomes a tool — its description and parameter shapes come from the connector's metadata.

Use this when an off-the-shelf connector already does what you need; you save writing wrapper code.

## 2. Use Function — Project or Library Functions

Picking **Use Function** opens the **Create Tool from Function** panel. The panel groups available functions into three sections, each separately searchable from the search box at the top:

![The Create Tool from Function panel with a search box at the top. Sections: Within Project (functions defined in the current project, currently empty since no function has been authored). Standard Library expanded with three subgroups — io (fileReadJson, fileReadString, fileWriteJson, fileWriteString, print, println), log (printDebug, printError, printInfo, printWarn), time (utcFromString, utcNow). Imported Functions section collapsed at the bottom.](/img/genai/develop/agents/06-tool-from-function.png)

| Group | Notes |
|---|---|
| **Within Project** | Any function in your own code, including [natural functions](/docs/genai/develop/natural-functions/overview), can become a tool with one click. |
| **Standard Library** | Curated common Ballerina utilities organised by module. The visible defaults: |
| ↳ **`io`** | `fileReadJson`, `fileReadString`, `fileWriteJson`, `fileWriteString`, `print`, `println` |
| ↳ **`log`** | `printDebug`, `printError`, `printInfo`, `printWarn` |
| ↳ **`time`** | `utcFromString`, `utcNow` |
| **Imported Functions** | Functions from any module already imported in your project (e.g. `googleapis.gmail`, `salesforce`). |

Pick a function and BI:

- Reads its **doc comment** as the tool description.
- Reads each **parameter description** (the `# + name - description` lines) as parameter metadata for the LLM.
- Reads the **return type** as the tool's output schema.
- Adds the `@ai:AgentTool` annotation if the function doesn't have one yet.

If a function lacks a doc comment, BI prompts you to add one — the LLM cannot use a tool with no description. The first sentence of the doc comment is what the LLM sees, so make it specific.

> **Tip:** Natural functions make excellent tools. The agent's main LLM handles routing; the natural function uses (potentially) a different model with a tighter prompt and stricter return type for the actual subtask.
>
> **Security note:** Standard Library functions like `io:fileWriteString` give the agent the power to *write to the local filesystem*. Only attach utilities the agent genuinely needs.

## 3. Use MCP Server — Tools Over the Standard Protocol

Picking **Use MCP Server** opens the **Add MCP Server** panel:

![The Add MCP Server panel — Tools to Include set to All, then Advanced Configurations including Info (name, version), HTTP Version with a Select / Expression toggle, HTTP1 Settings, HTTP2 Settings, Timeout (default 30 seconds), Forwarded.](/img/genai/develop/agents/08-add-mcp-server.png)

Configuration:

| Field | What it does |
|---|---|
| **Server URL** (top of the panel, scrolled out of frame) | The MCP endpoint, for example `http://localhost:9090/mcp` or `https://mcp.example.com`. |
| **Tools to Include** | `All` exposes every tool the server advertises; or pick a subset by name. |
| **Info → name / version** | Identification of the MCP client your agent presents. Defaults are usually fine. |
| **HTTP Version** | `HTTP/2_0` for modern Streamable HTTP; `HTTP/1_1` for older servers. |
| **HTTP1 / HTTP2 Settings** | Protocol-specific tuning — keep-alive, header sizes, frame sizes. |
| **Timeout** | Per-call timeout. The default is 30 seconds. Increase for slow tools. |
| **Forwarded** | Whether to set the `Forwarded` / `X-Forwarded-For` header when this MCP client sits behind a proxy. |

After saving, every tool the MCP server advertises (or every tool in your **Tools to Include** list) is now available to the agent. They appear in the agent's tool list alongside any local function tools, indistinguishable from the agent's perspective.

Common uses:

- A WSO2 Integrator project consuming **its own** MCP service (see [Exposing a Service as MCP](/docs/genai/develop/mcp/exposing-as-mcp)).
- A community MCP server for Slack, GitHub, file systems, or your CRM.
- A SaaS MCP endpoint your vendor provides.

> **Tip:** Filter to the specific tools you need. LLMs choose better when the tool list is short and specific.

## 4. Create Custom Tool — Hand-Crafted Definitions

Picking **Create Custom Tool** opens the **Create New Agent Tool** dialog. This is a full-page dialog with a clear header and structured sections:

![The Create New Agent Tool dialog (initial empty state). Header: 'Create New Agent Tool — Create a new agent tool that can be invoked by AI agents.' Section: 'Create New Agent Tool — Define the inputs and outputs of the tool'. Field 1: Name* (with 'missing identifier' validation warning). Field 2: Description (description text area: 'Description of the agent tool. This will help AI agents understand when to use this tool and how to use it.'). Field 3: Parameters with explanation 'Define the inputs for the agent tool. These are the parameters that AI agents will use when calling this tool.' and + Add Parameter link. Field 4: Return Type (with type icon). Field 5: Description (for the return value). Advanced Configurations Expand at the bottom.](/img/genai/develop/agents/23-create-custom-tool-blank.png)

Use this when you want to define a tool *before* you write its implementation, or when the tool's shape is genuinely custom.

| Field | Required | What it does |
|---|---|---|
| **Name*** | Yes | The tool's name. The LLM uses this to refer to it. Camel-case, descriptive: `lookupCustomer`, `bookAppointment`. Must be a valid Ballerina identifier — letters, digits, underscores; cannot start with a digit. Empty value triggers the "missing identifier" warning. |
| **Description** | No | What the tool does **and** when the agent should use it. The single most important field for tool quality — even though it's optional, the agent will rarely pick a tool without one. |
| **Parameters** | No | Each parameter has a name, type, and description. The description tells the LLM what to put in. **+ Add Parameter** opens a row with name / type / description fields. |
| **Return Type*** | Yes | The Ballerina type of the return value. Drives the schema the LLM sees. The picker shows Primitive Types (`string`, `int`, `float`, `decimal`, `boolean`, `()`) plus **+ Create New Type** and **Open Type Browser** for project-defined records. |
| **Description** (return) | No | One-line description of the return value, included in the schema. |
| **Advanced Configurations** | No | Visibility, isolation requirements, retries. Defaults are usually fine. |
| **Create** | — | Generates the tool definition and a stub function in your project. |

After you click **Create**, BI generates a stub function annotated `@ai:AgentTool`. You fill in the implementation — call an API, run a query, do whatever the tool is supposed to do — and the agent can already select it.

A typical filled-in form before clicking Create:

![The Create New Agent Tool dialog with values filled in. Name* set to 'CustomTool'. Description empty. Parameters empty (just the + Add Parameter link). Return Type empty (just the type input). Advanced Configurations Expand link. Create button now active (blue) at the bottom.](/img/genai/develop/agents/07-create-custom-tool.png)

## After Adding a Tool

The new tool shows up in the agent's right-side **Tools** panel and is included in every reasoning step from then on. Two things to keep in mind:

- **Mention the tool in Instructions.** A line in the system prompt that says *"Use `lookupCustomer` whenever the user mentions a customer ID"* significantly improves tool-selection accuracy.
- **Watch the count.** Above ~10 tools, models start picking less reliably. Group related tools into a [toolkit](#toolkits) instead, or split the agent into a router agent plus specialists.

## Toolkits

A **toolkit** is a class that bundles related tools — for example, a `BillingToolkit` that exposes `getInvoice`, `processRefund`, and `getPaymentHistory`. Toolkits are written in source view today (no separate UI yet); you create one Ballerina class with the tool methods and register the toolkit in the agent's tool list. The agent treats the toolkit's methods exactly like individual tools.

Use toolkits when:

- A group of tools shares state (a connector, a database client, a configuration value).
- You want to enable / disable a set of related tools as a unit (read-only mode vs full access).

## Tool Quality Checklist

Run through this before shipping an agent:

- [ ] Each tool has a one-sentence description that names *what* and *when*.
- [ ] Each parameter has a description.
- [ ] The return type is the smallest one that contains what the agent needs (no kitchen-sink JSON).
- [ ] Destructive tools mention the confirmation requirement in their description.
- [ ] The agent's Instructions reference each tool at least once.
- [ ] You've tried the agent with edge cases — empty inputs, ambiguous questions, off-topic requests.

## What's Next

- **[Memory](memory.md)** — make the agent's tool calls remember earlier turns.
- **[Observability](observability.md)** — see which tools the agent actually picks.
