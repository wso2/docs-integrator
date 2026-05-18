---
title: Channel Adapter
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Channel Adapter

Use a Channel Adapter to define the boundary between an integration flow and the transport, application, or broker channel that supplies or receives messages. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/ChannelAdapter.html" label="Enterprise Integration Patterns Channel Adapter reference" />

The adapter is usually implemented at the edge of the flow. Use connector clients for application APIs, services and listeners for inbound endpoints, and broker connectors only when the channel itself is Kafka, RabbitMQ, or JMS. Keep payloads typed, and keep endpoints and credentials in configurables.

## API/SaaS channel adapter with connector client

A connector client adapts an external application API into the integration flow. Create the connection with managed connection settings, call the required connector operation, and pass the typed result into the next step.

1. Add the connector client connection for the application channel. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection); for this example, select the Jira connector as shown in [adding the Jira connector](../../connectors/catalog/productivity-collaboration/jira/example.md#adding-the-jira-connector).
2. Configure the endpoint, authentication values, and other connection properties with project configurables. Use the connector-specific [Jira setup guide](../../connectors/catalog/productivity-collaboration/jira/setup-guide.md) and [Jira connection configuration steps](../../connectors/catalog/productivity-collaboration/jira/example.md#configuring-the-jira-connection).
3. Add the connector operation that reads from or writes to the application channel. Use the [Jira action reference](../../connectors/catalog/productivity-collaboration/jira/actions.md#projects) to select the project operation for this example.
4. Map the connector response to the message shape used by the rest of the flow.

```ballerina
// docs-fold-start: Supporting definitions
import ballerinax/jira;

configurable string username = ?;
configurable string password = ?;
configurable string serviceUrl = ?;

jira:ConnectionConfig jiraConfig = {
    auth: {
        username,
        password
    }
};

jira:Client jiraAdapter = check new (
    jiraConfig,
    serviceUrl = serviceUrl
);
// docs-fold-end

public function readProject(string projectKey) returns jira:Project|error {
    return jiraAdapter->/api/'3/project/[projectKey];
}
```

## HTTP service as inbound channel adapter

An HTTP service adapts an inbound HTTP channel into an integration flow. Define the service resource as the adapter entry point, receive a typed request payload, and return the typed response expected by the caller. See [creating an HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) for the service setup flow.

1. Create an HTTP service for the inbound channel. See [creating an HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service).
2. Add the resource that represents the inbound adapter operation. Use [resource inputs](../../develop/integration-artifacts/service/http.md#defining-inputs) to define the request payload or parameters.
3. Define the response payload type for the resource with [response schemas](../../develop/integration-artifacts/service/http.md#defining-response-schemas).
4. Add the flow logic that transforms or forwards the received message.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerinax/jira;

listener http:Listener projectListener = new (8080);

type ProjectRequest record {|
    string projectKey;
|};

type ProjectResponse record {|
    string key;
    string name;
|};
// docs-fold-end

service /projects on projectListener {
    resource function post lookup(ProjectRequest request) returns ProjectResponse|error {
        jira:Project project = check readProject(request.projectKey);
        return mapProject(project);
    }
}
```

## Broker-backed channel adapter

Use a broker listener when the channel is a messaging broker rather than an application API or HTTP endpoint. The service receives records from the broker, converts each record into the flow payload, and acknowledges or publishes through the connector according to the channel contract. Use the relevant broker guide, such as [Kafka consumers](../../develop/integration-artifacts/event/kafka.md#creating-a-kafka-listener), [RabbitMQ services](../../develop/integration-artifacts/event/rabbitmq.md#creating-a-rabbitmq-service), or the [JMS listener](../../connectors/catalog/messaging/java.jms/triggers.md#listener).

1. Create the broker listener for the channel. For Kafka, see [creating a Kafka consumer](../../develop/integration-artifacts/event/kafka.md#creating-a-kafka-listener); for RabbitMQ, see [creating a RabbitMQ service](../../develop/integration-artifacts/event/rabbitmq.md#creating-a-rabbitmq-service); for JMS, see the [JMS listener](../../connectors/catalog/messaging/java.jms/triggers.md#listener).
2. Configure the broker endpoint, topic or queue, and credentials with configurables. For Kafka, use [service configuration](../../develop/integration-artifacts/event/kafka.md#service-configuration); for RabbitMQ, use [listener configuration](../../develop/integration-artifacts/event/rabbitmq.md#listener-configuration).
3. Add the message-handling function for the broker event. For Kafka, use [service configuration](../../develop/integration-artifacts/event/kafka.md#service-configuration); for RabbitMQ, use [event handlers](../../develop/integration-artifacts/event/rabbitmq.md#event-handlers).
4. Convert the broker record to the typed payload used inside the flow.

```ballerina
// docs-fold-start: Supporting definitions
import ballerinax/kafka;

configurable string brokerUrl = ?;

type ProjectEvent record {|
    string projectKey;
    string source;
|};

listener kafka:Listener projectEventListener = new ({
    bootstrapServers: brokerUrl,
    groupId: "project-adapter"
});

function handleProjectEvent(ProjectEvent event) returns error? {
}
// docs-fold-end

service on projectEventListener {
    remote function onConsumerRecord(ProjectEvent[] events) returns error? {
        foreach ProjectEvent event in events {
            check handleProjectEvent(event);
        }
    }
}
```
