'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiZap, FiDroplet, FiStar, FiHeart, FiActivity } from 'react-icons/fi'

interface CareService {
  id: string
  title: string
  description: string
  icon: string
  image?: string
  features: string[]
  order: number
}

// 아이콘 매핑
const iconMap: Record<string, React.ReactNode> = {
  FiDroplet: <FiDroplet size={32} />,
  FiZap: <FiZap size={32} />,
  FiStar: <FiStar size={32} />,
  FiHeart: <FiHeart size={32} />,
  FiActivity: <FiActivity size={32} />,
}

// 서비스별 이모지 매핑
const serviceEmojis = ['💧', '⚡', '✨', '🌸']

const MinjoyCare = () => {
  const [services, setServices] = useState<CareService[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/content?type=care-services&activeOnly=true')
        if (response.ok) {
          const data = await response.json()
          setServices(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch care services:', error)
      }
    }

    fetchData()
  }, [])

  // 기본값
  const serviceList = services.length > 0 ? services : [
    { id: '1', icon: 'FiDroplet', title: '순환 관리', description: '림프 순환을 촉진하여 부기를 제거하고 체내 노폐물을 배출합니다.', features: ['림프 드레나쥬', '부기 제거', '독소 배출', '혈액 순환 개선'], order: 0 },
    { id: '2', icon: 'FiZap', title: '탄력 관리', description: '피부와 근육의 탄력을 높여 처짐 없는 탄탄한 바디라인을 만듭니다.', features: ['근육 강화', '피부 탄력', '셀룰라이트 개선', '라인 정리'], order: 1 },
    { id: '3', icon: 'FiStar', title: '스파 관리', description: '고급 힐링 케어로 심신의 안정과 함께 건강한 아름다움을 선사합니다.', features: ['전신 이완', '스트레스 해소', '피로 회복', '힐링 케어'], order: 2 },
  ]

  return (
    <section id="minjoy-care" className="section-padding bg-gradient-to-br from-primary-light/30 to-ivory">
      <div className="container-custom">
        {/* Hero Banner */}
        <div className="relative mb-16 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light h-64 md:h-80">
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-6xl font-black mb-4">
                    민죠이케어
                  </h2>
                  <p className="text-xl md:text-2xl font-medium opacity-90">
                    누워서 다이어트하는 힐링케어
                  </p>
                  <p className="text-lg opacity-80 mt-2">
                    남녀 모두 이용 가능
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 text-[200px] opacity-10 select-none">
              💆‍♀️
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 text-center border border-primary-light/30 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="text-5xl mb-6">🌟</div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-brown-dark">
              운동과 식단만으로는 부족합니다
            </h3>
            <p className="text-xl text-brown-light mb-8">
              다이어트도 <span className="text-primary-dark font-bold">&apos;지름길&apos;</span>이 분명 있습니다
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['맞춤진단', '운동', '식단', '기기관리', '수기관리', '멘탈관리'].map((item, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-primary-dark to-primary text-white px-5 py-2 rounded-full font-medium shadow-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Services - Rich Card Design */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text">케어 프로그램</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {serviceList.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
              >
                {/* Image Area */}
                <div className="h-56 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-7xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {serviceEmojis[index] || '✨'}
                        </div>
                        <div className="text-sm opacity-60">이미지 준비중</div>
                      </div>
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-6 left-6 w-24 h-24 border-2 border-white rounded-full"></div>
                        <div className="absolute bottom-6 right-6 w-20 h-20 border-2 border-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                        {iconMap[service.icon] || <FiStar size={24} />}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-brown-light mb-6 leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-brown-dark">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before/After Showcase */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center text-brown-dark">
            관리 효과
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '-1KG', label: '1회 체험 평균', icon: '⬇️', color: 'from-primary to-primary-dark' },
              { value: '+1KG', label: '근력 증가', icon: '💪', color: 'from-gym to-gym-dark' },
              { value: '-3%', label: '체지방률 감소', icon: '🔥', color: 'from-primary to-primary-dark' },
              { value: '-5cm', label: '둘레 감소', icon: '📏', color: 'from-gold to-gold-dark' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`h-24 bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <span className="text-5xl">{stat.icon}</span>
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-brown-dark mb-1">{stat.value}</div>
                  <div className="text-xs text-brown-light">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center text-brown-dark">
            관리 프로세스
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: '상담 & 진단', desc: '체형 분석과 목표 설정', icon: '📋' },
              { step: '02', title: '맞춤 프로그램', desc: '개인별 관리 계획 수립', icon: '📝' },
              { step: '03', title: '전문 관리', desc: '기기 + 수기 복합 관리', icon: '🙌' },
              { step: '04', title: '결과 확인', desc: '체계적인 관리와 피드백', icon: '✅' },
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-primary-light/50"></div>
                )}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-light/20 relative z-10 hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-sm text-primary font-bold mb-2">{item.step}</div>
                  <h4 className="font-bold text-lg text-brown-dark mb-1">{item.title}</h4>
                  <p className="text-sm text-brown-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light rounded-3xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="relative z-10">
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              짧은 시간 목표 달성이 가능합니다
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              종합 관리로 확실한 효과를 경험하세요.<br />
              지금 바로 무료 상담을 받아보세요.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-dark px-8 py-4 rounded-full font-bold hover:bg-ivory transition-colors shadow-lg"
            >
              무료 상담 신청하기
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MinjoyCare
