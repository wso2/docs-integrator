---
sidebar_position: 2
title: Conversation Logging
description: Log and audit agent conversations for debugging, compliance, and quality analysis.
---

# Conversation Logging

Conversation logging captures the full dialogue between users and AI agents, including tool calls, decisions, and metadata. Logs serve multiple purposes: debugging unexpected behavior, meeting compliance requirements, analyzing conversation quality, and informing future improvements.

Unlike [agent tracing](agent-tracing.md) (which captures performance and timing), conversation logging captures the content of interactions.

## Enabling Conversation Logging

### Basic Logging

```ballerina
import ballerinax/ai.agent;
import ballerina/log;

final agent:ChatAgent loggedAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [getOrderStatus, getCustomer],
    logging: {
        enabled: true,
        logLevel: "info",         // "debug", "info", "warn"
        includeToolCalls: true,
        includeToolResults: true,
        includeTimestamps: true
    }
);
```

### Structured Conversation Log

Capture conversations as structured records for storage and analysis.

```ballerina
import ballerina/uuid;
import ballerina/time;

type ConversationLogEntry record {|
    string logId;
    string sessionId;
    string userId;
    string timestamp;
    string role;           // "user", "assistant", "tool", "system"
    string content;
    json? metadata;
|};

type ToolCallLog record {|
    string toolName;
    json args;
    json result;
    int durationMs;
    boolean success;
|};

function logConversationTurn(
    string sessionId,
    string userId,
    string userMessage,
    string agentResponse,
    ToolCallLog[] toolCalls
) returns error? {
    // Log the user message
    check conversationDb->insert(<ConversationLogEntry>{
        logId: uuid:createType1().toString(),
        sessionId,
        userId,
        timestamp: time:utcNow().toString(),
        role: "user",
        content: userMessage,
        metadata: ()
    });

    // Log each tool call
    foreach ToolCallLog toolCall in toolCalls {
        check conversationDb->insert(<ConversationLogEntry>{
            logId: uuid:createType1().toString(),
            sessionId,
            userId,
            timestamp: time:utcNow().toString(),
            role: "tool",
            content: toolCall.toolName,
            metadata: {args: toolCall.args, result: toolCall.result, durationMs: toolCall.durationMs}
        });
    }

    // Log the agent response
    check conversationDb->insert(<ConversationLogEntry>{
        logId: uuid:createType1().toString(),
        sessionId,
        userId,
        timestamp: time:utcNow().toString(),
        role: "assistant",
        content: agentResponse,
        metadata: ()
    });
}
```

## Logging with Metadata

Capture contextual metadata alongside conversations for richer analysis.

```ballerina
function chatWithLogging(string message, string sessionId, string userId) returns string|error {
    agent:ChatResponse response = check myAgent.chatWithMetadata(message, sessionId);

    // Log with full metadata
    log:printInfo("Conversation turn",
        sessionId = sessionId,
        userId = userId,
        userMessage = message,
        agentResponse = response.message,
        inputTokens = response.usage.inputTokens,
        outputTokens = response.usage.outputTokens,
        toolCalls = response.toolCalls.length(),
        model = response.usage.model,
        durationMs = response.durationMs
    );

    return response.message;
}
```

## Storage Options

### Database Storage

```ballerina
import ballerinax/mysql;

final mysql:Client conversationDb = check new ({
    host: dbHost, port: dbPort,
    user: dbUser, password: dbPassword,
    database: "conversation_logs"
});

function storeConversation(ConversationLogEntry entry) returns error? {
    _ = check conversationDb->execute(`
        INSERT INTO conversation_logs (log_id, session_id, user_id, timestamp, role, content, metadata)
        VALUES (${entry.logId}, ${entry.sessionId}, ${entry.userId}, ${entry.timestamp},
                ${entry.role}, ${entry.content}, ${entry.metadata.toString()})
    `);
}
```

### File-Based Logging

```ballerina
import ballerina/io;

function logToFile(ConversationLogEntry entry) returns error? {
    string logLine = entry.toJsonString() + "\n";
    check io:fileWriteString(
        string `/var/log/conversations/${entry.sessionId}.jsonl`,
        logLine,
        io:APPEND
    );
}
```

### Event Stream Logging

Push conversation events to a message queue for downstream processing.

