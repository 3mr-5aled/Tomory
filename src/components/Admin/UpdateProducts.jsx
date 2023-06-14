import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom"
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice"
import { Admin } from "../../pages"
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db, storage } from "../../firebase/config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import Loader from "../Loader"
import useFetchDocument from "../../customHooks/useFetchDocument"

const UpdateProducts = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
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
    setProduct(document)
    setName(document?.name)
    setDescription(document?.description)
    setPrice(document?.price)
    setAmount(document?.amount)
  }, [document])

  if (!product) {
    return <Loader />
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)

    // Show preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
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

      toast.success("Product updated successfully")

      if (image) {
        const imageRef = ref(storage, `images/${id}`)
        await uploadBytes(imageRef, image)
        const imageUrl = await getDownloadURL(imageRef)

        await updateDoc(doc(db, "products", id), { imageUrl })

        dispatch(
          STORE_PRODUCTS({
            id,
            ...document,
            imageUrl,
          })
        )

        toast.success("Image updated successfully")
      }

      setProduct({
        ...product,
        name,
        description,
        price,
        amount,
        imageUrl: image ? URL.createObjectURL(image) : product.imageUrl,
      })

      navigate("/admin/product_view")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update product")
    }
  }

  return (
    <Admin>
      <div className="flex flex-col w-full p-5">
        <h2 className="text-xl font-bold dark:text-white">Update a Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <div className="mt-3 flex flex-col flex-wrap w-1/3">
              <div className="block p-5 ">
                <h6 className="dark:text-white">Name</h6>
                <input
                  required
                  type="text"
                  className="rounded bg-gray-50 border-gray-300  focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="block p-5 ">
                <h6 className="dark:text-white">Description</h6>
                <textarea
                  required
                  type="text"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="block p-5 ">
                <h6 className="dark:text-white">Amount</h6>
                <input
                  required
                  type="number"
                  className="rounded bg-gray-50 border-gray-300  focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="Kg"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="block p-5 ">
                <h6 className="dark:text-white">Price</h6>
                <input
                  required
                  className="rounded bg-gray-50 border-gray-300  focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  type="number"
                  placeholder="Price $"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="block p-5 ">
              <h6 className="text-lg font-semibold dark:text-white">Images</h6>
              <div>
                <img
                  className="max-w-sm max-h-auto border-black border-2 m-3"
                  src={preview || product.imageUrl}
                />
              </div>
              <input
                // required
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="flex flex-row float-right">
            <button
              className="bg-orange-600 text-white rounded-md px-5 py-3 float-right w-fit place-self-end mr-5 focus:bg-orange-400 hover:bg-orange-800"
              type="submit"
            >
              Edit product
            </button>
            <NavLink
              className="px-4 py-2 text-orange-700 bg-transparent border-2 border-orange-700 rounded-lg dark:text-white hover:bg-orange-500 hover:text-white text-md"
              to="/admin/product_view"
            >
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </Admin>
  )
}

export default UpdateProducts
