---
title: Build an Event-Driven Social Media Backend with RabbitMQ
sidebar_label: Build an Event-Driven Social Media Backend with RabbitMQ
sidebar_position: 1
description: "Build a Twitter-style social media backend with WSO2 Integrator: a REST API that screens every post for sentiment, stores it in MySQL, and announces it to Slack through a RabbitMQ event pipeline. Designed end to end in the Visual Designer, split across three integrations."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build an Event-Driven Social Media Backend with RabbitMQ

In this tutorial you build a complete, Twitter-style social media backend with [WSO2 Integrator](../../get-started/introduction.md), the low-code integration platform built on Ballerina. You design everything visually, and WSO2 Integrator generates clean Ballerina underneath. Most parts show both: the visual steps on one tab, and the exact code the platform produced on the other.

By the end, a single `POST` will flow from the API through a user check and sentiment screening into MySQL, and out to a Slack channel.

:::info What you will build
A backend for a small social network where people register, publish short posts, and follow each other. Every new post is first screened by a sentiment-analysis service; anything negative is rejected before it is stored. An accepted post is saved to MySQL and, without making the author wait, announced to a team Slack channel through a **RabbitMQ** event pipeline. You build it as three small integrations, and every part is something you design on the canvas.
:::

## Architecture

You build three focused integrations inside one project rather than a single monolith, the way you would in production.

| Integration | Type | Responsibility |
| --- | --- | --- |
| **Social Media API** | HTTP service | Users and posts REST API. Checks the user, screens posts for sentiment, persists to MySQL, and publishes a new-post event to RabbitMQ. |
| **Sentiment API** | HTTP service | A small service that scores post text as positive, negative, or neutral. |
| **Post Notifier** | RabbitMQ event integration | Consumes new-post messages and posts to Slack. |

![Architecture diagram: a POST request hits the Social Media API, which synchronously screens the text with the Sentiment API and persists to MySQL, then asynchronously publishes a new-post event to RabbitMQ, which the Post Notifier consumes to post a message to Slack](/img/guides/tutorials/social-media/architecture.svg)

The integrations collaborate through a deliberate choice of contract. The Social Media API calls the Sentiment API over **HTTP** because it needs the verdict synchronously to decide whether to store the post. It hands the notification off to **RabbitMQ** because the author should not wait on Slack, and because you can add more consumers later (email, analytics) without touching the API.

The **Social Media API is the orchestrator**: it depends on the sentiment service, a database, and the message pipeline. So you build the two standalone integrations it leans on first (Parts 2 and 3), then assemble the API itself (Part 4) and run the whole thing (Part 5).

:::note Event-driven backbone
RabbitMQ is a first-class [event integration trigger](../../develop/integration-artifacts/event/rabbitmq.md): you build the consumer entirely in the Visual Designer. The pattern is broker-agnostic; the platform also ships triggers for [Kafka](../../develop/integration-artifacts/event/kafka.md), [MQTT](../../develop/integration-artifacts/event/mqtt.md), [Solace](../../develop/integration-artifacts/event/solace.md), and [Azure Service Bus](../../develop/integration-artifacts/event/azure-service-bus.md).
:::

:::info Prerequisites
Before you start, make sure you have:

