import React, { useRef, memo, useEffect } from "react";
import { PerspectiveCamera} from "@react-three/drei";
import useKeyPress from "./useKeyPress";
import {useFrame} from 'react-three-fiber';
import {Vector3} from 'three';
import {PointerLockControls} from './PointerLockControls';
import { usePlayerStore } from "../store/PlayerStore";
import { useTerminalStore } from "../store/TerminalStore";

type Props = {
    playerHeight?: number,
    playerSpeed?: number,
    position?: number[]
}

const Player = (props: Props) => {
    const moveForward:boolean = useKeyPress("w");
    const moveBackward:boolean = useKeyPress("s");
    const moveRight:boolean = useKeyPress("d");
    const moveLeft:boolean = useKeyPress("a");
    const spacePressed:boolean = useKeyPress(" ");

    const {setPosition, newPosition, _position, speed, setPlayerHeight, playerHeight, setSpeed} = usePlayerStore();
    const { controlsEnabled } = useTerminalStore();

    const playerRef = useRef();
    const velocityRef = useRef(new Vector3());
    const directionRef = useRef(new Vector3());
    const velocity = velocityRef.current;
    const direction = directionRef.current;
    const controlsRef = useRef();
    var canJump = useRef(true);
    var jumping = useRef(0);

    useEffect(() => {
        if(spacePressed) {
            if ( canJump.current === true ) {
                canJump.current = false;
                jumping.current = 1;
            }
			
        }
    }, [spacePressed]);

    useEffect(() => {
        console.log(props);
        if(props.playerHeight) setPlayerHeight(props.playerHeight);
        if(props.position) setPosition(props.position[0], props.position[1], props.position[2]);
        if(props.playerSpeed) setSpeed(props.playerSpeed); 
    }, []);

    
    useFrame((state, delta) => {
        const controls = controlsRef.current;
        if(!controls) return;
        
        const onObject = controls.getObject().position.y > playerHeight ? false : (jumping.current?false:true);

        if(jumping.current) {
            velocity.y += 20;
            jumping.current = jumping.current-1;
        }
        

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        
        velocity.y -= 9.8 * 10.0 * delta; // 10.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );

        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 1 * speed * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 1 * speed * delta;

        if ( onObject === true ) {
            velocity.y = Math.max( 0, velocity.y );

            if(!canJump.current) canJump.current = true;
        }

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        if ( controls.getObject().position.y < 0 ) {
            velocity.y = 0;
            controls.getObject().position.y = 0;

            canJump.current = true;
        }
        const pos = controls.getObject().position;
        newPosition(pos.x, pos.y, pos.z);
    });

    return (
        <>
            {controlsEnabled?<PointerLockControls ref={controlsRef} />:null}
            
            <PerspectiveCamera  
                position={[_position.x, _position.y+playerHeight, _position.z]}
                rotation={[0,0,0]}
                near={1}
                far={9999999999}
                makeDefault={true} 
                fov={50} 
            >
                <group ref={playerRef} position={[0,0,0]}>

                </group>
            </PerspectiveCamera>
        </>
    )
}

export default memo(Player);