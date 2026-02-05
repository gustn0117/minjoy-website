import { Metadata } from 'next'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: '문의하기 | 민죠이짐 & 민죠이케어',
  description: '궁금하신 점이 있으시면 언제든 연락주세요. 상담 신청 후 24시간 내에 연락드립니다.',
}

export default function ContactPage() {
  return (
    <main className="pt-20">
      <Contact />
    </main>
  )
}
