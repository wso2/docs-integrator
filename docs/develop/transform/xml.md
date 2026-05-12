---
title: XML Processing
---

# XML Processing

XML is a flexible, text-based format used to store, transport, and structure data in a way that is both human-readable and machine-readable.

WSO2 Integrator provides built-in support for XML processing, making it easy to work with XML data in integration scenarios. You can create, read, query, modify, validate, and transform XML content without relying on external libraries. This native XML support simplifies integration development and helps efficiently process XML payloads exchanged between applications, services, and enterprise systems.

## XML literals and construction

Create XML values directly in WSO2 Integrator using backtick templates. The `xml` type supports XML elements, text nodes, comments, and processing instructions, making it easy to construct structured XML payloads within integrations.

1. **Add a Variable step**: In the flow designer, click **+** and select **Declare Variable**. Set the variable type to `xml` and provide an XML backtick template as the expression (for example: **xml `<example></example>`**).

2. **Use embedded expressions**: Insert dynamic values into XML templates using `${variableName}` syntax. Each XML variable is represented as a separate **Declare Variable** step in the flow, allowing you to visually manage XML construction.

   ![Flow designer showing Declare Variable steps for XML literal construction including dynamic expressions](/img/develop/transform/xml/xml-literals-flow.png)

3. **Configure the expression**: Select a variable node to view and edit the XML template expression from the side panel.

   ![Side panel showing the dynamic XML variable with embedded expression](/img/develop/transform/xml/xml-literals-dynamic-panel.png)

```ballerina
import ballerina/io;

public function main() {
    // XML element
    xml greeting = xml `<greeting>Hello, World!</greeting>`;

    // Nested elements
    xml orders = xml `<order id="ORD-100">
        <customer>Acme Corp</customer>
        <items>
            <item sku="WDG-01" qty="5"/>
            <item sku="GDG-02" qty="2"/>
        </items>
    </order>`;

    // XML with embedded expressions
    string name = "Globex Inc";
    int quantity = 10;
    xml dynamic = xml `<shipment>
        <recipient>${name}</recipient>
        <units>${quantity}</units>
    </shipment>`;

    io:println(dynamic);
}
```

### XML text and comments

Create XML text nodes, comments, and processing instructions directly using XML backtick templates. These XML node types can be stored in variables and used when building or transforming XML payloads.

1. **Add Variable steps**: In the flow designer, add separate **Declare Variable** steps with the type set to `xml` for each XML node type such as text, comment, or processing instruction.

2. **Define XML node values**: Provide the required XML backtick template expression for the node type you want to create.

3. **View the flow representation**: Each XML node appears as an individual **Declare Variable** step in the integration flow.

![Flow designer showing Declare Variable steps for XML text, comment, and processing instruction nodes](/img/develop/transform/xml/xml-text-comments-flow.png)

```ballerina
import ballerina/io;

public function main() {
    // Text node
    xml text = xml `Hello, World!`;

    // Comment
    xml comment = xml ``;

    // Processing instruction
    xml pi = xml `<?xml-stylesheet type="text/xsl" href="style.xsl"?>`;

    io:println(text);
    io:println(comment);
    io:println(pi);
}
```

## Navigating XML

Access child elements, attributes, and text content using XML navigation expressions in WSO2 Integrator. XML navigation makes it easy to query and extract specific parts of XML payloads during integration flows.

1. **Navigate child elements** — Add a **Declare Variable** step and use expressions such as `catalog/<product>` to select child elements by name, or `catalog/*` to retrieve all child elements.

2. **Access text content** — Use the `.data()` function in a variable expression (for example, `(firstProduct/<name>).data()`) to extract the text value of an XML element.

3. **Access attributes** — Use `.getAttributes()["attributeName"]` to retrieve attribute values from an XML element.

4. **Filter descendants** — Use descendant navigation expressions such as `catalog/**/<name>` to find matching elements at any level of the XML hierarchy.

   ![Flow designer showing Declare Variable steps for XML navigation including child access, text content, attributes, and descendant filtering](/img/develop/transform/xml/xml-navigating-flow.png)

5. **View and edit expressions** — Select a variable node to view or modify the XML navigation expression from the side panel.

   ![Side panel showing the products variable with catalog child access expression](/img/develop/transform/xml/xml-navigating-child-panel.png)

```ballerina
import ballerina/io;

public function main() {
    xml catalog = xml `<catalog>
        <product id="P1" category="electronics">
            <name>Widget</name>
            <price>29.99</price>
        </product>
        <product id="P2" category="tools">
            <name>Gadget</name>
            <price>49.99</price>
        </product>
    </catalog>`;

    // Get child elements by name
    xml products = catalog/<product>;

    // Get all child elements
    xml children = catalog/*;

    // Access element text content
    xml firstProduct = (catalog/<product>)[0];
    string productName = (firstProduct/<name>).data();
    io:println(productName); // Widget

    // Access attributes
    string? id = (<xml:Element>firstProduct).getAttributes()["id"];
    io:println(id); // P1

    // Filter descendant elements
    xml names = catalog/**/<name>;
    io:println(names);
    // <name>Widget</name><name>Gadget</name>
}
```

## XML namespaces

Handle namespaced XML using `xmlns` declarations in Ballerina.

1. **Declare namespace bindings** — The `xmlns` declarations in the code appear implicitly in the flow. Add **Variable** steps that use namespace-prefixed XML templates and navigation expressions.

2. **Navigate namespaced elements** — Use the namespace prefix in navigation expressions (for example, `nsOrder/<cmn:customer>`).

   ![Flow designer showing Declare Variable steps for namespaced XML construction and navigation](/img/develop/transform/xml/xml-namespaces-flow.png)

```ballerina
import ballerina/io;

public function main() {
    xmlns "http://example.com/orders" as ord;
    xmlns "http://example.com/common" as cmn;

    xml nsOrder = xml `<ord:order>
        <cmn:customer>Acme Corp</cmn:customer>
        <ord:total>1500.00</ord:total>
    </ord:order>`;

    // Navigate namespaced elements
    xml customer = nsOrder/<cmn:customer>;
    io:println(customer);
}
```

## Iterating over XML

Use `foreach` loops or query expressions to process XML sequences in WSO2 Integrator. XML iteration is useful for reading, filtering, and transforming repeating XML elements such as lists of items, records, or orders.

1. **Add a Foreach step** — Click **+** and select **Foreach** under **Control**. In the configuration panel, specify the XML collection to iterate over and the loop variable name.

   | Field | Description |
   |---|---|
   | **Collection** | The XML sequence to iterate over (for example, `items/<item>`) |
   | **Variable** | The loop variable bound to each XML element |

2. **Process XML elements inside the loop** — Add **Declare Variable** steps inside the loop body to extract values using XML navigation expressions such as `(item/<sku>).data()`.

3. **Use query expressions for filtering** — Add a **Declare Variable** step with a query expression to filter or transform XML sequences based on conditions.

   ![Flow designer showing a Foreach node iterating over XML items with variable extraction steps inside the loop body](/img/develop/transform/xml/xml-iterating-flow.png)

```ballerina
import ballerina/io;

public function main() returns error? {
    xml items = xml `<items>
        <item><sku>A1</sku><qty>3</qty></item>
        <item><sku>B2</sku><qty>7</qty></item>
        <item><sku>C3</sku><qty>1</qty></item>
    </items>`;

    // Iterate using foreach
    foreach xml item in items/<item> {
        string sku = (item/<sku>).data();
        string qty = (item/<qty>).data();
        io:println(string `SKU: ${sku}, Quantity: ${qty}`);
    }

    // Filter XML elements using query expressions
    xml highQty = from xml item in items/<item>
        let string qtyStr = (item/<qty>).data()
        let int qty = check int:fromString(qtyStr)
        where qty > 2
        select item;
    io:println(highQty);
}
```

## XML mutation

Modify XML structures by updating child elements or attributes. XML mutation is useful when transforming payloads, enriching messages, or updating XML content dynamically during integration flows.

1. **Add a Variable step** — Create a **Declare Variable** step with the type set to `xml:Element` and initialize it using an XML literal.

+2. **Add a Custom Expression step** — Click **+** and select **Custom Expression**. Enter the XML mutation expression, such as ``doc.setChildren(xml `<status>completed</status>`)``, to update the XML structure. The mutation operation appears as a **Custom Expression** node in the flow.

3. **Update XML content** — Use XML mutation functions to replace child nodes, append content, or modify existing XML values as required by the integration logic.

   ![Flow designer showing a Declare Variable step for the XML document followed by a Custom Expression step for setChildren](/img/develop/transform/xml/xml-mutation-flow.png)

```ballerina
import ballerina/io;

public function main() {
    xml:Element doc = xml `<order>
        <status>pending</status>
    </order>`;

    // Replace child elements
    doc.setChildren(xml `
        <status>completed</status>
        <updatedAt>2025-01-15</updatedAt>
    `);

    io:println(doc);
}
```

## XML to record conversion

Use the `ballerina/data.xmldata` module to convert XML data into typed Ballerina records for type-safe access and easier manipulation. Converting XML into records simplifies validation, transformation, and field access within integration flows.

1. **Define the target record types** — Navigate to **Types** in the sidebar and click **+** to create new types. Open the **Import** tab in the right-side panel and paste the record definitions for `PurchaseOrder`, `ShipTo`, and `Item`. For more information, see [Types](../integration-artifacts/supporting/types.md).

   ![New Type panel showing the Import tab with XML format selected](/img/develop/transform/xml/types-import-tab.png)

2. **Add a Variable step** — Open the required resource function in the flow designer. Add a **Declare Variable** step, set the variable type to `PurchaseOrder`, and use `check xmldata:parseAsType(payload)` as the expression to convert the XML payload into the typed record.

   ![Flow designer showing the xmldata parseAsType variable step and mapOrder transformation in the processXml resource](/img/develop/transform/xml/flow-xml-parse-step.png)

3. **Transform records visually** — Use the **Visual Data Mapper** to map fields from the parsed XML record into another record structure or response type.

   ![Data Mapper showing PurchaseOrder input fields on the left and OrderSummary output fields on the right](/img/develop/transform/xml/data-mapper-xml-to-record.png)

```ballerina
import ballerina/data.xmldata;
import ballerina/io;

type PurchaseOrder record {|
    string orderDate;
    ShipTo shipTo;
    Item[] item;
|};

type ShipTo record {|
    string name;
    string street;
    string city;
|};

type Item record {|
    @xmldata:Attribute
    string partNum;
    string productName;
    int quantity;
    decimal price;
|};

public function main() returns error? {
    xml po = xml `<PurchaseOrder orderDate="2025-03-15">
        <shipTo>
            <name>Acme Corp</name>
            <street>123 Main St</street>
            <city>Springfield</city>
        </shipTo>
        <item partNum="WDG-01">
            <productName>Widget</productName>
            <quantity>10</quantity>
            <price>29.99</price>
        </item>
    `;

    PurchaseOrder orders = check xmldata:parseAsType(po);
    io:println(orders.shipTo.name); // Acme Corp
}
```

## Record to XML conversion

Convert Ballerina records into XML using the `ballerina/data.xmldata` module. Record-to-XML conversion is useful when generating XML payloads for APIs, external systems, or XML-based integrations.

1. **Define the record type** — Navigate to **Types** in the sidebar and click **+** to create a new type. Open the **Import** tab in the right-side panel and paste the record definition (for example, `Invoice`). For more information, see [Types](../integration-artifacts/supporting/types.md).

   ![New Type panel showing the Import tab with XML format selected](/img/develop/transform/xml/types-import-tab.png)

2. **Add a Variable step** — In the flow designer, add a **Declare Variable** step, set the variable type to `xml`, and use `check xmldata:toXml(inv)` as the expression to convert the record into XML.

3. **Use the generated XML** — The resulting XML value can be returned from a service, sent to external systems, or further transformed within the integration flow.

The same flow designer pattern shown in the [XML to record conversion](#xml-to-record-conversion) section applies here, where each `xmldata` function call appears as a dedicated step in the flow.

```ballerina
import ballerina/data.xmldata;
import ballerina/io;

type Invoice record {|
    string invoiceId;
    string customer;
    decimal total;
|};

public function main() returns error? {
    Invoice inv = {
        invoiceId: "INV-2001",
        customer: "Globex Inc",
        total: 1500.00
    };

    xml invoiceXml = check xmldata:toXml(inv);

    io:println(invoiceXml);
    // <invoiceId>INV-2001</invoiceId>...
}
```

## XML to JSON conversion

Convert XML data to JSON and JSON data back to XML using the `ballerina/data.xmldata` module. These conversions are useful when integrating XML-based systems with JSON-based APIs and services.

1. **Define the record types** — Navigate to **Types** in the sidebar and click **+** to create the required types. Open the **Import** tab in the right-side panel and paste the record definitions for the source and target structures. For more information, see [Types](../integration-artifacts/supporting/types.md).

   ![New Type panel showing the Import tab with XML format selected](/img/develop/transform/xml/types-import-tab.png)

2. **Parse XML into records** — Add a **Declare Variable** step with the expression `check xmldata:parseAsType(payload)` to convert the XML payload into a typed Ballerina record.

3. **Convert records to JSON** — Add another **Declare Variable** step or a **Return** step with the expression `record.toJson()` to transform the parsed record into JSON format.

   ![Flow designer showing the XML parse, mapOrder, and toJson return steps in sequence](/img/develop/transform/xml/flow-xml-parse-step.png)

4. **Map fields visually** — Use the **Visual Data Mapper** to map or transform fields between record structures before converting the result into JSON.

```ballerina
import ballerina/data.xmldata;
import ballerina/io;

public function main() returns error? {
    xml customers = xml `<customer>
        <name>Acme Corp</name>
        <email>info@acme.com</email>
    </customer>`;

    // Convert XML to a typed record
    record {|
        string name;
        string email;
    |} customer = check xmldata:parseAsType(customers);

    // Convert record to JSON
    json customerJson = customer.toJson();
    io:println(customerJson);

    // Convert JSON back to XML
    xml result = check xmldata:fromJson(customerJson);
    io:println(result);
}
```

## Best practices

- **Use typed records for XML processing** whenever the XML structure or schema is known. Typed records provide compile-time validation and help catch mapping or type errors early.

- **Prefer `ballerina/data.xmldata` for complex XML documents** instead of manually navigating XML trees. This reduces boilerplate code and simplifies XML-to-record and record-to-XML transformations.

- **Handle XML namespaces explicitly** when working with namespaced XML documents. Declare `xmlns` bindings at the beginning of functions or modules to ensure accurate XML navigation and transformation.

- **Use query expressions for filtering and transformation** instead of manual iteration where possible. Query expressions provide cleaner and more declarative XML processing logic.

- **Validate incoming XML payloads** before processing them to avoid runtime errors caused by missing elements, invalid structures, or unexpected data types.

- **Avoid excessive XML mutation** when building large XML payloads. Prefer constructing structured XML templates or using typed records for better readability and maintainability.

- **Keep XML navigation expressions simple and readable** by storing intermediate XML nodes in variables when working with deeply nested XML structures.

- **Use attributes and elements consistently** based on the XML schema or integration contract to maintain compatibility across systems.

## What's next

- **[CSV & Flat File Processing](csv-flat-file.md)** - Tabular data formats
