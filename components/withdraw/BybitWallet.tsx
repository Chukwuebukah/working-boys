'use client'

import WithdrawForm from "./WithdrawForm"



const BybitWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Bybit',
    icon: '🟠',
    description: 'Advanced trading platform',
    color: 'from-orange-500 to-orange-600'
  }

  return <WithdrawForm wallet={walletData} onBack={onBack} />
}

export default BybitWallet