---
title: Saga (Choreography) with Solace PubSub+
description: "Coordinate multi-step distributed transactions and compensation using choreography-based sagas on Solace in WSO2 Integrator."
---

# Saga (Choreography) with Solace PubSub+

## Problem

Booking a trip involves at least three independent steps: reserving a flight seat, booking a hotel room, and reserving a rental car. Each step is in a different service. There is no single transaction that spans all three. If the car reservation fails after the flight and hotel are confirmed, the partially-completed booking must be rolled back — without a central coordinator that knows about every step.

## Pattern

![Saga (Choreography) pattern diagram](/img/guides/event-integration/saga.png)

A choreography-based saga replaces central orchestration with domain events. Each service reacts to events published by the step before it, and publishes its own events when it completes. If a step fails, it publishes a failure event that triggers compensation handlers in the services that have already succeeded.

No service sends commands to another. Services react to facts. Adding a new step means subscribing a new service to an existing event — no changes to existing services.

Solace PubSub+ topics and durable queues make this reliable: each queue subscription holds messages until the consumer is ready, so a slow or temporarily unavailable service catches up without dropping events.

## Implementation

The HTTP endpoint accepts a `FlightBooked` event and publishes it to the `trip/flight/booked` topic. This kicks off the saga without knowing anything about downstream steps.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/log;
import ballerinax/solace;

configurable string solaceUrl = "smf://localhost:55554";
configurable string messageVpn = "default";
configurable string solaceUser = "admin";
configurable string solacePassword = "admin";

type FlightBooked record {|
    string tripId;
    string destination;
|};

final solace:MessageProducer sagaProducer = check new (
    solaceUrl,
    {
        messageVpn: messageVpn,
        auth: {username: solaceUser, password: solacePassword}
    }
);
// docs-fold-end

listener solace:Listener solaceListener = check new (
    solaceUrl,
    messageVpn = messageVpn,
    auth = {username: solaceUser, password: solacePassword}
);

service /trips on new http:Listener(8090) {
    resource function post book(FlightBooked event) returns error? {
        check sagaProducer->send({payload: event}, {topicName: "trip/flight/booked"});
        log:printInfo("Saga initiated", tripId = event.tripId, destination = event.destination);
    }
}
```

The hotel service listens on the `hotel-on-flight-booked` queue, which is subscribed to the `trip/flight/booked` topic. It books a hotel room and publishes `HotelBooked` — carrying the destination forward so the car service can use it.

```ballerina
// docs-fold-start: Supporting definitions
type HotelBooked record {|
    string tripId;
    string destination;
|};

type FlightBookedMessage record {|
    *solace:Message;
    FlightBooked payload;
|};
// docs-fold-end

@solace:ServiceConfig {queueName: "hotel-on-flight-booked"}
service solace:Service on solaceListener {
    remote function onMessage(FlightBookedMessage event) returns error? {
        FlightBooked payload = event.payload;
        log:printInfo("Room booked", tripId = payload.tripId, destination = payload.destination);
        check sagaProducer->send({payload: {tripId: payload.tripId, destination: payload.destination}}, {topicName: "trip/hotel/booked"});
    }
}
```

The car service listens on the `car-on-hotel-booked` queue, subscribed to `trip/hotel/booked`. If it can reserve a car, the saga completes. If it cannot, it publishes `trip/car/failed` to trigger compensation.

```ballerina
// docs-fold-start: Supporting definitions
type HotelBookedMessage record {|
    *solace:Message;
    HotelBooked payload;
|};
// docs-fold-end

@solace:ServiceConfig {queueName: "car-on-hotel-booked"}
service solace:Service on solaceListener {
    remote function onMessage(HotelBookedMessage event) returns error? {
        HotelBooked payload = event.payload;
        if payload.destination == "fail" {
            log:printInfo("Car booking failed, triggering compensation", tripId = payload.tripId);
            check sagaProducer->send({payload: {tripId: payload.tripId}}, {topicName: "trip/car/failed"});
        } else {
            log:printInfo("Car reserved, saga complete", tripId = payload.tripId, destination = payload.destination);
        }
    }
}
```

When the car fails, the hotel's compensation handler cancels the room and publishes `HotelCancelled`. The flight's compensation handler releases the seat — in this sample it logs the action; a real implementation would call the flight booking API.

```ballerina
// docs-fold-start: Supporting definitions
type CarFailed record {|
    string tripId;
|};

type HotelCancelled record {|
    string tripId;
|};

type CarFailedMessage record {|
    *solace:Message;
    CarFailed payload;
|};

type HotelCancelledMessage record {|
    *solace:Message;
    HotelCancelled payload;
|};
// docs-fold-end

@solace:ServiceConfig {queueName: "hotel-on-car-failed"}
service solace:Service on solaceListener {
    remote function onMessage(CarFailedMessage event) returns error? {
        log:printInfo("Compensation: room cancelled", tripId = event.payload.tripId);
        check sagaProducer->send({payload: {tripId: event.payload.tripId}}, {topicName: "trip/hotel/cancelled"});
    }
}

@solace:ServiceConfig {queueName: "flight-on-hotel-cancelled"}
service solace:Service on solaceListener {
    remote function onMessage(HotelCancelledMessage event) returns error? {
        log:printInfo("Compensation: flight released", tripId = event.payload.tripId);
    }
}
```

All four service handlers share the single named listener `solaceListener`. Queues must be created on the Solace broker and subscribed to their topics before running the sample.

## Try it yourself

Try this sample on WSO2 Cloud.

[![Deploy on WSO2 Cloud](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/event-integration/saga_solace)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/event-integration/saga_solace)
