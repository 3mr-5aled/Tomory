import React, { useEffect, createContext, useContext, useState, useMemo } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export const useLenis = () => {
  const context = useContext(LenisContext)
  if (!context) {
    return { lenis: null }
  }
  return context
}

const SmoothScroll = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    setLenisInstance(lenis)

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      setLenisInstance(null)
    }
  }, [])

  const value = useMemo(() => ({ lenis: lenisInstance }), [lenisInstance])

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  )
}

export default SmoothScroll
