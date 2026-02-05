'use client'

import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '상담 신청 중 오류가 발생했습니다.')
      }

      setSubmitStatus('success')
      setFormData({ name: '', phone: '', service: '', message: '' })

      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="section-padding bg-ivory">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">문의하기</span>
          </h2>
          <p className="text-xl text-brown-dark">
            궁금하신 점이 있으시면 언제든 연락주세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-brown-dark">연락처 정보</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-light/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiPhone className="text-primary-dark" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-brown-dark">전화</h4>
                  <p className="text-brown-light">전화 문의 가능</p>
                  <p className="text-brown-light">카카오톡 상담 가능</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-light/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiMail className="text-primary-dark" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-brown-dark">이메일</h4>
                  <p className="text-brown-light">이메일 문의 가능</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-light/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-primary-dark" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-brown-dark">위치</h4>
                  <p className="text-brown-light">민죠이짐: [주소]</p>
                  <p className="text-brown-light">민죠이케어: [주소] (같은 건물 내)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-light/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiClock className="text-primary-dark" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-brown-dark">운영시간</h4>
                  <p className="text-brown-light">평일: 06:00 - 22:00</p>
                  <p className="text-brown-light">주말: 08:00 - 20:00</p>
                  <p className="text-brown-light text-sm mt-1">※ 예약제 운영</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-ivory-dark rounded-2xl h-64 flex items-center justify-center border border-primary-light/20">
              <div className="text-center">
                <FiMapPin className="mx-auto mb-2 text-brown-light" size={40} />
                <p className="text-brown-light">지도 위치</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gradient-to-br from-primary-light/30 to-ivory-dark rounded-2xl p-8 border border-primary-light/20">
              <h3 className="text-3xl font-bold mb-6 text-brown-dark">상담 신청</h3>

              {/* 성공 메시지 */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center space-x-3">
                  <FiCheck className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-green-800">상담 신청이 완료되었습니다!</p>
                    <p className="text-green-700 text-sm">24시간 내에 연락드리겠습니다.</p>
                  </div>
                </div>
              )}

              {/* 에러 메시지 */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center space-x-3">
                  <FiAlertCircle className="text-red-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-red-800">오류가 발생했습니다</p>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-brown-dark">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="이름을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-brown-dark">연락처 *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="연락처를 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-brown-dark">관심 서비스 *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">선택해주세요</option>
                    <option value="gym">민죠이짐 (PT)</option>
                    <option value="care">민죠이케어 (체형관리)</option>
                    <option value="both">민죠이짐 + 민죠이케어</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-brown-dark">문의사항</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="궁금하신 점을 자유롭게 작성해주세요"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

              <p className="text-sm text-brown-light mt-4 text-center">
                상담 신청 후 24시간 내에 연락드립니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
