import React from "react"
import { useNavigate } from "react-router-dom"
import { BsArrowLeft, BsHouseFill } from "react-icons/bs"

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="relative grid h-screen px-4 bg-[#f7f1e8] dark:bg-slate-900 place-content-center font-body overflow-hidden">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.15] dark:opacity-[0.05]" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 animate-float-slow rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-900/10" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[32rem] w-[32rem] animate-drift rounded-full bg-orange-100/30 blur-[100px] dark:bg-slate-800/20" />

      <div className="relative z-10 text-center">
        <h1 className="font-display text-[12rem] font-black text-amber-900/5 dark:text-white/5 leading-none select-none">
          404
        </h1>

        <div className="-mt-20">
          <h2 className="font-display text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl dark:text-white">
            Lost in the Harvest?
          </h2>

          <p className="mt-6 text-lg text-amber-900/60 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for seems to have vanished like morning
            mist. Let's get you back to the warmth of our collection.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center justify-center gap-3 rounded-full bg-amber-700 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-xl shadow-amber-900/20 transition-all hover:-translate-y-1 hover:bg-amber-800 active:scale-95"
            >
              <BsHouseFill className="text-lg" />
              Go Back Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center gap-3 rounded-full border-2 border-amber-900/20 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-amber-900 transition-all hover:bg-amber-900 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 active:scale-95"
            >
              <BsArrowLeft className="text-lg transition-transform group-hover:-translate-x-1" />
              Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
