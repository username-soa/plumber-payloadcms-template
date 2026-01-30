# Deploying Payload CMS on Dokploy with Self-Hosted Postgres

This guide walks you through deploying your Payload CMS application on a VPS using Dokploy, utilizing a self-hosted Postgres database on the same server to keep costs low.

## Prerequisites

- A VPS with Dokploy installed.
- Your project pushed to a Git repository (GitHub, GitLab, etc.).

## Step 1: Create the Database Service

1.  Open your Dokploy dashboard.
2.  Navigate to your project (or create a new one).
3.  Click on **"Create Service"** and select **"Database"**.
4.  Choose **"PostgreSQL"**.
5.  Give it a name (e.g., `payload-db`) and click **"Create"**.
6.  Once created, go to the **"Environment"** tab of the database service.
7.  Copy the **"Internal Connection URL"**. It usually looks like:
    `postgres://postgres:password@payload-db:5432/postgres?schema=public`
    *Note: Dokploy manages the internal network, so your app can talk to this DB using this internal URL.*

## Step 2: Create the Application Service

1.  Go back to your project dashboard.
2.  Click **"Create Service"** and select **"Application"**.
3.  Choose your Git provider and select your repository.
4.  Select the **Branch** you want to deploy (usually `main`).
5.  **Build Type**: Select **"Dockerfile"**.
    *   *Payload projects typically work best with a Dockerfile. If you don't have one, use the Nixpacks option, but Dockerfile is recommended for control.*

## Step 3: Configure Environment Variables

1.  In your new Application service, go to the **"Environment"** tab.
2.  Add the following variables:

    | Key | Value | Description |
    | :--- | :--- | :--- |
    | `NODE_ENV` | `production` | Optimizes Payload for production. |
    | `PAYLOAD_SECRET` | `(generate a random string)` | Used for security. Make it long and complex. |
    | `DATABASE_URL` | `(paste internal DB URL)` | The URL you copied in Step 1. |
    | `NEXT_PUBLIC_SERVER_URL` | `https://your-domain.com` | The public URL of your site. |

3.  **Crucial Step**: If your `DATABASE_URL` from Step 1 ends in `?schema=public`, make sure it is exactly that. Payload needs this connection string to connect.

## Step 4: Deploy

1.  Go to the **"General"** tab.
2.  Click **"Deploy"**.
3.  Dokploy will build your Docker image and start the container.
4.  Monitor the **"Logs"** tab. You should see Payload starting up and connecting to the database.

## Step 5: Domain & SSL

1.  Go to the **"Domains"** tab.
2.  Add your domain (e.g., `cms.yourdomain.com`).
3.  Point your domain's A record to your VPS IP address.
4.  Dokploy will automatically generate an SSL certificate (Traefik does this).

## Troubleshooting

-   **Database Connection Failed**: Double-check the `DATABASE_URL`. Ensure the Database service is running and healthy.
-   **Build Fails**: Check if you are missing a `Dockerfile`. A standard Next.js + Payload Dockerfile is required.
