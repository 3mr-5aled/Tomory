import React, { useEffect } from "react"
import Loader from "../Loader"
import { useDispatch, useSelector } from "react-redux"
import useFetchCollection from "../../customHooks/useFetchCollection"
import { Admin } from "../../pages"
import {
  STORE_ADMIN_ORDERS,
  selectAdminOrders,
} from "../../redux/slice/orderSlice"
import OrderTable from "../features/OrderTable"
import { BsBoxSeamFill } from "react-icons/bs"

const AdminOrderView = () => {
  const { data, isLoading } = useFetchCollection("orders")
  const AdminOrders = useSelector(selectAdminOrders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_ADMIN_ORDERS(data))
  }, [dispatch, data])

  return (
    <Admin>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-amber-900 dark:text-white">
              Order History
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
              Review and manage customer orders from the current season.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
            <BsBoxSeamFill size={24} />
          </div>
        </header>

        <div className="rounded-3xl bg-amber-50/50 dark:bg-slate-800/50 p-6 border border-amber-100 dark:border-slate-700">
          <div className="flex items-center gap-3 text-amber-900/60 dark:text-slate-400 mb-6">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-sm font-bold uppercase tracking-widest">
              Select an order to manage its status or view details
            </p>
          </div>

          {isLoading && <Loader />}

          <div className="mt-4">
            {AdminOrders.length === 0 ? (
              <div className="text-center py-20 bg-white/40 dark:bg-slate-900/40 rounded-3xl border-2 border-dashed border-amber-200 dark:border-slate-700">
                <p className="font-display text-xl text-amber-900/40 dark:text-slate-500 font-bold">
                  No orders found in the system.
                </p>
              </div>
            ) : (
              <OrderTable orders={AdminOrders} status={"/admin/"} />
            )}
          </div>
        </div>
      </div>
    </Admin>
  )
}

export default AdminOrderView
