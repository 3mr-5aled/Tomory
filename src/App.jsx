import { BrowserRouter, Route, Routes } from "react-router-dom"
// pages
import {
  Cart,
  Contact,
  Home,
  Login,
  ProductsPage,
  Register,
  Reset,
} from "./pages/index"
// components
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  AdminProductsView,
  AdminDefault,
  CreateProducts,
  Footer,
  Header,
  Navigation,
  UpdateProducts,
} from "./components/index"
import ProductItem from "./components/Products/ProductItem"
import { auth } from "./firebase/config"

function App() {
  const [isAdmin, setIsAdmin] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "moroamr2005@gmail.com") {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      }
    })
  }, [])
  return (
    <div
      className={localStorage.getItem("darkMode" === "true" ? "dark" : "light")}
    >
      <BrowserRouter>
        <ToastContainer />
        {location.pathname.startsWith("/admin") ? (
          <Navigation location={location} />
        ) : (
          <Header location={location} />
        )}
        {/* {location.pathname === "/admin" && <Navigation location={location} />} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<Contact />} />
          {/* {isAdmin && <Route path="/admin" element={<Admin />} />} */}
          <Route path="/product/:id" element={<ProductItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          {isAdmin && (
            <>
              <Route path="/admin" element={<AdminDefault />} />
              <Route path="/admin/create" element={<CreateProducts />} />
              <Route path="/admin/update/:id" element={<UpdateProducts />} />
              <Route
                path="/admin/product_view"
                element={<AdminProductsView />}
              />
            </>
          )}
        </Routes>
        {location.pathname.startsWith("/admin") ? (
          ""
        ) : (
          <Footer location={location} />
        )}
      </BrowserRouter>
    </div>
  )
}

export default App
