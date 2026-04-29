import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useFetchDocument from "../../../customHooks/useFetchDocument"
import Loader from "../../../components/Loader"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { selectOrderById } from "../../../redux/slice/orderSlice"
import OrderDetailsTable from "../../../components/features/OrderDetailsTable"

const OrderDetails = () => {
  const { id } = useParams()
  const order = useSelector((state) => selectOrderById(state, id))

  return (
    <main className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#f7f1e8] pb-20 dark:bg-slate-900 font-body">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-20" />
      <div className="absolute -left-20 -top-20 h-96 w-96 animate-drift rounded-full bg-amber-200/40 blur-[100px] dark:bg-amber-900/20" />
      <div className="absolute -right-20 -bottom-20 h-96 w-96 animate-drift rounded-full bg-orange-200/30 blur-[100px] dark:bg-orange-900/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link
            to="/orders"
            className="group flex items-center gap-2 text-stone-600 transition-colors hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400"
          >
            <BsArrowLeftCircleFill className="text-2xl transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold uppercase tracking-wider text-sm">Back to Orders</span>
          </Link>
          
          <h1 className="font-display text-center text-4xl font-bold tracking-tight text-stone-900 dark:text-amber-50 md:text-5xl">
            Order Details
          </h1>
          
          <div className="hidden w-32 md:block"></div> {/* Spacer for centering on desktop */}
        </div>

        {order === null ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="animate-fadeUp rounded-[2.5rem] border border-amber-200/50 bg-white/70 p-6 shadow-2xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80 sm:p-10">
            <div className="mb-8 flex flex-col justify-between border-b border-amber-100 pb-6 dark:border-slate-700 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Order ID</p>
                <h3 className="mt-1 font-mono text-lg font-bold text-stone-900 dark:text-white">{id}</h3>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Placed on</p>
                <p className="mt-1 font-semibold text-stone-900 dark:text-white">{order.orderDate} at {order.orderTime}</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <OrderDetailsTable order={order} />
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4 rounded-3xl bg-amber-50/50 p-6 dark:bg-slate-900/40">
              <div className="flex-1 min-w-[200px]">
                <h4 className="font-display text-xl font-bold text-stone-900 dark:text-white">Shipping To</h4>
                <div className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                  <p className="font-bold text-stone-900 dark:text-white">{order.firstName} {order.lastName}</p>
                  <p>{order.phoneNumber}</p>
                  <p>{order.email}</p>
                  <p className="mt-1 italic">{order.country}, {order.postalCode}</p>
                </div>
              </div>
              <div className="flex-1 min-w-[200px] text-right">
                <h4 className="font-display text-xl font-bold text-stone-900 dark:text-white">Order Status</h4>
                <div className="mt-2 inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                  {order.orderStatus}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default OrderDetails
