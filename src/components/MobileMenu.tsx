import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/lib/LanguageContext"
import { gsap } from "gsap"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  scrollTo: (href: string) => void
  links: { label: string; href: string }[]
}

export function MobileMenu({ isOpen, onClose, scrollTo, links }: MobileMenuProps) {
  const { language, setLanguage, t } = useLanguage()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isOpen) {
        // Start glitch animation loop for menu links
        gsap.timeline({ repeat: -1, repeatDelay: 3 })
          .to(".title-glitch", { skewX: 15, x: -5, duration: 0.1, color: "#3dd6f5" })
          .to(".title-glitch", { skewX: -15, x: 5, duration: 0.1, color: "#ff4081" })
          .to(".title-glitch", { skewX: 0, x: 0, duration: 0.1, color: "white" })
      }
    }, menuRef)

    return () => ctx.revert()
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[80] transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0, 0, 0, 0.3)" }}
        onClick={onClose}
      />

      {/* Side Menu */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-screen w-[75%] z-[90] flex flex-col p-8 pt-6 gap-10 transition-transform duration-600 cubic-bezier(0.16, 1, 0.3, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ 
          background: "rgba(30, 41, 59, 0.85)", 
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "-20px 0 50px rgba(0, 0, 0, 0.3)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* Side Menu Header: Switch */}
        <div className={`flex items-center transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div 
            className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-1 w-[120px] cursor-pointer transition-all duration-300"
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          >
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_15px_rgba(0,255,136,0.3)]"
              style={{ left: language === 'es' ? '4px' : 'calc(50% + 0px)' }}
            />
            <div className={`flex-1 text-center text-[10px] font-black z-10 transition-colors duration-300 ${language === 'es' ? 'text-black' : 'text-white/40'}`}>ESP</div>
            <div className={`flex-1 text-center text-[10px] font-black z-10 transition-colors duration-300 ${language === 'en' ? 'text-black' : 'text-white/40'}`}>ENG</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => scrollTo('#hero')}
            className={`group relative w-fit text-left text-3xl font-black italic uppercase tracking-tighter transition-all duration-500 ${
              isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="title-glitch block">
              {language === 'es' ? 'Inicio' : 'Home'}
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
          </button>
          {links.map((l, i) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`group relative w-fit text-left text-3xl font-black italic uppercase tracking-tighter transition-all duration-500 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
            >
              <span className="title-glitch block">
                {t(l.label)}
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          
          <div className={`h-px bg-white/10 w-full my-2 transition-all duration-700 delay-700 ${isOpen ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />

          <Link
            to="/privacidad"
            onClick={onClose}
            className={`group relative w-fit text-left text-3xl font-black italic uppercase tracking-tighter transition-all duration-500 ${
              isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            style={{ transitionDelay: '0.8s' }}
          >
            <span className="title-glitch block">
              {language === 'es' ? 'Privacidad' : 'Privacy'}
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            to="/terminos"
            onClick={onClose}
            className={`group relative w-fit text-left text-3xl font-black italic uppercase tracking-tighter transition-all duration-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.9s' }}
          >
            <span className="title-glitch block">
              {language === 'es' ? 'Términos' : 'Terms'}
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </div>
    </>
  )
}

