---
sidebar_position: 4
title: Email
description: Send emails via SMTP and receive emails via POP3 and IMAP4 for email-based integrations.
---

# Email

Email artifacts enable integrations that send notifications, process incoming messages, and automate email-based workflows. WSO2 Integrator supports SMTP for sending, POP3 for basic retrieval, and IMAP4 for advanced inbox management with folder operations.

## Sending Email via SMTP

Use the SMTP client to send plain text, HTML, and attachment-based emails.

### Basic Email Sending

```ballerina
import ballerina/email;

configurable string smtpHost = "smtp.gmail.com";
configurable int smtpPort = 465;
configurable string smtpUser = ?;
configurable string smtpPassword = ?;

final email:SmtpClient smtpClient = check new (smtpHost, smtpUser, smtpPassword, {
    port: smtpPort,
    security: email:SSL
});

function sendOrderConfirmation(string recipientEmail, Order order) returns error? {
    check smtpClient->sendMessage({
        to: recipientEmail,
        subject: "Order Confirmation - " + order.orderId,
        body: string `Dear Customer,

Your order ${order.orderId} has been confirmed.

Items: ${order.items.length()}
Total: $${order.totalAmount}

Thank you for your purchase.`,
        'from: "noreply@example.com"
    });

    log:printInfo("Confirmation email sent", orderId = order.orderId, to = recipientEmail);
}
```

### HTML Email with Attachments

```ballerina
function sendInvoiceEmail(string recipientEmail, Invoice invoice, byte[] pdfAttachment) returns error? {
    string htmlBody = string `
        <html>
        <body>
            <h2>Invoice ${invoice.invoiceId}</h2>
            <table>
                <tr><td><strong>Date:</strong></td><td>${invoice.date}</td></tr>
                <tr><td><strong>Amount:</strong></td><td>$${invoice.amount}</td></tr>
                <tr><td><strong>Due Date:</strong></td><td>${invoice.dueDate}</td></tr>
            </table>
            <p>Please find the PDF invoice attached.</p>
        </body>
        </html>
    `;

    check smtpClient->sendMessage({
        to: recipientEmail,
        subject: "Invoice " + invoice.invoiceId,
        htmlBody: htmlBody,
        'from: "billing@example.com",
        cc: "accounts@example.com",
        attachments: [
            {
                fileName: "invoice-" + invoice.invoiceId + ".pdf",
                contentType: "application/pdf",
                content: pdfAttachment
            }
        ]
    });
}
```

### Sending to Multiple Recipients

```ballerina
function sendBroadcast(string[] recipients, string subject, string body) returns error? {
    foreach string recipient in recipients {
        do {
            check smtpClient->sendMessage({
                to: recipient,
                subject: subject,
                body: body,
                'from: "notifications@example.com"
            });
        } on fail error e {
            log:printError("Failed to send to recipient",
                          email = recipient, 'error = e);
        }
    }
}
```

## Receiving Email via POP3

POP3 is a simple protocol for downloading emails from a mail server. Use the POP3 listener to poll for new messages.

```ballerina
import ballerina/email;

configurable string pop3Host = "pop.example.com";
configurable int pop3Port = 995;
configurable string pop3User = ?;
configurable string pop3Password = ?;

listener email:PopListener popListener = new ({
    host: pop3Host,
    port: pop3Port,
    username: pop3User,
    password: pop3Password,
    pollingInterval: 60,
    security: email:SSL
});

service "emailProcessor" on popListener {

    remote function onMessage(email:Message message) returns error? {
        log:printInfo("Email received via POP3",
                      'from = message.'from ?: "unknown",
                      subject = message.subject ?: "no subject");

        // Process the email body
        string body = message.body ?: "";
        check processIncomingEmail(message.'from ?: "", message.subject ?: "", body);

        // Handle attachments
        email:Attachment[]? attachments = message.attachments;
        if attachments is email:Attachment[] {
            foreach email:Attachment attachment in attachments {
                log:printInfo("Attachment found", fileName = attachment.fileName);
                check processAttachment(attachment);
            }
        }
    }

    remote function onError(email:Error err) {
        log:printError("POP3 error", 'error = err);
    }
}
```

