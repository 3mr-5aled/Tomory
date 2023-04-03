import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { selectProducts } from "../../redux/slice/productSlice"
import { Admin } from "../../pages"
import { addDoc, doc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db, storage } from "../../firebase/config"
import { ref, uploadBytes } from "firebase/storage"

const UpdateProducts = () => {
  const [products, setProducts] = useSelector(selectProducts)
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [amount, setAmount] = useState(product.amount)
  const [image, setImage] = useState(product.image)
  const [preview, setPreview] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // create a preview as a side effect, whenever selected file is changed
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

  const productRef = doc(db, "products", product.id)

  // Set the "capital" field of the city 'DC'
  const handleSubmit = async (e) => {
    e.preventDefault()

    // try {
    // Update product in Firestore
    await updateDoc(productRef, {
      name,
      description,
      price,
      amount,
    })
    toast.success("Product updated successfully")

    // Update image in Firebase Storage
    if (image) {
      const imageRef = ref(storage, `images/${product.id}`)
      await uploadBytes(imageRef, image)
      const imageUrl = await getDownloadURL(imageRef)

      // Update product data in Firestore with image URL
      const productDocRef = await doc(db, "products", product.id)
      const productId = productDocRef.id
      await updateDoc(productDocRef, { imageUrl })
      toast.success("image updated successfully.")

      // Add product to Redux store
      dispatch(ProductsState({ id: productId, ...product, imageUrl }))
    }
    navigate("/admin/product_view")
    // }
    //   catch (error) {
    //   console.error(error)
    //   toast.error("Failed to update product")
    // }
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
                onChange={(e) => {
                  setImage(e.target.files[0])
                }}
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
