---
sidebar_position: 1
title: "Building an HR Knowledge Base Agent with RAG"
description: Build an HR agent that answers employee questions about company policies and procedures using retrieval-augmented generation (RAG).
---

# Building an HR Knowledge Base Agent with RAG

**Time:** 45 minutes | **Level:** Intermediate | **What you'll build:** An HR knowledge base agent that answers employee questions about company policies, benefits, and procedures by retrieving relevant context from ingested HR documents using RAG.

In this tutorial, you build an end-to-end HR knowledge base agent powered by retrieval-augmented generation. The agent ingests HR policy documents into a vector database, retrieves relevant sections when employees ask questions, and generates accurate answers grounded in your actual policies. This ensures employees get consistent, up-to-date answers rather than responses based on generic LLM training data.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An OpenAI API key (for embeddings and chat completion)
- PostgreSQL with the pgvector extension installed (or ChromaDB as an alternative)

## Architecture

```
Ingestion Pipeline:
HR Documents (PDF/TXT) → Chunking → Embedding (OpenAI) → pgvector Database

Query Pipeline:
Employee Question → Embed → Vector Search → Top-K Chunks → Agent + Context → Answer

                         ┌───────────────────┐
                         │    HR Agent       │
                         │                   │
Employee Question ──────►│  System Prompt    │
                         │  + LLM (GPT-4o)  │
                         │  + Tools          │
                         └───────┬───────────┘
                                 │
                    ┌────────────┼─────────────┐
                    ▼            ▼              ▼
            ┌──────────┐ ┌────────────┐ ┌────────────┐
            │ pgvector │ │ Leave      │ │ Employee   │
            │ (Policy  │ │ Balance    │ │ Directory  │
            │  Search) │ │ API        │ │ API        │
            └──────────┘ └────────────┘ └────────────┘
```

## Step 1: Create the Project

Create a new WSO2 Integrator project and add the required dependencies.

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "hr_knowledge_base_agent"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.agent"

[[dependency]]
org = "ballerinax"
name = "ai.provider.openai"

[[dependency]]
org = "ballerinax"
name = "postgresql"

[[dependency]]
org = "ballerinax"
name = "postgresql.driver"
```

## Step 2: Set Up Configuration

```toml
# Config.toml
openaiKey = "<your-openai-api-key>"
dbHost = "localhost"
dbPort = 5432
dbUser = "postgres"
dbPassword = "password"
dbName = "hr_knowledge_base"
```

```ballerina
// config.bal
configurable string openaiKey = ?;
configurable string dbHost = ?;
configurable int dbPort = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;
```

## Step 3: Set Up the Vector Database

Before running the application, create the pgvector extension and documents table in PostgreSQL.

```sql
-- Run this in your PostgreSQL database
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS hr_documents (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    source TEXT NOT NULL,
    category TEXT NOT NULL,
    chunk_index INT NOT NULL,
    total_chunks INT NOT NULL,
    embedding vector(1536)
);

CREATE INDEX ON hr_documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

## Step 4: Define Data Types

```ballerina
// types.bal
type HrDocumentChunk record {|
    string id;
    string content;
    string source;
    string category;    // "leave-policy", "benefits", "code-of-conduct", "onboarding", etc.
    int chunkIndex;
    int totalChunks;
|};

type SearchResult record {|
    string content;
    string source;
    string category;
    float score;
|};

type HrQueryResponse record {|
    string answer;
    string[] sources;
    string[] relatedTopics;
    int chunksUsed;
|};

type LeaveBalance record {|
    string employeeId;
    string employeeName;
    int annualLeave;
    int sickLeave;
    int personalLeave;
    int carryOver;
|};

type EmployeeInfo record {|
    string employeeId;
    string name;
    string department;
    string manager;
    string email;
    string startDate;
|};
```

## Step 5: Build the Embedding and Chunking Pipeline

```ballerina
// embeddings.bal
import ballerinax/ai.provider.openai;

final openai:Client embeddingClient = check new ({
    auth: {token: openaiKey},
    model: "text-embedding-3-small"
});

function generateEmbedding(string text) returns float[]|error {
    openai:EmbeddingResponse response = check embeddingClient.createEmbedding(text);
    return response.embedding;
}
```

```ballerina
// chunking.bal
import ballerina/io;
import ballerina/regex;

function chunkDocument(string content, int maxChunkSize = 500, int overlap = 100) returns string[] {
    string[] paragraphs = re `\n\n+`.split(content);
    string[] chunks = [];
    string currentChunk = "";

    foreach string paragraph in paragraphs {
        if (currentChunk.length() + paragraph.length()) > maxChunkSize && currentChunk.length() > 0 {
            chunks.push(currentChunk.trim());
            int overlapStart = currentChunk.length() > overlap
                ? currentChunk.length() - overlap : 0;
            currentChunk = currentChunk.substring(overlapStart) + "\n\n" + paragraph;
        } else {
            currentChunk = currentChunk.length() > 0
                ? currentChunk + "\n\n" + paragraph
                : paragraph;
        }
    }

    if currentChunk.trim().length() > 0 {
        chunks.push(currentChunk.trim());
    }
    return chunks;
}

function ingestHrDocument(string filePath, string category) returns HrDocumentChunk[]|error {
    string content = check io:fileReadString(filePath);
    string[] chunks = chunkDocument(content);

    HrDocumentChunk[] docChunks = [];
    foreach int i in 0 ..< chunks.length() {
        docChunks.push({
            id: string `${filePath}-chunk-${i}`,
            content: chunks[i],
            source: filePath,
            category: category,
            chunkIndex: i,
            totalChunks: chunks.length()
        });
    }
    return docChunks;
}
```

