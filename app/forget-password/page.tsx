'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiRequest from '../lib/apiRequest';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await apiRequest.post('/auth/request-otp', {
        email,
      });
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`); 
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Left Side */}
      <div className="bg-[#1C1333] w-[40%] flex flex-col items-center justify-center gap-8 p-6">
        <h1 className="text-2xl text-white mb-4 font-bold">CRYPTOTOKEN</h1>
        <img
          className="w-[20%] max-w-[120px]"
          src="/image 4.png"
          alt="Crypto Token"
        />
        <p className="text-white text-center text-base">
          Easily create a token without any <br />
          programming knowledge!
        </p>
        <p className="text-white text-center text-sm">
          Lorem ipsum dolor sit amet,
          <br />
          consectetur adipiscing elit, sed do
          <br />
          eiusmod tempor incididun.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-[60%] flex flex-col">
        {/* Top Nav */}
        <div className="flex justify-between items-center px-10 py-6">
          <button className="text-[#424242] px-4 py-2 rounded hover:bg-gray-300 transition">
            <a href="/sign-in">Return Home</a>
          </button>
        </div>
        {/* Login Form */}
        <form
          className="flex flex-1 flex-col items-center justify-center gap-8"
          onSubmit={handleSubmit}
        >          <div className="w-full max-w-md px-6 space-y-6">
            {/* Email */}
            <label className="input validator flex items-center gap-2 border rounded px-3 py-2">
              <svg
                className="h-5 w-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
        

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-[80%] bg-[#24243E] text-white font-bold p-4"
            >Send OTP
            </button>

            {/* Error Display */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
