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
  Checkout,
  CheckoutStatus,
  Orders,
  OrderDetails,
  WishList,
} from "./pages/index"
// components
import { Provider, useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PersistGate } from "redux-persist/integration/react"
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
import store, { persistor } from "./redux/store"
import NotFound from "./pages/NotFound"

function App() {
  // Check Admin
  const isAdmin = useSelector(selectIsAdmin)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div
          className={
            (localStorage.getItem("darkMode" === "true" ? "dark" : "light"),
            "dark:bg-slate-800")
          }
        >
          <BrowserRouter>
            <ToastContainer />
            {location.pathname.startsWith("/admin") ? null : <Header />}
            {/* {location.pathname === "/admin" && <Navigation location={location} />} */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/contact" element={<Contact />} />
              {/* {isAdmin && <Route path="/admin" element={<Admin />} />} */}
              <Route path="/product/:id" element={<ProductItem />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wish_list" element={<WishList />} />
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
                  <Route path="/admin/create" element={<CreateProducts />} />
                  <Route
                    path="/admin/update/:id"
                    element={<UpdateProducts />}
                  />
                  <Route
                    path="/admin/product_view"
                    element={<AdminProductsView />}
                  />
                  <Route path="/admin/orders" element={<AdminOrderView />} />
                  <Route
                    path="/admin/order-details/:id"
                    element={<AdminOrderDetails />}
                  />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {location.pathname.startsWith("/admin") ? null : <Footer />}
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
