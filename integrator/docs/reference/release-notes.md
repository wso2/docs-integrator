---
title: Release Notes
---

# Release Notes

## WSO2 Integration Platform (H2 2026\)

WSO2 Integration Platform H2 release includes WSO2 Integrator 5.1, which builds on the AI-native foundation introduced in the previous release by expanding support for building enterprise-grade AI agents, and making AI the primary integration development experience while expanding platform capabilities across workflow integration, observability, cloud operations, event-driven integration, file processing, and enterprise connectivity.

### AI Agents

Enterprise AI agent capabilities have been expanded with support for persistent memory providers, voice-enabled agents, reusable agent composition, parallel tool execution, human-in-the-loop interactions, evaluation templates, and event-driven triggers. Together, these improvements make it easier to build enterprise-grade AI agents that are reliable, reusable, and capable of participating in long-running business processes. The release also enhances retrieval-augmented generation (RAG) by adding additional enterprise data loaders and retrieval capabilities within ingestion pipelines to simplify validation and troubleshooting.

### AI-Native Integration Development

AI continues to be at the center of the WSO2 Integrator experience. In this release, Copilot evolves into the primary way developers build integrations, enabling users to describe integration requirements using natural language and automatically generate complete integration flows that can be validated visually and refined through AI assistance. While the generated code remains fully accessible, the primary development experience is now centered around intent rather than manual implementation.

The platform also expands its AI ecosystem by introducing support for GPT-5, AWS Bedrock, and Google Gemini models and embedding providers, giving organizations greater flexibility in selecting the AI services that best meet their requirements.

Copilot itself becomes significantly more extensible with support for Skills and Model Context Protocol (MCP). Users can configure MCP servers at both user and project scope, manage reusable Skills, and customize AI behavior through a unified configuration experience that brings together MCP servers, Skills, and agent instructions.

### Workflow Integration

WSO2 Integrator 5.1 introduces first-class workflow integration capabilities for orchestrating long-running business processes. Unlike traditional request-response integrations, workflows can pause, wait for external events or human interaction, and resume execution while maintaining a durable state. The workflow engine includes built-in support for human tasks, timers, wait-for-data patterns, retry handling, and activities for integrating with external systems. Integration Cloud also introduces Bring Your Own (BYO) Temporal support together with workflow management and monitoring capabilities, enabling organizations to build reliable workflow-driven integration solutions.

The release also introduces durable agentic workflows, which are AI agents embedded into a long-running business process. Unlike a traditional workflow that follows a deterministic path, a durable agentic workflow is one where the goal of the workflow is described in natural language at development time, and the AI agent decides the best path at runtime. Similar to durable workflows, the AI agent is also able to save progress, maintain a durable state as it waits for external events, and resume execution.

### Enhanced Observability

This release establishes a unified observability experience across cloud and self-managed deployments. Moesif is introduced as the default observability platform for metrics, logs, and traces, providing consistent visibility across Integration Cloud and Integration Control Plane. Organizations can continue using their preferred observability platforms through expanded OpenTelemetry support, including generic OTLP exporters for traces, metrics, and logs. These improvements simplify operational monitoring while providing greater flexibility for enterprise deployments.

### Integration Cloud

Integration Cloud continues to evolve beyond a developer-focused environment by introducing capabilities designed for both developers and business users. A new User Portal allows integration consumers to trigger automations, complete approval tasks, monitor execution, and review automation history. AI assistance is now integrated throughout the cloud experience, helping users discover integrations, generate solutions, troubleshoot failures, and understand platform capabilities using natural language. The cloud experience is further enhanced with new MCP tooling, including an integrated MCP Inspector, REST-to-MCP conversion, and MCP component generation for exposing existing enterprise services to AI agents.

### Integration Control Plane

Integration Control Plane continues to align its capabilities with Integration Cloud, providing a more consistent operational experience across deployment models. This release introduces enhanced automation visibility, service monitoring, AI-assisted operations, and observability experiences while adding federated authorization support for enterprise identity providers, single sign-on, and role-based access control. A dedicated User Portal is also introduced to provide business users with a unified operational experience across cloud and self-managed deployments.

### Event and File Integration

Event-driven integration capabilities continue to expand with support for Solace SMF events, Oracle Change Data Capture (CDC), SAP JCo listeners, and improved OpenTelemetry tracing for event-driven applications. These additions strengthen the platform's ability to build real-time enterprise integrations.

File integration has also been significantly enhanced. WSO2 Integrator now supports FreeMarker template processing for generating HTML, email content, configuration files, and other text-based artifacts. The EDI library introduces improved parsing capabilities for large and complex EDI documents, while connector enhancements add support for SMB, SharePoint, Azure Storage, AWS S3, and streaming XLSX processing.

### Connectivity and Ecosystem

The connector ecosystem continues to expand with support for Microsoft Dynamics 365 Finance & Operations, additional SAP connectors, Redis enhancements, and a shared AWS authentication library that simplifies the development of AWS-based connectors. These additions broaden the range of enterprise systems that can be integrated using WSO2 Integrator.

### WSO2 Integrator: MI 4.7

WSO2 Integrator: MI continues to evolve, and this release introduces runtime improvements such as Brotli compression support, improved cluster visibility, cloud-native configuration management, AWS Secrets Manager integration, and priority-based Composite Application deployment.

Developer productivity has also been significantly improved through new editor capabilities, including Data Services Try-It support, an enhanced Data Service Call Mediator, Workspace Overview, and simplified dependency management. AI-assisted development is further strengthened with enterprise-aware Copilot capabilities, allowing organizations to define custom AI instructions, and reusable skills, that align AI-generated recommendations with enterprise standards and best practices. New connectors for Solace, Azure Service Bus, and PGP expand enterprise connectivity, while enhanced Amazon S3 streaming support enables more efficient processing of large files.
