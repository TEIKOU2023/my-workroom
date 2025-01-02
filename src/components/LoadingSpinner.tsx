import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed", // 固定位置，覆盖整个屏幕
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.9)", // 半透明背景
        zIndex: 1000, // 确保在所有内容之上
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid rgba(0, 0, 0, 0.2)",
          borderTop: "5px solid rgba(0, 0, 0, 0.8)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
