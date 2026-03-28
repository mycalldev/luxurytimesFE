import { NextResponse } from 'next/server'
import { searchProducts } from '../../utils/shopify'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  try {
    const results = await searchProducts(q)
    return NextResponse.json(results)
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
