// @generated: @expo/next-adapter@2.1.52
import React, { useRef, useMemo, useState, memo } from 'react'
import { Canvas, useFrame, useThree, createPortal } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, useCamera } from '@react-three/drei'
import { View } from 'react-native'
import { Scene, Matrix4, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap, DirectionalLightHelper } from 'three';

const TraslationScreen = () => {
    const TorusKnot = (props) => {
        // This reference will give us direct access to the mesh
        const mesh = useRef()
        return (
            <mesh
                {...props}
                ref={mesh}
            >
                <torusKnotGeometry args={[5, 2, 128, 20]} />
                <meshNormalMaterial opacity={1} />
            </mesh>
        )
    }
    const directionalLightRef = useRef();
    return (
        <View style={{ flex: 1 }}>
            <Canvas
                shadows={true}
                camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 40] }}
                onCreated={({ camera, raycaster, gl }) => {
                    raycaster.layers.enableAll();
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 0.9;
                    gl.outputEncoding = sRGBEncoding;
                    gl.physicallyCorrectLights = true;
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = PCFSoftShadowMap;
                }}
                gl={{ antialias: true }}
                style={{ flex: 1 }}
            >
                <mesh ref={mesh} position={[0, 2, 0]} castShadow>
                    <boxGeometry attach="geometry" />
                    <meshStandardMaterial attach="material" color="lightblue" />
                </mesh> 
                <mesh rotation-x={-Math.PI / 2} receiveShadow>
                    <planeBufferGeometry args={[100, 100]} attach="geometry" />
                    <shadowMaterial attach="material" opacity={0.5} />
                </mesh>
                <gridHelper args={[30, 30, 30]} />
                <OrbitControls />
            </Canvas>
        </View>
    )
}
export default memo(TraslationScreen);