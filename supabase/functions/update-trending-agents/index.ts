import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = 'https://casroknzdishifjrwkit.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhc3Jva256ZGlzaGlmanJ3a2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODc0NzUsImV4cCI6MjA2OTk2MzQ3NX0.JUcrit1iBoD6FkPRz6Ua1BctZPul8QefG3-fONKO_K0'
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Starting trending agents update...')

    // Call the database function to update trending agents
    const { data, error } = await supabase.rpc('update_trending_agents')

    if (error) {
      console.error('Error updating trending agents:', error)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error.message 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Successfully updated trending agents')

    // Get the count of current trending agents for verification
    const { data: trendingCount, error: countError } = await supabase
      .from('agents')
      .select('id', { count: 'exact' })
      .eq('is_trending', true)

    if (countError) {
      console.error('Error getting trending count:', countError)
    } else {
      console.log(`Current trending agents count: ${trendingCount?.length || 0}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Trending agents updated successfully',
        trendingCount: trendingCount?.length || 0
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})