'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiCamera } from 'react-icons/fi'

interface GalleryItem {
  id: string
  period: string
  weightChange: string
  fatChange: string
  beforeImage?: string
  afterImage?: string
  description?: string
  order: number
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/content?type=gallery&activeOnly=true')
        if (response.ok) {
          const data = await response.json()
          setItems(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch gallery items:', error)
      }
    }

    fetchData()
  }, [])

  // 기본값
  const galleryItems = items.length > 0 ? items : [
    { id: '1', period: '3개월', weightChange: '-8kg', fatChange: '-5%', order: 0 },
    { id: '2', period: '3개월', weightChange: '-6kg', fatChange: '-4%', order: 1 },
    { id: '3', period: '2개월', weightChange: '-5kg', fatChange: '-3%', order: 2 },
    { id: '4', period: '4개월', weightChange: '-10kg', fatChange: '-6%', order: 3 },
    { id: '5', period: '3개월', weightChange: '-7kg', fatChange: '-5%', order: 4 },
    { id: '6', period: '2개월', weightChange: '-4kg', fatChange: '-3%', order: 5 },
  ]

  return (
    <section id="gallery" className="section-padding bg-gradient-to-br from-ivory-dark to-primary-light/20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">변화 갤러리</span>
          </h2>
          <p className="text-xl text-brown-dark">
            민죠이에서 이루어낸 놀라운 변화들
          </p>
        </div>

        {/* Before & After Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
            >
              <div className="h-64 bg-gradient-to-br from-primary-light to-ivory flex items-center justify-center relative overflow-hidden">
                {item.beforeImage && item.afterImage ? (
                  <div className="flex w-full h-full">
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={item.beforeImage}
                        alt="Before"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Before</span>
                    </div>
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={item.afterImage}
                        alt="After"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">After</span>
                    </div>
                  </div>
                ) : item.beforeImage || item.afterImage ? (
                  <div className="w-full h-full relative">
                    <Image
                      src={(item.beforeImage || item.afterImage)!}
                      alt="Gallery"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FiCamera className="text-primary" size={28} />
                    </div>
                    <p className="text-brown-dark font-medium">Before & After</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-brown-light">기간</span>
                  <span className="font-semibold text-brown-dark">{item.period}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-brown-light">체중 변화</span>
                  <span className="font-semibold text-primary-dark">{item.weightChange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brown-light">체지방률</span>
                  <span className="font-semibold text-primary-dark">{item.fatChange}</span>
                </div>
                {item.description && (
                  <p className="mt-3 text-sm text-brown-light">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gold/20">
          <h3 className="text-3xl font-bold text-center mb-8 text-brown-dark">
            회원님들의 평균 변화
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-dark mb-2">-6.5kg</div>
              <div className="text-brown-light">평균 체중 감량</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-dark mb-2">-4.2%</div>
              <div className="text-brown-light">평균 체지방률 감소</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gym mb-2">+2.1kg</div>
              <div className="text-brown-light">평균 근육량 증가</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">3개월</div>
              <div className="text-brown-light">평균 목표 달성 기간</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
