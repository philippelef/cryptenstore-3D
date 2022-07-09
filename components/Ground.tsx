import { useTexture, MeshReflectorMaterial } from "@react-three/drei";
import React from "react";

export default function Ground() {
  const [floor, normal] = useTexture([
    "/SurfaceImperfections003_1K_var1.jpg",
    "/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        roughnessMap={floor}
        alphaMap={normal}
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={40}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#303030"
        metalness={0.5}
        mirror={0}
      />
    </mesh>
  );
}
