---
title: Content Filter
description: "Implement the Content Filter pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Content Filter

Use a Content Filter to simplify dealing with a large message when you are interested in only a few data items. The filter removes the unneeded elements and passes on a smaller message. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentFilter.html" label="Enterprise Integration Patterns Content Filter reference" />

In WSO2 Integrator, the content filter is a query expression whose `select` clause projects only the required fields, producing the reduced message the target system expects.

## Example: Trimming reimbursement templates for payroll

This example receives detailed reimbursement templates that include descriptive fields the payroll API does not accept. The content filter projects each template down to the `reimbursementTypeID` and `fixedAmount` fields before posting the reduced message to the Xero payroll endpoint.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `DetailedReimbursementTemplate[]` payload.
2. Add an HTTP client connection for the Xero API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, add a query over the incoming templates with a `select` clause that keeps only `reimbursementTypeID` and `fixedAmount` — this is the content filter.
4. Post the filtered list to the Xero pay template endpoint and return the result.

The flow projects each reimbursement template down to the two fields the payroll API needs, then posts the reduced message:

<PatternImage src="/img/eip-patterns/content_filter_flow.png" alt="Content Filter flow in the WSO2 Integrator visual designer" width={530} />

The [type diagram](../../develop/understand-ide/editors/type-diagram-editor.md) shows what the filter removes: the incoming `DetailedReimbursementTemplate` carries three fields, while the `ReimbursementTemplate` sent onward keeps only `reimbursementTypeID` and `fixedAmount` — `reimbursementTypeName` is dropped:

<PatternImage src="/img/eip-patterns/content_filter_types.png" alt="Content Filter type diagram in WSO2 Integrator" width={619} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type DetailedReimbursementTemplate record {
    string reimbursementTypeID;
    string reimbursementTypeName;
    float fixedAmount;
};

type ReimbursementTemplate record {
    string reimbursementTypeID;
    float fixedAmount;
};

type Reimbursement record {
    string id;
    record {
        string reimbursementTypeID;
        float fixedAmount;
    }[] reimbursementTemplates;
};

final http:Client xero = check new ("http://api.xero.com.balmock.io");
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /payroll on httpListener {

    resource function post employees/[string id]/paytemplate/reimbursements(DetailedReimbursementTemplate[] templates)
            returns Reimbursement|error {
        ReimbursementTemplate[] reimbursementRequests = from var {reimbursementTypeID, fixedAmount} in templates
            select {reimbursementTypeID, fixedAmount};
        Reimbursement result = check xero->/payrollxro/employees/[id]/paytemplate/reimbursements.post(reimbursementRequests);
        return result;
    }
}
```

</TabItem>
</PatternImplementationTabs>

:::tip Build it visually with the Data Mapper
The `select` projection in step 3 is exactly what the [Data Mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md) does visually: map `DetailedReimbursementTemplate` to `ReimbursementTemplate` and leave `reimbursementTypeName` unlinked — any field you do not connect is dropped from the output. Since the payload is a list, this is an [array mapping](../../develop/integration-artifacts/supporting/data-mapper/array-mappings/array-mappings.md).
:::

## Complete sample

The complete project is available in the [content filter sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/content_filter) on GitHub.
