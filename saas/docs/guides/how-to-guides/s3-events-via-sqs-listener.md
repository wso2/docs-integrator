---
title: File Integrations on S3 File Events
---

# File Integrations on S3 File Events

This integration triggers an action each time a file is uploaded to an Amazon S3 bucket. AWS does not have a built-in trigger for S3, and one of the recommended approaches is to publish these events to an AWS SQS queue. S3 publishes an object-created notification to the queue, and the AWS SQS trigger consumes it — so your service reacts within seconds of the upload without polling S3.

**What you'll build:** A Ballerina integration that reacts every time a file is uploaded to an S3 bucket. S3 pushes a notification to an SQS queue; the `aws.sqs` listener picks it up and your service logs the S3 event details without polling S3 directly.

## How it works

```text
S3 Bucket  ──(ObjectCreated)──►  SQS Queue  ──(poll)──►  sqs:Listener  ──►  onMessage callback
```

1. A file is uploaded to the S3 bucket.
2. S3 sends a JSON event notification to the SQS queue.
3. The `sqs:Listener` polls the queue, receives the message, and invokes `onMessage`.
4. Your service parses the S3 event and logs the event details.

## Before you begin

:::info Prerequisites

- An AWS account with permissions to manage S3, SQS, and IAM.
- A working WSO2 Integrator environment. See [Setup](../../get-started/setup/setup.md).
- AWS Access Key ID and Secret Access Key for an IAM user who has the necessary `sqs:ReceiveMessage`, `sqs:DeleteMessage`, and `sqs:GetQueueAttributes` permissions on your SQS queue. See the [AWS SQS Setup Guide](product://connectors/catalog/messaging/aws.sqs/setup-guide) if you need to create credentials.

## Part 1: Configure AWS

### Step 1: Create the SQS queue

1. Open the [SQS Console](https://console.aws.amazon.com/sqs/) and select **Create queue**.
2. Choose **Standard** queue type.
3. Give the queue a name, for example `s3-events`, and complete the creation.
4. Once created, open the queue and copy the **URL** shown in the details panel (for example `https://sqs.us-east-1.amazonaws.com/123456789012/s3-events`). You will need this value in [Step 7](#step-7-add-an-aws-sqs-trigger).

### Step 2: Create the S3 bucket

1. Open the [S3 Console](https://console.aws.amazon.com/s3/) and select **Create bucket**.
2. Enter a unique bucket name. When choosing a bucket namespace, select the **Account Regional namespace (recommended)**, which ensures the bucket name is unique to your account and region. If you use the default global namespace instead, the name must be globally unique. Learn more about [bucket namespaces](https://docs.aws.amazon.com/AmazonS3/latest/userguide/gpbucketnamespaces.html).

### Step 3: Grant S3 permission to write to the queue

S3 needs explicit permission to publish messages to your queue. Open the queue you created in Step 1, go to **Access policy**, and add the following statement inside the `Statement` array of the existing policy. Replace the placeholders with your own values — use the bucket name you chose in Step 2 for `<your-bucket-name>`.

:::tip Finding your AWS account ID
Your 12-digit account ID appears in the top-right corner of the AWS Console when you select your account name. You can also find it in the queue ARN shown on the queue details page (for example `arn:aws:sqs:us-east-1:123456789012:s3-events` — here `123456789012` is the account ID).

```json
{
  "Sid": "allow-s3-send-message",
  "Effect": "Allow",
  "Principal": {
    "Service": "s3.amazonaws.com"
  },
  "Action": "SQS:SendMessage",
  "Resource": "arn:aws:sqs:<region>:<account-id>:s3-events",
  "Condition": {
    "ArnLike": {
      "aws:SourceArn": "arn:aws:s3:::<your-bucket-name>"
    },
    "StringEquals": {
      "aws:SourceAccount": "<account-id>"
    }
  }
}
```

Save the updated policy.

### Step 4: Configure S3 event notifications

Link the bucket to the queue so S3 knows where to send events.

1. Open your bucket and go to the **Properties** tab.
2. Scroll to **Event notifications** and select **Create event notification**.
3. Enter an **Event name**, for example `object-created`.
4. Under **Event types**, expand **Object creation** and select **All object create events** (`s3:ObjectCreated:*`).
5. Under **Destination**, select **SQS queue**. Choose **Choose from your SQS queues** and select the `s3-events` queue you created in Step 1.
6. Select **Save changes**.

:::tip Verify the setup
Upload any `.csv` file to the bucket. Open the SQS console, select **Send and receive messages**, and click **Poll for messages**. You should see a JSON message appear. You may also see a one-off `s3:TestEvent` message immediately after configuration — that is normal and can be safely deleted.

---

## Part 2: Build the Ballerina integration

### Step 5: Create the integration

Create a new integration project in WSO2 Integrator. Add the `Integration Name` as `s3-file-event-listener`.

<ThemedImage
    alt="Create the s3-file-event-listener project"
    sources={{
        light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-and-sqs-integration.png'),
        dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-and-sqs-integration.png'),
    }}
/>

### Step 6: Create the record types

Define the record types that map to the S3 event notification JSON structure. These types let Ballerina parse the incoming SQS message body into typed records.

Add two **Record Type** artifacts to the project:

1. Go to **Add Artifact** and select **Type**. Select the **Import** tab and set the name to `S3EventRecord`. Provide a JSON sample like below:

    ```json
    {
      "eventSource": "aws:s3",
      "eventName": "ObjectCreated:Put",
      "eventTime": "2026-08-21T07:30:00Z",
      "awsRegion": "us-east-1",
      "s3": {
        "bucket": {
          "name": "my-example-bucket",
          "arn": "arn:aws:s3:::my-example-bucket"
        },
        "object": {
          "key": "documents/example.txt",
          "size": 1024,
          "eTag": "9b2cf535f27731c974343645a3985328"
        }
      }
    }
    ```

    <ThemedImage
        alt="Import JSON to generate the S3EventRecord type"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-event-record-import.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-event-record-import.png'),
        }}
    />

2. Select **Import** to generate the types. This creates the `S3EventRecord` type along with its nested types (`S3`, `Bucket`, and `Object`).
    <ThemedImage
        alt="Generated S3EventRecord type diagram"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-event-record-type.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-event-record-type.png'),
        }}
    />

3. Make sure **Allow Additional Fields** is checked for **each generated type**, since the actual S3 notification JSON can contain additional fields beyond the ones defined here.

    <ThemedImage
        alt="Allow Additional Fields checked for generated types"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/allow-additional-fields.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/allow-additional-fields.png'),
        }}
    />

