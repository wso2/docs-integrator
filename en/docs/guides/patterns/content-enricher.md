---
title: Content Enricher
description: "Implement the Content Enricher pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Content Enricher

Use a Content Enricher when the message originator does not have all the data items the target system requires. The enricher uses information in the message to retrieve the missing data from an external source and appends it before forwarding the message. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/DataEnricher.html" label="Enterprise Integration Patterns Content Enricher reference" />

In WSO2 Integrator, the enricher is a connector call placed before the target call: it looks up the missing data, and a spread expression merges the original message with the enriched fields.

## Example: Enriching bank account requests with a bank code

This example creates customer bank accounts in QuickBooks, which requires a bank code that the original request does not carry. The enricher uses the account number and country from the request to look up the bank code from the IBAN service, merges it into the message, and forwards the enriched request.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

The design view shows the two systems the enricher works with — the IBAN service it reads the missing bank code from, and the QuickBooks endpoint it sends the enriched message to:

<PatternImage src="/img/eip-patterns/content_enricher_design.png" alt="Content Enricher integration design view in WSO2 Integrator" width={760} />

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `BankAccountReq` payload.
2. Add HTTP client connections for the IBAN lookup service and the Intuit QuickBooks API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, build the `IbanRequest` from the country and account number in the message and call the IBAN service to retrieve the bank code.
4. Post the original request merged with the retrieved `bankCode` to the QuickBooks bank accounts endpoint, and return the created `BankAccount`.

The flow first calls the IBAN service to look up the bank code, then sends the enriched request to QuickBooks:

<PatternImage src="/img/eip-patterns/content_enricher_flow.png" alt="Content Enricher flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type BankAccountReq record {|
    string name;
    string accountNumber;
    string routingNumber;
    string|() country;
|};

type IbanRequest record {|
    "json"|"xml" format = "json";
    string country_iso;
    string nid;
|};

type IbanResponse record {
    string bank_code;
};

type BankAccount record {
    string id;
    string|() bankCode;
    string name;
    string accountNumber;
    string routingNumber;
    string|() country;
};

final http:Client iban = check new ("http://api.iban.com.balmock.io");
final http:Client intuit = check new ("http://api.intuit.com.balmock.io");
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /finance on httpListener {
    resource function post customers/[int id]/accounts(BankAccountReq req) returns BankAccount|error {
        IbanRequest ibanReq = {country_iso: req.country ?: "US", nid: req.accountNumber};
        IbanResponse ibanRes = check iban->/clients/api/banksuite/nid.post(ibanReq);
        BankAccount result = check intuit->/quickbooks/v4/customers/[id]/bank\-accounts.post({...req, bankCode: ibanRes.bank_code});
        return result;
    }
}
```

</TabItem>
</PatternImplementationTabs>

:::tip Build it visually with the Data Mapper
The enriched `BankAccount` is assembled in code here, but the [Data Mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md) can combine multiple inputs — the original request and the IBAN lookup result — into the target record visually.
:::

## Complete sample

The complete project is available in the [content enricher sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/content_enricher) on GitHub.
