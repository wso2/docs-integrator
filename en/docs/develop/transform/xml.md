---
sidebar_position: 3
title: XML Processing
description: Parse, construct, transform, and validate XML data.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# XML Processing

XML is a flexible, text-based format used to store, transport, and structure data in a way that is both human-readable and machine-readable.

WSO2 Integrator provides built-in support for XML processing, making it easy to work with XML data in integration scenarios. You can create, read, query, modify, validate, and transform XML content without relying on external libraries. This native XML support simplifies integration development and helps efficiently process XML payloads exchanged between applications, services, and enterprise systems.

## Construct

Use backtick templates and namespace declarations to build XML payloads from static values, dynamic expressions, or existing data structures.

### Building XML payloads

The `xml` type in WSO2 Integrator can hold four kinds of XML nodes: elements, text nodes, comments, and processing instructions. Use XML template literals (backtick syntax: `xml \`...\``) to construct any of these and store the value in a variable declaration node in your integration flow.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Add a Variable**: In the flow designer, click **+** and select **Declare Variable**. Set the **Name** to the variable name (for example, `xmlPayload`) and the **Type** to `xml`.

2. **Enter an XML template**: In the **Expression** field, write an XML template using backtick syntax. The sample below covers all four node kinds and is ready to copy as a starting point:

   ```
   xml `<order id="ORD-100">
       <!--Order from Acme Corp-->
       <customer>Acme Corp</customer>
       <total>250.00</total>
       <?audit log="true"?>
   </order>`
   ```

   ![Declare Variable side panel showing xmlPayload variable with type xml and the order XML template in the expression field](/img/develop/transform/xml/xml-payload.png)

3. **Insert dynamic values**: To embed a runtime value inside the XML template, use the `${expression}` syntax directly within the backtick template. The expression can be any valid Ballerina expression:

   | Syntax | Example | Inserts |
   |---|---|---|
   | `${variableName}` | `${customerId}` | Value of a variable |
   | `${record.field}` | `${order.total}` | A record field value |
   | `${functionCall()}` | `${generateId()}` | Return value of a function |

   Once you type an expression, the visual designer renders it as a blue chip inside the expression editor — for example, `{x} customerId` — so expressions are visually distinct from the surrounding XML text.

   ![Declare Variable panel showing xmlPayload with a dynamic expression rendered as a blue chip in the expression field](/img/develop/transform/xml/dynamic-xml.png)

:::info
Text nodes, comments, and processing instructions are rarely constructed manually in integration flows. They appear more often when reading and transforming incoming XML payloads.
:::

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;

public function main() {
    // The xml type holds elements, text nodes, comments, and processing instructions.
    // Use xml `...` templates to construct XML values and store them in variables.
    xml payload = xml `<order id="ORD-100">
        <!--Order from Acme Corp-->
        <customer>Acme Corp</customer>
        <total>250.00</total>
        <?audit log="true"?>
    </order>`;

    // Embed runtime values using ${} interpolation
    string customerId = "CUST-42";
    decimal amount = 375.50;
    xml dynamic = xml `<order>
        <customerId>${customerId}</customerId>
        <amount>${amount}</amount>
    </order>`;

    io:println(payload);
    io:println(dynamic);
}
```

:::info
Text nodes, comments, and processing instructions are rarely constructed manually in integration flows. They appear more often when reading and transforming incoming XML payloads.
:::

</TabItem>
</Tabs>

### Namespaces

A namespace declaration binds a URI to a short prefix, which you then use in XML element names and navigation expressions. The syntax is:

```
xmlns "namespace-URI" as prefix;
```

The scope of a declaration depends on where you place it:

- **Module level** (below the `import` statements in the `.bal` file): available to all functions in the file.
- **Function level** (inside a function body): scoped to that function only.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

:::info
`xmlns` declarations cannot be added through the Visual Designer. Open the `.bal` file directly and write the binding below the `import` statements for module-level scope, or inside the function body for function-level scope.
:::

1. **Declare the namespace**: Write the `xmlns` binding in the appropriate scope. For example, to make the `ord` prefix available across the whole file, place it below the `import` statements:

   ```ballerina
   import ballerina/io;

   xmlns "http://example.com/orders" as ord;
   ```

   To limit the prefix to a single function, place it inside the function body instead.

2. **Use the prefix in XML templates**: Once declared, use the prefix in backtick templates to construct namespaced XML. Add a **Declare Variable** step, set the type to `xml`, and enter the namespaced XML template as the expression.

   ![Declare Variable side panel showing nsOrder variable with type xml and a namespaced XML template using the ord prefix in the expression field](/img/develop/transform/xml/xml-ns.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;

// Module-level declaration — placed below imports, available to all functions in this file
xmlns "http://example.com/orders" as ord;

public function main() {
    // Function-level declaration — scoped to this function only
    xmlns "http://example.com/common" as cmn;

    xml nsOrder = xml `<ord:order>
        <cmn:customer>Acme Corp</cmn:customer>
        <ord:total>1500.00</ord:total>
    </ord:order>`;

    io:println(nsOrder);
}
```
</TabItem>
</Tabs>

