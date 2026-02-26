'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeroContent {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText1: string
  buttonLink1: string
  buttonText2?: string
  buttonLink2?: string
}

interface HeroStat {
  id: string
  value: string
  label: string
  order: number
}

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [heroStats, setHeroStats] = useState<HeroStat[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, statsRes] = await Promise.all([
          fetch('/api/content?type=hero-content&activeOnly=true'),
          fetch('/api/content?type=hero-stats&activeOnly=true'),
        ])

        if (contentRes.ok) {
          const contentData = await contentRes.json()
          if (contentData.items && contentData.items.length > 0) {
            setHeroContent(contentData.items[0])
          }
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setHeroStats(statsData.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch hero data:', error)
      }
    }

    fetchData()
  }, [])

  // 기본값
  const content = heroContent || {
    title: '확실한 변화, 민죠이와 함께',
    subtitle: '운동과 관리를 한 곳에서!',
    description: '단기간에 확실한 변화를 경험하세요',
    buttonText1: '상담 신청하기',
    buttonLink1: '/contact',
    buttonText2: '더 알아보기',
    buttonLink2: '/about',
  }

  const stats = heroStats.length > 0 ? heroStats : [
    { id: '1', value: '1,000+', label: '누적 회원수', order: 0 },
    { id: '2', value: '95%', label: '만족도', order: 1 },
    { id: '3', value: '1:1', label: '맞춤 관리', order: 2 },
    { id: '4', value: '100%', label: '여성 전문가', order: 3 },
  ]

  // 제목 줄바꿈 처리
  const titleParts = content.title.split(',')

  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-gray-900">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {titleParts.length > 1 ? (
            <>
              {titleParts[0]},<br />
              <span className="text-primary font-bold">
                {titleParts.slice(1).join(',')}
              </span>
            </>
          ) : (
            <span className="text-primary font-bold">
              {content.title}
            </span>
          )}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          {content.subtitle}<br />
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={content.buttonLink1}
            className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            {content.buttonText1}
          </Link>
          {content.buttonText2 && (
            <Link
              href={content.buttonLink2 || '/'}
              className="border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              {content.buttonText2}
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat) => (
            <div key={stat.id} className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="text-4xl font-bold mb-2 text-primary">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
