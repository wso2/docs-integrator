---
sidebar_position: 6
title: "Sync SAP SuccessFactors Employee Leave to Google Calendar"
sidebar_label: "Sync SAP SuccessFactors Leave to Google Calendar"
description: Build a scheduled automation that reads approved leave starting today or tomorrow from SAP SuccessFactors Employee Central and creates a matching out-of-office event on Google Calendar, designed visually with the Ectimeoff and Google Calendar connectors.
keywords: [wso2 integrator, automation, sap successfactors, employee central, ectimeoff, google calendar, hr, leave, time off, out of office, use case, low-code]
slug: /guides/business-use-cases/sf-ec-leave-to-google-calendar-sync
card_icon: automation
card_summary: A scheduled, no-code automation that mirrors approved SuccessFactors leave as out-of-office events on Google Calendar
card_keywords: [hr, successfactors, google calendar, leave, scheduled task]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sync SAP SuccessFactors Employee Leave to Google Calendar

**Time:** About 30 minutes | **What you'll build:** A scheduled automation that reads approved leave starting today or tomorrow from SAP SuccessFactors Employee Central and creates a matching out-of-office event on Google Calendar, with no code to write.

HR systems know who is on leave; calendars are what everyone actually looks at. When those two go out of sync, meetings get booked with people who aren't there. In this guide you build an automation that closes that gap: it asks SAP SuccessFactors Employee Central for approved leave starting today or tomorrow, and for each one, creates an "Out of office" event on Google Calendar with the SuccessFactors leave ID in the description, so anyone can trace it back.

## How it works

<ThemedImage
    alt="Architecture diagram: a scheduled WSO2 Integrator automation uses the SAP SuccessFactors EC Time Off connector to list employee times from SAP SuccessFactors, and the Google Calendar connector to create a matching event on Google Calendar"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/architecture.png'),
        dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/architecture.png'),
    }}
/>

The WSO2 Integrator Scheduler invokes the automation periodically, and each run follows the same short flow:

1. List `EmployeeTime` records from Employee Central, filtered to those approved and starting today or tomorrow: a one-day look-ahead, so tomorrow's absences are already on the calendar.
2. Unpack the OData response into a plain array.
3. For each approved leave, convert SuccessFactors' OData date format into the plain date Google Calendar expects.
4. Create an "Out of office" event on Google Calendar for that date range, tagged with the SuccessFactors leave ID.

## Before you begin

:::info Prerequisites

- A working WSO2 Integrator environment. See [Setup](../../get-started/setup/setup.md).
- Access to an SAP SuccessFactors Employee Central tenant, and credentials for the Time Off API:
    - Follow the [SAP SuccessFactors Employee Central Time Off connector setup guide](../../connectors/catalog/hrms/sap.successfactors.ectimeoff/setup-guide.md) to register an OAuth 2.0 SAML Bearer client (recommended) or set up a username and password.
    - It gives you the `apiKey`, `companyId`, `userName`, and `tokenUrl` values used in Step 2, the `private_key.pem` and `certificate.pem` files (supplied to the connector as file paths), and your API server hostname (for example `api12.successfactors.eu`).
- A Google account with a Google Calendar, and OAuth 2.0 credentials for it:
    - Follow the [Google Calendar connector setup guide](../../connectors/catalog/productivity-collaboration/googleapis.calendar/setup-guide.md) to create a Google Cloud project, enable the Calendar API, and create an OAuth client.
    - It gives you the `clientId`, `clientSecret`, and `refreshToken` values used in Step 3. The `refreshUrl` is Google's token endpoint, `https://oauth2.googleapis.com/token`.

:::

## Build the automation

Build the flow in the **Visual Designer**, or switch to the **Ballerina Code** tab to see the equivalent source the designer generates for you.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

## Step 1: Create the automation

An [automation](../../develop-and-test/integration-artifacts/automation.md#creating-an-automation) runs on a schedule with no inbound request, which makes it the right artifact for a recurring leave check.

1. Create a new integration named `LeaveMarker` in a project named `LeaveMarker`.
2. Add an **Automation** artifact to the integration.

<ThemedImage
    alt="Create dialog with the project name and integration name both set to LeaveMarker, and Create an integration selected as the starting point"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/01-create-integration.png'),
        dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/01-create-integration.png'),
    }}
/>

<ThemedImage
    alt="Artifacts page with the Automation card selected under the Automation section"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/02-add-automation-artifact.png'),
        dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/02-add-automation-artifact.png'),
    }}
/>

## Step 2: Connect to SAP SuccessFactors Employee Central

1. Add a [connection](../../develop-and-test/integration-artifacts/supportive-artifacts/connections.md#adding-a-connection): **Add Connection → Search Connectors**, then search for `timeoff` and select the **Ectimeoff** connector.

    <ThemedImage
        alt="Add Connection dialog searching for timeoff, with the Ectimeoff connector card shown under Pre-built Connectors"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/03-search-ectimeoff-connector.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/03-search-ectimeoff-connector.png'),
        }}
    />

2. For every field in the connection config, select **Configurables** in the [Expression editor](../../editor/panels/expression-panel.md)'s helper pane, then **New Configurable**, so credentials are supplied at runtime instead of stored in the flow. Create one for each of `apiKey`, `companyId`, `userName`, `privateKey`, `certificate`, and `tokenUrl` (all `string`).

    :::note
    `privateKey` and `certificate` take the **file paths** of the `private_key.pem` and `certificate.pem` files from the setup guide, not the PEM contents.
    :::

    <ThemedImage
        alt="New Configurable dialog creating a string variable named apiKey"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/04-new-configurable-apikey.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/04-new-configurable-apikey.png'),
        }}
    />

3. Bind each field to its matching configurable, and set **Hostname** to your SuccessFactors API server (for example `api12.successfactors.eu`), also bound to a configurable named `hostName`.

    <ThemedImage
        alt="Edit Connection record builder for ecClient with apiKey, companyId, username, privateKey, certificate, and tokenUrl all bound to configurables"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/16-ectimeoff-connection-config.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/16-ectimeoff-connection-config.png'),
        }}
    />

4. Name the connection `ecClient`.

## Step 3: Connect to Google Calendar

1. Add another connection: search for `google calendar` and select the **Google Calendar** connector.

    <ThemedImage
        alt="Add Connection dialog searching for google calendar, with the Google Calendar connector card shown under Pre-built Connectors"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/05-search-google-calendar-connector.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/05-search-google-calendar-connector.png'),
        }}
    />

2. As before, bind **refreshUrl**, **refreshToken**, **clientId**, and **clientSecret** to configurables of the same names.

    <ThemedImage
        alt="Edit Connection dialog for calendarClient with auth.refreshUrl, refreshToken, clientId, and clientSecret each bound to a configurable"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/15-calendar-connection-config.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/15-calendar-connection-config.png'),
        }}
    />

3. Name the connection `calendarClient`.

Both connections now appear under **Connections**, and **Configurable Variables** lists all 11 values you'll need to supply before running the integration.

<ThemedImage
    alt="Configurable Variables page listing apiKey, companyId, userName, privateKey, certificate, tokenUrl, hostName, clientId, refreshUrl, refreshToken, and clientSecret, all required"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/06-configurable-variables-list.png'),
        dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/06-configurable-variables-list.png'),
    }}
/>

## Step 4: List approved leave for today and tomorrow

1. After the **Start** node, add the `ecClient` connection's **List Employee Times** operation, and set **Result** to `jsonResult`.

    <ThemedImage
        alt="Node panel searching List, with List Employee Times highlighted among the Ectimeoff connector's operations"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/07-add-list-employee-times.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/07-add-list-employee-times.png'),
        }}
    />

2. The filter needs a rolling two-day date window (today and tomorrow) as `YYYY-MM-DD` strings, so first build a small formatting helper. Under **Functions**, add a function `formatDate`, public, taking a `time:Civil` parameter named `value` and returning `string`, with the **Return** expression:

    ```ballerina
    string `${value.year}-${value.month < 10 ? "0" + value.month.toString() : value.month.toString()}-${value.day < 10 ? "0" + value.day.toString() : value.day.toString()}`
    ```

    <ThemedImage
        alt="Function formatDate with a Return expression that pads the month and day of a time:Civil value to two digits"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/10-formatdate-function.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/10-formatdate-function.png'),
        }}
    />

3. Add a second function, `today`, public, with no parameters and a `string` return type.

    <ThemedImage
        alt="New Function dialog creating a public function named today with a string return type"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/08-new-function-today.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/08-new-function-today.png'),
        }}
    />

4. Set its **Return** expression to `formatDate(time:utcToCivil(time:utcNow()))`. The expression editor's **Functions** search finds the `time` module's helpers (`utcNow()`, `utcToCivil()`, `utcAddSeconds()`) if you'd rather pick them than type them.

    <ThemedImage
        alt="Return node's expression editor with the Functions helper panel open, searching utc and listing utcToCivil, utcDiffSeconds, utcFromCivil"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/09-today-function-utc-helpers.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/09-today-function-utc-helpers.png'),
        }}
    />

    <ThemedImage
        alt="Function today with its Return expression set to formatDate(time:utcToCivil(time:utcNow()))"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/11-today-function-final.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/11-today-function-final.png'),
        }}
    />

