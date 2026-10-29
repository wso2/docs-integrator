---
title: Integration Control Plane(ICP) Support in Editor
---

# Integration Control Plane(ICP) Support in  Editor

The WSO2 Agent Builder editor can start a local **Integration Control Plane (ICP)** server so you can observe and manage your agentic integrations while you are still developing them. Enable ICP for an agentic integration, run it as usual, and its runtime shows up in the ICP console.

The local ICP server is meant for development and trying ICP out. To monitor and manage integrations that are deployed, see the [Integration Control Plane documentation](product://integrator/icp).

## Enable ICP for an agentic integration

You enable ICP for one agentic integration at a time.

1. Open the agentic integration's overview.
2. Select **Deploy** in the toolbar to open the deploy panel.
3. Under **Management**, expand **Integration Control Plane** and select **Enable ICP Monitoring**.

    <ThemedImage
       alt="The deploy panel with the Integration Control Plane section and the Enable ICP Monitoring checkbox."
       sources={{
           light: useBaseUrl('/img/editor/icp/integration-control-plane-integration-option-v1.0.png'),
           dark: useBaseUrl('/img/editor/icp/integration-control-plane-integration-option-v1.0.png'),
       }}
   />

## Start the local ICP server

With ICP enabled, the editor needs an ICP server to publish to. You can find the ICP server status in the status bar as **ICP: Stopped** or **ICP: Running**.

- **Start it from the deploy panel.** Under **Publish to Local ICP**, select **Start ICP Server**.

  <ThemedImage
      alt="The Publish to Local ICP section of the deploy panel with the Start ICP Server button."
      sources={{
          light: useBaseUrl('/img/editor/icp/integration-control-plane-start-v1.0.png'),
          dark: useBaseUrl('/img/editor/icp/integration-control-plane-start-v1.0.png'),
      }}
   />

- **Start it when you run.** If you run an ICP-enabled agentic integration while the server is stopped, the editor warns that **ICP is enabled but the ICP server is not running**. Select **Start & Setup** to start and configure the server, or **Run Anyway** to run the agentic integration without publishing to ICP.

  <ThemedImage
      alt="The warning shown when running an ICP-enabled agentic integration while the ICP server is not running."
      sources={{
          light: useBaseUrl('/img/editor/icp/integration-control-plane-warning-v1.0.png'),
          dark: useBaseUrl('/img/editor/icp/integration-control-plane-warning-v1.0.png'),
      }}
   />

When the server is up, the editor shows a notification with its address, `https://localhost:9446`, and the default credentials (`admin`/`admin`). Select **Open in Browser** to open the ICP console. The server's logs appear in the **ICP Server** terminal.

<ThemedImage
    alt="The notifications confirming the ICP server has started, with the ICP Server terminal open."
    sources={{
        light: useBaseUrl('/img/editor/icp/integration-control-plane-started-v1.0.png'),
        dark: useBaseUrl('/img/editor/icp/integration-control-plane-started-v1.0.png'),
    }}
/>

If an agent in the agentic integration uses the WSO2 default model provider and it isn't configured yet, the editor asks you to configure it before the run starts. Select **Configure Now** and sign in to continue. Otherwise, the run is cancelled.

## Run and observe your agentic integration

1. Run the agentic integration as you normally would. If the project has more than one agentic integration, pick the one to run from the **Select an integration to run** list.

2. While it runs, the agentic integration connects to the local ICP server. The terminal shows the ICP agent starting and its heartbeat being acknowledged by the server, and the status bar shows **ICP: Running**.

   <ThemedImage
     alt="A running ICP-enabled integration, with the ICP agent logs in the terminal and the Stop ICP Server and View in ICP buttons."
     sources={{
         light: useBaseUrl('/img/editor/icp/integration-control-plane-integration-starting.png'),
         dark: useBaseUrl('/img/editor/icp/integration-control-plane-integration-starting.png'),
      }}
   />

3. In the **Publish to Local ICP** section, you can also use **View in ICP** to open the ICP console in your browser.

   <ThemedImage
     alt="The View in ICP button highlighted in the Publish to Local ICP section."
     sources={{
         light: useBaseUrl('/img/editor/icp/integration-control-plane-integration-view-in-icp-v1.0.png'),
         dark: useBaseUrl('/img/editor/icp/integration-control-plane-integration-view-in-icp-v1.0.png'),
      }}
   />

4. Sign in with the default credentials (`admin`/`admin`). The console opens on **All Projects**, where the **default** project holds your agentic integrations.

   <ThemedImage
     alt="The ICP console listing the default project."
     sources={{
         light: useBaseUrl('/img/editor/icp/integration-control-plane-default-project.png'),
         dark: useBaseUrl('/img/editor/icp/integration-control-plane-default-project.png'),
      }}
   />

5. Open the **default** project. Your agentic integration is listed there.

   <ThemedImage
     alt="The ICP console listing the running integration in the default project."
     sources={{
         light: useBaseUrl('/img/editor/icp/integration-control-plane-integration-listing.png'),
         dark: useBaseUrl('/img/editor/icp/integration-control-plane-integration-listing.png'),
      }}
   />

From here you can observe and manage the running agentic integration in the ICP console. See the [Integration Control Plane documentation](product://integrator/icp) for what you can do there.

## Stop the local ICP server or disable ICP

- **To stop the server** : In the **Publish to Local ICP** section, select **Stop ICP Server**. The status bar changes to **ICP: Stopped**.
- **To disable ICP** :  Clear **Enable ICP Monitoring** in the deploy panel of the agentic integration.

<ThemedImage
    alt="The Enable ICP Monitoring checkbox and the Stop ICP Server button highlighted."
    sources={{
        light: useBaseUrl('/img/editor/icp/integration-control-plane-disable-v1.0.png'),
        dark: useBaseUrl('/img/editor/icp/integration-control-plane-disable-v1.0.png'),
    }}
/>

## What's next

- [Integration Control Plane](product://integrator/icp) — Learn how ICP monitors and manages your integration runtimes.
- [Get Started with ICP](product://integrator/icp/quick-start) — Install ICP and connect your deployed runtimes.
- [ICP Console Overview](product://integrator/icp/icp-console-overview) — Find your way around the ICP console.
