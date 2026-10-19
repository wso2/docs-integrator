---
title: Build an Integration as API
---

# Build an Integration as API

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An HTTP service that listens on <code>/hello/greeting</code>, calls an external API, and returns the response to the caller.</>}
/>

<p style={{textAlign: 'justify'}}>
An HTTP service exposes your integration logic as a REST endpoint. This quick start shows the full cycle: create a service, add a resource, connect to an external API, and test it using the Try-It/Test panel in WSO2 Integrator.
</p>

## Prerequisites

A working WSO2 Integrator environment.

<PrereqCard icon="local" title="Local setup" href="/get-started/setup">
  Install and launch WSO2 Integrator on your machine.

<PrereqCard icon="cloud" title="WSO2 Cloud Account" href="/get-started/setup" cloud>
  For AI assisted development and WSO2 Cloud deployments.

## Step 1: Create the integration

:::info Note
If you're using the cloud editor, a project is already open, so you can skip this step and go directly to [Step 2: Add an HTTP service](#step-2-add-an-http-service).

1. Open WSO2 Integrator.

2. Click **Create** in the **Create a Project** card.

   <ThemedImage
      alt="WSO2 Integrator home screen with the Create a Project card"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/wso2-integrator.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/wso2-integrator.png'),
      }}
   />

3. Set **Project Name** to `integration-as-api`.

4. Set **Integration Name** to `HelloWorldAPI`.

5. Click **Create**.

   <ThemedImage
      alt="Create a Project form with Project name set to integration-as-api and Integration name set to HelloWorldAPI"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/create-project.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/create-project.png'),
      }}
   />

## Step 2: Add an HTTP service

1. Select your integration from the project overview canvas.

2. In the design view, click **Add Artifact Manually**.

   <ThemedImage
      alt="Integration design view with the Add Artifact manually button highlighted"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
      }}
   />

3. Select **HTTP Service** under **Integration as API**.

   <ThemedImage
      alt="Artifacts page with HTTP Service highlighted under Integration as API"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/select-http.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/select-http.png'),
      }}
   />

4. Keep **Service Contract** as **Design From Scratch**.

5. Set **Service Base Path** to `/hello`.

6. Click **Create**.

   <ThemedImage
      alt="Create HTTP Service form with Service Base Path set to /hello"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/set-path.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/set-path.png'),
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
         light: useBaseUrl('/img/get-started/build-api-integration/set-resource-path.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/set-resource-path.png'),
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
      alt="Node panel with Add Connection highlighted"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/add-connection.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/add-connection.png'),
      }}
   />

3. Select **HTTP** under **Pre-built Connectors**.

   <ThemedImage
      alt="Add Connection dialog with the HTTP connector highlighted"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/add-connection-http.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/add-connection-http.png'),
      }}
   />

4. The **Configure HTTP** form opens. Set **Url** to:

   ```text
   https://apis.wso2.com/zvdz/mi-qsg/v1.0
   ```
   <ThemedImage
      alt="Configure HTTP form with Url set"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/set-url.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/set-url.png'),
      }}
   />

5. Scroll to the bottom of the form. Set **Connection Name** to `externalApi`.

6. Click **Save Connection**.

   <ThemedImage
      alt="Configure HTTP form with Connection Name set to externalApi"
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
         light: useBaseUrl('/img/get-started/build-api-integration/select-plus.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/select-plus.png'),
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
         light: useBaseUrl('/img/get-started/build-api-integration/externalapi-get-form.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/externalapi-get-form.png'),
      }}
   />

## Step 6: Return the response

1. Click **+** inside the resource flow after the external API call node we just added.

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
         light: useBaseUrl('/img/get-started/build-api-integration/set-expression.png'),
         dark: useBaseUrl('/img/get-started/build-api-integration/set-expression.png'),
      }}
   />

## Step 7: Run and test

1. Click **Run**.

2. Click **Test** in the confirmation dialog.

3. Click **Execute Cell**.

4. Confirm the response shows `200 OK` with a `Hello World` body.

   <ThemedImage
      alt="Running the integration and testing it with the Try It panel showing a 200 OK response"
      sources={{
         light: useBaseUrl('/img/get-started/build-api-integration/run-and-test.gif'),
         dark: useBaseUrl('/img/get-started/build-api-integration/run-and-test.gif'),
      }}
   />

## Step 8: Deploy to WSO2 Cloud

Deploy your integration to WSO2 Cloud - Integration Platform in any of the following ways:

- If you're using the cloud editor, see [Save and deploy](../../deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor.md#save-and-deploy).
- If you're using WSO2 Integrator on your machine, see [Deploy from WSO2 Integrator](../../deploy-and-run/deploy-to-wso2-cloud/push-from-ide.md).

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? One-click deploy the HelloWorldAPI sample straight to WSO2 Cloud.</p>
  <div class="palette-chip-row" style={{justifyContent: 'center'}}>
    <a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/helloworldapi" target="_blank" rel="noopener noreferrer">
      <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" style={{display: 'block', margin: '0', border: 'none', boxShadow: 'none'}} />
    </a>


</div>

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

## What's next

- [Build an automation](build-automation.md) — Build a scheduled job
- [Build an AI agent](build-ai-agent.md) — Build an intelligent agent
- [Build an event-driven integration](build-event-driven-integration.md) — React to messages from brokers
- [Build a file-driven integration](build-file-driven-integration.md) — Process files from FTP or local directories
- [HTTP service](../../develop-and-test/integration-artifacts/integration-as-api/http.md) — Learn resource functions, path parameters, and error handling
