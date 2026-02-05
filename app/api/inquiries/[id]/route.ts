import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 문의 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    })

    if (!inquiry) {
      return NextResponse.json(
        { error: '문의를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(inquiry)
  } catch (error) {
    console.error('Inquiry fetch error:', error)
    return NextResponse.json(
      { error: '문의를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 문의 읽음 처리
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { isRead: body.isRead ?? true },
    })

    return NextResponse.json(inquiry)
  } catch (error) {
    console.error('Inquiry update error:', error)
    return NextResponse.json(
      { error: '문의 상태 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 문의 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.inquiry.delete({
      where: { id },
    })

    return NextResponse.json({ message: '문의가 삭제되었습니다.' })
  } catch (error) {
    console.error('Inquiry delete error:', error)
    return NextResponse.json(
      { error: '문의 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
