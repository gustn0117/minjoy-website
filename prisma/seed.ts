import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@minjoy.com'
  const password = process.env.ADMIN_PASSWORD || 'minjoy2024!'

  // 기존 관리자 확인
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  })

  if (existingAdmin) {
    console.log('관리자 계정이 이미 존재합니다:', email)
    return
  }

  // 비밀번호 해시
  const hashedPassword = await bcrypt.hash(password, 10)

  // 관리자 생성
  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name: '관리자',
    },
  })

  console.log('관리자 계정이 생성되었습니다:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
