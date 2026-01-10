# Neon Database Setup Instructions

## Setup Steps

1. **Add Environment Variable in Vercel:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `DATABASE_URL=postgresql://neondb_owner:npg_SQwzCst2vyX8@ep-sweet-sea-ahh1cd53-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require`

2. **Initialize Database (One-Time Setup):**
   - After deployment, visit: `https://your-site.vercel.app/api/init`
   - This creates the products table

3. **Benefits:**
   - ✅ Images uploaded on laptop will show on phone
   - ✅ All data synced across all devices
   - ✅ No more localStorage limitations
   - ✅ Persistent data storage

## What Changed:

- Added Neon PostgreSQL database
- Created API routes for products (GET, POST, PUT, DELETE)
- Images stored as base64 in database
- Admin panel now saves to database instead of localStorage
- Product display fetches from database

## Note:

The package needs to be installed on Vercel (not locally due to disk space).
Vercel will automatically install `@neondatabase/serverless` when deploying.
