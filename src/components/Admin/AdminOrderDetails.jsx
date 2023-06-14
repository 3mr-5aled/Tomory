import React, { useEffect, useState } from "react"
import { Admin } from "../../pages"
import useFetchDocument from "../../customHooks/useFetchDocument"
import { Link, NavLink, useParams } from "react-router-dom"
import Loader from "../Loader"
import ChangeOrderStatus from "./ChangeOrderStatus"
import { BsArrowLeftCircleFill } from "react-icons/bs"

const AdminOrderDetails = () => {
  const { id } = useParams()

  return (
    <Admin>
      <div>
        <h2 className="text-slate-900 text-2xl font-bold text-center my-5 decoration-wavy underline underline-offset-4 dark:text-white">
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
        {order === null ? (
          <Loader />
        ) : (
          <div className="mx-5">
            <div className="bg-gray-200 w-fit p-5 rounded">
              <p className="">
                <b className="text-black">Order ID:</b> {order.id}
              </p>
              <p className="text-green-500">
                <b className="text-black">Order Amount:</b> ${order.orderAmount}
              </p>
              <p className="text-yellow-400">
                <b className="text-black">Order Status:</b> {order.orderStatus}
              </p>
            </div>

            <br />
            <table className="w-full text-center mb-20">
              <thead className="bg-gray-200 w-full dark:bg-slate-500 dark:text-white">
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer transition">
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageUrl, cartQuantity } = cart
                  return (
                    <tr
                      key={id}
                      className="bg-gray-100 hover:bg-gray-300 dark:bg-slate-400 dark:text-white"
                    >
                      <td className="dark:bg-slate-500 dark:text-white">
                        <b>{index + 1}</b>
                      </td>
                      <td className="flex flex-row m-3 items-center">
                        <a
                          href={`/product/${id}`}
                          className="w-full flex flex-row items-center"
                        >
                          <img
                            src={imageUrl}
                            alt={name}
                            style={{ width: "100px" }}
                            className="rounded-xl"
                          />
                          <p className="px-5">
                            <b>{name}</b>
                          </p>
                        </a>
                      </td>
                      <td className="text-green-500 dark:text-green-300">
                        {"$"}
                        {price}
                      </td>
                      <td>{cartQuantity}</td>
                      <td className="text-yellow-500 dark:text-yellow-300">
                        {"$"}
                        {(price * cartQuantity).toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </Admin>
  )
}

export default AdminOrderDetails
