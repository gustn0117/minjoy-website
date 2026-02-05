'use client'

import { FiTarget, FiTrendingUp, FiAward, FiHeart } from 'react-icons/fi'

const MinjoyGym = () => {
  const programs = [
    {
      icon: <FiTarget size={40} />,
      title: '다이어트 프로그램',
      description: '체계적인 식단 관리와 운동으로 건강한 다이어트를 실현합니다.',
    },
    {
      icon: <FiTrendingUp size={40} />,
      title: '힙업 & 라인 교정',
      description: '탄력있는 힙라인과 균형잡힌 바디라인을 만들어드립니다.',
    },
    {
      icon: <FiAward size={40} />,
      title: '바디프로필',
      description: '대회 준비부터 촬영 당일까지 완벽하게 준비해드립니다.',
    },
    {
      icon: <FiHeart size={40} />,
      title: '통증 케어',
      description: '근골격계 통증 개선과 자세 교정으로 건강한 몸을 만듭니다.',
    },
  ]

  const differentiators = [
    {
      title: '이전 PT 경험 불만족',
      description: '전문성과 체계적인 회원 관리로 확실한 차이를 경험하세요',
    },
    {
      title: '확실한 변화 원하시는 분',
      description: '단기간에 눈에 보이는 결과를 약속드립니다',
    },
  ]

  return (
    <section id="minjoy-gym" className="section-padding bg-ivory">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-gym">민죠이짐</span>
          </h2>
          <p className="text-xl text-brown-dark">
            여성 전용 PT 샵 | 확실한 변화를 위한 전문 트레이닝
          </p>
        </div>

        {/* Programs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gym-light/20"
            >
              <div className="text-gym mb-4">{program.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-brown-dark">{program.title}</h3>
              <p className="text-brown-light">{program.description}</p>
            </div>
          ))}
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gym-light/20">
          <h3 className="text-3xl font-bold mb-8 text-center text-brown-dark">
            민죠이짐은 이런 분들께 추천합니다
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-ivory-dark p-8 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-gym">{item.title}</h4>
                <p className="text-brown-dark">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-gym-dark to-gym text-white px-8 py-4 rounded-full shadow-lg">
            <p className="text-lg font-semibold">
              비포&애프터 사진으로 증명하는 확실한 결과
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MinjoyGym
