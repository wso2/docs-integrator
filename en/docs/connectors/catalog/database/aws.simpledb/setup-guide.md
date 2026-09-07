---
connector: true
connector_name: "aws.simpledb"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/aws.simpledb connector."
---

# Setup Guide

Configure your AWS account to grant the connector access to Amazon SimpleDB before initializing the client.

## Prerequisites

- An active AWS account
- Permissions to create IAM users and attach IAM policies in the AWS Management Console or via the AWS CLI

## Confirm SimpleDB availability

Amazon SimpleDB is a legacy service with no AWS Management Console UI. It is available only in the following eight regions:

| Region | Endpoint |
|--------|----------|
| `us-east-1` | `sdb.amazonaws.com` |
| `us-west-1` | `sdb.us-west-1.amazonaws.com` |
| `us-west-2` | `sdb.us-west-2.amazonaws.com` |
| `eu-west-1` | `sdb.eu-west-1.amazonaws.com` |
| `ap-southeast-1` | `sdb.ap-southeast-1.amazonaws.com` |
| `ap-southeast-2` | `sdb.ap-southeast-2.amazonaws.com` |
| `ap-northeast-1` | `sdb.ap-northeast-1.amazonaws.com` |
| `sa-east-1` | `sdb.sa-east-1.amazonaws.com` |

:::note
The `us-east-1` region uses the region-less `sdb.amazonaws.com` host; the connector resolves this automatically. For new applications, AWS recommends Amazon DynamoDB instead of SimpleDB.
:::

## Obtain IAM credentials

Create an IAM user for the integration, then generate an access key ID and secret access key for it.

### Create an IAM user

1. In the AWS Management Console, search for **IAM** in the services search bar and select it.

   ![Search IAM](/img/connectors/catalog/database/aws.simpledb/setup/create-user-1.png)

2. Select **Users** in the left navigation pane.

   ![Select Users](/img/connectors/catalog/database/aws.simpledb/setup/create-user-2.png)

3. Select **Create user**.

   ![Create user](/img/connectors/catalog/database/aws.simpledb/setup/create-user-3.png)

4. Enter a suitable **User name** and select **Next**.

   ![Specify user details](/img/connectors/catalog/database/aws.simpledb/setup/specify-user-details.png)

5. Add the required permissions by adding the user to a group, copying permissions, or attaching policies directly. Attach the policy from [Attach SimpleDB permissions](#attach-simpledb-permissions) below, or select **Next** and attach it once the user exists.

   ![Set user permissions](/img/connectors/catalog/database/aws.simpledb/setup/set-user-permissions.png)

6. Review the details and select **Create user**.

   ![Review and create user](/img/connectors/catalog/database/aws.simpledb/setup/review-create-user.png)

### Get the access key ID and secret access key

1. Select the user you just created from the **Users** list.

   ![Select user](/img/connectors/catalog/database/aws.simpledb/setup/users.png)

2. Go to the **Security credentials** tab and select **Create access key**.

   ![Create access key](/img/connectors/catalog/database/aws.simpledb/setup/create-access-key-1.png)

3. Select your use case and select **Next**.

   ![Select use case](/img/connectors/catalog/database/aws.simpledb/setup/select-usecase.png)

4. Copy the **Access key ID** and **Secret access key**. Use these credentials to authenticate your integration.

   ![Retrieve access key](/img/connectors/catalog/database/aws.simpledb/setup/retrieve-access-key.png)

:::warning
The secret access key is shown only once. Copy both values immediately or download the CSV file. If lost, you must create a new access key pair.
:::

## Attach SimpleDB permissions

Attach an IAM policy to the user that grants the specific SimpleDB actions your application requires. `ListDomains` operates across the account and takes no domain resource, so it must use a wildcard resource. Every other action, including `CreateDomain`, is scoped to the domain ARN.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sdb:ListDomains",
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "sdb:CreateDomain",
                "sdb:DomainMetadata",
                "sdb:DeleteDomain",
                "sdb:GetAttributes",
                "sdb:PutAttributes",
                "sdb:DeleteAttributes",
                "sdb:Select"
            ],
            "Resource": "arn:aws:sdb:<REGION>:<ACCOUNT_ID>:domain/<DOMAIN_NAME>"
        }
    ]
}
```

:::note
Replace `<REGION>`, `<ACCOUNT_ID>`, and `<DOMAIN_NAME>` with the values appropriate for your deployment. Use `domain/*` as the resource only if you intend to grant access to all domains in the account.
:::

## Next steps

- [Action Reference](actions.md) - Available operations