'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ChevronRight,
  RefreshCw,
  Circle,
  Copy,
  TrendingUp,
  LayoutDashboard,
  DollarSign,
  Banknote,
  CreditCard,
  Settings,
  Star,
} from 'lucide-react';
import { AuthContext } from '../app/context/AuthContext';
import apiRequest from '../app/lib/apiRequest';

// Mock user data
const userInfo = {
  username: 'JohnDoe',
  createAccountDate: '2024-01-15',
  totalBalance: '12,450.00',
  activeDeposit: '8,500.00',
  totalWithdrawn: '3,200.00',
  earnings: '1,750.00',
  referralEarnings: '450.00',
  totalDeposit: '11,700.00',
  referralLink: 'https://cryptotoken.com/?ref=JohnDoe',
};

// Sidebar Component
const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Deposit', href: '/dashboard/deposit', icon: DollarSign },
    { name: 'Withdraw', href: '/dashboard/withdraw', icon: Banknote },
    { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
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

// Stat Card component
const StatCard = ({ title, amount, subtitle, color = 'primary', progress = 100 }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          {title} <ChevronRight className="inline w-3 h-3 ml-1" />
        </span>
        <button className="text-gray-400 hover:text-gray-600">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">${amount}</h3>
      <div className="flex items-center justify-between text-sm">
        <span className={`text-${color === 'danger' ? 'red' : color === 'success' ? 'green' : 'blue'}-600`}>
          {subtitle}
        </span>
        <span className="text-gray-500">0</span>
      </div>
    </div>
    <div className="h-1 bg-gray-200">
      <div
        className={`h-full bg-${color === 'danger' ? 'red' : color === 'success' ? 'green' : 'blue'}-500`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userStars, setUserStars] = useState(0);
  const [loading, setLoading] = useState(true);

  const { updateUser, currentUser } = useContext(AuthContext);

  // Fetch user's current stars
  useEffect(() => {
    const fetchUserStars = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get('/payment/stars');
        setUserStars(response.data.stars || 0);
        console.log('User stars fetched:', response.data.stars);
      } catch (error) {
        console.error('Error fetching user stars:', error.response?.data || error.message);
        setUserStars(0);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserStars();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(userInfo.referralLink);
    alert('Referral Link Copied!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        {/* Profile top right */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow border space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-700">
              {currentUser?.email?.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex items-center text-yellow-500 text-sm font-medium space-x-1">
              <Star className="w-4 h-4" />
              <span>{loading ? '...' : userStars}</span>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Dashboard</span>
        </nav>

        {/* Online Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-100">
            <h5 className="text-blue-600 text-sm font-medium flex items-center">
              Online Status <Circle className="w-3 h-3 ml-2 text-green-500 fill-current" />
            </h5>
          </div>
          <div className="p-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800 animate-pulse">
                Welcome Back {currentUser?.username || 'Guest'}, Feel free to explore
              </div>
            </div>
          </div>
        </div>

        {/* Stars Balance Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-100">
            <h5 className="text-yellow-600 text-sm font-medium flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Stars Balance
            </h5>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {loading ? 'Loading...' : userStars} Stars
                </h3>
                <p className="text-gray-600">Available for receipt generation</p>
                <p className="text-sm text-gray-500 mt-1">Each receipt costs 5 stars</p>
              </div>
              <div className="text-right">
                <Link 
                  href="/dashboard/subscription"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors inline-flex items-center"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Buy Stars
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Column - Stats Cards */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                Total Coins <ChevronRight className="inline w-3 h-3 ml-1" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">${userInfo.totalBalance}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600">All Time</span>
                <span className="text-gray-500">{userInfo.createAccountDate}</span>
              </div>
            </div>
          </div>

          {/* Middle Column - More Stats */}
          <div className="lg:col-span-3 space-y-4">
            <StatCard 
              title="Referral Earnings"
              amount={userInfo.referralEarnings}
              subtitle="Referral Earnings"
              color="danger"
            />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="border-b border-gray-100 pb-4 mb-4">
                <h5 className="text-green-600 text-sm font-medium">
                  Refer & Earn 2% of your referral's deposits.
                </h5>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <strong>Referral link</strong>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={userInfo.referralLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-gray-50"
                  />
                  <button
                    onClick={copyReferralLink}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Cryptocurrency Live Chart */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-blue-600">Live Cryptocurrency Prices</h2>
                  <p className="text-gray-600">Updated in real time</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-4 py-2">Coin</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">24h Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium">Bitcoin (BTC)</td>
                        <td className="px-4 py-3 text-gray-900">$61,000</td>
                        <td className="px-4 py-3 text-green-600">+2.5%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium">Ethereum (ETH)</td>
                        <td className="px-4 py-3 text-gray-900">$3,400</td>
                        <td className="px-4 py-3 text-red-600">-1.2%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium">Solana (SOL)</td>
                        <td className="px-4 py-3 text-gray-900">$132</td>
                        <td className="px-4 py-3 text-green-600">+4.1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab System */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['Profile', 'Investments', 'Transactions', 'Settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <p className="text-gray-900">{currentUser?.username}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Created</label>
                    <p className="text-gray-900">{currentUser?.createdAt}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <p className="text-gray-900">{currentUser?.email}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'investments' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Overview</h3>
                <p className="text-gray-600">Investment details and portfolio information would be displayed here.</p>
              </div>
            )}
            {activeTab === 'transactions' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h3>
                <p className="text-gray-600">Recent transactions and payment history would be shown here.</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                <p className="text-gray-600">Account preferences and security settings would be available here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;