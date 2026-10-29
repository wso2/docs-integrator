---
title: Copilot Chat Interface
---

# Copilot Chat Interface

Once you've [signed in](copilot.md), this is a reference for the chat input bar itself — the controls, slash commands, and modes you'll use every time you talk to Copilot.

## Chat controls

The chat input bar is where you type prompts and control how Copilot responds. It groups the following controls:

<ThemedImage
    alt="Copilot chat controls: the slash palette listing commands and built-in skills, the Edit/Plan mode toggle, web access, attach context, and send."
    sources={{
        light: useBaseUrl('/img/editor/copilot/copilot-chat-controls-v1.0.png'),
        dark: useBaseUrl('/img/editor/copilot/copilot-chat-controls-v1.0.png'),
    }}
/>

| # | Control | Description |
|---|---|---|
| 1 | **Commands** | Task-specific entry points shipped with Copilot: `/typecreator` and `/ask`. Accessible by typing `/` in the chat or selecting the `/` icon. |
| 2 | **Built-in skills** | Domain playbooks Copilot applies while it writes code: data mapping, AI agents, agent evaluations, and durable agents. Invoke them explicitly or let Copilot pick. |
| 3 | **Edit / Plan mode** | **Edit** applies changes to your project directly. **Plan** returns a proposed approach first, with no code written until you accept. |
| 4 | **Web access** | Toggles whether Copilot may search the web for current documentation and references while answering. |
| 5 | **Slash palette** | Selecting it opens the command and skill list, the same list you get by typing `/` in the message field. |
| 6 | **Attach context** | Adds files, specs, or images to the request so Copilot works from your material rather than assumptions. |
| 7 | **Send** | Submits the prompt with the mode, web setting, and attachments currently selected. |

## Slash commands

Type `/` in the Copilot input bar to invoke a command for a specific task. You can also invoke an enabled skill directly: type `/` and select the skill from the list, for example `/data-map`.

| Command | Description |
|---|---|
| `/ask` | Ask questions about Ballerina to be answered based on the documentation. |
| `/typecreator` | Create custom types. |
| `/data-map` | [Generate data mappings](product://integrator/develop-and-test/integration-artifacts/supportive-artifacts/data-mapper/ai-mapping). |
| `/agent-builder` | Build or edit AI agents: system prompts, model providers, tools, human approval, subagents, knowledge bases, and triggers. |
| `/agent-evals` | Write, fix, and debug evaluations for your AI agents. |
| `/workflow-builder` | Build or edit durable agents with the `ballerina/workflow` module. |

`/ask` answers only from the Ballerina documentation and does not use your codebase context. For questions about your code or any other topic, message Copilot directly without a command. `/data-map`, `/agent-builder`, `/agent-evals`, and `/workflow-builder` are built-in skills rather than commands.

## Modes

Copilot has two modes: plan and edit. Switch between them using the toggle in the Copilot input bar.

- **Edit Mode**: Copilot starts generating immediately and applies the changes to your integration. Best for quick edits.
- **Plan Mode**: Copilot first proposes a high-level plan with a step-by-step task breakdown. If it needs more details, it asks clarifying questions before planning. When the plan is ready, select **Start building** to begin generation, or describe what should be different to revise the plan.

  <ThemedImage
      alt="Plan mode showing a structured step-by-step breakdown of execution tasks."
      sources={{
          light: useBaseUrl('/img/editor/copilot/plan-mode-v1.0.png'),
          dark: useBaseUrl('/img/editor/copilot/plan-mode-v1.0.png'),
      }}
  />

## What's next

- [Built-in Capabilities](capabilities.md) — Explore planning, review, testing, and more.
- [Customize Copilot](customize-copilot.md) — Give Copilot project instructions, reusable skills, and your own tools through MCP servers.
