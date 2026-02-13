import { structuredData } from "@/utils/siteData";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 sm:py-6">
      <div className="container mx-auto max-w-[1200px] px-4 text-center">
        <p className="text-base sm:text-lg">
          © {new Date().getFullYear()} Thành Tín. Giải pháp tài chính thông
          minh.
        </p>
        <p className="text-sm sm:text-base mt-2">
          Lưu ý: Chỉ chuyển khoản cho chủ thẻ. Rút hộ cần CMND/CCCD. Giao
          dịch online yêu cầu khách hàng thân thiết.
        </p>
      </div>

      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </footer>
  );
}
