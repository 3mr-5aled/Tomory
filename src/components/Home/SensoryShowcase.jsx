import React from "react"
import redDates from "../../assets/red-dates-4.svg"

const cards = [
  {
    title: "Amber aroma",
    detail: "Notes of maple, toasted almond, and a lingering floral finish.",
  },
  {
    title: "Silk texture",
    detail: "Tender bite, slow melt, and a velvety glow on the palate.",
  },
  {
    title: "Golden energy",
    detail: "Natural sweetness balanced with fiber and mineral richness.",
  },
]

const SensoryShowcase = () => {
  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] dark:bg-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,155,115,0.35),_transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-5 md:max-w-lg">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-800 dark:text-amber-200">
              Sensory ritual
            </p>
            <h2 className="font-display text-4xl text-slate-900 dark:text-white md:text-5xl">
              Designed for lingering moments.
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-200 md:text-lg">
              Each selection is curated to slow you down. From the first inhale
              to the last velvet finish, every element is meant to feel
              intentional.
            </p>
          </div>
          <img
            src={redDates}
            alt="Illustration of dates"
            className="h-32 w-32 opacity-80 md:h-44 md:w-44"
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={card.title}
              style={{ animationDelay: `${120 * index}ms` }}
              className="group relative overflow-hidden rounded-[2rem] border border-amber-200/50 bg-white/80 p-6 shadow-xl shadow-amber-200/30 backdrop-blur-sm transition hover:-translate-y-2 hover:shadow-amber-200/60 dark:border-amber-200/20 dark:bg-slate-800/80 animate-fadeUp"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(247,215,175,0.4),_transparent_60%)] opacity-0 transition group-hover:opacity-100" />
              <h3 className="relative font-display text-2xl text-slate-900 dark:text-white">
                {card.title}
              </h3>
              <p className="relative mt-3 text-sm text-slate-600 dark:text-slate-300">
                {card.detail}
              </p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-700 dark:text-amber-300">
                Taste note
                <span className="h-px w-10 bg-amber-400/70" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SensoryShowcase
