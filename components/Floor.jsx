import React from "react";
import { MeshReflectorMaterial } from '@react-three/drei';

function Floor(props) {
    console.log(MeshReflectorMaterial)
    return (
        <mesh {...props} recieveShadow={true}>
            <boxBufferGeometry args={[20, 1, 100]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
            />
        </mesh>
    );
}

export default Floor;
