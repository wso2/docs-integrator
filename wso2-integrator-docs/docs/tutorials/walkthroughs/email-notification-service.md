---
sidebar_position: 3
title: "Build an Email Notification Service"
description: "End-to-end walkthrough: Build a centralized email notification service that sends templated emails triggered by integration events."
---

# Build an Email Notification Service

Build a centralized email notification service that other integrations can call to send templated, event-driven emails. This tutorial covers SMTP configuration, HTML email templates, retry logic, and handling bounce-backs.

## What You'll Build

A notification API that accepts event payloads (order confirmations, password resets, system alerts) and sends formatted HTML emails through SMTP. The service supports multiple templates, variable substitution, and delivery tracking.

## What You'll Learn

- Configuring the Ballerina email connector for SMTP
- Building reusable HTML email templates
- Implementing retry logic for transient SMTP failures
- Handling multiple notification types through a single service
- Logging delivery status for audit trails

## Prerequisites

- WSO2 Integrator VS Code extension installed
- An SMTP server (Gmail, SendGrid, Amazon SES, or a local SMTP server)
- SMTP credentials (host, port, username, password)

**Time estimate:** 30--45 minutes

## Architecture

```
┌──────────────┐     ┌───────────────────┐     ┌────────────┐
│ Order Service├────►│                   ├────►│            │
└──────────────┘     │   Notification    │     │   SMTP     │
┌──────────────┐     │   Service         │     │   Server   │
│ Auth Service ├────►│                   ├────►│            │
└──────────────┘     │  - Template Engine│     └─────┬──────┘
┌──────────────┐     │  - Retry Logic    │           │
│ Alert System ├────►│  - Delivery Log   │     ┌─────▼──────┐
└──────────────┘     └───────────────────┘     │  Recipient │
                                               │  Inbox     │
                                               └────────────┘
```

## Step 1: Create the Project

```bash
bal new notification_service
cd notification_service
```

## Step 2: Define the Notification Types

```ballerina
// types.bal

type NotificationRequest record {|
    string templateId;
    string recipientEmail;
    string recipientName;
    string subject?;
    map<string> variables;
|};

type NotificationResponse record {|
    string notificationId;
    string status;        // "sent", "failed", "queued"
    string recipientEmail;
    string timestamp;
|};

type EmailTemplate record {|
    string id;
    string subject;
    string htmlBody;
    string plainTextBody;
|};
```

## Step 3: Build the Template Engine

