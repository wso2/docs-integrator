# Example

## What you'll build

This integration demonstrates how to connect to Amazon Web Services Simple Storage Service (S3) using the `ballerinax/aws.s3` connector in WSO2 Integrator. The workflow uses an Automation entry point to invoke the `createBucket` operation, which creates a new S3 bucket in the specified AWS region.

**Operations used:**
- **createBucket** : creates a new Amazon S3 bucket in the specified AWS region using the provided bucket name

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[Create Bucket]
    B --> C[aws.s3 Connector]
    C --> D[(Amazon S3)]
```

## Prerequisites

- An active AWS account with programmatic access enabled (IAM user with S3 permissions).
- An AWS Access Key ID and Secret Access Key with at least `s3:CreateBucket` permission.
- The target AWS region where the S3 bucket will be created (e.g., `us-east-1`).

## Setting up the aws.s3 integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](../../../../develop/create-integrations/create-a-new-integration.md) guide to set up your integration first, then return here to add the connector.

## Adding the aws.s3 connector

### Step 1: Open the connector palette

Select **Add Connection** (or the **+** icon next to the **Connections** heading in the sidebar) to open the connector search palette.
![Connector palette open showing the search field and connector list before any search is entered](/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_01_palette.png)

### Step 2: Search for and select the aws.s3 connector

1. In the palette search box, enter **aws.s3**.
2. Wait for the search results to display the `ballerinax/aws.s3` connector card.
3. Select the **ballerinax/aws.s3** connector card to open the connection configuration form.

## Configuring the aws.s3 connection

### Step 3: Bind the aws.s3 connection parameters to configurable variables

Use the helper panel to create and bind a dedicated configurable variable for each of the three connection fields—**Access Key Id**, **Secret Access Key**, and **Region**:

1. Select the **Config** field, switch to **Expression** mode, then select **Open Helper Panel**, go to the **Configurables** tab, select **+ New Configurable**, set the variable name to `accessKeyId` with type `string`, and select **Save**.
2. Repeat for `secretAccessKey`: select **+ New Configurable**, set the variable name to `secretAccessKey` with type `string`, and select **Save**.
3. Repeat for `region`: select **+ New Configurable**, set the variable name to `region` with type `string`, and select **Save**.
4. Set the **Config** expression to bind each field to its configurable variable.

- **Access Key Id** : the AWS IAM access key ID used to authenticate requests to Amazon S3
- **Secret Access Key** : the AWS IAM secret access key paired with the access key ID for request signing
- **Region** : the AWS region where S3 operations will be performed (e.g., `us-east-1`, `eu-west-1`). Optional — defaults to `us-east-1` if omitted.

![Connection form showing all three parameters bound to configurable variables before saving](/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_02_connection_form.png)

### Step 4: Save the aws.s3 connection

Select **Save Connection** to persist the connection. The S3 connector entry (`s3Client`) appears on the low-code canvas.
![Integration design canvas showing the S3 connector node in the Connections panel after saving](/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_03_connections_list.png)

### Step 5: Set actual values for your configurables

In the left panel of WSO2 Integrator, select **Configurations** (listed at the bottom of the project tree, under Data Mappers) to open the Configurations panel. Set a value for each configurable:

- **accessKeyId** (string) : your AWS IAM access key ID
- **secretAccessKey** (string) : your AWS IAM secret access key
- **region** (string) : the target AWS region for S3 operations (e.g., `us-east-1`). Defaults to `us-east-1` if not set.

## Configuring the aws.s3 createBucket operation

### Step 6: Add an automation entry point

1. On the low-code canvas, select **+ Add Artifact** and select **Automation** from the artifact list.
2. If a configuration dialog appears, accept the default trigger settings and select **Create** to add the automation block to the canvas.

### Step 7: Select the createBucket operation and configure its parameters

1. Inside the automation flow body, select the **+** (Add Step) button between the **Start** and **End/Error Handler** nodes to open the step-addition panel.
2. In the step-addition panel, locate the **Connections** section and select the S3 connection entry (**s3Client**) to expand it and reveal all available operations.

![S3 connection node expanded in the step-addition panel showing all available operations before selection](/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_04_operations_panel.png)

3. Select **Create Bucket** from the list of operations to open its configuration form, then fill in the operation fields.
4. Select **Save** to add the `createBucket` step to the automation flow.

- **Bucket Name** : the name of the new Amazon S3 bucket to create

![createBucket operation configuration form with all input fields filled before saving](/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_05_operation_filled.png)

![Completed automation canvas flow showing Start, s3:createBucket connected to s3Client, Error Handler, and End nodes](/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_06_completed_flow.png)

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/aws.s3_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/aws.s3_connector_sample)
