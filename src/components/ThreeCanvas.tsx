import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Sparkles, RefreshCw, Layers, Compass } from 'lucide-react';

export type CanvasMode = 'hologram' | 'neon' | 'gold' | 'cyber';

interface ThreeCanvasProps {
  onCanvasReady?: (threeObjects: {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    coreGroup: THREE.Group;
    outerMesh: THREE.Mesh;
    innerMesh: THREE.Mesh;
    ringMesh1: THREE.Mesh;
    ringMesh2: THREE.Mesh;
    particles: THREE.Points;
  }) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ onCanvasReady }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<CanvasMode>('hologram');
  const [isInteractive, setIsInteractive] = useState<boolean>(true);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const outerMeshRef = useRef<THREE.Mesh | null>(null);
  const innerMeshRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Mouse interaction state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Create Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Core Object Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    coreGroupRef.current = coreGroup;

    // --- Geometries & Materials ---
    // Mode colors
    const colors = getModeColors('hologram');

    // A. Outer Icosahedron (Wireframe / Cyber Geometry)
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: colors.primary,
      wireframe: true,
      emissive: colors.emissive,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);
    outerMeshRef.current = outerMesh;

    // B. Inner Dodecahedron (Solid Core)
    const innerGeo = new THREE.DodecahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: colors.secondary,
      emissive: colors.emissive,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);
    innerMeshRef.current = innerMesh;

    // C. Orbital Torus Ring 1
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: colors.primary,
      emissive: colors.primary,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.7,
    });
    const ringMesh1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    coreGroup.add(ringMesh1);
    ring1Ref.current = ringMesh1;

    // D. Orbital Torus Ring 2
    const ring2Geo = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: colors.accent,
      emissive: colors.accent,
      emissiveIntensity: 0.9,
      wireframe: true,
    });
    const ringMesh2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 3;
    coreGroup.add(ringMesh2);
    ring2Ref.current = ringMesh2;

    // E. Glowing Node Vertices on Outer Mesh
    const nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: colors.accent });
    
    // Extract vertices for sphere nodes
    const posAttribute = outerGeo.attributes.position;
    const vertexMap = new Set<string>();
    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      const z = posAttribute.getZ(i);
      const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
      if (!vertexMap.has(key)) {
        vertexMap.add(key);
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(x, y, z);
        nodesGroup.add(node);
      }
    }
    outerMesh.add(nodesGroup);

    // F. Particle Field around 3D core
    const particleCount = 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = Math.random() * 0.05 + 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: colors.primary,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(colors.primary, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.accent, 2.5, 20);
    pointLight2.position.set(-5, -5, -2);
    scene.add(pointLight2);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 10, 10);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    // Call ready callback if passed
    if (onCanvasReady) {
      onCanvasReady({
        scene,
        camera,
        coreGroup,
        outerMesh,
        innerMesh,
        ringMesh1,
        ringMesh2,
        particles,
      });
    }

    // Mouse Pointer Handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.8;
      mouseRef.current.targetY = y * 0.8;
    };

    if (isInteractive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (coreGroup) {
        // Base auto rotations
        const speed = autoRotateSpeed * 0.005;
        coreGroup.rotation.y += speed;
        coreGroup.rotation.x += speed * 0.5;

        // Apply mouse sway if enabled
        if (isInteractive) {
          coreGroup.rotation.y += (mouseRef.current.x - coreGroup.rotation.y) * 0.02;
          coreGroup.rotation.x += (-mouseRef.current.y - coreGroup.rotation.x) * 0.02;
        }

        // Floating sine wave animation
        coreGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      if (outerMesh) {
        outerMesh.rotation.z = -elapsedTime * 0.15;
      }

      if (innerMesh) {
        innerMesh.rotation.y = elapsedTime * 0.3;
        innerMesh.rotation.x = elapsedTime * 0.2;
      }

      if (ringMesh1) {
        ringMesh1.rotation.z = elapsedTime * 0.4;
      }

      if (ringMesh2) {
        ringMesh2.rotation.y = -elapsedTime * 0.3;
      }

      if (particles) {
        particles.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotateSpeed, isInteractive]);

  // Mode color switcher helper
  function getModeColors(mode: CanvasMode) {
    switch (mode) {
      case 'neon':
        return {
          primary: new THREE.Color(0xd946ef), // Purple / Fuchsia
          secondary: new THREE.Color(0x8b5cf6), // Violet
          accent: new THREE.Color(0xec4899), // Pink
          emissive: new THREE.Color(0xa855f7),
        };
      case 'gold':
        return {
          primary: new THREE.Color(0xf59e0b), // Amber Gold
          secondary: new THREE.Color(0xd97706), // Deep Gold
          accent: new THREE.Color(0xfef08a), // Bright Yellow
          emissive: new THREE.Color(0xb45309),
        };
      case 'cyber':
        return {
          primary: new THREE.Color(0x10b981), // Emerald Cyan
          secondary: new THREE.Color(0x06b6d4), // Cyan
          accent: new THREE.Color(0x34d399), // Light Mint
          emissive: new THREE.Color(0x059669),
        };
      case 'hologram':
      default:
        return {
          primary: new THREE.Color(0x38bdf8), // Light Blue
          secondary: new THREE.Color(0x0284c7), // Cyan Blue
          accent: new THREE.Color(0x818cf8), // Indigo
          emissive: new THREE.Color(0x0369a1),
        };
    }
  }

  // Handle Mode Change dynamically
  const applyModeChange = (mode: CanvasMode) => {
    setActiveMode(mode);
    const colors = getModeColors(mode);

    if (outerMeshRef.current) {
      (outerMeshRef.current.material as THREE.MeshStandardMaterial).color.copy(colors.primary);
      (outerMeshRef.current.material as THREE.MeshStandardMaterial).emissive.copy(colors.emissive);
    }
    if (innerMeshRef.current) {
      (innerMeshRef.current.material as THREE.MeshPhysicalMaterial).color.copy(colors.secondary);
      (innerMeshRef.current.material as THREE.MeshPhysicalMaterial).emissive.copy(colors.emissive);
    }
    if (ring1Ref.current) {
      (ring1Ref.current.material as THREE.MeshStandardMaterial).color.copy(colors.primary);
      (ring1Ref.current.material as THREE.MeshStandardMaterial).emissive.copy(colors.primary);
    }
    if (ring2Ref.current) {
      (ring2Ref.current.material as THREE.MeshStandardMaterial).color.copy(colors.accent);
      (ring2Ref.current.material as THREE.MeshStandardMaterial).emissive.copy(colors.accent);
    }
    if (particlesRef.current) {
      (particlesRef.current.material as THREE.PointsMaterial).color.copy(colors.primary);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex items-center justify-center select-none group">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Control Bar Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill border border-cyan-500/20 shadow-lg backdrop-blur-xl z-20 transition-all duration-300 opacity-90 hover:opacity-100">
        {/* Toggle Mode Dropdown / Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => applyModeChange('hologram')}
            title="Hologram Mode"
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              activeMode === 'hologram'
                ? 'bg-cyan-500 text-white scale-110 shadow-md shadow-cyan-500/50 ring-2 ring-cyan-300'
                : 'bg-cyan-950/60 text-cyan-400 hover:bg-cyan-900/80'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </button>

          <button
            onClick={() => applyModeChange('neon')}
            title="Cyber Neon Mode"
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              activeMode === 'neon'
                ? 'bg-purple-600 text-white scale-110 shadow-md shadow-purple-500/50 ring-2 ring-purple-300'
                : 'bg-purple-950/60 text-purple-400 hover:bg-purple-900/80'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400" />
          </button>

          <button
            onClick={() => applyModeChange('gold')}
            title="Gold Glass Mode"
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              activeMode === 'gold'
                ? 'bg-amber-500 text-white scale-110 shadow-md shadow-amber-500/50 ring-2 ring-amber-300'
                : 'bg-amber-950/60 text-amber-400 hover:bg-amber-900/80'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          </button>

          <button
            onClick={() => applyModeChange('cyber')}
            title="Cyber Emerald Mode"
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              activeMode === 'cyber'
                ? 'bg-emerald-500 text-white scale-110 shadow-md shadow-emerald-500/50 ring-2 ring-emerald-300'
                : 'bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/80'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </button>
        </div>

        <div className="w-px h-4 bg-white/20 mx-1" />

        {/* Mouse Interaction Toggle */}
        <button
          onClick={() => setIsInteractive(!isInteractive)}
          title={isInteractive ? 'Disable Mouse Tilt' : 'Enable Mouse Tilt'}
          className={`px-2 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition ${
            isInteractive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-3 h-3" />
          <span className="hidden sm:inline">{isInteractive ? 'Interactive' : 'Locked'}</span>
        </button>

        {/* Speed toggle */}
        <button
          onClick={() => setAutoRotateSpeed((prev) => (prev === 1 ? 2.5 : prev === 2.5 ? 0.5 : 1))}
          title="Change Spin Speed"
          className="px-2 py-1 rounded-md text-[11px] font-mono text-cyan-300/80 hover:text-cyan-200 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3 text-cyan-400" />
          <span>{autoRotateSpeed}x</span>
        </button>
      </div>

      {/* Futuristic Label Pill Top Right */}
      <div className="absolute top-2 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-[10px] font-mono text-cyan-300/90 border border-cyan-500/20 shadow-sm pointer-events-none">
        <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span>3D Cyber Artifact</span>
      </div>
    </div>
  );
};
