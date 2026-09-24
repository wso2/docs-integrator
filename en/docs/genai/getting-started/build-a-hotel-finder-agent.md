---
sidebar_position: 3
title: "Build a Hotel Finder Agent"
description: Build a conversational hotel finder agent with two custom tools and a chat endpoint in WSO2 Integrator.
keywords: [wso2 integrator, ai agent, hotel finder, custom tools, llm, ballerina ai, genai]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build a Hotel Finder Agent

**Time:** 10 minutes | **What you'll build:** A conversational agent that helps users find hotels in a specific city and check availability through natural conversation, with session-scoped memory so the user can refer back to earlier messages.

:::info Prerequisites

- [WSO2 Integrator installed](../../get-started/setup/local-setup.md)

:::

<Tabs>
<TabItem value="ui" label="Visual designer" default>

## Step 1: Create the integration

1. Open WSO2 Integrator and select **Create** under **Create a Project**.
2. Set **Project name** to `AI-Integrations` and choose a **Location**.
3. Under **What do you want to build?**, keep **Integration** selected.
4. Set **Integration name** to `HotelFinder`.
5. Select **Create**.

<ThemedImage
    alt="Create a Project form with Project name set to AI-Integrations, the Integration option selected, and Integration name set to HotelFinder"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/01-create-integration.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/01-create-integration.png'),
    }}
/>

## Step 2: Add and configure an AI chat agent

The integration opens on the **Design** tab with the WSO2 Integrator Copilot. Bypass it for this quick start and create the artifact manually.

1. Select **Add Artifact manually**.
2. On the Artifacts page, select **Chat Agent Service** under **AI Integration**.
3. Set **Role** to `HotelFinderAssistant`.
4. Set **Instructions** to:

   ```plain
   You are a friendly hotel finder assistant.

   Your responsibilities:
   - Help users find hotels and check availability through natural conversation.
   - Ask clarifying questions when information is missing.

   Tool usage:
   - Use searchHotels when the user mentions a city or destination.
   - Use checkAvailability when the user wants to verify dates and pricing.

   Presentation:
   - Show hotels clearly with price, rating, and key amenities.
   ```

5. Keep **Model** as **Default WSO2 Model Provider**.

<ThemedImage
    alt="Create Chat Agent Service form with Role and Instructions filled in and Model set to Default WSO2 Model Provider"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/02-create-ai-chat-agent.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/02-create-ai-chat-agent.png'),
    }}
/>

:::tip Default model provider

By default, the agent is created with the WSO2 model provider. If you have not [signed in to WSO2 Integrator Copilot](../../develop/copilot/getting-started.md) yet, sign in when prompted. No third-party API key is required.

To use a different LLM instead, see [Model providers](../develop/components/model-providers.md) for the full list of supported providers (OpenAI, Anthropic, Azure OpenAI, and others).

:::

6. Leave **Maximum Iterations**, **Verbose**, **Tool Loading Strategy**, and **Execute Tool Calls In Parallel** at their defaults.
7. Set **Agent Name** to `HotelFinderAssistant`.
8. Set **Service Base Path** to expose the chat service, for example `/hotel-finder-assistant`.
9. Select **Create**.

<ThemedImage
    alt="Bottom of the Create Chat Agent Service form with Agent Name set to HotelFinderAssistant and Service Base Path set to /hotel-finder-assistant"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/03-name-and-expose-agent.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/03-name-and-expose-agent.png'),
    }}
/>

This creates an **AI Agent Service** with a `POST /chat` resource and a `chatAgentListener`, plus the `HotelFinderAssistant` agent under **Agents**. Select **HotelFinderAssistant** under **Agents** to open its canvas: the **AI Agent** node is connected to the model provider, with a `+` button at its bottom-right corner for adding tools.

<ThemedImage
    alt="AI Agent node for HotelFinderAssistant connected to the model provider, with an Add Memory button and a + icon for adding tools"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/03b-ai-agent-canvas.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/03b-ai-agent-canvas.png'),
    }}
/>

## Step 3: Add the `searchHotels` tool

### Create the `searchHotels` tool

1. Select the **+** button at the bottom-right corner of the **AI Agent** node.
2. Select **Create Custom Tool**.
3. Set **Name** to `searchHotels`.
4. Set **Description** to `Searches for hotels in a city`.
5. Under **Parameters**, select **+ Add Parameter** and add:

   | Type | Name | Description |
   |---|---|---|
   | `string` | `city` | City name, e.g. "Paris" or "New York" |

6. Under **Return Type**, select the field and choose **Create New Type**. The **Create New Type** dialog opens:

   a. Set **Kind** to `Record` and **Name** to `Hotel`.

   b. Add the following fields:

   | Name | Type |
   |---|---|
   | `hotelId` | `string` |
   | `name` | `string` |
   | `city` | `string` |
   | `pricePerNight` | `decimal` |
   | `rating` | `float` |
   | `amenities` | `string[]` |

   c. Select **Save**.

<ThemedImage
    alt="Create New Type dialog open over the Create Custom Tool form, with Kind set to Record and Name set to Hotel, showing all six fields"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/04-create-hotel-type.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/04-create-hotel-type.png'),
    }}
/>

7. Set **Return Type** to `Hotel[]`.

8. Set **Description** (return value) to `Hotels available in the city`.

9. Optionally leave **Requires Approval** unchecked. Enabling it pauses the tool before it runs and waits for human approval.

10. Select **Create Tool**.

<ThemedImage
    alt="Completed Create Custom Tool form for searchHotels showing the city parameter, Hotel[] return type, and return description"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/05-create-search-hotels-tool.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/05-create-search-hotels-tool.png'),
    }}
/>

### Build the `searchHotels` logic

The tool now shows as a node connected to the agent. Select it to open its flow. New tools open with a placeholder: **Start** connected to a **Panic** node (`error("not implemented")`). Replace it with the real logic:

1. Select **+** on the connector between **Start** and **Panic**, then select **Declare Variable** under **Statement**. Set **Name** to `allHotels` and **Type** to `Hotel[]`. Set the **Expression** to the following hotel array and select **Save**:

   ```ballerina
   [
     {hotelId: "HTL-001", name: "Grand Plaza Hotel", city: "Paris", pricePerNight: 199.99, rating: 4.5, amenities: ["WiFi", "Pool", "Gym"]},
     {hotelId: "HTL-002", name: "City Center Inn", city: "Paris", pricePerNight: 129.99, rating: 4.0, amenities: ["WiFi", "Breakfast"]},
     {hotelId: "HTL-003", name: "Luxury Suites", city: "New York", pricePerNight: 349.99, rating: 4.8, amenities: ["WiFi", "Pool", "Spa", "Restaurant"]}
   ]
   ```

   :::note

   This uses hardcoded sample data. In a real scenario, you would call an external hotel API, query a database, or connect an [MCP tool](../develop/agents/tools.md).

   :::

<ThemedImage
    alt="Declare Variable node configured with Name set to allHotels, Type set to Hotel[], and the hotel array set as the Expression"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/06-declare-variable-allhotels.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/06-declare-variable-allhotels.png'),
    }}
/>

2. Select **+** and select **Declare Variable** under **Statement**. Set **Name** to `hotels` and **Type** to `Hotel[]`. Set the **Expression** to the following and select **Save**:

   ```ballerina
   allHotels.filter(h => h.city == city)
   ```

<ThemedImage
    alt="Declare Variable node configured with Name set to hotels, Type set to Hotel[], and the filter expression set as the Expression"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/07-declare-variable-hotels.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/07-declare-variable-hotels.png'),
    }}
/>

3. Select **+** and select **Return** under **Control**. Set **Expression** to `hotels` and select **Save**.

<ThemedImage
    alt="Return node configuration panel with Expression set to hotels"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/08-return-hotels.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/08-return-hotels.png'),
    }}
/>

:::note

The visual designer currently leaves the placeholder `panic error("not implemented")` statement in place after the node you add. It becomes unreachable once your `Return` is in the flow, so it's safe to delete from the pro-code view; leaving it in doesn't affect the build.

:::

## Step 4: Add the `checkAvailability` tool

### Create the `checkAvailability` tool

