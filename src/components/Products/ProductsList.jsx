import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice"
import useFetchCollection from "../../customHooks/useFetchCollection"
import Loader from "../Loader"
import { SearchField, Pagination, Sort } from "../index"
import AddToWishList from "../features/AddToWishList"

const ProductsList = () => {
  const { data, isLoading } = useFetchCollection("products")
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  const [filteredProducts, setFilteredProducts] = useState([])

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
    indexOfLastProduct
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
    <>
      <section
        className="relative bg-white 
     dark:bg-gray-800"
      >
        {isLoading && <Loader />}

        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Products List
            </h2>

            <p className="mt-4 max-w-lg text-gray-500">
              Discover our selection of delicious and healthy dates sourced from
              the finest farms. Choose from fresh or dried varieties, including
              plump and juicy Medjool or chewy Deglet Noor. We also offer date
              paste for baking and making energy bars. Packed with fiber,
              potassium, and antioxidants, dates are a superfood that can
              improve digestion and boost overall health. Order now for fast
              delivery.
            </p>
          </header>

          <div className="mt-8 flex items-center justify-between">
            {/* <div className="flex divide-x divide-gray-100 rounded border border-gray-100">
              <button className="inline-flex h-10 w-10 items-center justify-center text-gray-600 dark:text-white transition hover:bg-gray-50 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </button>

              <button className="inline-flex h-10 w-10 items-center justify-center text-gray-600 dark:text-white transition hover:bg-gray-50 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
              </div> */}

            <Sort data={data} />
            <SearchField items={products} onFilter={handleFilter} />
          </div>

          {products ? (
            <>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {currentProducts.map((product) => {
                  return (
                    <li
                      key={product.id}
                      className="relative dark:bg-orange-600 rounded-xl"
                    >
                      <div className="relative group">
                        <AddToWishList product={product} />
                      </div>
                      <NavLink
                        to={`/product/${product.id}`}
                        className="group relative block overflow-hidden shadow-xl rounded-xl"
                      >
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="h-64 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-72 bg-white rounded-t-xl border-b-orange-400 border-2"
                        />

                        <div className="relative border rounded-xl border-gray-100 bg-white p-6 dark:bg-slate-700 dark:border-orange-600">
                          {/* <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                    New
                  </span> */}
                          <div className="flex flex-row flex-nowrap justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </h3>
                            {isProductOutOfStock(product) ? (
                              <p className="text-sm text-red-500 font-bold">
                                Out of Stock
                              </p>
                            ) : (
                              <p className="text-sm text-orange-600 font-bold">
                                Price: {product.price} $
                              </p>
                            )}
                          </div>
                          <form className="mt-4">
                            <div>
                              <button
                                className="block w-full mt-5 rounded bg-orange-600 text-white p-4 text-sm font-medium transition hover:scale-105"
                                disabled={
                                  isProductOutOfStock(product) ? true : false
                                }
                              >
                                Add to Cart
                              </button>
                            </div>
                          </form>
                        </div>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
              <Pagination
                currentProducts={currentProducts}
                productsPerPage={productsPerPage}
                totalProducts={data.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          ) : (
            <h2 className="text-center text-2xl text-red-500 my-5">
              There is no products added
            </h2>
          )}
        </div>
      </section>
    </>
  )
}
export default ProductsList
