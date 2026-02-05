'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Facility {
  id: string
  type: string
  title: string
  description?: string
  image?: string
  order: number
}

const Facilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/content?type=facilities&activeOnly=true')
        if (response.ok) {
          const data = await response.json()
          setFacilities(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch facilities:', error)
      }
    }

    fetchData()
  }, [])

  // 기본값 with placeholder images
  const defaultGymFeatures: Facility[] = [
    { id: '1', type: 'gym', title: '최신 웨이트 장비', description: '프리미엄 웨이트 트레이닝 장비', order: 0 },
    { id: '2', type: 'gym', title: '프리웨이트존', description: '다양한 덤벨과 바벨', order: 1 },
    { id: '3', type: 'gym', title: '프라이빗 트레이닝룸', description: '1:1 맞춤 PT 공간', order: 2 },
    { id: '4', type: 'gym', title: '여성 전용 샤워실', description: '깨끗하고 쾌적한 환경', order: 3 },
  ]

  const defaultCareFeatures: Facility[] = [
    { id: '5', type: 'care', title: '첨단 체형관리 장비', description: '최신 관리 기기 완비', order: 0 },
    { id: '6', type: 'care', title: '프리미엄 관리실', description: '프라이빗 1인실', order: 1 },
    { id: '7', type: 'care', title: '힐링 스파존', description: '편안한 휴식 공간', order: 2 },
    { id: '8', type: 'care', title: '청결한 위생 관리', description: '철저한 소독 시스템', order: 3 },
  ]

  const gymFeatures = facilities.length > 0
    ? facilities.filter(f => f.type === 'gym')
    : defaultGymFeatures

  const careFeatures = facilities.length > 0
    ? facilities.filter(f => f.type === 'care')
    : defaultCareFeatures

  return (
    <section id="facilities" className="section-padding bg-ivory">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">시설 소개</span>
          </h2>
          <p className="text-xl text-brown-dark">
            최고의 시설에서 최상의 케어를 받으세요
          </p>
        </div>

        {/* Gym Facilities Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gym rounded-full flex items-center justify-center">
              <span className="text-2xl">🏋️‍♀️</span>
            </div>
            <h3 className="text-3xl font-bold gradient-text-gym">민죠이짐 시설</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gymFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gym-light/20"
              >
                {/* Image Area */}
                <div className="h-48 bg-gradient-to-br from-gym to-gym-dark relative overflow-hidden">
                  {feature.image ? (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-5xl mb-2 opacity-80">
                          {index === 0 && '🏋️'}
                          {index === 1 && '💪'}
                          {index === 2 && '🎯'}
                          {index === 3 && '🚿'}
                        </div>
                        <div className="text-xs opacity-60">이미지 준비중</div>
                      </div>
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-white rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-16 h-16 border border-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-5">
                  <h4 className="font-bold text-lg text-brown-dark mb-1">{feature.title}</h4>
                  <p className="text-sm text-brown-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Care Facilities Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl">💆‍♀️</span>
            </div>
            <h3 className="text-3xl font-bold gradient-text">민죠이케어 시설</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
              >
                {/* Image Area */}
                <div className="h-48 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
                  {feature.image ? (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-5xl mb-2 opacity-80">
                          {index === 0 && '✨'}
                          {index === 1 && '🛋️'}
                          {index === 2 && '🌿'}
                          {index === 3 && '🧴'}
                        </div>
                        <div className="text-xs opacity-60">이미지 준비중</div>
                      </div>
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-white rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-16 h-16 border border-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-5">
                  <h4 className="font-bold text-lg text-brown-dark mb-1">{feature.title}</h4>
                  <p className="text-sm text-brown-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-gym rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="relative z-10">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              운동과 관리, 한 건물에서 모두 가능합니다
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              민죠이짐과 민죠이케어는 같은 건물 내 위치하여<br className="hidden md:block" />
              이동 없이 편리하게 운동과 관리를 받으실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Facilities
