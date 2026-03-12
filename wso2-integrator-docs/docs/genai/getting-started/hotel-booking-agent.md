---
sidebar_position: 3
title: "Build a Sample Hotel Booking Agent"
description: Build a hotel booking agent with memory, multiple tools, and multi-turn conversation support.
---

# Build a Sample Hotel Booking Agent

**Time:** 15 minutes | **What you'll build:** A conversational agent that helps users search for hotels, check availability, and make bookings through natural conversation with multi-turn memory.

This quick start builds on the calculator example by adding conversation memory, multiple domain-specific tools, and session management -- patterns you will use in production AI integrations.

## Prerequisites

- [WSO2 Integrator set up for AI](setup.md)
- An API key for an LLM provider

## Step 1: Define Data Types

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

## Step 2: Define Agent Tools

```ballerina
import ballerinax/ai.agent;

@agent:Tool {
    name: "searchHotels",
    description: "Search for hotels in a city. Returns a list of available hotels with pricing and ratings. Use this when a user asks about hotels in a specific location."
}
isolated function searchHotels(
    @agent:Param {description: "City name, e.g., 'Paris', 'New York'"} string city,
    @agent:Param {description: "Maximum price per night in USD"} decimal? maxPrice = ()
) returns Hotel[]|error {
    // In production, this would query a hotel booking API
    Hotel[] hotels = [
        {hotelId: "HTL-001", name: "Grand Plaza Hotel", city: city, pricePerNight: 199.99, rating: 4.5, amenities: ["WiFi", "Pool", "Gym"]},
        {hotelId: "HTL-002", name: "City Center Inn", city: city, pricePerNight: 129.99, rating: 4.0, amenities: ["WiFi", "Breakfast"]},
        {hotelId: "HTL-003", name: "Luxury Suites", city: city, pricePerNight: 349.99, rating: 4.8, amenities: ["WiFi", "Pool", "Spa", "Restaurant"]}
    ];

    if maxPrice is decimal {
        return from Hotel h in hotels where h.pricePerNight <= maxPrice select h;
    }
    return hotels;
}

@agent:Tool {
    name: "checkAvailability",
    description: "Check if a specific hotel has rooms available for given dates. Returns availability status and total price."
}
isolated function checkAvailability(
    @agent:Param {description: "Hotel ID from search results"} string hotelId,
    @agent:Param {description: "Check-in date in YYYY-MM-DD format"} string checkIn,
    @agent:Param {description: "Check-out date in YYYY-MM-DD format"} string checkOut
) returns Availability|error {
    // In production, this would check real availability
    return {
        hotelId: hotelId,
        hotelName: "Grand Plaza Hotel",
        available: true,
        totalPrice: 599.97,
        nights: 3
    };
}

@agent:Tool {
    name: "makeBooking",
    description: "Book a hotel room. Requires hotel ID, guest name, and dates. Returns a booking confirmation. Always confirm details with the user before calling this tool."
}
isolated function makeBooking(
    @agent:Param {description: "Hotel ID"} string hotelId,
    @agent:Param {description: "Full name of the guest"} string guestName,
    @agent:Param {description: "Check-in date (YYYY-MM-DD)"} string checkIn,
    @agent:Param {description: "Check-out date (YYYY-MM-DD)"} string checkOut
) returns Booking|error {
    return {
        bookingId: "BKG-78901",
        hotelId: hotelId,
        hotelName: "Grand Plaza Hotel",
        guestName: guestName,
        checkIn: checkIn,
        checkOut: checkOut,
        totalPrice: 599.97,
        status: "confirmed"
    };
}
```

## Step 3: Create the Agent with Memory

Memory allows the agent to maintain conversation context across multiple turns, so the user can refer back to previous search results or refine their request.

```ballerina
import ballerinax/ai.agent;
import ballerinax/openai.chat;

configurable string openAiApiKey = ?;

final agent:ChatAgent bookingAgent = check new (
    model: check new chat:Client({auth: {token: openAiApiKey}}),
    systemPrompt: string `You are a friendly hotel booking assistant.

Role:
- Help users find and book hotels through natural conversation.
- Be conversational and helpful, asking clarifying questions when needed.

Tools:
- Use searchHotels to find hotels when users mention a city or destination.
- Use checkAvailability before confirming a booking to verify dates and pricing.
- Use makeBooking only after the user confirms they want to proceed.

Guidelines:
- Always present search results in a clear, readable format.
- Mention the price, rating, and key amenities for each hotel.
- Before booking, confirm the hotel name, dates, and guest name with the user.
- If the user hasn't specified dates, ask for check-in and check-out dates.`,
    tools: [searchHotels, checkAvailability, makeBooking],
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

## Step 4: Expose as a Chat Service

```ballerina
import ballerina/http;
import ballerina/uuid;

service /booking on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string sessionId = request.sessionId ?: uuid:createType1().toString();
        string response = check bookingAgent.chat(request.message, sessionId);
        return {message: response, sessionId};
    }

    resource function delete session/[string sessionId]() returns http:Ok {
        bookingAgent.clearMemory(sessionId);
        return http:OK;
    }
}

type ChatRequest record {|
    string message;
    string? sessionId;
|};

type ChatResponse record {|
    string message;
    string sessionId;
|};
```

## Step 5: Run and Test

1. Configure and run:

```toml
openAiApiKey = "sk-your-api-key-here"
```

```bash
bal run
```

2. Have a multi-turn conversation:

```bash
# Start a conversation
curl -X POST http://localhost:8090/booking/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I am looking for a hotel in Paris for under $200 per night"}'

# Follow up (use the sessionId from the previous response)
curl -X POST http://localhost:8090/booking/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Can you check if the City Center Inn is available from March 20 to March 23?", "sessionId": "<session-id>"}'

# Confirm booking
curl -X POST http://localhost:8090/booking/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Yes, please book it for Jane Smith", "sessionId": "<session-id>"}'
```

The agent remembers the entire conversation, so it knows which hotel and dates the user is referring to in follow-up messages.

## How It Works

This agent demonstrates three key patterns:

1. **Multi-turn memory** -- The `MessageWindowChatMemory` keeps the last 20 messages, allowing the agent to maintain context across turns.
2. **Sequential tool calls** -- The agent calls `searchHotels` first, then `checkAvailability`, then `makeBooking`, using each result to inform the next step.
3. **Confirmation before action** -- The system prompt instructs the agent to confirm details before calling `makeBooking`, preventing unintended bookings.

## What's Next

- [Creating an AI Agent](/docs/genai/develop/agents/creating-agent) -- Deep dive into agent configuration
- [Adding Tools to an Agent](/docs/genai/develop/agents/adding-tools) -- Advanced tool patterns
- [Adding Memory to an Agent](/docs/genai/develop/agents/adding-memory) -- Memory types and strategies
- [What is AI Agent Memory?](/docs/genai/key-concepts/what-is-agent-memory) -- Understand memory concepts
