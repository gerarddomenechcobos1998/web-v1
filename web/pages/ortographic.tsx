// @generated: @expo/next-adapter@2.1.52
import React, { useRef, useMemo, useState, memo } from 'react'
import { Canvas, useFrame, useThree, createPortal } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, useCamera } from '@react-three/drei'
import { View } from 'react-native'
import { Scene, Matrix4, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';

const OrtographicScreen = () => {
    const TorusKnot = (props) => {
        // This reference will give us direct access to the mesh
        const mesh = useRef()
        return (
            <mesh
                {...props}
                ref={mesh}
            >
                <torusKnotGeometry args={[5, 2, 128, 20]} />
                <meshNormalMaterial opacity={1} />
            </mesh>
        )
    }

    const Viewcube = () => {
        const { gl, scene, camera, size } = useThree()
        const virtualScene = useMemo(() => new Scene(), [])
        const virtualCam = useRef()
        const viewRef = useRef()
        const [hover, setHover] = useState(null)
        const matrix = new Matrix4()

        useFrame(() => {
            matrix.copy(camera.matrix).invert()
            viewRef.current.quaternion.setFromRotationMatrix(matrix)
            gl.autoClear = true
            gl.render(scene, camera)
            gl.autoClear = false
            gl.clearDepth()
            gl.render(virtualScene, virtualCam.current)
        }, 1)

        return createPortal(
            <>
                <OrthographicCamera ref={virtualCam} makeDefault={false} position={[0, 0, 20]} />
                <mesh
                    ref={viewRef}
                    raycast={useCamera(virtualCam)}
                    position={[size.width / 2 - 80, size.height / 2 - 80, 0]}
                    onPointerOut={(e) => setHover(null)}
                    onPointerMove={(e) => setHover(Math.floor(e.faceIndex / 2))}>
                    <TorusKnot />
                </mesh>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
            </>,
            virtualScene
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <Canvas
                shadows={true}
                camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 40] }}
                onCreated={({ camera, raycaster, gl }) => {
                    raycaster.layers.enableAll();
                    gl.toneMapping = ACESFilmicToneMapping;
                    gl.toneMappingExposure = 0.9;
                    gl.outputEncoding = sRGBEncoding;
                    gl.physicallyCorrectLights = true;
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = PCFSoftShadowMap;
                }}
                gl={{ antialias: true }}
                style={{ flex: 1 }}
            >
                <fog attach="fog" args={['#ffffff', 0, 100]} />
                <color attach="background" args={['#000000']} />
                <group position={[0, 0, 0]}>
                    <TorusKnot />
                    <OrbitControls />
                </group>
                <Viewcube />
            </Canvas>
        </View>
    )
}
export default memo(OrtographicScreen);