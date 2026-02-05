'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPhone, FiMessageSquare, FiX } from 'react-icons/fi'

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  const buttons = [
    {
      id: 'kakao',
      label: '카톡상담',
      href: 'https://pf.kakao.com/_xYourKakaoId', // 실제 카카오톡 채널 URL로 변경
      bgColor: 'bg-[#FEE500]',
      textColor: 'text-[#3C1E1E]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.65 1.734 4.974 4.336 6.332-.136.503-.878 3.237-.907 3.459 0 0-.018.173.091.238.109.065.237.015.237.015.313-.043 3.622-2.365 4.185-2.765.684.097 1.39.148 2.058.148 5.523 0 10-3.463 10-7.427C22 6.463 17.523 3 12 3z"/>
        </svg>
      ),
    },
    {
      id: 'naver',
      label: '예약하기',
      href: 'https://booking.naver.com/booking/yourId', // 실제 네이버 예약 URL로 변경
      bgColor: 'bg-[#03C75A]',
      textColor: 'text-white',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current font-bold">
          <text x="5" y="18" fontSize="16" fontWeight="bold">N</text>
        </svg>
      ),
    },
    {
      id: 'phone',
      label: '전화하기',
      href: 'tel:010-0000-0000', // 실제 전화번호로 변경
      bgColor: 'bg-primary',
      textColor: 'text-white',
      icon: <FiPhone className="w-6 h-6" />,
    },
    {
      id: 'inquiry',
      label: '상담접수',
      href: '/contact',
      bgColor: 'bg-white',
      textColor: 'text-primary-dark',
      icon: <FiMessageSquare className="w-6 h-6" />,
      border: true,
    },
  ]

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      {isExpanded && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {buttons.map((button) => (
            <Link
              key={button.id}
              href={button.href}
              target={button.href.startsWith('http') ? '_blank' : undefined}
              rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${button.bgColor} ${button.textColor} ${button.border ? 'border-2 border-primary-light' : ''}`}
            >
              <span className="flex items-center justify-center w-8 h-8">
                {button.icon}
              </span>
              <span className="font-medium text-sm whitespace-nowrap">{button.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isExpanded
            ? 'bg-gray-600 text-white rotate-0'
            : 'bg-primary text-white'
        }`}
      >
        {isExpanded ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}

export default FloatingButtons
