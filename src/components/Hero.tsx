import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { HeroScene } from "./HeroScene"
import { useLanguage } from "@/lib/LanguageContext"

export function HUD() {
  const [latency, setLatency] = useState("0.02")
  const [coords, setCoords] = useState({ lat: "34.0522", lng: "118.2437", alt: "42.1" })

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((Math.random() * 0.14).toFixed(2))
      setCoords({
        lat: (34.0522 + (Math.random() - 0.5) * 0.001).toFixed(4),
        lng: (118.2437 + (Math.random() - 0.5) * 0.001).toFixed(4),
        alt: (42.1 + (Math.random() - 0.5) * 0.1).toFixed(1)
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Top Left Status */}
      <div className="hud-element absolute top-24 left-6 md:top-32 md:left-10 space-y-2 opacity-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Estado del Sistema</span>
        </div>
        <div className="text-sm md:text-lg font-black text-white italic tracking-tighter">OPERATIVO // {latency}ms</div>
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-primary/50 to-transparent" />
      </div>

      {/* Bottom Right Data */}
      <div className="hud-element absolute bottom-24 right-6 md:bottom-20 md:right-10 text-right space-y-2 opacity-0 hidden md:block">
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Flujo de Datos</div>
        <div className="font-mono text-xs text-primary space-y-1">
          <div>LAT: {coords.lat}° N</div>
          <div>LNG: {coords.lng}° W</div>
          <div>ALT: {coords.alt}km</div>
        </div>
        <div className="flex justify-end gap-1">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-4 bg-white/10" style={{ animation: `pulse-height 2s infinite ${i * 0.2}s` }} />)}
        </div>
      </div>

      {/* Center Target */}
      <div className="hud-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] max-w-[500px] max-h-[500px] border border-white/5 rounded-full opacity-0 hidden md:block">
        <div className="absolute inset-0 border-t-2 border-primary/20 rounded-full animate-spin-slow" />
        <div className="absolute inset-[10%] border-b-2 border-chart-2/20 rounded-full animate-spin-reverse" />
      </div>
    </div>
  )
}

export function FallbackOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-2 rounded-full shadow-[0_0_100px_rgba(var(--primary),0.5)] animate-float" />
      </div>
    </div>
  )
}

const phrasesES = [
  ["Redefinimos el", "Futuro"], ["Evolucionamos", "Ideas"], ["Impulsamos", "Visiones"], ["Forjamos", "Software"],
  ["Ingeniería de", "Elite"], ["Arquitectura", "Digital"], ["Potenciamos", "Negocios"], ["Escalamos", "Sistemas"],
  ["Transformación", "Radical"], ["Código de", "Vanguardia"], ["Desarrollamos", "Soluciones"],
]

const phrasesEN = [
  ["Redefining the", "Future"], ["Evolving", "Ideas"], ["Driving", "Visions"], ["Forging", "Software"],
  ["Elite", "Engineering"], ["Digital", "Architecture"], ["Empowering", "Business"], ["Scaling", "Systems"],
  ["Radical", "Transformation"], ["Cutting-edge", "Code"], ["Developing", "Solutions"],
]

export function Hero() {
  const { language, t } = useLanguage()
  const phrases = language === 'es' ? phrasesES : phrasesEN
  
  const [webGLAvailable, setWebGLAvailable] = useState(true)
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Pick a random phrase on mount
    const randomIdx = Math.floor(Math.random() * phrases.length)
    setCurrentPhrase(phrases[randomIdx])

    try {
      const canvas = document.createElement("canvas")
      setWebGLAvailable(!!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))))
    } catch (e) {
      setWebGLAvailable(false)
    }

    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set([".hud-element", ".title-reveal", ".hero-description", ".hero-cta", ".scroll-indicator", ".hero-canvas-container"], {
        opacity: 0
      })

      // 2. Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      tl.to(".hero-canvas-container", {
        opacity: 1,
        duration: 3,
        ease: "power2.inOut"
      })
        .to(".hud-element", {
          opacity: 1,
          duration: 2,
          stagger: 0.2
        }, "-=2.5")
        .fromTo(".title-reveal",
          { y: 100, skewY: 10, opacity: 0 },
          { y: 0, skewY: 0, opacity: 1, duration: 1.5, stagger: 0.2 },
          "-=1.5"
        )
        .to(".hero-description", {
          opacity: 1,
          y: 0,
          duration: 1.2
        }, "-=1")
        .to(".scroll-indicator", {
          opacity: 1,
          duration: 1.5
        }, "-=1")
        .fromTo(".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "-=0.8"
        )

      // 3. Glitch Loop (Infinite)
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 4 })
      glitchTl
        .to(".title-glitch", { skewX: 15, x: -5, duration: 0.1, color: "#3dd6f5" })
        .to(".title-glitch", { skewX: -15, x: 5, duration: 0.1, color: "#ff4081" })
        .to(".title-glitch", { skewX: 0, x: 0, duration: 0.1, color: "white" })

      // 4. Parallax Mouse Move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 30
        const yPos = (clientY / window.innerHeight - 0.5) * 30
        gsap.to(".hud-element", {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: "power2.out",
        })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Grain/Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-noise opacity-[0.03]" />

      {/* HUD Layers */}
      <HUD />

      {/* 3D Scene - Local for both mobile and desktop */}
      <div className="hero-canvas-container absolute inset-0 z-0 pointer-events-none opacity-0">
        {webGLAvailable ? <HeroScene /> : <FallbackOrb />}
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center mt-[-5vh] md:mt-[-10vh]">
        <div className="space-y-6 md:space-y-8">
          <div className="flex flex-col items-center">
            <div className="title-reveal inline-flex items-center gap-2 glass px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-white/10 mb-6 md:mb-8">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[8px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-white/70 whitespace-nowrap">{t('hero.badge')}</span>
            </div>

            <h1 ref={titleRef} className="text-4xl sm:text-6xl md:text-[9vw] font-black leading-[1.1] md:leading-[0.85] tracking-tighter text-white uppercase italic overflow-visible py-2">
              <span className="title-reveal title-glitch block md:whitespace-nowrap">{currentPhrase[0]}</span>
              <span className="title-reveal text-gradient block not-italic md:whitespace-nowrap">{currentPhrase[1]}</span>
            </h1>
          </div>

          <p className="hero-description max-w-2xl mx-auto text-base md:text-2xl text-white/40 font-medium leading-relaxed translate-y-10 px-4 md:px-0">
            {t('hero.desc')}
          </p>
        </div>
      </div>

      {/* Decorative side text */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/10 origin-left -rotate-90">
          {t('hero.side')}
        </div>
      </div>

      {/* Bottom Scroll Indicator & CTAs */}
      <div className="scroll-indicator absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 md:gap-10 w-full max-w-4xl px-6 z-30">
        <div className="flex flex-row md:flex-row items-center justify-center gap-4 md:gap-16 w-full">
          <button
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="hero-cta cyber-button px-4 py-2.5 md:px-10 md:py-5 text-[9px] md:text-base w-auto"
          >
            {t('hero.cta.connect')}
          </button>
          
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-white/20 via-white/20 to-transparent relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-full h-full bg-primary animate-scroll-line" />
          </div>

          <button
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="hero-cta px-4 py-2 md:py-5 font-black text-white/50 hover:text-white transition-colors tracking-widest uppercase text-[8px] md:text-xs whitespace-nowrap"
          >
            {t('hero.cta.how')}
          </button>
        </div>
        <span className="hidden md:block text-[10px] font-black tracking-[0.3em] uppercase text-white/20">{t('hero.scroll')}</span>
      </div>
    </section>
  )
}
