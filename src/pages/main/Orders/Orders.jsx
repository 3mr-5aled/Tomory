import React, { useEffect, useState } from "react"
import Loader from "../../../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { STORE_ORDERS, selectOrders } from "../../../redux/slice/orderSlice"
import { selectUserID } from "../../../redux/slice/authSlice"
import { useNavigate } from "react-router-dom"
import { db } from "../../../firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore"
import OrderTable from "../../../components/features/OrderTable"

function Orders() {
  const userID = useSelector(selectUserID)
  const orders = useSelector(selectOrders)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("userID", "==", userID))
        const querySnapshot = await getDocs(q)
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        dispatch(STORE_ORDERS(ordersData))
        setIsLoading(false)
      } catch (error) {
        console.log("Error getting orders:", error)
        setIsLoading(false)
      }
    }

    if (userID) {
      fetchOrders()
    }
  }, [dispatch, userID])

  return (
    <main className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#f7f1e8] pb-20 dark:bg-slate-900 font-body">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-20" />
      <div className="absolute -left-20 -top-20 h-96 w-96 animate-drift rounded-full bg-amber-200/40 blur-[100px] dark:bg-amber-900/20" />
      <div className="absolute -right-20 -bottom-20 h-96 w-96 animate-drift rounded-full bg-orange-200/30 blur-[100px] dark:bg-orange-900/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-stone-900 dark:text-amber-50 md:text-5xl">
            Order History
          </h1>
          <p className="mt-4 text-stone-600 dark:text-stone-400">
            Keep track of all your premium date purchases
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="animate-fadeUp rounded-[2.5rem] border border-amber-200/50 bg-white/70 p-6 shadow-2xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80 sm:p-10">
            {orders.length <= 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100/50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012 2v29" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white">No orders yet</h3>
                <p className="mt-2 text-stone-600 dark:text-stone-400">Your order history will appear here once you make a purchase.</p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-8 rounded-full bg-amber-700 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-amber-800 active:scale-[0.98]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <OrderTable orders={orders} status={"/"} />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Orders
