# Example

## What you'll build

This integration demonstrates how to connect to Amazon Web Services Simple Storage Service (S3) using the AWS S3 connector in WSO2 Integrator. The workflow uses an Automation entry point to invoke the `createBucket` operation, which creates a new S3 bucket in the specified AWS region.

**Operations used:**
- **createBucket** : creates a new Amazon S3 bucket in the specified AWS region using the provided bucket name

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[Create Bucket]
    B --> C[AWS S3 Connector]
    C --> D[(Amazon S3)]
```

## Prerequisites

- An active AWS account with programmatic access enabled (IAM user with S3 permissions).
- An AWS Access Key ID and Secret Access Key with at least `s3:CreateBucket` permission.
- The target AWS region where the S3 bucket will be created (e.g., `us-east-1`).

## Setting up the AWS S3 integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the AWS S3 connector

### Step 1: Open the connector palette and select the AWS S3 connector

1. Select **Add Connection** (or the **+** icon next to the **Connections** heading in the sidebar) to open the connector palette.
2. In the palette search box, enter **AWS S3**.
3. Select the **ballerinax/aws.s3** connector card to open the connection configuration form.

<ThemedImage
    alt="Connector palette open showing the search field and connector list before any search is entered"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_01_palette.png'),
    }}
/>

## Configuring the AWS S3 connection

### Step 2: Bind the AWS S3 connection parameters to configurable variables

Select the **Config** field, switch to **Expression** mode, then use the **Configurables** tab in the helper panel to create one variable for each connection field:

- **Access Key Id** (string) : the AWS IAM access key ID used to authenticate requests to Amazon S3
- **Secret Access Key** (string) : the AWS IAM secret access key paired with the access key ID for request signing
- **Region** (string) : the AWS region where S3 operations will be performed (e.g., `us-east-1`, `eu-west-1`). Optional: defaults to `us-east-1` if omitted.

After creating all three configurables, bind each connection field to its configurable variable and set **Connection Name** to `s3Client`.

<ThemedImage
    alt="Connection form showing all three parameters bound to configurable variables before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_02_connection_form.png'),
    }}
/>

### Step 3: Save the AWS S3 connection

Select **Save Connection** to persist the connection. The S3 connector entry (`s3Client`) appears on the canvas.

<ThemedImage
    alt="Integration design canvas showing the S3 connector node in the Connections panel after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_03_connections_list.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_03_connections_list.png'),
    }}
/>

### Step 4: Set actual values for your configurables

1. In the left panel, select **Configurations**.
2. Set a value for each configurable listed below.

- **accessKeyId** (string) : your AWS IAM access key ID
- **secretAccessKey** (string) : your AWS IAM secret access key
- **region** (string) : the target AWS region for S3 operations (e.g., `us-east-1`). Defaults to `us-east-1` if not set.

## Configuring the AWS S3 createBucket operation

### Step 5: Add an automation entry point

1. Select **+ Add Artifact** on the canvas toolbar.
2. Under **Automation**, select the **Automation** tile.
3. Select **Create**. No additional configuration is needed.

The automation entry point appears in the sidebar under **Entry Points**, and the canvas switches to the Automation flow editor showing a **Start** node.

### Step 6: Select the createBucket operation and configure its parameters

1. Inside the automation flow body, select the **+** (Add Step) button between the **Start** and **End/Error Handler** nodes to open the step-addition panel.
2. In the step-addition panel, locate the **Connections** section and select the S3 connection entry (**s3Client**) to expand it and reveal all available operations.

<ThemedImage
    alt="S3 connection node expanded in the step-addition panel showing all available operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_04_operations_panel.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_04_operations_panel.png'),
    }}
/>

3. Select **Create Bucket** from the list of operations to open its configuration form, then fill in the operation fields.

- **Bucket Name** : the name of the new Amazon S3 bucket to create

<ThemedImage
    alt="createBucket operation configuration form with all input fields filled before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_05_operation_filled.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_05_operation_filled.png'),
    }}
/>

4. Select **Save** to add the `createBucket` step to the automation flow.

<ThemedImage
    alt="Completed automation canvas flow showing Start, s3:createBucket connected to s3Client, Error Handler, and End nodes"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/aws_s3_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/aws.s3_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/aws.s3_connector_sample)

## More code examples

The `ballerinax/aws.s3` connector provides practical examples illustrating usage in various scenarios. Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-aws.s3/tree/master/examples):

1. [**S3 report archiver**](https://github.com/ballerina-platform/module-ballerinax-aws.s3/tree/master/examples/s3-report-archiver) – Implements an ETL-style workflow that reads CSV reports, transforms them, and archives the results to an S3 bucket for long-term storage.

2. [**FTP to S3 sync**](https://github.com/ballerina-platform/module-ballerinax-aws.s3/tree/master/examples/ftp-to-s3-sync) – Syncs files from an FTP server to an S3 bucket and generates a summary report of skipped or failed transfers.
