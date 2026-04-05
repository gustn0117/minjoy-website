'use client'

import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const galleryImages = [
  { id: '1', src: '/images/gallery/비포에프터.jpg', alt: '비포에프터 1' },
  { id: '2', src: '/images/gallery/비포에프터2.jpg', alt: '비포에프터 2' },
  { id: '3', src: '/images/gallery/비포에프터3.jpg', alt: '비포에프터 3' },
  { id: '4', src: '/images/gallery/비포에프터4.jpg', alt: '비포에프터 4' },
  { id: '5', src: '/images/gallery/비포에프터5.jpg', alt: '비포에프터 5' },
]

const Gallery = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div
          ref={sectionRef}
          className={`text-center mb-16 scroll-hidden ${sectionVisible ? 'scroll-visible' : ''}`}
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Before & After</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-[1.35] section-accent">
            비포 & 애프터
          </h2>
          <p className="text-xl text-gray-600 mt-6">
            민죠이에서 이루어낸 놀라운 변화들
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-hidden ${gridVisible ? 'scroll-visible' : ''}`}
        >
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 stagger-${index + 1}`}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
