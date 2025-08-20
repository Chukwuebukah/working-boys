'use client';
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import apiRequest from "../lib/apiRequest";


export default function VerifyOTP() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleVerify = async () => {
        try {
            const res = await apiRequest.post('/auth/verify-otp', {
                email, otp
              });
              router.push(`/new-password?email=${encodeURIComponent(email)}`);
        } catch (err: any){
            setError(err?.response?.data?.message || 'OTP invalid');
        }
        finally {
          setIsLoading(false);
        }
    };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <div className="w-full max-w-md space-y-4 xs:space-y-6">
        <h1 className="text-xl xs:text-2xl font-bold text-center mb-4 xs:mb-6">Verify OTP</h1>
        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter your OTP"
          required
          className="w-full border rounded px-3 py-2 text-center text-lg tracking-wider"
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
        />
        {/* Submit Button */}
        <button 
          onClick={handleVerify}
          disabled={isLoading}
          type="submit"
          className="w-full bg-[#1C1333] text-white font-bold p-3 xs:p-4 rounded"
        >
          {isLoading ? "Loading..." : "Verify OTP"}
        </button>
        {/* Error Display */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  )
}
