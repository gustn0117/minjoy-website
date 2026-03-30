'use client'

import { FaInstagram } from 'react-icons/fa'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const Instagram = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div
          ref={sectionRef}
          className={`text-center scroll-hidden ${sectionVisible ? 'scroll-visible' : ''}`}
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Instagram</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 section-accent">
            민죠이 인스타그램
          </h2>
          <p className="text-xl text-gray-600 mt-6 mb-10">
            더 많은 후기와 일상을 확인하세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://instagram.com/min.joy___gym"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <FaInstagram size={24} />
              @min.joy___gym
            </a>
            <a
              href="https://instagram.com/min.joy___"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-pink-400 hover:text-pink-500 hover:scale-105 transition-all duration-300"
            >
              <FaInstagram size={24} />
              @min.joy___
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Instagram
