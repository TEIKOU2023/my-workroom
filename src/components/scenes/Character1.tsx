import  { useState, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import DialogueBox from "../DialogueBox";

interface CharacterProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  visible: boolean;
  dynamicDialogue: string[]; // 动态台词
  onDialogueEnd: () => void; // 对话结束时回调
}

function Character1({
  position,
  scale,
  visible,
  dynamicDialogue,
  onDialogueEnd,
}: CharacterProps) {
  const texture = useLoader(
    THREE.TextureLoader,
    "https://pub-ca711ba9a0a347fe8348bb0a96749e9b.r2.dev/character1.png"
  );
  const [showDialogue, setShowDialogue] = useState(false);
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const baseY = position ? position[1] : 0;
      meshRef.current.position.y = hovered
        ? Math.sin(Date.now() / 200) * 0.1 + baseY
        : baseY;
    }
  });

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
  };

  return (
    <>
      {visible && (
        <mesh
          ref={meshRef}
          position={position}
          scale={scale}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[1, 2.4]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      )}
      {showDialogue && (
        <DialogueBox
          messages={dynamicDialogue}
          onClose={() => {
            setShowDialogue(false);
            onDialogueEnd();
          } } id={null}        />
      )}
    </>
  );
}

export default Character1;
