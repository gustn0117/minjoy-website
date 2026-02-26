import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// 콘텐츠 타입 → 테이블명 매핑
const contentTables: Record<string, string> = {
  'site-settings': 'site_settings',
  'hero-content': 'hero_contents',
  'hero-stats': 'hero_stats',
  'about-features': 'about_features',
  'gym-programs': 'gym_programs',
  'gym-targets': 'gym_targets',
  'care-services': 'care_services',
  'facilities': 'facilities',
  'gallery': 'gallery_items',
  'contact-info': 'contact_infos',
  'menu-items': 'menu_items',
  'review-images': 'review_images',
  'floating-buttons': 'floating_buttons',
}

// GET: 콘텐츠 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const activeOnly = searchParams.get('activeOnly') === 'true'

    if (!type || !contentTables[type]) {
      return NextResponse.json({ error: '유효하지 않은 콘텐츠 타입입니다.' }, { status: 400 })
    }

    const table = contentTables[type]
    let query = supabase.from(table).select('*')

    if (activeOnly) {
      query = query.eq('isActive', true)
    }

    if (type === 'site-settings') {
      query = query.order('key', { ascending: true })
    } else {
      query = query.order('order', { ascending: true })
    }

    const { data: items, error } = await query

    if (error) throw error

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

    if (!type || !contentTables[type]) {
      return NextResponse.json({ error: '유효하지 않은 콘텐츠 타입입니다.' }, { status: 400 })
    }

    const table = contentTables[type]
    const { data: item, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()

    if (error) throw error

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

    if (!type || !contentTables[type]) {
      return NextResponse.json({ error: '유효하지 않은 콘텐츠 타입입니다.' }, { status: 400 })
    }

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 })
    }

    const table = contentTables[type]
    const { data: item, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

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
    const type = searchParams.get('type')
    const id = searchParams.get('id')

    if (!type || !contentTables[type]) {
      return NextResponse.json({ error: '유효하지 않은 콘텐츠 타입입니다.' }, { status: 400 })
    }

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 })
    }

    const table = contentTables[type]
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: '삭제되었습니다.' })
  } catch (error) {
    console.error('Content delete error:', error)
    return NextResponse.json({ error: '콘텐츠 삭제 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
