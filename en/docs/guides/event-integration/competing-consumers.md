---
title: Competing Consumers with RabbitMQ
description: "Scale throughput by distributing work across multiple consumer instances using RabbitMQ in WSO2 Integrator."
---

# Competing Consumers with RabbitMQ

## Problem

A media platform needs to generate thumbnail images for uploaded videos. Thumbnail generation is CPU-intensive and takes several seconds per job. Processing jobs one at a time in a single service is too slow. Running more instances of the service on the same queue risks two instances picking up and processing the same job.

## Pattern

![Competing Consumers pattern diagram](/img/guides/event-integration/competing-consumers.png)

RabbitMQ distributes messages from a single queue to multiple competing consumers. Each message is delivered to exactly one consumer — whichever picks it up first. Running multiple instances of the same service gives linear throughput scaling: two instances process two jobs in parallel, ten instances process ten.

The producer never needs to know how many consumers exist. Adding capacity is just starting more instances. Reducing capacity is just stopping some; in-flight messages complete before the consumer exits.

## Implementation

The HTTP handler enqueues a resize job by publishing to the shared queue. A single RabbitMQ client is initialized once and declares the queue on startup to ensure it exists before any messages arrive.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/log;
import ballerinax/rabbitmq;

configurable string rabbitmqHost = "localhost";
configurable int rabbitmqPort = 5672;
configurable string rabbitmqUser = "guest";
configurable string rabbitmqPassword = ?;
configurable string queueName = "thumbnail-queue";
configurable int httpPort = 8090;

type ResizeJob record {
    string imageId;
    string sourceUrl;
};

final rabbitmq:Client thumbnailPublisher = check initPublisher();

function initPublisher() returns rabbitmq:Client|error {
    rabbitmq:Client cl = check new (
        host = rabbitmqHost, port = rabbitmqPort,
        username = rabbitmqUser, password = rabbitmqPassword
    );
    check cl->queueDeclare(queueName);
    return cl;
}
// docs-fold-end

service /jobs on new http:Listener(httpPort) {
    resource function post resize(ResizeJob job) returns error? {
        check thumbnailPublisher->publishMessage({
            content: job.toJsonString().toBytes(),
            routingKey: queueName
        });
        log:printInfo("Resize job queued", imageId = job.imageId);
    }
}
```

The consumer service attaches to the same queue. RabbitMQ round-robins new messages across all running instances. Each consumer processes one job at a time — the `runtime:sleep(2)` simulates the actual thumbnail generation work.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/lang.runtime;

listener rabbitmq:Listener rabbitmqListener = new (rabbitmqHost, rabbitmqPort,
    username = rabbitmqUser,
    password = rabbitmqPassword
);
// docs-fold-end

@rabbitmq:ServiceConfig {queueName: queueName}
service rabbitmq:Service on rabbitmqListener {
    remote function onMessage(ResizeJob job) returns error? {
        log:printInfo("Generating thumbnail (start)", imageId = job.imageId, sourceUrl = job.sourceUrl);
        runtime:sleep(2);
        log:printInfo("Thumbnail ready", imageId = job.imageId);
    }
}
```

To demonstrate competing consumers, start a second instance: `bal run -- --http.port=8091`. Both instances connect to the same queue. Jobs submitted to either HTTP port are visible in both instances' logs, but each job appears in only one instance.

## Try it yourself

Try this sample in WSO2 Integration Cloud.

[![Deploy to WSO2 Cloud](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/event-integration/competing_consumers_rabbitmq)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/event-integration/competing_consumers_rabbitmq)
