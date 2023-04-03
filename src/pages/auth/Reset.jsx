import { sendPasswordResetEmail } from "firebase/auth"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { auth } from "../../firebase/config"

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
      <div class="mx-auto  px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-800">
        <div class="mx-auto max-w-lg text-center">
          <h1 class="text-2xl font-bold sm:text-3xl dark:text-white">
            Password reset
          </h1>
          <p class="mt-4 text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form
          onSubmit={resetPassword}
          class="mx-auto mt-8 mb-0 max-w-md space-y-4"
        >
          <div>
            <label for="email" class="sr-only">
              Email
            </label>

            <div class="relative">
              <input
                type="email"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <span class="absolute inset-y-0 right-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">
              No account?
              <Link class="underline" to="/register">
                Sign up
              </Link>
            </p>

            <button
              type="submit"
              class="inline-block rounded-lg bg-orange-500 px-5 py-3 text-sm font-medium text-white"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Reset
