---
title: Message Sequence
description: "Implement the Message Sequence pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message Sequence

Use a Message Sequence to transmit an arbitrarily large amount of data as a sequence of smaller messages, with sequence information that lets the receiver reassemble the whole. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageSequence.html" label="Enterprise Integration Patterns Message Sequence reference" />

In WSO2 Integrator, a [Foreach node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#foreach) drives the sequence: each iteration requests or sends one chunk, and the loop index is the sequence identifier that orders the chunks.

## Example: Downloading a large file in chunks

This example downloads a large file from Amazon S3 as a sequence of ranged requests. The flow first reads the file size from the object metadata, computes the number of chunks, and then requests each 10-byte range in order, appending every chunk to a local file to reassemble the document.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [automation](../../develop/integration-artifacts/automation.md#creating-an-automation) to run the flow.
2. Add an HTTP client connection for the S3 bucket. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, send a `head` request to read the `Content-Length` header and compute the number of chunks.
4. Add a [Foreach node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#foreach) over the chunk indexes. In each iteration, set the `Range` header for the chunk, request that range, and append the bytes to the local file.

The **Foreach** node requests the file one byte-range at a time, appending each chunk to reassemble the whole:

<PatternImage src="/img/eip-patterns/message_sequence_flow.png" alt="Message Sequence flow in the WSO2 Integrator visual designer" width={620} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/io;

final http:Client s3Client = check new ("http://noname-tech.s3.amazonaws.com.balmock.io");
// docs-fold-end

public function main() returns error? {
    http:Response metaData = check s3Client->/employee_names.head();
    int fileSize = check int:fromString(check metaData.getHeader("Content-Length"));

    () var3 = check io:fileWriteBytes("./resources/employee_names.txt", []);

    int numberOfChunks = (fileSize + 10 - 1) / 10;
    foreach int i in 0 ..< numberOfChunks {
        map<string> headers = {Range: string `bytes=${10 * i}-${10 * (i + 1) - 1}`};
        http:Response s3Response = check s3Client->/employee_names.get(headers);
        byte[] chunkData = check s3Response.getBinaryPayload();
        () var2 = check io:fileWriteBytes("./resources/employee_names.txt", chunkData, io:APPEND);
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [message sequence sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/message_sequence) on GitHub.
