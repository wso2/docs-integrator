---
connector: true
connector_name: "aws.ses"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The AWS SES connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Send email and manage identities, contact lists, and templates in an Amazon SES account |

---

## Client

The `Client` provides operations for sending email and managing the identities, contact lists, and templates that an Amazon SES account uses.

### Configuration

`ConnectionConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>auth:AuthConfig</code> | Required | Authentication configuration: static credentials, an AWS profile, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), an external credential process, or the default credential provider chain |
| `region` | <code>aws:Region&#124;string</code> | Required | AWS region: an `aws:Region` enum member or a plain region string (e.g., `"us-east-1"`) for regions not yet in the enum |
| `endpoint` | <code>aws:EndpointConfig</code> | — | Optional endpoint options: FIPS/dualstack variants, or a custom endpoint override (e.g. LocalStack, VPC interface endpoints) |

The client also accepts the standard Ballerina HTTP client options (`timeout`, `retryConfig`, `secureSocket`, `proxy`, and the rest of `http:ClientConfiguration`), which are omitted here.

### Initializing the client

```ballerina
import ballerinax/aws.ses;

ses:ConnectionConfig config = {
    auth: {
        accessKeyId: "<AWS_ACCESS_KEY_ID>",
        secretAccessKey: "<AWS_SECRET_ACCESS_KEY>"
    },
    region: "us-east-1"
};
ses:Client client = check new (config);
```

### Operations

#### Email sending

<details>
<summary>sendEmail</summary>

<div>

Sends an email message. The message may be `simple` — a subject and a body that Amazon SES assembles — `raw`, a MIME message carrying its own headers and any attachments, or `template`, whose personalization tags Amazon SES replaces with the values supplied.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>SendEmailInput</code> | Yes | The details of the message to send |

**Returns:** `SendEmailOutput|Error`

**Sample code:**

```ballerina
ses:SendEmailOutput result = check client->sendEmail({
    fromEmailAddress: "sender@example.com",
    destination: {toAddresses: ["recipient@example.com"]},
    replyToAddresses: ["sender@example.com"],
    content: {
        simple: {
            subject: {data: "Your order has shipped", charset: "UTF-8"},
            body: {
                html: {data: "<html><body><p>It is on its way.</p></body></html>", charset: "UTF-8"},
                text: {data: "It is on its way.", charset: "UTF-8"}
            }
        }
    }
});
```

**Sample response:**

```json
{
  "messageId": "0102018e1234abcd-12345678-abcd-1234-abcd-1234567890ab-000000"
}
```

</div>
</details>

<details>
<summary>sendBulkEmail</summary>

<div>

Composes a templated email message to many destinations. Each entry carries its own recipients and its own replacement values; the result carries one outcome per entry, in the order the entries were given.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>SendBulkEmailInput</code> | Yes | The details of the messages to send |

**Returns:** `SendBulkEmailOutput|Error`

**Sample code:**

```ballerina
ses:SendBulkEmailOutput result = check client->sendBulkEmail({
    fromEmailAddress: "sender@example.com",
    defaultContent: {
        template: {
            templateName: "OrderShipped",
            templateData: "{\"name\":\"there\",\"orderId\":\"unknown\"}"
        }
    },
    bulkEmailEntries: [
        {
            destination: {toAddresses: ["recipient@example.com"]},
            replacementEmailContent: {
                replacementTemplate: {
                    replacementTemplateData: "{\"name\":\"Sam\",\"orderId\":\"SO-4418\"}"
                }
            }
        }
    ]
});
```

**Sample response:**

```json
{
  "bulkEmailEntryResults": [
    {
      "status": "SUCCESS",
      "messageId": "0102018e1234abcd-12345678-abcd-1234-abcd-1234567890ab-000000"
    }
  ]
}
```

</div>
</details>

<details>
<summary>sendCustomVerificationEmail</summary>

<div>

Adds an email address to the account's identities and sends it a custom verification email. A custom verification email template has to exist before this operation can be used.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>SendCustomVerificationEmailInput</code> | Yes | The details of the verification email to send |

**Returns:** `SendEmailOutput|Error`

**Sample code:**

```ballerina
ses:SendEmailOutput result = check client->sendCustomVerificationEmail({
    emailAddress: "supplier@example.com",
    templateName: "SupplierVerification"
});
```

**Sample response:**

```json
{
  "messageId": "0102018e5678efgh-87654321-efgh-5678-efgh-0987654321ba-000000"
}
```

</div>
</details>

#### Email identity management

<details>
<summary>createEmailIdentity</summary>

<div>

Starts the process of verifying an email identity — an email address or a domain that email is sent from. An identity has to be verified before it can be used as a sending address. Verifying a domain without supplying `dkimSigningAttributes` returns the DKIM tokens to add to the domain's DNS configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>CreateEmailIdentityInput</code> | Yes | The details of the email identity to create |

**Returns:** `CreateEmailIdentityOutput|Error`

**Sample code:**

```ballerina
ses:CreateEmailIdentityOutput identity = check client->createEmailIdentity({
    emailIdentity: "sender@example.com"
});
```

**Sample response:**

```json
{
  "identityType": "EMAIL_ADDRESS",
  "verifiedForSendingStatus": false,
  "dkimAttributes": {
    "signingAttributesOrigin": "AWS_SES",
    "signingEnabled": false,
    "status": "NOT_STARTED",
    "tokens": []
  }
}
```

</div>
</details>

<details>
<summary>getEmailIdentity</summary>

<div>

Returns information about an identity, including its verification status, its sending authorization policies, its DKIM authentication status, and its custom MAIL FROM settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailIdentity` | <code>string</code> | Yes | The email address or domain of the identity |

