import React, { useEffect, useState } from "react"
import { ProductsPage as Products } from "../index"
import { Hero, Features, Divider, AdBanner } from "../../components"

const Home = () => {
  return (
    <>
      <Hero />
      <Divider />
      <AdBanner />
      <Divider />
      <Features />
      <Divider />
      <Products />
    </>
  )
}

export default Home
