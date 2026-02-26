'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiPhone, FiMessageSquare, FiX } from 'react-icons/fi'

interface FloatingButton {
  id: string
  type: string
  label: string
  href: string
  bgColor: string
  textColor: string
  order: number
}

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [buttons, setButtons] = useState<FloatingButton[]>([])

  useEffect(() => {
    const fetchButtons = async () => {
      try {
        const response = await fetch('/api/content?type=floating-buttons&activeOnly=true')
        if (response.ok) {
          const data = await response.json()
          setButtons(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch floating buttons:', error)
      }
    }

    fetchButtons()
  }, [])

  const defaultButtons: FloatingButton[] = [
    {
      id: 'kakao',
      type: 'kakao',
      label: '카톡상담',
      href: 'https://pf.kakao.com/_xYourKakaoId',
      bgColor: 'bg-[#FEE500]',
      textColor: 'text-[#3C1E1E]',
      order: 0,
    },
    {
      id: 'naver',
      type: 'naver',
      label: '예약하기',
      href: 'https://booking.naver.com/booking/yourId',
      bgColor: 'bg-[#03C75A]',
      textColor: 'text-white',
      order: 1,
    },
    {
      id: 'phone',
      type: 'phone',
      label: '전화하기',
      href: 'tel:010-0000-0000',
      bgColor: 'bg-primary',
      textColor: 'text-white',
      order: 2,
    },
    {
      id: 'inquiry',
      type: 'inquiry',
      label: '상담접수',
      href: '/contact',
      bgColor: 'bg-white',
      textColor: 'text-primary',
      order: 3,
    },
  ]

  const displayButtons = buttons.length > 0 ? buttons : defaultButtons

  const getButtonIcon = (type: string) => {
    switch (type) {
      case 'kakao':
        return (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.65 1.734 4.974 4.336 6.332-.136.503-.878 3.237-.907 3.459 0 0-.018.173.091.238.109.065.237.015.237.015.313-.043 3.622-2.365 4.185-2.765.684.097 1.39.148 2.058.148 5.523 0 10-3.463 10-7.427C22 6.463 17.523 3 12 3z"/>
          </svg>
        )
      case 'naver':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current font-bold">
            <text x="5" y="18" fontSize="16" fontWeight="bold">N</text>
          </svg>
        )
      case 'phone':
        return <FiPhone className="w-6 h-6" />
      case 'inquiry':
      default:
        return <FiMessageSquare className="w-6 h-6" />
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      {/* Buttons with stagger animation */}
      <div className={`flex flex-col gap-3 transition-all duration-300 ${
        isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {displayButtons.map((button, index) => (
          <Link
            key={button.id}
            href={button.href}
            target={button.href.startsWith('http') ? '_blank' : undefined}
            rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${button.bgColor} ${button.textColor} ${button.type === 'inquiry' ? 'border-2 border-gray-200' : ''}`}
            style={{
              transitionDelay: isExpanded ? `${index * 60}ms` : '0ms',
              transform: isExpanded ? 'translateX(0)' : 'translateX(20px)',
              opacity: isExpanded ? 1 : 0,
            }}
          >
            <span className="flex items-center justify-center w-8 h-8">
              {getButtonIcon(button.type)}
            </span>
            <span className="font-medium text-sm whitespace-nowrap">{button.label}</span>
          </Link>
        ))}
      </div>

      {/* Toggle Button with rotation */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 hover:scale-110 ${
          isExpanded
            ? 'bg-gray-700 text-white'
            : 'bg-primary text-white animate-pulse-glow'
        }`}
      >
        <span className={`transition-transform duration-500 flex items-center justify-center ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
          {isExpanded ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMessageSquare className="w-6 h-6" />
          )}
        </span>
      </button>
    </div>
  )
}

export default FloatingButtons
