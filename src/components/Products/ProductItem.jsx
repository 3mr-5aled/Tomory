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
import { selectIsLoggedIn } from "../../redux/slice/authSlice"
import { toast } from "react-toastify"

const ProductItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const product = useSelector((state) => selectProductById(state, id))
  const isLoggedIn = useSelector(selectIsLoggedIn)
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
    if (isProductOutOfStock(product)) {
      toast.error("This product is out of stock come back when it is in stock")
      return
    }
    if (isLoggedIn) {
      dispatch(ADD_TO_CART(product))
      dispatch(CALCULATE_TOTAL_QUANTITY())
    } else {
      navigate("/login")
    }
  }

  const renderStars = (rating) => {
    if (rating <= 0) {
      return (
        <p className="text-sm italic text-amber-900/40 dark:text-slate-500">
          Not yet rated
        </p>
      )
    } else {
      const fullStars = Math.floor(rating)
      const hasHalfStar = rating % 1 !== 0

      const stars = []
      for (let i = 0; i < fullStars; i++) {
        stars.push(<BsStarFill key={i} className="text-amber-400" />)
      }

      if (hasHalfStar) {
        stars.push(<BsStarHalf key={fullStars} className="text-amber-400" />)
      }

      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          <BsStar key={fullStars + i + 1} className="text-amber-400" />
        )
      }

      return stars
    }
  }

  const isProductOutOfStock = (product) => {
    return product.amount <= 0
  }

  return (
    <>
      <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#f7f1e8] pb-20 font-body dark:bg-slate-900">
        {/* Immersive Background Elements */}
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.15] dark:opacity-[0.05]" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 animate-float-slow rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-900/10" />
        <div className="pointer-events-none absolute -right-32 top-1/2 h-[32rem] w-[32rem] animate-drift rounded-full bg-orange-100/30 blur-[100px] dark:bg-slate-800/20" />

        <div className="relative mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
          {/* Back Button */}
          <button
            onClick={() => {
              navigate(-1)
            }}
            className="group mb-8 flex animate-fadeUp items-center gap-2 text-amber-900/60 transition-colors hover:text-amber-700 dark:text-slate-400 dark:hover:text-amber-500"
          >
            <BsArrowLeftCircleFill className="text-xl transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Back
            </span>
          </button>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Image Showcase */}
            <div className="animate-fadeUp" style={{ animationDelay: "100ms" }}>
              <div className="relative rounded-[2.5rem] border border-amber-200/60 bg-white/80 p-6 shadow-2xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 md:p-12">
                <div className="absolute inset-4 rounded-[2rem] border border-dashed border-amber-300/30 dark:border-slate-600/30" />
                <img
                  alt={product.name}
                  src={product.imageUrl}
                  className="relative z-10 aspect-square w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Product Details */}
            <div
              className="animate-fadeUp lg:pl-10"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <h1 className="font-display text-4xl font-bold tracking-tight text-amber-950 dark:text-slate-100 md:text-6xl">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {renderStars(product.averageRating)}
                    </div>
                    {product.averageRating > 0 && (
                      <span className="text-sm font-medium text-amber-900/60 dark:text-slate-400">
                        {Math.round(product.averageRating * 10) / 10} / 5
                      </span>
                    )}
                    <ShareButton product={product} />
                  </div>
                </div>

                <button
                  onClick={() => handleWishList(product)}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/50 shadow-sm backdrop-blur-sm transition-all hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-700"
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
                  <span className="pointer-events-none absolute -top-10 scale-95 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                    Add to Wishlist
                  </span>
                </button>
              </div>

              <div className="mt-8">
                {isProductOutOfStock(product) ? (
                  <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-bold tracking-wider text-red-600 dark:bg-red-900/30">
                    Out of Stock
                  </span>
                ) : (
                  <p className="text-3xl font-bold tracking-tight text-amber-700 dark:text-amber-500">
                    ${product.price}
                  </p>
                )}
              </div>

              <div className="mt-8 space-y-6">
                <div className="prose prose-amber max-w-none dark:prose-invert">
                  <p className="text-lg leading-relaxed text-amber-900/80 dark:text-slate-300">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-amber-100 bg-amber-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
                  <span className="text-sm font-bold uppercase tracking-wider text-amber-700">
                    Note:
                  </span>
                  <p className="text-sm italic text-amber-900/60 dark:text-slate-400">
                    the dates last for one year under normal conditions
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-3 rounded-full px-8 py-5 text-sm font-semibold uppercase tracking-widest text-white shadow-xl transition-all active:scale-95 sm:flex-1 ${
                    isProductOutOfStock(product)
                      ? "cursor-not-allowed bg-slate-400 shadow-none"
                      : "bg-amber-700 shadow-amber-900/20 hover:-translate-y-1 hover:bg-amber-800"
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  <BsFillBagPlusFill className="text-lg" />
                  Add to Cart
                </button>
                <Link
                  to="/cart"
                  className="flex items-center justify-center gap-3 rounded-full border-2 border-amber-900/20 px-8 py-5 text-sm font-semibold uppercase tracking-widest text-amber-900 transition-all hover:bg-amber-900 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 sm:flex-1"
                >
                  <BsFillCartFill className="text-lg" />
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-4">
          <Divider />
          <RelatedProducts productId={product.id} />
          <Divider />
          <AddReview product={product} />
          <Divider />
          <Reviews productItem={product} productId={product.id} />
        </div>
      </section>
    </>
  )
}

export default ProductItem
