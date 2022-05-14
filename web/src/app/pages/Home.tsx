import React, { memo } from 'react'
import { Box } from '@react-three/drei'
import { View } from 'react-native'
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
            <View3D devUI={true}>
                <MyBox/>
            </View3D>
        </View>
    )
}

export default memo(HomeScreen);