## Read & query

Use XML navigation expressions and iteration to extract and process data from XML payloads.

### Navigating XML

WSO2 Integrator provides built-in XML navigation expressions that let you traverse an XML structure without writing loops. These expressions work on the `xml` type directly and return an `xml` value containing the matched nodes.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

**Declare the XML payload**

Click **+** and select **Declare Variable**. Set the **Name** to `items` and the **Type** to `xml`. Enter the sample XML below as the **Expression**. All navigation steps below reference this variable.

```
xml `<items>
    <!--Contents-->
    <book>
        <name>A Study in Scarlet</name>
        <author><name>Arthur Conan Doyle</name></author>
    </book>
    <planner>Daily Planner<kind>day</kind><pages>365</pages></planner>
    <book>
        <name>The Sign of Four</name>
        <author><name>Arthur Conan Doyle</name></author>
    </book>
    <pen><kind>marker</kind><color>blue</color></pen>
</items>`
```

**Navigate the payload**

For each expression, add a **Declare Variable** node, set the **Type** to `xml`, and enter the expression in the **Expression** field.

| Expression | Variable name | Returns |
|---|---|---|
| `items.<items>` | `root` | The `<items>` element itself |
| `items/*` | `allChildren` | All children, including text nodes and comments |
| `items/<book>` | `books` | Both `<book>` direct children |
| `items/<planner\|pen>` | `plannerOrPen` | The `<planner>` and `<pen>` children |
| `items/<*>` | `elementChildren` | All element-type children, excluding text and comments |
| `items/**/<name>` | `allNames` | All `<name>` elements at any depth |
| `items/<book>[0]` | `firstBook` | The first `<book>` child (zero-based index) |

To read the text value of a matched element, chain `.data()` on the expression and set the **Type** to `string`. For example, name the variable `title` and enter `(items/<book>[0]/<name>).data()` to get `A Study in Scarlet`.

**Navigate namespaced elements**

