import React, { useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import {
  BsArrowLeft,
  BsBagFill,
  BsBagPlusFill,
  BsBox2Fill,
  BsCardHeading,
  BsClipboardDataFill,
  BsFillMoonStarsFill,
  BsFillSunFill,
} from "react-icons/bs"
import { Link, NavLink } from "react-router-dom"
import avatar from "../../assets/avatar.png"
import { useSelector } from "react-redux"
import {
  selectIsAdmin,
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
} from "../../redux/slice/authSlice"

const Navigation = () => {
  const userName = useSelector(selectUserName)
  const userEmail = useSelector(selectUserEmail)
  const isAdmin = useSelector(selectIsAdmin)
  const userPhoto = useSelector(selectUserPhoto)
  const [Collapsed, setCollapsed] = useState(true)
  const [CollapsedPMenu, setCollapsedPMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(Boolean ? Boolean : undefined)

  const collapse = () => {
    setCollapsed(!Collapsed)
  }
  const collapsePMenu = () => {
    setCollapsedPMenu(!CollapsedPMenu)
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Signout Successful")
        setUserName2("")
        dispatch(REMOVE_ACTIVE_USER())
        navigate("/")
      })
      .catch((error) => {
        toast.error(error.message)
        // An error happened.
      })
  }
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

  const activeLink = ({ isActive }) => {
    return isActive
      ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
      : "flex items-center p-2 text-gray-700 rounded-lg dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500"
  }

  return (
    <>
      <button
        data-drawer-target="cta-button-sidebar"
        data-drawer-toggle="cta-button-sidebar"
        aria-controls="cta-button-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="cta-button-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 dark:text-white"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div>
            <div className="flex flex-row items-center justify-between mb-5">
              <a href="/" className="flex items-center pl-2.5 cursor-pointer">
                <img
                  src={logo}
                  className="h-6 mr-3 sm:h-7 rotate-12 bg-white rounded-full"
                  alt="Tomory Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Tomory
                </span>
              </a>
              <button className="text-orange-600" onClick={switchMode}>
                {/* switching darkmode */}
                {!darkMode ? (
                  <BsFillMoonStarsFill size={20} />
                ) : (
                  <BsFillSunFill size={20} />
                )}
              </button>
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <NavLink to="/admin/dashboard" className={activeLink}>
                  {/* <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg> */}
                  <BsClipboardDataFill />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Dashboard
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/create" className={activeLink}>
                  {/* <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg> */}
                  <BsBagPlusFill />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Create Products
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    New
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink className={activeLink} to="/admin/product_view">
                  {/* <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg> */}
                  <BsBagFill />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Products
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className={activeLink} to="/admin/orders">
                  {/* <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg> */}
                  <BsBox2Fill />
                  <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="relative self-end">
            <button>
              <img
                className="bg-orange-300 rounded-full h-10 w-10 hover:border-gray-500 hover:border-2 float-right"
                src={userPhoto || avatar}
                alt=""
                onClick={collapsePMenu}
              />
            </button>
            <div
              className={`z-50 ${
                !CollapsedPMenu ? "hidden" : "block"
              } absolute right-0 bottom-7 my-5 whitespace-nowrap font-bold text-base list-none bg-gray-300 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {userName || "User"}
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  {userEmail || "user@gmail.com"}
                </span>
              </div>
              <ul className="py-2">
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Back to Homepage
                </a>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navigation
