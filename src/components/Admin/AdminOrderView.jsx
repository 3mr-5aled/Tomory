import React, { useEffect, useState } from "react"
import Loader from "../Loader"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useFetchCollection from "../../customHooks/useFetchCollection"
import { Admin } from "../../pages"
import {
  STORE_ADMIN_ORDERS,
  selectAdminOrders,
} from "../../redux/slice/orderSlice"
import OrderTable from "../features/OrderTable"

const AdminOrderView = () => {
  const { data, isLoading } = useFetchCollection("orders")
  const AdminOrders = useSelector(selectAdminOrders)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(STORE_ADMIN_ORDERS(data))
  }, [dispatch, data])

  return (
    <Admin>
      <div>
        <h2 className="text-slate-900 text-2xl md:text-3xl font-bold text-center my-5 decoration-wavy underline underline-offset-8 dark:text-white">
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
            {AdminOrders.length === 0 ? (
              <p className="text-red-500 font-bold">No order found</p>
            ) : (
              <OrderTable orders={AdminOrders} status={"/admin/"} />
            )}
          </div>
        </>
      </div>
    </Admin>
  )
}

export default AdminOrderView
