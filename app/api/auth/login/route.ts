import { NextRequest, NextResponse } from 'next/server'
import { createToken, setAuthCookie } from '@/lib/auth'

const ADMIN_PASSWORD = '1234'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: '비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    const token = await createToken({ id: 'admin', email: 'admin@minjoy.com' })
    await setAuthCookie(token)

    return NextResponse.json({
      message: '로그인 성공',
      admin: {
        id: 'admin',
        email: 'admin@minjoy.com',
        name: '관리자',
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
