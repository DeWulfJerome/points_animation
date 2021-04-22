import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Matrix4, Vector3 } from 'three';

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
};

const Dots = () => {
  const ref = React.useRef();

  const { vec, transform, positions, distances } = React.useMemo(() => {
    const vec = new Vector3();
    const transform = new Matrix4();
    const positions = [...Array(10000)].map((_, i) => {
      const position = new Vector3();
      position.x = (i % 100) - 50;
      position.y = Math.floor(i / 100) - 50;
      position.y += (i % 2) * 0.5;
      position.x += Math.random() * 0.3;
      position.y += Math.random() * 0.3;
      return position;
    });
    const right = new Vector3(1, 0, 0);
    const distances = positions.map((pos) => {
      return pos.length() + Math.cos(pos.angleTo(right) * 8) * 0.5;
    });
    return { vec, transform, positions, distances };
  }, []);

  useFrame(({ clock }) => {
    for (let i = 0; i < 10000; ++i) {
      const dist = distances[i];

      // Distance affects the wave phase
      const t = clock.elapsedTime - dist / 25;

      // Oscillates between -0.4 and +0.4
      const wave = roundedSquareWave(t, 0.15 + (0.2 * dist) / 72, 0.4, 1 / 3.8);

      // Scale initial position by our oscillator
      vec.copy(positions[i]).multiplyScalar(wave + 1.3);
      transform.setPosition(vec);
      ref.current.setMatrixAt(i, transform);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, 10000]}>
      <circleBufferGeometry args={[0.15]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
};

export default Dots;