## Receiving Email via IMAP4

IMAP4 provides richer inbox management than POP3, including folder operations, message flags, and search capabilities.

```ballerina
import ballerina/email;

configurable string imapHost = "imap.example.com";
configurable int imapPort = 993;
configurable string imapUser = ?;
configurable string imapPassword = ?;

listener email:ImapListener imapListener = new ({
    host: imapHost,
    port: imapPort,
    username: imapUser,
    password: imapPassword,
    pollingInterval: 30,
    security: email:SSL
});

service "imapProcessor" on imapListener {

    remote function onMessage(email:Message message) returns error? {
        string subject = message.subject ?: "";
        string sender = message.'from ?: "";

        log:printInfo("Email received via IMAP",
                      'from = sender, subject = subject);

        // Route based on subject or sender
        if subject.startsWith("[ORDER]") {
            check processOrderEmail(message);
        } else if subject.startsWith("[SUPPORT]") {
            check createSupportTicket(message);
        } else {
            check archiveEmail(message);
        }
    }

    remote function onError(email:Error err) {
        log:printError("IMAP error", 'error = err);
    }
}
```

### IMAP Client Operations

Use the IMAP client for programmatic inbox management beyond the listener:

```ballerina
import ballerina/email;

final email:ImapClient imapClient = check new (imapHost, imapUser, imapPassword, {
    port: imapPort,
    security: email:SSL
});

// Read messages from a specific folder
function readFromFolder(string folder) returns email:Message[]|error {
    email:Message[]? messages = check imapClient->readMessages(folder);
    return messages ?: [];
}
```

## Email-Triggered Integrations

Combine email receiving with other integration artifacts for complete workflows.

### Support Ticket Creation

```ballerina
import ballerina/email;
import ballerina/http;

// IMAP listener for incoming support emails
service "supportInbox" on imapListener {

    remote function onMessage(email:Message message) returns error? {
        string subject = message.subject ?: "No Subject";
        string body = message.body ?: "";
        string sender = message.'from ?: "unknown";

        // Create a ticket in the ticketing system
        json ticket = {
            title: subject,
            description: body,
            reporterEmail: sender,
            priority: determinePriority(subject, body),
            source: "email"
        };

        http:Client ticketApi = check new ("https://tickets.example.com");
        _ = check ticketApi->post("/api/tickets", ticket);

        // Send acknowledgment
        check smtpClient->sendMessage({
            to: sender,
            subject: "Re: " + subject,
            body: "Thank you for contacting support. A ticket has been created.",
            'from: "support@example.com"
        });
    }
}

function determinePriority(string subject, string body) returns string {
    string combined = subject.toLowerAscii() + body.toLowerAscii();
    if combined.includes("urgent") || combined.includes("critical") {
        return "HIGH";
    } else if combined.includes("important") {
        return "MEDIUM";
    }
    return "LOW";
}
```

## POP3 vs IMAP4

| Feature | POP3 | IMAP4 |
|---|---|---|
| **Protocol** | Download and optionally delete | Sync with server |
| **Folder support** | Inbox only | Multiple folders |
| **Server-side search** | Not supported | Supported |
| **Message flags** | Not supported | Read/unread, flagged, etc. |
| **Best for** | Simple retrieval | Advanced inbox management |

## Configuration Reference

### SMTP Settings

```toml
# Config.toml
smtpHost = "smtp.gmail.com"
smtpPort = 465
smtpUser = "user@gmail.com"
smtpPassword = "app-password"
```

### IMAP/POP3 Settings

```toml
# Config.toml
imapHost = "imap.gmail.com"
imapPort = 993
imapUser = "user@gmail.com"
imapPassword = "app-password"
```

## What's Next

- [Automation](automation.md) -- Schedule email-related tasks
- [Services](services.md) -- Expose email processing as an HTTP API
- [Error Handling](/docs/develop/design-logic/error-handling) -- Handle email delivery failures
