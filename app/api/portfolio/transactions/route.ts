import { NextRequest, NextResponse } from 'next/server'
import { portfolioHelpers } from '@/lib/supabase-helpers'

// GET /api/portfolio/transactions?userId=xxx&symbol=AAPL - Get transaction history
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const symbol = searchParams.get('symbol') || undefined

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  const { data, error } = await portfolioHelpers.getTransactions(userId, symbol)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ transactions: data })
}

// POST /api/portfolio/transactions - Record a transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, symbol, type, quantity, price, fees, notes, transactionDate } = body

    if (!userId || !symbol || !type || quantity === undefined || price === undefined) {
      return NextResponse.json(
        { error: 'userId, symbol, type, quantity, and price are required' },
        { status: 400 }
      )
    }

    const { data, error } = await portfolioHelpers.addTransaction(userId, {
      symbol,
      type,
      quantity,
      price,
      fees,
      notes,
      transactionDate: transactionDate || new Date().toISOString()
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ transaction: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
