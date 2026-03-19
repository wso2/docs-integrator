---
title: WebSocket Service
description: Handle real-time bidirectional communication with WebSocket.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WebSocket Service

WebSocket services enable persistent, full-duplex communication between clients and the server. Use them for real-time features such as live dashboards, chat applications, collaborative tools, and push notifications.

## Creating a WebSocket service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open the **WSO2 Integrator** sidebar in VS Code.
2. Click **+** next to **Services**.
3. Select **WebSocket Service** from the artifact type list.
4. In the creation form, fill in:
   - **Name** — a name for the service.
   - **Port** — the WebSocket listener port (default: `8080`).
   - **Base Path** — the WebSocket endpoint path (e.g., `/ws`).
5. Click **Create**.

<!-- TODO: add screenshot — WebSocket service creation form -->

6. WSO2 Integrator generates an upgrade resource and a WebSocket service class. The flow designer shows the following handler nodes:
   - **onOpen** — called when a client successfully upgrades the connection.
   - **onTextMessage** — called when the client sends a text frame.
   - **onBinaryMessage** — called when the client sends a binary frame.
   - **onClose** — called when the connection closes.
7. Click **onOpen** to add connection initialization logic (for example, broadcasting a welcome message).
8. Click **onTextMessage** to implement the message handling logic.

<!-- TODO: add screenshot — Flow designer showing WebSocket service with event handler nodes -->

9. Use `caller->writeTextMessage()` or `caller->writeBinaryMessage()` to push messages to the client.
10. To broadcast to all connected clients, maintain a shared collection of callers and iterate over them in the handler.

<!-- TODO: add screenshot — onTextMessage handler with writeTextMessage action -->

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/websocket;

service /ws on new websocket:Listener(8080) {

    resource function get .() returns websocket:Service|error {
        return new ChatService();
    }
}

service class ChatService {
    *websocket:Service;

    remote function onOpen(websocket:Caller caller) returns error? {
        log:printInfo("Client connected", connectionId = caller.getConnectionId());
    }

    remote function onTextMessage(websocket:Caller caller, string message) returns error? {
        // Echo the message back
        check caller->writeTextMessage("Received: " + message);
    }

    remote function onClose(websocket:Caller caller, int statusCode, string reason) {
        log:printInfo("Client disconnected", reason = reason);
    }
}
```

</TabItem>
</Tabs>

## WebSocket lifecycle callbacks

| Callback | Trigger | Typical use |
|---|---|---|
| `onOpen` | Connection upgrade successful | Initialize session state, send welcome message |
| `onTextMessage` | Text frame received | Parse and route message, broadcast to others |
| `onBinaryMessage` | Binary frame received | Handle binary payloads (files, media) |
| `onClose` | Connection closed | Remove client from broadcast list, release resources |
| `onError` | Connection error | Log and handle errors |

## Common patterns

### Broadcast to all connected clients

```ballerina
// Shared connection registry
isolated map<websocket:Caller> connections = {};

service class BroadcastService {
    *websocket:Service;

    remote function onOpen(websocket:Caller caller) returns error? {
        lock {
            connections[caller.getConnectionId()] = caller;
        }
    }

    remote function onTextMessage(websocket:Caller caller, string message) returns error? {
        // Broadcast to all connected clients
        lock {
            foreach websocket:Caller conn in connections {
                check conn->writeTextMessage(message);
            }
        }
    }

    remote function onClose(websocket:Caller caller, int statusCode, string reason) {
        lock {
            _ = connections.remove(caller.getConnectionId());
        }
    }
}
```

## What's next

- [HTTP Service](http-service.md) — expose integration logic over REST
- [TCP Service](tcp-service.md) — raw TCP for custom binary protocols
