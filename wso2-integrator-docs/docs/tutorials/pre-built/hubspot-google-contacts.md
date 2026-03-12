---
sidebar_position: 9
title: "HubSpot to Google Contacts"
description: "Pre-built integration sample: Sync HubSpot CRM contacts to Google Contacts using Ballerina."
---

# HubSpot to Google Contacts

Synchronize contacts from HubSpot CRM to Google Contacts automatically. When a new contact is created or updated in HubSpot, this integration maps the contact data to a Google People API contact record and creates or updates it in your Google Contacts, keeping both systems in sync.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- HubSpot account with API access and a private app access token
- Google Cloud project with the People API enabled and OAuth 2.0 credentials configured
- A Google Contacts contact group (optional, for organizing synced contacts)

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/hubspot-to-google-contacts

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your HubSpot and Google credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[hubspot]
accessToken = "<HUBSPOT_ACCESS_TOKEN>"
pollingIntervalSeconds = 120

[google]
clientId = "<GOOGLE_CLIENT_ID>"
clientSecret = "<GOOGLE_CLIENT_SECRET>"
refreshToken = "<GOOGLE_REFRESH_TOKEN>"
contactGroupId = "<CONTACT_GROUP_RESOURCE_NAME>"
```

## Code Walkthrough

### Project Structure

```
hubspot-to-google-contacts/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── hubspot_client.bal
├── google_contacts_client.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// HubSpot contact record
type HubSpotContact record {|
    string vid;
    string firstName;
    string lastName;
    string email;
    string? phone;
    string? company;
    string? jobTitle;
    string lastModified;
|};

// Google People API contact
type GoogleContact record {|
    string? resourceName;
    Name[] names;
    EmailAddress[] emailAddresses;
    PhoneNumber[]? phoneNumbers;
    Organization[]? organizations;
|};

type Name record {|
    string givenName;
    string familyName;
|};

type EmailAddress record {|
    string value;
    string 'type;
|};

type PhoneNumber record {|
    string value;
    string 'type;
|};

type Organization record {|
    string name;
    string? title;
|};
```

### Fetching Contacts from HubSpot

```ballerina
import ballerina/http;
import ballerina/log;

configurable string hubspotAccessToken = ?;

final http:Client hubspotClient = check new ("https://api.hubapi.com", {
    auth: {token: hubspotAccessToken}
});

string lastSyncTimestamp = "";

function fetchRecentHubSpotContacts() returns HubSpotContact[]|error {
    json response = check hubspotClient->get("/crm/v3/objects/contacts?limit=100&properties=firstname,lastname,email,phone,company,jobtitle&sort=-lastmodifieddate");

    json[] results = check response.results.ensureType();
    HubSpotContact[] contacts = [];

    foreach json result in results {
        json props = check result.properties;
        string lastModified = (check props.hs_lastmodifieddate).toString();

        // Skip contacts that have not been modified since the last sync
        if lastModified <= lastSyncTimestamp {
            continue;
        }

        contacts.push({
            vid: (check result.id).toString(),
            firstName: (check props.firstname).toString(),
            lastName: (check props.lastname).toString(),
            email: (check props.email).toString(),
            phone: props.phone is () ? () : (check props.phone).toString(),
            company: props.company is () ? () : (check props.company).toString(),
            jobTitle: props.jobtitle is () ? () : (check props.jobtitle).toString(),
            lastModified: lastModified
        });
    }

    if contacts.length() > 0 {
        lastSyncTimestamp = contacts[0].lastModified;
    }

    log:printInfo("Fetched HubSpot contacts", count = contacts.length());
    return contacts;
}
```

### Creating or Updating Google Contacts

```ballerina
import ballerina/http;
import ballerina/log;

configurable http:OAuth2RefreshTokenGrantConfig googleAuthConfig = ?;
configurable string? contactGroupId = ();

final http:Client googlePeopleClient = check new ("https://people.googleapis.com", {
    auth: googleAuthConfig
});

// Map to track HubSpot VID to Google resourceName
map<string> syncedContacts = {};

