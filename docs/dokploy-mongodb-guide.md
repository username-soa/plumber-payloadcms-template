# Payload CMS: Self-Hosted VPS Deployment (Dokploy + MongoDB)

This guide details how to deploy your Payload CMS project on a VPS using **Dokploy**, utilizing a self-hosted **MongoDB** database.

## Prerequisites
-   A VPS (Virtual Private Server) with [Dokploy](https://dokploy.com/) installed.
-   A domain name pointing to your VPS.
-   Access to your project's codebase.

---

## 1. Database Setup (MongoDB)

1.  **Access Dokploy**: Login to your Dokploy dashboard.
2.  **Create Service**:
    -   Navigate to your Project -> Services -> **Databases**.
    -   Click **Create Database** and select **MongoDB**.
3.  **Configuration**:
    -   Name: `payload-mongo` (or preferred).
    -   **Users**: Create a user (e.g., `payload`) and secure password.
    -   **External Port**: Optional, only enable if you need to connect from your local machine.
4.  **Connection String**:
    -   Dokploy provides an internal connection string (usually for apps in the same network) and an external one.
    -   For your Payload app (deployed in Dokploy), use the **Internal Connection String**.
    -   Format: `mongodb://<user>:<password>@<service-name>:<port>/<db-name>?authSource=admin`

---

## 2. Project Configuration

### Switch to MongoDB Adapter
Since your project was set up for Postgres, you need to switch to MongoDB.

1.  **Install MongoDB Adapter**:
    ```bash
    npm install @payloadcms/db-mongodb
    npm uninstall @payloadcms/db-postgres # Optional
    ```

2.  **Update `payload.config.ts`**:

    ```typescript
    // src/payload.config.ts
    import { mongooseAdapter } from "@payloadcms/db-mongodb"; // [!code ++]
    // import { postgresAdapter } from "@payloadcms/db-postgres"; // [!code --]

    export default buildConfig({
      // ... existing config

      // [!code ++]
      db: mongooseAdapter({
        url: process.env.DATABASE_URL,
      }),
      
      // [!code --]
      // db: postgresAdapter({ ... }),
    });
    ```

### Storage (Local Persistence)
On a VPS, you can save money by using **Local Storage** instead of S3.
1.  **Ensure `Media` Collection uses local dir**:
    -   Your `src/collections/Media.ts` is likely already set to `staticDir: 'public/media'`.
2.  **Persistence**:
    -   In Docker, the file system resets on deploy. You **MUST** mount a volume to persist uploads.
    -   We will configure this in Dokploy.

---

## 3. Deployment Configuration (Dokploy)

1.  **Create Application**:
    -   Go to Project -> Services -> **Application**.
    -   Name: `payload-app`.
    -   Source: GitHub (select your repo) or manual Docker.
2.  **Build Settings** (Nixpacks/Docker):
    -   Dokploy uses Nixpacks by default which is great for Next.js.
    -   **Build Command**: `npm run build`
    -   **Start Command**: `npm run start`
    -   **Install Command**: `npm install` (or `pnpm install`)
3.  **Environment Variables**:
    -   Add the following in the **Environment** tab:
    ```ini
    DATABASE_URL="mongodb://..." # Your Internal Mongo URL from Step 1
    PAYLOAD_SECRET="<generate-a-secure-string>"
    NEXT_PUBLIC_SERVER_URL="https://your-domain.com"
    ```
4.  **Persistent Storage (Critical)**:
    -   Go to **Volumes/Mounts**.
    -   Add a **Volume**:
        -   **Host Path**: `payload-media` (or a full path like `/var/lib/dokploy/volumes/media`)
        -   **Container Path**: `/app/public/media` (This **MUST** match your `staticDir` in Media collection).
        -   *Note: Verify the build path. If your app runs in `/app`, then `public/media` is correct.*
5.  **Domain**:
    -   Go to **Domains**.
    -   Add your domain (e.g., `cms.yoursite.com`).
    -   Enable **HTTPS/SSL** (Let's Encrypt is auto-handled by Dokploy).

## 4. Deploy
1.  Click **Deploy**.
2.  Monitor the logs.
3.  Once "Healthy", visit your domain.

### Troubleshooting
-   **Media 404s**: Check your steps in "Persistent Storage". If the volume isn't mapped, files are lost on restart.
-   **DB Connection**: Ensure you used the *Internal* URL if both are on Dokploy.
