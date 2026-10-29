import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import { connectorVersionedDocs } from './src/utils/sidebarUtils';

/**
 * WSO2 Connectors — Sidebar Configuration
 *
 * Standalone catalog site. Split out from the WSO2 Integrator docs
 * (docs-integrator) per the branch rule: evergreen, decoupled content
 * gets its own branch — see Docs Repo & Branch Strategy §5.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    // ── Connector Catalog (pinned, flat row -- see DocSidebarItem/Category's
    //    collapseOwnPage customProps and custom.css's .catalog-pinned-row) ──
    {
      type: 'category',
      label: 'Connector Catalog',
      className: 'catalog-pinned-row',
      customProps: { badge: '192', collapseOwnPage: true },
      collapsed: true,
      link: { type: 'doc', id: 'catalog/index' },
      items: [
        // ── Connector categories (alphabetical) ──
        {
          type: 'category',
          label: 'AI',
          link: { type: 'doc', id: 'catalog/ai-ml/ai/ai-overview' },
          items: [
            'catalog/ai-ml/ai/action-reference',
            'catalog/ai-ml/ai/trigger-reference',
          ],
        },
        {
          type: 'category',

          label: 'Alfresco',
          link: { type: 'doc', id: 'catalog/storage-file/alfresco/connector-overview' },
          items: [
            'catalog/storage-file/alfresco/setup-guide',
            'catalog/storage-file/alfresco/actions',
            'catalog/storage-file/alfresco/example',
          ],
        },
        {
          type: 'category',
          label: 'AMP',
          link: { type: 'doc', id: 'catalog/developer-tools/amp/connector-overview' },
          items: [
            'catalog/developer-tools/amp/setup-guide',
            'catalog/developer-tools/amp/actions',
          ],
        },
        {
          type: 'category',
          label: 'Ardoq',
          link: { type: 'doc', id: 'catalog/erp-business/ardoq/overview' },
          items: [
            'catalog/erp-business/ardoq/setup-guide',
            'catalog/erp-business/ardoq/action-reference',
            'catalog/erp-business/ardoq/example',
          ],
        },
        {
          type: 'category',

          label: 'Asana',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/asana/connector-overview' },
          items: [
            'catalog/productivity-collaboration/asana/setup-guide',
            'catalog/productivity-collaboration/asana/actions',
            'catalog/productivity-collaboration/asana/example',
          ],
        },
        {
          type: 'category',
          label: 'AuthZEN',
          link: { type: 'doc', id: 'catalog/security-identity/authzen/connector-overview' },
          items: [
            'catalog/security-identity/authzen/setup-guide',
            'catalog/security-identity/authzen/actions',
            'catalog/security-identity/authzen/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS DynamoDB',
          link: { type: 'doc', id: 'catalog/database/aws.dynamodb/connector-overview' },
          items: [
            'catalog/database/aws.dynamodb/setup-guide',
            'catalog/database/aws.dynamodb/actions',
            'catalog/database/aws.dynamodb/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS DynamoDB Streams',
          link: { type: 'doc', id: 'catalog/database/aws.dynamodbstreams/connector-overview' },
          items: [
            'catalog/database/aws.dynamodbstreams/setup-guide',
            'catalog/database/aws.dynamodbstreams/actions',
            'catalog/database/aws.dynamodbstreams/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Marketplace MPE',
          link: { type: 'doc', id: 'catalog/cloud-infrastructure/aws.marketplace.mpe/aws-marketplace-mpe-connector-overview' },
          items: [
            'catalog/cloud-infrastructure/aws.marketplace.mpe/setup-guide',
            'catalog/cloud-infrastructure/aws.marketplace.mpe/actions',
            'catalog/cloud-infrastructure/aws.marketplace.mpe/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Marketplace MPM',
          link: { type: 'doc', id: 'catalog/cloud-infrastructure/aws.marketplace.mpm/aws-marketplace-mpm-connector-overview' },
          items: [
            'catalog/cloud-infrastructure/aws.marketplace.mpm/setup-guide',
            'catalog/cloud-infrastructure/aws.marketplace.mpm/actions',
            'catalog/cloud-infrastructure/aws.marketplace.mpm/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Redshift',
          link: { type: 'doc', id: 'catalog/database/aws.redshift/aws-redshift-connector-overview' },
          items: [
            'catalog/database/aws.redshift/setup-guide',
            'catalog/database/aws.redshift/actions',
            'catalog/database/aws.redshift/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Redshift Data',
          link: { type: 'doc', id: 'catalog/database/aws.redshiftdata/connector-overview' },
          items: [
            'catalog/database/aws.redshiftdata/setup-guide',
            'catalog/database/aws.redshiftdata/actions',
            'catalog/database/aws.redshiftdata/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS S3',
          link: { type: 'doc', id: 'catalog/storage-file/aws.s3/overview' },
          items: [
            'catalog/storage-file/aws.s3/setup-guide',
            'catalog/storage-file/aws.s3/action-reference',
            'catalog/storage-file/aws.s3/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS Secrets Manager',
          link: { type: 'doc', id: 'catalog/security-identity/aws.secretmanager/aws-secrets-manager-connector-overview' },
          items: [
            'catalog/security-identity/aws.secretmanager/setup-guide',
            'catalog/security-identity/aws.secretmanager/actions',
            'catalog/security-identity/aws.secretmanager/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS SES',
          link: { type: 'doc', id: 'catalog/marketing-social/aws.ses/connector-overview' },
          items: [
            'catalog/marketing-social/aws.ses/setup-guide',
            'catalog/marketing-social/aws.ses/actions',
            'catalog/marketing-social/aws.ses/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS SimpleDB',
          link: { type: 'doc', id: 'catalog/database/aws.simpledb/connector-overview' },
          items: [
            'catalog/database/aws.simpledb/setup-guide',
            'catalog/database/aws.simpledb/actions',
            'catalog/database/aws.simpledb/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS SNS',
          link: { type: 'doc', id: 'catalog/communication/aws.sns/aws-sns-connector-overview' },
          items: [
            'catalog/communication/aws.sns/setup-guide',
            'catalog/communication/aws.sns/actions',
            'catalog/communication/aws.sns/example',
          ],
        },
        {
          type: 'category',
          label: 'AWS SQS',
          link: { type: 'doc', id: 'catalog/messaging/aws.sqs/overview' },
          items: [
            'catalog/messaging/aws.sqs/setup-guide',
            'catalog/messaging/aws.sqs/action-reference',
            'catalog/messaging/aws.sqs/trigger-reference',
            'catalog/messaging/aws.sqs/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure AI Search',
          link: { type: 'doc', id: 'catalog/ai-ml/azure.ai.search/azure-ai-search-connector-overview' },
          items: [
            'catalog/ai-ml/azure.ai.search/setup-guide',
            'catalog/ai-ml/azure.ai.search/actions',
            'catalog/ai-ml/azure.ai.search/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure AI Search Index',
          link: { type: 'doc', id: 'catalog/ai-ml/azure.ai.search.index/azure-ai-search-index-connector-overview' },
          items: [
            'catalog/ai-ml/azure.ai.search.index/setup-guide',
            'catalog/ai-ml/azure.ai.search.index/actions',
            'catalog/ai-ml/azure.ai.search.index/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure Blob Storage',
          link: { type: 'doc', id: 'catalog/storage-file/azure.storage.blob/overview' },
          items: [
            'catalog/storage-file/azure.storage.blob/setup-guide',
            'catalog/storage-file/azure.storage.blob/action-reference',
            'catalog/storage-file/azure.storage.blob/trigger-reference',
            'catalog/storage-file/azure.storage.blob/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure Files',
          link: { type: 'doc', id: 'catalog/storage-file/azure.storage.files/overview' },
          items: [
            'catalog/storage-file/azure.storage.files/setup-guide',
            'catalog/storage-file/azure.storage.files/action-reference',
            'catalog/storage-file/azure.storage.files/trigger-reference',
            'catalog/storage-file/azure.storage.files/example',
          ],
        },
        {
          type: 'category',

          label: 'Azure Service Bus',
          link: { type: 'doc', id: 'catalog/messaging/asb/azure-service-bus-connector-overview' },
          items: [
            'catalog/messaging/asb/setup-guide',
            'catalog/messaging/asb/actions',
            'catalog/messaging/asb/triggers',
            'catalog/messaging/asb/example',
          ],
        },
        {
          type: 'category',
          label: 'Azure Storage Service',
          link: { type: 'doc', id: 'catalog/storage-file/azure_storage_service/overview' },
          items: [
            'catalog/storage-file/azure_storage_service/setup-guide',
            'catalog/storage-file/azure_storage_service/actions',
          ],
        },
        {
          type: 'category',
          label: 'Candid',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/candid/connector-overview' },
          items: [
            'catalog/productivity-collaboration/candid/setup-guide',
            'catalog/productivity-collaboration/candid/actions',
          ],
        },
        {
          type: 'category',
          label: 'CDC',
          link: { type: 'doc', id: 'catalog/database/cdc/connector-overview' },
          items: [
            'catalog/database/cdc/setup-guide',
            'catalog/database/cdc/triggers',
          ],
        },
        {
          type: 'category',
          label: 'Confluent Avro SerDes',
          link: { type: 'doc', id: 'catalog/messaging/confluent.cavroserdes/confluent-avro-serdes-connector-overview' },
          items: [
            'catalog/messaging/confluent.cavroserdes/setup-guide',
            'catalog/messaging/confluent.cavroserdes/actions',
          ],
        },
        {
          type: 'category',
          label: 'Confluent Schema Registry',
          link: { type: 'doc', id: 'catalog/messaging/confluent.cregistry/confluent-schema-registry-connector-overview' },
          items: [
            'catalog/messaging/confluent.cregistry/setup-guide',
            'catalog/messaging/confluent.cregistry/actions',
            'catalog/messaging/confluent.cregistry/example',
          ],
        },
        {
          type: 'category',
          label: 'Copybook',
          link: { type: 'doc', id: 'catalog/developer-tools/copybook/connector-overview' },
          items: [
            'catalog/developer-tools/copybook/setup-guide',
            'catalog/developer-tools/copybook/actions',
          ],
        },
        {
          type: 'category',

          label: 'Discord',
          link: { type: 'doc', id: 'catalog/communication/discord/connector-overview' },
          items: [
            'catalog/communication/discord/setup-guide',
            'catalog/communication/discord/actions',
            'catalog/communication/discord/example',
          ],
        },
        {
          type: 'category',
          label: 'DocuSign Admin',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/docusign.dsadmin/docusign-admin-connector-overview' },
          items: [
            'catalog/productivity-collaboration/docusign.dsadmin/setup-guide',
            'catalog/productivity-collaboration/docusign.dsadmin/actions',
            'catalog/productivity-collaboration/docusign.dsadmin/example',
          ],
        },
        {
          type: 'category',
          label: 'Elastic Cloud',
          link: { type: 'doc', id: 'catalog/cloud-infrastructure/elastic.elasticcloud/elastic-cloud-connector-overview' },
          items: [
            'catalog/cloud-infrastructure/elastic.elasticcloud/setup-guide',
            'catalog/cloud-infrastructure/elastic.elasticcloud/actions',
            'catalog/cloud-infrastructure/elastic.elasticcloud/example',
          ],
        },
        {
          type: 'category',
          label: 'Email',
          link: { type: 'doc', id: 'catalog/communication/email/email' },
          items: [
            'catalog/communication/email/setup-guide',
            'catalog/communication/email/action-reference',
            'catalog/communication/email/trigger-reference',
            'catalog/communication/email/example',
          ],
        },
        {
          type: 'category',
          label: 'FTP',
          link: { type: 'doc', id: 'catalog/storage-file/ftp/ftp' },
          items: [
            'catalog/storage-file/ftp/action-reference',
            'catalog/storage-file/ftp/trigger-reference',
            'catalog/storage-file/ftp/example',
          ],
        },
        {
          type: 'category',
          label: 'GitHub',
          link: { type: 'doc', id: 'catalog/developer-tools/github/connector-overview' },
          items: [
            'catalog/developer-tools/github/setup-guide',
            'catalog/developer-tools/github/actions',
            'catalog/developer-tools/github/triggers',
            'catalog/developer-tools/github/example',
          ],
        },
        {
          type: 'category',
          label: 'Gmail',
          link: { type: 'doc', id: 'catalog/communication/googleapis.gmail/gmail-connector-overview' },
          items: [
            'catalog/communication/googleapis.gmail/setup-guide',
            'catalog/communication/googleapis.gmail/actions',
            'catalog/communication/googleapis.gmail/example',
          ],
        },
        {
          type: 'category',
          label: 'Google Calendar',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/googleapis.calendar/google-calendar-connector-overview' },
          items: [
            'catalog/productivity-collaboration/googleapis.calendar/setup-guide',
            'catalog/productivity-collaboration/googleapis.calendar/actions',
            'catalog/productivity-collaboration/googleapis.calendar/example',
          ],
        },
        {
          type: 'category',
          label: 'Google Chat',
          link: { type: 'doc', id: 'catalog/communication/google-chat/overview' },
          items: [
            'catalog/communication/google-chat/setup-guide',
            'catalog/communication/google-chat/actions',
            'catalog/communication/google-chat/triggers',
            'catalog/communication/google-chat/example',
          ],
        },
        {
          type: 'category',
          label: 'Google Cloud Pub/Sub',
          link: { type: 'doc', id: 'catalog/messaging/gcloud.pubsub/google-cloud-pubsub-connector-overview' },
          items: [
            'catalog/messaging/gcloud.pubsub/setup-guide',
            'catalog/messaging/gcloud.pubsub/actions',
            'catalog/messaging/gcloud.pubsub/triggers',
            'catalog/messaging/gcloud.pubsub/example',
          ],
        },
        {
          type: 'category',
          label: 'Google GCalendar',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/googleapis.gcalendar/google-calendar-connector-overview' },
          items: [
            'catalog/productivity-collaboration/googleapis.gcalendar/setup-guide',
            'catalog/productivity-collaboration/googleapis.gcalendar/actions',
          ],
        },
        {
          type: 'category',
          label: 'Google Sheets',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/googleapis.sheets/google-sheets-connector-overview' },
          items: [
            'catalog/productivity-collaboration/googleapis.sheets/setup-guide',
            'catalog/productivity-collaboration/googleapis.sheets/actions',
            'catalog/productivity-collaboration/googleapis.sheets/example',
          ],
        },
        {
          type: 'category',
          label: 'gRPC',
          link: { type: 'doc', id: 'catalog/network-protocols/grpc/grpc' },
          items: [
            'catalog/network-protocols/grpc/action-reference',
            'catalog/network-protocols/grpc/trigger-reference',
            'catalog/network-protocols/grpc/example',
          ],
        },
        {
          type: 'category',
          label: 'GraphQL',
          link: { type: 'doc', id: 'catalog/network-protocols/graphql/graphql' },
          items: [
            'catalog/network-protocols/graphql/action-reference',
            'catalog/network-protocols/graphql/trigger-reference',
            'catalog/network-protocols/graphql/example',
          ],
        },
        {
          type: 'category',
          label: 'Guidewire InsuranceNow',
          link: { type: 'doc', id: 'catalog/erp-business/guidewire.insnow/guidewire-insurancenow-connector-overview' },
          items: [
            'catalog/erp-business/guidewire.insnow/setup-guide',
            'catalog/erp-business/guidewire.insnow/actions',
            'catalog/erp-business/guidewire.insnow/example',
          ],
        },
        {
          type: 'category',
          label: 'HTTP',
          link: { type: 'doc', id: 'catalog/network-protocols/http/overview' },
          items: [
            'catalog/network-protocols/http/action-reference',
            'catalog/network-protocols/http/trigger-reference',
            'catalog/network-protocols/http/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Automation Actions',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.automation.actions/hubspot-automation-actions-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.automation.actions/setup-guide',
            'catalog/crm-sales/hubspot.automation.actions/actions',
            'catalog/crm-sales/hubspot.automation.actions/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Associations',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.associations/hubspot-crm-associations' },
          items: [
            'catalog/crm-sales/hubspot.crm.associations/setup-guide',
            'catalog/crm-sales/hubspot.crm.associations/actions',
            'catalog/crm-sales/hubspot.crm.associations/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Associations Schema',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.associations.schema/hubspot-crm-associations-schema' },
          items: [
            'catalog/crm-sales/hubspot.crm.associations.schema/setup-guide',
            'catalog/crm-sales/hubspot.crm.associations.schema/actions',
            'catalog/crm-sales/hubspot.crm.associations.schema/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Carts',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.commerce.carts/hubspot-crm-commerce-carts' },
          items: [
            'catalog/crm-sales/hubspot.crm.commerce.carts/setup-guide',
            'catalog/crm-sales/hubspot.crm.commerce.carts/actions',
            'catalog/crm-sales/hubspot.crm.commerce.carts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Discounts',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.commerce.discounts/hubspot-crm-commerce-discounts' },
          items: [
            'catalog/crm-sales/hubspot.crm.commerce.discounts/setup-guide',
            'catalog/crm-sales/hubspot.crm.commerce.discounts/actions',
            'catalog/crm-sales/hubspot.crm.commerce.discounts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Orders',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.commerce.orders/hubspot-crm-commerce-orders' },
          items: [
            'catalog/crm-sales/hubspot.crm.commerce.orders/setup-guide',
            'catalog/crm-sales/hubspot.crm.commerce.orders/actions',
            'catalog/crm-sales/hubspot.crm.commerce.orders/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Quotes',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot-crm-commerce-quotes' },
          items: [
            'catalog/crm-sales/hubspot.crm.commerce.quotes/setup-guide',
            'catalog/crm-sales/hubspot.crm.commerce.quotes/actions',
            'catalog/crm-sales/hubspot.crm.commerce.quotes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Commerce Taxes',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.commerce.taxes/hubspot-crm-commerce-taxes' },
          items: [
            'catalog/crm-sales/hubspot.crm.commerce.taxes/setup-guide',
            'catalog/crm-sales/hubspot.crm.commerce.taxes/actions',
            'catalog/crm-sales/hubspot.crm.commerce.taxes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Companies',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.companies/hubspot-crm-companies-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.companies/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.companies/actions',
            'catalog/crm-sales/hubspot.crm.obj.companies/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Contacts',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.contacts/hubspot-crm-contacts-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.contacts/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.contacts/actions',
            'catalog/crm-sales/hubspot.crm.obj.contacts/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Deals',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.deals/hubspot-crm-deals-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.deals/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.deals/actions',
            'catalog/crm-sales/hubspot.crm.obj.deals/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagement Meeting',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.engagement.meeting/hubspot-crm-engagement-meeting-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.crm.engagement.meeting/setup-guide',
            'catalog/crm-sales/hubspot.crm.engagement.meeting/actions',
            'catalog/crm-sales/hubspot.crm.engagement.meeting/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagement Notes',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.engagement.notes/hubspot-crm-engagement-notes' },
          items: [
            'catalog/crm-sales/hubspot.crm.engagement.notes/setup-guide',
            'catalog/crm-sales/hubspot.crm.engagement.notes/actions',
            'catalog/crm-sales/hubspot.crm.engagement.notes/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Calls',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.engagements.calls/hubspot-crm-engagements-calls' },
          items: [
            'catalog/crm-sales/hubspot.crm.engagements.calls/setup-guide',
            'catalog/crm-sales/hubspot.crm.engagements.calls/actions',
            'catalog/crm-sales/hubspot.crm.engagements.calls/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Communications',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.engagements.communications/hubspot-crm-engagements-communications' },
          items: [
            'catalog/crm-sales/hubspot.crm.engagements.communications/setup-guide',
            'catalog/crm-sales/hubspot.crm.engagements.communications/actions',
            'catalog/crm-sales/hubspot.crm.engagements.communications/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Email',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.engagements.email/hubspot-crm-engagements-email' },
          items: [
            'catalog/crm-sales/hubspot.crm.engagements.email/setup-guide',
            'catalog/crm-sales/hubspot.crm.engagements.email/actions',
            'catalog/crm-sales/hubspot.crm.engagements.email/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Engagements Tasks',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.engagements.tasks/hubspot-crm-engagements-tasks' },
          items: [
            'catalog/crm-sales/hubspot.crm.engagements.tasks/setup-guide',
            'catalog/crm-sales/hubspot.crm.engagements.tasks/actions',
            'catalog/crm-sales/hubspot.crm.engagements.tasks/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Extensions Timelines',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.extensions.timelines/hubspot-crm-extensions-timelines' },
          items: [
            'catalog/crm-sales/hubspot.crm.extensions.timelines/setup-guide',
            'catalog/crm-sales/hubspot.crm.extensions.timelines/actions',
            'catalog/crm-sales/hubspot.crm.extensions.timelines/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Extensions Videoconferencing',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.extensions.videoconferencing/hubspot-crm-extensions-videoconferencing' },
          items: [
            'catalog/crm-sales/hubspot.crm.extensions.videoconferencing/setup-guide',
            'catalog/crm-sales/hubspot.crm.extensions.videoconferencing/actions',
            'catalog/crm-sales/hubspot.crm.extensions.videoconferencing/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Feedback',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.feedback/hubspot-crm-feedback-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.feedback/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.feedback/actions',
            'catalog/crm-sales/hubspot.crm.obj.feedback/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Import',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.import/hubspot-crm-import' },
          items: [
            'catalog/crm-sales/hubspot.crm.import/setup-guide',
            'catalog/crm-sales/hubspot.crm.import/actions',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Leads',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.leads/hubspot-crm-leads-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.leads/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.leads/actions',
            'catalog/crm-sales/hubspot.crm.obj.leads/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Line Items',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.lineitems/hubspot-crm-line-items-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.lineitems/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.lineitems/actions',
            'catalog/crm-sales/hubspot.crm.obj.lineitems/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Lists',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.lists/hubspot-crm-lists' },
          items: [
            'catalog/crm-sales/hubspot.crm.lists/setup-guide',
            'catalog/crm-sales/hubspot.crm.lists/actions',
            'catalog/crm-sales/hubspot.crm.lists/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Owners',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.owners/hubspot-crm-owners' },
          items: [
            'catalog/crm-sales/hubspot.crm.owners/setup-guide',
            'catalog/crm-sales/hubspot.crm.owners/actions',
            'catalog/crm-sales/hubspot.crm.owners/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Pipelines',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.pipelines/hubspot-crm-pipelines' },
          items: [
            'catalog/crm-sales/hubspot.crm.pipelines/setup-guide',
            'catalog/crm-sales/hubspot.crm.pipelines/actions',
            'catalog/crm-sales/hubspot.crm.pipelines/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Products',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.products/hubspot-crm-products' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.products/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.products/actions',
            'catalog/crm-sales/hubspot.crm.obj.products/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Properties',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.properties/hubspot-crm-properties' },
          items: [
            'catalog/crm-sales/hubspot.crm.properties/setup-guide',
            'catalog/crm-sales/hubspot.crm.properties/actions',
            'catalog/crm-sales/hubspot.crm.properties/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Schemas',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.schemas/hubspot-crm-schemas' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.schemas/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.schemas/actions',
            'catalog/crm-sales/hubspot.crm.obj.schemas/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot CRM Tickets',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.crm.obj.tickets/hubspot-crm-tickets-connector-overview' },
          items: [
            'catalog/crm-sales/hubspot.crm.obj.tickets/setup-guide',
            'catalog/crm-sales/hubspot.crm.obj.tickets/actions',
            'catalog/crm-sales/hubspot.crm.obj.tickets/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Events Completions',
          link: { type: 'doc', id: 'catalog/crm-sales/hubspot.events.completions/overview' },
          items: [
            'catalog/crm-sales/hubspot.events.completions/setup-guide',
            'catalog/crm-sales/hubspot.events.completions/action-reference',
            'catalog/crm-sales/hubspot.events.completions/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Campaigns',
          link: { type: 'doc', id: 'catalog/marketing-social/hubspot.marketing.campaigns/hubspot-marketing-campaigns' },
          items: [
            'catalog/marketing-social/hubspot.marketing.campaigns/setup-guide',
            'catalog/marketing-social/hubspot.marketing.campaigns/actions',
            'catalog/marketing-social/hubspot.marketing.campaigns/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Emails',
          link: { type: 'doc', id: 'catalog/marketing-social/hubspot.marketing.emails/hubspot-marketing-emails' },
          items: [
            'catalog/marketing-social/hubspot.marketing.emails/setup-guide',
            'catalog/marketing-social/hubspot.marketing.emails/actions',
            'catalog/marketing-social/hubspot.marketing.emails/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Events',
          link: { type: 'doc', id: 'catalog/marketing-social/hubspot.marketing.events/hubspot-marketing-events-connector-overview' },
          items: [
            'catalog/marketing-social/hubspot.marketing.events/setup-guide',
            'catalog/marketing-social/hubspot.marketing.events/actions',
            'catalog/marketing-social/hubspot.marketing.events/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Forms',
          link: { type: 'doc', id: 'catalog/marketing-social/hubspot.marketing.forms/hubspot-marketing-forms' },
          items: [
            'catalog/marketing-social/hubspot.marketing.forms/setup-guide',
            'catalog/marketing-social/hubspot.marketing.forms/actions',
            'catalog/marketing-social/hubspot.marketing.forms/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Subscriptions',
          link: { type: 'doc', id: 'catalog/marketing-social/hubspot.marketing.subscriptions/hubspot-marketing-subscriptions-connector-overview' },
          items: [
            'catalog/marketing-social/hubspot.marketing.subscriptions/setup-guide',
            'catalog/marketing-social/hubspot.marketing.subscriptions/actions',
            'catalog/marketing-social/hubspot.marketing.subscriptions/example',
          ],
        },
        {
          type: 'category',
          label: 'HubSpot Marketing Transactional',
          link: { type: 'doc', id: 'catalog/marketing-social/hubspot.marketing.transactional/hubspot-marketing-transactional-connector-overview' },
          items: [
            'catalog/marketing-social/hubspot.marketing.transactional/setup-guide',
            'catalog/marketing-social/hubspot.marketing.transactional/actions',
          ],
        },
        {
          type: 'category',
          label: 'IBM CTG',
          link: { type: 'doc', id: 'catalog/erp-business/ibm.ctg/ibm-ctg-connector-overview' },
          items: [
            'catalog/erp-business/ibm.ctg/setup-guide',
            'catalog/erp-business/ibm.ctg/actions',
            'catalog/erp-business/ibm.ctg/example',
          ],
        },
        {
          type: 'category',
          label: 'IBM MQ',
          link: { type: 'doc', id: 'catalog/messaging/ibm.ibmmq/ibm-mq-connector-overview' },
          items: [
            'catalog/messaging/ibm.ibmmq/setup-guide',
            'catalog/messaging/ibm.ibmmq/actions',
            'catalog/messaging/ibm.ibmmq/triggers',
          ],
        },
        {
          type: 'category',
          label: 'Intercom',
          link: { type: 'doc', id: 'catalog/communication/intercom/connector-overview' },
          items: [
            'catalog/communication/intercom/setup-guide',
            'catalog/communication/intercom/action-reference',
            'catalog/communication/intercom/example',
          ],
        },
        {
          type: 'category',
          label: 'Java JDBC',
          link: { type: 'doc', id: 'catalog/database/java.jdbc/java-jdbc-connector-overview' },
          items: [
            'catalog/database/java.jdbc/setup-guide',
            'catalog/database/java.jdbc/actions',
            'catalog/database/java.jdbc/example',
          ],
        },
        {
          type: 'category',
          label: 'Jira',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/jira/connector-overview' },
          items: [
            'catalog/productivity-collaboration/jira/setup-guide',
            'catalog/productivity-collaboration/jira/actions',
            'catalog/productivity-collaboration/jira/example',
          ],
        },
        {
          type: 'category',
          label: 'JMS',
          link: { type: 'doc', id: 'catalog/messaging/java.jms/jms-connector-overview' },
          items: [
            'catalog/messaging/java.jms/setup-guide',
            'catalog/messaging/java.jms/actions',
            'catalog/messaging/java.jms/triggers',
            'catalog/messaging/java.jms/example',
          ],
        },
        {
          type: 'category',
          label: 'Kafka',
          link: { type: 'doc', id: 'catalog/messaging/kafka/connector-overview' },
          items: [
            'catalog/messaging/kafka/setup-guide',
            'catalog/messaging/kafka/actions',
            'catalog/messaging/kafka/triggers',
            'catalog/messaging/kafka/example',
          ],
        },
        {
          type: 'category',
          label: 'Mailchimp Marketing',
          link: { type: 'doc', id: 'catalog/marketing-social/mailchimp.marketing/mailchimp-marketing-connector-overview' },
          items: [
            'catalog/marketing-social/mailchimp.marketing/setup-guide',
            'catalog/marketing-social/mailchimp.marketing/actions',
            'catalog/marketing-social/mailchimp.marketing/example',
          ],
        },
        {
          type: 'category',
          label: 'Mailchimp Transactional',
          link: { type: 'doc', id: 'catalog/marketing-social/mailchimp.transactional/mailchimp-transactional-connector-overview' },
          items: [
            'catalog/marketing-social/mailchimp.transactional/setup-guide',
            'catalog/marketing-social/mailchimp.transactional/actions',
          ],
        },
        {
          type: 'category',
          label: 'MCP',
          link: { type: 'doc', id: 'catalog/ai-ml/mcp/mcp' },
          items: [
            'catalog/ai-ml/mcp/action-reference',
            'catalog/ai-ml/mcp/trigger-reference',
          ],
        },
        {
          type: 'category',
          label: 'Microsoft OneDrive',
          link: { type: 'doc', id: 'catalog/storage-file/microsoft.onedrive/microsoft-onedrive-connector-overview' },
          items: [
            'catalog/storage-file/microsoft.onedrive/setup-guide',
            'catalog/storage-file/microsoft.onedrive/actions',
            'catalog/storage-file/microsoft.onedrive/example',
          ],
        },
        {
          type: 'category',
          label: 'Microsoft SharePoint Pages',
          link: { type: 'doc', id: 'catalog/storage-file/microsoft.sharepoint.pages/connector-overview' },
          items: [
            'catalog/storage-file/microsoft.sharepoint.pages/setup-guide',
            'catalog/storage-file/microsoft.sharepoint.pages/action-reference',
          ]
        },
        {
          type: 'category',
          label: 'Microsoft SharePoint Sites',
          link: { type: 'doc', id: 'catalog/storage-file/microsoft.sharepoint.sites/connector-overview' },
          items: [
            'catalog/storage-file/microsoft.sharepoint.sites/setup-guide',
            'catalog/storage-file/microsoft.sharepoint.sites/action-reference',
          ],
        },
        {
          type: 'category',
          label: 'Microsoft Teams',
          link: { type: 'doc', id: 'catalog/communication/microsoft.teams/overview' },
          items: [
            'catalog/communication/microsoft.teams/setup-guide',
            'catalog/communication/microsoft.teams/action-reference',
            'catalog/communication/microsoft.teams/example',
          ],
        },
        {
          type: 'category',
          label: 'Milvus',
          link: { type: 'doc', id: 'catalog/ai-ml/milvus/connector-overview' },
          items: [
            'catalog/ai-ml/milvus/setup-guide',
            'catalog/ai-ml/milvus/actions',
            'catalog/ai-ml/milvus/example',
          ],
        },
        {
          type: 'category',
          label: 'Mistral',
          link: { type: 'doc', id: 'catalog/ai-ml/mistral/connector-overview' },
          items: [
            'catalog/ai-ml/mistral/setup-guide',
            'catalog/ai-ml/mistral/actions',
            'catalog/ai-ml/mistral/example',
          ],
        },
        {
          type: 'category',

          label: 'MongoDB',
          link: { type: 'doc', id: 'catalog/database/mongodb/connector-overview' },
          items: [
            'catalog/database/mongodb/setup-guide',
            'catalog/database/mongodb/actions',
            'catalog/database/mongodb/example',
          ],
        },
        {
          type: 'category',
          label: 'MQTT',
          link: { type: 'doc', id: 'catalog/messaging/mqtt/mqtt' },
          items: [
            'catalog/messaging/mqtt/setup-guide',
            'catalog/messaging/mqtt/action-reference',
            'catalog/messaging/mqtt/trigger-reference',
            'catalog/messaging/mqtt/example',
          ],
        },
        {
          type: 'category',
          label: 'MSSQL',
          link: { type: 'doc', id: 'catalog/database/mssql/connector-overview' },
          items: [
            'catalog/database/mssql/setup-guide',
            'catalog/database/mssql/actions',
            'catalog/database/mssql/triggers',
            'catalog/database/mssql/example',
          ],
        },
        {
          type: 'category',
          label: 'MySQL',
          link: { type: 'doc', id: 'catalog/database/mysql/connector-overview' },
          items: [
            'catalog/database/mysql/setup-guide',
            'catalog/database/mysql/actions',
            'catalog/database/mysql/triggers',
            'catalog/database/mysql/example',
          ],
        },
        {
          type: 'category',
          label: 'NATS',
          link: { type: 'doc', id: 'catalog/messaging/nats/connector-overview' },
          items: [
            'catalog/messaging/nats/setup-guide',
            'catalog/messaging/nats/actions',
            'catalog/messaging/nats/triggers',
            'catalog/messaging/nats/example',
          ],
        },
        {
          type: 'category',

          label: 'OpenAI',
          link: { type: 'doc', id: 'catalog/ai-ml/openai/connector-overview' },
          items: [
            'catalog/ai-ml/openai/setup-guide',
            'catalog/ai-ml/openai/actions',
            'catalog/ai-ml/openai/example',
          ],
        },
        {
          type: 'category',

          label: 'OpenAI Audio',
          link: { type: 'doc', id: 'catalog/ai-ml/openai.audio/openai-audio-connector-overview' },
          items: [
            'catalog/ai-ml/openai.audio/setup-guide',
            'catalog/ai-ml/openai.audio/actions',
            'catalog/ai-ml/openai.audio/example',
          ],
        },
        {
          type: 'category',
          label: 'OpenAI Fine-Tunes',
          link: { type: 'doc', id: 'catalog/ai-ml/openai.finetunes/openai-fine-tunes-connector-overview' },
          items: [
            'catalog/ai-ml/openai.finetunes/setup-guide',
            'catalog/ai-ml/openai.finetunes/actions',
            'catalog/ai-ml/openai.finetunes/example',
          ],
        },
        {
          type: 'category',
          label: 'Oracle DB',
          link: { type: 'doc', id: 'catalog/database/oracledb/oracle-db-connector-overview' },
          items: [
            'catalog/database/oracledb/setup-guide',
            'catalog/database/oracledb/actions',
            'catalog/database/oracledb/triggers',
            'catalog/database/oracledb/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Invoices',
          link: { type: 'doc', id: 'catalog/finance-accounting/paypal.invoices/paypal-invoices-connector-overview' },
          items: [
            'catalog/finance-accounting/paypal.invoices/setup-guide',
            'catalog/finance-accounting/paypal.invoices/actions',
            'catalog/finance-accounting/paypal.invoices/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Orders',
          link: { type: 'doc', id: 'catalog/finance-accounting/paypal.orders/paypal-orders-connector-overview' },
          items: [
            'catalog/finance-accounting/paypal.orders/setup-guide',
            'catalog/finance-accounting/paypal.orders/actions',
            'catalog/finance-accounting/paypal.orders/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Payments',
          link: { type: 'doc', id: 'catalog/finance-accounting/paypal.payments/paypal-payments-connector-overview' },
          items: [
            'catalog/finance-accounting/paypal.payments/setup-guide',
            'catalog/finance-accounting/paypal.payments/actions',
            'catalog/finance-accounting/paypal.payments/example',
          ],
        },
        {
          type: 'category',
          label: 'PayPal Subscriptions',
          link: { type: 'doc', id: 'catalog/finance-accounting/paypal.subscriptions/paypal-subscriptions-connector-overview' },
          items: [
            'catalog/finance-accounting/paypal.subscriptions/setup-guide',
            'catalog/finance-accounting/paypal.subscriptions/actions',
            'catalog/finance-accounting/paypal.subscriptions/example',
          ],
        },
        {
          type: 'category',
          label: 'People HR',
          link: { type: 'doc', id: 'catalog/hrms/peoplehr/people-hr-connector-overview' },
          items: [
            'catalog/hrms/peoplehr/setup-guide',
            'catalog/hrms/peoplehr/actions',
            'catalog/hrms/peoplehr/example',
          ],
        },
        {
          type: 'category',
          label: 'Pricefx',
          link: { type: 'doc', id: 'catalog/erp-business/pricefx/overview' },
          items: [
            'catalog/erp-business/pricefx/setup-guide',
            'catalog/erp-business/pricefx/action-reference',
            'catalog/erp-business/pricefx/example',
          ],
        },
        {
          type: 'category',

          label: 'PostgreSQL',
          link: { type: 'doc', id: 'catalog/database/postgresql/connector-overview' },
          items: [
            'catalog/database/postgresql/setup-guide',
            'catalog/database/postgresql/actions',
            'catalog/database/postgresql/triggers',
            'catalog/database/postgresql/example',
          ],
        },
        {
          type: 'category',
          label: 'RabbitMQ',
          link: { type: 'doc', id: 'catalog/messaging/rabbitmq/connector-overview' },
          items: [
            'catalog/messaging/rabbitmq/setup-guide',
            'catalog/messaging/rabbitmq/actions',
            'catalog/messaging/rabbitmq/triggers',
            'catalog/messaging/rabbitmq/example',
          ],
        },
        {
          type: 'category',
          label: 'Redis',
          link: { type: 'doc', id: 'catalog/database/redis/connector-overview' },
          items: [
            'catalog/database/redis/setup-guide',
            'catalog/database/redis/actions',
            'catalog/database/redis/example',
          ],
        },
        {
          type: 'category',
          label: 'RudderStack',
          link: { type: 'doc', id: 'catalog/marketing-social/rudderstack/rudderstack-connector-overview' },
          items: [
            'catalog/marketing-social/rudderstack/setup-guide',
            'catalog/marketing-social/rudderstack/actions',
            'catalog/marketing-social/rudderstack/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP',
          link: { type: 'doc', id: 'catalog/erp-business/sap/connector-overview' },
          items: [
            'catalog/erp-business/sap/setup-guide',
            'catalog/erp-business/sap/actions',
            'catalog/erp-business/sap/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Administration',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.administration/overview' },
          items: [
            'catalog/erp-business/sap.businessone.administration/setup-guide',
            'catalog/erp-business/sap.businessone.administration/action-reference',
            'catalog/erp-business/sap.businessone.administration/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Banking',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.banking/overview' },
          items: [
            'catalog/erp-business/sap.businessone.banking/setup-guide',
            'catalog/erp-business/sap.businessone.banking/action-reference',
            'catalog/erp-business/sap.businessone.banking/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Business Partners',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.businesspartners/overview' },
          items: [
            'catalog/erp-business/sap.businessone.businesspartners/setup-guide',
            'catalog/erp-business/sap.businessone.businesspartners/action-reference',
            'catalog/erp-business/sap.businessone.businesspartners/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One CRM',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.crm/overview' },
          items: [
            'catalog/erp-business/sap.businessone.crm/setup-guide',
            'catalog/erp-business/sap.businessone.crm/action-reference',
            'catalog/erp-business/sap.businessone.crm/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Financials',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.financials/overview' },
          items: [
            'catalog/erp-business/sap.businessone.financials/setup-guide',
            'catalog/erp-business/sap.businessone.financials/action-reference',
            'catalog/erp-business/sap.businessone.financials/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Fixed Assets',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.fixedassets/overview' },
          items: [
            'catalog/erp-business/sap.businessone.fixedassets/setup-guide',
            'catalog/erp-business/sap.businessone.fixedassets/action-reference',
            'catalog/erp-business/sap.businessone.fixedassets/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Human Resources',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.humanresources/overview' },
          items: [
            'catalog/erp-business/sap.businessone.humanresources/setup-guide',
            'catalog/erp-business/sap.businessone.humanresources/action-reference',
            'catalog/erp-business/sap.businessone.humanresources/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Inventory',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.inventory/overview' },
          items: [
            'catalog/erp-business/sap.businessone.inventory/setup-guide',
            'catalog/erp-business/sap.businessone.inventory/action-reference',
            'catalog/erp-business/sap.businessone.inventory/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Localization',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.localization/overview' },
          items: [
            'catalog/erp-business/sap.businessone.localization/setup-guide',
            'catalog/erp-business/sap.businessone.localization/action-reference',
            'catalog/erp-business/sap.businessone.localization/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Production',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.production/overview' },
          items: [
            'catalog/erp-business/sap.businessone.production/setup-guide',
            'catalog/erp-business/sap.businessone.production/action-reference',
            'catalog/erp-business/sap.businessone.production/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Projects',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.projects/overview' },
          items: [
            'catalog/erp-business/sap.businessone.projects/setup-guide',
            'catalog/erp-business/sap.businessone.projects/action-reference',
            'catalog/erp-business/sap.businessone.projects/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Purchasing',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.purchasing/overview' },
          items: [
            'catalog/erp-business/sap.businessone.purchasing/setup-guide',
            'catalog/erp-business/sap.businessone.purchasing/action-reference',
            'catalog/erp-business/sap.businessone.purchasing/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Sales',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.sales/overview' },
          items: [
            'catalog/erp-business/sap.businessone.sales/setup-guide',
            'catalog/erp-business/sap.businessone.sales/action-reference',
            'catalog/erp-business/sap.businessone.sales/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Business One Service',
          link: { type: 'doc', id: 'catalog/erp-business/sap.businessone.service/overview' },
          items: [
            'catalog/erp-business/sap.businessone.service/setup-guide',
            'catalog/erp-business/sap.businessone.service/action-reference',
            'catalog/erp-business/sap.businessone.service/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Characteristic Attribute Catalog',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_charcattributecatalog_srv/sap-characteristic-attribute-catalog-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_charcattributecatalog_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_charcattributecatalog_srv/actions',
            'catalog/erp-business/sap.s4hana.api_charcattributecatalog_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Commerce',
          link: { type: 'doc', id: 'catalog/ecommerce/sap.commerce.webservices/sap-commerce-connector-overview' },
          items: [
            'catalog/ecommerce/sap.commerce.webservices/setup-guide',
            'catalog/ecommerce/sap.commerce.webservices/actions',
            'catalog/ecommerce/sap.commerce.webservices/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Customer Returns Delivery',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_customer_returns_delivery_srv_0002/sap-customer-returns-delivery-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_customer_returns_delivery_srv_0002/setup-guide',
            'catalog/erp-business/sap.s4hana.api_customer_returns_delivery_srv_0002/actions',
            'catalog/erp-business/sap.s4hana.api_customer_returns_delivery_srv_0002/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Delivery Document with Credit Block',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_del_doc_with_credit_block/sap-delivery-document-with-credit-block-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_del_doc_with_credit_block/setup-guide',
            'catalog/erp-business/sap.s4hana.api_del_doc_with_credit_block/actions',
            'catalog/erp-business/sap.s4hana.api_del_doc_with_credit_block/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP ECC (JCo)',
          link: { type: 'doc', id: 'catalog/erp-business/sap.jco/overview' },
          items: [
            'catalog/erp-business/sap.jco/setup-guide',
            'catalog/erp-business/sap.jco/action-reference',
            'catalog/erp-business/sap.jco/trigger-reference',
            'catalog/erp-business/sap.jco/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Inbound Delivery',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_inbound_delivery_srv_0002/sap-inbound-delivery-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_inbound_delivery_srv_0002/setup-guide',
            'catalog/erp-business/sap.s4hana.api_inbound_delivery_srv_0002/actions',
            'catalog/erp-business/sap.s4hana.api_inbound_delivery_srv_0002/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Inspection Lot',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_inspectionlot_srv/sap-inspection-lot-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_inspectionlot_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_inspectionlot_srv/actions',
            'catalog/erp-business/sap.s4hana.api_inspectionlot_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Inspection Method',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_inspectionmethod_srv/sap-inspection-method-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_inspectionmethod_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_inspectionmethod_srv/actions',
            'catalog/erp-business/sap.s4hana.api_inspectionmethod_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Inspection Plan',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_inspectionplan_srv/sap-inspection-plan-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_inspectionplan_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_inspectionplan_srv/actions',
            'catalog/erp-business/sap.s4hana.api_inspectionplan_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Master Inspection Characteristic',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_masterinspcharacteristic_srv/sap-master-inspection-characteristic-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_masterinspcharacteristic_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_masterinspcharacteristic_srv/actions',
            'catalog/erp-business/sap.s4hana.api_masterinspcharacteristic_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Material Document',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_material_document_srv/sap-material-document-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_material_document_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_material_document_srv/actions',
            'catalog/erp-business/sap.s4hana.api_material_document_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Material Stock',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_material_stock_srv/sap-material-stock-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_material_stock_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_material_stock_srv/actions',
            'catalog/erp-business/sap.s4hana.api_material_stock_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Outbound Delivery',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap-outbound-delivery-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/setup-guide',
            'catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/actions',
            'catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Physical Inventory Document',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_physical_inventory_doc_srv/sap-physical-inventory-document-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_physical_inventory_doc_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_physical_inventory_doc_srv/actions',
            'catalog/erp-business/sap.s4hana.api_physical_inventory_doc_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Purchasing Info Record',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_inforecord_process_srv/sap-purchasing-info-record-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_inforecord_process_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_inforecord_process_srv/actions',
            'catalog/erp-business/sap.s4hana.api_inforecord_process_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Quality Info Record',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_qualityinforecord_srv/sap-quality-info-record-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_qualityinforecord_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_qualityinforecord_srv/actions',
            'catalog/erp-business/sap.s4hana.api_qualityinforecord_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Reservation Document',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_reservation_document_srv/sap-reservation-document-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_reservation_document_srv/actions',
            'catalog/erp-business/sap.s4hana.api_reservation_document_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Reservation Document (A2X)',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap-reservation-document-a2x-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/setup-guide',
            'catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/actions',
            'catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Area',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.salesarea_0001/sap-sales-area-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.salesarea_0001/setup-guide',
            'catalog/erp-business/sap.s4hana.salesarea_0001/actions',
            'catalog/erp-business/sap.s4hana.salesarea_0001/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales District',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_salesdistrict_srv/sap-sales-district-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_salesdistrict_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_salesdistrict_srv/actions',
            'catalog/erp-business/sap.s4hana.api_salesdistrict_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Inquiry',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/sap-sales-inquiry-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/actions',
            'catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_sales_order_srv/sap-sales-order-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_sales_order_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_sales_order_srv/actions',
            'catalog/erp-business/sap.s4hana.api_sales_order_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order Analytics',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.ce_salesorder_0001/sap-sales-order-analytics-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.ce_salesorder_0001/setup-guide',
            'catalog/erp-business/sap.s4hana.ce_salesorder_0001/actions',
            'catalog/erp-business/sap.s4hana.ce_salesorder_0001/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Order Simulation',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/sap-sales-order-simulation-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/actions',
            'catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Organization',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_salesorganization_srv/sap-sales-organization-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_salesorganization_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_salesorganization_srv/actions',
            'catalog/erp-business/sap.s4hana.api_salesorganization_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Sales Quotation',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_sales_quotation_srv/sap-sales-quotation-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_sales_quotation_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_sales_quotation_srv/actions',
            'catalog/erp-business/sap.s4hana.api_sales_quotation_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SD Incoterms',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/sap-sd-incoterms-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/setup-guide',
            'catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/actions',
            'catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SD Sold-to-Party Determination',
          link: { type: 'doc', id: 'catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/sap-sd-sold-party-determination-connector-overview' },
          items: [
            'catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/setup-guide',
            'catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/actions',
            'catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP Signavio',
          link: { type: 'doc', id: 'catalog/erp-business/sap.signavio/overview' },
          items: [
            'catalog/erp-business/sap.signavio/setup-guide',
            'catalog/erp-business/sap.signavio/action-reference',
            'catalog/erp-business/sap.signavio/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Advances',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecadvances/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecadvances/setup-guide',
            'catalog/hrms/sap.successfactors.ecadvances/action-reference',
            'catalog/hrms/sap.successfactors.ecadvances/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Alternative Cost Distribution',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecalternativecostdistribution/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecalternativecostdistribution/setup-guide',
            'catalog/hrms/sap.successfactors.ecalternativecostdistribution/action-reference',
            'catalog/hrms/sap.successfactors.ecalternativecostdistribution/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Apprentice Management',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecapprenticemanagement/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecapprenticemanagement/setup-guide',
            'catalog/hrms/sap.successfactors.ecapprenticemanagement/action-reference',
            'catalog/hrms/sap.successfactors.ecapprenticemanagement/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Compensation Information',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.eccompensationinformation/overview' },
          items: [
            'catalog/hrms/sap.successfactors.eccompensationinformation/setup-guide',
            'catalog/hrms/sap.successfactors.eccompensationinformation/action-reference',
            'catalog/hrms/sap.successfactors.eccompensationinformation/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Dismissal Protection',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecdismissalprotection/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecdismissalprotection/setup-guide',
            'catalog/hrms/sap.successfactors.ecdismissalprotection/action-reference',
            'catalog/hrms/sap.successfactors.ecdismissalprotection/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Payroll',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecemployeecentralpayroll/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecemployeecentralpayroll/setup-guide',
            'catalog/hrms/sap.successfactors.ecemployeecentralpayroll/action-reference',
            'catalog/hrms/sap.successfactors.ecemployeecentralpayroll/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Employee Profile',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecemployeeprofile/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecemployeeprofile/setup-guide',
            'catalog/hrms/sap.successfactors.ecemployeeprofile/action-reference',
            'catalog/hrms/sap.successfactors.ecemployeeprofile/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Employment Information',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecemploymentinformation/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecemploymentinformation/setup-guide',
            'catalog/hrms/sap.successfactors.ecemploymentinformation/action-reference',
            'catalog/hrms/sap.successfactors.ecemploymentinformation/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Foundation Organization',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecfoundationorganization/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecfoundationorganization/setup-guide',
            'catalog/hrms/sap.successfactors.ecfoundationorganization/action-reference',
            'catalog/hrms/sap.successfactors.ecfoundationorganization/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Global Assignment',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecglobalassignment/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecglobalassignment/setup-guide',
            'catalog/hrms/sap.successfactors.ecglobalassignment/action-reference',
            'catalog/hrms/sap.successfactors.ecglobalassignment/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Global Benefits',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecglobalbenefits/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecglobalbenefits/setup-guide',
            'catalog/hrms/sap.successfactors.ecglobalbenefits/action-reference',
            'catalog/hrms/sap.successfactors.ecglobalbenefits/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Income Tax Declaration',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecincometaxdeclaration/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecincometaxdeclaration/setup-guide',
            'catalog/hrms/sap.successfactors.ecincometaxdeclaration/action-reference',
            'catalog/hrms/sap.successfactors.ecincometaxdeclaration/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Master Data Replication',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecmasterdatareplication/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecmasterdatareplication/setup-guide',
            'catalog/hrms/sap.successfactors.ecmasterdatareplication/action-reference',
            'catalog/hrms/sap.successfactors.ecmasterdatareplication/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Payment Information',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecpaymentinformation/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecpaymentinformation/setup-guide',
            'catalog/hrms/sap.successfactors.ecpaymentinformation/action-reference',
            'catalog/hrms/sap.successfactors.ecpaymentinformation/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Payroll Time Sheets',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecpayrolltimesheets/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecpayrolltimesheets/setup-guide',
            'catalog/hrms/sap.successfactors.ecpayrolltimesheets/action-reference',
            'catalog/hrms/sap.successfactors.ecpayrolltimesheets/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Personal Information',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecpersonalinformation/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecpersonalinformation/setup-guide',
            'catalog/hrms/sap.successfactors.ecpersonalinformation/action-reference',
            'catalog/hrms/sap.successfactors.ecpersonalinformation/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Position Management',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecpositionmanagement/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecpositionmanagement/setup-guide',
            'catalog/hrms/sap.successfactors.ecpositionmanagement/action-reference',
            'catalog/hrms/sap.successfactors.ecpositionmanagement/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Skills Management',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecskillsmanagement/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecskillsmanagement/setup-guide',
            'catalog/hrms/sap.successfactors.ecskillsmanagement/action-reference',
            'catalog/hrms/sap.successfactors.ecskillsmanagement/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Time Off',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ectimeoff/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ectimeoff/setup-guide',
            'catalog/hrms/sap.successfactors.ectimeoff/action-reference',
            'catalog/hrms/sap.successfactors.ectimeoff/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Workflow',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.ecworkflow/overview' },
          items: [
            'catalog/hrms/sap.successfactors.ecworkflow/setup-guide',
            'catalog/hrms/sap.successfactors.ecworkflow/action-reference',
            'catalog/hrms/sap.successfactors.ecworkflow/example',
          ],
        },
        {
          type: 'category',
          label: 'SAP SuccessFactors Employee Central Core',
          link: { type: 'doc', id: 'catalog/hrms/sap.successfactors.employeecentralec/overview' },
          items: [
            'catalog/hrms/sap.successfactors.employeecentralec/setup-guide',
            'catalog/hrms/sap.successfactors.employeecentralec/action-reference',
            'catalog/hrms/sap.successfactors.employeecentralec/example',
          ],
        },
        {
          type: 'category',
          label: 'Salesforce',
          link: { type: 'doc', id: 'catalog/crm-sales/salesforce/connector-overview' },
          items: [
            'catalog/crm-sales/salesforce/setup-guide',
            'catalog/crm-sales/salesforce/actions',
            'catalog/crm-sales/salesforce/triggers',
            'catalog/crm-sales/salesforce/example',
          ],
        },
        {
          type: 'category',
          label: 'Salesforce Data 360 (Data Cloud)',
          link: { type: 'doc', id: 'catalog/marketing-social/salesforce.datacloud/salesforce-datacloud-connector-overview' },
          items: [
            'catalog/marketing-social/salesforce.datacloud/setup-guide',
            'catalog/marketing-social/salesforce.datacloud/actions',
            'catalog/marketing-social/salesforce.datacloud/example',
          ],
        },
        {
          type: 'category',
          label: 'Salesforce Marketing Cloud',
          link: { type: 'doc', id: 'catalog/marketing-social/salesforce.marketingcloud/salesforce-marketing-cloud-connector-overview' },
          items: [
            'catalog/marketing-social/salesforce.marketingcloud/setup-guide',
            'catalog/marketing-social/salesforce.marketingcloud/actions',
            'catalog/marketing-social/salesforce.marketingcloud/example',
          ],
        },
        {
          type: 'category',
          label: 'SCIM',
          link: { type: 'doc', id: 'catalog/security-identity/scim/connector-overview' },
          items: [
            'catalog/security-identity/scim/setup-guide',
            'catalog/security-identity/scim/actions',
            'catalog/security-identity/scim/example',
          ],
        },
        {
          type: 'category',
          label: 'Shopify Admin',
          link: { type: 'doc', id: 'catalog/ecommerce/shopify.admin/shopify-admin-connector-overview' },
          items: [
            'catalog/ecommerce/shopify.admin/setup-guide',
            'catalog/ecommerce/shopify.admin/actions',
            'catalog/ecommerce/shopify.admin/triggers',
            'catalog/ecommerce/shopify.admin/example',
          ],
        },
        {
          type: 'category',
          label: 'Slack',
          link: { type: 'doc', id: 'catalog/communication/slack/connector-overview' },
          items: [
            'catalog/communication/slack/setup-guide',
            'catalog/communication/slack/actions',
            'catalog/communication/slack/example',
          ],
        },
        {
          type: 'category',
          label: 'Smartsheet',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/smartsheet/connector-overview' },
          items: [
            'catalog/productivity-collaboration/smartsheet/setup-guide',
            'catalog/productivity-collaboration/smartsheet/actions',
            'catalog/productivity-collaboration/smartsheet/example',
          ],
        },
        {
          type: 'category',
          label: 'SMB',
          link: { type: 'doc', id: 'catalog/storage-file/smb/overview' },
          items: [
            'catalog/storage-file/smb/setup-guide',
            'catalog/storage-file/smb/action-reference',
            'catalog/storage-file/smb/trigger-reference',
            'catalog/storage-file/smb/example',
          ],
        },
        {
          type: 'category',
          label: 'SMPP',
          link: { type: 'doc', id: 'catalog/messaging/smpp/connector-overview' },
          items: [
            'catalog/messaging/smpp/setup-guide',
            'catalog/messaging/smpp/action-reference',
            'catalog/messaging/smpp/trigger-reference',
            'catalog/messaging/smpp/example',
          ],
        },
        {
          type: 'category',
          label: 'Snowflake',
          link: { type: 'doc', id: 'catalog/database/snowflake/connector-overview' },
          items: [
            'catalog/database/snowflake/setup-guide',
            'catalog/database/snowflake/actions',
            'catalog/database/snowflake/example',
          ],
        },
        {
          type: 'category',
          label: 'Solace',
          link: { type: 'doc', id: 'catalog/messaging/solace/connector-overview' },
          items: [
            'catalog/messaging/solace/setup-guide',
            'catalog/messaging/solace/actions',
            'catalog/messaging/solace/triggers',
            'catalog/messaging/solace/example',
          ],
        },
        {
          type: 'category',
          label: 'Solace (JMS)',
          link: { type: 'doc', id: 'catalog/messaging/solace.jms/connector-overview' },
          items: [
            'catalog/messaging/solace.jms/setup-guide',
            'catalog/messaging/solace.jms/actions',
            'catalog/messaging/solace.jms/triggers',
            'catalog/messaging/solace.jms/example',
          ],
        },
        {
          type: 'category',
          label: 'Stripe',
          link: { type: 'doc', id: 'catalog/finance-accounting/stripe/connector-overview' },
          items: [
            'catalog/finance-accounting/stripe/setup-guide',
            'catalog/finance-accounting/stripe/actions',
            'catalog/finance-accounting/stripe/example',
          ],
        },
        {
          type: 'category',
          label: 'TCP',
          link: { type: 'doc', id: 'catalog/network-protocols/tcp/tcp' },
          items: [
            'catalog/network-protocols/tcp/action-reference',
            'catalog/network-protocols/tcp/trigger-reference',
            'catalog/network-protocols/tcp/example',
          ],
        },
        {
          type: 'category',
          label: 'Telegram',
          link: { type: 'doc', id: 'catalog/communication/telegram/overview' },
          items: [
            'catalog/communication/telegram/setup-guide',
            'catalog/communication/telegram/actions',
            'catalog/communication/telegram/triggers',
            'catalog/communication/telegram/example',
          ],
        },
        {
          type: 'category',
          label: 'Trello',
          link: { type: 'doc', id: 'catalog/productivity-collaboration/trello/connector-overview' },
          items: [
            'catalog/productivity-collaboration/trello/setup-guide',
            'catalog/productivity-collaboration/trello/actions',
            'catalog/productivity-collaboration/trello/example',
          ],
        },
        {
          type: 'category',
          label: 'Twilio',
          link: { type: 'doc', id: 'catalog/communication/twilio/overview' },
          items: [
            'catalog/communication/twilio/setup-guide',
            'catalog/communication/twilio/actions',
            'catalog/communication/twilio/triggers',
            ...connectorVersionedDocs('catalog/communication/twilio'),
            'catalog/communication/twilio/example',
          ],
        },
        {
          type: 'category',
          label: 'Twitter',
          link: { type: 'doc', id: 'catalog/marketing-social/twitter/connector-overview' },
          items: [
            'catalog/marketing-social/twitter/setup-guide',
            'catalog/marketing-social/twitter/actions',
            'catalog/marketing-social/twitter/example',
          ],
        },
        {
          type: 'category',

          label: 'UDP',
          link: { type: 'doc', id: 'catalog/network-protocols/udp/udp' },
          items: [
            'catalog/network-protocols/udp/action-reference',
            'catalog/network-protocols/udp/trigger-reference',
            'catalog/network-protocols/udp/example',
          ],
        },
        {
          type: 'category',
          label: 'WSO2 APIM Catalog',
          link: { type: 'doc', id: 'catalog/developer-tools/wso2.apim.catalog/apim-catalog-connector-overview' },
          items: [
            'catalog/developer-tools/wso2.apim.catalog/setup-guide',
            'catalog/developer-tools/wso2.apim.catalog/actions',
            'catalog/developer-tools/wso2.apim.catalog/example',
          ],
        },
        {
          type: 'category',
          label: 'WebSocket',
          link: { type: 'doc', id: 'catalog/network-protocols/websocket/websocket' },
          items: [
            'catalog/network-protocols/websocket/action-reference',
            'catalog/network-protocols/websocket/trigger-reference',
            'catalog/network-protocols/websocket/example',
          ],
        },
        {
          type: 'category',
          label: 'WebSub',
          link: { type: 'doc', id: 'catalog/network-protocols/websub/websub' },
          items: [
            'catalog/network-protocols/websub/setup-guide',
            'catalog/network-protocols/websub/action-reference',
            'catalog/network-protocols/websub/trigger-reference',
            'catalog/network-protocols/websub/example',
          ],
        },
        {
          type: 'category',
          label: 'WhatsApp Business',
          link: { type: 'doc', id: 'catalog/communication/whatsapp-business/overview' },
          items: [
            'catalog/communication/whatsapp-business/setup-guide',
            'catalog/communication/whatsapp-business/actions',
            'catalog/communication/whatsapp-business/triggers',
            'catalog/communication/whatsapp-business/example',
          ],
        },
        {
          type: 'category',
          label: 'Zoom Meetings',
          link: { type: 'doc', id: 'catalog/communication/zoom.meetings/zoom-meetings-connector-overview' },
          items: [
            'catalog/communication/zoom.meetings/setup-guide',
            'catalog/communication/zoom.meetings/actions',
            'catalog/communication/zoom.meetings/example',
          ],
        },
        {
          type: 'category',
          label: 'Zoom Scheduler',
          link: { type: 'doc', id: 'catalog/communication/zoom.scheduler/zoom-scheduler-connector-overview' },
          items: [
            'catalog/communication/zoom.scheduler/setup-guide',
            'catalog/communication/zoom.scheduler/actions',
            'catalog/communication/zoom.scheduler/example',
          ],
        },
      ],
    },
    { type: 'doc', id: 'overview', label: 'Overview', customProps: { separatorBefore: 'WSO2 Connectors' } },
    { type: 'doc', id: 'using-connectors', label: 'Using Connectors' },
    // ── Build a Connector ──
    {
      type: 'category',
      label: 'Build a Connector',
      link: { type: 'doc', id: 'build-your-own/build-own' },
      items: [
        'build-your-own/create-from-openapi-spec',
        'build-your-own/custom-development',
      ],
    },
    { type: 'doc', id: 'build-your-own/publish-connector', label: 'Publish Connector' },
    // Same "Reference" grouping (FAQ + Glossary) main/saas use, rather
    // than a lone flat "FAQ" doc -- consistent structure, and room to
    // add more reference material later without a reshuffle.
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/glossary',
        'reference/faq',
      ],
    },
  ],
};

export default sidebars;