4. Select **+ Add Type** and choose **Create from scratch**. Set the name to `S3Notification`. Select the **+** icon on fields, set the field name to `Records`, and set the type to `S3EventRecord[]`. Check **Allow Additional Fields** for this type as well.

    <ThemedImage
        alt="Create S3Notification type from scratch"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-notification-record.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-notification-record.png'),
        }}
    />

5. Select **Save**. The complete type diagram shows the `S3Notification` type linked to the `S3EventRecord` array and its nested types.

    <ThemedImage
        alt="Complete type diagram with S3Notification"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-notification-type.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/s3-notification-type.png'),
        }}
    />

### Step 7: Add an AWS SQS Trigger

1. Go to the integration home and select Add Artifact. Under Event Integration, Select the **AWS SQS** trigger to open the listener configuration form.

2. Fill in the connection parameters:

    | Field | Value |
    |---|---|
    | Region | The AWS region where your SQS queue is located, for example `us-east-1` |
    | Access Key ID | Your AWS Access Key ID (use a configurable). To create these credentials, go to the [IAM Console](https://console.aws.amazon.com/iam/) → **Users** → select your user → **Security credentials** tab → **Create access key**. See the [AWS SQS Setup Guide](product://connectors/catalog/messaging/aws.sqs/setup-guide) for detailed steps. |
    | Secret Access Key | The secret key generated alongside the Access Key ID above (use a configurable). Copy it when it is first shown — AWS does not display it again. |
    | Queue URL | The full URL you copied from the SQS queue details page in Step 1, for example `https://sqs.us-east-1.amazonaws.com/123456789012/s3-events` |
    | Poll Interval | `30` (seconds between polls) |
    | Wait Time | `20` (long-poll duration in seconds) |
    | Visibility Timeout | `30` (seconds a received message is hidden from other consumers) |

    :::tip Best practice
    Bind `accessKeyId`, `secretAccessKey`, and `queueUrl` to configurable variables rather than hardcoding them. In the expression editor, select **Configurables → New Configurable** to create a runtime-supplied value.
    :::

    <ThemedImage
        alt="SQS trigger configurations"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/sqs-trigger-configurations.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/sqs-trigger-configurations.png'),
        }}
    />

