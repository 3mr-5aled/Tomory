import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice"
import { selectCartItems } from "../../redux/slice/cartSlice"
import useFetchCollection from "../../customHooks/useFetchCollection"
import Loader from "../Loader"
import { SearchField, Pagination, Sort } from "../index"
import AddToWishList from "../features/AddToWishList"

const ProductsList = ({ variant }) => {
  const { data, isLoading } = useFetchCollection("products")
  const products = useSelector(selectProducts)
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()
  const [filteredProducts, setFilteredProducts] = useState([])
  const isImmersive = variant === "immersive"

  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId)
    return item ? item.cartQuantity : 0
  }

  const handleFilter = (filteredItems) => {
    setFilteredProducts(filteredItems)
  }
  var currentProducts
  // pagination start
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(8)
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  //  end

  // start search

  currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  // end search

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }))
  }, [dispatch, data])

  // sorting start
  // end

  useEffect(() => {}, [dispatch])

  const isProductOutOfStock = (product) => {
    return product.amount <= 0
  }

  return (
    <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#f7f1e8] pb-20 font-body dark:bg-slate-900">
      {/* Background Elements */}
      <div className="bg-grain absolute inset-0 opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -left-24 h-96 w-96 animate-drift rounded-full bg-amber-200/50 blur-3xl" />
      <div className="absolute top-1/2 -right-24 h-80 w-80 animate-float-slow rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-full w-full bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent pointer-events-none" />

      {isLoading && <Loader />}

      <div className="relative mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center md:text-left">
          <h2 className="font-display text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-50 md:text-6xl">
            Our Collection
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-amber-900/70 dark:text-slate-300">
            Discover our selection of delicious and healthy dates sourced from
            the finest farms. Packed with fiber, potassium, and antioxidants,
            our dates are a superfood that can improve digestion and boost
            overall health.
          </p>
        </header>

        {/* Filters Container */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-amber-200/60 bg-white/60 p-4 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/60 md:flex-row">
          <div className="w-full md:w-auto">
            <Sort data={data} />
          </div>
          <div className="w-full md:w-auto">
            <SearchField items={products} onFilter={handleFilter} />
          </div>
        </div>

        {products && products.length > 0 ? (
          <>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {currentProducts.map((product, index) => {
                return (
                  <li
                    key={product.id}
                    className="animate-fadeUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="group relative h-full rounded-[2rem] border border-amber-200/50 bg-white/80 p-3 shadow-xl shadow-amber-200/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-300/40 dark:border-slate-700/50 dark:bg-slate-800/80 dark:shadow-none">
                      <div className="absolute top-6 right-6 z-10">
                        <AddToWishList product={product} />
                      </div>

                      <NavLink
                        to={`/product/${product.id}`}
                        className="block h-full"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white p-6 dark:bg-slate-200">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-contain transition duration-700 group-hover:scale-110"
                          />
                          {getCartQuantity(product.id) > 0 && (
                            <div className="absolute bottom-2 left-2 rounded-lg bg-amber-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                              {getCartQuantity(product.id)} in cart
                            </div>
                          )}
                        </div>

                        <div className="mt-6 px-3 pb-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display text-2xl font-bold text-amber-900 dark:text-amber-50">
                              {product.name}
                            </h3>
                            <span className="whitespace-nowrap font-body font-bold text-amber-700 dark:text-amber-400">
                              ${product.price}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            {isProductOutOfStock(product) ? (
                              <span className="text-sm font-semibold text-red-500">
                                Out of Stock
                              </span>
                            ) : (
                              <span className="text-sm font-medium text-amber-900/60 dark:text-slate-400">
                                Premium Quality
                              </span>
                            )}

                            <button
                              disabled={isProductOutOfStock(product)}
                              className="rounded-full bg-amber-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-700/20 transition-all hover:bg-amber-600 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-400"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="mt-16 flex justify-center">
              <Pagination
                currentProducts={currentProducts}
                productsPerPage={productsPerPage}
                totalProducts={data.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </>
        ) : (
          <div className="mt-20 text-center">
            <h2 className="font-display text-3xl text-amber-900 dark:text-amber-50">
              No products found
            </h2>
            <p className="mt-2 text-amber-900/60 dark:text-slate-400">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductsList
