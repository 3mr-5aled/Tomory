import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import useFetchCollection from "../../customHooks/useFetchCollection"
import { db, storage } from "../../firebase/config"
import { Admin } from "../../pages"
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice"
import Loader from "../Loader"

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

  return (
    <Admin>
      {isLoading && <Loader />}
      {products ? (
        <ul className="mx-5 my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            return (
              <li
                key={product.id}
                className="bg-white shadow-xl p-3 rounded-xl"
              >
                <a
                  href={`/product/${product.id}`}
                  className="group relative block overflow-hidden "
                >
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="h-64 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-72 bg-white rounded-t-xl border-b-orange-400 border-2"
                  />

                  <div className="relative border border-gray-100 bg-white p-6">
                    {/* <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                    New
                  </span> */}

                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>

                    <p className="mt-1.5 text-sm text-gray-700">
                      Price: {product.price} $
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
