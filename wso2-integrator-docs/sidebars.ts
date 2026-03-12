import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
 *   Deploy & Operate  — "How do I ship, run, and secure this?"
 *   Reference         — "What's the exact syntax / config / API for Z?"
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    // ─────────────────────────────────────────────
    // GET STARTED
    // "I'm new — what is this and how do I begin?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Get Started',
      link: {type: 'doc', id: 'get-started/index'},
      items: [
        {
          type: 'category',
          label: 'What is WSO2 Integrator?',
          items: [
            'get-started/overview',
            'get-started/why-wso2-integrator',
            'get-started/key-concepts',
          ],
        },
        {
          type: 'category',
          label: 'Set Up',
          items: [
            'get-started/system-requirements',
            'get-started/install-ballerina',
            'get-started/install',
            'get-started/first-project',
            'get-started/understand-the-ide',
          ],
        },
        {
          type: 'category',
          label: 'Quick Starts',
          items: [
            'get-started/quick-start-api',
            'get-started/quick-start-event',
            'get-started/quick-start-file',
            'get-started/quick-start-automation',
            'get-started/quick-start-data-service',
            'get-started/quick-start-ai-agent',
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
      link: {type: 'doc', id: 'develop/index'},
      items: [
        // 6.1 Create Integrations
        {
          type: 'category',
          label: 'Create Integrations',
          link: {type: 'doc', id: 'develop/create-integrations/index'},
          items: [
            'develop/create-integrations/create-new-integration',
            'develop/create-integrations/open-integration',
            'develop/create-integrations/explore-samples',
            'develop/create-integrations/create-library',
            'develop/create-integrations/import-external',
          ],
        },
        // 6.2 Project Views
        {
          type: 'category',
          label: 'Project Views',
          link: {type: 'doc', id: 'develop/project-views/index'},
          items: [
            'develop/project-views/workspace-view',
            'develop/project-views/integration-view',
            'develop/project-views/library-view',
          ],
        },
        // 6.3 Integration Artifacts
        {
          type: 'category',
          label: 'Integration Artifacts',
          link: {type: 'doc', id: 'develop/integration-artifacts/index'},
          items: [
            'develop/integration-artifacts/services',
            'develop/integration-artifacts/event-handlers',
            'develop/integration-artifacts/file-handlers',
            'develop/integration-artifacts/email',
            'develop/integration-artifacts/automation',
            'develop/integration-artifacts/data-persistence',
            'develop/integration-artifacts/other-artifacts',
          ],
        },
        // 6.4 Design Integration Logic
        {
          type: 'category',
          label: 'Design Integration Logic',
          link: {type: 'doc', id: 'develop/design-logic/index'},
          items: [
            'develop/design-logic/flow-designer',
            'develop/design-logic/connections',
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
        // 6.5 Transform
        {
          type: 'category',
          label: 'Transform',
          items: [
            'develop/transform/data-mapper',
            'develop/transform/json',
            'develop/transform/xml',
            'develop/transform/csv-flat-file',
            'develop/transform/edi',
            'develop/transform/yaml-toml',
            'develop/transform/type-system',
            'develop/transform/query-expressions',
            'develop/transform/expressions-functions',
            'develop/transform/ai-assisted-mapping',
          ],
        },
        // 6.6 Try & Test
        {
          type: 'category',
          label: 'Try & Test',
          items: [
            'develop/test/try-it',
            'develop/test/unit-testing',
            'develop/test/test-services-clients',
            'develop/test/data-driven-tests',
            'develop/test/test-groups',
            'develop/test/mocking',
            'develop/test/execute-tests',
            'develop/test/code-coverage',
            'develop/test/ai-test-generation',
          ],
        },
        // 6.7 Debugging & Troubleshooting
        {
          type: 'category',
          label: 'Debugging & Troubleshooting',
          link: {type: 'doc', id: 'develop/debugging/index'},
          items: [
            'develop/debugging/editor-debugging',
            'develop/debugging/remote-debugging',
            'develop/debugging/strand-dumps',
            'develop/debugging/performance-profiling',
          ],
        },
        // 6.8 Organize Code
        {
          type: 'category',
          label: 'Organize Code',
          link: {type: 'doc', id: 'develop/organize-code/index'},
          items: [
            'develop/organize-code/packages-modules',
            'develop/organize-code/package-references',
            'develop/organize-code/manage-dependencies',
            'develop/organize-code/workspaces',
            'develop/organize-code/style-guide',
            'develop/organize-code/generate-documentation',
            'develop/organize-code/static-code-analysis',
          ],
        },
        // 6.9 Tools
        {
          type: 'category',
          label: 'Tools',
          link: {type: 'doc', id: 'develop/tools/index'},
          items: [
            'develop/tools/migration-tools',
            'develop/tools/openapi-tool',
            'develop/tools/graphql-tool',
            'develop/tools/asyncapi-tool',
            'develop/tools/grpc-tool',
            'develop/tools/health-tool',
            'develop/tools/edi-tool',
            'develop/tools/wsdl-tool',
            'develop/tools/xsd-tool',
            'develop/tools/scan-tool',
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
      link: {type: 'doc', id: 'connectors/index'},
      items: [
        // Connector Catalog — organized by category
        {
          type: 'category',
          label: 'Connector Catalog',
          items: [
            'connectors/ai-llms',
            'connectors/cloud-services',
            'connectors/communication',
            'connectors/crm-sales',
            'connectors/databases',
            'connectors/developer-tools',
            'connectors/ecommerce',
            'connectors/erp-business',
            'connectors/finance-accounting',
            'connectors/healthcare',
            'connectors/hrms',
            'connectors/marketing-social',
            'connectors/messaging',
            'connectors/productivity-collaboration',
            'connectors/security-identity',
            'connectors/file-storage',
          ],
        },
        // Protocols & Data Formats
        {
          type: 'category',
          label: 'Protocols & Data Formats',
          items: [
            'connectors/protocols',
            'connectors/data-formats-standards',
          ],
        },
        // Using Connectors
        {
          type: 'category',
          label: 'Using Connectors',
          items: [
            'connectors/authentication',
            'connectors/configuration',
            'connectors/error-handling',
            'connectors/ballerina-libraries',
          ],
        },
        // Build Your Own
        {
          type: 'category',
          label: 'Build Your Own',
          items: [
            'connectors/custom-development',
            'connectors/create-from-openapi',
            'connectors/publish-to-central',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // GENAI
    // "How do I build AI agents, RAG, or MCP?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'GenAI',
      link: {type: 'doc', id: 'genai/index'},
      items: [
        // Getting Started
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'genai/getting-started/setup',
            {
              type: 'category',
              label: 'Building Your First AI Integration',
              items: [
                'genai/getting-started/smart-calculator',
                'genai/getting-started/hotel-booking-agent',
              ],
            },
          ],
        },
        // Key Concepts
        {
          type: 'category',
          label: 'Key Concepts',
          items: [
            'genai/key-concepts/what-is-llm',
            'genai/key-concepts/what-is-natural-function',
            'genai/key-concepts/what-is-ai-agent',
            'genai/key-concepts/what-are-tools',
            'genai/key-concepts/what-is-agent-memory',
            'genai/key-concepts/what-is-mcp',
            'genai/key-concepts/what-is-rag',
          ],
        },
        // Develop AI Applications
        {
          type: 'category',
          label: 'Develop AI Applications',
          items: [
            // Direct LLM Calls
            {
              type: 'category',
              label: 'Direct LLM Calls',
              items: [
                'genai/develop/direct-llm/configuring-providers',
                'genai/develop/direct-llm/constructing-prompts',
                'genai/develop/direct-llm/handling-responses',
              ],
            },
            // Natural Functions
            {
              type: 'category',
              label: 'Natural Functions',
              items: [
                'genai/develop/natural-functions/defining',
                'genai/develop/natural-functions/constructing-prompts',
                'genai/develop/natural-functions/handling-responses',
              ],
            },
            // RAG
            {
              type: 'category',
              label: 'RAG',
              items: [
                {
                  type: 'category',
                  label: 'RAG Ingestion',
                  items: [
                    'genai/develop/rag/chunking-documents',
                    'genai/develop/rag/generating-embeddings',
                    'genai/develop/rag/connecting-vector-dbs',
                  ],
                },
                'genai/develop/rag/rag-querying',
              ],
            },
            // AI Agents
            {
              type: 'category',
              label: 'AI Agents',
              items: [
                'genai/develop/agents/creating-agent',
                'genai/develop/agents/adding-tools',
                'genai/develop/agents/adding-memory',
                'genai/develop/agents/advanced-config',
                'genai/develop/agents/agent-observability',
                'genai/develop/agents/agent-evaluations',
              ],
            },
            // MCP Integration
            {
              type: 'category',
              label: 'MCP Integration',
              items: [
                'genai/develop/mcp/creating-mcp-server',
                'genai/develop/mcp/agents-with-mcp',
              ],
            },
          ],
        },
        // Deep Dives — Agents
        {
          type: 'category',
          label: 'Agents',
          items: [
            'genai/agents/architecture-concepts',
            'genai/agents/chat-agents',
            'genai/agents/api-exposed-agents',
            'genai/agents/natural-functions',
            'genai/agents/tool-binding',
            'genai/agents/memory-configuration',
            'genai/agents/multi-agent-orchestration',
          ],
        },
        // Deep Dives — RAG
        {
          type: 'category',
          label: 'RAG',
          items: [
            'genai/rag/architecture-overview',
            'genai/rag/document-ingestion',
            'genai/rag/chunking-embedding',
            'genai/rag/vector-databases',
            'genai/rag/building-rag-service',
          ],
        },
        // Deep Dives — MCP
        {
          type: 'category',
          label: 'MCP',
          items: [
            'genai/mcp/overview',
            'genai/mcp/consuming-mcp-tools',
            'genai/mcp/exposing-mcp-servers',
            'genai/mcp/mcp-security',
          ],
        },
        // LLM Connectivity
        {
          type: 'category',
          label: 'LLM Connectivity',
          items: [
            'genai/llm-connectivity/model-selection',
            'genai/llm-connectivity/prompt-engineering',
            'genai/llm-connectivity/managing-context-windows',
            'genai/llm-connectivity/natural-expressions',
            'genai/llm-connectivity/streaming-responses',
          ],
        },
        // Guardrails
        {
          type: 'category',
          label: 'Guardrails',
          items: [
            'genai/guardrails/responsible-ai',
            'genai/guardrails/content-filtering',
            'genai/guardrails/input-output-guardrails',
            'genai/guardrails/token-cost-management',
            'genai/guardrails/ai-usage-guidelines',
          ],
        },
        // Agent Observability
        {
          type: 'category',
          label: 'Agent Observability',
          items: [
            'genai/agent-observability/agent-tracing',
            'genai/agent-observability/conversation-logging',
            'genai/agent-observability/performance-metrics',
            'genai/agent-observability/debugging-agent-behavior',
          ],
        },
        // Quick Starts
        {
          type: 'category',
          label: 'Quick Starts',
          items: [
            'genai/quick-starts/build-conversational-agent',
            'genai/quick-starts/build-rag-application',
            'genai/quick-starts/expose-mcp-server',
          ],
        },
        // Tutorials
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'genai/tutorials/hr-knowledge-base-rag',
            'genai/tutorials/customer-care-mcp',
            'genai/tutorials/it-helpdesk-chatbot',
            'genai/tutorials/legal-doc-qa',
            'genai/tutorials/ai-customer-support',
            'genai/tutorials/conversational-data-pipeline',
            'genai/tutorials/mcp-enterprise-data',
            'genai/tutorials/multi-agent-workflow',
            'genai/tutorials/rag-knowledge-base',
          ],
        },
        // Reference
        {
          type: 'category',
          label: 'Reference',
          items: [
            'genai/reference/copilot-guide',
            'genai/reference/ai-governance',
            'genai/reference/troubleshooting',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // TUTORIALS
    // "Show me a complete, real example"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Tutorials',
      link: {type: 'doc', id: 'tutorials/index'},
      items: [
        // Walkthroughs
        {
          type: 'category',
          label: 'Walkthroughs',
          items: [
            'tutorials/salesforce-db-sync',
            'tutorials/kafka-event-pipeline',
            'tutorials/rest-api-aggregation',
            'tutorials/walkthroughs/content-based-routing',
            'tutorials/walkthroughs/data-transformation-pipeline',
            'tutorials/file-batch-etl',
            'tutorials/walkthroughs/email-notification-service',
            'tutorials/walkthroughs/cdc-service',
            'tutorials/healthcare-hl7-fhir',
            'tutorials/walkthroughs/edi-ftp-processing',
            'tutorials/data-reconciliation',
          ],
        },
        // Enterprise Integration Patterns (EIP)
        {
          type: 'category',
          label: 'Enterprise Integration Patterns',
          items: [
            'tutorials/patterns/content-based-router',
            'tutorials/patterns/message-filter',
            'tutorials/patterns/scatter-gather',
            'tutorials/patterns/recipient-list',
            'tutorials/patterns/message-translator',
            'tutorials/patterns/circuit-breaker',
            'tutorials/patterns/saga-compensation',
            'tutorials/patterns/publish-subscribe',
            'tutorials/patterns/guaranteed-delivery',
            'tutorials/patterns/idempotent-receiver',
            'tutorials/patterns/api-gateway-orchestration',
            'tutorials/patterns/agent-tool-orchestration',
            'tutorials/patterns/rag-pipeline',
          ],
        },
        // Pre-Built Integration Samples
        {
          type: 'category',
          label: 'Pre-Built Integration Samples',
          link: {type: 'doc', id: 'tutorials/pre-built/index'},
          items: [
            'tutorials/pre-built/google-sheets-salesforce',
            'tutorials/pre-built/github-email-summary',
            'tutorials/pre-built/google-drive-onedrive',
            'tutorials/pre-built/mysql-salesforce-products',
            'tutorials/pre-built/gmail-salesforce-leads',
            'tutorials/pre-built/kafka-salesforce-pricebook',
            'tutorials/pre-built/salesforce-twilio-sms',
            'tutorials/pre-built/hubspot-google-contacts',
            'tutorials/pre-built/ftp-edi-salesforce',
            'tutorials/pre-built/shopify-outlook-email',
          ],
        },
        // Sample Projects
        {
          type: 'category',
          label: 'Sample Projects',
          link: {type: 'doc', id: 'tutorials/samples/index'},
          items: [
            'tutorials/samples/hospital-service',
            'tutorials/samples/ecommerce-order-service',
            'tutorials/samples/event-driven-microservices',
            'tutorials/samples/data-service-persist',
            'tutorials/samples/restful-api-data-mapper',
            'tutorials/samples/ai-personal-assistant',
          ],
        },
        // Migration Guides
        {
          type: 'category',
          label: 'Migration Guides',
          items: [
            'tutorials/migration/from-wso2-mi',
            'tutorials/migration/from-mulesoft',
            'tutorials/migration/from-tibco',
            'tutorials/migration/from-boomi',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DEPLOY & OPERATE
    // "How do I ship, run, and secure this?"
    // ─────────────────────────────────────────────
    {
      type: 'category',
      label: 'Deploy & Operate',
      link: {type: 'doc', id: 'deploy-operate/index'},
      items: [
        // Deploy
        {
          type: 'category',
          label: 'Deploy',
          items: [
            'deploy-operate/deploy/local',
            'deploy-operate/deploy/vm-based',
            'deploy-operate/deploy/docker-kubernetes',
            'deploy-operate/deploy/openshift',
            'deploy-operate/deploy/serverless',
            'deploy-operate/deploy/devant',
            'deploy-operate/deploy/cloud-providers',
            'deploy-operate/deploy/graalvm',
            'deploy-operate/deploy/environments',
            'deploy-operate/deploy/managing-configurations',
            'deploy-operate/deploy/scaling-ha',
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
          link: {type: 'doc', id: 'deploy-operate/observe/index'},
          items: [
            'deploy-operate/observe/logging',
            'deploy-operate/observe/metrics',
            'deploy-operate/observe/tracing',
            'deploy-operate/observe/icp',
            'deploy-operate/observe/devant',
            'deploy-operate/observe/prometheus',
            'deploy-operate/observe/grafana',
            'deploy-operate/observe/jaeger',
            'deploy-operate/observe/zipkin',
            'deploy-operate/observe/datadog',
            'deploy-operate/observe/new-relic',
            'deploy-operate/observe/elastic',
            'deploy-operate/observe/opensearch',
            'deploy-operate/observe/moesif',
            'deploy-operate/observe/third-party',
          ],
        },
        // Secure
        {
          type: 'category',
          label: 'Secure',
          items: [
            'deploy-operate/secure/runtime-security',
            'deploy-operate/secure/authentication',
            'deploy-operate/secure/api-security',
            'deploy-operate/secure/secrets-encryption',
            'deploy-operate/secure/ip-whitelisting',
            'deploy-operate/secure/compliance',
          ],
        },
        // Capacity Planning
        {
          type: 'category',
          label: 'Capacity Planning',
          link: {type: 'doc', id: 'deploy-operate/capacity-planning/index'},
          items: [
            'deploy-operate/capacity-planning/performance-reports',
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
      link: {type: 'doc', id: 'reference/index'},
      items: [
        // Language
        {
          type: 'category',
          label: 'Language',
          items: [
            'reference/language/syntax',
            'reference/language/type-system',
            'reference/language/stdlib',
            'reference/language/query-expressions',
            'reference/language/concurrency',
            'reference/language/error-handling',
            'reference/language/integration-features',
          ],
        },
        // Configuration
        {
          type: 'category',
          label: 'Configuration',
          items: [
            'reference/config/ballerina-toml',
            'reference/config/config-toml',
            'reference/config/cloud-toml',
            'reference/config/dependencies-toml',
            'reference/config/environment-variables',
          ],
        },
        // CLI
        {
          type: 'category',
          label: 'CLI',
          items: [
            'reference/cli/bal-commands',
            'reference/cli/bal-persist',
            'reference/cli/bal-openapi',
            'reference/cli/bal-graphql',
            'reference/cli/bal-grpc',
            'reference/cli/bal-edi',
            'reference/cli/bal-health',
            'reference/cli/update-tool',
            'reference/cli/scan-tool',
          ],
        },
        // APIs
        {
          type: 'category',
          label: 'APIs',
          items: [
            'reference/api/management-api',
            'reference/api/icp-api',
            'reference/api/ballerina-api-docs',
          ],
        },
        'reference/protocols',
        'reference/data-formats',
        'reference/by-example',
        'reference/specifications',
        // Appendix
        {
          type: 'category',
          label: 'Appendix',
          items: [
            'reference/appendix/system-requirements',
            'reference/error-codes',
            'reference/glossary',
            'reference/faq',
            'reference/appendix/troubleshooting',
            'reference/release-notes',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
