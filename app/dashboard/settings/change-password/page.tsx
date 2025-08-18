"use client";

import { useContext, useState } from "react";
import { usePathname } from 'next/navigation'
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";
import apiRequest from "../../../lib/apiRequest";
import {
  LayoutDashboard,
  DollarSign,
  Banknote,
  CreditCard,
  Settings as SettingsIcon
} from "lucide-react";
import Link from "next/link";

// Sidebar Component
const Sidebar = () => {
  const pathname = useRouter().pathname;
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Deposit", href: "/dashboard/deposit", icon: DollarSign },
    { name: "Withdraw", href: "/dashboard/withdraw", icon: Banknote },
    { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon }
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 shadow-lg z-40 text-white"
      style={{ backgroundColor: "#1C1333" }}
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
              pathname === href ? "bg-[#29224b]" : ""
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

// ChangePassword Component
const ChangePassword = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    console.log("currentUser:", currentUser);
    console.log("Calling: ", `/users/${currentUser.id}/change-password`);
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}/change-password`, {
        oldPassword,
        newPassword
      });

      updateUser(res.data);
      setSuccess("Password changed successfully.");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64 flex flex-col items-center justify-center">
      <Sidebar />
      <button
        onClick={() => router.back()}
        className="mb-8 p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Old Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1C1333] text-white font-bold py-3 rounded-lg text-lg shadow hover:bg-[#2a1d4d] transition-colors"
          >
            Change Password
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;