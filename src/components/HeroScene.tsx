import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, MeshTransmissionMaterial, Sparkles, PerspectiveCamera, Trail } from "@react-three/drei"
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useIsMobile } from "@/hooks/useIsMobile"

gsap.registerPlugin(ScrollTrigger)

function CrystalCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const isMobile = useIsMobile()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.2
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4
      innerRef.current.rotation.x = t * 0.2
    }
  })

  useEffect(() => {
    // Reverted: Removed ScrollTrigger animations that modified desktop behavior
  }, [isMobile])

  return (
    <group ref={groupRef} scale={isMobile ? 0.7 : 1}>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.8, 1]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={10}
          thickness={1.5}
          samples={4}
          transmission={0.9}
          clearcoat={1}
          clearcoatRoughness={0}
          distortion={0.5}
          chromaticAberration={0.4}
          anisotropy={0.5}
          roughness={0.05}
          toneMapped={false}
          color="#3dd6f5"
          ior={1.7}
        />
      </mesh>
      <mesh ref={innerRef} scale={0.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#88f0ff"
          emissive="#00c8e8"
          emissiveIntensity={4}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  )
}

function MouseFollower() {
  const ref = useRef<THREE.Mesh>(null)
  const { mouse, viewport } = useThree()
  const isMobile = useIsMobile()
  
  useFrame(() => {
    if (!ref.current || isMobile) return
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    ref.current.position.set(x, y, 0)
  })

  if (isMobile) return null

  return (
    <Trail width={1.5} length={8} color={new THREE.Color("#3dd6f5")} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#3dd6f5" />
      </mesh>
    </Trail>
  )
}

function OrbitingRing({ radius, speed, rotX, color, offset = 0 }: { radius: number; speed: number; rotX: number; color: string; offset?: number }) {
  const ref = useRef<THREE.Group>(null)
  const isMobile = useIsMobile()
  const adjustedRadius = isMobile ? radius * 0.7 : radius

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.getElapsedTime() * speed + offset
  })

  return (
    <group ref={ref} rotation={[rotX, 0, 0]}>
      <Trail width={0.8} length={10} color={new THREE.Color(color)} attenuation={(t) => t}>
        <mesh position={[adjustedRadius, 0, 0]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Trail>
      <mesh>
        <torusGeometry args={[adjustedRadius, 0.005, 16, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export function HeroScene() {
  const isMobile = useIsMobile()

  return (
    <Canvas 
      gl={{ 
        antialias: true, 
        alpha: true, 
        stencil: false, 
        depth: true, 
        powerPreference: "high-performance",
        precision: "highp"
      }} 
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
      <color attach="background" args={["#060c14"]} />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} />
      <pointLight position={[-10, -10, -10]} color="#6040ff" intensity={5} />
      
      <MouseFollower />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <CrystalCore />
      </Float>

      <OrbitingRing radius={2.5} speed={0.8} rotX={0.5} color="#3dd6f5" />
      <OrbitingRing radius={3.2} speed={-0.5} rotX={1.5} color="#6040ff" offset={Math.PI} />
      <OrbitingRing radius={4.0} speed={0.3} rotX={0.8} color="#00e8d0" offset={Math.PI / 2} />
      
      <Sparkles count={isMobile ? 15 : 30} scale={15} size={2} speed={0.4} opacity={0.3} color="#3dd6f5" />
      
      <Environment preset="night" />
      
      <EffectComposer enableNormalPass={false} multisampling={isMobile ? 0 : 8}>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.2} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  )
}
