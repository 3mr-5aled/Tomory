import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice"
import { Admin } from "../../pages"
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db, storage } from "../../firebase/config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import Loader from "../Loader"
import useFetchDocument from "../../customHooks/useFetchProducts"

const UpdateProducts = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()
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
    setImage(document?.imageUrl)
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
          <div className="mt-3 flex flex-row flex-wrap">
            <div className="block p-5 " htmlFor="">
              <h6 className="dark:text-white">Name</h6>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="block p-5 " htmlFor="">
              <h6 className="dark:text-white">Description</h6>
              <input
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="block p-5 " htmlFor="">
              <h6 className="dark:text-white">Amount</h6>
              <input
                required
                type="number"
                placeholder="Kg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="block p-5 " htmlFor="">
              <h6 className="dark:text-white">Price</h6>
              <input
                required
                type="number"
                placeholder="Price $"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="block p-5 " htmlFor="">
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
            <button
              className="bg-orange-600 text-white rounded-md px-5 py-3 float-right w-fit place-self-end mr-5 focus:bg-orange-400"
              type="submit"
            >
              Edit product
            </button>
          </div>
        </form>
      </div>
    </Admin>
  )
}

export default UpdateProducts
