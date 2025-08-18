'use client'

import WithdrawForm from './WithdrawForm'

const CoinbaseWallet = ({ onBack }: { onBack: () => void }) => {
  const walletData = {
    name: 'Coinbase',
    icon: '🔵',
    description: 'Trusted cryptocurrency platform',
    color: 'from-blue-500 to-blue-600'
  }

  return <WithdrawForm wallet={walletData} onBack={onBack} />
}

export default CoinbaseWallet