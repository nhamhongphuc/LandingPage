import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const features = [
  {
    title: "Phí Siêu Thấp",
    description: "Chỉ từ 1.3% phí dịch vụ, tiết kiệm hơn nhiều so với rút tiền tại ATM. Không phát sinh phí ẩn, minh bạch mọi giao dịch.",
    icon: (
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-amber-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zM12 4v2m0 12v2m-8-8h2m12 0h2m-4.93-4.93l-1.42-1.42m-5.66 5.66l-1.42 1.42m1.42-5.66l1.42-1.42m5.66 5.66l1.42 1.42"
        />
      </svg>
    ),
  },
  {
    title: "Nhanh Thần Tốc",
    description: "Nhận tiền mặt chỉ trong 5 giây sau khi xác nhận. Dịch vụ rút tiền và đáo hạn thẻ tín dụng hoạt động 24/7, kể cả ngày lễ.",
    icon: (
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-amber-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Bảo Mật 100%",
    description: "Thông tin thẻ tín dụng và dữ liệu cá nhân của khách hàng được bảo mật tuyệt đối. Cam kết không lưu trữ thông tin thẻ.",
    icon: (
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-amber-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z"
        />
      </svg>
    ),
  },
  {
    title: "Hỗ Trợ Tận Nơi",
    description: "Giao dịch tại địa điểm thuận tiện cho khách hàng tại TPHCM, Thủ Đức và Bình Dương. Đội ngũ nhân viên chuyên nghiệp.",
    icon: (
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-amber-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function Services() {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Ưu điểm dịch vụ rút tiền đáo hạn thẻ tín dụng Thành Tín"
      className={`py-16 sm:py-20 bg-gray-200 ${
        isVisible ? "fade-in" : "opacity-0"
      }`}
    >
      <div className="container mx-auto max-w-[1200px] px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-10">
          Tại Sao Chọn Thành Tín?
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
          Thành Tín là đơn vị uy tín hàng đầu trong lĩnh vực rút tiền mặt và đáo hạn thẻ tín dụng
          tại khu vực TPHCM và Bình Dương, với hàng nghìn khách hàng tin tưởng sử dụng dịch vụ.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => (
            <article
              key={feat.title}
              className="bg-white p-6 sm:p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition"
            >
              {feat.icon}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                {feat.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                {feat.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
