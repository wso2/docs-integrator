---
title: "Customize Copilot"
description: "Give Copilot standing project instructions, reusable skills, and your own tools through MCP servers."
keywords: [wso2 integrator, copilot, agents.md, skills, mcp, model context protocol, customize copilot]
sidebar_position: 4
slug: /editor/copilot/customize-copilot
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Customize Copilot

Customize Copilot beyond its built-in behavior: give it standing instructions for your project, define reusable skills, or extend its toolset by connecting Model Context Protocol (MCP) servers. Find all three under **Copilot** > **Settings** > **Customize Copilot**.

## Project instructions

Add an `AGENTS.md` file to your project root to give Copilot standing instructions for the workspace, such as preferred libraries, naming and style rules, or error-handling patterns. Copilot reads the file as project context and applies the relevant instructions on every request.

To create or edit the file, open **Settings** in the Copilot panel and select the file icon on the **Agent instructions** row under **Customize Copilot**. If `AGENTS.md` does not exist yet, selecting the file icon creates it from a starter template; otherwise, it opens the existing file for editing.

<ThemedImage
    alt="The Customize Copilot section in Settings with the Agent instructions row."
    sources={{
        light: useBaseUrl('/img/editor/copilot/agents-md-settings-row.png'),
        dark: useBaseUrl('/img/editor/copilot/agents-md-settings-row.png'),
    }}
/>

## Skills

Skills are reusable instruction sets for specific tasks. When your request matches a skill, Copilot applies it automatically for consistent results without repeating the same guidance each time.

Copilot organizes skills into three groups:

- **Built-in**: Skills shipped with Copilot.
- **Project**: Skills saved to your project under `.agents/skills`.
- **User**: Skills saved to `~/.ballerina/copilot/skills`, available across all your projects.

### Manage skills

Open **Settings** in the Copilot panel and select the **Skills** row under **Customize Copilot**. The Skills panel lists each group. Enable or disable individual skills using the controls next to each skill.

:::note
Some built-in skills are always active and cannot be disabled.
:::

<ThemedImage
    alt="The Skills panel listing built-in, project, and user skills with enable toggles."
    sources={{
        light: useBaseUrl('/img/editor/copilot/skills-manager-panel.png'),
        dark: useBaseUrl('/img/editor/copilot/skills-manager-panel.png'),
    }}
/>

### Add your own skill

Open **Settings** in the Copilot panel, select the **Skills** row under **Customize Copilot**, and select **Add skill**.

- **Create new**: Enter a **Name**, a **Trigger / Description** that tells Copilot when to use the skill, and an optional **Body** with detailed rules and instructions.
- **Import**: Drag and drop or upload a `.md` file (with the skill name and description in YAML front matter) or a `.zip` or `.skill` file (containing a `SKILL.md`).

Choose the **Type** to control where the skill lives: **Project** saves it to `.agents/skills` in your project, while **User** saves it to `~/.ballerina/copilot/skills` and makes it available across all your projects.

<ThemedImage
    alt="The Add skill dialog with the Create new and Import tabs."
    sources={{
        light: useBaseUrl('/img/editor/copilot/add-skill-modal.png'),
        dark: useBaseUrl('/img/editor/copilot/add-skill-modal.png'),
    }}
/>

:::note
**Import** accepts one file at a time. To add several skills, select **Add skill** and import each `.md`, `.zip`, or `.skill` file separately.
:::

Once your skills are added, you can enable as many of them as you need. Copilot can load and combine multiple skills in the same request when each one matches the task.

### Skill structure

Each skill is a folder named after the skill that contains a `SKILL.md` file:

```text
~/.ballerina/copilot/skills/        # User skills
└── your-skill-name/
    └── SKILL.md

<project>/.agents/skills/           # Project skills
└── your-skill-name/
    └── SKILL.md
```

`SKILL.md` starts with YAML front matter, followed by the instructions Copilot loads when the skill applies:

```markdown
---
name: your-skill-name
description: Brief description of what this skill does and when to use it
---

# Your Skill Name

## Instructions
[Clear, step-by-step guidance for Copilot to follow]

## Examples
[Concrete examples of using this skill]
```

