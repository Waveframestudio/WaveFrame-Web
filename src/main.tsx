import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"

import "./index.css"
import App from "./App.tsx"
import { LanguageProvider } from "./lib/LanguageContext"

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
