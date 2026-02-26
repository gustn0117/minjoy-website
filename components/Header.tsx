'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiUser } from 'react-icons/fi'

interface MenuItem {
  id: string
  name: string
  href: string
  order: number
}

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: '1', name: '홈', href: '/', order: 0 },
  { id: '2', name: '브랜드 소개', href: '/about', order: 1 },
  { id: '3', name: '민죠이짐', href: '/gym', order: 2 },
  { id: '4', name: '민죠이케어', href: '/care', order: 3 },
  { id: '5', name: '시설 소개', href: '/facilities', order: 4 },
  { id: '6', name: '변화 갤러리', href: '/gallery', order: 5 },
  { id: '7', name: '문의하기', href: '/contact', order: 6 },
]

const Header = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const showBackground = !isHomePage || isScrolled

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        showBackground ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center relative z-10 transition-opacity duration-200 hover:opacity-80">
            <span className={`text-2xl font-bold transition-colors duration-200 ${
              showBackground ? 'text-primary' : 'text-white'
            }`}>
              민죠이
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {DEFAULT_MENU_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleNavClick}
                className={`text-sm font-medium transition-colors duration-200 relative z-10 flex flex-col items-center gap-1.5 ${
                  showBackground
                    ? pathname === item.href
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-primary'
                    : pathname === item.href
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className={`w-1 h-1 rounded-full ${
                    showBackground ? 'bg-primary' : 'bg-white'
                  }`} />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="/admin"
              className={`p-2 rounded-md transition-colors duration-200 relative z-10 ${
                showBackground ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              <FiUser size={22} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-200 relative z-10 ${
              showBackground ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-custom py-4 space-y-1">
          {DEFAULT_MENU_ITEMS.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={`block py-3 px-4 rounded-md text-gray-700 hover:text-primary hover:bg-primary-50 font-medium transition-all duration-200 ${
                pathname === item.href ? 'text-primary bg-primary-50' : ''
              } ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
              }}
              onClick={handleNavClick}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
