---
title: Build a file-driven integration
---

# Build a file-driven integration

**Time:** Under 10 minutes | **What you'll build:** A file integration that adds an `onModify` handler to track file changes and uses `printInfo` to log file modification events.

File integrations are ideal for batch uploads, scheduled file processing, and ETL workflows triggered by files appearing in a folder or FTP server.

<ThemedImage
    alt="File-driven integration diagram"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/file-diagram-light.svg'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/file-diagram-dark.svg'),
    }}
/>

:::info Prerequisites

- [WSO2 Integrator installed](install.md)
- A test file at the listener path (created with the command below).

The `onModify` handler only fires when a file that already exists changes. Skip the command below if a file already exists at the listener path.

```bash
echo "test" > /tmp/testfile.txt
```

```bat
mkdir C:\tmp
echo test > C:\tmp\testfile.txt
```

Skip `mkdir C:\tmp` if the folder already exists.

## Step 1: Create the project

1. Open WSO2 Integrator.
2. Select **Create New Integration**.
3. Set **Integration Name** to `FileTracker` and **Project Name** to `QuickStart`.
4. Select **Browse**.
5. Select the project location and select **Open**.
6. Select **Create Integration**.

<ThemedImage
    alt="Create the Project"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/create-the-project-light.gif'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/create-the-project-dark.gif'),
    }}
/>

## Step 2: Add a file integration artifact

1. Select **FileTracker**.
2. In the design view, select **+ Add Artifact**.
3. Select **Local Files** under **File Integration**.
4. Set **Path** to `/tmp` (macOS/Linux) or `C:\tmp` (Windows). Select **Create**.

<ThemedImage
    alt="Add a File Integration Artifact"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/add-a-file-integration-artifact-light.gif'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/add-a-file-integration-artifact-dark.gif'),
    }}
/>

## Step 3: Track modified files

1. Select **+ Add Handler**, then select **onModify** from the side panel.
2. Select the **onModify** handler to open the **Flow Designer**.
3. Select **+** in the flow diagram.
4. Search for `printInfo` and select **printInfo**.
5. Set **Msg** to `File modified` and select **Save**.

<ThemedImage
    alt="Tracking modified files"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/tracking-modified-files-light.gif'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/tracking-modified-files-dark.gif'),
    }}
/>

## Step 4: Run and test

1. Select **Run** in the toolbar.
2. Run the modify command in your terminal to trigger the handler:

   <Tabs groupId="os">
   <TabItem value="unix" label="macOS / Linux" default>

   ```bash
   echo "modify" > /tmp/testfile.txt
   ```




   ```bat
   echo modify > C:\tmp\testfile.txt
   ```




   <ThemedImage
       alt="Run and Test"
       sources={{
           light: useBaseUrl('/img/get-started/build-file-driven-integration/run-and-test-light.gif'),
           dark: useBaseUrl('/img/get-started/build-file-driven-integration/run-and-test-dark.gif'),
       }}
   />

3. Confirm the run terminal shows the log line `File modified`.

   ![Run terminal showing the "File modified" log line emitted by printInfo](/img/get-started/build-file-driven-integration/expected-output.png)

The following complete, runnable Ballerina program produces the same integration shown in the visual designer steps.

:::info Windows
Change the listener `path` from `"/tmp"` to `"C:\\tmp"` (backslash escaped) before running the program.

```ballerina
import ballerina/file;
import ballerina/log;

listener file:Listener fileListener = new (path = "/tmp", recursive = false);

service file:Service on fileListener {
    remote function onModify(file:FileEvent event) returns error? {
        do {
            log:printInfo("File modified");
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }

}
```

Save this as `main.bal`, then run `bal run` from the project directory. With the test file already in place (see Prerequisites), run the modify command in a separate terminal to trigger the handler:

<TabItem value="unix" label="macOS / Linux" default>

```bash
echo "modify" > /tmp/testfile.txt
```

```bat
echo modify > C:\tmp\testfile.txt
```

Confirm the run terminal shows the log line `File modified`.

## What's next

- [Automation](build-automation.md) — Build a scheduled job
- [AI agent](build-ai-agent.md) — Build an intelligent agent
- [Integration as API](build-api-integration.md) — Build an HTTP service
- [Event-driven integration](build-event-driven-integration.md) — React to messages from brokers
- [Local files](../develop/integration-artifacts/file/local-files.md) — Full Local Files listener reference (events, recursive watching, file handlers)
- [Watch a local directory of CSV files](../tutorials/walkthroughs/watch-a-local-directory-csv-files.md) — End-to-end tutorial
