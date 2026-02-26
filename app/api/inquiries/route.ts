import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// 상담 문의 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, service, message } = body

    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: '필수 항목을 입력해주세요.' },
        { status: 400 }
      )
    }

    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert({
        name,
        phone,
        service,
        message: message || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { message: '상담 신청이 완료되었습니다.', inquiry },
      { status: 201 }
    )
  } catch (error) {
    console.error('Inquiry creation error:', error)
    return NextResponse.json(
      { error: '상담 신청 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 상담 문의 목록 조회 (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const from = (page - 1) * limit
    const to = from + limit - 1

    const [{ data: inquiries, error }, { count }] = await Promise.all([
      supabase
        .from('inquiries')
        .select('*')
        .order('createdAt', { ascending: false })
        .range(from, to),
      supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true }),
    ])

    if (error) throw error

    const total = count || 0

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Inquiry fetch error:', error)
    return NextResponse.json(
      { error: '문의 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
