# PayloadCMS Setup Guide

This document provides information about the PayloadCMS integration in the FlowMasters project.

## Overview

PayloadCMS 3.x has been integrated into this Next.js application to provide a headless CMS for managing blog posts and case studies. The CMS runs within the same Next.js process, eliminating the need for separate infrastructure.

## Installation

The following packages have been installed:

- `payload` - Core PayloadCMS package
- `@payloadcms/richtext-lexical` - Lexical-based rich text editor
- `@payloadcms/db-sqlite` - SQLite database adapter (for development)
- `@payloadcms/db-postgres` - PostgreSQL database adapter (for production)
- `@payloadcms/next` - Next.js integration

## Configuration

### Environment Variables

The following environment variables are required (see `.env.example` for template):

- `PAYLOAD_SECRET` - Secret key for encrypting sessions and tokens (required)
- `DATABASE_URL` - PostgreSQL connection string for production (optional in development)
- `NEXT_PUBLIC_SERVER_URL` - Public URL of your application (defaults to http://localhost:3000)

### Database Configuration

The application uses different database adapters based on the environment:

- **Development**: SQLite database stored at `payload.db` in the project root
- **Production**: PostgreSQL database using the `DATABASE_URL` environment variable

### Payload Configuration

The main configuration file is located at `src/payload.config.ts`. This file:

- Configures database adapters based on environment
- Sets up the Lexical rich text editor
- Configures TypeScript type generation (outputs to `src/payload-types.ts`)
- Defines admin panel settings

## Next Steps

The following tasks need to be completed to fully integrate PayloadCMS:

1. ✅ Install and configure PayloadCMS (Task 1 - COMPLETED)
2. Create core collection schemas (Users, Authors, Testimonials, Media)
3. Create custom Lexical blocks for rich content
4. Create Blog Posts and Case Studies collections
5. Build migration script to convert MDX files to Payload entries
6. Update API utilities to fetch from Payload instead of MDX files
7. Create rich text renderer component
8. Integrate with Next.js pages

## Admin Panel Access

Once collections are configured, the admin panel will be accessible at:

```
http://localhost:3000/admin
```

## TypeScript Types

PayloadCMS automatically generates TypeScript types for all collections. These types will be available in `src/payload-types.ts` after the first build or when collections are added.

## Development Workflow

1. Start the development server: `pnpm dev`
2. Access the admin panel at `/admin`
3. Create and manage content through the admin interface
4. Content is automatically available to the Next.js application

## Production Deployment

For production deployment:

1. Set up a PostgreSQL database
2. Configure the `DATABASE_URL` environment variable
3. Set a secure `PAYLOAD_SECRET` (use a random string generator)
4. Build the application: `pnpm build`
5. Start the production server: `pnpm start`

## Resources

- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [PayloadCMS 3.x Migration Guide](https://payloadcms.com/docs/beta/overview)
- [Next.js Integration](https://payloadcms.com/docs/beta/getting-started/installation#nextjs)
