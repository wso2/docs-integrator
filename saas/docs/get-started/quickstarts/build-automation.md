---
title: Build an Automation
---

# Build an Automation

**Time:** Under 10 minutes | **What you'll build:** An automation that prints `Hello World` to the terminal when it runs.

An automation runs your integration logic without an external request, on demand or on a schedule. Automations are ideal for data synchronization, report generation, and routine maintenance jobs. This quick start shows the full cycle: add an automation artifact, build the logic in the visual designer, run it, and review the scheduling options for production.

:::info Prerequisites

A working WSO2 Integrator environment. See [Cloud setup](../../get-started/cloud-setup.md) to sign up and launch WSO2 Integrator in the browser-based cloud editor.

## Step 1: Create the integration

:::info Note

In the cloud editor, you're already inside a project. Skip to Step 2.

1. Open WSO2 Integrator.
2. Select the **Create New Integration** card.
3. Set **Integration Name** to `HelloWorldAutomation`.
4. Set **Project Name** to `automation-quickstart`.
5. **Create Integration**.

<ThemedImage
    alt="Create new integration form with Integration Name set to HelloWorldAutomation and Project Name set to automation-quickstart"
    sources={{
        light: useBaseUrl('/img/get-started/build-automation/create-the-project.png'),
        dark: useBaseUrl('/img/get-started/build-automation/create-the-project.png'),
    }}
/>

## Step 2: Add an automation artifact

1. Select your integration from the project overview canvas.
2. Select **+ Add Artifact** in the design canvas.
3. Select **Automation** under **Automation**.
4. Select **Create**.

<ThemedImage
    alt="Create New Automation form opened after selecting Automation under Automation"
    sources={{
        light: useBaseUrl('/img/get-started/build-automation/add-an-automation-artifact.png'),
        dark: useBaseUrl('/img/get-started/build-automation/add-an-automation-artifact.png'),
    }}
/>

## Step 3: Add logic

1. Select **+** after the **Start** node to open the node panel.
2. Select **Call Function**.
3. Select **Print** under **io** from the function list.
4. Select **Initialize Array** for the **Values** parameter.
5. Set **Values** to `"Hello World"` and select **Save**.

<ThemedImage
    alt="io:print configuration panel with the Values parameter set to Hello World, ready to be saved"
    sources={{
        light: useBaseUrl('/img/get-started/build-automation/add-logic.png'),
        dark: useBaseUrl('/img/get-started/build-automation/add-logic.png'),
    }}
/>

## Step 4: Run and test

1. Select **Run**.
2. Confirm the terminal output contains `Hello World`.

<ThemedImage
    alt="Running the automation and seeing the Hello World output in the terminal"
    sources={{
        light: useBaseUrl('/img/get-started/build-automation/run-and-test-light.gif'),
        dark: useBaseUrl('/img/get-started/build-automation/run-and-test-light.gif'),
    }}
/>

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

## Step 5: Deploy to WSO2 Cloud

Deploy your integration to WSO2 Cloud. Check [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

## Skip ahead: deploy a ready-made sample

Rather not build it yourself? One-click deploy the `HelloWorldAutomation` sample straight to WSO2 Cloud:

<a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/automation" target="_blank">
    <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" />
</a>

## Scheduling automations

Periodic invocation is configured in an external system once the automation is deployed. Available options include:

- **Cron job**: schedule the automation from a `cron` entry on a Unix or Linux host.
- **Kubernetes**: define a `CronJob` resource to run the automation on a recurring schedule.
- **VM**: use a host scheduler such as Windows Task Scheduler or `systemd` timers.
- **WSO2 Integration Platform**: configure the schedule in the WSO2 Integration Platform when the integration is pushed to the cloud.
