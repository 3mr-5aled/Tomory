import React from "react"
import ImmersiveHero from "../../components/Home/ImmersiveHero"
import StorySection from "../../components/Home/StorySection"
import SensoryShowcase from "../../components/Home/SensoryShowcase"
import ProofStrip from "../../components/Home/ProofStrip"
import CTAReel from "../../components/Home/CTAReel"
import LandingProducts from "../../components/Home/LandingProducts"

const Home = () => {
  return (
    <div className="w-screen md:w-auto">
      <ImmersiveHero />
      <StorySection />
      <SensoryShowcase />
      <ProofStrip />
      <CTAReel />
      <LandingProducts />
    </div>
  )
}

export default Home
