import React from "react"
import { Admin } from "../../pages"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectProducts } from "../../redux/slice/productSlice"
import {
  BsFillBagFill,
  BsFillBoxSeamFill,
  BsCurrencyDollar,
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

  const displayedData = [
    { number: products.length, icon: BsFillBagFill, totalOf: "Products" },
    {
      number: adminOrders.length,
      icon: BsFillBoxSeamFill,
      totalOf: "Orders",
    },
    { number: totalProfit + " $", icon: BsCurrencyDollar, totalOf: "Profit" },
    {
      number: totalDelivered,
      icon: FaTruck,
      totalOf: "Deliverd Orders",
    },
  ]

  return (
    <Admin>
      <div className="p-5">
        <h2 className="text-2xl text-orange-400 font-bold">Welcome Admin</h2>
        <p className="mt-5 dark:text-white">
          You can here add new products and edit them
        </p>
        <div className="flex flex-row gap-5">
          <Link
            to="/admin/create"
            className="block bg-orange-600 hover:bg-orange-400 text-white rounded-xl my-5 p-3 w-fit"
          >
            Create a Product
          </Link>
          <Link
            to="/admin/product_view"
            className="block bg-gray-500 hover:bg-gray-400 text-white rounded-xl my-5 p-3 w-fit"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="block border-2 text-orange-600 border-orange-600 hover:bg-orange-400 hover:text-white rounded-xl my-5 p-3 w-fit"
          >
            Manage Orders
          </Link>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 my-5 gap-5">
          {displayedData.map((data, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-5 rounded-xl w-full dark:bg-slate-500"
            >
              <data.icon className="text-4xl text-orange-600 my-2 dark:text-orange-500" />
              <span className="text-2xl font-bold my-2 dark:text-white">
                {data.number}
              </span>
              <h3 className="text-lg text-gray-700 dark:text-gray-300">
                Total {data.totalOf}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  )
}

export default AdminDashboard
