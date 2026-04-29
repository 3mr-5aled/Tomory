import React from "react"
import { BsArrowLeft, BsBoxSeamFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Admin } from "../../pages"
import { selectAdminOrderById } from "../../redux/slice/orderSlice"
import Loader from "../Loader"
import ChangeOrderStatus from "./ChangeOrderStatus"
import OrderDetailsTable from "../features/OrderDetailsTable"

const AdminOrderDetails = () => {
  const { id } = useParams()
  const order = useSelector((state) => selectAdminOrderById(state, id))

  return (
    <Admin>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/orders"
              className="group p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-amber-100 dark:border-slate-700 text-amber-900 dark:text-amber-500 transition-all hover:bg-amber-600 hover:text-white"
            >
              <BsArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-amber-900 dark:text-white">
                Order Management
              </h1>
              <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
                Detailed view and status control for Order #{id.substring(0, 8)}
              </p>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
            <BsBoxSeamFill size={24} />
          </div>
        </header>

        {!order ? (
          <Loader />
        ) : (
          <div className="space-y-10">
            <OrderDetailsTable order={order} />

            <div className="rounded-[2.5rem] bg-amber-50/50 dark:bg-slate-800/50 p-8 border border-amber-100 dark:border-slate-700 shadow-inner">
              <ChangeOrderStatus order={order} id={id} />
            </div>
          </div>
        )}
      </div>
    </Admin>
  )
}

export default AdminOrderDetails
