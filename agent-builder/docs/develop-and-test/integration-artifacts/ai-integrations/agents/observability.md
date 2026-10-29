---
title: Observe Agent Behavior
---

# Observability

When you run an agent, you want to see exactly what it did. Which tools it picked, what it sent to the LLM, what came back, and how long each step took. WSO2 Agent Builder ships with a **dev-time trace server**, a built-in tracing backend that runs alongside the editor and collects spans as your agentic integration executes. With tracing on, the LLM's tool choices and interpretations of each result are visible in the spans, so you can debug agent behavior without adding print statements.

## Enable tracing

Tracing is off by default, and it applies to the whole agentic integration.

### From the agent canvas

The agent canvas has a **Tracing** toggle in the top-right corner. When it's off, the toggle reads **Tracing: Off**. The same toggle is also on the **Chat Agent Service** view of an **Agent Chat** trigger.

<ThemedImage
    alt="The supportAgent agent canvas with the Tracing: Off toggle highlighted in the top-right corner, next to Evaluations."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/01-tracing-toggle-off-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/01-tracing-toggle-off-v1.0.png'),
    }}
/>

Click the toggle to turn it on. The label changes to **Tracing: On**, and a **Dev-time tracing enabled.** notification appears in the bottom-right.

<ThemedImage
    alt="The supportAgent agent canvas with the toggle now showing Tracing: On, and a Dev-time tracing enabled. notification at the bottom-right."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/02-tracing-toggle-on-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/02-tracing-toggle-on-v1.0.png'),
    }}
/>

Click the toggle again at any time to turn tracing back off.

### From the command palette

You can also turn tracing on and off from the command palette, for example when the agent canvas isn't open.

