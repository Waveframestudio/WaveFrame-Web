import { useState, useEffect, type ReactNode, Component } from "react"

export function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    return !!(window.WebGLRenderingContext && gl)
  } catch (e) {
    return false
  }
}

export function useWebGLSupport(): boolean {
  const [isSupported, setIsSupported] = useState<boolean>(true)

  useEffect(() => {
    setIsSupported(checkWebGLSupport())
  }, [])

  return isSupported
}

interface WebGLErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface WebGLErrorBoundaryState {
  hasError: boolean
}

export class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): WebGLErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL Canvas failed to render, switching to fallback:", error.message)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
