import { PHONE_RAW, PHONE_DISPLAY, ZALO_URL } from "@/utils/constants";

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Giới thiệu dịch vụ rút tiền và đáo hạn thẻ tín dụng Thành Tín"
      className="hero-shape py-16 sm:py-20 text-white"
    >
      <div className="hero-content container mx-auto max-w-[1200px] px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Rút Tiền & Đáo Hạn Thẻ Tín Dụng
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Phí chỉ từ{" "}
          <span className="font-bold text-amber-400">1.3%</span> – Nhận tiền
          trong <span className="font-bold text-amber-400">5 giây</span> – Bảo
          mật 100%
        </p>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8">
          Thành Tín cung cấp dịch vụ rút tiền mặt và đáo hạn thẻ tín dụng Visa,
          Mastercard, JCB tại TP.HCM, Thủ Đức và Bình Dương. Giao dịch nhanh chóng,
          an toàn, phí cạnh tranh nhất thị trường. Hỗ trợ tận nơi 24/7.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href={`tel:${PHONE_RAW}`}
            className="bg-brand-gray text-white px-8 py-4 rounded-lg hover:bg-gray-600 transition min-h-[52px] flex items-center justify-center text-lg sm:text-xl font-semibold shadow-md"
          >
            <svg
              className="w-6 h-6 text-black pr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.77 15.77 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.56 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.56 3.54 1 1 0 01-.21 1.11l-2.2 2.2z" />
            </svg>
            Gọi Ngay: {PHONE_DISPLAY}
          </a>
          <a
            href={ZALO_URL}
            className="bg-brand-dark text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition min-h-[52px] flex items-center justify-center text-lg sm:text-xl font-semibold shadow-md"
          >
            💬 Chat Zalo
          </a>
        </div>
      </div>
    </section>
  );
}
