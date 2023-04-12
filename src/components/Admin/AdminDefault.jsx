import React from "react"
import { Admin } from "../../pages"
import { Link } from "react-router-dom"

const AdminDefault = () => {
  return (
    <Admin>
      <div className="p-5">
        <h2 className="text-2xl text-orange-400 font-bold">Welcome Admin</h2>
        <p className="mt-5">You can here add new products and edit them</p>
        <div className="flex flex-row gap-5">
          <Link
            to="/admin/create"
            className="block bg-orange-600 hover:bg-orange-400 text-white rounded-xl my-5 p-3 w-fit"
          >
            Create a Product
          </Link>
          <Link
            to="/admin/product_view"
            className="block bg-gray-600 hover:bg-gray-400 text-white rounded-xl my-5 p-3 w-fit"
          >
            Manage Products
          </Link>
        </div>
      </div>
    </Admin>
  )
}

export default AdminDefault
