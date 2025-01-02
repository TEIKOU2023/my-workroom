import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import Character1 from "./Character1";
import InteractionsCube from "../InteractionsCube";
import AdjustCanvasSize from "../AdjustCanvasSize";
import { useTranslation } from "react-i18next";

interface BasicScene1Props {
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
    "https://pub-ca711ba9a0a347fe8348bb0a96749e9b.r2.dev/room1.glb"
  );

  useEffect(() => {
    if (gltf) {
      props.onLoaded(); // 通知父组件加载完成
    }
  }, [gltf, props]);

  return <primitive object={gltf.scene} {...props} />;
}

// 主场景组件
const BasicScene1: React.FC<BasicScene1Props> = ({
  onLoaded,
  requestPasswordInput,
}) => {
  const { t } = useTranslation(); // 引入翻译
  const [clickedCubes, setClickedCubes] = useState<Set<string>>(new Set());
  const [passwordUnlocked, setPasswordUnlocked] = useState(false);

  useEffect(() => {
    if (clickedCubes.size === 3) {
      setPasswordUnlocked(true); // 解锁密码输入
    }
  }, [clickedCubes]);

  const handleCubeInteract = (cubeId: string) => {
    setClickedCubes((prev) => new Set(prev).add(cubeId)); // 记录点击方块的ID
  };

  const handlePasswordCorrect = () => {
    alert(t("scene1.success.message")); // 密码正确后的反馈信息
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
          position={[-5, -3.5, -10]}
          scale={[7.2, 7, 3]}
          onLoaded={onLoaded}
        />

        {/* 角色对话 */}
        <Character1
          position={[-2, 0.8, 0]}
          scale={[3.4, 3.9, 4]}
          visible={true}
          dynamicDialogue={
            passwordUnlocked
              ? [t("scene1.character.dialogue5")]
              : [
                  t("scene1.character.dialogue1"),
                  t("scene1.character.dialogue2"),
                  t("scene1.character.dialogue3"),
                  t("scene1.character.dialogue4"),
                  t("scene1.character.dialogue6"),
                ]
          }
          onDialogueEnd={() => {
            if (passwordUnlocked) {
              requestPasswordInput("1882125", handlePasswordCorrect); // 检查密码
            }
          }}
        />

        {/* 互动方块：窗户 */}
        <InteractionsCube
          position={[-8, 8, -10]}
          scale={[2.1, 5, 1]}
          messages={t("scene1.interactions.window", { returnObjects: true }) as string[]}
          onInteract={() => handleCubeInteract("window")}
        />

        {/* 互动方块：书柜 */}
        <InteractionsCube
          position={[3.6, 7.6, -10]}
          scale={[1, 1, 1]}
          messages={t("scene1.interactions.bookshelf", { returnObjects: true }) as string[]}
          onInteract={() => handleCubeInteract("bookshelf")}
        />

        {/* 互动方块：打字机 */}
        <InteractionsCube
          position={[-1, 1, -10]}
          scale={[2.7, 1, 2]}
          messages={t("scene1.interactions.typewriter", { returnObjects: true }) as string[]}
          onInteract={() => handleCubeInteract("typewriter")}
        />
      </group>
    </>
  );
};

export default BasicScene1;
