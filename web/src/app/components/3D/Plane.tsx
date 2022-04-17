import React, { memo } from "react"

const Plane = () => {
    return (
        <mesh scale={1000} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry />
            <meshPhongMaterial color="#c0c0c0" />
        </mesh>
    )
}
export default memo(Plane)