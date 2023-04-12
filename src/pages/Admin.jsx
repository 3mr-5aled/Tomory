import React from "react"
import { Navigation } from "../components"

const Admin = ({ children }) => {
  return (
    <div
      className={
        (localStorage.getItem("darkMode" === "true" ? "dark" : "light"),
        "dark:bg-slate-800")
      }
    >
      {/* <Navigation /> */}

      <div className=" p-4 sm:ml-64 dark:bg-slate-600 h-screen">
        <div className=" p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="rounded-xl grid mb-4 dark:bg-slate-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
