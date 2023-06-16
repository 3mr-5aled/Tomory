import React from "react"
import { useNavigate } from "react-router-dom"

const OrderTable = ({ orders, status }) => {
  const navigate = useNavigate()
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center table-auto">
        <thead className="bg-gray-200 dark:bg-slate-500 dark:text-white">
          <tr>
            <th className="px-4 py-2">s/n</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Order Amount</th>
            <th className="px-4 py-2">Order Status</th>
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
                <td className="px-4 py-2 bg-gray-200 dark:bg-slate-500 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-yellow-500 dark:text-yellow-300">
                  {orderDate} at {orderTime}
                </td>
                <td className="px-4 py-2">{id}</td>
                <td className="px-4 py-2 text-green-500 dark:text-green-300">
                  {"$"}
                  {orderAmount}
                </td>
                <td className="px-4 py-2 flex justify-center whitespace-nowrap">
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
    </div>
  )
}

export default OrderTable
