---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an AWS account and obtaining the credentials required to use the AWS SQS connector.

## Step 1: Log in to the AWS Console

Access the [AWS Management Console](https://console.aws.amazon.com/). New users can [sign up for a free account](https://aws.amazon.com/free/).

## Step 2: Create an IAM user

1. In the AWS Management Console, search for **IAM** in the services search bar and select it.

   ![Search IAM](/img/connectors/catalog/messaging/aws.sqs/setup/create-user-1.png)

2. Select **Users** in the left navigation pane.

   ![Select Users](/img/connectors/catalog/messaging/aws.sqs/setup/create-user-2.png)

3. Select **Create user**.

   ![Create user](/img/connectors/catalog/messaging/aws.sqs/setup/create-user-3.png)

4. Enter a suitable **User name** and select **Next**.

   ![Specify user details](/img/connectors/catalog/messaging/aws.sqs/setup/specify-user-details.png)

5. Set permissions by adding the user to a group, copying permissions, or attaching policies directly (for example, **AmazonSQSFullAccess**). Select **Next**.

   ![Set user permissions](/img/connectors/catalog/messaging/aws.sqs/setup/set-user-permissions.png)

6. Review the details and select **Create user**.

   ![Review and create user](/img/connectors/catalog/messaging/aws.sqs/setup/review-create-user.png)

## Step 3: Get the access key ID and secret access key

1. Select the user you just created from the **Users** list.

   ![Select user](/img/connectors/catalog/messaging/aws.sqs/setup/users.png)

2. Go to the **Security credentials** tab and select **Create access key**.

   ![Create access key](/img/connectors/catalog/messaging/aws.sqs/setup/create-access-key-1.png)

3. Select your use case and select **Next**.

   ![Select use case](/img/connectors/catalog/messaging/aws.sqs/setup/select-usecase.png)

4. Copy the **Access key ID** and **Secret access key**. Use these credentials to authenticate your integration with Amazon SQS.

   ![Retrieve access key](/img/connectors/catalog/messaging/aws.sqs/setup/retrieve-access-key.png)

The secret access key is shown only once. Copy both values immediately or download the CSV file. If lost, you must create a new access key pair.
