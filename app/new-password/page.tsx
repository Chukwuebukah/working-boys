"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiRequest from "../lib/apiRequest";

const Page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
  
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
  
    try {
      const res = await apiRequest.post("/auth/reset-password", {
        email,
        password: newPassword,
      });
  
      setSuccess("Password changed successfully!");
      
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
  
    } catch (err: any) {
      setError(err?.response?.data?.message || "Password change failed.");
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
        {/* Change Password Form */}
        <form
          className="flex flex-1 flex-col items-center justify-center gap-8"
          onSubmit={handleChangePassword}
        >
          <div className="w-full max-w-md px-6 space-y-6">
            {/* New Password */}
            <input
              type="password"
              placeholder="New password"
              required
              className="w-full border rounded px-3 py-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm new password"
              required
              className="w-full border rounded px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-[80%] bg-[#1C1333] text-white font-bold p-4"
            >
              {isLoading ? "Loading..." : "CHANGE PASSWORD"}
              
            </button>
            {/* Error/Success Display */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
