import React, { useEffect, useState } from "react"

const ProductItem = () => {
  const [size, setSize] = useState("")
  const [color, setColor] = useState()
  const [selectedSize, setSelectedSize] = useState()
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const product = {
    name: "Iphone 14 pro max",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ad ullam similique, placeat molestias libero, qui officiis delectus porro cumque corrupti possimus excepturi cupiditate eveniet dolores voluptatem. Ratione, est reprehenderit!",
    price: "230",
    colors: ["blue", "red", "green"],
    sizes: ["64GB", "128GB", "265GB"],
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
    ],
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    if (!selectedSize) {
      setSizeError("Please select a size")
      return
    }
  }
  return (
    <section>
      <div className="relative mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <img
              alt="Les Paul"
              src={product.images[0]}
              className="w-full rounded-xl object-cover bg-center"
            />
            <div className="grid grid-cols-2 gap-4 lg:mt-4">
              {product.images.length > 1 && // check if there are at least two images
                product.images.slice(1).map((img) => {
                  // start from index 1 and go till the end
                  return (
                    <img
                      alt={product.name}
                      src={img}
                      className="h-modal w-full rounded-xl object-cover"
                    />
                  )
                })}
            </div>
          </div>

          <div className="sticky top-0">
            {/* <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
              Pre Order
            </strong> */}

            <div className="mt-8 flex justify-between">
              <div className="max-w-[35ch] space-y-2">
                <h1 className="text-xl font-bold sm:text-2xl">
                  {product.name}
                </h1>

                <p className="text-sm">Highest Rated Product</p>

                <div className="-ml-0.5 flex">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg
                    className="h-5 w-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg
                    className="h-5 w-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg
                    className="h-5 w-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <svg
                    className="h-5 w-5 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              <p className="text-2xl text-teal-600 font-bold mr-12 mt-3">
                ${product.price}
              </p>
            </div>

            <div className="mt-4">
              <div className="prose max-w-none">
                <p>{product.desc}</p>
              </div>
            </div>

            <form className="mt-8" onSubmit={handleSubmit}>
              <fieldset>
                <legend className="mb-1 text-sm font-medium">Color</legend>

                <div className="flex flex-wrap gap-3">
                  {product.colors.length > 0 &&
                    product.colors.map((color, index) => {
                      return (
                        <label
                          htmlFor={"color_" + color}
                          className="cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="color"
                            id={"color_" + color}
                            className="peer sr-only"
                            value={color}
                            checked={color === selectedColor} // set checked attribute based on selectedColor state variable
                            onChange={(e) => setSelectedColor(e.target.value)} // update selectedColor state variable on change
                            required
                          />
                          <span
                            className={`group inline-flex px-6 border-black border-1 py-3 h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white`}
                          >
                            {color}
                          </span>
                        </label>
                      )
                    })}
                </div>
              </fieldset>

              <fieldset className="mt-4">
                <legend className="mb-1 text-sm font-medium">Size</legend>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.length > 0 &&
                    product.sizes.map((size, index) => {
                      return (
                        <label
                          htmlFor={"size_" + size}
                          className="cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="size"
                            id={"size_" + size}
                            className="peer sr-only"
                            value={size}
                            checked={size === selectedSize} // set checked attribute based on selectedColor state variable
                            onChange={(e) => setSelectedSize(e.target.value)} // update selectedColor state variable on change
                            required
                          />
                          <span
                            className={`group inline-flex px-6 border-black border-1 py-3 h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white`}
                          >
                            {size}
                          </span>
                        </label>
                      )
                    })}
                </div>
              </fieldset>

              {sizeError && (
                <div className="text-red-500 text-sm mt-1">{sizeError}</div>
              )}
              <div className="mt-8 flex gap-4">
                <div>
                  <label htmlFor="quantity" className="sr-only">
                    Qty
                  </label>

                  <input
                    type="number"
                    pattern="[0-9]*"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity((q) =>
                        e.target.validity.valid ? e.target.value : q
                      )
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductItem
