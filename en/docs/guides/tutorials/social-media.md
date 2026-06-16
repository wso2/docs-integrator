---
title: Build an Event-Driven Social Media Backend with RabbitMQ
sidebar_label: Build an Event-Driven Social Media Backend with RabbitMQ
sidebar_position: 1
description: "Build a Twitter-style social media backend with WSO2 Integrator: a REST API that screens every post for sentiment, stores it in MySQL, and announces it to Slack through a RabbitMQ event pipeline. Designed end to end in the Visual Designer, split across three integrations."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build an Event-Driven Social Media Backend with RabbitMQ

In this tutorial you build a complete, Twitter-style social media backend with [WSO2 Integrator](../../get-started/introduction.md), the low-code integration platform built on Ballerina. You design everything in the **Visual Designer**, and WSO2 Integrator generates clean Ballerina underneath. Every part below shows both: the visual steps on one tab, and the exact code the platform produced on the other. You never have to type the code.

By the end, a single `POST` will flow from the API through validation, sentiment screening, and storage, and out to a Slack channel.

:::info What you will build
A backend for a small social network where people register, publish short posts, and follow each other. Every new post is first screened by a sentiment-analysis service; anything negative is rejected before it is stored. An accepted post is saved to MySQL and, without making the author wait, announced to a team Slack channel through a **RabbitMQ** event pipeline. You build it as three small integrations, and every part is something you design on the canvas.
:::

## Architecture

You build three focused integrations inside one project rather than a single monolith, the way you would in production.

| Integration | Type | Responsibility |
| --- | --- | --- |
| **Social Media API** | HTTP service | Users and posts REST API. Validates input, screens posts for sentiment, persists to MySQL, and publishes a new-post event to RabbitMQ. |
| **Sentiment API** | HTTP service | A small service that scores post text as positive, negative, or neutral. |
| **Post Notifier** | RabbitMQ event integration | Consumes new-post messages and posts to Slack. |

```
                                  ┌───────────────────┐
   POST /users/{id}/posts ──────► │  Social Media API │
                                  └───────┬───────────┘
                          screen text     │      persist
                        ┌──────────────────┼──────────────────┐
                        ▼                  ▼                   │ publish
                 ┌────────────┐      ┌──────────┐              ▼
                 │ Sentiment  │      │  MySQL   │        ┌───────────┐
                 │    API     │      └──────────┘        │ RabbitMQ  │
                 └────────────┘                          └─────┬─────┘
                                                               │ consume
                                                         ┌─────▼─────┐
                                                         │   Post    │──► Slack
                                                         │  Notifier │
                                                         └───────────┘
```

The integrations collaborate through a deliberate choice of contract. The Social Media API calls the Sentiment API over **HTTP** because it needs the verdict synchronously to decide whether to store the post. It hands the notification off to **RabbitMQ** because the author should not wait on Slack, and because you can add more consumers later (email, analytics) without touching the API.

The **Social Media API is the orchestrator**: it depends on the sentiment service, a database, and the message pipeline. So you build the two standalone integrations it leans on first (Parts 2 and 3), then assemble the API itself (Parts 4 onward).

:::note Event-driven backbone
RabbitMQ is a first-class [event integration trigger](../../develop/integration-artifacts/event/rabbitmq.md): you build the consumer entirely in the Visual Designer. The pattern is broker-agnostic; the platform also ships triggers for [Kafka](../../develop/integration-artifacts/event/kafka.md), [MQTT](../../develop/integration-artifacts/event/mqtt.md), [Solace](../../develop/integration-artifacts/event/solace.md), and [Azure Service Bus](../../develop/integration-artifacts/event/azure-service-bus.md).
:::

## Prerequisites

- [Install WSO2 Integrator](../../get-started/setup/local-setup.md).
- A MySQL 8 instance (local or containerized).
- A RabbitMQ broker (local or containerized).
- A Slack workspace where you can create an app and obtain a bot token.
- Docker, if you want to run the full stack locally in [Part 12](#part-12-deploy).

---

## Part 1: Set up the project

Everything you build sits inside one project, so you set that up first. WSO2 Integrator creates the project and your first integration together, in a single form.

1. Launch **WSO2 Integrator** and [create a new integration](../../develop/create-integrations/create-a-new-integration.md#configure-the-integration). Name it `social-media`.
2. Enable **Create within a project**, name the [project](../../develop/create-integrations/create-a-project.md) `social-media`, and choose where it lives on disk. This is the one project that will hold all three integrations from the [architecture](#architecture).
3. Click **Create Integration**.

![The Create Integration form, with the integration and project both named social-media and Create within a project enabled](/img/guides/tutorials/social-media/create-integration.png)

The project opens to its landing view. The artifacts panel on the left is where your integration takes shape: **Entry Points**, **Connections**, **Types**, **Functions**, **Data Mappers**, and **Configurations** are all empty for now, and you fill them in as the tutorial goes. The center pane lists the `social-media` integration you just created.

![The social-media project landing view, showing the artifacts panel on the left and the Integrations and Libraries pane in the center](/img/guides/tutorials/social-media/project-landing-view.png)

Open the integration and you land in the [Visual Designer](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#anatomy-of-the-editor), where the [canvas](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#canvas) shows the flow of whichever **artifact** you select. The integration is empty, so the Design view invites you to add your first artifact. Every part that follows starts here, with **+ Add Artifact**. Use the **Show Source** toggle whenever you want to see the generated code; you never have to edit it.

![The empty social-media integration in the Design view, showing the "Your integration is empty" message and the Add Artifact button](/img/guides/tutorials/social-media/empty-integration-design.png)

---

The Social Media API ties three pieces together: a service to screen posts, a pipeline to announce them, and a store to keep them. Build the two standalone integrations first, the Sentiment API and the Post Notifier.

## Part 2: Build the Sentiment API

The first standalone integration is the screening service. Build a small **Sentiment API** that takes post text and returns a sentiment label with probabilities. For the tutorial it returns **hardcoded values**, so you can focus on the integration rather than a real model.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. From the project view, click **+ Add** to add another integration to the same `social-media` project.

   ![The social-media project view with the Add button highlighted](/img/guides/tutorials/social-media/sentiment-add-integration.png)

   Name the new [integration](../../develop/create-integrations/create-a-new-integration.md#configure-the-integration) `sentiment-api`; the package name and organization default from the name. Click **Add Integration**.

   ![The Add New Integration form with the integration named sentiment-api](/img/guides/tutorials/social-media/sentiment-create-integration.png)

2. In the new integration, click **+ Add Artifact**, then **HTTP Service**. Set the **Service Base Path** to `/text-processing`, choose a **Custom Listener** on **Port** `9000` named `httpListener`, and click **Create**.

   ![Creating the HTTP service with base path /text-processing on a custom listener at port 9000](/img/guides/tutorials/social-media/sentiment-http-service.png)

3. Add three [types](../../develop/integration-artifacts/supporting/types.md): a `Post` with a `text` field, a `Probability` with `neg`, `neutral`, and `pos` decimals, and a `Sentiment` holding a `Probability` and a `label`.

   ![The Type Diagram showing the Post, Probability, and Sentiment records](/img/guides/tutorials/social-media/sentiment-types.png)

4. Click **+ Add Resource**. Set the method to **POST** and the path to `api/sentiment`, bind the **Payload** to `Post`, and define responses `201` returning `Sentiment` and `500` returning `error`. Click **Save**.

   ![Adding the POST api/sentiment resource with a Post payload and Sentiment response](/img/guides/tutorials/social-media/sentiment-add-resource.png)

5. Open the resource flow and build the response with **Declare Variable** nodes: one for the `probability`, one for the `sentiment`, then a **Return**. The values are hardcoded for the tutorial.

   ![Building the Sentiment record in the Record Configuration panel](/img/guides/tutorials/social-media/sentiment-return.png)

   ![The completed POST api/sentiment flow: Start, two Declare Variable nodes, Return, and an Error Handler](/img/guides/tutorials/social-media/sentiment-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

The Visual Designer wrote this to `sentiment_api/main.bal`. The probability and label are hardcoded for the tutorial; in production you would score `post.text` with a real model.

```ballerina
import ballerina/http;

listener http:Listener httpListener = new (9000);

service /text\-processing on httpListener {
    resource function post api/sentiment(@http:Payload Post post) returns Sentiment|error {
        do {
            Probability probability = {
                "neg": 0.30135019761690551,
                "neutral": 0.27119050546800266,
                "pos": 0.69864980238309449
            };
            Sentiment sentiment = {
                probability: probability,
                label: "pos"
            };
            return sentiment;
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }
}
```

The records live alongside it in `types.bal`:

```ballerina
type Post record {|
    string text;
|};

type Probability record {|
    decimal neg;
    decimal neutral;
    decimal pos;
|};

type Sentiment record {|
    Probability probability;
    string label;
|};
```

</TabItem>
</Tabs>

> **Capability: Low-code HTTP service design.** You define the types, the resource, and its response flow visually, and the platform writes the service for you.

---

## Part 3: Build the Post Notifier: RabbitMQ to Slack

The other standalone integration is the announcement pipeline. Build the **Post Notifier**, a RabbitMQ-triggered event integration that consumes new-post messages and posts to Slack. Declare the configurations it needs first, the broker details and the Slack token, then build the connector and the event integration on top of them. This is where RabbitMQ's first-class trigger support shines: you build the consumer entirely in the designer.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. From the project view, click **+ Add** to add a third integration to the same project. Name it `post-notifier` and click **Add Integration**.

   ![The Add New Integration form with the integration named post-notifier](/img/guides/tutorials/social-media/notifier-create-integration.png)

2. [Add the configurations](../../develop/integration-artifacts/supporting/configurations.md#adding-a-configuration) the integration needs: `rabbitmqHost` (`string`) and `rabbitmqPort` (`int`) for the broker, and `slackAuthToken` (`string`) for the Slack app.

   ![The three configurables: rabbitmqHost, rabbitmqPort, and slackAuthToken](/img/guides/tutorials/social-media/notifier-configs.png)

3. Add the [Slack connector](../../connectors/catalog/communication/slack/connector-overview.md). Set its **Config** to bind the token to `slackAuthToken`, and name the connection `slackClient`. Follow the [Slack setup guide](../../connectors/catalog/communication/slack/setup-guide.md#step-1-sign-in-to-slack) to create an app and copy a bot token, then [add scopes](../../connectors/catalog/communication/slack/setup-guide.md#step-3-add-scopes-to-the-token).

   ![Configuring the Slack connection with auth token bound to slackAuthToken and named slackClient](/img/guides/tutorials/social-media/notifier-slack-connection.png)

4. Click **+ Add Artifact**, choose **Event Integration**, then [RabbitMQ](../../develop/integration-artifacts/event/rabbitmq.md#creating-a-rabbitmq-service).

   ![The artifact palette with RabbitMQ selected under Event Integration](/img/guides/tutorials/social-media/notifier-rabbitmq-artifact.png)

   Name the listener `rabbitmqListener`, point its **Host** and **Port** at `rabbitmqHost` and `rabbitmqPort`, and set the **Queue Name** to `ballerina.social.media`. Click **Create**.

   ![Configuring the RabbitMQ listener host, port, and the ballerina.social.media queue](/img/guides/tutorials/social-media/notifier-rabbitmq-config.png)

5. [Add an event handler](../../develop/integration-artifacts/event/rabbitmq.md#adding-an-event-handler) and choose **onMessage**. Define the message content as a `NotificationEvent` type with a `leaderId` field.

   ![Defining the NotificationEvent content type with a leaderId field](/img/guides/tutorials/social-media/notifier-define-content.png)

6. In the `onMessage` flow, add the `slackClient` connection's **Send a message to a channel** operation. Set the **channel** and a **text** built from the event's `leaderId`.

   ![Configuring the Slack message with a channel and a text built from the leaderId](/img/guides/tutorials/social-media/notifier-slack-message.png)

   The completed handler posts to Slack whenever a message lands on the queue.

   ![The onMessage flow: Start, the slack post node, and an Error Handler](/img/guides/tutorials/social-media/notifier-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

Behind the scenes, the Visual Designer generated this. The configurations are declared first, then the connection and the event integration use them:

```ballerina
import ballerinax/rabbitmq;
import ballerinax/slack;

configurable string rabbitmqHost = ?;
configurable int rabbitmqPort = ?;
configurable string slackAuthToken = ?;

final slack:Client slackClient = check new ({
    auth: {token: slackAuthToken}
});

type NotificationEvent record {|
    string leaderId;
|};

type NotificationEventMessage record {|
    *rabbitmq:AnydataMessage;
    NotificationEvent content;
|};

listener rabbitmq:Listener rabbitmqListener = new (rabbitmqHost, rabbitmqPort);

service "ballerina.social.media" on rabbitmqListener {
    remote function onMessage(NotificationEventMessage message) returns error? {
        _ = check slackClient->/chat\.postMessage.post({
            channel: "social-media-updates",
            text: string `User ${message.content.leaderId} has a new post.`
        });
    }
}
```

You provide the values in `Config.toml`:

```toml
rabbitmqHost = "localhost"
rabbitmqPort = 5672
slackAuthToken = "xoxb-your-bot-token"
```

</TabItem>
</Tabs>

> **Capability: RabbitMQ trigger and connectors.** A broker message drives an integration that calls a SaaS connector, the core of event-driven, connector-rich integration.

---

With the Sentiment API and the Post Notifier built, assemble the **Social Media API** that uses them.

## Part 4: Create the Social Media REST API

This is the heart of the backend. The **Social Media API** is the orchestrator: it exposes the users-and-posts REST API, stores everything in MySQL, screens each post with the Sentiment API, and publishes a new-post event. You assemble it across the next several parts. Here you lay the foundation: create the database, connect to it with the **persist feature** so the platform generates a type-safe client and the entity types, then stand up the REST resources.

### Create the database

The API persists users, posts, and followers in MySQL, so create the schema first. Run this script against your MySQL instance. It creates the database, an application user, the three tables, and a couple of seed users:

```sql
CREATE DATABASE IF NOT EXISTS social_media;

-- Application user the integration connects as
CREATE USER IF NOT EXISTS 'social_media_user'@'localhost' IDENTIFIED BY 'social_media_pass';
GRANT ALL PRIVILEGES ON social_media.* TO 'social_media_user'@'localhost';
FLUSH PRIVILEGES;

USE social_media;

CREATE TABLE users (
    id            INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(15)  NOT NULL,
    birth_date    DATE
);

CREATE TABLE posts (
    id           INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description  VARCHAR(255) NOT NULL,
    category     VARCHAR(255),
    tags         VARCHAR(255),
    created_date DATE,
    user_id      INT          NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE followers (
    id           INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    leader_id    INT  NOT NULL,
    follower_id  INT  NOT NULL,
    created_date DATE,
    UNIQUE (leader_id, follower_id),
    FOREIGN KEY (leader_id)   REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, mobile_number, birth_date) VALUES
    ('Alice', '+94771234001', '1995-03-12'),
    ('Bob',   '+94771234002', '1998-07-25');
```

You now have a `social_media` database reachable with the credentials below. You give these to the connection in the next step:

| Setting | Value |
| --- | --- |
| Host | `localhost` |
| Port | `3306` |
| Database | `social_media` |
| User | `social_media_user` |
| Password | `social_media_pass` |

### Connect and build the service

With the schema in place, connect to it with the [persist feature](../../develop/tools/integration-tools/persist-tool.md) and design the [HTTP service](../../develop/integration-artifacts/service/http.md) on top.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact**, choose **Connection**, then [**Connect to a Database**](../../develop/tools/integration-tools/persist-tool.md#step-1-add-a-connection). Select **MySQL** and enter the credentials above. Click **Connect & Introspect Database**, pick the `users`, `posts`, and `followers` tables, and name the connection `socialMediaDb`. The persist feature generates a type-safe client with [CRUD functions](../../develop/tools/integration-tools/persist-tool.md#use-connection-functions-in-integration-logic) (**Get rows**, **Insert rows**, **Update row**, **Delete row**) and the matching `User`, `Post`, and `Follower` entities.

   ![The User, Post, and Follower entities and their relationships](/img/guides/tutorials/social-media/type-diagram.png)

2. Click **+ Add Artifact**, then **HTTP Service** under **Integration as API**. Keep **Design From Scratch**, set the **Service Base Path** to `/social-media`, and accept the **Shared Listener (Port 9090)**. Click **Create**.
3. [Add each resource](../../develop/integration-artifacts/service/http.md#resources) below, setting the method, path, [path parameters](../../develop/integration-artifacts/service/http.md#defining-inputs), payload, and [response schema](../../develop/integration-artifacts/service/http.md#defining-response-schemas):

   | Method | Path | Returns |
   | --- | --- | --- |
   | `GET` | `/users` | `User[]` |
   | `GET` | `/users/{id}` | `User` |
   | `POST` | `/users` | `http:Created` |
   | `DELETE` | `/users/{id}` | `http:NoContent` |
   | `GET` | `/users/{id}/posts` | `PostWithMeta[]` |
   | `POST` | `/users/{id}/posts` | `http:Created` |

4. In each resource flow, click **+**, expand the `socialMediaDb` connection, and add the matching CRUD function. There is no SQL to write.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The persist feature generated the entities and a type-safe client from the schema. The service uses them directly:

```ballerina
import ballerina/http;

final store:Client socialMediaDb = check new ();

service /social-media on new http:Listener(9090) {

    resource function get users() returns store:User[]|error {
        return from store:User user in socialMediaDb->/users
            select user;
    }

    resource function post users(NewUser newUser) returns http:Created|error {
        _ = check socialMediaDb->/users.post([newUser]);
        return http:CREATED;
    }
    // ...
}
```

</TabItem>
</Tabs>

> **Capability: Model-driven persistence and low-code REST API design.** A database schema becomes a type-safe client with generated entities and CRUD, and you design resources and typed responses on the canvas with no SQL in your flows.

---

## Part 5: Validate input

A malformed phone number or an empty name should never reach your logic. Attach [constraints](../../develop/integration-artifacts/supporting/types.md) to your record fields and the platform rejects bad payloads automatically.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open the `NewUser` type in the Type editor.
2. On the `name` field, expand the field options and add a minimum length of `1`.
3. On the `mobileNumber` field, add a pattern constraint for a phone number.
4. Save. When a request fails binding, the service returns `400` with the violated rule; you handle the shape centrally in [Part 9](#part-9-handle-errors-consistently).

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
public type NewUser record {|
    @constraint:String {minLength: 1}
    string name;
    @constraint:String {pattern: re `^\+?[0-9]{10,15}$`}
    string mobileNumber;
    string birthDate;
|};
```

</TabItem>
</Tabs>

> **Capability: Declarative validation.** Validation lives on the type, so every endpoint that binds the type enforces it.

---

## Part 6: Shape responses with the Data Mapper

Your stored `Post` keeps `tags` as one comma-separated string, but the API should return them as an array, nested under a `meta` object. Rather than hand-write that transform, you reach for the [Data Mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md#when-to-use-the-data-mapper).

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. In the `get users/[id]/posts` flow, on the node holding the queried posts, click **Open in Data Mapper**.
2. Set the input to the stored `Post` and the output to the API's `PostWithMeta` record.
3. Drag `id` and `description` across for [one-to-one mapping](../../develop/integration-artifacts/supporting/data-mapper/mapping-capabilities.md#one-to-one-mapping).
4. Connect `category` and `createdDate` into the nested `meta` record.
5. Connect `tags` (a string) to `meta.tags` (an array). Choose **Map using Transformation Function** and split on `,`. For mapping over the list of posts, the designer wraps it in a [Map Each Element](../../develop/integration-artifacts/supporting/data-mapper/array-mappings/array-to-array.md#map-each-element) query.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
function mapPostToPostWithMeta(Post[] posts) returns PostWithMeta[] =>
    from var post in posts
    select {
        id: post.id,
        description: post.description,
        meta: {
            tags: re `,`.split(post.tags),
            category: post.category,
            createdDate: post.createdDate
        }
    };
```

</TabItem>
</Tabs>

> **Capability: The Data Mapper.** Drag-and-drop field mapping with transformations, array handling, and nesting, generated as readable query expressions.

---

## Part 7: Screen posts with the Sentiment API

Before a post is saved, screen its text with the Sentiment API from [Part 2](#part-2-build-the-sentiment-api). Because that service publishes an OpenAPI contract, you [generate a type-safe client from it](../../develop/tools/integration-tools/openapi-tool.md#generating-a-ballerina-client-from-openapi) and call it like any connection, with retry and timeout built in.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. In the Social Media API, click **+ Add Artifact**, choose **Connection**, then **Connect Via API Specification**, and provide the Sentiment API's OpenAPI spec. Name the connection `sentimentClient` and **Save**.
2. On the connection, configure **Retry** and **Timeout** so a transient failure does not fail the whole request. See the [HTTP client configuration](../../connectors/catalog/built-in/http/action-reference.md#client).
3. If you secure the Sentiment API, configure **OAuth2 client credentials** on the same connection, pointing at your token endpoint, with the client id and secret stored as configurables.
4. In the `post users/[id]/posts` flow, add the generated `post` call to `/api/sentiment`.
5. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if): if the label is `neg`, return `http:BadRequest`; otherwise continue to persist and publish.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;

final sentiment:Client sentimentClient = check new (sentimentUrl, {
    retryConfig: { interval: 3.0 }
    // auth: { tokenUrl, clientId, clientSecret }  // add if the Sentiment API is secured
});

Sentiment sentiment = check sentimentClient->/api/sentiment.post({text: newPost.description});
if sentiment.label == "neg" {
    return <http:BadRequest>{body: {message: "Post rejected: negative sentiment"}};
}
```

</TabItem>
</Tabs>

> **Capability: OpenAPI client generation and resiliency.** A contract becomes a type-safe client with retry and timeout, and a visual branch decides on the result.

---

## Part 8: Publish a new-post event to RabbitMQ

A saved post should trigger the Post Notifier from [Part 3](#part-3-build-the-post-notifier-rabbitmq-to-slack), but the author should not wait for it. Publish a new-post event carrying the author's id to **RabbitMQ** and run the publish concurrently so the response returns immediately.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Add a [RabbitMQ](../../connectors/catalog/messaging/rabbitmq/connector-overview.md) connection and bind the **Host** and **Port** to configurables.
2. On the success path of `post users/[id]/posts`, add a [**publishMessage**](../../connectors/catalog/messaging/rabbitmq/actions.md#operations) node that publishes a `NotificationEvent` with the author's `leaderId` to the `ballerina.social.media` queue (set it as the **routingKey**). This is the queue the Post Notifier listens on.
3. Wrap the persist and publish in a [Fork](../../develop/understand-ide/editors/flow-diagram-editor/concurrency.md#fork) so they run concurrently, and let the [Wait](../../develop/understand-ide/editors/flow-diagram-editor/concurrency.md#wait) node join them before responding.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
configurable string rabbitmqHost = "localhost";
configurable int rabbitmqPort = 5672;
final rabbitmq:Client postPublisher = check new (rabbitmqHost, rabbitmqPort);

fork {
    worker persist returns error? {
        _ = check socialMediaDb->/posts.post([savedPost]);
    }
    worker publish returns error? {
        check postPublisher->publishMessage({
            content: {leaderId: id.toString()},
            routingKey: "ballerina.social.media"
        });
    }
}
```

</TabItem>
</Tabs>

> **Capability: Event-driven publishing and concurrency.** The API hands off to a broker and returns immediately; downstream work is decoupled.

---

## Part 9: Handle errors consistently

Every failure should return the same shape. Add a response error interceptor to the Social Media service so a constraint violation becomes a clean `400` and any other error a uniform `500`, both with a timestamp and message.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Review the service's [default error handling](../../develop/integration-artifacts/service/http.md#default-error-handling) and [return typed error status codes](../../develop/integration-artifacts/service/http.md#return-typed-error-status-codes) where a resource needs a specific code.
2. Add a response error interceptor to the service to catch errors in one place and map them to a uniform error body.
3. Inside flows where you want to catch and transform a failure, use the [ErrorHandler](../../develop/understand-ide/editors/flow-diagram-editor/error-handling.md#errorhandler) and [Fail](../../develop/understand-ide/editors/flow-diagram-editor/error-handling.md#fail) nodes.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
service class ResponseErrorInterceptor {
    *http:ResponseErrorInterceptor;
    remote function interceptResponseError(error err)
            returns SocialMediaBadRequest|SocialMediaServerError {
        ErrorDetails details = {message: err.message(), timeStamp: time:utcNow(), details: ""};
        if err is constraint:Error {
            return <SocialMediaBadRequest>{body: details};
        }
        return <SocialMediaServerError>{body: details};
    }
}
```

</TabItem>
</Tabs>

> **Capability: Interceptors and error handling.** Cross-cutting concerns are handled in one place rather than repeated in every resource.

---

## Part 10: Test the integration

Validate behavior two ways: interactively, and with repeatable unit tests that need no external services.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. [Open the Try-It tool](../../develop/test/try-it-http.md#open-the-try-it-tool) from the Service Designer. [Compose a request](../../develop/test/try-it-http.md#compose-a-request) to create a user, then a positive and a negative post, and [read the response](../../develop/test/try-it-http.md#read-the-response) to confirm the negative one is rejected.
2. Write [unit tests](../../develop/test/unit-testing.md) for the post-creation logic, [mocking](../../develop/test/mocking.md) the persist client and the sentiment client so tests run without MySQL, RabbitMQ, or the Sentiment API.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
@test:Config {}
function testNegativePostRejected() returns error? {
    sentimentClient = test:mock(sentiment:Client);
    test:prepare(sentimentClient).when("post").thenReturn({label: "neg", probability: {}});

    http:Client api = check new ("localhost:9090/social-media");
    http:Response res = check api->/users/[1]/posts.post({description: "awful", category: "x", tags: ""});
    test:assertEquals(res.statusCode, 400);
}
```

</TabItem>
</Tabs>

> **Capability: Testing.** Interactive Try-it for fast feedback; unit tests with mocking for repeatable verification.

---

## Part 11: Trace end to end

Follow one request as it flows API → sentiment → MySQL → RabbitMQ → Slack, with no changes to your flows.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. [Start Jaeger](../../deploy-operate/observe/jaeger-distributed-tracing.md#step-1-start-jaeger) in a container.
2. [Configure your integrations for Jaeger](../../deploy-operate/observe/jaeger-distributed-tracing.md#step-2-configure-ballerina-for-jaeger) by enabling observability and pointing the tracer at the collector.
3. Send a request and [view traces](../../deploy-operate/observe/jaeger-distributed-tracing.md#step-3-view-traces) to see spans across all three integrations. For metrics and logs alongside tracing, see the [three pillars of observability](../../deploy-operate/observe/observability-overview.md#the-three-pillars-of-observability).

</TabItem>
<TabItem value="code" label="Ballerina Code">

```toml
# Config.toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "localhost"
agentPort = 4317
```

</TabItem>
</Tabs>

> **Capability: Distributed tracing.** End-to-end visibility across services and the broker, with no code changes to your flows.

---

## Part 12: Deploy

The same project deploys as containers or to the cloud without rework.

- **Local:** Containerize each integration and run them with MySQL, RabbitMQ, and Jaeger using Docker Compose. See [self-hosted deployment](../../deploy/overview.md).
- **Cloud:** [Push the whole project from the IDE](../../deploy/cloud/push-from-ide.md#deploy-the-whole-project) to WSO2 Cloud. See the [cloud deployment overview](../../deploy/cloud/overview.md).

> **Capability: Deployment.** The same project deploys as containers or to the cloud without rework.

---

## What's next

You have built a complete, event-driven backend across three integrations and designed every part on the canvas. From here:

- Extend the **followers** feature into a fan-out flow that notifies each follower of a new post.
- Add a [scheduled automation](../../develop/integration-artifacts/automation.md) that emails users a weekly digest.
- Add a second RabbitMQ consumer (analytics, email) on the `ballerina.social.media` queue without touching the API.
