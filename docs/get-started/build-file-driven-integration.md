---
title: Build a File-Driven Integration
---

# Build a File-Driven Integration

**Time:** Under 10 minutes | **What you'll build:** A file integration that adds an `onModify` handler to track file changes and uses `printInfo` to log file modification events.

File integrations are ideal for batch uploads, scheduled file processing, and ETL workflows triggered by files appearing in a folder or FTP server.

:::info Prerequisites

- A working WSO2 Integrator environment. Choose the path that fits how you want to work:
    - [Cloud setup](setup/cloud-setup.md) — launch WSO2 Integrator in a browser-based cloud editor.
    - [Local setup](setup/local-setup.md) — install and launch the WSO2 Integrator IDE on your machine.
- A file at the listener path to watch. Create one if you don't have one:




  ```bash
  echo "test" > /tmp/testfile.txt
  ```




  ```bat
  mkdir C:\tmp 2>nul
  echo test > C:\tmp\testfile.txt
  ```




## Step 1: Create the integration

:::info Note

In the cloud editor, you're already inside a project. Skip to Step 2.

1. Open WSO2 Integrator.
2. Select the **Create New Integration** card.
3. Set **Integration Name** to `FileTracker`.
4. Set **Project Name** to `file-integration`.
5. Select **Create Integration**.

<ThemedImage
    alt="Create Integration form with Integration Name set to FileTracker and Project Name set to file-integration"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/create-the-project-light.png'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/create-the-project-light.png'),
    }}
/>

## Step 2: Add a file integration artifact

1. Select **FileTracker** from Project Overview Canvas.
2. In the design view, select **+ Add Artifact**.
3. Select **Local Files** under **File Integration**.
4. Set **Path** to `/tmp` (macOS/Linux) or `C:\tmp` (Windows). Select **Create**.

<ThemedImage
    alt="Create Local Files form with Path set to /tmp and Recursive set to False"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/add-a-file-integration-artifact-light.png'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/add-a-file-integration-artifact-light.png'),
    }}
/>

## Step 3: Add `onModify` event handler

1. In the service designer view, select **+ Add Handler**.
2. Select **onModify**.

<ThemedImage
    alt="Select Handler to Add panel showing onCreate, onDelete, and onModify options"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/add-handler-light.png'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/add-handler-light.png'),
    }}
/>

## Step 4: Add file tracking logic

1. Select **+** in the flow diagram.
2. Search for `printInfo` and select **printInfo**.
3. Set **Msg** to `File modified` and select **Save**.

<ThemedImage
    alt="Flow Designer showing the onModify handler with printInfo configured to log File modified"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/tracking-modified-files-light.png'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/tracking-modified-files-light.png'),
    }}
/>

## Step 5: Run and test

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




3. Confirm the run terminal shows the log line `File modified`.

<ThemedImage
    alt="Flow designer showing the integration running with log:printInfo emitting File modified"
    sources={{
        light: useBaseUrl('/img/get-started/build-file-driven-integration/run-and-test-light.gif'),
        dark: useBaseUrl('/img/get-started/build-file-driven-integration/run-and-test-light.gif'),
    }}
/>

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

Save this as `main.bal`, then click the **Run** button in the top toolbar. With the test file already in place (see Prerequisites), run the modify command in a separate terminal to trigger the handler:

<TabItem value="unix" label="macOS / Linux" default>

```bash
echo "modify" > /tmp/testfile.txt
```

```bat
echo modify > C:\tmp\testfile.txt
```

Confirm the run terminal shows the log line `File modified`.

## What's next

- [Local files](../develop/integration-artifacts/file/local-files.md) — Full Local Files listener reference (events, recursive watching, file handlers)
- [FTP/SFTP](../develop/integration-artifacts/file/ftp-sftp.md) — Watch and process files on remote FTP or SFTP servers
- [Streaming large files](../develop/integration-artifacts/file/streaming-large-files.md) — Process large files without loading them fully into memory
- [CSV fault tolerance](../develop/integration-artifacts/file/csv-fault-tolerance.md) — Handle errors and partial failures when processing CSV files
