import { NextRequest, NextResponse } from 'next/server'
import { watchlistHelpers } from '@/lib/supabase-helpers'

// GET /api/watchlist/[id]/items - Get all items in a watchlist
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await watchlistHelpers.getWatchlistItems(params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ items: data })
}

// POST /api/watchlist/[id]/items - Add item to watchlist
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { symbol, name, type, notes } = body

    if (!symbol || !name || !type) {
      return NextResponse.json(
        { error: 'symbol, name, and type are required' },
        { status: 400 }
      )
    }

    const { data, error } = await watchlistHelpers.addToWatchlist(
      params.id,
      symbol,
      name,
      type,
      notes
    )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ item: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// DELETE /api/watchlist/[id]/items?symbol=AAPL - Remove item from watchlist
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'symbol is required' }, { status: 400 })
  }

  const { error } = await watchlistHelpers.removeFromWatchlist(params.id, symbol)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
