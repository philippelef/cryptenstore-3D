import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import Floor from "../components/Floor";
import LightBulb from "../components/LightBulb";
import Box from "../components/Box";
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PerspectiveCamera, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { ReactElement, useEffect, useRef } from 'react';

const Damn = () => {

  return (
    <mesh >
      <Box>
        Bonjour
      </Box>
    </mesh>

  )
  // {/* <Box rotateX={r2} position={[0, 0, 0]} /> */ }
}



const CustomCam = () => {
  const ref = useRef(null)
  const scroll = useScroll()

  useFrame(() => {
    const r2 = scroll.range(0, 1)
    ref.current.position.z = r2 * 100
    // console.log("ref", ref)
  })

  return (
    <PerspectiveCamera makeDefault ref={ref} position={[0, 1, 1000]} rotateY={0} />
  )
}


const Home = () => {

  // useFrame(() => {
  //   const a = data.range(0, 1 / 3)
  // }


  return (
    <div className={styles.scene}>
      <Canvas
        shadows={true}
        className={styles.canvas}
      >
        <ScrollControls
          pages={3} // Each page takes 100% of the height of the canvas
          distance={4} // A factor that increases scroll bar travel (default: 1)
          damping={1} // Friction, higher is faster (default: 4)
          horizontal={false} // Can also scroll horizontally (default: false)
          infinite={false} // Can also scroll infinitely (default: false)
        >
          <Scroll>
          </Scroll>
          <CustomCam />
          <Damn />
          <LightBulb position={[0, 3, 0]} />
          <ambientLight color={"white"} intensity={0.3} />
          <Floor position={[0, -1, 0]} />
        </ScrollControls>
      </Canvas>
    </div >
  )
}

export default Home
