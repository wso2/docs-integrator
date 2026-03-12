---
title: Coming from WSO2 MI
description: Migration guide for developers moving from WSO2 MI to WSO2 Integrator.
---

# Coming from WSO2 MI

A guide for developers migrating integrations from WSO2 Micro Integrator to WSO2 Integrator.

## Concept Mapping

| In WSO2 MI | In WSO2 Integrator | Notes |
|---|---|---|
| Proxy Service | Service | HTTP/SOAP endpoints |
| Sequence | Integration logic | Inline in services |
| Mediator | Ballerina functions | Type-safe, compiled |
| Message Processor | Event Handler | Reactive processing |
| Scheduled Task | Automation | Cron-based triggers |
| Data Service | Service + DB Connector | Unified model |
| Registry | Config.toml | Simpler configuration |

## Key Differences

<!-- TODO: XML vs Ballerina, ESB model vs cloud-native -->

## Step-by-Step Migration

## Common Gotchas

## Before/After Examples