- [WSO2 Integrator installed](../../get-started/setup/local-setup.md).
- A running **MySQL** instance. See [Set up a MySQL database and user](../../connectors/catalog/database/mysql/setup-guide.md#create-a-mysql-database-and-user).
- A running **RabbitMQ** broker. See the [RabbitMQ setup guide](../../connectors/catalog/messaging/rabbitmq/setup-guide.md).
- A **Slack** app with a bot token. See [Create a Slack application](../../connectors/catalog/communication/slack/setup-guide.md#step-2-create-a-new-slack-application).
:::

---

## Part 1: Set up the project

Everything you build sits inside one project, so you set that up first. WSO2 Integrator creates the project and your first integration together, in a single form.

1. Launch **WSO2 Integrator** and [create a new integration](../../develop/create-integrations/create-a-new-integration.md#configure-the-integration). Name it `social-media`.
2. Enable **Create within a project**, name the [project](../../develop/create-integrations/create-a-project.md) `social-media`, and choose where it lives on disk. This is the one project that will hold all three integrations from the [architecture](#architecture).
3. Click **Create Integration**.

![The Create Integration form, with the integration and project both named social-media and Create within a project enabled](/img/guides/tutorials/social-media/create-integration.png)

The project opens to its landing view. The artifacts panel on the left is where your integration takes shape: **Entry Points**, **Connections**, **Types**, **Functions**, **Data Mappers**, and **Configurations** are all empty for now, and you fill the ones you need as the tutorial goes. The center pane lists the `social-media` integration you just created.

![The social-media project landing view, showing the artifacts panel on the left and the Integrations and Libraries pane in the center](/img/guides/tutorials/social-media/project-landing-view.png)

Open the integration and you land in the Design view, where the [canvas](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#canvas) shows the flow of whichever **artifact** you select. The integration is empty, so the Design view invites you to add your first artifact. Every part that follows starts here, with **+ Add Artifact**. Use the **Show Source** toggle whenever you want to see the generated code; you never have to edit it.

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

3. Add three [types](../../develop/integration-artifacts/supporting/types.md): a `Post` with a `text` field, a `Probability` with `neg`, `neutral`, and `pos` decimals, and a `Sentiment` holding a `Probability` and a `label`. When adding each type, expand **Advanced configs** and tick **Accessible by other integrations** — the Social Media API in [Part 4](#part-4-build-the-social-media-api) imports `Post` and `Sentiment` directly from this module.

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
public type Probability record {
    decimal neg;
    decimal neutral;
    decimal pos;
};

public type Sentiment record {
    Probability probability;
    string label;
};

public type Post record {
    string text;
};
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

// config.bal: provide the values in Config.toml
configurable string rabbitmqHost = ?;
configurable int rabbitmqPort = ?;
configurable string slackAuthToken = ?;

// connections.bal: the Slack client
final slack:Client slackClient = check new ({
    auth: {token: slackAuthToken}
});

// types.bal: the event shape and the message wrapper the listener delivers
public type NotificationEvent record {|
    string leaderId;
|};

public type RabbitMQAnydataMessage record {|
    *rabbitmq:AnydataMessage;
    NotificationEvent content;
|};

// main.bal: for each message on the queue, post to Slack
listener rabbitmq:Listener rabbitmqListener = new (string `${rabbitmqHost}`, rabbitmqPort);

service "ballerina.social.media" on rabbitmqListener {
    remote function onMessage(RabbitMQAnydataMessage message, rabbitmq:Caller caller) returns error? {
        do {
            slack:ChatPostMessageResponse slackChatpostmessageresponse = check slackClient->/chat\.postMessage.post({
                channel: "New post creations",
                text: message.content.leaderId + " just posted"
            });
        } on fail error err {
            return error("unhandled error", err);
        }
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

## Part 4: Build the Social Media API

This is the heart of the backend. The **Social Media API** is the orchestrator: it exposes the users-and-posts REST API, stores everything in MySQL, screens each post with the Sentiment API from [Part 2](#part-2-build-the-sentiment-api), and announces accepted posts through the Post Notifier from [Part 3](#part-3-build-the-post-notifier-rabbitmq-to-slack). You build all of it here, in the `social-media` integration: create the database, add the connections it needs, then design the resources and the post-creation flow on the canvas.

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

### Add the connections

The API talks to three things, so add a connection for each before you build the flow: the MySQL database (through the persist feature), the RabbitMQ broker, and the Sentiment API.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Database.** In the artifacts panel, open **Connections** and click **+**, then choose [**Connect to a Database**](../../develop/tools/integration-tools/persist-tool.md#step-1-add-a-connection). Select **MySQL** and enter the credentials above.

   ![Entering the MySQL credentials in the Connect to a Database wizard](/img/guides/tutorials/social-media/main-db-credentials.png)

   Select all three tables, then name the connection `dbClient`. The persist feature generates a type-safe client with [CRUD functions](../../develop/tools/integration-tools/persist-tool.md#use-connection-functions-in-integration-logic) and the matching `User`, `Post`, and `Follower` entities.

   ![Naming the database connection dbClient with its generated configurables](/img/guides/tutorials/social-media/main-db-connection.png)

2. **RabbitMQ.** Add a [RabbitMQ](../../connectors/catalog/messaging/rabbitmq/connector-overview.md) connection, bind its **Host** and **Port** to `rabbitmqHost` and `rabbitmqPort` configurables, and name it `rabbitmqClient`.

   ![Configuring the RabbitMQ client connection with host and port configurables](/img/guides/tutorials/social-media/main-rabbitmq-client.png)

3. **Sentiment API.** Add an [HTTP](../../connectors/catalog/built-in/http/action-reference.md#client) connection with the **Url** of the Sentiment API, `http://localhost:9000/text-processing`, and name it `sentimentClient`.

   ![Configuring the sentiment HTTP client connection pointing at the Sentiment API URL](/img/guides/tutorials/social-media/main-sentiment-client.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import social_media.socialmedia; // the persist module generated from your schema

import ballerina/http;
import ballerinax/rabbitmq;

// Connection settings (config.bal). The wizard generates these;
// you supply the values in Config.toml.
configurable string dbClientHost = "localhost";
configurable int dbClientPort = 3306;
configurable string dbClientUser = "social_media_user";
configurable string dbClientPassword = ?;
configurable string dbClientDatabase = "social_media";
configurable string rabbitmqHost = ?;
configurable int rabbitmqPort = ?;

// One client per dependency (connections.bal).
final socialmedia:Client dbClient = check new (dbClientHost, dbClientPort, dbClientUser, dbClientPassword, dbClientDatabase); // MySQL, via persist
final rabbitmq:Client rabbitmqClient = check new (rabbitmqHost, rabbitmqPort); // RabbitMQ broker
final http:Client sentimentClient = check new ("http://localhost:9000/text-processing"); // Sentiment API
```

</TabItem>
</Tabs>

### Create the service and list users

With the connections in place, add the [HTTP service](../../develop/integration-artifacts/service/http.md) and build your first resource: list all users straight from the database.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact**, then **HTTP Service** under **Integration as API**. Keep **Design From Scratch**, set the **Service Base Path** to `/social-media`, and accept the **Shared Listener (Port 9090)**. Click **Create**.

   ![Creating the HTTP service with base path /social-media on the shared listener](/img/guides/tutorials/social-media/main-create-service.png)

2. [Add the resources](../../develop/integration-artifacts/service/http.md#resources) your API exposes. This walkthrough builds two of them in full; the rest follow the same pattern:

   | Method | Path | Returns |
   | --- | --- | --- |
   | `GET` | `/users` | all users |
   | `POST` | `/users/{id}/posts` | the created post |

3. Open the `get users` resource. Click **+**, expand `dbClient`, and add **Get rows from users**. Name the result `users` and select the fields to return.

   ![Adding a Get rows node on dbClient and selecting the user fields](/img/guides/tutorials/social-media/main-get-users.png)

4. Add a **Return** node that returns `users.toJson()`.

   ![Returning the users list as JSON](/img/guides/tutorials/social-media/main-return-users.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/http;

// The service runs on the project's shared default listener (port 9090).
listener http:Listener httpDefaultListener = http:getDefaultListener();

service /social\-media on httpDefaultListener {

    // GET /social-media/users: list every user.
    resource function get users() returns json|error {
        do {
            // The persist client runs the SELECT and maps each row to UsersType.
            UsersType[] users = check dbClient->/users.get();
            return users.toJson();
        } on fail error err {
            return error("unhandled error", err);
        }
    }

    // The post resource follows in the next section.
}
```

</TabItem>
</Tabs>

### Handle a new post

This is the resource that ties everything together. When someone posts, you confirm the user exists (a `404` if not), screen the text with the Sentiment API (a `406` if it comes back negative), store the post, announce it through RabbitMQ, and return `201`.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Add the `POST /users/{id}/posts` resource with a `NewPost` payload (`description`, `tags`, `category`), and define its typed responses: `201` `http:Created`, `404` `http:NotFound`, `406` `http:NotAcceptable`, and `500` `error`.

   ![Defining the post resource with a NewPost payload and 201, 404, 406, and 500 responses](/img/guides/tutorials/social-media/main-post-resource.png)

2. **Confirm the user exists.** In the flow, add a **Get rows from users** node filtered by `id` (result `user`), then an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) with the condition `user.length() == 0`.

   ![An If node checking user.length() equals 0](/img/guides/tutorials/social-media/main-user-check.png)

   In its branch, declare an `http:NotFound` response with body `{ msg: "User not found" }` and **Return** it.

   ![Declaring an http:NotFound response and returning it](/img/guides/tutorials/social-media/main-not-found.png)

3. **Screen the text.** Declare a variable `postMessage` holding `{ text: newPost.description }`.

   ![Preparing the request payload for the Sentiment API](/img/guides/tutorials/social-media/main-prepare-sentiment.png)

   Then call `sentimentClient` with an **http post** to `/api/sentiment`, storing the result in `sentiment`.

   ![Calling the Sentiment API through the sentimentClient connection](/img/guides/tutorials/social-media/main-call-sentiment.png)

4. **Reject negatives.** Add an If node with the condition `sentiment.label == "neg"`.

   ![An If node checking the sentiment label](/img/guides/tutorials/social-media/main-check-rejection.png)

   In its branch, declare an `http:NotAcceptable` response with body `{ msg: "Post not acceptable" }` and **Return** it.

   ![Declaring an http:NotAcceptable response and returning it](/img/guides/tutorials/social-media/main-not-accepted.png)

5. **Store the post.** Add an **Insert rows into posts** node on `dbClient`, using the record helper to build the post from `newPost` and the path parameter `id`.

   ![Building the post record and inserting it with the record helper](/img/guides/tutorials/social-media/main-insert-post.png)

6. **Announce it.** Add a `rabbitmqClient` **publishMessage** node with content `{ leaderId: id }` and routing key `ballerina.social.media`, the queue the Post Notifier listens on.

   ![Publishing the new-post message to RabbitMQ](/img/guides/tutorials/social-media/main-publish.png)

7. **Return success.** Declare an `http:Created` response with body `{ msg: "Post successfully created" }` and **Return** it.

   ![Declaring the http:Created response and returning it](/img/guides/tutorials/social-media/main-return-success.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import social_media/sentiment_api; // reuse the Sentiment API's request and response types

resource function post users/[int id]/posts(@http:Payload NewPost newPost)
        returns http:Created|http:NotAcceptable|http:NotFound|error {
    do {
        // 1. The user must exist (404 if not)
        UserType[] user = check dbClient->/users.get(whereClause = `id = ${id}`);
        if user.length() == 0 {
            http:NotFound userNotFound = {body: {msg: "User not found"}};
            return userNotFound;
        }

        // 2. Screen the text with the Sentiment API (406 if negative)
        sentiment_api:Post postMessage = {text: newPost.description};
        sentiment_api:Sentiment sentiment = check sentimentClient->post("/api/sentiment", postMessage);
        if sentiment.label == "neg" {
            http:NotAcceptable postForbidden = {body: {msg: "Post not acceptable"}};
            return postForbidden;
        }

        // 3. Store the post
        int[] insertResult = check dbClient->/posts.post([
            {
                description: newPost.description,
                category: newPost.category,
                tags: newPost.tags,
                createdDate: {year: 2026, month: 7, day: 17},
                userId: id
            }
        ]);

        // 4. Announce it on the queue the Post Notifier listens to
        check rabbitmqClient->publishMessage({
            content: {"leaderId": id.toString()},
            routingKey: "ballerina.social.media"
        });

        // 5. Tell the caller it worked (201)
        http:Created createdMsg = {body: {msg: "Post successfully created"}};
        return createdMsg;
    } on fail error err {
        return error("unhandled error", err);
    }
}
```

</TabItem>
</Tabs>

> **Capability: Orchestration on one canvas.** A single visual flow loads data with the persist client, calls another service over HTTP, branches on the result, stores a record, publishes an event, and returns the right HTTP status, all without writing code.

---

## Part 5: Run and test

Everything is built. Make sure your MySQL and RabbitMQ instances are running and the `social_media` database exists (from [Part 4](#part-4-build-the-social-media-api)), and fill in each integration's `Config.toml` (the database password, the RabbitMQ host and port, and the Slack token). Then **Run** the three integrations.

Open the Social Media service, click **Try It**, and invoke a resource in place.

Calling `get users`, for example, returns `200 OK` with the seed users:

![Testing the get users resource with the Try It tool, returning 200 OK and the seed users](/img/guides/tutorials/social-media/main-try-it.png)

Then exercise `post users/[id]/posts`: a normal post returns `201 Created` and posts to Slack, a post the Sentiment API scores negative returns `406 Not Acceptable`, and an unknown user returns `404 Not Found`.

![Testing the post users resource with the Try It tool: a request body returns 201 Created with a success message](/img/guides/tutorials/social-media/main-try-it-post.png)

---

## What's next

You have built a complete, event-driven backend as three integrations, designed entirely in the Visual Designer: a REST API that screens posts with a sentiment service, stores them in MySQL through the persist feature, and announces them to Slack over a RabbitMQ pipeline.

Explore more of what you can build with WSO2 Integrator:

- [Build a Customer Care Agent with MCP](../../genai/tutorials/building-a-customer-care-agent-mcp.md)
- [Building an IT Helpdesk AI Agent with Persistent Memory](../../genai/tutorials/it-helpdesk-chatbot.md)
- [Building an HR Knowledge Base with RAG](../../genai/tutorials/building-hr-knowledge-base-rag.md)
- [Email Generator with Direct LLM](../../genai/tutorials/email-generator-direct-llm.md)
