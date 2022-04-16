import React, { useRef } from 'react'
import { View, Text } from 'react-native'
import { Canvas, useFrame } from '@react-three/fiber'

const HomeScreen = () => {

    const Box = () => {
        // This reference will give us direct access to the mesh
        // Set up state for the hovered and active state
        // Rotate mesh every frame, this is outside of React without overhead

        return (
            <mesh
                scale={1}
            >
                <boxGeometry args={[1, 2, 3]} />
                <meshStandardMaterial color={'hotpink'} />
            </mesh>
        )
    }
    return (
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box />
            </Canvas>
        </View>
    );
}

export default HomeScreen