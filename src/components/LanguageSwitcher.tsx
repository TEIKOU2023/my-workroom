import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  buttonStyle?: React.CSSProperties; // 允许自定义按钮样式
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ buttonStyle }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // 支持的语言列表
  const languages = [
    { code: "zh", label: "中文" },
    { code: "en", label: "English" },
    { code: "ja", label: "日本語" },
  ];

  // 切换语言
  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false); // 切换完成后关闭菜单
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* 主按钮 */}
      <button
        style={{
          fontSize: "1.5rem",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          background: "grey",
          color: "lightblue",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        🌐
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "120%",
            alignSelf: "center",
            margin: 0,
            padding: "8px 8px",
            listStyle: "none",
            background: "rgb(165, 165, 165)",
            borderRadius: "5px",
            zIndex: 1000,
            width: buttonStyle?.width || "120px", // 确保宽度与按钮一致
          }}
        >
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                style={{
                  padding: "8px 16px",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
