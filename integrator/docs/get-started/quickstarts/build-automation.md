---
title: Build an Automation
---

# Build an Automation

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An automation that prints <code>Hello World</code> to the terminal when it runs.</>}
/>

<p style={{textAlign: 'justify'}}>
An automation runs your integration logic without requiring an external request, either on demand or on a schedule. Automations are useful for tasks such as data synchronization, report generation, and routine maintenance. This quick start walks you through the full process: adding an automation artifact, building the logic in the visual designer, running it, and reviewing scheduling options for production.
</p>

## Prerequisites

A working WSO2 Integrator environment.

<PrereqCard icon="local" title="Local setup" href="/get-started/setup">
  Install and launch WSO2 Integrator on your machine.

<PrereqCard icon="cloud" title="WSO2 Cloud Account" href="/get-started/setup" cloud>
  For AI assisted development and WSO2 Cloud deployments.

## Step 1: Create the integration

:::info Note
If you're using the cloud editor, a project is already open, so you can skip this step and go directly to [Step 2: Add an automation artifact](#step-2-add-an-automation-artifact).

1. Open WSO2 Integrator.

2. Click **Create** in the **Create a Project** card.

   <ThemedImage
      alt="WSO2 Integrator home screen with the Create a Project card"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/wso2-integrator.png'),
         dark: useBaseUrl('/img/get-started/build-automation/wso2-integrator.png'),
      }}
   />

3. Set **Project Name** to `automation-quickstart`.

4. Set **Integration Name** to `HelloWorldAutomation`.

5. Click **Create**.

   <ThemedImage
      alt="Create a Project form with Project name set to automation-quickstart and Integration name set to HelloWorldAutomation"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/create-project.png'),
         dark: useBaseUrl('/img/get-started/build-automation/create-project.png'),
      }}
   />

## Step 2: Add an automation artifact

1. Select your integration from the project overview canvas.

2. In the design view, click **Add Artifact Manually**.

   <ThemedImage
      alt="Integration design view with the Add Artifact manually button highlighted"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/add-artifact.png'),
         dark: useBaseUrl('/img/get-started/build-automation/add-artifact.png'),
      }}
   />

3. Select **Automation** under **Automation**.

   <ThemedImage
      alt="Artifacts page with Automation highlighted under Automation"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/select-automation.png'),
         dark: useBaseUrl('/img/get-started/build-automation/select-automation.png'),
      }}
   />

4. Click **Create**.

   <ThemedImage
      alt="Create New Automation form with the Create button"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/create-automation.png'),
         dark: useBaseUrl('/img/get-started/build-automation/create-automation.png'),
      }}
   />

## Step 3: Add logic

1. Click **+** below the **Start** node to open the node panel.

2. Select **Call Function** under **Statement**.

   <ThemedImage
      alt="Node panel with Call Function highlighted under Statement"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/call-function-selection.png'),
         dark: useBaseUrl('/img/get-started/build-automation/call-function-selection.png'),
      }}
   />

3. Select **Print** under **io** from the functions list.

   <ThemedImage
      alt="Functions list with print highlighted under io"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/select-print.png'),
         dark: useBaseUrl('/img/get-started/build-automation/select-print.png'),
      }}
   />

4. Click **Initialize Array** for the **Values** parameter.

   <ThemedImage
      alt="io:print panel with the Initialize Array button highlighted under Values"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/select-initialize-array.png'),
         dark: useBaseUrl('/img/get-started/build-automation/select-initialize-array.png'),
      }}
   />

5. Set **Values** to `"Hello World"` and select **Save**.

   <ThemedImage
      alt="io:print panel with Values set to Hello World"
      sources={{
         light: useBaseUrl('/img/get-started/build-automation/set-value.png'),
         dark: useBaseUrl('/img/get-started/build-automation/set-value.png'),
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

Deploy your integration to WSO2 Cloud - Integration Platform in any of the following ways:

- If you're using the cloud editor, see [Save and deploy](../../deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor.md#save-and-deploy).
- If you're using WSO2 Integrator on your machine, see [Deploy from WSO2 Integrator](../../deploy-and-run/deploy-to-wso2-cloud/push-from-ide.md).

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? One-click deploy the HelloWorldAutomation sample straight to WSO2 Cloud.</p>
  <div class="palette-chip-row" style={{justifyContent: 'center'}}>
    <a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/automation" target="_blank" rel="noopener noreferrer">
      <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" style={{display: 'block', margin: '0', border: 'none', boxShadow: 'none'}} />
    </a>


</div>

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

## What's next

- [Build an Integration as API](build-integration-api.md) — Build an HTTP service
- [Build an AI agent](build-ai-agent.md) — Build an intelligent agent
- [Build an event-driven integration](build-event-driven-integration.md) — React to messages from brokers
- [Build a file-driven integration](build-file-driven-integration.md) — Process files from FTP or local directories
- [Automation](../../develop-and-test/integration-artifacts/automation.md) — Configure scheduling, manual execution, and integration logic
