---
title: Actions
---

# Actions

The `ballerinax/mailchimp.marketing` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Mailchimp Marketing API: audiences, members, campaigns, automations, templates, reports, and more. |

---

## Client

Mailchimp Marketing API: audiences, members, campaigns, automations, templates, reports, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | HTTP Basic Auth credentials. Use any string for `username` and your Mailchimp API key for `password`. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `circuitBreaker` | `CircuitBreakerConfig` | `()` | Circuit breaker configuration. |
| `compression` | `Compression` | `()` | Compression configuration. |
| `cache` | `CacheConfig` | `()` | HTTP caching configuration. |
| `followRedirects` | `FollowRedirects` | `()` | Redirect configuration. |
| `poolConfig` | `PoolConfiguration` | `()` | Connection pool settings. |
| `validation` | `boolean` | `true` | Enable or disable schema validation. |

### Initializing the client

```ballerina
import ballerinax/mailchimp.marketing as mailchimp;

configurable string mailchimpApiKey = ?;
configurable string serviceUrl = ?;

mailchimp:Client mailchimpClient = check new ({
    auth: {
        username: "anystring",
        password: mailchimpApiKey
    }
}, serviceUrl);
```

### Operations

#### API root & health

<details>
<summary>List API root resources</summary>

Returns the top-level resources available in the Mailchimp Marketing API.

Returns: `APIRoot|error`

Sample code:

```ballerina
mailchimp:APIRoot root = check mailchimpClient->/.get();
```

Sample response:

```ballerina
{"account_id": "abc123", "login_id": "user@example.com", "account_name": "My Company", "email": "user@example.com", "role": "owner", "industry_stats": {"open_rate": 0.17, "bounce_rate": 0.006, "click_rate": 0.028}}
```

</details>

<details>
<summary>Ping the API</summary>

Tests the API connection and authentication. Returns a health status.

Returns: `APIHealthStatus|error`

Sample code:

```ballerina
mailchimp:APIHealthStatus status = check mailchimpClient->/ping.get();
```

Sample response:

```ballerina
{"health_status": "Everything's Chimpy!"}
```

</details>

#### Audiences (lists)

<details>
<summary>Get all lists info</summary>

Retrieves information about all audiences (lists) in the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetListsQueries` | No | Optional query parameters for filtering, pagination, and field selection. |

Returns: `SubscriberLists|error`

Sample code:

```ballerina
mailchimp:SubscriberLists lists = check mailchimpClient->/lists.get();
```

Sample response:

```ballerina
{"lists": [{"id": "abc123def", "name": "My Newsletter", "contact": {"company": "My Company"}, "stats": {"member_count": 1500, "unsubscribe_count": 20, "open_rate": 35.5}}], "total_items": 1}
```

</details>

<details>
<summary>Add list</summary>

Creates a new audience (list) in the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SubscriberList3` | Yes | The audience configuration including name, contact info, and permission reminder. |

Returns: `SubscriberList1|error`

Sample code:

```ballerina
mailchimp:SubscriberList1 newList = check mailchimpClient->/lists.post({
    name: "Product Updates",
    contact: {
        company: "My Company",
        address1: "123 Main St",
        city: "Atlanta",
        state: "GA",
        zip: "30301",
        country: "US"
    },
    permission_reminder: "You signed up for product updates on our website.",
    campaign_defaults: {
        from_name: "My Company",
        from_email: "updates@example.com",
        subject: "",
        language: "en"
    },
    email_type_option: false
});
```

Sample response:

```ballerina
{"id": "def456ghi", "name": "Product Updates", "contact": {"company": "My Company"}, "stats": {"member_count": 0}, "date_created": "2025-01-15T10:30:00+00:00"}
```

</details>

<details>
<summary>Get list info</summary>

Retrieves information about a specific audience (list).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `queries` | `GetListsIdQueries` | No | Optional query parameters for field selection. |

Returns: `SubscriberList1|error`

Sample code:

```ballerina
mailchimp:SubscriberList1 list = check mailchimpClient->/lists/["abc123def"].get();
```

Sample response:

```ballerina
{"id": "abc123def", "name": "My Newsletter", "stats": {"member_count": 1500, "unsubscribe_count": 20, "open_rate": 35.5}, "date_created": "2024-06-01T08:00:00+00:00"}
```

</details>

