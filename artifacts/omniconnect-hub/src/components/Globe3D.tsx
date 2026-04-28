import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import * as THREE from "three";
import { PORTS, latLngToVec3 } from "@/lib/mockData";

const GLOBE_RADIUS = 2.5;

const EARTH_TEXTURE_URL =
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL_URL =
  "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPECULAR_URL =
  "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg";
const CLOUDS_TEXTURE_URL =
  "https://threejs.org/examples/textures/planets/earth_clouds_1024.png";

// Shared geometries — instanced once instead of per-component
const PORT_CORE_GEOM = new THREE.SphereGeometry(0.045, 10, 10);
const PORT_RING_GEOM = new THREE.RingGeometry(0.05, 0.075, 24);
const SHIP_GEOM = new THREE.SphereGeometry(0.05, 8, 8);
const PLANE_GEOM = new THREE.ConeGeometry(0.04, 0.12, 6);
const SAT_BODY_GEOM = new THREE.BoxGeometry(0.1, 0.06, 0.06);
const SAT_PANEL_GEOM = new THREE.BoxGeometry(0.18, 0.005, 0.1);

function PulsingPortMarker({
  position,
  color = "#22d3ee",
}: {
  position: [number, number, number];
  color?: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  const quaternion = useMemo(() => {
    const dir = new THREE.Vector3(...position).normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      dir,
    );
  }, [position]);

  // Ring expansion only — single material change per frame
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = (clock.getElapsedTime() % 2) / 2;
    const scale = 1 + t * 2.5;
    ringRef.current.scale.set(scale, scale, scale);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - t);
  });

  return (
    <group position={position} quaternion={quaternion}>
      <mesh geometry={PORT_CORE_GEOM}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} geometry={PORT_RING_GEOM}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ArcLine({
  start,
  end,
  color,
  vesselType = "ship",
  speed = 0.15,
  offset = 0,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  vesselType?: "ship" | "plane";
  speed?: number;
  offset?: number;
}) {
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midVec = startVec.clone().add(endVec).multiplyScalar(0.5);
    const distance = startVec.distanceTo(endVec);
    const altitudeBoost = vesselType === "plane" ? 0.55 : 0.35;
    midVec.normalize().multiplyScalar(GLOBE_RADIUS + distance * altitudeBoost);
    const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
    return curve.getPoints(40);
  }, [start, end, vesselType]);

  const linePoints = useMemo(
    () => points.map((p) => [p.x, p.y, p.z] as [number, number, number]),
    [points],
  );

  const vesselRef = useRef<THREE.Group>(null);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  // Throttle to ~30fps to halve work for moving vessels
  const lastUpdateRef = useRef(0);

  useFrame(({ clock }) => {
    const now = clock.getElapsedTime();
    if (now - lastUpdateRef.current < 1 / 30) return;
    lastUpdateRef.current = now;

    if (!vesselRef.current) return;
    const t = ((now * speed + offset) % 1 + 1) % 1;
    const idx = Math.min(Math.floor(t * (points.length - 1)), points.length - 2);
    const point = points[idx]!;
    const nextPoint = points[idx + 1]!;
    vesselRef.current.position.copy(point);
    lookTarget.copy(nextPoint);
    vesselRef.current.lookAt(lookTarget);
  });

  return (
    <group>
      <Line
        points={linePoints}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={0.55}
      />
      <group ref={vesselRef}>
        {vesselType === "ship" ? (
          <mesh geometry={SHIP_GEOM}>
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        ) : (
          <mesh geometry={PLANE_GEOM} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function Satellite({ orbit }: { orbit: number }) {
  const ref = useRef<THREE.Group>(null);
  const lastUpdateRef = useRef(0);

  useFrame(({ clock }) => {
    const now = clock.getElapsedTime();
    if (now - lastUpdateRef.current < 1 / 30) return;
    lastUpdateRef.current = now;

    if (!ref.current) return;
    const t = now * (0.2 + orbit * 0.1);
    const radius = GLOBE_RADIUS + 1.4 + orbit * 0.4;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.5) * 0.6 + orbit * 0.3,
      Math.sin(t) * radius,
    );
    ref.current.rotation.y = -t;
  });

  return (
    <group ref={ref}>
      <mesh geometry={SAT_BODY_GEOM}>
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.9}
          roughness={0.2}
          emissive="#22d3ee"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh geometry={SAT_PANEL_GEOM} position={[0.15, 0, 0]}>
        <meshStandardMaterial
          color="#1e293b"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh geometry={SAT_PANEL_GEOM} position={[-0.15, 0, 0]}>
        <meshStandardMaterial
          color="#1e293b"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function EarthMesh() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [EARTH_TEXTURE_URL, EARTH_NORMAL_URL, EARTH_SPECULAR_URL, CLOUDS_TEXTURE_URL],
  );

  useMemo(() => {
    [colorMap, normalMap, specularMap, cloudsMap].forEach((tex) => {
      if (tex) {
        tex.anisotropy = 4;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
      }
    });
  }, [colorMap, normalMap, specularMap, cloudsMap]);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.02;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group>
      {/* Realistic Earth — reduced poly count from 96 to 48 (4x fewer triangles) */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={specularMap}
          metalness={0.15}
          roughness={0.85}
          emissive="#0a1f3d"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Clouds — reduced poly */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[GLOBE_RADIUS + 0.025, 32, 32]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function FallbackEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.02;
  });
  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
      <meshStandardMaterial
        color="#0a4b9e"
        roughness={0.6}
        metalness={0.3}
        emissive="#062b5e"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Atmosphere({
  innerColor = "#4fc3f7",
  outerColor = "#22d3ee",
}: {
  innerColor?: string;
  outerColor?: string;
}) {
  return (
    <>
      {/* Two atmosphere layers (down from 3) with lower poly */}
      <mesh scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          color={innerColor}
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={[1.16, 1.16, 1.16]}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          color={outerColor}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function Scene({
  showRoutes,
  routeCount,
  showSatellites,
  themeColor,
  themeSecondary,
}: {
  showRoutes: boolean;
  routeCount: number;
  showSatellites: boolean;
  themeColor?: string;
  themeSecondary?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  const cityPositions = useMemo(
    () => PORTS.map((p) => latLngToVec3(p.lat, p.lng, GLOBE_RADIUS + 0.005)),
    [],
  );

  const routes = useMemo(() => {
    const palette = themeColor
      ? [
          { color: themeColor, type: "ship" as const },
          {
            color: themeSecondary ?? themeColor,
            type: "ship" as const,
          },
          { color: themeColor, type: "plane" as const },
          {
            color: themeSecondary ?? themeColor,
            type: "ship" as const,
          },
          { color: themeColor, type: "plane" as const },
          { color: themeColor, type: "ship" as const },
        ]
      : [
          { color: "#22d3ee", type: "ship" as const },
          { color: "#3b82f6", type: "ship" as const },
          { color: "#f59e0b", type: "plane" as const },
          { color: "#a855f7", type: "ship" as const },
          { color: "#06b6d4", type: "plane" as const },
          { color: "#84cc16", type: "ship" as const },
        ];
    const result: {
      start: [number, number, number];
      end: [number, number, number];
      color: string;
      type: "ship" | "plane";
      speed: number;
      offset: number;
    }[] = [];
    for (let i = 0; i < routeCount; i++) {
      const a = Math.floor(Math.random() * cityPositions.length);
      let b = Math.floor(Math.random() * cityPositions.length);
      while (b === a) b = Math.floor(Math.random() * cityPositions.length);
      const variant = palette[i % palette.length]!;
      result.push({
        start: cityPositions[a]!,
        end: cityPositions[b]!,
        color: variant.color,
        type: variant.type,
        speed: variant.type === "plane" ? 0.22 : 0.1 + Math.random() * 0.08,
        offset: Math.random(),
      });
    }
    return result;
  }, [cityPositions, routeCount]);

  return (
    <group ref={groupRef}>
      <Suspense fallback={<FallbackEarth />}>
        <EarthMesh />
      </Suspense>

      <Atmosphere
        innerColor={themeColor ?? "#4fc3f7"}
        outerColor={themeColor ?? "#22d3ee"}
      />

      {cityPositions.map((pos, i) => (
        <PulsingPortMarker
          key={i}
          position={pos}
          color={
            themeColor
              ? i % 3 === 1
                ? (themeSecondary ?? themeColor)
                : themeColor
              : i % 3 === 1
                ? "#f59e0b"
                : "#22d3ee"
          }
        />
      ))}

      {showRoutes &&
        routes.map((route, idx) => (
          <ArcLine
            key={idx}
            start={route.start}
            end={route.end}
            color={route.color}
            vesselType={route.type}
            speed={route.speed}
            offset={route.offset}
          />
        ))}

      {showSatellites && (
        <>
          <Satellite orbit={0} />
          <Satellite orbit={1} />
        </>
      )}
    </group>
  );
}

interface Globe3DProps {
  showRoutes?: boolean;
  routeCount?: number;
  showSatellites?: boolean;
  enableControls?: boolean;
  className?: string;
  /** When provided, atmosphere + routes + markers use these brand colors */
  themeColor?: string;
  themeSecondary?: string;
}

export function Globe3D({
  showRoutes = true,
  routeCount = 8,
  showSatellites = true,
  enableControls = true,
  className = "absolute inset-0 z-0 w-full h-full",
  themeColor,
  themeSecondary,
}: Globe3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        {/* Single key directional light + soft fill — no per-vessel point lights */}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[5, 3, 5]}
          intensity={1.8}
          color="#ffffff"
        />
        <directionalLight
          position={[-5, -2, -5]}
          intensity={0.25}
          color="#4f80ff"
        />

        <Stars
          radius={120}
          depth={50}
          count={2500}
          factor={4}
          saturation={0}
          fade
          speed={0.4}
        />

        <Scene
          showRoutes={showRoutes}
          routeCount={routeCount}
          showSatellites={showSatellites}
          themeColor={themeColor}
          themeSecondary={themeSecondary}
        />

        {enableControls && (
          <OrbitControls
            enablePan={false}
            minDistance={4.5}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.25}
            enableDamping
            dampingFactor={0.08}
          />
        )}
      </Canvas>
    </div>
  );
}
