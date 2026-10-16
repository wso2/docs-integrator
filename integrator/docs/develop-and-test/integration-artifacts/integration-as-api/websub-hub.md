---
title: WebSub Hub Service
---

# WebSub Hub Service

A WebSub hub is the intermediary in the [WebSub](https://www.w3.org/TR/websub/) publish-subscribe protocol. It accepts topic registrations from publishers, manages subscriber lifecycles, and distributes content updates to all verified subscribers when new content is published.

Creating a WebSub hub service requires Ballerina code. Once the service exists, you can use the visual designer to implement logic for individual event handlers.

## Creating a WebSub hub service

A WebSub hub service listens on a `websubhub:Listener` and implements remote functions for each hub event — topic registration, subscription management, and content distribution.

```ballerina
import ballerina/websubhub;

configurable int port = 9090;

listener websubhub:Listener hubListener = new (port);

service /hub on hubListener {

    remote function onRegisterTopic(websubhub:TopicRegistration msg)
            returns websubhub:TopicRegistrationSuccess|websubhub:TopicRegistrationError|error {
        // Validate and persist topic registration
        return websubhub:TOPIC_REGISTRATION_SUCCESS;
    }

    remote function onDeregisterTopic(websubhub:TopicDeregistration msg)
            returns websubhub:TopicDeregistrationSuccess|websubhub:TopicDeregistrationError|error {
        // Remove topic registration
        return websubhub:TOPIC_DEREGISTRATION_SUCCESS;
    }

    remote function onUpdateMessage(websubhub:UpdateMessage msg)
            returns websubhub:Acknowledgement|websubhub:UpdateMessageError|error {
        // Distribute content update to all topic subscribers
        return websubhub:ACKNOWLEDGEMENT;
    }

    remote function onSubscription(websubhub:Subscription msg)
            returns websubhub:SubscriptionAccepted|error {
        // Accept and store the subscription request
        return websubhub:SUBSCRIPTION_ACCEPTED;
    }

    remote function onSubscriptionIntentVerified(websubhub:VerifiedSubscription msg)
            returns error? {
        // Persist the verified subscription
    }

    remote function onUnsubscription(websubhub:Unsubscription msg)
            returns websubhub:UnsubscriptionAccepted|websubhub:BadUnsubscriptionError|
        websubhub:InternalUnsubscriptionError|error {
        return websubhub:UNSUBSCRIPTION_ACCEPTED;
    }

    remote function onUnsubscriptionIntentVerified(websubhub:VerifiedUnsubscription msg)
            returns error? {
        // Remove the persisted subscription
    }
}
```

## Hub event callbacks

| Callback | Trigger | Typical use |
|---|---|---|
| `onRegisterTopic` | Publisher registers a new topic | Validate and store the topic |
| `onDeregisterTopic` | Publisher removes a topic | Clean up topic and associated subscribers |
| `onUpdateMessage` | Publisher sends a content update | Distribute the update to all topic subscribers |
| `onSubscription` | Subscriber sends a subscription request | Validate and accept the subscription |
| `onSubscriptionValidation` | Additional validation step (optional) | Enforce custom subscription rules |
| `onSubscriptionIntentVerified` | Hub verifies subscriber intent | Persist the verified subscription |
| `onUnsubscription` | Subscriber sends an unsubscription request | Accept and process the unsubscription |
| `onUnsubscriptionValidation` | Additional unsubscription validation (optional) | Enforce custom unsubscription rules |
| `onUnsubscriptionIntentVerified` | Hub verifies unsubscription intent | Remove the persisted subscription |

The `onRegisterTopic`, `onDeregisterTopic`, `onUpdateMessage`, `onSubscriptionIntentVerified`, and `onUnsubscriptionIntentVerified` callbacks are mandatory. The other callbacks are optional.

### Optional validation callbacks

The `onSubscriptionValidation` and `onUnsubscriptionValidation` callbacks are optional. If implemented, the hub invokes them after `onSubscription` or `onUnsubscription` (respectively) and before intent verification. Use them to enforce custom business rules — for example, restricting subscriptions to known topics or authorized callers.

Return `nil` (or omit a return) to accept the request. Return a `SubscriptionDeniedError` or `UnsubscriptionDeniedError` to reject it. The example below uses the `topics` and `subscriptions` maps declared in [Implementing hub logic](#implementing-hub-logic).

```ballerina
remote function onSubscriptionValidation(websubhub:Subscription msg)
        returns websubhub:SubscriptionDeniedError|error? {
    // Reject subscriptions to unregistered topics
    lock {
        if !topics.hasKey(msg.hubTopic) {
            return error websubhub:SubscriptionDeniedError("topic not registered", statusCode = 406);
        }
    }
    // Returning nil accepts the subscription
}

remote function onUnsubscriptionValidation(websubhub:Unsubscription msg)
        returns websubhub:UnsubscriptionDeniedError|error? {
    // Reject if the subscription does not exist
    lock {
        if !subscriptions.hasKey(msg.hubCallback) {
            return error websubhub:UnsubscriptionDeniedError("subscription not found", statusCode = 406);
        }
    }
}
```

For the complete callback lifecycle and additional configuration options, see the [Ballerina WebSubHub specification](https://ballerina.io/spec/websubhub).

## Implementing hub logic

Implement each callback as a `remote function` inside the hub service. The example below shows a hub that stores topics and subscriptions in isolated maps and distributes updates using a `websubhub:HubClient`.

```ballerina
import ballerina/websubhub;
import ballerina/log;

isolated map<websubhub:TopicRegistration> topics = {};
isolated map<websubhub:VerifiedSubscription> subscriptions = {};

service /hub on hubListener {

    remote function onRegisterTopic(websubhub:TopicRegistration msg)
            returns websubhub:TopicRegistrationSuccess|error {
        lock {
            topics[msg.topic] = msg.cloneReadOnly();
        }
        log:printInfo("Topic registered", topic = msg.topic);
        return websubhub:TOPIC_REGISTRATION_SUCCESS;
    }

    remote function onDeregisterTopic(websubhub:TopicDeregistration msg)
            returns websubhub:TopicDeregistrationSuccess|error {
        lock {
            _ = topics.remove(msg.topic);
        }
        return websubhub:TOPIC_DEREGISTRATION_SUCCESS;
    }

    remote function onUpdateMessage(websubhub:UpdateMessage msg)
            returns websubhub:Acknowledgement|error {
        lock {
            foreach websubhub:VerifiedSubscription sub in subscriptions {
                if sub.hubTopic == msg.hubTopic {
                    websubhub:HubClient hubClient = check new (sub);
                    _ = check hubClient->notifyContentDistribution({
                        content: msg.content.clone()
                    });
                }
            }
        }
        return websubhub:ACKNOWLEDGEMENT;
    }

    remote function onSubscription(websubhub:Subscription msg)
            returns websubhub:SubscriptionAccepted|error {
        return websubhub:SUBSCRIPTION_ACCEPTED;
    }

    remote function onSubscriptionIntentVerified(websubhub:VerifiedSubscription msg)
            returns error? {
        lock {
            subscriptions[msg.hubCallback] = msg.cloneReadOnly();
        }
        log:printInfo("Subscription verified", callback = msg.hubCallback);
    }

    remote function onUnsubscription(websubhub:Unsubscription msg)
            returns websubhub:UnsubscriptionAccepted|error {
        return websubhub:UNSUBSCRIPTION_ACCEPTED;
    }

    remote function onUnsubscriptionIntentVerified(websubhub:VerifiedUnsubscription msg)
            returns error? {
        lock {
            _ = subscriptions.remove(msg.hubCallback);
        }
    }
}
```

## Designing logic with the visual designer

Although WebSub hub service creation is not supported in the visual designer, you can use it to implement logic for event handlers defined in code. Once the service exists in the project, it appears in the **Entry Points** sidebar and on the design canvas.

<ThemedImage
    alt="Design canvas showing the hubListener listener connected to the /hub websubhub:Service node"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/service/websubhub-service/step-canvas.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/service/websubhub-service/step-canvas.png'),
    }}
/>

Click the service node (or the service name in the sidebar) to open the **WEBSUBHUB Service** designer, which lists the event handlers.

<ThemedImage
    alt="WEBSUBHUB Service designer listing the event handlers of the /hub service"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/service/websubhub-service/step-service.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/service/websubhub-service/step-service.png'),
    }}
/>

Click any handler row (for example, `onUpdateMessage`) to open its **flow designer view**, where you can define the integration logic visually.

<ThemedImage
    alt="Flow designer for the onUpdateMessage remote function showing the Return step with websubhub:ACKNOWLEDGEMENT"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/service/websubhub-service/step-flow.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/service/websubhub-service/step-flow.png'),
    }}
/>

Not all WebSub hub service configuration options are available through the visual designer. For full control — including listener configuration and content distribution settings — use Ballerina code directly.

## For more details

See the [Ballerina WebSubHub specification](https://ballerina.io/spec/websubhub) for the complete language-level reference, including TLS configuration, authentication, and advanced hub configuration.