<details>
<summary>Update list</summary>

Updates the settings for an existing audience (list).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `payload` | `SubscriberList3` | Yes | The updated list configuration. |

Returns: `SubscriberList1|error`

Sample code:

```ballerina
mailchimp:SubscriberList1 updated = check mailchimpClient->/lists/["abc123def"].patch({
    name: "Updated Newsletter Name",
    contact: {
        company: "My Company",
        address1: "123 Main St",
        city: "Atlanta",
        state: "GA",
        zip: "30301",
        country: "US"
    },
    permission_reminder: "You signed up on our website.",
    campaign_defaults: {
        from_name: "My Company",
        from_email: "news@example.com",
        subject: "",
        language: "en"
    },
    email_type_option: false
});
```

Sample response:

```ballerina
{"id": "abc123def", "name": "Updated Newsletter Name", "stats": {"member_count": 1500}}
```

</details>

<details>
<summary>Delete list</summary>

Deletes an audience (list) from the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/lists/["abc123def"].delete();
```

</details>

<details>
<summary>Batch subscribe or unsubscribe</summary>

Batch subscribes or unsubscribes list members.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `payload` | `MembersToSubscribeUnsubscribeTofromAListInBatch` | Yes | Batch member subscribe/unsubscribe payload. |

Returns: `BatchUpdateListMembers|error`

Sample code:

```ballerina
mailchimp:BatchUpdateListMembers result = check mailchimpClient->/lists/["abc123def"].post({
    members: [
        { email_address: "user1@example.com", status: "subscribed" },
        { email_address: "user2@example.com", status: "subscribed" }
    ]
});
```

Sample response:

```ballerina
{"new_members": [{"id": "hash1", "email_address": "user1@example.com", "status": "subscribed"}], "updated_members": [], "errors": [], "total_created": 2, "total_updated": 0, "error_count": 0}
```

</details>

#### List members

<details>
<summary>List members</summary>

Retrieves information about members in a specific audience list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `queries` | `GetListsIdMembersQueries` | No | Optional query parameters for filtering, pagination, and field selection. |

Returns: `ListMembers1|error`

Sample code:

```ballerina
mailchimp:ListMembers1 members = check mailchimpClient->/lists/["abc123def"]/members.get();
```

Sample response:

```ballerina
{"members": [{"id": "a1b2c3", "email_address": "user@example.com", "status": "subscribed", "merge_fields": {"FNAME": "John", "LNAME": "Doe"}, "stats": {"avg_open_rate": 0.42, "avg_click_rate": 0.12}}], "total_items": 1}
```

</details>

<details>
<summary>Add member</summary>

Adds a new member (subscriber) to an audience list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `payload` | `AddListMembers1` | Yes | The member data including email address and subscription status. |

Returns: `ListMembers2|error`

Sample code:

```ballerina
mailchimp:ListMembers2 member = check mailchimpClient->/lists/["abc123def"]/members.post({
    email_address: "newuser@example.com",
    status: "subscribed",
    merge_fields: {
        "FNAME": "Jane",
        "LNAME": "Smith"
    }
});
```

Sample response:

```ballerina
{"id": "d4e5f6", "email_address": "newuser@example.com", "status": "subscribed", "merge_fields": {"FNAME": "Jane", "LNAME": "Smith"}, "timestamp_signup": "2025-03-15T14:30:00+00:00"}
```

</details>

<details>
<summary>Get member info</summary>

Retrieves information about a specific list member by their subscriber hash (MD5 hash of lowercase email).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |
| `queries` | `GetListsIdMembersIdQueries` | No | Optional query parameters for field selection. |

Returns: `ListMembers2|error`

Sample code:

```ballerina
mailchimp:ListMembers2 member = check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"].get();
```

Sample response:

```ballerina
{"id": "a1b2c3", "email_address": "user@example.com", "status": "subscribed", "merge_fields": {"FNAME": "John", "LNAME": "Doe"}, "stats": {"avg_open_rate": 0.42, "avg_click_rate": 0.12}, "last_changed": "2025-02-20T09:15:00+00:00"}
```

</details>

<details>
<summary>Update member</summary>

Updates an existing list member's information.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |
| `payload` | `AddListMembers1` | Yes | The updated member data. |

Returns: `ListMembers2|error`

Sample code:

```ballerina
mailchimp:ListMembers2 updated = check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"].patch({
    merge_fields: {
        "FNAME": "Jonathan"
    }
});
```

Sample response:

```ballerina
{"id": "a1b2c3", "email_address": "user@example.com", "status": "subscribed", "merge_fields": {"FNAME": "Jonathan", "LNAME": "Doe"}}
```

</details>

<details>
<summary>Add or update member</summary>

Adds a new member or updates an existing member in the list (upsert).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |
| `payload` | `AddListMembers2` | Yes | The member data to add or update. |

Returns: `ListMembers2|error`

Sample code:

```ballerina
mailchimp:ListMembers2 member = check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"].put({
    email_address: "user@example.com",
    status_if_new: "subscribed",
    merge_fields: {
        "FNAME": "John",
        "LNAME": "Doe"
    }
});
```

Sample response:

```ballerina
{"id": "a1b2c3", "email_address": "user@example.com", "status": "subscribed", "merge_fields": {"FNAME": "John", "LNAME": "Doe"}}
```

</details>

<details>
<summary>Archive member</summary>

Archives a list member (soft delete). The member can be re-added later.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"].delete();
```

