import React from "react"
import { Admin } from "../../pages"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectProducts } from "../../redux/slice/productSlice"
import {
  BsFillBagFill,
  BsFillBoxSeamFill,
  BsCurrencyDollar,
  BsPlusLg,
  BsGearFill,
} from "react-icons/bs"
import { FaTruck } from "react-icons/fa"
import {
  selectAdminOrders,
  selectDeliveredOrdersCount,
  selectTotalOrderAmountSum,
} from "../../redux/slice/orderSlice"

const AdminDashboard = () => {
  const products = useSelector(selectProducts)
  const adminOrders = useSelector(selectAdminOrders)
  const totalProfit = useSelector(selectTotalOrderAmountSum)
  const totalDelivered = useSelector(selectDeliveredOrdersCount)

  const stats = [
    {
      label: "Products",
      value: products.length,
      icon: BsFillBagFill,
      color: "amber",
    },
    {
      label: "Orders",
      value: adminOrders.length,
      icon: BsFillBoxSeamFill,
      color: "orange",
    },
    {
      label: "Revenue",
      value: `$${totalProfit}`,
      icon: BsCurrencyDollar,
      color: "emerald",
    },
    { label: "Delivered", value: totalDelivered, icon: FaTruck, color: "blue" },
  ]

  return (
    <Admin>
      <div className="space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-amber-900 dark:text-white">
              Overview
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
              Welcome back, Administrator. Here's what's happening today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/create-product"
              className="flex items-center gap-2 rounded-2xl bg-amber-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-amber-900/20 transition-all hover:bg-amber-700 hover:-translate-y-0.5"
            >
              <BsPlusLg strokeWidth={1} />
              New Product
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-2 rounded-2xl bg-white dark:bg-slate-800 px-6 py-3 text-sm font-bold uppercase tracking-widest text-amber-900 dark:text-amber-500 border border-amber-100 dark:border-slate-700 shadow-sm transition-all hover:bg-amber-50 dark:hover:bg-slate-700 hover:-translate-y-0.5"
            >
              <BsGearFill />
              Manage Orders
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-amber-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 animate-fadeUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-50 dark:bg-slate-800 opacity-50 group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 shadow-inner`}
                >
                  <stat.icon size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-400">
                    Total {stat.label}
                  </p>
                  <h3 className="font-display text-3xl font-bold text-amber-900 dark:text-white">
                    {stat.value}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-[2rem] border border-amber-100 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-8 backdrop-blur-sm">
            <h3 className="font-display text-2xl font-bold text-amber-900 dark:text-white mb-6">
              Store Health
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-wider">
                    Inventory Status
                  </span>
                </div>
                <span className="text-sm font-bold text-emerald-600">
                  Optimal
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                    Active Harvests
                  </span>
                </div>
                <span className="text-sm font-bold text-blue-600">
                  {products.length} Products
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-dashed border-amber-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center">
            <div className="mb-4 p-4 rounded-full bg-amber-50 dark:bg-slate-800">
              <BsPlusLg className="text-amber-600" size={32} />
            </div>
            <h3 className="font-display text-xl font-bold text-amber-900 dark:text-white mb-2">
              Ready for a new harvest?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
              Quickly add new date varieties and manage your inventory with our
              streamlined tools.
            </p>
            <Link
              to="/admin/create-product"
              className="text-sm font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 underline underline-offset-8"
            >
              Go to Creation
            </Link>
          </div>
        </div>
      </div>
    </Admin>
  )
}

export default AdminDashboard
