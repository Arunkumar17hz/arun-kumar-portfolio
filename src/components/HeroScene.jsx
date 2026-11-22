import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

/* ------------------------------------------------------------------ */
/* Floating wireframe objects (3D dev toys)                            */
/* ------------------------------------------------------------------ */
function FloatingObjects({ mouse }) {
  const group = useRef()
  const torus = useRef()
  const octa = useRef()
  const box = useRef()
  const knot = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        mouse.current.x * 0.35,
        3,
        delta,
      )
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -mouse.current.y * 0.2,
        3,
        delta,
      )
    }
    if (torus.current) {
      torus.current.rotation.x += delta * 0.35
      torus.current.rotation.y += delta * 0.25
      torus.current.position.y = 1.4 + Math.sin(t * 0.7) * 0.25
    }
    if (octa.current) {
      octa.current.rotation.y += delta * 0.45
      octa.current.position.y = -0.4 + Math.cos(t * 0.55 + 1) * 0.3
    }
    if (box.current) {
      box.current.rotation.x += delta * 0.3
      box.current.rotation.z += delta * 0.2
      box.current.position.y = 0.6 + Math.sin(t * 0.6 + 2) * 0.22
    }
    if (knot.current) {
      knot.current.rotation.y -= delta * 0.3
      knot.current.position.y = -1.3 + Math.sin(t * 0.8 + 0.5) * 0.28
    }
  })

  const red = '#e50914'
  const dimRed = '#7a050b'

  return (
    <group ref={group}>
      {/* glowing torus */}
      <mesh ref={torus} position={[3.1, 1.4, -2]}>
        <torusGeometry args={[0.62, 0.16, 24, 72]} />
        <meshStandardMaterial
          color={red}
          emissive={red}
          emissiveIntensity={0.85}
          metalness={0.7}
          roughness={0.25}
          wireframe={false}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* wireframe octahedron */}
      <mesh ref={octa} position={[-4.5, -1.4, -2.8]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#ff6b73" wireframe transparent opacity={0.55} />
      </mesh>

      {/* glassy cube */}
      <mesh ref={box} position={[-3.6, 2.4, -3.2]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color="#14141c"
          emissive={dimRed}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* wireframe knot */}
      <mesh ref={knot} position={[3.5, -1.3, -3.2]}>
        <torusKnotGeometry args={[0.5, 0.14, 90, 12]} />
        <meshBasicMaterial color="#ff3b45" wireframe transparent opacity={0.4} />
      </mesh>

      {/* soft ambient orbs */}
      <mesh position={[0, 0, -6]}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#2a0508" transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Code-particle field                                                 */
/* ------------------------------------------------------------------ */
function ParticleField({ mouse }) {
  const points = useRef()
  const COUNT = 900

  const positions = useRef(null)
  if (!positions.current) {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3
    }
    positions.current = arr
  }

  useFrame((state, delta) => {
    if (!points.current) return
    const t = state.clock.elapsedTime
    points.current.rotation.y += delta * 0.02
    points.current.position.x = THREE.MathUtils.damp(
      points.current.position.x,
      mouse.current.x * 0.6,
      2,
      delta,
    )
    points.current.position.y = THREE.MathUtils.damp(
      points.current.position.y,
      -mouse.current.y * 0.4 + Math.sin(t * 0.2) * 0.15,
      2,
      delta,
    )
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ff5a63"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/* Mouse-driven camera drift                                           */
/* ------------------------------------------------------------------ */
function CameraRig({ mouse }) {
  const { camera } = useThree()
  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, mouse.current.x * 0.55, 2.5, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -mouse.current.y * 0.35, 2.5, delta)
    camera.lookAt(0, 0, -2)
  })
  return null
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */
function Scene({ mouse }) {
  return (
    <>
      <color attach="background" args={['#07070a']} />
      <fog attach="fog" args={['#07070a', 7, 17]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 4, 3]} intensity={45} color="#e50914" />
      <pointLight position={[-6, -2, 2]} intensity={18} color="#3b6fff" />
      <directionalLight position={[0, 6, 5]} intensity={0.5} color="#ffffff" />
      <ParticleField mouse={mouse} />
      <FloatingObjects mouse={mouse} />
      <CameraRig mouse={mouse} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Exported canvas wrapper                                             */
/* ------------------------------------------------------------------ */
export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <Scene mouse={mouse} />
      </Canvas>
      {/* cinematic vignette over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_35%,rgba(7,7,10,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-midnight to-transparent" />
    </div>
  )
}
