---
sidebar_position: 3
title: Troubleshooting and Common Issues
description: Solutions for common problems when building AI integrations with WSO2 Integrator.
---

# Troubleshooting and Common Issues

This page covers common issues encountered when building AI integrations with WSO2 Integrator, along with their solutions.

## LLM Provider Issues

| Issue | Cause | Solution |
|---|---|---|
| `401 Unauthorized` from LLM API | Invalid or expired API key | Verify your API key in `Config.toml`; rotate if expired |
| `429 Too Many Requests` | Rate limit exceeded | Implement retry with exponential backoff; consider upgrading your plan |
| `Connection refused` to Ollama | Ollama not running | Start Ollama with `ollama serve`; verify endpoint URL |
| `Model not found` | Incorrect model identifier | Check the provider's model list; use exact model IDs (e.g., `gpt-4o`, not `gpt4`) |
| Slow responses from LLM | Model overloaded or large context | Use a smaller model for simple tasks; reduce context window size |
| `context_length_exceeded` | Input + output exceeds model limit | Reduce conversation history; use summarization memory; trim system prompt |

## Agent Issues

| Issue | Cause | Solution |
|---|---|---|
| Agent loops infinitely | Agent cannot find the right tool or answer | Set `maxIterations` to limit loops; improve system prompt clarity |
| Agent calls wrong tool | Tool names or descriptions are ambiguous | Use descriptive function names; add detailed `@agent:Tool` descriptions |
| Agent ignores available tools | System prompt doesn't encourage tool use | Update system prompt to explicitly mention when to use tools |
| Agent returns empty response | Tool returned an error the agent cannot recover from | Improve error handling in tool functions; return helpful error messages |
| Memory not persisting | Session ID not consistent | Ensure the same session ID is used across requests for the same conversation |

## RAG Issues

| Issue | Cause | Solution |
|---|---|---|
| Poor retrieval quality | Chunks too large or too small | Experiment with chunk sizes (256-1024 tokens); use overlap |
| No results from vector search | Embeddings not generated correctly | Verify embedding model matches the one used for queries |
| Slow vector queries | Missing index on embedding column | Create an IVFFlat or HNSW index on the vector column |
| Irrelevant results | Embedding model mismatch | Use the same embedding model for both ingestion and queries |
| Out of memory during ingestion | Processing too many documents at once | Batch document processing; use streaming for large files |

## MCP Issues

| Issue | Cause | Solution |
|---|---|---|
| MCP server not discoverable | Transport misconfigured | Verify transport type (`stdio` vs `sse`) and endpoint URL |
| `Connection refused` to MCP | MCP server not running | Start the MCP server; check the port is not in use |
| Tool calls fail silently | MCP tool returns error | Add error logging in MCP tool implementations |
| AI assistant can't find tools | Tool descriptions missing | Add `@mcp:Tool` annotations with clear descriptions |

## Memory Issues

| Issue | Cause | Solution |
|---|---|---|
| Redis connection failures | Redis not running or misconfigured | Verify Redis host/port; check firewall rules |
| Session data lost after restart | Using in-memory storage in production | Switch to Redis or database-backed memory |
| Token limit exceeded with memory | Too many messages in history | Use `TokenWindowChatMemory` with a token budget |
| Conversations mixing between users | Session IDs not unique | Generate unique session IDs per user/conversation |

## Build and Runtime Errors

| Issue | Cause | Solution |
|---|---|---|
| `Module not found: ballerinax/ai.agent` | Missing dependency | Run `bal pull ballerinax/ai.agent`; update `Ballerina.toml` |
| `Incompatible types` in tool functions | Tool return type mismatch | Ensure tool functions return types compatible with the agent |
| `Config variable not found` | Missing `Config.toml` entry | Add required config variables with `configurable string apiKey = ?;` |

## Getting Help

- Check the [WSO2 Community Forums](https://community.wso2.com) for community support
- File issues on the [WSO2 Integrator GitHub repository](https://github.com/wso2/integrator)
- Review the [Ballerina AI module documentation](https://central.ballerina.io/ballerinax/ai.agent/latest)

## What's Next

- [AI Governance and Security](ai-governance.md) — Compliance and data handling
- [Ballerina Copilot Guide](copilot-guide.md) — AI-assisted development
