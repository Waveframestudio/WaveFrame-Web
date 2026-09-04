import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const targetAudienceES = [
  { label: "Startups & Emprendedores", icon: "🚀" },
  { label: "Coaches, Consultores & Agencias", icon: "🎯" },
  { label: "Empresas de Servicios & Logística", icon: "💼" },
  { label: "Marcas E-Commerce & Retail", icon: "🛍️" },
  { label: "PyMEs & Empresas en Crecimiento", icon: "🏢" },
  { label: "Plantas Industriales & Fábricas", icon: "🏭" }
]

const targetAudienceEN = [
  { label: "Startups & Entrepreneurs", icon: "🚀" },
  { label: "Coaches, Consultants & Agencies", icon: "🎯" },
  { label: "Service & Logistics Companies", icon: "💼" },
  { label: "E-Commerce & Retail Brands", icon: "🛍️" },
  { label: "SMEs & Growing Businesses", icon: "🏢" },
  { label: "Industrial Plants & Factories", icon: "🏭" }
]

const featuresES = [
  {
    tag: "Conversión", 
    color: "from-primary/30 to-transparent",
    badge: "Ventas & Leads",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Landing Pages de Alta Conversión",
    desc: "Páginas web ultra rápidas diseñadas con estrategia visual para captar leads, impulsar campañas publicitarias y convertir visitas en clientes activos.",
    metric: "Máxima Conversión",
  },
  {
    tag: "E-Commerce", 
    color: "from-chart-2/30 to-transparent",
    badge: "Ventas 24/7",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "Tiendas en Línea & E-Commerce",
    desc: "Plataformas de venta online a medida, seguras y optimizadas para brindar una experiencia de compra fluida que maximice tus ingresos.",
    metric: "Checkout Rápido",
  },
  {
    tag: "Aplicaciones", 
    color: "from-chart-3/30 to-transparent",
    badge: "iOS / Android / Web",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Apps Web & Móviles Nativas",
    desc: "Desarrollo de aplicaciones móviles y web de alto rendimiento con interfaces intuitivas y arquitecturas escalables preparadas para miles de usuarios.",
    metric: "Multi-Plataforma",
  },
  {
    tag: "Industria & Pymes", 
    color: "from-chart-4/30 to-transparent",
    badge: "Gestión A Medida",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0H9m1 0h1m-1 4h1m-1 0H9m1 0h1" />
      </svg>
    ),
    title: "Sistemas Industriales & ERPs",
    desc: "Software de gestión empresarial e industrial para control de stock, procesos operativos y automatización interna adaptado al 100% a tu empresa.",
    metric: "Control Total",
  },
  {
    tag: "Automatización", 
    color: "from-primary/30 to-transparent",
    badge: "Bots & IA",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Bots de Automatización & ATC",
    desc: "Desarrollamos bots inteligentes de atención al cliente (ATC) e integraciones de automatización que responden dudas, agendan citas y operan 24/7 sin descanso.",
    metric: "Eficiencia 24/7",
  },
  {
    tag: "All-in-One", 
    color: "from-chart-2/30 to-transparent",
    badge: "Infraestructura",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Hosting Cloud, Mantenimiento & Email",
    desc: "Servicio integral de servidores ultra veloces, seguridad continua, correos corporativos y soporte para mantener tu ecosistema web óptimo siempre.",
    metric: "99.9% Uptime",
  },
]

const featuresEN = [
  {
    tag: "Conversion", 
    color: "from-primary/30 to-transparent",
    badge: "Sales & Leads",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "High-Converting Landing Pages",
    desc: "Ultra-fast web pages designed with visual strategy to capture leads, boost ad campaigns, and turn visits into active clients.",
    metric: "Max Conversion",
  },
  {
    tag: "E-Commerce", 
    color: "from-chart-2/30 to-transparent",
    badge: "24/7 Sales",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "Online Stores & E-Commerce",
    desc: "Tailor-made, secure, and optimized online shopping platforms designed for seamless checkout and revenue growth.",
    metric: "Fast Checkout",
  },
  {
    tag: "Applications", 
    color: "from-chart-3/30 to-transparent",
    badge: "iOS / Android / Web",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Web & Native Mobile Apps",
    desc: "Development of high-performance mobile and web applications with intuitive interfaces and scalable architectures.",
    metric: "Multi-Platform",
  },
  {
    tag: "Industry & SMEs", 
    color: "from-chart-4/30 to-transparent",
    badge: "Custom Management",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0H9m1 0h1m-1 4h1m-1 0H9m1 0h1" />
      </svg>
    ),
    title: "Industrial Systems & Custom ERPs",
    desc: "Industrial and business management software for stock control, operational workflows, and internal automation.",
    metric: "Total Control",
  },
  {
    tag: "Automation", 
    color: "from-primary/30 to-transparent",
    badge: "Bots & AI",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Automation Bots & Customer Care",
    desc: "We build smart customer support (ATC) bots and automation integrations that handle inquiries, schedule appointments, and run 24/7.",
    metric: "24/7 Efficiency",
  },
  {
    tag: "All-in-One", 
    color: "from-chart-2/30 to-transparent",
    badge: "Infrastructure",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Cloud Hosting, Maintenance & Email",
    desc: "Full-service package including ultra-fast servers, continuous security, corporate emails, and ongoing support.",
    metric: "99.9% Uptime",
  },
]