function syncToGoogleContacts(HubSpotContact hubspotContact) returns error? {
    GoogleContact googleContact = transformToGoogleContact(hubspotContact);

    string? existingResourceName = syncedContacts[hubspotContact.vid];

    if existingResourceName is string {
        // Update existing Google contact
        json payload = googleContact.toJson();
        _ = check googlePeopleClient->patch(
            string `/${existingResourceName}:updateContact?updatePersonFields=names,emailAddresses,phoneNumbers,organizations`,
            payload
        );
        log:printInfo("Updated Google contact",
            name = hubspotContact.firstName + " " + hubspotContact.lastName);
    } else {
        // Create new Google contact
        json payload = googleContact.toJson();
        json response = check googlePeopleClient->post("/v1/people:createContact", payload);
        string resourceName = (check response.resourceName).toString();
        syncedContacts[hubspotContact.vid] = resourceName;

        // Add to contact group if configured
        if contactGroupId is string {
            check addToContactGroup(resourceName, <string>contactGroupId);
        }

        log:printInfo("Created Google contact",
            name = hubspotContact.firstName + " " + hubspotContact.lastName,
            resourceName = resourceName);
    }
}

function transformToGoogleContact(HubSpotContact contact) returns GoogleContact {
    GoogleContact gc = {
        resourceName: (),
        names: [{givenName: contact.firstName, familyName: contact.lastName}],
        emailAddresses: [{value: contact.email, 'type: "work"}],
        phoneNumbers: (),
        organizations: ()
    };

    if contact.phone is string {
        gc.phoneNumbers = [{value: <string>contact.phone, 'type: "work"}];
    }

    if contact.company is string {
        gc.organizations = [{name: <string>contact.company, title: contact.jobTitle}];
    }

    return gc;
}

function addToContactGroup(string resourceName, string groupResourceName) returns error? {
    json payload = {resourceNamesToAdd: [resourceName]};
    _ = check googlePeopleClient->post(
        string `/v1/${groupResourceName}/members:modify`, payload
    );
}
```

### Orchestrating the Sync

```ballerina
import ballerina/task;
import ballerina/log;

configurable int pollingIntervalSeconds = 120;

public function main() returns error? {
    _ = check task:scheduleJobRecurByFrequency(new ContactSyncJob(), pollingIntervalSeconds);
    log:printInfo("HubSpot to Google Contacts sync started",
        interval = pollingIntervalSeconds);
}

class ContactSyncJob {
    *task:Job;

    isolated function execute() {
        error? result = syncContacts();
        if result is error {
            log:printError("Contact sync cycle failed", result);
        }
    }
}

function syncContacts() returns error? {
    HubSpotContact[] contacts = check fetchRecentHubSpotContacts();

    foreach HubSpotContact contact in contacts {
        error? result = syncToGoogleContacts(contact);
        if result is error {
            log:printError("Failed to sync contact",
                result,
                name = contact.firstName + " " + contact.lastName);
        }
    }

    log:printInfo("Sync cycle completed", processedCount = contacts.length());
}
```

### Key Points

- **Incremental sync**: Only contacts modified since the last sync cycle are processed, minimizing API calls to both HubSpot and Google.
- **Create or update**: The integration tracks which HubSpot contacts have already been synced by maintaining a mapping of HubSpot VID to Google resource name.
- **Contact group support**: Synced contacts can optionally be placed in a designated Google Contacts group for easy organization.

## Customization Notes

- **Bi-directional sync**: Extend the integration to also poll Google Contacts for changes and push them back to HubSpot.
- **Field mapping**: Add additional fields like address, website, or custom HubSpot properties by extending the type definitions and transform function.
- **Webhook trigger**: Replace polling with HubSpot webhooks for near-real-time sync when contacts are created or updated.
- **Deduplication**: Before creating a new Google contact, search by email address to prevent duplicates from contacts that were added outside this integration.

## What's Next

- [Shopify to Outlook Welcome Email](shopify-outlook-email.md) -- Send welcome emails on new customer signups
- [Google Sheets to Salesforce Contacts](google-sheets-salesforce.md) -- Sync spreadsheet rows to CRM
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
