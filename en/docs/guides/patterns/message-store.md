---
title: Message Store
description: "Implement the Message Store pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message Store

Use a Message Store to capture message information in a central location without disturbing the loosely coupled and transient nature of the messaging system. The flow stores a copy of each message it processes, so the data can be queried later. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageStore.html" label="Enterprise Integration Patterns Message Store reference" />

In WSO2 Integrator, the store is an external datastore written to asynchronously with `start`, so persisting the message never blocks or slows down the main message flow.

## Example: Storing geocoding results

This example resolves street addresses to coordinates. The flow first checks the Firebase message store for a previously stored result and returns it if present. On a miss, it calls the Google Geocoding API, returns the result to the caller immediately, and stores the response in Firebase asynchronously for future requests.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

The design view shows the two systems involved: the Google geocoding service the data comes from, and the Firebase store the messages are written to:

<PatternImage src="/img/eip-patterns/message_store_design.png" alt="Message Store integration design view in WSO2 Integrator" width={760} />

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `get` resource that accepts the address as a query parameter.
2. Add HTTP client connections for the Google Geocoding API and the Firebase datastore. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, read the stored result for the address from Firebase and return it when found.
4. On a store miss, call the geocoding API, start the `storeAddress` function asynchronously to persist the response, and return the geocode to the caller without waiting for the store write.

The flow returns a stored result when one exists; otherwise it calls the geocoding API, returns immediately, and stores the result asynchronously with `start`:

<PatternImage src="/img/eip-patterns/message_store_flow.png" alt="Message Store flow in the WSO2 Integrator visual designer" width={672} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type GeoCodeResponse record {|
    json results;
|};

final http:Client geoCodingClient = check new ("http://api.maps.googleapis.com.balmock.io");
final http:Client firebaseClient = check new ("http://api.mapsproject.firebase.com.balmock.io");
// docs-fold-end

function storeAddress(string address, GeoCodeResponse geocode) returns error? {
    json jsonResult = check firebaseClient->/location/[address]/location\.json.put(geocode, targetType = json);
}

listener http:Listener httpListener = new (port = 8080);

service /api on httpListener {
    resource function get location(string address) returns GeoCodeResponse|error {
        GeoCodeResponse|error storedGeocode = firebaseClient->/location/[address]/location\.json();
        if storedGeocode !is error {
            return storedGeocode;
        }
        GeoCodeResponse geocode = check geoCodingClient->/maps/api/geocode/'json.get(place = address);
        future<error?> futureResult = start storeAddress(address, geocode);
        return geocode;
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [message store sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/message_store) on GitHub.
