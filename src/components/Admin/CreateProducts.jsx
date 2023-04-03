import React, { useEffect, useState } from "react"
import { db, storage } from "../../firebase/config"
import { addDoc, collection, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useSelector, useDispatch } from "react-redux"
import { ProductsState } from "../../redux/slice/productSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Admin from "../../pages/Admin"

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
      dispatch(ProductsState({ id: productId, ...product, imageUrl }))

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
      <div className="flex flex-col w-full p-5">
        <h2 className="text-xl font-bold dark:text-white">Create a Product</h2>
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
            <button
              className="bg-orange-600 text-white rounded-md px-5 py-3 float-right w-fit place-self-end mr-5 focus:bg-orange-400"
              type="submit"
            >
              Add new product
            </button>
          </div>
        </form>
      </div>
    </Admin>
  )
}
export default CreateProducts
