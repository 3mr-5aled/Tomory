import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import {
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
  selectWishListItems,
} from "../../redux/slice/wishListSlice"
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/slice/cartSlice"
import { BsTrash, BsCartPlus, BsXCircleFill } from "react-icons/bs"
import { toast } from "react-toastify"

const WishList = () => {
  const dispatch = useDispatch()
  const wishListItems = useSelector(selectWishListItems)

  const removeFromWishList = (item) => {
    dispatch(REMOVE_FROM_WISHLIST(item))
  }

  const clearWishList = () => {
    dispatch(CLEAR_WISHLIST())
  }

  const addToCart = (item) => {
    if (item.amount <= 0) {
      toast.error("Product is out of stock")
      return
    }
    dispatch(ADD_TO_CART(item))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  return (
    <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#f7f1e8] pb-20 dark:bg-slate-900 font-body">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-200/30 blur-[100px] motion-safe:animate-float-slow pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-orange-300/20 blur-[100px] motion-safe:animate-drift pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 py-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-800 dark:text-amber-200 mb-3">
              Your Favorites
            </p>
            <h1 className="font-display text-4xl text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              Desired Harvest.
            </h1>
          </div>
          {wishListItems.length > 0 && (
            <button
              className="group inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/50 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-red-700 transition hover:bg-red-500 hover:text-white dark:border-red-900/50 dark:bg-red-900/20"
              onClick={clearWishList}
            >
              Clear Favorites
              <BsXCircleFill className="transition-transform group-hover:rotate-90" />
            </button>
          )}
        </header>

        {!wishListItems.length > 0 ? (
          <div className="rounded-[2.5rem] border border-amber-200/60 bg-white/70 p-20 text-center backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80 animate-fadeUp">
            <h2 className="font-display text-3xl text-stone-500 dark:text-slate-400">
              Your wishlist is empty.
            </h2>
            <NavLink
              to="/products"
              className="mt-8 inline-block rounded-full bg-amber-700 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-amber-600 shadow-xl shadow-amber-900/20"
            >
              Explore Harvest
            </NavLink>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishListItems.map((item, index) => (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-amber-200/50 bg-white/80 shadow-xl shadow-amber-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-amber-900/10 dark:border-slate-700/50 dark:bg-slate-800/80 animate-fadeUp"
              >
                <div className="relative aspect-square overflow-hidden bg-amber-50/30 p-8 dark:bg-slate-700/30">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  <button
                    onClick={() => removeFromWishList(item)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-stone-400 backdrop-blur-sm transition hover:bg-red-50 hover:text-red-600 dark:bg-slate-900/80"
                  >
                    <BsTrash size={18} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-display text-2xl text-slate-900 transition hover:text-amber-800 dark:text-white dark:hover:text-amber-400">
                    <NavLink to={`/product/${item.id}`}>{item.name}</NavLink>
                  </h3>
                  <p className="mt-2 font-body font-bold text-amber-700 dark:text-amber-500">
                    ${item.price} / kg
                  </p>

                  <div className="mt-auto pt-8">
                    <button
                      onClick={() => addToCart(item)}
                      disabled={item.amount <= 0}
                      className="flex w-full items-center justify-center gap-3 rounded-full bg-slate-900 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-amber-700 disabled:opacity-50 dark:bg-amber-100 dark:text-amber-900 dark:hover:bg-white"
                    >
                      <BsCartPlus size={18} />
                      {item.amount <= 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default WishList
