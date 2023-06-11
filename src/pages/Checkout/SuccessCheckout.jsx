import React, { useEffect, useState } from "react"
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore"
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { selectUserEmail, selectUserID } from "../../redux/slice/authSlice"
import { useNavigate, useLocation } from "react-router-dom"
import { auth, db } from "../../firebase/config"
import Loader from "../../components/Loader"

function SuccessCheckout() {
  const { state } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const user = auth.currentUser

  const userID = user.uid
  const userEmail = user.email
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)

  useEffect(() => {
    setIsLoading(true)
    const saveOrder = async () => {
      try {
        if (cartItems.length > 0) {
          const today = new Date()
          const date = today.toDateString()
          const time = today.toLocaleTimeString()
          const orderConfig = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            phoneNumber: state.phoneNumber,
            country: state.country,
            postalCode: state.postalCode,
            orderDate: date,
            orderTime: time,
            orderAmount: cartTotalAmount,
            orderStatus: "Order Placed...",
            cartItems,
            createdAt: Timestamp.now().toDate(),
          }

          await addDoc(collection(db, "orders"), orderConfig)
          dispatch(CLEAR_CART())
          toast.success("Order saved")
        } else {
          toast.error("Cart is empty")
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const updateProductAmount = async () => {
      try {
        for (const item of cartItems) {
          const productRef = doc(db, "products", item.id)
          const productDoc = await getDoc(productRef)

          if (productDoc.exists()) {
            const currentAmount = productDoc.data().amount
            const updatedAmount = currentAmount - item.cartQuantity

            await updateDoc(productRef, { amount: updatedAmount })
            toast.success("Amount updated")
          } else {
            console.error("Product not found:", item.id)
          }
        }
      } catch (error) {
        toast.error("Failed to update product amount: " + error.message)
        console.error("Failed to update product amount:", error)
      }
    }

    updateProductAmount()
      .then(() => saveOrder())
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error("Failed to update product amount: " + error.message)
        console.error("Failed to update product amount:", error)
        setIsLoading(false)
        navigate("/checkout/fail")
      })
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-white dark:bg-slate-800 dark:text-gray-300 flex justify-center items-center h-[70vh]">
        <div className="bg-white dark:bg-slate-800 p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 dark:text-white font-semibold text-center">
              Checkout Done!
            </h3>
            <p className="text-gray-600 dark:text-gray-500 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <a
                href="/"
                className="px-12 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessCheckout
