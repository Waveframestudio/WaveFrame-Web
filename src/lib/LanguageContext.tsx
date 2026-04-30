import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    "nav.services": "Servicios",
    "nav.about": "Nosotros",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.start": "Empezar",
    "hero.badge": "Empresa de Desarrollo de Software",
    "hero.desc": "Fusionamos diseño de vanguardia con ingeniería de alto impacto para convertir visiones ambiciosas en realidades digitales imbatibles.",
    "hero.cta.connect": "Conectemos",
    "hero.cta.how": "Cómo trabajamos // 01",
    "hero.side": "Interfaz de Sistema Avanzada // WaveFrame",
    "hero.scroll": "Desliza para Explorar",
  },
  en: {
    "nav.services": "Services",
    "nav.about": "About Us",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.start": "Start",
    "hero.badge": "Software Development Company",
    "hero.desc": "We fuse avant-garde design with high-impact engineering to turn ambitious visions into unbeatable digital realities.",
    "hero.cta.connect": "Let's Connect",
    "hero.cta.how": "How we work // 01",
    "hero.side": "Advanced System Interface // WaveFrame",
    "hero.scroll": "Scroll to Explore",
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["es"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
