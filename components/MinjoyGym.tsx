'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiTarget, FiTrendingUp, FiAward, FiHeart, FiActivity, FiStar, FiUsers, FiPercent } from 'react-icons/fi'

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
}

// 프로그램별 아이콘 매핑
const programIcons = [FiTarget, FiTrendingUp, FiAward, FiHeart]

const MinjoyGym = () => {
  const [programs, setPrograms] = useState<GymProgram[]>([])
  const [targets, setTargets] = useState<GymTarget[]>([])

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
    { id: '1', icon: 'FiTarget', title: '다이어트 프로그램', description: '체계적인 식단 관리와 운동으로 건강한 다이어트를 실현합니다.', order: 0 },
    { id: '2', icon: 'FiTrendingUp', title: '힙업 & 라인 교정', description: '탄력있는 힙라인과 균형잡힌 바디라인을 만들어드립니다.', order: 1 },
    { id: '3', icon: 'FiAward', title: '바디프로필', description: '대회 준비부터 촬영 당일까지 완벽하게 준비해드립니다.', order: 2 },
    { id: '4', icon: 'FiHeart', title: '통증 케어', description: '근골격계 통증 개선과 자세 교정으로 건강한 몸을 만듭니다.', order: 3 },
  ]

  const targetList = targets.length > 0 ? targets : [
    { id: '1', title: '이전 PT 경험 불만족', description: '전문성과 체계적인 회원 관리로 확실한 차이를 경험하세요', order: 0 },
    { id: '2', title: '확실한 변화 원하시는 분', description: '단기간에 눈에 보이는 결과를 약속드립니다', order: 1 },
    { id: '3', title: '체계적인 관리가 필요한 분', description: '맞춤 식단과 운동 프로그램으로 목표 달성을 도와드립니다', order: 2 },
    { id: '4', title: '여성 전용 환경을 원하시는 분', description: '안전하고 편안한 여성 전용 공간에서 운동하세요', order: 3 },
  ]

  return (
    <section id="minjoy-gym" className="section-padding bg-ivory">
      <div className="container-custom">
        {/* Hero Banner */}
        <div className="relative mb-16 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-gym-dark via-gym to-gym-light h-64 md:h-80">
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-6xl font-black mb-4">
                    민죠이짐
                  </h2>
                  <p className="text-xl md:text-2xl font-medium opacity-90">
                    여성 전용 PT 샵
                  </p>
                  <p className="text-lg opacity-80 mt-2">
                    확실한 변화를 위한 전문 트레이닝
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 text-[200px] font-black opacity-5 select-none">
              GYM
            </div>
          </div>
        </div>

        {/* Programs - Rich Card Design */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text-gym">프로그램 소개</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programList.map((program, index) => {
              const IconComponent = programIcons[index] || FiTarget
              return (
                <div
                  key={program.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gym-light/20"
                >
                  {/* Image Area */}
                  <div className="h-48 bg-gradient-to-br from-gym to-gym-dark relative overflow-hidden">
                    {program.image ? (
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent size={48} />
                          </div>
                          <div className="text-xs opacity-60">이미지 준비중</div>
                        </div>
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 left-4 w-20 h-20 border border-white rounded-full"></div>
                          <div className="absolute bottom-4 right-4 w-16 h-16 border border-white rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-gym">
                        {iconMap[program.icon] || <FiTarget size={24} />}
                      </div>
                      <h4 className="font-bold text-lg text-brown-dark">{program.title}</h4>
                    </div>
                    <p className="text-sm text-brown-light leading-relaxed">{program.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Target Audience - Rich Design */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center text-brown-dark">
            민죠이짐은 이런 분들께 추천합니다
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetList.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gym-light/20 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gym/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-gym/10 transition-colors"></div>

                {/* Number badge */}
                <div className="w-10 h-10 bg-gradient-to-br from-gym to-gym-dark text-white rounded-full flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>

                <h4 className="text-lg font-bold mb-2 text-gym">{item.title}</h4>
                <p className="text-sm text-brown-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: '500+', label: '누적 회원', Icon: FiUsers },
            { value: '98%', label: '목표 달성률', Icon: FiTarget },
            { value: '5년+', label: '전문 경력', Icon: FiStar },
            { value: '100%', label: '맞춤 프로그램', Icon: FiPercent },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gym-light/20 text-center group hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gym/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.Icon className="text-gym" size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gym mb-1">{stat.value}</div>
              <div className="text-sm text-brown-light">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-gym-dark via-gym to-gym-light rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
              className="inline-block bg-white text-gym-dark px-8 py-4 rounded-full font-bold hover:bg-ivory transition-colors shadow-lg"
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
