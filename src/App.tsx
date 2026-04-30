import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Showcase } from "@/components/Showcase"
import { StorySection } from "@/components/StorySection"
import { AboutSection } from "@/components/AboutSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [])

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

export function App() {
  return (
    <div className="relative min-h-screen bg-background">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <StorySection />
        <AboutSection />
        <ProjectsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
