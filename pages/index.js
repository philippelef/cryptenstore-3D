import { Canvas, useThree, useLoader } from "@react-three/fiber";
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useTexture, OrbitControls, MeshReflectorMaterial } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import * as THREE from 'three'


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

const VideoCube = ({ mute, setMute }) => {
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), { src: 'spacestar.mp4', height: '100px', crossOrigin: 'Anonymous', loop: true })

  )

  video.autoplay = false;
  video.muted = true;
  video.playsInline = true;


  useEffect(() => {
    mute ? video.pause() : video.play()
  }, [video, mute])


  return (
    <mesh position={[0, 2, 0]} >
      <planeGeometry args={[3, 3, 3]} />
      <Sound url="/crache.mp3" mute={mute} />
      <meshStandardMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} />
      </meshStandardMaterial>
    </mesh >
  )
}

function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} >
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        roughnessMap={floor}
        normalMap={normal}
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

  return (
    <div>
      <Head>
        <title>CRYPTENSANG</title>
        <meta name="CRYPTENSANG" content="3D WORLD" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link href="https://fonts.googleapis.com/css2?family=Karla&family=Oswald&family=Poppins:wght@100&display=swap" rel="stylesheet" />
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
            makeDefault
            enableZoom={true}
            enablePan={true}
            target={[0, 2, 0]}
          />
          <Ground position={[0, 0, 0]} />
          {/* <ambientLight intensity={0.5} /> */}
          <directionalLight position={[1, 1, 1]} intensity={0.7} />
          <VideoCube mute={mute} setMute={setMute} />
        </Canvas>
      </div >
    </div>
  )
}

export default Home