export function Features() {
  const { language } = useLanguage()
  const features = language === 'es' ? featuresES : featuresEN
  const audiences = language === 'es' ? targetAudienceES : targetAudienceEN
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  useGSAP(() => {
    // Sliding animation for audience chips from alternating sides
    const chips = document.querySelectorAll(".audience-chip")
    chips.forEach((chip, i) => {
      const fromX = i % 2 === 0 ? -100 : 100
      gsap.fromTo(
        chip,
        { opacity: 0, x: fromX },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: chip,
            start: "top 90%",
          },
          delay: (i % 3) * 0.1,
        }
      )
    })

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

    // Mobile horizontal animation: start at last card and scroll smoothly to the first card
    const gridContainer = document.querySelector(".features-grid") as HTMLElement | null
    if (gridContainer) {
      // Set initial scroll to end once layout renders
      setTimeout(() => {
        if (gridContainer) {
          const maxScroll = gridContainer.scrollWidth - gridContainer.clientWidth
          if (maxScroll > 0) {
            gridContainer.scrollLeft = maxScroll
            const scrollObj = { x: maxScroll }

            gsap.to(scrollObj, {
              x: 0,
              duration: 1.8,
              ease: "power3.inOut",
              onUpdate: () => {
                gridContainer.scrollLeft = scrollObj.x
              },
              scrollTrigger: {
                trigger: gridContainer,
                start: "top 85%",
                once: true,
              },
            })
          }
        }
      }, 100)
    }

    if (!isMobile) {
      const cards = document.querySelectorAll(".feature-card")
      cards.forEach((card) => {
        const inner = card.querySelector(".tilt-inner")
        if (!inner) return
        
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
    }
  }, { scope: sectionRef, dependencies: [isMobile] })

  return (
    <section ref={sectionRef} id="features" className="relative pt-20 pb-10 md:pb-32 overflow-hidden scroll-mt-32">
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header Intro */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-white/10 mb-2 animate-float">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              {language === 'es' ? 'Soluciones Web de Alto Rendimiento' : 'High-Performance Web Solutions'}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]">
            {language === 'es' ? (
              <>
                Soluciones Web Estratégicas para <br className="hidden md:inline" />
                <span className="text-gradient">Marcas, PyMEs y Negocios en Crecimiento</span>
              </>
            ) : (
              <>
                Strategic Web Solutions for <br className="hidden md:inline" />
                <span className="text-gradient">Brands, SMEs & Growing Businesses</span>
              </>
            )}
          </h2>
          
          <p className="text-white/60 text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed px-4 md:px-0 pt-2">
            {language === 'es' 
              ? 'Trabajamos mano a mano con pequeños negocios, marcas emergentes, PyMEs y personas con ideas extraordinarias que buscan una presencia digital profesional, rápida y de alto impacto que potencie sus ventas y materialice sus proyectos.' 
              : 'We work side-by-side with small businesses, emerging brands, SMEs, and individuals with extraordinary ideas seeking a professional, fast, high-impact digital presence to scale sales and bring projects to life.'}
          </p>

          {/* CTA Link / Button direct engagement */}
          <div className="pt-4">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold text-sm border border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all duration-300 group"
            >
              <span>{language === 'es' ? 'Hablemos de tu proyecto' : 'Let\'s talk about your project'}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Target Audience Badges / Chips */}
        <div className="mb-16 md:mb-20">
          <p className="text-center text-xs uppercase tracking-widest text-white/40 font-bold mb-4">
            {language === 'es' ? 'Diseñado para impulsar a:' : 'Designed to empower:'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto overflow-hidden px-2">
            {audiences.map((aud, i) => (
              <div 
                key={i}
                className="audience-chip glass px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5 text-white/90 text-sm font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <span>{aud.icon}</span>
                <span>{aud.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Subtitle */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-black text-white">
            {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </h3>
          <p className="text-white/40 text-sm md:text-base font-medium mt-1">
            {language === 'es' ? 'Arquitectura moderna, rápida y a medida sin las limitaciones de plataformas obsoletas.' : 'Modern, fast, custom architecture without the constraints of outdated platforms.'}
          </p>
        </div>

        {/* Cards Grid (2x2 on Desktop, Carousel on Mobile) */}
        <div className="relative lg:perspective-1000">
          <div 
            className="features-grid flex flex-row flex-nowrap lg:grid lg:grid-cols-2 gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden lg:overflow-x-visible snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0 pb-8 lg:pb-0 touch-pan-x"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card group relative h-full flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[450px] lg:w-auto snap-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tilt-inner relative h-full transition-transform duration-500" style={{ transformStyle: "preserve-3d" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <div className="relative glass-card p-8 md:p-10 rounded-3xl border border-white/5 group-hover:border-white/20 transition-all duration-500 overflow-hidden h-full flex flex-col justify-between">
                    <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${f.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                          {f.icon}
                        </div>
                        <span className="text-[11px] font-bold text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          {f.badge}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors leading-snug">
                          {f.title}
                        </h4>
                        <p className="text-white/60 leading-relaxed font-medium text-base">
                          {f.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 flex items-center justify-between border-t border-white/5 relative z-10">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">{f.tag}</span>
                      <span className="text-[10px] md:text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">{f.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint dots — visible on mobile & tablet only */}
        <div className="flex lg:hidden justify-center gap-2 mt-4 pb-2">
          {features.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
          ))}
        </div>

        {/* Bottom Banner highlight */}
        <div className="mt-16 md:mt-24 text-center">
          <div className="inline-block glass-card p-6 md:p-8 rounded-3xl border border-primary/30 max-w-3xl mx-auto shadow-[0_0_30px_rgba(var(--primary),0.1)]">
            <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
              {language === 'es' 
                ? 'Nos encargamos 100% de tu ecosistema web' 
                : 'We handle 100% of your web ecosystem'}
            </h4>
            <p className="text-white/60 text-sm md:text-base">
              {language === 'es'
                ? 'Olvídate de la complejidad técnica, servidores o problemas de seguridad. Nosotros lo gestionamos para que tú te dediques a hacer crecer tu negocio.'
                : 'Forget about technical complexity, servers, or security issues. We manage everything so you can focus on expanding your business.'}
            </p>
          </div>
        </div>

        {/* Ticker bar */}
        <div className="mt-16 md:mt-24 relative z-20 space-y-4">
          <div className="py-4 md:py-8 bg-white/[0.02] backdrop-blur-md border-t border-b border-white/10 relative overflow-hidden">
            <div className="flex whitespace-nowrap animate-[ticker_50s_linear_infinite] w-fit">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-10 md:gap-16 px-6 md:px-8">
                  {[
                    { s: language === 'es' ? "Landing Pages" : "Landing Pages" },
                    { s: language === 'es' ? "Sitios Corporativos" : "Corporate Sites" },
                    { s: language === 'es' ? "E-Commerce" : "E-Commerce" },
                    { s: language === 'es' ? "Mantenimiento 24/7" : "24/7 Maintenance" },
                    { s: language === 'es' ? "Cloud Hosting" : "Cloud Hosting" },
                    { s: language === 'es' ? "Email Profesional" : "Business Email" }
                  ].map((item) => (
                    <div key={item.s} className="flex items-center gap-4 md:gap-6 group/item cursor-default">
                      <span className="text-xl md:text-3xl font-black tracking-tight text-white group-hover/item:text-primary transition-colors duration-500">
                        {item.s}
                      </span>
                      <span className="text-primary/40 font-bold">•</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Top Glow Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* Clean Side Fades */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#060c14] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#060c14] to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
