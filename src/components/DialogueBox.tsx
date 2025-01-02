import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { t } from "i18next";

interface DialogueBoxProps {
  id: string | null;
  messages: string[];
  onClose: () => void;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ messages, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0); // 当 messages 更新时重置索引
  }, [messages]);

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1); // 显示下一句
    } else {
      onClose(); // 最后一句后关闭对话框
    }
  };

  return (
    <Html position={[0, 0, 0]} transform={false} fullscreen>
      <div
        style={{
          bottom: "80%",
          marginLeft: "5%",
          marginRight: "5%",
          marginTop: "15%",
          left: "5%",
          background: "rgba(235, 235, 235, 0.8)",
          padding: "30px 30px",
          borderRadius: "30px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
          cursor: "pointer", // 鼠标指针样式
        }}
        onClick={handleNext} // 点击整个对话框触发下一句
      >
        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          {messages[currentIndex]}
        </p>
        <p
          style={{
            fontSize: "0.8rem",
            color: "gray",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {currentIndex < messages.length - 1
            ? t("dialogue.continue")
            : t("dialogue.close")}
        </p>
      </div>
    </Html>
  );
};

export default DialogueBox;
