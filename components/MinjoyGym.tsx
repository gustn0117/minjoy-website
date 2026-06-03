'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiTarget, FiTrendingUp, FiAward, FiHeart, FiActivity, FiStar, FiUsers, FiPercent, FiVideo, FiLock, FiZap } from 'react-icons/fi'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface GymProgram {
  id: string
  title: string
  description: string
  icon: string
  image?: string
  order: number
}

interface GymTarget {
  id: string
  title: string
  description: string
  order: number
}

// 아이콘 매핑
const iconMap: Record<string, React.ReactNode> = {
  FiTarget: <FiTarget size={40} />,
  FiTrendingUp: <FiTrendingUp size={40} />,
  FiAward: <FiAward size={40} />,
  FiHeart: <FiHeart size={40} />,
  FiActivity: <FiActivity size={40} />,
  FiStar: <FiStar size={40} />,
  FiVideo: <FiVideo size={40} />,
  FiLock: <FiLock size={40} />,
  FiZap: <FiZap size={40} />,
}

// 프로그램별 아이콘 매핑
const programIcons = [FiActivity, FiStar, FiHeart, FiVideo, FiLock, FiZap]

const MinjoyGym = () => {
  const [programs, setPrograms] = useState<GymProgram[]>([])
  const [targets, setTargets] = useState<GymTarget[]>([])

  // Scroll animation refs
  const heroSection = useScrollAnimation()
  const programSection = useScrollAnimation()
  const spaceSection = useScrollAnimation()
  const targetSection = useScrollAnimation()
  const statsSection = useScrollAnimation()
  const ctaSection = useScrollAnimation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, targetsRes] = await Promise.all([
          fetch('/api/content?type=gym-programs&activeOnly=true'),
          fetch('/api/content?type=gym-targets&activeOnly=true'),
        ])

        if (programsRes.ok) {
          const data = await programsRes.json()
          setPrograms(data.items || [])
        }

        if (targetsRes.ok) {
          const data = await targetsRes.json()
          setTargets(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch gym data:', error)
      }
    }

    fetchData()
  }, [])

  // 기본값
  const programList = programs.length > 0 ? programs : [
    { id: '1', icon: 'FiActivity', title: 'AI 체형평가 기반 맞춤 운동', description: 'AI 체형분석을 통해 자세와 체형을 정확하게 분석하고, 내 몸에 꼭 맞는 1:1 맞춤 운동을 제공합니다.', order: 0 },
    { id: '2', icon: 'FiStar', title: '민죠이짐&케어 (운동 + 케어)', description: '운동과 바디케어를 함께 진행하여 다이어트와 근력 향상 효과를 극대화합니다.', order: 1 },
    { id: '3', icon: 'FiHeart', title: '소변 테스트 기반 맞춤 식단관리', description: '소변 테스트 결과를 바탕으로 현재 몸 상태를 확인하고, 1:1 맞춤 식단 가이드를 제공합니다.', order: 2 },
    { id: '4', icon: 'FiVideo', title: 'PT 영상 기록 제공', description: '수업 내용을 영상으로 기록해 드려 센터 밖에서도 복습할 수 있도록 도와드립니다.', order: 3 },
    { id: '5', icon: 'FiLock', title: '여성전용 프라이빗 공간', description: '여성 회원만을 위한 편안하고 프라이빗한 공간에서 눈치 보지 않고 운동에 집중할 수 있습니다.', order: 4 },
    { id: '6', icon: 'FiZap', title: '파워플레이트 VIP 프로그램', description: '파워플레이트를 활용하여 일반 운동 대비 근력 향상과 체지방 감량 효과를 극대화합니다.', order: 5 },
  ]

  const targetList = targets.length > 0 ? targets : [
    { id: '1', title: '이전 PT 경험 불만족', description: '전문성과 체계적인 회원 관리로 확실한 차이를 경험하세요', order: 0 },
    { id: '2', title: '확실한 변화 원하시는 분', description: '단기간에 눈에 보이는 결과를 약속드립니다', order: 1 },
    { id: '3', title: '체계적인 관리가 필요한 분', description: '맞춤 식단과 운동 프로그램으로 목표 달성을 도와드립니다', order: 2 },
    { id: '4', title: '여성 전용 환경을 원하시는 분', description: '안전하고 편안한 여성 전용 공간에서 운동하세요', order: 3 },
  ]

  return (
    <section id="minjoy-gym" className="section-padding bg-white">
      <div className="container-custom">
        {/* Hero Banner */}
        <div
          ref={heroSection.ref}
          className={`mb-16 rounded-xl overflow-hidden relative scroll-hidden ${heroSection.isVisible ? 'scroll-visible' : ''}`}
        >
          {/* Background photo + overlay */}
          <div className="absolute inset-0">
            <Image src="/0326/민죠이짐.jpg" alt="민죠이짐" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/80 via-brown-dark/60 to-primary/30"></div>
          </div>

          <div className="px-8 md:px-12 py-16 md:py-20 relative z-10">
            <div className="max-w-2xl text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-primary-light mb-3">GYM</p>
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                민죠이짐
              </h2>
              <p className="text-xl md:text-2xl font-medium text-white/90">
                여성 전용 PT 샵
              </p>
              <p className="text-lg text-white/70 mt-3">
                다이어트 · 힙업 · 바디프로필 · 통증케어
              </p>
              <a href="/gym" className="inline-flex items-center gap-2 mt-6 text-white/90 hover:text-white font-medium transition-colors">
                자세히 보기 →
              </a>
            </div>
          </div>

          {/* Decorative large icon on right side */}
          <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 opacity-10">
            <FiActivity size={160} className="text-white" />
          </div>
        </div>

        {/* Programs */}
        <div
          ref={programSection.ref}
          className={`mb-20 scroll-hidden ${programSection.isVisible ? 'scroll-visible' : ''}`}
        >
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-2">WHY MINJOY GYM</p>
            <h3 className="text-3xl font-bold text-gray-900 section-accent">민죠이짐만의 차별화된 시스템</h3>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              운동, 식단, 케어, 기록까지. 건강과 라인을 완성하는 여성전용 프리미엄 PT 시스템.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programList.map((program, index) => {
              const IconComponent = programIcons[index] || FiTarget
              return (
                <div
                  key={program.id}
                  className={`bg-white rounded-lg overflow-hidden border border-gray-200 card-hover group stagger-${(index % 6) + 1}`}
                >
                  {/* Image Area */}
                  <div className="h-48 relative overflow-hidden">
                    {program.image ? (
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                        <div className="text-center text-primary/40">
                          <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                            <IconComponent size={48} />
                          </div>
                          <div className="text-xs text-primary/40">이미지 준비중</div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-primary">
                        {iconMap[program.icon] || <FiTarget size={24} />}
                      </div>
                      <h4 className="font-bold text-lg text-gray-900">{program.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{program.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Facility Preview */}
        <div
          ref={spaceSection.ref}
          className={`mb-20 scroll-hidden ${spaceSection.isVisible ? 'scroll-visible' : ''}`}
        >
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-2">GYM SPACE</p>
            <h3 className="text-3xl font-bold text-gray-900 section-accent">프리미엄 트레이닝 공간</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <div
                key={n}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 group stagger-${(i % 6) + 1}`}
              >
                <Image
                  src={`/0603/gym${n}.jpg`}
                  alt={`민죠이짐 시설 ${n}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div
          ref={targetSection.ref}
          className={`mb-20 scroll-hidden ${targetSection.isVisible ? 'scroll-visible' : ''}`}
        >
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-medium mb-2">FOR YOU</p>
            <h3 className="text-3xl font-bold text-gray-900 section-accent">
              민죠이짐은 이런 분들께 추천합니다
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetList.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white p-6 rounded-lg border border-gray-200 border-l-4 border-l-primary hover:bg-primary-50 transition-all duration-300 card-hover stagger-${index + 1}`}
              >
                {/* Number badge */}
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4 text-sm">
                  {index + 1}
                </div>
                <h4 className="text-lg font-bold mb-2 text-primary">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsSection.ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 scroll-hidden ${statsSection.isVisible ? 'scroll-visible' : ''}`}
        >
          {[
            { value: '500+', label: '누적 회원', Icon: FiUsers },
            { value: '98%', label: '목표 달성률', Icon: FiTarget },
            { value: '5년+', label: '전문 경력', Icon: FiStar },
            { value: '100%', label: '맞춤 프로그램', Icon: FiPercent },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg border border-gray-200 text-center card-hover stagger-${index + 1}`}
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.Icon className="text-primary" size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1 transition-transform duration-300 hover:scale-110 cursor-default">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          ref={ctaSection.ref}
          className={`bg-primary rounded-xl p-8 md:p-12 text-center text-white relative overflow-hidden scroll-hidden ${ctaSection.isVisible ? 'scroll-visible' : ''}`}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <FiAward className="text-white" size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              비포&애프터 사진으로 증명하는 확실한 결과
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              민죠이짐에서 당신의 변화를 시작하세요.<br />
              전문 트레이너가 목표 달성까지 함께합니다.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-dark px-8 py-3 rounded-md font-bold btn-premium hover:bg-gray-50 transition-colors"
            >
              무료 상담 신청하기
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MinjoyGym
