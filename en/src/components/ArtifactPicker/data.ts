/**
 * Mirrors the "Add a new artifact" panel in the WSO2 Integrator editor
 * (same categories, same order, same icons -- vendored from
 * wso2/vscode-extensions, workspaces/common-libs/font-wso2-vscode/src/icons,
 * Apache-2.0) so this page reads as a familiar view for someone coming
 * from the editor. `href` is left undefined for artifact types that
 * don't have a doc page yet -- those render as a non-clickable card
 * instead of a fake or broken link.
 */

export type ArtifactCategoryKey =
  | 'automation'
  | 'workflow'
  | 'ai'
  | 'api'
  | 'event'
  | 'file'
  | 'other';

export interface ArtifactCategory {
  key: ArtifactCategoryKey;
  label: string;
  icon: string;
  description: string;
}

export interface Artifact {
  name: string;
  category: ArtifactCategoryKey;
  icon: string;
  href?: string;
  beta?: boolean;
  /** Page was written by research agents / without access to the real
   * product UI (see each page's own <!-- TODO --> comments) -- flags it
   * for a manual pass later. Remove this flag once a page's been
   * checked against the real product and its TODOs resolved. */
  generated?: boolean;
}

const ICON_BASE = '/img/artifact-icons';

export const CATEGORIES: ArtifactCategory[] = [
  {
    key: 'automation',
    label: 'Automation',
    icon: `${ICON_BASE}/automation.svg`,
    description: 'Run integration logic on a schedule or manually, without a network listener.',
  },
  {
    key: 'workflow',
    label: 'Durable Workflow',
    icon: `${ICON_BASE}/durable-workflow.svg`,
    description: 'Design long-running workflow logic that can be interrupted by events, use timers, involve human tasks, and run with crash recovery.',
  },
  {
    key: 'ai',
    label: 'AI Integration',
    icon: `${ICON_BASE}/chat-agent.svg`,
    description: 'Build AI-powered integrations that use large language models to reason, respond, and act.',
  },
  {
    key: 'api',
    label: 'Integration as API',
    icon: `${ICON_BASE}/http.svg`,
    description: 'Expose your integration logic as a callable endpoint. Clients send a request and receive a response.',
  },
  {
    key: 'event',
    label: 'Event-Driven Integration',
    icon: `${ICON_BASE}/kafka.svg`,
    description: 'React to messages or events produced by external systems. The integration runs when something happens, not when a client calls it.',
  },
  {
    key: 'file',
    label: 'File-Driven Integration',
    icon: `${ICON_BASE}/file.svg`,
    description: 'Trigger an integration when files appear on a remote server or local directory.',
  },
  {
    key: 'other',
    label: 'Supportive Artifacts',
    icon: `${ICON_BASE}/connector.svg`,
    description: 'Reusable building blocks shared across multiple integrations in the same project.',
  },
];

const DEV = '/develop-and-test/integration-artifacts';
const AI = '/develop-and-test/integration-artifacts/ai-integrations';

