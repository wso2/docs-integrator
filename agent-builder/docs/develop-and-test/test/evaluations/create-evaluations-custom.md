---
title: Create Custom Evaluations
---

# Create Custom Evaluations

A **custom evaluation** is an evaluation function whose logic you build yourself. You start by filling a short form, and WSO2 Agent Builder opens the rest of the configuration in the visual designer. Use a custom evaluation when none of the prebuilt [evaluation templates](create-evaluations-templates.md) fits the check you need.

:::info Prerequisites
The example on this page scores the agent against an evalset, so have at least one evalset in your project. See [Create evalsets](evalsets.md) to capture or import one. A custom evaluation with **No evalset** does not need one.

## Start a new evaluation

1. Open the **Test Explorer** by clicking the test beaker icon in the activity bar.
2. Click **Add Test** at the top of the **Test Explorer** and choose **Add AI Evaluation**. If the project has no tests yet, click the **Add AI Evaluation** button in the **Test Explorer** instead.

   You can also start from your agent: open the agent, click **Evaluations**, click **Create Evaluation** (or **New Evaluation** if the agent already has evaluations), and then click **Write a Custom Evaluation** below the templates. The form opens for that agent with **Custom** already chosen, so continue from step 4.

<ThemedImage
    alt="Test Explorer in the Testing view with the Add AI Evaluation button and the weather-agent-tool-trajectory evalset listed under Evalsets."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/add-ai-evaluation-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/add-ai-evaluation-v1.0.png'),
    }}
/>

3. In the **Create New AI Evaluation** form, under **How would you like to build this evaluation?**, select **Custom**.
4. Under **Use an evalset?**, select **Use evalset**, then pick the evalset in **Evalset File**.
5. Fill the rest of the form and click **Save**.

<ThemedImage
    alt="Create New AI Evaluation form with Custom selected, Use evalset chosen, Evalset File set to weather-agent-tool-trajectory, and Minimum Pass Rate set to 90%."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/create-evaluation-form-custom-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/create-evaluation-form-custom-v1.0.png'),
    }}
/>

### Form fields

| Field | What it does |
|---|---|
| **AI Evaluation Name** | A unique name for the evaluation. |
| **How would you like to build this evaluation?** | Pick **Custom** to build your own evaluation logic. To start from a prebuilt evaluator instead, see [Create evaluations from templates](create-evaluations-templates.md). |
| **Use an evalset?** | Pick **Use evalset** to score the agent against an evalset, or **No evalset** to define the evaluation without one. |
| **Evalset File** | The evalset to use. Shown when **Use evalset** is selected. **Create Empty Evalset** creates a new evalset, and **Open Evalset** opens the selected one in the **Evalset Viewer**. When you start from your agent, **Generate with Copilot** has Copilot write an evalset for that agent. |
| **Minimum Pass Rate (%)** | The percentage of evalset cases that must pass for the run to succeed. |
| **Runs** | How many times to run the evaluation. |

Consider lowering the **Minimum Pass Rate** below 100%. Agent responses are non-deterministic, so a small amount of run-to-run variation is expected even when the agent is behaving correctly. A threshold around 80–90% tolerates that variance while still catching real regressions.

#### When to use an evalset

- **Use evalset.** Score the agent against the conversations captured in an evalset. Best when you have a representative dataset to replay. The rest of this page uses this option.
- **No evalset.** Define the evaluation entirely with your own logic. Use this for custom behaviour that does not fit the conversation-trace format, or when you do not have an evalset yet.

After you click **Save**, the evaluation opens in the visual designer for further configuration. To reopen it later, click the flow icon next to the evaluation in the **Test Explorer**.

<ThemedImage
    alt="Test Explorer with the flow icon highlighted next to the evaluateWeatherAgentToolCalls evaluation, with its visual designer flow on the canvas."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/open-evaluation-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/open-evaluation-flow-v1.0.png'),
    }}
/>

## Build the evaluation logic

The evaluation opens in the visual designer with a **Start** node. It receives a `thread` input, which is one `ai:ConversationThread` per evalset entry. Most evaluations iterate over its captured turns.

### Available inputs

| Field | Type | What it holds |
|---|---|---|
| `thread.id` | `string` | Session ID of the captured conversation. |
| `thread.traces` | `ai:Trace[]` | The list of turns captured in the evalset. |

Each entry in `thread.traces` is an `ai:Trace`:

