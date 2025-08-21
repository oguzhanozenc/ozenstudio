"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree, RootState } from "@react-three/fiber";
import * as THREE from "three";
import AnimatedLogo from "@/components/Hero/AnimatedLogo";

/* -----------------------------
   Types & Constants
------------------------------ */
type ElementProps = {
  startX: number;
  startY: number;
  animationDelay: number;
  animationDuration: number;
  pathCurvature: number;
  floatOffset: number;
  rotationSpeed: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftFreqX: number;
  driftFreqY: number;
  angle: number;
};

type InputElementProps = {
  emoji: string;
  color: string;
  index: number;
  prefersReducedMotion: boolean;
};

type AnimationConfig = {
  ringRadius: number;
  ringProgressThreshold: number;
  mergeStartThreshold: number;
  baseScale: number;
  scaleVariation: number;
  floatAmplitude: number;
  goldenAngle: number;
  radiusMultiplier: number;
  radiusVariationRange: [number, number];
  timingMultipliers: {
    reduced: { delay: number; duration: number };
    normal: { delay: number; duration: number };
  };
};

const ANIMATION_CONFIG: AnimationConfig = {
  ringRadius: 0.75,
  ringProgressThreshold: 0.85,
  mergeStartThreshold: 0.85,
  baseScale: 0.9,
  scaleVariation: 0.2,
  floatAmplitude: 0.03,
  goldenAngle: 137.5,
  radiusMultiplier: 0.6,
  radiusVariationRange: [0.8, 1.2],
  timingMultipliers: {
    reduced: { delay: 0.1, duration: 2 },
    normal: { delay: 0.2, duration: 4 },
  },
} as const;

const INPUT_CATEGORIES = [
  {
    type: "visual",
    color: "#3B82F6",
    items: ["📱", "🎨", "📸", "🌈", "🖥️", "✨"],
  },
  {
    type: "experience",
    color: "#F59E0B",
    items: ["🚀", "🎧", "🥑", "🎮", "📚", "💪"],
  },
  {
    type: "data",
    color: "#10B981",
    items: ["📊", "💻", "📈", "🧠", "☁️", "🔥"],
  },
  {
    type: "emotion",
    color: "#EF4444",
    items: ["💖", "😍", "🥺", "🤯", "✨", "🔮"],
  },
  {
    type: "nature",
    color: "#8B5CF6",
    items: ["🌿", "🌊", "🏔️", "🌙", "⭐", "🦋"],
  },
] as const;

const CANVAS_CONFIG = {
  camera: { position: [0, 0, 8] as [number, number, number], fov: 60 },
  dpr: [1, 2] as [number, number],
  gl: {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance" as const,
    premultipliedAlpha: false,
  },
} as const;

const TIMING_CONFIG = {
  transition: { reduced: 2000, normal: 4500 },
  logo: { reduced: 2200, normal: 5000 },
} as const;

/* -----------------------------
   Utilities
------------------------------ */
const createSeededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), state | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const easeInOutQuart = (t: number): number =>
  t < 0.5 ? 8 * Math.pow(t, 4) : 1 - 8 * Math.pow(t - 1, 4);

const isSSR = () => typeof window === "undefined";

/* -----------------------------
   Resource Management
------------------------------ */
class ResourceManager {
  private static instance: ResourceManager;
  private textureCache = new Map<string, THREE.CanvasTexture | null>();
  private sharedGeometry: THREE.PlaneGeometry | null = null;

  static getInstance(): ResourceManager {
    if (!ResourceManager.instance) {
      ResourceManager.instance = new ResourceManager();
    }
    return ResourceManager.instance;
  }

  getSharedGeometry(): THREE.PlaneGeometry {
    if (!this.sharedGeometry) {
      this.sharedGeometry = new THREE.PlaneGeometry(1, 1);
    }
    return this.sharedGeometry;
  }

  getTexture(emoji: string): THREE.CanvasTexture | null {
    if (isSSR()) return null;

    const key = emoji; // cache by emoji only; color is applied via material tint
    let texture = this.textureCache.get(key);

    if (!texture) {
      texture = this.createTexture(emoji);
      this.textureCache.set(key, texture);
    }

    return texture ?? null;
  }

  private createTexture(emoji: string): THREE.CanvasTexture | null {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = 64 * dpr;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, size, size);
    ctx.font = `${
      40 * dpr
    }px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji || "•", size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    return texture;
  }

  dispose(): void {
    this.textureCache.forEach((texture) => {
      if (texture) texture.dispose();
    });
    this.textureCache.clear();

    if (this.sharedGeometry) {
      this.sharedGeometry.dispose();
      this.sharedGeometry = null;
    }
  }
}

/* -----------------------------
   Animation Logic
------------------------------ */
const useElementProps = (
  index: number,
  viewport: { width: number; height: number },
  prefersReducedMotion: boolean
): ElementProps =>
  useMemo(() => {
    const rnd = createSeededRandom(index);
    const angle = index * ANIMATION_CONFIG.goldenAngle * (Math.PI / 180);
    const radiusVariation =
      ANIMATION_CONFIG.radiusVariationRange[0] +
      rnd() *
        (ANIMATION_CONFIG.radiusVariationRange[1] -
          ANIMATION_CONFIG.radiusVariationRange[0]);
    const baseRadius =
      Math.max(viewport.width, viewport.height) *
      ANIMATION_CONFIG.radiusMultiplier *
      radiusVariation;

    const timing = prefersReducedMotion
      ? ANIMATION_CONFIG.timingMultipliers.reduced
      : ANIMATION_CONFIG.timingMultipliers.normal;

    return {
      startX: Math.cos(angle) * baseRadius,
      startY: Math.sin(angle) * baseRadius,
      animationDelay: (index % 30) * timing.delay,
      animationDuration:
        timing.duration + (prefersReducedMotion ? 0 : rnd() * 2),
      pathCurvature: prefersReducedMotion ? 0 : (rnd() - 0.5) * 2,
      floatOffset: rnd() * Math.PI * 2,
      rotationSpeed: prefersReducedMotion ? 0 : (rnd() - 0.5) * 0.1,
      driftPhaseX: rnd() * Math.PI * 2,
      driftPhaseY: rnd() * Math.PI * 2,
      driftFreqX: 0.6 + rnd() * 0.5,
      driftFreqY: 0.8 + rnd() * 0.6,
      angle,
    };
  }, [index, viewport.width, viewport.height, prefersReducedMotion]);

const useElementAnimation = (
  elementProps: ElementProps,
  prefersReducedMotion: boolean,
  refs: {
    mesh: React.RefObject<THREE.Mesh>;
    group: React.RefObject<THREE.Group>;
    material: React.RefObject<THREE.MeshBasicMaterial>;
    isDead: React.MutableRefObject<boolean>;
  }
) =>
  useCallback(
    (state: RootState) => {
      const { mesh, group, material, isDead } = refs;

      if (
        isDead.current ||
        !mesh.current ||
        !group.current ||
        !material.current ||
        !group.current.visible
      ) {
        return;
      }

      const time = state.clock.elapsedTime;
      const adjustedTime = Math.max(0, time - elementProps.animationDelay);
      const progress = Math.min(
        1,
        adjustedTime / elementProps.animationDuration
      );
      const eased = easeInOutQuart(progress);

      // Position calculations
      const baseX = elementProps.startX * (1 - eased);
      const baseY = elementProps.startY * (1 - eased);

      const pathOffset = prefersReducedMotion
        ? 0
        : Math.sin(eased * Math.PI) * elementProps.pathCurvature * 0.5;
      const organicX = prefersReducedMotion
        ? 0
        : Math.sin(elementProps.driftPhaseX + time * elementProps.driftFreqX) *
          0.25 *
          (1 - eased);
      const organicY = prefersReducedMotion
        ? 0
        : Math.sin(elementProps.driftPhaseY + time * elementProps.driftFreqY) *
          0.18 *
          (1 - eased);

      // Ring formation
      const ringProgress = Math.min(
        1,
        eased / ANIMATION_CONFIG.ringProgressThreshold
      );
      const mergeProgress = Math.max(
        0,
        (eased - ANIMATION_CONFIG.mergeStartThreshold) /
          (1 - ANIMATION_CONFIG.mergeStartThreshold)
      );

      const ringX = Math.cos(elementProps.angle) * ANIMATION_CONFIG.ringRadius;
      const ringY = Math.sin(elementProps.angle) * ANIMATION_CONFIG.ringRadius;

      const xToRing = THREE.MathUtils.lerp(
        baseX + pathOffset + organicX,
        ringX,
        ringProgress
      );
      const yToRing = THREE.MathUtils.lerp(
        baseY + organicY,
        ringY,
        ringProgress
      );

      group.current.position.set(
        THREE.MathUtils.lerp(xToRing, 0, mergeProgress),
        THREE.MathUtils.lerp(yToRing, 0, mergeProgress),
        eased * 0.6
      );

      // Micro-animations
      if (!prefersReducedMotion) {
        const floatY =
          Math.sin(time * 1.2 + elementProps.floatOffset) *
          ANIMATION_CONFIG.floatAmplitude *
          (1 - eased * 0.8);
        mesh.current.position.y = floatY;
        mesh.current.rotation.z = time * elementProps.rotationSpeed;
      }

      // Scale and opacity
      const scale =
        ANIMATION_CONFIG.baseScale +
        (1 - eased) * ANIMATION_CONFIG.scaleVariation;
      const opacity = Math.max(0, 1 - eased * 1.4);

      group.current.scale.setScalar(scale);
      material.current.opacity = opacity;

      // Cleanup (safe for R3F): hide and mark dead
      if (opacity <= 0.01) {
        group.current.visible = false;
        isDead.current = true;
      }
    },
    [elementProps, prefersReducedMotion, refs]
  );

/* -----------------------------
   Components
------------------------------ */
const InputElement = React.memo<InputElementProps>(function InputElement({
  emoji,
  index,
  prefersReducedMotion,
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!);
  const isDeadRef = useRef(false);
  const { viewport } = useThree();

  const elementProps = useElementProps(index, viewport, prefersReducedMotion);
  const texture = useMemo(
    () => ResourceManager.getInstance().getTexture(emoji),
    [emoji]
  );

  const refs = useMemo(
    () => ({
      mesh: meshRef,
      group: groupRef,
      material: materialRef,
      isDead: isDeadRef,
    }),
    []
  );

  const animateElement = useElementAnimation(
    elementProps,
    prefersReducedMotion,
    refs
  );
  useFrame(animateElement);

  if (!texture) return null;

  return (
    <group
      ref={groupRef}
      position={[elementProps.startX, elementProps.startY, 0]}
    >
      <mesh
        ref={meshRef}
        geometry={ResourceManager.getInstance().getSharedGeometry()}
      >
        <meshBasicMaterial
          ref={materialRef}
          map={texture}
          transparent
          opacity={1}
          alphaTest={0.01}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
});

const GLContextGuard = () => {
  const { gl } = useThree();
  useEffect(() => {
    const handleContextLost = (event: Event) => event.preventDefault();
    const canvas = gl.domElement;
    canvas.addEventListener(
      "webglcontextlost",
      handleContextLost as EventListener,
      { passive: false }
    );
    return () => {
      canvas.removeEventListener(
        "webglcontextlost",
        handleContextLost as EventListener
      );
    };
  }, [gl]);
  return null;
};

const Scene = React.memo(function Scene({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const elements = useMemo(
    () =>
      INPUT_CATEGORIES.flatMap((category, categoryIndex) =>
        category.items.map((emoji, itemIndex) => ({
          emoji,
          color: category.color,
          category: category.type,
          index: categoryIndex * 6 + itemIndex,
        }))
      ),
    []
  );

  return (
    <>
      <GLContextGuard />
      {elements.map((element) => (
        <InputElement
          key={element.index}
          emoji={element.emoji}
          color={element.color}
          index={element.index}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </>
  );
});

const DelayedLogo = React.memo(function DelayedLogo({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const [showLogo, setShowLogo] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    const timing = prefersReducedMotion
      ? TIMING_CONFIG.transition.reduced
      : TIMING_CONFIG.transition.normal;
    const logoTiming = prefersReducedMotion
      ? TIMING_CONFIG.logo.reduced
      : TIMING_CONFIG.logo.normal;

    const transitionTimer = setTimeout(() => setShowTransition(true), timing);
    const logoTimer = setTimeout(() => {
      setShowTransition(false);
      setShowLogo(true);
    }, logoTiming);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(logoTimer);
    };
  }, [prefersReducedMotion]);

  const transitionContent = prefersReducedMotion ? (
    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
  ) : (
    <>
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-50" />
      <div className="absolute w-1.5 h-1.5 bg-blue-600 rounded-full" />
    </>
  );

  return (
    <>
      {showTransition && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {transitionContent}
        </div>
      )}
      {showLogo && <AnimatedLogo />}
    </>
  );
});

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (isSSR()) return;
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

const useIntersectionObserver = (
  ref: React.RefObject<Element | null>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: "0px 0px -10% 0px", ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
};

/* -----------------------------
   Main Component
------------------------------ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const isActive = useIntersectionObserver(sectionRef);

  useEffect(() => {
    const resourceManager = ResourceManager.getInstance();
    return () => resourceManager.dispose();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isActive && (
          <Canvas
            {...CANVAS_CONFIG}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <Scene prefersReducedMotion={prefersReducedMotion} />
          </Canvas>
        )}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <DelayedLogo prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
  );
}
