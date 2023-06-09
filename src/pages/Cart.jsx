import { useEffect, useState } from "react"
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsXCircleFill,
} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/slice/cartSlice"
import { NavLink, useNavigate } from "react-router-dom"
import { selectIsLoggedIn } from "../redux/slice/authSlice"

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  // Get the items and total from the cart state
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  const increaseCart = (item) => {
    dispatch(ADD_TO_CART(item))
  }

  const decreaseCart = (item) => {
    dispatch(DECREASE_CART(item))
  }

  const removeFromCart = (item) => {
    dispatch(REMOVE_FROM_CART(item))
  }

  const clearCart = () => {
    dispatch(CLEAR_CART())
  }

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }, [cartItems, dispatch])

  const handleCheckout = async (event) => {
    event.preventDefault()
    if (isLoggedIn) {
      navigate("/checkout")
    } else {
      navigate("/login")
    }
  }

  return (
    <>
      <section className=" dark:bg-slate-800 dark:text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Your Cart
              </h1>
            </header>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className=" flex flex-col mt-10">
                  {!cartItems.length > 0 ? (
                    <h2 className="text-center text-2xl text-red-500">
                      There is no products added to the cart
                    </h2>
                  ) : (
                    <>
                      <button
                        className="self-end mb-5 flex flex-row items-center text-white p-3 rounded-xl bg-gray-500 hover:bg-red-500"
                        onClick={clearCart}
                      >
                        <p className="pr-3">Clear the List</p>
                        <BsXCircleFill />
                      </button>
                      <ul className="block space-y-4">
                        {cartItems.map((item, index) => (
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
                                </div>
                              </dl>
                            </div>
                            <div className="flex flex-1 items-center justify-end gap-2">
                              <div className="flex flex-col">
                                <button
                                  className="text-sm p-1 hover:text-orange-400"
                                  onClick={() => increaseCart(item)}
                                >
                                  <BsFillArrowUpCircleFill />
                                </button>
                                <button
                                  className="text-sm p-1 hover:text-orange-400"
                                  onClick={() => decreaseCart(item)}
                                >
                                  <BsFillArrowDownCircleFill />
                                </button>
                              </div>
                              <p className="font-bold">
                                {item.cartQuantity}
                                <span className="text-orange-400 font-bold ml-1">
                                  KG
                                </span>
                              </p>
                              <button
                                className="text-gray-600 transition hover:text-red-600 group relative"
                                onClick={() => removeFromCart(item)}
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
                                <span class="pointer-events-none absolute -top-10 -left-8 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-700 rounded-md px-3 py-2 text-white">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700 dark:text-white">
                      <div className="flex justify-between !text-base font-medium">
                        <dt className="inline">Total:</dt>
                        <dd className="inline">${cartTotalAmount}</dd>
                      </div>
                    </dl>
                    <div className="flex justify-end">
                      <button
                        onClick={handleCheckout}
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart
