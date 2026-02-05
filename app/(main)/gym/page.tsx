import { Metadata } from 'next'
import MinjoyGym from '@/components/MinjoyGym'

export const metadata: Metadata = {
  title: '민죠이짐 | 여성 전용 PT',
  description: '여성 전용 PT 샵 - 다이어트, 힙업, 바디프로필, 통증케어. 확실한 변화를 위한 전문 트레이닝.',
}

export default function GymPage() {
  return (
    <main className="pt-20">
      <MinjoyGym />
    </main>
  )
}
