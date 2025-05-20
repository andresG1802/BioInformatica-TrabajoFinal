import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Electron = ({ radius, speed, color, electronSize, initialAngle = 0 }) => {
  const ref = useRef();
  const lineRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + initialAngle;
    const x = radius * Math.cos(t);
    const z = radius * Math.sin(t);
    const y = 0;

    ref.current.position.set(x, y, z);

    const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
    lineRef.current.geometry.setFromPoints(points);
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[electronSize || 0.1, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color={color} linewidth={2} />
      </line>
    </>
  );
};

const Nucleo = () => (
  <mesh>
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshStandardMaterial color="#e53935" metalness={0.8} roughness={0.2} emissive="#b71c1c" emissiveIntensity={0.4} />
  </mesh>
);

const AtomoScene = () => {
  const groupRef = useRef();

  // Electrones con radios más pequeños y colores vivos
  const electrons = [
    { radius: 0.8, speed: 1, color: "#2979ff", electronSize: 0.12, initialAngle: 0 },
    { radius: 1.1, speed: 1.4, color: "#00e676", electronSize: 0.12, initialAngle: Math.PI / 2 },
    { radius: 1.4, speed: 0.9, color: "#ffea00", electronSize: 0.12, initialAngle: Math.PI },
    { radius: 1.6, speed: 1.2, color: "#ff4081", electronSize: 0.12, initialAngle: Math.PI / 4 },
    { radius: 1.8, speed: 0.7, color: "#7c4dff", electronSize: 0.12, initialAngle: Math.PI / 3 },
     // 6 electrones extra
  { radius: 1.0, speed: 1.3, color: "#00b0ff", electronSize: 0.12, initialAngle: Math.PI / 6 },
  { radius: 1.3, speed: 1.1, color: "#ff6f00", electronSize: 0.12, initialAngle: Math.PI / 5 },
  { radius: 1.5, speed: 1.0, color: "#d500f9", electronSize: 0.12, initialAngle: Math.PI / 8 },
  { radius: 1.7, speed: 0.85, color: "#00c853", electronSize: 0.12, initialAngle: Math.PI / 7 },
  { radius: 1.9, speed: 1.25, color: "#f50057", electronSize: 0.12, initialAngle: Math.PI / 9 },
  { radius: 2.0, speed: 0.95, color: "#304ffe", electronSize: 0.12, initialAngle: Math.PI / 10 },

  // 5 más
  { radius: 0.9, speed: 1.15, color: "#ffa726", electronSize: 0.12, initialAngle: Math.PI / 11 },
  { radius: 1.2, speed: 1.05, color: "#66bb6a", electronSize: 0.12, initialAngle: Math.PI / 12 },
  { radius: 1.35, speed: 1.3, color: "#ec407a", electronSize: 0.12, initialAngle: Math.PI / 13 },
  { radius: 1.65, speed: 0.9, color: "#29b6f6", electronSize: 0.12, initialAngle: Math.PI / 14 },
  { radius: 1.85, speed: 1.4, color: "#ab47bc", electronSize: 0.12, initialAngle: Math.PI / 15 },
  ];

  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef} scale={[2, 2, 2]}>
      <Nucleo />
      {electrons.map(({ radius, speed, color, electronSize, initialAngle }, index) => (
        <Electron
          key={index}
          radius={radius}
          speed={speed}
          color={color}
          electronSize={electronSize}
          initialAngle={initialAngle}
        />
      ))}
    </group>
  );
};

export const Atomo3D = () => {
  return (
    <Canvas style={{ height: 300, width: '100%' }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <AtomoScene />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
};

export default Atomo3D;
