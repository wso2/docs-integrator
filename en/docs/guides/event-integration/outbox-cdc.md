---
title: Transactional Outbox with CDC and RabbitMQ
description: "Guarantee at-least-once event delivery using the outbox pattern with PostgreSQL CDC and RabbitMQ in WSO2 Integrator."
---

# Transactional Outbox with CDC and RabbitMQ

## Problem

A user registration service writes a new record to the database and then tries to publish a `UserRegistered` event to a message broker. If the service crashes between the two operations — after the database write but before the publish — the event is lost. New subscribers never hear about that user. Retrying the whole registration risks a duplicate database row.

## Pattern

![Transactional Outbox with CDC pattern diagram](/img/guides/event-integration/outbox-cdc.png)

The transactional outbox makes the event part of the same database transaction as the business data. The service writes the user record and an outbox row in a single atomic transaction. A separate relay process watches the outbox table via Change Data Capture (CDC) and publishes each new row to the broker. The business operation and the event emission are now atomic: either both succeed or neither does.

The CDC relay reads the PostgreSQL write-ahead log, so it sees every committed insert without polling. Once a row is published and acknowledged by the broker, it can be marked as processed. If the relay crashes, it resumes from the last position in the WAL — no events are lost.

## Implementation

The HTTP handler performs a single database transaction that writes both the user record and an outbox row. The outbox row captures the event type and a JSON payload that downstream consumers will receive.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/log;
import ballerina/uuid;
import ballerinax/postgresql;

type User record {|
    string id;
    string email;
    string name;
|};

final postgresql:Client usersDb = check new (dbHost, dbUser, dbPassword, dbName, dbPort);
// docs-fold-end

service /users on new http:Listener(8090) {
    resource function post register(User user) returns error? {
        string eventId = uuid:createType1AsString();
        json payload = {id: user.id, email: user.email, name: user.name};
        transaction {
            _ = check usersDb->execute(
                `INSERT INTO users (id, email, name)
                 VALUES (${user.id}, ${user.email}, ${user.name})`);
            _ = check usersDb->execute(
                `INSERT INTO outbox (id, aggregate_type, event_type, payload)
                 VALUES (${eventId}, 'user', 'UserRegistered', ${payload.toJsonString()}::jsonb)`);
            check commit;
        }
        log:printInfo("User registered", userId = user.id);
    }
}
```

A PostgreSQL CDC listener watches the `outbox` table for new inserts. Each insert triggers the relay, which publishes the event to the correct RabbitMQ exchange using the `event_type` column as the routing key. Downstream consumers declare their own queues bound to this exchange.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/log;
import ballerinax/cdc;
import ballerinax/postgresql;
import ballerinax/rabbitmq;

type OutboxRow record {
    string id;
    string aggregate_type;
    string event_type;
    json payload;
};

listener postgresql:CdcListener postgresqlCdcListener = new (database = {
    hostname: dbHost, port: dbPort,
    username: dbUser, password: dbPassword,
    databaseName: dbName, includedSchemas: ["public"]
});

final rabbitmq:Client rabbitmqClient = check initRabbitMq();

function initRabbitMq() returns rabbitmq:Client|error {
    rabbitmq:Client cl = check new (rabbitmqHost, rabbitmqPort);
    check cl->exchangeDeclare(rabbitmqExchange, rabbitmq:DIRECT_EXCHANGE);
    return cl;
}
// docs-fold-end

@cdc:ServiceConfig {tables: string `${dbName}.public.outbox`}
service cdc:Service on postgresqlCdcListener {
    remote function onCreate(OutboxRow row, string tableName) returns error? {
        check rabbitmqClient->publishMessage({
            exchange: rabbitmqExchange,
            routingKey: row.event_type,
            content: row.payload
        });
        log:printInfo("Event published to RabbitMQ", eventType = row.event_type);
    }
}
```

## Try it yourself

Try this sample in WSO2 Integration Cloud.

[![Deploy to WSO2 Cloud](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/event-integration/outbox_cdc_rabbitmq)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/event-integration/outbox_cdc_rabbitmq)