```ballerina
import ballerinax/kafka;

final kafka:Producer logProducer = check new ({
    bootstrapServers: "kafka:9092"
});

function logToKafka(ConversationLogEntry entry) returns error? {
    check logProducer->send({
        topic: "conversation-logs",
        key: entry.sessionId.toBytes(),
        value: entry.toJsonString().toBytes()
    });
}
```

## Privacy-Aware Logging

### PII Redaction in Logs

```ballerina
import ballerinax/ai.guardrails;

final guardrails:PiiDetector piiRedactor = new ({
    detect: ["email", "phone", "ssn", "credit_card"],
    action: "redact",
    redactWith: "[REDACTED]"
});

function logWithRedaction(string sessionId, string role, string content) returns error? {
    // Redact PII before logging
    guardrails:GuardrailResult result = check piiRedactor.validate(content);
    string safeContent = result.modifiedInput ?: content;

    log:printInfo("Conversation",
        sessionId = sessionId,
        role = role,
        content = safeContent
    );
}
```

### Configurable Log Detail Levels

```ballerina
configurable string logDetail = "summary";  // "full", "summary", "metadata_only"

function logConversation(string sessionId, string message, string response) returns error? {
    match logDetail {
        "full" => {
            log:printInfo("Conversation", sessionId = sessionId, message = message, response = response);
        }
        "summary" => {
            log:printInfo("Conversation", sessionId = sessionId,
                messageLength = message.length(), responseLength = response.length());
        }
        "metadata_only" => {
            log:printInfo("Conversation", sessionId = sessionId);
        }
    }
}
```

## Log Retention and Rotation

### Time-Based Retention

```ballerina
// Clean up logs older than the retention period
function cleanupOldLogs(int retentionDays) returns error? {
    _ = check conversationDb->execute(`
        DELETE FROM conversation_logs
        WHERE timestamp < DATE_SUB(NOW(), INTERVAL ${retentionDays} DAY)
    `);
    log:printInfo("Log cleanup completed", retentionDays = retentionDays);
}
```

### Automated Cleanup

```ballerina
import ballerina/task;

class LogCleanupJob {
    *task:Job;

    public function execute() {
        error? result = cleanupOldLogs(90);  // 90-day retention
        if result is error {
            log:printError("Log cleanup failed", 'error = result);
        }
    }
}

function init() returns error? {
    _ = check task:scheduleJobRecurByFrequency(new LogCleanupJob(), 86400);  // Daily
}
```

## Querying Conversation Logs

### Retrieve Session History

```ballerina
function getSessionHistory(string sessionId) returns ConversationLogEntry[]|error {
    return check conversationDb->queryRows(
        `SELECT * FROM conversation_logs WHERE session_id = ${sessionId} ORDER BY timestamp ASC`
    );
}
```

### Search Conversations

```ballerina
function searchConversations(string keyword, string? userId = ()) returns ConversationLogEntry[]|error {
    if userId is string {
        return check conversationDb->queryRows(
            `SELECT * FROM conversation_logs
             WHERE user_id = ${userId} AND content LIKE ${"%" + keyword + "%"}
             ORDER BY timestamp DESC LIMIT 100`
        );
    }
    return check conversationDb->queryRows(
        `SELECT * FROM conversation_logs
         WHERE content LIKE ${"%" + keyword + "%"}
         ORDER BY timestamp DESC LIMIT 100`
    );
}
```

### Conversation Analytics

```ballerina
type ConversationStats record {|
    int totalConversations;
    int totalMessages;
    float avgMessagesPerSession;
    float avgDurationMinutes;
    int totalToolCalls;
|};

function getConversationStats(string period) returns ConversationStats|error {
    return check conversationDb->queryRow(`
        SELECT
            COUNT(DISTINCT session_id) as totalConversations,
            COUNT(*) as totalMessages,
            COUNT(*) / COUNT(DISTINCT session_id) as avgMessagesPerSession,
            AVG(TIMESTAMPDIFF(MINUTE, MIN(timestamp), MAX(timestamp))) as avgDurationMinutes,
            SUM(CASE WHEN role = 'tool' THEN 1 ELSE 0 END) as totalToolCalls
        FROM conversation_logs
        WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 ${period})
    `);
}
```

## What's Next

- [Agent Tracing](agent-tracing.md) -- Trace agent performance and timing
- [Performance Metrics](performance-metrics.md) -- Monitor latency and throughput
- [Debugging Agent Behavior](debugging-agent-behavior.md) -- Use logs to diagnose issues
- [AI Usage Guidelines](/docs/genai/guardrails/ai-usage-guidelines) -- Compliance requirements for logging
