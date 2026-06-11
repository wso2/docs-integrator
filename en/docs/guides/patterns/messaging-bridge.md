---
title: Messaging Bridge
description: "Implement the Messaging Bridge pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Messaging Bridge

Use a Messaging Bridge to connect two messaging systems so messages available on one system are also available on the other, letting clients of each system communicate without knowing about the other protocol. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingBridge.html" label="Enterprise Integration Patterns Messaging Bridge reference" />

In WSO2 Integrator, a bridge is a service that listens on one protocol and forwards each message over a connection that speaks the other protocol, translating between the two message models.

## Example: Bridging GraphQL clients to a REST API

This example bridges GraphQL and REST. A GraphQL service accepts queries and mutations for projects, and each operation is forwarded to the Zoho Books REST API over an HTTP connection. GraphQL clients work with projects without knowing the backend is REST.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

The design view shows the bridge itself — a GraphQL service on the front forwarding to the Zoho Books REST API connection on the back:

<PatternImage src="/img/eip-patterns/messaging_bridge_design.png" alt="Messaging Bridge integration design view in WSO2 Integrator" width={760} />

1. Create a [GraphQL service](../../develop/integration-artifacts/service/graphql.md#creating-a-graphql-service) with a `project` query and a `createProject` mutation.
2. Add an HTTP client connection for the Zoho Books REST API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the query flow, call the Zoho Books `get` endpoint for the requested project and return the typed `Project`.
4. In the mutation flow, post the `ProjectRequest` to the Zoho Books `projects` endpoint and return the created `Project`.

The `project` resolver forwards the GraphQL request to the Zoho Books REST endpoint and returns the typed result:

<PatternImage src="/img/eip-patterns/messaging_bridge_flow.png" alt="Messaging Bridge flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/graphql;
import ballerina/http;

type ProjectRequest record {|
    string projectName;
    string description;
    string customerName;
|};

type Project record {|
    string projectID;
    Task[] tasks;
    string projectName;
    string description;
    string customerName;
|};

type Task record {|
    string taskID;
    string description;
|};

final http:Client zoho = check new ("http://zohoapis.com.balmock.io");
// docs-fold-end

listener graphql:Listener graphqlListener = new (listenTo = 8080);

service /api/v1 on graphqlListener {
    resource function get project(string organizationID, string projectID) returns Project|error {
        Project result = check zoho->/books/v3/projects/[projectID].get(organization_id = organizationID);
        return result;
    }

    remote function createProject(string organizationID, ProjectRequest projectRequest) returns Project|error {
        Project result = check zoho->/books/v3/projects.post(projectRequest, organization_id = organizationID);
        return result;
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [messaging bridge sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/messaging_bridge) on GitHub.
