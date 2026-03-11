'use client'

import Link from 'next/link'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaInstagram, FaComment } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t-2 border-primary/20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">민죠이</h3>
            <p className="text-gray-500 mb-6">
              운동과 관리를 한 곳에서!<br />
              확실한 변화를 위한 프리미엄 토탈케어 센터
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <a href="https://pf.kakao.com/_vxiyIX" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-[#FEE500] bg-[#FEE500] text-[#3C1E1E] rounded-full flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.65 1.734 4.974 4.336 6.332-.136.503-.878 3.237-.907 3.459 0 0-.018.173.091.238.109.065.237.015.237.015.313-.043 3.622-2.365 4.185-2.765.684.097 1.39.148 2.058.148 5.523 0 10-3.463 10-7.427C22 6.463 17.523 3 12 3z"/>
                  </svg>
                </a>
                <a href="https://pf.kakao.com/_vxiyIX" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  카카오톡 채널
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com/min.joy___gym" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                  <FaInstagram size={18} />
                </a>
                <a href="https://instagram.com/min.joy___gym" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  @min.joy___gym
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com/min.joy___" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                  <FaInstagram size={18} />
                </a>
                <a href="https://instagram.com/min.joy___" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  @min.joy___ (대표)
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">빠른 링크</h4>
            <div className="w-8 h-0.5 bg-primary rounded-full mb-4" />
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-500 hover:text-primary transition-colors link-underline">브랜드 소개</Link></li>
              <li><Link href="/gym" className="text-gray-500 hover:text-primary transition-colors link-underline">민죠이짐</Link></li>
              <li><Link href="/care" className="text-gray-500 hover:text-primary transition-colors link-underline">민죠이케어</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-primary transition-colors link-underline">문의하기</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">연락처</h4>
            <div className="w-8 h-0.5 bg-primary rounded-full mb-4" />
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FiPhone className="text-primary" size={16} />
                <span className="text-gray-500">전화 문의</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-primary" size={16} />
                <span className="text-gray-500">이메일 문의</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-primary" size={16} />
                <span className="text-gray-500">오시는 길</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p className="mb-1">사업자등록번호: [사업자등록번호]</p>
          <p>&copy; 2024 민죠이짐 & 민죠이케어. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
