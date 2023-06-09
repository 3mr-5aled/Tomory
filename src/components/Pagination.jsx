import React from "react"

const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={productsPerPage == totalProducts ? `hidden` : `block`}>
      <ul className="flex items-center justify-center mt-7">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              className={
                currentPage == number
                  ? `cursor-pointer m-2 px-3 py-2 leading-tight text-white bg-orange-500 border border-gary-900 rounded-full hover:bg-gray-400 hover:text-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
                  : `cursor-pointer m-2 px-3 py-2 leading-tight text-gray-500 bg-white border border-gary-900 rounded-full hover:bg-gray-400 hover:text-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// thanks to Traversy Media

export default Pagination
