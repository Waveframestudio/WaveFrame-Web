import { useLanguage } from "@/lib/LanguageContext"

export function Footer() {
  const { language } = useLanguage()
  return (
    <footer className="relative border-t border-white/5 py-24 overflow-hidden bg-[#060c14]">
      <div className="absolute inset-0 bg-grid opacity-5 mask-radial" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <svg width="28" height="20" viewBox="0 0 256 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logo-gradient-footer" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00ff88"/>
                      <stop offset="50%" stopColor="#00ffff"/>
                      <stop offset="100%" stopColor="#ff00ff"/>
                    </linearGradient>
                  </defs>
                  <path d="M24 100c40-32 72-48 104-48s64 16 104 48" fill="none" stroke="url(#logo-gradient-footer)" strokeWidth="18" strokeLinecap="round" />
                  <path d="M24 60c40-32 72-48 104-48s64 16 104 48" fill="none" stroke="url(#logo-gradient-footer)" strokeWidth="10" strokeLinecap="round" opacity="0.7"/>
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight uppercase">
                <span className="bg-gradient-to-r from-[#33ffb5] to-[#3dd6f5] bg-clip-text text-transparent">Wave</span>
                <span className="bg-gradient-to-r from-[#6040ff] to-[#ff4081] bg-clip-text text-transparent">Frame</span>
                <span className="text-white/20 ml-1.5 font-bold italic text-xs tracking-widest">Studio</span>
              </span>
            </div>
            <p className="text-lg text-white/40 max-w-sm leading-relaxed font-medium">
              {language === 'es' ? 'Diseño y desarrollo de software innovador de alto valor.' : 'Innovative high-value software design and development.'}
            </p>
            <div className="flex gap-4">
              {["𝕏", "In", "Git"].map((s) => (
                <div key={s} className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:border-primary/40 hover:scale-110 transition-all cursor-pointer">
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6">
              {language === 'es' ? 'Servicios' : 'Services'}
            </div>
            {(language === 'es' 
              ? ["Web Apps", "Mobile Apps", "E-Commerce", "Automatización", "Diseño UX/UI"]
              : ["Web Apps", "Mobile Apps", "E-Commerce", "Automation", "UX/UI Design"]
            ).map((l) => (
              <div key={l} className="text-sm font-medium text-white/30 hover:text-white transition-colors cursor-pointer">{l}</div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6">
              {language === 'es' ? 'Estudio' : 'Studio'}
            </div>
            {(language === 'es'
              ? ["Documentación", "Historial", "Estado de Red", "Código Abierto", "Seguridad"]
              : ["Documentation", "History", "Network Status", "Open Source", "Security"]
            ).map((l) => (
              <div key={l} className="text-sm font-medium text-white/30 hover:text-white transition-colors cursor-pointer">{l}</div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
          <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
            {language === 'es' ? '© 2026 WaveFrame Studio. Todos los derechos reservados.' : '© 2026 WaveFrame Studio. All rights reserved.'}
          </div>
          <div className="flex gap-8">
            {(language === 'es'
              ? ["Protocolo de Privacidad", "Términos de Servicio"]
              : ["Privacy Protocol", "Terms of Service"]
            ).map((l) => (
              <span key={l} className="text-[10px] font-bold tracking-widest text-white/20 hover:text-primary transition-colors cursor-pointer uppercase">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
