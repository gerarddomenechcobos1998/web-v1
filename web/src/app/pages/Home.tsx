import React, { useRef, useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame, extend} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { View } from 'react-native'
import { useThree } from '@react-three/fiber' // Put inside a component: This hook gives you access to the state model which contains the default renderer, the scene, your camera, and so on
import { useControls } from "leva";
import InfiniteGridHelper from '../components/3D/InfiniteGridHelper'
import { Color } from 'three'
import Axes from '../components/3D/Axes'
import guiControls from '../../conf/guiControls';

const HomeScreen = () => {
    
    const config = useControls(guiControls);
    
    const infiniteGridHelper = extend({InfiniteGridHelper}); //The extend function extends React Three Fiber's catalogue of JSX elements
    function TorusKnot(props) {
        // This reference will give us direct access to the mesh
        const mesh = useRef()
        return (
            <mesh
                {...props}
                ref={mesh}
            >
                <torusKnotGeometry args={[2, 1, 128, 4]} />
                <meshNormalMaterial/>
            </mesh>
        )
    }
    const Scene = () => {
        return (
          <>
            <ambientLight intensity={0.5} />
            <pointLight position={[1, 2, 3]} intensity={0.5} />
            <pointLight position={[1, 2, -3]} intensity={0.5} />
            <perspectiveCamera far={10} near={1} position={[-2, 2, 3]} onUpdate={(c) => c.lookAt(2, 1, 0)} />
            <directionalLight color="red" position={[0, 0, 5]} />
          </>
        )
      }
    return (
        <View style={{ flex:1 }}>
        <Canvas shadows={true} camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 40] }}>
        <Suspense fallback={null}>
            <OrbitControls/>
            <TorusKnot position={[0, 0, 0]} />
            <Scene />
            {config.gridHelper && <infiniteGridHelper args={[1, 1 * 10, new Color('#ccc'), 1000]}/>}
            {config.axes && <Axes/>}
        </Suspense>
        </Canvas>
        </View>
    )
}

export default HomeScreen
