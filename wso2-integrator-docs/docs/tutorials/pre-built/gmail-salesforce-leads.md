---
sidebar_position: 6
title: "Gmail to Salesforce Leads (with OpenAI)"
description: "Pre-built integration sample: Parse incoming Gmail messages with OpenAI and automatically create Salesforce leads using Ballerina."
---

# Gmail to Salesforce Leads (with OpenAI)

Automatically parse incoming Gmail messages using OpenAI to extract lead information -- such as name, company, email, and interest -- and create corresponding lead records in Salesforce. This sample monitors a Gmail inbox for new messages matching specific criteria, sends the email body to OpenAI for structured data extraction, and creates a Salesforce lead from the parsed result.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Google Cloud project with the Gmail API enabled and OAuth 2.0 credentials configured
- OpenAI API key with access to GPT-4 or GPT-3.5
- Salesforce developer account with a connected app and OAuth 2.0 credentials

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/gmail-to-salesforce-leads

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your Gmail, OpenAI, and Salesforce credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[gmail]
clientId = "<GOOGLE_CLIENT_ID>"
clientSecret = "<GOOGLE_CLIENT_SECRET>"
refreshToken = "<GOOGLE_REFRESH_TOKEN>"
labelFilter = "INBOX"
queryFilter = "is:unread subject:(inquiry OR demo OR pricing)"

[openai]
apiKey = "<OPENAI_API_KEY>"
model = "gpt-4"

[salesforce]
clientId = "<SF_CLIENT_ID>"
clientSecret = "<SF_CLIENT_SECRET>"
refreshToken = "<SF_REFRESH_TOKEN>"
baseUrl = "https://your-instance.salesforce.com"
```

## Code Walkthrough

### Project Structure

```
gmail-to-salesforce-leads/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── gmail_client.bal
├── openai_parser.bal
├── sf_client.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// Extracted lead information from OpenAI parsing
type ParsedLead record {|
    string firstName;
    string lastName;
    string email;
    string company;
    string phone?;
    string interest;
    string leadSource;
    string originalSubject;
|};

// Salesforce Lead record
type SalesforceLead record {|
    string FirstName;
    string LastName;
    string Email;
    string Company;
    string Phone?;
    string Description;
    string LeadSource;
    string Status;
|};
```

### Monitoring Gmail for New Messages

```ballerina
import ballerinax/googleapis.gmail;
import ballerina/log;

configurable gmail:ConnectionConfig gmailConfig = ?;
configurable string queryFilter = ?;

final gmail:Client gmailClient = check new (gmailConfig);

function fetchUnreadEmails() returns gmail:Message[]|error {
    gmail:MessageListPage messagePage = check gmailClient->listMessages(
        q = queryFilter
    );

    gmail:Message[] fullMessages = [];
    foreach gmail:MessageThread msg in messagePage.messages {
        gmail:Message fullMsg = check gmailClient->readMessage(msg.id);
        fullMessages.push(fullMsg);
    }

    log:printInfo("Fetched unread emails", count = fullMessages.length());
    return fullMessages;
}

function markAsRead(string messageId) returns error? {
    _ = check gmailClient->modifyMessage(messageId, [], ["UNREAD"]);
}
```

### Parsing Emails with OpenAI

The `openai_parser.bal` file sends the email body to OpenAI with a structured prompt to extract lead information:

```ballerina
import ballerinax/openai.chat;
import ballerina/log;

configurable string openaiApiKey = ?;
configurable string openaiModel = "gpt-4";

final chat:Client openaiClient = check new ({auth: {token: openaiApiKey}});

