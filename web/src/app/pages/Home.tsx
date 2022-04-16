import React, { useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { Canvas, useFrame } from '@react-three/fiber'

const HomeScreen = () => {

    const Box = () => {
        // This reference will give us direct access to the mesh
        const mesh = useRef()
        // Set up state for the hovered and active state
        // Rotate mesh every frame, this is outside of React without overhead
        useFrame(() => (mesh.current.rotation.x += 0.01))

        return (
            <mesh
                ref={mesh}
                scale={1}
            >
                <boxGeometry args={[1, 2, 3]} />
                <meshStandardMaterial color={'hotpink'} />
            </mesh>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>,ﬂ
        </View>
    );
}

export default HomeScreen