import React from "react"
import { NavLink } from "react-router-dom"

const CTAReel = () => {
  return (
    <section className="relative overflow-hidden bg-[#1f160d]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(120,74,38,0.6),_rgba(32,18,9,0.8))] bg-[length:200%_200%] animate-shimmer" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-white">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
              Begin the ritual
            </p>
            <h2 className="font-display text-4xl md:text-5xl">
              Ready for a harvest that feels made for you?
            </h2>
            <p className="text-base text-amber-100/80 md:text-lg">
              Start with a curated sampler or explore the full collection. We
              deliver with care, notes, and a little glow.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <NavLink
              to="/products"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-amber-500/40 transition hover:-translate-y-0.5 hover:bg-amber-400"
            >
              Browse the collection
            </NavLink>
            <NavLink
              to="/contact"
              className="rounded-full border border-amber-200/60 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-amber-100 transition hover:border-amber-100 hover:text-white"
            >
              Talk to us
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTAReel
