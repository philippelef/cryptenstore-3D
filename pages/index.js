import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import styles from "../styles/Home.module.css";
import {
  useTexture,
  OrbitControls,
  MeshReflectorMaterial,
  useProgress,
} from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import Head from "next/head";
import * as THREE from "three";
import Tele from "../components/Tele";

function Sound({ url, mute }) {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setLoop(true);
    camera.add(listener);
    return () => camera.remove(listener);
  }, []);

  useEffect(() => {
    mute ? sound.current.pause() : sound.current.play();
  }, [mute]);

  return <positionalAudio ref={sound} args={[listener]} />;
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  useEffect(() => setTimeout(() => {}, 500), []);
  return useFrame((state) => {
    if (true) {
      state.camera.position.lerp(
        vec.set(-3, state.mouse.y * -0.5, state.mouse.x * -0.5),
        0.05
      );
      state.camera.lookAt(0, 0, 0);
    }
  });
}

function Ground() {
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
      />
    </mesh>
  );
}

const PlayButton = ({ mute, setMute, loading }) => {
  if (loading === true) {
    return <div className={styles.PlayButton}>Loading...</div>;
  }
  return (
    <div className={styles.PlayButton} onClick={() => setMute(!mute)}>
      {mute && <a>resume</a>}
      {!mute && <a>PAUSE</a>}
    </div>
  );
};

const Cryptensang = () => {
  return <div className={styles.Title}>Cryptensang</div>;
};

const Home = () => {
  const [mute, setMute] = useState(true);
  const [loading, setLoading] = useState(true);

  const { progress } = useProgress();
  useEffect(() => {
    console.log(progress);
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <div>
      <Head>
        <title>CRYPTENSANG</title>
        <meta name="CRYPTENSANG" content="3D WORLD" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link href="https://fonts.googleapis.com/css2?family=Karla&family=Oswald&family=Poppins:wght@100&display=swap" />
      </Head>
      {/* <Mute mute={mute} setMute={setMute} /> */}
      <div className={styles.scene}>
        <Cryptensang />
        <PlayButton mute={mute} setMute={setMute} loading={loading} />
        <Canvas
          shadows={true}
          camera={{ fov: 89, position: [-3, 0, 0] }}
          className={styles.canvas}
        >
          <Suspense fallback={null}>
            <Intro />
            <Tele position={[0, 0.7, 0]} mute={mute} setMute={setMute} />
            <Ground />
            <ambientLight intensity={0.9} />
            <directionalLight position={[1, 1, 1]} intensity={0.3} />
            <directionalLight
              position={[10, 10, 10]}
              intensity={1}
              color={"#0d4000"}
            />
            <directionalLight
              position={[1, 10, 1]}
              intensity={0.1}
              color={"red"}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Home;
