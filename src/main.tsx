import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"

import "./index.css"
import App from "./App.tsx"
import { LanguageProvider } from "./lib/LanguageContext"

// Silence persistent library-level warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && (
    args[0].includes('THREE.Clock') || 
    args[0].includes('X4122') || 
    args[0].includes('GSAP target') || 
    args[0].includes('escape its sandboxing')
  )) return;
  originalWarn(...args);
};

function Root() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
