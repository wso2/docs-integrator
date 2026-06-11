---
title: Command Message
description: "Implement the Command Message pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Command Message

Use a Command Message to invoke a procedure in another application through messaging. The message carries the command and its parameters, and the receiver executes it. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/CommandMessage.html" label="Enterprise Integration Patterns Command Message reference" />

In WSO2 Integrator, a command message is a typed record sent to the operation endpoint of the receiving application. The record fields are the procedure's parameters, and the response confirms the command's outcome.

## Example: Creating a Slack user group

This example receives a user group creation request and sends it as a command message to the Slack `usergroups.create` API. The `UserGroupCreateRequest` record carries the command parameters, and Slack executes the procedure and returns the created group.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `UserGroupCreateRequest` payload.
2. Add an HTTP client connection for the Slack API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, post the command message to the `usergroups.create` operation with the `x-www-form-urlencoded` media type.
4. Return the `UserGroupCreationResponse` to the caller.

The flow forwards the command message to Slack's `usergroups.create` operation and returns the result:

<PatternImage src="/img/eip-patterns/command_message_flow.png" alt="Command Message flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type UserGroupCreateRequest record {|
    string name;
    string description;
    string team_id;
|};

type UserGroup record {
    string id;
    boolean is_usergroup;
    string 'handle;
    boolean is_external;
    int date_create;
    string created_by;
    string user_count;
    string name;
    string description;
    string team_id;
};

type UserGroupCreationResponse record {
    boolean ok;
    UserGroup usergroup?;
    string 'error?;
};

final http:Client slackClient = check new ("http://api.slack.com.balmock.io");
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    isolated resource function post createUserGroup(UserGroupCreateRequest userGroup)
    returns UserGroupCreationResponse|error {
        UserGroupCreationResponse userGroupCreateRequest = check slackClient->/api/usergroups\.create.post(userGroup, mediaType = "x-www-form-urlencoded");
        return userGroupCreateRequest;
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [command message sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/command_message) on GitHub.
