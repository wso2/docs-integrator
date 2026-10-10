---
sidebar_position: 5
title: "Build a File-Driven Integration"
description: Build a Local Files listener in WSO2 Integrator to detect file modifications and log them.
keywords: [wso2 integrator, file integration, local files, onModify, quick start, ballerina file]
slug: /get-started/quickstarts/build-file-driven-integration
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build a File-Driven Integration

**Time:** Under 10 minutes | **What you'll build:** A file integration that adds an `onModify` handler to track file changes and uses `printInfo` to log file modification events.

<p style={{textAlign: 'justify'}}>
File integrations are ideal for batch uploads, scheduled file processing, and ETL workflows triggered by files appearing in a folder or FTP server.
</p>

:::info Prerequisites

- A working WSO2 Integrator environment. Choose the path that fits how you want to work:
   - <CloudDocsLink to="/get-started/cloud-setup">Cloud setup</CloudDocsLink> — launch WSO2 Integrator in a browser-based cloud editor.
   - [Local setup](../setup/setup.md) — install and launch WSO2 Integrator on your machine.
- A file at the listener path to watch. Create one if you don't have one:

 <Tabs groupId="os">
 <TabItem value="unix" label="macOS / Linux" default>

 ```bash
 echo "test" > /tmp/testfile.txt
 ```

 </TabItem>
 <TabItem value="windows" label="Windows">

 ```bat
 mkdir C:\tmp 2>nul
 echo test > C:\tmp\testfile.txt
 ```

 </TabItem>
 </Tabs>

:::


## Step 1: Create the integration

:::info Note
If you're using the cloud editor, a project is already open, so you can skip this step and go directly to [Step 2: Add a file integration artifact](#step-2-add-a-file-integration-artifact).
:::

1. Open WSO2 Integrator.

2. Click **Create** in the **Create a Project** card.

   <ThemedImage
      alt="WSO2 Integrator home screen with the Create a Project card"
      sources={{
         light: useBaseUrl('/img/get-started/build-file-driven-integration/wso2-integrator.png'),
         dark: useBaseUrl('/img/get-started/build-file-driven-integration/wso2-integrator.png'),
      }}
   />

3. Set **Project Name** to `file-integration`.

4. Set **Integration Name** to `FileTracker`.

5. Click **Create**.

   <ThemedImage
      alt="Create a Project form with Project name set to file-integration and Integration name set to FileTracker"
      sources={{
         light: useBaseUrl('/img/get-started/build-file-driven-integration/create-project.png'),
         dark: useBaseUrl('/img/get-started/build-file-driven-integration/create-project.png'),
      }}
   />

## Step 2: Add a file integration artifact

1. Select your integration from the project overview canvas.

2. In the design view, click **Add Artifact Manually**.

   <ThemedImage
      alt="Integration design view with the Add Artifact manually button highlighted"
      sources={{
         light: useBaseUrl('/img/get-started/build-file-driven-integration/add-artifact.png'),
         dark: useBaseUrl('/img/get-started/build-file-driven-integration/add-artifact.png'),
      }}
   />

3. Select **Local Files** under **File Integration**.

   <ThemedImage
      alt="Artifacts page with Local Files highlighted under File Integration"
      sources={{
         light: useBaseUrl('/img/get-started/build-file-driven-integration/select-local-files.png'),
         dark: useBaseUrl('/img/get-started/build-file-driven-integration/select-local-files.png'),
      }}
   />

4. Set **Path** to the folder you want to watch:

   <Tabs groupId="os">
   <TabItem value="unix" label="macOS / Linux" default>

   ```text
   /tmp
   ```

   </TabItem>
   <TabItem value="windows" label="Windows">

   ```text
   C:\tmp
   ```

   </TabItem>
   </Tabs>

5. Click **Create**.

   <ThemedImage
      alt="Create Local Files form with Path set to /tmp"
      sources={{
         light: useBaseUrl('/img/get-started/build-file-driven-integration/set-path.png'),
         dark: useBaseUrl('/img/get-started/build-file-driven-integration/set-path.png'),
      }}
   />

## Step 3: Add `onModify` event handler

1. In the service designer view, click **+ Add Handler**.

2. Select **onModify**.

   <ThemedImage
      alt="Select Handler to Add panel with onModify highlighted"
      sources={{
         light: useBaseUrl('/img/get-started/build-file-driven-integration/select-onmodify.png'),
         dark: useBaseUrl('/img/get-started/build-file-driven-integration/select-onmodify.png'),
      }}
   />

3. In the **Configure onModify Handler** panel, clear both **On Success** and **On Error** under **File Handling Options**, then click **Save**. Both options arrive ticked and set to **Move**, which moves each processed file out of the watched directory. Clearing them keeps `testfile.txt` in `/tmp`, where the later steps expect it. For details, see [Post-processing: moving or deleting files](../../develop-and-test/integration-artifacts/file-driven-integration/local-files.md#post-processing-moving-or-deleting-files).

## Step 4: Add file tracking logic

1. Click **+** in the flow diagram.

2. Search for `printInfo` and select **printInfo**.

   <ThemedImage
      alt="Node panel search results showing printInfo under log"
      sources={{
         light: useBaseUrl('/img/get-started/build-file-driven-integration/select-printinfo.png'),
         dark: useBaseUrl('/img/get-started/build-file-driven-integration/select-printinfo.png'),
      }}
   />

3. Set **Msg** to `File modified`.

4. Click **Save**.

   <ThemedImage
      alt="log:printInfo panel with Msg set to File modified"
      sources={{
         light: useBaseUrl('/img/get-started/build-file-driven-integration/set-msg.png'),
         dark: useBaseUrl('/img/get-started/build-file-driven-integration/set-msg.png'),
      }}
   />

## Step 5: Run and test

1. Click **Run** in the toolbar.

2. Run the modify command in your terminal to trigger the handler:

  <Tabs groupId="os">
  <TabItem value="unix" label="macOS / Linux" default>

  ```bash
  echo "modify" > /tmp/testfile.txt
  ```

  </TabItem>
  <TabItem value="windows" label="Windows">

  ```bat
  echo modify > C:\tmp\testfile.txt
  ```
  </TabItem>
  </Tabs>

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
:::


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


## What's next

- [Local files](../../develop-and-test/integration-artifacts/file-driven-integration/local-files.md) — Full Local Files listener reference (events, recursive watching, file handlers)
- [FTP/SFTP](../../develop-and-test/integration-artifacts/file-driven-integration/ftp-sftp.md) — Watch and process files on remote FTP or SFTP servers
- [Streaming large files](../../develop-and-test/integration-artifacts/file-driven-integration/ftp-sftp.md#streaming-large-files) — Process large files without loading them fully into memory
- [CSV fault tolerance](../../develop-and-test/integration-artifacts/file-driven-integration/csv-fault-tolerance.md) — Handle errors and partial failures when processing CSV files
