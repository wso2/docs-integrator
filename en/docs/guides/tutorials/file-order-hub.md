---
title: Build a Supplier Order Ingestion Hub with File Integration
sidebar_label: Build a Supplier Order Ingestion Hub
sidebar_position: 2
description: "Build a B2B file-integration hub with WSO2 Integrator: an FTP service that picks up supplier order files in two different formats (CSV and XML), normalizes both into one canonical model with the data mapper, stores them in MySQL, archives the files, and emails a daily summary from a scheduled automation. Designed end to end in the Visual Designer."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build a Supplier Order Ingestion Hub with File Integration

<!--
TUTORIAL STRUCTURE / SKELETON
=============================
Filled section by section as the integration is built and screenshots are captured.

Conventions used while drafting:
- "📸 Screenshot:" blockquotes mark where a captured image goes. Replace with
  ![alt](/img/guides/tutorials/order-hub/<name>.png) once the screenshot exists.
- Ballerina Code tabs hold the exact generated source (verified from the built project).
- Each step closes with a "> Capability:" callout, mirroring social-media.md.

Status legend:  ☐ not started   ◐ drafting   ☑ verified against built project
-->

## Overview

<!-- ☐ Intro prose. Mirror social-media.md: 2 short paragraphs + a "What you will build" admonition. -->

In this tutorial you build a complete B2B **file ingestion hub** with [WSO2 Integrator](../../get-started/introduction.md), the low-code integration platform built on Ballerina. Suppliers drop order files onto a file server in different formats; your integration turns that mix into one clean, queryable order book, then reports on it daily. You design everything visually, and WSO2 Integrator generates clean Ballerina underneath. Most steps show both: the visual flow on one tab and the generated code on the other.

By the end, a CSV file from one supplier and an XML file from another will flow through the same pipeline into a single canonical shape in MySQL, and a scheduled job will email the day's orders as a report.

:::info What you will build
An ingestion hub for **FreshMart**, a retailer whose suppliers send purchase orders as files in incompatible formats: **Greenfield Foods** uploads **CSV**, **Harbor Supplies** uploads **XML**. Each order file is paired with a small `.ok` marker written once its upload finishes. Your integration polls the file server, waits until each order file is complete, **normalizes both formats into one canonical `Order` with the data mapper**, stores the orders in MySQL, and archives each file (to `/processed` on success, `/errors` on failure). A scheduled automation then reads the day's orders and emails a summary to the procurement team. You build it as two integrations in one project, entirely on the canvas.
:::

## Architecture

<!-- ☑ Reflects the built project: project `order-hub-freshmart`, integrations `order-intake` + `daily-summary`. -->

You build the work as two focused integrations inside one project, plus a shared canonical model they both rely on.

| Integration | Type | Responsibility |
| --- | --- | --- |
| **Order Intake** (`order-intake`) | FTP file integration | One listener, two services. The **Greenfield** service consumes CSV from `/greenfield`; the **Harbor** service consumes XML from `/harbor`. Each maps its format to the canonical `Order` with the data mapper, persists to MySQL, and archives the file. |
| **Daily Summary** (`daily-summary`) | Automation | A scheduled job that reads the day's orders from MySQL, writes a CSV report, and emails it to procurement. |

![Architecture diagram: an FTP server holds a /greenfield directory of CSV files and a /harbor directory of XML files; the Order Intake integration polls both through one shared listener, gates on a .ok marker, maps each format to a canonical Order with the data mapper, persists to MySQL, and moves each file to /processed or /errors; the Daily Summary automation reads the day's orders from MySQL and emails a report to procurement](/img/guides/tutorials/order-hub/architecture.svg)

The two intake services share **one listener** because both directories live on the same file server: the connection is defined once, and each service points at its own directory with its own handler. This is the [one listener ↔ many services](../../develop/integration-artifacts/file/ftp-sftp.md#one-listener--many-services) topology. The summary is a separate [automation](../../develop/integration-artifacts/automation.md) rather than part of intake because it runs on a clock, not on a file event, keeping reporting out of the ingestion path.

The **data mapper is the heart of the hub**: it is what lets two unrelated file shapes converge on a single `Order`. So you define the canonical model and database first (Step 1), stand up the file intake (Step 2), build the two mappers (Steps 3 and 4), add the scheduled report (Step 5), and run the whole thing (Step 6).

:::note Plain FTP is used for clarity
This walkthrough uses plain **FTP** so the visual steps stay simple and reproducible. For real partner exchange, switch the listener to **SFTP** or **FTPS**: the same services and handlers, just a different protocol and credentials on the listener. See [Creating an SFTP service](../../develop/integration-artifacts/file/ftp-sftp.md#creating-an-sftp-service).
:::

:::info Prerequisites
Before you start, make sure you have:

- [WSO2 Integrator installed](../../get-started/setup/local-setup.md).
- A running **FTP server** with the directories `/greenfield`, `/harbor`, `/processed`, and `/errors`, plus a username and password. A Docker setup is below.
- A running **MySQL** instance. A setup script for the `order_hub` database and its `orders` and `order_lines` tables is below.
- An **SMTP server** to receive the summary email. A local mock such as [Mailpit](https://github.com/axllent/mailpit) works well for testing (SMTP on `1025`, web inbox on `8025`). A Docker setup is below.
:::

<details>
<summary>Set up the MySQL database</summary>

Run this script against your MySQL instance. It creates the database, the application user the integration connects as, and the two tables: `orders` and its child `order_lines`, linked by a foreign key so an order's lines are deleted with it.

```sql
CREATE DATABASE IF NOT EXISTS order_hub;

-- Application user the integration connects as
CREATE USER IF NOT EXISTS 'order_hub_user'@'%' IDENTIFIED BY 'order_hub_pass';
GRANT ALL PRIVILEGES ON order_hub.* TO 'order_hub_user'@'%';
FLUSH PRIVILEGES;

USE order_hub;

-- One row per order, keyed by the supplier's business id + supplier code
CREATE TABLE orders (
    id            INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id      VARCHAR(64)   NOT NULL,
    supplier_code VARCHAR(32)   NOT NULL,
    order_date    DATE          NOT NULL,
    order_total   DECIMAL(12,2) NOT NULL,
    currency      VARCHAR(8)    NOT NULL,
    UNIQUE (order_id, supplier_code)
);

-- The line items of an order; order_id is the integer FK into orders.id
CREATE TABLE order_lines (
    id          INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sku         VARCHAR(64)   NOT NULL,
    description VARCHAR(255),
    quantity    INT           NOT NULL,
    unit_price  DECIMAL(12,2) NOT NULL,
    line_total  DECIMAL(12,2) NOT NULL,
    order_id    INT           NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

You now have an `order_hub` database reachable with these credentials, which you give to the `dbClient` connection in [Step 1](#step-1-set-up-the-project-and-the-canonical-model):

| Setting | Value |
| --- | --- |
| Host | `localhost` |
| Port | `3306` |
| Database | `order_hub` |
| User | `order_hub_user` |
| Password | `order_hub_pass` |

</details>

<details>
<summary>Run an FTP server in Docker</summary>

This walkthrough uses the [`fauria/vsftpd`](https://hub.docker.com/r/fauria/vsftpd) image. Start it with the credentials and passive ports the integration expects:

```bash
docker run -d --name file-order-hub-ftp \
  -p 21:21 -p 21100-21110:21100-21110 \
  -e FTP_USER=ftpuser -e FTP_PASS=ftppass \
  -e PASV_ADDRESS=127.0.0.1 -e PASV_MIN_PORT=21100 -e PASV_MAX_PORT=21110 \
  fauria/vsftpd
```

Then create the four directories the services watch and archive to:

```bash
docker exec file-order-hub-ftp sh -c 'mkdir -p \
  /home/vsftpd/ftpuser/greenfield /home/vsftpd/ftpuser/harbor \
  /home/vsftpd/ftpuser/processed /home/vsftpd/ftpuser/errors \
  && chmod -R 777 /home/vsftpd/ftpuser'
```

You now have an FTP server on `127.0.0.1:21`, user `ftpuser` / `ftppass`, with the home `/home/vsftpd/ftpuser`. These are the values you put in the `order-intake` `Config.toml` (`ftpHost`, `ftpPort`, `ftpUsername`, `ftpPassword`).

</details>

<details>
<summary>Run a mock SMTP server in Docker</summary>

[Mailpit](https://github.com/axllent/mailpit) captures outgoing mail and shows it in a web inbox, with no TLS or authentication, which is exactly what the daily summary needs for testing:

```bash
docker run -d --name order-hub-mail -p 1025:1025 -p 8025:8025 axllent/mailpit
```

It listens for SMTP on `localhost:1025` and serves the inbox at [http://localhost:8025](http://localhost:8025). These match the `daily-summary` `Config.toml` (`smtpHost`, `smtpPort`), with the connection's `security` set to `START_TLS_NEVER` and no credentials.

</details>

---

## Step 1: Set up the project and the canonical model

Everything you build lives in one project that holds both integrations, so you set that up first, together with the two things every later step leans on: the **canonical `Order` model** the suppliers' formats normalize into, and the **MySQL database** that stores each order. The data mapper in [Step 3](#step-3-map-the-greenfield-csv-to-the-canonical-order) and [Step 4](#step-4-map-the-harbor-xml-to-the-same-canonical-order) maps both CSV and XML onto this one model, so defining it now is what lets the rest of the hub converge.

You created the `order_hub` database and its tables in the Prerequisites; here you define the canonical model and point a connection at that database.

:::note `order_id` means two different things
In `orders`, `order_id` is the supplier's **business identifier** (a string such as `GF-10231`). In `order_lines`, `order_id` is the **integer foreign key** into `orders.id`. The persist client surfaces this difference for you (the line's foreign key takes the generated integer key, not the business id), but it is worth keeping straight as you read the inserts in [Step 3](#step-3-map-the-greenfield-csv-to-the-canonical-order).
:::

### Create the project and the canonical model

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Launch **WSO2 Integrator** and [create a new integration](../../develop/create-integrations/create-a-new-integration.md#configure-the-integration). Name it `order-intake`. Enable **Create within a project**, name the [project](../../develop/create-integrations/create-a-project.md) `order-hub-freshmart`, and choose where it lives on disk. This is the one project that will hold both the intake and the summary integrations from the [architecture](#architecture). Click **Create Integration**.

   ![The Create Integration form, with the integration named order-intake, the project named order-hub-freshmart, and Create within a project enabled](/img/guides/tutorials/order-hub/create-integration.png)

2. Define the canonical model. In the artifacts panel, open **Types** and add two [record types](../../develop/integration-artifacts/supporting/types.md): an `OrderLine` (`sku`, `description`, `quantity`, `unitPrice`, `lineTotal`) and an `Order` that holds the order header plus a `lines` field of type `OrderLine[]`. When adding each one, expand **Advanced configs** and tick **Accessible by other integrations**: the [Daily Summary](#step-5-build-the-daily-summary-automation) integration reuses this module, and both intake services map onto the same `Order`.

   ![The Type Diagram showing the Order record holding an OrderLine[] array, linked to the OrderLine record with sku, description, quantity, unitPrice, and lineTotal fields](/img/guides/tutorials/order-hub/canonical-types.png)

3. Add the database connection. In the artifacts panel, open **Connections**, click **+**, and choose [**Connect to a Database**](../../develop/tools/integration-tools/persist-tool.md#step-1-add-a-connection). Select **MySQL** and enter the `order_hub` credentials from the Prerequisites, then click **Connect & Introspect Database**.

   ![The Connect to a Database wizard on the Introspect Database step, with MySQL selected and the order_hub credentials entered](/img/guides/tutorials/order-hub/db-connect-introspect.png)

   On **Select Tables**, keep both `orders` and `order_lines` selected and click **Continue to Connection Details**.

   ![The Select Tables step of the wizard with both orders and order_lines tables selected](/img/guides/tutorials/order-hub/db-select-tables.png)

   Name the connection `dbClient` and click **Save Connection**. The [persist feature](../../develop/tools/integration-tools/persist-tool.md) generates a type-safe client with [CRUD functions](../../develop/tools/integration-tools/persist-tool.md#use-connection-functions-in-integration-logic) and the matching entities, and declares the connection's configurables (`dbClientHost`, `dbClientPort`, `dbClientDatabase`, and the rest) with the values you entered as defaults.

   ![The Create Connection step naming the connection dbClient, with the generated dbClientHost, dbClientPort, and dbClientDatabase configurables](/img/guides/tutorials/order-hub/db-connection.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

The two record types are the canonical model both supplier formats map onto. The Visual Designer wrote them to `types.bal`:

```ballerina
public type OrderLine record {|
    string sku;
    string description;
    int quantity;
    decimal unitPrice;
    decimal lineTotal;
|};

public type Order record {|
    string orderId;
    string supplierCode;
    string orderDate;
    OrderLine[] lines;
    decimal orderTotal;
    string currency;
|};
```

The database wizard generated the persist client and declared its connection settings in `config.bal`; you supply the password in `Config.toml`:

```ballerina
configurable string dbClientHost = "localhost";
configurable int dbClientPort = 3306;
configurable string dbClientUser = "order_hub_user";
configurable string dbClientPassword = ?;
configurable string dbClientDatabase = "order_hub";
```

```toml
# Config.toml
dbClientPassword = "order_hub_pass"
```

</TabItem>
</Tabs>

> **Capability: a single canonical model.** You define the target shape and the database once. Every supplier format you onboard maps onto the same `Order` and lands in the same two tables, the contract the rest of the hub is built around.

---

## Step 2: Stand up the FTP intake (one listener, two services)

<!-- ☐ Build: configs ftpHost/ftpPort/ftpUsername/ftpPassword; FTP listener `ftpListener`;
     Greenfield service /greenfield; Harbor service /harbor via "Use existing";
     trigger conditions on each (fileNamePattern, fileAgeFilter, fileDependencyConditions). -->

Both suppliers drop their files on the same file server, so you stand up **one FTP listener** and hang **two services** off it, one watching `/greenfield`, one watching `/harbor`. Each service is gated so it only picks up a file once it matches a name pattern, has settled on disk, and its `.ok` companion has landed. This is the [one listener ↔ many services](../../develop/integration-artifacts/file/ftp-sftp.md#one-listener--many-services) topology: the connection is defined once and shared.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Declare the FTP configurations.** In the artifacts panel, open **Configurations** and [add](../../develop/integration-artifacts/supporting/configurations.md#adding-a-configuration) `ftpHost` (`string`), `ftpPort` (`int`), `ftpUsername` (`string`), and `ftpPassword` (`string`). Keeping the connection details out of the code lets you point at a different server per environment without touching the integration.

   ![The Configurable Variables view listing the dbClient configurables alongside the new ftpHost, ftpPort, ftpUsername, and ftpPassword configurables](/img/guides/tutorials/order-hub/ftp-configs.png)

2. **Add the FTP artifact.** From the integration's Design view, click **+ Add Artifact**.

   ![The order-intake Design view showing the dbClient connection, with the Add Artifact button highlighted](/img/guides/tutorials/order-hub/add-artifact.png)

   Under **File Integration**, choose **FTP / SFTP**.

   ![The artifact palette with FTP / SFTP highlighted under the File Integration group](/img/guides/tutorials/order-hub/ftp-sftp-artifact.png)

3. **Configure the Greenfield listener.** Select the **FTP** protocol and **Basic Authentication**, then bind **Host**, **Port Number**, **Username**, and **Password** to the configurables you just declared. Switch each field to **Expression** mode and reference `ftpHost`, `ftpPort`, `ftpUsername`, and `ftpPassword`. Set the **Monitoring Path** to `/greenfield` and click **Next**. This creates the listener (named `ftpListener`) and the first service together. See [Creating an FTP service](../../develop/integration-artifacts/file/ftp-sftp.md#creating-an-ftp-service) for the full field reference.

   ![The Create FTP Integration form: FTP protocol, Basic Authentication, Host/Port/Username/Password bound to configurables in Expression mode, and Monitoring Path set to /greenfield](/img/guides/tutorials/order-hub/ftp-create-greenfield.png)

   :::note Bind fields in Expression mode
   The **Host**, **Port**, **Username**, and **Password** fields must be in **Expression** mode to reference the configurables. In **Text** mode the platform treats your entry as a literal string. The **Monitoring Path** stays in **Text** mode, since it is a literal directory.
   :::

4. **Gate the Greenfield service.** Open the `/greenfield` service from the project tree and click **Configure** in the top right.

   ![The Greenfield FTP Integration service view with the Listener ftpListener chip, an empty File Handlers section, and the Configure button highlighted in the top right](/img/guides/tutorials/order-hub/greenfield-configure.png)

   The **Service Configuration** is a single record you edit as text. Enter the [trigger conditions](../../develop/integration-artifacts/file/dependency-and-trigger-conditions.md) so a file is only delivered when it is genuinely ready:

   - a [file name pattern](../../develop/integration-artifacts/file/dependency-and-trigger-conditions.md#file-name-pattern) `GF_.*\.csv`, so only Greenfield CSVs match;
   - a [file age filter](../../develop/integration-artifacts/file/dependency-and-trigger-conditions.md#file-age-filter) `minAge: 30.0`, so a file still being uploaded is left alone until it has settled for 30 seconds;
   - a [file dependency condition](../../develop/integration-artifacts/file/dependency-and-trigger-conditions.md#file-dependency-conditions) requiring the `.ok` marker: target pattern `GF_(.*)\.csv` with required file `GF_$1.ok`, so the [capture group](../../develop/integration-artifacts/file/dependency-and-trigger-conditions.md#how-capture-groups-work) ties each `GF_10231.csv` to its own `GF_10231.ok`.

   ```ballerina
   {
       path: "/greenfield",
       fileNamePattern: "GF_.*\\.csv",
       fileAgeFilter: {minAge: 30.0},
       fileDependencyConditions: [
           {targetPattern: "GF_(.*)\\.csv", requiredFiles: ["GF_$1.ok"]}
       ]
   }
   ```

   ![The Service Configuration record for the Greenfield service showing path /greenfield, fileNamePattern, fileAgeFilter, and the fileDependencyConditions gating on the .ok marker, with the ftpListener configuration below](/img/guides/tutorials/order-hub/service-config.png)

5. **Add the Harbor service on the same listener.** Add another **FTP / SFTP** artifact, but this time [reuse the existing listener](../../develop/integration-artifacts/file/ftp-sftp.md#reusing-an-existing-listener-when-creating-a-service): pick `ftpListener` from **Listener Name** (its protocol and credentials are inherited and locked), and set only the **Monitoring Path** to `/harbor`. Then gate it the same way, with the XML equivalents: pattern `HS_.*\.xml`, the same 30-second age filter, and dependency target `HS_(.*)\.xml` requiring `HS_$1.ok`.

   ![The Create FTP Integration form reusing the existing ftpListener: the protocol and credential fields are disabled, and only the Monitoring Path is set, to /harbor](/img/guides/tutorials/order-hub/ftp-create-harbor.png)

   ![The Harbor Service Configuration record showing path /harbor, fileNamePattern HS_.*\.xml, the 30-second fileAgeFilter, and the fileDependencyConditions requiring HS_$1.ok](/img/guides/tutorials/order-hub/harbor-service-config.png)

You now have two services sharing one listener, each watching its own directory and reading from the same `dbClient` connection.

![The Design view showing ftpListener with two ftp:Service nodes branching off it, plus the dbClient connection, and the project tree listing both FTP Integration entry points under the single ftpListener](/img/guides/tutorials/order-hub/shared-listener-tree.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

The Visual Designer declared the configurations in `config.bal`; you supply the password in `Config.toml`:

```ballerina
configurable string ftpHost = "127.0.0.1";
configurable int ftpPort = 21;
configurable string ftpUsername = "ftpuser";
configurable string ftpPassword = ?;
```

```toml
# Config.toml
ftpPassword = "ftppass"
```

In `main.bal`, one listener is shared by both services. Each `@ftp:ServiceConfig` carries the gating: a name pattern, the 30-second age filter, and the `.ok` dependency. The handler bodies are filled in [Step 3](#step-3-map-the-greenfield-csv-to-the-canonical-order) and [Step 4](#step-4-map-the-harbor-xml-to-the-same-canonical-order):

```ballerina
import ballerina/ftp;

listener ftp:Listener ftpListener = new (protocol = ftp:FTP, host = ftpHost, auth = {credentials: {username: ftpUsername, password: ftpPassword}}, port = ftpPort);

// Greenfield: only GF_*.csv files, settled for 30s, with a matching GF_*.ok marker present
@ftp:ServiceConfig {
    path: "/greenfield",
    fileNamePattern: "GF_.*\\.csv",
    fileAgeFilter: {minAge: 30.0},
    fileDependencyConditions: [
        {targetPattern: "GF_(.*)\\.csv", requiredFiles: ["GF_$1.ok"]}
    ]
}
service on ftpListener {
    // CSV → Order mapping and persistence, built in Step 3
}

// Harbor: the same listener, but XML files from /harbor gated on the HS_*.ok marker
@ftp:ServiceConfig {
    path: "/harbor",
    fileNamePattern: "HS_.*\\.xml",
    fileAgeFilter: {minAge: 30.0},
    fileDependencyConditions: [
        {targetPattern: "HS_(.*)\\.xml", requiredFiles: ["HS_$1.ok"]}
    ]
}
service on ftpListener {
    // XML → Order mapping and persistence, built in Step 4
}
```

</TabItem>
</Tabs>

> **Capability: dependency-gated polling, one connection, many feeds.** Two services share one FTP connection, and each fires only when its data file matches its pattern, has settled on disk, and its `.ok` companion has landed, so you never process a half-written upload.

---

## Step 3: Map the Greenfield CSV to the canonical `Order`

This is where the hub earns its keep. The Greenfield service receives a CSV file as typed rows, the [data mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md) folds those rows into one canonical `Order`, and the persist client writes the order and its lines to MySQL. Then the file is archived. You build all three on the `/greenfield` service you stood up in [Step 2](#step-2-stand-up-the-ftp-intake-one-listener-two-services).

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

#### Receive the CSV as typed rows

1. Open the `/greenfield` service and [add a file handler](../../develop/integration-artifacts/file/ftp-sftp.md#adding-a-file-handler): choose **On Create** and set **File Format** to **CSV**. Click **Define Row Schema → Create Type Schema** and define `GreenfieldRow` with the columns of the file: `order_id`, `order_date`, `sku`, `description` (`string`), `qty` (`int`), and `unit_price` (`decimal`).

   ![The Define Row Schema dialog creating the GreenfieldRow type with order_id, order_date, sku, description as string, qty as int, and unit_price as decimal](/img/guides/tutorials/order-hub/greenfield-row-schema.png)

   :::note Add the fields one at a time
   In **Define Row Schema**, add each field and let the row settle before starting the next. Typing quickly can drop the next field name into the previous row's type column.
   :::

2. The platform delivers the file as a `GreenfieldRow[]` named `greenfieldRows`. Under [**After File Processing**](../../develop/integration-artifacts/file/ftp-sftp.md#post-processing-moving-or-deleting-files), set **Success → Move to** `/processed` and **Error → Move to** `/errors`, then save. The handler is generated as `onFileCsv`.

   ![The On Create handler configuration: File Format CSV, Content Schema GreenfieldRow[] greenfieldRows, and After File Processing moving to /processed on success and /errors on error](/img/guides/tutorials/order-hub/greenfield-handler.png)

#### Build the data mapper

3. From **Data Mappers**, create `transformGreenFieldOrders` with input `GreenfieldRow[] greenFieldRows` and output `Order`.

   ![The Create New Data Mapper form: name transformGreenFieldOrders, input GreenfieldRow[] greenFieldRows, output Order](/img/guides/tutorials/order-hub/greenfield-mapper-create.png)

4. Because one file is one order, the order header comes from the **first row**. Click the `orderId` output field; since the input is an array but you want a single value, choose **Extract Single Element from Array**.

   ![The data mapper showing the mapping options for orderId, with Extract Single Element from Array selected](/img/guides/tutorials/order-hub/greenfield-mapper-orderid-menu.png)

5. Reference the first row: map `orderId` from `greenFieldRows[0].order_id`.

   ![The expression editor mapping orderId to greenFieldRows[0].order_id, with the first row's fields in the autocomplete](/img/guides/tutorials/order-hub/greenfield-mapper-orderid.png)

6. Map `orderDate` the same way, from `greenFieldRows[0].order_date`.

   ![The expression editor mapping orderDate to greenFieldRows[0].order_date](/img/guides/tutorials/order-hub/greenfield-mapper-orderdate.png)

7. `supplierCode` and `currency` are business constants, not data from the file. Type the string values directly into their output fields: `supplierCode` = `"GREENFIELD"` and `currency` = `"USD"`.

   ![The data mapper with supplierCode set to the constant GREENFIELD and currency set to the constant USD](/img/guides/tutorials/order-hub/greenfield-mapper-constants.png)

8. Map `lines` as an [array-to-array](../../develop/integration-artifacts/supporting/data-mapper/array-mappings/array-to-array.md) mapping: from the `greenFieldRows` input, choose **Map Each Element** so every CSV row becomes an `OrderLine`.

   ![The data mapper showing the Map Each Element option for mapping greenFieldRows onto the lines array](/img/guides/tutorials/order-hub/greenfield-mapper-lines-menu.png)

9. Inside the element mapping, map `sku`, `description`, `quantity` (from `qty`), and `unitPrice` (from `unit_price`). For `lineTotal`, use [**Convert and Map**](../../develop/integration-artifacts/supporting/data-mapper/mapping-capabilities.md#convert-and-map) on `qty`, since it must be cast from `int` to `decimal`.

   ![The per-element mapping from a greenFieldRows item to an OrderLine, with the Convert and Map option offered for the line total](/img/guides/tutorials/order-hub/greenfield-mapper-line-fields.png)

10. Complete `lineTotal` as `<decimal>greenFieldRowsItem.qty * greenFieldRowsItem.unit_price`.

    ![The expression editor computing lineTotal as the decimal-cast qty multiplied by unit_price](/img/guides/tutorials/order-hub/greenfield-mapper-linetotal.png)

11. The order total is the sum of the line totals. Add a [sub-mapping](../../develop/integration-artifacts/supporting/data-mapper/submappings.md) named `lineTotals` of type `decimal[]`.

    ![The Add New Sub Mapping panel creating lineTotals of type decimal array](/img/guides/tutorials/order-hub/greenfield-submapping-create.png)

12. Populate the sub-mapping from `greenFieldRows` with **Map Each Element**.

    ![The Map Each Element option for populating the lineTotals sub-mapping from greenFieldRows](/img/guides/tutorials/order-hub/greenfield-submapping-menu.png)

13. Each element of `lineTotals` is `<decimal>greenFieldRowsItem.qty * greenFieldRowsItem.unit_price`.

    ![The expression editor computing each lineTotals element as the decimal-cast qty multiplied by unit_price](/img/guides/tutorials/order-hub/greenfield-submapping-expr.png)

14. Now map `orderTotal` from the `lineTotals` sub-mapping. Choose [**Aggregate and Map**](../../develop/integration-artifacts/supporting/data-mapper/array-mappings/array-to-single-value.md).

    ![The mapping options for orderTotal with Aggregate and Map selected](/img/guides/tutorials/order-hub/greenfield-ordertotal-menu.png)

15. Pick the **sum** aggregate function.

    ![The aggregate function list with sum selected for orderTotal](/img/guides/tutorials/order-hub/greenfield-ordertotal-sum.png)

16. The completed mapper turns the flat row array into a typed, nested `Order`.

    ![The completed transformGreenFieldOrders data mapper, with every Order field mapped from the greenFieldRows input](/img/guides/tutorials/order-hub/greenfield-mapper.png)

#### Persist and archive

17. Back on the `/greenfield` service, the `onFileCsv` handler now appears in the **File Handlers** list. Open it.

    ![The File Handlers list showing the onCreate onFileCsv handler](/img/guides/tutorials/order-hub/greenfield-handler-created.png)

18. In the flow, add a **Map Data** node that runs `transformGreenFieldOrders` over `greenfieldRows`, into a result `orderResult` of type `Order`.

    ![The onFileCsv flow with a Map Data node configured to produce orderResult from greenfieldRows](/img/guides/tutorials/order-hub/greenfield-flow-map.png)

19. Add the `dbClient` [**Insert rows into orders table**](../../develop/tools/integration-tools/persist-tool.md#use-connection-functions-in-integration-logic) operation.

    ![The dbClient connection operations with Insert rows into orders table selected](/img/guides/tutorials/order-hub/greenfield-orders-op.png)

20. Build the order record from `orderResult`, converting the date string into the `{year, month, day}` the `DATE` column expects.

    ![The Record Configuration for the orders insert, building the record from orderResult and slicing the order date into year, month, and day](/img/guides/tutorials/order-hub/greenfield-persist-orders.png)

    :::note Converting the date for a `DATE` column
    The `orders.order_date` column maps to a `time:Date` record (`{year, month, day}`), but `orderResult.orderDate` is an ISO string such as `2026-06-23`. Convert it inline by slicing the string: `int:fromString(orderResult.orderDate.substring(0, 4))` for the year, `(5, 7)` for the month, `(8, 10)` for the day, as shown in the code tab.
    :::

21. Name the insert's result `primaryKeys`; the persist client returns the generated integer keys.

    ![The orders insert node with its data array and the result named primaryKeys](/img/guides/tutorials/order-hub/greenfield-orders-result.png)

22. Loop the lines: add a **Foreach** over `orderResult.lines`, with each element named `orderLine` of type `OrderLine`.

    ![The Foreach node iterating orderResult.lines with the loop variable orderLine](/img/guides/tutorials/order-hub/greenfield-foreach.png)

23. Inside the loop, add the `dbClient` **Insert rows into order_lines table** operation.

    ![The dbClient connection operations with Insert rows into order_lines table selected inside the Foreach](/img/guides/tutorials/order-hub/greenfield-lines-op.png)

24. Build the line record from `orderLine`, and set its `orderId` to `primaryKeys[0]`, the **integer key** the order insert returned, not the business id (see the [note in Step 1](#step-1-set-up-the-project-and-the-canonical-model)).

    ![The Record Configuration for the order_lines insert, mapping the OrderLine fields and setting orderId to primaryKeys[0]](/img/guides/tutorials/order-hub/greenfield-persist-lines.png)

25. Name the result `orderlineKeys` and save.

    ![The order_lines insert node with its data array and the result named orderlineKeys](/img/guides/tutorials/order-hub/greenfield-lines-result.png)

26. The completed flow maps the rows, inserts the order, then inserts each line under it.

    ![The completed onFileCsv flow: Start, Map Data, the orders post, a Foreach over the lines with the order_lines post inside, and the Error Handler](/img/guides/tutorials/order-hub/greenfield-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

The row schema you defined is a record in `types.bal`:

```ballerina
type GreenfieldRow record {|
    string order_id;
    string order_date;
    string sku;
    string description;
    int qty;
    decimal unit_price;
|};
```

The data mapper is an expression-bodied function in `data_mappings.bal`. It reads the header from the first row, maps each row to a line (casting `qty` to `decimal` for the line total), fixes `supplierCode` and `currency` as constants, and aggregates the line totals into the order total:

```ballerina
function transformGreenFieldOrders(GreenfieldRow[] greenFieldRows) returns Order => let decimal[] lineTotals = from var greenFieldRowsItem in greenFieldRows
        select <decimal>greenFieldRowsItem.qty * greenFieldRowsItem.unit_price
    in {
        orderId: greenFieldRows[0].order_id,
        orderDate: greenFieldRows[0].order_date,
        lines: from var greenFieldRowsItem in greenFieldRows
            select {sku: greenFieldRowsItem.sku, description: greenFieldRowsItem.description, quantity: greenFieldRowsItem.qty, unitPrice: greenFieldRowsItem.unit_price, lineTotal: <decimal>greenFieldRowsItem.qty * greenFieldRowsItem.unit_price},
        currency: "USD",
        orderTotal: from var lineTotalsItem in lineTotals
            collect sum(lineTotalsItem),
        supplierCode: "GREENFIELD"
    };
```

The handler in `main.bal` maps the rows, inserts the order, then inserts each line with the order's generated key as its foreign key. The `@ftp:FunctionConfig` archives the file when the handler returns:

```ballerina
import ballerina/ftp;

service on ftpListener {
    @ftp:FunctionConfig {
        afterProcess: {moveTo: string `/processed`},
        afterError: {moveTo: string `/errors`}
    }
    remote function onFileCsv(GreenfieldRow[] greenfieldRows, ftp:FileInfo fileInfo) returns error? {
        do {
            Order orderResult = transformGreenFieldOrders(greenfieldRows);
            int[] primaryKeys = check dbClient->/orders.post([
                {
                    orderId: orderResult.orderId,
                    supplierCode: orderResult.supplierCode,
                    orderDate: {
                        year: check int:fromString(orderResult.orderDate.substring(0, 4)),
                        month: check int:fromString(orderResult.orderDate.substring(5, 7)),
                        day: check int:fromString(orderResult.orderDate.substring(8, 10))
                    },
                    orderTotal: orderResult.orderTotal,
                    currency: orderResult.currency
                }
            ]);
            foreach OrderLine orderLine in orderResult.lines {
                int[] orderlineKeys = check dbClient->/orderlines.post([
                    {
                        sku: orderLine.sku,
                        description: orderLine.description,
                        quantity: orderLine.quantity,
                        unitPrice: orderLine.unitPrice,
                        lineTotal: orderLine.lineTotal,
                        orderId: primaryKeys[0]
                    }
                ]);
            }
        } on fail error err {
            return error("unhandled error", err);
        }
    }
}
```

</TabItem>
</Tabs>

> **Capability: array mapping and aggregation.** One visual mapping turns a flat CSV into a typed, nested `Order`, folding many rows into one order, computing each line total, and aggregating the order total, with no parsing code.

:::note Very large CSVs
For files too big to hold in memory, enable **Stream (Large Files)** on the handler to process rows in chunks, and add [CSV fault tolerance](../../develop/integration-artifacts/file/csv-fault-tolerance.md) to skip malformed rows instead of failing the file. See [Streaming large files](../../develop/integration-artifacts/file/streaming-large-files.md).
:::

---

## Step 4: Map the Harbor XML to the same canonical `Order`

Harbor sends the same kind of order, but as **XML**, with the values held in attributes, the numbers typed as text, and the date written `DD/MM/YYYY`. The point of this step is that none of that difference survives into the database: the XML lands on the **exact same canonical `Order`** as the CSV, through its own mapper and the same insert shape. You generate the source type from a sample, map it, and persist it just as in [Step 3](#step-3-map-the-greenfield-csv-to-the-canonical-order).

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

#### Generate the source type from a sample

1. From **Types**, add a type and switch to the **Import** tab. Set the format to **XML** and paste a sample Harbor file, then click **Import**. The platform [generates the record structure from the sample](../../develop/integration-artifacts/supporting/data-mapper/generic-type-mappings.md#generate-types-from-a-sample), turning each XML attribute into an `@xmldata:Attribute string` field.

   ![The New Type panel on the Import tab with XML selected and a sample Harbor purchase order pasted in](/img/guides/tutorials/order-hub/harbor-type-import.png)

2. The generated type is named after the root element (`PurchaseOrder`). Rename it to `HarborOrder`; the rename updates every reference across the project.

   ![Editing the generated record, renaming it from PurchaseOrder to HarborOrder, with its items, currency, date, and id fields](/img/guides/tutorials/order-hub/harbor-type-rename.png)

#### Receive the XML

3. Open the `/harbor` service and add an **On Create** handler. Set **File Format** to **XML**, choose `HarborOrder` as the **Content Schema** (delivered as `harborOrder`), and set **Success → Move to** `/processed` and **Error → Move to** `/errors`.

   ![The On Create handler configuration for Harbor: File Format XML, Content Schema HarborOrder harborOrder, and the move-to archiving paths](/img/guides/tutorials/order-hub/harbor-handler.png)

#### Build the data mapper

4. From **Data Mappers**, create `transformHarborOrders` with input `HarborOrder harborOrder` and output `Order`, the same output type the Greenfield mapper produces.

   ![The Create New Data Mapper form: name transformHarborOrders, input HarborOrder harborOrder, output Order](/img/guides/tutorials/order-hub/harbor-mapper-create.png)

5. Map the scalar fields directly: `orderId` from `harborOrder.id`, `currency` from `harborOrder.currency`, and `orderDate` from `harborOrder.date`.

   ![The data mapper mapping orderId, currency, and orderDate from the HarborOrder attributes](/img/guides/tutorials/order-hub/harbor-mapper-scalars.png)

6. `supplierCode` is again a business constant. Type `"HARBOR"` into the field.

   ![The data mapper with supplierCode set to the constant HARBOR](/img/guides/tutorials/order-hub/harbor-mapper-constants.png)

7. Map `lines` from the repeated `harborOrder.items.item` element: choose **Map Each Element** so each `<item>` becomes an `OrderLine`.

   ![The Map Each Element option for mapping the item array onto the lines array](/img/guides/tutorials/order-hub/harbor-mapper-lines-menu.png)

8. Inside the element mapping, map `sku` from `code` and `description` from `name`.

   ![The per-element mapping from an item to an OrderLine, mapping sku from code and description from name](/img/guides/tutorials/order-hub/harbor-mapper-line-fields.png)

9. `units` is XML text, but `quantity` is an `int`. Use [**Convert and Map**](../../develop/integration-artifacts/supporting/data-mapper/mapping-capabilities.md#convert-and-map) to coerce it.

   ![The Convert and Map option offered when mapping the string units onto the integer quantity](/img/guides/tutorials/order-hub/harbor-mapper-quantity.png)

10. Likewise, **Convert and Map** the text `price` onto the `decimal` `unitPrice`.

    ![The Convert and Map option offered when mapping the string price onto the decimal unitPrice](/img/guides/tutorials/order-hub/harbor-mapper-unitprice.png)

    :::note Convert and map: text into typed numbers
    XML attributes are always text, so `units` and `price` arrive as `string`. **Convert and Map** generates a safe conversion: `int:fromString` / `decimal:fromString` with a fallback to `0` when the text is not a number, so one malformed value can't crash the whole mapping.
    :::

11. For `lineTotal`, **Convert and Map** as well, since it is computed from the two text values.

    ![The Convert and Map option offered for the line total](/img/guides/tutorials/order-hub/harbor-mapper-linetotal-menu.png)

12. Complete `lineTotal` as the converted `price` multiplied by the converted `units`.

    ![The expression editor computing lineTotal as the converted price multiplied by the converted units](/img/guides/tutorials/order-hub/harbor-mapper-linetotal.png)

13. As with Greenfield, the order total is the sum of the line totals. Add a [sub-mapping](../../develop/integration-artifacts/supporting/data-mapper/submappings.md) `lineTotals` of type `decimal[]`.

    ![The Add New Sub Mapping panel creating lineTotals of type decimal array](/img/guides/tutorials/order-hub/harbor-submapping-create.png)

14. Populate it from `harborOrder.items.item` with **Map Each Element**.

    ![The Map Each Element option for populating the lineTotals sub-mapping from the item array](/img/guides/tutorials/order-hub/harbor-submapping-menu.png)

15. Each element is the converted `price` multiplied by the converted `units`.

    ![The expression editor computing each lineTotals element from the converted price and units](/img/guides/tutorials/order-hub/harbor-submapping-expr.png)

16. Map `orderTotal` from the sub-mapping with [**Aggregate and Map**](../../develop/integration-artifacts/supporting/data-mapper/array-mappings/array-to-single-value.md).

    ![The mapping options for orderTotal with Aggregate and Map selected](/img/guides/tutorials/order-hub/harbor-ordertotal-menu.png)

17. Pick the **sum** aggregate function.

    ![The aggregate function list with sum selected for orderTotal](/img/guides/tutorials/order-hub/harbor-ordertotal-sum.png)

18. The completed mapper lands a completely different source shape on the same `Order`.

    ![The completed transformHarborOrders data mapper, with every Order field mapped from the HarborOrder input](/img/guides/tutorials/order-hub/harbor-mapper.png)

#### Persist and archive

19. Open the `onFileXml` flow and add a **Map Data** node that runs `transformHarborOrders` over `harborOrder`, into a result `orderResult`.

    ![The onFileXml flow with a Map Data node configured to produce orderResult from harborOrder](/img/guides/tutorials/order-hub/harbor-flow-map.png)

20. Add the `dbClient` **Insert rows into orders table** operation and build the record from `orderResult`.

    ![The Record Configuration for the orders insert, building the record from orderResult and parsing the DD/MM/YYYY date into day, month, and year](/img/guides/tutorials/order-hub/harbor-persist-orders.png)

    :::note A different date format, the same target
    Harbor's date is `DD/MM/YYYY` (e.g. `23/06/2026`), so, unlike Greenfield's ISO date, it is sliced as **day** (`0-2`), **month** (`3-5`), **year** (`6-10`). The mapper leaves `orderDate` as the raw string; the format-specific parsing happens here, at the insert, while the column it writes to is identical.
    :::

21. Name the result `primaryKeys`.

    ![The orders insert node with its data array and the result named primaryKeys](/img/guides/tutorials/order-hub/harbor-orders-result.png)

22. Loop the lines: add a **Foreach** over `orderResult.lines` with the loop variable `orderLine`.

    ![The Foreach node iterating orderResult.lines with the loop variable orderLine](/img/guides/tutorials/order-hub/harbor-foreach.png)

23. Inside the loop, add the `dbClient` **Insert rows into order_lines table** operation, building the line from `orderLine` with `orderId` set to `primaryKeys[0]`.

    ![The Record Configuration for the order_lines insert, mapping the OrderLine fields and setting orderId to primaryKeys[0]](/img/guides/tutorials/order-hub/harbor-persist-lines.png)

24. Name the result `orderLineKeys` and save.

    ![The order_lines insert node with its data array and the result named orderLineKeys](/img/guides/tutorials/order-hub/harbor-lines-result.png)

25. The completed flow is the same shape as Greenfield's. Only the mapper and the date parsing differ.

    ![The completed onFileXml flow: Start, Map Data, the orders post, a Foreach over the lines with the order_lines post inside, and the Error Handler](/img/guides/tutorials/order-hub/harbor-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

Importing the XML sample generated these records in `types.bal`. Each attribute is annotated with `@xmldata:Attribute`, and the root element name is preserved with `@xmldata:Name`:

```ballerina
import ballerina/data.xmldata;

type Item record {
    @xmldata:Attribute
    string code;
    @xmldata:Attribute
    string name;
    @xmldata:Attribute
    string price;
    @xmldata:Attribute
    string units;
};

type Items record {
    Item[] item;
};

@xmldata:Name {
    value: "purchaseOrder"
}
type HarborOrder record {
    Items items;
    @xmldata:Attribute
    string currency;
    @xmldata:Attribute
    string date;
    @xmldata:Attribute
    string id;
};
```

The mapper in `data_mappings.bal` converts each text attribute to its typed value with a `0` fallback, fixes `supplierCode` as a constant, and aggregates the order total, landing on the same `Order` as Greenfield:

```ballerina
function transformHarborOrders(HarborOrder harborOrder) returns Order => let decimal[] lineTotals = from var itemItem in harborOrder.items.item
        select (let decimal|error tmp = decimal:fromString(itemItem.price) in (tmp is error ? 0.0d : tmp)) * (let decimal|error tmp = decimal:fromString(itemItem.units) in (tmp is error ? 0.0d : tmp))
    in {
        orderId: harborOrder.id,
        currency: harborOrder.currency,
        supplierCode: "HARBOR",
        lines: from var itemItem in harborOrder.items.item
            select {sku: itemItem.code, description: itemItem.name, unitPrice: (let decimal|error tmp = decimal:fromString(itemItem.price) in (tmp is error ? 0.0d : tmp)), quantity: (let int|error tmp = int:fromString(itemItem.units) in (tmp is error ? 0 : tmp)), lineTotal: (let decimal|error tmp = decimal:fromString(itemItem.price) in (tmp is error ? 0.0d : tmp)) * (let decimal|error tmp = decimal:fromString(itemItem.units) in (tmp is error ? 0.0d : tmp))},
        orderTotal: from var lineTotalsItem in lineTotals
            collect sum(lineTotalsItem),
        orderDate: harborOrder.date
    };
```

The `onFileXml` handler mirrors `onFileCsv`, except it parses the `DD/MM/YYYY` date positionally:

```ballerina
service on ftpListener {
    @ftp:FunctionConfig {
        afterProcess: {moveTo: string `/processed`},
        afterError: {moveTo: string `/errors`}
    }
    remote function onFileXml(HarborOrder harborOrder, ftp:FileInfo fileInfo) returns error? {
        do {
            Order orderResult = transformHarborOrders(harborOrder);
            int[] primaryKeys = check dbClient->/orders.post([
                {
                    orderId: orderResult.orderId,
                    supplierCode: orderResult.supplierCode,
                    orderDate: {
                        day: check int:fromString(orderResult.orderDate.substring(0, 2)),
                        month: check int:fromString(orderResult.orderDate.substring(3, 5)),
                        year: check int:fromString(orderResult.orderDate.substring(6, 10))
                    },
                    orderTotal: orderResult.orderTotal,
                    currency: orderResult.currency
                }
            ]);
            foreach OrderLine orderLine in orderResult.lines {
                int[] orderLineKeys = check dbClient->/orderlines.post([
                    {
                        sku: orderLine.sku,
                        description: orderLine.description,
                        quantity: orderLine.quantity,
                        unitPrice: orderLine.unitPrice,
                        lineTotal: orderLine.lineTotal,
                        orderId: primaryKeys[0]
                    }
                ]);
            }
        } on fail error err {
            return error("unhandled error", err);
        }
    }
}
```

</TabItem>
</Tabs>

> **Capability: generate-from-sample and convert-and-map.** Bootstrap the source type from one pasted XML sample, coerce its string attributes to typed numbers, and handle its own date format, all landing on the same `Order` the CSV pipeline produces, in the same two tables.

---

## Step 5: Build the Daily Summary automation

Reporting runs on a clock, not on a file event, so it belongs in a separate [automation](../../develop/integration-artifacts/automation.md) rather than the intake path. You add a second integration to the same project, give it its own database connection, and build an automation that reads the day's orders and emails procurement an HTML summary. Because both integrations live in one project, the automation reuses the same `order_hub` database the intake wrote to.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

#### Create the automation

1. From the project view, click **+ Add** to add a second [integration](../../develop/create-integrations/create-a-new-integration.md#configure-the-integration) to the `order-hub-freshmart` project, and name it `daily-summary`.

   ![The order-hub-freshmart project view with the order-intake integration and the Add button highlighted](/img/guides/tutorials/order-hub/summary-add-integration.png)

2. In the new integration, click **+ Add Artifact** and choose **Automation**, an artifact that runs periodically or on demand rather than in response to a request.

   ![The artifact palette with Automation highlighted at the top](/img/guides/tutorials/order-hub/summary-automation-artifact.png)

3. Click **Create**. The automation is a `main` function you schedule externally (cron, Kubernetes, or WSO2 Cloud); see [Creating an automation](../../develop/integration-artifacts/automation.md#creating-an-automation).

   ![The Create New Automation screen explaining that periodic invocation is scheduled externally](/img/guides/tutorials/order-hub/summary-automation-create.png)

#### Compute today's date

4. In the automation flow, add the `time:utcNow` function to get the current instant.

   ![The Functions panel with time:utcNow selected](/img/guides/tutorials/order-hub/summary-utcnow-fn.png)

5. Name its result `timeUtc`.

   ![The time:utcNow node configuration with the result named timeUtc](/img/guides/tutorials/order-hub/summary-utcnow.png)

6. Add `time:utcToCivil` to break that instant into civil fields.

   ![The Functions panel with time:utcToCivil selected](/img/guides/tutorials/order-hub/summary-utctocivil-fn.png)

7. Pass `timeUtc` to it and name the result `timeCivil`.

   ![The time:utcToCivil node converting timeUtc into timeCivil](/img/guides/tutorials/order-hub/summary-utctocivil.png)

8. The query needs a `time:Date`. Add a **Declare Variable** and pick `time:Date` from the type browser.

   ![The Type Browser with time:Date selected for the new variable](/img/guides/tutorials/order-hub/summary-date-type.png)

9. Name it `date`, then click **Open in Data Mapper** to build its value from `timeCivil`.

   ![Declaring the date variable of type time:Date with the Open in Data Mapper button](/img/guides/tutorials/order-hub/summary-declare-date.png)

10. Map `year`, `month`, and `day` of `date` from the matching `timeCivil` fields.

    ![The data mapper mapping timeCivil's year, month, and day onto the date variable](/img/guides/tutorials/order-hub/summary-date-mapper.png)

#### Read today's orders

11. This integration needs its own database connection. Add a [**Connect to a Database**](../../develop/tools/integration-tools/persist-tool.md#step-1-add-a-connection) connection to the same `order_hub` MySQL database and name it `dbClient`.

    ![The database connection for daily-summary named dbClient, pointing at the order_hub database](/img/guides/tutorials/order-hub/summary-db-connection.png)

12. In the flow, add the `dbClient` **Get rows from orders table** operation, name the result `orderSummary`, and select the summary fields: `orderId`, `supplierCode`, `orderDate`, `orderTotal`, and `currency`. The generated result type is `OrderSummaryType`.

    ![The Get rows from orders node with the result named orderSummary and the summary fields selected](/img/guides/tutorials/order-hub/summary-get-orders.png)

13. Expand **Advanced Configurations** and set the **Where Clause** to `order_date = ${date}`, so only today's orders are returned. Binding the `time:Date` directly produces a safe parameterized query.

    ![The Get rows node with the Where Clause set to order_date equals the date variable](/img/guides/tutorials/order-hub/summary-where-clause.png)

#### Build the HTML summary

14. Declare a `string[]` named `orderRows`, initialized to `[]`. It collects one HTML table row per order.

    ![Declaring orderRows as an empty string array](/img/guides/tutorials/order-hub/summary-orderrows.png)

15. Declare an `int` named `orderCount`, initialized to `0`.

    ![Declaring orderCount as an integer initialized to zero](/img/guides/tutorials/order-hub/summary-ordercount.png)

16. Add a [**Foreach**](../../develop/understand-ide/editors/flow-diagram-editor/control.md#foreach) over `orderSummary`, with the loop variable `orderItem` of type `OrderSummaryType`.

    ![The Foreach node iterating orderSummary with the loop variable orderItem](/img/guides/tutorials/order-hub/summary-foreach.png)

17. Build an HTML table row from the order: its id, supplier, and `currency`-prefixed total.

    ![The expression editor composing an HTML table row from the orderItem fields](/img/guides/tutorials/order-hub/summary-row-template.png)

18. Inside the loop, `array:push` that row onto `orderRows`.

    ![The array:push node appending the row to orderRows](/img/guides/tutorials/order-hub/summary-push.png)

19. Also in the loop, **Update Variable** `orderCount` to `orderCount + 1`.

    ![The Update Variable node incrementing orderCount](/img/guides/tutorials/order-hub/summary-count-increment.png)

20. After the loop, declare the `htmlBody` string: a heading with the date, the order count, and a table that joins all the `orderRows`.

    ![The expression editor composing the htmlBody from the date, orderCount, and joined orderRows](/img/guides/tutorials/order-hub/summary-htmlbody-expr.png)

21. The `htmlBody` variable now holds the full report markup.

    ![The htmlBody variable declared in the automation flow](/img/guides/tutorials/order-hub/summary-htmlbody.png)

#### Send the email

22. The SMTP server details belong in [configurations](../../develop/integration-artifacts/supporting/configurations.md#adding-a-configuration). Declare `smtpHost`, `smtpPort`, `smtpUser`, and `smtpPassword`.

    ![The Configurable Variables view listing the smtpHost, smtpPort, smtpUser, and smtpPassword configurables](/img/guides/tutorials/order-hub/summary-smtp-configs.png)

23. Add an [**Email (SMTP)**](../../connectors/catalog/built-in/email/email.md) connection named `emailSmtpclient`, binding **Host**, **Username**, and **Password** to those configurables.

    ![Configuring the Email SMTP connection with host, username, and password bound to the configurables](/img/guides/tutorials/order-hub/summary-email-connection.png)

    :::note Sending through a no-TLS mock
    A local mock such as Mailpit has no TLS and no auth, so set the connection's **security** to `START_TLS_NEVER` (and leave the username/password empty). Pointing the default SSL settings at port `1025` would hang.
    :::

24. Add the `emailSmtpclient` [**Send a message**](../../connectors/catalog/built-in/email/action-reference.md) operation. Set the recipient and subject, and pass the `htmlBody` you built.

    ![The Record Configuration for the email message, with the recipient, subject, and htmlBody](/img/guides/tutorials/order-hub/summary-send-email.png)

25. The completed automation reads the day's orders, builds the HTML table, and emails it.

    ![The completed automation flow: utcNow, utcToCivil, the date variable, the orders query, the row-building loop, the htmlBody, and the email send](/img/guides/tutorials/order-hub/summary-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

The query projects each order onto a small summary record in `types.bal`:

```ballerina
import ballerina/time;

public type OrderSummaryType record {|
    string orderId;
    string supplierCode;
    time:Date orderDate;
    decimal orderTotal;
    string currency;
|};
```

The connection settings live in `config.bal`, with the values supplied in `Config.toml`:

```ballerina
configurable string dbClientHost = "localhost";
configurable int dbClientPort = 3306;
configurable string dbClientUser = "order_hub_user";
configurable string dbClientPassword = ?;
configurable string dbClientDatabase = "order_hub";

configurable string smtpHost = "localhost";
configurable int smtpPort = 1025;
configurable string smtpUser = "";
configurable string smtpPassword = ?;
```

```toml
# Config.toml
[pasindufernando.daily_summary]
dbClientPassword = "order_hub_pass"
smtpPassword = ""
```

The two connections are declared in `connections.bal`. The SMTP client uses `START_TLS_NEVER` for the no-TLS mock:

```ballerina
import daily_summary.orderhub;

import ballerina/email;

final orderhub:Client dbClient = check new (dbClientHost, dbClientPort, dbClientUser, dbClientPassword, dbClientDatabase);

final email:SmtpClient emailSmtpclient = check new (string `${smtpHost}`, string `${smtpUser}`, string `${smtpPassword}`, port = smtpPort, security = "START_TLS_NEVER");
```

The automation itself is `automation.bal`. It resolves today's date, queries the orders for that date, folds them into HTML rows, and sends the summary email:

```ballerina
import ballerina/lang.array;
import ballerina/log;
import ballerina/time;

public function main() returns error? {
    do {
        time:Utc timeUtc = time:utcNow();
        time:Civil timeCivil = time:utcToCivil(timeUtc);
        time:Date date = {year: timeCivil.year, month: timeCivil.month, day: timeCivil.day};
        OrderSummaryType[] orderSummary = check dbClient->/orders.get(whereClause = `order_date = ${date}`);
        string[] orderRows = [];
        int orderCount = 0;
        foreach OrderSummaryType orderItem in orderSummary {
            array:push(orderRows, string `<tr>
                <td>${orderItem.orderId}</td>
                <td>${orderItem.supplierCode}</td>
                <td>${orderItem.currency} ${orderItem.orderTotal}</td>
            </tr>`);
            orderCount = orderCount + 1;
        }
        string htmlBody = string `<html>
            <body>
                <h2>Daily summary : ${date.day}/${date.month}/${date.year}</h2>
                <h2>Total orders today : ${orderCount}</h2>
                <table border="1" cellpadding="8" cellspacing="0">
                    <tr>
                        <th>Order ID</th>
                        <th>Supplier</th>
                        <th>Order Total</th>
                    </tr>
                    ${string:'join("", ...orderRows)}
                </table>
            </body>
        </html>`;
        check emailSmtpclient->sendMessage({
            to: "procurement@freshmart.com",
            subject: string `Daily summary : ${date.day}/${date.month}/${date.year}`,
            'from: "procurementbot@example",
            htmlBody: htmlBody
        });
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

</TabItem>
</Tabs>

> **Capability: scheduled batch with connector delivery.** The same persist client that stored each order now feeds a daily report, queried by date, formatted as HTML, and delivered through the email connector, on a timer rather than a request.

---

## Step 6: Run and test

Now exercise both intakes and the report end to end.

### Start the services and run the intake

Start the three backing services: the FTP server, MySQL with the `order_hub` schema from [Step 1](#step-1-set-up-the-project-and-the-canonical-model), and the Mailpit SMTP mock. The Docker commands for the FTP and SMTP servers are in the **Prerequisites** collapsibles above.

Fill in each integration's `Config.toml` (for `order-intake`, the database and FTP passwords; for `daily-summary`, the database password and SMTP settings), then **Run** the `order-intake` integration. It begins polling `/greenfield` and `/harbor`.

### Drop a Greenfield order (CSV)

These commands target the `file-order-hub-ftp` container from the Prerequisites setup (user home `/home/vsftpd/ftpuser`); adjust the names if your server differs. Each order writes the **data file first, then the `.ok` marker**: the service only picks the file up once the marker lands and the file has settled (30s age filter).

```bash
docker exec -i file-order-hub-ftp sh -c 'cat > /home/vsftpd/ftpuser/greenfield/GF_10231.csv' <<'EOF'
order_id,order_date,sku,description,qty,unit_price
GF-10231,2026-06-23,APL-001,Gala Apples 1kg,120,2.50
GF-10231,2026-06-23,BAN-004,Bananas 1kg,80,1.20
GF-10231,2026-06-23,ORG-009,Navel Oranges 1kg,60,3.10
EOF
docker exec file-order-hub-ftp sh -c 'touch /home/vsftpd/ftpuser/greenfield/GF_10231.ok && chmod 644 /home/vsftpd/ftpuser/greenfield/GF_10231.*'
```

### Drop a Harbor order (XML)

```bash
docker exec -i file-order-hub-ftp sh -c 'cat > /home/vsftpd/ftpuser/harbor/HS_55012.xml' <<'EOF'
<purchaseOrder id="HS-55012" date="23/06/2026" currency="USD">
  <items>
    <item code="MLK-220" name="Whole Milk 2L" units="200" price="1.85"/>
    <item code="EGG-012" name="Free-Range Eggs (dozen)" units="150" price="3.40"/>
  </items>
</purchaseOrder>
EOF
docker exec file-order-hub-ftp sh -c 'touch /home/vsftpd/ftpuser/harbor/HS_55012.ok && chmod 644 /home/vsftpd/ftpuser/harbor/HS_55012.*'
```

### Watch the files get processed

Within a minute (30s age filter + poll interval), each data file moves to `/processed` (the `.ok` markers stay behind):

```bash
docker exec file-order-hub-ftp sh -c 'cd /home/vsftpd/ftpuser && for d in greenfield harbor processed errors; do echo "== $d =="; ls -1 "$d"; done'
```

Confirm both orders landed in MySQL, **in the same canonical shape**, despite arriving as CSV and XML:

```bash
mysql -u order_hub_user -porder_hub_pass order_hub \
  -e "SELECT order_id, supplier_code, order_date, order_total, currency FROM orders;
      SELECT order_id, sku, quantity, unit_price, line_total FROM order_lines ORDER BY order_id;"
```

You should see:

| order_id | supplier_code | order_total | currency | lines |
| --- | --- | --- | --- | --- |
| GF-10231 | GREENFIELD | **582.00** | USD | 3 |
| HS-55012 | HARBOR | **880.00** | USD | 2 |

### Confirm the error path

Drop a malformed file, for example a Greenfield CSV whose name matches the pattern but whose contents are not valid rows, together with its `.ok` marker. When the handler fails, the file is moved to `/errors` instead of `/processed`:

```bash
docker exec -i file-order-hub-ftp sh -c 'cat > /home/vsftpd/ftpuser/greenfield/GF_99999.csv' <<'EOF'
this is not,a valid
greenfield,order,file
EOF
docker exec file-order-hub-ftp sh -c 'touch /home/vsftpd/ftpuser/greenfield/GF_99999.ok && chmod 644 /home/vsftpd/ftpuser/greenfield/GF_99999.*'
```

### Run the daily summary

Finally, **Run** the `daily-summary` automation. It queries the orders for today's date, builds the HTML table, and emails the report. Open the Mailpit inbox at [http://localhost:8025](http://localhost:8025) to see the summary, with one row per order and the day's order count.

:::tip Re-running from a clean slate
To reset between runs, delete everything under the FTP home and clear the tables:
```bash
docker exec file-order-hub-ftp sh -c 'find /home/vsftpd/ftpuser -type f -delete'
mysql -u order_hub_user -porder_hub_pass order_hub -e "DELETE FROM order_lines; DELETE FROM orders;"
```
Because `orders` has a `UNIQUE (order_id, supplier_code)` constraint, re-dropping the same order without clearing first will fail and route the file to `/errors`.
:::

---

## What's next

You have built a complete B2B ingestion hub as two integrations, designed in the Visual Designer: an FTP intake that picks up two file formats through one gated, shared listener, normalizes both into a single canonical `Order` with the data mapper, stores them in MySQL through the persist feature, archives every file, and emails a scheduled daily report.

Explore more of what you can build with WSO2 Integrator:

- [Build an Event-Driven Social Media Backend with RabbitMQ](./social-media.md)
- [Streaming large files](../../develop/integration-artifacts/file/streaming-large-files.md)
- [CSV fault tolerance](../../develop/integration-artifacts/file/csv-fault-tolerance.md)
- [EDI Processing](../../develop/transform/edi.md)
