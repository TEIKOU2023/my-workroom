import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import BasicScene1 from "./components/scenes/BasicScene1";
import BasicScene2 from "./components/scenes/BasicScene2";
import BasicScene3 from "./components/scenes/BasicScene3";
import { easing } from "maath";
import LoadingSpinner from "./components/LoadingSpinner";
import PasswordInput from "./components/PasswordInput";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function CameraRig() {
  useFrame((state, delta) => {
    const cameraPositionZ = 10 - Math.abs(state.pointer.x) * 1.1;

    easing.damp3(
      state.camera.position,
      [state.pointer.x * 0.8, 1 + state.pointer.y * 0.8, cameraPositionZ],
      0.05,
      delta
    );

    state.camera.lookAt(0, 3, 0);
  });

  return null;
}

const App: React.FC = () => {
  const { t } = useTranslation(); // 使用 useTranslation 获取翻译函数
  const [currentScene, setCurrentScene] = useState(1); // 当前场景状态
  const [isLoading, setIsLoading] = useState(true); // 加载状态
  const [passwordRequest, setPasswordRequest] = useState<{
    expectedPassword: string;
    onCorrect: () => void;
  } | null>(null); // 当前密码输入请求

  const handleSceneChange = (sceneIndex: number) => {
    setIsLoading(true); // 切换场景时显示加载动画
    setCurrentScene(sceneIndex);
  };

  const requestPasswordInput = (
    expectedPassword: string,
    onCorrect: () => void
  ) => {
    setPasswordRequest({ expectedPassword, onCorrect });
  };

  const handleCorrectPassword = () => {
    if (passwordRequest) {
      passwordRequest.onCorrect(); // 调用场景传递的回调
      setPasswordRequest(null); // 关闭密码输入框
    }
  };

  const handleClosePasswordInput = () => {
    setPasswordRequest(null);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {isLoading && <LoadingSpinner />}
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 4, 2], fov: 45, near: 1, far: 500 }}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
        onCreated={() => setIsLoading(false)}
      >
        <CameraRig />
        {currentScene === 1 && (
          <BasicScene1
            onLoaded={() => setIsLoading(false)}
            requestPasswordInput={requestPasswordInput}
          />
        )}
        {currentScene === 2 && (
          <BasicScene2
            onLoaded={() => setIsLoading(false)}
            requestPasswordInput={requestPasswordInput}
          />
        )}
        {currentScene === 3 && (
          <BasicScene3
            onLoaded={() => setIsLoading(false)}
            requestPasswordInput={requestPasswordInput}
          />
        )}
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          display: "flex",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <button
          style={{
            fontSize: "1.5rem",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            background: currentScene === 1 ? "lightgreen" : "gray",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => handleSceneChange(1)}
        >
          {t("buttons.scene1")}
        </button>
        <button
          style={{
            fontSize: "1.5rem",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            background: currentScene === 2 ? "pink" : "gray",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => handleSceneChange(2)}
        >
          {t("buttons.scene2")}
        </button>
        <button
          style={{
            fontSize: "1.5rem",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            background: currentScene === 3 ? "darkblue" : "gray",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => handleSceneChange(3)}
        >
          {t("buttons.scene3")}
        </button>

        <LanguageSwitcher />
      </div>

      {passwordRequest && (
        <PasswordInput
          correctPassword={passwordRequest.expectedPassword}
          onCorrect={handleCorrectPassword}
          onClose={handleClosePasswordInput}
        />
      )}
    </div>
  );
};

export default App;
