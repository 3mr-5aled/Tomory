import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import {
  BsTrash3Fill,
  BsPencilSquare,
  BsPlusLg,
  BsXCircleFill,
  BsExclamationTriangleFill,
} from "react-icons/bs"
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
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleFilter = (filteredItems) => {
    setFilteredProducts(filteredItems)
  }

  useEffect(() => {
    if (data.length) {
      dispatch(STORE_PRODUCTS({ products: data }))
      setFilteredProducts(data)
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
        (product) => product.id !== selectedProduct.id,
      )
      dispatch(STORE_PRODUCTS({ products: updatedProducts }))
      setFilteredProducts(updatedProducts)
    } catch (error) {
      toast.error(error.message)
    }
    setShowModal(false)
    setSelectedProduct(null)
  }

  const isProductOutOfStock = (product) => product.amount <= 0

  const Modal = () => (
    <div className="fixed inset-0 z-[100] overflow-y-auto px-4 py-6 sm:px-0">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setShowModal(false)}
      />
      <div className="relative mx-auto max-w-lg overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl animate-fadeUp">
        <div className="p-8">
          <div className="flex items-center gap-4 text-red-600 mb-6">
            <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-900/20">
              <BsExclamationTriangleFill size={24} />
            </div>
            <h3 className="font-display text-2xl font-bold">Remove Product</h3>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
            Are you sure you want to remove this product? This action is
            permanent and cannot be undone. All associated data will be lost.
          </p>
          <div className="flex gap-4">
            <button
              onClick={confirmDeleteProduct}
              className="flex-1 py-4 rounded-2xl bg-red-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
            >
              Confirm Removal
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Admin>
      {isLoading && <Loader />}

      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-amber-900 dark:text-white">
              Inventory Management
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
              Manage your harvest collection, prices, and stock levels.
            </p>
          </div>
          <Link
            to="/admin/create-product"
            className="flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-amber-900/20 transition-all hover:bg-amber-700 hover:-translate-y-0.5"
          >
            <BsPlusLg strokeWidth={1} />
            Add New Product
          </Link>
        </header>

        <div className="rounded-3xl bg-amber-50/50 dark:bg-slate-800/50 p-4 border border-amber-100 dark:border-slate-700">
          <SearchField items={products} onFilter={handleFilter} />
        </div>

        {filteredProducts.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <li
                key={product.id}
                className="group relative flex flex-col rounded-[2rem] border border-amber-100/50 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 animate-fadeUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white p-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                  {isProductOutOfStock(product) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                      <span className="rounded-full bg-red-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex-1 px-3 pb-2">
                  <h3 className="font-display text-lg font-bold text-amber-900 dark:text-white truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-amber-700 dark:text-amber-500">
                    ${product.price}
                  </p>
                </div>

                <div className="mt-4 flex gap-2 p-1">
                  <NavLink
                    to={`/admin/update-product/${product.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-all hover:bg-amber-100 dark:hover:bg-amber-900/20 hover:text-amber-700"
                  >
                    <BsPencilSquare />
                    Edit
                  </NavLink>
                  <button
                    onClick={() =>
                      handleDeleteProduct(product.id, product.imageUrl)
                    }
                    className="flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/10 p-3 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                  >
                    <BsTrash3Fill />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-amber-50 dark:bg-slate-800 p-6">
              <BsXCircleFill className="text-amber-200" size={48} />
            </div>
            <h2 className="font-display text-2xl font-bold text-amber-900 dark:text-white">
              No products found
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Adjust your search or add a new variety to the collection.
            </p>
          </div>
        )}
      </div>
      {showModal && <Modal />}
    </Admin>
  )
}

export default AdminProductsView
