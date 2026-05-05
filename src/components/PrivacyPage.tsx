import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/LanguageContext"
import { Link } from "react-router-dom"
import { HUD, FallbackOrb } from "./Hero"
import { HeroScene } from "./HeroScene"

gsap.registerPlugin(ScrollTrigger)

export function PrivacyPage() {
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
      gsap.to(".privacy-bg-canvas", { opacity: 0.15, duration: 2, ease: "power2.out" })

      // Intro animation for header
      gsap.from(".privacy-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      })

      // Individual section animations
      const sections = gsap.utils.toArray<HTMLElement>(".privacy-section")
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
    badge: "Seguridad & Transparencia",
    title: "Políticas de ",
    titleAccent: "Privacidad",
    sections: [
      {
        title: "1. Introducción",
        body: "En WaveFrame Studio ('nosotros', 'nuestro', o 'la Agencia'), la privacidad y seguridad de sus datos son nuestra prioridad absoluta. Estas Políticas de Privacidad describen cómo recopilamos, utilizamos y protegemos la información personal que usted nos proporciona a través de nuestro sitio web y servicios."
      },
      {
        title: "2. Recopilación de Información",
        body: "Recopilamos información que usted nos proporciona directamente cuando se comunica con nosotros, solicita una cotización o se suscribe a nuestros servicios. Esto puede incluir nombre, dirección de correo electrónico, número de teléfono y detalles del proyecto."
      },
      {
        title: "3. Uso de la Información",
        body: "Utilizamos la información recopilada para: proveer y mantener nuestros servicios, procesar transacciones, comunicarnos con usted sobre proyectos y actualizaciones, y mejorar la experiencia del usuario en nuestra plataforma."
      },
      {
        title: "4. Protección de Datos",
        body: "Implementamos medidas de seguridad técnicas y organizativas de nivel avanzado para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción. Su información se almacena en servidores seguros con cifrado de extremo a extremo."
      },
      {
        title: "5. Cookies y Tecnologías de Seguimiento",
        body: "Utilizamos cookies y tecnologías similares para analizar tendencias, administrar el sitio web y rastrear los movimientos de los usuarios alrededor del sitio. Usted puede controlar el uso de cookies a nivel de navegador individual."
      },
      {
        title: "6. Enlaces a Terceros",
        body: "Nuestro sitio web puede contener enlaces a sitios externos que no son operados por nosotros. No tenemos control sobre el contenido y las prácticas de estos sitios y no podemos aceptar responsabilidad por sus respectivas políticas de privacidad."
      },
      {
        title: "7. Derechos del Usuario",
        body: "Usted tiene derecho a acceder, rectificar o eliminar sus datos personales en cualquier momento. También puede oponerse al procesamiento de sus datos o solicitar la limitación del mismo."
      },
      {
        title: "8. Cambios en estas Políticas",
        body: "Nos reservamos el derecho de actualizar estas Políticas de Privacidad en cualquier momento. Le notificaremos cualquier cambio sustancial publicando la nueva política en esta página."
      },
      {
        title: "9. Contacto",
        body: "Si tiene alguna pregunta sobre estas Políticas de Privacidad, no dude en contactarnos a través de wave1frame@gmail.com."
      }
    ]
  } : {
    badge: "Security & Transparency",
    title: "Privacy ",
    titleAccent: "Policies",
    sections: [
      {
        title: "1. Introduction",
        body: "At WaveFrame Studio ('we', 'our', or 'the Agency'), the privacy and security of your data are our absolute priority. These Privacy Policies describe how we collect, use, and protect the personal information you provide to us through our website and services."
      },
      {
        title: "2. Information Collection",
        body: "We collect information that you provide directly to us when you communicate with us, request a quote, or subscribe to our services. This may include name, email address, phone number, and project details."
      },
      {
        title: "3. Use of Information",
        body: "We use the collected information to: provide and maintain our services, process transactions, communicate with you about projects and updates, and improve the user experience on our platform."
      },
      {
        title: "4. Data Protection",
        body: "We implement advanced technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your information is stored on secure servers with end-to-end encryption."
      },
      {
        title: "5. Cookies and Tracking Technologies",
        body: "We use cookies and similar technologies to analyze trends, administer the website, and track users' movements around the site. You can control the use of cookies at the individual browser level."
      },
      {
        title: "6. Third-Party Links",
        body: "Our website may contain links to external sites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies."
      },
      {
        title: "7. User Rights",
        body: "You have the right to access, rectify, or delete your personal data at any time. You can also object to the processing of your data or request the limitation of it."
      },
      {
        title: "8. Changes to these Policies",
        body: "We reserve the right to update these Privacy Policies at any time. We will notify you of any material changes by posting the new policy on this page."
      },
      {
        title: "9. Contact",
        body: "If you have any questions about these Privacy Policies, please do not hesitate to contact us at wave1frame@gmail.com."
      }
    ]
  }

  return (
    <div ref={containerRef} className="relative min-h-screen pt-28 lg:pt-40 pb-32 bg-[#060c14]">
      {/* 1:1 BACKGROUND CLONE FROM HERO - Fixed to viewport for performance */}
      <div className="privacy-bg-canvas fixed inset-0 z-0 opacity-0 pointer-events-none">
        {webGLAvailable ? <HeroScene /> : <FallbackOrb />}
      </div>

      {/* Grain/Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-noise opacity-[0.03]" />

      {/* HUD Layers - Removed for this page per request */}
      <div className="fixed inset-0 pointer-events-none z-10" />
      
      {/* Grid Decor - Standard WaveFrame Grid */}
      <div className="fixed inset-0 bg-grid opacity-5 mask-radial pointer-events-none z-0" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-24">
          {/* Header Section: Centered on Mobile, Sticky Sidebar on Desktop */}
          <div className="lg:w-[45%] lg:sticky lg:top-40 h-fit flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:space-y-8 mb-6 lg:mb-0">
            <div className="privacy-reveal inline-flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
                {content.badge}
              </span>
            </div>
            
            <h1 className="privacy-reveal text-5xl sm:text-7xl lg:text-[5.5vw] xl:text-7xl font-black tracking-tighter text-white leading-[0.9] uppercase italic overflow-visible">
              <span className="block">{content.title}</span>
              <span className="text-gradient block not-italic">{content.titleAccent}</span>
            </h1>
          </div>

          {/* Content Section: Scrolling Cards */}
          <div className="lg:w-[55%] space-y-6 lg:space-y-8">
            <div className="privacy-content grid gap-8">
              {content.sections.map((section, i) => (
                <div key={i} className="privacy-section glass p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all duration-500 group">
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
