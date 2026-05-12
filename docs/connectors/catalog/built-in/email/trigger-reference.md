# Triggers

The `ballerina/email` connector supports event-driven email processing through IMAP and POP3 listeners. The listeners poll the mail server at configurable intervals and invoke your service callbacks when new emails arrive, errors occur, or the connection closes.

Three components work together:

| Component | Role |
|-----------|------|
| `email:ImapListener` | Polls an IMAP server at a configurable interval and dispatches new emails to the attached service. |
| `email:PopListener` | Polls a POP3 server at a configurable interval and dispatches new emails to the attached service. |
| `email:Service` | Defines the `onMessage`, `onError`, and `onClose` callbacks invoked by the listener. |
| `email:Message` | The email message payload passed to the `onMessage` callback. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The email listeners (`email:ImapListener` and `email:PopListener`) establish the connection and manage event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ImapListenerConfiguration` | Configuration for the IMAP listener that polls for new emails. |
| `PopListenerConfiguration` | Configuration for the POP3 listener that polls for new emails. |

**`ImapListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | Required | Host address of the IMAP server. |
| `username` | <code>string</code> | Required | Username for IMAP authentication. |
| `password` | <code>string</code> | Required | Password for IMAP authentication. |
| `pollingInterval` | <code>decimal</code> | `30` | Time interval in seconds between email polling attempts. |
| `port` | <code>int</code> | `993` | Port number of the IMAP server. |
| `security` | <code>Security</code> | `SSL` | Type of security channel (`SSL`, `START_TLS_AUTO`, `START_TLS_ALWAYS`, or `START_TLS_NEVER`). |
| `secureSocket` | <code>SecureSocket</code> | `()` | SSL/TLS secure socket configuration. |

**`PopListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | Required | Host address of the POP3 server. |
| `username` | <code>string</code> | Required | Username for POP3 authentication. |
| `password` | <code>string</code> | Required | Password for POP3 authentication. |
| `pollingInterval` | <code>decimal</code> | `30` | Time interval in seconds between email polling attempts. |
| `port` | <code>int</code> | `995` | Port number of the POP3 server. |
| `security` | <code>Security</code> | `SSL` | Type of security channel (`SSL`, `START_TLS_AUTO`, `START_TLS_ALWAYS`, or `START_TLS_NEVER`). |
| `secureSocket` | <code>SecureSocket</code> | `()` | SSL/TLS secure socket configuration. |

### Initializing the listener

**Using an IMAP listener:**

```ballerina
import ballerina/email;

configurable string imapHost = ?;
configurable string username = ?;
configurable string password = ?;

listener email:ImapListener imapListener = check new ({
    host: imapHost,
    username: username,
    password: password,
    pollingInterval: 10
});
```

**Using a POP3 listener:**

```ballerina
import ballerina/email;

configurable string popHost = ?;
configurable string username = ?;
configurable string password = ?;

listener email:PopListener popListener = check new ({
    host: popHost,
    username: username,
    password: password,
    pollingInterval: 10
});
```

---

## Service

An `email:Service` is a Ballerina service attached to an `email:ImapListener` or `email:PopListener`. It implements callbacks that are invoked when new emails arrive, errors occur, or the listener connection closes.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | <code>remote function onMessage(email:Message emailMessage)</code> | Invoked when a new email is received. This callback is mandatory. |
| `onError` | <code>remote function onError(email:Error emailError)</code> | Invoked when an error occurs during email polling. Optional. |
| `onClose` | <code>remote function onClose(email:Error? closeError)</code> | Invoked when the listener connection is closed. Optional. |

You must implement the `onMessage` callback. The `onError` and `onClose` callbacks are optional: implement only the ones relevant to your use case.

### Full usage example

```ballerina
import ballerina/email;
import ballerina/log;

configurable string imapHost = ?;
configurable string username = ?;
configurable string password = ?;

listener email:ImapListener imapListener = check new ({
    host: imapHost,
    username: username,
    password: password,
    pollingInterval: 10
});

service "emailObserver" on imapListener {
    remote function onMessage(email:Message emailMessage) {
        log:printInfo("New email received",
            subject = emailMessage.subject,
            'from = emailMessage.'from,
            to = emailMessage.to
        );
    }

    remote function onError(email:Error emailError) {
        log:printError("Error while polling for emails",
            'error = emailError
        );
    }

    remote function onClose(email:Error? closeError) {
        log:printInfo("Listener connection closed");
    }
}
```

Both `email:ImapListener` and `email:PopListener` use the same service callback interface. You can switch between IMAP and POP3 by changing only the listener type and configuration.

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `to` | <code>string&#124;string[]</code> | Recipient email address(es). |
| `subject` | <code>string</code> | Subject of the email. |
| `'from` | <code>string?</code> | Sender's email address. |
| `body` | <code>string?</code> | Plain text body of the email. |
| `htmlBody` | <code>string?</code> | HTML body of the email. |
| `cc` | <code>string&#124;string[]?</code> | CC recipient address(es). |
| `bcc` | <code>string&#124;string[]?</code> | BCC recipient address(es). |
| `replyTo` | <code>string&#124;string[]?</code> | Reply-To address(es). |
| `contentType` | <code>string?</code> | Content type of the email body (e.g., `"text/plain"`). |
| `headers` | <code>map&lt;string&gt;?</code> | Custom email headers as key-value pairs. |
| `sender` | <code>string?</code> | Sender address (may differ from `from`). |
| `attachments` | <code>mime:Entity&#124;Attachment&#124;(mime:Entity&#124;Attachment)[]?</code> | Email attachments as file references or MIME entities. |

### `Attachment`

| Field | Type | Description |
|-------|------|-------------|
| `filePath` | <code>string</code> | File path of the attachment. |
| `contentType` | <code>string</code> | MIME content type of the attachment (e.g., `"application/pdf"`). |
