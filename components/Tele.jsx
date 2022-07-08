/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Warkarma (https://sketchfab.com/warkarma)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/1990-tv-f4a523c95d964e1c973856c9b2bca233
title: 1990 TV
*/

import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';


// import { Canvas, useThree, useFrame } from "react-three-fiber"
import * as THREE from 'three'


export default function Model({ ...props }) {

  const group = useRef()
  const { nodes, materials } = useGLTF('/models/scene.gltf')

  const [video] = useState(() =>
    Object.assign(document.createElement('video'), { src: '/spacestar.mp4', height: '1000px', width: '1400px', crossOrigin: 'Anonymous', loop: true })
  )

  useFrame(() => {
    group.current.rotation.set(0, group.current.rotation.y+ 0.003, 0)
  })

  video.autoplay = false;
  video.muted = true;
  video.playsInline = false;


  useEffect(() => {
    props.mute ? video.pause() : video.play()
  }, [video, props.mute])
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={2}>
        <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          scale={[1, 1, 1]}
          geometry={nodes.defaultMaterial.geometry}>
          <meshPhysicalMaterial toneMapped={false}>
            <videoTexture
              attach="map" args={[video]}
              repeat={[3.5, 4.02]}
              // repeat={[3.4, 5.2]}
              // scale={[0.1, 0.1, 0.1]}
              offset={[0.92, 1.187]}
              format={THREE.RGBAFormat}
              type={THREE.UnsignedByteType}
              wrapT={THREE.RepeatWrapping}
              wrapS={THREE.RepeatWrapping}
              encoding={THREE.sRGBEncoding}
            />
          </meshPhysicalMaterial>
        </mesh>

          <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.DefaultMaterial} />
          <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.DefaultMaterial} />
          <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.DefaultMaterial} />
          <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.DefaultMaterial} />
          <mesh geometry={nodes.defaultMaterial_5.geometry} material={materials.DefaultMaterial} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/scene.gltf')
