---
title: Run a Durable Agent
---

# Run a Durable Agent

A durable agent does nothing until something starts it. A run step starts one instance from an ordinary flow and binds the new instance ID to a variable, so the rest of the flow can send that instance turns and read its result. See [Create a Durable Agent](create-durable-agent.md) for building the agent this step starts.

<ThemedImage
    alt="The POST claim resource flowing from Start into a durable agent : run node for claimAgent that binds instanceId, then a Return of instanceId, with the Error Handler below."
    sources={{
        light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/run-durable-agent/01-run-durable-agent-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/run-durable-agent/01-run-durable-agent-flow-v1.0.png'),
    }}
/>

## Start the agent from a trigger

The quickest way to start a durable agent is to give it a trigger. On the agent canvas, select **Add Trigger** and choose a channel, for example **HTTP** under **API Endpoints**. The generated resource already contains a run step for the agent. For a walkthrough, see [Build a Durable Agent](../../../../get-started/quickstarts/build-durable-agent.md#step-4-start-the-agent-from-a-trigger).

To start the agent from a flow you build yourself, add the run step from the node panel, as the steps below show.

## Add the step

The steps below follow one example: a `POST /claim` resource that hands each incoming claim to the `claimAgent` agent.

1. On the flow diagram, select **+** where the agent should start.
2. In the node panel, under **Workflow**, select **Run Durable Agent**. The **Run Durable Agent** form opens.

    <ThemedImage
        alt="The node panel beside the claim resource flow, with the Workflow group highlighted, listing Run Durable Agent, Send Agent Data Event, Get Agent Result, and Get Data Event Result."
        sources={{
            light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/run-durable-agent/02-workflow-node-panel-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/run-durable-agent/02-workflow-node-panel-v1.0.png'),
        }}
    />

3. Fill in the form:

    | Field | Required | Description |
    |---|---|---|
    | **Durable Agentic Workflow** | Yes | The durable agent to start. The list shows the durable agents in the agentic integration, `claimAgent` here. |
    | **Query** | Yes | The user turn appended to the agent's system prompt, for example `Start a new claim workflow`. The model plans from this request, so write it as an instruction rather than a label. |
    | **Input** | No | Structured input for the run, passed alongside the query. Here it is the resource's `payload`, which holds the new claim, so the agent starts with the claim itself. |
    | **Instance ID Variable Name** | Yes | The variable that receives the new agent instance ID. Defaults to `instanceId`. |

4. Select **Save**.

<ThemedImage
    alt="The Run Durable Agent form with claimAgent selected, Query set to Start a new claim workflow, Input set to payload, and Instance ID Variable Name set to instanceId, highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/durable-agentic-workflow/run-durable-agent/03-run-durable-agent-form-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/durable-agentic-workflow/run-durable-agent/03-run-durable-agent-form-v1.0.png'),
    }}
/>

The saved step is drawn as **durable agent : run**, with the variable it binds and an **Open Agent** button that opens the agent's canvas. Follow it with a **Return** step on `instanceId`, so the caller gets the ID of the run it started.

## Query or input?

The two fields carry different things to the same run, and an agent usually wants both.

- **Query** is language. It becomes the user turn, so it tells the model what to do with this run.
- **Input** is data. It is the structured value the run works on, and the model reads it through the capabilities and instructions you gave the agent.

In the claim example, the query says to start a new claim workflow, while the input carries the claim. That's why the agent can plan over a payload the query never spells out.

## Starting is not waiting

This step creates the instance and binds its ID. It does not wait for the agent to finish, which is what makes the ID worth keeping: every later interaction with that instance is addressed by it. The same **Workflow** group in the node panel holds the steps that use it: [Send Agent Data Event](send-agent-data-event.md) to deliver a turn, and [Get Agent Result](get-agent-result.md) to read the outcome.

## What's next

- [Send an Agent Data Event](send-agent-data-event.md): Deliver a turn to the instance this step started.
- [Create a Durable Agent](create-durable-agent.md): The agent and the capabilities this step starts.
- [Workflow executions](product://integrator/icp/manage-workflows/workflow-executions): Watch the started instance in the Integration Control Plane.
