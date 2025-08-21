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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-6 lg:mb-8 leading-tight">
              CREATE YOUR
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CRYPTO TOKEN
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-gray-300 mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Generate your own cryptocurrency token fast and easily with our secure and reliable platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 lg:mb-16">
              <a href="/sign-up" className="bg-white text-black font-bold px-8 py-4 lg:px-10 lg:py-5 rounded-lg text-lg lg:text-xl flex items-center justify-center space-x-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                GET STARTED
              </a>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 lg:gap-8 text-center lg:text-left">
              <div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">10K+</div>
                <div className="text-gray-400 text-sm lg:text-base">Tokens Created</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">99.9%</div>
                <div className="text-gray-400 text-sm lg:text-base">Uptime</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm lg:text-base">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Crypto Coins */}
          <div className="relative flex items-center justify-center mt-10 lg:mt-0">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[480px] xl:h-[480px]">
              {/* Main Ethereum-style coin */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-4 lg:inset-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-yellow-600 rounded-full flex items-center justify-center">
                      <div className="w-8 h-12 lg:w-10 lg:h-14 xl:w-12 xl:h-16 bg-yellow-200 transform rotate-45" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating coins */}
              <div className="absolute -top-8 -right-8 lg:-top-10 lg:-right-10 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg animate-bounce">
                <div className="absolute inset-2 lg:inset-3 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 lg:-bottom-6 lg:-left-10 w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg animate-bounce delay-300">
                <div className="absolute inset-2 lg:inset-3 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center">
                  <Coins className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white" />
                </div>
              </div>

              <div className="absolute top-16 -left-12 lg:top-20 lg:-left-16 w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg animate-bounce delay-700">
                <div className="absolute inset-1 lg:inset-2 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center">
                  <Coins className="w-4 h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-white" />
                </div>
              </div>

              <div className="absolute bottom-20 -right-6 lg:bottom-24 lg:-right-8 w-14 h-14 lg:w-18 lg:h-18 xl:w-22 xl:h-22 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg animate-bounce delay-1000">
                <div className="absolute inset-1 lg:inset-2 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center">
                  <Coins className="w-5 h-5 lg:w-7 lg:h-7 xl:w-9 xl:h-9 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom description */}
        <div className="mt-16 lg:mt-20 xl:mt-24 text-center">
          <p className="text-gray-400 text-lg lg:text-xl max-w-5xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero