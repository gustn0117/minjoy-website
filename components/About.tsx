'use client'

import { FiCheckCircle } from 'react-icons/fi'

const About = () => {
  const features = [
    '체형별 맞춤 운동 프로그램',
    '전문 트레이너의 1:1 관리',
    '첨단 체형관리 장비',
    '확실한 비포&애프터 결과',
    '운동 + 관리 토탈 솔루션',
    '여성 전용 안전한 환경',
  ]

  return (
    <section id="about" className="section-padding bg-ivory-dark">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">민죠이</span>만의 특별함
          </h2>
          <p className="text-xl text-brown-dark">
            운동과 관리를 동시에, 확실한 변화를 약속합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-brown-dark">
              왜 민죠이를<br />
              선택해야 할까요?
            </h3>
            <p className="text-brown-light mb-8 leading-relaxed">
              민죠이짐은 여성 전용 PT샵으로 다이어트, 힙업, 바디프로필, 통증케어 등
              다양한 운동 목적의 회원님들에게 단기간에 확실한 변화를 제공합니다.
              <br /><br />
              이제 민죠이케어를 통해 "누워서 다이어트하는 힐링케어"까지 함께 경험하세요.
              맞춤 진단 + 운동 + 식단 + 기기 관리 + 수기 관리 + 멘탈 관리까지 포함한
              종합 관리로 짧은 시간 목표 달성이 가능합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FiCheckCircle className="text-primary-dark mt-1 flex-shrink-0" size={20} />
                  <span className="text-brown-dark">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-primary-light/20">
              <div className="text-4xl font-bold text-primary-dark mb-2">-1kg</div>
              <div className="text-sm text-brown-light">1회 체험 평균</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-primary-light/20">
              <div className="text-4xl font-bold text-gym mb-2">+1kg</div>
              <div className="text-sm text-brown-light">근력 증가</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-primary-light/20">
              <div className="text-4xl font-bold text-primary-dark mb-2">-3%</div>
              <div className="text-sm text-brown-light">체지방률 감소</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gold/30">
              <div className="text-4xl font-bold text-gold mb-2">100%</div>
              <div className="text-sm text-brown-light">맞춤 관리</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
