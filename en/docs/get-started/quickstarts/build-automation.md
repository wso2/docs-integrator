---
sidebar_position: 2
title: "Build an Automation"
description: Create an automation that can run on demand or be invoked on a schedule from an external system.
keywords: [wso2 integrator, automation, scheduled job, batch processing, quick start, ballerina automation]
slug: /get-started/quickstarts/build-automation
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Build an Automation

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An automation that prints <code>Hello World</code> to the terminal when it runs.</>}
/>

<p style={{textAlign: 'justify'}}>
An automation runs your integration logic without an external request, on demand or on a schedule. Automations are ideal for data synchronization, report generation, and routine maintenance jobs. This quick start shows the full cycle: add an automation artifact, build the logic in the visual designer, run it, and review the scheduling options for production.
</p>

<Prerequisites>

## Prerequisites

A working WSO2 Integrator environment.

<div style={{gridColumn: '1 / -1', minWidth: 0}}>
<PrereqCard icon="cloud" title="WSO2 Cloud setup" href="/get-started/setup">Sign up and launch WSO2 Integrator in the browser-based cloud editor.</PrereqCard>
</div>

</Prerequisites>

<Steps>

## Step 1: Create the integration

1. On the project home page, click **Create on Cloud**.

   <ThemedImage
       alt="WSO2 Cloud project home showing the Create on Cloud option"
       sources={{
           light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
           dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
       }}
   />

2. The WSO2 Integrator cloud editor opens in your browser. Add an artifact to your integration, then deploy it to WSO2 Cloud from the Deploy to WSO2 Cloud panel on the right.

   <ThemedImage
    alt="WSO2 Integrator cloud editor landing page showing an empty integration and the Deploy to WSO2 Cloud panel"
    sources={{
        light: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
        dark: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
    }}
    />

:::info Note
The cloud editor creates a default integration for you, so you don't need to name it now. You can change its name when you deploy it. For more information, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).
:::

## Step 2: Add an automation artifact

1. In the design view, click **Add Artifact manually**.

   <ThemedImage
       alt="Integration design view with the Add Artifact manually button highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
       }}
   />

2. Select **Automation** under **Automation**.

   <ThemedImage
       alt="Artifacts page with Automation highlighted under Automation"
       sources={{
           light: useBaseUrl('/img/get-started/build-automation/select-automation.png'),
           dark: useBaseUrl('/img/get-started/build-automation/select-automation.png'),
       }}
   />

3. Click **Create**.

   <ThemedImage
       alt="Create New Automation form with the Create button"
       sources={{
           light: useBaseUrl('/img/get-started/build-automation/add-an-automation-artifact.png'),
           dark: useBaseUrl('/img/get-started/build-automation/add-an-automation-artifact.png'),
       }}
   />

## Step 3: Add logic

1. Click **+** below the **Start** node to open the node panel.

   <ThemedImage
       alt="Automation flow with the add node button highlighted below the Start node"
       sources={{
           light: useBaseUrl('/img/get-started/build-automation/select-plus.png'),
           dark: useBaseUrl('/img/get-started/build-automation/select-plus.png'),
       }}
   />

2. Select **Call Function** under **Statement**.

   <ThemedImage
       alt="Node panel with Call Function highlighted under Statement"
       sources={{
           light: useBaseUrl('/img/get-started/build-automation/call-function-selection.png'),
           dark: useBaseUrl('/img/get-started/build-automation/call-function-selection.png'),
       }}
   />

3. Search for `print` in the functions panel.

4. In the search results, go to the **Standard Library** section and select the **print** function under **io**.

   <ThemedImage
       alt="Functions panel search results with print highlighted under io in the Standard Library section"
       sources={{
           light: useBaseUrl('/img/get-started/build-automation/select-print.png'),
           dark: useBaseUrl('/img/get-started/build-automation/select-print.png'),
       }}
   />

5. Click **Initialize Array** for the **Values** parameter.

   <ThemedImage
       alt="io:print panel with the Initialize Array button highlighted under Values"
       sources={{
           light: useBaseUrl('/img/get-started/build-automation/select-initialize-array.png'),
           dark: useBaseUrl('/img/get-started/build-automation/select-initialize-array.png'),
       }}
   />

6. Set **Values** to `"Hello World"` and click **Save**.

   <ThemedImage
       alt="io:print panel with Values set to Hello World"
       sources={{
           light: useBaseUrl('/img/get-started/build-automation/add-logic.png'),
           dark: useBaseUrl('/img/get-started/build-automation/add-logic.png'),
       }}
   />

## Step 4: Run and test

1. Click **Run**.

2. Confirm the terminal output contains `Hello World`.

   <ThemedImage
       alt="Running the automation and seeing the Hello World output in the terminal"
       sources={{
           light: useBaseUrl('/img/get-started/build-automation/run-and-test-light.gif'),
           dark: useBaseUrl('/img/get-started/build-automation/run-and-test-light.gif'),
       }}
   />

## Step 5: Deploy to WSO2 Cloud

To deploy your integration to WSO2 Cloud from the cloud editor, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

<div class="skip-ahead-card">

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? One-click deploy the HelloWorldAutomation sample straight to WSO2 Cloud.</p>
  <div class="palette-chip-row" style={{justifyContent: 'center'}}>
    <a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/automation" target="_blank" rel="noopener noreferrer">
      <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" style={{display: 'block', margin: '0', border: 'none', boxShadow: 'none'}} />
    </a>
  </div>
</PaletteCard>

</div>

</Steps>

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate the following complete, runnable Ballerina program:

```ballerina
import ballerina/io;
import ballerina/log;

public function main() returns error? {
    do {
        io:print("Hello World");
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

</details>

## Scheduling automations

Periodic invocation is configured in an external system once the automation is deployed. Available options include:

- **Cron job**: schedule the automation from a `cron` entry on a Unix or Linux host.
- **Kubernetes**: define a `CronJob` resource to run the automation on a recurring schedule.
- **VM**: use a host scheduler such as Windows Task Scheduler or `systemd` timers.
- **WSO2 Integration Platform**: configure the schedule in the WSO2 Integration Platform when the integration is pushed to the cloud.
