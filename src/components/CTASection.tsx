import { useEffect, useRef, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { useLanguage } from "@/lib/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"

gsap.registerPlugin(ScrollTrigger)

function Starfield() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial transparent color="#3dd6f5" size={0.05} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

export function CTASection() {
  const { language } = useLanguage()
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-item",
        { opacity: 0, y: 50, rotateX: -30 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.2, ease: "power4.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="relative pt-2 pb-32 overflow-hidden bg-[#060c14] scroll-mt-32">
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 5] }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: true }}
        >
          <Starfield />
          <Float speed={4} rotationIntensity={2} floatIntensity={2}>
            <Sphere args={[isMobile ? 1 : 1.5, 32, 32]} position={[0, 0, -2]}>
              <MeshDistortMaterial color="#3dd6f5" speed={2} distort={0.6} roughness={0} metalness={1} transparent opacity={0.2} />
            </Sphere>
          </Float>
          <Environment preset="night" />
        </Canvas>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="cta-item opacity-0 inline-flex items-center gap-3 glass rounded-full px-5 py-2 border border-primary/20 mb-10">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-xs font-black tracking-[0.3em] uppercase text-primary">
            {language === 'es' ? 'Contacto' : 'Contact'}
          </span>
        </div>

        <h2 className="cta-item opacity-0 text-5xl md:text-9xl font-black tracking-tighter mb-8 md:mb-10 leading-[1] md:leading-[0.85] text-white">
          {language === 'es' ? 'Tu proyecto' : 'Your project'} <br />
          <span className="text-gradient">{language === 'es' ? 'empieza aquí.' : 'starts here.'}</span>
        </h2>

        <p className="cta-item opacity-0 text-white/50 text-lg md:text-2xl leading-relaxed mb-10 md:mb-14 max-w-3xl mx-auto font-medium px-4">
          {language === 'es'
            ? '¿Listo para dominar tu industria con tecnología de vanguardia? Agenda una sesión estratégica de 30 minutos y hagamos realidad tu próxima gran innovación.'
            : 'Ready to dominate your industry with cutting-edge technology? Schedule a 30-minute strategic session and let\'s make your next great innovation a reality.'}
        </p>

        <div className="cta-item opacity-0 flex flex-row gap-3 md:gap-6 justify-center mb-16 md:mb-20">
          <a href="https://wa.me/5493876117799" target="_blank" rel="noopener noreferrer" className="cyber-button px-4 py-3 md:px-12 md:py-5 text-[10px] md:text-base flex items-center justify-center flex-1 whitespace-nowrap">
            {language === 'es' ? 'Hablar por WhatsApp' : 'Chat on WhatsApp'}
          </a>
          <a href="mailto:wave1frame@gmail.com" className="px-4 py-3 md:px-12 md:py-5 text-[10px] md:text-base rounded-xl font-black glass glass-hover text-white border border-white/10 transition-all hover:scale-105 flex items-center justify-center flex-1 whitespace-nowrap">
            {language === 'es' ? 'Enviar Email' : 'Send Email'}
          </a>
        </div>

        <div className="cta-item opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {(language === 'es' ? [
            { label: "Tiempo Online", val: "100%" },
            { label: "Protección", val: "Total" },
            { label: "Regiones", val: "Global" },
            { label: "Soporte", val: "24/7/365" },
          ] : [
            { label: "Uptime", val: "100%" },
            { label: "Protection", val: "Full" },
            { label: "Regions", val: "Global" },
            { label: "Support", val: "24/7/365" },
          ]).map((item) => (
            <div key={item.label} className="glass p-4 md:p-6 rounded-2xl border border-white/5">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">{item.val}</div>
              <div className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
