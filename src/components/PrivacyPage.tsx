import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/LanguageContext"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

export function PrivacyPage() {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const ctx = gsap.context(() => {
      gsap.from(".privacy-header", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power4.out"
      })

      gsap.from(".privacy-section", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".privacy-content",
          start: "top 80%",
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const content = language === 'es' ? {
    title: "Protocolo de Privacidad",
    subtitle: "WaveFrame Studio // Seguridad & Transparencia",
    sections: [
      {
        title: "1. Introducción",
        body: "En WaveFrame Studio ('nosotros', 'nuestro', o 'la Agencia'), la privacidad y seguridad de sus datos son nuestra prioridad absoluta. Este Protocolo de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que usted nos proporciona a través de nuestro sitio web y servicios."
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
        title: "8. Cambios en este Protocolo",
        body: "Nos reservamos el derecho de actualizar este Protocolo de Privacidad en cualquier momento. Le notificaremos cualquier cambio sustancial publicando la nueva política en esta página."
      },
      {
        title: "9. Contacto",
        body: "Si tiene alguna pregunta sobre este Protocolo de Privacidad, no dude en contactarnos a través de wave1frame@gmail.com."
      }
    ]
  } : {
    title: "Privacy Protocol",
    subtitle: "WaveFrame Studio // Security & Transparency",
    sections: [
      {
        title: "1. Introduction",
        body: "At WaveFrame Studio ('we', 'our', or 'the Agency'), the privacy and security of your data are our absolute priority. This Privacy Protocol describes how we collect, use, and protect the personal information you provide to us through our website and services."
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
        title: "8. Changes to this Protocol",
        body: "We reserve the right to update this Privacy Protocol at any time. We will notify you of any material changes by posting the new policy on this page."
      },
      {
        title: "9. Contact",
        body: "If you have any questions about this Privacy Protocol, please do not hesitate to contact us at wave1frame@gmail.com."
      }
    ]
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#060c14] pt-40 pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid opacity-5 mask-radial pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="privacy-header text-center mb-24 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-white/10 mb-4 hover:border-primary/40 transition-colors group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
            </span>
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            {content.title}
          </h1>
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
            {content.subtitle}
          </p>
        </div>

        <div className="privacy-content space-y-16">
          {content.sections.map((section, i) => (
            <div key={i} className="privacy-section glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">
                {section.title}
              </h2>
              <p className="text-white/50 text-lg leading-relaxed font-medium">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs font-bold tracking-widest uppercase">
            {language === 'es' 
              ? 'Última actualización: 30 de Abril, 2026' 
              : 'Last updated: April 30, 2026'}
          </p>
        </div>
      </div>
    </div>
  )
}
