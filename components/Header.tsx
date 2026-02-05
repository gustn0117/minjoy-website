'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiUser } from 'react-icons/fi'

interface MenuItem {
  id: string
  name: string
  href: string
  order: number
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/content?type=menu-items&activeOnly=true')
        if (response.ok) {
          const data = await response.json()
          setMenuItems(data.items || [])
        }
      } catch (error) {
        console.error('Failed to fetch menu items:', error)
      }
    }

    fetchData()
  }, [])

  // 기본값
  const defaultMenuItems = [
    { id: '1', name: '홈', href: '#home', order: 0 },
    { id: '2', name: '브랜드 소개', href: '#about', order: 1 },
    { id: '3', name: '민죠이짐', href: '#minjoy-gym', order: 2 },
    { id: '4', name: '민죠이케어', href: '#minjoy-care', order: 3 },
    { id: '5', name: '시설 소개', href: '#facilities', order: 4 },
    { id: '6', name: '변화 갤러리', href: '#gallery', order: 5 },
    { id: '7', name: '문의하기', href: '#contact', order: 6 },
  ]

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems

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
            {items.map((item) => (
              <Link
                key={item.id}
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
            {items.map((item) => (
              <Link
                key={item.id}
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
