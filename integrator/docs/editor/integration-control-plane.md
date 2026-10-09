---
title: Integration Control Plane(ICP) support in Editor
---

# Integration Control Plane(ICP) support in  Editor

The WSO2 Integrator editor can start a local **Integration Control Plane (ICP)** server so you can observe and manage your integrations while you are still developing them. Enable ICP for an integration, run it as usual, and its runtime shows up in the ICP console.

The local ICP server is meant for development and trying ICP out. To monitor and manage integrations that are deployed, see the [Integration Control Plane documentation](../icp/index.md).

## Enable ICP for your integrations

You can enable ICP for every integration in a project at once, or for one integration at a time.

### Enable ICP for all integrations in a project

1. Open the project overview. The **Integration Control Plane** section on the right shows how many integrations are ICP-enabled, for example **0/3 integrations are ICP-enabled**.

2. Select **Enable ICP for all integrations**.

   <ThemedImage
       alt="The project overview with the Integration Control Plane section and the Enable ICP for all integrations button."
       sources={{
           light: useBaseUrl('/img/editor/icp/integration-control-plane-option.png'),
           dark: useBaseUrl('/img/editor/icp/integration-control-plane-option.png'),
       }}
   />

   Each integration card now carries an **ICP** badge, and the **ICP-enabled** count is also updated.

   <ThemedImage
       alt="The project overview after enabling ICP, with an ICP badge on every integration card."
       sources={{
           light: useBaseUrl('/img/editor/icp/integration-control-plane-enabled.png'),
           dark: useBaseUrl('/img/editor/icp/integration-control-plane-enabled.png'),
       }}
   />

### Enable ICP for a single integration

1. Open the integration's overview.
2. In the **Integration Control Plane** section, select **Enable ICP monitoring**.

    <ThemedImage
       alt="The integration view with the Integration Control Plane section and the Enable ICP monitoring button."
       sources={{
           light: useBaseUrl('/img/editor/icp/integration-control-plane-integration-option.png'),
           dark: useBaseUrl('/img/editor/icp/integration-control-plane-integration-option.png'),
       }}
   />

## Start the local ICP server

With ICP enabled, the editor needs an ICP server to publish to. You can find ICP server in the status bar as, **ICP: Stopped** or **ICP: Running**.

- **Start it from the integration overview.** Under **Publish to local ICP**, select **Start ICP Server**.

  <ThemedImage
      alt="The Publish to local ICP section of an integration overview with the Start ICP Server button."
      sources={{
          light: useBaseUrl('/img/editor/icp/integration-control-plane-start.png'),
          dark: useBaseUrl('/img/editor/icp/integration-control-plane-start.png'),
      }}
   />

- **Start it when you run.** If you run an ICP-enabled integration while the server is stopped, the editor warns that **ICP is enabled but the ICP server is not running**. Select **Start & Setup** to start and configure the server, or **Run Anyway** to run the integration without publishing to ICP.

  <ThemedImage
      alt="The warning shown when running an ICP-enabled integration while the ICP server is not running."
      sources={{
          light: useBaseUrl('/img/editor/icp/integration-control-plane-warning.png'),
          dark: useBaseUrl('/img/editor/icp/integration-control-plane-warning.png'),
      }}
   />

When the server is up, the editor shows a notification with its address, `https://localhost:9446`, and the default credentials (`admin`/`admin`). Select **Open in Browser** to open the ICP console. The server's logs appear in the **ICP Server** terminal.

<ThemedImage
    alt="The notification confirming the ICP server has started, with the ICP Server terminal open."
    sources={{
        light: useBaseUrl('/img/editor/icp/integration-control-plane-started.png'),
        dark: useBaseUrl('/img/editor/icp/integration-control-plane-started.png'),
    }}
/>

## Run and observe your integration

1. Run the integration as you normally would. If the project has more than one integration, pick the one to run from the **Select an integration to run** list.

2. While it runs, the integration connects to the local ICP server. The terminal shows the ICP agent starting and its heartbeat being acknowledged by the server, and the status bar shows **ICP: Running**.

   <ThemedImage
     alt="A running ICP-enabled integration, with the ICP agent logs in the terminal and the Stop ICP Server and View in ICP buttons."
     sources={{
         light: useBaseUrl('/img/editor/icp/integration-control-plane-integration-starting.png'),
         dark: useBaseUrl('/img/editor/icp/integration-control-plane-integration-starting.png'),
      }}
   />

3. In the **Publish to local ICP** section, you can also use **View in ICP** to open the ICP console in your browser.

   <ThemedImage
     alt="The View in ICP button highlighted in the Publish to local ICP section."
     sources={{
         light: useBaseUrl('/img/editor/icp/integration-control-plane-integration-view-in-icp.png'),
         dark: useBaseUrl('/img/editor/icp/integration-control-plane-integration-view-in-icp.png'),
      }}
   />

4. Sign in with the default credentials (`admin`/`admin`). The console opens on **All Projects**, where the **default** project holds your integrations.

   <ThemedImage
     alt="The ICP console listing the default project."
     sources={{
         light: useBaseUrl('/img/editor/icp/integration-control-plane-default-project.png'),
         dark: useBaseUrl('/img/editor/icp/integration-control-plane-default-project.png'),
      }}
   />

5. Open the **default** project. Your integration is listed with the **WSO2 Integrator** technology tag.

   <ThemedImage
     alt="The ICP console listing the running integration in the default project."
     sources={{
         light: useBaseUrl('/img/editor/icp/integration-control-plane-integration-listing.png'),
         dark: useBaseUrl('/img/editor/icp/integration-control-plane-integration-listing.png'),
      }}
   />

From here you can observe and manage the running integration in the ICP console. See the [Integration Control Plane documentation](../icp/index.md) for what you can do there.

## Stop the local ICP server or disable ICP

- **To stop the server** : In the **Publish to local ICP** section, select **Stop ICP Server**. The status bar changes to **ICP: Stopped**.
- **To disable ICP** :  Clear **Enable ICP monitoring** on an integration, or select **Disable ICP for all integrations** on the project overview.

<ThemedImage
    alt="The Enable ICP monitoring checkbox and the Stop ICP Server button highlighted."
    sources={{
        light: useBaseUrl('/img/editor/icp/integration-control-plane-disable.png'),
        dark: useBaseUrl('/img/editor/icp/integration-control-plane-disable.png'),
    }}
/>

## What's next

- [Integration Control Plane](../icp/index.md) — Learn how ICP monitors and manages your integration runtimes.
- [Get Started with ICP](../icp/quick-start.md) — Install ICP and connect your deployed runtimes.
- [ICP Console Overview](../icp/icp-console-overview.md) — Find your way around the ICP console.
