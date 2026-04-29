import React, { useEffect, useState } from "react"
import { db, storage } from "../../firebase/config"
import { addDoc, collection, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useDispatch } from "react-redux"
import { STORE_PRODUCTS } from "../../redux/slice/productSlice"
import { toast } from "react-toastify"
import { NavLink, useNavigate } from "react-router-dom"
import Admin from "../../pages/admin/Admin"
import { BsCloudUploadFill, BsPlusLg, BsXCircleFill } from "react-icons/bs"

const CreateProducts = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!image) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name || !description || !price || !amount || !image) {
      toast.error("Please fill all fields")
      return
    }

    const product = { name, description, price, amount, reviews: [] }

    try {
      const productsCollectionRef = collection(db, "products")
      const productDocRef = await addDoc(productsCollectionRef, product)
      const productId = productDocRef.id

      const storageRef = ref(storage, `images/${productId}`)
      await uploadBytes(storageRef, image)
      const imageUrl = await getDownloadURL(storageRef)

      await updateDoc(productDocRef, { imageUrl })
      dispatch(STORE_PRODUCTS({ id: productId, ...product, imageUrl }))

      toast.success("Harvest added to collection")
      navigate("/admin/products")
    } catch (error) {
      console.error(error)
      toast.error("Failed to create product.")
    }
  }

  const inputClasses =
    "w-full rounded-2xl border-amber-100 bg-white/50 px-5 py-3 font-body text-sm transition-all focus:border-amber-600 focus:ring-0 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
  const labelClasses =
    "mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400"

  return (
    <Admin>
      <div className="space-y-8">
        <header>
          <h1 className="font-display text-3xl font-bold tracking-tight text-amber-900 dark:text-white">
            Add New Harvest
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Introduce a new variety of premium dates to your collection.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className={labelClasses}>Product Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Medjool Premium"
                className={inputClasses}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClasses}>Description</label>
              <textarea
                required
                rows="5"
                className={inputClasses}
                placeholder="Describe the texture, flavor, and origin..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Stock (Kg)</label>
                <input
                  required
                  type="number"
                  placeholder="0"
                  className={inputClasses}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClasses}>Price ($)</label>
                <input
                  required
                  type="number"
                  placeholder="0.00"
                  className={inputClasses}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <label className={labelClasses}>Product Image</label>
            <div
              className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all ${preview ? "border-amber-600 bg-white/40 dark:bg-slate-800/40" : "border-amber-200 bg-amber-50/50 dark:border-slate-700 dark:bg-slate-800/20"} p-8 text-center`}
            >
              {preview ? (
                <div className="relative group">
                  <img
                    src={preview}
                    className="max-h-64 rounded-2xl object-contain shadow-lg"
                    alt="Preview"
                  />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute -top-3 -right-3 rounded-full bg-red-500 text-white p-1 shadow-lg hover:bg-red-600"
                  >
                    <BsXCircleFill size={20} />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer group flex flex-col items-center">
                  <div className="mb-4 rounded-full bg-amber-100 dark:bg-slate-700 p-6 text-amber-600 transition-all group-hover:scale-110">
                    <BsCloudUploadFill size={40} />
                  </div>
                  <span className="text-sm font-bold text-amber-900 dark:text-white">
                    Click to upload image
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    PNG, JPG or WebP (Max. 2MB)
                  </span>
                  <input
                    required
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              )}
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-600 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-amber-900/20 transition-all hover:bg-amber-700 hover:-translate-y-1"
              >
                <BsPlusLg />
                Complete Harvest
              </button>
              <NavLink
                to="/admin/products"
                className="flex w-full items-center justify-center py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-amber-700 transition-colors"
              >
                Cancel & Return
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </Admin>
  )
}
export default CreateProducts
