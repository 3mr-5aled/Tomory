import React from "react"
import { BsBoxSeam, BsCurrencyDollar, BsHash } from "react-icons/bs"

const OrderDetailsTable = ({ order }) => {
  return (
    <div className="space-y-8">
      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-amber-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <BsHash size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Order ID
              </p>
              <p className="text-sm font-mono font-bold text-amber-900 dark:text-white truncate max-w-[150px]">
                {order.id}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
              <BsCurrencyDollar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Total Amount
              </p>
              <p className="text-lg font-bold text-emerald-600">
                ${order.orderAmount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <BsBoxSeam size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Order Status
              </p>
              <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mt-1">
                {order.orderStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-hidden rounded-3xl border border-amber-100 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-amber-100 dark:border-slate-800">
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  #
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Product
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">
                  Price
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">
                  Quantity
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50 dark:divide-slate-800">
              {order.cartItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="group transition-colors hover:bg-white/50 dark:hover:bg-slate-900/50"
                >
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-5">
                    <a
                      href={`/product/${item.id}`}
                      className="flex items-center gap-4 group/item"
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-xl border border-amber-100 bg-white p-2 transition-transform group-hover/item:scale-110">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="font-display text-base font-bold text-amber-900 dark:text-white group-hover/item:text-amber-600 transition-colors">
                        {item.name}
                      </span>
                    </a>
                  </td>
                  <td className="px-6 py-5 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
                    ${item.price}
                  </td>
                  <td className="px-6 py-5 text-center text-sm font-bold text-amber-900 dark:text-white">
                    {item.cartQuantity}
                  </td>
                  <td className="px-6 py-5 text-right font-display text-base font-bold text-amber-700 dark:text-amber-500">
                    ${(item.price * item.cartQuantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsTable
