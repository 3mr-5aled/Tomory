import React from "react"
import Products from "../components/Products/ProductsList"
import logo from "../assets/logo.png"
import { BsFillArrowDownCircleFill } from "react-icons/bs"

const Home = () => {
  return (
    <>
      <main className="flex flex-col justify-center items-center relative h-[calc(100vh-4rem)] overflow-hidden bg-white dark:bg-gray-800">
        <div className="relative z-20 flex items-center overflow-hidden bg-white dark:bg-gray-800">
          <div className="container relative flex flex-col gap-10 md:flex-row w-5/6 py-28 mx-auto">
            <div className="relative z-20 flex flex-col  sm:w-2/3 lg:w-3/5">
              <h1 className="flex flex-col text-6xl font-black mb-3 leading-none text-gray-800 uppercase font-bebas-neue sm:text-8xl dark:text-white">
                Best
                <span className="text-5xl sm:text-7xl">Taste</span>
              </h1>
              <p className="text-sm w-2/3 text-gray-700 sm:text-base dark:text-white">
                Experience the finest quality تمور (dates) at our online store.
                Delight in their natural sweetness, sourced from the heart of
                the Middle East. Order now!
              </p>
              <div className="flex mt-8">
                <a
                  href="#"
                  className="px-4 py-2 mr-4 text-white uppercase bg-orange-500 border-2 border-transparent rounded-lg text-md hover:bg-orange-300"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-orange-700 uppercase bg-transparent border-2 border-orange-700 rounded-lg dark:text-white hover:bg-orange-500 hover:text-white text-md"
                >
                  Read more
                </a>
              </div>
            </div>
            <div className="relative  sm:block sm:w-1/3 lg:w-2/5">
              <img
                src={logo}
                className="max-w-xs m-auto md:max-w-sm rotate-12 bg-white rounded-full drop-shadow-2xl animate-wiggle transition-all ease-in-out border-8na border-orange-400"
              />
            </div>
          </div>
        </div>
        <button
          className="animate-bounce z-20 text-3xl cursor-pointer text-orange-600 mb-3"
          onClick={() => window.scrollTo({ top: 300, behavior: "smooth" })}
        >
          <BsFillArrowDownCircleFill />
        </button>
      </main>
      <Products />
    </>
  )
}

export default Home
