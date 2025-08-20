'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import Sidebar from './wallets/Sidebar'
import WalletCard from './wallets/WalletCard'
import BinanceWallet from './wallets/BinanceWallet'
import CoinbaseWallet from './wallets/CoinbaseWallet'
import BybitWallet from './wallets/BybitWallet'
import MetamaskWallet from './wallets/MetamaskWallet'
import TrustWallet from './wallets/TrustWallet'

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
      <div className="min-h-screen bg-gray-50 w-full md:ml-64 p-2 xs:p-4 sm:p-6">
        <Sidebar />
        {renderWalletComponent()}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full md:ml-64 p-2 xs:p-4 sm:p-6">
      <Sidebar />
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Choose Your Wallet</h1>
          <p className="text-base xs:text-lg sm:text-xl text-gray-600">Select your preferred wallet or exchange to deposit funds</p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
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

        <div className="bg-white rounded-2xl shadow-lg p-4 xs:p-6 sm:p-8">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose These Wallets?</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">🔒 Security First</h3>
              <p className="text-gray-600 text-xs sm:text-base">All featured wallets use industry-leading security measures including multi-signature technology and cold storage.</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">⚡ Fast Transactions</h3>
              <p className="text-gray-600 text-xs sm:text-base">Experience quick deposit confirmations and seamless integration with our platform.</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">🌍 Global Access</h3>
              <p className="text-gray-600 text-xs sm:text-base">These wallets are available worldwide and support multiple cryptocurrencies.</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">📱 Mobile Friendly</h3>
              <p className="text-gray-600 text-xs sm:text-base">Access your funds on-the-go with mobile apps available for iOS and Android.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center px-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 xs:p-6 sm:p-8 text-white">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Need Help?</h3>
            <p className="text-base xs:text-lg sm:text-xl mb-4 sm:mb-6">Our support team is available 24/7 to assist you with deposits and any questions.</p>
            <button className="bg-white text-blue-600 px-6 xs:px-8 py-2 xs:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 w-full xs:w-auto">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit