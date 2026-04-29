import { onAuthStateChanged, signOut } from "firebase/auth"
import React, { useEffect, useState } from "react"
import {
  BsFillCartFill,
  BsFillMoonStarsFill,
  BsFillSunFill,
} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import avatar from "../../assets/avatar.png"
import logo from "../../assets/logo.png"
import { auth } from "../../firebase/config"
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
  selectIsAdmin,
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
} from "../../redux/slice/authSlice"
import { selectCartItems } from "../../redux/slice/cartSlice"
import ShowOnLogin, { ShowOnLogout } from "./hiddenLinks"
import DarkModeButton from "../features/DarkModeButton"

const Header = () => {
  const userName = useSelector(selectUserName)
  const userEmail = useSelector(selectUserEmail)
  const userPhoto = useSelector(selectUserPhoto)
  const isAdmin = useSelector(selectIsAdmin)
  const cartItems = useSelector(selectCartItems)
  const [Collapsed, setCollapsed] = useState(false)
  const [CollapsedPMenu, setCollapsedPMenu] = useState(false)
  const [userNameState, setUserName] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const collapse = () => {
    setCollapsed(!Collapsed)
  }
  const collapsePMenu = () => {
    setCollapsedPMenu(!CollapsedPMenu)
  }

  // ! Getting user information

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

        dispatch(
          SET_ACTIVE_USER({
            isLoggedIn: true,
            userID: user.uid,
            userName: user.displayName ? user.displayName : userNameState,
            userEmail: user.email,
            userPhoto: user.photoURL,
          })
        )
      } else {
        setUserName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    })
  }, [dispatch, userNameState])

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

  const activeLink = ({ isActive }) => {
    const baseClasses = "px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out"
    return isActive
      ? `${baseClasses} text-amber-900 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-100`
      : `${baseClasses} text-stone-600 rounded-full hover:bg-amber-50 md:hover:text-amber-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/30 bg-white/80 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/80 font-body">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="flex items-center gap-3 group" to="/">
              <span className="sr-only">Home</span>
              <div className="p-1 bg-white rounded-full shadow-sm border border-amber-100 group-hover:border-amber-200 transition-colors">
                <img
                  className="h-10 w-10 object-contain rounded-full transition-transform group-hover:scale-110"
                  src={logo}
                  alt="Tomory Logo"
                />
              </div>
              <span className="font-display text-2xl font-semibold tracking-tight text-stone-800 dark:text-white">
                Tomory
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex items-center gap-2">
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
            <DarkModeButton />
            {/* switching navbar components on login */}
            <ShowOnLogin>
              <div className="relative flex items-center gap-2">
                <NavLink
                  className="relative p-2 text-stone-600 hover:text-amber-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                  to="/cart"
                >
                  <BsFillCartFill size={22} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>

                <div className="relative">
                  <button
                    onClick={collapsePMenu}
                    className="flex items-center gap-2 p-1 rounded-full border border-amber-100 hover:border-amber-300 transition-all dark:border-slate-700 dark:hover:border-slate-500"
                  >
                    <img
                      className="h-9 w-9 rounded-full object-cover"
                      src={userPhoto || avatar}
                      alt="User avatar"
                    />
                  </button>
                  <div
                    className={`z-50 ${
                      !CollapsedPMenu ? "hidden" : "block"
                    } absolute right-0 top-full mt-2 w-56 divide-y divide-amber-100 rounded-2xl border border-amber-100 bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800/95`}
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm font-semibold text-stone-900 dark:text-white">
                        {userName || "User"}
                      </span>
                      <span className="block text-xs text-stone-500 truncate dark:text-slate-400">
                        {userEmail || "user@gmail.com"}
                      </span>
                    </div>
                    <ul className="py-1">
                      {isAdmin && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="block rounded-lg px-4 py-2 text-sm text-stone-700 hover:bg-amber-50 dark:text-slate-200 dark:hover:bg-slate-700/50 transition-colors"
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}

                      <li>
                        <NavLink
                          to="/orders"
                          className="block rounded-lg px-4 py-2 text-sm text-stone-700 hover:bg-amber-50 dark:text-slate-200 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          My Orders
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/wishlist"
                          className="block rounded-lg px-4 py-2 text-sm text-stone-700 hover:bg-amber-50 dark:text-slate-200 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          Wishlist ♥
                        </NavLink>
                      </li>
                    </ul>
                    <div className="py-1">
                      <button
                        onClick={logoutUser}
                        className="w-full text-left rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ShowOnLogin>
            <ShowOnLogout>
              <div className="flex items-center gap-3">
                <NavLink
                  className="text-sm font-medium text-stone-600 hover:text-amber-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                  to="/login"
                >
                  Log in
                </NavLink>
                <NavLink
                  className="hidden sm:block rounded-full bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-amber-700 transition-all hover:shadow-lg active:scale-95"
                  to="/register"
                >
                  Join Tomory
                </NavLink>
              </div>
            </ShowOnLogout>
            <div className="block md:hidden">
              <button
                className="rounded-full bg-amber-50 p-2 text-amber-900 transition hover:bg-amber-100 dark:bg-slate-800 dark:text-amber-100 dark:hover:bg-slate-700"
                onClick={collapse}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={Collapsed ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${!Collapsed ? "hidden" : "block"} md:hidden border-t border-amber-100/50 bg-white/90 backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/90`}>
        <nav aria-label="Mobile Nav" className="p-4">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink className={activeLink} to="/" onClick={() => setCollapsed(false)}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink className={activeLink} to="/products" onClick={() => setCollapsed(false)}>
                Products
              </NavLink>
            </li>

            <li>
              <NavLink className={activeLink} to="/contact" onClick={() => setCollapsed(false)}>
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
