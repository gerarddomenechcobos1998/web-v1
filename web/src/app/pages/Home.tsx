import React, { memo } from 'react'
import { Box, PerspectiveCamera, SpotLight, Plane } from '@react-three/drei'
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
                <Box args={[2, 2, 2]} castShadow={true}>
                    <meshPhysicalMaterial roughness={0.8} metalness={0.2} color='blue' transparent={true} />
                </Box>
            </mesh>
        )
    }
    // Lights

    return (
        <View style={{ flex: 1 }} >
            <View3D
                devUI={false}
                disableFog={false}
                disableDefaultCamera={true}
                ambientLightIntensity={3}
                disableDefaultControls={false}
                disableDefaultLights={true}
                disableFloor={true}
            >
                <Plane position={[0, 0, -5]} args={[1000, 1000]}>
                    <meshPhysicalMaterial roughness={1} metalness={0.9} opacity={1} color={'#808080'} />
                </Plane>
                <Plane rotation={[ -Math.PI/2, 0, 0 ]} position={[0, 0, 0]} args={[1000, 1000]}>
                    <meshPhysicalMaterial roughness={1} metalness={0.9} opacity={1} color={'#808080'} />
                </Plane>
                <PerspectiveCamera makeDefault position={[10, 6, 10]} near={1} far={9999999999} fov={30} />
                <SpotLight
                    position={[4, 4, 3]}
                    distance={5}
                    angle={0.3}
                    attenuation={5}
                    intensity={10}
                    anglePower={5} // Diffuse-cone anglePower (default: 5)
                />
                <MyBox position={[0, 1, 0]} />
                <MyBox position={[3, 1, 1]} />
            </View3D>
        </View>
    )
}

export default memo(HomeScreen);
