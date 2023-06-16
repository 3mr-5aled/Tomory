import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BsEyeFill, BsEyeSlashFill, BsGoogle } from "react-icons/bs"
import logo from "../../assets/logo.png"
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../../firebase/config"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "../../components/Loader"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  /**
   * Logs in a user with the provided email and password using Firebase authentication.
   * @param {Event} e - The event object.
   * @returns None
   */

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const logInWithEmail = () => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user
        setIsLoading(false)
        toast.success("Login Successful..")
        navigate("/")
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      })
  }

  /**
   * Creates a new GoogleAuthProvider and signs in the user with Google.
   * @returns None
   */
  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    setIsLoading(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsLoading(false)
        toast.success("Login Successful")
        navigate("/")
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("User closed the sign in pop-up")
        } else {
          toast.error(error.message)
        }
        console.log(error)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
            Tomory
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-orange-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-orange-500"
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
                <div className="flex items-center justify-center w-full">
                  {/* <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div> */}
                  <Link
                    to="/reset"
                    className="text-sm font-medium text-grey-600 hover:underline dark:text-primary-500 dark:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  onClick={logInWithEmail}
                  className="inline-block rounded-lg border-2 border-orange-600 bg-white p-2 font-medium text-orange-600 transition hover:bg-orange-600 hover:text-white focus:outline-none focus:ring active:text-orange-500 w-full"
                >
                  Sign in
                </button>
                <p className="text-black dark:text-white text-center">
                  {" "}
                  --- or ---
                </p>
                <div
                  id="loginWithGoogle"
                  className="shadow bg-[orangered] flex flex-row justify-center items-center col-span-6 w-full p-2 rounded-lg text-white hover:text-orange-600 hover:bg-white cursor-pointer transition border-[orangered] border-2 "
                >
                  <BsGoogle />
                  <button className="px-2" onClick={signInWithGoogle}>
                    Sign in with Google
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-white"
                  >
                    {" "}
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
