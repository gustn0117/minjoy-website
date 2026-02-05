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
    <section id="facilities" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">시설 소개</span>
          </h2>
          <p className="text-xl text-gray-600">
            최고의 시설에서 최상의 케어를 받으세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gym Facilities */}
          <div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🏋️‍♀️</div>
                  <h3 className="text-2xl font-bold">민죠이짐 시설</h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-6">운동 시설</h4>
                <ul className="space-y-3">
                  {gymFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Care Facilities */}
          <div>
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">💆‍♀️</div>
                  <h3 className="text-2xl font-bold">민죠이케어 시설</h3>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-6">관리 시설</h4>
                <ul className="space-y-3">
                  {careFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            운동과 관리, 한 건물에서 모두 가능합니다
          </h3>
          <p className="text-gray-600">
            민죠이짐과 민죠이케어는 같은 건물 내 위치하여<br />
            이동 없이 편리하게 운동과 관리를 받으실 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Facilities
