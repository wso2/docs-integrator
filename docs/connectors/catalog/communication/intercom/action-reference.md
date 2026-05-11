---
title: Action Reference
---

# Actions

This reference covers all operations exposed by the `ballerinax/intercom` connector. All operations are available on the `intercom:Client`.

## Initialize the client

```ballerina
import ballerinax/intercom;

configurable string token = ?;

intercom:ConnectionConfig config = {auth: {token}};
intercom:Client intercomClient = check new (config);
```

---

## Admins

### Identify the current admin

Returns the admin corresponding to the access token in use.

```ballerina
intercom:AdminWithApp me = check intercomClient->/me;
```

**Returns:** `AdminWithApp|error`

---

### List all admins

Returns a list of all admins in the workspace.

```ballerina
intercom:AdminList admins = check intercomClient->/admins;
```

**Returns:** `AdminList|error`

---

### Retrieve an admin

```ballerina
intercom:Admin admin = check intercomClient->/admins/[adminId];
```

| Parameter | Type | Description |
|---|---|---|
| `adminId` | `int` | The unique identifier of the admin |

**Returns:** `Admin|error`

---

### Set away status

```ballerina
intercom:Admin admin = check intercomClient->/admins/[adminId]/away.put({
    awayModeEnabled: true,
    awayModeReassign: false
});
```

| Parameter | Type | Description |
|---|---|---|
| `adminId` | `int` | The unique identifier of the admin |
| `payload` | `AdminIdAwayBody` | Away mode settings |

**Returns:** `Admin|error`

---

## Articles

### List all articles

```ballerina
intercom:ArticleList articles = check intercomClient->/articles;
```

**Returns:** `ArticleList|error`

---

### Create an article

