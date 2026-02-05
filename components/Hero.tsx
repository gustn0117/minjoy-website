'use client'

import { useState, useEffect } from 'react'

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
    buttonLink1: '#contact',
    buttonText2: '더 알아보기',
    buttonLink2: '#about',
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
    <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-amber-800 to-primary-dark">
      {/* Overlay with warm tone */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Decorative elements - chandelier sparkle effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-gold rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-gold-light rounded-full animate-pulse delay-100 opacity-40"></div>
        <div className="absolute top-40 left-1/2 w-2 h-2 bg-gold rounded-full animate-pulse delay-200 opacity-50"></div>
        <div className="absolute top-28 right-1/4 w-1 h-1 bg-gold-light rounded-full animate-pulse delay-300 opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {titleParts.length > 1 ? (
            <>
              {titleParts[0]},<br />
              <span className="bg-gradient-to-r from-gold-light to-primary-light bg-clip-text text-transparent">
                {titleParts.slice(1).join(',')}
              </span>
            </>
          ) : (
            <span className="bg-gradient-to-r from-gold-light to-primary-light bg-clip-text text-transparent">
              {content.title}
            </span>
          )}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-ivory">
          {content.subtitle}<br />
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={content.buttonLink1} className="bg-gradient-to-r from-primary-dark to-primary text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
            {content.buttonText1}
          </a>
          {content.buttonText2 && (
            <a href={content.buttonLink2 || '#'} className="border-2 border-ivory text-ivory px-8 py-3 rounded-full font-medium hover:bg-ivory hover:text-brown-dark transition-all duration-300">
              {content.buttonText2}
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat) => (
            <div key={stat.id} className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-gold/20">
              <div className="text-4xl font-bold mb-2 text-gold-light">{stat.value}</div>
              <div className="text-sm text-ivory">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-ivory rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-ivory rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
