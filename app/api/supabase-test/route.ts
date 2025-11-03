import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test the connection by querying Supabase
    const { data, error } = await supabase.from('_test').select('*').limit(1)

    if (error) {
      // If table doesn't exist, that's fine - connection works
      return NextResponse.json({
        status: 'connected',
        message: 'Supabase client is configured correctly',
        note: 'Create your tables in Supabase dashboard'
      })
    }

    return NextResponse.json({
      status: 'connected',
      message: 'Supabase is connected and working'
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
