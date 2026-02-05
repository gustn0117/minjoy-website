'use client'

import { useState, useEffect } from 'react'
import { FiZap, FiDroplet, FiStar, FiHeart, FiActivity } from 'react-icons/fi'

interface CareService {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  order: number
}

// 아이콘 매핑
const iconMap: Record<string, React.ReactNode> = {
  FiDroplet: <FiDroplet size={40} />,
  FiZap: <FiZap size={40} />,
  FiStar: <FiStar size={40} />,
  FiHeart: <FiHeart size={40} />,
  FiActivity: <FiActivity size={40} />,
}

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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">민죠이케어</span>
          </h2>
          <p className="text-xl text-brown-dark">
            누워서 다이어트하는 힐링케어 | 남녀 모두 이용 가능
          </p>
        </div>

        {/* Main Message */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-16 text-center border border-primary-light/30">
          <h3 className="text-3xl font-bold mb-4 text-brown-dark">
            운동과 식단만으로는 부족합니다
          </h3>
          <p className="text-xl text-brown-light mb-8">
            다이어트도 <span className="text-primary-dark font-bold">&apos;지름길&apos;</span>이 분명 있습니다
          </p>
          <div className="inline-block bg-gradient-to-r from-primary-dark to-primary text-white px-8 py-4 rounded-full shadow-lg">
            <p className="text-lg font-semibold">
              맞춤진단 + 운동 + 식단 + 기기관리 + 수기관리 + 멘탈관리
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
            >
              <div className="text-primary-dark mb-4">
                {iconMap[service.icon] || <FiStar size={40} />}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-brown-dark">{service.title}</h3>
              <p className="text-brown-light mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-brown-dark">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
          <h3 className="text-3xl font-bold mb-4">
            짧은 시간 목표 달성이 가능합니다
          </h3>
          <p className="text-xl mb-8 opacity-90">
            종합 관리로 확실한 효과를 경험하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <p className="font-semibold">1회 체험 -1KG</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <p className="font-semibold">근력 +1KG 증가</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <p className="font-semibold">체지방률 -3% 감소</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MinjoyCare
