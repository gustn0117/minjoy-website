'use client'

const Gallery = () => {
  return (
    <section id="gallery" className="section-padding bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">변화 갤러리</span>
          </h2>
          <p className="text-xl text-gray-600">
            민죠이에서 이루어낸 놀라운 변화들
          </p>
        </div>

        {/* Before & After Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-64 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📸</div>
                  <p className="text-gray-600 font-medium">Before & After</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">기간</span>
                  <span className="font-semibold">3개월</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">체중 변화</span>
                  <span className="font-semibold text-primary">-8kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">체지방률</span>
                  <span className="font-semibold text-primary">-5%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <h3 className="text-3xl font-bold text-center mb-8">
            회원님들의 평균 변화
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">-6.5kg</div>
              <div className="text-gray-600">평균 체중 감량</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">-4.2%</div>
              <div className="text-gray-600">평균 체지방률 감소</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+2.1kg</div>
              <div className="text-gray-600">평균 근육량 증가</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3개월</div>
              <div className="text-gray-600">평균 목표 달성 기간</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
