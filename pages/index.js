import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import styles from "../styles/Home.module.css";
import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import Ground from "../components/Ground.tsx";
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
  // useEffect(() => setTimeout(() => {}, 500), []);
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(-3, state.mouse.y * -0.5, 0), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
}

const PlayButton = ({ mute, setMute }) => {
  return (
    <div className={styles.PlayButton} onClick={() => setMute(!mute)}>
      {mute && <a>resume</a>}
      {!mute && <a>pause</a>}
    </div>
  );
};

const World = ({ mute, setMute }) => {
  return (
    <Canvas
      shadows={true}
      camera={{ fov: 89, position: [-3, 0, 0] }}
      className={styles.canvas}
    >
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
      <directionalLight position={[1, 10, 1]} intensity={0.1} color={"red"} />
    </Canvas>
  );
};

const LoadingCover = ({ setMute }) => {
  const [loading, setLoading] = useState(true);
  const [enter, setEnter] = useState(false);

  const { progress } = useProgress();
  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <div className={`${styles.LoadingCover} ${enter && styles.EnterAnim}`}>
      {loading ? (
        <a>Loading</a>
      ) : (
        <a
          className={styles.EnterButton}
          onClick={() => {
            setEnter(true);
            setMute(false);
          }}
        >
          Enter
        </a>
      )}
    </div>
  );
};

const Cryptensang = () => {
  return <div className={styles.Title}>Cryptensang</div>;
};

const Home = () => {
  const [mute, setMute] = useState(true);

  return (
    <div>
      <div className={styles.scene}>
        <LoadingCover setMute={setMute} />
        <Cryptensang />
        {/* <PlayButton mute={mute} setMute={setMute} /> */}
        <World mute={mute} setMute={setMute} />
      </div>
    </div>
  );
};

export default Home;
