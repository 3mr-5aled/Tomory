import { useEffect, useState } from "react"
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsXCircleFill,
  BsFillCartCheckFill,
} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
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
} from "../../redux/slice/cartSlice"
import { NavLink, useNavigate } from "react-router-dom"
import { selectIsLoggedIn } from "../../redux/slice/authSlice"

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)

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

  const handleCheckout = (event) => {
    event.preventDefault()
    if (isLoggedIn) {
      navigate("/checkout")
    } else {
      navigate("/login")
    }
  }

  return (
    <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#f7f1e8] pb-20 dark:bg-slate-900 font-body">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-200/30 blur-[100px] motion-safe:animate-float-slow pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-orange-300/20 blur-[100px] motion-safe:animate-drift pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 py-12">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-800 dark:text-amber-200 mb-3">
            Your Selection
          </p>
          <h1 className="font-display text-4xl text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Reserved Harvest.
          </h1>
        </header>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              {!cartItems.length > 0 ? (
                <div className="rounded-[2.5rem] border border-amber-200/60 bg-white/70 p-12 text-center backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80">
                  <h2 className="font-display text-3xl text-stone-500 dark:text-slate-400">
                    Your cart is empty.
                  </h2>
                  <NavLink
                    to="/products"
                    className="mt-6 inline-block rounded-full bg-amber-700 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-amber-600"
                  >
                    Go to Harvest
                  </NavLink>
                </div>
              ) : (
                <>
                  <div className="flex justify-end">
                    <button
                      className="group inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-700 transition hover:bg-red-500 hover:text-white dark:border-red-900/50 dark:bg-red-900/20"
                      onClick={clearCart}
                    >
                      Clear List
                      <BsXCircleFill className="transition-transform group-hover:rotate-90" />
                    </button>
                  </div>

                  <ul className="space-y-4">
                    {cartItems.map((item, index) => (
                      <li
                        key={item.id}
                        className="group flex items-center gap-6 rounded-[2rem] border border-amber-200/50 bg-white/80 p-6 shadow-xl shadow-amber-900/5 backdrop-blur-sm transition-all hover:border-amber-400/50 dark:border-slate-700/50 dark:bg-slate-800/80 animate-fadeUp"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-amber-50/50 p-2 dark:bg-slate-700/50">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-contain transition-transform group-hover:scale-110"
                          />
                        </div>

                        <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h3 className="font-display text-2xl text-slate-900 transition hover:text-amber-800 dark:text-white dark:hover:text-amber-400">
                              <NavLink to={`/product/${item.id}`}>
                                {item.name}
                              </NavLink>
                            </h3>
                            <p className="text-sm font-semibold text-amber-700 dark:text-amber-500">
                              ${item.price} / kg
                            </p>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="flex items-center rounded-full border border-amber-200 bg-white/50 p-1 dark:border-slate-700 dark:bg-slate-900/50">
                              <button
                                className="flex h-8 w-8 items-center justify-center rounded-full text-amber-700 transition hover:bg-amber-100 dark:hover:bg-slate-800"
                                onClick={() => decreaseCart(item)}
                              >
                                <BsFillArrowDownCircleFill />
                              </button>
                              <span className="min-w-[40px] text-center text-black dark:text-white font-bold">
                                {item.cartQuantity}
                                <span className="ml-1 text-[10px] text-amber-600">
                                  KG
                                </span>
                              </span>
                              <button
                                className="flex h-8 w-8 items-center justify-center rounded-full text-amber-700 transition hover:bg-amber-100 dark:hover:bg-slate-800"
                                onClick={() => increaseCart(item)}
                              >
                                <BsFillArrowUpCircleFill />
                              </button>
                            </div>

                            <button
                              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                              onClick={() => removeFromCart(item)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="animate-fadeUp" style={{ animationDelay: "300ms" }}>
              <div className="sticky top-24 rounded-[2.5rem] border border-amber-200/60 bg-white/70 p-8 shadow-2xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80">
                <h3 className="font-display text-2xl text-slate-900 dark:text-white">
                  Order Summary
                </h3>
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-stone-600 dark:text-slate-400">
                    <span>Total Quantity</span>
                    <span className="font-bold">{cartTotalQuantity} KG</span>
                  </div>
                  <div className="flex justify-between border-t border-amber-100 pt-4 dark:border-slate-700">
                    <span className="font-display text-2xl text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="font-display text-3xl text-amber-800 dark:text-amber-400">
                      ${cartTotalAmount}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={!cartItems.length}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-amber-700 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-xl shadow-amber-900/20 transition hover:-translate-y-0.5 hover:bg-amber-600 disabled:opacity-50"
                >
                  <BsFillCartCheckFill className="text-lg" />
                  Proceed to Checkout
                </button>

                <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-stone-400">
                  Organic harvest • Traceable origin
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart
