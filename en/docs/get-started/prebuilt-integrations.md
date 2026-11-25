---
sidebar_position: 4
title: "Pre-Built Integrations"
description: Use prebuilt integrations to connect your applications and automate common use cases on Choreo Cloud in minutes, without building an integration from scratch.
keywords: [choreo integrator, choreo cloud, prebuilt integration, salesforce, google sheets, automation, quick start]
slug: /get-started/prebuilt-integrations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Try Pre-Built Integrations

<QuickstartHeader
  time="Under 10 minutes"
  build={<>Nothing from scratch. You'll configure and deploy a production-ready integration between two applications from the prebuilt integration catalog.</>}
/>

<p style={{textAlign: 'justify'}}>
Building an integration from scratch means learning the platform's abstractions, wiring up connectors, and testing the logic before anything useful happens, even for a straightforward use case. Prebuilt integrations skip all that: each one is a production-ready integration for a real, common use case. Select the one you need, configure it, and deploy in minutes.
</p>

:::note Sample integrations vs. prebuilt integrations
[Sample integrations](../develop-and-test/create-workspace/start-with-sample-integrations.md) teach you the platform's abstractions. Prebuilt integrations are different: each one is a real, already-wired integration for an actual business use case.
:::

The prebuilt integrations catalog is available in Choreo Cloud, and you can also browse it from the Choreo Integrator home screen by selecting **Explore** and filtering by **Pre-built Integrations**. This guide follows the Choreo Cloud path because it lets you pick a prebuilt integration, configure it, and deploy it in one go, without leaving Choreo Cloud.

<Prerequisites>

## Prerequisites

A working Choreo Integrator environment.

<div style={{gridColumn: '1 / -1', minWidth: 0}}>
<PrereqCard icon="cloud" title="Choreo Cloud setup" href="/get-started/setup">Sign up and launch Choreo Integrator in the browser-based cloud editor.</PrereqCard>
</div>

</Prerequisites>

<Steps>

## Step 1: Go to the project-level view

Log in to [Choreo Cloud](https://console.cloud.choreolabs.com), then create a project and navigate to the project-level view. You'll see prebuilt integrations in the **Start quickly** panel on the right. Click **Explore more prebuilt integrations** to see the full catalog.

<ThemedImage
    alt="Project overview in Choreo Integration with the Start quickly panel and Explore more prebuilt integrations highlighted"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/project-level-view.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/project-level-view.png'),
    }}
/>

## Step 2: Pick the first application

Choose the application you want to integrate from. The catalog currently includes Salesforce, Google Sheets, Shopify, Stripe, Google Chat, GitHub, Slack, Mailchimp, Jira, and QuickBooks, with more applications added over time. For this demonstration, select **Salesforce**.

<ThemedImage
    alt="Application selection screen with Salesforce selected as the first application"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/select-salesforce.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/select-salesforce.png'),
    }}
/>

## Step 3: Pick the second application

The list narrows to the applications Salesforce can be paired with. Select **Google Sheets**. The ready-made scenarios for that pair appear immediately.

<ThemedImage
    alt="Second application selection screen narrowed to the applications Salesforce pairs with, with Google Sheets selected"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/select-google-sheets.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/select-google-sheets.png'),
    }}
/>

## Step 4: Choose an integration scenario

Every application pair has one or more ready-made scenarios, and the set available for a given pair grows as new use cases are added. Select the **Export Salesforce Leads to a Google Sheet** integration.

<ThemedImage
    alt="List of integration scenarios for Salesforce and Google Sheets, with Export Salesforce Leads to a Google Sheet selected"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/select-integration.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/select-integration.png'),
    }}
/>

A flowchart shows every step of the integration from start to finish, so you know exactly what you're about to deploy. Select **Configure & Deploy** to continue.

<ThemedImage
    alt="Flowchart showing the steps of the Export Salesforce Leads to a Google Sheet integration"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/flow-chart.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/flow-chart.png'),
    }}
/>

## Step 5: Review the setup instructions and configure credentials

The configuration page's left panel explains exactly what the integration does and what you need to gather to configure **Export Salesforce Leads to a Google Sheet**. You can fill in every field individually, or click **Import Config.toml** instead. None of this is final: configurations are bound to the environment, and you can change any value later.

<ThemedImage
    alt="Configuration page for the Export Salesforce Leads to a Google Sheet integration, showing credential and setup fields"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/configurations-setup.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/configurations-setup.png'),
    }}
/>

Fill in your credentials and configuration, then select **Deploy integration**.

<ThemedImage
    alt="Deploy integration button highlighted at the end of the configuration page"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/deploy-integration.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/deploy-integration.png'),
    }}
/>

Choreo Cloud saves the configuration and deploys the integration. This takes a few minutes.

<ThemedImage
    alt="Deployment progress screen for the Export Salesforce Leads to a Google Sheet integration"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/deploy-progress.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/deploy-progress.png'),
    }}
/>

## Step 6: Test it

After deployment, you land on the integration's overview page. Select **Test** on the **Development** environment to trigger an execution.

<ThemedImage
    alt="Integration overview page with the Test option highlighted for the Development environment"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/test-integration.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/test-integration.png'),
    }}
/>

To see what the execution did, go to **Operate** > **Runtime** and select the logs icon on the pod that ran it.

<ThemedImage
    alt="Runtime page listing the integration's pods, with the logs icon on the most recent one highlighted"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/view-logs.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/view-logs.png'),
    }}
/>

The real-time logs show the integration working through the run: the query it sent to Salesforce, how many leads it found, the spreadsheet it created, and the rows it synced.

<ThemedImage
    alt="Real-time pod logs showing the Salesforce query, the leads found, and the spreadsheet created and synced"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/runtime-logs.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/runtime-logs.png'),
    }}
/>

:::tip
These are the logs of a single pod. For aggregated and historical logs across every running instance, go to **Observe** > **Runtime logs**.
:::

Now open your Google Sheet. You'll find a fresh spreadsheet, named after the integration and the time it ran, already populated with your Salesforce leads and their fields as columns.

<ThemedImage
    alt="Google Sheet created by the integration, with Salesforce lead fields as columns and an exported lead in the first row"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/google-sheet-result.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/google-sheet-result.png'),
    }}
/>

From here, you can manage, deploy, and observe this integration just like any other integration on Choreo Cloud.

## Step 7: Make it yours

To customize the integration, go to the overview page and select **Open in Cloud Editor** to edit it in low-code or pro-code view, right in the cloud editor. Edit however you're most comfortable, then push the result to your own repository. At that point, it's fully yours, the same as any integration you built from scratch.

<ThemedImage
    alt="The prebuilt integration opened in the cloud editor, showing its design view and connections"
    sources={{
        light: useBaseUrl('/img/get-started/prebuilt-integrations/cloud-editor.png'),
        dark: useBaseUrl('/img/get-started/prebuilt-integrations/cloud-editor.png'),
    }}
/>

:::tip The value of prebuilt integrations
Common integration problems are already solved, so you don't have to rebuild them. Pick a use case, deploy it in minutes, and spend your time on the work that actually needs it.
:::

</Steps>

## What's next

- [Manage integrations](../manage/integrations/integrations.md) — View deployment status and manage the lifecycle of a deployed integration
- [Runtime configurations](../manage/configurations/runtime-configurations.md) — Update configuration values or link them to shared configuration groups after deployment
- [Deploy from the cloud editor](../deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor.md) — Learn more about customizing and redeploying an integration you opened in the cloud editor
- [Start with sample integrations](../develop-and-test/create-workspace/start-with-sample-integrations.md) — Start from a teaching sample instead if you'd rather build the integration yourself
