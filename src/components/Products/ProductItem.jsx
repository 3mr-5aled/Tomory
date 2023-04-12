import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import useFetchDocument from "../../customHooks/useFetchProducts"
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
} from "../../redux/slice/cartSlice"
import Loader from "../Loader"

const ProductItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)

  const { document } = useFetchDocument("products", id)

  useEffect(() => {
    setProduct(document)
  }, [document])

  // useEffect(() => {
  //   if (products || products.length) {
  //     const fetchProduct = async () => {
  //       const productRef = doc(db, "products", id)
  //       const productSnap = await getDoc(productRef)
  //       const data = productSnap.data()
  //       setProduct({ ...data, id: productRef.id })
  //     }
  //     fetchProduct()
  //   } else {
  //     const productRed = products.find((p) => p.id === id)
  //     setProduct(productRed)
  //   }
  // }, [products, dispatch, id])

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  if (!product) {
    return <Loader />
  }

  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product))
  }

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product))
  }

  const handleAddToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
    // const userCartRef = collection(db, "carts")
    // const cartRef = doc(userCartRef, uid)
    // const cartSnap = await getDoc(cartRef)
    // let cartData = cartSnap.exists() ? cartSnap.data() : null

    // // Create the cart document if it doesn't exist
    // if (!cartData) {
    //   cartData = {
    //     products: [],
    //   }
    //   await setDoc(cartRef, cartData)
    // }

    // const existingProductIndex = cartData.products.findIndex(
    //   (p) => p.id === product.id
    // )

    // if (existingProductIndex > -1) {
    //   // Update the quantity of the existing product in the cart
    //   const updatedProducts = [...cartData.products]
    //   updatedProducts[existingProductIndex].quantity += quantity

    //   const updatedCartData = {
    //     products: updatedProducts,
    //   }
    //   await updateDoc(cartRef, updatedCartData)
    //   dispatch(ADD_TO_CART({ ...product, quantity }))
    //   toast.success("Product quantity updated in cart")
    // } else {
    //   // Add the new product to the cart
    //   const updatedProducts = [...cartData.products, { ...product, quantity }]

    //   const updatedCartData = {
    //     products: updatedProducts,
    //   }
    //   await updateDoc(cartRef, updatedCartData)
    //   dispatch(ADD_TO_CART({ ...product, quantity }))
    //   toast.success("Product added to cart")
  }

  return (
    <>
      <section className="dark:bg-slate-800 dark:text-white">
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <img
                alt={product.name}
                src={product.imageUrl}
                className="w-full rounded-xl object-cover bg-center"
              />
            </div>

            <div className="sticky top-0">
              <div className="mt-8 flex justify-between">
                <div className="max-w-[35ch] space-y-2">
                  <h1 className="text-xl font-bold sm:text-2xl ">
                    {product.name}
                  </h1>

                  <p className="text-sm">Highest Rated Product</p>

                  <div className="-ml-0.5 flex">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="h-5 w-5 text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                <p className="text-2xl text-teal-600 font-bold mr-20 mt-3">
                  ${product.price}
                </p>
              </div>

              <div className="mt-4">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
                <br />
                <span className="text-orange-400">Note: </span>
                <p className="text-gray-400 inline">
                  the dates last for one year under normal conditions
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline w-1/3 mt-5 rounded bg-orange-600 text-white p-4 text-sm font-medium transition hover:scale-105"
                  onClick={() => handleAddToCart(product)}
                >
                  Add a Kilo to the cart
                </button>
                <Link
                  to="/cart"
                  className="inline w-1/3 mt-5 mx-5 rounded bg-gray-600 text-white p-4 text-sm font-medium transition hover:bg-gray-400"
                >
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductItem
