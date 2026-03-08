import Hero from '@/components/Hero'
import Review from '@/components/Review'
import About from '@/components/About'
import Facilities from '@/components/Facilities'
import PhotoShowcase from '@/components/PhotoShowcase'

// 메인 페이지 컴포넌트
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PhotoShowcase />
      <Facilities />
      <Review />
    </main>
  )
}
