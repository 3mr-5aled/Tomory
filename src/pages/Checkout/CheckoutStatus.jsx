import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { db } from "../../firebase/config"
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice"
import { selectIsLoggedIn, selectUserID } from "../../redux/slice/authSlice"

function CheckoutStatus() {
  const { state } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("")

  const userID = useSelector(selectUserID)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)

  const [searchParams] = useSearchParams() // Get the search parameters from the URL

  // http://localhost:5173/checkout/status?status=fail    for failure
  // http://localhost:5173/checkout/status?status=success for successful payment

  useEffect(() => {
    setIsLoading(true)

    const saveOrder = async () => {
      try {
        const today = new Date()
        const date = today.toDateString()
        const time = today.toLocaleTimeString()
        const orderConfig = {
          userID,
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
          editedAt: Timestamp.now().toDate(),
        }

        await addDoc(collection(db, "orders"), orderConfig)
        dispatch(CLEAR_CART())
        toast.success("Order saved")
      } catch (error) {
        toast.error(error.message)
        throw error
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
            throw new Error("Product not found")
          }
        }
      } catch (error) {
        toast.error("Failed to update product amount: " + error.message)
        console.error("Failed to update product amount:", error)
        throw error
      }
    }

    if (!isLoggedIn) {
      toast.error("Please log in first")
      setIsLoading(false)
      setStatus("fail")
    } else if (cartItems.length === 0) {
      toast.error("Cart is empty")
      setIsLoading(false)
      setStatus("fail")
    } else if (searchParams.get("status") == "fail") {
      toast.error("Failed Payment")
      setIsLoading(false)
      setStatus("fail")
    } else {
      updateProductAmount()
        .then(() => saveOrder())
        .then(() => {
          setIsLoading(false)
          setStatus(searchParams.get("status") || "success") // Set the status based on the search parameter or default to "success"
        })
        .catch((error) => {
          setStatus("fail")
          toast.error("Failed to update product amount: " + error.message)
          console.error("Failed to update product amount:", error)
          setIsLoading(false)
        })
    }
  }, [])

  const SuccessComponent = () => {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 md:mx-auto">
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
          <p className="text-gray-600 dark:text-gray-300 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {" "}
            Have a great day!{" "}
          </p>
        </div>
      </div>
    )
  }

  const FailComponent = () => {
    return (
      <div className="flex flex-col fill-red-500 items-center justify-center bg-white dark:bg-slate-800 p-6  md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="text-red-600 w-16 h-16 mx-auto my-6"
        >
          {" "}
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />{" "}
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 dark:text-white font-semibold text-center">
            Checkout Failed!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 my-2">
            Sorry, your payment could not be processed.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white  dark:bg-slate-800">
      <div className="container mx-auto pt-12 px-6 flex flex-col items-center justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="max-w-md mx-auto">
            {status === "success" ? <SuccessComponent /> : <FailComponent />}
          </div>
        )}
        <button
          className="bg-orange-600 text-white hover:bg-orange-400 p-3 text-center rounded-md"
          onClick={() => navigate("/")}
        >
          Back to HomePage
        </button>
      </div>
    </div>
  )
}

export default CheckoutStatus
