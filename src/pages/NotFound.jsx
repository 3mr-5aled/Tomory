import React from "react"
import { DarkModeButton } from "../components"

function NotFound() {
  return (
    <div class="grid h-screen px-4 bg-white dark:bg-slate-800 place-content-center">
      <div class="text-center">
        <div className="hidden">
          <DarkModeButton />
        </div>
        <h1 class="font-black text-gray-200 text-9xl">404</h1>

        <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Uh-oh!
        </p>

        <p class="mt-4 text-gray-500 dark:text-gray-200">
          We can't find that page.
        </p>

        <a
          href="/"
          class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-orange-600 rounded hover:bg-orange-400 focus:outline-none focus:ring"
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}

export default NotFound
