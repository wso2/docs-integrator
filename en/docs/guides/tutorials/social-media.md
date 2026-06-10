---
title: Build a Self-Moderating Social Media Backend
sidebar_label: Self-Moderating Backend
sidebar_position: 1
description: "Build a Twitter-style social media backend end to end with WSO2 Integrator, touching every core capability of the platform: REST APIs, data persistence, connectors, data mapping, resiliency, validation, security, Kafka event-driven integration, testing, observability, and deployment."
---

# Build a Self-Moderating Social Media Backend

In this tutorial you build a complete, Twitter-style social media backend with [WSO2 Integrator](../../get-started/introduction.md), the low-code integration platform built on Ballerina. You design everything in the **Visual Designer**; WSO2 Integrator generates clean Ballerina underneath, which you can inspect and edit at any time by toggling to the code view.

By the end, a single `POST` will flow from the API through validation, sentiment screening, and storage, and out to a Slack channel. Every piece of it is designed on the canvas, none of it hand-written.

:::info What you will build
A backend for a small social network. People register an account, follow each other, and publish short posts: the familiar shape of a Twitter-style feed, exposed as a clean REST API.

The interesting part is what happens when someone publishes. You don't want abusive content landing in your database, so every new post is first screened by a sentiment-analysis service; anything negative is rejected before it is ever stored. An accepted post is saved to MySQL and, without making the author wait, announced to a team Slack channel through a **Kafka** event pipeline, so the community sees new activity the moment it appears. Every hop, from the API through screening and storage out to Slack, is traceable end to end.

You build this as three small, independently deployable integrations rather than one big service. By the end, every part of it is something you designed on the canvas.
:::

## Architecture

The application is composed of small, focused integrations rather than one monolith, the way you would build it in production.

| Integration | Type | Responsibility |
| --- | --- | --- |
| **Social Media API** | HTTP service | Users and posts REST API. Validates input, screens posts for sentiment, persists to MySQL, and publishes a `post-created` event to Kafka. |
| **Post Notifier** | Kafka event integration | Consumes `post-created` events and posts a message to Slack. |
| **Sentiment API** | HTTP service | A small secured service that scores post text as positive, negative, or neutral. |

```
                                  ┌───────────────────┐
   POST /users/{id}/posts ──────► │  Social Media API │
                                  └───────┬───────────┘
                          screen text     │      persist
                        ┌──────────────────┼──────────────────┐
                        ▼                  ▼                   │ publish
                 ┌────────────┐      ┌──────────┐              ▼
                 │ Sentiment  │      │  MySQL   │        ┌───────────┐
                 │    API     │      └──────────┘        │   Kafka   │
                 └────────────┘                          └─────┬─────┘
                                                               │ consume
                                                         ┌─────▼─────┐
                                                         │   Post    │──► Slack
                                                         │  Notifier │
                                                         └───────────┘
```

### How the pieces fit together

The three integrations never reach into each other's internals. Each owns one job, and they collaborate through a deliberate choice of contract: an **HTTP call** where one integration needs a synchronous answer from another, and a **Kafka event** where it doesn't. Follow a single `POST /users/{id}/posts` to see why that split matters:

1. The request lands on the **Social Media API**. It first checks the payload is well-formed: a missing name or a malformed phone number is turned away here, before any business logic runs.
2. The API calls the **Sentiment API** over a secured HTTP connection to score the post's text. This call is synchronous because the API needs the verdict to decide what to do next: if the text scores negative, the API stops and returns `400`, and the post never reaches the database.
3. A clean post is reshaped to match how it's stored, then written to **MySQL**.
4. The instant that write succeeds, the API publishes a `post-created` event to **Kafka** and returns to the caller. The author isn't held up waiting for anything that happens afterward.
5. The **Post Notifier** is listening on that topic. It picks up the event on its own schedule and posts to **Slack**, so a slow or failing notification can never slow down, or break, the original request.

That division is the whole point. Validation, screening, and storage run inline because the caller needs their results to get a meaningful response. The notification runs through a broker because the caller doesn't care about it. Decoupling it that way means you can add more consumers later (an email digest, analytics, a mobile push) by listening to the same event, without ever touching the API.

:::note Event-driven backbone
This design uses **Kafka** as a first-class [event integration trigger](../../develop/integration-artifacts/event/kafka.md): you build the consumer entirely in the Visual Designer. The event-driven pattern itself is broker-agnostic; the platform also ships triggers for [RabbitMQ](../../develop/integration-artifacts/event/rabbitmq.md), [MQTT](../../develop/integration-artifacts/event/mqtt.md), [Solace](../../develop/integration-artifacts/event/solace.md), and [Azure Service Bus](../../develop/integration-artifacts/event/azure-service-bus.md).
:::

## Prerequisites

- [Install WSO2 Integrator](../../get-started/setup/local-setup.md).
- A MySQL 8 instance (local or containerized).
- A Kafka broker (local or containerized).
- A Slack workspace where you can create an app and obtain a bot token.
- Docker, if you want to run the full stack locally in [Part 15](#part-15-deploy).

---

## Part 1: Set up the project

1. Launch **WSO2 Integrator** and [create a project](../../develop/create-integrations/create-a-project.md) named `social-media`.
2. [Create a new integration](../../develop/create-integrations/create-a-new-integration.md) inside the project to hold your first artifact.
3. When the project opens, you land in the [Visual Designer](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#anatomy-of-the-editor). The left panel lists your integration **artifacts**; the [canvas](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#canvas) shows the flow of whichever artifact you select.

Throughout this tutorial you design on the canvas, and WSO2 Integrator keeps the Ballerina source in sync. Use the **Show Source** toggle whenever you want to see, or hand-tune, the generated code.

:::tip
A single WSO2 Integrator project can hold many artifacts (services, automations, event integrations, types, connections). You will add all three integrations from the [architecture](#architecture) to this one project.
:::

---

## Part 2: Model the domain

Start with the data, not the endpoints. You will model three records using the visual [Type editor](../../develop/integration-artifacts/supporting/types.md), with no hand-written type definitions.

1. In the artifacts panel, add a new **Type**.
2. Create a `User` record with fields `id`, `name`, `mobileNumber`, and `birthDate`.
3. Create a `Post` record with fields `id`, `description`, `category`, `tags`, `createdDate`, and `userId`.
4. Create a `Follower` record with fields `id`, `leaderId`, `followerId`, and `createdDate`.

The [Type diagram](../../develop/integration-artifacts/supporting/types.md#type-diagram) now shows your domain and the relationships between records.

The generated types look like this:

```ballerina
type User record {|
    readonly int id;
    string name;
    string mobileNumber;
    string birthDate;
|};

type Post record {|
    readonly int id;
    string description;
    string category;
    string[] tags;
    string createdDate;
    int userId;
|};
```

:::tip Generate types from a sample
If you already have a JSON payload, use [Generate type from JSON or XML](../../develop/integration-artifacts/supporting/types.md#generate-type-from-json-or-xml) to create the record in one step.
:::

> **Capability: Visual type modeling.** You define your data contract once and reuse it across services, mappers, and connectors with full type safety.

---

## Part 3: Create the REST API

Now expose the API. You design resources visually with the [HTTP service](../../develop/integration-artifacts/service/http.md) artifact.

1. Add a new **Service** and choose **HTTP**.
2. Set the base path to `/social-media` and accept the default listener on port `9090`.
3. [Add resources](../../develop/integration-artifacts/service/http.md#resources) for each operation:

| Method | Path | Returns |
| --- | --- | --- |
| `GET` | `/users` | `User[]` |
| `GET` | `/users/{id}` | `User` |
| `POST` | `/users` | `http:Created` |
| `DELETE` | `/users/{id}` | `http:Ok` |
| `GET` | `/users/{id}/posts` | `Post[]` |
| `POST` | `/users/{id}/posts` | `http:Created` |

For each resource, use the designer to [define inputs](../../develop/integration-artifacts/service/http.md#defining-inputs) such as [path parameters](../../develop/integration-artifacts/service/http.md#path-parameters), bind the request [payload](../../develop/integration-artifacts/service/http.md#payload-data-binding) to your record types, define the [response schema](../../develop/integration-artifacts/service/http.md#defining-response-schemas), and choose the [response status codes](../../develop/integration-artifacts/service/http.md#status-codes-with-payload).

The generated service skeleton:

```ballerina
service /social-media on new http:Listener(9090) {

    resource function get users() returns User[]|error {
        // filled in next
    }

    resource function post users/[int id]/posts(NewPost post)
            returns http:Created|http:BadRequest|error {
        // filled in next
    }
    // ...
}
```

> **Capability: Low-code REST API design.** Resources, parameters, payload binding, and typed responses are all configured in the designer; the OpenAPI contract is derivable from the service.

---

## Part 4: Persist to MySQL

Replace the placeholders with real data access. You connect to MySQL through a [Connection](../../develop/integration-artifacts/supporting/connections.md), keeping all credentials in [configurables](../../develop/integration-artifacts/supporting/configurations.md) rather than hardcoded.

1. In the artifacts panel, [add a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection) and choose **MySQL**.
2. Provide the host, port, database, user, and password. WSO2 Integrator stores these as configurable variables so each environment supplies its own values.
3. Open the `get users` resource flow and add a query node against the connection to select all users. Repeat for the other resources (select by id, insert user, delete user, select posts, insert post).

The generated configurables and a query:

```ballerina
configurable string dbHost = ?;
configurable int dbPort = 3306;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = "social_media";

final mysql:Client dbClient = check new (dbHost, dbUser, dbPassword, dbName, dbPort);

resource function get users() returns User[]|error {
    stream<User, sql:Error?> userStream = dbClient->query(`SELECT * FROM users`);
    return from User user in userStream
        select user;
}
```

:::tip Prefer an ORM-style data layer?
For a fully model-driven approach, define your entities once and let the [persist tool](../../develop/tools/integration-tools/persist-tool.md) generate the data-access client and schema. See the [Data Persistence](../../develop/integration-artifacts/supporting/data-persistence.md) guide for a complete walkthrough.
:::

> **Capability: Connections, persistence, and configurables.** Database access is a reusable connection; secrets and environment-specific values stay in configuration.

---

## Part 5: Map data visually

Your database rows and your API responses rarely match field-for-field. Use the [Data Mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md) to transform between them without writing mapping code. See [when to use the data mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md#when-to-use-the-data-mapper) for guidance.

1. In the `post users/[id]/posts` flow, add a **Data Mapper** node.
2. Set the input to the incoming `NewPost` payload and the output to the `Post` record stored in the database.
3. Drag fields across for [one-to-one mapping](../../develop/integration-artifacts/supporting/data-mapper/mapping-capabilities.md#one-to-one-mapping), and use [transformation functions](../../develop/integration-artifacts/supporting/data-mapper/mapping-capabilities.md#map-using-transformation-function) to derive values such as `createdDate`.

> **Capability: The Data Mapper.** Drag-and-drop field mapping with transformations, array handling, and sub-mappings, generated as readable transformation functions.

---

## Part 6: Screen posts with sentiment analysis

Before a post is saved, screen its text. First build a small **Sentiment API**, then call it from the post flow with resiliency.

### Build the Sentiment API

Add a second **HTTP service** with a `POST /sentiment` resource that accepts text and returns a label (`pos`, `neg`, `neutral`) and a probability. For the tutorial, a simple rule-based implementation is enough; the point is the integration, not the model.

### Call it from the post flow

1. [Add an HTTP connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection) pointing at the Sentiment API.
2. In the `post users/[id]/posts` flow, add the [HTTP client call](../../connectors/catalog/built-in/http/action-reference.md#client) to `/sentiment`.
3. Configure **retry** and **timeout** on the client so a transient failure of the sentiment service does not fail the request outright.
4. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if): if the label is `neg`, return `http:BadRequest`; otherwise continue to persist and publish.

Behind the scenes, the Visual Designer generated this for you, included only so you can see there's nothing hidden:

```ballerina
SentimentResponse sentiment = check sentimentClient->/sentiment.post({text: post.description});
if sentiment.label == "neg" {
    return <http:BadRequest>{body: {message: "Post rejected: negative sentiment"}};
}
```

> **Capability: Outbound calls, resiliency, and control flow.** Typed HTTP clients with retry/timeout, combined with visual branching, let you compose decisions over remote results.

---

## Part 7: Validate input

Reject malformed payloads before any logic runs by attaching [constraints](../../develop/integration-artifacts/supporting/types.md) to your record fields.

1. Open the `User` type and add constraints, for example a non-empty `name` and a `mobileNumber` matching a phone pattern.
2. WSO2 Integrator validates the payload automatically and returns a `400` with the violated rule when binding fails.

Switch to the source view and you'll see what the designer wrote onto the type; there's nothing for you to type:

```ballerina
type User record {|
    readonly int id;
    @constraint:String {minLength: 1}
    string name;
    @constraint:String {pattern: re `^\+?[0-9]{10,15}$`}
    string mobileNumber;
    string birthDate;
|};
```

> **Capability: Declarative validation.** Validation lives on the type, so every endpoint that binds the type enforces it.

---

## Part 8: Secure service-to-service calls

The Sentiment API should not be open. Secure the call between the Social Media API and the Sentiment API with **OAuth2**.

1. Protect the Sentiment service by requiring a valid token (configure auth on its listener).
2. On the outbound HTTP connection from the Social Media API, configure the [OAuth2 client-credentials](../../connectors/catalog/built-in/http/action-reference.md#client) grant, pointing at your token endpoint. Store the client id and secret as configurables.

Here's what was generated for you:

```ballerina
final http:Client sentimentClient = check new (sentimentUrl, {
    auth: {
        tokenUrl: tokenUrl,
        clientId: clientId,
        clientSecret: clientSecret
    }
});
```

> **Capability: OAuth2 security.** Tokens are acquired and refreshed by the client automatically; credentials stay in configuration.

---

## Part 9: Publish events to Kafka

When a post is successfully saved, announce it, without making the caller wait for the notification. Publish a `post-created` event to **Kafka**.

1. [Add a Kafka connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection) and set the bootstrap servers via a configurable.
2. At the end of the successful path in `post users/[id]/posts`, add a node that publishes the new post to the `post-created` topic.
3. So the response is not delayed by the publish, run it concurrently using the [concurrency](../../develop/understand-ide/editors/flow-diagram-editor/concurrency.md#fork) constructs.

Behind the scenes, the Visual Designer produced:

```ballerina
configurable string kafkaBootstrap = "localhost:9092";
final kafka:Producer postProducer = check new (kafkaBootstrap);

check postProducer->send({topic: "post-created", value: savedPost});
```

> **Capability: Event-driven publishing and concurrency.** The API hands off to a broker and returns immediately; downstream processing is decoupled.

---

## Part 10: Consume events and notify Slack

Build the third integration: a **Post Notifier** that listens to Kafka and posts to Slack. This is where Kafka's first-class trigger support shines: you build the consumer entirely in the designer.

1. Add a new **Event Integration** and choose [Kafka](../../develop/integration-artifacts/event/kafka.md#creating-a-kafka-listener).
2. Configure the listener for the `post-created` topic and a consumer group.
3. In the listener's `onConsumerRecord` flow, [add the Slack connector](../../connectors/catalog/communication/slack/connector-overview.md). Follow the [Slack setup guide](../../connectors/catalog/communication/slack/setup-guide.md) to create a connection with your bot token.
4. Use a [Data Mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md) to turn the post event into a Slack message, then call the Slack [post-message operation](../../connectors/catalog/communication/slack/actions.md#operations).

You can toggle to the source to see what was generated, none of it hand-written:

```ballerina
service on new kafka:Listener(kafkaBootstrap, {topics: ["post-created"], groupId: "post-notifier"}) {
    remote function onConsumerRecord(Post[] posts) returns error? {
        foreach Post post in posts {
            _ = check slack->postMessage({channel: notifyChannel, text: string `New post: ${post.description}`});
        }
    }
}
```

> **Capability: Kafka trigger and connectors.** A broker event drives an integration that calls a SaaS connector, the core of event-driven, connector-rich integration.

---

## Part 11: Generate a client from OpenAPI

If the Sentiment API were owned by another team and published an OpenAPI contract, you would not hand-write a client. Use the OpenAPI tool to [generate a Ballerina client from OpenAPI](../../develop/tools/integration-tools/openapi-tool.md#generating-a-ballerina-client-from-openapi) and call it like any other connection. You can also [generate a service from an OpenAPI spec](../../develop/tools/integration-tools/openapi-tool.md#generating-a-ballerina-service-from-openapi) to start contract-first.

> **Capability: OpenAPI tooling.** Contracts in, type-safe clients out, keeping consumer and provider in sync.

---

## Part 12: Handle errors consistently

So every failure returns the same shape, add an error interceptor to the Social Media service.

1. Review the service's [default error handling](../../develop/integration-artifacts/service/http.md#default-error-handling) and [return typed error status codes](../../develop/integration-artifacts/service/http.md#return-typed-error-status-codes) where a resource should respond with a specific code.
2. In flows where you want to catch and transform failures, use the [ErrorHandler](../../develop/understand-ide/editors/flow-diagram-editor/error-handling.md#errorhandler) and [Fail](../../develop/understand-ide/editors/flow-diagram-editor/error-handling.md#fail) nodes.
3. Return a uniform error body with a timestamp, message, and detail.

> **Capability: Interceptors and error handling.** Cross-cutting concerns are handled in one place rather than repeated in every resource.

---

## Part 13: Test the integration

Validate behavior two ways.

- Use the built-in Try-it tool to exercise each resource interactively: [open the Try-It tool](../../develop/test/try-it-http.md#open-the-try-it-tool), [compose a request](../../develop/test/try-it-http.md#compose-a-request), and [read the response](../../develop/test/try-it-http.md#read-the-response). Create a user, then create a positive and a negative post and confirm the negative one is rejected.
- Write [unit tests](../../develop/test/unit-testing.md) for the post-creation logic, [mocking](../../develop/test/mocking.md) the sentiment client and the Kafka producer so tests run without external dependencies.

> **Capability: Testing.** Interactive Try-it for fast feedback; unit tests with mocking for repeatable verification.

---

## Part 14: Trace and observe

Follow a single request as it flows API → sentiment → MySQL → Kafka → Slack.

1. Enable distributed tracing: [start Jaeger](../../deploy-operate/observe/jaeger-distributed-tracing.md#step-1-start-jaeger), then [configure your integration for Jaeger](../../deploy-operate/observe/jaeger-distributed-tracing.md#step-2-configure-ballerina-for-jaeger).
2. Send a request and [view traces](../../deploy-operate/observe/jaeger-distributed-tracing.md#step-3-view-traces) to see the spans across all three integrations.

For the wider picture, with metrics and logs alongside tracing, see the [three pillars of observability](../../deploy-operate/observe/observability-overview.md#the-three-pillars-of-observability).

> **Capability: Distributed tracing.** End-to-end visibility across services and the broker, with no code changes to your flows.

---

## Part 15: Deploy

You can run the whole stack locally with Docker, or push to the cloud.

- **Local:** Containerize each integration and run them with MySQL, Kafka, and Jaeger using Docker Compose. See [self-hosted deployment](../../deploy/overview.md).
- **Cloud:** [Push from the IDE](../../deploy/cloud/push-from-ide.md) to deploy your integrations to WSO2's cloud. See the [cloud deployment overview](../../deploy/cloud/overview.md).

> **Capability: Deployment.** The same project deploys as containers or to the cloud without rework.

---

## What's next

You have built a complete, event-driven backend and used every core capability of WSO2 Integrator along the way. From here:

- Extend the **followers** feature into a fan-out notification flow.
- Add a [scheduled automation](../../develop/integration-artifacts/automation.md) that emails users a weekly digest of posts.
- Explore more [event triggers](../../develop/integration-artifacts/event/kafka.md) and [connectors](../../connectors/catalog/communication/slack/connector-overview.md) to grow the platform.
