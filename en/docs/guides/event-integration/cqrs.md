---
title: CQRS with Kafka and PostgreSQL
description: "Separate read and write models using Kafka events and a PostgreSQL read store in WSO2 Integrator."
---

# CQRS with Kafka and PostgreSQL

## Problem

A multiplayer game needs to record match results as fast as possible while simultaneously serving leaderboard queries. If the write path has to maintain a sorted leaderboard in real time, every result update contends with every leaderboard read. As load grows, one side starves the other.

## Pattern

![CQRS pattern diagram](/img/guides/event-integration/cqrs.png)

Command Query Responsibility Segregation keeps the write model and the read model separate. Commands (writes) go through one path optimized for throughput; queries (reads) go through a different path optimized for retrieval. An event connects the two: the write side publishes a domain event to Kafka, and a consumer updates a dedicated read store (PostgreSQL) that is shaped exactly for the queries it needs to serve.

The write path never touches the leaderboard table. The read path never touches the events log. Each can scale, be indexed, and be tuned independently.

## Implementation

Match results are submitted via HTTP and published to Kafka. The write handler records the intent and fires the event — it does not update any read model.

```ballerina
// docs-fold-start: Supporting definitions
import ballerinax/kafka;

configurable string bootstrapServers = "localhost:9092";
configurable string topicName = "match-results";

type MatchResult record {|
    string playerId;
    string displayName;
    int score;
|};

final kafka:Producer resultsProducer = check new (bootstrapServers);
// docs-fold-end

service /matches on new http:Listener(8090) {
    resource function post add(MatchResult result) returns error? {
        check resultsProducer->send({topic: topicName, value: result});
        log:printInfo("Match result published", playerId = result.playerId, score = result.score);
    }
}
```

A Kafka consumer listens for those events and upserts the leaderboard table. The `ON CONFLICT` clause accumulates total score and game count per player without any locking on the write side.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/sql;
import ballerinax/postgresql;

configurable string groupId = "leaderboard-updater";
final postgresql:Client leaderboardDb = check new (dbHost, dbUser, dbPassword, dbName, dbPort);

listener kafka:Listener kafkaListener = new (bootstrapServers, {
    groupId: groupId,
    topics: [topicName]
});
// docs-fold-end

service kafka:Service on kafkaListener {
    remote function onConsumerRecord(MatchResult[] results) returns error? {
        foreach MatchResult result in results {
            _ = check leaderboardDb->execute(`
                INSERT INTO leaderboard (player_id, display_name, total_score, games_played)
                VALUES (${result.playerId}, ${result.displayName}, ${result.score}, 1)
                ON CONFLICT (player_id) DO UPDATE
                  SET total_score = leaderboard.total_score + ${result.score},
                      games_played = leaderboard.games_played + 1,
                      display_name = ${result.displayName}`);
        }
    }
}
```

Leaderboard queries hit a separate service backed by the read store. The table can carry any indexes the query pattern demands without affecting the write throughput.

```ballerina
// docs-fold-start: Supporting definitions
type LeaderboardRow record {|
    string player_id;
    string display_name;
    int total_score;
    int games_played;
|};
// docs-fold-end

service /leaderboard on new http:Listener(8091) {
    resource function get top(int 'limit = 100) returns LeaderboardRow[]|error {
        stream<LeaderboardRow, sql:Error?> rows = leaderboardDb->query(
            `SELECT * FROM leaderboard ORDER BY total_score DESC LIMIT ${'limit}`);
        return from LeaderboardRow row in rows select row;
    }
}
```

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/event-integration/cqrs_kafka)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/event-integration/cqrs_kafka)
