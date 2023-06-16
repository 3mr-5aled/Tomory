import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import useFetchDocument from "../../customHooks/useFetchDocument"
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  // DECREASE_CART,
} from "../../redux/slice/cartSlice"
import Loader from "../Loader"
import {
  BsFillCartFill,
  BsFillBagPlusFill,
  BsArrowLeftCircleFill,
  BsStarFill,
  BsStarHalf,
  BsStar,
} from "react-icons/bs"
import { auth } from "../../firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import {
  ADD_TO_WISHLIST,
  selectWishListItems,
} from "../../redux/slice/wishListSlice"
import {
  Reviews,
  AddReview,
  ShareButton,
  RelatedProducts,
  Divider,
} from "../index"
import { selectProductById } from "../../redux/slice/productSlice"

const ProductItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const product = useSelector((state) => selectProductById(state, id))
  // const [product, setProduct] = useState(null)

  // const { document } = useFetchDocument("products", id)

  // add to wishlist
  const wishListItems = useSelector(selectWishListItems)

  const getProductClasses = (product) => {
    const index = wishListItems.findIndex((item) => item.id === product.id)
    return index !== -1
      ? "fill-current text-red-500 h-6 w-6"
      : "fill-none h-6 w-6"
  }
  const handleWishList = (product) => {
    dispatch(ADD_TO_WISHLIST(product))
  }

  // useEffect(() => {
  //   if (document) {
  //     setProduct(document)
  //   }
  // }, [document])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  if (!product) {
    return <Loader />
  }

  // const increaseCart = (product) => {
  //   dispatch(ADD_TO_CART(product))
  // }

  // const decreaseCart = (product) => {
  //   dispatch(DECREASE_CART(product))
  // }

  const handleAddToCart = (product) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(ADD_TO_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY())
      } else {
        navigate("/login")
      }
    })
  }
  const renderStars = (rating) => {
    if (rating <= 0) {
      return <p>Product isn't rated</p>
    } else {
      const fullStars = Math.floor(rating)
      const hasHalfStar = rating % 1 !== 0

      const stars = []
      for (let i = 0; i < fullStars; i++) {
        stars.push(<BsStarFill key={i} color="yellow" />)
      }

      if (hasHalfStar) {
        stars.push(<BsStarHalf key={i} color="yellow" />)
      }

      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
      for (let i = 0; i < emptyStars; i++) {
        stars.push(<BsStar key={i} color="yellow" />)
      }

      return stars
    }
  }

  const isProductOutOfStock = (product) => {
    return product.amount <= 0
  }

  return (
    <>
      <section className="dark:bg-slate-800 dark:text-white">
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div className="grid grid-cols-1 items-start gap-4 md:gap-8 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <button
                onClick={() => {
                  navigate(-1)
                }}
                className="flex flex-row items-center text-orange-600 hover:text-orange-400 mx-5"
              >
                <BsArrowLeftCircleFill />
                <p className="px-3">Back To Orders</p>
              </button>
              <img
                alt={product.name}
                src={product.imageUrl}
                className="w-full rounded-xl object-cover bg-center bg-white"
              />
            </div>

            <div className="sticky top-0">
              <div className="mt-4 md:mt-20 flex justify-between w-full">
                <div className="max-w-[35ch] space-y-2">
                  <h1 className="text-xl font-bold sm:text-2xl ">
                    {product.name}
                  </h1>

                  <div className="flex flex-row">
                    <span className="flex flex-row mr-3 mt-1">
                      {renderStars(product.averageRating)}{" "}
                    </span>
                    {product.averageRating <= 0 ? (
                      ""
                    ) : (
                      <>
                        <p>
                          {Math.round(product.averageRating * 10) / 10} of 5
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <ShareButton product={product} />
                  <div className="mt-1.5 mx-5">
                    <button
                      onClick={() => handleWishList(product)}
                      className="rounded-full p-1 bg-white text-gray-900 transition hover:text-gray-900/50"
                    >
                      <span className="sr-only">Wishlist</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={getProductClasses(product)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <span className="pointer-events-none absolute -top-10 -left-5 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-700 rounded-md px-3 py-2 text-white">
                        WishList
                      </span>
                    </button>
                  </div>
                  {isProductOutOfStock(product) ? (
                    <p className="text-2xl text-red-600 font-bold mr-20 mt-3">
                      Out of Stock
                    </p>
                  ) : (
                    <p className="text-2xl text-teal-600 font-bold mr-3 md:mr-20">
                      ${product.price}
                    </p>
                  )}
                </div>
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
              <div className="flex flex-row md:flex-col gap-5 md:gap-2 w-full">
                <button
                  type="submit"
                  className="flex w-1/2 md:w-1/3 mt-5 text-center rounded bg-orange-600 text-white p-4 text-sm font-medium transition hover:scale-105 align-middle text-center items-center"
                  disabled={isProductOutOfStock(product) ? true : false}
                  onClick={() => handleAddToCart(product)}
                >
                  <div className="px-2">
                    <BsFillBagPlusFill />
                  </div>
                  Add a Kilo to the cart
                </button>
                <Link
                  to="/cart"
                  className="flex text-center w-1/2 md:w-fit mt-5 rounded bg-gray-600 text-white p-4 text-sm font-medium transition hover:bg-gray-400 items-center align-middle"
                >
                  <div className="pr-2">
                    <BsFillCartFill />
                  </div>
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <RelatedProducts productId={product.id} />
        <Divider />
        <AddReview product={product} />
        <Divider />
        <Reviews productItem={product} productId={product.id} />
      </section>
    </>
  )
}

export default ProductItem
