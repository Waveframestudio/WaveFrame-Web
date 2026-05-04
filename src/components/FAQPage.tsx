import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/LanguageContext"
import { HUD, FallbackOrb } from "./Hero"
import { HeroScene } from "./HeroScene"

gsap.registerPlugin(ScrollTrigger)

export function FAQPage() {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [webGLAvailable, setWebGLAvailable] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    try {
      const canvas = document.createElement("canvas")
      setWebGLAvailable(!!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))))
    } catch (e) {
      setWebGLAvailable(false)
    }
    
    const ctx = gsap.context(() => {
      // Reveal background elements
      gsap.to(".faq-bg-canvas", { opacity: 0.15, duration: 2, ease: "power2.out" })
      gsap.to(".hud-element", { opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out" })

      // Intro animation for header
      gsap.from(".faq-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      })

      // Individual section animations
      const sections = gsap.utils.toArray<HTMLElement>(".faq-section")
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const content = language === 'es' ? {
    badge: "Centro de Ayuda",
    title: "Preguntas ",
    titleAccent: "Frecuentes",
    sections: [
      {
        title: "¿Qué servicios ofrecen exactamente?",
        body: "Nos especializamos en el desarrollo de aplicaciones web y móviles de alta performance, consultoría en arquitectura de software, diseño de producto UX/UI y automatización de procesos mediante IA."
      },
      {
        title: "¿Cuánto tiempo toma desarrollar un proyecto?",
        body: "Los plazos varían según la complejidad. Un Producto Mínimo Viable (MVP) suele desarrollarse en 8-12 semanas. Proyectos más robustos pueden tomar de 4 a 6 meses de desarrollo continuo."
      },
      {
        title: "¿Cómo es el proceso de trabajo?",
        body: "Trabajamos con metodologías ágiles (Scrum). Dividimos el proyecto en 'sprints' de dos semanas, entregando avances funcionales constantes para asegurar que el producto final supere las expectativas."
      },
      {
        title: "¿Ofrecen soporte después del lanzamiento?",
        body: "Totalmente. Ofrecemos planes de mantenimiento evolutivo y preventivo para garantizar que el software se mantenga seguro, actualizado y escalable frente al crecimiento de tu negocio."
      },
      {
        title: "¿Qué tecnologías utilizan?",
        body: "Utilizamos stacks modernos y probados en la industria como React, Next.js, TypeScript, Node.js y React Native, junto con infraestructuras cloud líderes (AWS / Google Cloud)."
      },
      {
        title: "¿Trabajan con clientes internacionales?",
        body: "Sí, tenemos experiencia colaborando con empresas de toda América Latina, Estados Unidos y Europa, manejando flujos de trabajo remotos eficientes y comunicación bilingüe."
      }
    ]
  } : {
    badge: "Help Center",
    title: "Frequent ",
    titleAccent: "Questions",
    sections: [
      {
        title: "What services do you offer exactly?",
        body: "We specialize in high-performance web and mobile application development, software architecture consulting, UX/UI product design, and process automation through AI."
      },
      {
        title: "How long does it take to develop a project?",
        body: "Timelines vary by complexity. A Minimum Viable Product (MVP) is typically developed in 8-12 weeks. More robust projects can take 4 to 6 months of continuous development."
      },
      {
        title: "What is your workflow like?",
        body: "We work with agile methodologies (Scrum). We divide the project into two-week 'sprints', delivering constant functional progress to ensure the final product exceeds expectations."
      },
      {
        title: "Do you offer post-launch support?",
        body: "Absolutely. We offer evolutionary and preventive maintenance plans to guarantee that the software remains secure, updated, and scalable as your business grows."
      },
      {
        title: "What technologies do you use?",
        body: "We use modern and industry-proven stacks such as React, Next.js, TypeScript, Node.js, and React Native, along with leading cloud infrastructures (AWS / Google Cloud)."
      },
      {
        title: "Do you work with international clients?",
        body: "Yes, we have experience collaborating with companies across Latin America, the United States, and Europe, managing efficient remote workflows and bilingual communication."
      }
    ]
  }

  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <div ref={containerRef} className="relative min-h-screen pt-40 pb-32 bg-[#060c14]">
      {/* BACKGROUND - Fixed for performance */}
      <div className="faq-bg-canvas fixed inset-0 z-0 opacity-0 pointer-events-none">
        {webGLAvailable ? <HeroScene /> : <FallbackOrb />}
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1] bg-noise opacity-[0.03]" />
      <div className="fixed inset-0 pointer-events-none z-10">
        <HUD />
      </div>
      <div className="fixed inset-0 bg-grid opacity-5 mask-radial pointer-events-none z-0" />
      
      <div className="relative z-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-24 space-y-8 overflow-visible">
          <div className="faq-reveal inline-flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
              {content.badge}
            </span>
          </div>
          
          <h1 className="faq-reveal text-6xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-white leading-[0.8] uppercase italic overflow-visible px-8">
            {content.title}
            <span className="text-gradient block md:inline not-italic pr-4">{content.titleAccent}</span>
          </h1>
        </div>

        {/* FAQ Accordion - Centered Single Column */}
        <div className="faq-content max-w-3xl mx-auto space-y-4">
          {content.sections.map((section, i) => (
            <div 
              key={i} 
              className={`faq-section glass rounded-[2rem] md:rounded-[3rem] border transition-all duration-500 overflow-hidden ${
                activeIndex === i ? "border-primary/30 bg-primary/5" : "border-white/5"
              }`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full text-left p-8 md:p-12 flex items-center justify-between gap-6 group"
              >
                <h2 className={`text-xl md:text-2xl font-black transition-colors duration-500 ${
                  activeIndex === i ? "text-primary" : "text-white"
                }`}>
                  {section.title}
                </h2>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                  activeIndex === i ? "border-primary bg-primary text-black rotate-180" : "border-white/10 text-white/40"
                }`}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              <div 
                className={`grid transition-all duration-500 ease-in-out ${
                  activeIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-8 md:px-12 pb-8 md:pb-12">
                    <div className="h-px bg-white/5 w-full mb-8" />
                    <p className="text-white/50 text-lg leading-relaxed font-medium">
                      {section.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-20 pt-12 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] font-black tracking-[0.4em] uppercase">
              WaveFrame Studio // {language === 'es' ? 'Edición 2026' : '2026 Edition'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
