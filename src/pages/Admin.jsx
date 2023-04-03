import React, { useEffect, useState } from "react"
import {
  AdminProductsView,
  CreateProducts,
  Navigation,
  UpdateProducts,
} from "../components"
import { Route, Routes } from "react-router-dom"

const Admin = ({ children }) => {
  // const [darkMode, setDarkMode] = useState(Boolean ? Boolean : undefined)

  // const switchMode = () => {
  //   setDarkMode(!darkMode)
  // }
  // useEffect(() => {
  //   if (darkMode) {
  //     localStorage.setItem("darkMode", "true")
  //     window.document.documentElement.classList.add("dark")
  //   } else if (darkMode === false) {
  //     localStorage.setItem("darkMode", "false")
  //     window.document.documentElement.classList.remove("dark")
  //   } else {
  //     setDarkMode(localStorage.getItem("darkMode") === "true")
  //   }
  // }, [darkMode])
  return (
    <>
      <Navigation />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="grid mb-4">
            {/* {view === "default" && <div>Welcome Admin</div>}
            {view === "create" && <CreateProducts />}
            {view === "products" && <AdminProductsView />}
            {view === "update" && <UpdateProducts />} */}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
