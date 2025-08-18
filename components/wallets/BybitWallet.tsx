'use client'

import WalletForm from './WalletForm'

const BybitWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Bybit',
    icon: '🟠',
    description: 'Advanced trading platform',
    color: 'from-orange-500 to-orange-600'
  }

  return <WalletForm wallet={walletData} onBack={onBack} />
}

export default BybitWallet