export const ARTIFACTS: Artifact[] = [
  // Automation
  { name: 'Automation', category: 'automation', icon: `${ICON_BASE}/automation.svg`, href: `${DEV}/automation` },

  // Durable Workflow
  { name: 'Durable Workflow', category: 'workflow', icon: `${ICON_BASE}/durable-workflow.svg`, href: `${DEV}/workflow/durable-workflow`, generated: true },
  { name: 'Durable Agentic Workflow', category: 'workflow', icon: `${ICON_BASE}/durable-workflow.svg`, href: `${DEV}/workflow/durable-agentic-workflow`, generated: true },

  // AI Integration
  { name: 'Chat Agent Service', category: 'ai', icon: `${ICON_BASE}/chat-agent.svg`, href: `${AI}/agents` },
  { name: 'MCP Service', category: 'ai', icon: `${ICON_BASE}/mcp.svg`, href: `${AI}/mcp` },

  // Integration as API
  { name: 'HTTP Service', category: 'api', icon: `${ICON_BASE}/http.svg`, href: `${DEV}/integration-as-api/http` },
  { name: 'GraphQL Service', category: 'api', icon: `${ICON_BASE}/graphql.svg`, href: `${DEV}/integration-as-api/graphql`, beta: true },
  { name: 'gRPC Service', category: 'api', icon: `${ICON_BASE}/grpc.svg`, href: `${DEV}/integration-as-api/grpc` },
  { name: 'WebSocket Service', category: 'api', icon: `${ICON_BASE}/websocket.svg`, href: `${DEV}/integration-as-api/websocket` },
  { name: 'TCP Service', category: 'api', icon: `${ICON_BASE}/tcp.svg`, href: `${DEV}/integration-as-api/tcp`, beta: true },
  { name: 'WebSub Hub', category: 'api', icon: `${ICON_BASE}/websub.svg`, href: `${DEV}/integration-as-api/websub-hub` },

  // Event-Driven Integration
  { name: 'Kafka', category: 'event', icon: `${ICON_BASE}/kafka.svg`, href: `${DEV}/event-driven-integration/kafka` },
  { name: 'RabbitMQ', category: 'event', icon: `${ICON_BASE}/rabbitmq.svg`, href: `${DEV}/event-driven-integration/rabbitmq` },
  { name: 'Solace', category: 'event', icon: `${ICON_BASE}/solace.svg`, href: `${DEV}/event-driven-integration/solace` },
  { name: 'Solace (JMS)', category: 'event', icon: `${ICON_BASE}/solace.svg`, href: `${DEV}/event-driven-integration/solace-jms`, generated: true },
  { name: 'MQTT', category: 'event', icon: `${ICON_BASE}/mqtt.svg`, href: `${DEV}/event-driven-integration/mqtt` },
  { name: 'Azure Service Bus', category: 'event', icon: `${ICON_BASE}/azure-files.svg`, href: `${DEV}/event-driven-integration/azure-service-bus` },
  { name: 'AWS SQS', category: 'event', icon: `${ICON_BASE}/aws.svg`, href: `${DEV}/event-driven-integration/aws-sqs`, generated: true },
  { name: 'CDC — MySQL', category: 'event', icon: `${ICON_BASE}/mysql.svg`, href: `${DEV}/event-driven-integration/cdc-mysql`, generated: true },
  { name: 'CDC — PostgreSQL', category: 'event', icon: `${ICON_BASE}/postgresql.svg`, href: `${DEV}/event-driven-integration/cdc-postgresql` },
  { name: 'CDC — MSSQL', category: 'event', icon: `${ICON_BASE}/mssql.svg`, href: `${DEV}/event-driven-integration/cdc-mssql` },
  { name: 'Salesforce', category: 'event', icon: `${ICON_BASE}/connector.svg`, href: `${DEV}/event-driven-integration/salesforce-events` },
  { name: 'GitHub', category: 'event', icon: `${ICON_BASE}/github.svg`, href: `${DEV}/event-driven-integration/github-webhooks`, beta: true },
  { name: 'Shopify', category: 'event', icon: `${ICON_BASE}/shopify.svg`, href: `${DEV}/event-driven-integration/shopify`, beta: true, generated: true },
  { name: 'HubSpot', category: 'event', icon: `${ICON_BASE}/hubspot.svg`, href: `${DEV}/event-driven-integration/hubspot`, beta: true, generated: true },
  { name: 'Twilio', category: 'event', icon: `${ICON_BASE}/chat.svg`, href: `${DEV}/event-driven-integration/twilio` },
  { name: 'WhatsApp Business', category: 'event', icon: `${ICON_BASE}/whatsapp.svg`, href: `${DEV}/event-driven-integration/whatsapp-business`, generated: true },
  { name: 'Telegram', category: 'event', icon: `${ICON_BASE}/telegram.svg`, href: `${DEV}/event-driven-integration/telegram`, generated: true },
  { name: 'Google Chat', category: 'event', icon: `${ICON_BASE}/google-chat.svg`, href: `${DEV}/event-driven-integration/google-chat`, generated: true },
  { name: 'POP3/IMAP4', category: 'event', icon: `${ICON_BASE}/email.svg`, href: `${DEV}/event-driven-integration/pop3imap4` },

  // File-Driven Integration
  { name: 'FTP/SFTP', category: 'file', icon: `${ICON_BASE}/ftp.svg`, href: `${DEV}/file-driven-integration/ftp-sftp` },
  { name: 'SMB', category: 'file', icon: `${ICON_BASE}/smb.svg`, href: `${DEV}/file-driven-integration/smb` },
  { name: 'Azure Files', category: 'file', icon: `${ICON_BASE}/azure-files.svg`, href: `${DEV}/file-driven-integration/azure-files` },
  { name: 'Local Files', category: 'file', icon: `${ICON_BASE}/file.svg`, href: `${DEV}/file-driven-integration/local-files` },

  // Supportive Artifacts
  { name: 'Function', category: 'other', icon: `${ICON_BASE}/function.svg`, href: `${DEV}/supportive-artifacts/functions` },
  { name: 'Data Mapper', category: 'other', icon: `${ICON_BASE}/data-mapper.svg`, href: `${DEV}/supportive-artifacts/data-mapper/data-mapper` },
  { name: 'Type', category: 'other', icon: `${ICON_BASE}/type.svg`, href: `${DEV}/supportive-artifacts/types` },
  { name: 'Connection', category: 'other', icon: `${ICON_BASE}/connection.svg`, href: `${DEV}/supportive-artifacts/connections` },
  { name: 'Configuration', category: 'other', icon: `${ICON_BASE}/config.svg`, href: `${DEV}/supportive-artifacts/configurations` },
  { name: 'Agent', category: 'other', icon: `${ICON_BASE}/chat-agent.svg`, href: `${DEV}/supportive-artifacts/agent`, generated: true },
];
