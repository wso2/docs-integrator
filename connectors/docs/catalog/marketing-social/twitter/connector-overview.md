---
title: Overview
---

# Overview

Twitter (X) is a widely-used social networking service provided by X Corp., enabling users to post and interact with messages known as "tweets." The Ballerina `ballerinax/twitter` connector (v5.0.0) provides programmatic access to the Twitter (X) API v2 endpoints, allowing you to manage tweets, users, direct messages, bookmarks, likes, and more from your Ballerina integration flows.

## Key features

- Create, retrieve, and delete tweets using Twitter API v2 resource-based operations
- Search tweets with recent and full-archive search endpoints
- Manage user relationships: follow, unfollow, mute, block, and list followers/following
- Send and retrieve direct messages (DM) in one-to-one and group conversations
- Bookmark and un-bookmark tweets for the authenticated user
- Like and unlike tweets, and retrieve a user's liked tweets
- Retrieve user profile information including public metrics and pinned tweets
- Manage lists: create, update, delete lists and manage list members

## Actions

Actions are operations you invoke on Twitter (X) from your integration, including posting tweets, searching content, managing users, sending direct messages, and more. The Twitter connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Tweet CRUD, search, users, follows, DMs, bookmarks, likes, lists, spaces, compliance |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Twitter Developer App and obtaining the OAuth 2.0 credentials required to use the Twitter connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Twitter** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Twitter Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-twitter)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
