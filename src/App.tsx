import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Showcase } from "@/components/Showcase"
import { AboutSection } from "@/components/AboutSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"
import { PrivacyPage } from "@/components/PrivacyPage"
import { TermsPage } from "@/components/TermsPage"
import { FAQPage } from "@/components/FAQPage"
import { ProjectsLanding } from "@/components/ProjectsLanding"

import { useIsMobile } from "@/hooks/useIsMobile"

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return
      gsap.to(glowRef.current, {
        x: e.clientX - 200,
        y: e.clientY - 200,
        duration: 0.6,
        ease: "power2.out",
      })
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-0 w-[400px] h-[400px] rounded-full"
      style={{
        background: "radial-gradient(circle, oklch(0.74 0.18 195 / 0.04) 0%, transparent 70%)",
        transform: "translate(-9999px, -9999px)",
      }}
    />
  )
}

function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Showcase />
      <AboutSection />
      <ProjectsSection />
      <CTASection />
    </main>
  )
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { HeroScene } from "@/components/HeroScene"

export function App() {
  const isMobile = useIsMobile()
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-background">
        {isMobile && (
          <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <HeroScene />
          </div>
        )}
        <ScrollToTop />
        <CursorGlow />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/projects" element={<ProjectsLanding />} />
          <Route path="/projects/:category" element={<ProjectsLanding />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
