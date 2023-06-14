import React, { useEffect, useState } from "react"
import { db, storage } from "../../firebase/config"
import { addDoc, collection, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useSelector, useDispatch } from "react-redux"
import { STORE_PRODUCTS } from "../../redux/slice/productSlice"
import { toast } from "react-toastify"
import { NavLink, useNavigate } from "react-router-dom"
import Admin from "../../pages/admin/Admin"

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

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setImage(e.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validate form
    if (!name || !description || !price || !amount || !image) {
      return
    }

    const product = {
      name,
      description,
      price,
      amount,
      reviews: [],
    }

    try {
      // Add product data to Firestore
      const productsCollectionRef = collection(db, "products")
      const productDocRef = await addDoc(productsCollectionRef, product)
      const productId = productDocRef.id
      toast.success("Product created successfully.")

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${productId}`)
      await uploadBytes(storageRef, image)
      const imageUrl = await getDownloadURL(storageRef)
      toast.success("Product image uploaded successfully.")

      // Update product data in Firestore with image URL
      await updateDoc(productDocRef, { imageUrl })
      toast.success("Product data updated successfully.")

      // Add product to Redux store
      dispatch(STORE_PRODUCTS({ id: productId, ...product, imageUrl }))

      // Reset form fields
      setName("")
      setDescription("")
      setPrice("")
      setAmount("")
      setImage(null)

      navigate("/admin/product_view")
    } catch (error) {
      console.error(error)
      toast.error("Failed to create product.")
    }
  }

  return (
    <Admin>
      <div className="flex flex-col w-full p-5 dark:text-white">
        <h2 className="text-xl font-bold dark:text-white">Create a Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <div className="mt-3 flex flex-col flex-wrap">
              <div className="block p-5">
                <h6 className="dark:text-white">Name</h6>
                <input
                  required
                  type="text"
                  placeholder="Name"
                  className="rounded bg-gray-50 border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="block p-5 ">
                <h6 className="dark:text-white">Description</h6>
                <textarea
                  required
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  type="text"
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
                  placeholder="Kg"
                  className="rounded bg-gray-50 border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="block p-5 ">
                <h6 className="dark:text-white">Price</h6>
                <input
                  required
                  type="number"
                  placeholder="Price $"
                  className="rounded bg-gray-50 border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="block p-5">
              <h6 className="text-lg font-semibold dark:text-white">Images</h6>
              <div>
                {preview && (
                  <img
                    className="max-w-sm max-h-auto border-black border-2 m-3"
                    src={preview}
                  />
                )}
              </div>
              <input
                required
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex flex-row float-right">
            <button
              className="bg-orange-600 text-white rounded-md px-5 py-3 float-right w-fit place-self-end mr-5 focus:bg-orange-400 hover:bg-orange-800"
              type="submit"
            >
              Add new product
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
export default CreateProducts
