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
      className="bg-white rounded-xl xs:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 hover:border-gray-200"
    >
      <div className="p-4 xs:p-6 sm:p-8">
        <div className={`bg-gradient-to-r ${color} p-2 xs:p-3 sm:p-4 rounded-xl xs:rounded-2xl w-fit mb-3 xs:mb-4 sm:mb-6 text-white text-lg xs:text-xl sm:text-2xl md:text-3xl`}>
          {icon}
        </div>
        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-1 xs:mb-2">{name}</h3>
        <p className="text-gray-600 mb-3 xs:mb-4 sm:mb-6 text-sm xs:text-base">{description}</p>
        <div className="flex items-center text-blue-500 font-semibold text-sm xs:text-base">
          <span>Select Wallet</span>
          <ExternalLink className="w-3 xs:w-4 h-3 xs:h-4 ml-2" />
        </div>
      </div>
    </div>
  )
}

export default WalletCard ;