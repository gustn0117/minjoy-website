'use client'

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-amber-800 to-primary-dark">
      {/* Overlay with warm tone */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Decorative elements - chandelier sparkle effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-gold rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-gold-light rounded-full animate-pulse delay-100 opacity-40"></div>
        <div className="absolute top-40 left-1/2 w-2 h-2 bg-gold rounded-full animate-pulse delay-200 opacity-50"></div>
        <div className="absolute top-28 right-1/4 w-1 h-1 bg-gold-light rounded-full animate-pulse delay-300 opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          확실한 변화,<br />
          <span className="bg-gradient-to-r from-gold-light to-primary-light bg-clip-text text-transparent">
            민죠이와 함께
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-ivory">
          운동과 관리를 한 곳에서!<br />
          단기간에 확실한 변화를 경험하세요
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-gradient-to-r from-primary-dark to-primary text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
            상담 신청하기
          </a>
          <a href="#about" className="border-2 border-ivory text-ivory px-8 py-3 rounded-full font-medium hover:bg-ivory hover:text-brown-dark transition-all duration-300">
            더 알아보기
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-gold/20">
            <div className="text-4xl font-bold mb-2 text-gold-light">1,000+</div>
            <div className="text-sm text-ivory">누적 회원수</div>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-gold/20">
            <div className="text-4xl font-bold mb-2 text-gold-light">95%</div>
            <div className="text-sm text-ivory">만족도</div>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-gold/20">
            <div className="text-4xl font-bold mb-2 text-gold-light">1:1</div>
            <div className="text-sm text-ivory">맞춤 관리</div>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-gold/20">
            <div className="text-4xl font-bold mb-2 text-gold-light">100%</div>
            <div className="text-sm text-ivory">여성 전문가</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-ivory rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-ivory rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
