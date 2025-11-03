import { NextRequest, NextResponse } from 'next/server'
import { alertHelpers } from '@/lib/supabase-helpers'

// GET /api/alerts?userId=xxx - Get all active alerts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  const { data, error } = await alertHelpers.getActiveAlerts(userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ alerts: data })
}

// POST /api/alerts - Create a new alert
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, symbol, alertType, condition, threshold } = body

    if (!userId || !symbol || !alertType || !condition) {
      return NextResponse.json(
        { error: 'userId, symbol, alertType, and condition are required' },
        { status: 400 }
      )
    }

    const { data, error } = await alertHelpers.createAlert(userId, {
      symbol,
      alertType,
      condition,
      threshold
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ alert: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// DELETE /api/alerts?alertId=xxx - Delete an alert
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const alertId = searchParams.get('alertId')

  if (!alertId) {
    return NextResponse.json({ error: 'alertId is required' }, { status: 400 })
  }

  const { error } = await alertHelpers.deleteAlert(alertId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
