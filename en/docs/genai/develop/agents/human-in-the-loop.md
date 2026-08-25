---
sidebar_position: 5
title: Human-in-the-Loop
description: Pause an AI agent for human approval before it runs a sensitive tool in WSO2 Integrator, then approve or reject and resume the run.
keywords: [wso2 integrator, human in the loop, approval, ai agents, tools]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Human-in-the-Loop

By default, an agent runs on autopilot. It reasons and calls tools in a loop until it produces an answer, with no opportunity for a person to step in. That is fine for read-only actions such as looking up an order, but risky for sensitive ones such as issuing a refund, deleting a record, or sending an email.

Human-in-the-loop lets an agent pause immediately before it runs a sensitive tool, hand control back to your application, and continue once a human has approved or rejected the proposed call.

## How it works

Approval is opt-in for each tool. When you mark a tool as requiring approval, the agent stops before invoking it and reports the tool calls that are waiting for a decision. A human reviews each proposed call and approves or rejects it, and the run then continues from exactly where it paused.

The cycle has three stages.

| Stage | What happens |
|---|---|
| **Pause** | The agent decides to call a gated tool. Instead of running it, the agent saves its state and returns the pending approval requests. |
| **Decide** | A human reviews each request, including the tool name and the arguments the agent proposes to use, and approves or rejects it. |
| **Resume** | The decisions are passed back to the agent. Approved calls run, rejected calls do not, and the agent continues reasoning. |

Two properties of this design are worth knowing before you build on it.

- **Pausing is asynchronous.** The agent does not block a thread while it waits. A pending approval can be resolved seconds or days later, from a different process or server replica, as long as it can reach the same store.
- **Nothing changes for agents that do not use it.** If no tool is marked as requiring approval, the agent never pauses and existing agents behave exactly as before.

Rejection is not simply a failure. The agent receives the rejection, along with any reason you supply, as feedback and replans. This makes the reason field a useful way to redirect the agent, for example, "Refunds above 100 USD need manager sign-off. Create a ticket instead."

## Mark a tool as requiring approval

Approval is configured on the tool, not on the agent. Select the **AI Agent** node in the agent canvas, click **+** to open the **Add Tool** panel, and choose how you want to add the tool. For details on each option, see [Tools](tools.md).

The **Requires Approval** field appears in the tool configuration panel for the following options.

| Tool option | Supports Requires Approval |
|---|---|
| **Use Function** | Yes |
| **Use Connection** | Yes |
| **Create Custom Tool** | Yes |
| **Use Agent** | Yes |
| **Use MCP Server** | No |

Tools discovered from an MCP server are generated from the remote server's tool list, so there is no local declaration on which to set the field. To gate an action provided by an MCP server, wrap it in a function or a custom tool and mark that instead.

<!-- TODO: Add screenshot 32-requires-approval-field.png — tool configuration panel with Requires Approval checked and Approval Function empty -->

Configure the following fields.

| Field | Required | Description |
|---|---|---|
| **Requires Approval** | No | Pauses this tool before it runs and waits for human approval. Cleared by default. |
| **Approval Function** | No | Decides for each call whether approval is needed. Available only when **Requires Approval** is selected. Leave it empty to require approval for every call. |

These fields combine to give three behaviors.

| Configuration | Behavior |
|---|---|
| **Requires Approval** cleared | The tool runs freely. The agent never pauses for it. |
| **Requires Approval** selected, **Approval Function** empty | Every call to this tool pauses for approval. |
| **Requires Approval** selected, **Approval Function** set | Only the calls the function returns `true` for pause. See [Conditional approval](#conditional-approval). |

Save the tool with **Create Tool** or **Save Tool**.

:::info
When you edit a tool that already exists, **Approval Function** accepts only functions already defined in your project. Create the function first, then select it. When you create a new tool, you can type a new name and WSO2 Integrator generates the function for you.
:::

## Conditional approval

Gating every call to a tool is often stricter than you need. A refund of 5 USD and a refund of 5000 USD are the same tool call, but only one of them warrants a human's attention. **Approval Function** lets you decide for each call, based on the arguments the agent proposes.

The function must take **the same parameters as the tool it gates** and return `boolean`. Returning `true` pauses that call for approval, and returning `false` lets it run.

If you type a new name in **Approval Function**, WSO2 Integrator scaffolds the function next to the tool with the correct signature and a placeholder body.

<!-- TODO: Add screenshot 34-approval-predicate-stub.png — the generated isolated function returning boolean with its TODO comment -->

```ballerina
isolated function refundNeedsReview(string orderId, decimal amount) returns boolean {
    // TODO: inspect the proposed arguments and return true to require approval
    return true;
}
```

Replace the body with the real condition.

```ballerina
isolated function refundNeedsReview(string orderId, decimal amount) returns boolean =>
    amount > 100d;
```

Keep the following constraints in mind.

- The signature must match the tool exactly. If it does not, compilation fails with diagnostic `AI_111`.
- The function must be `isolated` and must be deterministic for a given set of arguments. It runs synchronously, in line with the agent's reasoning.
- The function fails safe. If it panics or does not return a `boolean`, the call pauses for approval rather than running unreviewed.

## Approve or reject in the agent chat

Open the chat interface from the agent canvas and send a message that leads the agent to a gated tool. Instead of a text reply, the agent responds with an approval card headed **Approval required**, followed by the number of pending requests.

<!-- TODO: Add screenshot 36-chat-approval-card.png — chat approval card with arguments expanded and the input reading "Waiting on your decision…" -->

Each pending request shows its position in the batch, such as `1/2`, the tool name, and the tool description. Click **Show arguments** to inspect the exact arguments the agent proposes to use, and **Hide arguments** to collapse them again.

Respond using the following controls.

| Control | Description |
|---|---|
| **Approve** | Runs the proposed tool call as it stands. |
| **Reject** | Blocks the call and opens a box for an optional reason. |
| **Confirm Reject** | Submits the rejection along with the reason. |
| **Cancel** | Discards the rejection and returns to the **Approve** and **Reject** buttons. |
| **Approve All** | Approves every pending request. Appears only when more than one request is pending. |
| **Reject All** | Rejects every pending request. Appears only when more than one request is pending. |

<!-- TODO: Add screenshot 37-reject-reason.png — reject reason box with Cancel and Confirm Reject -->

The reason you type is shown to the agent, so use it to explain what to do instead rather than only why the call was blocked.

While a decision is outstanding, the chat input is disabled and its placeholder reads **Waiting on your decision…**. Once every request is decided, the card collapses to a one-line summary of what was approved or rejected, and the agent continues its run. An agent can pause more than once in a single turn, so you may see several cards before you get a final answer.

## Approval badge on the agent canvas

Tools that require approval are marked with a badge in the top-right corner of the tool in the **AI Agent** node. Hover over the badge to see the **Requires Approval** tooltip. The badge is informational, and it gives you a way to confirm at a glance which tools can pause the agent.

<!-- TODO: Add screenshot 35-tool-approval-badge.png — agent node showing the approval badge and its tooltip -->

## Configure approval in code

In Ballerina, a tool is gated with the `requiresApproval` field of the `@ai:AgentTool` annotation. Set it to `true` to gate every call, or to a function to gate calls conditionally.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Select the **AI Agent** node and click **+**.
2. Select **Use Function** and choose the function to expose as a tool.
3. Select **Requires Approval**.
4. Leave **Approval Function** empty to require approval for every call.
5. Click **Save Tool**.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// A read-only tool. The agent calls this freely.
@ai:AgentTool
isolated function lookupOrder(string orderId) returns Order|error {
    // Return the order for the given ID.
}

// A sensitive tool. The agent pauses before every call.
@ai:AgentTool {requiresApproval: true}
isolated function issueRefund(string orderId, decimal amount) returns string|error {
    // Issue the refund.
}

// A sensitive tool gated only above a threshold.
@ai:AgentTool {requiresApproval: refundNeedsReview}
isolated function issueLargeRefund(string orderId, decimal amount) returns string|error {
    // Issue the refund.
}
```

</TabItem>
</Tabs>

The agent itself needs no approval-specific configuration. The rules come entirely from the tools you give it.

### A complete example

The following program builds a support assistant with one free tool and one gated tool, then handles approvals from the console.

```ballerina
import ballerina/ai;
import ballerina/io;

type Order record {|
    string id;
    string customer;
    decimal total;
|};

isolated map<Order> orders = {
    "ORD-1001": {id: "ORD-1001", customer: "Dana", total: 240.00}
};

// A read-only tool. The agent may call this without approval.
@ai:AgentTool
isolated function lookupOrder(string orderId) returns Order|error {
    lock {
        Order? orderRecord = orders[orderId];
        if orderRecord is () {
            return error("no such order");
        }
        return orderRecord.clone();
    }
}

// A sensitive tool. `requiresApproval` makes the agent pause before it runs.
@ai:AgentTool {requiresApproval: true}
isolated function issueRefund(string orderId, decimal amount) returns string|error {
    lock {
        Order? orderRecord = orders[orderId];
        if orderRecord is () {
            return error("no such order");
        }
        if amount > orderRecord.total {
            return error("refund exceeds order total");
        }
    }
    return string `Refunded ${amount} for order ${orderId}.`;
}

final ai:Agent supportAgent = check new ({
    systemPrompt: {
        role: "Support Assistant",
        instructions: string `You help customers look up their orders and
            issue refunds. Always confirm the order before refunding.`
    },
    tools: [lookupOrder, issueRefund],
    model: check ai:getDefaultModelProvider()
});

public function main() returns error? {
    string sessionId = "support-session-1";
    while true {
        string userInput = io:readln("User (or 'exit' to quit): ");
        if userInput == "exit" {
            break;
        }

        string|ai:Error result = supportAgent.run(userInput, sessionId);

        // A single turn may propose several gated calls, and the agent can pause
        // more than once, so loop until the run is no longer waiting on a human.
        while result is ai:ApprovalRequiredError {
            map<ai:HumanResponse> decisions = {};
            foreach ai:ApprovalRequest req in result.detail().requests {
                io:println(string `Approval needed for '${req.toolName}' ` +
                    string `with arguments ${req.arguments.toString()}`);
                string decision = io:readln("Approve? (yes / no): ");
                if decision == "yes" {
                    decisions[req.id] = {decision: ai:APPROVE};
                } else {
                    string reason = io:readln("Reason for rejection: ");
                    decisions[req.id] = {decision: ai:REJECT, reason};
                }
            }

            // Passing an `ai:Resume` rather than a query is what tells `run` to
            // continue the paused run instead of starting a new turn.
            result = supportAgent.run({decisions}, sessionId);
        }

        if result is ai:Error {
            return result;
        }
        io:println("Agent: ", result);
    }
}
```

### The types involved

| Type | Purpose |
|---|---|
| `ai:ApprovalRequiredError` | Returned by `run` when the agent pauses. Its detail carries an `ai:ApprovalRequest[]` in the `requests` field. |
| `ai:ApprovalRequest` | One proposed tool call awaiting a decision. Carries `id`, `sessionId`, `toolName`, `toolDescription`, `arguments`, and `batchIndex`. |
| `ai:HumanResponse` | A decision, made up of `decision` and an optional `reason`. |
| `ai:ApprovalDecision` | The enum `ai:APPROVE` or `ai:REJECT`. |
| `ai:Resume` | The value passed to `run` to continue a paused run. Holds `decisions`, keyed by each request's `id`. |
| `ai:ApprovalNotFoundError` | Returned when a resume arrives for a session with nothing pending. |
| `ai:UnknownApprovalIdError` | Returned when a resume names an ID that is not currently pending. |

There is no separate resume operation. The `run` method accepts either a query or an `ai:Resume`, and the input type is what distinguishes a new turn from a continuation.

Two behaviors help keep real applications correct.

- **Partial decisions are allowed.** If you supply decisions for only some of the pending requests, the rest stay pending and `run` returns a fresh `ai:ApprovalRequiredError` listing only those still undecided.
- **A pending approval blocks new turns.** Calling `run` with a new query while an approval is outstanding returns the same `ai:ApprovalRequiredError` instead of starting an unrelated turn. Resolve the pending decision first.

### Gating tools that cannot carry an annotation

`@ai:AgentTool` is a Ballerina annotation, so it can only be applied to functions you declare. A toolkit that builds its `ai:ToolConfig` values by hand sets the same field directly.

```ballerina
public isolated class RefundToolKit {
    *ai:BaseToolKit;

    public isolated function getTools() returns ai:ToolConfig[] => [
        {
            name: "issueRefund",
            description: "Issues a refund for the given order.",
            parameters: {
                properties: {
                    orderId: {'type: ai:STRING},
                    amount: {'type: ai:NUMBER}
                },
                required: ["orderId", "amount"]
            },
            caller: issueRefund,
            // Toolkit tools cannot carry `@ai:AgentTool`, so the flag is set
            // directly on the `ToolConfig` instead.
            requiresApproval: true
        }
    ];
}
```

Both routes feed the same set of rules, so the agent behaves identically regardless of how a tool was gated.

## Serve approvals over HTTP

An agent exposed as a chat service handles approvals across separate stateless requests, correlated by the session ID. Add a `decision` resource alongside the usual `chat` resource.

```ballerina
import ballerina/ai;
import ballerina/http;

listener ai:Listener chatListener = new (listenOn = check http:getDefaultListener());

service /support on chatListener {

    resource function post chat(@http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {
        string|ai:Error result = supportAgent.run(request.message, request.sessionId);
        return result is ai:Error ? result : {message: result};
    }

    resource function post decision(@http:Payload ai:DecisionMessage request)
            returns ai:ChatRespMessage|error {
        string|ai:Error result = supportAgent.run({decisions: request.decisions},
            request.sessionId);
        return result is ai:Error ? result : {message: result};
    }
}
```

The service performs no error-to-HTTP mapping of its own. It returns the pause, and the listener converts it into a response.

| Situation | Status | Response body |
|---|---|---|
| The run paused for approval | `403` | `{"requests": [ ... ]}`, one entry for each pending `ai:ApprovalRequest` |
| A decision arrived but nothing is pending for the session | `404` | `{"errorType": "ApprovalNotFoundError", "message": "..."}` |
| A decision named an ID that is not pending | `400` | `{"errorType": "UnknownApprovalIdError", "message": "..."}` |
| The run completed | `200` | `{"message": "..."}` |

Branch on `errorType`, which is a stable discriminator. The `message` field is free text for humans and may be reworded, so do not depend on it.

A typical exchange looks like the following.

```bash
# 1. Ask for something sensitive.
curl -X POST http://localhost:9090/support/chat \
  -H 'Content-Type: application/json' \
  -d '{"sessionId": "s1", "message": "Refund order ORD-1001 for 50"}'

# Responds 403 with the pending request, including its id.

# 2. Send the decision back.
curl -X POST http://localhost:9090/support/decision \
  -H 'Content-Type: application/json' \
  -d '{"sessionId": "s1", "decisions": {"req-1": {"decision": "APPROVE"}}}'
```

This is the same mechanism the agent chat in WSO2 Integrator uses, so a service built this way works with both the built-in chat and your own front end.

## Make pauses survive a restart

A paused run is stored as a checkpoint in the agent's memory store, keyed by the session ID. Where that store keeps its data determines whether a pending approval survives.

| Memory configuration | Pauses survive a restart? |
|---|---|
| Default in-memory store | No. Pending approvals are lost when the process stops, and another replica cannot see them. |
| A durable store, for example a database-backed store | Yes. A pause can be resolved after a restart or by another replica. |

The default is fine while you develop and test. For production, where a human may take hours to respond, configure a durable store. See [Memory](memory.md#add-memory-store).

If you implement a custom `ai:ShortTermMemoryStore`, note that it must now provide four checkpoint methods in addition to the message methods.

```ballerina
public isolated function putCheckpoint(ai:PendingApproval approval) returns ai:Error?;

public isolated function getCheckpoint(string sessionId) returns ai:PendingApproval?|ai:Error;

public isolated function removeCheckpoint(string sessionId) returns ai:Error?;

// Atomically fetches and removes the pending approval, so that a duplicate
// resume for the same session cannot execute the same call twice.
public isolated function takeCheckpoint(string sessionId) returns ai:PendingApproval?|ai:Error;
```

:::warning
This is a breaking change introduced with human-in-the-loop support. A custom `ai:ShortTermMemoryStore` written before this release must add these four methods to keep conforming. See [Custom memory](memory.md#custom-memory).
:::

## Designing approval for your agent

Use the following table as a starting point.

| Situation | Recommended setup |
|---|---|
| The tool only reads data | Leave **Requires Approval** cleared. Gating read-only tools adds friction with no benefit. |
| The tool moves money, deletes data, or contacts a customer | Select **Requires Approval** and leave **Approval Function** empty. |
| The action is sensitive only past a threshold, such as a large refund | Select **Requires Approval** and set an **Approval Function** that tests the amount. |
| The action is sensitive only for certain records, such as production tenants | Select **Requires Approval** and set an **Approval Function** that inspects the identifier. |
| The tool comes from an MCP server | Wrap the call in your own function or custom tool and gate that. |
| A human may take hours to respond | Configure a durable memory store so the pause survives a restart. |

Two habits keep approval useful rather than tiring. Gate the smallest number of tools you can, because reviewers who approve everything by reflex provide no real oversight. And write specific tool descriptions, because the description is what the reviewer reads when deciding.

## What's next

- **[Tools](tools.md)** — Add functions, connectors, and integrations to your agents.
- **[Memory](memory.md)** — Configure conversational and persistent memory, including durable stores.
- **[Observability](observability.md)** — Trace which tools the agent selects and when it pauses.
