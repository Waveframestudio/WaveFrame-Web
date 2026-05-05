import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

const projectsRow1 = [
  { name: "Rüne Car Rental", image: "/projects/rune.png", link: "#" },
  { name: "SubUrban Store", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop", link: "#" },
  { name: "GamerTech Store", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000&auto=format&fit=crop", link: "#" },
  { name: "Strong Gym", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop", link: "#" },
  { name: "Kiruki Make It Happen", image: "/projects/kiruki.png", link: "https://kiruki-makeit.netlify.app/" },
  { name: "Wave Barber", image: "/projects/wave-barber.png", link: "https://wave-barbershop.netlify.app/" },
]

const projectsRow2 = [
  { name: "Landing Crunchy - Mi Gusto x Flamin' Hot", image: "/projects/landing-crunchy.png", link: "https://migusto.com.ar/crunchy/" },
  { name: "QR Generator", image: "/projects/qr-generator.png", link: "https://www.migusto.com.ar/tools/QR/" },
  { name: "Real Time Translator", image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000&auto=format&fit=crop", link: "#" },
  { name: "Bulk email system", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop", link: "#" },
  { name: "Photo Party App", image: "/projects/photo-party.png", link: "https://mis15bianca-recuerdos.netlify.app/" },
]

export function ProjectsSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative pt-10 pb-32 bg-[#060c14] overflow-hidden border-t border-white/5 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="project-header text-center space-y-6">
          <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
              {language === 'es' ? 'Trabajos' : 'Works'}
            </span>
          </div>
          <h2 className="text-[34px] sm:text-4xl md:text-6xl font-black text-white tracking-tighter whitespace-nowrap">
            {language === 'es' ? 'Proyectos ' : 'Featured '}
            <span className="text-gradient">{language === 'es' ? 'Destacados' : 'Projects'}</span>
          </h2>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 overflow-hidden">
        {/* Fila 1 - Izquierda a Derecha */}
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...projectsRow1, ...projectsRow1].map((project, i) => (
            <ProjectCard key={`r1-${i}`} project={project} />
          ))}
        </div>

        {/* Fila 2 - Derecha a Izquierda */}
        <div className="flex gap-6 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...projectsRow2, ...projectsRow2].map((project, i) => (
            <ProjectCard key={`r2-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: { name: string, image: string, link: string } }) {
  return (
    <a 
      href={project.link}
      className="group relative block w-[300px] md:w-[450px] h-[200px] md:h-[280px] flex-shrink-0 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
    >
      <img 
        src={project.image} 
        alt={project.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060c14] via-[#060c14]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{project.name}</h3>
        <div className="mt-3 h-[2px] w-12 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
      </div>
    </a>
  )
}
