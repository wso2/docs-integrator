---
title: Gate Tools for Approval
---

# Gate Tools for Approval

By default, an agent runs on autopilot. It reasons and calls tools in a loop until it produces an answer, with no opportunity for a person to step in. That is fine for read-only actions such as looking up an order, but risky for sensitive ones such as issuing a refund, deleting a record, or sending an email.

Gating a tool adds a human-in-the-loop (HITL) checkpoint. The agent pauses right before executing the tool, displays its proposed action, and waits for a person to approve or reject the call before proceeding.

:::tip Need more than an approval?
A durable agent also pauses for approval, but takes it a step further: it can wait days for a person or an event, and resume right where it left off after a system restart. See [Build a Durable Agent](../../../../../get-started/quickstarts/build-durable-agent.md), and [Gated Tools vs Durable Agentic Workflow](gated-tools-vs-durable-agentic-workflow.md) for a full comparison.

## How it works

Gating is opt-in for each tool. When you gate a tool, the agent stops before invoking it and reports the tool calls waiting for a decision. A person reviews each proposed tool call and approves or rejects it, and the run continues from exactly where it paused.

| Stage | What happens |
|---|---|
| **Pause** | The agent decides to call a gated tool. Instead of running it, the agent saves its state and returns the pending approval requests. |
| **Decide** | A person reviews each request, including the tool name and the arguments the agent proposes to use, and approves or rejects it. |
| **Resume** | The decisions are passed back to the agent. Approved tool calls run, rejected ones do not, and the agent continues reasoning. |

Two properties are worth knowing before you build on it.

- **The agent does not hold a thread while it waits.** A pending approval can be resolved seconds or days later, from a different process or server replica, as long as it can reach the same memory store.
- **Nothing changes for agents that do not use it.** If no tool is gated, the agent never pauses and existing agents behave exactly as before.

Rejection is not simply a failure. The agent receives the rejection, along with any reason you supply, as feedback and replans. That makes the reason a useful way to redirect the agent, for example, "Refunds above 100 USD need manager sign-off. Create a ticket instead."

## 1. Gate a tool

Gating is configured on the tool, not on the agent.

1. On the agent canvas, select **Add Tool**.

    <ThemedImage
        alt="The orderAssistant agent canvas with the Add Tool button highlighted."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/01-add-tool-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/01-add-tool-v1.0.png'),
        }}
    />

2. Choose how you want to add the tool. For details on each option, see [Tools](../tools.md).
3. In the tool configuration panel, select **Requires Approval**.

    <ThemedImage
        alt="The Create Custom Tool panel for a refundOrder tool with orderId and amount parameters, with Requires Approval selected and the Approval Function field shown below it."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/02-required-approval-field-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/02-required-approval-field-v1.0.png'),
        }}
    />

4. Configure the following fields.

    | Field | Description |
    |---|---|
    | **Requires Approval** | Optional. Pauses the tool before it runs and waits for human approval. Off by default. |
    | **Approval Function** | Optional. Decides for each tool call whether approval is needed. Appears only when **Requires Approval** is selected. Leave it empty to require approval for every call. For conditional gating, see [Gate a tool conditionally](#2-gate-a-tool-conditionally). |

    These fields combine to give three behaviors.

    | Configuration | Behavior |
    |---|---|
    | **Requires Approval** off | The tool runs freely. The agent never pauses for it. |
    | **Requires Approval** selected, **Approval Function** empty | Every call to this tool pauses for approval. |
    | **Requires Approval** selected, **Approval Function** set | Only the tool calls the function accepts pause. |

5. Save the tool with **Create Tool** or **Save Tool**.

### Where the field appears

**Requires Approval** is available for the following tool options.

| Tool option | Supports Requires Approval |
|---|---|
| **Create Custom Tool** | Yes |
| **Use Connection** | Yes |
| **Use Function** | Yes |
| **Use Agent** | Yes |
| **Use MCP Server** | No |

Tools discovered from an MCP server are generated from the remote server's tool list, so there is no local declaration on which to set the field. To gate an action provided by an MCP server, wrap it in a function or a custom tool and gate that instead.

## 2. Gate a tool conditionally

Gating every call to a tool is often stricter than you need. A refund of 5 USD and a refund of 5000 USD are the same tool call, but only one of them needs a person's attention. **Approval Function** lets you decide for each call, based on the arguments the agent proposes.

1. Select **Requires Approval**.
2. Set **Approval Function**. Pick a compatible function from your agentic integration, or type a new name to create one. A compatible function takes the same parameters as the tool it gates and returns `boolean`, and the picker lists only functions that match.

    Typing a new name has WSO2 Agent Builder generate a function with the correct signature and a placeholder body that always requires approval.

    <ThemedImage
        alt="The Approval Function field with a new function name, refundNeedsReview, typed in."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/03-approval-function-field-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/03-approval-function-field-v1.0.png'),
        }}
    />

3. Open the generated function and replace the placeholder body with the real condition. When the condition holds, that call is gated and pauses for approval. When it doesn't, the call runs immediately.

1. Select the generated function under **Functions** in the side bar to open it.

    <ThemedImage
        alt="The side bar with refundNeedsReview listed under Functions and highlighted."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/04-approval-function-panel-view-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/04-approval-function-panel-view-v1.0.png'),
        }}
    />

2. Select the **Return** step. The **Return** panel shows the return expression, starting with the placeholder value, `true`. Change it to the real condition, for example `amount > 100d`, and select **Save**.

    <ThemedImage
        alt="The refundNeedsReview function flow with the Return step selected, and the Return panel showing the expression changed to amount > 100d."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/05-approval-function-edit-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/05-approval-function-edit-v1.0.png'),
        }}
    />

Generated for you, with a placeholder body, and linked to the tool through `requiresApproval`:

```ballerina
isolated function refundNeedsReview(string orderId, decimal amount) returns boolean {
    // TODO: inspect the proposed arguments and return true to require approval
    return true;
}

@ai:AgentTool {
    requiresApproval: refundNeedsReview
}
isolated function refundOrder(string orderId, decimal amount) returns string {
    ...
}
```

Edited to the real condition:

```ballerina
isolated function refundNeedsReview(string orderId, decimal amount) returns boolean {
    return amount > 100d;
}
```

Keep the following constraints in mind.

- The function runs synchronously, as part of the agent's reasoning, so keep it fast rather than doing something slow like a network call.
- The function can be evaluated again later for the same call, so it must return the same answer every time.
- The function fails safe. If it panics or does not return a `boolean`, the tool call pauses for approval rather than running unreviewed.

## 3. See which tools are gated

Gated tools are marked with a badge at the bottom-right of the tool's node on the agent canvas. Hover over the badge to see the **Requires Approval** tooltip. The badge is informational, and it gives you a way to confirm at a glance which tools can pause the agent.

<ThemedImage
    alt="The agent canvas with the refundOrder tool node showing the approval badge and its Requires Approval tooltip."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/gated-tools/06-tool-approval-badge-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/gated-tools/06-tool-approval-badge-v1.0.png'),
    }}
/>

## 4. Approve or reject in Agent Chat

When you chat with the agent through an **Agent Chat** trigger, pending approvals appear in the **Agent Chat** panel. To send your decision back to the agent, the chat service needs a `decision` resource next to its `chat` resource.

1. Add a `decision` resource to the chat service. Under **Entry Points** in the side bar, select the agent's chat service (for example, **AI Agent Services - /refund-desk**) to open the **AI Agent Service** view, then select **+ Decision**.

    <ThemedImage
        alt="The AI Agent Service view for /refund-desk, listing the POST chat resource, with the + Decision button highlighted."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/12-add-decision-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/12-add-decision-v1.0.png'),
        }}
    />

    WSO2 Agent Builder adds a `POST decision` resource next to `POST chat`.




    <ThemedImage
        alt="The AI Agent Service view for /refund-desk listing the POST chat and POST decision resources."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/13-decision-added-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/13-decision-added-v1.0.png'),
        }}
    />




    ```ballerina
    resource function post decision(@http:Payload ai:DecisionMessage request) returns ai:ChatRespMessage|error {
        ai:Resume resume = {decisions: request.decisions};
        string result = check orderAssistant.run(resume, request.sessionId);
        return {message: result};
    }
    ```

    Resuming uses the same `run` method as the `chat` resource: passing the decisions instead of a message is what resumes the paused run.




2. Chat with the agent. See [Try it and run](../agents.md#try-it-and-run). When the agent decides to call a gated tool, the chat shows an **Approval required** card with the tool's name and description. Select **Show arguments** to see the values the agent proposes to use.

    <ThemedImage
        alt="The Agent Chat panel showing an Approval required card for the refundOrder tool, with the arguments amount 400 and orderId 2077 shown, and Approve and Reject buttons."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/07-chat-approval-request-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/07-chat-approval-request-v1.0.png'),
        }}
    />

3. Select **Approve** to let the tool run. The agent continues and replies with the result.

    <ThemedImage
        alt="The Agent Chat panel showing refundOrder approved, followed by the agent's reply that a refund of 250 USD has been issued for order 1042."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/08-chat-approved-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/08-chat-approved-v1.0.png'),
        }}
    />

4. Or select **Reject**, optionally enter a reason, and select **Confirm Reject**. The reason is shown to the agent, which replans without running the tool.

    <ThemedImage
        alt="The Approval required card after selecting Reject, with a reason typed into the Reason (optional), shown to the agent box, and Cancel and Confirm Reject buttons."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/09-chat-reject-reason-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/09-chat-reject-reason-v1.0.png'),
        }}
    />

    <ThemedImage
        alt="The Agent Chat panel showing refundOrder rejected, followed by the agent's reply that it can't process the refund for order 2077."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/gated-tools/10-chat-rejected-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/gated-tools/10-chat-rejected-v1.0.png'),
        }}
    />

If the agentic integration restarts while an approval is pending and the agent uses the default in-memory store, the pending approval is lost, and approving it reports that no pending approval was found. See [Make pauses survive a restart](#make-pauses-survive-a-restart).

## 5. Make pauses survive a restart {#make-pauses-survive-a-restart}

A paused run is stored as a checkpoint in the agent's memory store, keyed by the session ID. Where that store keeps its data determines whether a pending approval survives.

| Memory configuration | Pauses survive a restart? |
|---|---|
| Default in-memory store | No. Pending approvals are lost when the process stops, and another replica cannot see them. |
| A durable store, such as a database-backed store | Yes. A pause can be resolved after a restart or by another replica. |

The default in-memory store is sufficient for development and testing. However, for production environments where human approvals might take hours, configure a durable memory store. To do this, select **Add Memory** on the **AI Agent** node, select **Create New Memory Store**, and choose a durable option, such as PostgreSQL, MSSQL, Redis, or Amazon DynamoDB. This single store persists both the conversation history and the pause checkpoints. See [Memory](../memory.md#add-memory-store).

<ThemedImage
    alt="The Configure Memory panel with the Select Memory Store list showing In Memory, Amazon DynamoDB, MSSQL, PostgreSQL, and Redis short-term memory stores."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/gated-tools/11-memory-store-options-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/gated-tools/11-memory-store-options-v1.0.png'),
    }}
/>

## Choose what to gate

Use the following table as a starting point.

| Situation | Recommended setup |
|---|---|
| The tool only reads data | Leave **Requires Approval** off. Gating read-only tools adds friction with no benefit. |
| The tool moves money, deletes data, or contacts a customer | Select **Requires Approval** and leave **Approval Function** empty. |
| The action is sensitive only past a threshold, such as a large refund | Select **Requires Approval** and set an **Approval Function** that tests the amount. |
| The action is sensitive only for certain records, such as production tenants | Select **Requires Approval** and set an **Approval Function** that inspects the identifier. |
| The tool comes from an MCP server | Wrap the operation in your own function or custom tool and gate that. |
| A person may take hours to respond | Attach a durable memory store so the pause survives a restart. |

Two habits keep gating useful rather than tiring. Gate the smallest number of tools you can, because reviewers who approve everything by reflex provide no real oversight. And write specific tool descriptions, because the description is what the reviewer reads when deciding.

## What's next

- **[Tools](../tools.md)** — Add functions, connectors, and MCP servers to your agents.
- **[Memory](../memory.md)** — Configure conversational and persistent memory, including durable stores.
- **[Observability](../observability.md)** — Trace which tools the agent selects and when it pauses.
