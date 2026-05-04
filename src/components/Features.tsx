import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

const featuresES = [
  {
    tag: "Next-Gen", color: "from-primary/30 to-transparent",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
    title: "Interfaces Inmersivas",
    desc: "Experiencias web de alto impacto construidas con el stack más avanzado para dominar el mercado digital con velocidad extrema.",
    metric: "Ultra-Fast Load",
  },
  {
    tag: "Native", color: "from-chart-2/30 to-transparent",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    title: "Ecosistemas Móviles",
    desc: "Aplicaciones de alto rendimiento que redefinen la interacción en iOS y Android, diseñadas para escalar sin límites.",
    metric: "Global Scale",
  },
  {
    tag: "Intelligent", color: "from-chart-4/30 to-transparent",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: "Arquitecturas Autónomas",
    desc: "Libera el potencial de tu empresa con sistemas inteligentes que automatizan procesos complejos mientras tú te enfocas en crecer.",
    metric: "Efficiency +300%",
  },
]

const featuresEN = [
  {
    tag: "Next-Gen", color: "from-primary/30 to-transparent",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
    title: "Immersive Interfaces",
    desc: "High-impact web experiences built with the most advanced stack to dominate the digital market with extreme speed.",
    metric: "Ultra-Fast Load",
  },
  {
    tag: "Native", color: "from-chart-2/30 to-transparent",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    title: "Mobile Ecosystems",
    desc: "High-performance applications that redefine interaction on iOS and Android, designed to scale limitlessly.",
    metric: "Global Scale",
  },
  {
    tag: "Intelligent", color: "from-chart-4/30 to-transparent",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: "Autonomous Architectures",
    desc: "Unleash your company's potential with intelligent systems that automate complex processes while you focus on growth.",
    metric: "Efficiency +300%",
  },
]

export function Features() {
  const { language } = useLanguage()
  const features = language === 'es' ? featuresES : featuresEN
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".features-grid", start: "top 80%" },
        }
      )

      const cards = document.querySelectorAll(".feature-card")
      cards.forEach((card) => {
        const inner = card.querySelector(".tilt-inner")
        card.addEventListener("mousemove", (e: any) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = (y - centerY) / 10
          const rotateY = (centerX - x) / 10

          gsap.to(inner, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 0.5,
            ease: "power3.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(inner, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          })
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="relative pt-10 pb-10 md:pb-40 overflow-hidden scroll-mt-32">
      <div className="absolute inset-0 bg-grid opacity-10 mask-radial" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-white/10 mb-4 animate-float">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              {language === 'es' ? 'Sistemas Core' : 'Core Systems'}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1] md:leading-[0.9]">
            <span className="block md:whitespace-nowrap">{language === 'es' ? 'Diseñado para el' : 'Designed for the'}</span>
            <span className="text-gradient block md:whitespace-nowrap">{language === 'es' ? 'Extremo.' : 'Extreme.'}</span>
          </h2>
          <p className="text-white/40 text-base md:text-xl max-w-2xl mx-auto font-medium px-4 md:px-0">
            {language === 'es' 
              ? 'Cada módulo ha sido forjado para soportar las cargas de trabajo más exigentes con una elegancia visual sin precedentes.' 
              : 'Each module has been forged to withstand the most demanding workloads with unprecedented visual elegance.'}
          </p>
        </div>

        <div className="relative md:perspective-1000">
          <div className="features-grid flex flex-row flex-nowrap md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide pb-12 md:pb-0 touch-pan-x">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card group relative opacity-0 h-full flex-shrink-0 w-[85vw] md:w-auto snap-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tilt-inner relative h-full transition-transform duration-500" style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative glass-card p-8 md:p-10 rounded-3xl border border-white/5 group-hover:border-white/20 transition-all duration-500 overflow-hidden h-full">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  <div className="relative z-10 space-y-6 md:space-y-8" style={{ transform: "translateZ(50px)" }}>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                      {f.icon}
                    </div>
                    
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors">{f.title}</h3>
                      <p className="text-white/50 leading-relaxed font-medium text-base md:text-lg">{f.desc}</p>
                    </div>

                    <div className="pt-6 md:pt-8 flex items-center justify-between border-t border-white/5">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">{f.tag}</span>
                      <span className="text-[10px] md:text-xs font-bold text-primary px-3 py-1 md:px-4 md:py-1.5 bg-primary/10 rounded-full border border-primary/20">{f.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        <div className="mt-8 md:mt-32 relative z-20 space-y-4">
          {/* Row 1: Moving Left - Clean & Bold */}
          <div className="py-4 md:py-8 bg-white/[0.02] backdrop-blur-md border-t border-white/10 relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-[ticker_50s_linear_infinite] w-fit">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-10 md:gap-16 px-6 md:px-8">
                  {[
                    { s: language === 'es' ? "E-Commerce" : "E-Commerce", icon: <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> },
                    { s: language === 'es' ? "Apps Móviles" : "Mobile Apps", icon: <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
                    { s: language === 'es' ? "Apps Web" : "Web Apps", icon: <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /> },
                    { s: language === 'es' ? "Apps De Escritorio" : "Desktop Apps", icon: <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
                    { s: language === 'es' ? "Autobots" : "Autobots", icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> },
                    { s: language === 'es' ? "Webs" : "Websites", icon: <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> }
                  ].map((item) => (
                    <div key={item.s} className="flex items-center gap-4 md:gap-6 group/item cursor-default">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-primary transition-all duration-500 group-hover/item:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        {item.icon}
                      </svg>
                      <span className="text-2xl md:text-4xl font-black tracking-tight text-white group-hover/item:text-primary transition-colors duration-500">
                        {item.s}
                      </span>
                      {/* Brand Separator (Waves) */}
                      <svg viewBox="0 0 256 120" className="w-[30px] md:w-[40px] h-[15px] md:h-[20px] opacity-20 ml-4 md:ml-8">
                        <path d="M24 80c40-32 72-48 104-48s64 16 104 48" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" className="text-white" />
                      </svg>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Top Glow Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* Row 2: Moving Right - High Contrast */}
          <div className="py-4 md:py-8 bg-white/[0.01] border-b border-white/10 relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-[ticker_60s_linear_infinite_reverse] w-fit">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-14 md:gap-20 px-8 md:px-10">
                  {[
                    language === 'es' ? "Webs" : "Websites", 
                    language === 'es' ? "Autobots" : "Autobots", 
                    language === 'es' ? "Apps De Escritorio" : "Desktop Apps", 
                    language === 'es' ? "Apps Web" : "Web Apps", 
                    language === 'es' ? "Apps Móviles" : "Mobile Apps", 
                    language === 'es' ? "E-Commerce" : "E-Commerce"
                  ].map((s) => (
                    <div key={s} className="flex items-center gap-6 md:gap-10 group/item cursor-default">
                      <span className="text-2xl md:text-4xl font-black tracking-tighter text-white/20 group-hover/item:text-white transition-all duration-500">
                        {s}
                      </span>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/40 group-hover/item:bg-primary group-hover/item:shadow-[0_0_15px_rgba(51,255,181,0.5)] transition-all" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Clean Side Fades */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#060c14] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#060c14] to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