### Step 8: Implement the service callbacks

Switch to the **Ballerina Code** tab to see the full source, or continue building in the **Visual Designer**.

1. After adding the SQS Trigger artifact and configuring the listener as described in Step 7, select **+ Add Handler** and choose **On Message** to add the `onMessage` callback.

    <ThemedImage
        alt="Add the onMessage handler to the SQS trigger"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/add-sqs-handler.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/add-sqs-handler.png'),
        }}
    />

2. Open the `onMessage` callback. Add a **printInfo** node under the **Logging** section with the message `"New S3 events are received"` to log when new events arrive.

    <ThemedImage
        alt="Add a log node for new S3 events"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/log-printinfo-node.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/log-printinfo-node.png'),
        }}
    />

3. Add a **Declare Variable** node — name it `body`, set the type to `string`, and set the expression to `check message.body.ensureType()`.

    <ThemedImage
        alt="Declare the body variable"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/declare-variable-body.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/declare-variable-body.png'),
        }}
    />

4. Add a **Call Function** node and search for the `fromJsonStringWithType` function.

    <ThemedImage
        alt="Search for the fromJsonStringWithType function"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/from-json-string-with-type.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/from-json-string-with-type.png'),
        }}
    />

    For **Str**, select `body` from variables. Set the **Result** variable name to `notification`, and set **T\*** to `S3Notification`.

    <ThemedImage
        alt="Configure the fromJsonStringWithType function parameters"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/call-function.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/call-function.png'),
        }}
    />

5. Add a **Foreach** node — set the collection to `notification.Records`, the variable name to `eventRecord`, and the variable type to `S3EventRecord`.

    <ThemedImage
        alt="Add a foreach loop over notification events"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/foreach-loop-node.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/foreach-loop-node.png'),
        }}
    />

6. Inside the foreach loop, add a **printInfo** node under the **Logging** section. Set the message to a brief summary of the event using the following expression:

    ```ballerina
    string `Event: ${eventRecord.eventName}, Bucket: ${eventRecord.s3.bucket.name}, File: ${eventRecord.s3.'object.'key}`
    ```

    <ThemedImage
        alt="Log each event record with brief info"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/log-printinfo-s3-events.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/log-printinfo-s3-events.png'),
        }}
    />

7. The complete `onMessage` flow should look like this:

    <ThemedImage
        alt="Complete onMessage callback flow"
        sources={{
            light: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/final-view.png'),
            dark: useBaseUrl('/img/guides/usecases/s3-events-via-sqs-listener/final-view.png'),
        }}
    />

The integration produces the following files. Create or update them as shown below.

**`Ballerina.toml`** — the package descriptor for the integration:

```toml
[package]
org = "wso2"
name = "s3_file_event_listener"
version = "0.1.0"
distribution = "2201.13.4"

[build-options]
sticky = true
```

**`Config.toml`** — supply your actual AWS credentials and queue URL at runtime (never commit this file):

