import { NextRequest, NextResponse } from 'next/server'
import { newsHelpers } from '@/lib/supabase-helpers'

// GET /api/sentiment/[symbol]?days=7 - Get sentiment summary for a symbol
export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '7')

  const { data, error } = await newsHelpers.getSentimentSummary(params.symbol, days)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Calculate sentiment score (-100 to +100)
  const total = data.bullish + data.bearish + data.neutral
  let sentimentScore = 0
  let overallSentiment = 'neutral'

  if (total > 0) {
    sentimentScore = Math.round(((data.bullish - data.bearish) / total) * 100)

    if (sentimentScore > 30) overallSentiment = 'bullish'
    else if (sentimentScore < -30) overallSentiment = 'bearish'
  }

  return NextResponse.json({
    symbol: params.symbol,
    days,
    counts: data,
    total,
    sentimentScore,
    overallSentiment,
    lastUpdated: new Date().toISOString()
  })
}
