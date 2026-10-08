---
title: ZIP Archives
---

# ZIP Archives

Package a directory into a ZIP before transferring it, read an archive's contents without unpacking it, and extract one into a target directory with limits that protect against hostile input. The `ballerina/zip` module provides three package-level functions — `compress`, `listEntries`, and `decompress` — and needs no client, no external tool, and no temporary staging.

Archive handling shows up wherever integrations move files in bulk: a partner drops a ZIP on an FTP server, a nightly job bundles generated reports before upload, or a service accepts a multi-file upload as a single attachment.

<ThemedImage
    alt="An automation in the flow designer chaining zip : compress, zip : listEntries, a Foreach over the entries, and zip : decompress"
    sources={{
        light: useBaseUrl('/img/develop/transform/zip/zip-flow.png'),
        dark: useBaseUrl('/img/develop/transform/zip/zip-flow.png'),
    }}
/>

## Creating an Archive

`zip:compress` writes a ZIP file from a source path. The source can be a single file or a directory — when it is a directory, the whole tree is archived recursively.

1. **Add a Function Call step** — In the flow designer, click **+** and select **Statement** → **Call Function**. In the function picker, search for `compress` under **zip** and configure:
   - **Source Path***: `./reports` — path of the file or directory to archive
   - **Target Path***: `./reports.zip` — path of the ZIP file to create

   <ThemedImage
       alt="The zip : compress configuration form showing Source Path, Target Path, and the Options record under Advanced Configurations"
       sources={{
           light: useBaseUrl('/img/develop/transform/zip/zip-compress-form.png'),
           dark: useBaseUrl('/img/develop/transform/zip/zip-compress-form.png'),
       }}
   />

2. **Handle the error return** — `compress` returns `zip:Error?`. Either mark the enclosing function `returns error?` and let the call propagate, or wrap the step in an **ErrorHandler** block from the **Error Handling** section.

```ballerina
import ballerina/zip;

public function main() returns error? {
    check zip:compress("./reports", "./reports.zip");
}
```

### Controlling the Archive Root

By default, the source directory itself becomes the root entry inside the archive. Compressing `./reports` produces entries named `reports/orders.csv`, and extracting that archive recreates a `reports` directory at the target.

Set `includeSourceDirectory` to `false` when you want the directory's *contents* at the archive root instead — this is usually what a downstream consumer expects when the archive name already carries the context.

1. **Add a Function Call step** — Click **+** and select **Statement** → **Call Function**, then search for `compress` under **zip**.

2. **Open Advanced Configurations** — Select **Expand** next to **Advanced Configurations** to reveal the **Options** field. It takes the whole `CompressOptions` record, so enter the fields you need as a record literal:

   ```
   {includeSourceDirectory: false, level: zip:BEST, overwrite: true}
   ```

   Use the **Record**/**Expression** toggle to switch between the guided record editor and a raw expression.

```ballerina
import ballerina/zip;

public function main() returns error? {
    check zip:compress("./reports", "./reports.zip", {
        includeSourceDirectory: false,
        level: zip:BEST,
        overwrite: true
    });
}
```

With `includeSourceDirectory` set to `false`, the same source produces entries named `orders.csv` and `q1/summary.txt` rather than `reports/orders.csv` and `reports/q1/summary.txt`.

### Compression Level and Overwrite

`level` accepts `zip:NONE`, `zip:FASTEST`, `zip:DEFAULT`, or `zip:BEST`. Use `zip:NONE` for content that is already compressed — JPEGs, PNGs, or nested archives — where deflating costs CPU and saves nothing. Use `zip:BEST` when the archive crosses a slow or metered link and build time is not the bottleneck.

`overwrite` defaults to `false`, so writing to an existing target path fails rather than silently replacing a file:

```
a file is already at './reports.zip'; set 'overwrite' to replace it
```

Set `overwrite` to `true` for a job that regenerates the same archive on every run.

## Inspecting an Archive

`zip:listEntries` returns metadata for every entry without extracting anything. Use it to validate an incoming archive before committing disk space to it — check the file count, confirm an expected entry is present, or compare compressed against uncompressed sizes.

1. **Add a Function Call step** — Click **+** and select **Statement** → **Call Function**. In the function picker, search for `listEntries` under **zip** and configure:
   - **Path***: `./reports.zip` — path of the ZIP file to read
   - **Result***: `entries`
   - **Result Type*** is fixed at `zip:Entry[]`

   <ThemedImage
       alt="The zip : listEntries configuration form showing the Path field and the entries result variable typed as zip:Entry[]"
       sources={{
           light: useBaseUrl('/img/develop/transform/zip/zip-listentries-form.png'),
           dark: useBaseUrl('/img/develop/transform/zip/zip-listentries-form.png'),
       }}
   />

2. **Add a Foreach step** — Click **+** and select **Foreach** under **Control**. Set the **Collection** to `entries` and the **Variable Name** to `entry`.

3. **Read each entry inside the loop** — Within the Foreach body, use `entry.name`, `entry.isDirectory`, and `entry.uncompressedSize` to decide how to handle each item. Skip directory entries with an **If** node, or pass the name straight to a downstream step.

```ballerina
import ballerina/io;
import ballerina/zip;

public function main() returns error? {
    zip:Entry[] entries = check zip:listEntries("./reports.zip");

    foreach zip:Entry entry in entries {
        if entry.isDirectory {
            continue;
        }
        io:println(string `${entry.name} (${entry.uncompressedSize} bytes)`);
    }
}
```

Directory entries are listed alongside files — their `name` ends with `/`, `isDirectory` is `true`, and `uncompressedSize` is `0`. Skip them unless you need to recreate the tree yourself.

Each `zip:Entry` also carries `compressedSize`, `method`, `modifiedTime`, `crc32`, `isSymlink`, and — when the archive records them — `comment` and `unixMode`. See the [`ballerina/zip` API documentation](https://central.ballerina.io/ballerina/zip/latest) for the full record.

## Extracting an Archive

`zip:decompress` extracts every entry into a target directory, creating that directory if it does not exist.

1. **Add a Function Call step** — Click **+** and select **Statement** → **Call Function**. In the function picker, search for `decompress` under **zip** and configure:
   - **Source Path***: `./reports.zip` — path of the ZIP file to extract
   - **Target Path***: `./extracted` — path of the directory to extract into, created if it is missing

2. **Process the extracted files** — Follow the call with the file-reading steps your integration needs. The target directory now holds the archive's tree exactly as `listEntries` reported it.

```ballerina
import ballerina/zip;

public function main() returns error? {
    check zip:decompress("./reports.zip", "./extracted");
}
```

### Handling Files That Already Exist

`fileWriteMode` controls what happens when an entry's target path is already occupied. It defaults to `zip:FAIL_IF_EXISTS`, which stops the extraction and reports the conflicting path:

```
cannot extract entry 'orders.csv': file '/data/extracted/orders.csv' already exists
```

The alternatives are `zip:REPLACE`, which overwrites the existing file, and `zip:SKIP`, which leaves it in place and continues. Choose `zip:SKIP` for a retryable job that may re-process the same archive, and `zip:REPLACE` when the archive is the source of truth.

1. **Open the decompress step** — Select the existing `zip : decompress` node in the flow to reopen its configuration form.

2. **Set the write mode in Options** — Select **Expand** next to **Advanced Configurations**, then set **Options** to a `DecompressOptions` record carrying the mode you want:

   ```
   {fileWriteMode: zip:SKIP}
   ```

   Combine it with `limits` in the same record when the archive is also untrusted.

```ballerina
check zip:decompress("./reports.zip", "./extracted", {
    fileWriteMode: zip:SKIP
});
```

### Guarding Against Hostile Archives

An archive from outside your own system is untrusted input. A small ZIP can expand to fill a disk, and a crafted entry name can try to write outside the directory you extracted into. Set `limits` on every extraction of an archive you did not create:

1. **Add a Function Call step** — Click **+** and select **Statement** → **Call Function**, then search for `decompress` under **zip**.

2. **Open Advanced Configurations** — Select **Expand**, then set **Options** to a `DecompressOptions` record carrying the nested `limits`:

   ```
   {limits: {maxEntries: 500, maxTotalSize: 104857600, maxCompressionRatio: 100}}
   ```

   <ThemedImage
       alt="The zip : decompress configuration form with Advanced Configurations expanded to show the Options record"
       sources={{
           light: useBaseUrl('/img/develop/transform/zip/zip-decompress-form.png'),
           dark: useBaseUrl('/img/develop/transform/zip/zip-decompress-form.png'),
       }}
   />

3. **Handle the failure path** — Wrap the step in an **ErrorHandler** block from the **Error Handling** section and route a `zip:LimitExceededError` to your quarantine or alerting logic rather than retrying it.

```ballerina
import ballerina/zip;

public function extractUpload(string archivePath, string targetDir) returns error? {
    check zip:decompress(archivePath, targetDir, {
        limits: {
            maxEntries: 500,
            maxTotalSize: 104857600,  // 100 MB uncompressed
            maxCompressionRatio: 100
        }
    });
}
```

Each limit guards a different failure:

| Limit | Guards against | Reported as |
|---|---|---|
| `maxEntries` | Archives with an unreasonable file count | `zip:LimitExceededError` |
| `maxTotalSize` | Total expansion filling the target volume | `zip:LimitExceededError` |
| `maxCompressionRatio` | A single entry that expands explosively — a ZIP bomb | `zip:LimitExceededError` |

An omitted field means no limit, so `limits` left at its default applies none of these. Path traversal is blocked independently of `limits`: an entry whose name would write outside the target directory always fails with `zip:UnsafePathError`.

## Handling Errors

On failure, these functions return a subtype of `zip:Error` (`compress`/`decompress`: `zip:Error?`, `listEntries`: `zip:Entry[]|zip:Error`). Match on the specific type when the recovery differs — a corrupt archive is a dead letter, but a limit breach may be worth flagging to a human.

| Error | Raised when |
|---|---|
| `zip:InvalidArchiveError` | The file is not a valid ZIP archive |
| `zip:FileSystemError` | Reading or writing the file system failed |
| `zip:UnsafePathError` | An entry name would write outside the target directory |
| `zip:LimitExceededError` | An entry or the archive exceeds the configured limits |
| `zip:UnsupportedEntryError` | An entry is encrypted or uses an unsupported compression method |

```ballerina
import ballerina/log;
import ballerina/zip;

public function safeExtract(string archivePath, string targetDir) returns error? {
    zip:Error? result = zip:decompress(archivePath, targetDir, {
        limits: {maxEntries: 500, maxTotalSize: 104857600}
    });

    if result is zip:LimitExceededError|zip:UnsafePathError {
        log:printWarn("archive rejected", archive = archivePath, reason = result.message());
        return;
    }
    return result;
}
```

## Integration Example: Unpack an Incoming Batch

A partner uploads a ZIP of CSV files. The integration inspects it, rejects anything oversized, extracts it, and hands each CSV to the downstream processor.

1. **Create the automation** — Add an **Automation** artifact so the integration starts from `main`, or attach this logic to an existing file or FTP entry point.

2. **Add a Function Call step for inspection** — Call `zip:listEntries` on the incoming archive path and assign the result to `entries`.

3. **Add an If step** — Click **+** and select **If** under **Control**. Test `entries.length() > 500` and route the true branch to your rejection logic.

4. **Add a Function Call step for extraction** — Call `zip:decompress` with the archive path, the staging directory, and the `limits` record described above.

5. **Add a Foreach step** — Iterate `entries`, skip entries where `isDirectory` is `true`, and call your CSV processing function with the extracted path for each remaining entry.

```ballerina
import ballerina/io;
import ballerina/log;
import ballerina/zip;

configurable string stagingDir = "./staging";

public function processBatch(string archivePath) returns error? {
    zip:Entry[] entries = check zip:listEntries(archivePath);
    log:printInfo("batch received", archive = archivePath, entries = entries.length());

    check zip:decompress(archivePath, stagingDir, {
        limits: {maxEntries: 500, maxTotalSize: 104857600, maxCompressionRatio: 100}
    });

    foreach zip:Entry entry in entries {
        if entry.isDirectory || !entry.name.endsWith(".csv") {
            continue;
        }
        string[][] rows = check io:fileReadCsv(string `${stagingDir}/${entry.name}`);
        check handleRows(entry.name, rows);
    }
}
```

Inspecting before extracting means an archive that fails your own checks never touches the staging directory.

## Best Practices

- **Always set `limits` on archives you did not create** — an omitted limit is no limit. Uploads, FTP drops, and email attachments all qualify as untrusted.
- **Call `listEntries` before `decompress` for untrusted input** — it costs one read of the central directory and lets you reject an archive on entry count, names, or declared sizes before writing anything.
- **Set `includeSourceDirectory` deliberately** — the default nests the source directory inside the archive, which surprises consumers that expect files at the root. Decide which shape the receiver wants.
- **Use `zip:NONE` for already-compressed payloads** — images, video, and nested archives gain nothing from deflate and cost CPU on every run.
- **Extract to a staging directory, not the final destination** — move files into place only after processing succeeds, so a partial extraction never leaves half a batch where a downstream watcher can see it.

## What's Next

- [Local Files](../integration-artifacts/file-driven-integration/local-files.md) — trigger an integration when an archive lands in a watched directory.
- [FTP/SFTP](../integration-artifacts/file-driven-integration/ftp-sftp.md) — pick up archives from a remote server and push generated ones back.
- [CSV & Flat File Processing](csv-flat-file.md) — parse the files an archive yields.
- [Streaming Large Files](../integration-artifacts/file-driven-integration/ftp-sftp.md#streaming-large-files) — handle payloads too large to hold in memory.
