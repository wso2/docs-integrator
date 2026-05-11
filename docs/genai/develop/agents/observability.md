---
title: Observability
---

# Observability

When you run an agent, you want to see exactly what it did. Which tools it picked, what it sent to the LLM, what came back, and how long each step took. WSO2 Integrator ships with a **dev-time trace server**, a built-in tracing backend that runs alongside the IDE and streams spans into a **Traces** panel as your integration executes. With tracing on, the LLM's tool choices and interpretations of each result are visible in the spans, so you can debug agent behavior without adding print statements.

## Enable tracing

Tracing is off by default. The way you turn it on depends on how the agent is exposed.

### Chat agents

If your agent is built with the [AI Chat Agent wizard](creating-an-agent.md), the agent canvas has a **Tracing** toggle in the top-right corner. When it's off, the toggle reads **Tracing: Off**.

![AI Chat Agent canvas with the Tracing toggle in the top-right showing 'Tracing: Off'.](/img/genai/develop/agents/observability/01-tracing-toggle-off.png)

Click the toggle to turn it on. The label changes to **Tracing: On** and a confirmation notification appears in the bottom-right.

![AI Chat Agent canvas with the toggle now showing 'Tracing: On' and a 'Tracing enabled.' notification at the bottom-right.](/img/genai/develop/agents/observability/02-tracing-toggle-on.png)

Click the toggle again at any time to turn tracing back off.

### Inline agents

Agents declared inline in source, anywhere outside the AI Chat Agent wizard, don't show the toggle. Use the command palette instead.

