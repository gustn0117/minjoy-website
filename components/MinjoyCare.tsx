'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiZap, FiDroplet, FiStar, FiHeart, FiActivity, FiArrowDown, FiTrendingUp, FiPercent, FiMinus, FiClipboard, FiEdit3, FiThumbsUp, FiCheckCircle, FiGift } from 'react-icons/fi'

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

// 서비스별 아이콘 매핑
const serviceIcons = [FiDroplet, FiZap, FiStar, FiHeart]

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
    <section id="minjoy-care" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Hero Banner */}
        <div className="mb-16 rounded-xl overflow-hidden bg-primary">
          <div className="px-8 md:px-12 py-16 md:py-20">
            <div className="max-w-2xl text-white">
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                민죠이케어
              </h2>
              <p className="text-xl md:text-2xl font-medium text-white/90">
                누워서 다이어트하는 힐링케어
              </p>
              <p className="text-lg text-white/80 mt-2">
                남녀 모두 이용 가능
              </p>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="bg-white rounded-lg p-8 md:p-12 mb-16 text-center border border-gray-200">
          <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-6">
            <FiStar className="text-primary" size={32} />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            운동과 식단만으로는 부족합니다
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            다이어트도 <span className="text-primary font-bold">&apos;지름길&apos;</span>이 분명 있습니다
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['맞춤진단', '운동', '식단', '기기관리', '수기관리', '멘탈관리'].map((item, index) => (
              <span
                key={index}
                className="bg-primary text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-2">PROGRAMS</p>
            <h3 className="text-3xl font-bold text-gray-900">케어 프로그램</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {serviceList.map((service, index) => {
              const IconComponent = serviceIcons[index] || FiStar
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Image Area */}
                  <div className="h-56 bg-gray-200 relative overflow-hidden">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="mb-3">
                            <IconComponent size={56} />
                          </div>
                          <div className="text-sm text-gray-400">이미지 준비중</div>
                        </div>
                      </div>
                    )}

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-900/60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                          {iconMap[service.icon] || <FiStar size={20} />}
                        </div>
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-900">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Effect Stats */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-2">RESULTS</p>
            <h3 className="text-3xl font-bold text-gray-900">관리 효과</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '-1KG', label: '1회 체험 평균', Icon: FiArrowDown },
              { value: '+1KG', label: '근력 증가', Icon: FiTrendingUp },
              { value: '-3%', label: '체지방률 감소', Icon: FiPercent },
              { value: '-5cm', label: '둘레 감소', Icon: FiMinus },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.Icon className="text-primary" size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-2">PROCESS</p>
            <h3 className="text-3xl font-bold text-gray-900">관리 프로세스</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: '상담 & 진단', desc: '체형 분석과 목표 설정', Icon: FiClipboard },
              { step: '02', title: '맞춤 프로그램', desc: '개인별 관리 계획 수립', Icon: FiEdit3 },
              { step: '03', title: '전문 관리', desc: '기기 + 수기 복합 관리', Icon: FiThumbsUp },
              { step: '04', title: '결과 확인', desc: '체계적인 관리와 피드백', Icon: FiCheckCircle },
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gray-200"></div>
                )}
                <div className="bg-white rounded-lg p-6 border border-gray-200 relative z-10 hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-3">
                    <item.Icon className="text-primary" size={20} />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary rounded-xl p-8 md:p-12 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FiGift className="text-white" size={32} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            짧은 시간 목표 달성이 가능합니다
          </h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            종합 관리로 확실한 효과를 경험하세요.<br />
            지금 바로 무료 상담을 받아보세요.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary-dark px-8 py-3 rounded-md font-bold hover:bg-gray-50 transition-colors"
          >
            무료 상담 신청하기
          </a>
        </div>
      </div>
    </section>
  )
}

export default MinjoyCare
