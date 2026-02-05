'use client'

import { useState, useEffect } from 'react'

interface Facility {
  id: string
  type: string
  title: string
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

  // 기본값
  const defaultGymFeatures = [
    { id: '1', type: 'gym', title: '최신 웨이트 트레이닝 장비', order: 0 },
    { id: '2', type: 'gym', title: '유산소 운동 기구', order: 1 },
    { id: '3', type: 'gym', title: '프리웨이트존', order: 2 },
    { id: '4', type: 'gym', title: '여성 전용 탈의실 및 샤워실', order: 3 },
    { id: '5', type: 'gym', title: '깨끗한 운동 환경', order: 4 },
    { id: '6', type: 'gym', title: '프라이빗 트레이닝룸', order: 5 },
  ]

  const defaultCareFeatures = [
    { id: '7', type: 'care', title: '첨단 체형관리 장비', order: 0 },
    { id: '8', type: 'care', title: '프리미엄 관리실', order: 1 },
    { id: '9', type: 'care', title: '편안한 힐링 공간', order: 2 },
    { id: '10', type: 'care', title: '1인 1실 관리', order: 3 },
    { id: '11', type: 'care', title: '청결한 위생 관리', order: 4 },
    { id: '12', type: 'care', title: '아늑한 대기 공간', order: 5 },
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gym Facilities */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gym-light/20">
              <div className="h-64 bg-gradient-to-br from-gym-dark to-gym flex items-center justify-center relative">
                {/* Chandelier effect */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-1 bg-gold-light rounded-full animate-pulse"></div>
                </div>
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🏋️‍♀️</div>
                  <h3 className="text-2xl font-bold">민죠이짐 시설</h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-6 text-brown-dark">운동 시설</h4>
                <ul className="space-y-3">
                  {gymFeatures.map((feature) => (
                    <li key={feature.id} className="flex items-center">
                      <span className="w-2 h-2 bg-gym rounded-full mr-3"></span>
                      <span className="text-brown-dark">{feature.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Care Facilities */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-primary-light/20">
              <div className="h-64 bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center relative">
                {/* Chandelier effect */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-1 bg-gold-light rounded-full animate-pulse"></div>
                </div>
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">💆‍♀️</div>
                  <h3 className="text-2xl font-bold">민죠이케어 시설</h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-6 text-brown-dark">관리 시설</h4>
                <ul className="space-y-3">
                  {careFeatures.map((feature) => (
                    <li key={feature.id} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-brown-dark">{feature.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 text-center border border-gold/20 shadow-lg">
          <div className="w-8 h-8 mx-auto mb-4 text-gold">✨</div>
          <h3 className="text-2xl font-bold mb-4 text-brown-dark">
            운동과 관리, 한 건물에서 모두 가능합니다
          </h3>
          <p className="text-brown-light">
            민죠이짐과 민죠이케어는 같은 건물 내 위치하여<br />
            이동 없이 편리하게 운동과 관리를 받으실 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Facilities
