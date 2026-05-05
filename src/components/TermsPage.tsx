import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/LanguageContext"
import { HUD, FallbackOrb } from "./Hero"
import { HeroScene } from "./HeroScene"

gsap.registerPlugin(ScrollTrigger)

export function TermsPage() {
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
      gsap.to(".terms-bg-canvas", { opacity: 0.15, duration: 2, ease: "power2.out" })
      gsap.to(".hud-element", { opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out" })

      // Intro animation for header
      gsap.from(".terms-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      })

      // Individual section animations
      const sections = gsap.utils.toArray<HTMLElement>(".terms-section")
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
    badge: "Legal & Legalidad",
    title: "Términos y ",
    titleAccent: "Condiciones",
    sections: [
      {
        title: "1. Aceptación de los Términos",
        body: "El uso de este sitio web implica la aceptación plena de los presentes términos y condiciones. Si no está de acuerdo con alguno de ellos, por favor no utilice este sitio."
      },
      {
        title: "2. Modificación de los Términos",
        body: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor automáticamente una vez publicados en este sitio web."
      },
      {
        title: "3. Derechos de Propiedad Intelectual",
        body: "Todos los contenidos, logotipos, gráficos, textos y software son propiedad de WaveFrame o de sus licenciatarios. Queda prohibida su reproducción, distribución o modificación sin autorización escrita."
      },
      {
        title: "4. Responsabilidades y Garantías",
        body: "No garantizamos la disponibilidad, continuidad ni infalibilidad del funcionamiento de este sitio. Nos reservamos el derecho de suspenderlo sin previo aviso. El uso del sitio es bajo su propia responsabilidad."
      },
      {
        title: "5. Enlaces Externos",
        body: "Este sitio puede contener enlaces a sitios de terceros. No somos responsables de los contenidos ni de las políticas de privacidad de dichos sitios."
      },
      {
        title: "6. Legislación Aplicable y Jurisdicción",
        body: "Los presentes términos se rigen por las leyes de la República Argentina. Cualquier disputa derivada del uso de este sitio será sometida a la jurisdicción de los tribunales de Buenos Aires, Argentina."
      }
    ]
  } : {
    badge: "Legal & Compliance",
    title: "Terms & ",
    titleAccent: "Conditions",
    sections: [
      {
        title: "1. Acceptance of Terms",
        body: "The use of this website implies full acceptance of these terms and conditions. If you do not agree with any of them, please do not use this site."
      },
      {
        title: "2. Modification of Terms",
        body: "We reserve the right to modify these terms at any time. Changes will take effect automatically once published on this website."
      },
      {
        title: "3. Intellectual Property Rights",
        body: "All content, logos, graphics, text, and software are the property of WaveFrame or its licensors. Reproduction, distribution, or modification without written authorization is prohibited."
      },
      {
        title: "4. Responsibilities and Warranties",
        body: "We do not guarantee the availability, continuity, or infallibility of the operation of this site. We reserve the right to suspend it without prior notice. Use of the site is at your own risk."
      },
      {
        title: "5. External Links",
        body: "This site may contain links to third-party sites. We are not responsible for the content or privacy policies of such sites."
      },
      {
        title: "6. Applicable Law and Jurisdiction",
        body: "These terms are governed by the laws of the Argentine Republic. Any dispute arising from the use of this site will be submitted to the jurisdiction of the courts of Buenos Aires, Argentina."
      }
    ]
  }

  return (
    <div ref={containerRef} className="relative min-h-screen pt-40 pb-32 bg-[#060c14]">
      {/* 1:1 BACKGROUND CLONE FROM HERO - Fixed to viewport for performance */}
      <div className="terms-bg-canvas fixed inset-0 z-0 opacity-0 pointer-events-none">
        {webGLAvailable ? <HeroScene /> : <FallbackOrb />}
      </div>

      {/* Grain/Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-noise opacity-[0.03]" />

      {/* HUD Layers - Removed for this page per request */}
      <div className="fixed inset-0 pointer-events-none z-10" />
      
      {/* Grid Decor - Standard WaveFrame Grid */}
      <div className="fixed inset-0 bg-grid opacity-5 mask-radial pointer-events-none z-0" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Header Section: Centered on Mobile, Sticky Sidebar on Desktop */}
          <div className="lg:w-[45%] lg:sticky lg:top-40 h-fit flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 mb-16 lg:mb-0">
            <div className="terms-reveal inline-flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
                {content.badge}
              </span>
            </div>
            
            <h1 className="terms-reveal text-5xl md:text-7xl lg:text-[5vw] xl:text-7xl font-black tracking-tighter text-white leading-[0.9] uppercase italic overflow-visible">
              <span className="block">{content.title}</span>
              <span className="text-gradient block not-italic">{content.titleAccent}</span>
            </h1>
          </div>

          {/* Content Section: Scrolling Cards */}
          <div className="lg:w-[55%] space-y-8">
            <div className="terms-content grid gap-8">
              {content.sections.map((section, i) => (
                <div key={i} className="terms-section glass p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all duration-500 group">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-white/50 text-lg leading-relaxed font-medium">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-12 border-t border-white/5">
              <p className="text-white/20 text-[10px] font-black tracking-[0.4em] uppercase">
                WaveFrame Studio // {language === 'es' ? 'Edición 2026' : '2026 Edition'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
