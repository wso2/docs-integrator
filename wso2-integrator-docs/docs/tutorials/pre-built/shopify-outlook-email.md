---
sidebar_position: 11
title: "Shopify to Outlook Welcome Email"
description: "Pre-built integration sample: Send a personalized Outlook welcome email when a new customer registers on Shopify using Ballerina."
---

# Shopify to Outlook Welcome Email

Send a personalized welcome email via Microsoft Outlook whenever a new customer registers on your Shopify store. This integration listens for Shopify webhook events for new customer creation, composes a branded HTML welcome email, and sends it through the Microsoft Graph API using Outlook.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Shopify store with admin API access and webhook configuration rights
- Microsoft Azure app registration with Mail.Send permissions (Microsoft Graph API)
- An Outlook or Microsoft 365 mailbox to send from

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/shopify-to-outlook-email

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your Shopify and Microsoft credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[shopify]
storeUrl = "https://your-store.myshopify.com"
apiAccessToken = "<SHOPIFY_ADMIN_API_TOKEN>"
webhookSecret = "<SHOPIFY_WEBHOOK_HMAC_SECRET>"

[microsoft]
clientId = "<AZURE_CLIENT_ID>"
clientSecret = "<AZURE_CLIENT_SECRET>"
refreshToken = "<AZURE_REFRESH_TOKEN>"
tenantId = "<AZURE_TENANT_ID>"
senderEmail = "welcome@yourcompany.com"

[email]
subject = "Welcome to Our Store!"
```

## Code Walkthrough

### Project Structure

```
shopify-to-outlook-email/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── shopify_webhook.bal
├── outlook_client.bal
├── email_template.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// Shopify new customer webhook payload
type ShopifyCustomer record {|
    int id;
    string first_name;
    string last_name;
    string email;
    string? phone;
    string created_at;
    boolean accepts_marketing;
    ShopifyAddress? default_address;
|};

type ShopifyAddress record {|
    string? city;
    string? province;
    string? country;
|};

// Outlook email message (Microsoft Graph API)
type OutlookMessage record {|
    OutlookMessageBody message;
    boolean saveToSentItems;
|};

type OutlookMessageBody record {|
    string subject;
    OutlookBody body;
    OutlookRecipient[] toRecipients;
|};

type OutlookBody record {|
    string contentType;
    string content;
|};

type OutlookRecipient record {|
    OutlookEmailAddress emailAddress;
|};

type OutlookEmailAddress record {|
    string address;
    string name;
|};
```

### Receiving Shopify Webhooks

The `shopify_webhook.bal` file exposes an HTTP endpoint that receives Shopify customer creation webhooks:

```ballerina
import ballerina/http;
import ballerina/crypto;
import ballerina/log;

configurable string webhookSecret = ?;
configurable int servicePort = 8090;

service /shopify on new http:Listener(servicePort) {

    resource function post webhooks/customers/create(
            http:Request request) returns http:Ok|http:Unauthorized|error {

        // Verify the Shopify HMAC signature
        string payload = check request.getTextPayload();
        string? hmacHeader = check request.getHeader("X-Shopify-Hmac-SHA256");

        if !verifyShopifyHmac(payload, hmacHeader) {
            log:printWarn("Invalid Shopify webhook signature");
            return http:UNAUTHORIZED;
        }

        // Parse the customer data
        ShopifyCustomer customer = check payload.fromJsonString().cloneWithType();

        log:printInfo("New Shopify customer received",
            name = customer.first_name + " " + customer.last_name,
            email = customer.email);

        // Send the welcome email
        check sendWelcomeEmail(customer);

        return http:OK;
    }
}

function verifyShopifyHmac(string payload, string? hmacHeader) returns boolean {
    if hmacHeader is () {
        return false;
    }

    byte[] computedHmac = crypto:hmacSha256(payload.toBytes(), webhookSecret.toBytes());
    string computedBase64 = computedHmac.toBase64();
    return computedBase64 == hmacHeader;
}
```

### Building the Welcome Email

```ballerina
function buildWelcomeEmailHtml(ShopifyCustomer customer) returns string {
    string firstName = customer.first_name;
    string location = "";

    if customer.default_address is ShopifyAddress {
        ShopifyAddress addr = <ShopifyAddress>customer.default_address;
        string?[] parts = [addr.city, addr.province, addr.country];
        string[] nonNullParts = from string? p in parts where p is string select <string>p;
        location = nonNullParts.length() > 0
            ? string ` from ${string:'join(", ", ...nonNullParts)}`
            : "";
    }

    return string `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8f9fa; padding: 30px; text-align: center;">
                <h1 style="color: #333;">Welcome, ${firstName}!</h1>
            </div>
            <div style="padding: 30px;">
                <p>Hi ${firstName}${location},</p>
                <p>Thank you for creating an account with us. We are excited to have you
                   as part of our community.</p>
                <p>Here is what you can do next:</p>
                <ul>
                    <li>Browse our latest collections</li>
                    <li>Set your preferences</li>
                    <li>Check out our featured deals</li>
                </ul>
                <p>If you have any questions, just reply to this email. We are here to help.</p>
                <p>Best regards,<br/>The Team</p>
            </div>
        </body>
        </html>
    `;
}
```

### Sending via Microsoft Outlook

```ballerina
import ballerina/http;
import ballerina/log;

configurable http:OAuth2RefreshTokenGrantConfig msAuthConfig = ?;
configurable string senderEmail = ?;
configurable string emailSubject = "Welcome to Our Store!";

final http:Client graphClient = check new ("https://graph.microsoft.com/v1.0", {
    auth: msAuthConfig
});

function sendWelcomeEmail(ShopifyCustomer customer) returns error? {
    string htmlBody = buildWelcomeEmailHtml(customer);

    OutlookMessage emailMessage = {
        message: {
            subject: emailSubject,
            body: {
                contentType: "HTML",
                content: htmlBody
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: customer.email,
                        name: customer.first_name + " " + customer.last_name
                    }
                }
            ]
        },
        saveToSentItems: true
    };

    _ = check graphClient->post(
        string `/users/${senderEmail}/sendMail`,
        emailMessage
    );

    log:printInfo("Welcome email sent",
        to = customer.email,
        name = customer.first_name + " " + customer.last_name);
}
```

### Key Points

- **Webhook-driven**: The integration reacts instantly to new customer registrations via Shopify webhooks, with no polling required.
- **HMAC verification**: Every incoming webhook is validated using the Shopify HMAC-SHA256 signature to prevent unauthorized requests.
- **HTML email**: The welcome email is built as branded HTML with the customer's name and location personalized.
- **Microsoft Graph API**: Emails are sent through the Microsoft Graph API, supporting any Outlook or Microsoft 365 mailbox.

## Customization Notes

- **Customize the email template**: Modify `buildWelcomeEmailHtml` to match your brand's design, add product images, or include a discount code.
- **Add a delay**: Introduce a short delay (e.g., 5 minutes) before sending the welcome email to avoid overwhelming new customers with immediate messages.
- **Conditional emails**: Check `accepts_marketing` to send different content to customers who opted in versus those who did not.
- **Attach a coupon**: Generate a unique discount code via the Shopify Admin API and include it in the welcome email.

## What's Next

- [HubSpot to Google Contacts](hubspot-google-contacts.md) -- Sync CRM contacts to Google Contacts
- [Salesforce to Twilio SMS](salesforce-twilio-sms.md) -- Send SMS on Salesforce events
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
