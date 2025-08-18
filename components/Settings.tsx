'use client'

import { useContext, useState } from 'react'
import {
  LayoutDashboard,
  DollarSign,
  Banknote,
  CreditCard,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import apiRequest from '../app/lib/apiRequest'
import { AuthContext } from '../app/context/AuthContext'


// Sidebar Component
const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Deposit', href: '/dashboard/deposit', icon: DollarSign },
    { name: 'Withdraw', href: '/dashboard/withdraw', icon: Banknote },
    { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
  ];

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
  );
};


const Settings = () => {

  const router = useRouter();

  const{updateUser} = useContext(AuthContext)
 
  const handleLogout = async () => {
    try{
    await apiRequest.post("/auth/logout");
  updateUser(null)
  router.replace("/")
    }catch(err){
      console.log(err)
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <Sidebar />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
        <div className="space-y-4">

          {/* Change Password */}
          <button
            onClick={() => router.push('/dashboard/settings/change-password')}
            className="w-full flex items-center justify-between px-6 py-4 rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
          >
            <div className="flex items-center">
              <KeyIcon className="w-5 h-5 mr-2 text-blue-600" />
              <div>
                <div className="font-semibold text-blue-700">Change Password</div>
                <div className="text-gray-500 text-sm">Update your account password for security.</div>
              </div>
            </div>
          </button>

      

          {/* Logout */}
          <button onClick={handleLogout}
            className="w-full flex items-center justify-between px-6 py-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors shadow-sm"
          >
            <div className="flex items-center">
              <LogOut className="w-5 h-5 mr-2 text-red-600" />
              <div>
                <div className="font-semibold text-red-600">Logout</div>
                <div className="text-gray-500 text-sm">Sign out of your account securely.</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Icon components for settings options
function KeyIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 15v2a4 4 0 1 1-4-4h2m6-6a4 4 0 1 1-4 4V7a4 4 0 1 1 4-4z" />
    </svg>
  );
}
function BellIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V4a2 2 0 1 0-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
    </svg>
  );
}
function ShieldIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default Settings;