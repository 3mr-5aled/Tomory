import React from "react"
import { BsArrowLeftCircleFill } from "react-icons/bs"
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
      <div>
        <h2 className="text-slate-900 text-2xl md:text-3xl font-bold text-center my-5 decoration-wavy underline underline-offset-4 dark:text-white">
          Order Details
        </h2>
        <div>
          <Link
            to="/admin/orders"
            className="flex flex-row items-center text-orange-600 hover:text-orange-400 mx-5"
          >
            <BsArrowLeftCircleFill />
            <p className="px-3">Back To Orders</p>
          </Link>
        </div>
        <br />
        {!order ? <Loader /> : <OrderDetailsTable order={order} />}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </Admin>
  )
}

export default AdminOrderDetails