1. Navigate back to the **HotelFinderAssistant** agent canvas.
2. Select **+** on the **AI Agent** node and choose **Create Custom Tool**.
3. Set **Name** to `checkAvailability`.
4. Set **Description** to `Checks whether a hotel has rooms available between two dates`.
5. Under **Parameters**, select **+ Add Parameter** and add:

   | Type | Name | Description |
   |---|---|---|
   | `string` | `hotelId` | Hotel identifier returned from `searchHotels` |
   | `string` | `checkIn` | Check-in date in `YYYY-MM-DD` format |
   | `string` | `checkOut` | Check-out date in `YYYY-MM-DD` format |

6. Under **Return Type**, select the field and choose **Create New Type**. The **Create New Type** dialog opens:

   a. Set **Kind** to `Record` and **Name** to `Availability`.

   b. Add the following fields:

   | Name | Type |
   |---|---|
   | `hotelId` | `string` |
   | `hotelName` | `string` |
   | `available` | `boolean` |
   | `totalPrice` | `decimal` |
   | `nights` | `int` |

   c. Select **Save**.

<ThemedImage
    alt="Create New Type dialog open over the checkAvailability form, with Kind set to Record and Name set to Availability, showing all five fields"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/09-create-availability-type.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/09-create-availability-type.png'),
    }}
/>

7. Set **Return Type** to `Availability`.

8. Set **Description** (return value) to `Availability result with total price and nights`.

9. Select **Create Tool**.

<ThemedImage
    alt="Completed checkAvailability tool form showing hotelId, checkIn, checkOut parameters, Availability return type, and return description, with searchHotels already connected to the agent"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/10-create-check-availability-tool.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/10-create-check-availability-tool.png'),
    }}
/>

### Build the `checkAvailability` logic

Open the tool's flow. Select **+** on the connector between **Start** and **Panic**, select **Return** under **Control**, set **Expression** to the following, and select **Save**:

```ballerina
{
    hotelId,
    hotelName: "Grand Plaza Hotel",
    available: true,
    totalPrice: 599.97,
    nights: 3
}
```

:::note

This returns hardcoded sample data. In a real scenario, you would query a booking system, call an availability API, or connect an [MCP tool](../develop/agents/tools.md).

:::

<ThemedImage
    alt="Return node configuration panel for checkAvailability with the hardcoded Availability record set as the Expression"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/11-check-availability-return.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/11-check-availability-return.png'),
    }}
/>

After both tools are created, the agent shows them connected in the design canvas.

<ThemedImage
    alt="AI Agent design view showing the agent node connected to searchHotels and checkAvailability tools with the system prompt visible"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/12-agent-with-tools.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/12-agent-with-tools.png'),
    }}
/>

## Step 5: Run and test

1. Select **Run**.
2. Once the integration compiles and starts, select **Chat** on the `chat` resource.
3. Type `Show me hotels in Paris` to check if it works.

The agent calls `searchHotels` and returns the matching Paris options (`Grand Plaza Hotel` and `City Center Inn`, not `Luxury Suites`, which is in New York). Continue the conversation in the same chat session to check availability.

<ThemedImage
    alt="Agent Chat panel showing the user asking for hotels in Paris, with the agent responding with Grand Plaza Hotel and City Center Inn and asking for check-in and check-out dates"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/13-run-and-test.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent/13-run-and-test.png'),
    }}
/>

</TabItem>
<TabItem value="code" label="Ballerina code">

<h2> Step 1: Define data types </h2>

Create a file named `types.bal` to hold the domain types:

```ballerina
type Hotel record {|
    string hotelId;
    string name;
    string city;
    decimal pricePerNight;
    float rating;
    string[] amenities;
|};

type Availability record {|
    string hotelId;
    string hotelName;
    boolean available;
    decimal totalPrice;
    int nights;
|};
```

<h2> Step 2: Define tools and create the agent </h2>

Create a file named `agents.bal`. Each tool is an `isolated` function annotated with `@ai:AgentTool`. The LLM uses the summary line and `+ param - description` lines from the Ballerina doc comment to decide when and how to call the tool. The model provider is initialized inline with `ai:getDefaultModelProvider()`, so no separate connections file is needed for the default WSO2 model provider.

:::note

Both tools use hardcoded sample data. In a real scenario, you would call external APIs, query a database, or connect [MCP tools](../develop/agents/tools.md).

:::

```ballerina
import ballerina/ai;

final ai:Agent HotelFinderAssistant = check new (
    systemPrompt = {
        role: string `HotelFinderAssistant`,
        instructions: string `You are a friendly hotel finder assistant.

Your responsibilities:
- Help users find hotels and check availability through natural conversation.
- Ask clarifying questions when information is missing.

Tool usage:
- Use searchHotels when the user mentions a city or destination.
- Use checkAvailability when the user wants to verify dates and pricing.

Presentation:
- Show hotels clearly with price, rating, and key amenities.`
    }, model = check ai:getDefaultModelProvider(), tools = [searchHotels, checkAvailability]
);

# Searches for hotels in a city
# + city - City name, e.g. "Paris" or "New York"
# + return - Hotels available in the city
@ai:AgentTool
isolated function searchHotels(string city) returns Hotel[] {
    Hotel[] allHotels = [
        {hotelId: "HTL-001", name: "Grand Plaza Hotel", city: "Paris", pricePerNight: 199.99, rating: 4.5, amenities: ["WiFi", "Pool", "Gym"]},
        {hotelId: "HTL-002", name: "City Center Inn", city: "Paris", pricePerNight: 129.99, rating: 4.0, amenities: ["WiFi", "Breakfast"]},
        {hotelId: "HTL-003", name: "Luxury Suites", city: "New York", pricePerNight: 349.99, rating: 4.8, amenities: ["WiFi", "Pool", "Spa", "Restaurant"]}
    ];
    Hotel[] hotels = allHotels.filter(h => h.city == city);
    return hotels;
}

# Checks whether a hotel has rooms available between two dates
# + hotelId - Hotel identifier returned from searchHotels
# + checkIn - Check-in date in YYYY-MM-DD format
# + checkOut - Check-out date in YYYY-MM-DD format
# + return - Availability result with total price and nights
@ai:AgentTool
isolated function checkAvailability(string hotelId, string checkIn, string checkOut) returns Availability {
    return {
        hotelId,
        hotelName: "Grand Plaza Hotel",
        available: true,
        totalPrice: 599.97,
        nights: 3
    };
}
```

<h2> Step 3: Expose the agent as a chat service </h2>

Create a file named `main.bal`. The `ai:Listener` provides session-scoped chat memory. Pass the `sessionId` into `agent.run(...)` and the runtime retrieves and updates the conversation history for that session automatically.

```ballerina
import ballerina/ai;
import ballerina/http;

listener ai:Listener chatAgentListener = new (listenOn = check http:getDefaultListener());

service /hotel\-finder\-assistant on chatAgentListener {
    resource function post chat(@http:Payload ai:ChatReqMessage request) returns ai:ChatRespMessage|error {
        string stringResult = check HotelFinderAssistant.run(request.message, request.sessionId);
        return {message: stringResult};
    }
}
```

<h2> Step 4: Run and test </h2>

Run the project:

```bash
bal run
```

Have a multi-turn conversation. Use the same `sessionId` across requests so the agent remembers context:

```bash
# Turn 1: search for hotels
curl -X POST http://localhost:9090/hotel-finder-assistant/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "guest-42", "message": "Show me hotels in Paris"}'

# Turn 2: refer back to an earlier result
curl -X POST http://localhost:9090/hotel-finder-assistant/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "guest-42", "message": "Can you check the City Center Inn from March 20 to March 23?"}'
```

Because the listener keeps session history, the agent resolves "the City Center Inn" from the earlier message without the user having to repeat themselves.

</TabItem>
</Tabs>

## How it works

This example demonstrates two patterns you will reuse in production agents:

1. **Session-scoped memory**: `ai:Listener` keeps a short history of messages per `sessionId`, so the LLM sees recent turns on every call.
2. **Sequential tool calls**: The agent calls `searchHotels` and then `checkAvailability`, using each result to inform the next step. The chaining is driven entirely by the LLM's reasoning.

## What's next

- [Creating an agent](../develop/agents/creating-an-agent.md) — Full reference for agent configuration
- [Tools](../develop/agents/tools.md) — Advanced tool patterns, including connection-backed tools and MCP servers
- [Memory](../develop/agents/memory.md) — Custom memory strategies beyond the default session store
