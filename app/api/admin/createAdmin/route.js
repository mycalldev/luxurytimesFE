import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { getSupabaseAdmin } from '../../../lib/supabase';

// Secret key for JWT signing - in production, store this in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Get the Supabase admin client
const supabaseAdmin = getSupabaseAdmin();

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if an admin already exists
    // We'll query the users table from Supabase and check for admin role
    const { data: existingAdmins, error: countError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('role', 'ADMIN');

    if (countError) {
      console.error('Error checking existing admins:', countError);
      return NextResponse.json(
        { error: 'Failed to check for existing admins: ' + countError.message },
        { status: 500 }
      );
    }

    // If this is not the first admin, require authorization
    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json(
        { error: 'Admin user already exists. Contact your system administrator.' },
        { status: 403 }
      );
    }

    // Check for existing user in Supabase Auth using the appropriate method
    try {
      // Use the admin.listUsers method to find users by email
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      
      if (listError) {
        console.error('Error listing auth users:', listError);
        // Continue anyway, we'll try to create the user
      } else {
        // Check if any user in the list has the matching email
        const existingUser = users?.find(user => user.email === email);
        
        if (existingUser) {
          console.log('Found existing auth user:', existingUser);
          
          // Check if the user is already in our users table
          const { data: existingUserInTable, error: userTableError } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();
            
          if (!existingUserInTable && !userTableError) {
            // User exists in auth but not in our table, we can reuse this user
            console.log('User exists in auth but not in our users table, reusing...');
            
            // Insert into users table using existing auth user id
            const { data: newUser, error: insertError } = await supabaseAdmin
              .from('users')
              .insert([
                {
                  id: existingUser.id,
                  username,
                  email,
                  role: 'ADMIN',
                }
              ])
              .select('*')
              .single();
              
            if (insertError) {
              console.error('Error inserting user into users table:', insertError);
              return NextResponse.json(
                { error: 'Failed to create user record: ' + insertError.message },
                { status: 500 }
              );
            }
            
            // Create JWT token for the existing user
            const token = sign(
              { 
                id: existingUser.id,
                email: existingUser.email,
                role: 'ADMIN'
              },
              JWT_SECRET,
              { 
                expiresIn: '8h',
                algorithm: 'HS256'
              }
            );
            
            // Set cookie with proper SameSite attribute
            const cookie = serialize('authToken', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 8 * 60 * 60,
              path: '/'
            });
            
            // Return response
            const response = NextResponse.json(
              { 
                message: 'Admin user created successfully using existing auth account', 
                user: {
                  id: existingUser.id,
                  email: existingUser.email,
                  username,
                  role: 'ADMIN'
                }
              },
              { status: 201 }
            );
            
            response.headers.set('Set-Cookie', cookie);
            return response;
          }
          
          // If we reached here, user already exists both in auth and our table
          return NextResponse.json(
            { error: 'User with this email already exists' },
            { status: 400 }
          );
        }
      }
    } catch (checkError) {
      // Just log the error and continue with user creation
      console.error('Error during auth user check:', checkError);
      // We'll proceed with user creation
    }

    // If we reach here, no existing user was found or we need to create a new one
    console.log('Creating new user in Supabase Auth...');
    
    // Create user in Supabase Auth with admin API
    const { data: authUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username, role: 'ADMIN' }
    });

    if (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: 'Failed to create user: ' + createError.message },
        { status: 500 }
      );
    }

    if (!authUser?.user?.id) {
      console.error('User created but no user ID returned:', authUser);
      return NextResponse.json(
        { error: 'Failed to create user: No user ID returned' },
        { status: 500 }
      );
    }

    console.log('Auth user created successfully:', authUser.user.id);

    // Verify the auth user exists before trying to add to users table
    try {
      // A small delay to ensure the auth user is fully created
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Adding user to users table...');
      // Also store user data in our 'users' table
      const { data: newUser, error: insertError } = await supabaseAdmin
        .from('users')
        .insert([
          {
            id: authUser.user.id,
            username,
            email,
            role: 'ADMIN',
          }
        ])
        .select('*')
        .single();

      if (insertError) {
        console.error('Error storing user data:', insertError);
        return NextResponse.json(
          { error: 'Failed to store user data: ' + insertError.message },
          { status: 500 }
        );
      }

      console.log('User added to users table successfully');

      // Create JWT token (for custom cookie implementation)
      const token = sign(
        { 
          id: authUser.user.id,
          email: authUser.user.email,
          role: 'ADMIN'
        },
        JWT_SECRET,
        { 
          expiresIn: '8h', // Token expiration time
          algorithm: 'HS256' // Specifying HS256 algorithm
        }
      );

      // Set cookie with proper SameSite attribute
      const cookie = serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Safer default value
        maxAge: 8 * 60 * 60, // 8 hours in seconds
        path: '/',
        // Don't set domain - will use the current domain
      });

      console.log('Setting auth cookie for user:', authUser.user.id);

      // Return the response with cookie
      const response = NextResponse.json(
        { 
          message: 'Admin user created successfully', 
          user: {
            id: authUser.user.id,
            email: authUser.user.email,
            username,
            role: 'ADMIN'
          }
        },
        { status: 201 }
      );
      
      // Set the cookie header
      response.headers.set('Set-Cookie', cookie);
      
      // Log for debugging
      console.log('Response headers:', [...response.headers.entries()]);
      
      return response;
    } catch (error) {
      console.error('Error in user creation process:', error);
      return NextResponse.json(
        { error: 'Error creating user record: ' + error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
} 