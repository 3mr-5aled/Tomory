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
        // const querySnapshot = await db
        //   .collection("orders")
        //   .where("userID", "==", userID)
        //   .get()
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

    fetchOrders()
  }, [dispatch, userID])

  return (
    <>
      <h1 className="text-slate-900 text-2xl md:text-3xl font-bold text-center my-5 decoration-wavy underline underline-offset-4 dark:text-white">
        Orders
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-[50vh] m-5">
          {orders.length <= 0 ? (
            <p className="my-10 text-center text-xl text-red-500">
              No order found
            </p>
          ) : (
            <OrderTable orders={orders} status={"/"} />
          )}
        </div>
      )}
    </>
  )
}

export default Orders
