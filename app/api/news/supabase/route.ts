import { NextRequest, NextResponse } from 'next/server'
import { newsHelpers } from '@/lib/supabase-helpers'

// GET /api/news/supabase - Get news from Supabase with filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sentiment = searchParams.get('sentiment') as 'bullish' | 'bearish' | 'neutral' | null
  const source = searchParams.get('source')
  const symbol = searchParams.get('symbol')
  const limit = parseInt(searchParams.get('limit') || '20')

  try {
    // If querying by specific symbol
    if (symbol) {
      const { data, error } = await newsHelpers.getNewsBySymbol(symbol, limit)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({
        news: data,
        total: data?.length || 0,
        lastUpdated: new Date().toISOString()
      })
    }

    // Otherwise get general news with filters
    const options: any = { limit }
    if (sentiment && sentiment !== 'All') options.sentiment = sentiment
    if (source && source !== 'All') options.source = source

    const { data, error } = await newsHelpers.getNews(options)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      news: data,
      total: data?.length || 0,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

// POST /api/news/supabase - Store a news article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, source, url, sentiment, impact, publishedAt, symbols } = body

    if (!title || !source || !url || !sentiment || !publishedAt) {
      return NextResponse.json(
        { error: 'title, source, url, sentiment, and publishedAt are required' },
        { status: 400 }
      )
    }

    const { data, error } = await newsHelpers.storeNewsArticle({
      title,
      content: content || '',
      source,
      url,
      sentiment,
      impact: impact || 'medium',
      publishedAt,
      symbols: symbols || []
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ article: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
