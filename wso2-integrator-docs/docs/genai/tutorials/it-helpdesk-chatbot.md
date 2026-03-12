---
sidebar_position: 3
title: "Building an IT Helpdesk Chatbot with Persistent Memory"
description: Build an IT support chatbot that remembers conversation history across sessions using Redis-backed persistent memory.
---

# Building an IT Helpdesk Chatbot with Persistent Memory

**Time:** 40 minutes | **Level:** Intermediate | **What you'll build:** An IT helpdesk chatbot that assists employees with technical issues, looks up support tickets, searches a knowledge base, and remembers past conversations using Redis-backed persistent memory.

In this tutorial, you build an IT support chatbot with persistent memory so that returning employees do not need to repeat their issues. The chatbot connects to a ticketing system and an internal knowledge base, and it exposes its interface as a WebSocket service for real-time bidirectional communication. Redis is used as the memory store to persist conversation history across sessions and service restarts.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An OpenAI API key (or another supported LLM provider)
- Redis server running locally or remotely
- Familiarity with [Memory Configuration](/docs/genai/agents/memory-configuration)

## Architecture

```
                     WebSocket
Employee ◄──────────────────────────► IT Helpdesk Agent
                                     │
                                     ├── LLM (GPT-4o)
                                     ├── Memory (Redis)
                                     │
                              ┌──────┴──────┐
                              │   Tools     │
                              ├─────────────┤
                              │ ticketLookup│
                              │ createTicket│
                              │ searchKB    │
                              │ checkStatus │
                              │ resetPwd    │
                              └─────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
            ┌──────────┐    ┌──────────────┐  ┌──────────┐
            │ Ticket   │    │ Knowledge    │  │ IT Admin │
            │ System   │    │ Base (Wiki)  │  │   API    │
            └──────────┘    └──────────────┘  └──────────┘
```

## Step 1: Create the Project

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "it_helpdesk_chatbot"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.agent"

[[dependency]]
org = "ballerinax"
name = "ai.provider.openai"

[[dependency]]
org = "ballerinax"
name = "redis"

[[dependency]]
org = "ballerina"
name = "websocket"
```

## Step 2: Set Up Configuration

```toml
# Config.toml
openaiKey = "<your-openai-api-key>"
redisHost = "localhost"
redisPort = 6379
redisPassword = ""
ticketApiUrl = "http://localhost:8080/api/tickets"
kbApiUrl = "http://localhost:8081/api/kb"
itAdminApiUrl = "http://localhost:8082/api/admin"
```

```ballerina
// config.bal
configurable string openaiKey = ?;
configurable string redisHost = ?;
configurable int redisPort = ?;
configurable string redisPassword = ?;
configurable string ticketApiUrl = ?;
configurable string kbApiUrl = ?;
configurable string itAdminApiUrl = ?;
```

## Step 3: Define Data Types

```ballerina
// types.bal
type SupportTicket record {|
    string ticketId;
    string employeeId;
    string subject;
    string description;
    string category;       // "hardware", "software", "network", "access", "other"
    string priority;       // "low", "medium", "high", "critical"
    string status;         // "open", "in_progress", "waiting", "resolved", "closed"
    string? assignedTo;
    string createdAt;
    string? resolvedAt;
    TicketComment[] comments;
|};

type TicketComment record {|
    string author;
    string content;
    string timestamp;
|};

type KbArticle record {|
    string articleId;
    string title;
    string content;
    string category;
    string[] tags;
    float relevanceScore;
|};

type PasswordResetResult record {|
    boolean success;
    string message;
    string? temporaryPassword;
    string? expiresAt;
|};

type ChatMessage record {|
    string role;      // "user" or "assistant"
    string content;
    string timestamp;
|};
```

## Step 4: Configure Redis-Backed Persistent Memory

```ballerina
// memory.bal
import ballerinax/redis;
import ballerinax/ai.agent;

final redis:Client redisClient = check new ({
    host: redisHost,
    port: redisPort,
    password: redisPassword.length() > 0 ? redisPassword : ()
});

// Create a persistent memory store backed by Redis
function createPersistentMemory(string sessionId) returns agent:ChatMemory {
    return new agent:PersistentChatMemory({
        store: redisClient,
        sessionId: sessionId,
        maxMessages: 50,
        ttl: 86400 * 7     // Keep conversation history for 7 days
    });
}
```

## Step 5: Define Agent Tools

```ballerina
// tools.bal
import ballerinax/ai.agent;
import ballerina/http;

final http:Client ticketApi = check new (ticketApiUrl);
final http:Client kbApi = check new (kbApiUrl);
final http:Client itAdminApi = check new (itAdminApiUrl);

@agent:Tool {
    name: "lookupTicket",
    description: "Look up an existing IT support ticket by ticket ID. Returns ticket details including status, priority, assigned technician, and comments. Use this when an employee asks about the status of a previously reported issue."
}
isolated function lookupTicket(
    @agent:Param {description: "Ticket ID in the format TKT-XXXXX"} string ticketId
) returns json|error {
    json|error result = ticketApi->get(string `/tickets/${ticketId}`);
    if result is error {
        return {
            "found": false,
            "message": string `Ticket '${ticketId}' not found. Please verify the ticket ID.`
        };
    }
    return result;
}

@agent:Tool {
    name: "listEmployeeTickets",
    description: "List all support tickets for a specific employee. Returns recent tickets sorted by creation date. Use this when an employee wants to see their ticket history."
}
isolated function listEmployeeTickets(
    @agent:Param {description: "Employee ID"} string employeeId,
    @agent:Param {description: "Filter by status: 'open', 'in_progress', 'resolved', or 'all'"} string status = "all"
) returns json|error {
    string query = status == "all" ? "" : string `&status=${status}`;
    return check ticketApi->get(string `/tickets?employeeId=${employeeId}${query}`);
}

@agent:Tool {
    name: "createTicket",
    description: "Create a new IT support ticket. Use this when an employee reports a new issue that cannot be resolved immediately through the knowledge base or basic troubleshooting."
}
isolated function createTicket(
    @agent:Param {description: "Employee ID"} string employeeId,
    @agent:Param {description: "Brief subject line"} string subject,
    @agent:Param {description: "Detailed description of the issue, including any troubleshooting steps already taken"} string description,
    @agent:Param {description: "Category: 'hardware', 'software', 'network', 'access', or 'other'"} string category,
    @agent:Param {description: "Priority: 'low', 'medium', 'high', or 'critical'"} string priority = "medium"
) returns json|error {
    return check ticketApi->post("/tickets", {
        employeeId, subject, description, category, priority
    });
}

@agent:Tool {
    name: "searchKnowledgeBase",
    description: "Search the IT knowledge base for troubleshooting guides, how-to articles, and common solutions. Use this FIRST before creating a ticket to check if there is a known solution."
}
isolated function searchKnowledgeBase(
    @agent:Param {description: "Search query describing the issue or topic"} string query,
    @agent:Param {description: "Category filter: 'hardware', 'software', 'network', 'access', or 'all'"} string category = "all"
) returns json|error {
    string categoryParam = category == "all" ? "" : string `&category=${category}`;
    return check kbApi->get(string `/search?q=${query}${categoryParam}&limit=5`);
}

@agent:Tool {
    name: "checkSystemStatus",
    description: "Check the current status of IT systems and services (email, VPN, intranet, etc.). Use this when an employee reports they cannot access a service — it may be a known outage."
}
isolated function checkSystemStatus(
    @agent:Param {description: "System name: 'email', 'vpn', 'intranet', 'erp', 'all'"} string system = "all"
) returns json|error {
    return check itAdminApi->get(string `/system-status?system=${system}`);
}

@agent:Tool {
    name: "requestPasswordReset",
    description: "Initiate a password reset for an employee's account. Only use when the employee explicitly requests a password reset and provides their employee ID."
}
isolated function requestPasswordReset(
    @agent:Param {description: "Employee ID"} string employeeId,
    @agent:Param {description: "System to reset password for: 'email', 'vpn', 'erp', 'intranet'"} string system
) returns json|error {
    return check itAdminApi->post("/password-reset", {
        employeeId, system
    });
}
```

## Step 6: Create the Agent

```ballerina
// agent.bal
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;

final openai:Client llmClient = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o"
});

function createHelpdeskAgent(string sessionId) returns agent:ChatAgent|error {
    return new (
        model: llmClient,
        systemPrompt: string `You are the IT Helpdesk Assistant for the company.

Role:
- Help employees resolve technical issues, find information, and manage support tickets.
- Provide step-by-step troubleshooting guidance when possible.

Tools:
- searchKnowledgeBase: ALWAYS search the KB first before creating a ticket.
- checkSystemStatus: Check if there is a known outage before troubleshooting.
- lookupTicket / listEmployeeTickets: Check existing tickets to avoid duplicates.
- createTicket: Create a ticket only when the issue cannot be resolved through self-service.
- requestPasswordReset: Reset passwords only when explicitly requested by the employee.

Guidelines:
- Greet returning employees by referencing their previous conversations when relevant.
- Always check for known outages before troubleshooting connectivity issues.
- Search the knowledge base before creating a ticket — many issues have documented solutions.
- When creating tickets, include all troubleshooting steps already attempted.
- For password resets, verify the employee ID before proceeding.
- Prioritize critical issues: system outages and security incidents are always high priority.
- Be patient and use clear, non-technical language when guiding employees.
- If an issue seems related to a security incident, escalate immediately.`,
        tools: [
            lookupTicket, listEmployeeTickets, createTicket,
            searchKnowledgeBase, checkSystemStatus, requestPasswordReset
        ],
        memory: createPersistentMemory(sessionId)
    );
}
```

## Step 7: Expose as a WebSocket Service

The WebSocket interface enables real-time, bidirectional chat between the employee and the agent.

```ballerina
// service.bal
import ballerina/websocket;
import ballerina/log;

