import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'

const HomeScreen = () => {
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
                <boxGeometry args={[1, 2, 3]} />
                <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
            </mesh>
        )
    }

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    )
}

export default HomeScreen
