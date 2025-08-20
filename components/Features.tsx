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
    <section id="features" className="py-16 md:py-20 bg-[#1C1333] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            FEATURES
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to create and deploy your cryptocurrency token with confidence and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card text-center p-6 bg-gray-900/40 rounded-2xl">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-6 text-white">
                {feature.icon()}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-3xl p-8 md:p-12 border border-gray-700">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Ready to Create Your Token?
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of creators who have successfully launched their cryptocurrency tokens using our platform. 
              Start building the future of finance today.
            </p>
            <button className="bg-white text-black font-bold px-8 py-3 rounded-md">
              <span>Start Creating Now</span>
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
            CryptoToken Inc provides a complete solution to create token generation on the blockchain without 
            writing code. Create professional, enterprise-grade tokens for your project.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features ;