1. Open the command palette with `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux).
2. Run **Ballerina: Enable Tracing**.

![WSO2 Integrator IDE command palette with 'Enable Tracing' typed. The top suggestion is 'Ballerina: Enable Tracing'.](/img/genai/develop/agents/observability/04-enable-tracing-command.png)

To stop tracing, run **Ballerina: Disable Tracing** the same way.

![WSO2 Integrator IDE command palette with 'Disable Tracing' typed. The top suggestion is 'Ballerina: Disable Tracing'.](/img/genai/develop/agents/observability/05-disable-tracing-command.png)

The command works for chat agents too, so you can use it interchangeably with the toggle.

## View traces

There are two ways to look at traces from a running agent. The **View Trace** link inside the chat window (for chat agents), and the **Traces** panel at the bottom of the IDE.

### From the chat window

When you run a chat agent and open its chat panel, every agent response carries a **View Trace** link, and the chat header has a **Session Traces** button.

![The Agent Chat panel on the right side of the IDE showing a math tutor conversation. Each agent reply has an 'Execution Steps (n)' label and a 'View Trace' link below it. The chat header has 'Session Traces' and 'Clear Chat' buttons.](/img/genai/develop/agents/observability/06-chat-view-trace.png)

#### View Trace

Click **View Trace** on any reply to open the detailed trace for that single message.

![The Trace Logs view. The left sidebar lists the spans on a timeline, including Invoke Agent: Math Tutor and alternating Chat and Execute Tool spans. The main pane shows the selected 'Invoke Agent - Math Tutor' span with Latency, Total Input Tokens, Total Output Tokens, Provider, and Start and End times, followed by Input and Output sections.](/img/genai/develop/agents/observability/07-view-trace-detail.png)

The viewer has three regions: a **span timeline** on the left, **span detail** in the center, and the original chat on the right. The chat stays visible, so you can correlate spans with the message you're investigating without losing context. See [The trace viewer](#the-trace-viewer) below for what each region offers.

To jump straight to a specific span without scanning the timeline, expand the **Execution Steps** dropdown above an agent reply. It lists every Chat and Execute Tool span for that turn with its duration. Click any step to load it in the center pane.

![The Agent Chat with the 'Execution Steps (5)' dropdown expanded above a reply. The list shows alternating Chat gpt-4o-mini and Execute Tool sumTool/subtractTool entries with their durations. The trace viewer's center pane shows a Chat span detail.](/img/genai/develop/agents/observability/19-execution-steps-expanded.png)

#### Session Traces

Click **Session Traces** in the chat header to open a table of every trace produced in the current chat session.

![The Session Traces view showing '(3 traces)' for a session ID, with an Export button and a search bar. A table lists each trace's Timestamp, Trace ID, Input, and Output.](/img/genai/develop/agents/observability/08-session-traces-list.png)

Each row is one chat turn, with its timestamp, trace ID, user input, and the agent's reply. Click a trace ID to open its detail view (the same view as **View Trace**). Use the search bar to filter by message text or trace ID. Use **Export** to save the session for sharing or later analysis (see [Export traces](#export-traces)).

### From the Traces panel

For agents without a chat window, or when you want a flat list of every trace the integration has produced, use the **Traces** panel at the bottom of the IDE. Open it with `Cmd+J` (macOS) or `Ctrl+J` (Windows/Linux), then switch to the **Traces** tab. As the integration runs, traces stream in.

![The Traces tab at the bottom of the IDE listing several traces. The expanded one shows a 'post /chat (SERVER)' span with a child 'invoke_agent Math Tutor (CLIENT)' span.](/img/genai/develop/agents/observability/03-traces-panel.png)

Each row is one trace, typically one chat turn or one request to the integration. Expand a trace to see its span tree. The top-level service handler, the agent invocation, the LLM calls it makes, each tool invocation, and any HTTP calls those tools issue. Click a span to open it in the trace viewer.

By default the panel shows every trace the integration produces, including traces for unrelated services. Click the **agent** icon in the panel's toolbar to filter the list to agent traces only. A "Showing agent traces only" note appears at the top of the list while the filter is active.

![The Traces panel filtered to agent traces only. A 'Showing agent traces only' note appears at the top of the list, with the agent filter icon highlighted in the toolbar.](/img/genai/develop/agents/observability/18-traces-panel-agent-filter.png)

## The trace viewer

The trace viewer is the panel that opens when you click **View Trace**, a trace ID, or a span in the **Traces** panel. It's built specifically for understanding agent runs, so most of what you need is in this one view. You don't have to bounce between an external tool and the IDE.

### Span timeline

The left sidebar lists every span in the run, in the order it executed and indented to show parent-child relationships. The span types you'll see most often are:

- **Invoke Agent.** The top-level call to the agent. One per chat turn.
- **Chat.** A call to the underlying LLM (for example, `Chat: gpt-4o-mini`). An agent typically makes several Chat spans per turn. One for the initial decision, one after each tool result, and one for the final answer.
- **Execute Tool.** A tool the agent picked (for example, `Execute Tool: sumTool`).
- **HTTP.** Outbound HTTP calls made from inside a tool. Captured automatically.

Each row shows its duration and token usage where applicable, so the slowest or most expensive step in a turn is visible at a glance. Use the **Filter spans...** field above the list to narrow it down on long traces.

Click **Timeline** at the top of the sidebar to switch from the list view to a Gantt-style chart. Each span becomes a horizontal bar laid out across a time axis, so you can see when each step started and how long it took relative to the rest of the run. This is the fastest way to spot a long Chat span sitting between two quick tool calls, or to confirm that two operations overlapped. Click any bar to load that span's detail in the center pane, just like in the list view.

![The Trace sidebar in Timeline view. Spans are laid out as horizontal bars on a time axis from 0 to about 3.5 seconds. The top bar is Math Tutor spanning the full run, with child bars for three gpt-4o-mini Chat calls interleaved with sumTool and subtractTool Execute Tool spans.](/img/genai/develop/agents/observability/15-timeline-view.png)

### Quick info pills

Each span shows a row of quick info pills under its title, summarizing the metadata you care about most. The exact set depends on the span type.

![A Chat span detail header with a row of pills. Latency 2.04s, Input Tokens 306, Output Tokens 15, Temperature 0.7, Provider WSO2, Model gpt-4o-mini, Start Time, End Time.](/img/genai/develop/agents/observability/09-quick-info-pills.png)

For a **Chat** span, you typically see:

- **Latency.** Wall-clock time the LLM call took.
- **Input Tokens** and **Output Tokens.** Exact token counts for that call.
- **Temperature.** Sampling temperature used for the request.
- **Provider** and **Model.** Which LLM the call went to.
- **Start Time** and **End Time.** Useful when correlating with logs.

For an **Invoke Agent** span, the pills show aggregate totals across the whole turn (overall latency, total input tokens, total output tokens), so the parent span tells you the cost of the turn at a glance.

### Input and Output sections

Below the pills, every span has an **Input** section and an **Output** section, each collapsible. They contain the exact data that flowed in and out of that step.

![The Input section of an Invoke Agent span. SYSTEM INSTRUCTIONS shows Role 'Math Tutor' and the full Instructions text. Below it, a USER subsection shows the user's message 'Hi'.](/img/genai/develop/agents/observability/10-input-section.png)

What you see depends on the span:

- **Invoke Agent.** Input lists the **System Instructions** (Role and Instructions) and the **User** message. Output is the agent's final reply.
- **Chat.** Input lists the **Messages** sent to the LLM (the full chat thread, including system, user, assistant, and tool messages) plus the **Available Tools** definitions. Output is the model's response, including any tool calls it requested.
- **Execute Tool.** Input is the arguments the agent passed to the tool. Output is the value the tool returned.

The Output section behaves the same way.

![The Output section of an Invoke Agent span expanded. MESSAGES shows the agent's reply 'Hello! How can I assist you with your math questions today?'. An 'Advanced Details' section is collapsed below it.](/img/genai/develop/agents/observability/11-output-section.png)

For an **Execute Tool** span, Input shows the named arguments the agent supplied and Output shows the returned value. The span header also carries a **Tool Description** pill so you can see what the agent thought the tool did.

![The Execute Tool span detail for 'sumTool'. Pills show Latency 11ms and Tool Description 'Calculates the sum of two numbers'. The Input section labeled TOOL ARGUMENTS lists num1 = 3 and num2 = 2. The Output section labeled TOOL OUTPUT shows 5.0.](/img/genai/develop/agents/observability/14-execute-tool-detail.png)

Some spans also expose an **Advanced Details** section with provider-specific metadata, such as raw response headers and finish reasons. Expand it when you need to dig deeper.

### Formatted and raw views

Each section has a **Formatted** and **JSON** toggle (labeled **Raw** in some sections; both mean the underlying payload, untransformed).

**Formatted** renders the payload as an expandable tree, with field names highlighted and nested objects collapsible. Use this view when reading a prompt or scanning a tool definition.

![The AVAILABLE TOOLS section in Formatted view. The first tool is expanded as a tree showing name 'sumTool', description 'Calculates the sum of two numbers', and a parameters tree with required fields and properties.](/img/genai/develop/agents/observability/12-formatted-view.png)

**JSON** shows the underlying JSON exactly as the agent saw it. Use this view when copying a payload into a bug report or comparing two runs character-for-character.

![The same AVAILABLE TOOLS section in JSON view, showing the raw JSON array of tool definitions with name, description, and parameters fields.](/img/genai/develop/agents/observability/13-raw-view.png)

The toggle is per-section, so within a single span, you can keep Messages formatted while flipping Available Tools to JSON.

### Search

The detail pane has a **Search all sections...** field that filters within the current span's payload across both Input and Output. This is useful when a Chat span's input is several thousand tokens long and you want to find a specific tool name, parameter, or piece of text.

## Export traces

Traces are useful beyond the IDE, in bug reports, regression baselines, or evaluation runs. The trace viewer can export in two formats:

- **JSON.** The full trace as structured data. Best for archiving, sharing in a bug report, or comparing two runs.
- **Evalset.** The trace converted into an evaluation set you can run later through the testing framework. See [Evaluations](evaluations/overview.md) for the full workflow.

You can export a single trace or every trace in a chat session.

### Export a single trace

In the trace viewer, click the download icon at the top of the **Trace** sidebar. Choose **Export as JSON** or **Export as Evalset**.

![The Trace sidebar with the export menu open. Two options are shown: 'Export as JSON' and 'Export as Evalset'.](/img/genai/develop/agents/observability/16-export-single-trace.png)

The exported file contains the spans for that one chat turn only.

### Export a session

In the **Session Traces** view, click **Export** in the top-right and choose **Export as JSON** or **Export as Evalset**.

![The Session Traces view with the Export menu open. Two options are shown: 'Export as JSON' and 'Export as Evalset'.](/img/genai/develop/agents/observability/17-export-session.png)

The exported file contains every trace in the current session, in the order they ran. Use this when you want to capture an entire conversation, for example to reproduce an issue end-to-end or to seed a regression suite.

## Connect to an external trace provider

The trace viewer described above is wired to the built-in **IDE trace provider**. To send traces to your existing observability stack instead (Jaeger, Zipkin, or any OpenTelemetry-compatible collector), swap the trace provider in your project files.

The example below uses Jaeger. For other providers, follow the same pattern with the matching `ballerinax` extension. See the [Ballerina observability overview](https://ballerina.io/learn/overview-of-ballerina-observability/) for the full list of supported platforms.

Three changes are required:

1. In `Ballerina.toml`, include observability in the build:

    ```toml
    [build-options]
    observabilityIncluded = true
    ```

2. In any `.bal` file in your project (for example, `trace_enabled.bal`), import the provider extension. The `as _` prefix is required because the module is imported only for its side effects:

    ```ballerina
    import ballerinax/jaeger as _;
    ```

3. In `Config.toml`, enable tracing and select the provider:

    ```toml
    [ballerina.observe]
    tracingEnabled = true
    tracingProvider = "jaeger"
    ```

When you run the integration, spans flow to the configured collector instead of the IDE trace viewer. To point at a non-local collector or tune sampling, add a `[ballerinax.jaeger]` section to `Config.toml` with provider-specific keys. See the [Ballerina Jaeger configuration guide](https://ballerina.io/learn/supported-observability-tools-and-platforms/jaeger/) for the full list of configurables.

To switch back to the dev-time viewer, change the import to `ballerinax/idetraceprovider as _;` and set `tracingProvider = "idetraceprovider"` in `Config.toml`.

## What's next

- **[Evaluations](evaluations/overview.md)** — turn observed behavior into automated regression checks.
- **[Tools](tools.md)** — clear tool descriptions are the biggest lever on what shows up in traces.
- **[Memory](memory.md)** — every turn's memory contents appear in the LLM call spans.