## Step 6: Build the Vector Store Client

```ballerina
// vectorstore.bal
import ballerinax/postgresql;

final postgresql:Client pgClient = check new ({
    host: dbHost, port: dbPort,
    username: dbUser, password: dbPassword,
    database: dbName
});

function storeChunks(HrDocumentChunk[] chunks) returns error? {
    foreach HrDocumentChunk chunk in chunks {
        float[] embedding = check generateEmbedding(chunk.content);
        string embeddingStr = embedding.toString();

        _ = check pgClient->execute(`
            INSERT INTO hr_documents (id, content, source, category, chunk_index, total_chunks, embedding)
            VALUES (${chunk.id}, ${chunk.content}, ${chunk.source}, ${chunk.category},
                    ${chunk.chunkIndex}, ${chunk.totalChunks}, ${embeddingStr}::vector)
            ON CONFLICT (id) DO UPDATE SET
                content = EXCLUDED.content,
                embedding = EXCLUDED.embedding
        `);
    }
}

function searchSimilar(string query, int topK = 5, string? category = ()) returns SearchResult[]|error {
    float[] queryEmbedding = check generateEmbedding(query);
    string embeddingStr = queryEmbedding.toString();

    if category is string {
        return check from record {string content; string source; string category; float score} row in
            pgClient->query(`
                SELECT content, source, category,
                       1 - (embedding <=> ${embeddingStr}::vector) AS score
                FROM hr_documents
                WHERE category = ${category}
                ORDER BY embedding <=> ${embeddingStr}::vector
                LIMIT ${topK}
            `)
            select {content: row.content, source: row.source, category: row.category, score: row.score};
    }

    return check from record {string content; string source; string category; float score} row in
        pgClient->query(`
            SELECT content, source, category,
                   1 - (embedding <=> ${embeddingStr}::vector) AS score
            FROM hr_documents
            ORDER BY embedding <=> ${embeddingStr}::vector
            LIMIT ${topK}
        `)
        select {content: row.content, source: row.source, category: row.category, score: row.score};
}
```

## Step 7: Define Agent Tools

Each tool provides the agent with a capability to access HR systems and the knowledge base.

```ballerina
// tools.bal
import ballerinax/ai.agent;
import ballerina/http;

final http:Client hrApi = check new ("http://localhost:8080/api/hr");

@agent:Tool {
    name: "searchHrPolicies",
    description: "Search the HR knowledge base for information about company policies, benefits, procedures, and guidelines. Use this when employees ask about leave policies, benefits, code of conduct, onboarding, or any HR-related question."
}
isolated function searchHrPolicies(
    @agent:Param {description: "The question or topic to search for in the HR knowledge base"} string query,
    @agent:Param {description: "Optional category filter: 'leave-policy', 'benefits', 'code-of-conduct', 'onboarding', or leave empty for all"} string? category = ()
) returns json|error {
    SearchResult[] results = check searchSimilar(query, topK = 5, category = category);
    return results.toJson();
}

@agent:Tool {
    name: "getLeaveBalance",
    description: "Retrieve the current leave balance for an employee by their employee ID. Shows annual, sick, and personal leave remaining. Use this when an employee asks how many leave days they have."
}
isolated function getLeaveBalance(
    @agent:Param {description: "Employee ID in the format EMP-XXXXX"} string employeeId
) returns json|error {
    json|error result = hrApi->get(string `/leave-balance/${employeeId}`);
    if result is error {
        return {
            "found": false,
            "message": string `Could not find leave balance for employee '${employeeId}'.`,
            "suggestion": "Please verify the employee ID. It should be in the format EMP-XXXXX."
        };
    }
    return result;
}

@agent:Tool {
    name: "lookupEmployee",
    description: "Look up employee information by name or employee ID. Returns department, manager, and contact details. Use this when needing to find who someone reports to or how to contact a colleague."
}
isolated function lookupEmployee(
    @agent:Param {description: "Employee name or employee ID"} string query
) returns json|error {
    return check hrApi->get(string `/employees?search=${query}`);
}

@agent:Tool {
    name: "submitLeaveRequest",
    description: "Submit a leave request for an employee. Use this only when an employee explicitly asks to submit a leave request and provides all required details."
}
isolated function submitLeaveRequest(
    @agent:Param {description: "Employee ID"} string employeeId,
    @agent:Param {description: "Leave type: 'annual', 'sick', or 'personal'"} string leaveType,
    @agent:Param {description: "Start date in YYYY-MM-DD format"} string startDate,
    @agent:Param {description: "End date in YYYY-MM-DD format"} string endDate,
    @agent:Param {description: "Reason for leave"} string reason
) returns json|error {
    return check hrApi->post("/leave-requests", {
        employeeId, leaveType, startDate, endDate, reason
    });
}
```

## Step 8: Create the Agent

```ballerina
// agent.bal
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;

final openai:Client llmClient = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o"
});

final agent:ChatAgent hrAgent = check new (
    model: llmClient,
    systemPrompt: string `You are an HR Knowledge Base Assistant for the company.

Role:
- Help employees find answers to HR-related questions about policies, benefits, leave, and procedures.
- Provide accurate information grounded in the company's actual HR documents.

Tools:
- Use searchHrPolicies to answer questions about company policies, benefits, and procedures.
- Use getLeaveBalance to check an employee's remaining leave days.
- Use lookupEmployee to find employee details, managers, or contact information.
- Use submitLeaveRequest only when an employee explicitly requests to submit a leave request.

Guidelines:
- Always search the knowledge base before answering policy questions -- never guess.
- Cite the source document when referencing specific policies.
- If the answer is not in the knowledge base, clearly state that and suggest contacting HR directly.
- Be professional, empathetic, and concise.
- For sensitive topics (termination, disciplinary actions, salary), advise the employee to speak with their HR representative directly.
- Never disclose another employee's personal information, leave balance, or salary details.`,
    tools: [searchHrPolicies, getLeaveBalance, lookupEmployee, submitLeaveRequest],
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

## Step 9: Expose as an HTTP Service

```ballerina
// service.bal
import ballerina/http;
import ballerina/uuid;

type ChatRequest record {|
    string message;
    string? sessionId;
    string? employeeId;
|};

type ChatResponse record {|
    string message;
    string sessionId;
|};

type IngestRequest record {|
    string filePath;
    string category;
|};

service /hr on new http:Listener(8090) {

    // Chat endpoint for employee questions
    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string sessionId = request.sessionId ?: uuid:createType1().toString();

        string message = request.message;
        if request.employeeId is string {
            message = string `[Employee ID: ${<string>request.employeeId}] ${message}`;
        }

        string response = check hrAgent.chat(message, sessionId);
        return {message: response, sessionId};
    }

    // Document ingestion endpoint
    resource function post ingest(@http:Payload IngestRequest request)
            returns record {|string message; int chunks;|}|error {
        HrDocumentChunk[] chunks = check ingestHrDocument(request.filePath, request.category);
        check storeChunks(chunks);
        return {
            message: string `Successfully ingested '${request.filePath}' under category '${request.category}'`,
            chunks: chunks.length()
        };
    }
}
```

## Step 10: Run and Test

1. Start the service:
   ```bash
   bal run
   ```

2. Ingest HR documents:
   ```bash
   # Ingest the leave policy
   curl -X POST http://localhost:8090/hr/ingest \
     -H "Content-Type: application/json" \
     -d '{"filePath": "/docs/hr/leave-policy.txt", "category": "leave-policy"}'

   # Ingest the benefits guide
   curl -X POST http://localhost:8090/hr/ingest \
     -H "Content-Type: application/json" \
     -d '{"filePath": "/docs/hr/benefits-guide.txt", "category": "benefits"}'

   # Ingest the code of conduct
   curl -X POST http://localhost:8090/hr/ingest \
     -H "Content-Type: application/json" \
     -d '{"filePath": "/docs/hr/code-of-conduct.txt", "category": "code-of-conduct"}'
   ```

3. Ask HR questions:
   ```bash
   # Ask about leave policy
   curl -X POST http://localhost:8090/hr/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "How many annual leave days do I get per year?", "employeeId": "EMP-10042"}'

   # Check leave balance (use sessionId from previous response)
   curl -X POST http://localhost:8090/hr/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "How many sick days do I have left?", "sessionId": "<session-id>", "employeeId": "EMP-10042"}'

   # Ask about benefits
   curl -X POST http://localhost:8090/hr/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "What dental coverage does the company health plan include?", "sessionId": "<session-id>"}'
   ```

## What You Built

You now have an HR knowledge base agent that:
- Ingests HR policy documents into a pgvector database using OpenAI embeddings
- Retrieves relevant policy sections using semantic search when employees ask questions
- Generates accurate answers grounded in your actual HR documents with source citations
- Checks employee leave balances and submits leave requests
- Maintains conversation context across multiple turns
- Protects sensitive employee information

## What's Next

- [RAG Knowledge Base](rag-knowledge-base.md) -- Explore advanced RAG techniques
- [Chunking & Embedding](/docs/genai/rag/chunking-embedding) -- Optimize chunking strategies for policy documents
- [Memory Configuration](/docs/genai/agents/memory-configuration) -- Configure persistent memory for long conversations
- [AI Governance and Security](/docs/genai/reference/ai-governance) -- Add governance and audit logging
