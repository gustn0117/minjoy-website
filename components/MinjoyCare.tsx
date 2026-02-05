'use client'

import { FiZap, FiDroplet, FiStar } from 'react-icons/fi'

const MinjoyCare = () => {
  const services = [
    {
      icon: <FiDroplet size={40} />,
      title: '순환 관리',
      description: '림프 순환을 촉진하여 부기를 제거하고 체내 노폐물을 배출합니다.',
      features: ['림프 드레나쥬', '부기 제거', '독소 배출', '혈액 순환 개선'],
    },
    {
      icon: <FiZap size={40} />,
      title: '탄력 관리',
      description: '피부와 근육의 탄력을 높여 처짐 없는 탄탄한 바디라인을 만듭니다.',
      features: ['근육 강화', '피부 탄력', '셀룰라이트 개선', '라인 정리'],
    },
    {
      icon: <FiStar size={40} />,
      title: '스파 관리',
      description: '고급 힐링 케어로 심신의 안정과 함께 건강한 아름다움을 선사합니다.',
      features: ['전신 이완', '스트레스 해소', '피로 회복', '힐링 케어'],
    },
  ]

  return (
    <section id="minjoy-care" className="section-padding bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">민죠이케어</span>
          </h2>
          <p className="text-xl text-gray-600">
            누워서 다이어트하는 힐링케어 | 남녀 모두 이용 가능
          </p>
        </div>

        {/* Main Message */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-16 text-center">
          <h3 className="text-3xl font-bold mb-4">
            운동과 시대만으로는 부족합니다
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            다이어트도 <span className="text-primary font-bold">'지름길'</span>이 분명 있습니다
          </p>
          <div className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full">
            <p className="text-lg font-semibold">
              맞춤진단 + 운동 + 식단 + 기기관리 + 수기관리 + 멘탈관리
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            짧은 시간 목표 달성이 가능합니다
          </h3>
          <p className="text-xl mb-8 opacity-90">
            종합 관리로 확실한 효과를 경험하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="font-semibold">1회 체험 -1KG</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="font-semibold">근력 +1KG 증가</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="font-semibold">체지방률 -3% 감소</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MinjoyCare
