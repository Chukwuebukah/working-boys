'use client'

import WalletForm from "./WalletForm"



const TrustWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Trust Wallet',
    icon: '🔷',
    description: 'Secure mobile wallet',
    color: 'from-blue-400 to-indigo-500'
  }

  return <WalletForm wallet={walletData} onBack={onBack} />
}

export default TrustWallet