'use client'

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          확실한 변화,<br />
          <span className="gradient-text bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">
            민죠이와 함께
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          운동과 관리를 한 곳에서!<br />
          단기간에 확실한 변화를 경험하세요
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="btn-primary">
            상담 신청하기
          </a>
          <a href="#about" className="btn-secondary bg-white/20 border-white text-white hover:bg-white hover:text-primary">
            더 알아보기
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="text-4xl font-bold mb-2">1,000+</div>
            <div className="text-sm text-gray-200">누적 회원수</div>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="text-4xl font-bold mb-2">95%</div>
            <div className="text-sm text-gray-200">만족도</div>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="text-4xl font-bold mb-2">1:1</div>
            <div className="text-sm text-gray-200">맞춤 관리</div>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-sm text-gray-200">여성 전문가</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
