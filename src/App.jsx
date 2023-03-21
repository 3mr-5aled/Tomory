import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
// pages
import {
  Home,
  ProductsPage,
  Contact,
  Cart,
  Admin,
  Login,
  Register,
  Reset,
} from "./pages/index"
// components
import { Header, Footer } from "./components/index"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { selectUserEmail } from "./redux/slice/authSlice"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import ProductItem from "./components/ProductItem"

function App() {
  const [isAdmin, setIsAdmin] = useState(true)

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (user.email === "moroamr2005@gmail.com") {
  //         setIsAdmin(true)
  //       } else {
  //         setIsAdmin(false)
  //       }
  //     }
  //   })
  // }, [])
  return (
    <div
      className={localStorage.getItem("darkMode" === "true" ? "dark" : "light")}
    >
      <BrowserRouter>
        <ToastContainer />
        {location.pathname !== "/admin" && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<Contact />} />
          {isAdmin && <Route path="/admin" element={<Admin />} />}
          <Route path="/product/:id" element={<ProductItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        {location.pathname !== "/admin" && <Footer />}
      </BrowserRouter>
    </div>
  )
}

export default App
