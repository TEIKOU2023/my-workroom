import React, { useState, useRef } from "react";
import * as THREE from "three";
import DialogueBox from "./DialogueBox";

interface InteractionsCubeProps {
  position: [number, number, number];
  scale?: [number, number, number];
  messages: string[]; // 对话框内容
  onInteract: () => void; // 交互时的回调
}

const InteractionsCube: React.FC<InteractionsCubeProps> = ({
  position,
  scale = [1, 1, 1],
  messages,
  onInteract,
}) => {
  const [hovered, setHovered] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  // 鼠标交互
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "default";
  };

  const handleClick = () => {
    setShowDialogue(true);
    onInteract(); // 通知父组件交互事件
  };

  return (
    <>
      {/* 互动方块 */}
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={hovered ? "yellow" : "white"}
          transparent
          opacity={0}
        />
      </mesh>

      {/* 对话框 */}
      {showDialogue && (
        <DialogueBox
          messages={messages}
          onClose={() => setShowDialogue(false)} id={null}        />
      )}
    </>
  );
};

export default InteractionsCube;
