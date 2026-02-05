import { Metadata } from 'next'
import Facilities from '@/components/Facilities'

export const metadata: Metadata = {
  title: '시설 소개 | 민죠이짐 & 민죠이케어',
  description: '최고의 시설에서 최상의 케어를 받으세요. 운동과 관리, 한 건물에서 모두 가능합니다.',
}

export default function FacilitiesPage() {
  return (
    <main className="pt-20">
      <Facilities />
    </main>
  )
}
