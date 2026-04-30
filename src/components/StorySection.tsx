import { useEffect, useRef, useState, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Environment, Sphere } from "@react-three/drei"
import * as THREE from "three"
import { useLanguage } from "@/lib/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

const chaptersES = [
  {
    num: "01", tag: "Fundación", color: "#6040ff",
    title: "Ingeniería de Backend Crítica",
    body: "Forjamos el núcleo de tu producto con sistemas distribuidos de ultra-baja latencia, diseñados para soportar el tráfico global más exigente sin pestañear.",
  },
  {
    num: "02", tag: "Visual", color: "#3dd6f5",
    title: "Ecosistemas de Frontend Reactivo",
    body: "No solo creamos webs; construimos experiencias interactivas que responden al pensamiento humano, optimizadas para el máximo rendimiento visual.",
  },
  {
    num: "03", tag: "Estrategia", color: "#82ff8d",
    title: "Diseño UX de Alta Conversión",
    body: "Cada píxel tiene un propósito. Diseñamos flujos intuitivos que eliminan la fricción y convierten visitantes en embajadores de tu marca.",
  },
  {
    num: "04", tag: "Maestría", color: "#ff4081",
    title: "Innovación en 3D & Realidad Mixta",
    body: "Superamos los límites de la pantalla tradicional con integración de WebGL y experiencias AR que posicionan tu marca en el futuro absoluto.",
  },
]

const chaptersEN = [
  {
    num: "01", tag: "Foundation", color: "#6040ff",
    title: "Critical Backend Engineering",
    body: "We forge the core of your product with ultra-low latency distributed systems, designed to handle the most demanding global traffic without blinking.",
  },
  {
    num: "02", tag: "Visual", color: "#3dd6f5",
    title: "Reactive Frontend Ecosystems",
    body: "We don't just create websites; we build interactive experiences that respond to human thought, optimized for maximum visual performance.",
  },
  {
    num: "03", tag: "Strategy", color: "#82ff8d",
    title: "High-Conversion UX Design",
    body: "Every pixel has a purpose. We design intuitive flows that eliminate friction and turn visitors into brand ambassadors.",
  },
  {
    num: "04", tag: "Mastery", color: "#ff4081",
    title: "Innovation in 3D & Mixed Reality",
    body: "We push the boundaries of the traditional screen with WebGL integration and AR experiences that position your brand in the absolute future.",
  },
]

function Story3D({ activeIndex }: { activeIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const lightRef = useRef<any>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.2
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1

    const targetColor = new THREE.Color(chaptersES[activeIndex].color)
    if (materialRef.current) {
      materialRef.current.color.lerp(targetColor, 0.05)
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, 0.4 + activeIndex * 0.1, 0.05)
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, 2 + activeIndex, 0.05)
    }
    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor, 0.05)
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[2, 32, 32]} ref={meshRef}>
          <MeshDistortMaterial
            ref={materialRef}
            color={chaptersES[0].color}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>
      <pointLight ref={lightRef} position={[5, 5, 5]} intensity={5} color={chaptersES[0].color} />
      <Environment preset="night" />
    </group>
  )
}

