import React, { useEffect, useState } from "react"
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(Boolean ? undefined : Boolean)

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
    <button className="relative group text-orange-600" onClick={switchMode}>
      {/* switching darkmode */}
      {!darkMode ? (
        <BsFillMoonStarsFill size={20} />
      ) : (
        <BsFillSunFill size={20} />
      )}
      <span className="pointer-events-none text-sm z-index-50 absolute top-5 -right-3 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-700 rounded-md px-3 text-white">
        Darkmode
      </span>
    </button>
  )
}

export default DarkModeButton
