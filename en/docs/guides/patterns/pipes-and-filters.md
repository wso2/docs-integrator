---
title: Pipes and Filters
description: "Implement the Pipes and Filters pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Pipes and Filters

Use Pipes and Filters to perform complex processing on a message as a sequence of independent processing steps (filters) connected by channels (pipes), so each step can be developed, tested, and reused on its own. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html" label="Enterprise Integration Patterns Pipes and Filters reference" />

In WSO2 Integrator, a Ballerina query expression is a natural pipes-and-filters chain. Each clause (`let`, `where`, `limit`, `order by`, `select`) is an independent filter, and the query pipes the output of one clause into the next.

## Example: Ranking top-performing employees

This example exposes a service that returns the top-performing employees. The flow retrieves raw performance records from a Firebase datastore and pushes them through a chain of processing steps: compute a weighted performance score, filter out scores below the threshold, limit the result count, order by score, and project the final shape.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `get` resource that accepts the result count.
2. Add an HTTP client connection for the Firebase datastore. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, call the connection to retrieve the `EmployeePerformance[]` records.
4. Add a query that chains the processing steps: a `let` clause to compute the weighted performance score, a `where` clause to keep scores above `7.5`, `limit` and `order by` clauses, and a `select` clause that builds the `TopPerformer` result.
5. Return the query result from the resource.

The flow retrieves the raw records and passes them through a query whose clauses act as successive filters: score, threshold, limit, order, and projection:

<PatternImage src="/img/eip-patterns/pipes_and_filters_flow.png" alt="Pipes and Filters flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type EmployeePerformance record {|
    string empId;
    int productivity;
    int customerSatisfaction;
    int goalAchievement;
|};

type TopPerformer record {|
    string empId;
    float performance;
|};

final http:Client firebaseClient = check new ("http://api.employee.performance.firebase.com.balmock.io");
// docs-fold-end

listener http:Listener httpDefaultListener = http:getDefaultListener();

service /api/v1 on httpDefaultListener {
    isolated resource function get employee/top\-performers(int count) returns TopPerformer[]|error {
        EmployeePerformance[] employeePerformance = check firebaseClient->/performance\.json.get();
        return from var {empId, productivity, customerSatisfaction, goalAchievement} in employeePerformance
            let float performance = productivity * 0.3 + customerSatisfaction * 0.1 + goalAchievement * 0.6
            where performance > 7.5
            limit count
            order by performance descending
            select {empId, performance};
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [pipes and filters sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/pipes_and_filters) on GitHub.
