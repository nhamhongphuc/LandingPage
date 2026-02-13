import { useState } from "react";
import { FACEBOOK_URL } from "@/utils/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white py-4 shadow-lg sticky-header top-0 z-40" role="banner">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-amber-400 focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded"
      >
        Chuyển đến nội dung chính
      </a>
      <div className="container mx-auto max-w-[1200px] flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo-round.svg"
            alt="Thành Tín Logo - Dịch vụ rút tiền và đáo hạn thẻ tín dụng"
            className="h-12 sm:h-14 mr-4"
            width={56}
            height={56}
          />
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16m-7 6h7"
              }
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav
          aria-label="Điều hướng chính"
          className={`sm:flex sm:space-x-6 ${
            isOpen ? "block" : "hidden"
          } sm:block absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-900 sm:bg-transparent p-4 sm:p-0`}
        >
          <a
            href="#home"
            className="block sm:inline text-base sm:text-lg hover:text-amber-400 transition py-2 sm:py-0"
          >
            Trang Chủ
          </a>
          <a
            href="#services"
            className="block sm:inline text-base sm:text-lg hover:text-amber-400 transition py-2 sm:py-0"
          >
            Dịch Vụ
          </a>
          <a
            href="#contact"
            className="block sm:inline text-base sm:text-lg hover:text-amber-400 transition py-2 sm:py-0"
          >
            Liên Hệ
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:inline text-base sm:text-lg hover:text-amber-400 transition py-2 sm:py-0"
          >
            Fanpage
          </a>
        </nav>
      </div>
    </header>
  );
}
