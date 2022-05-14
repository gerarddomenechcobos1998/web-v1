import React, { memo, useRef, Suspense} from "react";
import { View} from 'react-native';
import { PerspectiveCamera, OrbitControls, Environment, ContactShadows} from "@react-three/drei";
import { Canvas, extend } from '@react-three/fiber';
import InfiniteGridHelper from './InfiniteGridHelper';
import {Color, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';
import {useControls, button} from 'leva';
// import ApiCaller from "../../../core/ApiCaller";
// import * as DocumentPicker from 'expo-document-picker';
import { Leva } from 'leva';

// Lights
function KeyLight({ brightness, color }) {
    const light = useRef();
    React.useEffect(() => {
        if(light && light.current) {
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
    );
    
}
function FillLight({ brightness, color }) {
    const light = useRef();
    React.useEffect(() => {
        if(light && light.current) {
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
function RimLight({ brightness, color }) {
    const light = useRef();
    React.useEffect(() => {
        if(light && light.current) {
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

extend({InfiniteGridHelper});

type Props = {
    disableDefaultControls?:Boolean,
    disableDefaultLights?:Boolean,
    disableDefaultCamera?:Boolean,
    disableFloor?:Boolean,
    disableFog?:Boolean,
    ambientLightIntensity?:number,
    scenePosition?:number[],
    controls?:any,
    camera?:any,
    devUI?:Boolean,
    children:any
};

const View3D = (props:Props) => {
    var currentConfig = {
        controls: true,
        lights: true,
        camera: true,
        floor: true,
        ambientLightIntensity: 0.3,
        environment: "city",
        fog: true
    }
    try {
        const storedConfig = require('../../../assets/3dconf.json');
        currentConfig = {
            ...currentConfig,
            ...storedConfig
        }
    } catch {}
    
    const levaOptions = { 
        controls: props.disableDefaultControls?false:currentConfig.controls, 
        lights: props.disableDefaultLights?false:currentConfig.lights,
        camera: props.disableDefaultCamera?false:currentConfig.camera,
        floor: props.disableFloor?false:currentConfig.floor,
        fog: props.disableFog?false:currentConfig.fog,
        ambientLight: {    
            value: props.ambientLightIntensity??currentConfig.ambientLightIntensity,
            min: 0,
            max: 2,
            step: 0.1
        },
        /* preset: {
            value: 'rembrandt',
            options: ['rembrandt', 'portrait', 'upfront', 'soft'],
        },*/
        environment: {
            value: currentConfig.environment,
            options: ['', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
        },
        // save: button(() => saveConfig(configRef.current)),
        // "Add Model": button(async () => {
        //     const result = await DocumentPicker.getDocumentAsync({type: "model/*"});
        //     if(!result.name.endsWith('.gltf') && !result.name.endsWith('.glb')) {
        //         alert('Invalid file format: Choose only glb or gltf files.');
        //         return;
        //     }
        //     if (result.type == 'success') {          
        //         let { name } = result;
        //         console.log(result);
        //         const apiCaller = new ApiCaller();
        //         const formData = new FormData();
        //         formData.append('file', result.file);
        //         await apiCaller.uploadFile('/api/v1/3dmodels', formData);
        //     }
        //     console.log(result);
        // })
    }

    const toValue = (options) => {
        Object.keys(options).forEach((key) => {
            if(options[key].hasOwnProperty("value")) {
                options[key] = options[key].value;
            }
        });
        return options;
    }
    
    const config = props.devUI?useControls(levaOptions):toValue(levaOptions)
    const configRef = useRef(config);

    React.useEffect(() => {
        configRef.current = config;
    }, [config]);

    // const saveConfig = async (config) => {
    //     const apiCaller = new ApiCaller();
    //     const result = await apiCaller.call('/v1/3dconfigs/current', 'post', config);
    // }

    const getControls = () => props.controls ?? <OrbitControls target={[0, 0, 0]} />;
    const getCamera = () => props.camera ?? <PerspectiveCamera position={[10, 6.6, 10]} near={1} far={9999999999} fov={30} /> 
    
    return (
        <View style={{flex:1}}> 
            <Leva hidden={props.devUI?false:true}/>
            <Canvas   
                shadows
                onCreated={({ camera, raycaster, gl }) => {
                    raycaster.layers.enableAll();
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 0.9;
                    gl.outputEncoding = sRGBEncoding;
                    //gl.physicallyCorrectLights = true;
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = PCFSoftShadowMap;
                    
                }}      
                style={{flex:1}} colorManagement gl={{antialias: true }}>

                {config.fog?<fog attach="fog" args={['#ffffff', 0, 100]} />:null}
                
                { config.controls ? getControls() : null }
                { config.camera ? getCamera() : null }

                <group position={props.scenePosition??[0,0,0]}>
                    { config.lights ? <Lights />  : null }
                    { config.floor ? <infiniteGridHelper args={[1, 1 * 10, new Color('#ccc'), 1000]} /> : null }
                    {/* <ContactShadows darkness={1} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} opacity={0.3} width={30} height={30} blur={1.1} far={50} /> */}
                   
                    {/*This will fail when ambientLightIntensity is 0, because it will evaluate to false. It should check for null, undefined, or whatever */}
                    <ambientLight intensity={config.ambientLight}></ambientLight>
                    
                    
                    <Suspense fallback={<></>}>
                        {config.environment?<Environment preset={config.environment} />:null}
                        {props.children}
                    </Suspense>
                </group>
            </Canvas>
        </View>
    );
}

export default memo(View3D);