import React from "react"

const ProofStrip = () => {
  return (
    <section className="relative overflow-hidden bg-[#efe4d5] dark:bg-slate-900">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { value: "24h", label: "Harvest to ship" },
              { value: "8k+", label: "Rituals shared" },
              { value: "4.9", label: "Average tasting" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-amber-200/60 bg-white/80 p-6 text-center shadow-md dark:border-amber-200/20 dark:bg-slate-800/80"
              >
                <p className="font-display text-3xl text-slate-900 dark:text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-amber-200/60 bg-white/80 p-8 shadow-lg dark:border-amber-200/20 dark:bg-slate-800/80">
            <p className="font-display text-2xl text-slate-900 dark:text-white">
              "Every box feels like an invitation to slow down and savor."
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-amber-700 dark:text-amber-300">
              Leila N, curated gift buyer
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProofStrip
