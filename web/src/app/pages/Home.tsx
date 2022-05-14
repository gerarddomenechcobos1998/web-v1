import React, { useRef, memo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, Environment, Box } from '@react-three/drei'
import { View } from 'react-native'
import { useThree } from '@react-three/fiber' // Put inside a component: This hook gives you access to the state model which contains the default renderer, the scene, your camera, and so on
import { useControls, button, Leva } from "leva";
import InfiniteGridHelper from '../../../components/InfiniteGridHelper'
import { Color, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';
import Axes from '../components/3D/Axes'
import View3D from '../../../components/View3D'

// fog : niebla
type Props = {
    children: React.ReactChild
}

const HomeScreen = (props: Props) => {
    const MyBox = (props) => {
        // This reference will give us direct access to the mesh
        return (
            <mesh
                {...props}
            >
                <Box args={[4, 4, 4]} >
                    <meshPhysicalMaterial roughness={0} metalness={1} color='blue' transparent={true} />
                </Box>
            </mesh>
        )
    }
    // Lights
    
    return (
        <View style={{ flex: 1 }} >
            <View3D>
                <MyBox/>
            </View3D>
        </View>
    )
}

export default memo(HomeScreen);
