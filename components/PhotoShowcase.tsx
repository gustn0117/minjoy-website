'use client'

import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const photos = [
  { src: '/images/care-rooms.jpg', alt: '케어룸 복도', label: 'CARE ROOMS' },
  { src: '/images/care-room-1.jpg', alt: '관리실', label: 'TREATMENT' },
  { src: '/images/spa-care.jpg', alt: '스파 케어', label: 'SPA CARE' },
  { src: '/images/body-analyzer.jpg', alt: '체성분 분석', label: 'ANALYSIS' },
  { src: '/images/private-room.jpg', alt: '프라이빗 룸', label: 'PRIVATE' },
  { src: '/images/consultation-2.jpg', alt: '상담실', label: 'CONSULTING' },
]

const PhotoShowcase = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  return (
    <section className="py-20 bg-ivory overflow-hidden">
      <div className="container-custom">
        <div
          ref={sectionRef}
          className={`text-center mb-14 scroll-hidden ${sectionVisible ? 'scroll-visible' : ''}`}
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Space</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 section-accent">
            민죠이 공간
          </h2>
          <p className="text-xl text-gray-600 mt-6">
            프리미엄 환경에서 최상의 케어를 경험하세요
          </p>
        </div>

        {/* Masonry-style Photo Grid */}
        <div
          ref={gridRef}
          className={`scroll-hidden ${gridVisible ? 'scroll-visible' : ''}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl cursor-pointer stagger-${index + 1} ${
                  index === 0 || index === 5 ? 'row-span-1 md:row-span-2 h-64 md:h-full' : 'h-64'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">{photo.label}</span>
                  <p className="text-white/80 text-sm mt-1">{photo.alt}</p>
                </div>
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhotoShowcase
