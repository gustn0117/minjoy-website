import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        phone,
        service,
        message: message || null,
      },
    })

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
    const skip = (page - 1) * limit

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.inquiry.count(),
    ])

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
