import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber' // Put inside a component: This hook gives you access to the state model which contains the default renderer, the scene, your camera, and so on

const ExampleScreen = () => {
    
    function Box(props) {
        // This reference will give us direct access to the mesh
        const mesh = useRef()
        // Set up state for the hovered and active state
        const [hovered, setHover] = useState(false)
        const [active, setActive] = useState(false)
        // Rotate mesh every frame, this is outside of React without overhead
        useFrame(() => (mesh.current.rotation.x += 0.01))

        return (
            <mesh
                {...props}
                ref={mesh}
                scale={active ? 1.5 : 1}
                onClick={(event) => setActive(!active)}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}>
                <torusKnotGeometry args={[10, 3, 128, 32]} />
                <meshNormalMaterial/>
            </mesh>
        )
    }

    return (
        <Canvas shadows={true} camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 40] }}>
            <OrbitControls/>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <pointLight position={[10, 10, 10]} />
            <Box position={[0, 0, 0]} />
        </Canvas>
    )
}

export default ExampleScreen
