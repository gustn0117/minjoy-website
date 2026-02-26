import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '민죠이짐 & 민죠이케어 | 여성전용 PT & 체형관리',
  description: '운동과 관리를 한 곳에서! 확실한 변화를 위한 프리미엄 토탈케어 센터. 다이어트, 힙업, 바디프로필 전문.',
  keywords: '여성전용PT, 체형관리, 다이어트, 힙업, 바디프로필, 통증케어, 순환관리, 민죠이',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-white">{children}</body>
    </html>
  )
}