```toml
accessKeyId = "<your-access-key-id>"
secretAccessKey = "<your-secret-access-key>"
# Use the queue URL you copied in Step 1
queueUrl = "https://sqs.us-east-1.amazonaws.com/<account-id>/s3-events"
```

**`types.bal`** — types that mirror the S3 event notification structure:

```ballerina
public type Bucket record {
    string name;
    string arn;
};

public type Object record {
    string 'key;
    int size;
    string eTag;
};

public type S3 record {
    Bucket bucket;
    Object 'object;
};

public type S3EventRecord record {
    string eventSource;
    string eventName;
    string eventTime;
    string awsRegion;
    S3 s3;
};

type S3Notification record {
    S3EventRecord[] Records;
};
```

**`config.bal`** — configurable variables supplied via Config.toml at runtime:

```ballerina
configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;
configurable string queueUrl = ?;
```

**`main.bal`** — the listener and service logic:

```ballerina
import ballerina/lang.value;
import ballerina/log;
import ballerinax/aws.sqs;

listener sqs:Listener sqsListener = new (
    {
        region: "us-east-1",
        auth: {
            accessKeyId: string `${accessKeyId}`,
            secretAccessKey: string `${secretAccessKey}`
        }
    },
    {
        pollInterval: 30,
        waitTime: 20,
        visibilityTimeout: 30
    }
);

@sqs:ServiceConfig {queueUrl: string `${queueUrl}`}
service sqs:Service on sqsListener {
    remote function onMessage(sqs:Message message) returns error? {
        do {
            log:printInfo("New S3 events are received");
            string body = check message.body.ensureType();
            S3Notification notification = check value:fromJsonStringWithType(string `${body}`);
            foreach S3EventRecord eventRecord in notification.Records {
                log:printInfo(string `Event: ${eventRecord.eventName}, Bucket: ${eventRecord.s3.bucket.name}, File: ${eventRecord.s3.'object.'key}`);
            }
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }

}
```

---

## Step 9: Run and verify

1. Open **Configurations** in WSO2 Integrator and supply your AWS credentials and queue URL.
2. Run the integration.
3. Upload a file to your S3 bucket.

Within seconds the terminal should print output similar to:

```text
time=2026-08-26T16:05:44.852+05:30 level=INFO module=user/s3_and_sqs_integration message="New S3 events are received"
time=2026-08-26T16:05:44.852+05:30 level=INFO module=user/s3_and_sqs_integration message="Event: ObjectCreated:Put, Bucket: my-example-bucket, File: documents/example.txt"
```

:::note Troubleshooting
- **No messages appear** — verify the SQS access policy includes the S3 `SendMessage` permission and the `aws:SourceArn` condition matches your bucket ARN exactly.
- **Parse error** — print the raw `message.body` value and compare it against the [S3 Event Message Structure](https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html) to check if field names have changed.
- **Test event causes a parse failure** — S3 sends a one-off `s3:TestEvent` message when you first configure event notifications. This message has a different structure and does not contain a `Records` array. You can safely delete it from the SQS console.

---

## What's next

Now that your listener is consuming S3 events, extend the integration further:

- **Read the CSV from S3** — use the `ballerinax/aws.s3` connector's `getObject` action to download the file content inside `onMessage`, then parse it with `ballerina/data.csv`.
- **Filter by prefix** — add a prefix filter (for example `uploads/`) to the S3 event notification configuration in Step 4 so only files under that path trigger events.
- **Fan out to multiple consumers** — subscribe additional SQS queues to an SNS topic and have the S3 bucket notify the topic instead. Each downstream queue can run a separate Ballerina listener.
- **Deploy the integration** — ship to [WSO2 Cloud](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md), a [Docker container](../../deploy-and-run/self-hosted/containerized-deployment.md#docker-deployment), or [Kubernetes](../../deploy-and-run/self-hosted/containerized-deployment.md#kubernetes-deployment) for production use.
