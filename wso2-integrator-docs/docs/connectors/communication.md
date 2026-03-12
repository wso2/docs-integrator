---
sidebar_position: 8
title: "Communication"
description: "Communication connectors for email, SMS, and team messaging in WSO2 Integrator."
---

# Communication Connectors

Send emails, SMS messages, and team chat notifications from your integrations. Communication connectors let you reach users and systems through Twilio, SMTP/IMAP email, and Slack.

## Available Connectors

| Connector | Description | Key Operations | Authentication |
|-----------|-------------|----------------|----------------|
| **Twilio** | Send and receive SMS, voice calls, and WhatsApp messages | `sendSms`, `makeCall`, `sendWhatsAppMessage` | API Key + Auth Token |
| **Email (SMTP/IMAP/POP3)** | Send, receive, and manage email messages | `send`, `read`, `delete`, `search` | Basic Auth, OAuth 2.0, App Passwords |
| **Slack** | Post messages, manage channels, and respond to events | `postMessage`, `uploadFile`, `updateMessage` | Bot Token (OAuth 2.0) |

## Twilio

Use the Twilio connector to send SMS notifications, make voice calls, and integrate WhatsApp messaging into your workflows.

### Send an SMS

```ballerina
import ballerinax/twilio;

configurable string accountSid = ?;
configurable string authToken = ?;

final twilio:Client twilio = check new ({
    twilioAuth: {
        accountSId: accountSid,
        authToken: authToken
    }
});

service /api on new http:Listener(8090) {
    resource function post notify(http:Request req) returns http:Response|error {
        json payload = check req.getJsonPayload();
        string phoneNumber = check payload.phone;
        string message = check payload.message;

        twilio:SmsResponse smsResponse = check twilio->sendSms(
            fromNo = "+1234567890",
            toNo = phoneNumber,
            body = message
        );

        http:Response res = new;
        res.setJsonPayload({status: "sent", sid: smsResponse.sid});
        return res;
    }
}
```

### Make a Voice Call

```ballerina
twilio:VoiceCallResponse callResponse = check twilio->makeVoiceCall(
    fromNo = "+1234567890",
    toNo = "+0987654321",
    twiml = "<Response><Say>Your order has been shipped.</Say></Response>"
);
```

## Email (SMTP / IMAP)

Use the built-in `ballerina/email` module to send emails via SMTP and read emails via IMAP or POP3.

### Send an Email

```ballerina
import ballerina/email;

configurable string smtpHost = ?;
configurable string smtpUser = ?;
configurable string smtpPassword = ?;

final email:SmtpClient smtp = check new (smtpHost, smtpUser, smtpPassword);

function sendOrderConfirmation(string recipient, string orderId) returns error? {
    email:Message message = {
        to: recipient,
        subject: string `Order Confirmation - ${orderId}`,
        body: string `Your order ${orderId} has been confirmed and is being processed.`,
        contentType: "text/plain"
    };
    check smtp->sendMessage(message);
}
```

### Read Emails via IMAP

```ballerina
import ballerina/email;

configurable string imapHost = ?;
configurable string imapUser = ?;
configurable string imapPassword = ?;

final email:ImapClient imap = check new (imapHost, imapUser, imapPassword);

function pollInbox() returns email:Message[]|error {
    email:Message[] messages = [];
    email:Message? msg = check imap->receiveMessage();
    while msg is email:Message {
        messages.push(msg);
        msg = check imap->receiveMessage();
    }
    return messages;
}
```

## Slack

Use the Slack connector to post messages to channels, send direct messages, and upload files from your integrations.

### Post a Message to a Channel

```ballerina
import ballerinax/slack;

configurable string slackToken = ?;

final slack:Client slack = check new ({
    auth: {
        token: slackToken
    }
});

function notifyChannel(string channel, string text) returns error? {
    slack:Message response = check slack->postMessage({
        channelName: channel,
        text: text
    });
}
```

### Post a Rich Message with Blocks

```ballerina
function sendAlertNotification(string channel, string title, string detail) returns error? {
    string blocks = string `[
        {
            "type": "header",
            "text": {"type": "plain_text", "text": "${title}"}
        },
        {
            "type": "section",
            "text": {"type": "mrkdwn", "text": "${detail}"}
        }
    ]`;

    slack:Message response = check slack->postMessage({
        channelName: channel,
        text: title,
        blocks: blocks
    });
}
```

## Configuration

All communication connectors are configured through `Config.toml`:

```toml
# Twilio
[twilio]
accountSid = "<TWILIO_ACCOUNT_SID>"
authToken = "<TWILIO_AUTH_TOKEN>"

# Email SMTP
[email]
smtpHost = "smtp.gmail.com"
smtpUser = "user@example.com"
smtpPassword = "<APP_PASSWORD>"

# Slack
[slack]
slackToken = "<SLACK_BOT_TOKEN>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [Error Handling per Connector](error-handling.md) -- Handle connector-specific errors
- [Protocols](protocols.md) -- Lower-level protocol connectors including SMTP and HTTP
