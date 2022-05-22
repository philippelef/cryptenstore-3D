import { Canvas, useThree, useLoader } from "@react-three/fiber";
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useTexture, OrbitControls, MeshReflectorMaterial } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import * as THREE from 'three'
import { Suspense } from "react";
import Scene from "../components/Scene";


function Sound({ url, mute }) {
  const sound = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)
  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
    camera.add(listener)
    return () => camera.remove(listener)
  }, [])

  useEffect(() => {
    mute ? sound.current.pause() : sound.current.play()
  }, [mute])

  return <positionalAudio ref={sound} args={[listener]} />
}


function Tele({ position, mute, setMute }) {
  return (
    <Suspense fallback={null}>
      <Scene position={position} mute={mute} setMute={setMute} />
    </Suspense>
  )
}

function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} >
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
      />
    </mesh>
  )
}

const PlayButton = ({ mute, setMute }) => {
  return (
    <div className={styles.PlayButton} onClick={() => setMute(!mute)}>
      {mute &&
        <a>
          OFF
        </a>
      }
      {!mute &&
        <a>ON
        </a>}

    </div>
  )
}


const Home = () => {
  const [mute, setMute] = useState(true)
  const [loading, setLoading] = useState(true)

  const cameraRef = useRef()

  return (
    <div>
      <Head>
        <title>CRYPTENSANG</title>
        <meta name="CRYPTENSANG" content="3D WORLD" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link href="https://fonts.googleapis.com/css2?family=Karla&family=Oswald&family=Poppins:wght@100&display=swap" />
      </Head>
      {/* <Mute mute={mute} setMute={setMute} /> */}
      <div className={styles.scene} >
        <PlayButton mute={mute} setMute={setMute} />
        <Canvas
          shadows={true}
          camera={{ fov: 45, position: [6, 3, 6] }}
          className={styles.canvas}
        >
          <OrbitControls
            ref={cameraRef}
            makeDefault
            enableZoom={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
            maxAzimuthAngle={Math.PI * 0.9}
            maxDistance={10}
            minAzimuthAngle={Math.PI * 0.1}
            target={[0, 2, 0]}
          />
          {/* <Ground position={[0, 0, 0]} /> */}
          <Tele position={[0, 0.7, 0]} mute={mute} setMute={setMute} />
          <ambientLight intensity={0.1} />
          <directionalLight position={[1, 1, 1]} intensity={0.7} />
        </Canvas>
      </div >
    </div>
  )
}

export default Home
