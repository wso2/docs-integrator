---
title: Build a Sample Hotel Booking Agent
---

# Build a Sample Hotel Booking Agent

**Time:** 15 minutes | **What you'll build:** A conversational agent that helps users search for hotels, check availability, and make bookings through natural conversation, with session-scoped memory so the user can refer back to earlier messages.

This walkthrough builds on the [Smart Calculator](smart-calculator.md) example by adding several domain-specific tools and exposing the agent as a chat service on an `ai:Listener`. The `ai:Listener` handles per-session memory automatically — you just pass the `sessionId` into `agent.run(...)`.

## Prerequisites

- [WSO2 Integrator set up for AI](setup.md)
- Completed [Smart Calculator Assistant](smart-calculator.md) (recommended)

## Step 1: Define data types

Create a file named `types.bal` to hold the booking domain types:

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

type Booking record {|
    string bookingId;
    string hotelId;
    string hotelName;
    string guestName;
    string checkIn;
    string checkOut;
    decimal totalPrice;
    string status;
|};
```

## Step 2: Define agent tools

Create `tools.bal`. Each tool is an `isolated` function annotated with `@ai:AgentTool`. The LLM uses the summary line and `+ param - description` lines from the Ballerina doc comment to decide when and how to call the tool.

```ballerina
import ballerina/ai;
import ballerina/uuid;

# Searches for hotels in a city, optionally filtered by a maximum nightly price.
#
# + city - City name, e.g. "Paris" or "New York"
# + maxPrice - Optional maximum price per night in USD
# + return - Hotels matching the criteria
@ai:AgentTool
isolated function searchHotels(string city, decimal? maxPrice = ()) returns Hotel[] {
    // In production, query a hotel booking API here.
    Hotel[] hotels = [
        {hotelId: "HTL-001", name: "Grand Plaza Hotel", city, pricePerNight: 199.99, rating: 4.5, amenities: ["WiFi", "Pool", "Gym"]},
        {hotelId: "HTL-002", name: "City Center Inn",   city, pricePerNight: 129.99, rating: 4.0, amenities: ["WiFi", "Breakfast"]},
        {hotelId: "HTL-003", name: "Luxury Suites",     city, pricePerNight: 349.99, rating: 4.8, amenities: ["WiFi", "Pool", "Spa", "Restaurant"]}
    ];

    if maxPrice is decimal {
        return from Hotel h in hotels where h.pricePerNight <= maxPrice select h;
    }
    return hotels;
}

# Checks whether a hotel has rooms available between two dates.
#
# + hotelId - Hotel identifier returned from `searchHotels`
# + checkIn - Check-in date in `YYYY-MM-DD` format
# + checkOut - Check-out date in `YYYY-MM-DD` format
# + return - Availability result with total price and nights
@ai:AgentTool
isolated function checkAvailability(string hotelId, string checkIn, string checkOut)
        returns Availability {
    // In production, query the real availability system here.
    return {
        hotelId,
        hotelName: "Grand Plaza Hotel",
        available: true,
        totalPrice: 599.97,
        nights: 3
    };
}

# Books a hotel room. The caller must confirm details with the user first.
#
# + hotelId - Hotel identifier
# + guestName - Full name of the guest
# + checkIn - Check-in date (`YYYY-MM-DD`)
# + checkOut - Check-out date (`YYYY-MM-DD`)
# + return - A booking confirmation
@ai:AgentTool
isolated function makeBooking(string hotelId, string guestName, string checkIn, string checkOut)
        returns Booking {
    return {
        bookingId: "BKG-" + uuid:createRandomUuid(),
        hotelId,
        hotelName: "Grand Plaza Hotel",
        guestName,
        checkIn,
        checkOut,
        totalPrice: 599.97,
        status: "confirmed"
    };
}
```

## Step 3: Create the Agent

Create `main.bal` with the agent definition and a chat service.

```ballerina
import ballerina/ai;

final ai:Agent bookingAgent = check new (
    systemPrompt = {
        role: "Hotel Booking Assistant",
        instructions: string `You are a friendly hotel booking assistant.

            Your responsibilities:
            - Help users find and book hotels through natural conversation.
            - Ask clarifying questions when information is missing.

            Tool usage:
            - Use searchHotels when the user mentions a city or destination.
            - Use checkAvailability before confirming a booking to verify dates and pricing.
            - Use makeBooking only after the user explicitly confirms they want to proceed.

            Presentation:
            - Show hotels clearly with price, rating, and key amenities.
            - Before booking, repeat back the hotel name, dates, and guest name for confirmation.`
    },
    tools = [searchHotels, checkAvailability, makeBooking],
    model = check ai:getDefaultModelProvider()
);
```

## Step 4: Expose the Agent as a Chat Service

Attach a service to an `ai:Listener`. The listener gives you session-scoped chat memory out of the box — you pass the `sessionId` into `agent.run(...)` and the runtime retrieves and updates the conversation history for that session automatically.

```ballerina
service /booking on new ai:Listener(8090) {
    resource function post chat(ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {
        string response = check bookingAgent.run(request.message, request.sessionId);
        return {message: response};
    }
}
```

## Step 5: Run and test

1. Run the project:

    ```bash
    bal run
    ```

2. Have a multi-turn conversation. Use the same `sessionId` across requests so the agent remembers context:

    ```bash
    # Turn 1 — start the conversation
    curl -X POST http://localhost:8090/booking/chat \
      -H "Content-Type: application/json" \
      -d '{"sessionId": "guest-42", "message": "I am looking for a hotel in Paris under $200 a night"}'

    # Turn 2 — refer back to an earlier result
    curl -X POST http://localhost:8090/booking/chat \
      -H "Content-Type: application/json" \
      -d '{"sessionId": "guest-42", "message": "Can you check the City Center Inn from March 20 to March 23?"}'

    # Turn 3 — confirm the booking
    curl -X POST http://localhost:8090/booking/chat \
      -H "Content-Type: application/json" \
      -d '{"sessionId": "guest-42", "message": "Yes, please book it for Jane Smith"}'
    ```

Because the listener keeps session history, the agent resolves "the City Center Inn" and "it" from the earlier messages without the user having to repeat themselves.

## How it works

This example demonstrates three patterns you will reuse in every production agent:

1. **Session-scoped memory** — `ai:Listener` keeps a short history of messages per `sessionId`, so the LLM sees recent turns on every call.
2. **Sequential tool calls** — The agent calls `searchHotels`, then `checkAvailability`, then `makeBooking`, using each result to inform the next step. The chaining is driven entirely by the LLM's reasoning.
3. **Confirmation before side effects** — The system prompt instructs the agent to confirm details before calling `makeBooking`, which is how you prevent unintended actions when a tool has real-world consequences.

## What's next

- [Creating an AI Agent](/docs/genai/develop/agents/creating-an-agent) — Full reference for agent configuration
- [Tools](/docs/genai/develop/agents/tools) — Advanced tool patterns
- [Memory](/docs/genai/develop/agents/memory) — Custom memory strategies