5. Add a matching `tommorrow` function that adds a day first: `formatDate(time:utcToCivil(time:utcAddSeconds(time:utcNow(), 86400)))`.

    <ThemedImage
        alt="Function tommorrow with a Return expression that adds 86400 seconds before formatting"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/12-tomorrow-function.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/12-tomorrow-function.png'),
        }}
    />

6. Back on **List Employee Times**, set **Filter** to:

    ```ballerina
    string `approvalStatus eq 'APPROVED' and startDate ge datetime'${today()}T00:00:00' and startDate le datetime'${tommorrow()}T23:59:59'`
    ```

    set **Orderby** to `startDate`, and set **Select** to `startDate`, `userId`, `endDate`, `externalCode`, `approvalStatus`, and `timeType` so the response only carries the fields the flow uses.

    <ThemedImage
        alt="List Employee Times Filter parameter set to an expression combining approvalStatus, today(), and tommorrow()"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/13-list-employee-times-filter.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/13-list-employee-times-filter.png'),
        }}
    />

Your flow should now match the checkpoint below.

<ThemedImage
    alt="Flow with Start, the ectimeoff listEmployeeTimes operation storing jsonResult, and an Error Handler"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/14-checkpoint-basic-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/14-checkpoint-basic-flow.png'),
    }}
/>

## Step 5: Unpack the results

The OData response wraps the actual records under `jsonResult.d.results` as loosely-typed `json`, so pull that out into a typed array you can iterate.

1. Add a [**Declare Variable**](../../editor/canvases/flow-canvas/node-palette.md#declare-variable) node after **List Employee Times**.

    <ThemedImage
        alt="Node panel open directly after the listEmployeeTimes node, offering Declare Variable, Update Variable, Call Function, Map Data, and control nodes"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/17-add-node-after-list.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/17-add-node-after-list.png'),
        }}
    />

2. Name it `leaves`, type `json[]`, with the expression `check jsonResult.d.results.ensureType()`. Search **ensure** in the expression editor's Functions panel to find `ensureType()` if you're typing this by hand.

    <ThemedImage
        alt="Declare Variable panel creating leaves with type json[] and expression check jsonResult.d.results.ensureType(), with the Functions helper panel searching ensure"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/18-declare-leaves-variable.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/18-declare-leaves-variable.png'),
        }}
    />

3. Add a [**Foreach**](../../editor/canvases/flow-canvas/node-palette.md#foreach) node after it, looping over `leaves` with the item variable `leave` (type `json`).

    <ThemedImage
        alt="Node panel with Foreach highlighted, positioned after the Declare Variable node that creates leaves"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/19-add-foreach-loop.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/19-add-foreach-loop.png'),
        }}
    />

## Step 6: Convert SuccessFactors' OData dates

SuccessFactors returns dates as OData's `/Date(1790208000000)/` epoch-millisecond strings, but Google Calendar expects a plain `YYYY-MM-DD` date. Write one more function to bridge the two.

1. Add a function `odataDateToIsoDate`, taking a `string` parameter `odataDate` and returning `string|error`. Give it a short description, such as *Converts a SuccessFactors OData date string, e.g. `/Date(1790208000000)/`, into a plain `YYYY-MM-DD` date the Google Calendar API accepts*. It appears as a tooltip wherever the function is used, and as the `#` doc comment in the code tab.
2. Inside it, add a **Declare Variable** named `span`, type `regexp:Span`, with the expression:

    ```ballerina
    check (re `\d+`.find(odataDate) ?: error(string `Invalid OData date: ${odataDate}`))
    ```

    This finds the first run of digits in the string (the epoch milliseconds) and fails clearly if the input doesn't look like an OData date at all.

    <ThemedImage
        alt="Function odataDateToIsoDate with a Declare Variable creating span using a regexp find, followed by an int:fromString call and a Return node"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/20-build-odata-date-function.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/20-build-odata-date-function.png'),
        }}
    />

3. Add a **Call Function** node for `lang.int:fromString`, with **S** set to `span.substring()` and **Result** named `epochMillis` (type `int`).

    <ThemedImage
        alt="lang.int:fromString step with S set to span.substring() and Result named epochMillis"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/21-int-fromstring-step.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/21-int-fromstring-step.png'),
        }}
    />

