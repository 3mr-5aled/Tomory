import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useFetchCollection from "../../customHooks/useFetchCollection"
import { db, storage } from "../../firebase/config"
import { Admin } from "../../pages"
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice"
import Loader from "../Loader"
import SearchField from "../features/SearchField"

const AdminProductsView = () => {
  const { data, isLoading } = useFetchCollection("products")
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleFilter = (filteredItems) => {
    setFilteredProducts(filteredItems)
  }

  useEffect(() => {
    if (data.length) {
      dispatch(
        STORE_PRODUCTS({
          products: data,
        })
      )
    }
  }, [dispatch, data])

  const handleDeleteProduct = (productId, imageUrl) => {
    setSelectedProduct({ id: productId, imageUrl })
    setShowModal(true)
  }

  const confirmDeleteProduct = async () => {
    try {
      await deleteDoc(doc(db, "products", selectedProduct.id))

      const storageRef = ref(storage, selectedProduct.imageUrl)
      await deleteObject(storageRef)
      toast.success("Product deleted successfully.")

      const updatedProducts = products.filter(
        (product) => product.id !== selectedProduct.id
      )
      dispatch(STORE_PRODUCTS({ products: updatedProducts }))
    } catch (error) {
      toast.error(error.message)
    }

    // Close the modal and reset the selected product
    setShowModal(false)
    setSelectedProduct(null)
  }

  const isProductOutOfStock = (product) => {
    return product.amount <= 0
  }

  const Modal = () => {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Remove Product
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to remove this product? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={confirmDeleteProduct}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Remove
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Admin>
      {isLoading && <Loader />}
      <div className="mr-8 mt-3">
        <SearchField items={products} onFilter={handleFilter} />
      </div>

      {filteredProducts.length > 0 ? (
        <ul className="mx-5 my-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
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
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </h3>

                  <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-200">
                    <span>Price: {product.price} $</span>
                    {isProductOutOfStock(product) && (
                      <span className="text-red-500 ml-3 font-bold">
                        Out of Stock
                      </span>
                    )}
                  </p>
                </div>
              </a>
              <div className="mt-4 flex flex-row gap-2 justify-between text-center">
                <NavLink
                  to={`/admin/update-product/${product.id}`}
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
          ))}
        </ul>
      ) : (
        <h2 className="text-center text-2xl text-red-500 my-5">
          There are no products added.
        </h2>
      )}
      <Link
        to="/admin/create-product"
        className="bg-orange-600 hover:bg-orange-400 text-white rounded-xl my-5 mx-5 p-3 w-fit"
      >
        Create a Product
      </Link>
      {showModal && <Modal />}
    </Admin>
  )
}

export default AdminProductsView
