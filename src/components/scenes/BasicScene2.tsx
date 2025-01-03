import React, { useEffect, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import Character2 from "./Character2";
import InteractionsCube from "../InteractionsCube";
import AdjustCanvasSize from "../AdjustCanvasSize";
import { useTranslation } from "react-i18next";

interface BasicScene2Props {
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
    import.meta.env.VITE_ROOM_2_MODEL_URL
  ) as GLTF;

  useEffect(() => {
    if (gltf) {
      props.onLoaded();
    }
  }, [gltf, props]);

  return <primitive object={gltf.scene} {...props} />;
}

const BasicScene2: React.FC<BasicScene2Props> = ({
  onLoaded,
  requestPasswordInput,
}) => {
  const { t } = useTranslation();
  const [clickedCubes, setClickedCubes] = useState<Set<string>>(new Set());
  const [passwordUnlocked, setPasswordUnlocked] = useState(false);

  // 解锁条件逻辑
  useEffect(() => {
    if (clickedCubes.size === 3) {
      setPasswordUnlocked(true);
    }
  }, [clickedCubes]);

  const handleCubeInteract = (cubeId: string) => {
    setClickedCubes((prev) => new Set(prev).add(cubeId));
  };

  const handlePasswordCorrect = () => {
    alert(t("scene2.success.message"));
  };

  return (
    <>
      {/* 动态调整 Canvas */}
      <AdjustCanvasSize />
      {/* 环境光 */}
      <ambientLight intensity={1} />
      <spotLight
        position={[0, 20, 10]}
        angle={0.5}
        penumbra={1}
        intensity={5}
        castShadow
      />

      <group position={[0, 0, 0]}>
        {/* 背景模型 */}
        <BackgroundModel
          position={[0, -4, -10]}
          scale={[7.6, 7.3, 3]}
          onLoaded={onLoaded}
        />

        {/* 角色：始终可见 */}
        <Character2
          position={[0.6, 2, -6]}
          scale={[2.4, 3, 1]}
          visible={true}
          dynamicDialogue={
            passwordUnlocked
              ? [t("scene2.character.dialogue5")]
              : [
                  t("scene2.character.dialogue1"),
                  t("scene2.character.dialogue2"),
                  t("scene2.character.dialogue3"),
                  t("scene2.character.dialogue4"),
                ]
          }
          onDialogueEnd={() => {
            if (passwordUnlocked) {
              requestPasswordInput(t("americano"), handlePasswordCorrect);
            }
          }}
        />

        {/* 互动方块 */}
        <InteractionsCube
          position={[6.5, 3.7, -8.7]} // 咖啡机
          scale={[4.5, 2.2, 1]}
          messages={
            t("scene2.interactions.coffeeMachine", {
              returnObjects: true,
            }) as string[]
          }
          onInteract={() => handleCubeInteract("coffeeMachine")}
        />
        <InteractionsCube
          position={[10, 7, -9]} // 咖啡豆
          scale={[1, 1, 1]}
          messages={
            t("scene2.interactions.coffeebeans", {
              returnObjects: true,
            }) as string[]
          }
          onInteract={() => handleCubeInteract("coffeebeans")}
        />
        <InteractionsCube
          position={[-6.4, 3, -9]} // 座椅
          scale={[2.5, 1, 1]}
          messages={
            t("scene2.interactions.chair", {
              returnObjects: true,
            }) as string[]
          }
          onInteract={() => handleCubeInteract("chair")}
        />
      </group>
    </>
  );
};

export default BasicScene2;
