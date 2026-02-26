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
  const [isLoaded, setIsLoaded] = useState(false)

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

    // Trigger entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

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

  const titleParts = content.title.split(',')

  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brown-dark/80 via-black/50 to-primary-dark/40"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary-light/8 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        {/* Subtitle */}
        <p className={`text-sm md:text-base uppercase tracking-[0.3em] text-primary-light mb-6 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Premium Total Care Center
        </p>

        {/* Title */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight transition-all duration-700 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          {titleParts.length > 1 ? (
            <>
              {titleParts[0]},<br />
              <span className="text-primary-light">
                {titleParts.slice(1).join(',')}
              </span>
            </>
          ) : (
            <span className="text-primary-light">
              {content.title}
            </span>
          )}
        </h1>

        {/* Description */}
        <p className={`text-lg md:text-xl mb-10 text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          {content.subtitle}<br />
          {content.description}
        </p>

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <Link
            href={content.buttonLink1}
            className="bg-primary text-white px-10 py-4 rounded-md font-semibold text-lg btn-premium hover:bg-primary-dark transition-all duration-300"
          >
            {content.buttonText1}
          </Link>
          {content.buttonText2 && (
            <Link
              href={content.buttonLink2 || '/'}
              className="border-2 border-white/40 text-white px-10 py-4 rounded-md font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              {content.buttonText2}
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-700 delay-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          {stats.map((stat) => (
            <div key={stat.id} className="group p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 hover:border-primary-light/40 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-primary-light group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
