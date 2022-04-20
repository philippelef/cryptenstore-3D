import { Canvas, MeshProps, useFrame, useThree, useLoader } from "@react-three/fiber";
import Floor from "../components/Floor";
import LightBulb from "../components/LightBulb";
import Box from "../components/Box";
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PerspectiveCamera, Scroll, ScrollControls, useScroll, Text } from '@react-three/drei';
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
    <PerspectiveCamera makeDefault ref={ref} position={[0, 1, 1000]} rotateY={0} />
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

const VideoCube = ({ mute }) => {
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), { src: 'spacestar.mp4', height: '100px', crossOrigin: 'Anonymous', loop: true }))


  useEffect(() => {
    mute ? video.pause() : video.play()
  }, [video, mute])


  return (
    <mesh position={[0, 0, 0]} rotateY={45}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial emissive={"white"} >
        <videoTexture attach="map" args={[video]} />
        <videoTexture attach="emissiveMap" args={[video]} />
      </meshStandardMaterial>
    </mesh >
  )
}



const Home = () => {
  const [mute, setMute] = useState(true)

  return (
    <div>
      {/* <video src={"spacestar.mp4"} id="video" style={{ display: "none" }} /> */}
      <Navbar />
      <Mute mute={mute} setMute={setMute} />
      <div className={styles.scene} >
        <Canvas
          shadows={true}
          colorManagement={false}
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
            <LightBulb position={[0, 3, 0]} />
            <ambientLight color={"white"} intensity={0.3} />
            <Floor position={[0, -1, 0]} />
          </ScrollControls>
          <VideoCube mute={mute} />
        </Canvas>
      </div >
    </div>
  )
}

export default Home