</details>

<details>
<summary>Permanently delete member</summary>

Permanently deletes a list member. This action cannot be undone.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"]/actions/'delete\-permanent.post();
```

</details>

#### Member tags & events

<details>
<summary>List member tags</summary>

Retrieves the tags assigned to a specific list member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |

Returns: `CollectionOfTags|error`

Sample code:

```ballerina
mailchimp:CollectionOfTags tags = check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"]/tags.get();
```

Sample response:

```ballerina
{"tags": [{"id": 1, "name": "VIP"}, {"id": 2, "name": "Early Adopter"}], "total_items": 2}
```

</details>

<details>
<summary>Add or remove member tags</summary>

Adds or removes tags from a specific list member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |
| `payload` | `MemberTags` | Yes | Tags to add or remove with their status. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"]/tags.post({
    tags: [
        { name: "VIP", status: "active" },
        { name: "OldTag", status: "inactive" }
    ]
});
```

</details>

<details>
<summary>Add event for member</summary>

Adds a custom event for a specific list member, which can trigger automations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |
| `payload` | `Events` | Yes | Event name and optional properties. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"]/events.post({
    name: "purchased_product",
    properties: {
        "product": "Widget Pro",
        "price": "29.99"
    }
});
```

</details>

<details>
<summary>List member events</summary>

Retrieves events for a specific list member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `subscriberHash` | `string` | Yes | The MD5 hash of the lowercase email address or the email address itself. |

Returns: `CollectionOfEvents|error`

Sample code:

```ballerina
mailchimp:CollectionOfEvents events = check mailchimpClient->/lists/["abc123def"]/members/["user@example.com"]/events.get();
```

Sample response:

```ballerina
{"events": [{"occurred_at": "2025-03-10T12:00:00+00:00", "name": "purchased_product", "properties": {"product": "Widget Pro"}}], "total_items": 1}
```

</details>

#### Segments

<details>
<summary>List segments</summary>

Retrieves all segments for a specific list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |

Returns: `CollectionOfSegments|error`

Sample code:

```ballerina
mailchimp:CollectionOfSegments segments = check mailchimpClient->/lists/["abc123def"]/segments.get();
```

Sample response:

```ballerina
{"segments": [{"id": 12345, "name": "Active Subscribers", "member_count": 500, "type": "saved", "created_at": "2025-01-10T08:00:00+00:00"}], "total_items": 1}
```

</details>

<details>
<summary>Add segment</summary>

Creates a new segment for a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `payload` | `List3` | Yes | Segment configuration including name and conditions. |

Returns: `List4|error`

Sample code:

```ballerina
mailchimp:List4 segment = check mailchimpClient->/lists/["abc123def"]/segments.post({
    name: "High Engagement",
    static_segment: ["user1@example.com", "user2@example.com"]
});
```

Sample response:

```ballerina
{"id": 12346, "name": "High Engagement", "member_count": 2, "type": "static", "created_at": "2025-03-15T10:00:00+00:00"}
```

</details>

<details>
<summary>Delete segment</summary>

Deletes a specific segment from a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | `string` | Yes | The unique ID of the list. |
| `segmentId` | `string` | Yes | The unique ID of the segment. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/lists/["abc123def"]/segments/["12345"].delete();
```

</details>

#### Campaigns

<details>
<summary>List campaigns</summary>

Retrieves all campaigns in the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetCampaignsQueries` | No | Optional query parameters for filtering, pagination, and field selection. |

Returns: `InlineResponse2007|error`

Sample code:

```ballerina
mailchimp:InlineResponse2007 campaigns = check mailchimpClient->/campaigns.get();
```

Sample response:

```ballerina
{"campaigns": [{"id": "cam123", "type": "regular", "status": "sent", "settings": {"subject_line": "March Newsletter", "from_name": "My Company"}, "send_time": "2025-03-01T09:00:00+00:00", "report_summary": {"opens": 450, "clicks": 120}}], "total_items": 1}
```

</details>

<details>
<summary>Add campaign</summary>

Creates a new campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Campaign` | Yes | Campaign configuration including type, recipients, and settings. |

Returns: `Campaign1|error`

Sample code:

```ballerina
mailchimp:Campaign1 campaign = check mailchimpClient->/campaigns.post({
    'type: "regular",
    recipients: {
        list_id: "abc123def"
    },
    settings: {
        subject_line: "March Newsletter",
        from_name: "My Company",
        reply_to: "news@example.com"
    }
});
```

Sample response:

```ballerina
{"id": "cam456", "type": "regular", "status": "save", "settings": {"subject_line": "March Newsletter", "from_name": "My Company"}, "create_time": "2025-03-15T10:30:00+00:00"}
```

</details>

<details>
<summary>Get campaign info</summary>

Retrieves information about a specific campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |

Returns: `Campaign1|error`

Sample code:

```ballerina
mailchimp:Campaign1 campaign = check mailchimpClient->/campaigns/["cam456"].get();
```

Sample response:

```ballerina
{"id": "cam456", "type": "regular", "status": "save", "settings": {"subject_line": "March Newsletter", "from_name": "My Company"}, "recipients": {"list_id": "abc123def"}}
```

</details>

<details>
<summary>Update campaign settings</summary>

Updates the settings of an existing campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |
| `payload` | `Campaign2` | Yes | The updated campaign settings. |

Returns: `Campaign1|error`

Sample code:

```ballerina
mailchimp:Campaign1 updated = check mailchimpClient->/campaigns/["cam456"].patch({
    settings: {
        subject_line: "Updated: March Newsletter",
        from_name: "My Company",
        reply_to: "news@example.com"
    }
});
```

Sample response:

```ballerina
{"id": "cam456", "type": "regular", "status": "save", "settings": {"subject_line": "Updated: March Newsletter", "from_name": "My Company"}}
```

</details>

<details>
<summary>Delete campaign</summary>

Permanently deletes a campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/campaigns/["cam456"].delete();
```

</details>

<details>
<summary>Send campaign</summary>

Sends a campaign to the recipients.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/campaigns/["cam456"]/actions/send.post();
```

</details>

<details>
<summary>Schedule campaign</summary>

Schedules a campaign for delivery at a specified time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |
| `payload` | `Body1` | Yes | Schedule configuration with send time. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/campaigns/["cam456"]/actions/schedule.post({
    schedule_time: "2025-04-01T09:00:00+00:00"
});
```

</details>

<details>
<summary>Unschedule campaign</summary>

Unschedules a previously scheduled campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/campaigns/["cam456"]/actions/unschedule.post();
```

</details>

<details>
<summary>Replicate campaign</summary>

Creates a copy of an existing campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign to copy. |

Returns: `Campaign3|error`

Sample code:

```ballerina
mailchimp:Campaign3 copy = check mailchimpClient->/campaigns/["cam456"]/actions/replicate.post();
```

Sample response:

```ballerina
{"id": "cam789", "type": "regular", "status": "save", "settings": {"subject_line": "March Newsletter"}, "create_time": "2025-03-15T11:00:00+00:00"}
```

</details>

<details>
<summary>Send test email</summary>

Sends a test email to specified email addresses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |
| `payload` | `Body2` | Yes | Test email configuration with recipient addresses and email type. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/campaigns/["cam456"]/actions/test.post({
    test_emails: ["test@example.com"],
    send_type: "html"
});
```

</details>

<details>
<summary>Get send checklist</summary>

Reviews the send checklist for a campaign and resolves any issues before sending.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |

Returns: `SendChecklist|error`

Sample code:

```ballerina
mailchimp:SendChecklist checklist = check mailchimpClient->/campaigns/["cam456"]/send\-checklist.get();
```

Sample response:

```ballerina
{"is_ready": true, "items": [{"type": "success", "id": "list", "heading": "List", "details": "My Newsletter (1500 recipients)"}]}
```

</details>

#### Campaign content

<details>
<summary>Get campaign content</summary>

Retrieves the HTML and plain-text content for a campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |

Returns: `CampaignContent|error`

Sample code:

```ballerina
mailchimp:CampaignContent content = check mailchimpClient->/campaigns/["cam456"]/content.get();
```

Sample response:

```ballerina
{"plain_text": "Hello, welcome to our newsletter!", "html": "<html><body><h1>Welcome!</h1></body></html>"}
```

</details>

<details>
<summary>Set campaign content</summary>

Sets the content (HTML, plain text, or template) for a campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignId` | `string` | Yes | The unique ID of the campaign. |
| `payload` | `CampaignContent1` | Yes | The campaign content configuration. |

Returns: `CampaignContent|error`

Sample code:

```ballerina
mailchimp:CampaignContent content = check mailchimpClient->/campaigns/["cam456"]/content.put({
    html: "<html><body><h1>March Newsletter</h1><p>Hello *|FNAME|*!</p></body></html>"
});
```

Sample response:

```ballerina
{"plain_text": "March Newsletter\nHello *|FNAME|*!", "html": "<html><body><h1>March Newsletter</h1><p>Hello *|FNAME|*!</p></body></html>"}
```

</details>

#### Automations

<details>
<summary>List automations</summary>

Retrieves a summary of all automations in the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAutomationsQueries` | No | Optional query parameters for filtering and pagination. |

Returns: `InlineResponse2005|error`

Sample code:

```ballerina
mailchimp:InlineResponse2005 automations = check mailchimpClient->/automations.get();
```

Sample response:

```ballerina
{"automations": [{"id": "auto123", "status": "sending", "settings": {"title": "Welcome Series"}, "emails_sent": 350, "create_time": "2025-01-01T08:00:00+00:00"}], "total_items": 1}
```

</details>

<details>
<summary>Add automation</summary>

Creates a new automation workflow.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AutomationWorkflow` | Yes | Automation configuration including recipients and settings. |

Returns: `AutomationWorkflow1|error`

Sample code:

```ballerina
mailchimp:AutomationWorkflow1 automation = check mailchimpClient->/automations.post({
    recipients: {
        list_id: "abc123def"
    },
    settings: {
        title: "Welcome Series"
    },
    trigger_settings: {
        workflow_type: "welcomeSeries"
    }
});
```

Sample response:

```ballerina
{"id": "auto456", "status": "save", "settings": {"title": "Welcome Series"}, "create_time": "2025-03-15T12:00:00+00:00"}
```

</details>

<details>
<summary>Pause automation emails</summary>

Pauses all emails in an automation workflow.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The unique ID of the automation workflow. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/automations/["auto123"]/actions/'pause\-all\-emails.post();
```

</details>

<details>
<summary>Start automation emails</summary>

Starts all emails in a paused automation workflow.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The unique ID of the automation workflow. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/automations/["auto123"]/actions/'start\-all\-emails.post();
```

</details>

#### Templates

<details>
<summary>List templates</summary>

Retrieves all templates in the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetTemplatesQueries` | No | Optional query parameters for filtering and pagination. |

Returns: `Templates|error`

Sample code:

```ballerina
mailchimp:Templates templates = check mailchimpClient->/templates.get();
```

Sample response:

```ballerina
{"templates": [{"id": 10001, "type": "user", "name": "Monthly Newsletter", "active": true, "date_created": "2025-01-05T08:00:00+00:00"}], "total_items": 1}
```

</details>

<details>
<summary>Add template</summary>

Creates a new template with custom HTML.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplateInstance` | Yes | Template configuration with name and HTML content. |

Returns: `TemplateInstance1|error`

Sample code:

```ballerina
mailchimp:TemplateInstance1 template = check mailchimpClient->/templates.post({
    name: "Product Launch",
    html: "<html><body><h1>New Product!</h1><p>Check it out.</p></body></html>"
});
```

