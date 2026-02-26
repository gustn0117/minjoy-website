'use client'

import { useState, useEffect } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck, FiAlertCircle, FiMessageSquare, FiInstagram } from 'react-icons/fi'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ContactInfo {
  id: string
  type: string
  label: string
  value: string
  icon?: string
  order: number
}

// 아이콘 매핑
const iconMap: Record<string, React.ReactNode> = {
  FiPhone: <FiPhone className="text-white" size={20} />,
  FiMail: <FiMail className="text-white" size={20} />,
  FiMapPin: <FiMapPin className="text-white" size={20} />,
  FiClock: <FiClock className="text-white" size={20} />,
  FiMessageSquare: <FiMessageSquare className="text-white" size={20} />,
  FiInstagram: <FiInstagram className="text-white" size={20} />,
}

const Contact = () => {
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation()
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/content?type=contact-info&activeOnly=true')
        if (response.ok) {
          const data = await response.json()
          setContactInfos(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error)
      }
    }

    fetchData()
  }, [])

  // 기본값
  const defaultContacts = [
    { id: '1', type: 'phone', label: '전화', value: '전화 문의 가능\n카카오톡 상담 가능', icon: 'FiPhone', order: 0 },
    { id: '2', type: 'email', label: '이메일', value: '이메일 문의 가능', icon: 'FiMail', order: 1 },
    { id: '3', type: 'address', label: '위치', value: '민죠이짐: [주소]\n민죠이케어: [주소] (같은 건물 내)', icon: 'FiMapPin', order: 2 },
    { id: '4', type: 'hours', label: '운영시간', value: '평일: 06:00 - 22:00\n주말: 08:00 - 20:00\n※ 예약제 운영', icon: 'FiClock', order: 3 },
  ]

  const contacts = contactInfos.length > 0 ? contactInfos : defaultContacts

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
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div
          ref={sectionRef}
          className={`text-center mb-16 scroll-hidden ${sectionVisible ? 'scroll-visible' : ''}`}
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 section-accent">
            문의하기
          </h2>
          <p className="text-xl text-gray-600 mt-6">
            궁금하신 점이 있으시면 언제든 연락주세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            ref={infoRef}
            className={`scroll-hidden ${infoVisible ? 'scroll-visible' : ''}`}
          >
            <h3 className="text-3xl font-bold mb-8 text-gray-900">연락처 정보</h3>

            <div className="space-y-6 mb-8">
              {contacts.map((contact, index) => (
                <div key={contact.id} className={`flex items-start space-x-4 stagger-${index + 1}`}>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    {contact.icon ? iconMap[contact.icon] || <FiPhone className="text-white" size={20} /> : <FiPhone className="text-white" size={20} />}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">{contact.label}</h4>
                    {contact.value.split('\n').map((line, idx) => (
                      <p key={idx} className="text-gray-500">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-primary-50 to-ivory rounded-xl h-64 flex items-center justify-center border border-primary/10">
              <div className="text-center">
                <FiMapPin className="mx-auto mb-2 text-primary/40" size={40} />
                <p className="text-primary/50 font-medium">지도 위치</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className={`scroll-hidden ${formVisible ? 'scroll-visible' : ''}`}
          >
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">상담 신청</h3>

              {/* 성공 메시지 */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl shadow-sm flex items-center space-x-3">
                  <FiCheck className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-green-800">상담 신청이 완료되었습니다!</p>
                    <p className="text-green-700 text-sm">24시간 내에 연락드리겠습니다.</p>
                  </div>
                </div>
              )}

              {/* 에러 메시지 */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl shadow-sm flex items-center space-x-3">
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-md focus:shadow-primary/10 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-300"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-md focus:shadow-primary/10 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-300"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-md focus:shadow-primary/10 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-300"
                  >
                    <option value="">선택해주세요</option>
                    <option value="gym">민죠이짐 (PT)</option>
                    <option value="care">민죠이케어 (체형관리)</option>
                    <option value="both">민죠이짐 + 민죠이케어</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">문의사항</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-md focus:shadow-primary/10 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-300"
                    placeholder="궁금하신 점을 자유롭게 작성해주세요"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary btn-premium flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform duration-300"
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

              <p className="text-sm text-gray-500 mt-4 text-center">
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
