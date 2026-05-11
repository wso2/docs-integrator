---
title: Tutorials
---

# Tutorials

Complete, end-to-end examples you can follow from start to finish. Each tutorial takes 30-45 minutes and results in a working integration you can deploy.

:::info Tutorials vs. Develop
**Develop** pages are handbook lookups (3 min, specific answer). **Tutorials** are narrative walkthroughs (30-45 min, follow along). Different modes, different content.

## Walkthroughs

Step-by-step guides that build a real integration from scratch:

| Tutorial | What you'll build |
|---|---|
| **[Salesforce-Database Sync](salesforce-database-sync.md)** | Bi-directional sync between Salesforce and a database |
| **[Kafka Event Pipeline](kafka-event-processing-pipeline.md)** | Event processing pipeline with Kafka |
| **[REST API Aggregation](rest-api-aggregation-service.md)** | Service orchestration across multiple REST APIs |
| **[Content-Based Routing](walkthroughs/route-messages-based-content.md)** | Route messages based on content |
| **[Data Transformation](walkthroughs/build-a-data-transformation-pipeline.md)** | Transform data between formats |
| **[File Batch ETL](file-batch-etl-pipeline.md)** | Batch extract-transform-load from files |
| **[Healthcare HL7/FHIR](healthcare-hl7fhir-integration.md)** | Healthcare data integration with HL7 and FHIR |

## Enterprise integration patterns

Battle-tested patterns for distributed systems:

| Pattern | Use case |
|---|---|
| **[Content-Based Router](patterns/content-based-router.md)** | Route to different endpoints based on message content |
| **[Scatter-Gather](patterns/scatter-gather.md)** | Fan-out requests and aggregate responses |
| **[Circuit Breaker & Retry](patterns/circuit-breaker-retry.md)** | Resilient calls to unreliable services |
| **[Saga / Compensation](patterns/saga-compensation.md)** | Distributed transactions with rollback |
| **[Publish-Subscribe](patterns/publish-subscribe.md)** | Decouple producers and consumers |
| **[Guaranteed Delivery](patterns/guaranteed-delivery.md)** | Ensure messages are never lost |

[View all patterns &rarr;](patterns/content-based-router.md)

## Pre-Built samples

Ready-to-run integration samples you can clone and customize:

| Sample | Integration |
|---|---|
| **[Google Sheets &rarr; Salesforce](pre-built/google-sheets-salesforce-contacts.md)** | Sync contacts from spreadsheets |
| **[GitHub &rarr; Email Summary](pre-built/github-email-summary.md)** | Daily digest of repository activity |
| **[Gmail &rarr; Salesforce Leads](pre-built/gmail-salesforce-leads-openai.md)** | Auto-create leads from emails (with OpenAI) |
| **[Kafka &rarr; Salesforce Price Book](pre-built/kafka-salesforce-price-book.md)** | Real-time price updates |

[View all pre-built samples &rarr;](pre-built/integration-samples.md)

## Sample projects

Full GitHub projects you can clone and run:

- **[Hospital Service](samples/hospital-service.md)** — Healthcare appointment management
- **[E-Commerce Order Service](samples/e-commerce-order-service.md)** — Order processing pipeline
- **[Event-Driven Microservices](samples/event-driven-microservices-kafka.md)** — Kafka-based architecture
- **[Data Service with bal persist](samples/data-service-bal-persist.md)** — Type-safe database CRUD
- **[RESTful API with Data Mapper](samples/restful-api-visual-data-mapper.md)** — Visual data transformations

## Migration guides

Coming from another platform? Start here:

- **[From WSO2 MI](migration/coming-from-mi.md)** — Migrate from WSO2 Micro Integrator
- **[From MuleSoft](migration/coming-from-mulesoft.md)** — Migrate from MuleSoft Anypoint
- **[From TIBCO BusinessWorks](migration/coming-from-tibco.md)** — Migrate from TIBCO BusinessWorks
