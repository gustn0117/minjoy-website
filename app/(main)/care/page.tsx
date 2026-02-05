import { Metadata } from 'next'
import MinjoyCare from '@/components/MinjoyCare'

export const metadata: Metadata = {
  title: '민죠이케어 | 프리미엄 체형관리',
  description: '누워서 다이어트하는 힐링케어 - 순환관리, 탄력관리, 스파관리. 남녀 모두 이용 가능.',
}

export default function CarePage() {
  return (
    <main className="pt-20">
      <MinjoyCare />
    </main>
  )
}