function parseEmailForLead(string subject, string body, string senderEmail) returns ParsedLead|error {
    string prompt = string `
        Extract lead information from the following email.
        Return a JSON object with these fields:
        - firstName (string)
        - lastName (string)
        - email (string)
        - company (string)
        - phone (string or null)
        - interest (brief summary of what they are interested in)

        Email subject: ${subject}
        Sender: ${senderEmail}
        Email body:
        ${body}
    `;

    chat:CreateChatCompletionResponse response = check openaiClient->/chat/completions.post({
        model: openaiModel,
        messages: [
            {role: "system", content: "You are a lead extraction assistant. Return only valid JSON."},
            {role: "user", content: prompt}
        ],
        response_format: {type: "json_object"}
    });

    string jsonResponse = check response.choices[0].message.content.ensureType();
    json parsedJson = check jsonResponse.fromJsonString();

    ParsedLead lead = {
        firstName: check parsedJson.firstName,
        lastName: check parsedJson.lastName,
        email: (check parsedJson.email).toString(),
        company: check parsedJson.company,
        phone: (check parsedJson.phone) is string ? check parsedJson.phone : (),
        interest: check parsedJson.interest,
        leadSource: "Email Inquiry",
        originalSubject: subject
    };

    log:printInfo("Parsed lead from email",
        name = lead.firstName + " " + lead.lastName,
        company = lead.company);
    return lead;
}
```

### Creating the Salesforce Lead

```ballerina
import ballerinax/salesforce;
import ballerina/log;

configurable salesforce:ConnectionConfig sfConfig = ?;

final salesforce:Client sfClient = check new (sfConfig);

function createSalesforceLead(ParsedLead parsed) returns error? {
    SalesforceLead sfLead = {
        FirstName: parsed.firstName,
        LastName: parsed.lastName,
        Email: parsed.email,
        Company: parsed.company,
        Phone: parsed.phone,
        Description: string `Interest: ${parsed.interest}. Original subject: ${parsed.originalSubject}`,
        LeadSource: parsed.leadSource,
        Status: "New"
    };

    salesforce:CreationResponse response = check sfClient->create("Lead", sfLead);
    log:printInfo("Created Salesforce lead",
        id = response.id,
        name = parsed.firstName + " " + parsed.lastName);
}
```

### Orchestrating the Flow

```ballerina
import ballerina/task;
import ballerina/log;

public function main() returns error? {
    _ = check task:scheduleJobRecurByFrequency(new LeadCaptureJob(), 120);
    log:printInfo("Gmail-to-Salesforce lead capture started");
}

class LeadCaptureJob {
    *task:Job;

    isolated function execute() {
        error? result = processNewEmails();
        if result is error {
            log:printError("Lead capture cycle failed", result);
        }
    }
}

function processNewEmails() returns error? {
    gmail:Message[] emails = check fetchUnreadEmails();

    foreach gmail:Message email in emails {
        string subject = email.subject ?: "No Subject";
        string body = email.plainTextBody ?: "";
        string sender = email.from ?: "";

        ParsedLead|error parsedLead = parseEmailForLead(subject, body, sender);

        if parsedLead is ParsedLead {
            check createSalesforceLead(parsedLead);
            check markAsRead(email.id);
            log:printInfo("Lead processed successfully", subject = subject);
        } else {
            log:printWarn("Could not parse lead from email",
                subject = subject,
                reason = parsedLead.message());
        }
    }
}
```

### Key Points

- **AI-powered extraction**: OpenAI parses unstructured email text into structured lead data, handling variations in email format and content.
- **Structured JSON output**: The `response_format` parameter ensures OpenAI returns valid JSON, reducing parsing errors.
- **Idempotent processing**: Emails are marked as read after successful processing to prevent duplicate lead creation.
- **Graceful error handling**: If OpenAI cannot parse a lead from an email, the error is logged and the email is skipped rather than failing the entire batch.

## Customization Notes

- **Adjust the Gmail filter**: Modify `queryFilter` to match different subjects, labels, or senders relevant to your lead capture workflow.
- **Use a different LLM**: Replace the OpenAI connector with the Anthropic or Azure OpenAI connector for alternative model providers.
- **Add lead scoring**: Extend the OpenAI prompt to include a lead quality score (1-10) and map it to a Salesforce custom field.
- **Duplicate detection**: Before creating a lead, query Salesforce to check if a lead with the same email already exists, and update it instead.

## What's Next

- [Google Sheets to Salesforce Contacts](google-sheets-salesforce.md) -- Sync spreadsheet rows to CRM contacts
- [Salesforce to Twilio SMS](salesforce-twilio-sms.md) -- Send SMS notifications on Salesforce events
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