1. Open the command palette with `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux).
2. Run **Ballerina: Enable Tracing**.

<ThemedImage
    alt="The command palette with Enable Tracing typed. The top suggestion is Ballerina: Enable Tracing."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/04-enable-tracing-command-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/04-enable-tracing-command-v1.0.png'),
    }}
/>

To stop tracing, run **Ballerina: Disable Tracing** the same way.

<ThemedImage
    alt="The command palette with Disable Tracing typed. The top suggestion is Ballerina: Disable Tracing."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/05-disable-tracing-command-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/05-disable-tracing-command-v1.0.png'),
    }}
/>

## View traces

There are two ways to look at traces from a running agent: the **View Trace** link inside the **Agent Chat** panel, and the **Traces** panel at the bottom of the editor.

### From the chat window

When you chat with an agent through an **Agent Chat** trigger (see [Try it and run](agents.md#try-it-and-run)), every agent response carries an **Execution Steps** list and a **View Trace** link, and the chat header has a **Session Traces** button.

<ThemedImage
    alt="The Agent Chat panel for /refund-desk showing two order status questions. Each agent reply has an Execution Steps label above it and a View Trace link below it. The chat header has Session Traces and Clear Chat buttons."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/06-chat-view-trace-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/06-chat-view-trace-v1.0.png'),
    }}
/>

#### View Trace

Click **View Trace** on any reply to open the detailed trace for that single message in the **Trace Logs** view.

<ThemedImage
    alt="The Trace Logs view. The left sidebar lists the spans: Invoke Agent Order Assistant, two Chat gpt-4o-mini spans, and two Execute Tool getOrderStatus spans. The center pane shows the Invoke Agent - Order Assistant span with Latency, Total Input Tokens, Total Output Tokens, Provider, and Start and End times, followed by Input and Output sections. The chat stays open on the right."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/07-view-trace-detail-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/07-view-trace-detail-v1.0.png'),
    }}
/>

The viewer has three regions: a **span list** on the left, **span detail** in the center, and the original chat on the right. The chat stays visible, so you can correlate spans with the message you're investigating without losing context. See [The trace viewer](#the-trace-viewer) below for what each region offers.

To jump straight to a specific span without scanning the list, expand the **Execution Steps** dropdown above an agent reply. It lists every Chat and Execute Tool span for that turn with its duration. Click any step to load it in the center pane.

<ThemedImage
    alt="The Agent Chat with the Execution Steps (4) dropdown expanded above a reply. The list shows Chat gpt-4o-mini, two Execute Tool getOrderStatus entries, and another Chat gpt-4o-mini, each with its duration."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/19-execution-steps-expanded-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/19-execution-steps-expanded-v1.0.png'),
    }}
/>

#### Session Traces

Click **Session Traces** in the chat header to open a table of every trace produced in the current chat session.

<ThemedImage
    alt="The Session Traces view showing (2 traces) for a session ID, with an Export button and a search bar. A table lists each trace's Timestamp, Trace ID, and Input."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/08-session-traces-list-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/08-session-traces-list-v1.0.png'),
    }}
/>

Each row is one chat turn, with its timestamp, trace ID, user input, the agent's reply, latency, and token counts. Click a trace ID to open its detail view (the same view as **View Trace**). Use the search bar to filter by message text or trace ID. Use **Export** to save the session for sharing or later analysis (see [Export traces](#export-traces)).

### From the Traces panel

For agents without a chat window, or when you want a flat list of every trace the agentic integration has produced, use the **Traces** panel at the bottom of the editor. Open the panel with `Cmd+J` (macOS) or `Ctrl+J` (Windows/Linux) and switch to the **Traces** tab, or run **Traces: Focus on Tracing View** from the command palette. As the agentic integration runs, traces stream in.

Click a trace to open it in the **Trace Logs** view. Its span tree shows the top-level service handler (for example, **Server post /chat**), the agent invocation, the LLM calls it makes, each tool invocation, and any HTTP calls.

<ThemedImage
    alt="The Traces tab at the bottom of the editor listing several traces, with the selected trace open in the Trace Logs view above it. The span tree shows Server post /chat, Invoke Agent Order Assistant, two CLIENT calls, and an Execute Tool getOrderStatus span."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/03-traces-panel-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/03-traces-panel-v1.0.png'),
    }}
/>

By default the panel shows every trace the agentic integration produces, including traces for unrelated services. Click **Filter Agent Traces** (the agent icon) in the panel's toolbar to show agent traces only. A **Showing agent traces only** note appears at the top of the list while the filter is active. The toolbar also has **Clear Traces**, **Disable Tracing**, and **Collapse All**.

<ThemedImage
    alt="The Traces panel filtered to agent traces only. A Showing agent traces only note appears at the top of the list, and the Filter Agent Traces icon is highlighted in the toolbar."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/18-traces-panel-agent-filter-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/18-traces-panel-agent-filter-v1.0.png'),
    }}
/>

## The trace viewer

The trace viewer is the **Trace Logs** view that opens when you click **View Trace**, a trace ID, or a trace in the **Traces** panel. It's built specifically for understanding agent runs, so most of what you need is in this one view.

### Span list

The left sidebar lists every span in the run, in the order it executed and indented to show parent-child relationships. The span types you'll see most often are:

- **Server.** The service resource that received the request, for example `post /chat`.
- **Invoke Agent.** The top-level call to the agent. One per chat turn.
- **Chat.** A call to the underlying LLM (for example, `Chat gpt-4o-mini`). An agent typically makes several Chat spans per turn. One for the initial decision, one after each round of tool results, and one for the final answer.
- **Execute Tool.** A tool the agent picked (for example, `Execute Tool getOrderStatus`).
- **Client.** Outbound HTTP calls, such as the call to the model provider or calls made from inside a tool. Captured automatically.

Each row shows its duration and token usage where applicable, so the slowest or most expensive step in a turn is visible at a glance. Use the **Filter spans...** field above the list to narrow it down on long traces.

Click **Timeline** at the top of the sidebar to switch from the list view to a Gantt-style chart. Each span becomes a horizontal bar laid out across a time axis, so you can see when each step started and how long it took relative to the rest of the run. This is the fastest way to spot a long Chat span sitting between two quick tool calls, or to confirm that two operations overlapped. Click any bar to load that span's detail in the center pane, just like in the list view.

<ThemedImage
    alt="The Trace sidebar in Timeline view. Spans are laid out as horizontal bars on a time axis from 0 to about 4 seconds. The top bar is Order Assistant spanning the full run, with bars for a gpt-4o-mini Chat call, two getOrderStatus tool calls, and a second gpt-4o-mini Chat call."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/15-timeline-view-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/15-timeline-view-v1.0.png'),
    }}
/>

### Quick info pills

Each span shows a row of quick info pills under its title, summarizing the metadata you care about most. The exact set depends on the span type.

<ThemedImage
    alt="A Chat - gpt-4o-mini span detail header with a row of pills: Latency 2.52s, Input Tokens 424, Output Tokens 50, Temperature 0.7, Provider WSO2, Model gpt-4o-mini, Start Time, and End Time."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/09-quick-info-pills-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/09-quick-info-pills-v1.0.png'),
    }}
/>

For a **Chat** span, you typically see:

- **Latency.** Wall-clock time the LLM call took.
- **Input Tokens** and **Output Tokens.** Exact token counts for that call.
- **Temperature.** Sampling temperature used for the request.
- **Provider** and **Model.** Which LLM the call went to.
- **Start Time** and **End Time.** Useful when correlating with logs.

For an **Invoke Agent** span, the pills show aggregate totals across the whole turn (overall latency, total input tokens, total output tokens), so the parent span tells you the cost of the turn at a glance.

### Input and Output sections

Below the pills, every span has an **Input** section and an **Output** section, each collapsible. They contain the exact data that flowed in and out of that step.

<ThemedImage
    alt="The Input section of an Invoke Agent span. SYSTEM INSTRUCTIONS shows Role Order Assistant and the full Instructions text. Below it, a USER subsection shows the user's message."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/10-input-section-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/10-input-section-v1.0.png'),
    }}
/>

What you see depends on the span:

- **Invoke Agent.** Input lists the **System Instructions** (Role and Instructions) and the **User** message. Output is the agent's final reply.
- **Chat.** Input lists the **Messages** sent to the LLM (the full chat thread, including system, user, assistant, and tool messages) plus the **Available Tools** definitions. Output is the model's response, including any tool calls it requested.
- **Execute Tool.** Input is the arguments the agent passed to the tool. Output is the value the tool returned.

Every span also has an **Advanced Details** section, collapsed by default. It lists the span's **Technical IDs** (span ID, trace ID, parent span ID, and start and end times) and its **Other Attributes**, such as the OpenTelemetry `gen_ai.*` attributes and the entry point the request came through.

<ThemedImage
    alt="The Output section of an Invoke Agent span with the agent's reply under MESSAGES, and the Advanced Details section expanded below it, showing TECHNICAL IDS and OTHER ATTRIBUTES such as gen_ai.operation.name invoke_agent and gen_ai.agent.name Order Assistant."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/11-output-section-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/11-output-section-v1.0.png'),
    }}
/>

For an **Execute Tool** span, Input shows the named arguments the agent supplied and Output shows the returned value. The span header also carries a **Tool Description** pill so you can see what the agent thought the tool did.

<ThemedImage
    alt="The Execute Tool - getOrderStatus span detail. Pills show Latency 9ms and Tool Description Look up the current status of an order by its order ID. The Input section labeled TOOL ARGUMENTS lists orderId 1042. The Output section labeled TOOL OUTPUT shows Shipped."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/14-execute-tool-detail-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/14-execute-tool-detail-v1.0.png'),
    }}
/>

### Formatted and raw views

Each section has a **Formatted** and **JSON** toggle (labeled **Raw** in some sections; both mean the underlying payload, untransformed).

**Formatted** renders the payload as an expandable tree, with field names highlighted and nested objects collapsible. Use this view when reading a prompt or scanning tool calls.

<ThemedImage
    alt="A Chat span in Formatted view. The Output MESSAGES section is expanded as a tree showing role assistant, content null, and toolCalls with two getOrderStatus calls, each with its name, arguments, and id."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/12-formatted-view-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/12-formatted-view-v1.0.png'),
    }}
/>

**JSON** shows the underlying JSON exactly as the agent saw it. Use this view when copying a payload into a bug report or comparing two runs character-for-character.

<ThemedImage
    alt="The AVAILABLE TOOLS section in JSON view, showing the raw JSON array of tool definitions, starting with matchesTool and its name, description, and parameters fields."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/13-raw-view-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/13-raw-view-v1.0.png'),
    }}
/>

The toggle is per-section, so within a single span, you can keep Messages formatted while flipping Available Tools to JSON.

### Search

The detail pane has a **Search all sections...** field that filters within the current span's payload across both Input and Output. This is useful when a Chat span's input is several thousand tokens long and you want to find a specific tool name, parameter, or piece of text.

## Export traces

Traces are useful beyond the editor, in bug reports, regression baselines, or evaluation runs. The trace viewer can export in two formats:

- **JSON.** The full trace as structured data. Best for archiving, sharing in a bug report, or comparing two runs.
- **Evalset.** The trace converted into an evaluation set you can run later through the testing framework. See [Evaluations](evaluations/evaluations.md) for the full workflow.

You can export a single trace or every trace in a chat session.

### Export a single trace

In the trace viewer, click the **Export** (download) icon at the top of the **Trace** sidebar. Choose **Export as JSON** or **Export as Evalset**.

<ThemedImage
    alt="The Trace sidebar with the export menu open. Two options are shown: Export as JSON and Export as Evalset."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/16-export-single-trace-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/16-export-single-trace-v1.0.png'),
    }}
/>

The exported file contains the spans for that one chat turn only.

### Export a session

In the **Session Traces** view, click **Export** in the top-right and choose **Export as JSON** or **Export as Evalset**.

<ThemedImage
    alt="The Session Traces view with the Export menu open. Two options are shown: Export as JSON and Export as Evalset."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/observability/17-export-session-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/observability/17-export-session-v1.0.png'),
    }}
/>

The exported file contains every trace in the current session, in the order they ran. Use this when you want to capture an entire conversation, for example to reproduce an issue end-to-end or to seed a regression suite.

## Connect to an external trace provider

The trace viewer described above is wired to the built-in **editor trace provider**. To send traces to your existing observability stack instead (Jaeger, Zipkin, or any OpenTelemetry-compatible collector), swap the trace provider in your project files.

The example below uses Jaeger. For other providers, follow the same pattern with the matching `ballerinax` extension.

Three changes are required:

1. In `Ballerina.toml`, include observability in the build:

    ```toml
    [build-options]
    observabilityIncluded = true
    ```

2. In any `.bal` file in your agentic integration (for example, `trace_enabled.bal`), import the provider extension. The `as _` prefix is required because the module is imported only for its side effects:

    ```ballerina
    import ballerinax/jaeger as _;
    ```

3. In `Config.toml`, enable tracing and select the provider:

    ```toml
    [ballerina.observe]
    tracingEnabled = true
    tracingProvider = "jaeger"
    ```

When you run the agentic integration, spans flow to the configured collector instead of the editor trace viewer. To point at a non-local collector or tune sampling, add a `[ballerinax.jaeger]` section to `Config.toml` with the provider-specific configuration keys.

### Export over OTLP

To send traces to an OpenTelemetry Collector, or to any backend that accepts OTLP, use the `ballerina/otel` module in place of the Jaeger extension. Keep `observabilityIncluded = true` in `Ballerina.toml`, then:

1. Import the module:

    ```ballerina
    import ballerina/otel as _;
    ```

2. In `Config.toml`, select the `otel` provider and set the endpoint:

    ```toml
    [ballerina.observe]
    tracingEnabled = true
    tracingProvider = "otel"

    [ballerina.otel]
    tracesEndpoint = "http://127.0.0.1:4317"
    tracesProtocol = "grpc"

    [ballerina.otel.tracesResourceAttributes]
    "service.name" = "my-agent"
    ```

`ballerina/otel` sends requests without signing them. A backend that requires signed or authenticated requests, such as AWS X-Ray, needs an OpenTelemetry Collector in between to add the credentials.

Agent spans follow the OpenTelemetry GenAI semantic conventions, which most AI observability backends understand. A few details matter when a backend expects specific attribute names:

| Span | Attribute | Holds |
|---|---|---|
| `invoke_agent` (one per agent run) | `gen_ai.input.messages`, `gen_ai.output.messages` | The prompt and the agent's answer |
| `invoke_agent` | `gen_ai.conversation.id` | The `sessionId` passed to `agent.run()` |
| `execute_tool` (one per tool call) | `gen_ai.tool.arguments`, `gen_ai.tool.output` | The tool's arguments and its result |
| LLM call spans | `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens` | Token counts, recorded as **strings** |
| All spans | Instrumentation scope name `otel` | The instrumentation that produced the span; some backends select spans by it |

If your backend expects other names, for example `session.id` for the session or integer token counts, rename or convert the attributes in the collector rather than in the agent.

To switch back to the dev-time viewer from either provider, change the import to `ballerinax/idetraceprovider as _;` and set `tracingProvider = "idetraceprovider"` in `Config.toml`.

## What's next

- **[Evaluations](evaluations/evaluations.md)** — turn observed behavior into automated regression checks.
- **[Tools](tools.md)** — clear tool descriptions are the biggest lever on what shows up in traces.
- **[Memory](memory.md)** — every turn's memory contents appear in the LLM call spans.
