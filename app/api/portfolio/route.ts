import { NextRequest, NextResponse } from 'next/server'
import { portfolioHelpers } from '@/lib/supabase-helpers'

// GET /api/portfolio?userId=xxx - Get user's portfolio
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  const { data, error } = await portfolioHelpers.getHoldings(userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ holdings: data })
}

// POST /api/portfolio - Add a holding
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, symbol, name, quantity, averageCost, currency, notes } = body

    if (!userId || !symbol || !name || quantity === undefined || averageCost === undefined) {
      return NextResponse.json(
        { error: 'userId, symbol, name, quantity, and averageCost are required' },
        { status: 400 }
      )
    }

    const { data, error } = await portfolioHelpers.addHolding(userId, {
      symbol,
      name,
      quantity,
      averageCost,
      currency,
      notes
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ holding: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
