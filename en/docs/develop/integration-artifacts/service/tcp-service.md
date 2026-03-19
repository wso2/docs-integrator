---
title: TCP Service
description: Handle raw TCP connections for custom protocol implementations. (Beta)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TCP Service

TCP services handle raw TCP connections and are suitable for custom binary or text-based protocol implementations where HTTP overhead is not acceptable. WSO2 Integrator generates a connection service class with lifecycle callbacks for connection open, data receipt, and close events.

:::note Beta
TCP service support is currently in beta.
:::

## Creating a TCP service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open the **WSO2 Integrator** sidebar in VS Code.
2. Click **+** next to **Services**.
3. Select **TCP Service** from the artifact type list.
4. In the creation form, fill in:
   - **Name** — a name for the service.
   - **Port** — the TCP listener port (default: `3000`).
5. Click **Create**.

<!-- TODO: add screenshot — TCP service creation form -->

6. WSO2 Integrator generates a TCP listener service and a connection service class. The flow designer shows two nodes:
   - **onConnect** — called when a new client connects; returns the connection service instance.
   - Connection service handlers: **onBytes**, **onClose**, and **onError**.
7. Click the **onBytes** node to implement the data processing logic.
8. Use `caller->writeBytes()` to send a response back to the client.

<!-- TODO: add screenshot — Flow designer showing TCP service with connection handler nodes -->

9. Click **onClose** to add cleanup logic when a connection closes.

<!-- TODO: add screenshot — onClose handler implementation in flow designer -->

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/tcp;

service on new tcp:Listener(3000) {

    remote function onConnect(tcp:Caller caller) returns tcp:ConnectionService {
        log:printInfo("New TCP connection");
        return new TcpHandler();
    }
}

service class TcpHandler {
    *tcp:ConnectionService;

    remote function onBytes(tcp:Caller caller, readonly & byte[] data) returns error? {
        string message = check string:fromBytes(data);
        log:printInfo("Received", data = message);
        // Process and respond
        check caller->writeBytes("ACK".toBytes());
    }

    remote function onClose() {
        log:printInfo("Connection closed");
    }
}
```

</TabItem>
</Tabs>

## Connection lifecycle callbacks

| Callback | Trigger | Typical use |
|---|---|---|
| `onConnect` | New TCP client connects | Initialize per-connection state, return `ConnectionService` |
| `onBytes` | Data received from client | Parse and process the payload, write response |
| `onClose` | Client disconnects | Release per-connection resources |
| `onError` | Connection error | Log and handle error conditions |

## Common patterns

### Frame-delimited protocol

```ballerina
service class FrameHandler {
    *tcp:ConnectionService;
    private byte[] buffer = [];

    remote function onBytes(tcp:Caller caller, readonly & byte[] data) returns error? {
        // Accumulate bytes until a complete frame is received
        self.buffer.push(...data);
        if self.buffer.length() >= 4 {
            // First 4 bytes encode frame length
            int frameLen = readInt32(self.buffer.slice(0, 4));
            if self.buffer.length() >= 4 + frameLen {
                byte[] frame = self.buffer.slice(4, 4 + frameLen);
                self.buffer = self.buffer.slice(4 + frameLen);
                check processFrame(caller, frame);
            }
        }
    }

    remote function onClose() {
        log:printInfo("Connection closed, pending bytes discarded",
                      pending = self.buffer.length());
    }
}
```

## What's next

- [WebSocket Service](websocket-service.md) — real-time bidirectional communication with a higher-level protocol
- [HTTP Service](http-service.md) — expose integration logic over REST
