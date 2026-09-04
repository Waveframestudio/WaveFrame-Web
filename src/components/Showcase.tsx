import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

function ShowcaseCube() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.25
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.15
  })
  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[i * Math.PI / 3, i * Math.PI / 4, 0]} scale={1.4 - i * 0.25}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={i === 0 ? "#3dd6f5" : i === 1 ? "#6040ff" : "#00e8d0"}
            emissive={i === 0 ? "#0a9db8" : i === 1 ? "#3020aa" : "#009970"}
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.05}
            wireframe={i > 0}
            transparent
            opacity={i === 0 ? 0.7 : 0.4}
          />
        </mesh>
      ))}
      {[
        [0.8, 0.8, 0.8], [-0.8, 0.8, 0.8], [0.8, -0.8, 0.8], [-0.8, -0.8, 0.8],
        [0.8, 0.8, -0.8], [-0.8, 0.8, -0.8], [0.8, -0.8, -0.8], [-0.8, -0.8, -0.8],
      ].map((pos, i) => (
        <mesh key={`s${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#3dd6f5" />
        </mesh>
      ))}
    </group>
  )
}

export function Showcase() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 75%" },
      })
      gsap.fromTo(visualRef.current, { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: visualRef.current, start: "top 75%" },
      })
      gsap.fromTo(".showcase-stat", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".showcase-stats", start: "top 80%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const webgl = typeof window !== "undefined" && (() => {
    const c = document.createElement("canvas")
    return c.getContext("webgl") || c.getContext("experimental-webgl")
  })()

  return (
    <section ref={sectionRef} id="showcase" className="relative pt-10 pb-32 overflow-hidden scroll-mt-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-card/40 to-card/20" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-chart-2/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div ref={textRef} className="space-y-8 opacity-0">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 border border-border/40">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              {language === 'es' ? 'Sistemas & Automatización' : 'Systems & Automation'}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
            <span className="text-foreground block">{language === 'es' ? 'Sistemas de Alta Eficiencia' : 'High-Efficiency Systems'}</span>
            <span className="text-gradient block">{language === 'es' ? 'Personales e Industriales.' : 'Personal & Industrial.'}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {language === 'es' 
              ? 'Diseñamos e implementamos arquitecturas de software avanzadas enfocadas en optimizar operaciones, eliminar cuellos de botella y multiplicar la productividad tanto en PyMEs como en grandes empresas.' 
              : 'We design and implement advanced software architectures focused on optimizing operations, eliminating bottlenecks, and multiplying productivity across SMEs and enterprise companies.'}
          </p>
          <div className="space-y-4">
            {[
              { 
                title: language === 'es' ? "Automatización de Procesos Críticos" : "Critical Process Automation", 
                desc: language === 'es' ? "Flujos de trabajo inteligentes que reducen tiempos operativos y eliminan errores humanos." : "Intelligent workflows that reduce operational time and eliminate human errors." 
              },
              { 
                title: language === 'es' ? "Sistemas Industriales & ERP/CRM A Medida" : "Industrial Systems & Custom ERP/CRM", 
                desc: language === 'es' ? "Plataformas robustas conectadas en tiempo real para control total de planta y negocio." : "Robust real-time connected platforms for total plant and business control." 
              },
              { 
                title: language === 'es' ? "Eficiencia Personal & Empresarial" : "Personal & Enterprise Efficiency", 
                desc: language === 'es' ? "Herramientas hechas a la medida exacta de las necesidades de tu equipo para escalar." : "Tools custom-built to match your team's exact needs to scale effortlessly." 
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-300 group">
                <div className="w-5 h-5 rounded-full border border-primary/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-0.5">{item.title}</div>
                  <div className="text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={visualRef} className="opacity-0 space-y-8">
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl animate-pulse-glow" />
            <div className="relative w-full h-full min-h-[360px] rounded-3xl overflow-hidden glass-card flex items-center justify-center">
              {webgl ? (
                <Canvas 
                  camera={{ position: [0, 0, 4], fov: 50 }} 
                  gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} 
                  dpr={[1, 1.5]}
                  className="w-full h-full absolute inset-0"
                >
                  <ambientLight intensity={0.3} />
                  <pointLight position={[3, 3, 3]} color="#3dd6f5" intensity={3} />
                  <pointLight position={[-3, -3, 2]} color="#6040ff" intensity={2} />
                  <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
                    <ShowcaseCube />
                  </Float>
                  <Environment preset="night" />
                </Canvas>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-36 h-36" style={{ perspective: "600px" }}>
                    <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", animation: "float 7s ease-in-out infinite, spin 12s linear infinite" }}>
                      {[
                        { transform: "translateZ(72px)", bg: "oklch(0.74 0.18 195 / 0.3)" },
                        { transform: "translateZ(-72px) rotateY(180deg)", bg: "oklch(0.74 0.18 195 / 0.2)" },
                        { transform: "rotateY(90deg) translateZ(72px)", bg: "oklch(0.65 0.2 260 / 0.3)" },
                        { transform: "rotateY(-90deg) translateZ(72px)", bg: "oklch(0.65 0.2 260 / 0.2)" },
                        { transform: "rotateX(90deg) translateZ(72px)", bg: "oklch(0.7 0.18 195 / 0.25)" },
                        { transform: "rotateX(-90deg) translateZ(72px)", bg: "oklch(0.7 0.18 195 / 0.15)" },
                      ].map((face, i) => (
                        <div key={i} className="absolute inset-0 border border-primary/40" style={{ transform: face.transform, background: face.bg }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 text-xs font-mono text-primary/60">
                  <div>WAVEFRAME_CORE v3.2.1</div>
                  <div className="mt-0.5 text-primary/40">{language === 'es' ? 'ESTADO: EN LÍNEA' : 'STATUS: ONLINE'}</div>
                </div>
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse-glow" style={{ animationDelay: `${i * 0.4}s` }} />
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />
              </div>
            </div>
          </div>

          <div className="showcase-stats grid grid-cols-3 gap-4">
            {[
              { value: "+300%", label: language === 'es' ? "Eficiencia operativa" : "Operational Efficiency" },
              { value: "100%", label: language === 'es' ? "Adaptado a tu negocio" : "Tailored to Your Business" },
              { value: "99.99%", label: language === 'es' ? "Disponibilidad continua" : "Continuous Availability" },
            ].map((stat, i) => (
              <div key={i} className="showcase-stat opacity-0 glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-gradient-static">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
