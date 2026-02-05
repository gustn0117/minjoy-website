'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ReviewImage {
  id: string
  image: string
  title?: string
  source?: string
  order: number
}

const Review = () => {
  const [reviewImages, setReviewImages] = useState<ReviewImage[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/content?type=review-images&activeOnly=true')
        if (response.ok) {
          const data = await response.json()
          setReviewImages(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch review images:', error)
      }
    }

    fetchData()
  }, [])

  // 기본 플레이스홀더 이미지 (관리자가 업로드하기 전)
  const defaultImages = [
    { id: '1', image: '/images/1.png', order: 0 },
    { id: '2', image: '/images/1.png', order: 1 },
  ]

  const images = reviewImages.length > 0 ? reviewImages : defaultImages

  return (
    <section className="relative py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-primary-dark overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              민죠이<br />
              고객님들의
            </h2>
            <h3 className="text-5xl md:text-6xl font-black mb-8 tracking-wider">
              REAL REVIEW
            </h3>
            <Link
              href="/gallery"
              className="inline-block px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-primary-dark transition-all duration-300 text-lg"
            >
              리뷰 보러가기
            </Link>
          </div>

          {/* Right Content - Phone Mockups */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Phone Frame 1 */}
            <div className="relative w-56 h-[450px] bg-black rounded-[3rem] p-2 shadow-2xl transform -rotate-6 z-10">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {images[0] && (
                  <Image
                    src={images[0].image}
                    alt="리뷰 스크린샷"
                    fill
                    className="object-cover"
                  />
                )}
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl"></div>
                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/30 rounded-full"></div>
              </div>
            </div>

            {/* Phone Frame 2 */}
            {images[1] && (
              <div className="relative w-56 h-[450px] bg-black rounded-[3rem] p-2 shadow-2xl transform rotate-6 -ml-20 z-20">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  <Image
                    src={images[1].image}
                    alt="리뷰 스크린샷"
                    fill
                    className="object-cover"
                  />
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl"></div>
                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/30 rounded-full"></div>
                </div>
              </div>
            )}

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-light/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: '누적 리뷰' },
            { value: '4.9', label: '평균 평점' },
            { value: '98%', label: '재방문율' },
            { value: '100%', label: '만족 보장' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="text-3xl md:text-4xl font-bold text-gold-light mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Review