```ballerina
// templates.bal
import ballerina/regex;

final map<EmailTemplate> templates = {
    "order-confirmation": {
        id: "order-confirmation",
        subject: "Order Confirmed - {{orderId}}",
        htmlBody: string `
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50;">Order Confirmation</h2>
                <p>Hi {{customerName}},</p>
                <p>Your order <strong>{{orderId}}</strong> has been confirmed.</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f8f9fa;">
                        <td style="padding: 8px; border: 1px solid #dee2e6;">Order Total</td>
                        <td style="padding: 8px; border: 1px solid #dee2e6;">{{orderTotal}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #dee2e6;">Estimated Delivery</td>
                        <td style="padding: 8px; border: 1px solid #dee2e6;">{{deliveryDate}}</td>
                    </tr>
                </table>
                <p>Thank you for your order!</p>
            </body>
            </html>`,
        plainTextBody: "Hi {{customerName}}, Your order {{orderId}} has been confirmed. Total: {{orderTotal}}. Delivery: {{deliveryDate}}."
    },
    "password-reset": {
        id: "password-reset",
        subject: "Password Reset Request",
        htmlBody: string `
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50;">Password Reset</h2>
                <p>Hi {{userName}},</p>
                <p>Click the link below to reset your password. This link expires in {{expiryMinutes}} minutes.</p>
                <a href="{{resetLink}}" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset Password</a>
                <p style="color: #7f8c8d; font-size: 12px;">If you did not request this, please ignore this email.</p>
            </body>
            </html>`,
        plainTextBody: "Hi {{userName}}, Reset your password here: {{resetLink}}. Expires in {{expiryMinutes}} minutes."
    },
    "system-alert": {
        id: "system-alert",
        subject: "[{{severity}}] System Alert - {{serviceName}}",
        htmlBody: string `
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #e74c3c;">System Alert</h2>
                <p><strong>Service:</strong> {{serviceName}}</p>
                <p><strong>Severity:</strong> {{severity}}</p>
                <p><strong>Message:</strong> {{alertMessage}}</p>
                <p><strong>Time:</strong> {{timestamp}}</p>
            </body>
            </html>`,
        plainTextBody: "Alert [{{severity}}] {{serviceName}}: {{alertMessage}} at {{timestamp}}"
    }
};

function renderTemplate(EmailTemplate template, map<string> variables) returns EmailTemplate {
    string subject = template.subject;
    string htmlBody = template.htmlBody;
    string plainTextBody = template.plainTextBody;

    foreach [string, string] [key, value] in variables.entries() {
        string placeholder = string `{{${key}}}`;
        subject = regex:replaceAll(subject, regex:escape(placeholder), value);
        htmlBody = regex:replaceAll(htmlBody, regex:escape(placeholder), value);
        plainTextBody = regex:replaceAll(plainTextBody, regex:escape(placeholder), value);
    }

    return {
        id: template.id,
        subject: subject,
        htmlBody: htmlBody,
        plainTextBody: plainTextBody
    };
}
```

## Step 4: Build the Notification Service

```ballerina
// main.bal
import ballerina/email;
import ballerina/http;
import ballerina/log;
import ballerina/time;
import ballerina/uuid;

configurable string smtpHost = ?;
configurable int smtpPort = 587;
configurable string smtpUser = ?;
configurable string smtpPassword = ?;
configurable string fromAddress = ?;
configurable string fromName = "Notification Service";

final email:SmtpClient smtpClient = check new (smtpHost, smtpUser, smtpPassword, {port: smtpPort});

service /notifications on new http:Listener(8090) {

    resource function post send(NotificationRequest request) returns NotificationResponse|http:BadRequest|error {
        string notificationId = uuid:createType1AsString();
        time:Utc now = time:utcNow();
        string timestamp = time:utcToString(now);

        // Look up template
        EmailTemplate? baseTemplate = templates[request.templateId];
        if baseTemplate is () {
            return <http:BadRequest>{
                body: {message: string `Unknown template: ${request.templateId}`}
            };
        }

        // Render template with variables
        EmailTemplate rendered = renderTemplate(baseTemplate, request.variables);

        // Send email with retry
        string status = "failed";
        int attempts = 0;
        int maxAttempts = 3;

        while attempts < maxAttempts {
            attempts += 1;
            error? sendResult = sendEmail(request.recipientEmail, request.recipientName, rendered);
            if sendResult is () {
                status = "sent";
                log:printInfo("Email sent successfully",
                    notificationId = notificationId,
                    recipient = request.recipientEmail,
                    template = request.templateId,
                    attempt = attempts
                );
                break;
            } else {
                log:printWarn("Email send attempt failed",
                    notificationId = notificationId,
                    attempt = attempts,
                    'error = sendResult.message()
                );
            }
        }

        return {
            notificationId: notificationId,
            status: status,
            recipientEmail: request.recipientEmail,
            timestamp: timestamp
        };
    }

    resource function get templates() returns string[] {
        return templates.keys();
    }
}

function sendEmail(string toAddress, string toName, EmailTemplate template) returns error? {
    email:Message message = {
        to: toAddress,
        subject: template.subject,
        body: template.htmlBody,
        contentType: "text/html"
    };
    check smtpClient->sendMessage(message);
}
```

## Step 5: Configure SMTP

Add your SMTP credentials to `Config.toml`:

```toml
smtpHost = "smtp.gmail.com"
smtpPort = 587
smtpUser = "your-email@gmail.com"
smtpPassword = "<APP_PASSWORD>"
fromAddress = "notifications@yourcompany.com"
fromName = "Your Company"
```

## Step 6: Test the Service

Run the project:

```bash
bal run
```

Send test notifications:

```bash
# Order confirmation
curl -X POST http://localhost:8090/notifications/send \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "order-confirmation",
    "recipientEmail": "customer@example.com",
    "recipientName": "Jane Smith",
    "variables": {
      "customerName": "Jane",
      "orderId": "ORD-12345",
      "orderTotal": "$149.99",
      "deliveryDate": "March 15, 2025"
    }
  }'

# Password reset
curl -X POST http://localhost:8090/notifications/send \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "password-reset",
    "recipientEmail": "user@example.com",
    "recipientName": "John Doe",
    "variables": {
      "userName": "John",
      "resetLink": "https://app.example.com/reset?token=abc123",
      "expiryMinutes": "30"
    }
  }'

# List available templates
curl http://localhost:8090/notifications/templates
```

## Extend It

- **Add async sending with queues** -- Use Kafka or RabbitMQ to decouple sending from the API response
- **Add delivery webhooks** -- Track bounce-backs and delivery confirmations
- **Add rate limiting** -- Prevent exceeding SMTP provider limits
- **Add attachment support** -- Allow file attachments in notification requests

## What's Next

- [Communication Connectors](../../connectors/communication.md) -- Email, SMS, and Slack connectors
- [Error Handling](../../develop/build/error-handling.md) -- Robust error handling patterns
- [Automations](../../develop/build/automations.md) -- Schedule recurring email tasks
- [Content-Based Routing](content-based-routing.md) -- Route notifications by type
