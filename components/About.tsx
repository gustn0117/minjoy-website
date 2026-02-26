'use client'

import { useState, useEffect } from 'react'
import { FiHeart, FiShield, FiZap, FiStar, FiUsers, FiTarget, FiArrowDown, FiTrendingUp, FiPercent, FiMapPin, FiActivity, FiSun, FiSmile } from 'react-icons/fi'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface AboutFeature {
  id: string
  title: string
  order: number
}

// Diverse icons for feature cards
const featureIcons = [FiHeart, FiShield, FiZap, FiStar, FiUsers, FiTarget]

const About = () => {
  const [features, setFeatures] = useState<AboutFeature[]>([])

  // Scroll animation refs for each section
  const brandSection = useScrollAnimation()
  const featureSection = useScrollAnimation()
  const statsSection = useScrollAnimation()
  const descSection = useScrollAnimation()
  const ctaSection = useScrollAnimation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/content?type=about-features&activeOnly=true')
        if (response.ok) {
          const data = await response.json()
          setFeatures(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch about features:', error)
      }
    }

    fetchData()
  }, [])

  // 기본값
  const featureList = features.length > 0 ? features : [
    { id: '1', title: '체형별 맞춤 운동 프로그램', order: 0 },
    { id: '2', title: '전문 트레이너의 1:1 관리', order: 1 },
    { id: '3', title: '첨단 체형관리 장비', order: 2 },
    { id: '4', title: '확실한 비포&애프터 결과', order: 3 },
    { id: '5', title: '운동 + 관리 토탈 솔루션', order: 4 },
    { id: '6', title: '여성 전용 안전한 환경', order: 5 },
  ]

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Dual Brand Cards */}
        <div
          ref={brandSection.ref}
          className={`grid md:grid-cols-2 gap-8 mb-20 scroll-hidden ${brandSection.isVisible ? 'scroll-visible' : ''}`}
        >
          {/* Gym Card */}
          <div className="bg-white border border-gray-200 border-t-4 border-t-primary rounded-lg p-8 md:p-10 card-hover stagger-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <FiActivity className="text-primary" size={20} />
              </div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-md">
                GYM
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">민죠이짐</h3>
            <p className="text-gray-600 text-lg mb-6">
              여성 전용 PT 샵<br />
              다이어트 · 힙업 · 바디프로필 · 통증케어
            </p>
            <Link
              href="/gym"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-medium btn-premium hover:bg-primary/90 transition-colors"
            >
              자세히 보기 →
            </Link>
          </div>

          {/* Care Card */}
          <div className="bg-white border border-gray-200 border-t-4 border-t-primary rounded-lg p-8 md:p-10 card-hover stagger-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <FiHeart className="text-primary" size={20} />
              </div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-md">
                CARE
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">민죠이케어</h3>
            <p className="text-gray-600 text-lg mb-6">
              누워서 다이어트하는 힐링케어<br />
              순환관리 · 탄력관리 · 스파관리
            </p>
            <Link
              href="/care"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-medium btn-premium hover:bg-primary/90 transition-colors"
            >
              자세히 보기 →
            </Link>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div
          ref={featureSection.ref}
          className={`scroll-hidden ${featureSection.isVisible ? 'scroll-visible' : ''}`}
        >
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-semibold mb-2">민죠이짐</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 section-accent">
              <span className="text-primary font-bold">민죠이</span>만의 특별함
            </h2>
            <p className="text-xl text-gray-600 mt-6">
              운동과 관리를 동시에, 확실한 변화를 약속합니다
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {featureList.map((feature, index) => {
              const IconComponent = featureIcons[index % featureIcons.length]
              return (
                <div
                  key={feature.id}
                  className={`bg-white border border-gray-200 rounded-lg p-6 card-hover flex items-center gap-4 stagger-${(index % 6) + 1}`}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="text-primary" size={24} />
                  </div>
                  <span className="text-lg font-medium text-gray-900">{feature.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsSection.ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 scroll-hidden ${statsSection.isVisible ? 'scroll-visible' : ''}`}
        >
          {[
            { value: '-1kg', label: '1회 체험 평균', Icon: FiArrowDown },
            { value: '+1kg', label: '근력 증가', Icon: FiTrendingUp },
            { value: '-3%', label: '체지방률 감소', Icon: FiPercent },
            { value: '100%', label: '맞춤 관리', Icon: FiTarget },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white border border-gray-200 rounded-lg p-6 text-center card-hover stagger-${index + 1}`}
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.Icon className="text-primary" size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1 transition-transform duration-300 hover:scale-110 cursor-default">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div
          ref={descSection.ref}
          className={`bg-ivory rounded-lg p-8 md:p-12 mb-20 scroll-hidden ${descSection.isVisible ? 'scroll-visible' : ''}`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm text-primary font-semibold mb-2">민죠이짐</p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 section-accent" style={{ textAlign: 'left' }}>
                왜 민죠이를<br />
                선택해야 할까요?
              </h3>
              <p className="text-gray-600 leading-relaxed mt-6">
                민죠이짐은 여성 전용 PT샵으로 다이어트, 힙업, 바디프로필, 통증케어 등
                다양한 운동 목적의 회원님들에게 단기간에 확실한 변화를 제공합니다.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                이제 민죠이케어를 통해 &quot;누워서 다이어트하는 힐링케어&quot;까지 함께 경험하세요.
                맞춤 진단 + 운동 + 식단 + 기기 관리 + 수기 관리 + 멘탈 관리까지 포함한
                종합 관리로 짧은 시간 목표 달성이 가능합니다.
              </p>
            </div>

            {/* Visual Element - Service Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'PT', name: '트레이닝', Icon: FiActivity },
                { label: 'CARE', name: '체형관리', Icon: FiHeart },
                { label: 'DIET', name: '식단 관리', Icon: FiSun },
                { label: 'MIND', name: '멘탈 케어', Icon: FiSmile },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-white border border-gray-200 rounded-lg p-6 text-center card-hover group cursor-default stagger-${index + 1}`}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-50 transition-colors duration-300">
                    <item.Icon className="text-primary" size={22} />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{item.label}</div>
                  <div className="font-medium text-gray-900">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location Info / CTA Banner */}
        <div
          ref={ctaSection.ref}
          className={`bg-primary rounded-xl p-8 md:p-12 text-center text-white relative overflow-hidden scroll-hidden ${ctaSection.isVisible ? 'scroll-visible' : ''}`}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <FiMapPin className="text-white" size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              운동과 관리, 한 건물에서 모두 가능합니다
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              민죠이짐과 민죠이케어는 같은 건물 내 위치하여<br className="hidden md:block" />
              이동 없이 편리하게 운동과 관리를 받으실 수 있습니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary px-8 py-4 rounded-md font-bold btn-premium hover:bg-gray-50 transition-colors"
            >
              위치 및 상담 안내
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
