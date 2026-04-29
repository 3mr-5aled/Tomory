import { sendPasswordResetEmail } from "firebase/auth"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { auth } from "../../firebase/config"
import logo from "../../assets/logo.png"

function Reset() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const resetPassword = (e) => {
    e.preventDefault()
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setIsLoading(false)
        toast.success("Check your email for reset link")
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className="relative flex min-h-[calc(100dvh-5rem)] items-center justify-center overflow-hidden bg-[#f3eadf] px-6 py-12 dark:bg-slate-900">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-20" />
        <div className="absolute -left-20 -top-20 h-96 w-96 animate-drift rounded-full bg-amber-200/40 blur-[100px] dark:bg-amber-900/20" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 animate-drift rounded-full bg-orange-200/30 blur-[100px] dark:bg-orange-900/10" />

        <div className="relative z-10 w-full max-w-lg animate-fadeUp">
          {/* Logo/Brand */}
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <Link to="/" className="group flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-xl transition-transform duration-500 group-hover:rotate-12 dark:bg-slate-800">
                <img src={logo} alt="Tomory Logo" className="h-full w-full object-contain" />
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 dark:text-amber-50">
                Tomory
              </h1>
            </Link>
          </div>

          {/* Reset Card */}
          <div className="rounded-[2.5rem] border border-amber-200/60 bg-white/70 p-8 shadow-2xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80 sm:p-12">
            <div className="mb-8 text-center">
              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-white">
                Reset Password
              </h2>
              <p className="font-body mt-2 text-stone-600 dark:text-stone-400">
                Enter your email address to receive a reset link
              </p>
            </div>

            <form onSubmit={resetPassword} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="font-body mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="font-body w-full rounded-2xl border-stone-200 bg-white/50 px-5 py-4 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="font-body w-full rounded-full bg-amber-700 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-amber-900/20 transition-all hover:bg-amber-800 hover:shadow-xl active:scale-[0.98]"
              >
                Send Reset Link
              </button>

              <div className="pt-4 text-center">
                <p className="font-body text-sm text-stone-500 dark:text-stone-400">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-stone-900 hover:underline dark:text-white"
                  >
                    Back to Login
                  </Link>
                </p>
                <p className="font-body mt-2 text-sm text-stone-500 dark:text-stone-400">
                  No account?{" "}
                  <Link
                    to="/register"
                    className="font-bold text-stone-900 hover:underline dark:text-white"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Reset
