import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BsGoogle } from "react-icons/bs"
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

  const navigate = useNavigate()

  /**
   * Logs in a user with the provided email and password using Firebase authentication.
   * @param {Event} e - The event object.
   * @returns None
   */

  const loginUser = (e) => {
    e.preventDefault()
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
  const signinWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user
        toast.success("Login Successful")
        navigate("/")
      })
      .catch((error) => {
        toast.success(error.message)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
            Tomory
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={loginUser}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-orange-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-orange-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/reset"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-black dark:text-white text-center">
                  {" "}
                  --- or ---
                </p>
                <div
                  id="loginWithGoogle"
                  className="shadow bg-[orangered] flex flex-row justify-center items-center col-span-6 w-full p-2 rounded-lg text-white "
                >
                  <BsGoogle />
                  <button className="px-2" onClick={signinWithGoogle}>
                    Sign in with Google
                  </button>
                </div>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <Link
                    to="/register"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-white"
                  >
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
