import React, { useState } from "react"
import {
  BsBagFill,
  BsBagPlusFill,
  BsBox2Fill,
  BsClipboardDataFill,
  BsList,
  BsX,
  BsArrowLeftCircleFill,
} from "react-icons/bs"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import avatar from "../../assets/avatar.png"
import logo from "../../assets/logo.png"
import {
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
} from "../../redux/slice/authSlice"
import DarkModeButton from "../features/DarkModeButton"

const Navigation = () => {
  const userName = useSelector(selectUserName)
  const userEmail = useSelector(selectUserEmail)
  const userPhoto = useSelector(selectUserPhoto)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const navLinks = [
    {
      to: "/admin/dashboard",
      icon: <BsClipboardDataFill />,
      label: "Dashboard",
    },
    { to: "/admin/products", icon: <BsBagFill />, label: "Products" },
    {
      to: "/admin/create-product",
      icon: <BsBagPlusFill />,
      label: "Create Product",
      badge: "New",
    },
    { to: "/admin/orders", icon: <BsBox2Fill />, label: "Orders" },
  ]

  const activeLink = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
      isActive
        ? "bg-amber-600 text-white shadow-lg shadow-amber-900/20"
        : "text-slate-500 hover:bg-amber-50 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-amber-700 dark:hover:text-amber-400"
    }`

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl lg:hidden border border-amber-100 dark:border-slate-700"
      >
        {isSidebarOpen ? <BsX size={24} /> : <BsList size={24} />}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 transform transition-transform duration-500 ease-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col bg-white dark:bg-slate-900 border-r border-amber-100 dark:border-slate-800 relative overflow-hidden">
          {/* Grain & Blurs */}
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

          {/* Logo Section */}
          <div className="relative z-10 px-8 py-10">
            <a href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-100 dark:border-slate-700 group-hover:rotate-12 transition-transform duration-500">
                <img src={logo} className="h-8 w-auto" alt="Tomory Logo" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-amber-900 dark:text-white">
                Tomory<span className="text-amber-600">.</span>
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="relative z-10 flex-1 px-4 space-y-2">
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
              Management
            </p>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={activeLink}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-body font-semibold tracking-wide flex-1">
                  {link.label}
                </span>
                {link.badge && (
                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer / User Profile */}
          <div className="relative z-10 p-4 border-t border-amber-50 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4 px-2">
              <DarkModeButton />
              <a
                href="/"
                className="p-2 text-slate-400 hover:text-amber-600 transition-colors"
                title="Back to Store"
              >
                <BsArrowLeftCircleFill size={20} />
              </a>
            </div>

            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex w-full items-center gap-3 p-3 rounded-2xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-100/50 dark:border-slate-700/50 transition-all hover:bg-amber-50 dark:hover:bg-slate-800"
            >
              <img
                src={userPhoto || avatar}
                className="h-10 w-10 rounded-xl object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                alt="Profile"
              />
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-bold text-amber-900 dark:text-white truncate">
                  {userName || "Admin"}
                </p>
                <p className="text-[10px] font-medium text-slate-400 truncate uppercase tracking-widest">
                  Administrator
                </p>
              </div>
            </button>

            {/* Profile Popup */}
            {showProfile && (
              <div className="absolute bottom-24 left-4 right-4 p-4 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border border-amber-100 dark:border-slate-700 animate-fadeUp">
                <p className="text-xs font-bold text-amber-900 dark:text-amber-500 mb-1">
                  Signed in as:
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate mb-4">
                  {userEmail}
                </p>
                <button
                  onClick={() => setShowProfile(false)}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navigation
