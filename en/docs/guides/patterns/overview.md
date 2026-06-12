---
title: Enterprise Integration Patterns Overview
sidebar_label: Overview
description: "Implement Enterprise Integration Patterns with WSO2 Integrator."
---

# Enterprise Integration Patterns Overview

Enterprise Integration Patterns (EIPs) are the accepted solutions to recurring problems in enterprise integration, catalogued by Gregor Hohpe and Bobby Woolf in [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/index.html). The patterns give integration architects a common language for describing how applications exchange messages, and a proven template for solving each class of problem.

This section demonstrates how to implement the most widely used patterns with WSO2 Integrator. Each pattern page describes the problem the pattern solves, walks through a real-world example, and provides the complete Ballerina source, which you can open and edit visually in the WSO2 Integrator design view. The complete projects are available in the [WSO2 integration samples repository](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern).

:::tip How to read these guides
Every pattern page shows the same integration two ways. The **Visual Designer** tab walks through building the pattern in WSO2 Integrator and includes a flow diagram that traces a message's path through the integration, node by node, so you can see the pattern's logic at a glance. The **Ballerina Code** tab shows the equivalent source. The two stay in sync: editing the visual flow updates the code, and editing the code updates the flow.
:::

## Messaging Systems

The basic building blocks of a messaging solution: how messages are structured, processed, routed, transformed, and consumed.

| Pattern | Description |
|---------|-------------|
| [Message](message.md) | Exchange a piece of information between two applications connected by a message channel. |
| [Pipes and Filters](pipes-and-filters.md) | Perform complex processing on a message as a series of independent processing steps. |
| [Message Router](message-router.md) | Pass messages to different processing steps depending on a set of conditions. |
| [Message Translator](message-translator.md) | Let systems that use different data formats communicate with each other using messaging. |
| [Message Endpoint](message-endpoint.md) | Connect an application to a messaging channel so it can send and receive messages. |

## Messaging Channels

How messages move from sender to receiver, and how applications that were not built for messaging are connected to a channel.

| Pattern | Description |
|---------|-------------|
| [Point-to-Point Channel](point-to-point-channel.md) | Ensure that exactly one receiver consumes a given message. |
| [Channel Adapter](channel-adapter.md) | Connect an application to the messaging system so it can send and receive messages. |
| [Messaging Bridge](messaging-bridge.md) | Connect two messaging systems so that messages available on one are also available on the other. |

## Message Construction

The intent, form, and content of the messages that travel through the system.

| Pattern | Description |
|---------|-------------|
| [Command Message](command-message.md) | Use messaging to invoke a procedure in another application. |
| [Document Message](document-message.md) | Use messaging to transfer data between applications. |
| [Event Message](event-message.md) | Use messaging to transmit events from one application to another. |
| [Message Sequence](message-sequence.md) | Transmit an arbitrarily large amount of data as a sequence of smaller messages. |
| [Format Indicator](format-indicator.md) | Design a message's data format to allow for future changes. |

## Message Routing

How a message finds its way from the sender to the correct receiver or receivers, possibly through multiple processing steps.

| Pattern | Description |
|---------|-------------|
| [Content-Based Router](content-based-router.md) | Route each message to the correct recipient based on the message content. |
| [Message Filter](message-filter.md) | Avoid receiving uninteresting messages by discarding the ones that do not match a condition. |
| [Splitter](splitter.md) | Break a message containing multiple elements into a series of individual messages. |
| [Aggregator](aggregator.md) | Combine the results of individual but related messages so they can be processed as a whole. |
| [Routing Slip](routing-slip.md) | Route a message through a series of steps when the sequence is not known at design time and varies per message. |
| [Process Manager](process-manager.md) | Route a message through multiple processing steps that may not be sequential or known at design time. |

## Message Transformation

How the content of a message is changed so the receiver gets the data it needs in the shape it expects. These transformations can be built without writing conversion code using WSO2 Integrator's visual [Data Mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md).

| Pattern | Description |
|---------|-------------|
| [Content Enricher](content-enricher.md) | Communicate with another system when the message originator does not have all the required data items. |
| [Content Filter](content-filter.md) | Simplify dealing with a large message when you are interested in only a few data items. |
| [Normalizer](normalizer.md) | Process messages that are semantically equivalent but arrive in different formats. |

## Messaging Endpoints

How an application produces and consumes messages correctly.

| Pattern | Description |
|---------|-------------|
| [Idempotent Receiver](idempotent-receiver.md) | Deal with duplicate messages safely at the receiver. |

## System Management

How a messaging system is monitored and managed in production.

| Pattern | Description |
|---------|-------------|
| [Message Store](message-store.md) | Report against message information without disturbing the loosely coupled nature of the system. |
