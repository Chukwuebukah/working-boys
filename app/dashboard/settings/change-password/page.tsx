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

// Sidebar Component (responsive)
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Deposit", href: "/dashboard/deposit", icon: DollarSign },
    { name: "Withdraw", href: "/dashboard/withdraw", icon: Banknote },
    { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon }
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1C1333] p-2 rounded shadow-lg text-white"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <LayoutDashboard className="w-6 h-6" />
      </button>
      {/* Sidebar for desktop */}
      <aside
        className="hidden md:block fixed left-0 top-0 h-full w-64 shadow-lg z-40 text-white"
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
      {/* Sidebar Drawer for mobile */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex">
          <aside
            className="w-64 h-full bg-[#1C1333] shadow-lg text-white flex flex-col"
          >
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold">CryptoToken</h2>
              <button onClick={() => setOpen(false)} aria-label="Close sidebar">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col mt-4">
              {links.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center px-6 py-3 text-sm hover:bg-[#29224b] transition-colors ${
                    pathname === href ? "bg-[#29224b]" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {name}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
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
    <div className="min-h-screen bg-gray-50 w-full md:ml-64 p-2 xs:p-4 sm:p-6 flex flex-col items-center justify-center">
      <Sidebar />
      <button
        onClick={() => router.back()}
        className="mb-6 xs:mb-8 p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-4 xs:p-6 sm:p-8">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Old Password</label>
            <input
              type="password"
              className="w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1C1333] text-white font-bold py-2 xs:py-3 rounded-lg text-base xs:text-lg shadow hover:bg-[#2a1d4d] transition-colors"
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