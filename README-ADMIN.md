# Luxury Times Admin Authentication Setup

This document provides instructions on how to set up the admin authentication system for the Luxury Times website.

## Prerequisites

- A Supabase account and project
- Node.js and npm installed

## Setup Steps

### 1. Configure Supabase

1. Log in to your Supabase dashboard and select your project.
2. Navigate to the SQL Editor.
3. Copy the contents of the `supabase/schema.sql` file and execute it in the SQL Editor.
4. This will create the necessary tables, functions, and security policies.

### 2. Configure Environment Variables

1. In your project, create or update the `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_SETUP_TOKEN=your_secure_random_token
```

You can find these values in your Supabase project settings:
- The URL and anon key are under "API" > "Project API keys"
- The service role key is also under "API" > "Project API keys" (labeled as "service_role key")
- The admin setup token can be any secure random string you generate

### 3. Create the First Admin User

You have two options for creating the first admin user:

#### Option A: Using the Setup Page (Recommended)

1. Start the application with `npm run dev`
2. Navigate to `/admin/setup` in your browser
3. Fill in the form with the admin user details and the setup token from your `.env.local` file
4. Submit the form to create the first admin user
5. You'll be redirected to the login page where you can sign in with your new admin credentials

#### Option B: Using the SQL Function

If you prefer to create the first admin user directly in the database:

1. In the Supabase SQL Editor, run the following SQL command:

```sql
SELECT create_first_admin_user(
  'your-admin-email@example.com',
  'your-secure-password',
  'Admin User Name'
);
```

Replace the values with your actual admin email, password, and name.

### 4. Start the Application

1. Run `npm install` to install all dependencies.
2. Run `npm run dev` to start the development server.
3. Navigate to `/admin/login` to access the admin login page.
4. Log in with the admin credentials you created in step 3.

## Admin User Management

Once logged in as an admin, you can:

1. Create new admin users with either "admin" or "editor" roles.
2. Update user roles.
3. Delete users (admins cannot delete themselves).

## Security Features

The authentication system includes the following security features:

- JWT-based authentication using Supabase Auth
- Row-level security policies in the database
- Role-based access control (admin vs. editor)
- Protected routes using middleware
- Secure password handling (passwords are never stored in plain text)

## Watches Database

The schema also includes a `watches` table for storing watch information with the following fields:

- `id`: Unique identifier
- `brand`: Watch brand (rolex, patek_philippe, audemars_piguet)
- `model`: Watch model
- `reference_number`: Reference number
- `year`: Year of manufacture
- `description`: Description
- `price`: Price
- `is_available`: Availability status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
- `created_by`: Admin user who created the record
- `updated_by`: Admin user who last updated the record

## Troubleshooting

If you encounter issues:

1. Check that your Supabase credentials are correct in `.env.local`.
2. Ensure the SQL schema was executed successfully.
3. Verify that the first admin user was created properly.
4. Check the browser console for any JavaScript errors.
5. Check the Supabase logs for any backend errors.

### Common Errors

#### Error with create_first_admin_user function

If you see an error like:
```
ERROR: 42703: column "password" of relation "users" does not exist
QUERY: INSERT INTO auth.users (email, password, email_confirmed_at)
```

This is because the Supabase auth schema has changed. The updated schema in this repository uses Supabase's built-in `auth.create_user` function instead of directly inserting into the `auth.users` table.

Make sure you're using the latest version of the schema.sql file from this repository.

#### Service Role API Key Required

Some operations, like creating users via the admin API, require a service role API key. If you're getting permission errors, make sure you're using the service role key for those operations.

Note: The service role key should NEVER be exposed in client-side code. Only use it in secure server environments or during initial setup. 