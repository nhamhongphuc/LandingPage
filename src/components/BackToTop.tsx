import { useState, useEffect, useCallback } from "react";
import { debounce } from "@/utils/debounce";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleVisibility = useCallback(
    debounce(() => {
      setIsVisible(window.pageYOffset > 300);
    }, 100),
    []
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-4 bg-gray-600 text-gray-900 p-3 rounded-full hover:bg-gray-700 transition ${
        isVisible ? "block" : "hidden"
      }`}
      aria-label="Quay lại đầu trang"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="white"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
