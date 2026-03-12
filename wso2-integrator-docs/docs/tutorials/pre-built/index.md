---
sidebar_position: 1
title: Pre-Built Integration Samples
description: "Ready-to-run integration samples that connect popular services. Clone, configure, and deploy in minutes."
---

# Pre-Built Integration Samples

Ready-to-run integration samples built with Ballerina that connect popular SaaS applications, databases, and messaging systems. Each sample is a complete, working project that you can clone from GitHub, add your credentials, and run immediately.

These samples are sourced from the [Ballerina Integrator](https://github.com/ballerina-platform/module-ballerinax-integrator) project and demonstrate real-world integration scenarios that you can customize and extend.

## Available Samples

| Sample | Source | Target | Trigger |
|--------|--------|--------|---------|
| [Google Sheets to Salesforce Contacts](google-sheets-salesforce.md) | Google Sheets | Salesforce | New spreadsheet row |
| [GitHub to Email Summary](github-email-summary.md) | GitHub | Email (SMTP) | Scheduled (daily) |
| [Google Drive to OneDrive Sync](google-drive-onedrive.md) | Google Drive | Microsoft OneDrive | New file uploaded |
| [MySQL to Salesforce Products](mysql-salesforce-products.md) | MySQL | Salesforce | Scheduled poll |
| [Gmail to Salesforce Leads (with OpenAI)](gmail-salesforce-leads.md) | Gmail | Salesforce | New email |
| [Kafka to Salesforce Price Book](kafka-salesforce-pricebook.md) | Kafka | Salesforce | Kafka message |
| [Salesforce to Twilio SMS](salesforce-twilio-sms.md) | Salesforce | Twilio | Salesforce event |
| [HubSpot to Google Contacts](hubspot-google-contacts.md) | HubSpot | Google Contacts | New HubSpot contact |
| [FTP EDI to Salesforce Opportunity](ftp-edi-salesforce.md) | FTP (EDI files) | Salesforce | New FTP file |
| [Shopify to Outlook Welcome Email](shopify-outlook-email.md) | Shopify | Microsoft Outlook | New Shopify customer |

## How to Use These Samples

Each sample follows the same workflow:

1. **Clone** the repository
2. **Configure** credentials in `Config.toml`
3. **Run** with `bal run`
4. **Customize** to fit your specific requirements

### Quick Start

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples

# Pick a sample
cd google-sheets-to-salesforce-contacts

# Configure credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your credentials

# Run
bal run
```

## What's Next

- [Sample Projects](../samples/index.md) -- Larger sample projects with multiple features
- [End-to-End Walkthroughs](../walkthroughs/content-based-routing.md) -- Step-by-step tutorials
- [Connectors](../../connectors/index.md) -- Browse the full connector catalog
