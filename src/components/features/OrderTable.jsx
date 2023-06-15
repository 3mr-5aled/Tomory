import React from "react"
import { useNavigate } from "react-router-dom"

const OrderTable = ({ orders, status }) => {
  const navigate = useNavigate()
  return (
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
          const { id, orderDate, orderTime, orderAmount, orderStatus } = order
          return (
            <tr
              key={id}
              onClick={() => navigate(`${status}order-details/${id}`)}
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
  )
}

export default OrderTable
