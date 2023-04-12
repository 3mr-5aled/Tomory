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
  SuccessCheckout,
} from "./pages/index"
// components
import { Provider, useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PersistGate } from "redux-persist/integration/react"
import ProductItem from "./components/Products/ProductItem"
import {
  AdminDefault,
  AdminProductsView,
  CreateProducts,
  Footer,
  Header,
  Navigation,
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
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<SuccessCheckout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<Reset />} />
              {isAdmin && (
                <>
                  <Route path="/admin" element={<AdminDefault />} />
                  <Route path="/admin/create" element={<CreateProducts />} />
                  <Route
                    path="/admin/update/:id"
                    element={<UpdateProducts />}
                  />
                  <Route
                    path="/admin/product_view"
                    element={<AdminProductsView />}
                  />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {location.pathname.startsWith("/admin") ? (
              ""
            ) : (
              <Footer location={location} />
            )}
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
