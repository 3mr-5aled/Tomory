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

  const [searchParams] = useSearchParams()

  useEffect(() => {
    setIsLoading(true)

    const saveOrder = async () => {
      try {
        const today = new Date()
        const date = today.toDateString()
        const time = today.toLocaleTimeString()
        const orderConfig = {
          userID,
          firstName: state?.firstName || "N/A",
          lastName: state?.lastName || "N/A",
          email: state?.email || "N/A",
          phoneNumber: state?.phoneNumber || "N/A",
          country: state?.country || "N/A",
          postalCode: state?.postalCode || "N/A",
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
    } else if (searchParams.get("status") === "fail") {
      toast.error("Failed Payment")
      setIsLoading(false)
      setStatus("fail")
    } else {
      updateProductAmount()
        .then(() => saveOrder())
        .then(() => {
          setIsLoading(false)
          setStatus(searchParams.get("status") || "success")
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
      <div className="text-center animate-fadeUp">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100/50 p-4 dark:bg-green-900/20">
          <svg viewBox="0 0 24 24" className="h-full w-full text-green-600 dark:text-green-400">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        </div>
        <h3 className="font-display text-4xl font-bold text-stone-900 dark:text-white">Order Successful!</h3>
        <p className="mt-4 text-lg text-stone-600 dark:text-stone-300">
          Thank you for your purchase. Your premium dates are on their way!
        </p>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Check your email for order confirmation and tracking details.
        </p>
      </div>
    )
  }

  const FailComponent = () => {
    return (
      <div className="text-center animate-fadeUp">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100/50 p-4 dark:bg-red-900/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="h-full w-full text-red-600 dark:text-red-400"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </div>
        <h3 className="font-display text-4xl font-bold text-stone-900 dark:text-white">Payment Failed</h3>
        <p className="mt-4 text-lg text-stone-600 dark:text-stone-300">
          We couldn't process your payment. Please try again.
        </p>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          If the problem persists, please contact our support team.
        </p>
      </div>
    )
  }

  return (
    <main className="relative flex min-h-[calc(100dvh-5rem)] items-center justify-center overflow-hidden bg-[#f7f1e8] px-6 py-20 dark:bg-slate-900 font-body">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-20" />
      <div className="absolute -left-20 -top-20 h-96 w-96 animate-drift rounded-full bg-amber-200/40 blur-[100px] dark:bg-amber-900/20" />
      <div className="absolute -right-20 -bottom-20 h-96 w-96 animate-drift rounded-full bg-orange-200/30 blur-[100px] dark:bg-orange-900/10" />

      <div className="relative z-10 w-full max-w-2xl">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader />
            <p className="mt-8 font-display text-2xl text-stone-800 dark:text-amber-50">Processing your order...</p>
          </div>
        ) : (
          <div className="rounded-[3rem] border border-amber-200/60 bg-white/70 p-12 shadow-2xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80 sm:p-20">
            {status === "success" ? <SuccessComponent /> : <FailComponent />}
            
            <div className="mt-12 flex flex-col items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-full bg-amber-700 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-amber-800 hover:shadow-xl active:scale-[0.98] sm:w-64"
              >
                Back to Homepage
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="text-sm font-bold uppercase tracking-widest text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
              >
                View My Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default CheckoutStatus