The same navigation expressions work with namespace prefixes. Add the `xmlns` binding to your `.bal` file first (see [Namespaces](#namespaces)), then add a **Declare Variable** node using the prefixed expression in the **Expression** field.

| Expression | Variable name | Returns |
|---|---|---|
| `nsOrder/<cmn:customer>` | `customer` | The `<cmn:customer>` direct child |
| `nsOrder/**/<ord:item>` | `orderItems` | All `<ord:item>` elements at any depth |

</TabItem>

<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;

public function main() {
    xml items = xml `<items>
        <!--Contents-->
        <book>
            <name>A Study in Scarlet</name>
            <author><name>Arthur Conan Doyle</name></author>
        </book>
        <planner>Daily Planner<kind>day</kind><pages>365</pages></planner>
        <book>
            <name>The Sign of Four</name>
            <author><name>Arthur Conan Doyle</name></author>
        </book>
        <pen><kind>marker</kind><color>blue</color></pen>
    </items>`;

    // x.<name> — every element named `items` within `items` itself
    xml root = items.<items>;
    io:println(root);
    // Output: <items><!--Contents--><book>...</book><planner>...</planner><book>...</book><pen>...</pen></items>

    // x/* — all children (elements, text nodes, and comments)
    xml allChildren = items/*;
    io:println(allChildren);
    // Output: <!--Contents--><book>...</book><planner>...</planner><book>...</book><pen>...</pen>

    // x/<name> — every element named `book` in the children of each element in `items`
    xml books = items/<book>;
    io:println(books);
    // Output: <book><name>A Study in Scarlet</name><author><name>Arthur Conan Doyle</name></author></book>
    //         <book><name>The Sign of Four</name><author><name>Arthur Conan Doyle</name></author></book>

    // x/<name1|name2> — every element named `planner` or `pen` in the children
    xml plannerOrPen = items/<planner|pen>;
    io:println(plannerOrPen);
    // Output: <planner>Daily Planner<kind>day</kind><pages>365</pages></planner>
    //         <pen><kind>marker</kind><color>blue</color></pen>

    // x/<*> — every element child (excludes text nodes and comments)
    xml elementChildren = items/<*>;
    io:println(elementChildren);
    // Output: <book>...</book><planner>...</planner><book>...</book><pen>...</pen>

    // x/**/<name> — every element named `name` anywhere in the descendants
    xml allNames = items/**/<name>;
    io:println(allNames);
    // Output: <name>A Study in Scarlet</name><name>Arthur Conan Doyle</name>
    //         <name>The Sign of Four</name><name>Arthur Conan Doyle</name>

    // x/<name>[n] — the element at index n in the matched sequence (zero-based)
    xml firstBook = items/<book>[0];
    io:println(firstBook);
    // Output: <book><name>A Study in Scarlet</name><author><name>Arthur Conan Doyle</name></author></book>

    // Chain .data() to extract the text content of a matched element
    string title = (items/<book>[0]/<name>).data();
    io:println(title);
    // Output: A Study in Scarlet
}
```
</TabItem>
</Tabs>

#### Accessing attributes

WSO2 Integrator provides two ways to read attribute values from an XML element: attribute expressions for concise single-attribute access, and `getAttributes()` when you need the full attribute map.

**Attribute expressions**

Use dot notation directly on an `xml` value to read an attribute by name:

- `check x.attrName` — reads a required attribute. Returns an `error` if the attribute does not exist or if `x` is not a singleton element.
- `check x?.attrName` — reads an optional attribute. Returns `()` if the attribute does not exist.

**`getAttributes()` function**

Call `(<xml:Element>x).getAttributes()` to get a `map<string>` of all attributes on the element, including namespace attributes. Index the map with `["attrName"]` to retrieve a single value as `string?`.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Start by declaring the XML payload. Add a **Declare Variable** node, name it `product`, set the type to `xml`, and enter the sample below as the **Expression**:

```
xml `<para id="greeting" lang="en">Hello</para>`
```

For each attribute read, add another **Declare Variable** node and enter the expression in the **Expression** field.

**Required attribute — `check x.attrName`**

Name the variable `id`, set the type to `string`, and enter `check product.id`.

Output: `greeting`

If the attribute does not exist, this expression returns an error. Use this form when the attribute is guaranteed to be present.

**Optional attribute — `check x?.attrName`**

Name the variable `lang`, set the type to `string?`, and enter `check product?.lang`.

Output: `en`

For an attribute that may be absent, name the variable `sku`, set the type to `string?`, and enter `check product?.sku`.

Output: `()` — the attribute is not on the element, so the result is nil.

**All attributes — `getAttributes()`**

Name the variable `attrs`, set the type to `map<string>`, and enter `(<xml:Element>product).getAttributes()`.

Output: `{"id":"greeting","lang":"en"}`

To read a single value from the map, add another **Declare Variable** node, name it `attrById`, set the type to `string?`, and enter `attrs["id"]`.

Output: `greeting`

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;

public function main() returns error? {
    xml product = xml `<para id="greeting" lang="en">Hello</para>`;

    // Attribute expressions — concise single-attribute access

    // x.attrName — required: errors if the attribute does not exist
    string id = check product.id;
    io:println(id); // Output: greeting

    // x?.attrName — optional: returns () if the attribute does not exist
    string? lang = check product?.lang;
    string? missing = check product?.sku;
    io:println(lang);    // Output: en
    io:println(missing); // Output: ()

    // getAttributes() — returns a map<string> of all attributes at once
    map<string> attrs = (<xml:Element>product).getAttributes();
    io:println(attrs);        // Output: {"id":"greeting","lang":"en"}
    io:println(attrs["id"]);  // Output: greeting
}
```

</TabItem>
</Tabs>

#### Filtering elements by attribute value

XML navigation expressions in WSO2 Integrator do not support attribute-based predicate filtering directly. To filter elements by attribute value, use a query expression over the navigation result. To select by position, use the `[n]` index syntax on the navigation expression.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Filter by attribute value**: Add a **Declare Variable** step and enter a query expression that iterates over a navigation result and filters using the optional attribute expression. For example, to select only `<product>` elements where the `category` attribute equals `"electronics"`:

   ```
   from xml p in catalog/<product>
       let string? category = check p?.category
       where category == "electronics"
       select p
   ```

2. **Select by position**: To get a single element at a known index, use the `[n]` index syntax directly in the expression field. For example, `catalog/<product>[0]` returns the first `<product>` child.

3. **Extract text from the result**: Chain `.data()` on a positional expression to read the text content. For example, `(catalog/<product>[0]/<name>).data()` returns the name of the first product.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;

public function main() returns error? {
    xml catalog = xml `<catalog>
        <product id="P1" category="electronics">
            <name>Widget</name>
            <price>29.99</price>
        </product>
        <product id="P2" category="tools">
            <name>Gadget</name>
            <price>49.99</price>
        </product>
        <product id="P3" category="electronics">
            <name>SmartHub</name>
            <price>89.99</price>
        </product>
    </catalog>`;

    // Filter by attribute value using the optional attribute expression
    xml electronics = from xml p in catalog/<product>
        let string? category = check p?.category
        where category == "electronics"
        select p;
    io:println(electronics);

    // Position-based access: first <product> child (zero-based index)
    xml firstProduct = catalog/<product>[0];
    io:println(firstProduct);

    // Extract text from a positional result
    string firstName = (catalog/<product>[0]/<name>).data();
    io:println(firstName); // Widget
}
```

</TabItem>
</Tabs>

### Iterating over XML sequences

Use `foreach` loops or query expressions to process XML sequences in WSO2 Integrator. XML iteration is useful for reading, filtering, and transforming repeating XML elements such as lists of items, records, or orders.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

**Declare the XML payload**

Add a **Declare Variable** node, name it `x1`, set the type to `xml`, and enter the sample below as the **Expression**:

```
xml `<name>Sherlock Holmes</name>
     <details>
       <author>Sir Arthur Conan Doyle</author>
       <language>English</language>
     </details>`
```

**Add a Foreach node**

Click **+** and select **Foreach** under **Control**. Set the **Collection** to `x1` and the **Variable** name to `item`.

Iterating over `x1` produces two elements in sequence:

1. `<name>Sherlock Holmes</name>`
2. `<details><author>Sir Arthur Conan Doyle</author><language>English</language></details>`

<!-- TODO: Add screenshot of Foreach node configured with x1 -->

**Define the loop body**

Inside the Foreach loop body, add **Declare Variable** nodes to define how each element is processed. For example:

- Enter `item.data()` to read the combined text content of the current element.
- Enter `item/<author>` to navigate into a named child of the current element.
- Enter `(<xml:Element>item).getName()` to get the element tag name.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;

public function main() returns error? {
    xml x1 = xml `<name>Sherlock Holmes</name>
                  <details>
                    <author>Sir Arthur Conan Doyle</author>
                    <language>English</language>
                  </details>`;

    // Iterate over the element items in the sequence.
    // x1.elements() produces two elements: <name> and <details>.
    foreach xml item in x1.elements() {
        io:println(item);
    }
    // Output (iteration 1): <name>Sherlock Holmes</name>
    // Output (iteration 2): <details><author>Sir Arthur Conan Doyle</author><language>English</language></details>

    // Inside the loop body, use navigation and langlib functions to manipulate each element.
    foreach xml item in x1.elements() {
        string tagName = (<xml:Element>item).getName();
        string content = item.data();
        io:println(string `[${tagName}] ${content}`);
    }
    // Output (iteration 1): [name] Sherlock Holmes
    // Output (iteration 2): [details] Sir Arthur Conan DoyleEnglish
}
```

</TabItem>
</Tabs>

## Transform

Apply programmatic edits, XSLT stylesheets, and type conversions to reshape XML payloads into the form your integration requires.

### Modifying XML

You can mutate XML elements in place and concatenate XML sequences to build up payloads incrementally.

#### Mutating XML elements

Use `setChildren` to replace the child elements of an element, and `setName` to rename the element itself. Both operations modify the element in place.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

**Declare the XML element**

Add a **Declare Variable** node, name it `x1`, set the type to `xml:Element`, and enter the sample below as the **Expression**:

```
xml `<details>
       <author>Sir Arthur Conan Doyle</author>
       <language>English</language>
     </details>`
```

**Replace child elements with setChildren**

Click **+** and select **Call Function**. Search for `setChildren` and select it from the `lang.xml` module. Set the target to `x1` and the replacement to the new child XML:

| Parameter | Value |
|---|---|
| `self` | `x1` |
| `children` | `xml \`<language>French</language>\`` |

After this call, `x1` holds `<details><language>French</language></details>`.

<!-- TODO: Add screenshot of Call Function panel with setChildren configured -->

**Rename the element with setName**

Click **+** and add another **Call Function** step. Search for `setName` and select it. Set the target to `x1` and the new name:

| Parameter | Value |
|---|---|
| `self` | `x1` |
| `name` | `"updatedDetails"` |

After this call, `x1` holds `<updatedDetails><language>French</language></updatedDetails>`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;

public function main() {
    xml:Element x1 = xml `<details>
                            <author>Sir Arthur Conan Doyle</author>
                            <language>English</language>
                          </details>`;

    // Replace the child elements.
    x1.setChildren(xml `<language>French</language>`);
    io:println(x1);
    // Output: <details><language>French</language></details>

    // Rename the element.
    x1.setName("updatedDetails");
    io:println(x1);
    // Output: <updatedDetails><language>French</language></updatedDetails>
}
```

</TabItem>
</Tabs>

#### Concatenating XML

Use the `+` operator to join two XML values into a single sequence. This is useful when building a payload from multiple parts.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

**Declare the two XML values**

Add two **Declare Variable** nodes:

- Name: `x1`, type: `xml`, expression: `xml \`<name>Sherlock Holmes</name>\``
- Name: `x2`, type: `xml:Element`, expression: `xml \`<details><author>Sir Arthur Conan Doyle</author><language>English</language></details>\``

**Concatenate into a new variable**

Add a **Declare Variable** node, name it `x3`, set the type to `xml`, and enter `x1 + x2` as the expression.

The resulting `x3` is a sequence containing both elements:

```xml
<name>Sherlock Holmes</name><details><author>Sir Arthur Conan Doyle</author><language>English</language></details>
```

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;

public function main() {
    xml x1 = xml `<name>Sherlock Holmes</name>`;
    xml:Element x2 = xml `<details>
                            <author>Sir Arthur Conan Doyle</author>
                            <language>English</language>
                          </details>`;

    // Use + or .concat() to join two XML sequences.
    xml x3 = x1 + x2;
    io:println(x3);
    // Output: <name>Sherlock Holmes</name><details><author>Sir Arthur Conan Doyle</author><language>English</language></details>
}
```

</TabItem>
</Tabs>

### XSLT transformation

Use XSLT to transform XML into another XML, HTML, or plain text format using an XSL stylesheet. The example below transforms a song catalog XML into an HTML table.
WSO2 Integrator supports XSLT version 1.0.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

**Declare the source XML**

Add a **Declare Variable** node, name it `sourceXml`, set the type to `xml`, and enter the source XML as the expression:

```
xml `<samples>
       <song>
         <title>Summer of 69</title>
         <artist>Bryan Adams</artist>
         <country>Canada</country>
         <year>1984</year>
       </song>
       <song>
         <title>Zombie</title>
         <artist>Bad Wolves</artist>
         <country>USA</country>
         <year>2018</year>
       </song>
     </samples>`
```

**Declare the XSL stylesheet**

Add another **Declare Variable** node, name it `xsl`, set the type to `xml`, and enter the stylesheet as the expression:

```
xml `<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <xsl:template match="/">
         <html><body>
           <h2>All time favourites</h2>
           <table border="1">
             <tr bgcolor="#9acd33"><th>Title</th><th>Artist</th></tr>
             <xsl:for-each select="samples/song">
               <tr>
                 <td><xsl:value-of select="title"/></td>
                 <td><xsl:value-of select="artist"/></td>
               </tr>
             </xsl:for-each>
           </table>
         </body></html>
       </xsl:template>
     </xsl:stylesheet>`
```

**Add the transform step**

Click **+** and select **Call Function**. In the search box, type `transform xslt` and select **transform** from the results. In the configuration panel, set the fields:

| Field | Value |
|---|---|
| **Input** | `sourceXml` |
| **Xsl** | `xsl` |
| **Result** | `transformedXml` |
| **Result Type** | `xml` |

![Visual designer showing two Declare Variable nodes for sourceXml and xsl, with the xslt transform configuration panel open on the right](/img/develop/transform/xml/xslt-transform.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;
import ballerina/xslt;

public function main() returns error? {
    xml sourceXml = getXml();
    xml xsl = getXsl();
    xml target = check xslt:transform(sourceXml, xsl);
    io:println("Transformed XML: ", target);
}

function getXml() returns xml {
    return xml `<samples>
                    <song>
                        <title>Summer of 69</title>
                        <artist>Bryan Adams</artist>
                        <country>Canada</country>
                        <year>1984</year>
                    </song>
                    <song>
                        <title>Zombie</title>
                        <artist>Bad Wolves</artist>
                        <country>USA</country>
                        <year>2018</year>
                    </song>
                </samples>`;
}

function getXsl() returns xml {
    return xml `<xsl:stylesheet version="1.0"
                                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
                    <xsl:template match="/">
                        <html>
                            <body>
                                <h2>All time favourites</h2>
                                <table border="1">
                                    <tr bgcolor="#9acd33">
                                        <th>Title</th>
                                        <th>Artist</th>
                                    </tr>
                                    <xsl:for-each select="samples/song">
                                        <tr>
                                            <td><xsl:value-of select="title"/></td>
                                            <td><xsl:value-of select="artist"/></td>
                                        </tr>
                                    </xsl:for-each>
                                </table>
                            </body>
                        </html>
                    </xsl:template>
                </xsl:stylesheet>`;
}
```

</TabItem>
</Tabs>

### XML to record

Parse XML into a typed Ballerina record for type-safe field access and easier manipulation inside your integration flow.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

**Generate record types from XML**

In the **Project Overview** panel, click **+** next to **Types**. In the **New Type** panel that opens, switch to the **Import** tab. Set the **Format** to **XML**, paste the sample XML below into the editor, and click **Import**. WSO2 Integrator generates the `PurchaseOrder`, `ShipTo`, and `Item` record types automatically.

```xml
<PurchaseOrder orderDate="2025-03-15">
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
</PurchaseOrder>
```

![New Type panel showing the Import tab with XML format selected and the purchase order XML pasted into the editor](/img/develop/transform/xml/import-xml-type.png)

**Declare the XML variable**

Add a **Declare Variable** node, name it `product`, set the type to `xml`, and enter the same sample XML above as the expression.

**Call parseAsType**

Click **+** and select **Call Function**. Search for `xml` and select **parseAsType** under the **data.xmldata** section. In the configuration panel, set the fields:

| Field | Description | Value |
|---|---|---|
| **V** | The source XML value to convert | `product` |
| **T** | The target record type | `PurchaseOrder` |
| **Result** | Name of the result variable | `orders` |

![Flow designer showing the Declare Variable node for the product XML and the parseAsType configuration panel with PurchaseOrder as the target type](/img/develop/transform/xml/parse-as-type.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use the following sample XML to generate the record types. In the **Project Overview** panel, click **+** next to **Types**, switch to the **Import** tab, select **XML** as the format, paste the XML below, and click **Import**.

```xml
<PurchaseOrder orderDate="2025-03-15">
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
</PurchaseOrder>
```

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
    xml product = xml `<PurchaseOrder orderDate="2025-03-15">
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
    </PurchaseOrder>`;

    PurchaseOrder orders = check xmldata:parseAsType(product);
    io:println(orders.shipTo.name); // Acme Corp
}
```


</TabItem>
</Tabs>

### Parsing XML from strings, bytes, and streams

When XML arrives as a raw string, a byte array, or a byte stream (for example, from an HTTP request body or a file), use the corresponding parse function instead of `parseAsType`:

| Function | Input type | Use when |
|---|---|---|
| `parseString` | `string` | XML is received as a text string |
| `parseBytes` | `byte[]` | XML is received as a byte array |
| `parseStream` | `stream<byte[], error?>` | XML is received as a streaming byte source |

All three functions accept the same target record type and return the same typed result as `parseAsType`. The examples below use the `PurchaseOrder` types from the [XML to record](#xml-to-record) section.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Use the `PurchaseOrder` record types generated in the [XML to record](#xml-to-record) section. Click **+** and select **Call Function**. Search for the function name (`parseString`, `parseBytes`, or `parseStream`) and select it under the **data.xmldata** section. In the configuration panel, set the fields:

| Field | Description | Value |
|---|---|---|
| **S** | The source value (string, byte array, or byte stream) | Your source variable |
| **T** | The target record type | `PurchaseOrder` |
| **Result** | Name of the result variable | `orders` |

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.xmldata;
import ballerina/io;

// Uses the PurchaseOrder, ShipTo, and Item types from the XML to record section.

public function main() returns error? {
    string xmlString = string `<PurchaseOrder orderDate="2025-03-15">
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
    </PurchaseOrder>`;

    // Parse from a string
    PurchaseOrder fromString = check xmldata:parseString(xmlString);
    io:println(fromString.shipTo.name); // Acme Corp

    // Parse from a byte array
    byte[] xmlBytes = xmlString.toBytes();
    PurchaseOrder fromBytes = check xmldata:parseBytes(xmlBytes);
    io:println(fromBytes.shipTo.name); // Acme Corp

    // Parse from a byte stream
    stream<byte[], io:Error?> xmlStream = check io:fileReadBlocksAsStream("order.xml");
    PurchaseOrder fromStream = check xmldata:parseStream(xmlStream);
    io:println(fromStream.shipTo.name); // Acme Corp
}
```

</TabItem>
</Tabs>

### XML to JSON

Converting XML to JSON is a two-step process: first parse the XML into a typed record, then convert the record to JSON using `toJson()`.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

**Step 1: Convert XML to a record**

Follow the steps in [XML to record](#xml-to-record) to parse your XML value into a typed record.

**Step 2: Convert the record to JSON**

Click **+** and select **Call Function**. Search for `toJson` and select **toJson** under the **lang.value** section. In the configuration panel, set the fields:

| Field | Description | Value |
|---|---|---|
| **V** | The record value to convert | `orders` |
| **Result** | Name of the result variable | `ordersJson` |
| **Result Type** | Type of the result variable | `json` |

![Flow designer showing the parseAsType and toJson steps with the lang.value toJson configuration panel open on the right](/img/develop/transform/xml/to-json.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.xmldata;
import ballerina/io;

public function main() returns error? {
    xml customers = xml `<customer>
        <name>Acme Corp</name>
        <email>info@acme.com</email>
    </customer>`;

    // Parse XML into a typed record.
    record {|
        string name;
        string email;
    |} customer = check xmldata:parseAsType(customers);

    // Convert the record to JSON.
    json customerJson = customer.toJson();
    io:println(customerJson);

    // Convert JSON back to XML.
    xml result = check xmldata:fromJson(customerJson);
    io:println(result);
}
```


</TabItem>
</Tabs>

### Record to XML

Convert a Ballerina record into XML when generating XML payloads for external systems or XML-based integrations.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

**Create the record types**

Navigate to **Types** in the sidebar and click **+** to create the following two record types. For more information, see [Types](../integration-artifacts/supporting/types.md).

Create an `Item` type with these fields:

| Field name | Type |
|---|---|
| `itemCode` | `string` |
| `count` | `int` |

Create an `Invoice` type with these fields:

| Field name | Type | Optional |
|---|---|---|
| `id` | `int` | No |
| `items` | `Item[]` | No |
| `xmlns` | `string` | No |
| `status` | `string` | Yes |

**Add annotations in the source**

Open the generated `.bal` file for the types and add `xmldata` annotations to control namespaces and which fields become XML attributes. Replace the generated type definitions with the complete annotated versions from the **Ballerina Code** tab.

**Declare the record variable**

Add a **Declare Variable** node, name it `data`, set the type to `Invoice`, and enter the record value as the expression:

```
{id: 1, items: [{itemCode: "223345", count: 1}, {itemCode: "223300", count: 7}], status: "paid"}
```

**Call toXml**

Click **+** and select **Call Function**. Search for `toXml` and select **toXml** under the **xmldata** section. In the configuration panel, set the fields:

| Field | Description | Value |
|---|---|---|
| **Map Value** | The record value to convert | `data` |
| **Result** | Name of the result variable | `result` |
| **Result Type** | Type of the result variable | `xml` |

![Flow designer showing the Declare Variable node for the Invoice data and the xmldata toXml configuration panel open on the right](/img/develop/transform/xml/to-xml.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/io;
import ballerina/xmldata;

@xmldata:Namespace {
    prefix: "ns",
    uri: "http://sdf.com"
}
type Invoice record {
    int id;
    Item[] items;
    @xmldata:Attribute
    string 'xmlns = "example.com";
    @xmldata:Attribute
    string status?;
};

@xmldata:Namespace {
    uri: "http://example1.com"
}
type Item record {
    string itemCode;
    int count;
};

public function main() returns error? {
    Invoice data = {
        id: 1,
        items: [
            {itemCode: "223345", count: 1},
            {itemCode: "223300", count: 7}
        ],
        status: "paid"
    };

    xml result = check xmldata:toXml(data);
    io:println(result);
}
```


</TabItem>
</Tabs>

## Validate

Verify incoming XML payloads against schema definitions and handle XML-specific errors to keep your integration flows reliable.

### XSD schema validation

Validate XML payloads against an XSD schema to enforce structural contracts at integration boundaries. Schema validation is most useful when consuming payloads from external partners, exposing XML-based APIs, or enforcing data integrity before processing.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Add the XSD file to your project**: Place the `.xsd` file in the `resources` directory of your integration project (for example, `resources/order-schema.xsd`). WSO2 Integrator includes project resources when building the integration.

2. **Add a Call Function step**: In the flow designer, click **+** and select **Call Function**. Search for `validate` and select it from the `data.xmldata` module.

3. **Configure the validation inputs**:

   | Field | Description |
   |---|---|
   | **XML value** | The `xml` variable to validate |
   | **Schema source** | Path to the `.xsd` file within the project resources |
   | **Result variable** | A variable to capture the validation outcome (`boolean` on success, `xmldata:Error` on failure) |

4. **Handle the result**: Add a conditional step after the function call. If validation passes, the function returns `true` and the flow continues. If validation fails, it returns an `xmldata:Error` with details about the schema violation.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.xmldata;
import ballerina/io;

public function main() returns error? {
    xml validOrder = xml `<Order>
        <orderId>ORD-5001</orderId>
        <customer>Acme Corp</customer>
        <total>250.00</total>
    </Order>`;

    xml invalidOrder = xml `<Order>
        <customer>Acme Corp</customer>
        <total>250.00</total>
    </Order>`;

    string schemaPath = "resources/order-schema.xsd";

    // Passing validation — orderId is present
    boolean|xmldata:Error validResult = xmldata:validate(validOrder, schemaPath);
    if validResult is boolean {
        io:println("Validation passed");
    }

    // Failing validation — orderId is missing (required by schema)
    boolean|xmldata:Error invalidResult = xmldata:validate(invalidOrder, schemaPath);
    if invalidResult is xmldata:Error {
        io:println("Validation failed: ", invalidResult.message());
        // Example output: cvc-complex-type.2.4.a: Invalid content was found
        // starting with element 'customer'. One of '{orderId}' is expected.
    }
}
```

<!-- TODO: verify this compiles with bal build -->


</TabItem>
</Tabs>


## What's next

- [JSON Processing](json.md) - Parse, construct, transform, and validate JSON data
- [Visual Data Mapper](../integration-artifacts/supporting/data-mapper/data-mapper.md) - Map fields between record types visually
- [Types](../integration-artifacts/supporting/types.md) - Define record types for type-safe data handling
