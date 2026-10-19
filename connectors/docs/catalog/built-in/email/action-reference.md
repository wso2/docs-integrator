# Actions

The `ballerina/email` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`SMTP Client`](#smtp-client) | Sends emails via SMTP with support for text/HTML bodies, attachments, and custom headers. |
| [`IMAP Client`](#imap-client) | Receives emails from an IMAP server with configurable folder and timeout. |
| [`POP Client`](#pop-client) | Receives emails from a POP3 server with configurable folder and timeout. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## SMTP client

Sends emails via SMTP with support for text/HTML bodies, attachments, and custom headers.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | Required | Host address of the SMTP server (e.g., `smtp.gmail.com`). |
| `username` | <code>string?</code> | `()` | Username for SMTP authentication. |
| `password` | <code>string?</code> | `()` | Password for SMTP authentication. |
| `port` | <code>int</code> | `465` | Port number of the SMTP server. |
| `security` | <code>Security</code> | `SSL` | Type of security channel (`SSL`, `START_TLS_AUTO`, `START_TLS_ALWAYS`, or `START_TLS_NEVER`). |
| `secureSocket` | <code>SecureSocket</code> | `()` | SSL/TLS secure socket configuration. |

### Initializing the client

```ballerina
import ballerina/email;

configurable string senderAddress = ?;
configurable string senderPassword = ?;

email:SmtpClient smtpClient = check new ("smtp.gmail.com", senderAddress, senderPassword);
```

### Operations

#### Send operations

<details>
<summary>sendMessage</summary>

Sends an email using a structured `Message` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | <code>Message</code> | Yes | The email message record containing `to`, `subject`, `body`, and other fields. |

**Returns:** `Error?`

If `contentType` is set in the `Message` record, it must be a `text/*` MIME type (e.g., `"text/plain"`, `"text/html"`). Non-text content types will return an `email:Error` at runtime.

**Sample code:**

```ballerina
email:Message emailMessage = {
    to: "recipient@example.com",
    subject: "Sample Email Title",
    body: "This is a sample email text body."
};
check smtpClient->sendMessage(emailMessage);
```

</details>

<details>
<summary>send</summary>

Sends an email using individual parameters for convenience.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `to` | <code>string&#124;string[]</code> | Yes | Recipient email address(es). |
| `subject` | <code>string</code> | Yes | Subject of the email. |
| `'from` | <code>string</code> | Yes | Sender's email address. |
| `body` | <code>string</code> | Yes | Text body of the email. |
| `htmlBody` | <code>string</code> | No | HTML body of the email. |
| `cc` | <code>string&#124;string[]</code> | No | CC recipient address(es). |
| `bcc` | <code>string&#124;string[]</code> | No | BCC recipient address(es). |
| `replyTo` | <code>string&#124;string[]</code> | No | Reply-To address(es). |
| `sender` | <code>string</code> | No | Sender address (if different from `from`). |
| `contentType` | <code>string</code> | No | Content type of the body. |
| `headers` | <code>map&lt;string&gt;</code> | No | Custom email headers. |
| `attachments` | <code>mime:Entity&#124;Attachment&#124;(mime:Entity&#124;Attachment)[]</code> | No | File attachments. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check smtpClient->send(
    "recipient@example.com",
    "Meeting Reminder",
    "sender@example.com",
    "Don't forget about our meeting tomorrow at 10 AM.",
    cc = "manager@example.com"
);
```

</details>

---

## IMAP client

Receives emails from an IMAP server with configurable folder and timeout.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | Required | Host address of the IMAP server (e.g., `imap.gmail.com`). |
| `username` | <code>string</code> | Required | Username for IMAP authentication. |
| `password` | <code>string</code> | Required | Password for IMAP authentication. |
| `port` | <code>int</code> | `993` | Port number of the IMAP server. |
| `security` | <code>Security</code> | `SSL` | Type of security channel (`SSL`, `START_TLS_AUTO`, `START_TLS_ALWAYS`, or `START_TLS_NEVER`). |
| `secureSocket` | <code>SecureSocket</code> | `()` | SSL/TLS secure socket configuration. |

### Initializing the client

```ballerina
import ballerina/email;

configurable string imapHost = ?;
configurable string username = ?;
configurable string password = ?;

email:ImapClient imapClient = check new (imapHost, username, password);
```

### Operations

#### Receive operations

<details>
<summary>receiveMessage</summary>

Reads an email message from the specified folder. Returns `()` if no unread emails are available.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folder` | <code>string</code> | No | Mailbox folder to read from (default: `"INBOX"`). |
| `timeout` | <code>decimal</code> | No | Timeout in seconds to wait for an email (default: `30`). |

**Returns:** `Message|Error?`

**Sample code:**

```ballerina
email:Message? message = check imapClient->receiveMessage();
```

**Sample response:**

```ballerina
{"to": "user@example.com", "subject": "Hello", "from": "sender@example.com", "body": "Hi there, this is a test email.", "contentType": "text/plain"}
```

</details>

<details>
<summary>close</summary>

Closes the IMAP client connection and releases resources.

**Returns:** `Error?`

**Sample code:**

```ballerina
check imapClient->close();
```

</details>

---

## POP client

Receives emails from a POP3 server with configurable folder and timeout.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | Required | Host address of the POP3 server (e.g., `pop.gmail.com`). |
| `username` | <code>string</code> | Required | Username for POP3 authentication. |
| `password` | <code>string</code> | Required | Password for POP3 authentication. |
| `port` | <code>int</code> | `995` | Port number of the POP3 server. |
| `security` | <code>Security</code> | `SSL` | Type of security channel (`SSL`, `START_TLS_AUTO`, `START_TLS_ALWAYS`, or `START_TLS_NEVER`). |
| `secureSocket` | <code>SecureSocket</code> | `()` | SSL/TLS secure socket configuration. |

### Initializing the client

```ballerina
import ballerina/email;

configurable string popHost = ?;
configurable string username = ?;
configurable string password = ?;

email:PopClient popClient = check new (popHost, username, password);
```

### Operations

#### Receive operations

<details>
<summary>receiveMessage</summary>

Reads an email message from the specified folder. Returns `()` if no unread emails are available.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folder` | <code>string</code> | No | Mailbox folder to read from (default: `"INBOX"`). |
| `timeout` | <code>decimal</code> | No | Timeout in seconds to wait for an email (default: `30`). |

**Returns:** `Message|Error?`

**Sample code:**

```ballerina
email:Message? message = check popClient->receiveMessage();
```

**Sample response:**

```ballerina
{"to": "user@example.com", "subject": "Hello", "from": "sender@example.com", "body": "Hi there, this is a test email.", "contentType": "text/plain"}
```

</details>

<details>
<summary>close</summary>

Closes the POP3 client connection and releases resources.

**Returns:** `Error?`

**Sample code:**

```ballerina
check popClient->close();
```

</details>
