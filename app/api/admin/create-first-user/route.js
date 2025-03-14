import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client with service role key (only for server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables for service role');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request) {
  try {
    // This endpoint should be protected with some kind of secret or only accessible during setup
    // For example, you could require a setup token that's only valid once
    const setupToken = process.env.ADMIN_SETUP_TOKEN;
    
    const { email, password, name, token } = await request.json();
    
    // Validate the setup token if you're using one
    if (setupToken && token !== setupToken) {
      return NextResponse.json(
        { error: 'Invalid setup token' },
        { status: 401 }
      );
    }
    
    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }
    
    // Check if any admin users already exist
    const { data: existingAdmins, error: checkError } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .limit(1);
      
    if (checkError) {
      console.error('Error checking for existing admins:', checkError);
      return NextResponse.json(
        { error: 'Error checking for existing admins' },
        { status: 500 }
      );
    }
    
    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json(
        { error: 'Admin users already exist. Cannot create first admin user.' },
        { status: 400 }
      );
    }
    
    // Create the user with the service role client
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    
    if (userError) {
      console.error('Error creating user:', userError);
      return NextResponse.json(
        { error: userError.message },
        { status: 500 }
      );
    }
    
    // Create the admin user record
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .insert([
        {
          id: userData.user.id,
          name,
          email,
          role: 'admin'
        }
      ])
      .select();
      
    if (adminError) {
      console.error('Error creating admin record:', adminError);
      // Try to clean up the auth user since the admin record failed
      await supabaseAdmin.auth.admin.deleteUser(userData.user.id);
      
      return NextResponse.json(
        { error: adminError.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'First admin user created successfully',
      user: adminData[0]
    });
    
  } catch (error) {
    console.error('Unexpected error in create-first-user API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 