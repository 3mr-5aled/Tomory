import React, { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import {
  BsFillCartFill,
  BsFillMoonStarsFill,
  BsFillSunFill,
} from "react-icons/bs"
import logo from "../assets/logo.png"
import avatar from "../assets/avatar.png"
import { auth } from "../firebase/config"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../redux/slice/authSlice"
import ShowOnLogin, { ShowOnLogout } from "./hiddenLinks"
import {
  selectIsLoggedIn,
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
} from "../redux/slice/authSlice"

const Header = () => {
  // const [isCollapsed, setIsCollapsed] = useState(true)
  const [Collapsed, setCollapsed] = useState(true)
  const [CollapsedPmenu, setCollapsedPmenu] = useState(false)
  const [darkMode, setDarkMode] = useState(Boolean ? Boolean : undefined)
  const [isAdmin, setIsAdmin] = useState(false)
  // const [isLogged, setIsLogged] = useState(false)
  const [userName, setUserName] = useState("")
  // const [userEmail, setUserEmail] = useState("")
  // const [userPhoto, setUserPhoto] = useState("")
  const user = useSelector(selectUserName)
  const userEmail = useSelector(selectUserEmail)
  const userPhoto = useSelector(selectUserPhoto)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const collapse = () => {
    setCollapsed(!Collapsed)
  }
  const collapsePmenu = () => {
    setCollapsedPmenu(!CollapsedPmenu)
  }
  const switchMode = () => {
    setDarkMode(!darkMode)
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Signout Successful")
        setUserName("")
        dispatch(REMOVE_ACTIVE_USER())
        navigate("/")
      })
      .catch((error) => {
        toast.error(error.message)
        // An error happened.
      })
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"))
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          setUserName(uName)
        } else {
          setUserName(user.displayName)
        }

        if (user.email == "moroamr2005@gmail.com") {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }

        // const uid = user.uid
        // const displayName = user.displayName
        // const email = user.email
        // const photoURL = user.photoURL
        // setUserName(displayName)
        // setUserEmail(email)
        // setUserPhoto(photoURL)
        // setIsLogged(true)

        dispatch(
          SET_ACTIVE_USER({
            userID: user.uid,
            userName: user.displayName ? user.displayName : userName,
            userEmail: user.email,
            userPhoto: user.photoURL,
          })
        )
      } else {
        setUserName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    })
  }, [dispatch, userName])

  const activeLink = ({ isActive }) => {
    return isActive
      ? "block font-bold py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white underline underline-offset-4 decoration-blue-700 decoration-3 decoration-wavy"
      : "block font-bold py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
  }

  // Dark mode

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
    <header aria-label="Site Header" className="bg-gray-100 dark:bg-slate-700">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="flex flex-row items-center text-blue-600" to="/">
              <span className="sr-only">Home</span>
              <img className="h-10 w-10 mr-3" src={logo} alt="" />
              <span className="font-bold text-xl">Ecommercy</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <NavLink className={activeLink} to="/">
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink className={activeLink} to="/products">
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink className={activeLink} to="/contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-blue-600" onClick={switchMode}>
              {/* switching darkmode */}
              {!darkMode ? (
                <BsFillMoonStarsFill size={20} />
              ) : (
                <BsFillSunFill size={20} />
              )}
            </button>
            {/* switching navbar components on login */}
            <ShowOnLogin>
              <div className="relative flex flex-row items-center">
                <NavLink className="relative mr-5 text-blue-600" to="/cart">
                  <BsFillCartFill size={25} />
                  <p className="absolute -top-3.5 -right-1.5 font-bold">0</p>
                </NavLink>
                <button>
                  <img
                    className="bg-blue-300 rounded-full h-10 w-10 hover:border-gray-500 hover:border-2"
                    src={userPhoto || avatar}
                    alt=""
                    onClick={collapsePmenu}
                  />
                </button>
                <div
                  className={`z-50 ${
                    !CollapsedPmenu ? "hidden" : "block"
                  } absolute right-0 top-7 my-4 whitespace-nowrap font-bold text-base list-none bg-gray-300 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
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
                    {isAdmin ? (
                      <a
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    ) : (
                      ""
                    )}

                    <NavLink
                      to="/myorders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      My Orders
                    </NavLink>

                    <NavLink
                      to="/orderhistory"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Order History
                    </NavLink>

                    <NavLink
                      onClick={logoutUser}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </NavLink>
                  </ul>
                </div>
              </div>
            </ShowOnLogin>
            <ShowOnLogout>
              <div className="sm:flex sm:gap-4">
                <NavLink
                  className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  to="/login"
                >
                  Login
                </NavLink>

                <div className="hidden sm:flex">
                  <NavLink
                    className="rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-blue-600 dark:bg-gray-100"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </div>
              </div>
            </ShowOnLogout>
            <div className="block md:hidden">
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={collapse}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${!Collapsed ? "hidden" : "block"} md:hidden`}>
        <nav aria-label="Site Nav">
          <ul className="flex justify-center items-center gap-6 text-sm mt-5 pb-5">
            <li>
              <NavLink
                className="text-gray-500 transition font-bold bg-white p-2 rounded-xl dark:text-gray-400 dark:hover:text-white hover:text-black"
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                className="text-gray-500 transition font-bold bg-white p-2 rounded-xl dark:text-gray-400 dark:hover:text-white hover:text-black"
                to="/products"
              >
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                className="text-gray-500 transition font-bold bg-white p-2 rounded-xl dark:text-gray-400 dark:hover:text-white hover:text-black"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
