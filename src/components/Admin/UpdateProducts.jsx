import React from "react"
import CreatableSelect from "react-select/creatable"

const colourOptions = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
]
const sizesOptions = [
  { value: "64", label: "64 GB" },
  { value: "128", label: "128 GB" },
  { value: "265", label: "265 GB" },
]
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
const UpdateProducts = () => {
  return (
    <div className="flex flex-col w-full p-5">
      <h2 className="text-xl font-bold dark:text-white">Update a Product</h2>
      <div className="flex flex-col">
        <h5 className="text-center">Product preview</h5>
        <div className="flex flex-row justify-center">
          <img
            className="w-52 h-52 m-5 rounded-xl"
            src={product.images[0]}
            alt=""
          />
          <img
            className="w-52 h-52 m-5 rounded-xl"
            src={product.images[1]}
            alt=""
          />
          <img
            className="w-52 h-52 m-5 rounded-xl"
            src={product.images[2]}
            alt=""
          />
        </div>
        <p>
          <span className="font-semibold">Name: </span>
          {product.name}
        </p>
        <p>
          <span className="font-semibold">Description: </span>
          {product.desc}
        </p>
        <p>
          <span className="font-semibold">Price: </span>
          {product.price} $
        </p>
        <p>
          <span className="font-semibold">Colors: </span>
          {product.colors.join(" , ")}
        </p>
        <p>
          <span className="font-semibold">Sizes: </span>
          {product.sizes.join(" , ")}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap">
        <div className="block p-5 " htmlFor="">
          <h6 className="dark:text-white">Name</h6>
          <input type="text" placeholder="Name" />
        </div>
        <div className="block p-5 " htmlFor="">
          <h6 className="dark:text-white">Description</h6>
          <input type="text" placeholder="Description" />
        </div>
        <div className="block p-5 " htmlFor="">
          <h6 className="dark:text-white">Price</h6>
          <input type="number" placeholder="Price $" />
        </div>
        <div className="block p-5 " htmlFor="">
          <h6 className="dark:text-white">Colors</h6>
          <CreatableSelect
            className="w-52"
            isClearable
            options={colourOptions}
          />
        </div>
        <div className="block p-5 " htmlFor="">
          <h6 className="dark:text-white">Size</h6>
          <CreatableSelect
            className="w-52"
            isClearable
            options={sizesOptions}
          />
        </div>
        <div className="block p-5 " htmlFor="">
          <h6 className="text-lg font-semibold dark:text-white">Images</h6>
          <p className="text-gray-600 dark:text-gray-300 py-3">
            (main image, second image , third image)
          </p>
          <input type="file" />
          <input type="file" />
          <input type="file" />
        </div>
      </div>
      <button className="bg-blue-600 text-white rounded-md px-5 py-3 float-right w-fit place-self-end mr-5">
        Update product
      </button>
    </div>
  )
}

export default UpdateProducts
