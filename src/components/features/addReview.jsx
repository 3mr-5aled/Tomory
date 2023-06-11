import React, { useState } from "react"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { auth, db } from "../../firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const addReview = ({ product }) => {
  const [review, setReview] = useState({ rating: 0, comment: "" })
  const navigate = useNavigate()
  const handleSubmitReview = (event) => {
    event.preventDefault()

    // Check if the user is signed in
    const user = auth.currentUser
    if (!user) {
      navigate("/login") // Redirect to login page if user is not signed in
      return
    }

    // Construct the review object
    const today = new Date()
    const date = today.toDateString()
    const newReview = {
      userId: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL,
      productId: product.id,
      rating: review.rating,
      comment: review.comment,
      date: date,
    }

    // Add the review to Firestore
    const reviewsRef = collection(db, "Reviews")
    addDoc(reviewsRef, newReview)
      .then(() => {
        // Review added successfully
        toast.success("Your comment has been added")
        setReview({ rating: 0, comment: "" })
        window.location.reload(false)
      })
      .catch((error) => {
        // Error adding review
        toast.error("Error adding review: ", error)
      })
  }

  const handleRatingChange = (rating) => {
    setReview({ ...review, rating })
  }

  // Array to represent the stars
  const stars = Array.from({ length: 5 }, (_, index) => index + 1)

  return (
    <>
      {/* Existing JSX code... */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
        {auth.currentUser ? (
          <form onSubmit={handleSubmitReview}>
            <div className="flex items-center mb-4">
              <label htmlFor="rating" className="mr-2">
                Rating:
              </label>
              {stars.map((star) => (
                <label key={star} className="rating-star">
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={review.rating === star}
                    onChange={() => handleRatingChange(star)}
                    required
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`feather feather-star ${
                      review.rating >= star ? "active" : ""
                    }`}
                  >
                    <polygon points="12 2 15.09 8.5 22 9.27 17 14 18.18 21.19 12 17.77 5.82 21.19 7 14 2 9.27 8.91 8.5 12 2" />
                  </svg>
                </label>
              ))}
            </div>
            <div className="mb-4">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
                // required
              ></textarea>
            </div>
            <button type="submit">Submit Review</button>
          </form>
        ) : (
          <p>Please sign in to add a review.</p>
        )}
      </div>
    </>
  )
}

export default addReview
