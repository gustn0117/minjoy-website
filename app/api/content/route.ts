import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 지원하는 콘텐츠 타입
const contentTypes = {
  'site-settings': prisma.siteSetting,
  'hero-content': prisma.heroContent,
  'hero-stats': prisma.heroStat,
  'about-features': prisma.aboutFeature,
  'gym-programs': prisma.gymProgram,
  'gym-targets': prisma.gymTarget,
  'care-services': prisma.careService,
  'facilities': prisma.facility,
  'gallery': prisma.galleryItem,
  'contact-info': prisma.contactInfo,
  'menu-items': prisma.menuItem,
} as const

type ContentType = keyof typeof contentTypes

// GET: 콘텐츠 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as ContentType
    const activeOnly = searchParams.get('activeOnly') === 'true'

    if (!type || !contentTypes[type]) {
      return NextResponse.json({ error: '유효하지 않은 콘텐츠 타입입니다.' }, { status: 400 })
    }

    const model = contentTypes[type] as any

    const where = activeOnly ? { isActive: true } : {}
    const orderBy = type === 'site-settings' ? { key: 'asc' as const } : { order: 'asc' as const }

    const items = await model.findMany({ where, orderBy })

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json({ error: '콘텐츠를 불러오는 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

// POST: 콘텐츠 생성
export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    if (!type || !contentTypes[type as ContentType]) {
      return NextResponse.json({ error: '유효하지 않은 콘텐츠 타입입니다.' }, { status: 400 })
    }

    const model = contentTypes[type as ContentType] as any
    const item = await model.create({ data })

    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    console.error('Content create error:', error)
    return NextResponse.json({ error: '콘텐츠 생성 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

// PUT: 콘텐츠 수정
export async function PUT(request: NextRequest) {
  try {
    const { type, id, data } = await request.json()

    if (!type || !contentTypes[type as ContentType]) {
      return NextResponse.json({ error: '유효하지 않은 콘텐츠 타입입니다.' }, { status: 400 })
    }

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 })
    }

    const model = contentTypes[type as ContentType] as any
    const item = await model.update({ where: { id }, data })

    return NextResponse.json({ item })
  } catch (error) {
    console.error('Content update error:', error)
    return NextResponse.json({ error: '콘텐츠 수정 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

// DELETE: 콘텐츠 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as ContentType
    const id = searchParams.get('id')

    if (!type || !contentTypes[type]) {
      return NextResponse.json({ error: '유효하지 않은 콘텐츠 타입입니다.' }, { status: 400 })
    }

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 })
    }

    const model = contentTypes[type] as any
    await model.delete({ where: { id } })

    return NextResponse.json({ message: '삭제되었습니다.' })
  } catch (error) {
    console.error('Content delete error:', error)
    return NextResponse.json({ error: '콘텐츠 삭제 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
