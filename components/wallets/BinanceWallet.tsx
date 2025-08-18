'use client'

import WalletForm from './WalletForm'

const BinanceWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Binance',
    icon: '🟡',
    description: 'World\'s largest crypto exchange',
    color: 'from-yellow-500 to-yellow-600'
  }

  return <WalletForm wallet={walletData} onBack={onBack} />
}

export default BinanceWallet