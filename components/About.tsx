'use client'

import { useState, useEffect } from 'react'
import { FiCheckCircle, FiArrowDown, FiTrendingUp, FiPercent, FiTarget, FiMapPin } from 'react-icons/fi'
import Link from 'next/link'

interface AboutFeature {
  id: string
  title: string
  order: number
}

const About = () => {
  const [features, setFeatures] = useState<AboutFeature[]>([])

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
    <section id="about" className="section-padding bg-ivory-dark overflow-hidden">
      <div className="container-custom">
        {/* Hero Section with Dual Brand */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Gym Card */}
          <div className="group relative bg-gradient-to-br from-gym-dark via-gym to-gym-light rounded-3xl p-8 md:p-10 text-white overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl font-black">GYM</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4">민죠이짐</h3>
              <p className="text-lg opacity-90 mb-6">
                여성 전용 PT 샵<br />
                다이어트 · 힙업 · 바디프로필 · 통증케어
              </p>
              <Link
                href="/gym"
                className="inline-flex items-center gap-2 bg-white text-gym-dark px-6 py-3 rounded-full font-bold hover:bg-ivory transition-colors"
              >
                자세히 보기 →
              </Link>
            </div>
          </div>

          {/* Care Card */}
          <div className="group relative bg-gradient-to-br from-primary-dark via-primary to-primary-light rounded-3xl p-8 md:p-10 text-white overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl font-black">CARE</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4">민죠이케어</h3>
              <p className="text-lg opacity-90 mb-6">
                누워서 다이어트하는 힐링케어<br />
                순환관리 · 탄력관리 · 스파관리
              </p>
              <Link
                href="/care"
                className="inline-flex items-center gap-2 bg-white text-primary-dark px-6 py-3 rounded-full font-bold hover:bg-ivory transition-colors"
              >
                자세히 보기 →
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">민죠이</span>만의 특별함
          </h2>
          <p className="text-xl text-brown-dark">
            운동과 관리를 동시에, 확실한 변화를 약속합니다
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {featureList.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-light/20 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <FiCheckCircle className="text-white" size={24} />
              </div>
              <span className="text-lg font-medium text-brown-dark">{feature.title}</span>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { value: '-1kg', label: '1회 체험 평균', Icon: FiArrowDown, gradient: 'from-primary to-primary-dark' },
            { value: '+1kg', label: '근력 증가', Icon: FiTrendingUp, gradient: 'from-gym to-gym-dark' },
            { value: '-3%', label: '체지방률 감소', Icon: FiPercent, gradient: 'from-primary to-primary-dark' },
            { value: '100%', label: '맞춤 관리', Icon: FiTarget, gradient: 'from-gold to-gold-dark' },
          ].map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`h-20 bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.Icon className="text-white" size={32} />
              </div>
              <div className="p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold text-brown-dark mb-1">{stat.value}</div>
                <div className="text-sm text-brown-light">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden mb-20">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gym/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-brown-dark">
                왜 민죠이를<br />
                선택해야 할까요?
              </h3>
              <p className="text-brown-light leading-relaxed">
                민죠이짐은 여성 전용 PT샵으로 다이어트, 힙업, 바디프로필, 통증케어 등
                다양한 운동 목적의 회원님들에게 단기간에 확실한 변화를 제공합니다.
              </p>
              <p className="text-brown-light leading-relaxed mt-4">
                이제 민죠이케어를 통해 &quot;누워서 다이어트하는 힐링케어&quot;까지 함께 경험하세요.
                맞춤 진단 + 운동 + 식단 + 기기 관리 + 수기 관리 + 멘탈 관리까지 포함한
                종합 관리로 짧은 시간 목표 달성이 가능합니다.
              </p>
            </div>

            {/* Visual Element */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gym to-gym-dark rounded-2xl p-6 text-white text-center">
                <div className="text-2xl font-black mb-2">PT</div>
                <div className="font-bold">트레이닝</div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white text-center">
                <div className="text-2xl font-black mb-2">CARE</div>
                <div className="font-bold">체형관리</div>
              </div>
              <div className="bg-gradient-to-br from-gold to-gold-dark rounded-2xl p-6 text-white text-center">
                <div className="text-2xl font-black mb-2">DIET</div>
                <div className="font-bold">식단 관리</div>
              </div>
              <div className="bg-gradient-to-br from-brown-dark to-brown rounded-2xl p-6 text-white text-center">
                <div className="text-2xl font-black mb-2">MIND</div>
                <div className="font-bold">멘탈 케어</div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-gym rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
              className="inline-block bg-white text-primary-dark px-8 py-4 rounded-full font-bold hover:bg-ivory transition-colors shadow-lg"
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
