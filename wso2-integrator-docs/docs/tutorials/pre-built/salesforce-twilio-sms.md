---
sidebar_position: 8
title: "Salesforce to Twilio SMS"
description: "Pre-built integration sample: Send a Twilio SMS notification when a Salesforce opportunity is closed-won using Ballerina."
---

# Salesforce to Twilio SMS

Send an SMS notification via Twilio whenever a Salesforce opportunity is marked as Closed-Won. This integration listens for Salesforce platform events on the Opportunity object, detects stage changes to "Closed Won", and dispatches a congratulatory SMS to the opportunity owner or a designated recipient.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Salesforce developer account with a connected app and OAuth 2.0 credentials
- A Salesforce PushTopic or Change Data Capture (CDC) event configured for the Opportunity object
- Twilio account with an SMS-enabled phone number
- Twilio Account SID and Auth Token

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/salesforce-to-twilio-sms

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your Salesforce and Twilio credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[salesforce]
clientId = "<SF_CLIENT_ID>"
clientSecret = "<SF_CLIENT_SECRET>"
refreshToken = "<SF_REFRESH_TOKEN>"
baseUrl = "https://your-instance.salesforce.com"

[twilio]
accountSid = "<TWILIO_ACCOUNT_SID>"
authToken = "<TWILIO_AUTH_TOKEN>"
fromNumber = "+1234567890"

[notification]
defaultRecipient = "+1987654321"
messageTemplate = "Congrats! Opportunity '{{name}}' worth {{amount}} has been closed-won by {{owner}}."
```

## Code Walkthrough

### Project Structure

```
salesforce-to-twilio-sms/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── sf_listener.bal
├── twilio_client.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// Salesforce Opportunity change event
type OpportunityChangeEvent record {|
    string Id;
    string Name;
    string StageName;
    decimal Amount;
    string OwnerId;
    string CloseDate;
    string AccountId?;
|};

// SMS notification details
type SmsNotification record {|
    string recipientPhone;
    string message;
|};
```

### Listening to Salesforce Events

The `sf_listener.bal` file subscribes to Salesforce Change Data Capture events for the Opportunity object:

```ballerina
import ballerinax/salesforce as sfdc;
import ballerina/log;

configurable sfdc:ListenerConfig sfListenerConfig = ?;

listener sfdc:Listener sfListener = new (sfListenerConfig);

service on sfListener {
    remote function onUpdate(sfdc:EventData event) returns error? {
        json payload = event.payload;
        OpportunityChangeEvent opportunity = check payload.cloneWithType();

        if opportunity.StageName == "Closed Won" {
            log:printInfo("Opportunity closed-won detected",
                name = opportunity.Name,
                amount = opportunity.Amount);

            check sendClosedWonNotification(opportunity);
        }
    }
}
```

### Sending SMS via Twilio

```ballerina
import ballerinax/twilio;
import ballerina/log;

configurable string accountSid = ?;
configurable string authToken = ?;
configurable string fromNumber = ?;
configurable string defaultRecipient = ?;
configurable string messageTemplate = ?;

final twilio:Client twilioClient = check new ({
    accountSid: accountSid,
    authToken: authToken
});

function sendClosedWonNotification(OpportunityChangeEvent opportunity) returns error? {
    // Look up the owner's phone number, or fall back to default
    string recipientPhone = check getOwnerPhone(opportunity.OwnerId);

    // Build the message from the template
    string message = messageTemplate;
    message = re `\{\{name\}\}`.replaceAll(message, opportunity.Name);
    message = re `\{\{amount\}\}`.replaceAll(message, opportunity.Amount.toString());
    message = re `\{\{owner\}\}`.replaceAll(message, check getOwnerName(opportunity.OwnerId));

    twilio:SmsResponse response = check twilioClient->sendSms(fromNumber, recipientPhone, message);

    log:printInfo("SMS sent successfully",
        sid = response.sid,
        to = recipientPhone,
        opportunityName = opportunity.Name);
}

function getOwnerPhone(string ownerId) returns string|error {
    // Query Salesforce for the owner's mobile phone
    string query = string `SELECT MobilePhone FROM User WHERE Id = '${ownerId}' LIMIT 1`;
    stream<record {string? MobilePhone;}, error?> results = check sfClient->query(query);

    record {string? MobilePhone;}? owner = check results.next();
    check results.close();

    if owner is record {string? MobilePhone;} && owner.MobilePhone is string {
        return <string>owner.MobilePhone;
    }
    return defaultRecipient;
}

function getOwnerName(string ownerId) returns string|error {
    string query = string `SELECT Name FROM User WHERE Id = '${ownerId}' LIMIT 1`;
    stream<record {string Name;}, error?> results = check sfClient->query(query);

    record {string Name;}? owner = check results.next();
    check results.close();

    return owner is record {string Name;} ? owner.Name : "Team";
}
```

### Key Points

- **Event-driven architecture**: The integration uses Salesforce Change Data Capture (CDC) to react to opportunity stage changes in near real time without polling.
- **Template-based messages**: The SMS body is constructed from a configurable template with placeholder substitution.
- **Fallback recipient**: If the opportunity owner does not have a mobile phone on file, the SMS is sent to a configured default recipient.

## Customization Notes

- **Trigger on other stages**: Modify the stage check to send notifications for different pipeline stages (e.g., "Negotiation", "Proposal").
- **Add Slack in addition to SMS**: Use the `ballerinax/slack` connector to also post a message to a sales channel.
- **Include account details**: Extend the notification to include the account name by querying the Account object using `AccountId`.
- **Rate limiting**: Add throttling logic to avoid exceeding Twilio's SMS rate limits during bulk opportunity updates.

## What's Next

- [Kafka to Salesforce Price Book](kafka-salesforce-pricebook.md) -- Stream pricing updates to Salesforce
- [Shopify to Outlook Welcome Email](shopify-outlook-email.md) -- Send welcome emails for new customers
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