**Returns:** `EmailIdentityDetails|Error`

**Sample code:**

```ballerina
ses:EmailIdentityDetails identity = check client->getEmailIdentity("sender@example.com");
```

**Sample response:**

```json
{
  "identityType": "EMAIL_ADDRESS",
  "verificationStatus": "SUCCESS",
  "verifiedForSendingStatus": true,
  "dkimAttributes": {
    "signingAttributesOrigin": "AWS_SES",
    "signingEnabled": true,
    "status": "SUCCESS",
    "tokens": ["token1", "token2", "token3"]
  },
  "mailFromAttributes": {
    "mailFromDomain": "",
    "mailFromDomainStatus": "NOT_STARTED",
    "behaviorOnMxFailure": "USE_DEFAULT_VALUE"
  },
  "feedbackForwardingStatus": true
}
```

</div>
</details>

<details>
<summary>listEmailIdentities</summary>

<div>

Lists the email identities associated with the AWS account, verified and unverified alike, fetching each page as the previous one is consumed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>ListEmailIdentitiesInput</code> | No | The details of the identities to list (default: `{}`) |

**Returns:** `stream<IdentityInfo, Error?>`

**Sample code:**

```ballerina
stream<ses:IdentityInfo, ses:Error?> identities = client->listEmailIdentities();
check from ses:IdentityInfo identity in identities
    do {
        // process identity
    };
```

**Sample response:**

```json
[
  {
    "identityName": "sender@example.com",
    "identityType": "EMAIL_ADDRESS",
    "sendingEnabled": true,
    "verificationStatus": "SUCCESS"
  },
  {
    "identityName": "example.com",
    "identityType": "DOMAIN",
    "sendingEnabled": true,
    "verificationStatus": "SUCCESS"
  }
]
```

</div>
</details>

<details>
<summary>deleteEmailIdentity</summary>

<div>

Deletes an email identity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailIdentity` | <code>string</code> | Yes | The email address or domain of the identity to delete |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->deleteEmailIdentity("sender@example.com");
```

</div>
</details>

#### Contact list management

<details>
<summary>createContactList</summary>

<div>

Creates a contact list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>CreateContactListInput</code> | Yes | The details of the contact list to create |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->createContactList({
    contactListName: "ProductNewsletter",
    description: "Monthly product newsletter",
    topics: [
        {
            topicName: "product-updates",
            displayName: "Product updates",
            description: "News about product releases",
            defaultSubscriptionStatus: ses:OPT_OUT
        }
    ]
});
```

</div>
</details>

<details>
<summary>updateContactList</summary>

<div>

Updates the metadata of a contact list. This operation does a complete replacement of the description and the topics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactListName` | <code>string</code> | Yes | The name of the contact list |
| `request` | <code>UpdateContactListInput</code> | Yes | The details to replace the contact list's metadata with |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->updateContactList("ProductNewsletter", {
    description: "Weekly product news",
    topics: [
        {
            topicName: "product-updates",
            displayName: "Product updates",
            description: "News about product releases",
            defaultSubscriptionStatus: ses:OPT_OUT
        }
    ]
});
```

</div>
</details>

<details>
<summary>getContactList</summary>

<div>

Returns the metadata of a contact list. It does not return any information about the contacts in the list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactListName` | <code>string</code> | Yes | The name of the contact list |

**Returns:** `ContactListDetails|Error`

**Sample code:**

```ballerina
ses:ContactListDetails contactList = check client->getContactList("ProductNewsletter");
```

**Sample response:**

```json
{
  "contactListName": "ProductNewsletter",
  "description": "Monthly product newsletter",
  "topics": [
    {
      "topicName": "product-updates",
      "displayName": "Product updates",
      "description": "News about product releases",
      "defaultSubscriptionStatus": "OPT_OUT"
    }
  ],
  "createdTimestamp": 1700000000.0,
  "lastUpdatedTimestamp": 1700000000.0
}
```

</div>
</details>

<details>
<summary>listContactLists</summary>

<div>

Lists the contact lists available to the account, fetching each page as the previous one is consumed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>ListContactListsInput</code> | No | The details of the contact lists to list (default: `{}`) |

**Returns:** `stream<ContactList, Error?>`

**Sample code:**

```ballerina
stream<ses:ContactList, ses:Error?> contactLists = client->listContactLists();
check from ses:ContactList contactList in contactLists
    do {
        // process contactList
    };
```

**Sample response:**

```json
[
  {
    "contactListName": "ProductNewsletter",
    "lastUpdatedTimestamp": 1700000000.0
  }
]
```

</div>
</details>

<details>
<summary>deleteContactList</summary>

<div>

Deletes a contact list and every contact on it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactListName` | <code>string</code> | Yes | The name of the contact list |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->deleteContactList("ProductNewsletter");
```

</div>
</details>

#### Contact management

<details>
<summary>createContact</summary>

<div>

Creates a contact — an end user receiving the email — and adds them to a contact list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactListName` | <code>string</code> | Yes | The name of the contact list to add the contact to |
| `request` | <code>CreateContactInput</code> | Yes | The details of the contact to create |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->createContact("ProductNewsletter", {
    emailAddress: "reader@example.com",
    topicPreferences: [{topicName: "product-updates", subscriptionStatus: ses:OPT_IN}]
});
```

</div>
</details>

<details>
<summary>updateContact</summary>

<div>

Updates a contact's preferences for a list. A `topicPreferences` value replaces the contact's whole preference list, so it has to carry every existing preference and not only the ones being changed — Amazon SES removes any that are omitted.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactListName` | <code>string</code> | Yes | The name of the contact list the contact belongs to |
| `emailAddress` | <code>string</code> | Yes | The contact's email address |
| `request` | <code>UpdateContactInput</code> | Yes | The details to update the contact with |

**Returns:** `Error?`

**Sample code:**

```ballerina
ses:ContactDetails contact = check client->getContact("ProductNewsletter", "reader@example.com");
ses:TopicPreference[] preferences = from ses:TopicPreference preference in contact.topicPreferences ?: []
    select preference.topicName == "product-updates"
        ? {topicName: preference.topicName, subscriptionStatus: ses:OPT_OUT}
        : preference;

check client->updateContact("ProductNewsletter", "reader@example.com", {
    topicPreferences: preferences
});
```

</div>
</details>

<details>
<summary>getContact</summary>

<div>

Returns a contact from a contact list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactListName` | <code>string</code> | Yes | The name of the contact list the contact belongs to |
| `emailAddress` | <code>string</code> | Yes | The contact's email address |

**Returns:** `ContactDetails|Error`

**Sample code:**

```ballerina
ses:ContactDetails contact = check client->getContact("ProductNewsletter", "reader@example.com");
```

**Sample response:**

```json
{
  "emailAddress": "reader@example.com",
  "contactListName": "ProductNewsletter",
  "topicPreferences": [
    {
      "topicName": "product-updates",
      "subscriptionStatus": "OPT_IN"
    }
  ],
  "topicDefaultPreferences": [
    {
      "topicName": "product-updates",
      "subscriptionStatus": "OPT_OUT"
    }
  ],
  "unsubscribeAll": false,
  "createdTimestamp": 1700000000.0,
  "lastUpdatedTimestamp": 1700000000.0
}
```

</div>
</details>

<details>
<summary>listContacts</summary>

<div>

Lists the contacts of a contact list, fetching each page as the previous one is consumed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactListName` | <code>string</code> | Yes | The name of the contact list |
| `request` | <code>ListContactsInput</code> | No | The details of the contacts to list (default: `{}`) |

**Returns:** `stream<Contact, Error?>`

**Sample code:**

```ballerina
stream<ses:Contact, ses:Error?> contacts = client->listContacts("ProductNewsletter", {
    filter: {
        filteredStatus: ses:OPT_IN,
        topicFilter: {topicName: "product-updates", useDefaultIfPreferenceUnavailable: true}
    },
    pageSize: 50
});
check from ses:Contact contact in contacts
    do {
        // process contact
    };
```

**Sample response:**

```json
[
  {
    "emailAddress": "reader.one@example.com",
    "topicPreferences": [
      {
        "topicName": "product-updates",
        "subscriptionStatus": "OPT_IN"
      }
    ],
    "unsubscribeAll": false,
    "lastUpdatedTimestamp": 1700000000.0
  }
]
```

</div>
</details>

<details>
<summary>deleteContact</summary>

<div>

Removes a contact from a contact list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactListName` | <code>string</code> | Yes | The name of the contact list the contact belongs to |
| `emailAddress` | <code>string</code> | Yes | The contact's email address |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->deleteContact("ProductNewsletter", "reader@example.com");
```

</div>
</details>

#### Email template management

<details>
<summary>createEmailTemplate</summary>

<div>

Creates an email template, which lets one API call send a personalized message to each of many destinations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>CreateEmailTemplateInput</code> | Yes | The details of the email template to create |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->createEmailTemplate({
    templateName: "OrderShipped",
    templateContent: {
        subject: "Order {{orderId}} has shipped",
        html: "<html><body><p>Hello {{name}}, order {{orderId}} is on its way.</p></body></html>",
        text: "Hello {{name}}, order {{orderId}} is on its way."
    }
});
```

</div>
</details>

<details>
<summary>updateEmailTemplate</summary>

<div>

Updates an email template. This operation does a complete replacement of the template's content.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateName` | <code>string</code> | Yes | The name of the template |
| `request` | <code>UpdateEmailTemplateInput</code> | Yes | The content to replace the template's with |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->updateEmailTemplate("OrderShipped", {
    templateContent: {
        subject: "Your order is on its way",
        text: "Hello {{name}}, your order is on its way."
    }
});
```

</div>
</details>

<details>
<summary>getEmailTemplate</summary>

<div>

Returns the template of the given name, including its subject line, its HTML part, and its text part.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateName` | <code>string</code> | Yes | The name of the template |

**Returns:** `EmailTemplateDetails|Error`

**Sample code:**

```ballerina
ses:EmailTemplateDetails template = check client->getEmailTemplate("OrderShipped");
```

**Sample response:**

```json
{
  "templateName": "OrderShipped",
  "templateContent": {
    "subject": "Order {{orderId}} has shipped",
    "html": "<html><body><p>Hello {{name}}, order {{orderId}} is on its way.</p></body></html>",
    "text": "Hello {{name}}, order {{orderId}} is on its way."
  }
}
```

</div>
</details>

<details>
<summary>listEmailTemplates</summary>

<div>

Lists the email templates of the account in the current AWS Region, fetching each page as the previous one is consumed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>ListEmailTemplatesInput</code> | No | The details of the templates to list (default: `{}`) |

