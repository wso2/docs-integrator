import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import { connectorVersionedDocs } from './src/utils/sidebarUtils';

/**
 * WSO2 Integrator Documentation — Sidebar Configuration
 *
 * Structure follows the Documentation Blueprint (March 2026).
 * Seven top-level sections answering seven developer questions:
 *
 *   Get Started       — "I'm new — what is this and how do I begin?"
 *   Develop           — "How do I build, transform, and test X?"
 *   Connectors        — "Can I connect to Y?"
 *   GenAI             — "How do I build AI agents, RAG, or MCP?"
 *   Tutorials         — "Show me a complete, real example"
 *   Deploy            — "How do I ship, run, and secure this?"
 *   Manage            — "How do I set up and manage ICP?"
 *   Reference         — "What's the exact syntax / config / API for Z?"
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    // ─────────────────────────────────────────────
    // GET STARTED
    // "I'm new — what is this and how do I begin?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Get started',
      collapsed: true,
      link: { type: 'doc', id: 'get-started/overview-and-architecture' },
      items: [
        'get-started/overview-and-architecture',
        'get-started/why',
        'get-started/key-concepts',
        {
          type: 'category',
          label: 'Set up',
          link: { type: 'doc', id: 'get-started/setup/overview' },
          items: [
            'get-started/setup/local-setup',
            'get-started/setup/sign-up-sign-in',
            'get-started/setup/cloud-setup',
          ],
        },
        {
          type: 'category',
          label: 'Quick starts',
          items: [
            'get-started/build-automation',
            'get-started/build-ai-agent',
            'get-started/build-api-integration',
            'get-started/build-event-driven-integration',
            'get-started/build-file-driven-integration',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DEVELOP
    // "How do I build, transform, and test X?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Develop',
      collapsed: true,
      link: { type: 'doc', id: 'develop/develop' },
      items: [
        // 6.1 Create Integrations
        {
          type: 'category',
          label: 'Create Integrations',
          items: [
            'develop/create-integrations/create-a-new-integration',
            'develop/create-integrations/open-existing-integration',
            'develop/create-integrations/explore-sample-integrations',
            'develop/create-integrations/create-a-library',
            'develop/create-integrations/create-a-project',
            'develop/create-integrations/open-a-project',
            'develop/create-integrations/migrate-third-party-integrations',
          ],
        },
        // 6.2 Understand the IDE
        {
          type: 'category',
          label: 'Understand the IDE',
          link: { type: 'doc', id: 'develop/understand-ide/understand-ide' },
          items: [
            'develop/understand-ide/integrator-app',
            {
              type: 'category',
              label: 'Views',
              items: [
                'develop/understand-ide/views/project-view',
                'develop/understand-ide/views/integration-view',
                'develop/understand-ide/views/library-view',
              ],
            },
            {
              type: 'category',
              label: 'Editors',
              items: [
                {
                  type: 'category',
                  label: 'Flow Diagram editor',
                  link: { type: 'doc', id: 'develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor' },
                  items: [
                    'develop/understand-ide/editors/flow-diagram-editor/connections',
                    'develop/understand-ide/editors/flow-diagram-editor/statement',
                    'develop/understand-ide/editors/flow-diagram-editor/control',
                    'develop/understand-ide/editors/flow-diagram-editor/ai',
                    'develop/understand-ide/editors/flow-diagram-editor/error-handling',
                    'develop/understand-ide/editors/flow-diagram-editor/concurrency',
                    'develop/understand-ide/editors/flow-diagram-editor/logging',
                    'develop/understand-ide/editors/flow-diagram-editor/show-more-functions',
                  ],
                },
                'develop/understand-ide/editors/service-design-editor',
                'develop/understand-ide/editors/expression-editor',
                'develop/understand-ide/editors/type-editor',
                'develop/understand-ide/editors/type-diagram-editor',
                'develop/understand-ide/editors/configure-editor',
                'develop/understand-ide/editors/datamapper-editor',
                'develop/understand-ide/editors/graphql-editor',
              ],
            },
          ],
        },
        // 6.3 Integration Artifacts
        {
          type: 'category',
          label: 'Integration artifacts',
          link: { type: 'doc', id: 'develop/integration-artifacts/integration-artifacts' },
          items: [
            'develop/integration-artifacts/automation',
            {
              type: 'category', label: 'Integration as API',
              collapsed: true,
              items: [
                'develop/integration-artifacts/service/http',
                'develop/integration-artifacts/service/graphql',
                'develop/integration-artifacts/service/tcp',
                'develop/integration-artifacts/service/websocket',
                'develop/integration-artifacts/service/websub-hub',
                'develop/integration-artifacts/service/grpc',
              ],
            },
            {
              type: 'category', label: 'Event-driven integration',
              collapsed: true,
              items: [
                'develop/integration-artifacts/event/kafka',
                'develop/integration-artifacts/event/rabbitmq',
                'develop/integration-artifacts/event/mqtt',
                'develop/integration-artifacts/event/azure-service-bus',
                'develop/integration-artifacts/event/pop3imap4',
                'develop/integration-artifacts/event/salesforce-events',
                'develop/integration-artifacts/event/twilio',
                'develop/integration-artifacts/event/github-webhooks',
                'develop/integration-artifacts/event/solace',
                'develop/integration-artifacts/event/cdc-mssql',
                'develop/integration-artifacts/event/cdc-postgresql',
              ],
            },
            {
              type: 'category', label: 'File-driven integration',
              collapsed: true,
              items: [
                {
                  type: 'category', label: 'Remote Servers (FTP/SFTP)',
                  collapsed: true,
                  link: { type: 'doc', id: 'develop/integration-artifacts/file/ftp-sftp' },
                  items: [
                    'develop/integration-artifacts/file/high-availability-and-coordination',
                    'develop/integration-artifacts/file/dependency-and-trigger-conditions',
                    'develop/integration-artifacts/file/streaming-large-files',
                    'develop/integration-artifacts/file/csv-fault-tolerance',
                  ],
                },
                'develop/integration-artifacts/file/local-files',
              ],
            },
            {
              type: 'category', label: 'Other artifacts',
              collapsed: true,
              items: [
                'develop/integration-artifacts/supporting/types',
                'develop/integration-artifacts/supporting/connections',
                'develop/integration-artifacts/supporting/configurations',
                'develop/integration-artifacts/supporting/functions',
                {
                  type: 'category',
                  label: 'Data mapper',
                  collapsed: true,
                  link: { type: 'doc', id: 'develop/integration-artifacts/supporting/data-mapper/data-mapper' },
                  items: [
                    {
                      type: 'category',
                      label: 'Access paths',
                      collapsed: true,
                      link: { type: 'doc', id: 'develop/integration-artifacts/supporting/data-mapper/access-paths/access-paths' },
                      items: [
                        'develop/integration-artifacts/supporting/data-mapper/access-paths/reusable',
                        'develop/integration-artifacts/supporting/data-mapper/access-paths/inline',
                      ],
                    },
                    'develop/integration-artifacts/supporting/data-mapper/mapping-capabilities',
                    {
                      type: 'category',
                      label: 'Array mappings',
                      collapsed: true,
                      link: { type: 'doc', id: 'develop/integration-artifacts/supporting/data-mapper/array-mappings/array-mappings' },
                      items: [
                        'develop/integration-artifacts/supporting/data-mapper/array-mappings/array-to-array',
                        'develop/integration-artifacts/supporting/data-mapper/array-mappings/array-to-single-value',
                      ],
                    },
                    'develop/integration-artifacts/supporting/data-mapper/generic-type-mappings',
                    'develop/integration-artifacts/supporting/data-mapper/submappings',
                  ],
                },
              ],
            },
          ],
        },
        // 6.4 Design Integration Logic
        {
          type: 'category',
          label: 'Design integration logic',
          items: [
            'develop/design-logic/design-logic',
            'develop/design-logic/visual-flow-designer',
            'develop/design-logic/managing-connections',
            'develop/design-logic/control-flow',
            'develop/design-logic/error-handling',
            'develop/design-logic/expressions',
            'develop/design-logic/query-expressions',
            'develop/design-logic/configuration-management',
            'develop/design-logic/functions',
            'develop/design-logic/ballerina-pro-code',
            'develop/design-logic/java-interoperability',
          ],
        },
        // 6.5 Transform (per blueprint)
        {
          type: 'category',
          label: 'Transform',
          items: [
            'develop/transform/json',
            'develop/transform/xml',
            'develop/transform/csv-flat-file',
            'develop/transform/edi',
            'develop/transform/pdf',
            'develop/transform/yaml-toml',
            'develop/transform/type-system',
            'develop/transform/query-expressions',
            'develop/transform/expressions-functions',
          ],
        },
        // Develop with Copilot
        {
          type: 'category',
          label: 'WSO2 Integrator Copilot',
          items: [
            'develop/copilot/getting-started',
            'develop/copilot/overview',
          ],
        },
        // 6.6 Try & Test
        {
          type: 'category',
          label: 'Test',
          link: { type: 'doc', id: 'develop/test/overview' },
          items: [
            {
              type: 'category',
              label: 'Try-It tool',
              link: { type: 'doc', id: 'develop/test/built-in-try-it-tool' },
              items: [
                'develop/test/try-it-http',
                'develop/test/try-it-graphql',
                'develop/test/try-it-chat',
                'develop/test/try-it-mcp',
              ],
            },
            {
              type: 'category',
              label: 'Test Explorer',
              link: { type: 'doc', id: 'develop/test/test-explorer' },
              items: [
                'develop/test/unit-testing',
                'develop/test/configure-tests',
                'develop/test/services-clients',
                'develop/test/data-driven-tests',
                'develop/test/groups',
                'develop/test/mocking',
                'develop/test/execute-tests',
                'develop/test/code-coverage-and-reports',
              ],
            },
            'develop/test/ai-generated-cases',
          ],
        },
        // 6.7 Debugging & Troubleshooting
        {
          type: 'category',
          label: 'Debugging & Troubleshooting',
          items: [
            'develop/debugging/troubleshooting',
            'develop/debugging/errors-and-stack-traces',
            'develop/debugging/library-troubleshooting',
            'develop/debugging/deployment-troubleshooting',
            'develop/debugging/editor',
            'develop/debugging/remote',
            'develop/debugging/strand-dump-analysis',
            'develop/debugging/performance-profiling',
            'develop/debugging/logging',
          ],
        },
        // 6.8 Tools
        {
          type: 'category',
          label: 'Tools',
          link: { type: 'doc', id: 'develop/tools/tools' },
          items: [
            {
              type: 'category',
              label: 'Integration Tools',
              collapsed: true,
              items: [
                'develop/tools/integration-tools/openapi-tool',
                'develop/tools/integration-tools/graphql-tool',
                'develop/tools/integration-tools/asyncapi-tool',
                'develop/tools/integration-tools/grpc-tool',
                'develop/tools/integration-tools/health-tool',
                'develop/tools/integration-tools/edi-tool',
                'develop/tools/integration-tools/wsdl-tool',
                'develop/tools/integration-tools/xsd-tool',
                'develop/tools/integration-tools/persist-tool',
              ],
            },
            {
              type: 'category',
              label: 'Migration Tools',
              link: { type: 'doc', id: 'develop/tools/migration-tools/migration-tools' },
              collapsed: true,
              items: [
                'develop/tools/migration-tools/migrate-from-mulesoft',
                'develop/tools/migration-tools/migrate-from-tibco-businessworks',
                'develop/tools/migration-tools/migrate-from-azure-logic-apps',
              ],
            },
            {
              type: 'category',
              label: 'Other',
              collapsed: true,
              items: [
                'develop/tools/other/scan-tool',
              ],
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // CONNECTORS
    // "Can I connect to Y?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Connectors',
      collapsed: true,
      link: { type: 'doc', id: 'connectors/overview' },
      items: [
    // ── Connector Catalog ──
    {
      type: 'category',
      label: 'Connector catalog',
      collapsed: true,
      link: { type: 'doc', id: 'connectors/catalog/index' },
      items: [
        // ── Connector categories (alphabetical) ──
        {
          type: 'category',
          label: 'AI',
          link: { type: 'doc', id: 'connectors/catalog/built-in/ai/ai-overview' },
          items: [
            'connectors/catalog/built-in/ai/action-reference',
            'connectors/catalog/built-in/ai/trigger-reference',
          ],
        },
        {
          type: 'category',

          label: 'Alfresco',
          link: { type: 'doc', id: 'connectors/catalog/storage-file/alfresco/connector-overview' },
          items: [
            'connectors/catalog/storage-file/alfresco/setup-guide',
            'connectors/catalog/storage-file/alfresco/actions',
            'connectors/catalog/storage-file/alfresco/example',
          ],
        },
        {
          type: 'category',
          label: 'AMP',
          link: { type: 'doc', id: 'connectors/catalog/developer-tools/amp/connector-overview' },
          items: [
            'connectors/catalog/developer-tools/amp/setup-guide',
            'connectors/catalog/developer-tools/amp/actions',
          ],
        },
        {
          type: 'category',

          label: 'Asana',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/asana/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/asana/setup-guide',
            'connectors/catalog/productivity-collaboration/asana/actions',
            'connectors/catalog/productivity-collaboration/asana/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Marketplace MPE',
          link: { type: 'doc', id: 'connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/aws-marketplace-mpe-connector-overview' },
          items: [
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/setup-guide',
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/actions',
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpe/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Marketplace MPM',
          link: { type: 'doc', id: 'connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/aws-marketplace-mpm-connector-overview' },
          items: [
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/setup-guide',
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/actions',
            'connectors/catalog/cloud-infrastructure/aws.marketplace.mpm/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Redshift',
          link: { type: 'doc', id: 'connectors/catalog/database/aws.redshift/aws-redshift-connector-overview' },
          items: [
            'connectors/catalog/database/aws.redshift/setup-guide',
            'connectors/catalog/database/aws.redshift/actions',
            'connectors/catalog/database/aws.redshift/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Redshift Data',
          link: { type: 'doc', id: 'connectors/catalog/database/aws.redshiftdata/aws-redshift-data-connector-overview' },
          items: [
            'connectors/catalog/database/aws.redshiftdata/setup-guide',
            'connectors/catalog/database/aws.redshiftdata/actions',
            'connectors/catalog/database/aws.redshiftdata/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS S3',
          link: { type: 'doc', id: 'connectors/catalog/storage-file/aws.s3/aws-s3-connector-overview' },
          items: [
            'connectors/catalog/storage-file/aws.s3/setup-guide',
            'connectors/catalog/storage-file/aws.s3/actions',
            'connectors/catalog/storage-file/aws.s3/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Secrets Manager',
          link: { type: 'doc', id: 'connectors/catalog/security-identity/aws.secretmanager/aws-secrets-manager-connector-overview' },
          items: [
            'connectors/catalog/security-identity/aws.secretmanager/setup-guide',
            'connectors/catalog/security-identity/aws.secretmanager/actions',
            'connectors/catalog/security-identity/aws.secretmanager/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS SNS',
          link: { type: 'doc', id: 'connectors/catalog/communication/aws.sns/aws-sns-connector-overview' },
          items: [
            'connectors/catalog/communication/aws.sns/setup-guide',
            'connectors/catalog/communication/aws.sns/actions',
            'connectors/catalog/communication/aws.sns/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS SQS',
          link: { type: 'doc', id: 'connectors/catalog/messaging/aws.sqs/aws-sqs-connector-overview' },
          items: [
            'connectors/catalog/messaging/aws.sqs/setup-guide',
            'connectors/catalog/messaging/aws.sqs/actions',
            'connectors/catalog/messaging/aws.sqs/triggers',
            'connectors/catalog/messaging/aws.sqs/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure AI Search',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/azure.ai.search/azure-ai-search-connector-overview' },
          items: [
            'connectors/catalog/ai-ml/azure.ai.search/setup-guide',
            'connectors/catalog/ai-ml/azure.ai.search/actions',
            'connectors/catalog/ai-ml/azure.ai.search/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure AI Search Index',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/azure.ai.search.index/azure-ai-search-index-connector-overview' },
          items: [
            'connectors/catalog/ai-ml/azure.ai.search.index/setup-guide',
            'connectors/catalog/ai-ml/azure.ai.search.index/actions',
            'connectors/catalog/ai-ml/azure.ai.search.index/example',
          ],
        },
        {
          type: 'category',

          label: 'Azure Service Bus',
          link: { type: 'doc', id: 'connectors/catalog/messaging/asb/azure-service-bus-connector-overview' },
          items: [
            'connectors/catalog/messaging/asb/setup-guide',
            'connectors/catalog/messaging/asb/actions',
            'connectors/catalog/messaging/asb/triggers',
            'connectors/catalog/messaging/asb/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure Storage Service',
          link: { type: 'doc', id: 'connectors/catalog/storage-file/azure_storage_service/overview' },
          items: [
            'connectors/catalog/storage-file/azure_storage_service/setup-guide',
            'connectors/catalog/storage-file/azure_storage_service/actions',
          ],
        },
        {
          type: 'category',
          label: 'Candid',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/candid/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/candid/setup-guide',
            'connectors/catalog/productivity-collaboration/candid/actions',
          ],
        },
        {
          type: 'category',
          label: 'CDC',
          link: { type: 'doc', id: 'connectors/catalog/database/cdc/connector-overview' },
          items: [
            'connectors/catalog/database/cdc/setup-guide',
            'connectors/catalog/database/cdc/triggers',
          ],
        },
        {
          type: 'category',
          label: 'Confluent Avro SerDes',
          link: { type: 'doc', id: 'connectors/catalog/messaging/confluent.cavroserdes/confluent-avro-serdes-connector-overview' },
          items: [
            'connectors/catalog/messaging/confluent.cavroserdes/setup-guide',
            'connectors/catalog/messaging/confluent.cavroserdes/actions',
          ],
        },
        {
          type: 'category',
          label: 'Confluent Schema Registry',
          link: { type: 'doc', id: 'connectors/catalog/messaging/confluent.cregistry/confluent-schema-registry-connector-overview' },
          items: [
            'connectors/catalog/messaging/confluent.cregistry/setup-guide',
            'connectors/catalog/messaging/confluent.cregistry/actions',
            'connectors/catalog/messaging/confluent.cregistry/example',
          ],
        },
        {
          type: 'category',
          label: 'Copybook',
          link: { type: 'doc', id: 'connectors/catalog/developer-tools/copybook/connector-overview' },
          items: [
            'connectors/catalog/developer-tools/copybook/setup-guide',
            'connectors/catalog/developer-tools/copybook/actions',
          ],
        },
        {
          type: 'category',

          label: 'Discord',
          link: { type: 'doc', id: 'connectors/catalog/communication/discord/connector-overview' },
          items: [
            'connectors/catalog/communication/discord/setup-guide',
            'connectors/catalog/communication/discord/actions',
            'connectors/catalog/communication/discord/example',
          ],
        },
        {
          type: 'category',
          label: 'DocuSign Admin',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/docusign.dsadmin/docusign-admin-connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/docusign.dsadmin/setup-guide',
            'connectors/catalog/productivity-collaboration/docusign.dsadmin/actions',
            'connectors/catalog/productivity-collaboration/docusign.dsadmin/example',
          ],
        },
        {
          type: 'category',
          label: 'Elastic Cloud',
          link: { type: 'doc', id: 'connectors/catalog/cloud-infrastructure/elastic.elasticcloud/elastic-cloud-connector-overview' },
          items: [
            'connectors/catalog/cloud-infrastructure/elastic.elasticcloud/setup-guide',
            'connectors/catalog/cloud-infrastructure/elastic.elasticcloud/actions',
            'connectors/catalog/cloud-infrastructure/elastic.elasticcloud/example',
          ],
        },
        {
          type: 'category',
          label: 'Email',
          link: { type: 'doc', id: 'connectors/catalog/built-in/email/email' },
          items: [
            'connectors/catalog/built-in/email/setup-guide',
            'connectors/catalog/built-in/email/action-reference',
            'connectors/catalog/built-in/email/trigger-reference',
            'connectors/catalog/built-in/email/example',
          ],
        },
        {
          type: 'category',
          label: 'FTP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/ftp/ftp' },
          items: [
            'connectors/catalog/built-in/ftp/action-reference',
            'connectors/catalog/built-in/ftp/trigger-reference',
            'connectors/catalog/built-in/ftp/example',
          ],
        },
        {
          type: 'category',
          label: 'Github',
          link: { type: 'doc', id: 'connectors/catalog/developer-tools/github/connector-overview' },
          items: [
            'connectors/catalog/developer-tools/github/setup-guide',
            'connectors/catalog/developer-tools/github/actions',
            'connectors/catalog/developer-tools/github/triggers',
            'connectors/catalog/developer-tools/github/example',
          ],
        },
        {
          type: 'category',
          label: 'Gmail',
          link: { type: 'doc', id: 'connectors/catalog/communication/googleapis.gmail/gmail-connector-overview' },
          items: [
            'connectors/catalog/communication/googleapis.gmail/setup-guide',
            'connectors/catalog/communication/googleapis.gmail/actions',
            'connectors/catalog/communication/googleapis.gmail/example',
          ],
        },
        {
          type: 'category',
          label: 'Google Calendar',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/googleapis.calendar/google-calendar-connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/googleapis.calendar/setup-guide',
            'connectors/catalog/productivity-collaboration/googleapis.calendar/actions',
            'connectors/catalog/productivity-collaboration/googleapis.calendar/example',
          ],
        },
        {
          type: 'category',
          label: 'Google Cloud Pub/Sub',
          link: { type: 'doc', id: 'connectors/catalog/messaging/gcloud.pubsub/google-cloud-pubsub-connector-overview' },
          items: [
            'connectors/catalog/messaging/gcloud.pubsub/setup-guide',
            'connectors/catalog/messaging/gcloud.pubsub/actions',
            'connectors/catalog/messaging/gcloud.pubsub/triggers',
            'connectors/catalog/messaging/gcloud.pubsub/example',
          ],
        },
        {
          type: 'category',
          label: 'Google GCalendar',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/googleapis.gcalendar/google-calendar-connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/googleapis.gcalendar/setup-guide',
            'connectors/catalog/productivity-collaboration/googleapis.gcalendar/actions',
          ],
        },
        {
          type: 'category',
          label: 'Google Sheets',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/googleapis.sheets/google-sheets-connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/googleapis.sheets/setup-guide',
            'connectors/catalog/productivity-collaboration/googleapis.sheets/actions',
            'connectors/catalog/productivity-collaboration/googleapis.sheets/example',
          ],
        },
        {
          type: 'category',
          label: 'gRPC',
          link: { type: 'doc', id: 'connectors/catalog/built-in/grpc/grpc' },
          items: [
            'connectors/catalog/built-in/grpc/action-reference',
            'connectors/catalog/built-in/grpc/trigger-reference',
            'connectors/catalog/built-in/grpc/example',
          ],
        },
        {
          type: 'category',
          label: 'GraphQL',
          link: { type: 'doc', id: 'connectors/catalog/built-in/graphql/graphql' },
          items: [
            'connectors/catalog/built-in/graphql/action-reference',
            'connectors/catalog/built-in/graphql/trigger-reference',
            'connectors/catalog/built-in/graphql/example',
          ],
        },
        {
          type: 'category',
          label: 'Guidewire InsuranceNow',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/guidewire.insnow/guidewire-insurancenow-connector-overview' },
          items: [
            'connectors/catalog/erp-business/guidewire.insnow/setup-guide',
            'connectors/catalog/erp-business/guidewire.insnow/actions',
            'connectors/catalog/erp-business/guidewire.insnow/example',
          ],
        },
        {
          type: 'category',
          label: 'HTTP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/http/overview' },
          items: [
            'connectors/catalog/built-in/http/action-reference',
            'connectors/catalog/built-in/http/trigger-reference',
            'connectors/catalog/built-in/http/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Automation Actions',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.automation.actions/hubspot-automation-actions-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.automation.actions/setup-guide',
            'connectors/catalog/crm-sales/hubspot.automation.actions/actions',
            'connectors/catalog/crm-sales/hubspot.automation.actions/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Associations',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.associations/hubspot-crm-associations' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.associations/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.associations/actions',
            'connectors/catalog/crm-sales/hubspot.crm.associations/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Associations Schema',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.associations.schema/hubspot-crm-associations-schema' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.associations.schema/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.associations.schema/actions',
            'connectors/catalog/crm-sales/hubspot.crm.associations.schema/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Carts',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.carts/hubspot-crm-commerce-carts' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.carts/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.carts/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.carts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Discounts',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/hubspot-crm-commerce-discounts' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.discounts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Orders',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.orders/hubspot-crm-commerce-orders' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.orders/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.orders/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.orders/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Quotes',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot-crm-commerce-quotes' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Taxes',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.commerce.taxes/hubspot-crm-commerce-taxes' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.commerce.taxes/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.taxes/actions',
            'connectors/catalog/crm-sales/hubspot.crm.commerce.taxes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Companies',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.companies/hubspot-crm-companies-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.companies/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.companies/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.companies/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Contacts',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.contacts/hubspot-crm-contacts-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.contacts/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.contacts/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.contacts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Deals',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.deals/hubspot-crm-deals-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.deals/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.deals/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.deals/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagement Meeting',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagement.meeting/hubspot-crm-engagement-meeting-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagement.meeting/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagement.meeting/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagement.meeting/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagement Notes',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagement.notes/hubspot-crm-engagement-notes' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagement.notes/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagement.notes/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagement.notes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Calls',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagements.calls/hubspot-crm-engagements-calls' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagements.calls/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.calls/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.calls/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Communications',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagements.communications/hubspot-crm-engagements-communications' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagements.communications/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.communications/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.communications/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Email',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagements.email/hubspot-crm-engagements-email' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagements.email/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.email/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.email/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Tasks',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.engagements.tasks/hubspot-crm-engagements-tasks' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.engagements.tasks/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.tasks/actions',
            'connectors/catalog/crm-sales/hubspot.crm.engagements.tasks/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Extensions Timelines',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.extensions.timelines/hubspot-crm-extensions-timelines' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.extensions.timelines/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.extensions.timelines/actions',
            'connectors/catalog/crm-sales/hubspot.crm.extensions.timelines/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Extensions Videoconferencing',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/hubspot-crm-extensions-videoconferencing' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/actions',
            'connectors/catalog/crm-sales/hubspot.crm.extensions.videoconferencing/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Feedback',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.feedback/hubspot-crm-feedback-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.feedback/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.feedback/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.feedback/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Import',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.import/hubspot-crm-import' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.import/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.import/actions',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Leads',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.leads/hubspot-crm-leads-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.leads/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.leads/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.leads/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Line Items',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.lineitems/hubspot-crm-line-items-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.lineitems/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.lineitems/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.lineitems/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Lists',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.lists/hubspot-crm-lists' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.lists/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.lists/actions',
            'connectors/catalog/crm-sales/hubspot.crm.lists/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Owners',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.owners/hubspot-crm-owners' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.owners/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.owners/actions',
            'connectors/catalog/crm-sales/hubspot.crm.owners/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Pipelines',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.pipelines/hubspot-crm-pipelines' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.pipelines/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.pipelines/actions',
            'connectors/catalog/crm-sales/hubspot.crm.pipelines/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Products',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.products/hubspot-crm-products' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.products/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.products/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.products/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Properties',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.properties/hubspot-crm-properties' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.properties/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.properties/actions',
            'connectors/catalog/crm-sales/hubspot.crm.properties/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Schemas',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.schemas/hubspot-crm-schemas' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.schemas/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.schemas/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.schemas/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Tickets',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/hubspot.crm.obj.tickets/hubspot-crm-tickets-connector-overview' },
          items: [
            'connectors/catalog/crm-sales/hubspot.crm.obj.tickets/setup-guide',
            'connectors/catalog/crm-sales/hubspot.crm.obj.tickets/actions',
            'connectors/catalog/crm-sales/hubspot.crm.obj.tickets/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Campaigns',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.campaigns/hubspot-marketing-campaigns' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.campaigns/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.campaigns/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.campaigns/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Emails',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.emails/hubspot-marketing-emails' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.emails/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.emails/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.emails/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Events',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.events/hubspot-marketing-events-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.events/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.events/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.events/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Forms',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.forms/hubspot-marketing-forms' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.forms/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.forms/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.forms/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Subscriptions',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.subscriptions/hubspot-marketing-subscriptions-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.subscriptions/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.subscriptions/actions',
            'connectors/catalog/marketing-social/hubspot.marketing.subscriptions/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Transactional',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/hubspot.marketing.transactional/hubspot-marketing-transactional-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/hubspot.marketing.transactional/setup-guide',
            'connectors/catalog/marketing-social/hubspot.marketing.transactional/actions',
          ],
        },
        {
          type: 'category',
          label: 'IBM CTG',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/ibm.ctg/ibm-ctg-connector-overview' },
          items: [
            'connectors/catalog/erp-business/ibm.ctg/setup-guide',
            'connectors/catalog/erp-business/ibm.ctg/actions',
            'connectors/catalog/erp-business/ibm.ctg/example',
          ],
        },
        {
          type: 'category',
          label: 'IBM MQ',
          link: { type: 'doc', id: 'connectors/catalog/messaging/ibm.ibmmq/ibm-mq-connector-overview' },
          items: [
            'connectors/catalog/messaging/ibm.ibmmq/setup-guide',
            'connectors/catalog/messaging/ibm.ibmmq/actions',
            'connectors/catalog/messaging/ibm.ibmmq/triggers',
          ],
        },
        {
          type: 'category',
          label: 'Intercom',
          link: { type: 'doc', id: 'connectors/catalog/communication/intercom/connector-overview' },
          items: [
            'connectors/catalog/communication/intercom/setup-guide',
            'connectors/catalog/communication/intercom/action-reference',
            'connectors/catalog/communication/intercom/example',
          ],
        },
        {
          type: 'category',
          label: 'Java JDBC',
          link: { type: 'doc', id: 'connectors/catalog/database/java.jdbc/java-jdbc-connector-overview' },
          items: [
            'connectors/catalog/database/java.jdbc/setup-guide',
            'connectors/catalog/database/java.jdbc/actions',
            'connectors/catalog/database/java.jdbc/example',
          ],
        },
        {
          type: 'category',
          label: 'Jira',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/jira/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/jira/setup-guide',
            'connectors/catalog/productivity-collaboration/jira/actions',
            'connectors/catalog/productivity-collaboration/jira/example',
          ],
        },
        {
          type: 'category',
          label: 'JMS',
          link: { type: 'doc', id: 'connectors/catalog/messaging/java.jms/jms-connector-overview' },
          items: [
            'connectors/catalog/messaging/java.jms/setup-guide',
            'connectors/catalog/messaging/java.jms/actions',
            'connectors/catalog/messaging/java.jms/triggers',
            'connectors/catalog/messaging/java.jms/example',
          ],
        },
        {
          type: 'category',
          label: 'Kafka',
          link: { type: 'doc', id: 'connectors/catalog/messaging/kafka/connector-overview' },
          items: [
            'connectors/catalog/messaging/kafka/setup-guide',
            'connectors/catalog/messaging/kafka/actions',
            'connectors/catalog/messaging/kafka/triggers',
            'connectors/catalog/messaging/kafka/example',
          ],
        },
        {
          type: 'category',
          label: 'Mailchimp Marketing',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/mailchimp.marketing/mailchimp-marketing-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/mailchimp.marketing/setup-guide',
            'connectors/catalog/marketing-social/mailchimp.marketing/actions',
            'connectors/catalog/marketing-social/mailchimp.marketing/example',
          ],
        },
        {
          type: 'category',
          label: 'Mailchimp Transactional',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/mailchimp.transactional/mailchimp-transactional-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/mailchimp.transactional/setup-guide',
            'connectors/catalog/marketing-social/mailchimp.transactional/actions',
          ],
        },
        {
          type: 'category',
          label: 'MCP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/mcp/mcp' },
          items: [
            'connectors/catalog/built-in/mcp/action-reference',
            'connectors/catalog/built-in/mcp/trigger-reference',
          ],
        },
        {
          type: 'category',
          label: 'Microsoft OneDrive',
          link: { type: 'doc', id: 'connectors/catalog/storage-file/microsoft.onedrive/microsoft-onedrive-connector-overview' },
          items: [
            'connectors/catalog/storage-file/microsoft.onedrive/setup-guide',
            'connectors/catalog/storage-file/microsoft.onedrive/actions',
            'connectors/catalog/storage-file/microsoft.onedrive/example',
          ],
        },
        {
          type: 'category',
          label: 'Milvus',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/milvus/connector-overview' },
          items: [
            'connectors/catalog/ai-ml/milvus/setup-guide',
            'connectors/catalog/ai-ml/milvus/actions',
            'connectors/catalog/ai-ml/milvus/example',
          ],
        },
        {
          type: 'category',
          label: 'Mistral',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/mistral/connector-overview' },
          items: [
            'connectors/catalog/ai-ml/mistral/setup-guide',
            'connectors/catalog/ai-ml/mistral/actions',
            'connectors/catalog/ai-ml/mistral/example',
          ],
        },
        {
          type: 'category',

          label: 'MongoDB',
          link: { type: 'doc', id: 'connectors/catalog/database/mongodb/connector-overview' },
          items: [
            'connectors/catalog/database/mongodb/setup-guide',
            'connectors/catalog/database/mongodb/actions',
            'connectors/catalog/database/mongodb/example',
          ],
        },
        {
          type: 'category',
          label: 'MQTT',
          link: { type: 'doc', id: 'connectors/catalog/built-in/mqtt/mqtt' },
          items: [
            'connectors/catalog/built-in/mqtt/setup-guide',
            'connectors/catalog/built-in/mqtt/action-reference',
            'connectors/catalog/built-in/mqtt/trigger-reference',
            'connectors/catalog/built-in/mqtt/example',
          ],
        },
        {
          type: 'category',
          label: 'MSSQL',
          link: { type: 'doc', id: 'connectors/catalog/database/mssql/connector-overview' },
          items: [
            'connectors/catalog/database/mssql/setup-guide',
            'connectors/catalog/database/mssql/actions',
            'connectors/catalog/database/mssql/triggers',
            'connectors/catalog/database/mssql/example',
          ],
        },
        {
          type: 'category',
          label: 'MySQL',
          link: { type: 'doc', id: 'connectors/catalog/database/mysql/connector-overview' },
          items: [
            'connectors/catalog/database/mysql/setup-guide',
            'connectors/catalog/database/mysql/actions',
            'connectors/catalog/database/mysql/triggers',
            'connectors/catalog/database/mysql/example',
          ],
        },
        {
          type: 'category',
          label: 'NATS',
          link: { type: 'doc', id: 'connectors/catalog/messaging/nats/connector-overview' },
          items: [
            'connectors/catalog/messaging/nats/setup-guide',
            'connectors/catalog/messaging/nats/actions',
            'connectors/catalog/messaging/nats/example',
          ],
        },
        {
          type: 'category',

          label: 'OpenAI',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/openai/connector-overview' },
          items: [
            'connectors/catalog/ai-ml/openai/setup-guide',
            'connectors/catalog/ai-ml/openai/actions',
            'connectors/catalog/ai-ml/openai/example',
          ],
        },
        {
          type: 'category',

          label: 'OpenAI Audio',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/openai.audio/openai-audio-connector-overview' },
          items: [
            'connectors/catalog/ai-ml/openai.audio/setup-guide',
            'connectors/catalog/ai-ml/openai.audio/actions',
            'connectors/catalog/ai-ml/openai.audio/example',
          ],
        },
        {
          type: 'category',
          label: 'OpenAI Fine-Tunes',
          link: { type: 'doc', id: 'connectors/catalog/ai-ml/openai.finetunes/openai-fine-tunes-connector-overview' },
          items: [
            'connectors/catalog/ai-ml/openai.finetunes/setup-guide',
            'connectors/catalog/ai-ml/openai.finetunes/actions',
            'connectors/catalog/ai-ml/openai.finetunes/example',
          ],
        },
        {
          type: 'category',
          label: 'Oracle DB',
          link: { type: 'doc', id: 'connectors/catalog/database/oracledb/oracle-db-connector-overview' },
          items: [
            'connectors/catalog/database/oracledb/setup-guide',
            'connectors/catalog/database/oracledb/actions',
            'connectors/catalog/database/oracledb/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Invoices',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/paypal.invoices/paypal-invoices-connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/paypal.invoices/setup-guide',
            'connectors/catalog/finance-accounting/paypal.invoices/actions',
            'connectors/catalog/finance-accounting/paypal.invoices/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Orders',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/paypal.orders/paypal-orders-connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/paypal.orders/setup-guide',
            'connectors/catalog/finance-accounting/paypal.orders/actions',
            'connectors/catalog/finance-accounting/paypal.orders/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Payments',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/paypal.payments/paypal-payments-connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/paypal.payments/setup-guide',
            'connectors/catalog/finance-accounting/paypal.payments/actions',
            'connectors/catalog/finance-accounting/paypal.payments/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Subscriptions',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/paypal.subscriptions/paypal-subscriptions-connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/paypal.subscriptions/setup-guide',
            'connectors/catalog/finance-accounting/paypal.subscriptions/actions',
            'connectors/catalog/finance-accounting/paypal.subscriptions/example',
          ],
        },
        {
          type: 'category',
          label: 'People HR',
          link: { type: 'doc', id: 'connectors/catalog/hrms/peoplehr/people-hr-connector-overview' },
          items: [
            'connectors/catalog/hrms/peoplehr/setup-guide',
            'connectors/catalog/hrms/peoplehr/actions',
            'connectors/catalog/hrms/peoplehr/example',
          ],
        },
        {
          type: 'category',

          label: 'PostgreSQL',
          link: { type: 'doc', id: 'connectors/catalog/database/postgresql/connector-overview' },
          items: [
            'connectors/catalog/database/postgresql/setup-guide',
            'connectors/catalog/database/postgresql/actions',
            'connectors/catalog/database/postgresql/triggers',
            'connectors/catalog/database/postgresql/example',
          ],
        },
        {
          type: 'category',
          label: 'RabbitMQ',
          link: { type: 'doc', id: 'connectors/catalog/messaging/rabbitmq/connector-overview' },
          items: [
            'connectors/catalog/messaging/rabbitmq/setup-guide',
            'connectors/catalog/messaging/rabbitmq/actions',
            'connectors/catalog/messaging/rabbitmq/triggers',
            'connectors/catalog/messaging/rabbitmq/example',
          ],
        },
        {
          type: 'category',
          label: 'Redis',
          link: { type: 'doc', id: 'connectors/catalog/database/redis/connector-overview' },
          items: [
            'connectors/catalog/database/redis/setup-guide',
            'connectors/catalog/database/redis/actions',
            'connectors/catalog/database/redis/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap/connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap/setup-guide',
            'connectors/catalog/erp-business/sap/actions',
            'connectors/catalog/erp-business/sap/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Commerce',
          link: { type: 'doc', id: 'connectors/catalog/ecommerce/sap.commerce.webservices/sap-commerce-connector-overview' },
          items: [
            'connectors/catalog/ecommerce/sap.commerce.webservices/setup-guide',
            'connectors/catalog/ecommerce/sap.commerce.webservices/actions',
            'connectors/catalog/ecommerce/sap.commerce.webservices/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Area',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.salesarea_0001/sap-sales-area-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.salesarea_0001/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.salesarea_0001/actions',
            'connectors/catalog/erp-business/sap.s4hana.salesarea_0001/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales District',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_salesdistrict_srv/sap-sales-district-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_salesdistrict_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_salesdistrict_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api_salesdistrict_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Inquiry',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/sap-sales-inquiry-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sales_order_srv/sap-sales-order-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_srv/actions',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order Analytics',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.ce_salesorder_0001/sap-sales-order-analytics-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.ce_salesorder_0001/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.ce_salesorder_0001/actions',
            'connectors/catalog/erp-business/sap.s4hana.ce_salesorder_0001/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order Simulation',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/sap-sales-order-simulation-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Organization',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_salesorganization_srv/sap-sales-organization-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_salesorganization_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_salesorganization_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api_salesorganization_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Quotation',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sales_quotation_srv/sap-sales-quotation-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sales_quotation_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_quotation_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api_sales_quotation_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SD Incoterms',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/sap-sd-incoterms-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/actions',
            'connectors/catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SD Sold-to-Party Determination',
          link: { type: 'doc', id: 'connectors/catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/sap-sd-sold-party-determination-connector-overview' },
          items: [
            'connectors/catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/setup-guide',
            'connectors/catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/actions',
            'connectors/catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/example',
          ],
        },
        {
          type: 'category',
          label: 'Salesforce',
          link: { type: 'doc', id: 'connectors/catalog/crm-sales/salesforce/connector-overview' },
          items: [
            'connectors/catalog/crm-sales/salesforce/setup-guide',
            'connectors/catalog/crm-sales/salesforce/actions',
            'connectors/catalog/crm-sales/salesforce/triggers',
            'connectors/catalog/crm-sales/salesforce/example',
          ],
        },
        {
          type: 'category',
          label: 'Salesforce Marketing Cloud',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/salesforce.marketingcloud/salesforce-marketing-cloud-connector-overview' },
          items: [
            'connectors/catalog/marketing-social/salesforce.marketingcloud/setup-guide',
            'connectors/catalog/marketing-social/salesforce.marketingcloud/actions',
            'connectors/catalog/marketing-social/salesforce.marketingcloud/example',
          ],
        },
        {
          type: 'category',
          label: 'SCIM',
          link: { type: 'doc', id: 'connectors/catalog/security-identity/scim/connector-overview' },
          items: [
            'connectors/catalog/security-identity/scim/setup-guide',
            'connectors/catalog/security-identity/scim/actions',
            'connectors/catalog/security-identity/scim/example',
          ],
        },
        {
          type: 'category',
          label: 'Shopify Admin',
          link: { type: 'doc', id: 'connectors/catalog/ecommerce/shopify.admin/shopify-admin-connector-overview' },
          items: [
            'connectors/catalog/ecommerce/shopify.admin/setup-guide',
            'connectors/catalog/ecommerce/shopify.admin/actions',
            'connectors/catalog/ecommerce/shopify.admin/triggers',
            'connectors/catalog/ecommerce/shopify.admin/example',
          ],
        },
        {
          type: 'category',
          label: 'Slack',
          link: { type: 'doc', id: 'connectors/catalog/communication/slack/connector-overview' },
          items: [
            'connectors/catalog/communication/slack/setup-guide',
            'connectors/catalog/communication/slack/actions',
            'connectors/catalog/communication/slack/example',
          ],
        },
        {
          type: 'category',
          label: 'Smartsheet',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/smartsheet/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/smartsheet/setup-guide',
            'connectors/catalog/productivity-collaboration/smartsheet/actions',
            'connectors/catalog/productivity-collaboration/smartsheet/example',
          ],
        },
        {
          type: 'category',
          label: 'Snowflake',
          link: { type: 'doc', id: 'connectors/catalog/database/snowflake/connector-overview' },
          items: [
            'connectors/catalog/database/snowflake/setup-guide',
            'connectors/catalog/database/snowflake/actions',
            'connectors/catalog/database/snowflake/example',
          ],
        },
        {
          type: 'category',
          label: 'Solace',
          link: { type: 'doc', id: 'connectors/catalog/messaging/solace/connector-overview' },
          items: [
            'connectors/catalog/messaging/solace/setup-guide',
            'connectors/catalog/messaging/solace/actions',
            'connectors/catalog/messaging/solace/triggers',
            'connectors/catalog/messaging/solace/example',
          ],
        },
        {
          type: 'category',
          label: 'Stripe',
          link: { type: 'doc', id: 'connectors/catalog/finance-accounting/stripe/connector-overview' },
          items: [
            'connectors/catalog/finance-accounting/stripe/setup-guide',
            'connectors/catalog/finance-accounting/stripe/actions',
            'connectors/catalog/finance-accounting/stripe/example',
          ],
        },
        {
          type: 'category',
          label: 'TCP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/tcp/tcp' },
          items: [
            'connectors/catalog/built-in/tcp/action-reference',
            'connectors/catalog/built-in/tcp/trigger-reference',
            'connectors/catalog/built-in/tcp/example',
          ],
        },
        {
          type: 'category',
          label: 'Trello',
          link: { type: 'doc', id: 'connectors/catalog/productivity-collaboration/trello/connector-overview' },
          items: [
            'connectors/catalog/productivity-collaboration/trello/setup-guide',
            'connectors/catalog/productivity-collaboration/trello/actions',
            'connectors/catalog/productivity-collaboration/trello/example',
          ],
        },
        {
          type: 'category',
          label: 'Twilio',
          link: { type: 'doc', id: 'connectors/catalog/communication/twilio/overview' },
          items: [
            'connectors/catalog/communication/twilio/setup-guide',
            'connectors/catalog/communication/twilio/actions',
            'connectors/catalog/communication/twilio/triggers',
            ...connectorVersionedDocs('connectors/catalog/communication/twilio'),
            'connectors/catalog/communication/twilio/example',
          ],
        },
        {
          type: 'category',
          label: 'Twitter',
          link: { type: 'doc', id: 'connectors/catalog/marketing-social/twitter/connector-overview' },
          items: [
            'connectors/catalog/marketing-social/twitter/setup-guide',
            'connectors/catalog/marketing-social/twitter/actions',
            'connectors/catalog/marketing-social/twitter/example',
          ],
        },
        {
          type: 'category',

          label: 'UDP',
          link: { type: 'doc', id: 'connectors/catalog/built-in/udp/udp' },
          items: [
            'connectors/catalog/built-in/udp/action-reference',
            'connectors/catalog/built-in/udp/trigger-reference',
            'connectors/catalog/built-in/udp/example',
          ],
        },
        {
          type: 'category',
          label: 'WSO2 APIM Catalog',
          link: { type: 'doc', id: 'connectors/catalog/developer-tools/wso2.apim.catalog/apim-catalog-connector-overview' },
          items: [
            'connectors/catalog/developer-tools/wso2.apim.catalog/setup-guide',
            'connectors/catalog/developer-tools/wso2.apim.catalog/actions',
            'connectors/catalog/developer-tools/wso2.apim.catalog/example',
          ],
        },
        {
          type: 'category',
          label: 'WebSocket',
          link: { type: 'doc', id: 'connectors/catalog/built-in/websocket/websocket' },
          items: [
            'connectors/catalog/built-in/websocket/action-reference',
            'connectors/catalog/built-in/websocket/trigger-reference',
            'connectors/catalog/built-in/websocket/example',
          ],
        },
        {
          type: 'category',
          label: 'WebSub',
          link: { type: 'doc', id: 'connectors/catalog/built-in/websub/websub' },
          items: [
            'connectors/catalog/built-in/websub/setup-guide',
            'connectors/catalog/built-in/websub/action-reference',
            'connectors/catalog/built-in/websub/trigger-reference',
            'connectors/catalog/built-in/websub/example',
          ],
        },
        {
          type: 'category',
          label: 'Zoom Meetings',
          link: { type: 'doc', id: 'connectors/catalog/communication/zoom.meetings/zoom-meetings-connector-overview' },
          items: [
            'connectors/catalog/communication/zoom.meetings/setup-guide',
            'connectors/catalog/communication/zoom.meetings/actions',
            'connectors/catalog/communication/zoom.meetings/example',
          ],
        },
        {
          type: 'category',
          label: 'Zoom Scheduler',
          link: { type: 'doc', id: 'connectors/catalog/communication/zoom.scheduler/zoom-scheduler-connector-overview' },
          items: [
            'connectors/catalog/communication/zoom.scheduler/setup-guide',
            'connectors/catalog/communication/zoom.scheduler/actions',
            'connectors/catalog/communication/zoom.scheduler/example',
          ],
        },
      ],
    },
    // ── Build Your Own ──
    {
      type: 'category',
      label: 'Build your own',
      link: { type: 'doc', id: 'connectors/build-your-own/build-own' },
      items: [
        'connectors/build-your-own/create-from-openapi-spec',
        'connectors/build-your-own/custom-development',
      ],
    }
      ],
    },

    // ─────────────────────────────────────────────
    // AI INTEGRATIONS
    // "How do I build AI agents, RAG, or MCP?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'AI Integrations',
      collapsed: true,
      link: { type: 'doc', id: 'genai/overview' },
      items: [
        // Getting Started
        {
          type: 'category',
          label: 'Getting started',
          items: [
            'genai/getting-started/build-a-sentiment-analyzer',
            'genai/getting-started/build-a-hotel-finder-agent',
          ],
        },
        // Develop AI Applications
        {
          type: 'category',
          label: 'Develop AI applications',
          items: [
            // Direct LLM Calls (single page)
            'genai/develop/direct-llm/overview',
            // RAG
            {
              type: 'category',
              label: 'RAG',
              link: { type: 'doc', id: 'genai/develop/rag/overview' },
              collapsed: true,
              items: [
                'genai/develop/rag/rag-ingestion',
                'genai/develop/rag/rag-query'
              ]
            },
            // AI Agents
            {
              type: 'category',
              label: 'AI Agents',
              link: { type: 'doc', id: 'genai/develop/agents/overview' },
              collapsed: true,
              items: [
                'genai/develop/agents/creating-an-agent',
                'genai/develop/agents/tools',
                'genai/develop/agents/memory',
                'genai/develop/agents/observability',
                {
                  type: 'category',
                  label: 'Evaluations',
                  link: { type: 'doc', id: 'genai/develop/agents/evaluations/overview' },
                  collapsed: true,
                  items: [
                    'genai/develop/agents/evaluations/evalsets',
                    'genai/develop/agents/evaluations/creating-evaluations',
                    'genai/develop/agents/evaluations/running-evaluations',
                  ],
                },
              ],
            },
            // MCP Integration
            {
              type: 'category',
              label: 'MCP Integration',
              link: { type: 'doc', id: 'genai/develop/mcp/overview' },
              collapsed: true,
              items: [
                'genai/develop/mcp/exposing-as-mcp',
                'genai/develop/mcp/consuming-mcp-from-agent',
              ],
            },
            // Natural Functions (single page)
            'genai/develop/natural-functions/overview',
            // Components
            'genai/develop/components/model-providers',
            'genai/develop/components/embedding-providers',
            'genai/develop/components/vector-stores',
            'genai/develop/components/knowledge-bases',
            'genai/develop/components/chunkers',
          ],
        },
        // Tutorials
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'genai/tutorials/email-generator-direct-llm',
            'genai/tutorials/review-summarizer-natural-function',
            'genai/tutorials/building-hr-knowledge-base-rag',
            'genai/tutorials/building-a-customer-care-agent-mcp',
            'genai/tutorials/it-helpdesk-chatbot',
          ],
        }
      ],
    },

    // ─────────────────────────────────────────────
    // TUTORIALS
    // "Show me a complete, real example"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      link: { type: 'doc', id: 'guides/guides' },
      items: [
        {
          type: 'category',
          label: 'Enterprise integration patterns',
          items: [
            'guides/patterns/message',
            'guides/patterns/message-filter',
            'guides/patterns/content-based-routing',
            'guides/patterns/selective-consumer',
            'guides/patterns/polling-consumer',
            'guides/patterns/channel-adapter',
            'guides/patterns/message-dispatcher',
            'guides/patterns/service-activator',
            'guides/patterns/message-mapper',
          ],
        },
        // Migration Guides
        {
          type: 'category',
          label: 'Migration guides',
          items: [
            'guides/migration/coming-from-mulesoft',
            'guides/migration/coming-from-tibco',
          ],
        },
      ],
    },
    // DEPLOY
    // "How do I ship, run, and secure this?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Deploy',
      collapsed: true,
      link: { type: 'doc', id: 'deploy/overview' },
      items: [
        // WSO2 Cloud
        {
          type: 'category',
          label: 'Deploy to WSO2 Cloud',
          link: { type: 'doc', id: 'deploy/cloud/overview' },
          items: [
            'deploy/cloud/push-from-ide',
            'deploy/cloud/deploy-from-cloud-editor',
            'deploy/cloud/import-project',
            'deploy/cloud/import-integration',
          ],
        },
        // Self-hosted: upstream has migrated run-locally / docker /
        // kubernetes / openshift to deploy/self-hosted/*. The remaining
        // legacy deploy-operate/deploy/* docs that don't have a new
        // home yet are listed alongside so they stay reachable until
        // they're migrated too.
        {
          type: 'category',
          label: 'Self-hosted',
          items: [
            'deploy/self-hosted/run-locally',
            'deploy/self-hosted/docker',
            'deploy/self-hosted/kubernetes',
            'deploy/self-hosted/openshift',
            'deploy-operate/deploy/vm-based-deployment',
            'deploy-operate/deploy/serverless-deployment',
            'deploy-operate/deploy/devant-ipaas',
            'deploy-operate/deploy/aws-azure-gcp',
            'deploy-operate/deploy/graalvm-native-images',
            'deploy-operate/deploy/environments',
            'deploy-operate/deploy/managing-configurations',
            'deploy-operate/deploy/scaling-high-availability',
          ],
        },
        // CI/CD
        {
          type: 'category',
          label: 'CI/CD',
          items: [
            'deploy-operate/cicd/github-actions',
            'deploy-operate/cicd/jenkins',
            'deploy-operate/cicd/gitlab',
            'deploy-operate/cicd/azure-devops',
          ],
        },
        // Observe
        {
          type: 'category',
          label: 'Observe',
          items: [
            'deploy-operate/observe/observability-overview',
            'deploy-operate/observe/metrics-overview',
            'deploy-operate/observe/logging-overview',
            'deploy-operate/observe/integration-control-plane-icp',
            // 'deploy-operate/observe/metrics-prometheus-grafana',
            'deploy-operate/observe/jaeger-distributed-tracing',
            'deploy-operate/observe/zipkin-tracing',
            // 'deploy-operate/observe/datadog-integration',
            'deploy-operate/observe/new-relic-integration',
            // 'deploy-operate/observe/elastic-stack-elk',
            // 'deploy-operate/observe/opensearch-integration',
            'deploy-operate/observe/moesif-api-analytics',
            'deploy-operate/observe/recipe-datadog-setup',
            // 'deploy-operate/observe/recipe-local-development',
            // 'deploy-operate/observe/recipe-kubernetes-production',
            // 'deploy-operate/observe/recipe-elk-stack',
            // 'deploy-operate/observe/recipe-opensearch-setup',
          ],
        },
        // Secure
        {
          type: 'category',
          label: 'Secure',
          items: [
            'deploy-operate/secure/keystore-truststore',
            'deploy-operate/secure/runtime-security',
            'deploy-operate/secure/authentication',
            'deploy-operate/secure/api-security-rate-limiting',
            'deploy-operate/secure/secrets-encryption',
            'deploy-operate/secure/ip-whitelisting',
            'deploy-operate/secure/compliance-considerations',
          ],
        },
        // Capacity Planning
        {
          type: 'category',
          label: 'Capacity planning',
          items: [
            'deploy-operate/capacity-planning/overview',
            'deploy-operate/capacity-planning/performance-reports',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // MANAGE
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Manage',
      collapsed: true,
      link: { type: 'doc', id: 'manage/overview' },
      items: [
        'manage/choosing-a-control-plane',
        // Cloud
        {
          type: 'category',
          label: 'WSO2 Cloud',
          link: { type: 'doc', id: 'manage/cloud/overview' },
          items: [
            // Integrations
            {
              type: 'category',
              label: 'Integrations',
              items: [
                'manage/cloud/integrations/viewing-deployed',
                'manage/cloud/integrations/lifecycle',
              ],
            },
            // Configuration Management
            {
              type: 'category',
              label: 'Configurations',
              link: { type: 'doc', id: 'manage/cloud/configurations/overview' },
              items: [
                'manage/cloud/configurations/runtime-configurations',
                'manage/cloud/configurations/endpoint-configurations',
                'manage/cloud/configurations/security-configurations',
                'manage/cloud/configurations/build-configurations',
                'manage/cloud/configurations/scaling-resource-limits',
                'manage/cloud/configurations/custom-domain',
              ],
            },
            // Environments
            {
              type: 'category',
              label: 'Environments',
              link: { type: 'doc', id: 'manage/cloud/environments/overview' },
              items: [
                'manage/cloud/environments/promotion',
                'manage/cloud/environments/promotion-approval',
                'manage/cloud/environments/create',
              ],
            },
            // Observability
            {
              type: 'category',
              label: 'Observability',
              link: { type: 'doc', id: 'manage/cloud/observability/overview' },
              items: [
                'manage/cloud/observability/runtime-logs',
                'manage/cloud/observability/metrics',
                'manage/cloud/observability/anomaly-detection-alerts',
              ],
            },
            // CI/CD
            {
              type: 'category',
              label: 'CI/CD',
              link: { type: 'doc', id: 'manage/cloud/cicd/overview' },
              items: [
                'manage/cloud/cicd/connect-git-repository',
                'manage/cloud/cicd/deployment-pipelines',
              ],
            },
            // Users and Access
            {
              type: 'category',
              label: 'Users and access',
              link: { type: 'doc', id: 'manage/cloud/users-and-access/overview' },
              items: [
                    'manage/cloud/users-and-access/access-control',
                    'manage/cloud/users-and-access/configure-enterprise-login',
                    {
                        type: 'category',
                        label: 'Access APIs with an External IdP',
                        link: { type: 'doc', id: 'manage/cloud/users-and-access/api-external-idp/overview' },
                        items: [
                            'manage/cloud/users-and-access/api-external-idp/asgardeo',
                            'manage/cloud/users-and-access/api-external-idp/azure',
                        ],
                    },
                ],
            },
            {
              type: 'category',
              label: 'Platform services',
              items: [
                'manage/cloud/platform-services/managed-databases',
              ],
            },
             {
              type: 'category',
              label: 'RAG (Retrieval-Augmented Generation)',
              items: [
                'manage/cloud/rag-ingestion/ingestion',
                'manage/cloud/rag-ingestion/retrieval',
                'manage/cloud/rag-ingestion/service',
                'manage/cloud/rag-ingestion/vector-databases',
                'manage/cloud/rag-ingestion/querying',
              ],
            },
            {
              type: 'category',
              label: 'Billing',
              items: [
                'manage/cloud/billing/pricing-and-plans',
                'manage/cloud/billing/usage-dashboards',
              ],
            },
            {
              type: 'category',
              label: 'Audit',
              items: [
                'manage/cloud/audit/audit-logs',
                'manage/cloud/audit/compliance-data-residency',
              ],
            },
            // Private data plane
            {
              type: 'category',
              label: 'Private data plane',
              link: { type: 'doc', id: 'manage/cloud/private-date-plane/overview' },
              items: [
                'manage/cloud/private-date-plane/management-models',
                'manage/cloud/private-date-plane/security-levels',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'ICP',
          link: { type: 'doc', id: 'manage/icp/integration-control-plane' },
          items: [
            'manage/icp/install-icp',
            'manage/icp/icp-console-overview',
            'manage/icp/connect-runtime',
            'manage/icp/observability-setup',
            'manage/icp/manage-projects',
            'manage/icp/manage-environments',
            'manage/icp/manage-integrations',
            'manage/icp/manage-runtimes',
            'manage/icp/access-control',
            {
              type: 'category',
              label: 'User Stores',
              link: { type: 'doc', id: 'manage/icp/user-stores/configure-user-stores' },
              items: [
                'manage/icp/user-stores/default-user-store',
                'manage/icp/user-stores/ldap-user-store',
                'manage/icp/user-stores/sso-configuration',
              ],
            },
            {
              type: 'category',
              label: 'MI Profile',
              items: [
                'manage/icp/mi-profile/observability-setup-mi',
                'manage/icp/mi-profile/connect-runtime-mi',
              ],
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // REFERENCE
    // "What's the exact syntax / config / API for Z?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      link: { type: 'doc', id: 'reference/reference' },
      items: [
        // Language
        {
          type: 'category',
          label: 'Language',
          items: [
            'reference/language/type-system',
            'reference/language/error-handling',
            'reference/language/query-expressions',
            'reference/language/concurrency'
          ],
        },
        // Configuration
        {
          type: 'category',
          label: 'Configuration',
          items: [
            'reference/config/ballerinatoml-reference',
            'reference/config/configtoml-reference',
            'reference/config/cloudtoml-reference',
            'reference/config/environment-variables',
          ],
        },
        // ICP Configuration
        {
          type: 'category',
          label: 'ICP Configuration',
          items: [
            'reference/icp/server-configuration',
            'reference/icp/database-configuration',
            'reference/icp/authentication-config',
          ],
        },
        // APIs
        {
          type: 'category',
          label: 'APIs',
          items: [
            'reference/api/management',
            'reference/api/auth-api',
            'reference/api/icp',
            'reference/api/ballerina-documentation',
          ],
        },

        'reference/supported-protocols',
        {
          type: 'category',
          label: 'Supported data formats',
          link: { type: 'doc', id: 'reference/data-formats/supported-data-formats' },
          items: [
            'reference/data-formats/avro',
            'reference/data-formats/csv',
            'reference/data-formats/edi',
            'reference/data-formats/fhir',
            'reference/data-formats/hl7',
            'reference/data-formats/json',
            'reference/data-formats/protocol-buffers',
            'reference/data-formats/toml',
            'reference/data-formats/xml',
            'reference/data-formats/yaml',
          ],
        },
        'reference/ballerina-by-example',
        'reference/ballerina-specifications',
        // Miscellaneous
        {
          type: 'category',
          label: 'Miscellaneous',
          items: [
            'reference/miscellaneous/configure-a-network-proxy',
            'reference/miscellaneous/proxy-ballerina-central-with-maven-repository',
          ],
        },
        // Appendix
        {
          type: 'category',
          label: 'Appendix',
          items: [
            'reference/appendix/system-requirements',
            'reference/error-code',
            'reference/glossary',
            'reference/faq',
            'reference/release-notes',
          ],
        },
      ],
    },
  ],
};


export default sidebars;
