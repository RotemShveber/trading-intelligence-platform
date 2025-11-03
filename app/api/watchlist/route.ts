import { NextRequest, NextResponse } from 'next/server'
import { watchlistHelpers } from '@/lib/supabase-helpers'

// GET /api/watchlist?userId=xxx - Get all watchlists for a user
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  const { data, error } = await watchlistHelpers.getUserWatchlists(userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ watchlists: data })
}

// POST /api/watchlist - Create a new watchlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, name, description, isPublic } = body

    if (!userId || !name) {
      return NextResponse.json(
        { error: 'userId and name are required' },
        { status: 400 }
      )
    }

    const { data, error } = await watchlistHelpers.createWatchlist(
      userId,
      name,
      description,
      isPublic
    )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ watchlist: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
