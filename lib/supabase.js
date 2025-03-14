import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helper functions
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  try {
    console.log('Getting current user session');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return { user: null, error: sessionError };
    }
    
    if (!session) {
      console.log('No active session found');
      return { user: null, error: null };
    }
    
    console.log('Session found, user ID:', session.user.id);
    
    // Get additional user data from the admin_users table
    try {
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (adminError) {
        console.error('Error getting admin user data:', adminError);
        // Still return the session user even if we can't get admin data
        return { user: session.user, error: adminError };
      }
      
      console.log('Admin user data retrieved:', adminUser);
      return { user: { ...session.user, ...adminUser }, error: null };
    } catch (adminQueryError) {
      console.error('Unexpected error querying admin_users:', adminQueryError);
      return { user: session.user, error: adminQueryError };
    }
  } catch (err) {
    console.error('Unexpected error in getCurrentUser:', err);
    return { user: null, error: err };
  }
};

// Admin user management functions
export const getAdminUsers = async () => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*');
    
  return { data, error };
};

export const createAdminUser = async (userData) => {
  try {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true,
    });
    
    if (authError) {
      console.error('Error creating user with admin API:', authError);
      
      // If the admin API fails, try using the signUp method
      // Note: This will require email verification unless you have disabled it in Supabase
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
          }
        }
      });
      
      if (signUpError) {
        return { data: null, error: signUpError };
      }
      
      // Then add the user to the admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .insert([
          { 
            id: signUpData.user.id,
            name: userData.name,
            role: userData.role,
            email: userData.email
          }
        ])
        .select();
        
      return { data, error };
    }
    
    // If admin API worked, add the user to the admin_users table
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        { 
          id: authData.user.id,
          name: userData.name,
          role: userData.role,
          email: userData.email
        }
      ])
      .select();
      
    return { data, error };
  } catch (err) {
    console.error('Unexpected error in createAdminUser:', err);
    return { data: null, error: { message: 'An unexpected error occurred' } };
  }
};

export const updateAdminUser = async (id, updates) => {
  const { data, error } = await supabase
    .from('admin_users')
    .update(updates)
    .eq('id', id)
    .select();
    
  return { data, error };
};

export const deleteAdminUser = async (id) => {
  // Delete from admin_users table
  const { error: adminError } = await supabase
    .from('admin_users')
    .delete()
    .eq('id', id);
    
  if (adminError) {
    return { error: adminError };
  }
  
  // Delete the auth user
  const { error: authError } = await supabase.auth.admin.deleteUser(id);
  
  return { error: authError };
}; 