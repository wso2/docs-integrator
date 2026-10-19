---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an AWS account and obtaining the credentials required to use the AWS SQS connector.

## Step 1: Log in to the AWS Console

Access the [AWS Management Console](https://console.aws.amazon.com/). New users can [sign up for a free account](https://aws.amazon.com/free/).

## Step 2: Create an IAM user

1. In the AWS Management Console, search for **IAM** in the services search bar and select it.

   <ThemedImage
       alt="Search IAM"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/create-user-1.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/create-user-1.png'),
       }}
   />

2. Select **Users** in the left navigation pane.

   <ThemedImage
       alt="Select Users"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/create-user-2.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/create-user-2.png'),
       }}
   />

3. Select **Create user**.

   <ThemedImage
       alt="Create user"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/create-user-3.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/create-user-3.png'),
       }}
   />

4. Enter a suitable **User name** and select **Next**.

   <ThemedImage
       alt="Specify user details"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/specify-user-details.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/specify-user-details.png'),
       }}
   />

5. Set permissions by adding the user to a group, copying permissions, or attaching policies directly (for example, **AmazonSQSFullAccess**). Select **Next**.

   <ThemedImage
       alt="Set user permissions"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/set-user-permissions.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/set-user-permissions.png'),
       }}
   />

6. Review the details and select **Create user**.

   <ThemedImage
       alt="Review and create user"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/review-create-user.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/review-create-user.png'),
       }}
   />

## Step 3: Get the access key ID and secret access key

1. Select the user you just created from the **Users** list.

   <ThemedImage
       alt="Select user"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/users.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/users.png'),
       }}
   />

2. Go to the **Security credentials** tab and select **Create access key**.

   <ThemedImage
       alt="Create access key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/create-access-key-1.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/create-access-key-1.png'),
       }}
   />

3. Select your use case and select **Next**.

   <ThemedImage
       alt="Select use case"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/select-usecase.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/select-usecase.png'),
       }}
   />

4. Copy the **Access key ID** and **Secret access key**. Use these credentials to authenticate your integration with Amazon SQS.

   <ThemedImage
       alt="Retrieve access key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/retrieve-access-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/messaging/aws.sqs/setup/retrieve-access-key.png'),
       }}
   />

The secret access key is shown only once. Copy both values immediately or download the CSV file. If lost, you must create a new access key pair.
