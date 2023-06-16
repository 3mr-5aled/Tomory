import React from "react"

const OrderDetailsTable = ({ order }) => {
  return (
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
      <table className="w-full text-center mb-20 overflow-x-auto">
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
  )
}

export default OrderDetailsTable
