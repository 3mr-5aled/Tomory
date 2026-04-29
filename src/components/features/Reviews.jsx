import { doc, updateDoc } from "firebase/firestore"
import React, { useEffect } from "react"
import { BsStar, BsStarFill, BsStarHalf, BsTrash3Fill } from "react-icons/bs"
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
        0,
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
      stars.push(<BsStarFill key={`full-${i}`} className="text-amber-400" />)
    }
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className="text-amber-400" />)
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <BsStar
          key={`empty-${i}`}
          className="text-amber-200 dark:text-slate-600"
        />,
      )
    }
    return stars
  }

  return (
    <section className="py-16">
      <div className="flex flex-col items-center mb-12">
        <h2 className="font-display text-3xl font-bold tracking-tight text-amber-900 dark:text-amber-50 md:text-5xl">
          Customer Reviews
        </h2>
        <div className="mt-4 h-1 w-24 rounded-full bg-amber-600/30" />
      </div>

      {reviews.length > 0 ? (
        <div className="grid gap-6 md:px-10">
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className="group relative flex flex-col md:flex-row gap-6 items-start md:items-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-amber-200/30 dark:border-slate-700/50 shadow-xl shadow-amber-200/5 transition-all hover:shadow-amber-200/10 animate-fadeUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full" />
                  <img
                    className="relative w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-lg"
                    src={review.userPhoto || avatar}
                    alt={review.userName}
                  />
                </div>
              </div>

              <div className="flex-grow space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-amber-900 dark:text-amber-50">
                      {review.userName}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-900/40 dark:text-slate-500">
                    {review.date}
                  </span>
                </div>

                <p className="text-lg leading-relaxed text-amber-900/80 dark:text-slate-300 italic">
                  "{review.comment}"
                </p>
              </div>

              {isAdmin && (
                <button
                  className="absolute top-6 right-6 p-2 rounded-full bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm dark:bg-red-900/20 dark:text-red-500"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  <BsTrash3Fill size={16} />
                </button>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-amber-50/30 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-amber-200/50 dark:border-slate-700/50">
          <p className="font-display text-2xl text-amber-900/40 dark:text-slate-500">
            No stories shared yet for this harvest.
          </p>
        </div>
      )}
    </section>
  )
}

export default Reviews
