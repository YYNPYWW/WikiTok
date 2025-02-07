import { useState, useEffect, useRef } from "react";
import { LANGUAGES } from "../languages";
import { useLocalization } from "../hooks/useLocalization";

export function LanguageSelector() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setLanguage } = useLocalization();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 在点击外部时检查是否应该关闭下拉菜单
  const handleClickOutside = (event: MouseEvent) => {
    // dropdownRef.current 表示下拉菜单的最外层 div，即引用整个 div
    // 当未点击 Language 相关内容时或点击下拉菜单之外的区域时，关闭下拉菜单
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // 组件挂载时，添加全局点击事件监听器
    document.addEventListener("mousedown", handleClickOutside);
    // 返回清理函数，在组件卸载时执行
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // 依赖项为空，表示只在组件挂载和卸载时执行一次

  return (
    // 将 ref 绑定到最外层 div上
    <div
      className="relative inline-flex items-center"
      onClick={() => setShowDropdown(!showDropdown)}
      ref={dropdownRef}
    >
      <button className="text-sm text-white/70 hover:text-white transition-colors">
        Language
      </button>

      {showDropdown && (
        <div className="absolute overflow-hidden py-2 w-30 right-0 top-full mt-1 bg-gray-900 rounded-md shadow-lg">
          {LANGUAGES.map((language) => (
            <button
              key={language.id}
              onClick={() => setLanguage(language.id)}
              className="w-full items-center flex gap-3 px-3 py-1 hover:bg-gray-800"
            >
              <img className="w-5" src={language.flag} alt={language.name} />
              <span className="text-xs">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
