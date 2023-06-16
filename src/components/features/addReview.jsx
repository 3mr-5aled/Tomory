import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import { BsFillStarFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { auth, db } from "../../firebase/config"
import { v4 } from "uuid"
import { useDispatch, useSelector } from "react-redux"
import { ADD_REVIEW, STORE_PRODUCTS } from "../../redux/slice/productSlice"
import {
  selectIsLoggedIn,
  selectUserEmail,
  selectUserID,
  selectUserName,
  selectUserPhoto,
} from "../../redux/slice/authSlice"

const AddReview = ({ product }) => {
  const [review, setReview] = useState({ rating: 0, comment: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const uniqueId = v4()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const userID = useSelector(selectUserID)
  const userName = useSelector(selectUserName)
  const userPhoto = useSelector(selectUserPhoto)

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    // Check if the user is signed in

    if (!isLoggedIn) {
      toast.error("Please login first to add a review")
      return
    }

    // Construct the review object
    const today = new Date()
    const date = today.toDateString()
    const newReview = {
      id: uniqueId,
      userID,
      userName,
      userPhoto,
      rating: review.rating,
      comment: review.comment,
      date: date,
      createdAt: Timestamp.now().toDate(),
    }

    // Update the product document in Firestore
    const productRef = doc(db, "products", product.id)
    try {
      await updateDoc(productRef, {
        reviews: arrayUnion(newReview), // Use arrayUnion to add the new review to the array
      })

      // Dispatch the action to update the Redux store
      dispatch(ADD_REVIEW({ productId: product.id, review: newReview }))

      // Review added successfully
      setReview({ rating: 0, comment: "" })
      setRating(0)
      setHover(0)
      toast.success("Your review has been added")
    } catch (error) {
      // Error adding review
      console.log(error)
      toast.error("Error adding review: ", error)
    }
  }

  const handleRatingChange = (index) => {
    const newRating = index
    setRating(newRating)
    setReview({ ...review, rating: newRating })
  }

  return (
    <div className="mt-8 container p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-3xl underline">
        Add a Review
      </h2>
      <form onSubmit={handleSubmitReview} className="my-3">
        <div className="flex items-center mb-4">
          <label htmlFor="rating" className="mr-2">
            Rating:
          </label>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1
              return (
                <button
                  type="button"
                  key={index}
                  className={
                    index <= (hover || rating)
                      ? "text-yellow-400 p-1"
                      : "text-gray-400 p-1"
                  }
                  onClick={() => handleRatingChange(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  onDoubleClick={() => {
                    setRating(0)
                    setHover(0)
                  }}
                >
                  <BsFillStarFill />
                </button>
              )
            })}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Comment:
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <div className="flex flex-row gap-4">
          <button
            className="bg-orange-600 rounded-md text-white hover:bg-orange-400 p-3"
            type="submit"
          >
            Submit Review
          </button>
          {!isLoggedIn ? (
            <button
              className="bg-transparent  md:mx-3 rounded-md text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white p-3"
              onClick={() => navigate("/login")}
            >
              Go to login page
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  )
}

export default AddReview
