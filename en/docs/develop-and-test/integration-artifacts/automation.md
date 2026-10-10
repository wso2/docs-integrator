---
sidebar_position: 2
title: Automation
description: Build automations that run on a schedule or on demand using WSO2 Integrator.
keywords: [wso2 integrator, automation, scheduled job, batch processing, main function]
slug: /develop-and-test/integration-artifacts/automation
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Automation

An automation executes integration logic when started, without waiting for an incoming service request. Use it for periodic data synchronization, batch processing, report generation, and other recurring tasks that execute on a timer or on demand. Periodic invocation is scheduled in an external system such as a cron job, Kubernetes, or WSO2 Integration Platform.

:::note
Only one automation can be configured per integration.
:::

## Creating an automation

<Tabs>
<TabItem value="ui" label="Visual Designer" default>
1. Select the **Add Artifact manually** button on the Integration Overview page, or select **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **Automation** under **Automation**.

   <ThemedImage
       alt="Artifacts panel showing the Automation option"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/automation/add-artifact.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/automation/add-artifact.png'),
       }}
   />

3. In the creation form, configure the following fields.

   <ThemedImage
       alt="Create New Automation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/automation/create-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/automation/create-form.png'),
       }}
   />

   **Advanced Configurations**

   | Field | Description |
   |---|---|
   | **Startup Parameters** | Parameters passed to the automation at startup. Select **+ Add Parameter** to add each parameter. |
   | **Return Error** | When selected, the automation exits with an error if execution fails. |

4. Select **Create**.

5. WSO2 Integrator opens the automation in the flow designer. The canvas shows a **Start** node, a **+** button to add steps, and an **Error Handler** node.

   <ThemedImage
       alt="Automation flow designer"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/automation/flow-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/automation/flow-designer.png'),
       }}
   />

6. Select **+** to open the node panel and add integration steps such as function calls, connections, and control flow.

</TabItem>
<TabItem value="code" label="Ballerina Code">

WSO2 Integrator generates an `automation.bal` file with the following starter structure:

```ballerina
import ballerina/log;

public function main() returns error? {
    do {
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

Add your integration logic inside the `do` block. The `on fail` block handles any errors that occur during execution.

</TabItem>
</Tabs>

## Automation configuration

Automation configuration controls the startup parameters for the automation function and whether execution failures are returned as errors.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the flow designer, select **Configure** in the header to open the **Edit Automation** panel.

<ThemedImage
    alt="Edit Automation panel opened via the Configure button"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/automation/configure-form.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/automation/configure-form.png'),
    }}
/>

</TabItem>
<TabItem value="code" label="Ballerina Code">

Configuration maps to the `main` function signature. Add parameters directly to the function signature to define startup parameters:

```ballerina
import ballerina/log;

public function main(string param1 = "", int param2 = 0) returns error? {
    do {
        // Integration logic here
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

</TabItem>
</Tabs>

## What's next

- [HTTP service](integration-as-api/http.md) — expose your integration as a REST API
- [Error handling](../../editor/canvases/flow-canvas/node-palette.md#error-handling) — handle automation failures
- [Connections](supportive-artifacts/connections.md) — call external services from your automation
