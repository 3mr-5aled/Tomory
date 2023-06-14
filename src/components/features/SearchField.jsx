import React, { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"

const SearchField = ({ items, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (items) {
      const filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
      onFilter(filteredItems)
    }
  }, [items, searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="w-full relative mr-3">
      <input
        type="text"
        className="h-10 rounded border-gray-300 text-sm px-3 w-full mx-3 focus:border-orange-600 focus:ring-orange-600 dark:bg-slate-700"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className="absolute right-3 top-3 dark:text-white">
        <BsSearch />
      </div>
    </div>
  )
}

export default SearchField