export function StorySection() {
  const { language } = useLanguage()
  const chapters = language === 'es' ? chaptersES : chaptersEN
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState(0)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      // Pinning the left panel on desktop
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
        scrub: true,
      })

      // Chapter triggers with more precise detection
      chapters.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.chapter-trigger-${i}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveChapter(i),
          onEnterBack: () => setActiveChapter(i),
        })
      })
    })

    // Mobile behavior: simple triggers without pinning
    mm.add("(max-width: 1023px)", () => {
      chapters.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.chapter-trigger-${i}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveChapter(i),
          onEnterBack: () => setActiveChapter(i),
        })
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} id="story" className="relative bg-[#060c14] z-10 scroll-mt-32">
      {/* Fixed 3D Scene */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: false }}
        >
          <Story3D activeIndex={activeChapter} />
        </Canvas>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-10 xl:gap-20">
        {/* Left Content (Pinned on Desktop) */}
        <div ref={leftRef} className="w-full lg:flex-1 h-auto lg:h-screen flex items-center z-20 pointer-events-none lg:pointer-events-auto py-20 lg:py-0">
          <div className="story-card w-full glass-card p-10 md:p-14 rounded-[3rem] border border-white/5 space-y-8 backdrop-blur-3xl shadow-2xl pointer-events-auto transition-all duration-700">
            <div className="flex items-center justify-between">
              <span className="text-8xl font-black text-white/10 leading-none">{chapters[activeChapter].num}</span>
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <div 
                  className="w-10 h-10 rounded-full animate-pulse transition-all duration-500" 
                  style={{ 
                    backgroundColor: chapters[activeChapter].color,
                    boxShadow: `0 0 30px ${chapters[activeChapter].color}`
                  }} 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-500" 
                style={{ color: chapters[activeChapter].color }}
              >
                WaveFrame Studio // {chapters[activeChapter].tag}
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                {chapters[activeChapter].title}
              </h3>
              <p className="text-white/40 text-xl leading-relaxed font-medium">
                {chapters[activeChapter].body}
              </p>
            </div>

            <div className="flex gap-3">
              {chapters.map((_, i) => (
                <div 
                  key={i} 
                  className="h-1.5 rounded-full transition-all duration-700" 
                  style={{ 
                    width: i === activeChapter ? "60px" : "15px",
                    backgroundColor: i === activeChapter ? chapters[activeChapter].color : "rgba(255,255,255,0.1)"
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Scroll Area */}
        <div className="w-full lg:flex-1 z-10">
          {chapters.map((ch, i) => (
            <div key={i} className={`chapter-trigger-${i} min-h-[100vh] flex flex-col justify-center`}>
              {/* Mobile Card - Only visible on small screens */}
              <div className="lg:hidden glass-card p-8 rounded-3xl border border-white/5 space-y-6 mt-10">
                <span className="text-4xl font-black text-white/20">{ch.num}</span>
                <h4 className="text-2xl font-bold text-white">{ch.title}</h4>
                <p className="text-white/60">{ch.body}</p>
              </div>
              
              {/* Desktop Progress Line */}
              <div className="hidden lg:block w-full h-px bg-white/5 relative">
                  <div className={`flex items-center gap-6 transition-all duration-700 ${i === activeChapter ? "translate-x-4" : "translate-x-0"}`}>
                    <div 
                      className={`w-4 h-4 rounded-full transition-all duration-700 ${i === activeChapter ? "scale-150 rotate-45" : "scale-100"}`} 
                      style={{ 
                        backgroundColor: i === activeChapter ? ch.color : "rgba(255,255,255,0.05)",
                        boxShadow: i === activeChapter ? `0 0 20px ${ch.color}` : "none",
                        borderRadius: i === activeChapter ? "4px" : "50%"
                      }} 
                    />
                    
                    <div className="flex flex-col">
                      <span className={`text-[11px] font-bold tracking-[0.4em] uppercase transition-all duration-500 ${i === activeChapter ? "text-white" : "text-white/5"}`}>
                        Phase {ch.num}
                      </span>
                      
                      {/* Telemetry Graphic */}
                      <div className={`flex items-center gap-3 mt-2 transition-all duration-700 ${i === activeChapter ? "opacity-100" : "opacity-0"}`}>
                        <div className="flex gap-0.5 items-end h-3">
                          {[1, 2, 3, 4, 5, 6].map(bar => (
                            <div 
                              key={bar}
                              className="w-[2px] bg-white/20"
                              style={{ 
                                height: `${20 + Math.random() * 80}%`,
                                backgroundColor: ch.color,
                                animation: i === activeChapter ? `pulse-height 1s infinite ${bar * 0.1}s` : 'none'
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex flex-col text-[7px] font-mono leading-none tracking-widest text-white/40">
                          <span>DAT_FLOW // {i === activeChapter ? "SYNCING" : "IDLE"}</span>
                          <span className="mt-0.5 opacity-50">STRE_AM.0{i+1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
