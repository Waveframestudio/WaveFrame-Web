import { useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { gsap } from "gsap"
import { useLanguage } from "@/lib/LanguageContext"
import { ArrowLeft, ExternalLink } from "lucide-react"

interface ProjectItem {
  id: string
  name: string
  image: string
  video?: string
  link: string
  isLocalRewrite?: boolean
  tags: string[]
  descEs: string
  descEn: string
}

const PROJECTS_DATA: Record<"webs" | "apps" | "games", ProjectItem[]> = {
  webs: [
    {
      id: "rune",
      name: "Rüne Car Rental",
      image: "/projects/rune.png",
      link: "#",
      tags: ["React", "TailwindCSS", "Framer Motion", "Stripe"],
      descEs: "Alquiler de vehículos de alta gama con pasarela de reservas y pagos inteligente.",
      descEn: "Premium car rental platform with smart booking and payment gateway integrations."
    },
    {
      id: "suburban",
      name: "SubUrban Store",
      image: "/projects/SubUrban.png",
      link: "#",
      tags: ["Next.js", "TailwindCSS", "Node.js", "MongoDB"],
      descEs: "Tienda e-commerce urbana de moda con filtros avanzados en tiempo real.",
      descEn: "Urban fashion e-commerce store featuring advanced real-time filtering."
    },
    {
      id: "gamertech",
      name: "GamerTech Store",
      image: "/projects/gamertech.jpeg",
      link: "#",
      tags: ["React", "GSAP", "Vite", "Supabase"],
      descEs: "E-commerce para hardware gamer con cotizador y armador de PCs custom.",
      descEn: "E-commerce site for gaming hardware featuring a custom PC builder."
    },
    {
      id: "stronggym",
      name: "Strong Gym",
      image: "/projects/StrongGym.jpeg",
      link: "#",
      tags: ["React", "TailwindCSS", "Firebase"],
      descEs: "Sitio institucional y panel de reservas integrados para gimnasio de alto rendimiento.",
      descEn: "Institutional website and integrated booking panel for a high-performance gym."
    },
    {
      id: "kiruki",
      name: "Kiruki Make It Happen",
      image: "/projects/kiruki.png",
      link: "https://kiruki-makeit.netlify.app/",
      tags: ["React", "GSAP", "Smooth Scroll", "Creative UI"],
      descEs: "Landing page interactiva para productora audiovisual y estudio creativo.",
      descEn: "Interactive landing page for an audiovisual production house and creative studio."
    },
    {
      id: "wave-barber",
      name: "Wave Barber Shop",
      image: "/projects/wave-barber.png",
      link: "https://wave-barbershop.netlify.app/",
      tags: ["React", "TailwindCSS", "Firebase Auth", "Firestore"],
      descEs: "Sistema premium de turnos online y catálogo para barberías de alta gama.",
      descEn: "Premium online appointment system and catalog for high-end barbershops."
    },
    {
      id: "landing-crunchy",
      name: "Landing Crunchy - Mi Gusto x Flamin' Hot",
      image: "/projects/landing-crunchy.png",
      link: "https://migusto.com.ar/crunchy/",
      tags: ["HTML", "Vanilla JS", "CSS Animations"],
      descEs: "Campaña publicitaria interactiva para el lanzamiento de empanadas Crunchy.",
      descEn: "Interactive advertising campaign for the launch of Crunchy empanadas."
    }
  ],
  apps: [
    {
      id: "qr-generator",
      name: "QR Generator Studio",
      image: "/projects/qr-generator.png",
      link: "https://www.migusto.com.ar/tools/QR/",
      tags: ["React", "Vite", "TailwindCSS", "Canvas API"],
      descEs: "Generador avanzado de códigos QR dinámicos con branding y panel de analíticas.",
      descEn: "Advanced dynamic QR code generator with branding options and an analytics dashboard."
    },
    {
      id: "translate",
      name: "Realtime Translate AI",
      image: "/projects/translate.png",
      link: "#",
      tags: ["Next.js", "TailwindCSS", "WebRTC", "OpenAI API"],
      descEs: "Traducción de voz y texto en tiempo real usando modelos de inteligencia artificial.",
      descEn: "Real-time voice and text translation powered by artificial intelligence models."
    },
    {
      id: "massive-emailsystem",
      name: "Massive Email Sender",
      image: "/projects/massive-emailsystem.png",
      link: "#",
      tags: ["React", "TailwindCSS", "Node.js", "Nodemailer", "Redis"],
      descEs: "Herramienta de envío masivo de correos corporativos con métricas y tasa de apertura.",
      descEn: "Corporate mass email campaign dispatcher featuring open-rate tracking metrics."
    },
    {
      id: "photo-party",
      name: "Photo Party App",
      image: "/projects/photo-party.png",
      link: "https://mis15bianca-recuerdos.netlify.app/",
      tags: ["React", "TailwindCSS", "Firebase Storage", "Realtime Database"],
      descEs: "Web App para compartir y proyectar fotos en eventos sociales mediante código QR.",
      descEn: "Web App to share and project live photos during social events via QR codes."
    },
    {
      id: "aura-social",
      name: "AURA Social App",
      image: "/projects/aura-social.png",
      link: "#",
      tags: ["React Native", "TailwindCSS", "GraphQL", "PostgreSQL"],
      descEs: "Aplicación móvil social de alta fidelidad con chat en tiempo real y feed interactivo.",
      descEn: "High-fidelity social mobile application with real-time chat and interactive feed."
    },
    {
      id: "password-gen",
      name: "Password Generator Studio",
      image: "/projects/password-gen.png",
      link: "#",
      tags: ["React", "Vite", "TailwindCSS", "Web Crypto API"],
      descEs: "Generador de contraseñas seguras y auditor de fortaleza criptográfica en tiempo real.",
      descEn: "Secure password generator and real-time cryptographic strength auditor."
    }
  ],
  games: [
    {
      id: "cyber-pong",
      name: "Cyber Pong",
      image: "/projects/cyber-pong.png",
      video: "/Demos/Games/Cyberpong.webm",
      link: "https://wave-cyberpong.netlify.app/",
      isLocalRewrite: true,
      tags: ["React", "Vite", "Canvas API", "Web Audio API", "GSAP"],
      descEs: "Videojuego retro-futurista de Pong con estéticas cyberpunk, power-ups y sonido sintetizado.",
      descEn: "Retro-futuristic Pong arcade game featuring cyberpunk aesthetics, powerups, and synth sound effects."
    },
    {
      id: "wave-kart",
      name: "Wave-Kart",
      image: "/projects/wave-kart.png",
      video: "/Demos/Games/wavekart.webm",
      link: "https://wavekart-game.netlify.app/",
      isLocalRewrite: true,
      tags: ["React", "Vite", "Three.js", "Canvas API"],
      descEs: "Juego de carreras de karts arcade con power-ups, disparos, minas, logo 3D y controles táctiles.",
      descEn: "Arcade kart racing game featuring powerups, projectiles, mines, 3D logo, and touch controls."
    },
    {
      id: "wave-racing",
      name: "Wave Racing",
      image: "/projects/wave-kart.png",
      video: "/Demos/Games/Wave Racing Gameplay.webm",
      link: "https://waveracing-game.netlify.app/",
      isLocalRewrite: true,
      tags: ["Three.js", "React Three Fiber", "WebGL", "Speed Run"],
      descEs: "Juego de carreras arcade de alta velocidad con físicas y curvas de alta dificultad.",
      descEn: "High-speed arcade racing game with specialized physics and difficult corners."
    },
    {
      id: "wavetris",
      name: "WaveTris",
      image: "/projects/wavetris.png",
      video: "/Demos/Games/WaveTris.webm",
      link: "https://wavetris.netlify.app/",
      isLocalRewrite: true,
      tags: ["React", "Vite", "Canvas API", "Web Audio API"],
      descEs: "Adaptación estilizada del clásico Tetris con animaciones modernas, sonido retro y controles táctiles.",
      descEn: "Stylized adaptation of classic Tetris featuring modern animations, retro sound, and touch controls."
    },
    {
      id: "framesteroids",
      name: "Framesteroids",
      image: "/projects/asteroids.png",
      video: "/Demos/Games/Framestoroids.webm",
      link: "https://framesteroids.netlify.app/",
      isLocalRewrite: true,
      tags: ["HTML5 Canvas", "Vector Math", "Physics Engine"],
      descEs: "Remake del clásico arcade espacial con controles vectoriales fluidos y sistema de puntuación.",
      descEn: "Space arcade classic remake with fluid vector controls and scoring systems."
    },
    {
      id: "buscaminas",
      name: "Buscaminas Retro",
      image: "/projects/buscaminas.png",
      video: "/Demos/Games/Buscaminas.mp4",
      link: "https://wf-minesweeper.netlify.app/",
      isLocalRewrite: true,
      tags: ["React", "Vite", "Three.js", "CSS Variables"],
      descEs: "El clásico juego de lógica buscaminas con estética neón, selector de dificultad y logo 3D.",
      descEn: "The classic minesweeper logic game featuring neon aesthetics, difficulty selector, and 3D logo."
    }
  ]
}

function ProjectCard({ project, category, language }: { project: ProjectItem; category: string; language: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && project.video) {
      videoRef.current.currentTime = 0.5
    }
  }, [project.video])

  useEffect(() => {
    const cardEl = cardRef.current
    const videoEl = videoRef.current
    if (!cardEl || !videoEl || !project.video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window
          if (isMobileDevice) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              videoEl.play().catch(() => {})
            } else {
              videoEl.pause()
              videoEl.currentTime = 0.5
            }
          }
        })
      },
      { threshold: [0, 0.4, 0.8] }
    )

    observer.observe(cardEl)
    return () => observer.disconnect()
  }, [project.video])

  const handleMouseEnter = () => {
    if (window.innerWidth > 768 && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (window.innerWidth > 768 && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0.5
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between rounded-2xl bg-white/5 border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      {/* Media Frame (Video Frame Poster + Hover Video) */}
      <div className="relative h-48 overflow-hidden bg-zinc-950">
        {project.video ? (
          <video
            ref={videoRef}
            src={`${project.video}#t=0.5`}
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60"
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#03070c] via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase font-bold text-primary tracking-wider pointer-events-none">
          {category}
        </div>
      </div>

      {/* Info del Proyecto */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {language === 'es' ? project.descEs : project.descEn}
          </p>
        </div>

        <div className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400 font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Botón de Acción */}
          {project.isLocalRewrite ? (
            <a
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all"
            >
              {language === 'es' ? 'Jugar Ahora' : 'Play Now'}
            </a>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/15 transition-all border border-white/5"
            >
              {language === 'es' ? 'Ver Proyecto' : 'View Project'}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function ProjectsLanding() {
  const { category } = useParams<{ category?: string }>()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll a arriba en renderizado de ruta
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-fade-in",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [category])

  // Validar si la categoría seleccionada es correcta
  const activeCategory = category ? (category.toLowerCase() as keyof typeof PROJECTS_DATA) : null
  const isValidCategory = activeCategory && PROJECTS_DATA[activeCategory]

  // Si se ingresa una categoría inválida en la URL, redirigir a /projects
  useEffect(() => {
    if (category && !isValidCategory) {
      navigate("/projects", { replace: true })
    }
  }, [category, isValidCategory, navigate])

  const categoriesConfig = [
    { id: "webs", label: "Webs" },
    { id: "apps", label: "Apps" },
    { id: "games", label: language === 'es' ? "Juegos" : "Games" }
  ]

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#03070c] pt-28 pb-20 relative overflow-hidden select-none">
      {/* Fondo Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera Principal */}
        <div className="project-header text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
              {language === 'es' ? 'Portfolio // Proyectos' : 'Portfolio // Projects'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter">
            {language === 'es' ? 'Galería de ' : 'Creative '}
            <span className="text-gradient">{language === 'es' ? 'Desarrollos' : 'Showcase'}</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground">
            {language === 'es' 
              ? "Explora nuestra trayectoria clasificada por categorías. Soluciones digitales robustas y a medida diseñadas para destacar."
              : "Explore our trajectory classified by category. Robust, tailored digital solutions designed to stand out."}
          </p>
        </div>

        {/* NAVEGACIÓN DE PESTAÑAS (Si se está viendo una categoría) */}
        {category && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground hover:text-white glass border border-white/5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {language === 'es' ? 'Volver' : 'Back'}
            </Link>
            {categoriesConfig.map((cat) => {
              const isActive = category === cat.id
              return (
                <Link
                  key={cat.id}
                  to={`/projects/${cat.id}`}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${
                    isActive 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "text-muted-foreground hover:text-white glass border-white/5"
                  }`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        )}

        {/* CONTENIDO 1: LANDING/DASHBOARD PRINCIPAL (Sin categoría en la URL) */}
        {!category && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 animate-fade-in max-w-3xl mx-auto">
            {categoriesConfig.map((cat) => {
              // Estilo de bordes/glow dinámicos por ID
              const glowClass = 
                cat.id === "webs" ? "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]" :
                cat.id === "apps" ? "hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]" :
                "hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"

              return (
                <Link
                  key={cat.id}
                  to={`/projects/${cat.id}`}
                  className={`w-full sm:flex-1 py-8 rounded-2xl glass border border-white/5 text-center text-xl sm:text-2xl font-black tracking-wider text-white hover:text-primary transition-all duration-500 ${glowClass}`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        )}

        {/* CONTENIDO 2: LISTADO DE PROYECTOS DE LA CATEGORÍA SELECCIONADA */}
        {category && isValidCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {PROJECTS_DATA[activeCategory].map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                category={category} 
                language={language} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
export default ProjectsLanding
