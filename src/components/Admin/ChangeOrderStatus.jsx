import { Timestamp, doc, setDoc } from "firebase/firestore"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { db } from "../../firebase/config"
import { Admin } from "../../pages"
import Loader from "../Loader"
import { useDispatch } from "react-redux"
import { UPDATE_ORDERS_STATUS } from "../../redux/slice/orderSlice"

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const editOrder = async (e, id) => {
    e.preventDefault()
    setIsLoading(true)
    const editedTime = Timestamp.now().toDate()

    const orderConfig = {
      userID: order.userID,
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phoneNumber: order.phoneNumber,
      country: order.country,
      postalCode: order.postalCode,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      cartItems: order.cartItems,
      createdAt: order.createdAt,
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
        })
      )
      setIsLoading(false)
      toast.success("Order status changes successfully")
      navigate("/admin/orders")
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
      console.error(error.message)
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <div className="m-5">
        <h4 className="font-medium py-3 dark:text-gray-300">Update Status:</h4>
        <form onSubmit={(e) => editOrder(e, id)}>
          <span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded border-2 border-orange-500 form-select p-3  font-bold"
            >
              <option
                className="bg-white divide-y-2 text-black font-bold "
                value=""
                disabled
              >
                -- Choose one --
              </option>
              <option
                className="bg-white divide-y-2 text-blue-500 font-bold "
                value="Order Placed..."
              >
                Order Placed...
              </option>
              <option
                className="bg-white divide-y-2 text-red-500 font-bold "
                value="Processing..."
              >
                Processing...
              </option>
              <option
                className="bg-white divide-y-2 text-yellow-500 font-bold "
                value="Shipped..."
              >
                Shipped...
              </option>
              <option
                className="bg-white divide-y-2 text-green-500 font-bold"
                value="Delivered"
              >
                Delivered
              </option>
            </select>
          </span>
          <span>
            <button
              type="submit"
              className=" text-white bg-orange-500 p-3 rounded font-bold m-5"
            >
              Update Status
            </button>
          </span>
        </form>
      </div>
    </>
  )
}

export default ChangeOrderStatus
