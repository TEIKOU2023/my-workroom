// src/components/PasswordInput.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

interface PasswordInputProps {
  correctPassword: string;
  onCorrect: () => void; // 密码正确时回调
  onClose: () => void; // 关闭输入框时的回调
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  correctPassword,
  onCorrect,
  onClose,
}) => {
  const { t } = useTranslation(); // 引入多语言翻译
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (inputValue === correctPassword) {
      onCorrect(); // 密码正确时触发回调
    } else {
      setErrorMessage(t("passwordInput.errorMessage")); // 使用本地化的错误消息
    }
  };

  const modalContent = (
    <div
      onClick={onClose} // 点击背景关闭弹窗
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)", // 半透明背景遮罩
        zIndex: 999, // 背景遮罩的 zIndex
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // 阻止事件传播，避免点击内容区域关闭弹窗
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          zIndex: 1000, // 弹窗内容的 zIndex
          width: "300px",
          boxSizing: "border-box",
          position: "relative",
          opacity: "70%",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "none",
            background: "orange",
            color: "black",
            cursor: "pointer",
          }}
        >
          {t("passwordInput.closeButton")} {/* 本地化的关闭按钮文本 */}
        </button>
        <h2 style={{ textAlign: "center" }}>{t("passwordInput.title")}</h2>
        <input
          type="password" // 密码类型
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
          placeholder={t("passwordInput.placeholder")} // 本地化的占位符
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center", // 居中按钮
            marginTop: "10px",
          }}
        >
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              background: "lightgreen",
              color: "black",
              cursor: "pointer",
            }}
          >
            {t("passwordInput.submitButton")} {/* 本地化的提交按钮文本 */}
          </button>
        </div>
        {errorMessage && (
          <p
            style={{ color: "orange", marginTop: "10px", textAlign: "center" }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default PasswordInput;
