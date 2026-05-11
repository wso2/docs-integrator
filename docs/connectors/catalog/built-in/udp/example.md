# Example

## What you'll build

Build an integration that sends a UDP datagram using the **ballerina/udp** connector in WSO2 Integrator. You'll configure a connectionless UDP client, add an Automation entry point, and invoke the `sendDatagram` operation to transmit bytes over UDP.

**Operations used:**
- **sendDatagram** : Transmits a UDP datagram record (containing remote host, remote port, and byte data) to a target endpoint

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[sendDatagram Operation]
    B --> C[UDP Connector]
    C --> D((UDP Endpoint))
```

## Setting up the UDP integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](../../../../develop/create-integrations/create-a-new-integration.md) guide to set up your integration first, then return here to add the connector.

## Adding the UDP connector

### Step 1: Open the connector palette and select the UDP connector

In the WSO2 Integrator left panel, expand **Connections** and select the **+** (Add Connection) button to open the connector palette.

![UDP connector palette open with search field before any selection](/img/connectors/catalog/built-in/udp/udp_screenshot_01_palette.png)

## Configuring the UDP connection

### Step 2: Configure the UDP connection form

Expand the **Advanced Configurations** section and bind the **Local Host** field to a new configurable variable. Select the **Open Helper Panel** icon next to **Local Host**, go to the **Configurables** tab, and select **+ New Configurable**. Enter `udpLocalHost` as the variable name with type `string`, then select **Add**. The **Connection Name** is auto-filled as `udpClient`. Select **Save** to persist the connection.

- **localHost** : Binds the UDP client to a specific local network interface using the `udpLocalHost` configurable variable

![UDP connection form fully filled with all parameters before saving](/img/connectors/catalog/built-in/udp/udp_screenshot_02_connection_form.png)

### Step 3: Verify the connection node on the canvas

Confirm the `udpClient` connection node is visible in the **Connections** panel after saving.

![UDP Connections panel showing udpClient entry after saving](/img/connectors/catalog/built-in/udp/udp_screenshot_03_connections_list.png)

### Step 4: Set actual values for your configurables

In the left panel, select **Configurations**. Set a value for each configurable listed below.

- **udpLocalHost** (string) : The local network interface address to bind the UDP client (for example, `0.0.0.0` to bind to all interfaces)

## Configuring the UDP sendDatagram operation

### Step 5: Add an Automation entry point

Select **Add Artifact**, choose **Automation** from the artifact type list, leave the function name as `main`, and select **Create**. The Automation flow canvas opens showing a **Start** node, an empty step placeholder, and an **Error Handler** node.

### Step 6: Select and configure the sendDatagram operation

On the Automation canvas, select the placeholder node between **Start** and **Error Handler** to open the node panel. In the **Connections** section, expand **udpClient** to reveal its operations, then select **Send Datagram**.

![UDP connection node expanded showing all available operations before selection](/img/connectors/catalog/built-in/udp/udp_screenshot_04_operations_panel.png)

In the **Datagram** field, switch to **Expression** mode and enter the following record expression with these values:

- **remoteHost** : The hostname or IP address of the UDP target
- **remotePort** : The port number on the remote host to send the datagram to
- **data** : The byte array payload to transmit (for example, `"Hello UDP World".toBytes()`)

Select **Save** to add the step to the automation flow.

![UDP sendDatagram operation configuration filled with all values](/img/connectors/catalog/built-in/udp/udp_screenshot_05_operation_filled.png)

![Completed UDP automation flow](/img/connectors/catalog/built-in/udp/udp_screenshot_06_completed_flow.png)

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/udp_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/udp_connector_sample)

## More code examples

The `UDP` connector provides practical examples illustrating usage in various scenarios. Explore these [examples](https://github.com/ballerina-platform/module-ballerina-udp/tree/main/examples), covering UDP datagram communication and lightweight network services.

1. [Simple file server](https://github.com/ballerina-platform/module-ballerina-udp/tree/main/examples/simple-file-server) - Implement a simple file server using UDP datagram-based communication.
