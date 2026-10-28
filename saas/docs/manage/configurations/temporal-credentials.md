---
title: Temporal Credentials
---

# Temporal Credentials

Workflows run on a Temporal server. A Temporal credential tells WSO2 Cloud which Temporal server and namespace to connect to, and how to authenticate.

You assign each credential to one or more environments. Workflows deployed to an environment connect with that environment's credential. An environment can use only one credential.

Workflows pick up a new or changed credential the next time they are deployed.

## Prerequisites

- Permission to manage configuration groups in your organization.
- A Temporal Cloud namespace, or a self-hosted Temporal server that WSO2 Cloud can reach.
- The authentication details for the server: an API key, or a client certificate and private key in PEM format. A self-hosted server can also run without authentication.

## Add a Temporal credential

1. Sign in to [WSO2 Cloud](https://console.devant.dev).
2. In the top navigation, click the **Organization** list and select your organization.
3. In the left navigation menu, click **Settings** under **Admin**.
4. Click the **Credentials** tab, then click **Temporal Credentials**.
5. Click **Add Credential**.

    <ThemedImage
        alt="Add Temporal Credential dialog"
        sources={{
            light: useBaseUrl('/img/manage/cloud/configurations/temporal-credentials/add-credential.png'),
            dark: useBaseUrl('/img/manage/cloud/configurations/temporal-credentials/add-credential.png'),
        }}
    />

6. Under **Deployment mode**, select **Temporal Cloud** or **Self-hosted**.
7. Enter the connection details:

    | Field | Description |
    |---|---|
    | **Temporal Cloud URL** or **Temporal server URL** | The gRPC endpoint as `host:port`, without a scheme. For example, `my-ns.a1b2c.tmprl.cloud:7233` or `temporal.mycompany.com:7233`. |
    | **Namespace** | The namespace that workflows run in. For Temporal Cloud, enter it as `<namespace>.<account>`, for example `my-ns.a1b2c`. |

8. Under **Authentication**, select how to connect to the server:

    - **API key**: Enter the API key.
    - **mTLS certificate**: Select the **Client certificate (PEM)** and **Private key (PEM)** files.
    - **None**: Connect without authentication. This option is available for self-hosted servers only.

9. Optional: If the server's certificate is issued by a private or self-signed certificate authority, select the **CA certificate (PEM)** file.
10. Under **Environments**, select the environments that use this credential. An environment that another credential already uses is not available.
11. Click **Save**.

### Add a credential when you import a workflow

You can also add a Temporal credential when you [import a workflow](../../develop-and-test/create-workspace/import-an-integration.md). If the first environment of the project has no Temporal credential, the import page shows a warning with an **Add Credential** button. Click it to open the **Add Temporal Credential** dialog, then follow steps 6 to 11.

## Edit a Temporal credential

1. In your organization, go to **Admin** > **Settings** > **Credentials** > **Temporal Credentials**.
2. Click the edit icon for the credential.
3. Update the details, then click **Save**.

The stored API key, certificates, and private key are kept unless you enter new ones. You must enter them again if you change the authentication method or add an environment, because they are stored per environment and cannot be read back.

To move an environment from one credential to another, first remove it from the credential that uses it, then add it to the other credential.

## Delete a Temporal credential

1. In your organization, go to **Admin** > **Settings** > **Credentials** > **Temporal Credentials**.
2. Click the delete icon for the credential.
3. Click **Delete**.
4. In the confirmation dialog, click **Delete** again.

Workflows in the credential's environments stop using it the next time they are deployed. They cannot connect to Temporal in those environments until you assign another credential to them.
