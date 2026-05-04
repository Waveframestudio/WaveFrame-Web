import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLanguage } from "@/lib/LanguageContext"

export function Footer() {
  const { language } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const scrollTo = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo(0, 0)
      return
    }
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const solutions = language === 'es'
    ? ["Desarrollo Web & Mobile", "Sistemas SaaS", "E-commerce Scalable", "Automatización & IA", "Diseño de Producto"]
    : ["Web & Mobile Dev", "SaaS Systems", "Scalable E-commerce", "Automation & AI", "Product Design"]

  const navigation = language === 'es'
    ? [
      { label: "Proyectos", href: "#projects" },
      { label: "Nosotros", href: "#about" },
      { label: "Cómo Trabajamos", href: "#story" },
      { label: "FAQ", href: "/faq" },
      { label: "Contacto", href: "#cta" }
    ]
    : [
      { label: "Projects", href: "#projects" },
      { label: "About Us", href: "#about" },
      { label: "How We Work", href: "#story" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "#cta" }
    ]

  return (
    <footer className="relative border-t border-white/5 py-24 overflow-hidden bg-[#060c14]">
      <div className="absolute inset-0 bg-grid opacity-5 mask-radial pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 z-20">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <svg width="28" height="20" viewBox="0 0 256 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logo-gradient-footer" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00ff88" />
                      <stop offset="50%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#ff00ff" />
                    </linearGradient>
                  </defs>
                  <path d="M24 100c40-32 72-48 104-48s64 16 104 48" fill="none" stroke="url(#logo-gradient-footer)" strokeWidth="18" strokeLinecap="round" />
                  <path d="M24 60c40-32 72-48 104-48s64 16 104 48" fill="none" stroke="url(#logo-gradient-footer)" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-[#33ffb5] to-[#3dd6f5] bg-clip-text text-transparent">Wave</span>
                <span className="bg-gradient-to-r from-[#6040ff] to-[#ff4081] bg-clip-text text-transparent">Frame</span>
                <span className="text-white/20 ml-1.5 font-bold italic text-xs tracking-widest uppercase">Studio</span>
              </span>
            </div>
            <p className="text-lg text-white/40 max-w-sm leading-relaxed font-medium">
              {language === 'es' ? 'Diseño y desarrollo de software innovador de alto valor.' : 'Innovative high-value software design and development.'}
            </p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/waveframe.studio" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary hover:scale-110 transition-all cursor-pointer group p-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/company/110369081/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary hover:scale-110 transition-all cursor-pointer group p-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6">
              {language === 'es' ? 'Soluciones' : 'Solutions'}
            </div>
            {solutions.map((l) => (
              <div
                key={l}
                onClick={() => scrollTo('#features')}
                className="text-sm font-medium text-white/30 hover:text-white transition-colors cursor-pointer"
              >
                {l}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6">
              {language === 'es' ? 'Navegación' : 'Navigation'}
            </div>
            {navigation.map((l) => (
              <div
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-white/30 hover:text-white transition-colors cursor-pointer"
              >
                {l.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
          <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
            {language === 'es' ? '© 2026 WaveFrame Studio. Todos los derechos reservados.' : '© 2026 WaveFrame Studio. All rights reserved.'}
          </div>
          <div className="flex gap-8">
            <Link
              to="/privacidad"
              className="text-[10px] font-bold tracking-widest text-white/20 hover:text-primary transition-colors cursor-pointer uppercase"
            >
              {language === 'es' ? 'Políticas de Privacidad' : 'Privacy Policies'}
            </Link>
            <Link
              to="/terminos"
              className="text-[10px] font-bold tracking-widest text-white/20 hover:text-primary transition-colors cursor-pointer uppercase"
            >
              {language === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
