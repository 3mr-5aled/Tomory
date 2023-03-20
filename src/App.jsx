import { BrowserRouter, Route, Routes } from "react-router-dom"
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

function App() {
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
          <Route path="/admin" element={<Admin />} />
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
