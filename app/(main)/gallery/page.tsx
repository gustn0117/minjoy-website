import { Metadata } from 'next'
import Gallery from '@/components/Gallery'

export const metadata: Metadata = {
  title: '변화 갤러리 | 민죠이짐 & 민죠이케어',
  description: '민죠이에서 이루어낸 놀라운 변화들. 비포&애프터 사진으로 증명하는 확실한 결과.',
}

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <Gallery />
    </main>
  )
}
