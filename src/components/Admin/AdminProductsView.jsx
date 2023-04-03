import React, { useEffect, useState } from "react"
import { Admin } from "../../pages"
import { useDispatch } from "react-redux"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db, storage } from "../../firebase/config"
import { ProductsState } from "../../redux/slice/productSlice"
import { NavLink } from "react-router-dom"
import { doc, deleteDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { deleteObject, ref } from "firebase/storage"

function AdminProductsView() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

  const fetchPost = () => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setProducts(newData)
        dispatch(ProductsState(newData))
      }
    )
    return unsubscribe
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const handleDeleteProduct = async (productId, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", productId))

      const storageRef = ref(storage, imageUrl)
      await deleteObject(storageRef)
      toast.success("Product deleted successfully.")
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      )
      setProducts(updatedProducts)
      dispatch(ProductsState(updatedProducts))
      toast.success("Product Deleted")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Admin>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <a
                herf={`/product/${product.id}`}
                className="group relative block overflow-hidden shadow-xl"
              >
                <img
                  src={product.imageUrl}
                  alt=""
                  className="h-64 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-72"
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
    </Admin>
  )
}

export default AdminProductsView
