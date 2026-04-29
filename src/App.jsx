import React from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PersistGate } from "redux-persist/integration/react"

// pages
import {
  Cart,
  Contact,
  Home,
  Login,
  ProductsPage,
  Register,
  Reset,
  Checkout,
  CheckoutStatus,
  Orders,
  OrderDetails,
  WishList,
  NotFound,
} from "./pages/index"

// components
import ProductItem from "./components/Products/ProductItem"
import {
  AdminDashboard,
  AdminOrderDetails,
  AdminOrderView,
  AdminProductsView,
  CreateProducts,
  Footer,
  Header,
  UpdateProducts,
} from "./components/index"
import { selectIsAdmin } from "./redux/slice/authSlice"
import { persistor } from "./redux/store"
import ScrollToTop from "./components/features/ScrollToTop"
import SmoothScroll from "./components/features/SmoothScroll"

const AppContent = () => {
  const location = useLocation()
  const isAdmin = useSelector(selectIsAdmin)
  const isAdminPath = location.pathname.startsWith("/admin")

  return (
    <>
      {!isAdminPath && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/status" element={<CheckoutStatus />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        {isAdmin && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-product" element={<CreateProducts />} />
            <Route
              path="/admin/update-product/:id"
              element={<UpdateProducts />}
            />
            <Route path="/admin/products" element={<AdminProductsView />} />
            <Route path="/admin/orders" element={<AdminOrderView />} />
            <Route
              path="/admin/order-details/:id"
              element={<AdminOrderDetails />}
            />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  )
}

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <div
        className={`${localStorage.getItem("darkMode") === "true" ? "dark" : "light"} dark:bg-slate-800 transition-colors duration-500`}
      >
        <BrowserRouter>
          <SmoothScroll>
            <ToastContainer />
            <AppContent />
          </SmoothScroll>
        </BrowserRouter>
      </div>
    </PersistGate>
  )
}

export default App
