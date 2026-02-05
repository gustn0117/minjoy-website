'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiUser } from 'react-icons/fi'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: '홈', href: '#home' },
    { name: '브랜드 소개', href: '#about' },
    { name: '민죠이짐', href: '#minjoy-gym' },
    { name: '민죠이케어', href: '#minjoy-care' },
    { name: '시설 소개', href: '#facilities' },
    { name: '변화 갤러리', href: '#gallery' },
    { name: '문의하기', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ivory shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className={`text-2xl font-bold transition-colors ${
              isScrolled ? 'text-brown-dark' : 'text-white'
            }`}>
              <span className="text-primary-dark">민죠이</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-primary-dark ${
                  isScrolled ? 'text-brown-dark' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Icon */}
          <div className="hidden lg:flex items-center">
            <button
              className={`p-2 rounded-full transition-colors ${
                isScrolled ? 'text-brown-dark hover:bg-primary-light/30' : 'text-white hover:bg-white/20'
              }`}
            >
              <FiUser size={24} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-brown-dark' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-ivory shadow-lg">
          <nav className="container-custom py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-brown-dark hover:text-primary-dark font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
