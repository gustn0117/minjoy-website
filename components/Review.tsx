'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ReviewImage {
  id: string
  image: string
  title?: string
  source?: string
  order: number
}

const Review = () => {
  const [reviewImages, setReviewImages] = useState<ReviewImage[]>([])

  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const { ref: phonesRef, isVisible: phonesVisible } = useScrollAnimation()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()

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
    <section className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-light/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            ref={contentRef}
            className={`text-white scroll-hidden ${contentVisible ? 'scroll-visible' : ''}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              민죠이<br />
              고객님들의
            </h2>
            <h3
              className="text-5xl md:text-6xl font-black mb-8 tracking-wider bg-gradient-to-r from-primary-light via-primary to-primary-light bg-clip-text text-transparent"
              style={{ WebkitTextStroke: '1px rgba(196, 145, 138, 0.3)' }}
            >
              REAL REVIEW
            </h3>
            <Link
              href="/gallery"
              className="inline-block px-8 py-4 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-all duration-300 text-lg btn-premium"
            >
              리뷰 보러가기
            </Link>
          </div>

          {/* Right Content - Phone Mockups */}
          <div
            ref={phonesRef}
            className={`relative flex justify-center lg:justify-end scroll-hidden ${phonesVisible ? 'scroll-visible' : ''}`}
          >
            {/* Phone Frame 1 */}
            <div className="relative w-56 h-[450px] bg-black rounded-[3rem] p-2 shadow-2xl transform -rotate-6 z-10 transition-all duration-500 hover:shadow-[0_35px_60px_-15px_rgba(196,145,138,0.3)] hover:scale-[1.03]">
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
              <div className="relative w-56 h-[450px] bg-black rounded-[3rem] p-2 shadow-2xl transform rotate-6 -ml-20 z-20 transition-all duration-500 hover:shadow-[0_35px_60px_-15px_rgba(196,145,138,0.3)] hover:scale-[1.03]">
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
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 scroll-hidden ${statsVisible ? 'scroll-visible' : ''}`}
        >
          {[
            { value: '500+', label: '누적 리뷰' },
            { value: '4.9', label: '평균 평점' },
            { value: '98%', label: '재방문율' },
            { value: '100%', label: '만족 보장' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/20 hover:border-primary-light/40 stagger-${index + 1}`}
            >
              <div className="text-3xl md:text-4xl font-black text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Review
