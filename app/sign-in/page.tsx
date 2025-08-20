'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/AuthContext';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await apiRequest.post('/auth/login', {
        email,
        password,
      });

      updateUser(res.data);
      router.push('/dashboard'); // ✅ Redirect to dashboard after login
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="bg-[#1C1333] w-full md:w-[40%] flex flex-col items-center justify-center gap-8 p-6">
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
      <div className="w-full md:w-[60%] flex flex-col">
        {/* Top Nav */}
        <div className="flex flex-col xs:flex-row justify-between items-center px-4 xs:px-8 sm:px-10 py-4 xs:py-6 gap-2 xs:gap-0">
          <button className="text-[#424242] px-4 py-2 rounded hover:bg-gray-300 transition">
            <a href="/">Return Home</a>
          </button>
          <p className="text-center text-[#424242] text-sm xs:text-base">
            Not A User?{' '}
            <a href="/sign-up" className="text-black hover:underline">
              JOIN NOW
            </a>
          </p>
        </div>

        {/* Login Form */}
        <form
          className="flex flex-1 flex-col items-center justify-center gap-6 xs:gap-8"
          onSubmit={handleSubmit}
        >
          <h1 className="text-black text-3xl xs:text-4xl font-bold">LOG IN</h1>
          <div className="w-full max-w-md px-4 xs:px-6 space-y-4 xs:space-y-6">
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
                placeholder="mail@site.com"
                required
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {/* Password */}
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
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full xs:w-[80%] bg-[#24243E] text-white font-bold p-3 xs:p-4"
            >
              {isLoading ? 'Loading...' : 'PROCEED →'}
            </button>

            {/* Error Display */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="text-center">
              <a href='/forget-password' >Forgot Password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
