'use client'

import Link from 'next/link'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { SiNaver } from 'react-icons/si'

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
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 border-2 border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border-2 border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                <FaYoutube size={18} />
              </a>
              <a href="#" className="w-10 h-10 border-2 border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                <SiNaver size={14} />
              </a>
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
