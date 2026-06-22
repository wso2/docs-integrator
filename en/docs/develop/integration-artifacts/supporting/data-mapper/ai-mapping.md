---
sidebar_position: 9
title: AI Data Mapping
description: Generate transformation code between data structures with AI-powered field mapping.
keywords: [wso2 integrator, data mapper, ai data mapping, auto map, field mapping, transformation]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AI Data Mapping

The AI Data Mapper uses AI to generate mappings between data structures, without manual field-by-field matching. It is especially useful for large or complex schemas with hundreds of fields, deeply nested records, or domain-specific formats.

For the Data Mapper editor and manual mapping, see [Data Mapper editor](../../../understand-ide/editors/datamapper-editor.md).

## How to use


<Tabs>
<TabItem value="ui" label="Visual designer" default>

1. Define the input and output record types in the **Types** panel. Define inner records first, then compose them into the parent input and output records. For details on creating records, see [Type editor](../../../understand-ide/editors/type-editor.md).

    ![Types canvas with child record cards visible, and the New Type panel open for defining a parent record that references them](/img/develop/integration-artifacts/supporting/data-mapper/ai-data-mapper-define-personal-profile.png)

2. Create the data mapper. Under **Data Mappers** in the project explorer, select **+**. Set a name, add the input type with a parameter name, set the output type, and select **Create**.

    ![Create New Data Mapper form with fields for data mapper name, input type with parameter name, and output type](/img/develop/integration-artifacts/supporting/data-mapper/ai-data-mapper-create-form.png)

3. The Data Mapper editor opens with the input schema on the left and the output schema on the right.

    ![Data Mapper canvas with the input schema on the left and the output schema on the right with no mappings](/img/develop/integration-artifacts/supporting/data-mapper/ai-data-mapper-canvas.png)

4. In the top-right corner of the canvas, select **Auto Map**. The WSO2 Integrator Copilot panel opens alongside the canvas with the `/datamap` command preloaded.

    ![WSO2 Integrator Copilot panel open alongside the Data Mapper canvas with the /datamap command preloaded in the input field](/img/develop/integration-artifacts/supporting/data-mapper/ai-data-mapper-copilot-command.png)

5. Submit the command. The Copilot reads the project files, generates field mappings based on the input and output types, and integrates them into your workspace. When complete, mapping lines appear between the matched fields on the canvas.

    ![Data Mapper canvas with generated field mapping lines connecting the input and output fields, with the completion message in the Copilot panel](/img/develop/integration-artifacts/supporting/data-mapper/ai-data-mapper-result.png)

</TabItem>
<TabItem value="code" label="Ballerina code">

<h2>Define data types</h2>

Define the input and output record types in `types.bal`:

```ballerina
type Student record {
    int id;
    string studentName;
    int age;
    string gender;
    string[] semesterGPA;
    string academicMajor;
    Student[] roommates;
    string address;
};

type PersonalProfile record {
    int id;
    Bio bio;
    AcademicRecord academicRecord;
    Accommodation accommodationDetails;
};

type Bio record {
    string name;
    string gender;
    int age;
};

type AcademicRecord record {
    string major;
    string[] semesterGPA;
};

type Accommodation record {
    int numberOfRoommates;
    string address;
};
```

<h2>Define the data mapper function</h2>

Define the `transform` function stub in `data_mappings.bal`:

```ballerina
function transform(Student student) returns PersonalProfile => {};
```

Select **Visualize** above the `transform` function to open it in the Data Mapper editor. In the editor, select **Auto Map** to generate the field mappings. The function is updated with the generated implementation:

```ballerina
function transform(Student student) returns PersonalProfile => {
    id: student.id,
    bio: {name: student.studentName, gender: student.gender, age: student.age},
    academicRecord: {major: student.academicMajor, semesterGPA: student.semesterGPA},
    accommodationDetails: {numberOfRoommates: student.roommates.length(), address: student.address}
};
```

</TabItem>
</Tabs>

## Features

### Automated mapping generation

Mapping generation takes into account:

- Field names and naming conventions
- Semantic relationships between fields
- Nested data structures
- Array types and cardinality
- Optional and nullable fields
- Domain-specific patterns such as those common in healthcare contexts

### Advanced expression generation

The AI Data Mapper handles complex transformation scenarios:

- **Parsing and conversion**: Parsing such as parsing a string as an integer, and converting a value of one type to another.
- **Optional field handling**: Handling fields that may or may not be present.
- **Nested record transformation**: Deep structure mapping with proper path navigation.
- **Array-to-array mappings**: Member-wise transformations with appropriate iteration logic.

### Supporting documentation to improve accuracy

Upload reference materials to improve mapping accuracy. While schema-only analysis is supported, providing additional documentation helps the system understand field relationships and business rules.

Supported formats:

- PDF documents
- Images (JPEG, JPG, PNG)
- CSV files
- Text files

For complex mapping scenarios involving large schemas or domain-specific requirements captured in multiple documents, upload all of them. The system analyzes all the documentation to generate accurate, context-aware transformations.

### Sub-mapping reuse

The AI Data Mapper detects existing data mappers in your codebase and reuses them where applicable. This reduces code duplication, ensures consistent transformation logic, and keeps the codebase compact.

### Function extraction for large schemas

For mappings with a large number of fields (hundreds to thousands of fields), Copilot extracts helper functions to maintain code readability and comply with language server constraints. Complex transformations involving union types, deeply nested structures, and array-to-array operations are automatically decomposed into reusable functions.

## Responsible use

Large language models can produce unexpected results when processing highly domain-specific or atypical schema patterns. Follow these practices to ensure accuracy:

- Review all generated mappings before deploying to production.
- Test with representative data samples that reflect actual use cases.
- Verify that the generated transformation logic aligns with your business requirements.
- Provide feedback on incorrect or incomplete mappings to support continuous improvement.

## What's next

- [Data Mapper editor](../../../understand-ide/editors/datamapper-editor.md) — Open, configure, and work with the visual mapping canvas.
- [Data mapper](./data-mapper.md) — End-to-end guide to creating and using data mappers.
- [Expression editor](../../../understand-ide/editors/expression-editor.md) — Write custom expressions for individual field mappings.
