import React from "react"
import { useNavigate } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs"

const OrderTable = ({ orders, status }) => {
  const navigate = useNavigate()

  const getStatusColor = (orderStatus) => {
    switch (orderStatus) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "Processing":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-amber-100 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-amber-100 dark:border-slate-800">
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                #
              </th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Date & Time
              </th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Order ID
              </th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">
                Amount
              </th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">
                Status
              </th>
              <th className="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-50 dark:divide-slate-800">
            {orders.map((order, index) => {
              const { id, orderDate, orderTime, orderAmount, orderStatus } =
                order
              return (
                <tr
                  key={id}
                  onClick={() => navigate(`${status}order-details/${id}`)}
                  className="group cursor-pointer transition-all hover:bg-amber-50/50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-amber-900 dark:text-white">
                        {orderDate}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                        {orderTime}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                      {id.substring(0, 12)}...
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-sm font-bold text-amber-700 dark:text-amber-500">
                      ${orderAmount}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span
                        className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusColor(orderStatus)}`}
                      >
                        {orderStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <BsArrowRight
                      className="inline-block text-amber-900/20 group-hover:text-amber-600 group-hover:translate-x-1 transition-all"
                      size={18}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable
