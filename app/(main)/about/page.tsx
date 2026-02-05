import { Metadata } from 'next'
import About from '@/components/About'

export const metadata: Metadata = {
  title: '브랜드 소개 | 민죠이짐 & 민죠이케어',
  description: '민죠이만의 특별함 - 운동과 관리를 동시에, 확실한 변화를 약속합니다.',
}

export default function AboutPage() {
  return (
    <main className="pt-20">
      <About />
    </main>
  )
}