| Field | Type | What it holds |
|---|---|---|
| `trace.userMessage.content` | `string` | The user input that triggered the turn. |
| `trace.toolCalls` | array | Tool calls the agent made during this turn. |
| `trace.output` | record | The agent's final response, with `content` and `toolCalls`. |
| `trace.tools` | array | Tools available to the agent at the time. |

### Iterate over each trace

Add a **Foreach** node from the **Control** group in the node panel.

<ThemedImage
    alt="Node panel open in the visual designer with Statement, Control, and AI categories. Foreach is listed under Control."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/node-panel-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/node-panel-v1.0.png'),
    }}
/>

Configure it to walk through the trace list:

- **Collection.** `thread.traces`. Use the helper pane to navigate **Inputs → thread → traces**.
- **Variable Name.** A name for the loop variable, for example, `trace`.
- **Variable Type.** `ai:Trace`.

<ThemedImage
    alt="Foreach configuration panel with Collection set to thread.traces, Variable Name set to trace, and Variable Type set to ai:Trace."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/foreach-config-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/foreach-config-v1.0.png'),
    }}
/>

The loop body runs once per trace, ready for the agent call and any checks inside.

### Run the agent on each trace

Inside the Foreach, add an **Agent** node from the **AI** group in the node panel.

<ThemedImage
    alt="Node panel scrolled to the AI category showing Direct LLM, RAG, and an Agent button."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/agent-node-pick-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/agent-node-pick-v1.0.png'),
    }}
/>

The **Agents** picker opens, listing every agent in the project. Select the one you want to evaluate.

<ThemedImage
    alt="Agents picker showing the weatherAgent listed under Agent."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/agent-picker-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/agent-picker-v1.0.png'),
    }}
/>

This replays each trace's original input against the current agent build and captures the response for comparison. The **AI Agent** form has the following key fields.

| Field | Value | Notes |
|---|---|---|
| **Query** | `trace.userMessage.content.toString()` | Replays the user input from the loop's `trace` variable. Switch the field to **Expression** first. |
| **Session ID** | `thread.id` | Runs the agent in the same session as the original conversation. Switch the field to **Expression** first. |
| **Type Descriptor** | `ai:Trace` | Sets the expected return format. Under **Advanced Configurations**. |
| **Result** | `actualTrace` (or any name) | The variable the agent's response is stored in. |

<ThemedImage
    alt="AI Agent configuration panel with Query, Session ID, Context, Type Descriptor, and Result fields filled in."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/agent-config-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/agent-config-v1.0.png'),
    }}
/>

The agent runs once per trace and stores its response in `actualTrace`, which the rest of the evaluation can compare against the expected trace.

### Compare the result with the expected trace

`trace` holds the **expected** behaviour recorded in the evalset, while `actualTrace` holds what the current agent run produced. The job of this step is to compare the two with assertion nodes.

Use the assertion nodes under **Test** in the node panel to score each trace. Available checks include `assertTrue`, `assertFalse`, `assertEquals`, `assertNotEquals`, `assertExactEquals`, `assertNotExactEquals`, `assertFail`, and `mock`.

<ThemedImage
    alt="Node panel scrolled to the Test category showing the available assertion functions."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/test-functions-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/test-functions-v1.0.png'),
    }}
/>

For tool-selection regressions, **assertEquals** is the most common choice. It verifies the agent picked the same tools, in the same order, with the same arguments.

| Field | Value | Notes |
|---|---|---|
| **Actual** | `actualTrace.toolCalls` | Tool calls from the current agent run, captured by the Agent node above. |
| **Expected** | `trace.toolCalls` | Tool calls recorded in the evalset for this trace. |

<ThemedImage
    alt="assertEquals form with Actual set to actualTrace.toolCalls and Expected set to trace.toolCalls."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/assert-equals-tool-calls-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/assert-equals-tool-calls-v1.0.png'),
    }}
/>

Add more asserts inside the loop for any other dimension you want to score, such as response content, tool count, or structured output fields.

Comparing tool calls against an evalset is also available as the prebuilt **Tool Trajectory** template, with no flow to build. See [Create evaluations from templates](create-evaluations-templates.md).

## What's next

- [Run evaluations](running-evaluations.md) — Execute the evaluation and open the report.
- [Create evaluations from templates](create-evaluations-templates.md) — Start from a prebuilt evaluator instead.
- [Create evalsets](evalsets.md) — Add more evalsets to broaden coverage.
