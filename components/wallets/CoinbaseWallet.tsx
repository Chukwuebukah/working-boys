'use client'

import WalletForm from './WalletForm'

const CoinbaseWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Coinbase',
    icon: '🔵',
    description: 'Trusted cryptocurrency platform',
    color: 'from-blue-500 to-blue-600'
  }

  return <WalletForm wallet={walletData} onBack={onBack} />
}

export default CoinbaseWallet