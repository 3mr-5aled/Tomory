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
    <section>
      <div>
        <h2 className="text-slate-900 text-2xl font-bold text-center my-5 decoration-wavy underline underline-offset-4 dark:text-white">
          Order Details
        </h2>
        <div>
          <Link
            to="/orders"
            className="flex flex-row items-center text-orange-600 hover:text-orange-400 mx-5"
          >
            <BsArrowLeftCircleFill />
            <p className="px-3">Back To Orders</p>
          </Link>
        </div>
        <br />
        {order === null ? <Loader /> : <OrderDetailsTable order={order} />}
      </div>
    </section>
  )
}

export default OrderDetails
