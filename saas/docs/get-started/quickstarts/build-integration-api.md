---
title: Build an Integration as API
---

# Build an Integration as API

**Time:** Under 10 minutes | **What you'll build:** An HTTP service that listens on `/hello/greeting`, calls an external API, and returns the response to the caller.

An HTTP service exposes your integration logic as a REST endpoint. This quick start shows the full cycle: create a service, add a resource, connect to an external API, and test it using the Try-It/Test panel in WSO2 Integrator.

:::info Prerequisites

A working WSO2 Integrator environment. See [Cloud setup](../../get-started/cloud-setup.md) to sign up and launch WSO2 Integrator in the browser-based cloud editor.

## Step 1: Create the integration

:::info Note

In the cloud editor, you're already inside a project. Skip to Step 2.

1. Open WSO2 Integrator.
2. Select the **Create New Integration** card.
3. Set **Integration Name** to `HelloWorldAPI`.
4. Set **Project Name** to `integration-as-api`.
5. Select **Create Integration**.

<ThemedImage
    alt="Create new integration form with Integration Name set to HelloWorldAPI and Project Name set to integration-as-api"
    sources={{
        light: useBaseUrl('/img/get-started/build-api-integration/create-project.png'),
        dark: useBaseUrl('/img/get-started/build-api-integration/create-project.png'),
    }}
/>

## Step 2: Add an HTTP service

1. Select your integration from the project overview canvas.
2. Select **+ Add Artifact** in the design canvas.
3. Select **HTTP Service** under **Integration as API**.
4. Keep **Service Contract** as **Design From Scratch**.
5. Set **Service Base Path** to `/hello`.
6. Select **Create**.

<ThemedImage
    alt="Selecting HTTP Service in the Add Artifact panel and setting the base path to /hello"
    sources={{
        light: useBaseUrl('/img/get-started/build-api-integration/add-an-http-service.png'),
        dark: useBaseUrl('/img/get-started/build-api-integration/add-an-http-service.png'),
    }}
/>

## Step 3: Add a resource

1. In the HTTP service design view, select **+ Add Resource**.
2. Select **GET**.
3. Set **Resource path** to `greeting`.
4. Select **Save**.

<ThemedImage
    alt="Adding a GET resource at the /greeting path in the HTTP service designer"
    sources={{
        light: useBaseUrl('/img/get-started/build-api-integration/add-resource.png'),
        dark: useBaseUrl('/img/get-started/build-api-integration/add-resource.png'),
    }}
/>

## Step 4: Connect to an external API

1. Select **+** inside the resource flow.
2. Select **Add Connection**.
3. Select **HTTP**.
4. Set **Url** to `https://apis.wso2.com/zvdz/mi-qsg/v1.0`.
5. Set **Connection Name** to `externalApi`.
6. Select **Save Connection**.

<ThemedImage
    alt="Configuring an HTTP connection to the external API in the Add Connection panel"
    sources={{
        light: useBaseUrl('/img/get-started/build-api-integration/add-connection.png'),
        dark: useBaseUrl('/img/get-started/build-api-integration/add-connection.png'),
    }}
/>

## Step 5: Call the external API

1. Select **+** inside the resource flow.
2. Select **externalApi**.
3. Select **Get**.
4. Set **Path** to `/`.
5. Set **Result** to `response`.
6. Set **Target Type** to `json`.
7. Select **Save**.

<ThemedImage
    alt="Configuring the GET call on the externalApi connection with path / and result variable response"
    sources={{
        light: useBaseUrl('/img/get-started/build-api-integration/invoke-connection.png'),
        dark: useBaseUrl('/img/get-started/build-api-integration/invoke-connection.png'),
    }}
/>

## Step 6: Return the response

1. Select **+** inside the resource flow after the external API call node we just added.
2. Select **Return**.
3. Set **Expression** to `response`.
4. Select **Save**.

<ThemedImage
    alt="Adding a Return node with the expression set to response"
    sources={{
        light: useBaseUrl('/img/get-started/build-api-integration/add-return-node.png'),
        dark: useBaseUrl('/img/get-started/build-api-integration/add-return-node.png'),
    }}
/>

## Step 7: Run and test

1. Select **Run**.
2. Select **Test** in the confirmation dialog.
3. Select **Execute**.
4. Confirm the response shows `200 OK` with a `Hello World` body.

<ThemedImage
    alt="Running the integration and testing it with the Try It panel showing a 200 OK response"
    sources={{
        light: useBaseUrl('/img/get-started/build-api-integration/run-and-test.gif'),
        dark: useBaseUrl('/img/get-started/build-api-integration/run-and-test.gif'),
    }}
/>

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

## Step 8: Deploy to WSO2 Cloud

Deploy your integration to WSO2 Cloud. Check [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

## Skip ahead: deploy a ready-made sample

Rather not build it yourself? One-click deploy the `HelloWorldAPI` sample straight to WSO2 Cloud:

<a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/helloworldapi" target="_blank">
    <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" />
</a>
