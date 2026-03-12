---
sidebar_position: 3
title: "GitHub to Email Summary"
description: "Pre-built integration sample: Generate a daily email summary of GitHub repository activity using Ballerina."
---

# GitHub to Email Summary

Generate and send a daily email digest summarizing activity across your GitHub repositories, including new issues, pull requests, commits, and releases. This sample runs on a configurable schedule, queries the GitHub API for recent events, compiles a formatted summary, and delivers it via SMTP email.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- GitHub personal access token with `repo` scope
- SMTP email credentials (Gmail, Outlook, or any SMTP server)
- One or more GitHub repositories to monitor

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/github-to-email-summary

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your GitHub token and SMTP credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[github]
token = "<GITHUB_PERSONAL_ACCESS_TOKEN>"
repos = ["org/repo-1", "org/repo-2"]

[email]
host = "smtp.gmail.com"
port = 465
username = "<EMAIL_ADDRESS>"
password = "<EMAIL_APP_PASSWORD>"
toAddresses = ["team@example.com"]
subject = "Daily GitHub Activity Summary"
```

## Code Walkthrough

### Project Structure

```
github-to-email-summary/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── github_client.bal
├── email_builder.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// Summary of a single repository's activity
type RepoSummary record {|
    string repoName;
    int newIssues;
    int closedIssues;
    int openedPRs;
    int mergedPRs;
    int commits;
    string[] highlights;
|};

// Overall daily summary
type DailySummary record {|
    string date;
    RepoSummary[] repos;
    int totalEvents;
|};
```

### Fetching GitHub Activity

The `github_client.bal` file queries the GitHub REST API for events that occurred in the last 24 hours:

```ballerina
import ballerinax/github;
import ballerina/time;
import ballerina/log;

configurable string githubToken = ?;
configurable string[] repos = ?;

final github:Client ghClient = check new ({auth: {token: githubToken}});

function fetchRepoSummary(string repoFullName) returns RepoSummary|error {
    string [owner, repo] = check parseRepoName(repoFullName);
    time:Utc yesterday = time:utcAddSeconds(time:utcNow(), -86400);
    string since = time:utcToString(yesterday);

    // Fetch issues created in the last 24 hours
    github:Issue[] issues = check ghClient->/repos/[owner]/[repo]/issues(
        state = "all",
        since = since
    );

    // Fetch pull requests
    github:PullRequest[] prs = check ghClient->/repos/[owner]/[repo]/pulls(
        state = "all"
    );

    // Fetch recent commits
    github:Commit[] commits = check ghClient->/repos/[owner]/[repo]/commits(
        since = since
    );

    int newIssues = issues.filter(i => i.state == "open").length();
    int closedIssues = issues.filter(i => i.state == "closed").length();

    return {
        repoName: repoFullName,
        newIssues: newIssues,
        closedIssues: closedIssues,
        openedPRs: prs.filter(p => p.state == "open").length(),
        mergedPRs: prs.filter(p => p.merged_at != ()).length(),
        commits: commits.length(),
        highlights: buildHighlights(issues, prs)
    };
}
```

### Building the Email Content

The `email_builder.bal` file compiles repo summaries into a formatted HTML email:

```ballerina
function buildEmailBody(DailySummary summary) returns string {
    string html = string `<h2>GitHub Activity Summary - ${summary.date}</h2>`;
    html += string `<p>Total events across all repositories: <strong>${summary.totalEvents}</strong></p>`;

    foreach RepoSummary repo in summary.repos {
        html += string `
            <h3>${repo.repoName}</h3>
            <ul>
                <li>New issues: ${repo.newIssues}</li>
                <li>Closed issues: ${repo.closedIssues}</li>
                <li>Opened PRs: ${repo.openedPRs}</li>
                <li>Merged PRs: ${repo.mergedPRs}</li>
                <li>Commits: ${repo.commits}</li>
            </ul>`;

        if repo.highlights.length() > 0 {
            html += "<h4>Highlights</h4><ul>";
            foreach string item in repo.highlights {
                html += string `<li>${item}</li>`;
            }
            html += "</ul>";
        }
    }

    return html;
}
```

### Scheduling and Sending

The `main.bal` file ties everything together with a daily schedule:

```ballerina
import ballerina/email;
import ballerina/task;
import ballerina/time;
import ballerina/log;

configurable string smtpHost = ?;
configurable int smtpPort = ?;
configurable string smtpUsername = ?;
configurable string smtpPassword = ?;
configurable string[] toAddresses = ?;
configurable string emailSubject = "Daily GitHub Activity Summary";

final email:SmtpClient smtpClient = check new (smtpHost, smtpUsername, smtpPassword, port = smtpPort);

public function main() returns error? {
    // Schedule to run every day at 8:00 AM
    time:Civil scheduledTime = {year: 0, month: 0, day: 0, hour: 8, minute: 0};
    _ = check task:scheduleJobRecurByFrequency(new DailySummaryJob(), 86400);
    log:printInfo("GitHub email summary scheduled");
}

class DailySummaryJob {
    *task:Job;

    isolated function execute() {
        error? result = generateAndSendSummary();
        if result is error {
            log:printError("Failed to generate summary", result);
        }
    }
}

function generateAndSendSummary() returns error? {
    RepoSummary[] repoSummaries = [];
    int totalEvents = 0;

    foreach string repo in repos {
        RepoSummary summary = check fetchRepoSummary(repo);
        repoSummaries.push(summary);
        totalEvents += summary.newIssues + summary.closedIssues +
                       summary.openedPRs + summary.mergedPRs + summary.commits;
    }

    DailySummary dailySummary = {
        date: time:utcToString(time:utcNow()).substring(0, 10),
        repos: repoSummaries,
        totalEvents: totalEvents
    };

    string emailBody = buildEmailBody(dailySummary);

    foreach string addr in toAddresses {
        check smtpClient->sendMessage({
            to: addr,
            subject: emailSubject,
            htmlBody: emailBody
        });
    }

    log:printInfo("Daily summary sent", recipientCount = toAddresses.length());
}
```

### Key Points

- **Scheduled execution**: The job runs every 24 hours (86400 seconds) and queries events from the past 24 hours.
- **Multi-repo support**: Configure multiple repositories in the `repos` array to get a consolidated summary.
- **HTML formatting**: The email body is built as HTML for clear, readable summaries in any email client.

## Customization Notes

- **Change the schedule**: Modify the frequency parameter to run hourly (`3600`) or weekly (`604800`) instead of daily.
- **Add Slack notifications**: Replace or supplement email delivery with a Slack webhook using the `ballerinax/slack` connector.
- **Filter event types**: Modify `fetchRepoSummary` to focus on specific event types, such as only security-related issues or release tags.
- **Include release notes**: Extend the GitHub client to also fetch recent releases and include release notes in the digest.

## What's Next

- [Google Sheets to Salesforce Contacts](google-sheets-salesforce.md) -- Sync spreadsheet rows to CRM contacts
- [HubSpot to Google Contacts](hubspot-google-contacts.md) -- Sync CRM contacts across platforms
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
