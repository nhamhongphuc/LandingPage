import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { PHONE_RAW, PHONE_DISPLAY } from "@/utils/constants";
import { locations } from "@/utils/siteData";

export default function Contact() {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Thông tin liên hệ Thành Tín"
      className={`bg-gray-900 py-8 sm:py-20 ${
        isVisible ? "fade-in" : "opacity-0"
      }`}
    >
      <div className="container mx-auto max-w-[1200px] px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-10">
          Liên Hệ Ngay Hôm Nay!
        </h2>
        <div className="max-w-xl mx-auto bg-gray-600 p-4 sm:p-8 rounded-lg shadow-lg">
          <address className="text-white space-y-3 sm:space-y-4 not-italic">
            {/* Phone */}
            <p className="flex sm:items-center text-base sm:text-lg md:text-xl">
              <span className="flex items-center mb-1 sm:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="mr-2 shrink-0"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A17.93 17.93 0 0 1 2 4a1 1 0 0 1 1-1h3.61a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.24 1.05l-2.2 2.2z" />
                </svg>
                <strong>Hotline/Zalo:&nbsp;</strong>
              </span>
              <a
                href={`tel:${PHONE_RAW}`}
                className="hover:text-amber-400 transition underline underline-offset-4 sm:ml-1"
              >
                {PHONE_DISPLAY}
              </a>
            </p>

            {/* Locations */}
            <div className="text-base sm:text-lg md:text-xl">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="mr-2 shrink-0"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
                <strong>Địa điểm giao dịch:&nbsp;</strong>
              </div>
              <ul className="ml-4 mt-2">
                {locations.map((loc) => (
                  <li key={loc.address}>📍 {loc.address}</li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <p className="flex items-start sm:items-center text-base sm:text-lg md:text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="mr-2 mt-1 sm:mt-0 shrink-0"
              >
                <path d="M12 8V12L15 14L14.25 15.66L10 13V8H12M12,20A8,8 0 1,1 12,4A8,8 0 0,1 12,20Z" />
              </svg>
              <span>
                <strong>Thời gian:&nbsp;</strong>24/7, hỗ trợ tận nơi
              </span>
            </p>
          </address>
        </div>
      </div>
    </section>
  );
}
