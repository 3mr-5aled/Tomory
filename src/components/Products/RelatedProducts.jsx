import React from "react"
import { selectProducts } from "../../redux/slice/productSlice"
import { useSelector } from "react-redux"

const RelatedProducts = ({ productId }) => {
  const products = useSelector(selectProducts)

  const getRandomProducts = (count) => {
    // Filter out the product with the same ID as the prop
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    )

    // Shuffle the filtered products array
    const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random())

    // Get the first 'count' products from the shuffled array
    return shuffledProducts.slice(0, count)
  }

  const isProductOutOfStock = (product) => {
    return product.amount <= 0
  }

  //   number of products
  const relatedProducts = getRandomProducts(4)

  return (
    <section>
      <h1 className="text-slate-900 dark:text-white text-2xl font-bold text-center my-5 decoration-wavy underline underline-offset-4 mt-5">
        Related Products
      </h1>
      <div className="my-8 mx-10 flex items-center justify-evenly">
        {products ? (
          <>
            <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => {
                return (
                  <li
                    key={product.id}
                    className="dark:bg-orange-600 rounded-xl"
                  >
                    <a
                      href={`/product/${product.id}`}
                      className="block overflow-hidden shadow-xl rounded-xl "
                    >
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="w-full object-contain transition duration-500 hover:scale-105 sm:h-72 bg-white rounded-t-xl border-b-orange-400 border-2"
                      />

                      <div className=" border rounded-xl border-gray-100 bg-white p-6 dark:bg-slate-700 dark:border-orange-600 z-0">
                        {/* <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                    New
                  </span> */}
                        <div className="flex flex-row flex-nowrap justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </h3>
                          {isProductOutOfStock(product) ? (
                            <p className="text-sm text-red-500 font-bold">
                              Out of Stock
                            </p>
                          ) : (
                            <p className="text-sm text-orange-600 font-bold">
                              Price: {product.price} $
                            </p>
                          )}
                        </div>
                        <form className="mt-4">
                          <div>
                            <button
                              className="block w-full mt-5 rounded bg-orange-600 text-white p-4 text-sm font-medium transition hover:scale-105"
                              disabled={
                                isProductOutOfStock(product) ? true : false
                              }
                            >
                              Add to Cart
                            </button>
                          </div>
                        </form>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <h2 className="text-center text-2xl text-red-500 my-5">
            There is no related products added
          </h2>
        )}
      </div>
    </section>
  )
}

export default RelatedProducts
