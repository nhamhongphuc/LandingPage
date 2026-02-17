import { SITE_URL, PHONE_NUMBER, PHONE_DISPLAY, FACEBOOK_URL } from "./constants";
import type { PageMeta, Location } from "@/types";

/** OG image — used for social sharing previews (1200×630 PNG) */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

/** Default page meta — used for the home/landing page */
export const defaultMeta: PageMeta = {
  title: "Thành Tín - Rút Tiền & Đáo Hạn Thẻ Tín Dụng Nhanh Chóng | TPHCM & Bình Dương",
  description:
    "Dịch vụ rút tiền và đáo hạn thẻ tín dụng uy tín tại TPHCM, Thủ Đức & Bình Dương. Phí siêu thấp chỉ từ 1.3%, nhận tiền trong 5 giây, bảo mật 100%, hỗ trợ tận nơi 24/7. Liên hệ ngay: " +
    PHONE_DISPLAY,
  keywords:
    "rút tiền thẻ tín dụng, đáo hạn thẻ tín dụng, rút tiền thẻ tín dụng TPHCM, đáo hạn thẻ tín dụng Bình Dương, rút tiền thẻ tín dụng Thủ Đức, Thành Tín, dịch vụ tài chính, phí thấp, bảo mật, rút tiền nhanh, đáo hạn thẻ visa, đáo hạn thẻ mastercard",
  ogTitle: "Thành Tín - Rút Tiền & Đáo Hạn Thẻ Tín Dụng | Phí Chỉ Từ 1.3%",
  ogDescription:
    "Phí chỉ từ 1.3%. Nhận tiền trong 5 giây. Bảo mật 100%. Hỗ trợ tận nơi 24/7 tại TPHCM & Bình Dương. Gọi ngay " + PHONE_DISPLAY,
  ogUrl: SITE_URL,
  ogImage: OG_IMAGE_URL,
  canonical: SITE_URL + "/",
};

/** Office / transaction locations */
export const locations: Location[] = [
  { address: "Tòa nhà S501, Vinhomes Grand Park, Q.9, TP.HCM" },
  {
    address:
      "Đường Lê Quang Định, KP Bình Khánh, P. Khánh Bình, Tân Uyên, Bình Dương",
  },
];

/** JSON-LD structured data for the business */
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Thành Tín",
  alternateName: "Thành Tín Rút Đáo Thẻ Tín Dụng",
  description:
    "Dịch vụ rút tiền và đáo hạn thẻ tín dụng tại TPHCM & Bình Dương với phí thấp từ 1.3%, nhanh chóng trong 5 giây, bảo mật 100%, hỗ trợ tận nơi 24/7.",
  url: SITE_URL,
  telephone: PHONE_NUMBER,
  logo: `${SITE_URL}/logo-round.svg`,
  image: OG_IMAGE_URL,
  priceRange: "Từ 1.3%",
  currenciesAccepted: "VND",
  paymentAccepted: "Thẻ tín dụng, Chuyển khoản",
  areaServed: [
    {
      "@type": "City",
      name: "Hồ Chí Minh",
    },
    {
      "@type": "City",
      name: "Thủ Đức",
    },
    {
      "@type": "AdministrativeArea",
      name: "Bình Dương",
    },
    {
      "@type": "AdministrativeArea",
      name: "Đồng Nai",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tòa nhà S501, Vinhomes Grand Park",
    addressLocality: "Quận 9",
    addressRegion: "TP.HCM",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "10.8398",
    longitude: "106.8372",
  },
  location: [
    {
      "@type": "Place",
      name: "Thành Tín - Chi nhánh TPHCM",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tòa nhà S501, Vinhomes Grand Park",
        addressLocality: "Quận 9",
        addressRegion: "TP.HCM",
        addressCountry: "VN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "10.8398",
        longitude: "106.8372",
      },
    },
    {
      "@type": "Place",
      name: "Thành Tín - Chi nhánh Bình Dương",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Đường Lê Quang Định, KP Bình Khánh",
        addressLocality: "Khánh Bình, Tân Uyên",
        addressRegion: "Bình Dương",
        addressCountry: "VN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "11.0489",
        longitude: "106.7649",
      },
    },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [FACEBOOK_URL],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_NUMBER,
    contactType: "customer service",
    availableLanguage: "Vietnamese",
    areaServed: "VN",
  },
};
