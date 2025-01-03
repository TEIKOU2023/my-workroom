import { useState, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import DialogueBox from "../DialogueBox";

interface Character2Props {
  position?: [number, number, number];
  scale?: [number, number, number];
  visible: boolean;
  dynamicDialogue: string[]; // 动态台词
  onDialogueEnd: () => void; // 对话结束时回调
}

function Character2({
  position,
  scale,
  visible,
  dynamicDialogue,
  onDialogueEnd,
}: Character2Props) {
  const texture = useLoader(
    THREE.TextureLoader,
    import.meta.env.VITE_CHARATER_2_IMG_URL
  ) as THREE.Texture | null | undefined;
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
          }}
          id={null}
        />
      )}
    </>
  );
}

export default Character2;