| Field | Required | Requirements |
|---|---|---|
| `name` | Yes | Must be unique across built-in, project, and user skills (case-insensitive). Cannot contain `/` or `\`. Use lowercase letters, numbers, and hyphens, since the name becomes the skill's folder name. |
| `description` | Yes | Must be non-empty and written on a single line. Copilot uses it to decide when the skill applies, so state both what the skill does and when to use it. |

If a skill with the same name already exists, Copilot asks you to rename the skill before saving it.

### How Copilot uses skills

When a skill is enabled and your request matches its trigger, Copilot applies the skill automatically. If a matching skill is disabled, Copilot pauses and asks whether to enable it. Select **Enable** to turn it on, or **Skip** to continue without it for that message.

<ThemedImage
    alt="The prompt asking whether to enable a matching skill for the current request."
    sources={{
        light: useBaseUrl('/img/editor/copilot/enable-skill-prompt.png'),
        dark: useBaseUrl('/img/editor/copilot/enable-skill-prompt.png'),
    }}
/>

## Copilot MCP tools

WSO2 Integrator Copilot ships with a built-in set of tools for building integrations. You can extend that toolset by connecting your own [Model Context Protocol](https://modelcontextprotocol.io) (MCP) servers. Once a server is connected and enabled, the tools it exposes become available to Copilot during a chat turn, and the agent can call them like any built-in tool.

This lets you and your team extend Copilot with the tools your work needs, whether they run as a local process or a remote service.

:::note
This section is about giving *Copilot* extra tools. To make *your own integrations* speak MCP, whether by exposing a service as an MCP server or by consuming MCP from an AI agent, see [MCP integration](../../develop-and-test/integration-artifacts/ai-integrations/mcp/mcp.md).
:::

### Enable MCP tools

To enable MCP tools, open **Copilot** > **Settings** > **Customize Copilot** > **MCP servers**, then turn on MCP tools.

Once enabled, the MCP chip appears in the Copilot chat input and you can add and manage servers. While MCP is off, the chip stays hidden and no servers connect.

<ThemedImage
    alt="Customize Copilot settings showing the MCP servers entry."
    sources={{
        light: useBaseUrl('/img/editor/copilot/mcp-customize-copilot.png'),
        dark: useBaseUrl('/img/editor/copilot/mcp-customize-copilot.png'),
    }}
/>

### Add a server

Open the MCP servers manager from **Copilot** > **Settings** > **Customize Copilot** > **MCP servers**. The MCP chip in the chat input gives a compact view of the same servers.

In the manager panel, select **+ Add server** and choose a transport:

- **Stdio**: A local process. Enter the **command** and its **arguments**, plus any environment variables the process needs.
- **HTTP**: A remote endpoint. Enter the **URL** and any headers.

Enter a name, then select **Add**. Copilot connects to the server and lists its tools. The status dot shows the result: connecting, connected, or failed with an error tooltip.

<ThemedImage
    alt="Add MCP server form with scope, name, transport, command, and arguments fields."
    sources={{
        light: useBaseUrl('/img/editor/copilot/mcp-add-server.png'),
        dark: useBaseUrl('/img/editor/copilot/mcp-add-server.png'),
    }}
/>

### Server scopes

A server is defined in one of the following scopes.

| Scope | Where it lives | Available |
|---|---|---|
| **User** | `~/.ballerina/copilot/mcp.json` | Across all your projects |
| **Project** | `<project>/.mcp.json`, committed with the repo | Only within that project, and shared with your team |
| **Built-in** | Curated and maintained by WSO2 | Across all your projects |

The project file uses the bare filename `.mcp.json`, following a common convention, so the same file is portable across tools that support MCP. Commit it to share a consistent set of servers with your team.

Built-in servers are provided by WSO2, so you add them from the manager rather than defining them in a config file. They appear in their own group when available.

<ThemedImage
    alt="MCP servers manager grouping servers under Project and User scopes."
    sources={{
        light: useBaseUrl('/img/editor/copilot/mcp-server-scopes.png'),
        dark: useBaseUrl('/img/editor/copilot/mcp-server-scopes.png'),
    }}
/>

#### Workspace trust

A project `.mcp.json` loads only when the workspace is trusted. This prevents a cloned repository from spawning arbitrary processes as soon as you open it. If you grant trust during a session, the project servers come online without a reload.

### Manage servers

In the MCP servers manager, servers are grouped by scope. Each row shows a status dot, the server name, its transport, and the tool count. Expand a row to see the tool list with names and descriptions.

From the manager, you can:

- **Enable or disable a server**: Use the per-server toggle. Disabling keeps the entry but stops the connection, so the tools no longer appear in Copilot.
- **Edit or delete a server**: Use the low-code form. Editing pre-fills every saved field.
- **Reload**: Retry servers that failed or disconnected.
- **Edit raw JSON**: Select the file icon next to a scope to open its config file directly in the editor, for advanced changes such as custom headers or environment variables.

<ThemedImage
    alt="Edit MCP server form pre-filled with a stdio command and arguments."
    sources={{
        light: useBaseUrl('/img/editor/copilot/mcp-edit-server.png'),
        dark: useBaseUrl('/img/editor/copilot/mcp-edit-server.png'),
    }}
/>

If a config file contains invalid JSON, a warning banner appears for that scope. Select it to open the file and fix the error. The rest of the servers keep working.

The MCP chip in the chat input mirrors these controls in a popover: the global toggle, per-server toggles, reload, and a **Manage** button that opens the full panel.

<ThemedImage
    alt="MCP chip popover in the chat input with per-scope server toggles and a Manage button."
    sources={{
        light: useBaseUrl('/img/editor/copilot/mcp-chip-popover.png'),
        dark: useBaseUrl('/img/editor/copilot/mcp-chip-popover.png'),
    }}
/>

### Pass secrets safely

A project `.mcp.json` is committed to the repository, so never put secrets directly in it.

- **HTTP servers**: Use `headersFromEnv` to map a header to an environment variable name. The value is read from the environment at connect time, so the token never sits in the committed file.
- **Stdio servers**: The process inherits the host environment, so pass secrets through your environment rather than the config file.

### Use MCP tools in chat

On each chat turn, Copilot automatically adds the tools from every connected and enabled server to its toolset. No further configuration is needed.

- Tool calls render in the chat stream and respect the existing approval flow, including auto-approve.
- Tools are namespaced as `mcp__<server>__<tool>` so tools from different servers never collide.
- A broken or unreachable server fails gracefully. It shows a failed status with an error message and does not affect the rest of Copilot. A connection timeout stops a slow server from hanging a turn.

Copilot prefers its built-in integration tools for core work and uses MCP tools when they add a capability relevant to your request.

### Configuration reference

Servers live in a `mcpServers` object. The `type` field is optional and is inferred from `command` (stdio) or `url` (HTTP). Open the file directly from the manager with the file icon, or edit it in your own editor.

<ThemedImage
    alt="A project .mcp.json file open in the editor with a stdio server entry."
    sources={{
        light: useBaseUrl('/img/editor/copilot/mcp-config-json.png'),
        dark: useBaseUrl('/img/editor/copilot/mcp-config-json.png'),
    }}
/>

Stdio server:

```json
{
  "mcpServers": {
    "everything": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everything"],
      "env": { "LOG_LEVEL": "info" },
      "disabled": false
    }
  }
}
```

HTTP server with an environment-backed header:

```json
{
  "mcpServers": {
    "remote-api": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": { "X-Trace-Id": "abc" },
      "headersFromEnv": { "Authorization": "MY_API_TOKEN" }
    }
  }
}
```

- `env` sets environment variables for a stdio process.
- `headers` sets static HTTP headers with plain values.
- `headersFromEnv` maps a header name to an environment variable name, read at connect time. Use it for secrets.
- `disabled: true` keeps the entry but turns the server off, the same as toggling it off in the UI.

### Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| The MCP chip doesn't appear. | MCP tool support is off. | Turn on MCP tools in **Copilot** > **Settings** > **Customize Copilot** > **MCP servers**. |
| A server shows a failed status. | The command can't be found, or the URL is unreachable. | Check the command, arguments, and URL. Select **Reload** after fixing. |
| A warning banner appears for a scope. | The `mcp.json` or `.mcp.json` file has invalid JSON. | Select the banner to open the file and fix the syntax. |
| Project servers don't load. | The workspace isn't trusted. | Grant workspace trust. The servers come online without a reload. |

## See also

- [Built-in Capabilities](capabilities.md) — Explore planning, review, testing, and more.
- [MCP integration](../../develop-and-test/integration-artifacts/ai-integrations/mcp/mcp.md) — Expose your integrations as MCP servers or consume MCP from an AI agent.
- [Copilot architecture and data handling](copilot-architecture.md) — How Copilot handles your data.
