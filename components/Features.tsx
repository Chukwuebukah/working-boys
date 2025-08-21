'use client'

import { Zap, Shield, Settings } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: () => <Zap className="w-12 h-12" />,
      title: 'Fast Deployment',
      description: 'Deploy your token in minutes with our streamlined process and automated smart contract generation.',
    },
    {
      icon: () => <Shield className="w-12 h-12" />,
      title: 'Secure & Reliable',
      description: 'Built with industry-leading security practices and audited smart contracts for maximum reliability.',
    },
    {
      icon: () => <Settings className="w-12 h-12" />,
      title: 'Customizable Options',
      description: 'Fully customize your token with advanced options, custom logic, and flexible parameters.',
    },
  ]

  return (
    <section id="features" className="py-16 md:py-20 lg:py-24 xl:py-28 bg-[#1C1333] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8">
            FEATURES
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everything you need to create and deploy your cryptocurrency token with confidence and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {features.map((feature, index) => (
            <div key={index} className="feature-card text-center p-6 lg:p-8 xl:p-10 bg-gray-900/40 rounded-2xl lg:rounded-3xl hover:bg-gray-900/60 transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 lg:p-6 xl:p-8 rounded-2xl lg:rounded-3xl w-fit mx-auto mb-6 lg:mb-8 text-white shadow-lg">
                {feature.icon()}
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-6">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed text-base lg:text-lg xl:text-xl">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 lg:mt-24 xl:mt-28 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-3xl lg:rounded-[3rem] p-8 md:p-12 lg:p-16 xl:p-20 border border-gray-700 hover:border-gray-600 transition-colors duration-300">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 lg:mb-8">
              Ready to Create Your Token?
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of creators who have successfully launched their cryptocurrency tokens using our platform. 
              Start building the future of finance today.
            </p>
            <button className="bg-white text-black font-bold px-8 py-4 lg:px-12 lg:py-6 xl:px-16 xl:py-8 rounded-lg lg:rounded-xl text-lg lg:text-xl xl:text-2xl hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              <span>Start Creating Now</span>
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-center">
          <p className="text-gray-400 text-lg lg:text-xl xl:text-2xl max-w-5xl mx-auto leading-relaxed">
            CryptoToken Inc provides a complete solution to create token generation on the blockchain without 
            writing code. Create professional, enterprise-grade tokens for your project.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features ;