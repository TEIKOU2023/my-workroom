import React, { useState } from "react";
import PasswordInput from "./PasswordInput";

interface PasswordManagerProps {
  passwordUnlocked: boolean; // 是否解锁输入密码
}

const PasswordManager: React.FC<PasswordManagerProps> = ({
  passwordUnlocked,
}) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false); // 控制密码框显示

  const handlePasswordCorrect = () => {
    alert("通关成功！"); // 密码正确时触发
    setShowPasswordInput(false); // 关闭密码框
  };

  const handleRequestPassword = () => {
    if (passwordUnlocked) {
      setShowPasswordInput(true); // 显示密码输入框
    } else {
      alert("你还需要找到更多线索！");
    }
  };

  return (
    <>
      {showPasswordInput && (
        <PasswordInput
          correctPassword="1882125" // 正确的密码
          onCorrect={handlePasswordCorrect} // 密码正确时的回调
          onClose={() => setShowPasswordInput(false)} // 关闭密码框
        />
      )}
      <button
        onClick={handleRequestPassword}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "10px 20px",
          background: passwordUnlocked ? "green" : "gray",
          color: "white",
          borderRadius: "5px",
          cursor: passwordUnlocked ? "pointer" : "not-allowed",
        }}
      >
        输入密码
      </button>
    </>
  );
};

export default PasswordManager;
