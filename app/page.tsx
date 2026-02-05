import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import MinjoyGym from '@/components/MinjoyGym'
import MinjoyCare from '@/components/MinjoyCare'
import Facilities from '@/components/Facilities'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <MinjoyGym />
      <MinjoyCare />
      <Facilities />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
