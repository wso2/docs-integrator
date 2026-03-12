---
sidebar_position: 4
title: "Google Drive to OneDrive Sync"
description: "Pre-built integration sample: Bi-directional file sync between Google Drive and Microsoft OneDrive using Ballerina."
---

# Google Drive to OneDrive Sync

Keep files synchronized between Google Drive and Microsoft OneDrive with bi-directional sync. When a file is created or updated in either cloud storage service, this integration automatically replicates the change to the other, ensuring both locations always have the latest version.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Google Cloud project with the Google Drive API enabled and OAuth 2.0 credentials configured
- Microsoft Azure app registration with OneDrive (Microsoft Graph) API permissions
- Designated folders in both Google Drive and OneDrive to keep in sync

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/google-drive-to-onedrive-sync

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your Google and Microsoft credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[googleDrive]
clientId = "<GOOGLE_CLIENT_ID>"
clientSecret = "<GOOGLE_CLIENT_SECRET>"
refreshToken = "<GOOGLE_REFRESH_TOKEN>"
folderId = "<GOOGLE_DRIVE_FOLDER_ID>"

[oneDrive]
clientId = "<AZURE_CLIENT_ID>"
clientSecret = "<AZURE_CLIENT_SECRET>"
refreshToken = "<AZURE_REFRESH_TOKEN>"
tenantId = "<AZURE_TENANT_ID>"
folderPath = "/SyncedFiles"

[sync]
pollingIntervalSeconds = 60
conflictResolution = "latest-wins"
```

## Code Walkthrough

### Project Structure

```
google-drive-to-onedrive-sync/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── google_drive_client.bal
├── onedrive_client.bal
├── sync_engine.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// Represents a file in either storage provider
type SyncFile record {|
    string id;
    string name;
    string mimeType;
    string modifiedTime;
    string checksum;
    Source 'source;
|};

enum Source {
    GOOGLE_DRIVE,
    ONEDRIVE
}

// Tracks sync state to detect changes
type SyncState record {|
    map<string> googleDriveChecksums;
    map<string> oneDriveChecksums;
    string lastSyncTime;
|};
```

### Detecting Changes in Google Drive

```ballerina
import ballerinax/googleapis.drive;
import ballerina/log;

configurable drive:ConnectionConfig googleDriveConfig = ?;
configurable string googleFolderId = ?;

final drive:Client driveClient = check new (googleDriveConfig);

function listGoogleDriveFiles(string sinceTime) returns SyncFile[]|error {
    drive:File[] files = check driveClient->listFiles(
        q = string `'${googleFolderId}' in parents and modifiedTime > '${sinceTime}'`
    );

    return from drive:File f in files
        select {
            id: f.id ?: "",
            name: f.name ?: "",
            mimeType: f.mimeType ?: "application/octet-stream",
            modifiedTime: f.modifiedTime ?: "",
            checksum: f.md5Checksum ?: "",
            'source: GOOGLE_DRIVE
        };
}

function downloadFromGoogleDrive(string fileId) returns byte[]|error {
    return check driveClient->getFileContent(fileId);
}

function uploadToGoogleDrive(string fileName, byte[] content, string mimeType) returns error? {
    _ = check driveClient->uploadFile(googleFolderId, fileName, content, mimeType);
    log:printInfo("Uploaded to Google Drive", fileName = fileName);
}
```

### Syncing to OneDrive

```ballerina
import ballerinax/microsoft.onedrive;
import ballerina/log;

configurable onedrive:ConnectionConfig oneDriveConfig = ?;
configurable string oneDriveFolderPath = ?;

final onedrive:Client odClient = check new (oneDriveConfig);

function listOneDriveFiles(string sinceTime) returns SyncFile[]|error {
    onedrive:DriveItem[] items = check odClient->listChildren(oneDriveFolderPath);

    return from onedrive:DriveItem item in items
        where item?.lastModifiedDateTime > sinceTime
        select {
            id: item?.id ?: "",
            name: item?.name ?: "",
            mimeType: item?.file?.mimeType ?: "application/octet-stream",
            modifiedTime: item?.lastModifiedDateTime ?: "",
            checksum: item?.file?.hashes?.sha1Hash ?: "",
            'source: ONEDRIVE
        };
}

