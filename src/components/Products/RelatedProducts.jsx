import React from "react"
import { selectProducts } from "../../redux/slice/productSlice"
import { selectCartItems } from "../../redux/slice/cartSlice"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import AddToWishList from "../features/AddToWishList"

const RelatedProducts = ({ productId }) => {
  const products = useSelector(selectProducts)
  const cartItems = useSelector(selectCartItems)

  const getRandomProducts = (count) => {
    const filteredProducts = products.filter(
      (product) => product.id !== productId,
    )
    const shuffledProducts = [...filteredProducts].sort(
      () => 0.5 - Math.random(),
    )
    return shuffledProducts.slice(0, count)
  }

  const isProductOutOfStock = (product) => {
    return product.amount <= 0
  }

  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId)
    return item ? item.cartQuantity : 0
  }

  const relatedProducts = getRandomProducts(4)

  if (!products || products.length === 0) return null

  return (
    <section className="py-12">
      <div className="flex flex-col items-center mb-10">
        <h2 className="font-display text-3xl font-bold tracking-tight text-amber-900 dark:text-amber-50 md:text-4xl">
          Related Products
        </h2>
        <div className="mt-2 h-1 w-20 rounded-full bg-amber-600/30" />
      </div>

      <div className="px-4">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product, index) => {
            return (
              <li
                key={product.id}
                className="animate-fadeUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="group relative h-full rounded-[2rem] border border-amber-200/40 bg-white/60 p-3 shadow-lg shadow-amber-200/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/60 dark:shadow-none">
                  <div className="absolute top-6 right-6 z-10">
                    <AddToWishList product={product} />
                  </div>

                  <NavLink
                    to={`/product/${product.id}`}
                    className="block h-full"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white p-6 dark:bg-slate-200">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-700 group-hover:scale-110"
                      />
                      {getCartQuantity(product.id) > 0 && (
                        <div className="absolute bottom-2 left-2 rounded-lg bg-amber-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                          {getCartQuantity(product.id)} in cart
                        </div>
                      )}
                    </div>

                    <div className="mt-6 px-3 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-xl font-bold text-amber-900 dark:text-amber-50">
                          {product.name}
                        </h3>
                        <span className="whitespace-nowrap font-body font-bold text-amber-700 dark:text-amber-400">
                          ${product.price}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {isProductOutOfStock(product) ? (
                          <span className="text-sm font-semibold text-red-500">
                            Out of Stock
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-amber-900/60 dark:text-slate-400">
                            Premium Quality
                          </span>
                        )}

                        <div className="rounded-full bg-amber-700 p-2 text-white shadow-md transition-all hover:bg-amber-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default RelatedProducts
