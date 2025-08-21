'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'FEATURES', href: '#features' },
    { name: 'ABOUT', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'CONTACT', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 [background:#1C1333] backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20 xl:h-24">
          {/* Logo */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg lg:text-xl xl:text-2xl">CT</span>
            </div>
            <span className="text-xl lg:text-2xl xl:text-3xl font-bold text-white">LOGO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 xl:space-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base xl:text-lg font-medium hover:underline underline-offset-4"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1C1333]">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header