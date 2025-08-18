'use client'

import WithdrawForm from "./WithdrawForm"



const TrustWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Trust Wallet',
    icon: '🔷',
    description: 'Secure mobile wallet',
    color: 'from-blue-400 to-indigo-500'
  }

  return <WithdrawForm wallet={walletData} onBack={onBack} />
}

export default TrustWallet