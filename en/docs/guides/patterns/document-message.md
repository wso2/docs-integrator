---
title: Document Message
description: "Implement the Document Message pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Document Message

Use a Document Message to transfer a unit of data from one application to another. Unlike a command message, the sender does not dictate what the receiver should do with the data. The message simply delivers the document. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/DocumentMessage.html" label="Enterprise Integration Patterns Document Message reference" />

In WSO2 Integrator, a document message is built by setting a file or structured payload on a request and transmitting it over a client connection. Retry configuration on the connection keeps the document delivery reliable.

## Example: Bulk-uploading leads to a CRM

This example transfers a CSV document of sales leads to the Zoho CRM bulk upload API. The flow picks the file from an FTP drop location, attaches it to the request as a multipart payload along with organization headers, and sends it over a connection configured with retries.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `CsvRequest` payload identifying the organization and file.
2. Add an HTTP client connection for the Zoho API with a retry configuration. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, build a request, add the organization and feature headers, and set the CSV file from the FTP incoming directory as a multipart payload. This is the document message.
4. Post the request to the Zoho bulk upload endpoint and return the `ZohoResponse`.

The flow attaches the CSV file to the request and transfers it to the Zoho bulk-upload endpoint:

<PatternImage src="/img/eip-patterns/document_message_flow.png" alt="Document Message flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/mime;

type CsvRequest record {|
    string org;
    string filename;
|};

type ZohoResponse record {|
    string status;
    string code;
    string message;
    record {|
        string file_id;
        string created_time;
    |} details;
|};

final http:Client zohoClient = check new ("http://content.zohoapis.com.balmock.io", retryConfig = {count: 3, interval: 1, statusCodes: [404, 408, 500]}
);
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /crm on httpListener {
    resource function post bulkUploadLeads(CsvRequest csvRequest) returns ZohoResponse|error {
        http:Request request = new http:Request();
        () var1 = request.addHeader("X-CRM_ORG", csvRequest.org);
        () var2 = request.addHeader("feature", "bulk-write");
        () var3 = request.setFileAsPayload("./ftpincoming/" + csvRequest.filename, contentType = mime:MULTIPART_FORM_DATA);
        ZohoResponse result = check zohoClient->/crm/v5/upload.post(request);
        return result;
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [document message sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/document_message) on GitHub.
