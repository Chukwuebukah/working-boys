'use client'

import { Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#1C1333] py-12 lg:py-16 xl:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {/* CryptoToken Inc. Section */}
          <div>
            <h3 className="text-white font-semibold text-lg lg:text-xl xl:text-2xl mb-6 lg:mb-8">CryptoToken Inc.</h3>
            <div className="flex space-x-4 lg:space-x-6 mb-6 lg:mb-8">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
              </a>
            </div>
            <p className="text-gray-400 text-sm lg:text-base xl:text-lg">
              2024 CryptoToken. All rights reserved
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-white font-semibold text-lg lg:text-xl xl:text-2xl mb-6 lg:mb-8">Quick Links</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm lg:text-base xl:text-lg hover:underline"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm lg:text-base xl:text-lg hover:underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm lg:text-base xl:text-lg hover:underline"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm lg:text-base xl:text-lg hover:underline"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Others Section */}
          <div>
            <h3 className="text-white font-semibold text-lg lg:text-xl xl:text-2xl mb-6 lg:mb-8">Others</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm lg:text-base xl:text-lg hover:underline"
                >
                  Terms of service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm lg:text-base xl:text-lg hover:underline"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer