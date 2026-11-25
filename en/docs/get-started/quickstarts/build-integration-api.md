---
sidebar_position: 1
title: "Build an Integration as API"
description: Build an HTTP service in Choreo Integrator that calls an external API and returns the response to the caller.
keywords: [choreo integrator, http service, api integration, rest api, quick start, ballerina http]
slug: /get-started/quickstarts/build-integration-api
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Build an Integration as API

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An HTTP service that listens on <code>/hello/greeting</code>, calls an external API, and returns the response to the caller.</>}
/>

An HTTP service exposes your integration logic as a REST endpoint. This quick start shows the full cycle: create a service, add a resource, connect to an external API, and test it using the Try-It/Test panel in Choreo Integrator.

<Prerequisites>

## Prerequisites

A working Choreo Integrator environment.

<div style={{gridColumn: '1 / -1', minWidth: 0}}>
<PrereqCard icon="cloud" title="Choreo Cloud setup" href="/get-started/setup">Sign up and launch Choreo Integrator in the browser-based cloud editor.</PrereqCard>
</div>

</Prerequisites>

<Steps>

## Step 1: Create the integration

1. On the project overview page, click **Open Cloud Editor**.

   <ThemedImage
       alt="How would you like to create your integration page with Open Cloud Editor highlighted under Create on Cloud"
       sources={{
           light: useBaseUrl('/img/get-started/quickstarts/open-cloud-editor.png'),
           dark: useBaseUrl('/img/get-started/quickstarts/open-cloud-editor.png'),
       }}
   />

2. The Choreo Integrator cloud editor opens in your browser.

   <ThemedImage
       alt="Cloud editor landing page with Choreo Integrator Copilot, the Add Artifact manually button, and the Deploy to Choreo Cloud panel"
       sources={{
           light: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
           dark: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
       }}
   />

:::info Note
The cloud editor creates a default integration for you, so you don't need to name it now. You can change its name when you deploy it. For more information, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).
:::

## Step 2: Add an HTTP service

1. In the design view, click **Add Artifact manually**.

   <ThemedImage
       alt="Integration design view with the Add Artifact manually button highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
       }}
   />

2. Select **HTTP Service** under **Integration as API**.

   <ThemedImage
       alt="Artifacts page with HTTP Service highlighted under Integration as API"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/select-http.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/select-http.png'),
       }}
   />

3. Keep **Service Contract** as **Design From Scratch**.

4. Set **Service Base Path** to `/hello`.

5. Click **Create**.

   <ThemedImage
       alt="Create HTTP Service form with Service Base Path set to /hello"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-an-http-service.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-an-http-service.png'),
       }}
   />

## Step 3: Add a resource

1. In the HTTP service design view, click **+ Add Resource**.

2. Select **GET**.

   <ThemedImage
       alt="Select HTTP Method to Add panel with GET highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/select-get.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/select-get.png'),
       }}
   />

3. Set **Resource path** to `greeting`.

4. Click **Save**.

   <ThemedImage
       alt="New Resource Configuration panel with Resource Path set to greeting"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-resource.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-resource.png'),
       }}
   />

## Step 4: Connect to an external API

1. Click **+** inside the resource flow.

   <ThemedImage
       alt="Resource flow with the add node button highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/select-plus.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/select-plus.png'),
       }}
   />

2. Click **Add Connection** under **Connections**.

   <ThemedImage
       alt="Node panel with Add Connection highlighted under Connections"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-connection.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-connection.png'),
       }}
   />

3. Select **HTTP** under **Pre-built Connectors**.

   <ThemedImage
       alt="Add Connection dialog with the HTTP connector highlighted under Pre-built Connectors"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-connection-http.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-connection-http.png'),
       }}
   />

4. The **Connect to Third-Party service** form opens. Set **Url** to:

   ```text
   https://apis.wso2.com/zvdz/mi-qsg/v1.0
   ```

   <ThemedImage
       alt="Connect to Third-Party service form with Url set"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/set-url.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/set-url.png'),
       }}
   />

5. Scroll to the bottom of the form. Set **Connection Name** to `externalApi`.

6. Click **Save Connection**.

   <ThemedImage
       alt="Connect to Third-Party service form with Connection Name set to externalApi"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/set-connection-name.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/set-connection-name.png'),
       }}
   />

## Step 5: Call the external API

1. Click **+** inside the resource flow.

   <ThemedImage
       alt="Resource flow with the add node button highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/select-plus-call-api.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/select-plus-call-api.png'),
       }}
   />

2. Select **externalApi**.

3. Select **Get**.

   <ThemedImage
       alt="Node panel with the externalApi connection and its Get action highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/select-externalapi.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/select-externalapi.png'),
       }}
   />

4. Set **Path** to `/`.

5. Set **Result** to `response`.

6. Set **Target Type** to `json`.

7. Click **Save**.

   <ThemedImage
       alt="externalApi get form with Path, Result, and Target Type set"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/invoke-connection.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/invoke-connection.png'),
       }}
   />

## Step 6: Return the response

1. Click **+** inside the resource flow, below the external API call node you just added.

   <ThemedImage
       alt="Resource flow with the add node button highlighted after the http:get node"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/select-plus-after-call.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/select-plus-after-call.png'),
       }}
   />

2. Select **Return** under **Control**.

   <ThemedImage
       alt="Node panel with Return highlighted under Control"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/select-return.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/select-return.png'),
       }}
   />

3. In the **Expression** field, select `response` from the variables.

4. Click **Save**.

   <ThemedImage
       alt="Return panel with Expression set to response"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-return-node.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-return-node.png'),
       }}
   />

## Step 7: Run and test

1. Click **Run**.

2. Click **Test** in the confirmation dialog.

3. Click **Execute**.

4. Confirm the response shows `200 OK` with a `Hello World` body.

   <ThemedImage
       alt="Running the integration and testing it with the Try It panel showing a 200 OK response"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/run-and-test.gif'),
           dark: useBaseUrl('/img/get-started/build-api-integration/run-and-test.gif'),
       }}
   />

## Step 8: Deploy to Choreo Cloud

<br />

To deploy your integration to Choreo Cloud from the cloud editor, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

<div class="skip-ahead-card">

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? Deploy the <strong>Hello World Service</strong> sample straight to Choreo Cloud. See <a href={useBaseUrl('/develop-and-test/create-workspace/start-with-sample-integrations')}>Start with sample integrations</a>.</p>
  <ThemedImage
      alt="Browse samples page with the Hello World Service sample highlighted"
      sources={{
          light: useBaseUrl('/img/get-started/build-api-integration/browse-samples-hello-world.png'),
          dark: useBaseUrl('/img/get-started/build-api-integration/browse-samples-hello-world.png'),
      }}
  />
</PaletteCard>

</div>

</Steps>

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate the following complete, runnable Ballerina program:

```ballerina
import ballerina/http;

listener http:Listener httpDefaultListener = http:getDefaultListener();

final http:Client externalApi = check new ("https://apis.wso2.com/zvdz/mi-qsg/v1.0");

service /hello on httpDefaultListener {

    resource function get greeting() returns json|error {
        do {
            json response = check externalApi->get("/");
            return response;
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }
}
```

</details>