**Returns:** `stream<EmailTemplateMetadata, Error?>`

**Sample code:**

```ballerina
stream<ses:EmailTemplateMetadata, ses:Error?> templates = client->listEmailTemplates();
check from ses:EmailTemplateMetadata template in templates
    do {
        // process template
    };
```

**Sample response:**

```json
[
  {
    "templateName": "OrderShipped",
    "createdTimestamp": 1700000000.0
  }
]
```

</div>
</details>

<details>
<summary>deleteEmailTemplate</summary>

<div>

Deletes an email template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateName` | <code>string</code> | Yes | The name of the template to delete |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->deleteEmailTemplate("OrderShipped");
```

</div>
</details>

#### Custom verification email template management

<details>
<summary>createCustomVerificationEmailTemplate</summary>

<div>

Creates a custom verification email template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>CreateCustomVerificationEmailTemplateInput</code> | Yes | The details of the custom verification email template to create |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->createCustomVerificationEmailTemplate({
    templateName: "SupplierVerification",
    fromEmailAddress: "sender@example.com",
    templateSubject: "Please confirm your email address",
    templateContent: "<html><body><p>Confirm your address.</p></body></html>",
    successRedirectionUrl: "https://example.com/verified",
    failureRedirectionUrl: "https://example.com/not-verified"
});
```

</div>
</details>

<details>
<summary>updateCustomVerificationEmailTemplate</summary>

<div>

Updates an existing custom verification email template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateName` | <code>string</code> | Yes | The name of the custom verification email template to update |
| `request` | <code>UpdateCustomVerificationEmailTemplateInput</code> | Yes | The details to replace the template with |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->updateCustomVerificationEmailTemplate("SupplierVerification", {
    fromEmailAddress: "sender@example.com",
    templateSubject: "Confirm your email address",
    templateContent: "<html><body><p>Please confirm your address.</p></body></html>",
    successRedirectionUrl: "https://example.com/verified",
    failureRedirectionUrl: "https://example.com/not-verified"
});
```

</div>
</details>

<details>
<summary>getCustomVerificationEmailTemplate</summary>

<div>

Returns the custom verification email template of the given name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateName` | <code>string</code> | Yes | The name of the custom verification email template to retrieve |

**Returns:** `CustomVerificationEmailTemplateDetails|Error`

**Sample code:**

```ballerina
ses:CustomVerificationEmailTemplateDetails template = check client->getCustomVerificationEmailTemplate("SupplierVerification");
```

**Sample response:**

```json
{
  "templateName": "SupplierVerification",
  "fromEmailAddress": "sender@example.com",
  "templateSubject": "Please confirm your email address",
  "templateContent": "<html><body><p>Confirm your address.</p></body></html>",
  "successRedirectionUrl": "https://example.com/verified",
  "failureRedirectionUrl": "https://example.com/not-verified"
}
```

</div>
</details>

<details>
<summary>listCustomVerificationEmailTemplates</summary>

<div>

Lists the custom verification email templates of the account in the current AWS Region, fetching each page as the previous one is consumed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | <code>ListCustomVerificationEmailTemplatesInput</code> | No | The details of the templates to list (default: `{}`) |

**Returns:** `stream<CustomVerificationEmailTemplateMetadata, Error?>`

**Sample code:**

```ballerina
stream<ses:CustomVerificationEmailTemplateMetadata, ses:Error?> templates = client->listCustomVerificationEmailTemplates();
check from ses:CustomVerificationEmailTemplateMetadata template in templates
    do {
        // process template
    };
```

**Sample response:**

```json
[
  {
    "templateName": "SupplierVerification",
    "fromEmailAddress": "sender@example.com",
    "templateSubject": "Please confirm your email address",
    "successRedirectionUrl": "https://example.com/verified",
    "failureRedirectionUrl": "https://example.com/not-verified"
  }
]
```

</div>
</details>

<details>
<summary>deleteCustomVerificationEmailTemplate</summary>

<div>

Deletes an existing custom verification email template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateName` | <code>string</code> | Yes | The name of the custom verification email template to delete |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->deleteCustomVerificationEmailTemplate("SupplierVerification");
```

</div>
</details>