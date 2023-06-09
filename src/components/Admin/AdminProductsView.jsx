import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import useFetchCollection from "../../customHooks/useFetchCollection"
import { db, storage } from "../../firebase/config"
import { Admin } from "../../pages"
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice"
import Loader from "../Loader"
import { BsSearch } from "react-icons/bs"

const AdminProductsView = () => {
  const { data, isLoading } = useFetchCollection("products")
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data.length) {
      dispatch(
        STORE_PRODUCTS({
          products: data,
        })
      )
    }
  }, [dispatch, data])

  const handleDeleteProduct = async (productId, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", productId))

      const storageRef = ref(storage, imageUrl)
      await deleteObject(storageRef)
      toast.success("Product deleted successfully.")
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      )
      dispatch(STORE_PRODUCTS(updatedProducts))
      toast.success("Product Deleted")
    } catch (error) {
      toast.error(error.message)
    }
  }
  const isProductOutOfStock = (product) => {
    return product.amount <= 0
  }
  // start search
  const [searchQuery, setSearchQuery] = useState("")
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // end search

  return (
    <Admin>
      {isLoading && <Loader />}
      <div className="ml-5 mr-8 relative">
        <input
          type="text"
          className="h-10 rounded border-gray-300 text-sm px-3 w-full mx-3"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="absolute right-3 top-3">
          <BsSearch />
        </div>
      </div>

      {products ? (
        <ul className="mx-5 my-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            return (
              <li
                key={product.id}
                className="bg-white dark:bg-slate-700 shadow-xl p-3 rounded-xl"
              >
                <a
                  href={`/product/${product.id}`}
                  className="group relative block overflow-hidden"
                >
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="h-64 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-72 bg-white rounded-t-xl border-b-orange-400 border-2"
                  />

                  <div className="relative border-gray-100 bg-white px-6 py-2 dark:bg-slate-700 dark:border-orange-600 border-2 rounded-b-md">
                    {/* <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                    New
                  </span> */}

                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h3>

                    <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-200">
                      <span>Price: {product.price} $</span>
                      {isProductOutOfStock(product) ? (
                        <span className="text-red-500 ml-3 font-bold">
                          Out of Stock
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </a>
                <div className="mt-4 flex flex-row gap-2 justify-between text-center">
                  <NavLink
                    to={`/admin/update/${product.id}`}
                    className="block grow rounded bg-gray-400 text-white p-4 text-sm font-medium transition hover:scale-105"
                  >
                    Update
                  </NavLink>
                  <button
                    onClick={() =>
                      handleDeleteProduct(product.id, product.imageUrl)
                    }
                    className="block grow  rounded bg-red-600 text-white p-4 text-sm font-medium transition hover:scale-105"
                  >
                    Remove
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <h2 className="text-center text-2xl text-red-500 my-5">
          There is no products added
        </h2>
      )}
      <Link
        to="/admin/create"
        className="bg-orange-600 hover:bg-orange-400 text-white rounded-xl my-5 mx-5 p-3 w-fit"
      >
        Create a Product
      </Link>
    </Admin>
  )
}

export default AdminProductsView
