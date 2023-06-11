import React, { useState, useEffect } from "react"
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../../firebase/config"
import { useSelector } from "react-redux"
import { selectIsAdmin } from "../../redux/slice/authSlice"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([])
  //   const [averageRating, setAverageRating] = useState(null)
  const isAdmin = useSelector(selectIsAdmin)

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsRef = collection(db, "Reviews")
      const querySnapshot = await getDocs(reviewsRef)

      const reviewsData = []
      querySnapshot.forEach((doc) => {
        if (doc.data().productId === productId) {
          // Replace 'your-product-id' with the actual product ID
          reviewsData.push({ id: doc.id, ...doc.data() })
        }
      })

      setReviews(reviewsData)
    }
    if (reviews) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      )
      var averageRating
      if (totalRating > 0) {
        averageRating = totalRating / reviews.length
      } else {
        averageRating = 0
      }
      //   setAverageRating(averageRating)
      updateDoc(doc(db, "products", productId), { averageRating })
    }
    //  ! add the average rate to the product document

    fetchReviews()
  }, [reviews])

  const handleDeleteReview = async (reviewId) => {
    try {
      const reviewRef = doc(db, "Reviews", reviewId)
      await deleteDoc(reviewRef)

      // Remove the deleted review from the state
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      )
      window.location.reload(false)
    } catch (error) {
      console.error("Error deleting review:", error)
    }
  }
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    const stars = []
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill color="yellow" />)
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf color="yellow" />)
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar color="yellow" />)
    }

    return stars
  }
  return (
    <>
      {reviews.map((review) => (
        <article key={review.id}>
          <div className="flex items-center mb-4 space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src={review.userPhoto}
              alt=""
            />
            <div className="space-y-1 font-medium dark:text-white">
              <p>{review.userName}</p>
            </div>
          </div>

          <div className="flex flex-row">{renderStars(review.rating)}</div>
          <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
            <p>Reviewed on {review.date}</p>
          </footer>
          <p className="mb-2 text-black dark:text-gray-400">{review.comment}</p>
          {/* <aside>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
        <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
            <a href="#" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Helpful</a>
            <a href="#" className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Report abuse</a>
        </div>
    </aside> */}
          {isAdmin && (
            <button
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
              onClick={() => handleDeleteReview(review.id)}
            >
              Delete Review
            </button>
          )}
        </article>
      ))}
    </>
  )
}

export default Reviews
