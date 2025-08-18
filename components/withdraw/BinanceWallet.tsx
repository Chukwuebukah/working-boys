'use client'

import WithdrawForm from './WithdrawForm'

const BinanceWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Binance',
    icon: '🟡',
    description: 'World\'s largest crypto exchange',
    color: 'from-yellow-500 to-yellow-600'
  }

  return <WithdrawForm wallet={walletData} onBack={onBack} />
}

export default BinanceWallet