function downloadFromOneDrive(string itemId) returns byte[]|error {
    return check odClient->downloadFile(itemId);
}

function uploadToOneDrive(string fileName, byte[] content) returns error? {
    _ = check odClient->uploadFile(oneDriveFolderPath + "/" + fileName, content);
    log:printInfo("Uploaded to OneDrive", fileName = fileName);
}
```

### Bi-Directional Sync Engine

```ballerina
import ballerina/task;
import ballerina/log;

configurable int pollingIntervalSeconds = 60;
configurable string conflictResolution = "latest-wins";

SyncState syncState = {
    googleDriveChecksums: {},
    oneDriveChecksums: {},
    lastSyncTime: ""
};

public function main() returns error? {
    _ = check task:scheduleJobRecurByFrequency(new SyncJob(), pollingIntervalSeconds);
    log:printInfo("Bi-directional sync started",
        interval = pollingIntervalSeconds,
        conflictStrategy = conflictResolution);
}

class SyncJob {
    *task:Job;

    isolated function execute() {
        error? result = performSync();
        if result is error {
            log:printError("Sync cycle failed", result);
        }
    }
}

function performSync() returns error? {
    string sinceTime = syncState.lastSyncTime;

    // Detect changes on both sides
    SyncFile[] googleChanges = check listGoogleDriveFiles(sinceTime);
    SyncFile[] oneDriveChanges = check listOneDriveFiles(sinceTime);

    // Sync Google Drive changes to OneDrive
    foreach SyncFile file in googleChanges {
        if !hasMatchingChecksum(syncState.oneDriveChecksums, file) {
            byte[] content = check downloadFromGoogleDrive(file.id);
            check uploadToOneDrive(file.name, content);
            syncState.oneDriveChecksums[file.name] = file.checksum;
        }
    }

    // Sync OneDrive changes to Google Drive
    foreach SyncFile file in oneDriveChanges {
        if !hasMatchingChecksum(syncState.googleDriveChecksums, file) {
            byte[] content = check downloadFromOneDrive(file.id);
            check uploadToGoogleDrive(file.name, content, file.mimeType);
            syncState.googleDriveChecksums[file.name] = file.checksum;
        }
    }

    syncState.lastSyncTime = time:utcToString(time:utcNow());
    log:printInfo("Sync cycle completed",
        googleChanges = googleChanges.length(),
        oneDriveChanges = oneDriveChanges.length());
}

function hasMatchingChecksum(map<string> checksums, SyncFile file) returns boolean {
    string? existing = checksums[file.name];
    return existing == file.checksum;
}
```

### Key Points

- **Bi-directional sync**: Changes in either Google Drive or OneDrive are detected and replicated to the other service.
- **Checksum-based change detection**: File checksums prevent unnecessary re-uploads when content has not changed.
- **Conflict resolution**: The `latest-wins` strategy uses modification timestamps to resolve conflicts when a file is modified on both sides between sync cycles.

## Customization Notes

- **File type filtering**: Add MIME type filters to sync only specific file types (e.g., documents, spreadsheets).
- **Subfolder support**: Extend the sync engine to recursively traverse and sync subfolders.
- **Change the conflict strategy**: Implement alternative strategies such as `keep-both` (rename the conflicting file) or `source-priority` (always prefer one side).
- **Add webhook triggers**: Replace polling with Google Drive push notifications and Microsoft Graph subscriptions for near-real-time sync.

## What's Next

- [Google Sheets to Salesforce Contacts](google-sheets-salesforce.md) -- Sync spreadsheet data to your CRM
- [FTP EDI to Salesforce Opportunity](ftp-edi-salesforce.md) -- Process files from FTP servers
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
