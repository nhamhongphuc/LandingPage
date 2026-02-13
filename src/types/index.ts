/** SEO metadata for a page */
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

/** Data pre-loaded on the server and injected into HTML */
export interface PreloadedState {
  meta: PageMeta;
  timestamp: number;
}

/** Contact location entry */
export interface Location {
  address: string;
}

/** Service feature card */
export interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
