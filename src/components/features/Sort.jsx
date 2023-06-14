import React, { useEffect, useState } from "react"
import { STORE_PRODUCTS } from "../../redux/slice/productSlice"
import { useDispatch } from "react-redux"

const Sort = ({ data }) => {
  const [sort, setSort] = useState("")
  const dispatch = useDispatch()

  const sorting = () => {
    let sortedData = [...data] // Create a copy of the data array
    if (sort === "Price,ASC") {
      sortedData.sort((a, b) => (a.price > b.price ? 1 : -1))
    } else if (sort === "Price,DESC") {
      sortedData.sort((a, b) => (a.price < b.price ? 1 : -1))
    } else if (sort === "Title,ASC") {
      sortedData.sort((a, b) => (a.name > b.name ? 1 : -1))
    } else if (sort === "Title,DESC") {
      sortedData.sort((a, b) => (a.name < b.name ? 1 : -1))
    }

    dispatch(STORE_PRODUCTS({ products: sortedData })) // Update the sorted products in the Redux store
  }

  useEffect(() => {
    sorting()
  }, [sort])

  return (
    <div>
      <label htmlFor="SortBy" className="sr-only">
        SortBy
      </label>

      <select
        id="SortBy"
        className="h-10 rounded border-gray-300 text-sm px-3 focus:border-orange-600 focus:ring-orange-600 dark:bg-slate-700 dark:text-white"
        onChange={(e) => setSort(e.target.value)}
      >
        <option>Sort By</option>
        <option value="Title,ASC">A to Z</option>
        <option value="Title,DESC">Z to A</option>
        <option value="Price,ASC">Price: Low to High</option>
        <option value="Price,DESC">Price: High to Low</option>
      </select>
    </div>
  )
}

export default Sort