Sample response:

```ballerina
{"id": 10002, "type": "user", "name": "Product Launch", "active": true, "date_created": "2025-03-15T14:00:00+00:00"}
```

</details>

<details>
<summary>Delete template</summary>

Deletes a specific template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateId` | `string` | Yes | The unique ID of the template. |

Returns: `error?`

Sample code:

```ballerina
check mailchimpClient->/templates/["10001"].delete();
```

</details>

#### Template folders

<details>
<summary>List template folders</summary>

Retrieves all template folders in the account.

Returns: `TemplateFolders|error`

Sample code:

```ballerina
mailchimp:TemplateFolders folders = check mailchimpClient->/template\-folders.get();
```

Sample response:

```ballerina
{"folders": [{"id": "tf001", "name": "Marketing Templates", "count": 5}], "total_items": 1}
```

</details>

<details>
<summary>Add template folder</summary>

Creates a new template folder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplateFolder` | Yes | Folder configuration with a name. |

Returns: `TemplateFolder1|error`

Sample code:

```ballerina
mailchimp:TemplateFolder1 folder = check mailchimpClient->/template\-folders.post({
    name: "Seasonal Campaigns"
});
```

Sample response:

```ballerina
{"id": "tf002", "name": "Seasonal Campaigns", "count": 0}
```

</details>

#### Campaign folders

<details>
<summary>List campaign folders</summary>

Retrieves all campaign folders in the account.

Returns: `CampaignFolders|error`

Sample code:

```ballerina
mailchimp:CampaignFolders folders = check mailchimpClient->/campaign\-folders.get();
```

Sample response:

```ballerina
{"folders": [{"id": "cf001", "name": "Q1 Campaigns", "count": 3}], "total_items": 1}
```

</details>

<details>
<summary>Add campaign folder</summary>

Creates a new campaign folder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CampaignFolder` | Yes | Folder configuration with a name. |

Returns: `CampaignFolder1|error`

Sample code:

```ballerina
mailchimp:CampaignFolder1 folder = check mailchimpClient->/campaign\-folders.post({
    name: "Q2 Campaigns"
});
```

Sample response:

```ballerina
{"id": "cf002", "name": "Q2 Campaigns", "count": 0}
```

</details>

#### Batch operations

<details>
<summary>List batch requests</summary>

Retrieves a list of batch operation requests.

Returns: `BatchOperations|error`

Sample code:

```ballerina
mailchimp:BatchOperations batches = check mailchimpClient->/batches.get();
```

Sample response:

```ballerina
{"batches": [{"id": "batch001", "status": "finished", "total_operations": 100, "finished_operations": 100, "submitted_at": "2025-03-10T08:00:00+00:00"}], "total_items": 1}
```

</details>

<details>
<summary>Start batch operation</summary>

Starts a new batch operation with multiple API calls.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Body7` | Yes | Batch request configuration with an array of operations. |

Returns: `Batch|error`

Sample code:

```ballerina
mailchimp:Batch batch = check mailchimpClient->/batches.post({
    operations: [
        {
            method: "GET",
            path: "/lists/abc123def/members",
            operation_id: "get-members"
        }
    ]
});
```

Sample response:

```ballerina
{"id": "batch002", "status": "pending", "total_operations": 1, "submitted_at": "2025-03-15T15:00:00+00:00"}
```

</details>

<details>
<summary>Get batch operation status</summary>

Retrieves the status of a specific batch operation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchId` | `string` | Yes | The unique ID of the batch operation. |

Returns: `Batch|error`

Sample code:

```ballerina
mailchimp:Batch batch = check mailchimpClient->/batches/["batch002"].get();
```

Sample response:

```ballerina
{"id": "batch002", "status": "finished", "total_operations": 1, "finished_operations": 1, "errored_operations": 0, "submitted_at": "2025-03-15T15:00:00+00:00", "completed_at": "2025-03-15T15:01:00+00:00"}
```

</details>

#### File manager

<details>
<summary>List stored files</summary>

Retrieves a list of all files in the file manager.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetFileManagerFilesQueries` | No | Optional query parameters for filtering and pagination. |

Returns: `FileManager|error`

Sample code:

```ballerina
mailchimp:FileManager files = check mailchimpClient->/file\-manager/files.get();
```

