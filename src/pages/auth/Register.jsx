import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BsEyeFill, BsEyeSlashFill, BsGoogle } from "react-icons/bs"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "../../firebase/config"
import Loader from "../../components/Loader"
import logo from "../../assets/logo.png"
import registerImage from "../../assets/registerImage.jpg"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2)
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const registerWithEmail = () => {
    if (password !== cPassword) {
      toast.error("Passwords don't match")
    }
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setIsLoading(false)
        toast.success("Registration successful.")
        navigate("/login")
      })
      .catch((error) => {
        // const errorCode = error.code
        // const errorMessage = error.message
        toast.error(error.message)
        setIsLoading(false)
      })
  }

  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    setIsLoading(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsLoading(false)
        toast.success("Signup Successful")
        navigate("/")
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("User closed the sign up pop-up")
        } else {
          toast.error(error.message)
        }
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

        <div className="relative z-10 w-full max-w-2xl animate-fadeUp">
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

          {/* Register Card */}
          <div className="rounded-[2.5rem] border border-amber-200/60 bg-white/70 p-8 shadow-2xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80 sm:p-12">
            <div className="mb-8 text-center">
              <h2 className="font-display text-4xl font-bold text-stone-900 dark:text-white">
                Create Account
              </h2>
              <p className="font-body mt-2 text-stone-600 dark:text-stone-400">
                Join us for a premium dates experience
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="Email"
                  className="font-body mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="font-body w-full rounded-2xl border-stone-200 bg-white/50 px-5 py-4 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="Password"
                  className="font-body mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="Password"
                    name="password"
                    className="font-body w-full rounded-2xl border-stone-200 bg-white/50 px-5 py-4 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-600 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <BsEyeSlashFill size={18} /> : <BsEyeFill size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="PasswordConfirmation"
                  className="font-body mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-300"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="font-body w-full rounded-2xl border-stone-200 bg-white/50 px-5 py-4 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-600 transition-colors"
                    onClick={togglePasswordVisibility2}
                  >
                    {showPassword2 ? <BsEyeSlashFill size={18} /> : <BsEyeFill size={18} />}
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={registerWithEmail}
                  className="font-body w-full rounded-full bg-amber-700 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-amber-900/20 transition-all hover:bg-amber-800 hover:shadow-xl active:scale-[0.98]"
                >
                  Create Account
                </button>
              </div>

              <div className="relative my-4 flex items-center justify-center sm:col-span-2">
                <div className="absolute h-[1px] w-full bg-stone-200 dark:bg-stone-700" />
                <span className="font-body relative bg-[#f9f7f4] px-4 text-xs font-medium uppercase tracking-widest text-stone-400 dark:bg-slate-800">
                  Or sign up with
                </span>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="font-body flex w-full items-center justify-center gap-3 rounded-full border-2 border-stone-900 py-3.5 text-sm font-semibold transition-all hover:bg-stone-900 hover:text-white dark:border-amber-200 dark:text-amber-200 dark:hover:bg-amber-200 dark:hover:text-stone-900"
                >
                  <BsGoogle size={18} />
                  <span>Google Account</span>
                </button>
              </div>

              <div className="sm:col-span-2">
                <p className="font-body text-center text-sm text-stone-500 dark:text-stone-400">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="font-semibold text-stone-900 underline dark:text-white">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-semibold text-stone-900 underline dark:text-white">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="font-body text-center text-sm text-stone-500 dark:text-stone-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-stone-900 hover:underline dark:text-white"
                  >
                    Log in
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

export default Register
