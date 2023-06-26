import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { NavLink, useNavigate } from "react-router-dom"
import { selectIsLoggedIn } from "../../redux/slice/authSlice"
import {
  selectWishListItems,
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../../redux/slice/wishListSlice"
import { BsXCircleFill } from "react-icons/bs"
const WishList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  // Get the items and total from the wishlist state
  const wishListItems = useSelector(selectWishListItems)
  console.log(wishListItems)

  // Clear wishlist
  const handleClearWishlist = () => {
    dispatch(CLEAR_WISHLIST())
  }
  const removeFromWishList = (item) => {
    dispatch(REMOVE_FROM_WISHLIST(item))
  }

  const isProductOutOfStock = (item) => {
    return item.amount <= 0
  }

  return (
    <>
      <section className="dark:bg-slate-800 dark:text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                WishList ❤
              </h1>
            </header>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="flex justify-end items-center my-10">
                  <button
                    className="flex items-center gap-1 text-white p-3 rounded-xl bg-gray-500 hover:bg-red-500"
                    onClick={handleClearWishlist}
                  >
                    <BsXCircleFill />
                    <p className="text-sm font-medium">Clear the List</p>
                  </button>
                </div>
                <div className="flex flex-col mt-12 mb-16">
                  {!wishListItems.length > 0 ? (
                    <h2 className="text-center text-2xl text-red-500">
                      There are no products added to the wish list
                    </h2>
                  ) : (
                    <ul className="block space-y-4">
                      {wishListItems.map((item, index) => (
                        <li className="flex items-center gap-4" key={item.id}>
                          <p>{index + 1}</p>
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="h-16 w-16 rounded object-contain"
                          />
                          <div>
                            <h3 className="text-sm text-gray-900 hover:underline dark:text-gray-200">
                              <NavLink to={`/product/` + item.id}>
                                {item.name}
                              </NavLink>
                            </h3>
                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-300">
                              <div>
                                <dt className="inline">Price:</dt>
                                <dd className="inline">{item.price}</dd>
                                {isProductOutOfStock(item) ? (
                                  <dd className="text-red-500 font-bold">
                                    Out of Stock
                                  </dd>
                                ) : (
                                  ""
                                )}
                              </div>
                            </dl>
                          </div>
                          <div className="flex flex-1 items-center justify-end gap-">
                            <button
                              className="relative group text-gray-600 transition hover:text-red-600"
                              onClick={() => removeFromWishList(item)}
                            >
                              <span className="sr-only">Remove item</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              <span className="pointer-events-none absolute -top-10 -left-8 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-700 rounded-md px-3 py-2 text-white">
                                Remove
                              </span>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default WishList
