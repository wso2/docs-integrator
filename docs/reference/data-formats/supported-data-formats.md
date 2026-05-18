---
title: Supported Data Formats
---

# Supported Data Formats

WSO2 Integrator, powered by Ballerina, provides built-in support for a comprehensive set of data formats used in integration scenarios. Ballerina's type system enables type-safe parsing, transformation, and serialization across all formats.

## Data format reference

| Format | Module(s) | Read | Write | Streaming | Description |
|--------|-----------|------|-------|-----------|-------------|
| [JSON](json.md) | Built-in, `ballerina/data.jsondata` | Yes | Yes | Yes | Native JSON type with direct language support |
| [XML](xml.md) | Built-in, `ballerina/data.xmldata` | Yes | Yes | Yes | Native XML type with XPath-like navigation |
| [CSV](csv.md) | `ballerina/data.csv` | Yes | Yes | Yes | Comma-separated values with configurable delimiters |
| [EDI](edi.md) | `ballerina/edi` | Yes | Yes | No | X12, EDIFACT, and custom EDI formats |
| [YAML](yaml.md) | `ballerina/yaml` | Yes | Yes | No | YAML data serialization |
| [TOML](toml.md) | `ballerina/toml` | Yes | Yes | No | TOML configuration format |
| [Protocol Buffers](protocol-buffers.md) | `ballerina/protobuf` | Yes | Yes | Yes | Binary serialization via gRPC |
| [Avro](avro.md) | `ballerina/avro` | Yes | Yes | Yes | Apache Avro binary format |
| [FHIR](fhir.md) | `ballerinax/health.fhir.r4` | Yes | Yes | No | HL7 FHIR R4 healthcare resources |
| [HL7](hl7.md) | `ballerinax/health.hl7v2` | Yes | Yes | No | HL7 v2 pipe-delimited healthcare messages |

## Format conversion matrix

Common format-to-format transformation patterns supported in WSO2 Integrator:

| From | To | Approach |
|------|-----|----------|
| JSON | XML | `xmldata:fromJson()` or data mapper |
| XML | JSON | `xmldata:toJson()` or data mapper |
| JSON | CSV | `csv:toBytes()` via record binding |
| CSV | JSON | `csv:parseString()` then `.toJson()` |
| EDI | JSON | Generated EDI types then `.toJson()` |
| JSON | EDI | JSON to record then `toEdiString()` |
| HL7 | FHIR | `health.fhir.r4` transformation APIs |
| JSON | Avro | `avroSchema.toAvro()` |
| Avro | JSON | `avroSchema.fromAvro()` then `.toJson()` |

## See also

- [Data Transformation - JSON](../../develop/transform/json.md) -- JSON transformation guide
- [Data Transformation - XML](../../develop/transform/xml.md) -- XML transformation guide
- [Data Transformation - CSV](../../develop/transform/csv-flat-file.md) -- CSV processing guide
- [Data Transformation - EDI](../../develop/transform/edi.md) -- EDI processing guide
- [Ballerina API Documentation](../api/ballerina-documentation.md) -- Full API docs for all modules
