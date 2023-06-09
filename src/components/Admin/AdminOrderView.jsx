import React, { useEffect, useState } from "react"
import Loader from "../Loader"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUserID } from "../../redux/slice/authSlice"
import useFetchCollection from "../../customHooks/useFetchCollection"
import { Admin } from "../../pages"

const AdminOrderView = () => {
  const { data, isLoading } = useFetchCollection("orders")
  const [orders, setOrders] = useState([])
  const userID = useSelector(selectUserID)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setOrders(data)
  }, [dispatch, data])

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`)
  }

  const filteredOrders = orders.filter((order) => order.userID === userID)
  return (
    <Admin>
      <div>
        <h2 className="text-slate-900 text-2xl font-bold text-center my-5 decoration-wavy underline underline-offset-8 dark:text-white">
          Your Order History
        </h2>
        <p className="dark:text-gray-300 px-3">
          Open an order to{" "}
          <b className="dark:text-gray-100">Change order status</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div>
            {orders.length === 0 ? (
              <p className="text-red-500 font-bold">No order found</p>
            ) : (
              <table className="w-full text-center">
                <thead className="bg-gray-200 dark:bg-slate-500 dark:text-white w-full">
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody className="cursor-pointer bg-gray-100 hover:bg-gray-300 transition">
                  {orders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order
                    return (
                      <tr
                        key={id}
                        onClick={() => handleClick(id)}
                        className="bg-gray-100 hover:bg-gray-300 dark:bg-slate-400 dark:text-white rounded"
                      >
                        <td className="bg-gray-200 dark:bg-slate-500 dark:text-white">
                          {index + 1}
                        </td>
                        <td className="text-yellow-500 dark:text-yellow-300">
                          {orderDate} at {orderTime}
                        </td>
                        <td className="">{id}</td>
                        <td className="text-green-500 dark:text-green-300">
                          {"$"}
                          {orderAmount}
                        </td>
                        <td className="flex justify-center">
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `bg-orange-500 rounded w-fit text-white font-bold p-2 m-2`
                                : `bg-green-500 rounded w-fit text-white font-bold p-2 m-2`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </Admin>
  )
}

export default AdminOrderView
