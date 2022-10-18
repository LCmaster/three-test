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

function Button({ children, clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className="rounded-md bg-green-500 text-white border-2 border-green-100 px-4 py-2 basis-full"
    >
      {children}
    </button>
  );
}

function App() {
  const [pickedIndex, pick] = useState(-1);

  const pickNext = () => pick((prev) => (prev + 1) % boxPosition.length);
  const pickRandom = () =>
    pick((prev) => {
      let randomIndex;
      while (
        (randomIndex = Math.floor(Math.random() * boxPosition.length)) === prev
      );
      return randomIndex;
    });

  useEffect(() => {
    const handleKeyUp = (key) => {
      if (key.code === "Space") pickNext();
      if (key.code === "Enter") pickRandom();
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  const boxPosition = [];
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      boxPosition.push([-2 + i * 1.5, 2 - j * 1.5, 0]);
    }
  }
  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center">
        <Button clickHandler={pickNext}>Pick Next</Button>
        <Button clickHandler={pickRandom}>Pick Random</Button>
      </div>
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
