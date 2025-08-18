'use client'

import {
  ArrowLeft,
  LayoutDashboard,
  DollarSign,
  Banknote,
  CreditCard,
  Settings,
  Loader2,
  Star,
  AlertTriangle
} from 'lucide-react'
import {useState, useContext, useEffect } from 'react'
import apiRequest from '../../app/lib/apiRequest'
import { AuthContext } from '../../app/context/AuthContext'

interface WalletData {
  name: string
  icon: string
  description: string
  color: string
  dateTime?: string
}

interface WalletFormProps {
  wallet: WalletData
  onBack: () => void
}

const WalletForm = ({ wallet, onBack }: WalletFormProps) => {
  const [loading, setLoading] = useState(false)
  const [userStars, setUserStars] = useState(0)
  const [showInsufficientStars, setShowInsufficientStars] = useState(false)
  const { currentUser } = useContext(AuthContext)
  
  const [formData, setFormData] = useState({
    email: "",
    amount: "",
    currency: "",
    wallet: "",
    timeDate: "",
    status: "",
    walletName: "",
    safepal: {
    from: "",
    to: "",
    id: "",
    height: ""
  }
  })

    const [bybitTag, setBybitTag] = useState('');
    const handleBybitTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBybitTag(e.target.value);
    };

    const [txTag, setTxTag] = useState('');
    const handleTxTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTxTag(e.target.value);
    }

    const [fromTag, setFromTag] = useState('');
    const handleFromTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFromTag(e.target.value);
    };

    const [toTag, setToTag] = useState ('');
    const handleToTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setToTag(e.target.value);
    }

    const [idTag, setIdTag] = useState ('');
    const handleIdTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIdTag(e.target.value);
    }

    const [heightTag, setHeightTag] = useState ('');
    const handleHeightTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHeightTag(e.target.value);
    }

     // Load user stars on component mount
  useEffect(() => {
    loadUserStars();
  }, []);

  const loadUserStars = async () => {
    try {
      const response = await apiRequest.get('/payment/stars')
      setUserStars(response.data.stars)
    } catch (error) {
      console.error('Error loading user stars:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Check user's star balance before form submission
  const checkUserStars = async () => {
    try {
      const response = await apiRequest.get('/payment/stars')
      const stars = response.data.stars
      setUserStars(stars)
      
      if (stars < 5) {
        setShowInsufficientStars(true)
        return false
      }
      setShowInsufficientStars(false)
      return true
    } catch (error) {
      console.error('Error checking user stars:', error)
      alert('Error checking your star balance. Please try again.')
      return false
    }
  }

   // Deduct stars after successful receipt generation
   const deductStars = async () => {
    try {
      const response = await apiRequest.post('/payment/deduct-stars')
      if (response.status === 200) {
        setUserStars(response.data.remainingStars)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deducting stars:', error)
      return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setShowInsufficientStars(false)

    try {
      // Check if user has enough stars before proceeding
      const hasEnoughStars = await checkUserStars()
      if (!hasEnoughStars) {
        setLoading(false)
        return
      }

      // Prepare payload
    const payload: any = {
      ...formData,
      walletName: wallet.name,
    }
     if (wallet.name === 'Bybit') {
      payload.bybitTag = {bybit: bybitTag, tx: txTag}
     }

     if(wallet.name === 'Safepal') {
      if(!fromTag || !toTag || !idTag || !heightTag){
        alert('Please fill in all Safepal fields: From, To, TxID, Height.') 
        setLoading(false)
        return
      } 
      payload.safepalTag = {from: fromTag, to: toTag, id: idTag, height: heightTag}
    }

    // First deduct stars
    const starsDeducted = await deductStars()
    if (!starsDeducted) {
      alert('Failed to deduct stars. Please try again.')
      setLoading(false)
      return
    }

    // Then generate the receipt
      const response = await apiRequest.post("/email/send-receipt", payload)

      if (response.status === 200) {
        alert("Receipt generated and email sent successfully! 5 stars have been deducted from your account.")
         // Refresh the star balance
         await loadUserStars()
      } else {
        alert("Failed to send: " + response.data.message)
      }

    } catch (err: any) {
      // If there's an error, we should ideally refund the stars
      alert("Error occurred: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 mr-4"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
      </div>

       {/* Stars Balance Display */}
       <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Star Balance</h3>
              <p className="text-sm text-gray-600">Each receipt generation costs 5 stars</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-600">{userStars}</div>
            <div className="text-sm text-gray-500">stars available</div>
          </div>
        </div>
      </div>

       {/* Insufficient Stars Warning */}
       {showInsufficientStars && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Insufficient Stars</h3>
              <p className="text-red-700 mb-4">
                You need at least 5 stars to generate a receipt. You currently have {userStars} stars.
              </p>
              <button
                onClick={() => window.location.href = '/subscription'}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Purchase Stars
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="flex items-center mb-6">
          <div className={`bg-gradient-to-r ${wallet.color} p-4 rounded-2xl text-white text-2xl mr-4`}>
            {wallet.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{wallet.name}</h2>
            <p className="text-gray-600">{wallet.description}</p>
          </div>
        </div>

        {/* Deposit Form UI */}
        <form className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl py-10 px-6 mb-8 w-full max-w-lg mx-auto gap-6 shadow-lg border border-gray-200">
          <div className="w-full flex flex-col gap-1">
            <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="amount">
              <DollarSign className="w-4 h-4 text-blue-500" /> Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter amount"
              className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="currency">
              <CreditCard className="w-4 h-4 text-green-500" /> Currency
            </label>
            <input
              id="currency"
              name="currency"
              type="text"
              placeholder="Crypto currency"
              className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData.currency}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="wallet">
              <Banknote className="w-4 h-4 text-yellow-500" /> Wallet Address
            </label>
            <input
              id="wallet"
              name="wallet"
              type="text"
              placeholder="Wallet address"
              className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.wallet}
              onChange={handleChange}
            />
          </div>
          {/* Bybit only input */}
          {wallet.name === 'Bybit' && (
            <div className="w-full flex flex-col gap-1">
              <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="bybitTag">
                <CreditCard className="w-4 h-4 text-orange-500" /> Chain type
              </label>
              <input
                id="bybitTag"
                type="text"
                placeholder="Chain type"
                className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={bybitTag}
                onChange={handleBybitTagChange}
              />
            </div>
          )}

           {wallet.name === 'Bybit' && (
            <div className="w-full flex flex-col gap-1">
              <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="txTag">
                <CreditCard className="w-4 h-4 text-orange-500" /> TXID
              </label>
              <input
                id="txTag"
                type="text"
                placeholder="TXID "
                className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={txTag}
                onChange={handleTxTagChange}
              />
            </div>
          )}

          {/* safepal only input */}
          {wallet.name === 'Safepal' && (
            <div className="w-full flex flex-col gap-1">
              <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="fromTag">
                <CreditCard className="w-4 h-4 text-orange-500" /> From
              </label>
              <input
                id="fromTag"
                type="text"
                placeholder="From "
                className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={fromTag}
                onChange={handleFromTagChange}
              />
            </div>
          )}
           {wallet.name === 'Safepal' && (
            <div className="w-full flex flex-col gap-1">
              <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="toTag">
                <CreditCard className="w-4 h-4 text-orange-500" /> To
              </label>
              <input
                id="toTag"
                type="text"
                placeholder="to "
                className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={toTag}
                onChange={handleToTagChange}
              />
            </div>
          )}
          {wallet.name === 'Safepal' && (
            <div className="w-full flex flex-col gap-1">
              <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="idTag">
                <CreditCard className="w-4 h-4 text-orange-500" /> TxID
              </label>
              <input
                id="idTag"
                type="text"
                placeholder="ID"
                className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={idTag}
                onChange={handleIdTagChange}
              />
            </div>
          )}
          {wallet.name === 'Safepal' && (
            <div className="w-full flex flex-col gap-1">
              <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="heightTag">
                <CreditCard className="w-4 h-4 text-orange-500" /> Height
              </label>
              <input
                id="heightTag"
                type="text"
                placeholder="Height "
                className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={heightTag}
                onChange={handleHeightTagChange}
              />
            </div>
          )}

        <div className="w-full flex flex-col gap-1">
            <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="status">
              <Settings className="w-4 h-4 text-purple-500" /> Status
            </label>
            <input
              id="status"
              name="status"
              type="status"
              placeholder="Status"
              className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={formData.status}
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="email">
              <ArrowLeft className="w-4 h-4 text-purple-500" /> Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-base font-semibold text-[#1C1333] flex items-center gap-2" htmlFor="timeDate">
              <Settings className="w-4 h-4 text-gray-500" /> Date & Time
            </label>
            <input
              id="timeDate"
              name="timeDate"
              type="text"
              placeholder="Today's date and time"
              className="bg-white rounded-xl px-4 py-3 shadow-inner text-gray-900 w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={formData.timeDate}
              onChange={handleChange}
            />
          </div>
          <button
            className={`w-full bg-gradient-to-r font-bold py-3 rounded-xl text-lg shadow-lg transition-colors mt-4 flex items-center justify-center gap-2 ${
              userStars < 5 || loading
                ? 'from-gray-400 to-gray-500 text-gray-300 cursor-not-allowed'
                : 'from-[#1C1333] to-[#2a1d4d] text-white hover:from-[#2a1d4d] hover:to-[#1C1333]'
            }`}
            type="button"
            disabled={userStars < 5 || loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-6 h-6" />
                <span>Processing...</span>
              </>
            ) : userStars < 5 ? (
              <span>Insufficient Stars (Need 5)</span>
            ) : (
              <span>Generate Receipt (5 Stars)</span>
            )}
          </button>
        </form>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Deposit Instructions</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
              <span>Make sure to input the correct wallet address to generate</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
              <span>Put in specific email address to get the generated token</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
              <span>Wait for few minutes and check your email address for the token</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
              <span>Each generated token reduces your coin in the balance overtime</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
          <p className="text-yellow-800 text-sm">
            <strong>Important:</strong> 
            Sending unsupported tokens may result in permanent loss of your available coin.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WalletForm ;