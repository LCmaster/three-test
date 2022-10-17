import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

function Box({ position, picked }) {
  const ref = useRef();
  return (
    <mesh ref={ref} position={position} scale={picked ? 1.25 : 1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={picked ? "crimson" : "orange"} />
    </mesh>
  );
}

function App() {
  const [pickedIndex, pick] = useState(-1);

  useEffect(() => {
    const handleKeyUp = (key) => {
      if (key.code === "Space") pick((pickedIndex + 1) % boxPosition.length);
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  const boxPosition = [];
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      boxPosition.push([-2 + i * 1.5, -2 + j * 1.5, 0]);
    }
  }
  return (
    <div className="App h-screen">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxPosition.map((pos, index) => (
          <Box key={index} position={pos} picked={pickedIndex === index} />
        ))}
      </Canvas>
    </div>
  );
}

export default App;