service /helpdesk on new websocket:Listener(8090) {

    resource function get chat(string employeeId) returns websocket:Service|error {
        log:printInfo(string `Employee ${employeeId} connected to helpdesk`);

        // Create an agent with persistent memory tied to this employee
        agent:ChatAgent helpdeskAgent = check createHelpdeskAgent(employeeId);

        return new ChatService(helpdeskAgent, employeeId);
    }
}

service class ChatService {
    *websocket:Service;

    private final agent:ChatAgent agent;
    private final string employeeId;

    function init(agent:ChatAgent agent, string employeeId) {
        self.agent = agent;
        self.employeeId = employeeId;
    }

    remote function onTextMessage(websocket:Caller caller, string message) returns error? {
        log:printInfo(string `[${self.employeeId}] Message: ${message}`);

        // Prepend employee context to the message
        string contextMessage = string `[Employee: ${self.employeeId}] ${message}`;

        // Get agent response
        string|error response = self.agent.chat(contextMessage, self.employeeId);

        if response is error {
            check caller->writeTextMessage(
                "I apologize, but I encountered an error processing your request. " +
                "Please try again or contact the IT helpdesk directly at ext. 5555."
            );
            log:printError("Agent error", response);
        } else {
            check caller->writeTextMessage(response);
        }
    }

    remote function onClose(websocket:Caller caller, int statusCode, string reason) {
        log:printInfo(string `[${self.employeeId}] Disconnected: ${reason}`);
    }

    remote function onError(websocket:Caller caller, error err) {
        log:printError(string `[${self.employeeId}] WebSocket error`, err);
    }
}
```

## Step 8: Run and Test

1. Start the service:
   ```bash
   bal run
   ```

2. Test using a WebSocket client (e.g., `wscat`):
   ```bash
   # Connect as an employee
   wscat -c "ws://localhost:8090/helpdesk/chat?employeeId=EMP-10042"

   # Type messages in the WebSocket session:
   > I can't connect to the VPN from home
   > I've already restarted my laptop and tried both Wi-Fi and ethernet
   > Can you check if there's an outage?
   > Okay, please create a ticket for this
   ```

3. Test persistent memory by reconnecting:
   ```bash
   # Reconnect as the same employee
   wscat -c "ws://localhost:8090/helpdesk/chat?employeeId=EMP-10042"

   # The agent remembers the previous conversation:
   > Any updates on my VPN issue?
   > I also need a password reset for my email account
   ```

4. Alternatively, test with a simple HTTP endpoint for debugging:
   ```bash
   curl -X POST http://localhost:8090/helpdesk/debug \
     -H "Content-Type: application/json" \
     -d '{"message": "My laptop screen is flickering", "employeeId": "EMP-10042"}'
   ```

## Step 9: Add Conversation Summary for Long Sessions

For long-running conversations, summarize older messages to stay within token limits while retaining key context.

```ballerina
// summary_memory.bal
import ballerinax/ai.agent;

// Use a summarizing memory that compresses older messages
function createSummarizingMemory(string sessionId) returns agent:ChatMemory {
    return new agent:SummarizingChatMemory({
        store: redisClient,
        sessionId: sessionId,
        model: llmClient,
        maxTokens: 4000,
        summaryPrompt: "Summarize the conversation so far, focusing on: " +
            "1) The employee's reported issues and their current status, " +
            "2) Any ticket IDs or reference numbers, " +
            "3) Troubleshooting steps already attempted."
    });
}
```

## What You Built

You now have an IT helpdesk chatbot that:
- Provides real-time support through a WebSocket interface
- Searches the knowledge base for known solutions before escalating
- Checks system status to identify known outages
- Creates and tracks support tickets
- Initiates password resets for employee accounts
- Remembers past conversations using Redis-backed persistent memory
- Summarizes long conversations to manage token limits

## What's Next

- [Memory Configuration](/docs/genai/agents/memory-configuration) -- Explore memory options in depth
- [Chat Agents](/docs/genai/agents/chat-agents) -- Learn more about chat agent patterns
- [Agent Tracing](/docs/genai/agent-observability/agent-tracing) -- Add observability and debugging
- [Troubleshooting](/docs/genai/reference/troubleshooting) -- Common issues and solutions
