import React from "react"
import datesStand from "../../assets/datesStand.png"
import { useNavigate } from "react-router-dom"

const AdBanner = () => {
  const navigate = useNavigate()
  return (
    <div className="relative flex flex-row justify-between bg-gradient-to-l to-red-900 from-red-600">
      <button
        className="absolute -bottom-4 top-auto md:bottom-auto md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 md:text-xl shadow-xl bg-orange-600 text-white font-bold p-1 md:p-5 rounded-md hover:bg-orange-500"
        onClick={() => navigate("/products")}
      >
        Order Now
      </button>
      <div className="text-white  md:text-4xl flex flex-col justify-center items-stretch font-bold bg-gradient-to-r from-black to-transparent w-full pl-8">
        <p className="pb-5">Best Taste ,</p>
        <p className="pb-5">Best Quality ,</p>
        <p className="">Best Experience ,</p>
      </div>
      <div className="md:pr-10">
        <img src={datesStand} alt="" />
      </div>
    </div>
  )
}

export default AdBanner
