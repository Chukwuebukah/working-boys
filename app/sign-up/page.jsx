'use client';

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { username, email, password } = formData;

    try {
      await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      router.push("/sign-in");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="bg-[#1C1333] w-full md:w-[40%] flex flex-col items-center justify-center gap-8 p-6">
        <h1 className="text-2xl text-white mb-4 font-bold">CRYPTOTOKEN</h1>
        <Image
          className="w-[20%] max-w-[120px]"
          src="/image 4.png"
          alt="Crypto Token"
          width={120}
          height={120}
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
            <Link href="/">Return Home</Link>
          </button>
          <p className="text-[#424242] text-sm xs:text-base">
            Already Have an Account?{" "}
            <Link href="/sign-in" className="text-black hover:underline">
              LOG IN NOW
            </Link>
          </p>
        </div>

        {/* Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col items-center justify-center gap-6 xs:gap-8"
        >
          <h1 className="text-black text-3xl xs:text-4xl font-bold">SIGN UP</h1>
          <div className="w-full max-w-md px-4 xs:px-6 space-y-4 xs:space-y-6">
            {/* Username */}
            <label className="flex items-center gap-2 border rounded px-3 py-2">
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full outline-none"
              />
            </label>

            {/* Email */}
            <label className="flex items-center gap-2 border rounded px-3 py-2">
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@site.com"
                required
                className="w-full outline-none"
              />
            </label>

            {/* Password */}
            <label className="flex items-center gap-2 border rounded px-3 py-2">
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full outline-none"
              />
            </label>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full xs:w-[80%] bg-[#24243E] text-white font-bold p-3 xs:p-4"
            >
              {isLoading ? "Registering..." : "PROCEED →"}
            </button>

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
