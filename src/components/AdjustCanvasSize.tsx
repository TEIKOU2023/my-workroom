import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";

const AdjustCanvasSize: React.FC = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 更新渲染器尺寸
      gl.setSize(width, height);

      // 确保相机是 PerspectiveCamera
      const perspectiveCamera = camera as PerspectiveCamera;
      if (perspectiveCamera.isPerspectiveCamera) {
        perspectiveCamera.aspect = width / height;
        perspectiveCamera.updateProjectionMatrix();
      }
    };

    // 初始调整
    handleResize();

    // 监听窗口变化
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, gl]);

  return null;
};

export default AdjustCanvasSize;
