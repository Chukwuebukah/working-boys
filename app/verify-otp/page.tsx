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
    <div className="flex flex-row h-screen justify-center items-center ">
      <div className="w-full max-w-md px-6 space-y-6">
            {/* New Password */}
            <input
              type="otp"
              placeholder="your otp"
              required
              className="w-full border rounded px-3 py-2"
              value={otp} onChange={(e) => setOtp(e.target.value)} 
            />
            {/* Confirm Password */}
            {/* Submit Button */}
            <button onClick={handleVerify}
              disabled={isLoading}
              type="submit"
              className="w-[80%] bg-[#1C1333] text-white font-bold p-4"
            >
              {isLoading ? "Loading..." : "Verify OTP"}
              
            </button>
            {/* Error/Success Display */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>
    </div>
  )
}
