import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Grid} from './Grid'
import { Canvas } from '@react-three/fiber'
import { Environment, Loader } from '@react-three/drei'

function App() {

  return (
        <Canvas style={{width:"100vw", height:"100vh"}}>
        <Environment preset='dawn'></Environment>
        <Grid></Grid>
        </Canvas>
  )
}

export default App
