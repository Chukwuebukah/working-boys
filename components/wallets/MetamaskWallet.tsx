'use client'

import WalletForm from './WalletForm'

const MetamaskWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Safepal',
    icon: '🦊',
    description: 'Popular Web3 wallet',
    color: 'from-orange-400 to-red-500'
  }

  return <WalletForm wallet={walletData} onBack={onBack} />
}

export default MetamaskWallet