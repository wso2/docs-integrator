---
title: Channel Adapter
description: "Implement the Channel Adapter pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Channel Adapter

Use a Channel Adapter to connect an application that was not built for messaging to the messaging system, so the integration can send messages to it and receive messages from it through the application's own API. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/ChannelAdapter.html" label="Enterprise Integration Patterns Channel Adapter reference" />

In WSO2 Integrator, connectors are channel adapters. A connector client wraps an external application's API — its authentication, endpoints, and payload formats — and exposes it to the flow as typed operations, so the rest of the integration works with messages instead of API details.

## Example: Adapting Jira into the integration

This example uses the Jira connector as a channel adapter. The connector handles authentication and the Jira REST API details, and the flow simply calls the `getProject` operation to receive a typed `jira:Project` message.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

The Jira connector is the channel adapter — it exposes the external Jira API to the automation as a typed connection:

<PatternImage src="/img/eip-patterns/channel_adapter_design.png" alt="Channel Adapter integration design view in WSO2 Integrator" width={706} />

1. Create an [automation](../../develop/integration-artifacts/automation.md#creating-an-automation) to run the flow.
2. Add a Jira connection with the username and password kept as [configurable values](../../reference/config/configuration-management.md#configurable-variables). See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, call the `getProject` operation on the Jira connection to bring the project into the integration as a typed message.

The flow calls the `getProject` operation on the Jira connection; the connector handles the API details and returns a typed result:

<PatternImage src="/img/eip-patterns/channel_adapter_flow.png" alt="Channel Adapter flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerinax/jira;

configurable string username = "admin";
configurable string password = "admin";

final jira:Client jiraAdapter = check new ({
    auth: {
        username: username,
        password: password
    }
}, "http://wso2.jira.com.balmock.io");
// docs-fold-end

public function main() returns error? {
    jira:Project result = check jiraAdapter->getProject("EI-Patterns-With-Ballerina");
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [channel adapter sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/channel_adapter) on GitHub.
