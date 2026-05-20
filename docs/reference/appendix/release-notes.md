---
title: Release Notes
---

# Release Notes

## WSO2 Integrator 5.0.0 — H1 2026

WSO2 Integrator 5.0.0 is a milestone release for the WSO2 Integration Platform. It consolidates the BI, MI, and SI profiles into a single unified offering: **WSO2 Integrator**. The release also introduces a set of headline improvements that meaningfully change how teams build, manage, and operate integrations.

Rather than walk through every change, this note focuses on the five improvements that matter most, and why we made them.

### 1. A truly conversational way to build integrations

Integration development has always been iterative, but tooling rarely reflected that. Developers would write a requirement, generate some code, hit a wall, and start over. With 5.0.0, that cycle changes fundamentally.

The [**WSO2 Integrator Copilot**](../../develop/copilot/overview.md) now supports multi-turn, conversational development. A developer describes a business requirement in natural language. The Copilot proposes an integration plan. The developer refines it (adding rules, OpenAPI specs, or constraints) across multiple exchanges. Once the plan is ready, the Copilot generates the full end-to-end integration, opens the visual diagram, and stays in the conversation to help with configuration, testing, and validation.

This isn't prompt-and-hope — it's a genuine back-and-forth where the developer stays in control and the AI handles the heavy lifting. The result: faster development cycles and integrations that more accurately reflect the original requirement.

### 2. Built-in governance for AI-driven integrations

As enterprises embed GenAI into mission-critical workflows, a new problem emerges: how do you know your AI is behaving correctly? Unlike traditional integrations, AI-driven flows are non-deterministic. They can drift. They can be subtly wrong in ways that are difficult to catch without the right tooling.

WSO2 Integrator 5.0.0 addresses this with a built-in **LLM evaluation framework**. Teams can collect execution traces, build reusable datasets from real-world runs, and write evaluation rules — from simple assertions to LLM-as-a-judge assessments — that validate AI behavior before it reaches production.

Alongside this, the new **Agent Execution Visualizer** gives developers real-time visibility into what an AI agent is actually doing: which tools it's calling, in what sequence, and how intermediate results shape the next decision. This makes debugging agents practical rather than guesswork.

You shouldn't deploy AI into production without the ability to evaluate and observe it. 5.0.0 makes that possible without leaving the platform.

### 3. Centralized control with the Integration Control Plane

Managing distributed integration deployments has historically meant stitching together multiple dashboards, log sources, and access controls. The **Integration Control Plane (ICP)** in 5.0.0 changes that.

ICP provides a unified runtime dashboard with real-time health, connectivity, and metadata visibility across all environments. Operators can:

- Start and stop integrations centrally.
- Access consolidated logs and metrics.
- Manage access through project- and environment-scoped RBAC with Admin and Developer roles.
- Authenticate through built-in login, OIDC-based SSO, or external user stores.

One place to govern everything. Whether you're running integrations across cloud, on-premises, or hybrid environments, ICP gives you the visibility and control to operate confidently at scale.

### 4. Reliable file processing at scale

File-based integration sounds simple until you try to run it reliably in a distributed environment. Race conditions, duplicate reads, and failed recoveries are common problems that teams work around rather than solve. 5.0.0 addresses these directly.

- A new **coordination model** ensures that only a single processing node handles any given file at a time, preventing duplicate reads and race conditions in clustered deployments.
- **Automatic failover** means that if a node goes down mid-processing, another node picks up seamlessly without compromising data integrity.
- CSV processing has been overhauled. Where the previous approach would reject an entire file on a single malformed row, the new **fail-safe model** continues processing valid records, isolates the problematic ones, and surfaces diagnostics to reduce manual investigation.
- **Streaming support** means large files are processed row by row without loading everything into memory.

These improvements make WSO2 Integrator a more dependable foundation for mission-critical batch processing and data pipelines.

### 5. Expanded connectivity: Solace, CDC, and beyond

Modern integration strategies depend on connecting the technologies enterprises already rely on, across APIs, events, and data systems.

- Native support for **Solace PubSub+**, enabling organizations to connect WSO2 Integrator directly into their event mesh environments. Guaranteed messaging, message persistence, and fine-grained access control let teams build and manage real-time event flows without custom workarounds.
- **Change Data Capture (CDC)** support extended to **Microsoft SQL Server** and **PostgreSQL**, broadening the range of enterprise systems that can participate in event-driven architectures.
- **Liveness and readiness checks** for CDC listeners, helping ensure stable deployments in Kubernetes and other orchestrated environments.

Together, these connectivity improvements reflect a consistent priority: meet teams where their systems are, not where we'd prefer them to be.

### Additional improvements

Beyond the five headline areas above, 5.0.0 includes a range of further enhancements across the platform.

- **JDK 25 compatibility**, enabling the platform to leverage the latest Java performance and security improvements.
- **Agent Framework upgrades** with MCP support, persistent memory, and summarization — enabling context-aware autonomous agents within integration flows.
- Built-in **Agent ID integration** for identity and access management of AI agents, with runtime security validation enforced automatically during tool execution.

### WSO2 Integrator: MI 4.6.0

WSO2 Integrator 5.0.0 also brings enhancements to the MI profile with the release of **WSO2 Integrator: MI 4.6.0**:

- **Enhanced RAG capabilities**, with support for vector databases (Weaviate, Milvus) and Azure OpenAI embedding models, plus a new WSO2 model provider available at no additional cost.
- **Full OpenTelemetry support** (metrics, traces, and logs), with Prometheus 3.5.0 compatibility and Moesif integration.
- **Remote debugging** via the VS Code extension, Synapse unit test coverage reporting, and workspace-level build and run with multi-module project support.
- With the new **Agent mode**, the platform can autonomously design integrations, deploy artifacts, test flows, and generate test cases — helping developers move faster with less manual effort. **Amazon Bedrock login** support also simplifies access to external foundation models and enterprise AI capabilities.
- **AMQP 1.0 protocol support**, a **gRPC connector** with import support, **nested and reusable queries** in Data Services, and optimized **Ballerina-to-MI connector conversion**.
- **Enterprise-grade security improvements** including FIPS-certified cryptography (Bouncy Castle FIPS provider), built-in OAuth 2.0 and JWT validation handlers, and post-quantum cryptography capabilities.

WSO2 Integrator 5.0.0 is available now. [Install WSO2 Integrator](../../get-started/setup/local-setup.md) or sign up for SaaS today.

## Previous releases

See the [WSO2 documentation archive](https://docs.wso2.com) for previous product releases.

## What's next

- [Install WSO2 Integrator](../../get-started/setup/local-setup.md) - Get started with the latest release
- [Build an Integration as API](../../get-started/build-integration-api.md) - Build your first integration
