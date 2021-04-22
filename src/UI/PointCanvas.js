import React from 'react';
import { Canvas } from '@react-three/fiber';
import Dots from './Dots';
import { Effects } from './Effects';

const PointCanvas = () => {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 20 }}
      colorManagement={false}
      style={{ height: '100vh' }}
    >
      <color attach="background" args={['black']}></color>
      <Dots></Dots>
      <Effects></Effects>
    </Canvas>
  );
};

export default PointCanvas;
