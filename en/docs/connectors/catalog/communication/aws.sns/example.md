import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Example

## What you'll build

Build a WSO2 Integrator automation that publishes a message to an AWS Simple Notification Service (SNS) topic using the AWS SNS connector. The integration connects to SNS using AWS credentials stored as configurable variables, then publishes a message to a specified topic ARN.

**Operations used:**
- **Publish** : Publishes a message to an SNS topic ARN, phone number, or mobile endpoint

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[Publish Operation]
    B --> C[AWS SNS Connector]
    C --> D((AWS SNS Topic))
```

## Prerequisites

- An AWS account with SNS access and an existing SNS topic
- AWS credentials: Access Key ID, Secret Access Key, optional Security Token, and Region

## Setting up the AWS SNS integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](../../../../develop/create-integrations/create-a-new-integration.md) guide to set up your integration first, then return here to add the connector.

## Adding the AWS SNS connector

### Step 1: Open the connector palette

In the left sidebar under your project, expand **Connections** and select the **+** icon to open the connector palette.

<ThemedImage
    alt="AWS SNS connector palette open with search field before any selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_01_palette.png'),
    }}
/>

## Configuring the AWS SNS connection

### Step 2: Search for and select the AWS SNS connector

1. In the connector palette search box, enter `aws.sns` to filter the list.
2. Select **ballerinax/aws.sns** from the results to open the **New Connection** form.

### Step 3: Fill in the connection parameters

Fill in the following fields, binding each to a configurable variable:

- **connectionName** : Name for this connection instance (`snsClient`)
- **accessKeyId** : Your AWS access key ID, bound to a configurable variable
- **secretAccessKey** : Your AWS secret access key, bound to a configurable variable
- **region** : AWS region where your SNS topic resides, bound to a configurable variable

<ThemedImage
    alt="AWS SNS connection form fully filled with all parameters before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_02_connection_form.png'),
    }}
/>

### Step 4: Save the connection

Select **Save Connection**. The `snsClient` connection node appears on the design canvas and is listed under **Connections** in the left sidebar.

<ThemedImage
    alt="AWS SNS Connections panel showing snsClient entry after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_03_connections_list.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_03_connections_list.png'),
    }}
/>

### Step 5: Set actual values for your configurables

1. In the left panel, select **Configurations**.
2. Set a value for each configurable listed below.

- **snsAccessKeyId** (string) : Your AWS access key ID
- **snsSecretAccessKey** (string) : Your AWS secret access key
- **snsRegion** (string) : AWS region where your SNS topic resides

## Configuring the AWS SNS publish operation

### Step 6: Add an automation entry point

1. In the WSO2 Integrator panel toolbar, select **Add Artifact**.
2. Select **Automation** from the artifact type list.
3. In the **Create New Automation** dialog, select **Create**.

The automation flow canvas opens with a **Start** node and an **Error Handler** node pre-placed.

### Step 7: Select and configure the publish operation

Select the **+** button between the **Start** node and the **Error Handler** node to open the node selection panel. Under **Connections**, expand **snsClient** to view all available operations.

<ThemedImage
    alt="AWS SNS connection node expanded showing all available operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_04_operations_panel.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_04_operations_panel.png'),
    }}
/>

Select **Publish** to open the configuration form, then fill in the following fields:

- **Target** : The SNS topic ARN to publish to (for example, `"arn:aws:sns:us-east-1:123456789012:MyTopic"`)
- **Message** : The message body to publish (for example, `"Hello from WSO2 Integrator!"`)
- **Target Type** : Leave as `TOPIC` (default) for publishing to a topic
- **Result variable** : Auto-generated variable that stores the `sns:PublishMessageResponse`

<ThemedImage
    alt="AWS SNS publish operation configuration filled with all values"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_05_publish_form_filled.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_05_publish_form_filled.png'),
    }}
/>

Select **Save**. The publish node is added to the flow canvas, connected to `snsClient`.

<ThemedImage
    alt="Completed AWS SNS automation flow"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/communication/aws-sns/sns_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/aws.sns_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/aws.sns_connector_sample)