Sample response:

```ballerina
{"files": [{"id": 1001, "name": "logo.png", "type": "image", "size": 24680, "full_size_url": "https://gallery.mailchimp.com/logo.png"}], "total_items": 1, "total_file_size": 24680}
```

</details>

<details>
<summary>Add file</summary>

Uploads a new file to the file manager.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GalleryFile` | Yes | File upload payload with name and base64-encoded file data. |

Returns: `GalleryFile1|error`

Sample code:

```ballerina
mailchimp:GalleryFile1 file = check mailchimpClient->/file\-manager/files.post({
    name: "banner.png",
    file_data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk..."
});
```

Sample response:

```ballerina
{"id": 1002, "name": "banner.png", "type": "image", "size": 15360, "full_size_url": "https://gallery.mailchimp.com/banner.png", "created_at": "2025-03-15T16:00:00+00:00"}
```

</details>

#### Search

<details>
<summary>Search campaigns</summary>

Searches all campaigns for the specified query terms.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetSearchCampaignsQueries` | Yes | Query parameters including the search query string. |

Returns: `InlineResponse20014|error`

Sample code:

```ballerina
mailchimp:InlineResponse20014 results = check mailchimpClient->/search\-campaigns.get(queries = { query: "newsletter" });
```

Sample response:

```ballerina
{"results": [{"campaign": {"id": "cam123", "settings": {"subject_line": "March Newsletter"}}}], "total_items": 1}
```

</details>

<details>
<summary>Search members</summary>

Searches for list members across all lists matching the query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetSearchMembersQueries` | Yes | Query parameters including the search query string. |

Returns: `Members|error`

Sample code:

```ballerina
mailchimp:Members results = check mailchimpClient->/search\-members.get(queries = { query: "john@example.com" });
```

Sample response:

```ballerina
{"exact_matches": {"members": [{"id": "a1b2c3", "email_address": "john@example.com", "status": "subscribed", "list_id": "abc123def"}], "total_items": 1}, "full_search": {"members": [], "total_items": 0}}
```

</details>

#### Connected sites

<details>
<summary>List connected sites</summary>

Retrieves all connected sites in the account.

Returns: `ConnectedSites|error`

Sample code:

```ballerina
mailchimp:ConnectedSites sites = check mailchimpClient->/connected\-sites.get();
```

Sample response:

```ballerina
{"sites": [{"foreign_id": "site001", "store_id": "store001", "platform": "shopify", "domain": "mystore.example.com", "site_script": {"url": "https://chimpstatic.com/mcjs-connected/js/users/abc123.js"}}], "total_items": 1}
```

</details>

#### Account exports

<details>
<summary>List account exports</summary>

Retrieves a list of account data exports.

Returns: `InlineResponse2001|error`

Sample code:

```ballerina
mailchimp:InlineResponse2001 exports = check mailchimpClient->/account\-exports.get();
```

Sample response:

```ballerina
{"exports": [{"export_id": "exp001", "started": "2025-03-10T08:00:00+00:00", "finished": "2025-03-10T08:05:00+00:00", "size_in_bytes": 1048576}], "total_items": 1}
```

</details>

<details>
<summary>Add export</summary>

Creates a new account export.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateAnAccountExport` | Yes | Export configuration with included data types. |

Returns: `InlineResponse2002|error`

Sample code:

```ballerina
mailchimp:InlineResponse2002 export = check mailchimpClient->/account\-exports.post({
    include_stages: ["audiences", "campaigns"]
});
```

Sample response:

```ballerina
{"export_id": "exp002", "started": "2025-03-15T17:00:00+00:00", "finished": null, "size_in_bytes": 0}
```

</details>

#### Customer journeys

<details>
<summary>Trigger customer journey step</summary>

Triggers a specific step in a customer journey for one or more contacts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `journeyId` | `int` | Yes | The unique ID of the customer journey. |
| `stepId` | `int` | Yes | The unique ID of the journey step. |
| `payload` | `Body11` | Yes | Trigger payload with email address to trigger the journey step for. |

Returns: `record {}|error`

Sample code:

```ballerina
record {} result = check mailchimpClient->/customer\-journeys/journeys/[1234]/steps/[5678]/actions/trigger.post({
    email_address: "user@example.com"
});
```

Sample response:

```ballerina
{}
```

</details>
