'use client'

import { FiPhone, FiMail, FiMapPin, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">민죠이</h3>
            <p className="text-gray-400 mb-4">
              운동과 관리를 한 곳에서!<br />
              확실한 변화를 위한 프리미엄 토탈케어 센터
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">
                  브랜드 소개
                </a>
              </li>
              <li>
                <a href="#minjoy-gym" className="text-gray-400 hover:text-primary transition-colors">
                  민죠이짐
                </a>
              </li>
              <li>
                <a href="#minjoy-care" className="text-gray-400 hover:text-primary transition-colors">
                  민죠이케어
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">연락처</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FiPhone className="text-primary" />
                <span className="text-gray-400">전화 문의</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-primary" />
                <span className="text-gray-400">이메일 문의</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-primary" />
                <span className="text-gray-400">오시는 길</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiInstagram className="text-primary" />
                <span className="text-gray-400">Instagram</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="mb-2">사업자등록번호: [사업자등록번호]</p>
          <p>&copy; 2024 민죠이짐 & 민죠이케어. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
