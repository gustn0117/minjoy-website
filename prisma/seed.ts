import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 관리자 계정 생성
  const email = process.env.ADMIN_EMAIL || 'admin@minjoy.com'
  const password = process.env.ADMIN_PASSWORD || 'minjoy2024!'

  const existingAdmin = await prisma.admin.findUnique({ where: { email } })
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.admin.create({
      data: { email, password: hashedPassword, name: '관리자' },
    })
    console.log('관리자 계정 생성:', email)
  } else {
    console.log('관리자 계정 존재:', email)
  }

  // 히어로 콘텐츠
  const existingHero = await prisma.heroContent.findFirst()
  if (!existingHero) {
    await prisma.heroContent.create({
      data: {
        title: '확실한 변화, 민죠이와 함께',
        subtitle: '운동과 관리를 한 곳에서!',
        description: '단기간에 확실한 변화를 경험하세요',
        buttonText1: '상담 신청하기',
        buttonLink1: '/contact',
        buttonText2: '더 알아보기',
        buttonLink2: '/about',
      },
    })
    console.log('히어로 콘텐츠 생성')
  }

  // 히어로 통계
  const existingStats = await prisma.heroStat.findFirst()
  if (!existingStats) {
    await prisma.heroStat.createMany({
      data: [
        { value: '1,000+', label: '누적 회원수', order: 0 },
        { value: '95%', label: '만족도', order: 1 },
        { value: '1:1', label: '맞춤 관리', order: 2 },
        { value: '100%', label: '여성 전문가', order: 3 },
      ],
    })
    console.log('히어로 통계 생성')
  }

  // About 특징
  const existingFeatures = await prisma.aboutFeature.findFirst()
  if (!existingFeatures) {
    await prisma.aboutFeature.createMany({
      data: [
        { title: '체형별 맞춤 운동 프로그램', order: 0 },
        { title: '전문 트레이너의 1:1 관리', order: 1 },
        { title: '첨단 체형관리 장비', order: 2 },
        { title: '확실한 비포&애프터 결과', order: 3 },
        { title: '운동 + 관리 토탈 솔루션', order: 4 },
        { title: '여성 전용 안전한 환경', order: 5 },
      ],
    })
    console.log('About 특징 생성')
  }

  // 민죠이짐 프로그램
  const existingPrograms = await prisma.gymProgram.findFirst()
  if (!existingPrograms) {
    await prisma.gymProgram.createMany({
      data: [
        { title: '다이어트 프로그램', description: '체계적인 식단 관리와 운동으로 건강한 다이어트를 실현합니다.', icon: 'FiTarget', order: 0 },
        { title: '힙업 & 라인 교정', description: '탄력있는 힙라인과 균형잡힌 바디라인을 만들어드립니다.', icon: 'FiTrendingUp', order: 1 },
        { title: '바디프로필', description: '대회 준비부터 촬영 당일까지 완벽하게 준비해드립니다.', icon: 'FiAward', order: 2 },
        { title: '통증 케어', description: '근골격계 통증 개선과 자세 교정으로 건강한 몸을 만듭니다.', icon: 'FiHeart', order: 3 },
      ],
    })
    console.log('민죠이짐 프로그램 생성')
  }

  // 민죠이짐 타겟
  const existingTargets = await prisma.gymTarget.findFirst()
  if (!existingTargets) {
    await prisma.gymTarget.createMany({
      data: [
        { title: '이전 PT 경험 불만족', description: '전문성과 체계적인 회원 관리로 확실한 차이를 경험하세요', order: 0 },
        { title: '확실한 변화 원하시는 분', description: '단기간에 눈에 보이는 결과를 약속드립니다', order: 1 },
      ],
    })
    console.log('민죠이짐 타겟 생성')
  }

  // 민죠이케어 서비스
  const existingServices = await prisma.careService.findFirst()
  if (!existingServices) {
    await prisma.careService.createMany({
      data: [
        { title: '순환 관리', description: '림프 순환을 촉진하여 부기를 제거하고 체내 노폐물을 배출합니다.', icon: 'FiDroplet', features: ['림프 드레나쥬', '부기 제거', '독소 배출', '혈액 순환 개선'], order: 0 },
        { title: '탄력 관리', description: '피부와 근육의 탄력을 높여 처짐 없는 탄탄한 바디라인을 만듭니다.', icon: 'FiZap', features: ['근육 강화', '피부 탄력', '셀룰라이트 개선', '라인 정리'], order: 1 },
        { title: '스파 관리', description: '고급 힐링 케어로 심신의 안정과 함께 건강한 아름다움을 선사합니다.', icon: 'FiStar', features: ['전신 이완', '스트레스 해소', '피로 회복', '힐링 케어'], order: 2 },
      ],
    })
    console.log('민죠이케어 서비스 생성')
  }

  // 시설
  const existingFacilities = await prisma.facility.findFirst()
  if (!existingFacilities) {
    await prisma.facility.createMany({
      data: [
        { type: 'gym', title: '최신 웨이트 트레이닝 장비', order: 0 },
        { type: 'gym', title: '유산소 운동 기구', order: 1 },
        { type: 'gym', title: '프리웨이트존', order: 2 },
        { type: 'gym', title: '여성 전용 탈의실 및 샤워실', order: 3 },
        { type: 'gym', title: '깨끗한 운동 환경', order: 4 },
        { type: 'gym', title: '프라이빗 트레이닝룸', order: 5 },
        { type: 'care', title: '첨단 체형관리 장비', order: 0 },
        { type: 'care', title: '프리미엄 관리실', order: 1 },
        { type: 'care', title: '편안한 힐링 공간', order: 2 },
        { type: 'care', title: '1인 1실 관리', order: 3 },
        { type: 'care', title: '청결한 위생 관리', order: 4 },
        { type: 'care', title: '아늑한 대기 공간', order: 5 },
      ],
    })
    console.log('시설 정보 생성')
  }

  // 갤러리
  const existingGallery = await prisma.galleryItem.findFirst()
  if (!existingGallery) {
    await prisma.galleryItem.createMany({
      data: [
        { period: '3개월', weightChange: '-8kg', fatChange: '-5%', order: 0 },
        { period: '3개월', weightChange: '-6kg', fatChange: '-4%', order: 1 },
        { period: '2개월', weightChange: '-5kg', fatChange: '-3%', order: 2 },
        { period: '4개월', weightChange: '-10kg', fatChange: '-6%', order: 3 },
        { period: '3개월', weightChange: '-7kg', fatChange: '-5%', order: 4 },
        { period: '2개월', weightChange: '-4kg', fatChange: '-3%', order: 5 },
      ],
    })
    console.log('갤러리 아이템 생성')
  }

  // 연락처
  const existingContact = await prisma.contactInfo.findFirst()
  if (!existingContact) {
    await prisma.contactInfo.createMany({
      data: [
        { type: 'phone', label: '전화', value: '전화 문의 가능\n카카오톡 상담 가능', icon: 'FiPhone', order: 0 },
        { type: 'email', label: '이메일', value: '이메일 문의 가능', icon: 'FiMail', order: 1 },
        { type: 'address', label: '위치', value: '민죠이짐: [주소]\n민죠이케어: [주소] (같은 건물 내)', icon: 'FiMapPin', order: 2 },
        { type: 'hours', label: '운영시간', value: '평일: 06:00 - 22:00\n주말: 08:00 - 20:00\n※ 예약제 운영', icon: 'FiClock', order: 3 },
      ],
    })
    console.log('연락처 정보 생성')
  }

  // 메뉴
  const existingMenu = await prisma.menuItem.findFirst()
  if (!existingMenu) {
    await prisma.menuItem.createMany({
      data: [
        { name: '홈', href: '/', order: 0 },
        { name: '브랜드 소개', href: '/about', order: 1 },
        { name: '민죠이짐', href: '/gym', order: 2 },
        { name: '민죠이케어', href: '/care', order: 3 },
        { name: '시설 소개', href: '/facilities', order: 4 },
        { name: '변화 갤러리', href: '/gallery', order: 5 },
        { name: '문의하기', href: '/contact', order: 6 },
      ],
    })
    console.log('메뉴 아이템 생성')
  }

  console.log('시드 데이터 생성 완료!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
