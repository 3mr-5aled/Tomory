import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { BsArrowLeft, BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"
import { CreateProducts, Products, UpdateProducts } from "../components"
import logo from "../assets/logo.png"

const Admin = () => {
  const [darkMode, setDarkMode] = useState(Boolean ? Boolean : undefined)

  const switchMode = () => {
    setDarkMode(!darkMode)
  }
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true")
      window.document.documentElement.classList.add("dark")
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false")
      window.document.documentElement.classList.remove("dark")
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true")
    }
  }, [darkMode])

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div>
            <div className="flex flex-row items-center justify-between">
              <a href="/" class="flex items-center pl-2.5 mb-5">
                <img src={logo} class="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Ecommercy
                </span>
              </a>
              <button
                button
                className="text-blue-600 mb-5"
                onClick={switchMode}
              >
                {/* switching darkmode */}
                {!darkMode ? (
                  <BsFillMoonStarsFill size={20} />
                ) : (
                  <BsFillSunFill size={20} />
                )}
              </button>
            </div>
            <ul class="space-y-2">
              <li>
                <NavLink
                  to="#"
                  class="flex flex-row flex-nowrap items-center py-3 px-2 font-normal  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="inline w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span class="ml-3 inline">Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="#"
                  class="flex flex-row flex-nowrap items-center py-3 px-2 font-normal  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="inline flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap inline">
                    Products
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  class="flex flex-row flex-nowrap items-center py-3 px-2 font-normal  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="inline flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap inline">
                    Create Product
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
          <a
            href="/"
            className=" bg-blue-600 text-white p-3 rounded-xl self-auto text-center flex flex-row items-center"
          >
            <BsArrowLeft size={20} />
            <p className="pl-3">Back to the Website</p>
          </a>
        </div>
      </aside>

      <div class="p-4 sm:ml-64 dark:bg-slate-700">
        <div class="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-400">
          <CreateProducts />
          <UpdateProducts />
          <Products />
        </div>
      </div>
    </>
  )
}

export default Admin
