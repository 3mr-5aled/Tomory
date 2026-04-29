import React from "react"
import { Navigation } from "../../components"

const Admin = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f7f1e8] dark:bg-slate-900 font-body transition-colors duration-500 overflow-hidden relative">
      {/* Immersive Background Elements - Matching Main Website */}
      <div
        className="absolute inset-0 bg-grain opacity-60"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-amber-200/70 blur-3xl motion-safe:animate-drift"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -right-16 top-20 h-72 w-72 rounded-full bg-orange-300/40 blur-3xl motion-safe:animate-float-slow"
        aria-hidden="true"
      ></div>

      <Navigation />

      <main className="flex-1 lg:ml-72 p-4 lg:p-10 relative z-10">
        <div className="w-full animate-fadeUp">
          <div className="rounded-[2.5rem] border border-amber-200/40 bg-white/60 p-6 shadow-2xl shadow-amber-900/5 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/60 lg:p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin
