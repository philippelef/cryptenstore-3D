import { Canvas, MeshProps, useFrame, useThree, useLoader } from "@react-three/fiber";
import Floor from "../components/Floor";
import LightBulb from "../components/LightBulb";
import Box from "../components/Box";
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PerspectiveCamera, Scroll, ScrollControls, useScroll, Text, useTexture, Reflector } from '@react-three/drei';
import { ReactElement, useEffect, useRef, useState } from 'react';
import Navbar from "../components/Navbar";
import * as THREE from 'three'


const Mute = ({ mute, setMute }) => {
  return (
    <div onClick={() => setMute(!mute)}>
      Mute
    </div>
  )
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
    <PerspectiveCamera makeDefault ref={ref} position={[0, -1, 1000]} rotateY={0}>
      {/* <spotLight angle={0.15} penumbra={1} intensity={10} castShadow shadow-mapSize={[2048, 2048]} /> */}
    </PerspectiveCamera>
  )
}

function Sound({ url, mute }) {
  const sound = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)
  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
  }, [])

  useEffect(() => {
    if (mute == false) {
      sound.current.play()
    }
    else {
      sound.current.pause()
    }
  })
  return <positionalAudio ref={sound} args={[listener]} />
}

const VideoCube = ({ mute, setMute }) => {
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), { src: 'spacestar.mp4', height: '100px', crossOrigin: 'Anonymous', loop: true }))


  useEffect(() => {
    mute ? video.pause() : video.play()
  }, [video, mute])


  return (
    <mesh position={[4, 2, 2]} onClick={() => setMute(!mute)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial toneMapped={false} >
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        {/* <videoTexture attach="emissiveMap" args={[video]} /> */}
      </meshStandardMaterial>
      {/* <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0.001, 0]}>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial transparent color="black" opacity={0.4} />
      </mesh> */}
    </mesh >
  )
}

function Ground() {

  return (
    <Reflector blur={[400, 100]} resolution={512} args={[10, 10]} mirror={10} mixBlur={600} mixStrength={1} >
      {/* <meshStandardMaterial color="#a0a0a0" metalness={0.4} normalScale={[2, 2]} /> */}
    </Reflector>
  )
}


const Home = () => {
  const [mute, setMute] = useState(true)

  return (
    <div>
      {/* <video src={"spacestar.mp4"} id="video" style={{ display: "none" }} /> */}
      {/* <Navbar />
      <Mute mute={mute} setMute={setMute} /> */}
      <div className={styles.scene} >
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
            {/* <Sound url="crache.mp3" mute={mute} /> */}
            {/* <ambientLight color={"white"} intensity={0.3} /> */}
          </ScrollControls>


          <Ground />
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
          {/* <LightBulb position={[-4, 3, 8]} /> */}
          {/* <Floor position={[0, -1, 0]} /> */}
          <VideoCube mute={mute} setMute={setMute} />
        </Canvas>
      </div >
    </div>
  )
}

export default Home
