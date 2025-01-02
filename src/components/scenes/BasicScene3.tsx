import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import Character3 from "./Character3";
import InteractionsCube from "../InteractionsCube";
import AdjustCanvasSize from "../AdjustCanvasSize";
import { useTranslation } from "react-i18next";

interface BasicScene3Props {
  onLoaded: () => void; // 加载完成的回调
  requestPasswordInput: (
    expectedPassword: string,
    onCorrect: () => void
  ) => void; // 请求密码输入的函数
}

// 背景模型组件
function BackgroundModel(
  props: JSX.IntrinsicElements["mesh"] & { onLoaded: () => void }
) {
  const gltf = useLoader(
    GLTFLoader,
    "https://pub-ca711ba9a0a347fe8348bb0a96749e9b.r2.dev/room3.glb"
  );

  useEffect(() => {
    if (gltf) {
      props.onLoaded(); // 通知父组件加载完成
    }
  }, [gltf, props]);

  return <primitive object={gltf.scene} {...props} />;
}

// 主场景组件
const BasicScene3: React.FC<BasicScene3Props> = ({
  onLoaded,
  requestPasswordInput,
}) => {
  const { t } = useTranslation(); // 引入翻译
  const [clickedCubes, setClickedCubes] = useState<Set<string>>(new Set());
  const [passwordUnlocked, setPasswordUnlocked] = useState(false);

  useEffect(() => {
    if (clickedCubes.size === 3) {
      setPasswordUnlocked(true);
    }
  }, [clickedCubes]);

  const handleCubeInteract = (cubeId: string) => {
    setClickedCubes((prev) => new Set(prev).add(cubeId));
  };

  const handlePasswordCorrect = () => {
    alert(t("scene3.success.message")); // 通关成功的动态提示
  };

  return (
    <>
      {/* 动态调整 Canvas */}
      <AdjustCanvasSize />
      <ambientLight intensity={1.0} />
      <spotLight
        position={[10, 20, 10]}
        angle={0.2}
        penumbra={1}
        intensity={1.5}
        castShadow
      />

      <group position={[0, 0, 0]}>
        {/* 背景模型 */}
        <BackgroundModel
          position={[0, -4, -7]}
          scale={[8, 8, 8]}
          onLoaded={onLoaded}
        />

        {/* 角色 */}
        <Character3
          position={[2, 2, 0]}
          scale={[4, 4, 4]}
          visible={true}
          dynamicDialogue={
            passwordUnlocked
              ? [t("scene3.character.dialogue6")]
              : [
                  t("scene3.character.dialogue1"),
                  t("scene3.character.dialogue2"),
                  t("scene3.character.dialogue3"),
                  t("scene3.character.dialogue4"),
                  t("scene3.character.dialogue5"),
                ]
          }
          onDialogueEnd={() => {
            if (passwordUnlocked) {
              requestPasswordInput(t("COSMOS"), handlePasswordCorrect); // 动态密码输入
            }
          }}
        />

        {/* 互动方块：电视 */}
        <InteractionsCube
          position={[-11.6, 7.6, -11]}
          scale={[8, 3.4, 1]}
          messages={
            t("scene3.interactions.tv", { returnObjects: true }) as string[]
          }
          onInteract={() => handleCubeInteract("tv")}
        />

        {/* 互动方块：卫衣 */}
        <InteractionsCube
          position={[11.3, 9, -11]}
          scale={[2, 3.5, 1]}
          messages={
            t("scene3.interactions.hoodie", { returnObjects: true }) as string[]
          }
          onInteract={() => handleCubeInteract("hoodie")}
        />

        {/* 互动方块：电竞椅 */}
        <InteractionsCube
          position={[0, 7.5, -13]}
          scale={[1.7, 4, 1.5]}
          messages={
            t("scene3.interactions.chair", { returnObjects: true }) as string[]
          }
          onInteract={() => handleCubeInteract("chair")}
        />
      </group>
    </>
  );
};

export default BasicScene3;
