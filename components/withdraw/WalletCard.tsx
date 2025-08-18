'use client'

import { ExternalLink } from 'lucide-react'

interface WalletCardProps {
  name: string
  icon: string
  description: string
  color: string
  onSelect: (walletName: string) => void
}

const WalletCard = ({ name, icon, description, color, onSelect }: WalletCardProps) => {
  return (
    <div
      onClick={() => onSelect(name)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 hover:border-gray-200"
    >
      <div className="p-8">
        <div className={`bg-gradient-to-r ${color} p-4 rounded-2xl w-fit mb-6 text-white text-3xl`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex items-center text-blue-500 font-semibold">
          <span>Select Wallet</span>
          <ExternalLink className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  )
}

export default WalletCard ;