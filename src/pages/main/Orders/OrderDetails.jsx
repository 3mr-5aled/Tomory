import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useFetchDocument from "../../../customHooks/useFetchDocument"
import Loader from "../../../components/Loader"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { selectOrderById } from "../../../redux/slice/orderSlice"

const OrderDetails = () => {
  const { id } = useParams()
  const order = useSelector((state) => selectOrderById(state, id))

  return (
    <section>
      <div>
        <h2 className="text-slate-900 text-2xl font-bold text-center my-5 decoration-wavy underline underline-offset-4">
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
        {order === null ? (
          <Loader />
        ) : (
          <div className="mx-5">
            <div className="bg-gray-200 w-fit p-5 rounded">
              <p>
                <b>Order ID</b> {order.id}
              </p>
              <p>
                <b>Order Amount</b> ${order.orderAmount}
              </p>
              <p>
                <b>Order Status</b> {order.orderStatus}
              </p>
            </div>
            <br />
            <table className="w-full text-center mb-20">
              <thead className="bg-gray-200 w-full">
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer transition">
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageUrl, cartQuantity } = cart
                  return (
                    <tr key={id} className="bg-gray-100 hover:bg-gray-300 ">
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td className="flex flex-row m-3 items-center">
                        <img
                          src={imageUrl}
                          alt={name}
                          style={{ width: "100px" }}
                          className="rounded-xl"
                        />
                        <p className="px-5">
                          <b>{name}</b>
                        </p>
                      </td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{cartQuantity}</td>
                      <td>
                        {"$"}
                        {(price * cartQuantity).toFixed(2)}
                      </td>
                      <td>
                        <Link to={`/product/${id}`}>
                          <button className="bg-orange-500 hover:bg-orange-300 text-white font-bold rounded p-3">
                            Review Product
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default OrderDetails
