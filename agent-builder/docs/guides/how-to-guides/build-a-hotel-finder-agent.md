---
title: Build a Hotel Finder Agent
---

# Build a Hotel Finder Agent

**Time:** 10 minutes | **What you'll build:** A conversational agent that helps users find hotels in a specific city and check availability through natural conversation, with session-scoped memory so the user can refer back to earlier messages.

:::info Prerequisites

- [WSO2 Agent Builder installed](../../get-started/setup.md)

## Step 1: Create the agentic integration

1. Open WSO2 Agent Builder and select **Create** under **Start Building your Agent**.
2. Set **Project name** to `AI-Integrations` and choose a **Location**.
3. Under **What do you want to build?**, keep **Agentic Integration** selected.
4. Set **Agentic integration name** to `HotelFinder`.
5. Select **Create Agentic Integration**.

<ThemedImage
    alt="Create a Project form with Project name set to AI-Integrations, the Agentic Integration option selected, and Agentic integration name set to HotelFinder"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/01-create-integration-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/01-create-integration-v1.0.png'),
    }}
/>

## Step 2: Create the agent

The integration opens with the WSO2 Agent Builder Copilot, which asks **What should your agent do?** Skip it for this guide and build the agent manually.

1. Under **Or start from scratch**, select **Add Agent**.

<ThemedImage
    alt="HotelFinder integration home page showing the WSO2 Agent Builder Copilot prompt, example agents, and the Add Agent and Add MCP Server buttons under Or start from scratch"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/02-integration-home-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/02-integration-home-v1.0.png'),
    }}
/>

2. In the **Add Agent** dialog, select **Create Agent** under **Create New**.

<ThemedImage
    alt="Add Agent dialog showing the Create Agent, Create Durable Agent, and Create Agent Definition options, and a list of pre-built agents"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/03-add-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/03-add-agent-v1.0.png'),
    }}
/>

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

<ThemedImage
    alt="Create Agent form with Role set to HotelFinderAssistant and the hotel finder instructions filled in"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/04-create-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/04-create-agent-v1.0.png'),
    }}
/>

5. Keep the model as the **Default WSO2 Model Provider**, and leave the remaining agent settings at their defaults.
6. Set **Agent Name** to `HotelFinderAssistant`.
7. Select **Create Agent**.

<ThemedImage
    alt="Bottom of the Create Agent form with Agent Name set to HotelFinderAssistant and the Create Agent button"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/05-name-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/05-name-agent-v1.0.png'),
    }}
/>

:::tip Default model provider

By default, the agent uses the WSO2 model provider, so no third-party API key is required. Sign in to WSO2 Agent Builder if prompted.

To use a different LLM instead, see [Model providers](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md) for the full list of supported providers (OpenAI, Anthropic, Azure OpenAI, and others).

The agent canvas for `HotelFinderAssistant` opens. The **AI Agent** node is connected to **Default WSO2 Model Provider**, with **Add Trigger** on its left and **Add Tool** at its bottom-right corner.

<ThemedImage
    alt="AI Agent canvas for HotelFinderAssistant connected to the Default WSO2 Model Provider, with Add Trigger, Add Memory, and Add Tool options"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/06-ai-agent-canvas-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/06-ai-agent-canvas-v1.0.png'),
    }}
/>

## Step 3: Add the `searchHotels` tool

### Create the `searchHotels` tool

1. Select **Add Tool** at the bottom-right corner of the **AI Agent** node.
2. In the **Add Tool** panel, select **Create Custom Tool**.

<ThemedImage
    alt="Add Tool panel listing Use Connection, Use Function, Use Agent, Use MCP Server, Use Knowledge Base, and Create Custom Tool"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/07-add-tool-panel-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/07-add-tool-panel-v1.0.png'),
    }}
/>

3. Set **Name** to `searchHotels`.
4. Set **Description** to `Searches for hotels in a city`.
5. Under **Parameters**, select **+ Add Parameter**, add the following parameter, and select **Add**:

   | Type | Name | Description |
   |---|---|---|
   | `string` | `city` | City name, e.g. "Paris" or "New York" |

6. Select the **Return Type** field and choose **Create New Type**. The **Create New Type** dialog opens:

   a. Keep **Kind** as `Record` and set **Name** to `Hotel`.

   b. Select **+** next to **Fields** to add each of the following fields:

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
    alt="Create New Type dialog with Kind set to Record and Name set to Hotel, showing all six fields"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/08-create-hotel-type-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/08-create-hotel-type-v1.0.png'),
    }}
/>

7. Set **Return Type** to `Hotel[]`.
8. Set **Description** (return value) to `Hotels available in the city`.
9. Leave **Requires Approval** unchecked. Enabling it pauses the tool before it runs and waits for human approval.
10. Select **Create Tool**.

<ThemedImage
    alt="Completed Create Custom Tool form for searchHotels showing the city parameter, Hotel[] return type, and return description"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/09-create-search-hotels-tool-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/09-create-search-hotels-tool-v1.0.png'),
    }}
/>

### Build the `searchHotels` logic

The tool now appears as a node connected to the agent. Select it to open its flow. New tools open with a placeholder: **Start** connected to a **Panic** node (`error("not implemented")`). Replace it with the real logic:

1. Select **+** on the connector between **Start** and **Panic**, then select **Declare Variable** under **Statement**. Set **Name** to `allHotels` and **Type** to `Hotel[]`. Set the **Expression** to the following hotel array and select **Save**:

   ```ballerina
   [
     {hotelId: "HTL-001", name: "Grand Plaza Hotel", city: "Paris", pricePerNight: 199.99, rating: 4.5, amenities: ["WiFi", "Pool", "Gym"]},
     {hotelId: "HTL-002", name: "City Center Inn", city: "Paris", pricePerNight: 129.99, rating: 4.0, amenities: ["WiFi", "Breakfast"]},
     {hotelId: "HTL-003", name: "Luxury Suites", city: "New York", pricePerNight: 349.99, rating: 4.8, amenities: ["WiFi", "Pool", "Spa", "Restaurant"]}
   ]
   ```

   :::note

   This uses hardcoded sample data. In a real scenario, you would call an external hotel API, query a database, or connect an [MCP tool](../../develop-and-test/integration-artifacts/ai-integrations/agents/tools.md).

   :::

<ThemedImage
    alt="Declare Variable panel with Name set to allHotels, Type set to Hotel[], and the hotel array set as the Expression"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/10-declare-variable-allhotels-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/10-declare-variable-allhotels-v1.0.png'),
    }}
/>

2. Select **+** below the `allHotels` node and select **Declare Variable** under **Statement**. Set **Name** to `hotels` and **Type** to `Hotel[]`. Set the **Expression** to the following and select **Save**:

   ```ballerina
   allHotels.filter(h => h.city == city)
   ```

<ThemedImage
    alt="Declare Variable panel with Name set to hotels, Type set to Hotel[], and the filter expression set as the Expression"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/11-declare-variable-hotels-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/11-declare-variable-hotels-v1.0.png'),
    }}
/>

3. Select **+** below the `hotels` node and select **Return** under **Control**. Set **Expression** to `hotels` and select **Save**.

<ThemedImage
    alt="Return panel with Expression set to hotels"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/12-return-hotels-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/12-return-hotels-v1.0.png'),
    }}
/>

4. The placeholder **Panic** node is now unreachable. Select the **⋮** menu on the **Panic** node and select **Delete**.

<ThemedImage
    alt="Completed searchHotels flow with Start, the allHotels and hotels Declare Variable nodes, and the Return node"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/13-search-hotels-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/13-search-hotels-flow-v1.0.png'),
    }}
/>

## Step 4: Add the `checkAvailability` tool

### Create the `checkAvailability` tool

1. Select the back arrow to return to the **HotelFinderAssistant** agent canvas.
2. Select **Add Tool** on the **AI Agent** node and choose **Create Custom Tool**.
3. Set **Name** to `checkAvailability`.
4. Set **Description** to `Checks whether a hotel has rooms available between two dates`.
5. Under **Parameters**, select **+ Add Parameter** and add each of the following parameters:

   | Type | Name | Description |
   |---|---|---|
   | `string` | `hotelId` | Hotel identifier returned from searchHotels |
   | `string` | `checkIn` | Check-in date in YYYY-MM-DD format |
   | `string` | `checkOut` | Check-out date in YYYY-MM-DD format |

6. Select the **Return Type** field and choose **Create New Type**. The **Create New Type** dialog opens:

   a. Keep **Kind** as `Record` and set **Name** to `Availability`.

   b. Select **+** next to **Fields** to add each of the following fields:

   | Name | Type |
   |---|---|
   | `hotelId` | `string` |
   | `hotelName` | `string` |
   | `available` | `boolean` |
   | `totalPrice` | `decimal` |
   | `nights` | `int` |

   c. Select **Save**.

<ThemedImage
    alt="Create New Type dialog with Kind set to Record and Name set to Availability, showing all five fields"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/14-create-availability-type-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/14-create-availability-type-v1.0.png'),
    }}
/>

7. Make sure **Return Type** is set to `Availability`.
8. Set **Description** (return value) to `Availability result with total price and nights`.
9. Select **Create Tool**.

<ThemedImage
    alt="Completed checkAvailability tool form showing the hotelId, checkIn, and checkOut parameters, the Availability return type, and the return description"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/15-create-check-availability-tool-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/15-create-check-availability-tool-v1.0.png'),
    }}
