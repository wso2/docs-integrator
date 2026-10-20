---
title: Build a File-Driven Integration
---

# Build a File-Driven Integration

<QuickstartHeader
  time="Under 10 minutes"
  build={<>A file integration that adds an <code>onModify</code> handler to track file changes and uses <code>printInfo</code> to log file modification events.</>}
/>

File integrations are ideal for batch uploads, scheduled file processing, and ETL workflows triggered by files appearing in a folder or FTP server.

## Prerequisites

A working WSO2 Integrator environment.

<PrereqCard icon="cloud" title="WSO2 Cloud setup" href="/get-started/setup">Sign up and launch WSO2 Integrator in the browser-based cloud editor.

<p style={{marginTop: '12px'}}>You'll also need a file at the listener path to watch. Create one if you don't have one:</p>

```bash
echo "test" > /tmp/testfile.txt
```

```bat
mkdir C:\tmp 2>nul
echo test > C:\tmp\testfile.txt
```

## Step 1: Create the integration

1. On the project home page, click **Create on Cloud**.

   <ThemedImage
       alt="WSO2 Cloud project home showing the Create on Cloud option"
       sources={{
           light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
           dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
       }}
   />

2. The WSO2 Integrator cloud editor opens in your browser. Add an artifact to your integration, then deploy it to WSO2 Cloud from the Deploy to WSO2 Cloud panel on the right.

   <ThemedImage
    alt="WSO2 Integrator cloud editor landing page showing an empty integration and the Deploy to WSO2 Cloud panel"
    sources={{
        light: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
        dark: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
    }}
    />
## Step 2: Add a file integration artifact

1. Select your integration from the project overview canvas.
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

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate the following complete, runnable Ballerina program:

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

</details>

## Learn more

- [Local files](../../develop-and-test/integration-artifacts/file-driven-integration/local-files.md) — Full Local Files listener reference (events, recursive watching, file handlers)
- [FTP/SFTP](../../develop-and-test/integration-artifacts/file-driven-integration/ftp-sftp.md) — Watch and process files on remote FTP or SFTP servers
- [Streaming large files](../../develop-and-test/integration-artifacts/file-driven-integration/ftp-sftp.md#streaming-large-files) — Process large files without loading them fully into memory
- [CSV fault tolerance](../../develop-and-test/integration-artifacts/file-driven-integration/csv-fault-tolerance.md) — Handle errors and partial failures when processing CSV files
