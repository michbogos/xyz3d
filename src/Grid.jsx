import React, { useMemo, useReducer } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D, Color, Vector3, MeshNormalMaterial, MeshPhysicalMaterial } from 'three'
import { Scroll, ScrollControls } from '@react-three/drei'
import { useRef } from 'react' 
import { useEffect } from 'react'
import { Text3D, Text, Stars } from '@react-three/drei'
import { LoremIpsum } from "lorem-ipsum";
import { CurveModifier, MarchingCubes, MarchingCube, MarchingPlane } from '@react-three/drei'
import { CatmullRomCurve3 } from 'three'

export function Grid({ count = 400, temp = new Object3D()}) {
  const curveRef = useRef()

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
    });
    const instancedMeshRef = useRef()
    const textRef = useRef()
    useFrame(({clock})=>{
        textRef.current.rotation.set(Math.sin(clock.getElapsedTime())*0.5/clock.getElapsedTime(), Math.sin(clock.getElapsedTime())*0.5/clock.getElapsedTime(), Math.sin(clock.getElapsedTime())*0.5/clock.getElapsedTime());
    })
    useEffect(() => {
      // Set positions
      for (let i = 0; i < count; i++) {
        temp.position.set(Math.random()*70-35, Math.random()*50-25, Math.random()*50-50)
        temp.updateMatrix()
        instancedMeshRef.current.setMatrixAt(i, temp.matrix)
        instancedMeshRef.current.setColorAt(i, new Color(Math.random()*0.9, Math.random()*0.1, Math.random()*0.6))
      }
      // Update the instance
      instancedMeshRef.current.instanceMatrix.needsUpdate = true
      instancedMeshRef.current.instanceColor.needsUpdate = true
    }, [])
    return (
      <ScrollControls pages={5.6} damping={0.5}>
        <Scroll>
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
                <Text3D ref={textRef} position={[-4.2, -1, 1]} size={2} font={"/pages/xyz3d/3dfont.json"}>
            XYZ 3D
            <meshPhysicalMaterial roughness={0.1} metalness={1.0} clearcoat={1.0} color={[.3, 0.0, .1]} clearcoatRoughness={1} />
        </Text3D>
        <Text3D position={[-2, -2, 1]} height={0.1} size={0.3} font={"/pages/xyz3d/3dfont.json"}>
            For all 3d needs
            <meshPhysicalMaterial roughness={0.1} metalness={1.0} clearcoat={1.0} color={[.1, 0.0, .3]} clearcoatRoughness={1} />
        </Text3D>
            <instancedMesh on frustumCulled ref={instancedMeshRef} args={[null, null, count]}>
                <sphereGeometry />
                <meshPhysicalMaterial roughness={0.1}/>
            </instancedMesh>
        <Text3D position={[-4.5, -35, 1]} height={0.1} size={0.5} font={"/pages/xyz3d/3dfont.json"}>
            asyncawaitcorp@gmail.com
            <meshPhysicalMaterial roughness={0.1} metalness={1.0} clearcoat={1.0} color={[.1, 0.0, .3]} clearcoatRoughness={1} />
        </Text3D>
        </Scroll>
        <Scroll html>
            <div class="content">
                <div class="row">
                  <div class="column">
                      <h1>3D is our passion</h1>
                      <p>{lorem.generateSentences(5)}</p>
                  </div>
                  <img src='/pages/xyz3d/img1.jpg'></img>
                </div>
                <div class="row">
                  <img src='/pages/xyz3d/img2.jpg'></img>
                  <div class="column">
                      <h1>Explore a whole new dimension</h1>
                      <p>{lorem.generateSentences(5)}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                      <h1>Our other projects</h1>
                      <p>{lorem.generateSentences(5)}</p>
                      <div class="row_unstyled">
                        <div class="column">
                          <img src='/pages/xyz3d/img3.jpg'></img>
                          <p>By: Mo Eid</p>
                        </div>
                        <div class="column">
                          <img src='/pages/xyz3d/img4.jpg'></img>
                          <p>By: Google DeepMind</p>
                        </div>
                        <div class="column">
                          <img src='/pages/xyz3d/img5.jpg'></img>
                          <p>By: Google DeepMind</p>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </Scroll>
      </ScrollControls>  
    )
  }
  
