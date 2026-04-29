import React, { useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { BsArrowDown } from "react-icons/bs"
import { useLenis } from "../features/SmoothScroll"
import datesPlate from "../../assets/datesPlate.png"
import redDates from "../../assets/red-dates-4.svg"

const ImmersiveHero = () => {
  const { lenis } = useLenis()
  const containerRef = useRef(null)
  const parallaxTransition = 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)'

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      container.style.setProperty("--mouse-x", x.toFixed(4))
      container.style.setProperty("--mouse-y", y.toFixed(4))
    }

    const handleMouseLeave = () => {
      container.style.setProperty("--mouse-x", "0")
      container.style.setProperty("--mouse-y", "0")
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      style={{ 
        '--mouse-x': 0, 
        '--mouse-y': 0,
      }}
      className="relative overflow-hidden bg-amber-50 dark:bg-slate-900"
    >
      <div
        className="absolute inset-0 bg-grain opacity-60"
        aria-hidden="true"
      ></div>
      <div 
        style={{ 
          transform: 'translate3d(calc(var(--mouse-x) * 30px), calc(var(--mouse-y) * 30px), 0)',
          transition: parallaxTransition,
          willChange: 'transform'
        }}
        className="absolute -left-24 top-8"
      >
        <div
          className="h-64 w-64 rounded-full bg-amber-200/70 blur-3xl motion-safe:animate-drift"
          aria-hidden="true"
        ></div>
      </div>
      <div 
        style={{ 
          transform: 'translate3d(calc(var(--mouse-x) * -30px), calc(var(--mouse-y) * -30px), 0)',
          transition: parallaxTransition,
          willChange: 'transform'
        }}
        className="absolute -right-16 top-20"
      >
        <div
          className="h-72 w-72 rounded-full bg-orange-300/40 blur-3xl motion-safe:animate-float-slow"
          aria-hidden="true"
        ></div>
      </div>
      <img
        src={redDates}
        alt=""
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 scale-110 object-cover opacity-20"
        style={{ 
          transform: 'translate3d(calc(var(--mouse-x) * 50px), calc(var(--mouse-y) * 50px), 0)',
          transition: parallaxTransition,
          willChange: 'transform'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-screen-xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center">
        <div 
          className="flex-1"
          style={{ 
            transform: 'translate3d(calc(var(--mouse-x) * 16px), calc(var(--mouse-y) * 16px), 0)',
            transition: parallaxTransition,
            willChange: 'transform'
          }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-300/60 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-900 backdrop-blur dark:border-amber-200/30 dark:bg-slate-800/70 dark:text-amber-100">
            Handpicked harvest
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            Organic sweetness
          </div>

          <h1 className="mt-6 text-5xl font-display font-semibold leading-tight text-stone-900 dark:text-white sm:text-6xl lg:text-7xl">
            Dates that taste like warm sun and slow mornings.
          </h1>
          <p className="mt-6 max-w-xl text-base text-stone-600 dark:text-slate-200 sm:text-lg">
            From palm to parcel, every batch is sorted by hand and dried at its
            natural rhythm. A lush, immersive flavor you can feel in every bite.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <NavLink
              to="/products"
              className="rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-amber-400/40 transition hover:-translate-y-0.5 hover:bg-amber-600"
            >
              Shop the harvest
            </NavLink>
            <a
              href="#story"
              className="rounded-full border border-amber-600/60 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-amber-900 transition hover:-translate-y-0.5 hover:bg-amber-100 dark:text-amber-100"
            >
              Our story
            </a>
          </div>

          <div className="mt-10 grid gap-4 text-sm text-stone-600 dark:text-slate-200 sm:grid-cols-3">
            <div className="rounded-2xl border border-amber-200/60 bg-white/70 p-4 backdrop-blur dark:border-amber-200/10 dark:bg-slate-800/70">
              Single origin groves
            </div>
            <div className="rounded-2xl border border-amber-200/60 bg-white/70 p-4 backdrop-blur dark:border-amber-200/10 dark:bg-slate-800/70">
              Low-heat drying
            </div>
            <div className="rounded-2xl border border-amber-200/60 bg-white/70 p-4 backdrop-blur dark:border-amber-200/10 dark:bg-slate-800/70">
              Zero additives
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="absolute -left-8 bottom-8 h-36 w-36 rounded-full bg-amber-400/50 blur-2xl motion-safe:animate-float-fast"></div>
          <div className="relative mx-auto max-w-sm">
            <div 
              className="absolute -top-6 left-6 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900 shadow-lg"
              style={{ 
                transform: 'translate3d(calc(var(--mouse-x) * 100px), calc(var(--mouse-y) * 100px), 0)',
                transition: parallaxTransition,
                willChange: 'transform'
              }}
            >
              Harvest 2026
            </div>
            <img
              src={datesPlate}
              alt="Dates platter"
              className="relative z-10 w-full rounded-[48px] border-4 border-amber-200/70 bg-white/80 p-6 shadow-2xl"
              style={{ 
                transform: 'translate3d(calc(var(--mouse-x) * 80px), calc(var(--mouse-y) * 80px), 0)',
                transition: parallaxTransition,
                willChange: 'transform'
              }}
            />
            <div 
              className="absolute -bottom-8 right-0 rounded-3xl bg-amber-800/90 px-6 py-4 text-sm text-amber-50 shadow-xl"
              style={{ 
                transform: 'translate3d(calc(var(--mouse-x) * 110px), calc(var(--mouse-y) * 110px), 0)',
                transition: parallaxTransition,
                willChange: 'transform'
              }}
            >
              48-hour freshness seal
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => lenis?.scrollTo('#story', { duration: 1.5 })}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900 shadow-lg backdrop-blur transition hover:-translate-y-1"
      >
        Scroll
        <BsArrowDown className="text-base" />
      </button>
    </section>
  )
}

export default ImmersiveHero
