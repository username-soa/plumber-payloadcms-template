# Payload CMS: Vercel & Supabase Integration Guide

This guide details how to configure your Payload CMS project to work with **Supabase** (for both Database and File Storage) and deploy it to **Vercel**.

## Prerequisites
-   A [Supabase](https://supabase.com/) account.
-   A [Vercel](https://vercel.com/) account.
-   Your Payload CMS project.

---

## 1. Supabase Setup

### Database
1.  Create a new project on [database.new](https://database.new).
2.  Go to **Project Settings** -> **Database**.
3.  Under **Connection String** -> **URI**, copy the connection string.
    -   *Note: For serverless environments like Vercel, use the "Transaction" mode (port 6543) if you experience connection limit issues, otherwise "Session" (port 5432) is usually fine for Payload.*

### Storage (S3 Compatible)
Payload uses the S3 protocol to talk to Supabase Storage.
1.  Go to **Storage** in your Supabase dashboard.
2.  Create a new **Bucket**:
    -   Name: `media` (or your preferred name).
    -   **Important**: Toggle "Public Bucket" to **ON**.
3.  Go to **Project Settings** -> **Storage**.
4.  Under **S3 Access Keys**, generate a new Access Key.
    -   Save the `Access Key ID`.
    -   Save the `Secret Access Key`.
5.  Note your **Endpoint**: `https://<project-ref>.supabase.co/storage/v1/s3` (found in the same Storage settings section).

---

## 2. Project Configuration

### Install Dependencies
You need the S3 storage plugin to communicate with Supabase Storage.
```bash
npm install @payloadcms/storage-s3
```

### Update `payload.config.ts`
Import the S3 plugin and configure it to use your environment variables.

```typescript
// src/payload.config.ts
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3"; // [!code ++]

// ... imports

export default buildConfig({
  // ... existing config

  // Database Adapter (already set up for Postgres)
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  // [!code ++]
  // Storage Adapter (Supabase via S3 protocol)
  plugins: [
    s3Storage({
      collections: {
        media: true, // Enable for 'media' collection
      },
      bucket: process.env.SUPABASE_BUCKET || 'media',
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID!,
          secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY!,
        },
        region: process.env.SUPABASE_REGION || 'us-east-1', // Generic standard region
        endpoint: process.env.SUPABASE_ENDPOINT, // e.g. https://<ref>.supabase.co/storage/v1/s3
        forcePathStyle: true, // Required for Supabase
      },
    }),
  ],
});
```

---

## 3. Environment Variables

Add these variables to your `.env` file locally and to your **Vercel Project Settings**.

```ini
# Database
DATABASE_URL="postgres://postgres.xxxx:password@aws-0-region.pooler.supabase.com:6543/postgres"

# Payload Secret
PAYLOAD_SECRET="your-secure-secret"

# Supabase Storage (S3 Protocol)
SUPABASE_BUCKET="media"
SUPABASE_ACCESS_KEY_ID="your-supabase-access-key-id"
SUPABASE_SECRET_ACCESS_KEY="your-supabase-secret-access-key"
SUPABASE_ENDPOINT="https://<your-project-ref>.supabase.co/storage/v1/s3"
SUPABASE_REGION="us-east-1"
```

## 4. Vercel Deployment

1.  Push your code to a Git repository (GitHub/GitLab/Bitbucket).
2.  Import the project in Vercel.
3.  Copy/Paste the Environment Variables from Step 3 into the Vercel deployment screen.
4.  Deploy!

Your Payload CMS will now use Supabase for its database and store uploaded media files directly in your Supabase 'media' bucket.
