---
sidebar_position: 11
title: "Developer Tools"
description: "Developer tools connectors for GitHub, GitLab, Jira, Jenkins, and more in WSO2 Integrator."
---

# Developer Tools Connectors

Connect your integrations to development platforms, issue trackers, and CI/CD systems. These connectors let you automate development workflows, sync issues across tools, trigger builds, and respond to repository events.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **GitHub** | `ballerinax/github` | Manage repositories, issues, pull requests, and webhooks |
| **GitLab** | `ballerinax/gitlab` | Automate merge requests, pipelines, and project management |
| **Jira** | `ballerinax/jira` | Create and manage issues, track sprints, and sync project data |
| **Jenkins** | `ballerinax/jenkins` | Trigger builds, monitor job status, and manage pipelines |
| **Bitbucket** | `ballerinax/bitbucket` | Manage repositories, pull requests, and pipelines |
| **PagerDuty** | `ballerinax/pagerduty` | Create and manage incidents, on-call schedules, and escalations |
| **Sentry** | `ballerinax/sentry` | Track errors, monitor performance, and manage alerts |
| **CircleCI** | `ballerinax/circleci` | Trigger and monitor CI/CD pipelines |

## Quick Example

### Create a Jira Issue from a GitHub Webhook

```ballerina
import ballerina/http;
import ballerinax/github;
import ballerinax/jira;

configurable string githubToken = ?;
configurable string jiraBaseUrl = ?;
configurable string jiraUser = ?;
configurable string jiraApiToken = ?;

final jira:Client jiraClient = check new ({
    baseUrl: jiraBaseUrl,
    auth: {
        username: jiraUser,
        apiToken: jiraApiToken
    }
});

service /webhooks on new http:Listener(8090) {
    resource function post github(http:Request req) returns http:Response|error {
        json payload = check req.getJsonPayload();
        string action = check payload.action;

        if action == "opened" {
            json issue = check payload.issue;
            string title = check issue.title;
            string body = check issue.body;

            jira:IssueResult result = check jiraClient->createIssue({
                fields: {
                    project: {key: "INT"},
                    summary: string `[GitHub] ${title}`,
                    description: body,
                    issuetype: {name: "Task"}
                }
            });

            http:Response res = new;
            res.setJsonPayload({jiraKey: result.key});
            return res;
        }

        return new http:Response();
    }
}
```

## Configuration

```toml
# GitHub
[github]
githubToken = "<GITHUB_PERSONAL_ACCESS_TOKEN>"

# Jira
[jira]
jiraBaseUrl = "https://your-org.atlassian.net"
jiraUser = "user@example.com"
jiraApiToken = "<JIRA_API_TOKEN>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [GitHub Email Summary](../tutorials/pre-built/github-email-summary.md) -- Pre-built integration for GitHub notifications
- [CI/CD with GitHub Actions](../deploy-operate/cicd/github-actions.md) -- Deploy your integrations with GitHub Actions
