import React from "react"
import ProductsList from "../Products/ProductsList"

const LandingProducts = () => {
  return (
    <section id="products" className="bg-[#f7f1e8] dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <div className="rounded-[2.5rem] border border-amber-200/60 bg-white/90 p-4 shadow-2xl shadow-amber-200/40 dark:border-amber-200/20 dark:bg-slate-800/90">
          <ProductsList variant="immersive" />
        </div>
      </div>
    </section>
  )
}

export default LandingProducts
