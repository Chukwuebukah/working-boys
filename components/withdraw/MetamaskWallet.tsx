'use client'

import WithdrawForm from "./WithdrawForm"


const MetamaskWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Safepal',
    icon: '🦊',
    description: 'Popular Web3 wallet',
    color: 'from-orange-400 to-red-500'
  }

  return <WithdrawForm wallet={walletData} onBack={onBack} />
}

export default MetamaskWallet