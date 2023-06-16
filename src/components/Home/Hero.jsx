import React from "react"
import { BsFillArrowDownCircleFill } from "react-icons/bs"
import { NavLink } from "react-router-dom"
import datesPlate from "../../assets/datesPlate.png"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/slice/authSlice"

const Hero = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <main className="flex flex-col justify-center items-center relative h-[calc(100vh-4rem)] overflow-hidden bg-fixed">
      {/* desktop */}
      <svg
        className="hidden md:block absolute left-0 top-0 w-full h-auto fill-white dark:fill-slate-800"
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <rect x="0" y="0" width="900" height="600" fill="none"></rect>
        <defs>
          <linearGradient id="grad1_0" x1="33.3%" y1="0%" x2="100%" y2="100%">
            <stop offset="20%" stopColor="#ffffff" stopOpacity="1"></stop>
            <stop offset="80%" stopColor="#ffffff" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2_0" x1="0%" y1="0%" x2="66.7%" y2="100%">
            <stop offset="20%" stopColor="#ffffff" stopOpacity="1"></stop>
            <stop offset="80%" stopColor="#ffffff" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <g transform="translate(900, 0)">
          <path
            d="M0 297.5C-41.8 296.3 -83.5 295.1 -113.8 274.8C-144.2 254.5 -163 215 -184.6 184.6C-206.1 154.1 -230.2 132.6 -249.4 103.3C-268.7 74.1 -283.1 37 -297.5 0L0 0Z"
            fill="#F7770F"
          ></path>
        </g>
        <g transform="translate(0, 600)">
          <path
            d="M0 -297.5C40.1 -292.8 80.3 -288.2 112.1 -270.7C144 -253.2 167.6 -222.7 195.9 -195.9C224.1 -169 257.1 -145.9 274.8 -113.8C292.5 -81.8 295 -40.9 297.5 0L0 0Z"
            fill="#F7770F"
          ></path>
        </g>
      </svg>
      {/* mobile */}
      <svg
        className="md:hidden absolute left-0 top-0 fill-white dark:fill-slate-800"
        id="visual"
        viewBox="0 0 540 960"
        width="540"
        height="960"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <rect x="0" y="0" width="540" height="960" fill="none"></rect>
        <defs>
          <linearGradient id="grad1_0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#ffffff" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#ffffff" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2_0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="#ffffff" stopOpacity="1"></stop>
            <stop offset="70%" stopColor="#ffffff" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <g transform="translate(540, 0)">
          <path
            d="M0 297C-42.9 296.9 -85.7 296.8 -113.7 274.4C-141.6 252 -154.5 207.3 -177.5 177.5C-200.4 147.7 -233.4 132.7 -255 105.6C-276.6 78.5 -286.8 39.3 -297 0L0 0Z"
            fill="#F7770F"
          ></path>
        </g>
        <g transform="translate(0, 960)">
          <path
            d="M0 -297C35.5 -276 70.9 -255 96.4 -232.8C122 -210.6 137.6 -187.1 169.7 -169.7C201.8 -152.3 250.4 -140.9 274.4 -113.7C298.4 -86.4 297.7 -43.2 297 0L0 0Z"
            fill="#F7770F"
          ></path>
        </g>
      </svg>
      <div className="relative z-20 flex items-center overflow-hidden ">
        <div className="container relative flex flex-col gap-10 md:flex-row w-5/6 py-28 mx-auto">
          <div className="relative z-20 flex flex-col  sm:w-2/3 lg:w-3/5">
            <h1 className="flex flex-col text-6xl font-black mb-3 leading-none text-gray-800 uppercase font-bebas-neue sm:text-8xl dark:text-white">
              Best
              <span className="text-5xl sm:text-7xl">Taste</span>
            </h1>
            <p className="text-sm w-2/3 text-gray-700 sm:text-base dark:text-white">
              Experience the finest quality تمور (dates) at our online store.
              Delight in their natural sweetness, sourced from the heart of the
              Middle East. Order now!
            </p>
            <div className="flex mt-8">
              <NavLink
                to={isLoggedIn ? "/product" : "/login"}
                className="px-4 py-2 mr-4 text-white uppercase bg-orange-500 border-2 border-transparent rounded-lg text-md hover:bg-orange-300"
              >
                Get started
              </NavLink>
              {/* <a
                  href="#"
                  className="px-4 py-2 text-orange-700 uppercase bg-transparent border-2 border-orange-700 rounded-lg dark:text-white hover:bg-orange-500 hover:text-white text-md"
                >
                  Read more
                </a> */}
            </div>
          </div>
          <div className="relative  sm:block sm:w-1/3 lg:w-2/5">
            <img
              src={datesPlate}
              className="max-w-xs m-auto md:max-w-sm rotate-12 bg-orange-600 rounded-full drop-shadow-2xl animate-wiggle transition-all ease-in-out border-8 border-orange-400"
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
  )
}

export default Hero
