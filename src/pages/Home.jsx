import React from "react"
import Products from "../components/Products"
import apple_watch from "../assets/apple-watch.png"

const Home = () => {
  return (
    <>
      <main className="relative h-screen overflow-hidden bg-white dark:bg-gray-800">
        <div className="relative z-20 flex items-center overflow-hidden bg-white dark:bg-gray-800">
          <div className="container relative flex px-6 py-28 mx-auto">
            <div className="relative z-20 flex flex-col sm:w-2/3 lg:w-3/5">
              <h1 className="flex flex-col text-6xl font-black leading-none text-gray-800 uppercase font-bebas-neue sm:text-8xl dark:text-white">
                Be on
                <span className="text-5xl sm:text-7xl">Time</span>
              </h1>
              <p className="text-sm w-2/3 text-gray-700 sm:text-base dark:text-white">
                Dimension of reality that makes change possible and
                understandable. An indefinite and homogeneous environment in
                which natural events and human existence take place.
              </p>
              <div className="flex mt-8">
                <a
                  href="#"
                  className="px-4 py-2 mr-4 text-white uppercase bg-blue-700 border-2 border-transparent rounded-lg text-md hover:bg-pink-400"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-blue-700 uppercase bg-transparent border-2 border-blue-700 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white text-md"
                >
                  Read more
                </a>
              </div>
            </div>
            <div className="relative hidden sm:block sm:w-1/3 lg:w-2/5">
              <img src={apple_watch} className="max-w-xs m-auto md:max-w-sm" />
            </div>
          </div>
        </div>
      </main>
      <Products />
    </>
  )
}

export default Home
