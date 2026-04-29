import React from "react"
import ProductsList from "../Products/ProductsList"

const LandingProducts = () => {
  return (
    <section id="products" className="bg-[#f7f1e8] dark:bg-slate-900">
      <ProductsList variant="immersive" />
    </section>
  )
}

export default LandingProducts
