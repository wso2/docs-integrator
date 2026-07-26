---
title: Pub/Sub with Kafka
description: "Decouple producers and consumers using Kafka topics in WSO2 Integrator."
---

# Pub/Sub with Kafka

## Problem

A storefront emits a `PageViewed` event on every page view. A growing list of teams wants those events: a live analytics dashboard, a recommendation updater, and an anomaly monitor that watches for scraping and abuse. Wiring the web app to call each of them directly couples it to every consumer, and a single slow consumer would drag down page rendering.

## Pattern

![Pub/Sub pattern diagram](/img/guides/event-integration/pub-sub.png)

The producer publishes events to a topic. Any number of consumers subscribe independently. The producer doesn't know who's listening. These are fire-and-forget reactions: the producer never waits for a response, the consumers run in no particular order, and a down consumer doesn't hold up the publish.

Each consumer joins with its own **consumer group**, so every group gets its own copy of the stream. Because the log is retained, a new consumer can replay history from the beginning instead of starting blind.

## Implementation

The web app produces each `PageViewed` event to the Kafka topic `page-views`.

```ballerina
// docs-fold-start: Supporting definitions
import ballerinax/kafka;

configurable string bootstrapServers = "localhost:9092";
configurable string topicName = "page-views";

type PageViewed record {|
    string userId;
    string url;
    string sessionId;
|};

final kafka:Producer pageViewProducer = check new (bootstrapServers);
// docs-fold-end

public function publishPageView(PageViewed event) returns error? {
    check pageViewProducer->send({
        topic: topicName,
        value: event
    });
}
```

Each consumer is a Kafka listener with its own `groupId` subscribed to the same topic. The recommendation updater is shown here; the analytics dashboard and the anomaly monitor are identical in shape, each with its own group ID, reacting in isolation.

```ballerina
// docs-fold-start: Supporting definitions
configurable string groupId = "recommendation-updater";
// docs-fold-end

service on new kafka:Listener(bootstrapServers, {
    groupId: groupId,
    topics: [topicName],
    offsetReset: kafka:OFFSET_RESET_EARLIEST
}) {
    remote function onConsumerRecord(PageViewed[] events) returns error? {
        foreach PageViewed event in events {
            check updateRecommendations(event);
        }
    }
}
```

Adding a fourth consumer — say a fraud-scoring service — is a new listener with a new group ID subscribed to the same topic. The web app never changes.

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/event-integration/pubsub_kafka)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/event-integration/pubsub_kafka)
