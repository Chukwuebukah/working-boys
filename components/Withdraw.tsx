'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import Sidebar from './withdraw/Sidebar'
import WalletCard from './wallets/WalletCard'
import BinanceWallet from './withdraw/BinanceWallet'
import CoinbaseWallet from './withdraw/CoinbaseWallet'
import BybitWallet from './withdraw/BybitWallet'
import MetamaskWallet from './withdraw/MetamaskWallet'
import TrustWallet from './withdraw/TrustWallet'

const Deposit = () => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const walletOptions = [
    {
      name: 'Binance',
      icon: '🟡',
      description: 'World\'s largest crypto exchange',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      name: 'Coinbase',
      icon: '🔵',
      description: 'Trusted cryptocurrency platform',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Bybit',
      icon: '🟠',
      description: 'Advanced trading platform',
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Safepal',
      icon: '🦊',
      description: 'Popular Web3 wallet',
      color: 'from-orange-400 to-red-500',
    },
    {
      name: 'Trust Wallet',
      icon: '🔷',
      description: 'Secure mobile wallet',
      color: 'from-blue-400 to-indigo-500',
    }
  ]

  const handleWalletSelect = (walletName: string) => {
    setSelectedWallet(walletName)
  }

  const handleBack = () => {
    setSelectedWallet(null)
  }

  const renderWalletComponent = () => {
    switch (selectedWallet) {
      case 'Binance':
        return <BinanceWallet onBack={handleBack} />
      case 'Coinbase':
        return <CoinbaseWallet onBack={handleBack} />
      case 'Bybit':
        return <BybitWallet onBack={handleBack} />
      case 'Safepal':
        return <MetamaskWallet onBack={handleBack} />
      case 'Trust Wallet':
        return <TrustWallet onBack={handleBack} />
      default:
        return null
    }
  }

  if (selectedWallet) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 ml-64">
        <Sidebar />
        {renderWalletComponent()}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <Sidebar />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Wallet</h1>
          <p className="text-xl text-gray-600">Select your preferred wallet or exchange to deposit funds</p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {walletOptions.map((wallet) => (
            <WalletCard
              key={wallet.name}
              name={wallet.name}
              icon={wallet.icon}
              description={wallet.description}
              color={wallet.color}
              onSelect={handleWalletSelect}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose These Wallets?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🔒 Security First</h3>
              <p className="text-gray-600">All featured wallets use industry-leading security measures including multi-signature technology and cold storage.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Fast Transactions</h3>
              <p className="text-gray-600">Experience quick deposit confirmations and seamless integration with our platform.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🌍 Global Access</h3>
              <p className="text-gray-600">These wallets are available worldwide and support multiple cryptocurrencies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📱 Mobile Friendly</h3>
              <p className="text-gray-600">Access your funds on-the-go with mobile apps available for iOS and Android.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="text-xl mb-6">Our support team is available 24/7 to assist you with deposits and any questions.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit