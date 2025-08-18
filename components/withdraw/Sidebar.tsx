'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  DollarSign,
  Banknote,
  CreditCard,
  Settings
} from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()
  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Deposit', href: '/dashboard/deposit', icon: DollarSign },
    { name: 'Withdraw', href: '/dashboard/withdraw', icon: Banknote },
    { name: 'Subscription', href: '/credit-payment', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 shadow-lg z-40 text-white"
      style={{ backgroundColor: '#1C1333' }}
    >
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">CryptoToken</h2>
      </div>
      <nav className="flex flex-col mt-4">
        {links.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center px-6 py-3 text-sm hover:bg-[#29224b] transition-colors ${
              pathname === href ? 'bg-[#29224b]' : ''
            }`}
          >
            <Icon className="w-4 h-4 mr-3" />
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar