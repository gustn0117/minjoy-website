'use client'

const Facilities = () => {
  const gymFeatures = [
    '최신 웨이트 트레이닝 장비',
    '유산소 운동 기구',
    '프리웨이트존',
    '여성 전용 탈의실 및 샤워실',
    '깨끗한 운동 환경',
    '프라이빗 트레이닝룸',
  ]

  const careFeatures = [
    '첨단 체형관리 장비',
    '프리미엄 관리실',
    '편안한 힐링 공간',
    '1인 1실 관리',
    '청결한 위생 관리',
    '아늑한 대기 공간',
  ]

  return (
    <section id="facilities" className="section-padding bg-ivory">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">시설 소개</span>
          </h2>
          <p className="text-xl text-brown-dark">
            최고의 시설에서 최상의 케어를 받으세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gym Facilities */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gym-light/20">
              <div className="h-64 bg-gradient-to-br from-gym-dark to-gym flex items-center justify-center relative">
                {/* Chandelier effect */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-1 bg-gold-light rounded-full animate-pulse"></div>
                </div>
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🏋️‍♀️</div>
                  <h3 className="text-2xl font-bold">민죠이짐 시설</h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-6 text-brown-dark">운동 시설</h4>
                <ul className="space-y-3">
                  {gymFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-gym rounded-full mr-3"></span>
                      <span className="text-brown-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Care Facilities */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-primary-light/20">
              <div className="h-64 bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center relative">
                {/* Chandelier effect */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-1 bg-gold-light rounded-full animate-pulse"></div>
                </div>
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">💆‍♀️</div>
                  <h3 className="text-2xl font-bold">민죠이케어 시설</h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-6 text-brown-dark">관리 시설</h4>
                <ul className="space-y-3">
                  {careFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-brown-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 text-center border border-gold/20 shadow-lg">
          <div className="w-8 h-8 mx-auto mb-4 text-gold">✨</div>
          <h3 className="text-2xl font-bold mb-4 text-brown-dark">
            운동과 관리, 한 건물에서 모두 가능합니다
          </h3>
          <p className="text-brown-light">
            민죠이짐과 민죠이케어는 같은 건물 내 위치하여<br />
            이동 없이 편리하게 운동과 관리를 받으실 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Facilities
