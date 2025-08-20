'use client'

import { ArrowRight, Coins } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 [background:#1C1333]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              CREATE YOUR
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CRYPTO TOKEN
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Generate your own cryptocurrency token fast and easily with our secure and reliable platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/sign-up" className="bg-white text-black font-bold px-6 py-3 rounded-md flex items-center justify-center space-x-2 cursor-pointer">
                GET STARTED
              </a>
            </div>
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-gray-400 text-sm">Tokens Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Crypto Coins */}
          <div className="relative flex items-center justify-center mt-10 lg:mt-0">
            <div className="relative w-80 h-80">
              {/* Main Ethereum-style coin */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
                      <div className="w-8 h-12 bg-yellow-200 transform rotate-45" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating coins */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg animate-bounce">
                <div className="absolute inset-2 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg animate-bounce delay-300">
                <div className="absolute inset-2 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center">
                  <Coins className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="absolute top-16 -left-12 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg animate-bounce delay-700">
                <div className="absolute inset-1 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center">
                  <Coins className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="absolute bottom-20 -right-6 w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg animate-bounce delay-1000">
                <div className="absolute inset-1 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom description */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero