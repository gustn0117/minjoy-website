'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiX, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '상담 신청 중 오류가 발생했습니다.')
      }

      setSubmitStatus('success')
      setFormData({ name: '', phone: '', service: '', message: '' })
      setTimeout(() => {
        setSubmitStatus('idle')
        setShowModal(false)
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <section id="home" className="relative h-screen flex items-center justify-center bg-brown-dark overflow-hidden">
        {/* Background Photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/메인화면.jpg"
            alt="민죠이"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/80 via-brown-dark/70 to-brown-dark/85"></div>

        {/* Warm accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[120px]"></div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center text-white">
          <p className={`text-sm md:text-base uppercase tracking-[0.3em] text-primary-light mb-6 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Premium Total Care Center
          </p>

          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.35] transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            운동만 하는 PT는 끝<br />
            <span className="text-primary-light">
              운동+순환+라인관리로<br />바디라인을 설계합니다
            </span>
          </h1>

          <p className={`text-lg md:text-xl mb-10 text-white/80 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            1회 체험만으로 변화 시작 프로그램
          </p>

          <div className={`transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white px-12 py-4 rounded-md font-semibold text-lg btn-premium hover:bg-primary-dark transition-all duration-300"
            >
              무료 체형상담 예약
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
            <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 예약 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <FiX size={20} className="text-gray-500" />
            </button>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">무료 체형상담 예약</h3>
              <p className="text-gray-500 mb-6 text-sm">상담 신청 후 24시간 내에 연락드립니다</p>

              {/* 성공 메시지 */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center space-x-3">
                  <FiCheck className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-green-800">상담 신청이 완료되었습니다!</p>
                    <p className="text-green-700 text-sm">24시간 내에 연락드리겠습니다.</p>
                  </div>
                </div>
              )}

              {/* 에러 메시지 */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center space-x-3">
                  <FiAlertCircle className="text-red-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-red-800">오류가 발생했습니다</p>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-300"
                    placeholder="이름을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">연락처 *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-300"
                    placeholder="연락처를 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">관심 서비스 *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-300"
                  >
                    <option value="">선택해주세요</option>
                    <option value="gym">PT (다이어트/힙업/바디프로필)</option>
                    <option value="care">체형관리 (순환/탄력/스파)</option>
                    <option value="both">PT + 체형관리</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">문의사항</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-300"
                    placeholder="궁금하신 점을 자유롭게 작성해주세요"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold btn-premium hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>신청 중...</span>
                    </>
                  ) : (
                    <>
                      <span>상담 신청하기</span>
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Hero