4. Add a **Return** node with the expression:

    ```ballerina
    formatDate(time:utcToCivil([epochMillis / 1000, <decimal>(epochMillis % 1000) / 1000.0d]))
    ```

    `time:Utc` is a `[seconds, fractionOfSecond]` tuple, so this splits the epoch milliseconds into whole seconds and a fractional remainder before reusing the same `formatDate` helper from Step 4.

    <ThemedImage
        alt="Expression editor with formatDate wrapping a time:utcToCivil call that splits epochMillis into seconds and a decimal fraction"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/22-format-date-return-expression.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/22-format-date-return-expression.png'),
        }}
    />

## Step 7: Create the Google Calendar event and log the result

1. Inside the **Foreach** loop, add **Declare Variable** nodes for `userId` (`check leave.userId.ensureType()`) and `externalCode` (`check leave.externalCode.ensureType()`), the SuccessFactors leave ID you'll use to trace the event back later.
2. Add two **Call Function** nodes for `odataDateToIsoDate`, one with **Odata Date** `check leave.startDate.ensureType()` producing `startDate`, and one with `check leave.endDate.ensureType()` producing `endDate`. Hovering the function shows the description you gave it in Step 6.

    <ThemedImage
        alt="Foreach body with Declare Variable nodes for userId and externalCode, followed by two odataDateToIsoDate calls, with a tooltip showing the function's own documentation"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/23-foreach-body-date-conversion.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/23-foreach-body-date-conversion.png'),
        }}
    />

3. Add the `calendarClient` connection's **Create Event** operation.

    <ThemedImage
        alt="Node panel with the calendarClient connection expanded and Create Event selected, tooltip reading Creates an event"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/24-select-create-event-operation.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/24-select-create-event-operation.png'),
        }}
    />

4. Configure it with **Calendar ID** `primary`, **Result** `createdEvent`, and the following fields on the **Event** record:

    | Field | Value |
    | --- | --- |
    | summary | `` string `[Out of office] ${userId.toString()}` `` |
    | description | `` string `SuccessFactors leave ID: ${externalCode}` `` |
    | start | `{date: startDate}` |
    | end | `{date: endDate}` |

    <ThemedImage
        alt="Create Event record configuration with summary, description, start, and end fields set on the InputEvent record"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/25-configure-create-event-payload.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/25-configure-create-event-payload.png'),
        }}
    />

5. Add a **Log Info** node with **Msg** `"Created Google Calendar leave event"`, and under **Additional Values**, add `eventId: createdEvent.id` and `leaveId: externalCode` so each log line is traceable to both systems.

    <ThemedImage
        alt="Log Info node with Msg set to Created Google Calendar leave event and Additional Values eventId and leaveId set"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/26-log-info-additional-values.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/26-log-info-additional-values.png'),
        }}
    />

## Step 8: Log a summary

After the **Foreach** node, add a final **Log Info** node with the message `"Leave synchronization complete"`.

Your flow is now complete: it lists approved leave for today and tomorrow, unpacks the results, converts each date, creates a calendar event per leave, and reports completion.

<ThemedImage
    alt="Complete automation flow: Start, List Employee Times, Declare leaves, Foreach with date conversion, Create Event, Log Info, then a final Log Info and Error Handler"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/27-checkpoint-complete-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/27-checkpoint-complete-flow.png'),
    }}
/>

</TabItem>
<TabItem value="code" label="Ballerina Code">

You design this on the canvas and never write any of it. The Visual Designer keeps the source in sync across `config.bal`, `connections.bal`, `functions.bal`, and `automation.bal`.

```ballerina
// config.bal
configurable string apiKey = ?;
configurable string companyId = ?;
configurable string userName = ?;
configurable string privateKey = ?;
configurable string certificate = ?;
configurable string tokenUrl = ?;
configurable string hostName = ?;
configurable string clientId = ?;
configurable string refreshUrl = ?;
configurable string refreshToken = ?;
configurable string clientSecret = ?;
```

```ballerina
// connections.bal
import ballerinax/googleapis.calendar;
import ballerinax/sap.successfactors.ectimeoff;

final ectimeoff:Client ecClient = check new ({
    auth: {
        apiKey: apiKey,
        companyId: companyId,
        username: userName,
        privateKey: privateKey,
        certificate: certificate,
        tokenUrl: tokenUrl
    }
}, string `${hostName}`);

final calendar:Client calendarClient = check new ({
    auth: {
        refreshUrl: refreshUrl,
        refreshToken: refreshToken,
        clientId: clientId,
        clientSecret: clientSecret
    }
});
```

```ballerina
// functions.bal
import ballerina/lang.regexp;
import ballerina/time;

public function today() returns string {
    return formatDate(time:utcToCivil(time:utcNow()));
}

public function tommorrow() returns string {
    return formatDate(time:utcToCivil(time:utcAddSeconds(time:utcNow(), 86400)));
}

public function formatDate(time:Civil value) returns string {
    return string `${value.year}-${value.month < 10 ? "0" + value.month.toString() : value.month.toString()}-${value.day < 10 ? "0" + value.day.toString() : value.day.toString()}`;
}

# Converts a SuccessFactors OData date string, e.g. `/Date(1790208000000)/` or
# `/Date(1608132315000+0000)/`, into a plain `YYYY-MM-DD` date the Google Calendar API accepts.
public function odataDateToIsoDate(string odataDate) returns string|error {
    regexp:Span span = check (re `\d+`.find(odataDate) ?: error(string `Invalid OData date: ${odataDate}`));
    int epochMillis = check int:fromString(span.substring());
    return formatDate(time:utcToCivil([epochMillis / 1000, <decimal>(epochMillis % 1000) / 1000.0d]));
}
```

```ballerina
// automation.bal
import ballerina/log;
import ballerinax/googleapis.calendar;

public function main() returns error? {
    do {
        json jsonResult = check ecClient->listEmployeeTimes(
            \$filter = string `approvalStatus eq 'APPROVED' and startDate ge datetime'${today()}T00:00:00' and startDate le datetime'${tommorrow()}T23:59:59'`,
            \$orderby = ["startDate"],
            \$select = ["startDate", "userId", "endDate", "externalCode", "approvalStatus", "timeType"]
        );
        json[] leaves = check jsonResult.d.results.ensureType();
        foreach json leave in leaves {
            string userId = check leave.userId.ensureType();
            string externalCode = check leave.externalCode.ensureType();
            string startDate = check odataDateToIsoDate(check leave.startDate.ensureType());
            string endDate = check odataDateToIsoDate(check leave.endDate.ensureType());
            calendar:Event createdEvent = check calendarClient->createEvent("primary", {
                summary: string `[Out of office] ${userId.toString()}`,
                description: string `SuccessFactors leave ID: ${externalCode}`,
                'start: {date: startDate},
                end: {date: endDate}
            });
            log:printInfo("Created Google Calendar leave event", eventId = createdEvent.id, leaveId = externalCode);
        }
        log:printInfo("Leave synchronization complete");
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

</TabItem>
</Tabs>

## Run and verify

1. Go to **Configurations** and supply your SAP SuccessFactors and Google Calendar credentials, then select **Run** on the integration overview.
2. Watch the terminal. Each approved leave in the window gets a calendar event, and a final line reports completion.

    <ThemedImage
        alt="Terminal output showing Created Google Calendar leave event with an eventId and leaveId, followed by Leave synchronization complete"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/28-run-terminal-output.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/28-run-terminal-output.png'),
        }}
    />

3. Confirm the event landed in Google Calendar: open the day of the leave and look for the new "Out of office" event. Its description carries the SuccessFactors leave ID, so you can always trace it back to the record that created it.

    <ThemedImage
        alt="Google Calendar day view showing an Out of office event for sfadmin with the description SuccessFactors leave ID WSO2-CALENDAR-TEST-48DE2013"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/29-google-calendar-event-verification.png'),
            dark: useBaseUrl('/img/guides/usecases/sf-ec-leave-to-google-calendar-sync/29-google-calendar-event-verification.png'),
        }}
    />

## What's next

Now that the automation works, you can take it further:

- **Deploy and schedule it.** Ship it to [WSO2 Cloud](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md), a [Docker container](../../deploy-and-run/self-hosted/containerized-deployment.md#docker-deployment), [Kubernetes](../../deploy-and-run/self-hosted/containerized-deployment.md#kubernetes-deployment), or a [virtual machine](../../deploy-and-run/self-hosted/vm-deployment.md), then schedule it to run once a day.
- **Avoid duplicate events.** The filter's one-day look-ahead means a leave starting tomorrow is seen by today's run *and* tomorrow's, so a daily schedule creates each event twice as built. Either narrow the window to a single day (`startDate lt datetime'${tommorrow()}T00:00:00'`), or before creating an event call **Get Events** for that date and skip it if one already carries the same SuccessFactors leave ID in its description.
- **Sync updates and cancellations too.** SuccessFactors' `EmployeeTime` records can be modified or withdrawn after approval; extend the automation to look up the calendar event by the stored `eventId` and update or delete it when the underlying leave record changes.
