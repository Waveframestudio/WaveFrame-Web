import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useLanguage } from "@/lib/LanguageContext"

const links = [
  { label: "nav.services", href: "#features" },
  { label: "nav.about", href: "#about" },
  { label: "nav.projects", href: "#projects" },
  { label: "nav.contact", href: "#cta" },
]

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.8 }
    )
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 opacity-0 ${
        scrolled ? "glass border-b border-white/10 py-3" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3 group cursor-pointer">
          {/* Logo Icon - Hidden at top, shown on scroll */}
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
        </button>

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

        <div className="hidden md:flex items-center gap-6 relative group">
          <button className="text-[11px] font-bold tracking-widest uppercase text-white/50 hover:text-white transition-colors flex items-center gap-2 py-2">
            {language === 'es' ? 'ESP' : 'ENG'}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-50 group-hover:opacity-100 transition-opacity">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="absolute top-full right-0 mt-2 w-24 glass-card rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden flex flex-col">
            <button onClick={() => setLanguage('es')} className={`w-full text-left px-4 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-white/5 transition-colors ${language === 'es' ? 'text-primary' : 'text-white/50'}`}>ESP</button>
            <button onClick={() => setLanguage('en')} className={`w-full text-left px-4 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-white/5 transition-colors ${language === 'en' ? 'text-primary' : 'text-white/50'}`}>ENG</button>
          </div>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-500 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-500 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-500 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-8 mt-3 flex flex-col gap-4 animate-fade-in">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-left text-2xl font-black text-white/60 hover:text-primary transition-colors"
            >
              {t(l.label)}
            </button>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <div className="flex gap-4">
            <button onClick={() => setLanguage('es')} className={`flex-1 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-colors ${language === 'es' ? 'bg-primary text-black' : 'glass border border-white/10 text-white'}`}>ESP</button>
            <button onClick={() => setLanguage('en')} className={`flex-1 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-colors ${language === 'en' ? 'bg-primary text-black' : 'glass border border-white/10 text-white'}`}>ENG</button>
          </div>
        </div>
      )}
    </nav>
  )
}
