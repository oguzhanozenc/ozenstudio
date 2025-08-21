import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Input categories with emojis and colors
const inputCategories = [
  {
    type: "visual",
    color: "#3B82F6",
    items: ["📸", "🎨", "🖼️", "🌅", "🏛️", "📐"],
  },
  {
    type: "experience",
    color: "#F59E0B",
    items: ["✈️", "🎭", "🍜", "🎵", "📚", "🏃"],
  },
  {
    type: "data",
    color: "#10B981",
    items: ["📊", "🔢", "📈", "🧮", "💾", "⚡"],
  },
  {
    type: "emotion",
    color: "#EF4444",
    items: ["❤️", "😊", "😢", "🤔", "💫", "🌟"],
  },
  {
    type: "nature",
    color: "#8B5CF6",
    items: ["🌱", "🌊", "🗻", "🌙", "⭐", "🦋"],
  },
];

interface InputElementProps {
  emoji: string;
  color: string;
  index: number;
  scrollProgress: number;
}

function InputElement({
  emoji,
  color,
  index,
  scrollProgress,
}: InputElementProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const elementProps = useMemo(() => {
    // Distribute starting positions around the edges of viewport
    const angle = index * 137.5 * (Math.PI / 180); // Golden angle for natural distribution
    const radiusVariation = 0.8 + Math.random() * 0.4;
    const baseRadius =
      Math.max(viewport.width, viewport.height) * 0.6 * radiusVariation;

    const startX = Math.cos(angle) * baseRadius;
    const startY = Math.sin(angle) * baseRadius;

    // Stagger elements based on index for progressive animation
    const progressOffset = (index % 30) / 30; // Cycle every 30 elements

    // Slight variations in path curvature
    const pathCurvature = (Math.random() - 0.5) * 2;

    return {
      startX,
      startY,
      progressOffset,
      pathCurvature,
      floatOffset: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
    };
  }, [index, viewport]);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Calculate progress based on scroll with staggered offset
    const adjustedProgress = Math.max(
      0,
      Math.min(1, scrollProgress + elementProps.progressOffset)
    );

    // Smooth easing function
    const easeInOutQuart = (t: number): number =>
      t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    const easedProgress = easeInOutQuart(adjustedProgress);

    // Calculate curved path to center
    const currentX = elementProps.startX * (1 - easedProgress);
    const currentY = elementProps.startY * (1 - easedProgress);

    // Add subtle curve to the path
    const pathOffset =
      Math.sin(easedProgress * Math.PI) * elementProps.pathCurvature * 0.5;

    groupRef.current.position.x = currentX + pathOffset;
    groupRef.current.position.y = currentY;
    groupRef.current.position.z = easedProgress * 0.5;

    // Floating animation
    const floatY =
      Math.sin(time * 2 + elementProps.floatOffset) *
      0.05 *
      (1 - easedProgress * 0.8);
    meshRef.current.position.y = floatY;

    // Gentle rotation
    meshRef.current.rotation.z = time * elementProps.rotationSpeed;

    // Scale and opacity changes - elements disappear as they reach center
    const scale = 0.8 + (1 - easedProgress) * 0.4;
    const opacity = Math.max(0, 1 - easedProgress * 1.2); // Elements fade out completely

    groupRef.current.scale.setScalar(scale);

    // Fixed TypeScript error: properly check material type
    const material = meshRef.current.material;
    if (
      material &&
      "opacity" in material &&
      typeof material.opacity === "number"
    ) {
      (material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  // Create emoji texture
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    if (!ctx) return new THREE.CanvasTexture(canvas); // Handle null context

    // Background with category color and soft shadow
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, color + "40");
    gradient.addColorStop(1, color + "10");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    // Emoji
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#333";
    ctx.fillText(emoji, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, [emoji, color]);

  return (
    <group
      ref={groupRef}
      position={[elementProps.startX, elementProps.startY, 0]}
    >
      <mesh ref={meshRef}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={texture} transparent opacity={1} />
      </mesh>
    </group>
  );
}

function CentralIdea({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Idea emerges as elements disappear - starts when elements begin converging
    const ideaProgress = Math.max(0, (scrollProgress - 0.4) / 0.6); // Start later so elements disappear first
    const easedIdeaProgress = Math.sin((ideaProgress * Math.PI) / 2); // Smooth ease-in

    // Main idea scaling with dramatic entrance
    const pulseScale = easedIdeaProgress * (1.2 + Math.sin(time * 1.5) * 0.1);
    meshRef.current.scale.setScalar(pulseScale);

    // Glow effect scaling
    if (glowRef.current) {
      const glowScale = easedIdeaProgress * (2 + Math.sin(time * 2) * 0.3);
      glowRef.current.scale.setScalar(glowScale);

      // Fixed TypeScript error for glow material
      const glowMaterial = glowRef.current.material;
      if (
        glowMaterial &&
        "opacity" in glowMaterial &&
        typeof glowMaterial.opacity === "number"
      ) {
        (glowMaterial as THREE.MeshBasicMaterial).opacity =
          easedIdeaProgress * 0.4 * (0.8 + Math.sin(time * 3) * 0.2);
      }
    }

    // Light rays rotation
    if (raysRef.current) {
      raysRef.current.rotation.z = time * 0.3;
      raysRef.current.scale.setScalar(easedIdeaProgress);
    }

    // Main idea opacity
    const material = meshRef.current.material;
    if (
      material &&
      "opacity" in material &&
      typeof material.opacity === "number"
    ) {
      (material as THREE.MeshBasicMaterial).opacity = easedIdeaProgress;
    }

    // Subtle rotation
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
  });

  // Enhanced central idea texture with more detail
  const ideaTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    if (!ctx) return new THREE.CanvasTexture(canvas); // Handle null context

    // Multiple gradient layers for depth - circular only
    const gradient1 = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient1.addColorStop(0, "#FFF9E6");
    gradient1.addColorStop(0.6, "#FFE066");
    gradient1.addColorStop(1, "#FF950000"); // Fade to transparent

    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, 512, 512);

    // Inner glow - brighter center
    const gradient2 = ctx.createRadialGradient(256, 256, 0, 256, 256, 120);
    gradient2.addColorStop(0, "#FFFFFF90");
    gradient2.addColorStop(1, "#FFFFFF00");

    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, 512, 512);

    // Main lightbulb - larger and more prominent
    ctx.shadowColor = "#FFE06660";
    ctx.shadowBlur = 30;
    ctx.font = "bold 120px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#D35400";
    ctx.fillText("💡", 256, 256);

    // Sparkles in more positions with glow
    const sparkles = ["✨", "⭐", "💫", "🌟"];
    ctx.font = "bold 40px Arial";
    sparkles.forEach((sparkle, i) => {
      const angle = i * 90 * (Math.PI / 180);
      const x = 256 + Math.cos(angle) * 140;
      const y = 256 + Math.sin(angle) * 140;
      ctx.shadowColor = "#F39C1260";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#F39C12";
      ctx.fillText(sparkle, x, y);
    });

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Glow texture
  const glowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (!ctx) return new THREE.CanvasTexture(canvas); // Handle null context

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "#FFE06640");
    gradient.addColorStop(0.5, "#FF950620");
    gradient.addColorStop(1, "#FF950000");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group position={[0, 0, 0.1]}>
      {/* Background glow */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Light rays */}
      <group ref={raysRef}>
        {[0, 45, 90, 135].map((rotation, i) => (
          <mesh key={i} rotation={[0, 0, (rotation * Math.PI) / 180]}>
            <planeGeometry args={[0.1, 4]} />
            <meshBasicMaterial
              color="#FFE066"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* Main idea */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={ideaTexture} transparent opacity={0} />
      </mesh>
    </group>
  );
}

function Scene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allInputs = useMemo(() => {
    const inputs: Array<{
      emoji: string;
      color: string;
      category: string;
      index: number;
    }> = [];

    inputCategories.forEach((category, categoryIndex) => {
      category.items.forEach((emoji, itemIndex) => {
        inputs.push({
          emoji,
          color: category.color,
          category: category.type,
          index: categoryIndex * 6 + itemIndex,
        });
      });
    });
    return inputs;
  }, []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#FFF3CD" />

      {/* Input elements */}
      {allInputs.map((input, index) => (
        <InputElement
          key={`${input.category}-${index}`}
          emoji={input.emoji}
          color={input.color}
          index={input.index}
          scrollProgress={scrollProgress}
        />
      ))}
      {/* Central idea - emerges from convergence */}
      <CentralIdea scrollProgress={scrollProgress} />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#FEFEFE", 8, 15]} />
    </>
  );
}

export default function CreativeProcessVisual() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
