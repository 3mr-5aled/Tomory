import React from "react"

const StorySection = () => {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#f3eadf] dark:bg-slate-900"
    >
      <div aria-hidden className="absolute inset-0 bg-grain opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-800 dark:text-amber-200">
              Our roots
            </p>
            <h2 className="font-display text-4xl text-slate-900 dark:text-white md:text-5xl">
              From warm winds to velvet sweetness.
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-200 md:text-lg">
              We partner with growers who respect the rhythm of the date palm.
              No shortcuts. No rushed harvests. Only fruit that has ripened in
              the sun long enough to carry its full aroma.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Oasis grown",
                body: "Hand-selected from groves that nurture mineral-rich soil and slow water rituals.",
              },
              {
                title: "Stone-milled",
                body: "Gently cured to protect the caramel notes and buttery finish.",
              },
              {
                title: "Quiet elegance",
                body: "Wrapped in minimal packaging that feels like a gift, every time.",
              },
              {
                title: "Honest supply",
                body: "Small-batch sourcing keeps every harvest traceable and seasonally fresh.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-amber-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-amber-200/20 dark:bg-slate-800/70"
              >
                <h3 className="font-display text-2xl text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection
