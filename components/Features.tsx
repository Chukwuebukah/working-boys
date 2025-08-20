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
    <section id="features" className="py-14 sm:py-20 [background:#1C1333] px-2 sm:px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            FEATURES
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto">
            Everything you need to create and deploy your cryptocurrency token with confidence and ease.
          </p>
        </div>

  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card text-center px-2 py-4 bg-gray-900/40 rounded-2xl shadow-sm">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 sm:p-4 rounded-2xl w-fit mx-auto mb-4 sm:mb-6 text-white">
                {feature.icon()}
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-20 text-center px-2">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-gray-700">
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Ready to Create Your Token?
            </h3>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto">
              Join thousands of creators who have successfully launched their cryptocurrency tokens using our platform. 
              Start building the future of finance today.
            </p>
            <button className="bg-white text-black font-bold px-6 py-3 rounded-md space-x-2 cursor-pointer w-full xs:w-auto">
              <span>Start Creating Now</span>
            </button>
          </div>
        </div>

        <div className="mt-10 sm:mt-16 text-center px-2">
          <p className="text-gray-400 max-w-2xl sm:max-w-4xl mx-auto leading-relaxed text-sm sm:text-base">
            CryptoToken Inc provides a complete solution to create token generation on the blockchain without 
            writing code. Create professional, enterprise-grade tokens for your project.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features ;