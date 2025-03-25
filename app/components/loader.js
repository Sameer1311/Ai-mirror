"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const RotatingSphere = () => {
  const meshRef = useRef(null); // No need for TypeScript type annotation

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial emissive="white" emissiveIntensity={1.2} wireframe />
    </mesh>
  );
};

const AI_Loader = () => {
  return (
    <Canvas>
      {/* Background */}
      <color attach="background" args={["black"]} />

      {/* AI Sphere */}
      <RotatingSphere />

      {/* Loader Text */}
      <Html center>
        <p className="ai-loader-text">AI is Thinking...</p>
      </Html>

      <ambientLight intensity={0.5} />
    </Canvas>
  );
};

export default AI_Loader;
