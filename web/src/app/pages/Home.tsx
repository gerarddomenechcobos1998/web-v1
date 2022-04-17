import React, { useRef, memo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { View } from 'react-native'
import { useThree } from '@react-three/fiber' // Put inside a component: This hook gives you access to the state model which contains the default renderer, the scene, your camera, and so on
import { useControls, button, Leva } from "leva";
import InfiniteGridHelper from '../components/3D/InfiniteGridHelper'
import {Color, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';
import Axes from '../components/3D/Axes'

// fog : niebla
type Props = {
    children: React.ReactChild
}

const HomeScreen = (props: Props) => {
    //leva
    const levaConfig = {
        controls: false,
        lights: true,
        camera: false,
        gridHelper: false,
        axes: false,
        ambientLight: true,
        ambientLightIntensity: {
            value: 0.5,
            min: 0,
            max: 1,
            step: 0.1
        },
        environment: {
            value: 'city',
            options: ['', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
        },
        save: button(() => { console.log('Save config') }),
        "Add Model": button(async () => { console.log('Add model') })
    }
    const config = useControls(levaConfig);
    // grid helper
    extend({ InfiniteGridHelper }); //The extend function extends React Three Fiber's catalogue of JSX elements

    const TorusKnot = (props) => {
        // This reference will give us direct access to the mesh
        const mesh = useRef()
        return (
            <mesh
                {...props}
                ref={mesh}
            >
                <torusKnotGeometry args={[2, 1, 128, 4]} />
                <meshNormalMaterial opacity={1} />
            </mesh>
        )
    }
    // Lights
    const KeyLight = ({ brightness, color }) => {
        const light = useRef();
        React.useEffect(() => {
            if (light && light.current) {
                light.current.lookAt(0, 0, 0);
                //const helper = new RectAreaLightHelper( light.current );
                //light.current.add( helper ); // helper must be added as a child of the light
            }
        }, [light]);
        return (
            <rectAreaLight
                ref={light}
                width={3}
                height={3}
                color={color}
                intensity={brightness}
                position={[3, 2, 2]}
            />
        )
    }

    const FillLight = ({ brightness, color }) => {
        const light = useRef();
        React.useEffect(() => {
            if (light && light.current) {
                light.current.lookAt(0, 0, 0);
                //const helper = new RectAreaLightHelper( light.current );
                //light.current.add( helper ); // helper must be added as a child of the light
            }
        }, [light]);
        return (
            <rectAreaLight
                ref={light}
                width={3}
                height={3}
                intensity={brightness}
                color={color}
                position={[-3, 2, 2]}
            />
        );
    }

    const RimLight = ({ brightness, color }) => { // A rim light is placed behind a subject that exposes the outline or rim of the subject with light
        const light = useRef();
        React.useEffect(() => {
            if (light && light.current) {
                light.current.lookAt(0, 0, 0);
                //const helper = new RectAreaLightHelper( light.current );
                //light.current.add( helper ); // helper must be added as a child of the light
            }
        }, [light]);
        return (
            <rectAreaLight
                ref={light}
                width={2}
                height={2}
                intensity={brightness}
                color={color}
                position={[0, 4, -4]}
            />
        );
    }

    const Lights = () => {
        return (
            <group position={[0, 0, 0]}>
                <KeyLight brightness={10} color="#fff" />
                <FillLight brightness={20} color="#fff" />
                <RimLight brightness={44} color="#fff" />
            </group>
        );
    }

    // const getControls = () => props.controls ?? <OrbitControls target={[0, 0.5, 0]} />;
    // const getCamera = () => props.camera ?? <PerspectiveCamera position={[10, 6.6, 10]} near={1} far={9999999999} fov={30} /> 

    return (
        <View style={{ flex: 1 }}>
            <Leva hidden={false} />
            <Canvas 
                shadows={true} 
                camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 40] }}
                onCreated={({ camera, raycaster, gl }) => {
                    raycaster.layers.enableAll();
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 0.9;
                    gl.outputEncoding = sRGBEncoding;
                    //gl.physicallyCorrectLights = true;
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = PCFSoftShadowMap;
                }}   
                gl={{antialias: true }}
                style={{flex:1}}
            >
                <fog attach="fog" args={['#ffffff', 0, 100]} />
                <color attach="background" args={['#d0d0d0']} />
                <group position={[0, 0, 0]}>
                    <OrbitControls />
                    <TorusKnot position={[0, 5, 0]} />
                    {config.ambientLight && <ambientLight intensity={config.ambientLightIntensity} />}
                    {config.lights && <Lights />}
                    {config.gridHelper && <infiniteGridHelper args={[1, 1 * 10, new Color('#ccc'), 1000]} />}
                    {config.axes && <Axes />}
                    <Suspense fallback={<></>}>
                        {config.environment && <Environment preset={'city'} />}
                        {props.children}
                    </Suspense>
                </group>
            </Canvas>
        </View>
    )
}

export default memo(HomeScreen);
