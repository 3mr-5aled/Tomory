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
      <section className="bg-white dark:bg-slate-800">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src={registerImage}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12 bg-gradient-to-t from-black to-transparent">
              <div className="">
                <a href="#" className="flex items-center">
                  <img
                    src={logo}
                    className="h-24 mr-3 rotate-12 bg-white rounded-full"
                    alt=""
                  />
                </a>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Welcome to Tomory
                </h2>

                <p className="mt-4 leading-relaxed text-white/90">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p>
              </div>
            </div>
          </section>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-orange-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <img src={logo} alt="logo" className="rotate-12" />
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                  Welcome to Tomory
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500 dark:text-white">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p>
              </div>

              <h2 className="text-center text-3xl font-bold dark:text-white mt-6">
                Sign up
              </h2>
              <form
                onSubmit={handleSubmit}
                className="mt-4 grid grid-cols-6 gap-6"
              >
                {/* <div className="col-span-6 sm:col-span-3">
                <label
                  for="FirstName"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="LastName"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div> */}

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="Password"
                      name="password"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700  shadow-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                    </button>
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Password Confirmation
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      id="PasswordConfirmation"
                      name="password_confirmation"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      value={cPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                      onClick={togglePasswordVisibility2}
                    >
                      {showPassword2 ? <BsEyeSlashFill /> : <BsEyeFill />}
                    </button>
                  </div>
                </div>

                {/* <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700 dark:text-white">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </span>
                  </label>
                </div> */}
                <div
                  id="loginWithGoogle"
                  className="shadow flex flex-row justify-center items-center col-span-6 w-full p-2 rounded-lg cursor-pointer  border-2 border-orange-600 bg-white px-12 py-3 text-sm font-medium text-orange-600 transition hover:bg-orange-600 hover:text-white focus:outline-none focus:ring active:text-orange-500"
                >
                  <button
                    onClick={registerWithEmail}
                    className="block w-full shrink-0 rounded-md "
                  >
                    Create an account
                  </button>
                </div>
                <p className="block col-span-full text-black dark:text-white text-center w-full">
                  {" "}
                  --- or ---
                </p>
                <div
                  id="loginWithGoogle"
                  className="shadow bg-[orangered] flex flex-row justify-center items-center col-span-6 w-full p-2 rounded-lg text-white hover:text-orange-600 hover:bg-white cursor-pointer transition border-[orangered] border-2"
                >
                  <BsGoogle />
                  <button className="px-2" onClick={signInWithGoogle}>
                    Sign up with Google
                  </button>
                </div>
                <div className="col-span-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By creating an account, you agree to our{" "}
                    <a
                      href="#"
                      className="text-gray-700 dark:text-white underline"
                    >
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-gray-700 dark:text-white underline"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-gray-700 dark:text-white underline"
                    >
                      Log in
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  )
}

export default Register