```ballerina
intercom:Article article = check intercomClient->/articles.post({
    title: "Getting Started",
    body: "<p>Welcome to our Help Center.</p>",
    authorId: 123456,
    state: "published"
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | The title of the article |
| `body` | `string` | No | HTML body of the article |
| `authorId` | `int` | Yes | ID of the admin authoring the article |
| `state` | `"draft"\|"published"` | No | Publication state (default: `"draft"`) |
| `parentId` | `int` | No | ID of the parent collection |

**Returns:** `Article|error`

---

### Retrieve an article

```ballerina
intercom:Article article = check intercomClient->/articles/[articleId];
```

| Parameter | Type | Description |
|---|---|---|
| `articleId` | `int` | The unique identifier of the article |

**Returns:** `Article|error`

---

### Update an article

```ballerina
intercom:Article article = check intercomClient->/articles/[articleId].put({
    title: "Updated Title",
    body: "<p>Updated content.</p>",
    state: "published"
});
```

| Parameter | Type | Description |
|---|---|---|
| `articleId` | `int` | The unique identifier of the article |
| `payload` | `UpdateArticleRequest` | Fields to update |

**Returns:** `Article|error`

---

### Delete an article

```ballerina
intercom:DeletedArticleObject result = check intercomClient->/articles/[articleId].delete();
```

| Parameter | Type | Description |
|---|---|---|
| `articleId` | `int` | The unique identifier of the article |

**Returns:** `DeletedArticleObject|error`

---

### Search articles

```ballerina
intercom:ArticleSearchResponse results = check intercomClient->/articles/search(phrase = "getting started");
```

| Query parameter | Type | Description |
|---|---|---|
| `phrase` | `string` | The phrase to search for |
| `state` | `string` | Filter by state: `"draft"` or `"published"` |

**Returns:** `ArticleSearchResponse|error`

---

## Companies

### List companies

```ballerina
intercom:CompanyList companies = check intercomClient->/companies;
```

**Returns:** `CompanyList|error`

---

### Create or update a company

If a company with the given `companyId` already exists, it is updated; otherwise a new company is created.

```ballerina
intercom:Company company = check intercomClient->/companies.post({
    companyId: "acme-corp",
    name: "Acme Corp",
    plan: "Enterprise"
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `companyId` | `string` | No | Your internal company identifier |
| `name` | `string` | No | Company display name |
| `plan` | `string` | No | The plan the company is on |
| `monthlySpend` | `int` | No | Monthly revenue from the company |
| `size` | `int` | No | Number of employees |

**Returns:** `Company|error`

---

### Retrieve a company

```ballerina
intercom:Company company = check intercomClient->/companies/[companyId];
```

| Parameter | Type | Description |
|---|---|---|
| `companyId` | `string` | The unique identifier of the company |

**Returns:** `Company|error`

---

### Update a company

```ballerina
intercom:Company company = check intercomClient->/companies/[companyId].put({
    name: "Acme Corporation"
});
```

**Returns:** `Company|error`

---

### Delete a company

```ballerina
intercom:DeletedCompanyObject result = check intercomClient->/companies/[companyId].delete();
```

**Returns:** `DeletedCompanyObject|error`

---

### List all companies (paginated)

Use the POST endpoint for pagination with a cursor.

```ballerina
intercom:CompanyList companies = check intercomClient->/companies/list.post();
```

**Returns:** `CompanyList|error`

---

## Contacts

### List contacts

```ballerina
intercom:ContactList contacts = check intercomClient->/contacts;
```

**Returns:** `ContactList|error`

---

### Create a contact

```ballerina
intercom:ContactWithPush contact = check intercomClient->/contacts.post({
    email: "alice@example.com",
    name: "Alice Smith",
    role: "user"
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | No | Contact email address |
| `name` | `string` | No | Full name |
| `role` | `string` | No | `"user"` or `"lead"` |
| `externalId` | `string` | No | Your system's identifier for this contact |
| `phone` | `string` | No | Phone number in E.164 format |

**Returns:** `ContactWithPush|error`

---

### Retrieve a contact

```ballerina
intercom:ContactWithPush contact = check intercomClient->/contacts/[contactId];
```

| Parameter | Type | Description |
|---|---|---|
| `contactId` | `string` | The Intercom-assigned contact ID |

**Returns:** `ContactWithPush|error`

---

### Update a contact

```ballerina
intercom:ContactWithPush contact = check intercomClient->/contacts/[contactId].put({
    name: "Alice Johnson",
    email: "alice.johnson@example.com"
});
```

**Returns:** `ContactWithPush|error`

---

### Delete a contact

```ballerina
intercom:ContactDeleted result = check intercomClient->/contacts/[contactId].delete();
```

**Returns:** `ContactDeleted|error`

---

### Search contacts

```ballerina
intercom:ContactList results = check intercomClient->/contacts/search.post({
    query: <intercom:MultipleFilterSearchRequest>{
        operator: "AND",
        value: [
            <intercom:SingleFilterSearchRequest>{
                'field: "email",
                operator: "=",
                value: "alice@example.com"
            }
        ]
    }
});
```

**Available operators:** `=`, `!=`, `IN`, `NIN`, `<`, `>`, `~`, `!~`, `^`, `$`

**Returns:** `ContactList|error`

---

### Archive a contact

```ballerina
intercom:ContactArchived result = check intercomClient->/contacts/[contactId]/archive.post();
```

**Returns:** `ContactArchived|error`

---

### Merge contacts

Merges a lead into a user contact.

```ballerina
intercom:ContactWithPush merged = check intercomClient->/contacts/merge.post({
    'from: "lead_contact_id",
    into: "user_contact_id"
});
```

**Returns:** `ContactWithPush|error`

---

## Conversations

### List conversations

```ballerina
intercom:ConversationList conversations = check intercomClient->/conversations;
```

**Returns:** `ConversationList|error`

---

### Create a conversation

Starts a new outbound conversation from a contact.

```ballerina
intercom:ConversationMessage message = check intercomClient->/conversations.post({
    body: "Hi, I need help with my account.",
    'from: {
        'type: "user",
        id: "contact_id_here"
    }
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `body` | `string` | Yes | The message body |
| `'from` | `CreateConversationRequestFrom` | Yes | The contact initiating the conversation |
| `'from.'type` | `"lead"\|"user"\|"contact"` | Yes | Contact role |
| `'from.id` | `string` | Yes | Intercom contact ID |

**Returns:** `ConversationMessage|error`

---

### Retrieve a conversation

```ballerina
intercom:Conversation conv = check intercomClient->/conversations/[conversationId];
```

| Parameter | Type | Description |
|---|---|---|
| `conversationId` | `int` | The unique identifier of the conversation |

**Returns:** `Conversation|error`

---

### Update a conversation

```ballerina
intercom:Conversation conv = check intercomClient->/conversations/[conversationId].put({
    read: true,
    customAttributes: {"priority": "high"}
});
```

**Returns:** `Conversation|error`

---

### Delete a conversation

```ballerina
intercom:ConversationDeleted result = check intercomClient->/conversations/[conversationId].delete();
```

**Returns:** `ConversationDeleted|error`

---

### Reply to a conversation

Reply as an admin:

```ballerina
intercom:Conversation conv = check intercomClient->/conversations/[conversationId.toString()]/reply.post(
    <intercom:AdminReplyConversationRequest>{
        adminId: "admin_id_here",
        messageType: "comment",
        'type: "admin",
        body: "Thanks for reaching out! Let me look into this."
    }
);
```

| Field | Type | Required | Description |
|---|---|---|---|
| `adminId` | `string` | Yes | ID of the admin replying |
| `messageType` | `"comment"\|"note"\|"quick_reply"` | Yes | Type of reply |
| `'type` | `"admin"` | Yes | Must be `"admin"` |
| `body` | `string` | No | The reply text (required for comment/note) |

**Returns:** `Conversation|error`

---

### Search conversations

```ballerina
intercom:ConversationList results = check intercomClient->/conversations/search.post({
    query: <intercom:MultipleFilterSearchRequest>{
        operator: "AND",
        value: [
            <intercom:SingleFilterSearchRequest>{
                'field: "state",
                operator: "=",
                value: "open"
            }
        ]
    }
});
```

**Returns:** `ConversationList|error`

---

## Tags

### List all tags

```ballerina
intercom:TagList tags = check intercomClient->/tags;
```

**Returns:** `TagList|error`

---

### Create or update a tag

```ballerina
intercom:TagBasic tag = check intercomClient->/tags.post({
    name: "vip-customer"
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Tag name (created if it does not exist) |
| `id` | `string` | No | Tag ID (provide to update an existing tag) |

**Returns:** `TagBasic|error`

---

## Tickets

### Create a ticket

```ballerina
intercom:Ticket ticket = check intercomClient->/tickets.post({
    ticketTypeId: "3036551",
    contacts: [{id: "contact_id_here"}]
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `ticketTypeId` | `string` | Yes | ID of the ticket type (see [Setup guide](setup-guide.md#step-6-optional-find-your-ticket-type-id)) |
| `contacts` | `CreateTicketRequestContacts[]` | Yes | Contacts associated with the ticket |
| `companyId` | `string` | No | Company to associate with the ticket |

**Returns:** `Ticket|error`

---

### Retrieve a ticket

```ballerina
intercom:Ticket ticket = check intercomClient->/tickets/[ticketId];
```

| Parameter | Type | Description |
|---|---|---|
| `ticketId` | `string` | The unique identifier of the ticket |

**Returns:** `Ticket|error`

---

### Update a ticket

```ballerina
intercom:Ticket ticket = check intercomClient->/tickets/[ticketId].put({
    open: false,
    ticketStateId: "resolved_state_id"
});
```

**Returns:** `Ticket|error`

---

### Delete a ticket

```ballerina
intercom:TicketDeleted result = check intercomClient->/tickets/[ticketId].delete();
```

**Returns:** `TicketDeleted|error`

---

### Reply to a ticket

```ballerina
intercom:TicketReply reply = check intercomClient->/tickets/[ticketId]/reply.post(
    <intercom:AdminReplyTicketRequest>{
        adminId: "admin_id_here",
        messageType: "comment",
        'type: "admin",
        body: "We are looking into your ticket."
    }
);
```

| Field | Type | Required | Description |
|---|---|---|---|
| `adminId` | `string` | Yes | ID of the admin replying |
| `messageType` | `"comment"\|"note"\|"quick_reply"` | Yes | Type of reply |
| `'type` | `"admin"` | Yes | Must be `"admin"` |
| `body` | `string` | No | The reply text |

**Returns:** `TicketReply|error`

---

### Search tickets

```ballerina
intercom:TicketList results = check intercomClient->/tickets/search.post({
    query: <intercom:MultipleFilterSearchRequest>{
        operator: "AND",
        value: [
            <intercom:SingleFilterSearchRequest>{
                'field: "open",
                operator: "=",
                value: "true"
            }
        ]
    }
});
```

**Returns:** `TicketList|error`

---

## Search query reference

All search operations (`/contacts/search`, `/conversations/search`, `/tickets/search`) use the same `SearchRequest` structure.

### Simple (single-field) query

```ballerina
intercom:SearchRequest payload = {
    query: <intercom:SingleFilterSearchRequest>{
        'field: "email",
        operator: "=",
        value: "alice@example.com"
    }
};
```

### Composite (multi-field) query

```ballerina
intercom:SearchRequest payload = {
    query: <intercom:MultipleFilterSearchRequest>{
        operator: "AND",   // "AND" or "OR"
        value: [
            <intercom:SingleFilterSearchRequest>{'field: "role",  operator: "=", value: "user"},
            <intercom:SingleFilterSearchRequest>{'field: "email", operator: "~", value: "example.com"}
        ]
    }
};
```

### Supported operators

| Operator | Meaning |
|---|---|
| `=` | Equals |
| `!=` | Not equals |
| `IN` | In a list of values |
| `NIN` | Not in a list of values |
| `<` | Less than |
| `>` | Greater than |
| `~` | Contains |
| `!~` | Does not contain |
| `^` | Starts with |
| `$` | Ends with |

---

## Error handling

All client operations return `T|error`. Use `check` to propagate errors or handle them explicitly:

```ballerina
import ballerina/log;

intercom:ContactWithPush|error result = intercomClient->/contacts.post(payload);
if result is error {
    log:printError("Failed to create contact", result);
} else {
    log:printInfo("Created contact: " + (result.id ?: ""));
}
```

HTTP errors (4xx/5xx) are returned as `http:ApplicationResponseError` and include the status code and response body.

## What's next

- [Setup guide](setup-guide.md): Create an Intercom app and configure authentication
- [Intercom connector overview](connector-overview.md): Learn about all supported features
- [Connector error handling](../../../error-handling-per.md): General error handling patterns for connectors
