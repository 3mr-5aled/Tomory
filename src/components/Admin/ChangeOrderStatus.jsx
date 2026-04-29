import { Timestamp, doc, setDoc } from "firebase/firestore"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { db } from "../../firebase/config"
import Loader from "../Loader"
import { useDispatch } from "react-redux"
import { UPDATE_ORDERS_STATUS } from "../../redux/slice/orderSlice"
import { BsArrowRepeat } from "react-icons/bs"

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState(order.orderStatus || "")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const editOrder = async (e, id) => {
    e.preventDefault()
    setIsLoading(true)
    const editedTime = Timestamp.now().toDate()

    const orderConfig = {
      ...order,
      orderStatus: status,
      editedAt: editedTime,
    }

    try {
      await setDoc(doc(db, "orders", id), orderConfig)
      dispatch(
        UPDATE_ORDERS_STATUS({
          orderId: id,
          orderStatus: status,
          editedAt: editedTime,
        }),
      )
      setIsLoading(false)
      toast.success("Order status updated successfully")
      navigate("/admin/orders")
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <div className="max-w-md">
      {isLoading && <Loader />}

      <div className="space-y-4">
        <h3 className="font-display text-2xl font-bold text-amber-900 dark:text-white">
          Update Fulfillment Status
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Updating the status will notify the customer and update their order
          timeline.
        </p>

        <form
          onSubmit={(e) => editOrder(e, id)}
          className="mt-6 flex flex-col sm:flex-row gap-4"
        >
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-1 rounded-2xl border-amber-200 bg-white px-5 py-4 font-body text-sm font-bold text-amber-900 transition-all focus:border-amber-600 focus:ring-0 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="" disabled>
              -- Select New Status --
            </option>
            <option value="Order Placed...">Order Placed</option>
            <option value="Processing...">Processing</option>
            <option value="Shipped...">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button
            type="submit"
            className="flex items-center justify-center gap-3 rounded-2xl bg-amber-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-amber-900/20 transition-all hover:bg-amber-700 hover:-translate-y-1 active:scale-95"
          >
            <BsArrowRepeat size={18} />
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangeOrderStatus
