---
sidebar_position: 17
title: "Marketing & Social Media"
description: "Marketing and social media connectors for Mailchimp, Meta Ads, Google Ads, and more in WSO2 Integrator."
---

# Marketing & Social Media Connectors

Connect your integrations with marketing automation platforms, advertising networks, and social media APIs. These connectors let you manage email campaigns, sync audience data, track ad performance, and automate marketing workflows.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **Mailchimp** | `ballerinax/mailchimp` | Manage email campaigns, audiences, and subscriber lists |
| **SendGrid** | `ballerinax/sendgrid` | Send transactional and marketing emails at scale |
| **Google Ads** | `ballerinax/googleapis.ads` | Manage campaigns, ad groups, keywords, and reporting |
| **Meta (Facebook) Ads** | `ballerinax/meta.ads` | Manage ad campaigns, audiences, and conversion tracking |
| **LinkedIn Marketing** | `ballerinax/linkedin.marketing` | Manage sponsored content, audiences, and analytics |
| **HubSpot Marketing** | `ballerinax/hubspot.marketing` | Automate email workflows, manage forms, and track engagement |
| **Brevo (Sendinblue)** | `ballerinax/brevo` | Manage email campaigns, SMS marketing, and contacts |
| **X (Twitter)** | `ballerinax/twitter` | Post tweets, manage timelines, and monitor mentions |

## Quick Example

### Add a New Contact to Mailchimp and Send a Welcome Email

```ballerina
import ballerina/http;
import ballerinax/mailchimp;

configurable string mailchimpApiKey = ?;
configurable string mailchimpServer = ?;
configurable string audienceId = ?;

final mailchimp:Client mcClient = check new ({
    auth: {
        apiKey: mailchimpApiKey
    },
    server: mailchimpServer
});

type SubscribeRequest record {|
    string email;
    string firstName;
    string lastName;
    string[] tags?;
|};

service /api on new http:Listener(8090) {
    resource function post subscribe(SubscribeRequest sub) returns json|error {
        // Add or update the subscriber in Mailchimp
        mailchimp:Member member = check mcClient->addListMember(audienceId, {
            email_address: sub.email,
            status: "subscribed",
            merge_fields: {
                "FNAME": sub.firstName,
                "LNAME": sub.lastName
            }
        });

        // Add tags if provided
        if sub.tags is string[] {
            check mcClient->updateMemberTags(audienceId, member.id, {
                tags: from string tag in <string[]>sub.tags
                    select {name: tag, status: "active"}
            });
        }

        return {
            status: "subscribed",
            memberId: member.id,
            email: member.email_address
        };
    }
}
```

### Send a Transactional Email with SendGrid

```ballerina
import ballerinax/sendgrid;

configurable string sendgridApiKey = ?;

final sendgrid:Client sgClient = check new ({
    auth: {
        apiKey: sendgridApiKey
    }
});

function sendWelcomeEmail(string toEmail, string name) returns error? {
    check sgClient->sendMail({
        personalizations: [{
            to: [{email: toEmail}],
            dynamic_template_data: {
                "name": name,
                "welcome_url": "https://example.com/get-started"
            }
        }],
        'from: {email: "noreply@example.com", name: "Example App"},
        template_id: "d-abc123def456"
    });
}
```

## Configuration

```toml
# Mailchimp
[mailchimp]
mailchimpApiKey = "<MAILCHIMP_API_KEY>"
mailchimpServer = "us1"
audienceId = "<MAILCHIMP_AUDIENCE_ID>"

# SendGrid
[sendgrid]
sendgridApiKey = "<SENDGRID_API_KEY>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [Communication Connectors](communication.md) -- Email, SMS, and team messaging connectors
- [HubSpot Google Contacts Integration](../tutorials/pre-built/hubspot-google-contacts.md) -- Pre-built HubSpot sync integration
