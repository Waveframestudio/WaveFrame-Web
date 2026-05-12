import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useLanguage } from "@/lib/LanguageContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { MobileMenu } from "./MobileMenu"

const links = [
  { label: "nav.services", href: "#features" },
  { label: "nav.about", href: "#about" },
  { label: "nav.projects", href: "#projects" },
  { label: "nav.contact", href: "#cta" },
]

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.8 }
    )
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })

    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    
    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }

    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo(0, 0)
      return
    }

    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 800)
      return
    }

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 opacity-0 ${
          scrolled ? "nav-scrolled py-3" : "py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group cursor-pointer">
            <div 
              className={`relative flex items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                scrolled ? "opacity-100 scale-100 w-[34px] mr-1" : "opacity-0 scale-50 w-0 mr-0"
              }`}
            >
              <svg width="34" height="24" viewBox="0 0 256 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]">
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00ff88"/>
                    <stop offset="50%" stopColor="#00ffff"/>
                    <stop offset="100%" stopColor="#ff00ff"/>
                  </linearGradient>
                </defs>
                <path d="M24 100c40-32 72-48 104-48s64 16 104 48" fill="none" stroke="url(#logo-gradient)" strokeWidth="18" strokeLinecap="round" />
                <path d="M24 60c40-32 72-48 104-48s64 16 104 48" fill="none" stroke="url(#logo-gradient)" strokeWidth="10" strokeLinecap="round" opacity="0.7"/>
              </svg>
            </div>
            
            <span className="text-xl md:text-2xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-[#33ffb5] to-[#3dd6f5] bg-clip-text text-transparent">Wave</span>
              <span className="bg-gradient-to-r from-[#6040ff] to-[#ff4081] bg-clip-text text-transparent">Frame</span>
              <span className="text-white/40 ml-1.5 font-bold italic text-sm tracking-widest uppercase">Studio</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 p-1.5 glass rounded-full border border-white/5">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                {t(l.label)}
              </button>
            ))}
          </div>

          <div ref={langRef} className="hidden md:flex items-center gap-6 relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className={`text-[11px] font-bold tracking-widest uppercase transition-colors flex items-center gap-2 py-2 ${
                langOpen ? 'text-primary' : 'text-white/50 hover:text-white'
              }`}
            >
              {language === 'es' ? 'ESP' : 'ENG'}
              <svg 
                width="10" height="6" viewBox="0 0 10 6" fill="none" 
                className={`transition-all duration-300 ${langOpen ? 'rotate-180 text-primary' : 'opacity-50 text-white'}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`absolute top-full right-0 mt-2 w-24 glass-card rounded-xl border border-white/10 transition-all duration-300 overflow-hidden flex flex-col z-50 ${
              langOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
            }`}>
              <button onClick={() => { setLanguage('es'); setLangOpen(false); }} className={`w-full text-left px-4 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-white/5 transition-colors ${language === 'es' ? 'text-primary' : 'text-white/50'}`}>ESP</button>
              <button onClick={() => { setLanguage('en'); setLangOpen(false); }} className={`w-full text-left px-4 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-white/5 transition-colors ${language === 'en' ? 'text-primary' : 'text-white/50'}`}>ENG</button>
            </div>
          </div>
          
          <div className="w-10 h-10 md:hidden" />
        </div>
      </nav>

      <div className={`fixed top-0 left-0 right-0 pointer-events-none z-[110] transition-all duration-700 ${
        scrolled ? "py-3" : "py-8"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-end">
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 relative pointer-events-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-500 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-500 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-500 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
        scrollTo={scrollTo}
        links={links}
      />
    </>
  )
}
