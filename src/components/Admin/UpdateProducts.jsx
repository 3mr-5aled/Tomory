import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { STORE_PRODUCTS } from "../../redux/slice/productSlice"
import { Admin } from "../../pages"
import { doc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db, storage } from "../../firebase/config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import Loader from "../Loader"
import useFetchDocument from "../../customHooks/useFetchDocument"
import {
  BsCloudUploadFill,
  BsPencilSquare,
  BsXCircleFill,
} from "react-icons/bs"

const UpdateProducts = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { document } = useFetchDocument("products", id)
  const [preview, setPreview] = useState()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (document) {
      setName(document.name || "")
      setDescription(document.description || "")
      setPrice(document.price || "")
      setAmount(document.amount || "")
    }
  }, [document])

  if (!document) {
    return <Loader />
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateDoc(doc(db, "products", id), {
        name,
        description,
        price,
        amount,
      })

      if (image) {
        const imageRef = ref(storage, `images/${id}`)
        await uploadBytes(imageRef, image)
        const imageUrl = await getDownloadURL(imageRef)
        await updateDoc(doc(db, "products", id), { imageUrl })
        dispatch(
          STORE_PRODUCTS({
            id,
            ...document,
            name,
            description,
            price,
            amount,
            imageUrl,
          }),
        )
      }

      toast.success("Harvest updated successfully")
      navigate("/admin/products")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update product")
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
            Update Harvest
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Refine the details of your premium variety.
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
              className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-amber-200 bg-amber-50/10 dark:border-slate-700 p-8 text-center`}
            >
              <div className="relative group">
                <img
                  src={preview || document.imageUrl}
                  className="max-h-64 rounded-2xl object-contain shadow-lg"
                  alt="Product"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl backdrop-blur-[2px]">
                  <div className="flex flex-col items-center text-white">
                    <BsCloudUploadFill size={32} />
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-2">
                      Change Image
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-600 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-amber-900/20 transition-all hover:bg-amber-700 hover:-translate-y-1"
              >
                <BsPencilSquare />
                Save Changes
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

export default UpdateProducts
