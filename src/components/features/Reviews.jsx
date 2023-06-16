import { doc, updateDoc } from "firebase/firestore"
import React, { useEffect } from "react"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { db } from "../../firebase/config"
import { selectIsAdmin } from "../../redux/slice/authSlice"
import avatar from "../../assets/avatar.png"

import {
  REMOVE_REVIEW,
  UPDATE_AVERAGE_RATING,
  selectProductReviews,
} from "../../redux/slice/productSlice"

const Reviews = ({ productItem, productId }) => {
  const isAdmin = useSelector(selectIsAdmin)
  var reviews = useSelector((state) => selectProductReviews(state, productId))
  const dispatch = useDispatch()

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      )
      const averageRating = totalRating / reviews.length || 0

      dispatch(UPDATE_AVERAGE_RATING({ productId, averageRating }))
      updateDoc(doc(db, "products", productId), { averageRating })
    } else {
      dispatch(UPDATE_AVERAGE_RATING({ productId, averageRating: 0 }))
      updateDoc(doc(db, "products", productId), { averageRating: 0 })
    }
  }, [reviews, productId, dispatch])

  const handleDeleteReview = async (reviewId) => {
    try {
      const productRef = doc(db, "products", productId)
      await updateDoc(productRef, {
        reviews: reviews.filter((review) => review.id !== reviewId),
      })
      // Update the product state in the Redux store
      dispatch(REMOVE_REVIEW({ productId, reviewId }))

      toast.success("Comment has been deleted successfully")
    } catch (error) {
      toast.error("Error deleting review")
      console.error("Error deleting review:", error)
    }
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    const stars = []
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} color="yellow" />)
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" color="yellow" />)
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={`empty-${i}`} color="yellow" />)
    }

    return stars
  }

  return (
    <>
      <section className="py-3 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-3xl decoration-wavy underline underline-offset-2 text-center">
          Reviews
        </h2>

        {reviews.length > 0 ? (
          <>
            {reviews.map((review) => (
              <article
                key={review.id}
                className="container flex flex-row md:mx-10 my-3 w-5/6 justify-between items-center bg-gray-200 rounded-md p-4 md:p-8 dark:bg-slate-600"
              >
                <div>
                  <div className="flex items-center mb-4 space-x-4">
                    <img
                      className="w-10 h-10 rounded-full bg-orange-300"
                      src={review.userPhoto || avatar}
                      alt="avatar"
                    />
                    <div className="space-y-1 font-medium dark:text-white">
                      <p>{review.userName}</p>
                    </div>
                  </div>

                  <div className="flex flex-row">
                    {renderStars(review.rating)}
                  </div>
                  <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                    <p>Reviewed on {review.date}</p>
                  </footer>
                  <p className="mb-2 text-black dark:text-gray-100">
                    {review.comment}
                  </p>
                </div>
                {isAdmin && (
                  <button
                    className="relative group text-gray-600 transition hover:text-red-600 justify-center bg-white rounded-full p-3 h-fit z-0"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <span className="sr-only">Remove item</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <span className="pointer-events-none absolute -top-10 -left-8 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-700 rounded-md px-3 py-2 text-white">
                      Remove
                    </span>
                  </button>
                )}
              </article>
            ))}
          </>
        ) : (
          <p className="text-red-500 my-10 text-xl">No reviews yet</p>
        )}
      </section>
    </>
  )
}

export default Reviews