/>

### Build the `checkAvailability` logic

1. Select the **checkAvailability** node to open its flow.
2. Select **+** on the connector between **Start** and **Panic**, select **Return** under **Control**, set **Expression** to the following, and select **Save**:

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

   This returns hardcoded sample data. In a real scenario, you would query a booking system, call an availability API, or connect an [MCP tool](../../develop-and-test/integration-artifacts/ai-integrations/agents/tools.md).

   :::

<ThemedImage
    alt="Return panel for checkAvailability with the hardcoded Availability record set as the Expression"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/16-check-availability-return-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/16-check-availability-return-v1.0.png'),
    }}
/>

3. Select the **⋮** menu on the **Panic** node and select **Delete**.

Return to the agent canvas. The agent now shows both tools connected.

<ThemedImage
    alt="HotelFinderAssistant agent canvas showing the AI Agent node connected to the Default WSO2 Model Provider and to the searchHotels and checkAvailability tools"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/17-agent-with-tools-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/17-agent-with-tools-v1.0.png'),
    }}
/>

## Step 5: Add a chat trigger

A trigger connects the agent to a channel that calls it. Add an **Agent Chat** trigger to expose the agent as a chat endpoint.

1. Select **Add Trigger** on the left of the **AI Agent** node.
2. Under **Chat Channels**, select **Agent Chat**.

<ThemedImage
    alt="Add Trigger dialog showing Chat Channels such as Agent Chat, Google Chat, Telegram, and WhatsApp Business, the HTTP API endpoint, and event sources"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/18-add-trigger-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/18-add-trigger-v1.0.png'),
    }}
/>

3. Keep **Service Path** as `/hotel-finder-assistant`.
4. Select **Create**.

<ThemedImage
    alt="Agent Chat trigger form with Service Path set to /hotel-finder-assistant"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/19-agent-chat-trigger-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/19-agent-chat-trigger-v1.0.png'),
    }}
/>

This creates an **AI Agent Services** entry point with a `POST chat` resource and an `agentChatListener`. The agent canvas now shows the **Agent Chat** trigger connected to the agent.

<ThemedImage
    alt="Completed HotelFinderAssistant agent canvas with the /hotel-finder-assistant Agent Chat trigger, the model provider, and both tools connected"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/20-complete-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/20-complete-agent-v1.0.png'),
    }}
/>

## Step 6: Run and test

1. Select **Run Integration** at the top-right corner of the editor. Wait until the terminal shows `Running executable`.
2. Under **Entry Points**, expand **AI Agent Services - /hotel-finder-assistant** and select the `chat` resource. The **Chat Agent Service** flow opens, showing the `agent : run` call to `HotelFinderAssistant` and the **Return** node.
3. Select **Chat** to open the **Agent Chat** panel.
4. Type `Show me hotels in Paris` and send it.

The agent calls `searchHotels` and returns the matching Paris options (`Grand Plaza Hotel` and `City Center Inn`, not `Luxury Suites`, which is in New York). Continue the conversation in the same chat session to check availability.

<ThemedImage
    alt="Chat Agent Service flow for the chat resource next to the Agent Chat panel, where the user asks for hotels in Paris and the agent responds with Grand Plaza Hotel and City Center Inn and asks for check-in and check-out dates"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/21-run-and-test-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-hotel-finder-agent-v1.0/21-run-and-test-v1.0.png'),
    }}
/>

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

Both tools use hardcoded sample data. In a real scenario, you would call external APIs, query a database, or connect [MCP tools](../../develop-and-test/integration-artifacts/ai-integrations/agents/tools.md).

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

listener ai:Listener agentChatListener = new (listenOn = check http:getDefaultListener());

service /hotel\-finder\-assistant on agentChatListener {
    resource function post chat(@http:Payload ai:ChatReqMessage request) returns ai:ChatRespMessage|error {
        string stringResult = check HotelFinderAssistant.run(request.message, sessionId = request.sessionId);
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

## How it works

This example demonstrates two patterns you will reuse in production agents:

1. **Session-scoped memory**: `ai:Listener` keeps a short history of messages per `sessionId`, so the LLM sees recent turns on every call.
2. **Sequential tool calls**: The agent calls `searchHotels` and then `checkAvailability`, using each result to inform the next step. The chaining is driven entirely by the LLM's reasoning.

## What's next

- [Creating an agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md) — Full reference for agent configuration
- [Tools](../../develop-and-test/integration-artifacts/ai-integrations/agents/tools.md) — Advanced tool patterns, including connection-backed tools and MCP servers
- [Memory](../../develop-and-test/integration-artifacts/ai-integrations/agents/memory.md) — Custom memory strategies beyond the default session store
