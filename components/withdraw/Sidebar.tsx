'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  DollarSign,
  Banknote,
  CreditCard,
  Settings,
  LogOut
} from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Deposit', href: '/dashboard/deposit', icon: DollarSign },
    { name: 'Withdraw', href: '/dashboard/withdraw', icon: Banknote },
    { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1C1333] p-2 rounded shadow-lg text-white"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <LayoutDashboard className="w-6 h-6" />
      </button>
      {/* Sidebar for desktop */}
      <aside
        className="hidden md:block fixed left-0 top-0 h-full w-64 shadow-lg z-40 text-white"
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
      {/* Sidebar Drawer for mobile */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex">
          <aside
            className="w-64 h-full bg-[#1C1333] shadow-lg text-white flex flex-col"
          >
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold">CryptoToken</h2>
              <button onClick={() => setOpen(false)} aria-label="Close sidebar">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col mt-4">
              {links.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center px-6 py-3 text-sm hover:bg-[#29224b] transition-colors ${
                    pathname === href ? 'bg-[#29224b]' : ''
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {name}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  )
}

export default Sidebar